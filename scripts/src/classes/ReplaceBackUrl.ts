export default class GetArticles
{
	public link: HTMLElement;
	
	public userLastPage: string;
	
	/**
	 *
	 * @param element  link anchor
	 */
	public constructor( element: HTMLElement )
	{
		this.link = element;
		this.userLastPage = document.referrer;
		
		(<HTMLAnchorElement>this.link).href = document.referrer;
		
		//console.log( '>'+this.userLastPage+'<' );
	}
}