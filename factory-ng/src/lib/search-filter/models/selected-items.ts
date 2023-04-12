import { SelectItemFilter } from "./select-item-filter";

export interface SelectedItems {

    addItem(item:SelectItemFilter);

    removeItem(item:SelectItemFilter);


}
