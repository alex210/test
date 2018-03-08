$(function() {
	$('#formText').submit(function() {
		GetImages();
    return false;
  });
});

function GetImages(){
  $('.preloader').addClass('active').show();
  var http = new XMLHttpRequest(), f = document.getElementById('formText');
  http.open("POST", "/main/images", true);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      var links = JSON.parse(http.responseText);
      for(var i = 0; i < links.length; i++){
        $('#wrapper').append('<div class="wrapImg"><img src="'+links[i]+'" alt=""></div>');
      }
      setTimeout(function(){
        new GridImage().builder();
        $(window).resize(function() {
          new GridImage().builder();
        });
        $('.preloader').removeClass('active').hide();
      },800);
    }
  }
  http.onerror = function() {
    alert('Sorry, the data was not transmitted.')
  }
  http.send(new FormData(f));
}

function Row(start, imgsWidth, wrapWidth) {
  this.counter = 0;
  this.numInRow = 0;
  this.diff = 0;
  this.imgsWidth = imgsWidth.slice();

  this.calculationRow = function(){
    this.imgsWidth.splice(0, start);
    for (var i = 0; i < this.imgsWidth.length; i++) {
      this.counter = this.counter + this.imgsWidth[i];
      this.numInRow++;
      if(wrapWidth < this.counter) break;      
    }
  }

  this.handlerRow = function(){
    this.calculationRow();
    this.diff = (this.counter - wrapWidth) / this.numInRow;
    if(this.diff < 0) return false;
    for (var i = start; i < start + this.numInRow; i++) {
      var width = $('.wrapImg').eq(i).width();
      $('.wrapImg').eq(i).width(width-this.diff).find('img').css('margin-left', -this.diff/2+'px');
    }
    return this.numInRow;
  }
}

function GridImage(){
  $('.wrapImg img').removeAttr('style');
  $('.wrapImg').removeAttr('style');
  var wrapWidth = $('#wrapper').width();
  var imgs = $('.wrapImg');
  var imgsWidth = imgs.map(function(){
    return $(this).outerWidth(true);
  }).get();
  var start = 0;

  this.builder = function(){
    while (true) {
      var current = new Row(start, imgsWidth, wrapWidth).handlerRow();
      if(!current) break;
      start = start + current;
    }
  }
}
