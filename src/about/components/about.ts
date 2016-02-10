import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {NameList} from '../../shared/services/name_list';
import {DataService} from '../../shared/services/dataService';

@Component({
    selector: 'about',
    templateUrl: './about/components/about.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class AboutCmp {
    newName: string;
    constructor(public list: NameList, public dataService: DataService) { }
    /** 
    * @param newname  any text as input.
    * @returns return false to prevent default form submit behavior to refresh the page.
    */
    addName(): boolean {
        this.list.add(this.newName);
        this.newName = '';
        return false;
    }
    /**
     * @param event KeyboardEvent
     * @returns return whether the request is done
     */
    enterQuery(event: KeyboardEvent): boolean {
        let results = this.dataService.searchCommunity(this.newName);
        if (results.length > 0) {
            this.list.add(this.dataService.searchCommunity(this.newName)[0]);
        }
        return true;
    }
}
