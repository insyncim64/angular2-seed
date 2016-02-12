import {Alert, PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';
import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {TableData} from './table-data';
let template = require('./home/components/home.html');
@Component({
    selector: 'home',
    template: template,
    styleUrls: ['./home/components/home.css'],
    directives: [Alert, NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeCmp implements OnInit {
    /**
     * alert data start
     */
    public alerts: string[] = [];
    public types = ['success', 'info', 'warning', 'danger'];
    /**
     * alert end
     */
    /**
     * table data start
     */
    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Date', name: 'date', sort: 'asc' },
        { title: 'Name', name: 'name' },
        { title: 'District', name: 'district' },
        { title: 'Sold count', name: 'dailySoldCount', sort: 'asc' },
        { title: 'Sold size', name: 'dailyTotalSize', sort: 'asc' },
        { title: 'Sold value', name: 'dailyTotalValue', sort: 'asc' },
        { title: 'Remained percentage', name: 'dropCount', sort: false }
    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    public config: any = {
        paging: true,
        sorting: { columns: [] },
        filtering: { filterString: '', columnName: 'name' }
    };
    public data: Array<any> = TableData;
    // /**
    //  * table end
    //  */
    // /**
    //  * typeahead data start
    //  */
    // public selected: string = '';
    // public asyncSelected: string = '';
    // public typeaheadLoading: boolean = false;
    // public typeaheadNoResults: boolean = false;
    // public states: Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    //     'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    //     'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    //     'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    //     'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    //     'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    //     'West Virginia', 'Wisconsin', 'Wyoming'];
    // public statesComplex: Array<any> = [
    //     { id: 1, name: 'Alabama' }, { id: 2, name: 'Alaska' }, { id: 3, name: 'Arizona' },
    //     { id: 4, name: 'Arkansas' }, { id: 5, name: 'California' },
    //     { id: 6, name: 'Colorado' }, { id: 7, name: 'Connecticut' },
    //     { id: 8, name: 'Delaware' }, { id: 9, name: 'Florida' },
    //     { id: 10, name: 'Georgia' }, { id: 11, name: 'Hawaii' },
    //     { id: 12, name: 'Idaho' }, { id: 13, name: 'Illinois' },
    //     { id: 14, name: 'Indiana' }, { id: 15, name: 'Iowa' },
    //     { id: 16, name: 'Kansas' }, { id: 17, name: 'Kentucky' },
    //     { id: 18, name: 'Louisiana' }, { id: 19, name: 'Maine' },
    //     { id: 21, name: 'Maryland' }, { id: 22, name: 'Massachusetts' },
    //     { id: 23, name: 'Michigan' }, { id: 24, name: 'Minnesota' },
    //     { id: 25, name: 'Mississippi' }, { id: 26, name: 'Missouri' },
    //     { id: 27, name: 'Montana' }, { id: 28, name: 'Nebraska' },
    //     { id: 29, name: 'Nevada' }, { id: 30, name: 'New Hampshire' },
    //     { id: 31, name: 'New Jersey' }, { id: 32, name: 'New Mexico' },
    //     { id: 33, name: 'New York' }, { id: 34, name: 'North Dakota' },
    //     { id: 35, name: 'North Carolina' }, { id: 36, name: 'Ohio' },
    //     { id: 37, name: 'Oklahoma' }, { id: 38, name: 'Oregon' },
    //     { id: 39, name: 'Pennsylvania' }, { id: 40, name: 'Rhode Island' },
    //     { id: 41, name: 'South Carolina' }, { id: 42, name: 'South Dakota' },
    //     { id: 43, name: 'Tennessee' }, { id: 44, name: 'Texas' },
    //     { id: 45, name: 'Utah' }, { id: 46, name: 'Vermont' },
    //     { id: 47, name: 'Virginia' }, { id: 48, name: 'Washington' },
    //     { id: 49, name: 'West Virginia' }, { id: 50, name: 'Wisconsin' },
    //     { id: 51, name: 'Wyoming' }];
    // public _cache: any;
    // public _prevContext: any;
    /**
     * typeahead end
     */
    /**
     * table methods start
     */
    constructor() {
        this.length = this.data.length;
    }
    ngOnInit() {
        this.onChangeTable(this.config, null);
    }
    changePage(page: any, data: Array<any> = this.data): Array<any> {
        console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }
    changeSort(data: any, config: any) {
        if (!config.sorting) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            let columns = this.config.sorting.columns || [];
            for (let i = 0; i < columns.length; i++) {
                let columnName = columns[i].name;

                if (previous[columnName] > current[columnName]) {
                    return columns[i].sort === 'desc' ? -1 : 1;
                }
                if (previous[columnName] < current[columnName]) {
                    return columns[i].sort === 'asc' ? -1 : 1;
                }
            }
            return 0;
        });
    }
    changeFilter(data: any, config: any): any {
        if (!config.filtering) {
            return data;
        }

        let filteredData: Array<any> = data.filter((item: any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));

        return filteredData;
    }
    onChangeTable(config: any, page: any = config.paging) {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
    /**
     * table end
     */
    /**
     * alert start
     */
    addAlert() {
        let i = this.alerts.length;
        this.alerts.push(this.types[i]);
    }
    /**
     * alert end
     */
    // /**
    //  * typeahead methods start
    //  */
    // public getContext() {
    //     return this;
    // }
    // public getAsyncData(context: any): Function {
    //     if (this._prevContext === context) {
    //         return this._cache;
    //     }

    //     this._prevContext = context;
    //     let f: Function = function(): Promise<string[]> {
    //         let p: Promise<string[]> = new Promise((resolve: Function) => {
    //             setTimeout(() => {
    //                 let query = new RegExp(context.asyncSelected, 'ig');
    //                 return resolve(context.states.filter((state: any) => {
    //                     return query.test(state);
    //                 }));
    //             }, 200);
    //         });
    //         return p;
    //     };
    //     this._cache = f;
    //     return this._cache;
    // }
    // public changeTypeaheadLoading(e: boolean) {
    //     this.typeaheadLoading = e;
    // }
    // public changeTypeaheadNoResults(e: boolean) {
    //     this.typeaheadNoResults = e;
    // }
    // public typeaheadOnSelect(e: any) {
    //     console.log(`Selected value: ${e.item}`);
    // }
    // /**
    //  * typeahead end
    //  */
}
