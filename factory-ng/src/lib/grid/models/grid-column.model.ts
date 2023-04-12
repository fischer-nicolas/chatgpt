export class GridColumn {
    public gridVisible: boolean;
    constructor(
        public index: number,
        public field: string,
        public header: string,
        public width: string = null,
        public sortableBy: string = null,
        public userVisible: boolean = true,
        public frozen: boolean = false,
        public showAsHTML: boolean = false,
        /**Given a row, returns the routerLink navigation */
        public link?: (any) => any[],
        public justifyContent: string = 'flex-start'
    ) {
        this.gridVisible = userVisible;
    }
}