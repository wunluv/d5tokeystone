<?php
// $Id: localizeruser.php,v 1.4.2.2 2008/07/15 08:52:07 robertogerola Exp $

function localizeruser_find($conditions=NULL, $howmany='all', $force=FALSE) {
  static $localcache=array();

  if (array_key_exists($conditions, $localcache) && isset($localcache[$conditions .":$howmany"]) && !$force) {
    return $localcache[$conditions];
  }

  $items = array();

  $sql = "SELECT * FROM {localizeruser}";
  if ($conditions) {
    $sql .= ' WHERE '. $conditions;
  }
  $result = db_query($sql);
  while ($item = db_fetch_object($result)) {
    $items[$item->uid]['uid'] = $item->uid;
    $items[$item->uid]['fallbacklangorder'] = $item->fallbacklangorder;
    $items[$item->uid]['languages'] = $item->languages;
  }

  if ($howmany=='one') {
    $oneitem = array();
    foreach ($items as $nid => $item) {
      foreach ($item as $key => $value) {
        $oneitem[$key]=$value;
      }
      break;
    }
    $localecache[$conditions .":$howmany"] = $oneitem;
    return $oneitem;
  }
  else {
    $localecache[$conditions .":$howmany"] = $items;
    return $items;
  }
}
function localizeruser_findone($conditions=NULL, $force=FALSE) {
  return localizeruser_find($conditions, 'one', $force);
}

function localizeruser_findall($conditions=NULL, $force=FALSE) {
  return localizeruser_find($conditions, 'all', $force);
}

function localizeruser_findbyuid($uid, $force=FALSE) {
  return localizeruser_find("uid=$uid", 'one', $force);
}

function localizeruser_save($item) {
  if (db_result(db_query("SELECT COUNT(uid) FROM {localizeruser} WHERE uid=%d", $item['uid'])) > 0) {
    localizeruser_update($item);
  }
  else {
    localizeruser_insert($item);
  }
}

function localizeruser_insert($item) {
  if ($item) {
    db_query("INSERT INTO {localizeruser} (uid, fallbacklangorder, languages) VALUES (%d, '%s', '%s')", $item['uid'], $item['fallbacklangorder'], $item['languages']);
  }
}

function localizeruser_update($item) {
  if ($item) {
    db_query("UPDATE {localizeruser} SET fallbacklangorder='%s', languages='%s' WHERE uid=%d", $item['fallbacklangorder'], $item['languages'], $item['uid']);
  }
}

function localizeruser_delete($uid) {
  if ($uid) {
    db_query('DELETE FROM {localizeruser} WHERE uid=%d', $uid);
  }
}

function localizeruser_deleteall($conditions) {
  if ($conditions) {
    db_query('DELETE FROM {localizeruser} WHERE '. $conditions);
  }
}

