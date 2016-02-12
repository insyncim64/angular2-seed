import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DataService} from '../../shared/services/dataService';

@Component({
    selector: 'about',
    templateUrl: './about/components/about.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class AboutCmp {
    newName: string;
    constructor( public dataService: DataService) { }
    /** 
    * @param newname  any text as input.
    * @returns return false to prevent default form submit behavior to refresh the page.
    */
    addName(): boolean {
        this.newName = '';
        return false;
    }
    /**
     * @param event KeyboardEvent
     * @returns return whether the request is done
     */
    enterQuery(event: KeyboardEvent): boolean {
        this.dataService.searchCommunity(this.newName);
        return true;
    }
}
