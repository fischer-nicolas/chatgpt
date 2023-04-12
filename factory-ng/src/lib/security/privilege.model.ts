export class Privilege{

    public id: number;
    public roleId: number;
    public tag: string;

    constructor(
        public module: string,
        public entity: string,
        public eventName: string,
    ) { }

}