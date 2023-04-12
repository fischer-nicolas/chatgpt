import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoadingSizeConfiguration, LOADING_SIZES } from './loading-sizes.model';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, AfterViewInit {
  
  @ViewChild('loadingContainer') loadingContainer: ElementRef<any>;

  @Input() sizeConfiguration: LoadingSizeConfiguration;
  @Input() size: ('large' | 'lg' | 'medium' | 'md'  | 'small' | 'sm' | 'xsmall' | 'xs') = 'md';
  @Input() showBackdrop: boolean = false;
  @Input() inverted: boolean = false;
  @Input() logoSize: number;

  loaderId: string;
  sizePx: number;
  
  constructor(private loadingService: NgxUiLoaderService) { }
  

  ngOnInit(): void {
    this.initSize();

    this.loaderId = Math.random().toString();
    this.loadingService.startLoader(this.loaderId);
  }


  ngAfterViewInit(): void {
    this.sizePx = this.loadingContainer.nativeElement.offsetHeight;    
  }


  private initSize() {
    if (this.size && !this.sizeConfiguration) {
      switch (this.size) {
        case 'large':
        case 'lg':
          this.sizeConfiguration = LOADING_SIZES.large;
          break;
        case 'medium':
        case 'md':
          this.sizeConfiguration = LOADING_SIZES.medium;
          break;
        case 'small':
        case 'sm':
          this.sizeConfiguration = LOADING_SIZES.small;
          break;
        case 'xsmall':
        case 'xs':
          this.sizeConfiguration = LOADING_SIZES.xsmall;
          break;
      }
    }
  }

}
