/**
 * Created by User on 15.09.2016.
 */


$(document).ready(function()
{
	var preview = $("div.preview");
	var button = $("button.congr");



	// вешаем на клик по элементу с id = example-1
	button.click(function()
	{
		console.log('click');
		// загрузку HTML кода из файла example.html
		$(this).load('view/mail//mail-test.html');
	})
});