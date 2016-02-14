import {TAB_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Component, ChangeDetectionStrategy } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgIf} from 'angular2/common';
import {FhTableCmp} from './table';
import {DataService} from '../../shared/services/dataService';

@Component({
    selector: 'home',
    templateUrl: './home/components/home.html',
    styleUrls: ['./home/components/home.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,//use when a property has been changed
    directives: [TAB_DIRECTIVES, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES, TYPEAHEAD_DIRECTIVES, FhTableCmp]
})
export class HomeCmp {
    public chinesePatt: RegExp = new RegExp('^[\u4e00-\u9eff]{1,30}$');
    public selected: string = '';
    public asyncSelected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;
    /**
     * current searching items parameters
     */
    private searchingItems: Array<any>;
    private searchingFhRecords: Map<string, any>;
    /**
     * current searching items end
     */
    /**
     * typeahead private parameters start
     */
    private _cache: any;
    private _prevCacheType: any;
    /**
     * table method start
     */
    constructor(public dataService: DataService) {
        this.searchingItems = [];
        this.searchingFhRecords = new Map<string, any>();
    }
    /**
     * typeahead methods start
     */
    public getContext() {
        return this;
    }
    /**
     * here is wrong, should be async!!!!
     */
    public getAsyncData(): Function {
        if (this._prevCacheType === this.asyncSelected) {
            return this._cache;
        }
        var values = this.dataService.getCurrentSearchingCommunities();
        this._prevCacheType = this.asyncSelected;
        if (this._cache !== values)
            this._cache = values;
        return this._cache;
    }

    public changeTypeaheadLoading(e: boolean) {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean) {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: any) {
        let callback = (result: Array<any>) => {
            this.searchingFhRecords[e.item.id] = result;
            this.searchingItems.push(e.item);
        };
        this.dataService.fetchFirstHandRecords(e.item.id, callback);
        this.asyncSelected = '';
    }

    public enterQuery(event: any) {
        if (this.chinesePatt.test(this.asyncSelected))
            this.dataService.fetchCommunities(this.asyncSelected);
    }
    /**
     * typeahead end
     */
    /**
     * searching items methods start
     */
    removeItemFromSearchItems(event: any): boolean {
        let entryName = event.target.textContent || event.target.innerText;
        entryName = entryName.trim();
        let entry = this.searchingItems.find((item: any) => item.name.match(entryName));
        let index = this.searchingItems.indexOf(entry, 0);
        if (index > -1) {
            this.searchingFhRecords.delete(entry.id);
            this.searchingItems.splice(index, 1);
        }
        return true;
    }
    /**
     * searching items methods end
     */
}
