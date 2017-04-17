import GetBilling from '../classes/GetBilling';

export default function init(): void
{
	let getBilling: GetBilling;
	let elem: HTMLElement;
	elem = <HTMLElement>document.querySelector( 'section.billing' );
	
	if ( elem )//faq.tabs ul.information>li.billing>button
	{
		getBilling = new GetBilling( elem );
	}
	
	
}