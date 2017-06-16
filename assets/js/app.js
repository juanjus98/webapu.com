/**
 * Variables globales
 */
$.getDataJson = function(url, data, callback) {
	return $.ajax({
		method: 'POST',
		url: url,
		data: data,
		dataType: 'json',
		success: callback
	});
};

/*function testAnim(x) {
$('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(this).removeClass();
});
};*/
$(function() {

	$('#menu-buton').click(function () {
		console.log("Open menu!");
		var $animation = $(this).data('animation');
		var $mainMenu = $('#main-menu');
		var $menu = $('.menu');
		
		$($mainMenu).removeClass().addClass('main-menu main-menu-open '+$animation+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$($menu).removeClass('').addClass('menu slideInDown animated');
			//Aca mostrar animacion de menu.
	});

	});

	$('#menu-buton-close').click(function () {
		var $animation = $(this).data('animation');
		var $mainMenu = $('#main-menu');		
		$($mainMenu).removeClass().addClass('main-menu main-menu-open '+$animation+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
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