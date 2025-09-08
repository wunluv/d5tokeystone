<?php
// $Id: localizer.inc,v 1.1.2.9 2008/09/11 07:33:46 robertogerola Exp $

include_once(drupal_get_path('module', 'localizer') .'/includes/localizernode.inc');
include_once(drupal_get_path('module', 'localizer') .'/models/localizertranslation.php');

function localizer_supported_languages() {
  global $user;
  static $languages;
  if (!isset($languages)) {
    if (function_exists('locale')) {
      $languages = locale_supported_languages();
      $languages = $languages['name'];
    }
    else {
      $languages = array('en' => 'English');
    }
  }

  if ($user->uid && $user->languages) {
    $user->languages = localizer_clear_languagesarray($user->languages);
    $languages = array_intersect_key($languages, $user->languages);
  }
  return $languages;
}

function localizer_supported_languages_all() {
  static $languages;
  if (!isset($languages)) {
    if (function_exists('locale')) {
      $languages = locale_supported_languages();
      $languages = $languages['name'];
    }
    else {
      $languages = array('en' => 'English');
    }
  }
  return $languages;
}

function localizer_get_default_language() {
  $languages = localizer_supported_languages();
  return key($languages);
}

function localizer_isvalid_language($language = '') {
  static $valid_languages;
  $valid_languages = localizer_supported_languages();

  if (($language != '') && array_key_exists($language, $valid_languages)) {
    return true;
  }
  else {
    return false;
  }
}

function localizer_get_language() {
  global $locale;
  if (!$locale) {
    $locale = localizer_get_default_language();
  }
  return $locale;
}

function localizer_set_language($language = '') {
  static $valid_languages;
  $valid_languages = localizer_supported_languages();

  if (($language != '') && ($language != localizer_get_language()) && (array_key_exists($language, $valid_languages))) {
    global $locale;
    $locale=$language;
    $_SESSION['current_locale']=$locale;
  }
}

function localizer_get_localized_path($path, $language) {
  $s = drupal_lookup_path('source', $path);
  if ($s) $path = $s;
  $lpath = localizernode_get_localized_path($path, $language);
  $a = drupal_lookup_path('alias', $lpath);
  if ($a) $lpath = $a;
  return $lpath;
}

function localizer_exists_localized_content($path, $language) {
  return module_exists('localizernode') ? localizernode_exists_localized_content($path, $language) : FALSE;
}

function localizer_get_content_language($_path) {
  return localizernode_get_content_language($_path);
}

function to($object_name, $object_key, $object, $language=NULL) {
  if (!$language) $language = localizer_get_language();

  $items = localizertranslation_findall("object_name='$object_name' AND object_key='$object_key' AND language='". $language ."'");

  foreach ($items as $key => $item) {
    if (!empty($item['translation'])) {
      $object_field=$item['object_field'];
      $object->$object_field=$item['translation'];
    }
  }
  return $object;
}

function localizer_ts($string, $language=NULL) {
  if (!$language) $language = localizer_get_language();

  $t = localizertranslation_findone("object_name='string' AND object_key='$string' AND object_field='value' AND language='". $language ."'");
  if (array_key_exists('tid', $t) && $t['tid']) {
    $tstring = $t['translation'];
  }
  else {
    $tstring = $string;
    $t = array(
                   'object_name' => 'string',
                   'object_key' => $string,
                   'object_field' => 'value',
                   'language' => $language,
                   'translation' => $string,
                  );
    localizertranslation_insert($t);
  }
  return $tstring;
}

function localizer_path_without_language($path) {
  $exploded_path = explode('/', $path);
  $languageinpath = $exploded_path[0];
  if (localizer_isvalid_language($languageinpath)) {
    array_shift($exploded_path);
    return implode("/", $exploded_path);
  }
  else {
    return $path;
  }
}

function localizer_clear_languagesarray($options, $onlystrings=false) {
  if (is_array($options)) {
    foreach ($options as $key => $value) {
      if ($value=='0') unset($options[$key]);
      if ($onlystrings && is_integer($value)) unset($options[$key]);
    }
  }
  return $options;
}

if (!function_exists('array_intersect_key')) {
  function array_intersect_key($isec, $keys) {
    $argc = func_num_args();
    if ($argc > 2) {
      for ($i = 1; !empty($isec) && $i < $argc; $i++) {
        $arr = func_get_arg($i);
        foreach (array_keys($isec) as $key) {
          if (!isset($arr[$key])) {
            unset($isec[$key]);
          }
        }
      }
      return $isec;
    }
    else {
      $res = array();
      foreach (array_keys($isec) as $key) {
        if (isset($keys[$key])) {
          $res[$key] = $isec[$key];
        }
      }
      return $res;
    }
  }
}

function localizer_is_front_page() {
  if (variable_get('localizer_frontpage_redirect', TRUE)) {
    $language = localizer_get_language();
    $front = localizer_get_localized_path(variable_get('site_frontpage', 'node'), $language);
    return (localizer_get_localized_path($_GET['q'], $language) == $front);
  }
  else {
    return drupal_is_front_page();
  }
}

function localizer_append_language_prefix($path, $append_language=true) {
  $pages = variable_get('localizer_language_prefix_pages', '');
  if ($pages) {
    $visibility = variable_get('localizer_language_prefix_options', 0);
    if ($visibility < 2) {
      $regexp = '/^('. preg_replace(array('/(\r\n?|\n)/', '/\\\\\*/', '/(^|\|)\\\\<front\\\\>($|\|)/'), array('|', '.*', '\1'. preg_quote(variable_get('site_frontpage', 'node'), '/') .'\2'), preg_quote($pages, '/')) .')$/';
      // Compare with the internal and path alias (if any).
      $page_match = preg_match($regexp, $path);
      if ($path != $_GET['q']) {
        $page_match = $page_match || preg_match($regexp, $_GET['q']);
      }
      // When $block->visibility has a value of 0, the block is displayed on
      // all pages except those listed in $block->pages. When set to 1, it
      // is displayed only on those pages listed in $block->pages.
      $page_match = !($visibility xor $page_match);
    }
    else {
      $page_match = drupal_eval($block->pages);
    }
  }
  else {
    return $append_language;
  }
}

