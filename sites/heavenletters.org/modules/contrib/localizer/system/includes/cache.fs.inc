<?php
function _localizer_cache_clean_locales($locales) {
  if (is_array($locales)) {
    foreach ($locales as $key => $value) {
      if (is_integer($key) || $value == '0') {
        unset($locales[$key]);
      }
    }
  }
  return $locales;
}

/**
* Get the key for using with cache system adding current locales
*
* @param $key
* The original key
* @return
* The key for cache
*/
function _localizer_cache_key($key=NULL) {
  if(!$key) return $key;
  
  $uilocale = $_SESSION['current_locale'];
  
  if($_SESSION['localizer_contentlanguages']) {
    $contentlocales = _localizer_cache_clean_locales(unserialize($_SESSION['localizer_contentlanguages']));
  }
  else {
    $contentlocales = $uilocale;  
  }
  
  if(is_array($contentlocales)) {
    $contentlocales = implode('|', $contentlocales);
  }
  
  $key = $key. '-' . $uilocale . '-' . $contentlocales;
  return $key;
}

define('FASTPATH_FSCACHE_PATH', './files/cache');

/**
 * Return data from the persistent cache.
 *
 * @param $key
 *   The cache ID of the data to retrieve.
 */
function cache_get($key, $table = 'cache') {
  if($table == 'cache_page') $key = _localizer_cache_key($key);

  global $user;
  
  $cache_lifetime = variable_get('cache_lifetime', 0);

  if (variable_get('page_cache_fastpath', 0)) {
    $cache = cache_get_file($key);
  }
  else {
    // garbage collection necessary when enforcing a minimum cache lifetime
    $cache_flush = variable_get('cache_flush', 0);
    if ($cache_flush && ($cache_flush + $cache_lifetime <= time())) {
      variable_set('cache_flush', 0);
    }
  }

  if (isset($cache->data)) {
    // If enforcing a minimum cache lifetime, validate that the data is
    // currently valid for this user before we return it by making sure the
    // cache entry was created before the timestamp in the current session's
    // cache timer. The cache variable is loaded into the $user object by
    // sess_read() in session.inc.
    if ($user->cache > $cache->created) {
      // This cache data is too old and thus not valid for us, ignore it.
      return 0;
    }
    return $cache;
  }
  return 0;
}

/**
 * Return data from the persistent disk cache.
 *
 * @param $key
 *   The cache ID of the data to retrieve.
 */
function cache_get_file($key) {
  $cache = NULL;
  $cache_file = cache_filename($key);

  if (file_exists($cache_file)) {
    if ($fp = fopen($cache_file, 'r')) {
      if (flock($fp, LOCK_SH)) {
        $data = fread($fp, filesize($cache_file));
        flock($fp, LOCK_UN);
        $cache = unserialize($data);
      }
      fclose($fp);
    }
  }

  return $cache;
}


/**
 * Store data in the persistent cache.
 *
 * @param $cid
 *   The cache ID of the data to store.
 * @param $data
 *   The data to store in the cache. Complex data types must be serialized first.
 * @param $expire
 *   One of the following values:
 *   - CACHE_PERMANENT: Indicates that the item should never be removed unless
 *     explicitly told to using cache_clear_all() with a cache ID.
 *   - CACHE_TEMPORARY: Indicates that the item should be removed at the next
 *     general cache wipe.
 *   - A Unix timestamp: Indicates that the item should be kept at least until
 *     the given time, after which it behaves like CACHE_TEMPORARY.
 * @param $headers
 *   A string containing HTTP header information for cached pages.
 */
function cache_set($cid, $table = 'cache', $data, $expire = CACHE_PERMANENT, $headers = NULL) {
  if($table == 'cache_page') $cid = _localizer_cache_key($cid);

  if (variable_get('page_cache_fastpath', 0)) {
    // prepare the cache before grabbing the file lock
    $cache->cid = $cid;
    $cache->table = $table;
    $cache->data = $data;
    $cache->created = time();
    $cache->expire = $expire;
    $cache->headers = $headers;
    $data = serialize($cache);

    if ($fp = fopen(cache_filename($cid), 'w')) {
      // only write to the cache file if we can obtain an exclusive lock
      if (flock($fp, LOCK_EX)) {
        fwrite($fp, $data);
        flock($fp, LOCK_UN);
      }
      fclose($fp);
    }
    else {
      drupal_set_message(t('Cache error, failed to open file "%file"', array('%file' => cache_filename($cid))), 'error');
    }
  }
}

/**
 * Expire data from the cache.
 *
 * @param $cid
 *   If set, the cache ID to delete. Otherwise, all cache entries that can
 *   expire are deleted.
 *
 * @param $wildcard
 *   If set to TRUE, the $cid is treated as a substring to match rather than a
 *   complete ID.
 */
function cache_clear_all($cid = NULL, $table = NULL, $wildcard = FALSE) {
  if($table == 'cache_page') $cid = _localizer_cache_key($cid);

  global $user;
  
  $file_cache = variable_get('fastpath_fscache_path', FASTPATH_FSCACHE_PATH);
  $cache_lifetime = variable_get('cache_lifetime', 0);
  
  if (empty($cid)) {
    if ($cache_lifetime || variable_get('page_cache_fastpath', 0)) {
      // We store the time in the current user's $user->cache variable which
      // will be saved into the sessions table by sess_write(). We then
      // simulate that the cache was flushed for this user by not returning
      // cached data that was cached before the timestamp.
      $user->cache = time();

      $cache_flush = variable_get('cache_flush', 0);
      $cache_files_expired = variable_get('cache_files_expired', 0);

      if (variable_get('page_cache_fastpath', 0)) {
        if ($cache_files_expired == 0) {
          // updating cache_flush invalidates all data cached before this time
          variable_set('cache_flush', time());
          // updating cache_files_expired so cron can delete expired files
          variable_set('cache_files_expired', time());
        }

        if (time() > ($cache_flush + $cache_lifetime)) {
          variable_set('cache_flush', time());
        }
      }
    }
  }
  else {
    // TODO: what about wildcards?  Won't work with md5's...
    $file = cache_filename($cid);
    if ($fp = fopen($file, 'w')) {
      // only delete the cache file once we obtain an exclusive lock to prevent
      // deleting a cache file that is currently being read.
      if (flock($fp, LOCK_EX)) {
        unlink($file);
      }
    }
  }
}

/**
 * Sanitize the cache ID for use as a filename when caching to the filesystem.
 *
 * @param $cid
 *   The unique ID of the cache data to store.
 */
function cache_filename($cid) {
  return variable_get('fastpath_fscache_path', FASTPATH_FSCACHE_PATH) .'/'. md5($cid);
}

/**
 * Main callback from DRUPAL_BOOTSTRAP_EARLY_PAGE_CACHE phase
 */
function page_cache_fastpath() {
  global $base_url;
  $file_cache = variable_get('fastpath_fscache_path', FASTPATH_FSCACHE_PATH);
  if ($file_cache && is_dir($file_cache)) {
    $cache = cache_get($base_url . request_uri());
    if (!empty($cache)) {
      // display cached page and exit
      drupal_page_header($cache);
    }
  }
  else {
    // Warning message that $file_cache isn't set. We don't have access to the
    // t() function at this point.
    //drupal_set_message(t('Cache error, failed to locate cache directory "%dir"', array('%dir' => $file_cache)), 'error');
  }
}
