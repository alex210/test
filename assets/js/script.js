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
      var links = JSON.parse(http.responseText);
      for(const link of links){
        var img = new Image();
        img.onload = function(){
          document.getElementById("cont").appendChild(this);
        }
        img.src = link;
      }
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

$(function() {

  function justifyImg(){
    $('.wrapImg img').removeAttr('style');
    $('.wrapImg').removeAttr('style');

    //ширина контейнера:
    var wrapWidth = $('.wrapper').width();
    
    var imgs = $('.wrapImg img');
    //массив длин картинок:
    var imgsWidth = imgs.map(function(){
      return $(this).width()+10;
    }).get();

    var counter = 0; //суммарная длина в ряду
    var numInRow = 0; //счётчик картинок в текущем ряду
    
    //обработка ряда:
    $.each(imgsWidth, function(i, val){
      counter = counter + val;
      numInRow++;
      if(wrapWidth < counter) return false;
    });

    //лишняя длина ряда: 
    var diff = counter - wrapWidth;
    
    //лишняя длина контейнера картинки
    diff = diff / numInRow;

    //обрезка лишний длины контейнеров и центрирование картинки:
    for (var i = 0; i < numInRow; i++) {
      var width = $('.wrapImg').eq(i).width();
      $('.wrapImg').eq(i).width(width-diff).find('img').css('margin-left', -diff/2+'px');
    }
  }



  justifyImg();
  $(window).resize(function() {
    justifyImg();    
  });



});
