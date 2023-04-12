export interface ILookupService {

    getResults(query:string):Promise<any[]>;
}
