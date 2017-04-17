const ACTIVE = 'active';

/**
 * Класс работы с табами.
 */
export default class Tabs
{
	/**
	 * Список всех табов
	 */
	private tabsButtonList: NodeList;
	//private tabsSelectList: HTMLSelectElement;
	private typePage: boolean;
	
	/**
	 * Хранит активный текущий таб
	 */
	private currentButtonTabs: HTMLLIElement;
	
	
	/**
	 * Список всех контентов
	 */
	private contentList: NodeList;
	/**
	 * Хранит активный текущий контент
	 */
	private currentContent: HTMLLIElement;
	
	public constructor( element: HTMLElement )
	{
		this.typePage = false;
		this.tabsButtonList = <NodeList>element.querySelectorAll( 'ul.tabs>li>button' );
		//this.tabsSelectList = <HTMLSelectElement>element.querySelector( 'select.button-list' );
		this.contentList = <NodeList>element.querySelectorAll( 'ul.content>li' );
		
		Array.prototype.forEach.call(
			this.tabsButtonList,
			( item: HTMLButtonElement ) =>
			{
				item.addEventListener( 'click', this.tabsButtonListClickHandler.bind(this) );
			}
		);
		//this.tabsSelectList.addEventListener( 'change', this.tabsSelectListChangeHandler.bind(this) );
		
		this.currentButtonTabs = <HTMLLIElement>(<HTMLButtonElement>this.tabsButtonList[0]).parentElement;
		this.currentContent = (<HTMLLIElement>this.contentList[0]);
		
		// Проверяем текущую страницу
		if ( element.hasAttribute( 'data-page' ) )
		{
			this.typePage = true;
			this.setClassesWithRequestPage( <HTMLLIElement>element.querySelector( 'ul.tabs>li.support' ), <HTMLLIElement>element.querySelector( 'ul.content>li.support' ) );
		}
	}
	private setClassesWithRequestPage( tab: HTMLLIElement, content: HTMLLIElement ):void
	{
		this.currentButtonTabs.classList.remove( ACTIVE );
		this.currentContent.classList.remove( ACTIVE );
		this.currentButtonTabs = tab;
		this.currentContent = content;
		this.currentButtonTabs.classList.add( ACTIVE );
		this.currentContent.classList.add( ACTIVE );
		
		// Т.к. нет доступа к html, накидаем классы input'ам
		Array.prototype.forEach.call(
			document.querySelectorAll( 'form input,form textarea' ),
			( item: HTMLInputElement ) =>
			{
				item.classList.add( 'form-control' );
			}
		);
	}
	/*public tabsSelectListChangeHandler( e: MouseEvent ):void
	{
		let id: string = '0';
		let title: string = (<HTMLSelectElement>e.currentTarget).value;
		
		this.currentButtonTabs.classList.remove( ACTIVE );
		this.currentContent.classList.remove( ACTIVE );
		
		Array.prototype.forEach.call(
			this.tabsSelectList,
			( item: HTMLElement ) =>
			{
				if ( item.innerText === title )
				{
					id =  item.getAttribute( 'data-tab' );
					item.classList.add( ACTIVE );
					//this.currentContent = item;
				}
			}
		);
		/!*console.log(this.typePage, id,this.currentContent);
		if ( ( this.typePage === false ) && ( id == '3' ) )
		{
			window.location.href = "https://royal-cs.zendesk.com/hc/en-us/requests/new";
		}*!/
		
		Array.prototype.forEach.call(
			this.contentList,
			( item: HTMLLIElement ) =>
			{
				if ( item.getAttribute( 'data-tab' ) === id )
				{
					item.classList.add( ACTIVE );
					this.currentContent = item;
				}
			}
		);
		
	}*/
	
	private tabsButtonListClickHandler( e: MouseEvent ):void
	{
		this.currentButtonTabs.classList.remove( ACTIVE );
		this.currentContent.classList.remove( ACTIVE );
		
		this.currentButtonTabs = <HTMLLIElement>(<HTMLButtonElement>e.currentTarget).parentElement;
		
		this.currentButtonTabs.classList.add( ACTIVE );
		
		/*if ( this.currentButtonTabs.getAttribute( 'data-tab' ) == '3' )
		{
			window.location.href = "https://royal-cs.zendesk.com/hc/en-us/requests/new";
		}*/
		
		Array.prototype.forEach.call(
			this.contentList,
			( item: HTMLLIElement ) =>
			{
				if ( item.getAttribute( 'data-tab' ) === this.currentButtonTabs.getAttribute( 'data-tab' ) )
				{
					item.classList.add( ACTIVE );
					this.currentContent = item;
				}
			}
		);
	}
}