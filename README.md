# Component-component
... a dynamic way of inserting components in Angular

It's a component that renders a component based from an input, so you can use it to render a component that you won't know before runtime. 

Be aware that if the components aren't referenced from a template anywhere else, you need to add them to your ngModules entryComponents so they wont be shaken away from the bundle. 

## Inputs
Component: a ComponentClass that you want displayed 

Inputs: a hash of inputs and their values

## How to use
```html
    <component [component]="cmp" [inputs]="inp"></component>
```

## Example usage
```ts
import { Component1, Component2 } from '...';
@Component({
    template: `
    <h1>This is dynamic...</h1>
    <component [component]="cmp" [inputs]="inp"></component>
    `
})
export class HasDynamicContentComponent {
	public cmp;
	public inp = {};

	ngOnInit() {
        this.cmp = someCondition ? Component1 : Component2;
        this.inp['data'] = data;
	}
}
```

