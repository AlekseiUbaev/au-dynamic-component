# AuDynamicComponent

au-dynamic-component allows you to create components for angular "on the fly", takes an unlimited number of parameters of any type.

# Installation

```
npm i au-dynamic-component --save
```

# example of use

## step 1

connect AuDynamicComponentModule to the module which will use it

```
import { AuDynamicComponentModule } from 'au-dynamic-component';
```

```
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuDynamicComponentModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
```

## step 2

create a component that will be created dynamically


```
@Component({
    selector: 'app-test-component-one',
    template: `
        <h3 (click)="outputParam.emit();">TestComponentOneComponent = <b style="color: green">{{ inputParam }}</b></h3>
    `
})
export class TestComponentOneComponent implements OnInit {

    @Input() inputParam: string;
    @Output() outputParam = new EventEmitter<any>();

    ngOnInit() {
        console.log('app-test-component-one - good');
    }
}
```

## step 3

connect this component to your module, 
be sure to specify the component in entryComponents
> entryComponents: [TestComponentOneComponent]
```
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
```

## step 4

now you can use the `au-create` component or the `AuCreateService` service to create your dynamic components.

```
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
                inputParam: 'I am good component'
            },
            outputs: {
                outputParam: () => console.log('app-test-component-one - component')
            }
        }
    };

    onCreated() {
        console.log('app-test-component-one -  I am');
    }
}
```

# component au-create

The component accepts parameters:

```
{
        *an instance of a dynamically created component : ComponentRef<any>*
        component: TestComponentOneComponent,
        params?: {
            *incoming parameters for a component. any: @Input()*
            inputs: {
                inputParam: 'I am good component'
            },
            *output parameters for component. any: @Output()*
            outputs: {
                outputParam: () => console.log('app-test-component-one - component')
            }
        }
    }
```