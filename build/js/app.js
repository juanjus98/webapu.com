$(function() {

	$('#menu-buton').click(function () {
		console.log("Open!");
		var $mainMenu = $('#main-menu');
		var $animation = $mainMenu.data('animation');
		
	$($mainMenu).addClass('main-menu-open '+$animation+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		//$(this).removeClass('');
		console.log('Abierto configurar animaciòn de menu');
		//Aca mostrar animacion de menu.
	});

	});


	/*$('#simple-menu').sidr({
		timing: 'ease-in-out',
		speed: 500
	});

	$( window ).resize(function () {
	  $.sidr('close', 'sidr');
	});

	$('#close-menu-button').click(function () {
	  $.sidr('close', 'sidr');
	});*/

});