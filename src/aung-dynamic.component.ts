import {
    Component,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

import {AuNgDynamicService, AuNgDynamicServiceInterface} from './aung-dynamic.service';


/**
 * Component to create any dynamic components
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'au-create',
    template: `
        <ng-container *ngComponentOutlet="section.component; ngModuleFactory: section.module;"></ng-container>`
})

export class AuNgDynamicComponent implements OnChanges {
    /**
     * Parameters for the component to be created
     */
    @Input() params: AuNgDynamicServiceInterface;
    /**
     * it will call after the component is created
     */
    @Output() onCreated = new EventEmitter<any>();

    public section;

    constructor(private _DynamicService: AuNgDynamicService) {
    }

    ngOnChanges() {
        this.section = this._DynamicService.create(this.params);
        this.onCreated.emit(this.section);
    }
}
