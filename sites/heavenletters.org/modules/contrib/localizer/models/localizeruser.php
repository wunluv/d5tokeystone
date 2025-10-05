<?php

function localizeruser_find($conditions=NULL, $howmany='all', $force=FALSE) {
  static $localcache=array();

  if(array_key_exists($conditions, $localcache) && isset($localcache[$conditions . ":$howmany"]) && !$force) {
    return $localcache[$conditions];
  }

  $items = array();

  $sql = "SELECT * FROM {localizeruser}";
  if($conditions) {
    $sql .= ' WHERE ' . $conditions;
  }
  $result = db_query($sql);
  while ($item = db_fetch_object($result)) {
    $items[$item->uid]['uid'] = $item->uid;
    $items[$item->uid]['contentlocales'] = $item->contentlocales;
    $items[$item->uid]['switch_uicontent'] = $item->switch_uicontent;
  }

  if($howmany=='one') {
    $oneitem = array();
    foreach($items as $nid=>$item) {
      foreach($item as $key=>$value) {
        $oneitem[$key]=$value;
      }
      break;
    }
    $localecache[$conditions . ":$howmany"] = $oneitem;
    return $oneitem;
  }
  else {
    $localecache[$conditions . ":$howmany"] = $items;
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
  if(db_result(db_query("SELECT COUNT(uid) FROM {localizeruser} WHERE uid=%d", $item['uid'])) > 0) {
   localizeruser_update($item);
  }
  else {
   localizeruser_insert($item);
  }
}

function localizeruser_insert($item) {
  if($item) {
    db_query("INSERT INTO {localizeruser} (uid, contentlocales, switch_uicontent) VALUES (%d, '%s', %d)", $item['uid'], $item['contentlocales'], $item['switch_uicontent']);
  }
}

function localizeruser_update($item) {
  if($item) {
    db_query("UPDATE {localizeruser} SET contentlocales='%s', switch_uicontent='%s' WHERE uid=%d", $item['contentlocales'], $item['switch_uicontent'], $item['uid']);
  }
}

function localizeruser_delete($uid) {
  if($uid) {
    db_query('DELETE FROM {localizeruser} WHERE uid=' . $uid);
  }
}

function localizeruser_deleteall($conditions) {
  if($conditions) {
    db_query('DELETE FROM {localizeruser} WHERE ' . $conditions);
  }
}

?>