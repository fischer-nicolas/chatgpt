export class RowAction {
    constructor(
        public code: string,
        public description: string,
        public onClick: Function,
        public visible: Function = row => true,
        public iconClass: string,
        public privilege: string | ((row: any) => string) = ""
    ) {}
}