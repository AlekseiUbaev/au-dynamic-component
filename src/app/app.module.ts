import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuDynamicComponentModule} from '../../au-dynamic-component/module';
import {AppComponent} from './app.component';
import {TestComponentOneComponent} from './modules/test-component-one/test-component-one.component';

@NgModule({
    declarations: [
        AppComponent,
        TestComponentOneComponent
    ],
    imports: [
        BrowserModule,
        AuDynamicComponentModule
    ],
    providers: [],
    entryComponents: [TestComponentOneComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
