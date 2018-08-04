import {Injectable, Compiler, NgModule, Component, EventEmitter, ComponentRef} from '@angular/core';

import {NgxComponentOutletModule} from 'ngx-component-outlet';

/**
 *
 * component : {ComponentRef<any>} component, an instance of a dynamic component
 * params: parameters for a component, for example:
 *              {
     *                  name: String,
     *                  old: Number,
     *                  onUpdate: () => {console.log('I am updated!');}
     *              }
 * isRegistered: {boolean}, Whether the component is registered in any module
 */
export interface AuNgDynamicServiceInterface {
    component: ComponentRef<any>;
    params?: { inputs?: object, outputs?: object };
    isRegistered?: boolean;
}

/**
 * Creates a new module,
 * Which contains all the necessary parameters to call the dynamic component.
 */
@Injectable()
export class AuNgDynamicService {

    /**
     * prefix to avoid duplicating the same component selectors
     */
    private _prefix = 0;

    constructor(private _compiler: Compiler) {
    }

    create(options: AuNgDynamicServiceInterface): any {
        const data = this._getPreparedParams(options.params),
            currentComponent = this._createComponent(options.component, data),
            hostComponent = this._createHostComponent(data),
            includedСomponents = [];

        includedСomponents.push(currentComponent, hostComponent);

        this._prefix++;

        if (options.isRegistered === false) {
            includedСomponents.push(options.component);
        }

        return {
            component: currentComponent,
            module: this._compiler.compileModuleSync(NgModule({
                imports: [NgxComponentOutletModule.forRoot()],
                declarations: includedСomponents,
                entryComponents: includedСomponents
            })(class {
            }))
        }
    }

    /**
     * Component layer necessary for the correct work of the --- ngxComponentOutlet
     */
    private _createHostComponent(data) {
        return Component({
            selector: 'au-' + this._prefix + '-host',
            template: ``,
            inputs: data.inputsKeys,
            outputs: data.outputsKeys
        })(class {
                constructor() {
                    /**
                     * You need to set an event subscription
                     */
                    data.outputsKeys.forEach(OutputName => {
                        this[OutputName] = new EventEmitter<any>();
                        this[OutputName].subscribe(() => data.outputs[OutputName]());
                    })
                }
            }
        )
    }

    /**
     * Generates a template for the dummy component, for ngxComponentOutlet
     */
    private _generateTemplate(data) {
        let temp = '<au-' + this._prefix + '-host [ngxComponentOutlet]="componentInstance"';
        data.inputsKeys.forEach(input => temp += ' [' + input + ']="inputs.' + input + '"');
        data.outputsKeys.forEach(output => temp += ' (' + output + ')="outputs.' + output + '"');
        return temp + '></au-' + this._prefix + '-host>';
    }

    /**
     * The component is used in the layer component to call ngxComponentOutlet
     */
    private _createComponent(component, data) {
        return Component({
            selector: component.name + '-convenient',
            template: this._generateTemplate(data)
        })(class {
            componentInstance = component;
            inputs = data.inputs;
            outputs = data.outputs;
        });
    }

    /**
     * Sorts the passed parameters into a component on
     * 1 "Input"(@Input() name)
     * 2 "Output"(@Output() onInit = new EventEmiiter<any>();)
     */
    private _getPreparedParams(params) {
        const inputsKeys = [], inputs = {}, outputsKeys = [], outputs = {};

        if (params) {
            if (params.inputs) {
                Object.keys(params.inputs).forEach(p => inputsKeys.push(p));
            }
            if (params.outputs) {
                Object.keys(params.outputs).forEach(p => outputsKeys.push(p));
            }
        }
        return {
            inputsKeys: inputsKeys,
            inputs: params.inputs,
            outputsKeys: outputsKeys,
            outputs: params.outputs
        }
    }
}
