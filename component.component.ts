import { 
    Component, 
    ViewContainerRef, 
    ComponentFactoryResolver, 
    Input, 
    OnChanges,
    ChangeDetectionStrategy, 
    ComponentRef } from '@angular/core';

@Component({
    selector: 'component',
    template: ' ' /* Cannot be empty */
})
export class ComponentComponent implements OnChanges {
    @Input() 
    private component;

    @Input() 
    private inputs: { [name:string]: any } = {};
    
    private _component: ComponentRef<any>;

	constructor(
		private _vcRef: ViewContainerRef, 
		private _cfResolver: ComponentFactoryResolver
	) { }

	ngOnChanges(changes) {
        if(changes['component']) {
            this._vcRef.clear();
            const cf = this._cfResolver.resolveComponentFactory<any>(this.component);
            this._component = this._vcRef.createComponent(cf);
        }
        if(changes['inputs'] || changes['component']) {
            Object.keys(this.inputs).forEach(key => {
                this._component.instance[key] = this.inputs[key];
            });
        }
	}
}