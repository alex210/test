<?php
class ParseTxt
{
  public $file, $baseUrls, $path;

  function setFile($file){
    $this->file = file($file);
  }

  function setBaseUrls($file){
    $this->path = $file;
    $this->baseUrls = file($file);
  }

  function checkUrls(){
    $links = [];
    foreach ($this->file as $url) {
      if(!in_array($url, $this->baseUrls)){
        $current = file_get_contents($this->path);
        $current .= $url;
        file_put_contents($this->path, $current);
        array_push($links, rtrim($url));
      }
    }
    return $links;
  }  
}