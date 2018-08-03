import {
    Component,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

import {AuCreateService, AuDinamycComponentInterface} from './au-create.service';


/**
 * Component to create any dynamic components
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'au-create',
    template: `<ng-container *ngComponentOutlet="section.component; ngModuleFactory: section.module;"></ng-container>`
})

export class AuCreateComponent implements OnChanges {
    /**
     * Parameters for the component to be created
     */
    @Input() params: AuDinamycComponentInterface;
    /**
     * it will call after the component is created
     * @type {EventEmitter<any>}
     */
    @Output() onCreated = new EventEmitter<any>();

    public section;

    constructor(private _createService: AuCreateService) {
    }

    ngOnChanges() {
        this.section = this._createService.create(this.params);
        this.onCreated.emit(this.section);
    }
}
