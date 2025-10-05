<?php

function localizerblock_find($conditions=NULL, $howmany='all', $force=FALSE) {
  static $localcache=array();

  if(array_key_exists($conditions, $localcache) && isset($localcache[$conditions . ":$howmany"]) && !$force) {
    return $localcache[$conditions];
  }

  $items = array();

  $sql = "SELECT * FROM {localizerblock}";
  if($conditions) {
    $sql .= ' WHERE ' . $conditions;
  }
  $result = db_query($sql);
  while ($item = db_fetch_object($result)) {
    $items[$item->blid]['blid'] = $item->blid;
    $items[$item->blid]['locale'] = $item->locale;
  }

  if($howmany=='one') {
    $oneitem = array();
    foreach($items as $tid=>$item) {
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

function localizerblock_findone($conditions=NULL, $force=FALSE) {
  return localizerblock_find($conditions, 'one', $force);
}

function localizerblock_findbyblid($blid, $force=FALSE) {
  return localizerblock_find("blid='$blid'", 'one', $force);
}

function localizerblock_findall($conditions=NULL, $force=FALSE) {
  return localizerblock_find($conditions, 'all', $force);
}

function localizerblock_save($item) {
  if(db_result(db_query("SELECT COUNT(blid) FROM {localizerblock} WHERE blid='%s'", $item['blid'])) > 0) {
   localizerblock_update($item);
  }
  else {
   localizerblock_insert($item);
  }
}

function localizerblock_insert($item) {
  if($item) {
    db_query("INSERT INTO {localizerblock} (blid, locale) VALUES ('%s', '%s')", $item['blid'], $item['locale']);
  }
}

function localizerblock_update($item) {
  if($item && $item['blid']) {
    db_query("UPDATE {localizerblock} SET locale='%s' WHERE blid='%s'", $item['locale'], $item['blid']);
  }
}

function localizerblock_delete($blid) {
  if($blid) {
    db_query("DELETE FROM {localizerblock} WHERE blid='%s'", $item['blid']);
  }
}

function localizerblock_deleteall($conditions) {
  if($conditions) {
    db_query('DELETE FROM {localizerblock} WHERE ' . $conditions);
  }
}

?>