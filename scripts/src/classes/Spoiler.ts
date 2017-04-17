


const ACTIVE = 'active';

/**
 * Класс работы со спойлерами.
 */
export default class Spoiler
{
	/**
	 * Список всех спойлеров
	 */
	private spoilerList: NodeList;
	
	/**
	 * Хранит активный текущий спойлер
	 */
	private currentSpoiler: HTMLLIElement;
	
	
	public constructor( element: HTMLElement )
	{
		this.spoilerList = <NodeList>element.querySelectorAll( 'li>ul>li' );
		
		Array.prototype.forEach.call(
			this.spoilerList,
			( item: HTMLLIElement ) =>
			{
				if ( !this.currentSpoiler )
				{
					this.currentSpoiler = item;
				}
				
				item.addEventListener( 'click', this.spoilerListClickHandler.bind(this) );
			}
		);
	}
	
	private spoilerListClickHandler( e: MouseEvent ):void
	{
		if ( this.currentSpoiler.classList.contains( ACTIVE ) )
		{
			this.currentSpoiler.classList.remove( ACTIVE );
		}
		
		this.currentSpoiler = (<HTMLLIElement>e.currentTarget);
		
		this.currentSpoiler.classList.add( ACTIVE );
		
		/*$( (<HTMLLIElement>e.currentTarget).querySelector('div.content')).slideToggle(200);
		$( (<HTMLLIElement>e.currentTarget).querySelector('div.content>p')).slideToggle(200);*/
	}
}