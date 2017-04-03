import Request from './Request';

export default class Filter
{
	public request: Request;

	private element: HTMLDivElement;
	/**
	 * Хранит тип текущего фильтра
	 */
	private type: string;
	/**
	 * То куда уходит запрос
	 */
	private urlRequest: string;
	/**
	 * Ответ из запроса
	 */
	private data: Array<Object>;
	/**
	 * То куда выводим
	 */
	private outpuElement: HTMLElement;
	/**
	 * Сборник фильтров
	 */
	private filterElements: NodeList;

	public constructor( div: HTMLDivElement ) //'div.filter.catalog'
	{
		this.element = div;
		this.data = [];
		this.type = div.getAttribute( 'data-type' );
		this.urlRequest = '/lib/filter/request.php';
		this.outpuElement = <HTMLElement>document.querySelector( 'div.filter.catalog+ul' );
		this.filterElements = <NodeList>div.querySelectorAll( 'div' );
		//this.outpuElement.innerHTML = '';

		this.request = new Request();
		let promise = new Promise<string>((resolve, reject) =>
		{
			resolve( this.request.createRequest( this.urlRequest , this.type ) );
		});
		promise
            .then(
				result =>
				{
					// первая функция-обработчик - запустится при вызове resolve

					this.data = JSON.parse(result);
					console.log('PROMISE!',this.data );
				},
				error =>
				{
					console.log("Rejected: " + error); // error - аргумент reject
				}
			);
		
		Array.prototype.forEach.call(
			this.filterElements,
			( item: HTMLDivElement ) =>
			{
				(<HTMLSelectElement>item.querySelector('select')).addEventListener( 'change', this.filterChangeSelectHandler.bind(this) );
			}
		);
		
		
	}
	
	private filterChangeSelectHandler( e: MouseEvent ):void
	{
		let stringRequest: string = '';
		let select: HTMLSelectElement;
		
		let promise = new Promise<string>((resolve, reject) =>
		{
			Array.prototype.forEach.call(
				this.filterElements,
				( item: HTMLDivElement ) =>
				{
					select = (<HTMLSelectElement>item.querySelector('select'));
					
					stringRequest += '&'+item.className+'='+select.value;
				}
			);
			resolve( this.request.createRequest( this.urlRequest , this.type, stringRequest ) );
		});
		promise
			.then(
				result =>
				{
					// первая функция-обработчик - запустится при вызове resolve
					
					this.data = JSON.parse(result);
					console.log('PROMISE!',this.data );
					this.outputView();
				},
				error =>
				{
					console.log("Rejected: " + error); // error - аргумент reject
				}
			);
	}
	
	private outputView():void
	{
		 // this.data //(<any>this.mass[i])['id']
		let i: number = 0;
		
		let li: HTMLLIElement;
		let a: HTMLAnchorElement;
		let img: HTMLImageElement;
		let div: HTMLDivElement;
		let h4: HTMLHeadingElement;
		
		this.outpuElement.innerHTML = '';
		
		for ( i = 0; i < this.data.length; i++)
		{
			li = <HTMLLIElement>document.createElement( 'LI' );
			li.setAttribute( "data-id", (<any>this.data[ i ])[ 'id' ] );
			li.setAttribute( "data-article", (<any>this.data[ i ])[ 'article' ] );
			li.setAttribute( "data-title", (<any>this.data[ i ])[ 'title' ] + "(" + (<any>this.data[ i ])[ 'v' ] + " л.)" + (<any>this.data[ i ])[ 'sae' ] );
			li.setAttribute( "data-price", (<any>this.data[ i ])[ 'price' ] );
			
			a = <HTMLAnchorElement>document.createElement( 'a' );
			a.classList.add( "img" );
			a.href = '/catalog/' + this.type + '/' + (<any>this.data[ i ])[ 'url' ];
			img = <HTMLImageElement>document.createElement( 'img' );
			img.src = '/images/' + this.type + '_images/' + (<any>this.data[ i ])[ 'img' ];
			a.appendChild( img );
			li.appendChild( a );
			
			div = <HTMLDivElement>document.createElement( 'div' );
			div.classList.add( 'price' );
			div.innerText = (<any>this.data[ i ])[ 'price' ];
			li.appendChild( div );
			
			a = <HTMLAnchorElement>document.createElement( 'a' );
			h4 = <HTMLHeadingElement>document.createElement( 'h4' );
			h4.innerText = (<any>this.data[ i ])[ 'title' ] + "(" + (<any>this.data[ i ])[ 'v' ] + " л.)" + (<any>this.data[ i ])[ 'sae' ];
			a.classList.add( "title" );
			
			a.appendChild( h4 );
			li.appendChild( a );
			
			
			div = <HTMLDivElement>document.createElement( 'div' );
			div.classList.add( 'add-basket' );
			div.innerHTML = '<button class="add-basket" type="button">В корзину</button>';
			li.appendChild( div );
			
			a = <HTMLAnchorElement>document.createElement( 'a' );
			a.classList.remove( "title" );
			a.classList.add( "edit" );
			
			a.innerHTML = 'Редактировать';
			a.href = '/admin/product/' + this.type + '/edit/' + (<any>this.data[ i ])[ 'id' ];
			li.appendChild( a );
			
			this.outpuElement.appendChild( li );
		}
	
			
	}


}