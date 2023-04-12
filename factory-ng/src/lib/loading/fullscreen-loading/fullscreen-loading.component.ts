import { Component } from '@angular/core';
import { LOADING_SIZES } from '../loading-sizes.model';

@Component({
  selector: 'app-fullscreen-loading',
  templateUrl: './fullscreen-loading.component.html',
  styleUrls: ['./fullscreen-loading.component.scss']
})
export class FullscreenLoadingComponent {

  sizeConfiguration = LOADING_SIZES.large;

  constructor() { }

}
