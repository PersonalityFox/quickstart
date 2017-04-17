import Request from './Request';
//import Spoiler from './Spoiler'

/// <reference path="jquery.d.ts" />
declare let $: any;

const ID: string = '115002625749';

export default class GetBilling
{
	//private elementList: HTMLUListElement;
	private request: Request;
	//private spoiler: Spoiler;
	
	/**
	 * Наш элемент  section.billing
	 */
	private element: HTMLElement;
	/**
	 * Наш элемент  section.FAQ
	 */
	private elementFAQ: HTMLElement;
	/**
	 * Наш элемент  ul.information
	 */
	private elementUL: HTMLElement;
	
	/**
	 * Элемент который по клику скроет FAQ и откроет billing
	 */
	private button: HTMLElement;
	/**
	 * Элемент который по клику откроет FAQ и скроет billing
	 */
	private buttonGoBack: HTMLElement;
	
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
		this.element = element; // section.billing
		this.elementUL = <HTMLElement>document.querySelector( 'ul.information' );
		this.button = <HTMLElement>this.elementUL.querySelector( 'li.billing>div' );
		this.buttonGoBack = <HTMLElement>this.element.querySelector( 'button.go-back' );
		this.elementFAQ = <HTMLElement>document.querySelector( 'section.faq.tabs' );
		this.request = new Request;
		
		this.content = <HTMLUListElement>element.querySelector( 'ul.content' );
		
		this.url = 'https://royal-cs.zendesk.com/api/v2/help_center/en-us/articles/' + ID + '.json'; // /api/v2/help_center/{locale}/articles/{id}.json
		
		// При клике по информации, вешаем на секции дом классы
		if ( this.button ) { this.button.addEventListener( 'click', this.hideFAQClickHandler.bind(this) ); }
		if ( this.buttonGoBack ) { this.buttonGoBack.addEventListener( 'click', this.openFAQClickHandler.bind(this) ); }
		
		console.log('hideFAQ',this.button,this.buttonGoBack);
		
		this.getData();
		
		///this.spoiler = new Spoiler;
		
		//console.log($('div.content'));
	}
	
	public hideFAQClickHandler(): void
	{
		console.log('hideFAQ');
		this.elementUL.classList.add('hide');
		this.elementFAQ.classList.add('hide');
		this.element.classList.remove('hide');
	}
	
	public openFAQClickHandler(): void
	{
		console.log('openFAQ');
		this.elementUL.classList.remove('hide');
		this.elementFAQ.classList.remove('hide');
		this.element.classList.add('hide');
	}
	
	public getData( ):void
	{
		this.data = JSON.parse( this.request.createRequest( this.url, 'GET' ) );
		console.log(this.data);
		
		//this.element.innerHTML = (<any>this.data).body;
		
		this.pushData();
		
		//this.spoiler = new Spoiler( this.element );
		
		/*$('#general').collapse({
			parent: true,
			toggle: true
		});*/
		
		//this.setOneOpenAtATime();
	}
	
	private pushData():void
	{
		let h2: HTMLHeadingElement;
		let p: HTMLParagraphElement;
		let ul: HTMLUListElement;
		let headings: Array<string>;
		let bodys: Array<string>;
		
		let regH2: RegExp = /^<h1>(([A-Za-z !?]{1,}))<\/h1>/m;
		let regP: RegExp = /^<p class="description" style="font-size: 13px;">([A-Za-z !?,.]{1,})[A-Za-z !?,.]{1,}/m;
		let regBody: RegExp = /<div class="description">([a-zA-Z0-9 .,-=!&%?//\\А-Яа-яёЁ>< ]{1,})<\/div>/g;
		let matchHeading: RegExp = /<strong>([a-zA-Z 0-9.,!?=-]{1,})/gm;
		
		//let reg2: RegExp = /^[0-9]{1,}/;
		
		h2 = <HTMLHeadingElement>document.createElement( 'h2' );
		p = <HTMLParagraphElement>document.createElement( 'p' );
		ul = <HTMLUListElement>document.createElement( 'ul' );
		ul.className = "panel-group";
		ul.setAttribute( 'id', 'billing' );
		ul.setAttribute( 'role', 'tablist' );
		ul.setAttribute( 'aria-multiselectable', 'true' );
		
		h2.innerText = (<any>this.data).article.body.match(regH2)[1];
		p.innerText = (<any>this.data).article.body.match(regP)[1];
		headings = (<any>this.data).article.body.match(matchHeading);
		bodys = (<any>this.data).article.body.match(regBody);
		
		console.log(bodys);
		
		//h2 = (<any>this.data).body.match(regH2)[0];
		
		//console.log( (<any>this.data).article.body.match(regH2),(<any>this.data).article.body.match(regH2)[1] );
		console.log( 'result', headings, (<any>this.data) );
		
		this.element.appendChild( h2 );
		this.element.appendChild( p );
		
		for ( let i: number = 0; i <= headings.length; i++ )
		{
			let li: HTMLLIElement;
			
			if ( headings[i] )
			{
				li =  <HTMLLIElement>document.createElement( 'li' );
				li.className = "panel panel-default";
				
				li.innerHTML =
					'<h3 class="panel-title">' +
					'<button ' +
					'class="collapsed" ' +
					'role="button" ' +
					'data-toggle="collapse" ' +
					'data-parent="#billing" ' +
					'data-target="#q-'+ i +'" ' +
					'aria-controls="q-'+ i +'" ' +
					'aria-expanded="false" >'+headings[i]+'</button></h3>'+
					'<div ' +
					'id="q-'+ i +'" ' +
					'class="panel-collapse collapse"   ' +
					'role="tabpanel"' +
					'aria-expanded="false">'+ bodys[i] + '</div>';
				ul.appendChild(li);
			}
		}
		
		this.element.appendChild( ul );
		
		/*let li: HTMLLIElement;
		let ulGeneral: HTMLUListElement;
		
		const id_general: number = 115000453405; //https://royal-cs.zendesk.com/hc/admin/sections/115000453405/edit
		const id_membership: number = 115000446869; //https://royal-cs.zendesk.com/hc/admin/sections/115000446869/edit
		const id_technical: number = 115000446929;//https://royal-cs.zendesk.com/hc/admin/sections/115000446929/edit
		const id_vr: number = 115000447009;//115000453405
		
		let h3: HTMLHeadingElement;
		
		ulGeneral = <HTMLUListElement>this.content.querySelector( 'li.general>ul' );
		
		for ( let value of (<any>this.data).articles )
		{
			if ( value.draft === false )
			{
				li = document.createElement( 'li' );
				/!*li.setAttribute( 'id', 'q-'+value.id );
				 li.setAttribute( 'role', 'tab' );
				 li.classList.add( 'panel-heading' );*!/
				li.className = 'panel panel-default';
				
				console.log(value.section_id,id_general);
				
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
			}
		}*/
	}
}