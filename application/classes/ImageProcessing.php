<?php
class ImageProcessing
{
	public $fontSize = 13;
	public $links, $rgb, $color, $height, $text, $dir, $font;

	function getImage($link){
		$src = ImageCreateFromJPEG($link);
		return $src;
	}

	function resizeImage($link, $src){
		$size = GetImageSize($link);
		$iw = $size[0];
		$ih = $size[1];
		$koe = $ih/$this->height;
		$new_w = ceil ($iw/$koe);
		$dst = ImageCreateTrueColor($new_w, $this->height);
		ImageCopyResampled ($dst, $src, 0, 0, 0, 0, $new_w, $this->height, $iw, $ih);
		return $dst;
	}

	function setColor($src){
		$arRgb = explode(',', $this->rgb);
		$color = ImageColorAllocate($src, $arRgb[0], $arRgb[1], $arRgb[2]);
		$this->color = $color;
	}

	function drawWatermark($dst){
		ImageTTFtext($dst, $this->fontSize, 0, 100, 25, $this->color, $this->font, $this->text);
	}

	function saveImg($dst,$src,$path){
		$path = urldecode($path);
		ImageJPEG ($dst, $path, 100);
		imagedestroy($src);
	}

	function createImages(){
		foreach ($this->links as $link) {
			$path = $this->dir.strrchr($link, '/');
			$src = $this->getImage($link);
			$dst = $this->resizeImage($link, $src);
			$this->setColor($src);
			$this->drawWatermark($dst);
			$this->saveImg($dst,$src,$path);
		}		
	}
}