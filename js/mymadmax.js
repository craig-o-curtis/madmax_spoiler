/* mymadmax.js */

$(document).ready(function(){
	$('canvas').hide();
	var $button = $();
	/* original method 
	$('.spoiler').append('<p>Reveal Spoiler!</p>');
	*/
	$('.spoiler').click(function(){
		$(this).addClass('glow');
		$('canvas').show();
		$('p').html("Mad Max survives!");
	});
});