const ACTIVE = 'active';

/**
 * Класс работы с формой
 */
export default class FormRequestBuilder
{
	/**
	 * Элемент секции, которую передаём.
	 */
	private section: HTMLElement;
	/**
	 * Элемент формы
	 */
	private form: HTMLFormElement;
	
	/**
	 * Недостающие элементы формы
	 */
	private name: HTMLInputElement;
	private username: HTMLInputElement;
	private password: HTMLInputElement;
	private subscriptionMemberID: HTMLInputElement;
	private billing: HTMLSelectElement;
	private website: HTMLSelectElement;
	
	/**
	 * Список недостающих
	 */
	private data: Object;
	
	private listBilling: string = '<option value=""></option><option>Epoch</option><option>2000Charge</option><option>Segpay</option><option>WTS</option><option>Vendo</option><option>Verotel</option>';
	private listWebsite: string = '<option value=""></option><option>18 First Sex</option><option>About Girls Love</option><option>Anal Angels</option><option>Anal Beauty</option><option>ATMovs</option><option>Badex GFs</option><option>Beauty Angels</option><option>Beauty4K.com</option><option>Boys-Love</option><option>Creampie Angels</option><option>Dirty Coach</option><option>Dirty Doctor</option><option>Drunk Home Party</option><option>Drunken Teen Orgies</option><option>ExGfBox</option><option>FirstBGG</option><option>Fuck Studies</option><option>Gag-n-Gape</option><option>Home Porn Bay</option><option>Home Teen Vids</option><option>Home Toy Teens</option><option>iTeenVideo</option><option>Latin Shemales</option><option>Lolly Hardcore</option><option>No Boring</option><option>Nubile Girls HD</option><option>NylonsX</option><option>Old-n-Young</option><option>Private Teen Video</option><option>Shemale Access</option><option>Solo Teen Girls</option><option>Squirting Virgin</option><option>Teen Mega World</option><option>Teen Sex Mania</option><option>Teen Sex Movs</option><option>Teen Stars Only</option><option>Teens 3 Some</option><option>TinyTeens18.com</option><option>TMW Mobile</option><option>TmwVRnet</option><option>Tricky Masseur</option><option>Watch Me Fucked</option><option>WMB Girls</option><option>WOW Orgasms</option><option>X-Angels.com</option>';
	
	private button: HTMLButtonElement;
	
	public constructor( element: HTMLElement )
	{
		console.log('constructor form');
		this.section = element;
		this.form = <HTMLFormElement>this.section.querySelector( 'form' );
		this.button = <HTMLButtonElement>this.form.querySelector( 'button' );
		
		if ( !this.button )
		{
			this.button = document.createElement( 'button' );
			this.button.type = 'button';
			this.button.innerText = 'Submit';
			
			this.form.querySelector( 'footer' ).appendChild( this.button );
		}
		
		this.form.addEventListener( 'submit', this.submitForm.bind(this) );
		this.button.addEventListener( 'click', this.buttonSubmitForm.bind(this) );
		
		this.data =
			[
				{
					name: 'name',
					brother: 'request_anonymous_requester_email',
					title: 'Name',
					type: 'input',
					required: 'required'
				},
				{
					name: 'username',
					brother: 'request_anonymous_requester_email',
					title: 'Username',
					type: 'input',
					required: ''
				},
				{
					name: 'password',
					brother: 'request_subject',
					title: 'Password',
					type: 'input',
					required: ''
				},
				{
					name: 'website',
					brother: 'request_description',
					title: 'Website',
					type: 'select',
					required: ''
				},
				{
					name: 'member',
					brother: 'request_subject',
					title: 'I\'m a member',
					type: 'checkbox',
					required: ''
				},
				{
					name: 'billing',
					brother: 'request_subject',
					title: 'Billing',
					type: 'select',
					required: ''
				},
				{
					name: 'subscription_member_id',
					brother: 'request_billing',
					title: 'Subscription/Member ID',
					type: 'input',
					required: ''
				}
			];
		
		this.createElements();
		
		this.checkMember();
	}
	
