import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingSizeConfiguration, LOADING_SIZES } from '../loading-sizes.model';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingSpinnerComponent {

  @Input() sizeConfiguration: LoadingSizeConfiguration = LOADING_SIZES.medium;
  @Input() inverted: boolean = false;
  
  get styleClass(): string {
    return `loading-spinner ${this.sizeConfiguration.className} ${this.inverted ? ' loading-inverted' : ''}`;
  };

  constructor() { }

}
