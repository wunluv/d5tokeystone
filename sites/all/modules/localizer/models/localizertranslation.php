<?php
// $Id: localizertranslation.php,v 1.4.2.3 2008/08/20 12:58:40 robertogerola Exp $

function localizertranslation_find($conditions=NULL, $howmany='all', $force=FALSE) {
  static $languagecache=array();

  if (array_key_exists($conditions .":$howmany", $languagecache) && isset($languagecache[$conditions .":$howmany"]) && !$force) {
    return $languagecache[$conditions .":$howmany"];
  }

  $items = array();

  $sql = "SELECT * FROM {localizertranslation}";
  if ($conditions) {
    $sql .= ' WHERE '. $conditions;
  }
  $result = db_query($sql);
  while ($item = db_fetch_object($result)) {
    $items[$item->tid]['tid'] = $item->tid;
    $items[$item->tid]['object_name'] = $item->object_name;
    $items[$item->tid]['object_key'] = $item->object_key;
    $items[$item->tid]['object_field'] = $item->object_field;
    $items[$item->tid]['language'] = $item->language;
    $items[$item->tid]['translation'] = $item->translation;
    $items[$item->tid]['settings'] = $item->settings;
  }

  if ($howmany=='one') {
    $oneitem = array();
    foreach ($items as $tid => $item) {
      foreach ($item as $key => $value) {
        $oneitem[$key]=$value;
      }
      break;
    }
    if ($oneitem) $languagecache[$conditions .":$howmany"] = $oneitem;
    return $oneitem;
  }
  else {
    if ($items) $languagecache[$conditions .":$howmany"] = $items;
    return $items;
  }
}

function localizertranslation_findone($conditions=NULL, $force=FALSE) {
  return localizertranslation_find($conditions, 'one', $force);
}

function localizertranslation_findall($conditions=NULL, $force=FALSE) {
  return localizertranslation_find($conditions, 'all', $force);
}

function localizertranslation_save($item) {
  if (!$item['tid']) {
    $translation = localizertranslation_findone("object_name='". $item['object_name'] ."' AND object_key='". $item['object_key'] ."' AND object_field='". $item['object_field'] ."' AND language='". $item['language'] ."'");
    $item['tid'] = $translation['tid'];
  }

  if ($item['tid']) {
    return localizertranslation_update($item);
  }
  else {
    return localizertranslation_insert($item);
  }
}

function localizertranslation_insert($item) {
  if ($item && $item['translation']) {
    $item['tid']= db_next_id('{localizertranslation}_tid');
    db_query("INSERT INTO {localizertranslation} (tid, object_name, object_key, object_field, language, translation, settings) VALUES (%d, '%s', '%s', '%s', '%s', '%s', '%s')",
    $item['tid'], $item['object_name'], $item['object_key'], $item['object_field'], $item['language'], $item['translation'], $item['settings']);
    return $item['tid'];
  }
  return 0;
}

function localizertranslation_update($item) {
  if ($item && $item['tid']) {
    db_query("UPDATE {localizertranslation} SET object_name='%s', object_key='%s', object_field='%s', language='%s', translation='%s', settings='%s' WHERE tid=%d", 
    $item['object_name'], $item['object_key'], $item['object_field'], $item['language'], $item['translation'], $item['settings'], $item['tid']);
    return true;
  }
  return false;
}

function localizertranslation_delete($tid) {
  if ($tid) {
    db_query('DELETE FROM {localizertranslation} WHERE tid=%d', $tid);
  }
}

function localizertranslation_deleteall($conditions) {
  if ($conditions) {
    db_query('DELETE FROM {localizertranslation} WHERE '. $conditions);
  }
}

