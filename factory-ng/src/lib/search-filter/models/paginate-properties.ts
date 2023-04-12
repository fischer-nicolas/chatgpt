export class PaginateProperties{
    public pageIndex: number;
    public firstRow: number;
		public sortBy: string;
		public pageSize: number;
		public recordsCount: number;
    public rowsPerPageOptions: number[];

    constructor(){
      this.pageIndex = 0;
      this.firstRow = 0;
      this.recordsCount = 0;
      this.sortBy= "id_asc";
      this.pageSize = 5;
      this.rowsPerPageOptions =[5,10,25];
    }

    public getStringQuerry(paginateProperties: PaginateProperties): string {
      paginateProperties.pageIndex ??= 0;
      paginateProperties.pageSize ??= 5;
      paginateProperties.sortBy ??= "id_asc"

      return "pageNumber=" + paginateProperties.pageIndex +
              "&pageSize=" + paginateProperties.pageSize +
              "&sortBy=" + paginateProperties.sortBy ;
    }
}
