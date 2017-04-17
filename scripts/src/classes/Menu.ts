export default class Menu
{
	private elementList: HTMLUListElement;
	private closeButton: HTMLButtonElement;
	private background: HTMLDivElement;
	private body: HTMLBodyElement;
	
	public constructor( element: HTMLSpanElement )
	{
		this.elementList = <HTMLUListElement>document.querySelector( 'ul.user-nav' );
		this.closeButton = <HTMLButtonElement>document.querySelector( 'button.close-menu' );
		
		this.background = <HTMLDivElement>document.querySelector( 'div.background' );
		this.body = <HTMLBodyElement>document.querySelector( 'body' );
		
		if ( !this.background )
		{
			this.background = document.createElement( 'div' );
			this.background.classList.add( 'background' );
			
			this.body.appendChild( this.background );
		}
		
		element.addEventListener( 'click', this.elementClickHandler.bind(this) );
		this.closeButton.addEventListener( 'click', this.closeButtonClickHandler.bind(this) );
		this.background.addEventListener( 'click', this.closeButtonClickHandler.bind(this) );
	}
	
	private elementClickHandler( e:  MouseEvent ):void
	{
		this.elementList.classList.toggle('show');
		this.background.classList.toggle('show');
		this.body.parentElement.classList.add( 'lightbox' );
	}
	
	private closeButtonClickHandler( e:  MouseEvent ):void
	{
		this.elementList.classList.remove('show');
		this.background.classList.remove('show');
		this.body.parentElement.classList.remove( 'lightbox' );
	}
}