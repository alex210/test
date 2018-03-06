<?php
require '\application\classes\ParseTxt.php';
require '\application\classes\ImageProcessing.php';

class Model_Images extends Model
{
	public $uploadfile;
	function __construct($uploadfile)
	{
		$this->uploadfile = $uploadfile;

		$file = new ParseTxt;
		$file->setFile($uploadfile);
		$file->setBaseUrls('assets/files/text.txt');
		$links = $file->checkUrls();

		$images = new ImageProcessing;
		$images->links = $links;
		$images->dir = 'assets/images';
		$images->font = 'assets/fonts/RobotoRegular.ttf';
		$images->rgb = '250,0,0';
		$images->height = 200;
		$images->text = 'Tile.Expert';
		$images->createImages();
	}

	function returnLinks(){
		$links = file($this->uploadfile);
		$links = array_map("rtrim", $links);
		return $links;
	}

}