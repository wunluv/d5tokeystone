<?php

$view = views_get_view(4);
$myargs = array();
$las_llamadas = views_build_view('items', $view, $myargs, false, 2); 

$nodo = node_load($las_llamadas['items'][0]->nid);

$text_content=$nodo->body;

    $output = 'Heavenletter #'. $nodo->field_heavenletter_[0][value];
    $output .= " ". $nodo->title;
    $item_node = node_build_content($nodo);
    $fecha = $item_node->field_published_date[0][view];
    $fecha = str_replace('<span class="date-display-single">', "", $fecha);
    $fecha = str_replace('</span>', "", $fecha);
    $output .= ", ". $fecha;

$file_data = $item_node ->body;
//$file_data=utf8_decode($file_data);
//$file_data=htmlentities($file_data, ENT_NOQUOTES);
//$file_data=_filter_autop($file_data);

$File = file_directory_path()."/content.txt";
$Handle = fopen($File, 'w');
$Data = $file_data;
/*$Data = str_replace('“', '"', $Data);
$Data = str_replace('”', '"', $Data);
$Data = str_replace('’', "'", $Data);
$Data = str_replace('–', "-", $Data);
$Data = str_replace('—', "--", $Data);
$Data = str_replace('ç', "&ccedil;", $Data);
$Data = str_replace('…', "...", $Data);
$Data = str_replace(' ', " ", $Data);
$Data = str_replace('  ', " ", $Data);
*/
 
$printit = l(t('Printer friendly version'), 'http://heavenletters.org/print/' . $nodo->nid);
$alias_url= drupal_get_path_alias('node/'.$nodo->nid);
$url=l('http://heavenletters.org/' . $alias_url, 'http://heavenletters.org/' . $alias_url);
$my_comment = '<div class="comment">' . l(t('Add Comment'), 'http://heavenletters.org/comment/reply/' . $nodo->nid . '#comment-form') . '&nbsp; || ' . $printit . '<br /><br />Permanent Link: ' .$url. '<span class="small_font"><br /><br />Thank you for including this link when publishing this Heavenletter elsewhere.</span></div>';
$Data .= $my_comment;

//$permalink = 'If your email reader doesn/'t support HTML (ie this e-mail is in a mess!), please <a href="'.$url .'">click here</a>';
//$permalink="<p class='small_font_p'>If your email reader doesn't support HTML, please <a href='http://heavenletters.org/$alias_url'>click here</a> to read online.</p> ";
//$permalink = 'If your email reader doesn't support HTML (i.e. this e-mail is in a mess), please <a href="';
//$permalink .= $url;
//$permalink .= '">click here</a>';
$permalink="<p class='small_font_p'>If your email reader doesn't support HTML, please <a href='http://www.heavenletters.org/$alias_url'>click here</a> to read online. Unsubscribe <a href='http://heavenletters.org/unsubscribe-from-heavens-mailing-list.html'>here</a>.</p> ";


drupal_bootstrap(DRUPAL_BOOTSTRAP_PATH);
drupal_init_path();
$path = drupal_lookup_path('alias', $_GET['q']);
print $path;

//$text=utf8_encode("?a?!");
//$text="\xEF\xBB\xBF".$text;
//$Data=utf8_decode($Data);
//$Data=htmlentities($Data);
fwrite($Handle, $Data);
print $output ."\n";
print $Data."\n";
fclose($Handle);

$File = file_directory_path()."/title.txt";
$Handle = fopen($File, 'w');
fwrite($Handle, $output);
fclose($Handle);

$File = file_directory_path()."/plain_text.txt";
$Handle = fopen($File, 'w');
fwrite($Handle, $text_content);
fclose($Handle);

$File = file_directory_path()."/url.txt";
$Handle = fopen($File, 'w');
fwrite($Handle, $permalink);
fclose($Handle);

?>
