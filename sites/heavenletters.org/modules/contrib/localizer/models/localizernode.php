<?php

function localizernode_find($conditions=NULL, $howmany='all', $force=FALSE) {
  static $localecache=array();
 
  if(array_key_exists($conditions . ":$howmany", $localecache) && isset($localecache[$conditions . ":$howmany"]) && !$force) {
    return $localecache[$conditions . ":$howmany"];
  }

  $items = array();

  $sql = "SELECT * FROM {localizernode}";
  if($conditions) {
    $sql .= ' WHERE ' . $conditions;
  }
  
  $result = db_query($sql);
  while ($item = db_fetch_object($result)) {
    $items[$item->nid]['nid'] = $item->nid;
    $items[$item->nid]['pid'] = $item->pid;
    $items[$item->nid]['locale'] = $item->locale;
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

function localizernode_findone($conditions=NULL, $force=FALSE) {
  return localizernode_find($conditions, 'one', $force);
}

function localizernode_findall($conditions=NULL, $force=FALSE) {
  return localizernode_find($conditions, 'all', $force);
}

function localizernode_findbynid($nid, $force=FALSE) {
  return localizernode_find("nid=$nid", 'one', $force);
}

function localizernode_save($item) {
  if(db_result(db_query("SELECT COUNT(nid) FROM {localizernode} WHERE nid=%d", $item['nid'])) > 0) {
   localizernode_update($item);
  }
  else {
   if(!$item['pid'])$item['pid'] = $item['nid'];
   localizernode_insert($item);
  }
}

function localizernode_insert($item) {
  if($item) {
    db_query("INSERT INTO {localizernode} (nid, pid, locale) VALUES (%d, %d, '%s')", $item['nid'], $item['pid'], $item['locale']);
  }
}

function localizernode_update($item) {
  if($item) {
    db_query("UPDATE {localizernode} SET pid=%d, locale='%s' WHERE nid=%d", $item['pid'], $item['locale'], $item['nid']);
  }
}

function localizernode_delete($nid) {
  if($nid) {
    db_query('DELETE FROM {localizernode} WHERE nid=' . $nid);
  }
}

function localizernode_delete_all($conditions) {
  if($conditions) {
    db_query('DELETE FROM {localizernode} WHERE ' . $conditions);
  }
}

?>