	private submitForm( e:MouseEvent ):void
	{
		//e.preventDefault();
		
		let descr: HTMLTextAreaElement = <HTMLTextAreaElement>this.form.querySelector( 'textarea' );
		
		this.name = <HTMLInputElement>this.form.querySelector( 'div.request_name input' );
		this.username = <HTMLInputElement>this.form.querySelector( 'div.request_username input' );
		this.password = <HTMLInputElement>this.form.querySelector( 'div.request_password input' );
		this.subscriptionMemberID = <HTMLInputElement>this.form.querySelector( 'div.request_subscription_member_id input' );
		this.billing = <HTMLSelectElement>this.form.querySelector( 'div.request_billing select' );
		this.website = <HTMLSelectElement>this.form.querySelector( 'div.request_website select' );
		
		descr.value = descr.value + `<br>` +
			`<b>Name:</b> ` + this.name.value + `<br>` +
			`<b>Username:</b> ` + this.username.value + `<br>` +
			`<b>Password:</b> ` + this.password.value + `<br>` +
			`<b>Subscription/Member ID:</b> ` + this.subscriptionMemberID.value + `<br>` +
			`<b>Billing:</b> ` + this.billing.value + `<br>` +
			`<b>Website:</b> ` + this.website.value;
		
		
	}
	private buttonSubmitForm( e:MouseEvent ):void
	{
		if ( this.checkInputs() )
		{
			console.log('if');
			let descr: HTMLTextAreaElement = <HTMLTextAreaElement>this.form.querySelector( 'textarea' );
			
			this.name = <HTMLInputElement>this.form.querySelector( 'div.request_name input' );
			this.username = <HTMLInputElement>this.form.querySelector( 'div.request_username input' );
			this.password = <HTMLInputElement>this.form.querySelector( 'div.request_password input' );
			this.subscriptionMemberID = <HTMLInputElement>this.form.querySelector( 'div.request_subscription_member_id input' );
			this.billing = <HTMLSelectElement>this.form.querySelector( 'div.request_billing select' );
			this.website = <HTMLSelectElement>this.form.querySelector( 'div.request_website select' );
			
			descr.value = `
			Name: ` + this.name.value + `
			Username: ` + this.username.value + `
			Password: ` + this.password.value + `
			Subscription/Member ID: ` + this.subscriptionMemberID.value + `
			Billing: ` + this.billing.value + `
			Website: ` + this.website.value + `
			User-agent: ` + window.navigator.userAgent + `
			
			Description:
			` +
				descr.value;
			
			setTimeout( this.form.submit(), 200 );
		}
		else
		{
			e.preventDefault();
			
			
		}
		
		
	}
	
	private checkInputs(): boolean
	{
		let name: HTMLInputElement = <HTMLInputElement>this.form.querySelector( 'input#request_name' );
		let email: HTMLInputElement = <HTMLInputElement>this.form.querySelector( 'input#request_anonymous_requester_email' );
		let subject: HTMLInputElement = <HTMLInputElement>this.form.querySelector( 'input#request_subject' );
		let descr: HTMLTextAreaElement = <HTMLTextAreaElement>this.form.querySelector( 'textarea#request_description' );
		
		if ( ( name.value !== '' ) && ( email.value !== '' ) && ( subject.value !== '' ) && ( descr.value !== '' ) )
		{
			return true;
		}
		else
		{
			let div: HTMLDivElement;
				
				//<div class="notification notification-error notification-inline">Requester: Email:  cannot be blank</div>
				
			if ( name.value === '' )
			{
				name.classList.add( 'error' );
				
				div = <HTMLDivElement>name.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Name:  cannot be blank';
					name.parentElement.appendChild( div );
				}
				
				div.style.display = 'block';
			}
			else
			{
				name.classList.remove( 'error' );
				
				div = <HTMLDivElement>name.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Name:  cannot be blank';
					name.parentElement.appendChild( div );
				}
				
				div.style.display = 'none';
			}
			
			
			
			//-------------------
			if ( email.value === '' )
			{
				email.classList.add( 'error' );
				
				div = <HTMLDivElement>email.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Email:  cannot be blank';
					email.parentElement.appendChild( div );
				}
				
