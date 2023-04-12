import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { AdFilterCollapseDirective } from './directives/ad-filter-collapse.directive';
import { AdFilterToggleDirective } from './directives/ad-filter-toggle.directive ';
import { FilterBaseComponent } from './filter-base/filter-base.component';
import { AutocompleteFilterComponent } from './filters/autocomplete-filter/autocomplete-filter.component';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';
import { RangeFilterComponent } from './filters/range-filter/range-filter.component';
import { SelectFilterComponent } from './filters/select-filter/select-filter.component';
import { TextFilterComponent } from './filters/text-filter/text-filter.component';
import { PanelFilterComponent } from './panel-filter/panel-filter.component';
import { SelectItemsFilterComponent } from './select-items-filter/select-items-filter.component';
import { ToolbarFilterComponent } from './toolbar-filter/toolbar-filter.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DateSimpleFilterComponent } from './filters/date-simple-filter/date-simple-filter.component';


@NgModule({
  declarations: [FilterBaseComponent, DateFilterComponent, DateSimpleFilterComponent, AdFilterCollapseDirective, AdFilterToggleDirective, TextFilterComponent, SelectFilterComponent, AutocompleteFilterComponent, RangeFilterComponent, SelectItemsFilterComponent, PanelFilterComponent, ToolbarFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    DividerModule,
    OverlayPanelModule,
    RadioButtonModule,
    CalendarModule,
    SidebarModule,
    CardModule,
    ToggleButtonModule,
    InputSwitchModule,
    ScrollPanelModule,
    ChipsModule,
    BadgeModule,
    MultiSelectModule,
    AutoCompleteModule,
    InputNumberModule,
    ChipModule,
    PanelModule,
    DropdownModule,
    InputMaskModule
  ],
  exports: [PanelFilterComponent, ToolbarFilterComponent],
  providers: [DatePipe]
})
export class SearchFilterModule { }
