$(function() {
	$('#formText').submit(function() {
		YourOnSubmitFn();
    return false;
  });
});

function YourOnSubmitFn(token){
 // $('#form').find('.preloader').addClass('active').css('display', 'flex').hide().fadeIn();
  var http = new XMLHttpRequest(), f = document.getElementById('formText');
  http.open("POST", "/main/images", true);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      // $('#form').find('.success span').text(http.responseText);
       // $('#form').find('.preloader').css('display', 'none').removeClass('active').fadeOut();
     // $('#form').find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
       // $('#form').find('.success').css('display', 'none').removeClass('active').fadeOut();
       // $('#form').trigger("reset");
      }, 3000);

     
    }
  }
  http.onerror = function() {
    // $('#form').find('.success span').text('Извините, данные не были переданы');
    // $('#form').find('.preloader').css('display', 'none').removeClass('active').fadeOut();
   // $('#form').find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
       // $('#form').find('.success').css('display', 'none').removeClass('active').fadeOut();
       // $('#form').trigger("reset");
       }, 3000);
  }
  http.send(new FormData(f));
}

