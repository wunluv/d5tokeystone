<?php
// $Id: localizer_settings.php,v 1.1.2.7 2008/07/25 07:42:12 robertogerola Exp $

function __localizer_get_iso639_list() {
  static $languages;
  if (!$languages) {
  $languages = array(
    "aa" => "aa",
    "ab" => "ab",
    "ae" => "ae",
    "af" => "af",
    "ak" => "ak",
    "am" => "am",
    "ar" => "ar",
    "as" => "as",
    "av" => "av",
    "ay" => "ay",
    "az" => "az",
    "ba" => "ba",
    "be" => "be",
    "bg" => "bg",
    "bh" => "bh",
    "bi" => "bi",
    "bm" => "bm",
    "bn" => "bn",
    "bo" => "bo",
    "br" => "br",
    "bs" => "bs",
    "ca" => "ca",
    "ce" => "ce",
    "ch" => "ch",
    "co" => "co",
    "cr" => "cr",
    "cs" => "cs",
    "cu" => "cu",
    "cv" => "cv",
    "cy" => "cy",
    "da" => "da",
    "de" => "de",
    "dv" => "dv",
    "dz" => "dz",
    "ee" => "ee",
    "el" => "el",
    "en" => "en",
    "eo" => "eo",
    "es" => "es",
    "et" => "et",
    "eu" => "eu",
    "fa" => "fa",
    "ff" => "ff",
    "fi" => "fi",
    "fj" => "fj",
    "fo" => "fo",
    "fr" => "fr",
    "fy" => "fy",
    "ga" => "ga",
    "gd" => "gd",
    "gl" => "gl",
    "gn" => "gn",
    "gu" => "gu",
    "gv" => "gv",
    "ha" => "ha",
    "he" => "he",
    "hi" => "hi",
    "ho" => "ho",
    "hr" => "hr",
    "hu" => "hu",
    "hy" => "hy",
    "hz" => "hz",
    "ia" => "ia",
    "id" => "id",
    "ie" => "ie",
    "ig" => "ig",
    "ik" => "ik",
    "is" => "is",
    "it" => "it",
    "iu" => "iu",
    "ja" => "ja",
    "jv" => "jv",
    "ka" => "ka",
    "kg" => "kg",
    "ki" => "ki",
    "kj" => "kj",
    "kk" => "kk",
    "kl" => "kl",
    "km" => "km",
    "kn" => "kn",
    "ko" => "ko",
    "kr" => "kr",
    "ks" => "ks",
    "ku" => "ku",
    "kv" => "kv",
    "kw" => "kw",
    "ky" => "ky",
    "la" => "la",
    "lb" => "lb",
    "lg" => "lg",
    "ln" => "ln",
    "lo" => "lo",
    "lt" => "lt",
    "lv" => "lv",
    "mg" => "mg",
    "mh" => "mh",
    "mi" => "mi",
    "mk" => "mk",
    "ml" => "ml",
    "mn" => "mn",
    "mo" => "mo",
    "mr" => "mr",
    "ms" => "ms",
    "mt" => "mt",
    "my" => "my",
    "na" => "na",
    "nd" => "nd",
    "ne" => "ne",
    "ng" => "ng",
    "nl" => "nl",
    "nl-li" => "nl-li",
    "nb" => "nb",
    "nn" => "nn",
    "nr" => "nr",
    "nv" => "nv",
    "ny" => "ny",
    "oc" => "oc",
    "om" => "om",
    "or" => "or",
    "os" => "os",
    "pa" => "pa",
    "pi" => "pi",
    "pl" => "pl",
    "ps" => "ps",
    "pt" => "pt",
    "pt-br" => "pt-br",
    "qu" => "qu",
    "rm" => "rm",
    "rn" => "rn",
    "ro" => "ro",
    "ru" => "ru",
    "rw" => "rw",
    "sa" => "sa",
    "sc" => "sc",
    "sd" => "sd",
    "se" => "se",
    "sg" => "sg",
    "sh" => "sh",
    "si" => "si",
    "sk" => "sk",
    "sl" => "sl",
    "sm" => "sm",
    "sn" => "sn",
    "so" => "so",
    "sq" => "sq",
    "sr" => "sr",
    "ss" => "ss",
    "st" => "st",
    "su" => "su",
    "sv" => "sv",
    "sw" => "sw",
    "ta" => "ta",
    "te" => "te",
    "tg" => "tg",
    "th" => "th",
    "ti" => "ti",
    "tk" => "tk",
    "tl" => "tl",
    "tn" => "tn",
    "to" => "to",
    "tr" => "tr",
    "ts" => "ts",
    "tt" => "tt",
    "tw" => "tw",
    "ty" => "ty",
    "ug" => "ug",
    "uk" => "uk",
    "ur" => "ur",
    "uz" => "uz",
    "ve" => "ve",
    "vi" => "vi",
    "wo" => "wo",
    "xh" => "xh",
    "yi" => "yi",
    "yo" => "yo",
    "za" => "za",
    "zh-hans" => "zh-hans",
    "zh-hant" => "zh-hant",
    "zu" => "zu",
  );
  }
  return $languages;
}

