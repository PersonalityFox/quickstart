import GetArticles from '../classes/GetArticles';

export default function init(): void
{
	let getArticles: GetArticles;
	let elemButton: HTMLElement;
	elemButton = <HTMLElement>document.querySelector('section.faq.tabs');
	
	if ( elemButton )
	{
		getArticles = new GetArticles( elemButton );
	}
	
	
}