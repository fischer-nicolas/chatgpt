import { Injectable } from '@angular/core';
import { Translation } from './translation';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FactoryNgConfig {

    private translation: Translation = {
        recordFound: 'registro encontrado',
        recordsFound: 'registros encontrados',
        noRecordsFound: 'No hay registros para la consulta',
        actions: 'Acciones',
        columns: 'Columnas',
        frozenColumns: 'Columnas a congelar a la izquierda',
        apply: 'Aplicar',
        error:'Error' ,
        alreadyModifiedRecord:'El registro que desea modificar ya ha sido modificado. Actualice (F5) la pantalla y reintente la operación',
        requiredFieldsMissing:'Quedan campos requeridos por completar' ,
        defaultError:'Ocurrió un error. Intente más tarde',
        discardChanges: 'Descartar cambios',
        confirmLeavePage: '¿Desea abandonar esta página? Se perderán los cambios sin guardar.',
        yes: 'Sí',
        no: 'No',
        //FilterTranslation
        filters: 'Filtros',
        collapseAll: "Colapsar todos",
        clearFilters: 'Limpiar filtros',
        cancelar: "Cancelar",
        minimum: 'Mínimo',
        maximum: 'Máximo',
        from: 'Desde',
        to: 'Hasta',
        todayRange: "Hoy",
        yesterdayRange: "Ayer",
        last7DaysRange: "Últimos 7 días",
        last30DaysRange: "Últimos 30 días",
        currentMonth: "Este mes",
        lastMonth: "Mes pasado",
        customRange: "Custom",
        select: 'Seleccionar'
    }

    private translationSource = new Subject<any>();

    translationObserver = this.translationSource.asObservable();

    getTranslation(key: string) {
        return this.translation[key];
    }

    setTranslation(value: Translation) {
        this.translation = {...this.translation, ...value};
        this.translationSource.next(this.translation);
    }

}