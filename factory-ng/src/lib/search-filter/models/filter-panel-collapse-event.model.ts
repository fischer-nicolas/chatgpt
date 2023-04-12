/**Event that gets fired when one or more filter panels should collapse or expand */
export default class FilterPanelCollapseEvent {
    /**
     * @param {boolean} collapsed: Whether the panel should collapse (true) or expand (false)
     * @param {Function} target: Predicate that identifies which filters should collapse or expand
     */
    constructor(
        public collapsed: boolean,
        public target: (filter: any) => boolean
    ) {}
}