function __localizer_isvalid_language($language = '') {
  if (($language != '') && array_key_exists($language, __localizer_get_iso639_list())) {
    return true;
  }
  else {
    return false;
  }
}

function __localizer_path_without_language($path) {
  $exploded_path = explode('/', $path);
  $languageinpath = $exploded_path[0];
  if (__localizer_isvalid_language($languageinpath)) {
    array_shift($exploded_path);
    return implode("/", $exploded_path);
  }
  else {
    return $path;
  }
}


function __localizer_language_in_path($path) {
  $exploded_path = explode('/', $path);
  $languageinpath = $exploded_path[0];
  if (__localizer_isvalid_language($languageinpath)) {
    return array_shift($exploded_path);
  }
  else {
    return '';
  }
}

function __localizer_append_language_prefix($path, $normal_path, $append_language) {
  global $locale;  
  if($locale == variable_get('localizer_default_language', 'en') &&
    variable_get('localizer_default_no_prefix', true)) {
    return false;
  }

  $pages = variable_get('localizer_language_prefix_pages', '');
  if ($pages) {
    $visibility = variable_get('localizer_language_prefix_options', 0);
    if ($visibility < 2) {
      $regexp = '/^('. preg_replace(array('/(\r\n?|\n)/', '/\\\\\*/', '/(^|\|)\\\\<front\\\\>($|\|)/'), array('|', '.*', '\1'. preg_quote(variable_get('site_frontpage', 'node'), '/') .'\2'), preg_quote($pages, '/')) .')$/';
      // Compare with the internal and path alias (if any).
      $page_match = preg_match($regexp, $path);
      if ($path != $normal_path) {
        $page_match = $page_match || preg_match($regexp, $normal_path);
      }
      // When $visibility has a value of 0, the prefix is added on
      // all pages except those listed in $pages. When set to 1, it
      // is displayed only on those pages listed in $pages.
      $page_match = !($visibility xor $page_match);
    }
    else {
      $page_match = drupal_eval($pages);
    }
    return $page_match;
  }
  else {
    return $append_language;
  }
}

function custom_url_rewrite($type, $path, $original) {
  if (variable_get('localizer_switch_byhostname', FALSE)) return $path;
  global $locale;

  $current_language = $locale;
  if ($type == 'alias' && $current_language && $current_language != '') {
    $normal_path = drupal_lookup_path('source', $path);
    if (!$normal_path) {
      $normal_path = $path;
    }
    $append_language = false;
    if (preg_match('|^node(/.*)|', $normal_path, $matches)) {
      $arg = explode('/', $normal_path);
      $nid = 0;
      if (array_key_exists(1, $arg)) $nid = $arg[1];
      $t_exists = false;
      if (module_exists('localizernode') && $nid && is_numeric($nid) && !array_key_exists(2, $arg)) {
        $r = db_query("SELECT nid FROM {localizernode} WHERE nid=%d and language='%s'", $nid, $current_language);
        if ($r && db_result($r)) {
          $t_exists = true;
        }
      }
      if (variable_get('localizer_content_language_prefix', true) || !$t_exists) {
        $append_language = true;
      }
    }
    else {
      $append_language = true;
    }
    
    $append_language = __localizer_append_language_prefix($path, $normal_path, $append_language);
    
    if (preg_match('|^files|', $normal_path, $matches)) {
      $append_language = false;
    }
    if ($append_language) {
      $path = $current_language .'/'. $path;
    }
  }
  else if ($type == 'source') {
    if (__localizer_isvalid_language($path)) $path = variable_get('site_frontpage', 'node');
    $normal_path = drupal_lookup_path('source', $path);
    if ($normal_path) {
      $path = $normal_path;
    }
    else {
      $path = __localizer_path_without_language($path);
      $normal_path = drupal_lookup_path('source', $path);
      if ($normal_path) $path = $normal_path;
    }

  }
  return $path;
}

