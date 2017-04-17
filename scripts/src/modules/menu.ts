import Menu from '../classes/Menu';

export default function init(): void
{
	let menu: Menu;
	let elemButton: HTMLSpanElement;
	elemButton = <HTMLSpanElement>document.querySelector('span.icon-menu');
	
	if ( elemButton )
	{
		menu = new Menu( elemButton );
	}
	
	
}