import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { OrderComponent } from './components/order/order.component';
import { TableConfigurationComponent } from './components/table-configuration/table-configuration.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CellGridPipe } from './pipes/cell-grid.pipe';
import { LoadingModule } from '../loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [GridComponent,OrderComponent,TableConfigurationComponent,CellGridPipe],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TooltipModule,
    ButtonModule,
    TableModule,
    OverlayPanelModule,
    DividerModule,
    CheckboxModule,
    RadioButtonModule,
    LoadingModule,
    SkeletonModule
  ],
  exports: [GridComponent, CellGridPipe],
  providers: [CellGridPipe]
})
export class GridModule { }
