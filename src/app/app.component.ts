import {Component} from '@angular/core';
import {TestComponentOneComponent} from './modules/test-component-one/test-component-one.component';

@Component({
    selector: 'app-root',
    template: `
        <h1>Create dinamyc component!</h1>
        <au-create [params]="params"
                   (onCreated)="onCreated();"></au-create>
    `
})
export class AppComponent {
    public params = {
        component: TestComponentOneComponent,
        params: {
            inputs: {
                inputParam: 'app-test-component-one - I am good component'
            },
            outputs: {
                outputParam: () => console.log('app-test-component-one - component')
            }
        }
    };

    onCreated() {
        console.log('app-test-component-one - I AM');
    }
}
