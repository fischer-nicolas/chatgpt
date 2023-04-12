import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { FactoryNgConfig } from './factory-ng-config';
import { TranslationKeys } from './translationkeys';

export enum MessageKeys { CUSTOMERS, MODELS, VEHICLE_BRANDS };

/**Lifespan (ms) defined for toast components */
export const TOASTS_LIFESPAN = 5000;

/**Time (seconds) before the same message can be displayed on the screen again */
export const SAME_MESSAGE_INTERVAL = 30


@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {
  constructor(
    private messageService: MessageService,
    private config:FactoryNgConfig    
  ) {}

  /**_messages prevents showing two messages with the same id simultaneously (a time interval must elapse before showing the second one) */
  private _messages = {};
  private addMessage(id: string){
    this._messages[id] = new Date();
  }
  private shouldShowMessage(id: string) : boolean {
    if(!id) {
      return true;
    }
    //Verify that the interval has elapsed for the entry with the given id
    let dateLimit = new Date();
    dateLimit.setSeconds(dateLimit.getSeconds() - SAME_MESSAGE_INTERVAL);
    return !(this._messages && this._messages[id] && this._messages[id] > dateLimit);
  }


  showSuccess(summary: string, detail: string){
    this.messageService.add({​​​​​
      severity: 'success',
      summary: summary,
      detail: detail,
      life: TOASTS_LIFESPAN
    }​​​​​);
  }


  showError(message: string, id?: any) {
    if(this.shouldShowMessage(id)){
      this.addMessage(id);
      this.messageService.add({
        severity: 'error',
        summary: this.config.getTranslation(TranslationKeys.MSG_ERROR),
        detail: message,
        life: TOASTS_LIFESPAN,
        id: id
      });
    }
  }


  showWarning(summary: string, detail: string){
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
      life: TOASTS_LIFESPAN
    });
  }


  handleError(error, defaultMessage?: string) {
    switch (error.status) {
        case 401: 
            this.handleUnauthorized(error);
            break;
        case 409:
            this.showError(this.config.getTranslation(TranslationKeys.MSG_ALREADY_MODIFIED_RECORD));
            break;
        case 422:
            this.showError(this.config.getTranslation(TranslationKeys.MSG_REQUIRED_FIELDS_MISSING));
            break;
        default:
            this.showError(defaultMessage ?? this.config.getTranslation(TranslationKeys.MSG_DEFAULT_ERROR));
            break;
    }

    return throwError(error);
  }


  showErrorAndThrow(error, message: string, id?: any) {
    if(error.status === 401) {
      return this.handleUnauthorized(error);
    } 
    this.showError(message, id);
    return throwError(error);
  }


  handleUnauthorized(error) {
    //this.oidcSecurityService.authorize();
    return throwError(error);
  }

}
