<?php
// $Id: localizernode.inc,v 1.1.2.6 2008/07/15 08:52:07 robertogerola Exp $

include_once(drupal_get_path('module', 'localizer') .'/models/localizernode.php');

/**
 * Gets the translations for the current node
 * @param nid the id of the node
 * @param getitself includes also the node in the list
 */
function localizernode_get_translations($nid, $getitself = FALSE) {
  $localizernode = localizernode_find_by_nid($nid);
  $pid = $localizernode['pid'];

  if ($getitself) {
    $result = db_query('SELECT n.nid, n.title, n.status, loc.language FROM {node} n INNER JOIN {localizernode} loc ON n.nid = loc.nid AND loc.pid = %d', $pid);
  }
  else {
    $result = db_query('SELECT n.nid, n.title, n.status, loc.language FROM {node} n INNER JOIN {localizernode} loc ON n.nid = loc.nid AND loc.pid = %d AND loc.nid <> %d', $pid, $nid);
  }

  $items = array();
  while ($node = db_fetch_object($result)) {
    $items[$node->language] = $node;
  }
  return $items;
}

function localizernode_get_nids($nid) {
  $nids = array();
  $localizernode=localizernode_find_by_nid($nid);
  $pid = $localizernode['pid'];
  if ($pid) {
    $items = localizernode_findone('pid='. $pid);
    $nids = array_keys($items);
  }
  return $nids;
}

/**
 * Gets the localized node's id
 * @param nid the node id
 * @param language the language of the translated node
 * @returns the corresponding translated node's nid
 */
function localizernode_get_localized_nid($nid, $_language=NULL) {
  if (!$_language) $_language = localizer_get_language();
  static $locnids = array();
  if (array_key_exists($nid, $locnids) && array_key_exists($_language, $locnids[$nid])) {
    return $locnids[$nid][$_language];
  }

  $localizernode = localizernode_find_by_nid($nid);
  $node_language = $localizernode['language'];
  if ($_language != $node_language) {
    $pid = $localizernode['pid'];
    if ($pid) {
      $localizernode = localizernode_findone('pid='. $pid ." AND language='$_language'");
      $trnid = $localizernode['nid'];
    }
  }
  if (!$trnid) {
    $trnid = $nid;
  }
  $locnids[$nid][$_language] = $trnid;
  return $trnid;
}

/**
 * Gets the content language of the translated node
 * @param path the path of the translated node
 * @returns the content language of the corresponding translated node
 */
function localizernode_get_content_language($path) {
  $normal_path = $path;
  $s = drupal_lookup_path('source', $normal_path);
  if ($s) $normal_path = $s;
  $arguments = explode('/', $normal_path);
  $node_language = '';
  if ($arguments[0]=='node' && is_numeric($arguments[1])) {
    $localizernode = localizernode_find_by_nid($arguments[1]);
    $node_language = $localizernode['language'];
  }
  return $node_language;
}

function localizernode_get_node_pid($path) {
  $normal_path = $path;
  $s = drupal_lookup_path('source', $normal_path);
  if ($s) $normal_path = $s;

  $arguments = explode('/', $normal_path);
  $node_language = '';
  if ($arguments[0]=='node' && is_numeric($arguments[1])) {
    $localizernode = localizernode_find_by_nid($arguments[1]);
    $node_pid = $localizernode['pid'];
  }
  return $node_pid;
}

function localizernode_exists_localized_content($path, $language) {
  $normal_path = $path;
  $s = drupal_lookup_path('source', $normal_path);
  if ($s) $normal_path = $s;
  $arguments = explode('/', $normal_path);
  $node_language = '';
  if ($arguments[0]=='node' && is_numeric($arguments[1])) {
    $localizernode = localizernode_find_by_nid($arguments[1]);
    $node_pid = $localizernode['pid'];
    if ($node_pid) {
      $localizernode = localizernode_findone('pid='. $node_pid ." AND language='$language'");
      $node_nid = $localizernode['nid'];
    }
  }
  if ($node_nid) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * Gets the localized node
 * @param nid the node id
 * @param language the language of the translated node
 * @returns the corresponding translated node
 */
function localizernode_get_localized_node($_nid, $_language) {
  $trnid = localizernode_get_localized_nid($_nid, $_language);

  if ($trnid) {
    $trnode=node_load($trnid);
  }
  else {
      $trnode=node_load($_nid);
  }

  return $trnode;
}

/**
 * Gets the localized node
 * @param nid the node id
 * @param language the language of the translated node
 * @returns the corresponding translated node
 */
function localizernode_localized_node(&$_node, $_language) {
  $trnid = localizernode_get_localized_nid($_node->nid, $_language);

  if ($trnid && (localizer_get_language() != $_node->language)) {
    $_node=node_load($trnid);
  }
}

/**
 * Gets the localized path
 * @param _path the path
 * @param _language the language
 * @returns the corresponding translated path
 */
function localizernode_get_localized_path($path='', $language='') {
  static $locpaths = array();
  if ($path && $language && array_key_exists($path, $locpaths) && array_key_exists($language, $locpaths[$path])) {
    return $locpaths[$path][$language];
  }

  $normal_path = $path;
  $s = drupal_lookup_path('source', $normal_path);
  if ($s) $normal_path = $s;
  $arguments = explode('/', $normal_path);
  if ($arguments[0]=='node' && is_numeric($arguments[1]) && module_exists('localizernode')) {
    $nid = $arguments[1];
    $lnid = localizernode_get_localized_nid($nid, $language);
    $lpath = 'node/'. $lnid;
    for ($i=2; $i<sizeof($arguments); $i++) {
      $lpath .= '/'. $arguments[$i];
    }
  }
  else {
    $lpath = $path;
  }
  $locpaths[$path][$language] = $lpath;
  return $lpath;
}

