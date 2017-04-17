export default function init(): void
{
	let elFade: HTMLElement = <HTMLElement>document.querySelector( 'div.overflow' );
	let section: HTMLElement = <HTMLElement>document.querySelector( 'section[data-type="background"]' );
	
	if ( section )
	{
		document.addEventListener( 'scroll', eachElement.bind(this) );
	}
	
	

	function eachElement()
	{
		let scrTop: number = Number(window.pageYOffset);
		let yPos: number = -( scrTop / Number(section.getAttribute('data-speed')) );
		
		let opacity = Number(scrTop / section.scrollHeight);
		
		// Your code here
		//div.overflow
		// Put together our final background position
		let coords = '50% ' + yPos + 'px';
		elFade.style.opacity = String(opacity);/* >= 1 ? 1 : opacity*/
		
		// Move the background
		section.style.backgroundPosition = coords;
	}
}