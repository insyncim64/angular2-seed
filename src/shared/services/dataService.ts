import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import { communityRequestUrl, fhRecordRequestUrl} from '../../shared/common/constants';

@Injectable()
export class DataService {
    currentSearchingCommunities: Array<any> = [{
              'id': '56b3ceebaa4acd2c5830eea1',
              'name': '加州水郡'
       }];
    constructor(public http: Http) {
    }
    getCurrentSearchingCommunities() {
        return this.currentSearchingCommunities;
    }
    fetchFirstHandRecords(communityId: string, successCallback: Function) {
        this.http.get(fhRecordRequestUrl + communityId)
            .subscribe(
            response => {
                var jsonArray = JSON.parse(response.text());
                if (jsonArray.length === 0) {
                    successCallback.call([]);
                } else {
                    let firstHandRecords: Array<any> = [];
                    for (var i = 0; i < jsonArray.length; i++) {
                        firstHandRecords.push(jsonArray[i]);
                    }
                    successCallback(firstHandRecords);
                }
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }
    fetchCommunities(communityName: string) {
        this.http.get(communityRequestUrl + communityName)
            .subscribe(
            response => {
                var jsonArray = JSON.parse(response.text());
                let tempArray : Array<any> = [];
                for (var i = 0; i < jsonArray.length; i++) {
                    tempArray.push(jsonArray[i]);
                }
                this.currentSearchingCommunities = tempArray;
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }
    // private performRequest(request: string, variable: string, callback: AsyncVoidFunction) {
    //     this.http.get(request + variable)
    //         .subscribe(
    //         response => callback,
    //         error => {
    //             alert(error.text());
    //             console.log(error.text());
    //         }
    //         );
    // }
}
