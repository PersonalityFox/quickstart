export default class LocalStorage
{
	//private elementSection: HTMLButtonElement;

	public constructor( string?: string )
	{

	}

	public clearing( ): void
	{
		localStorage['current'] = '';
	}
	public adder( index: string, value: any ): void
	{
		localStorage[index] = value;
	}
	public getItem( index: string ): string
	{
		return localStorage[index];
	}
	public removeItem( index: string ): void
	{
		localStorage.removeItem(index);
	}
}