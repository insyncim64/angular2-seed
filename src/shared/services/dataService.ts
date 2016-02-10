import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import { communityRequestUrl } from '../../shared/common/constants';

@Injectable()
export class DataService {
    items: Array<any>;

    constructor(public http: Http) {
        this.items = [
            { name: 'Christoph Burgdorf' },
            { name: 'Pascal Precht' },
            { name: 'thoughtram' }
        ];
    }

    searchCommunity(communityName: string) {
        this.http.get(communityRequestUrl + communityName)
            .subscribe(
            response => {
                console.log(JSON.parse(response.text()));
                //   localStorage.setItem('jwt', response.json().id_token);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
        return this.items;
    }
    fetchRecords(communityId: string) {
        return true;
    }
}
