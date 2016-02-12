import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import { communityRequestUrl } from '../../shared/common/constants';

@Injectable()
export class DataService {
    currentSearchingCommunities: Array<any>;
    constructor(public http: Http) {
        this.currentSearchingCommunities = [];
    }

    searchCommunity(communityName: string) {
        this.http.get(communityRequestUrl + communityName)
            .subscribe(
            response => {
                var jsonArray = JSON.parse(response.text());
                if (jsonArray.length > 0) {
                    this.currentSearchingCommunities = [];
                }
                for (var i = 0; i < jsonArray.length; i++) {
                    this.currentSearchingCommunities.push(jsonArray[i]);
                }
                //   localStorage.setItem('jwt', response.json().id_token);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
        return this.currentSearchingCommunities;
    }
    fetchRecords(communityId: string) {
        return true;
    }
    getCurrentSearchingCommunities() : Array<any> {
        return this.currentSearchingCommunities;
    }
}
