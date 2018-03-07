<?php
require './application/models/model_images.php';

class Controller_Main extends Controller
{
	function action_index()
	{	
		$this->view->generate('main_view.php', 'template_view.php');
	}

	function action_images()
	{	
		$this->model = new Model_Images($_FILES['file']['tmp_name']);
		$links = $this->model->returnLinks();
		
		$links = array_map("rtrim", $links);
		function linkImg($link){
			return '/assets/images'.strrchr($link, '/');
		};
		$links = array_map("linkImg", $links);
		echo json_encode($links);
	}
}