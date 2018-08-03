import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuCreateComponent} from './au-create-component';
import {AuCreateService} from './au-create.service';

@NgModule({
    declarations: [AuCreateComponent],
    exports: [AuCreateComponent],
    imports: [CommonModule],
    providers: [AuCreateService]
})
export class AuDynamicComponentModule {
}