				div.style.display = 'block';
			}
			else
			{
				email.classList.remove( 'error' );
				
				div = <HTMLDivElement>email.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Email:  cannot be blank';
					email.parentElement.appendChild( div );
				}
				
				div.style.display = 'none';
			}
			
			
			
			//-------------------
			if ( subject.value === '' )
			{
				subject.classList.add( 'error' );
				
				div = <HTMLDivElement>subject.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Subject:  cannot be blank';
					subject.parentElement.appendChild( div );
				}
				
				div.style.display = 'block';
			}
			else
			{
				subject.classList.remove( 'error' );
				
				div = <HTMLDivElement>subject.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Subject:  cannot be blank';
					subject.parentElement.appendChild( div );
				}
				
				div.style.display = 'none';
			}
			
			
			
			//-------------------
			if ( descr.value === '' )
			{
				descr.classList.add( 'error' );
				
				div = <HTMLDivElement>descr.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Description:  cannot be blank';
					descr.parentElement.appendChild( div );
				}
				
				div.style.display = 'block';
			}
			else
			{
				descr.classList.remove( 'error' );
				
				div = <HTMLDivElement>descr.parentElement.querySelector( 'div.notification-error' );
				
				if ( !div )
				{
					div = document.createElement( 'div' );
					div.className = "notification notification-error notification-inline";
					div.innerText = 'Requester: Description:  cannot be blank';
					descr.parentElement.appendChild( div );
				}
				
				div.style.display = 'none';
			}
			
			
			
			//-------------------
			
			return false;
		}
	}
	
	/**
	 * Фукнция создаёт элементы формы.
	 */
	private createElements():void
	{
		let div: HTMLDivElement;
		
		/**
		 * Нам нужен выпадающий список вместо input subject
		 */
		let subjectSelect: HTMLSelectElement;
		let subjectInput: HTMLInputElement = <HTMLInputElement>this.form.querySelector( 'input#request_subject' );
		
		subjectSelect = <HTMLSelectElement>document.createElement( 'select' );
		subjectSelect.setAttribute( 'id', 'request_subject_select' );
		subjectSelect.setAttribute( 'name', 'subject-list' );
		subjectSelect.innerHTML = '<option>A question</option><option>Technical issue</option><option>Purchase issue</option>';
		subjectInput.parentElement.insertBefore( subjectSelect, subjectInput  );
		subjectSelect.addEventListener( 'change', ( e: MouseEvent ) => {
			subjectInput.value = (<HTMLInputElement>e.currentTarget).value;
			} );
		
		console.log( this.form.querySelector( 'input#request_subject' ) );
		
		for ( let value of (<any>this.data) )
		{
			div = document.createElement( 'div' ); //class="form-field string  required  request_name"
			div.className = 'form-field string  ' + value.required + '  request_' + value.name;
			
			if ( value.type === 'input' )
			{
				div.innerHTML =
					`<label for="request_` + value.name + `">` + value.title + `</label><input type="text" name="` + value.name + `" id="request_` + value.name + `" maxlength="150" size="150" />`;
			}
			else if ( value.type === 'select' )
			{
				if ( value.name === 'website' )
				{
					
					div.innerHTML =
						`<label for="request_website">Website</label><select name="website" id="request_website">`+
							this.listWebsite
						+`</select>`;
				}
				else
				{
					div.innerHTML =
						`<label for="request_billing">Billing</label><select name="billing" id="request_billing">`+
						this.listBilling
						+`</select>`;
				}
			}
			else if ( value.type === 'checkbox' )
			{
				div.innerHTML =
					`<input type="checkbox" name="` + value.name + `" id="request_` + value.name + `"  /><label for="request_billing">` + value.title + `</label>`;
			}
			
			this.form.insertBefore( div, this.form.querySelector( 'div.'+value.brother ) );
		}
		
		
	}
	
	/**
	 * Проверяем и вешаем слушателя на проверку пользователя
	 */
	private checkMember():void
	{
		let checkbox: HTMLInputElement;
		
		checkbox = <HTMLInputElement>this.form.querySelector( 'input#request_member' );
		
		if ( checkbox )
		{
			checkbox.addEventListener( 'click', () => { this.form.classList.toggle( 'full-form' ) } );
		}
	}
	
	/*private checkboxClickHandler( e: MouseEvent ):void
	{
		this.form.classList.toggle( 'full-form' );
	}*/
}