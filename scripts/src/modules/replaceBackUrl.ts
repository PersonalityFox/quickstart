import ReplaceBackUrl from '../classes/ReplaceBackUrl';

export default function init(): void
{
	let replaceBackUrl: ReplaceBackUrl;
	let link: HTMLElement;
	
	link = <HTMLElement>document.querySelector( 'ul.user-nav>li.back>a' );
	
	if ( link )
	{
		replaceBackUrl = new ReplaceBackUrl( link );
	}
	
	
}