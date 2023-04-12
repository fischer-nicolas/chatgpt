import { SortBy } from './sort-by.model';

export class RowsDataChange {
    constructor(
        public pageNumber: number,
        public sortBy: SortBy,
    ) {}
}