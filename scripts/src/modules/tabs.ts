import Tabs from '../classes/Tabs';

export default function init(): void
{
	let tabs: Tabs;
	let elemTabs: HTMLElement;
	elemTabs = <HTMLElement>document.querySelector( 'section.faq.tabs' );
	
	if ( elemTabs )
	{
		tabs = new Tabs( elemTabs );
	}
	
	
}