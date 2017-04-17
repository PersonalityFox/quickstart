import FormRequestBuilder from '../classes/FormRequestBuilder';

export default function init(): void
{
	let form: FormRequestBuilder;
	let elemForm: HTMLElement;
	elemForm = <HTMLElement>document.querySelector( 'section.form' );
	
	if ( elemForm )
	{
		form = new FormRequestBuilder( elemForm );
	}
	
	
}