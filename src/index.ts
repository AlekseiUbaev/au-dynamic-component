import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuNgDynamicComponent} from './aung-dynamic.component';
import {AuNgDynamicService} from './aung-dynamic.service';

export * from './aung-dynamic.component';
export * from './aung-dynamic.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AuNgDynamicComponent
    ],
    exports: [
        AuNgDynamicComponent
    ],
    providers: [AuNgDynamicService]
})
export class AuNgDynamicModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuNgDynamicModule,
            providers: [AuNgDynamicService]
        };
    }
}
