# Component-component
... a dynamic way of inserting components in Angular

It's a component that renders a component based from an input, so you can use it to render a component that you won't know before runtime. 

Be aware that if the components aren't referenced from a template anywhere else, you need to add them to your ngModules entryComponents so they wont be shaken away from the bundle. 

## Pull-request or issues welcome
Feel free to use this as is... PRs or issues are appreciated!

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

Or you can use it in a repeater even more dynamiccally

```ts
import { GalleryComponent, TextComponent } from '...';
@Component({
	template: `
	<h1>Dynamic list</h1>
	<component *ngFor="let block of contentBlocks" [component]="block.cmp" [inputs]="block.images"></component>
	`
})
export class HasDynamicListOfContentComponent {
	contentBlocks = [{
		cmp: GalleryComponent,
		data: {
			images: /* list of images*/
		}
	},{
		cmp: TextComponent,
		data: {
			text: 'hello world'
		}
	}];
}


