import Request from './Request';
import Spoiler from './Spoiler'

/// <reference path="jquery.d.ts" />
declare let $: any;


export default class GetArticles
{
	//private elementList: HTMLUListElement;
	private request: Request;
	private spoiler: Spoiler;
	private element: HTMLElement;
	
	/**
	 * Храним урл для запроса
	 */
	private url: string;
	
	/**
	 * Пришедшие данные
	 */
	private data: Object;
	
	/**
	 * Список со всем контентом
	 */
	private content: HTMLUListElement;
	
	public constructor( element: HTMLElement )
	{
		//this.elementList = <HTMLUListElement>document.querySelector( 'ul.user-nav' );
		this.element = element;
		this.request = new Request;
		
		this.content = <HTMLUListElement>element.querySelector( 'ul.content' );
		
		this.url = 'https://royal-cs.zendesk.com/api/v2/help_center/en-us/articles.json';
		
		this.getData();
		
		///this.spoiler = new Spoiler;
		
		//console.log($('div.content'));
	}
	
	public getData( ):void
	{
		this.data = JSON.parse( this.request.createRequest( this.url, 'GET' ) );
		
		this.pushData();
		
		//this.spoiler = new Spoiler( this.element );
		
		$('#general').collapse({
			parent: true,
			toggle: true
		});
		
		this.setOneOpenAtATime();
	}
	
	private pushData():void
	{
		let li: HTMLLIElement;
		let ulGeneral: HTMLUListElement;
		let ulMembership: HTMLUListElement;
		let ulTechnical: HTMLUListElement;
		let ulVr: HTMLUListElement;
		
		const id_general: number = 115000453405; //https://royal-cs.zendesk.com/hc/admin/sections/115000453405/edit
		const id_membership: number = 115000446869; //https://royal-cs.zendesk.com/hc/admin/sections/115000446869/edit
		const id_technical: number = 115000446929;//https://royal-cs.zendesk.com/hc/admin/sections/115000446929/edit
		const id_vr: number = 115000447009;//115000453405
		
		let h3: HTMLHeadingElement;
		
		ulGeneral = <HTMLUListElement>this.content.querySelector( 'li.general>ul' );
		ulMembership = <HTMLUListElement>this.content.querySelector( 'li.membership>ul' );
		ulTechnical = <HTMLUListElement>this.content.querySelector( 'li.technical>ul' );
		ulVr = <HTMLUListElement>this.content.querySelector( 'li.vr>ul' );
		
		for ( let value of (<any>this.data).articles )
		{
			if ( value.draft === false )
			{
				li = document.createElement( 'li' );
				/*li.setAttribute( 'id', 'q-'+value.id );
				li.setAttribute( 'role', 'tab' );
				li.classList.add( 'panel-heading' );*/
				li.className = 'panel panel-default';
				
				console.log(value.section_id,id_general);
				
				switch ( value.section_id )
				{
					case id_general:
					{
						li.innerHTML =
							'<h3 class="panel-title">' +
							'<button ' +
							'class="collapsed" ' +
							'role="button" ' +
							'data-toggle="collapse" ' +
							'data-parent="#accordion" ' +
							'data-target="#q-'+ value.id +'" ' +
							'aria-controls="q-'+ value.id +'" ' +
							'aria-expanded="false" >'+value.title+'</button></h3>'+
							'<div ' +
							'id="q-'+ value.id +'" ' +
							'class="panel-collapse collapse"   ' +
							'role="tabpanel"' +
							'aria-expanded="false">'+ value.body+'</div>';
						ulGeneral.appendChild(li);
						break;
					}
					case id_membership:
					{
						li.innerHTML =
							'<h3 class="panel-title">' +
							'<button ' +
							'class="collapsed" ' +
							'role="button" ' +
							'data-toggle="collapse" ' +
							'data-parent="#accordion-two" ' +
							'data-target="#q-'+ value.id +'" ' +
							'aria-controls="q-'+ value.id +'" ' +
							'aria-expanded="false" >'+value.title+'</button></h3>'+
							'<div ' +
							'id="q-'+ value.id +'" ' +
							'class="panel-collapse collapse"   ' +
							'role="tabpanel"' +
							'aria-expanded="false">'+ value.body+'</div>';
						ulMembership.appendChild(li);
						break;
					}
					case id_technical:
					{
						li.innerHTML =
							'<h3 class="panel-title">' +
							'<button ' +
							'class="collapsed" ' +
							'role="button" ' +
							'data-toggle="collapse" ' +
							'data-parent="#accordion-four" ' +
							'data-target="#q-'+ value.id +'" ' +
							'aria-controls="q-'+ value.id +'" ' +
							'aria-expanded="false" >'+value.title+'</button></h3>'+
							'<div ' +
							'id="q-'+ value.id +'" ' +
							'class="panel-collapse collapse"   ' +
							'role="tabpanel"' +
							'aria-expanded="false">'+ value.body+'</div>';
						ulTechnical.appendChild(li);
						break;
					}
					case id_vr:
					{
						li.innerHTML =
							'<h3 class="panel-title">' +
							'<button ' +
							'class="collapsed" ' +
							'role="button" ' +
							'data-toggle="collapse" ' +
							'data-parent="#accordion-three" ' +
							'data-target="#q-'+ value.id +'" ' +
							'aria-controls="q-'+ value.id +'" ' +
							'aria-expanded="false" >'+value.title+'</button></h3>'+
							'<div ' +
							'id="q-'+ value.id +'" ' +
							'class="panel-collapse collapse"   ' +
							'role="tabpanel"' +
							'aria-expanded="false">'+ value.body+'</div>';
						ulVr.appendChild(li);
						break;
					}
				}
				
			}
			
		}
	}
	//чтобы открывался только 1
	private setOneOpenAtATime(): void
	{
		//let contentList: NodeList;
		let buttonList: NodeList;
		
		//contentList = <NodeList>this.content.querySelectorAll( 'div.content' );
		buttonList = <NodeList>this.content.querySelectorAll( 'button[data-parent="#general"]' );
		
		Array.prototype.forEach.call(
			buttonList,
			( item: HTMLButtonElement ) =>
			{
				item.addEventListener( 'click', this.lazyHandlerFromSetter.bind(this) );
			}
		);
	}
	
	private lazyHandlerFromSetter( e: MouseEvent ): void
	{
		Array.prototype.forEach.call(
			this.content.querySelectorAll( 'div.content' ),
			( item: HTMLDivElement ) =>
			{
				//console.log('DA!',item.id,(<HTMLButtonElement>e.currentTarget).getAttribute( 'aria-controls' ).slice(1,20));
				if ( ((<HTMLButtonElement>e.currentTarget).getAttribute( 'aria-controls' )).slice(1,20) !== item.id
				)
				{
					/*item.classList.remove('in');
					item.style.height = '0px';
					(<HTMLButtonElement>e.currentTarget).classList.add('collapsed');*/
				}
			}
		);
	}
}