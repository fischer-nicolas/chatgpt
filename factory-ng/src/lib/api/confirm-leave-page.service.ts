import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';
import { FactoryNgConfig } from './factory-ng-config';
import { TranslationKeys } from './translationkeys';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeavePageService {

  constructor(
    private confirmationService: ConfirmationService,
    private config: FactoryNgConfig
  ) { }


  public confirmLeavePage(message?: string | null, header?: string | null, acceptLabel?: string | null, rejectLabel?: string | null): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.confirmationService.confirm({
        header: header ?? this.config.getTranslation(TranslationKeys.GENERAL_DISCARD_CHANGES),
        message: message ?? this.config.getTranslation(TranslationKeys.GENERAL_CONFIRM_LEAVE_PAGE),
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-mb-3',
        rejectButtonStyleClass: 'p-button-outlined p-mb-3',
        acceptLabel: acceptLabel ?? this.config.getTranslation(TranslationKeys.GENERAL_YES),
        rejectLabel: rejectLabel ?? this.config.getTranslation(TranslationKeys.GENERAL_NO),
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
