
/// <reference path="../classes/jquery.d.ts" />
declare let $: any;

export default function init(): void
{
	
	
	const ACTIVE = 'active';
	const ID: string = '115002625749';
	
	let currentSpoiler: HTMLLIElement;
	let container: HTMLDivElement = <HTMLDivElement>document.querySelector( 'body>main>div.container' );
	let reg: RegExp = /([0-9A-Za-z-+=.]{1,})\/subscription$/;
	let reg2: RegExp = /^[0-9]{1,}/;
	let match: Array<string>;
	let match2: Array<string>;
	
	if ( container )
	{
		//console.log('container',container);
		container.setAttribute( 'id', 'building-page' );
		//console.log('container',container);
		let anchorElement: HTMLDivElement = <HTMLDivElement>container.querySelector( 'div.article-container>article.article>header.article-header>a.article-unsubscribe' );
		//console.log('anchorElement',anchorElement);
		//console.log('match',anchorElement.getAttribute( 'href' ));
		match = anchorElement.getAttribute( 'href' ).match( reg );
		//console.log('match',anchorElement.getAttribute( 'href' ),anchorElement.getAttribute( 'href' ).match( reg ) );
		match2 = match[1].match( reg2 );
		
		console.log( match2[0] );
		
		if ( match2[0] == ID )
		{
			let spoilerList: NodeList;
			
			spoilerList = <NodeList>container.querySelectorAll( 'ul#accordion>li' );
			
			Array.prototype.forEach.call(
				spoilerList,
				( item: HTMLLIElement ) =>
				{
					item.addEventListener( 'click', spoilerListClickHandler.bind(this) );
					currentSpoiler = item;
				}
			);
			
			$('#general').collapse({
				parent: true,
				toggle: true
			});
		}
	}
	
	function spoilerListClickHandler( e: MouseEvent ): void
	{
		if ( currentSpoiler.classList.contains( ACTIVE ) )
		{
			currentSpoiler.classList.remove( ACTIVE );
		}
		
		currentSpoiler = (<HTMLLIElement>e.currentTarget);
		
		currentSpoiler.classList.add( ACTIVE );
	}
	
	
	
}