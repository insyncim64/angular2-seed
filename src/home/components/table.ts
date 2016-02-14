import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';

@Component({
    selector: 'fh-table, [fh-table]',
    inputs:['data'],
    templateUrl: './home/components/table.html',
    directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class FhTableCmp implements OnInit {
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

    private data: Array<any> = [];

    ngOnInit() {
        this.length = this.data.length;
        this.onChangeTable(this.config, null);
    }
    changePage(page: any, data: Array<any> = this.data): Array<any> {
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
}
