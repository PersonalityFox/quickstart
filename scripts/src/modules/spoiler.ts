import Spoiler from '../classes/Spoiler';

export default function init(): void
{
	let spoiler: Spoiler;
	let elemSpoiler: HTMLElement;
	elemSpoiler = <HTMLElement>document.querySelector( 'section.faq.tabs>ul.content' );
	
	if ( elemSpoiler )
	{
		spoiler = new Spoiler( elemSpoiler );
	}
	else
	{
		elemSpoiler = <HTMLElement>document.querySelector( 'section.faq.tabs>ul.content' );
	}
	
	
}