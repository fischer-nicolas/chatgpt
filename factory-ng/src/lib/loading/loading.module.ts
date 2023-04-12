import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingComponent } from './loading.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FullscreenLoadingComponent } from './fullscreen-loading/fullscreen-loading.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false
};


@NgModule({
  declarations: [
    LoadingComponent,
    LoadingSpinnerComponent,
    FullscreenLoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  exports: [
    LoadingComponent,
    LoadingSpinnerComponent,
    FullscreenLoadingComponent
  ]
})
export class LoadingModule { }
