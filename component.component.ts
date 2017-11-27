import { 
    Component, 
    ViewContainerRef, 
    ComponentFactoryResolver, 
    Input, 
    OnChanges,
    ChangeDetectionStrategy, 
    ComponentRef,
    EventEmitter } from '@angular/core';

@Component({
    selector: 'component',
    template: ' ' /* Cannot be empty */
})
export class ComponentComponent implements OnChanges, OnDestroy {
    @Input() private component;

    @Input() private inputs: { [name: string]: any } = {};
    @Input() private outputs?: { [name: string]: any };
    
    private subscriptions: { [name: string]: Subscription } = {};
    private _component: ComponentRef<any>;

	constructor(
		private _vcRef: ViewContainerRef, 
		private _cfResolver: ComponentFactoryResolver
    ) { }

	ngOnChanges(changes) {
        if(changes['component'].currentValue) {
            this._vcRef.clear();
            const cf = this._cfResolver.resolveComponentFactory<any>(this.component);
            this._component = this._vcRef.createComponent(cf);
        }

        if(changes['inputs'].currentValue || changes['component'].currentValue) {
            Object.keys(this.inputs).forEach(key => {
                this._component.instance[key] = this.inputs[key];
            });
        }

        if((changes['outputs'] && changes['outputs'].currentValue && this._component) || (changes['component'] && changes['component'].currentValue && this.outputs)) {
            const newOutputs = Object.keys(this.outputs).filter(key => !this.subscriptions[key]);
            const removedOutputs = Object.keys(this.subscriptions).filter(key => !this.outputs[key]);

            newOutputs.forEach(key => {
                if (this._component.instance.hasOwnProperty(key) && this._component.instance[key] instanceof EventEmitter) {
                    this.subscriptions[key] = this._component.instance[key].subscribe(data =>{
                        this.outputs[key](data);
                    });
                }
            });

            removedOutputs.forEach(key => {
                this.subscriptions[key].unsubscribe();
                delete this.subscriptions[key];
            })
        }
    }
    
    ngOnDestroy() {
        Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
    }
}