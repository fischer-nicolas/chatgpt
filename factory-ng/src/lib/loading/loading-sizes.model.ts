export class LoadingSizeConfiguration {
    constructor(
        public size: string,
        public strokeWidth: string,
        public className: string
    ) {}
}


export const LOADING_SIZES = {
    large: new LoadingSizeConfiguration('5rem', '0.3rem', 'loading-large'),
    medium: new LoadingSizeConfiguration('3rem', '0.3rem', 'loading-medium'),
    small: new LoadingSizeConfiguration('1.5rem', '0.375rem', 'loading-small'),
    xsmall: new LoadingSizeConfiguration('1rem', '0.375rem', 'loading-xs')
}