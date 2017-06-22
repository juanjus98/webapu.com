new WOW().init();
$(function() {
	$('#menu-buton').click(function () {
		console.log("Open menu!");
		var $animation = $(this).data('animation');
		var $mainMenu = $('#main-menu');
		var $menu = $('.menu');
		
		$($mainMenu).removeClass().addClass('main-menu main-menu-open '+$animation+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			/*$($menu).removeClass('').addClass('menu slideInDown animated');*/
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

$('#main-waypoint').waypoint(function() {
    console.log("Open fix!");
    /*$(".top-fix").addClass("fadeInDownBig animated");*/
    $(".top-fix").removeClass().addClass('top-fix fadeInDownBig animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        //Aca mostrar animacion de menu.
    });
}, {
     offset: '0%'
});

//LightSlider para tools
$('#tools-slider').lightSlider({
    item:5,
    loop:true,
    slideMove:1,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed:600,
    pager:false,
    auto:true,
    controls:false,
    responsive : [
        {
            breakpoint:800,
            settings: {
                item:4,
                slideMove:1,
                slideMargin:6,
              }
        },
        {
            breakpoint:600,
            settings: {
                item:3,
                slideMove:1
              }
        },
        {
            breakpoint:400,
            settings: {
                item:2,
                slideMove:1
              }
        },
        {
            breakpoint:280,
            settings: {
                item:1,
                slideMove:1
              }
        }
    ]
}); 

});