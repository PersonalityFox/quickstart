export default class Request
{
	//private elementSection: HTMLButtonElement;

	public constructor( )
	{
		console.log('REQUEST создан успешно');
	}

	/*public createRequest( url?: string, type?: string, filterData?: string ): string
	{
		if ( !filterData )
		{
			filterData = '';
		}
		//console.log('Запрос пойдёт в ',url);

		let httpRequest: XMLHttpRequest;
		let requestString: string;
		httpRequest = new XMLHttpRequest();

		if ( !httpRequest )
		{
			// Вывод сообщения
			alert('Не удалось установить связь с сервером. Возможно ваш браузер устарел.');
			return;
		}

		requestString = 'type='+type+filterData;
		//console.log('отправляем запрос в базу под фильтром = ',requestString);
		// Отпавляем запрос
		httpRequest.open('POST', url, true);
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpRequest.setRequestHeader('Accept', 'application/json');
		httpRequest.send( requestString );

		// Ждём результата
		//console.log('tt111pRequest.readyState === XMLHttpRequest.DONE  '+httpRequest.readyState +'='+ XMLHttpRequest.DONE);

		/!*if ( httpRequest.readyState === XMLHttpRequest.DONE)
		{
			if ( httpRequest.status === 200 )
			{
				console.log(httpRequest.responseText);
				return httpRequest.responseText;
			}
			else
			{
				return 'Проблема с запросом '+httpRequest.responseText;
			}
		}*!/
		httpRequest.onreadystatechange = function ()
		{
			//console.log('ttpRequest.readyState === XMLHttpRequest.DONE  '+httpRequest.readyState +'='+ XMLHttpRequest.DONE);
			if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
				console.log(httpRequest.responseText);
				return httpRequest.responseText;
			}
		};
	}*/
	public createRequest( url?: string, type?: string, filterData?: string ): string
	{
		if ( !filterData )
		{
			filterData = '';
		}
		//console.log('Запрос пойдёт в ',url);

		let httpRequest: XMLHttpRequest;
		let requestString: string;
		httpRequest = new XMLHttpRequest();

		if ( !httpRequest )
		{
			// Вывод сообщения
			alert('Не удалось установить связь с сервером. Возможно ваш браузер устарел.');
			return;
		}

		requestString = 'type='+type+filterData;
		console.log('отправляем запрос в базу под фильтром = ',requestString);
		// Отпавляем запрос
		httpRequest.open('POST', url, false);
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpRequest.setRequestHeader('Accept', 'application/json');
		httpRequest.send( requestString );

		if ( httpRequest.status === 200 )
		{
			if (( httpRequest.responseText != '' ) || ( !httpRequest.responseText ))
			{
				//return JSON.parse(httpRequest.responseText)['smallUrl'];
				//console.log(httpRequest.responseText);
				return httpRequest.responseText;
			}
			else
			{
				return 'error';
			}
		}
		else
		{
			if ( httpRequest.status === 503  )
			{
				console.log('error');
			}
		}
	}
}