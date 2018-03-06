<?php
require '\application\models\model_images.php';

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
		echo '<pre>';
		print_r($links);
		echo '</pre>';
		// return $links;
	}
}