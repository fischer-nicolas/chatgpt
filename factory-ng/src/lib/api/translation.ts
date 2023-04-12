export interface Translation {
    recordFound?: string;
    recordsFound?: string;
    noRecordsFound?:string;
    actions?:string;
    columns?:string;
    frozenColumns?:string;
    apply?:string;    
    error?:string;
    alreadyModifiedRecord?:string;
    requiredFieldsMissing?:string;
    defaultError?:string;
    discardChanges?: string;
    confirmLeavePage?: string;
    yes?: string;
    no?: string;
    //Filter Translation
    filters?: string;
    collapseAll?: string;
    clearFilters?: string;
    cancelar?: string;
    minimum?: string;
    maximum?: string;
    from?: string;
    to?: string;
    todayRange?: string;
    yesterdayRange?: string;
    last7DaysRange?: string;
    last30DaysRange?: string;
    currentMonth?: string;
    lastMonth?: string;
    customRange?: string;
    select?: string;
}
