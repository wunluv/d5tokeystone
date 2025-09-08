<?php
// $Id: simplefeed_item_views.inc,v 1.6 2007/10/03 21:19:05 m3avrck Exp $

/**
 * Implementation of hook_views_tables().
 */
function simplefeed_item_views_tables() {
  $tables['simplefeed_feed_item'] = array(
    'name' => 'simplefeed_feed_item',
    'join' => array(
      'left' => array(
        'table' => 'node',
        'field' => 'vid'
      ),
      'right' => array(
        'field' => 'vid'
      )
    ),
    'fields' => array(
      'expires' => array(
        'name' => t('SimpleFeed Feed Item: Expires'),
        'sortable' => TRUE,
        'handler' => views_handler_field_dates(),
        'option' => 'string',
        'help' => t('The default expiration date for a feed item.')
      ),
      'url' => array(
        'name' => t('SimpleFeed Feed Item: URL'),
        'help' => t('The URL to the original page for this feed item.')
      ),
      'title' => array(
        'field' => 'url',
        'name' => t('SimpleFeed Feed Item: Article title'),
        'handler' => 'views_handler_field_feed_item_title',
        'query_handler' => 'views_query_handler_field_feed_item_title',
        'option' => array(
          '#type' => 'select',
          '#options' => array(
            1 => t('As link'),
            0 => t('Without link'),
          ),
        ),
        'help' => t('The Title of the original page.')
      )
    ),
    'sorts' => array(
      'expires' => array(
        'name' => t('SimpleFeed Feed Item: Expires'),
        'handler' => 'views_handler_sort_data',
        'option' => views_handler_sort_date_options(),
        'help' => t('Sort by the default expiration date for a feed item.')
      )
    ),
    'filters' => array(
      'expires' => array(
        'name' => t('SimpleFeed Feed Item: Expires'),
        'operator' => 'views_handler_operator_gtlt',
        'value' => views_handler_filter_date_value_form(),
        'handler' => 'views_handler_filter_timestamp',
        'option' => 'string',
        'help' => t('Filter by the default expiration date for a feed item. ') .' '. views_t_strings('filter date'),
      ),
      'fid' => array(
        'name' => t('SimpleFeed Feed Item: Parent Feed Node ID'),
        'list' => 'views_handler_filter_feed_parent',
        'operator' => 'views_handler_operator_andor',
        'help' => t('This allows you to filter feed items based on parent feed.'),
      ),
    )
  );

  // reference the node table using an alias table name
  $tables['feed_parent_node'] = array(
    'name' => 'node',
    'provider' => 'internal',
    'join' => array(
      'left' => array(
        'table' => 'simplefeed_feed_item',
        'field' => 'fid'
      ),
      'right' => array(
        'field' => 'nid'
      )
    ),
    'fields' => array(
      'title' => array(
        'name' => t('SimpleFeed Feed Item: Parent Feed Title'),
        'handler' => array(
          'views_handler_field_feed_parent_title'    => t('As Link'),
          'views_handler_field_feed_parent_title_nl' => t('Without Link'),
        ),
        'addlfields' => array('nid'),
        'help' => t('Display the title of the parent feed node.'),
      ),
    ),
    'sorts' => array(
      'title' => array(
        'name' => t('SimpleFeed Feed Item: Parent Feed Title'),
        'help' => t('Sort by the title of the parent feed node.'),
      ),
    ),
  );

  return $tables;
}


/**
 * Implementation of hook_views_arguments().
 */
function simplefeed_item_views_arguments() {
  $arguments = array(
    'feed_parent' => array(
      'name' => t('SimpleFeed Feed Item: Parent Feed Node ID'),
      'handler' => 'views_handler_arg_feed_parent',
      'help' => t('This argument will find all feed items for the specified feed node id.'),
    ),
  );
  return $arguments;
}


/**
 * Filter feed items based on parent feed.
 */
function views_handler_filter_feed_parent() {
  $parents = array();
  $result = db_query("SELECT DISTINCT fid FROM {simplefeed_feed_item} ORDER BY fid");
  while ($obj = db_fetch_object($result)) {
    $parents[$obj->fid] = "$obj->fid";
  }
  return $parents;
}


/**
 * Pass in a URL argument to find all feed items for a specific feed node id.
 */
function views_handler_arg_feed_parent($op, &$query, $a1, $a2 = '') {
  switch ($op) {
    case 'summary':
      $query->ensure_table('feed_parent_node');
      $query->add_field('nid');
      $query->add_field('fid', 'simplefeed_feed_item');
      $query->add_field('title', 'feed_parent_node');
      $query->add_field('nid', 'feed_parent_node', 'fpnid');
      $query->add_where('feed_parent_node.nid IS NOT NULL');
      $fieldinfo['field'] = 'feed_parent_node.title';
      return $fieldinfo;
    case 'sort':
      $query->add_orderby('feed_parent_node', 'title', $a1);
      break;
    case 'filter':
      $query->ensure_table('simplefeed_feed_item');
      $query->add_where('simplefeed_feed_item.fid = %d', $a2);
      $query->add_where('simplefeed_feed_item.vid = node.vid');
      break;
    case 'link':
      $query->num_nodes .= format_plural($query->num_nodes, ' item', ' items');
      return l($query->title, "$a2/$query->fpnid");
    case 'title':
      if ($query) {
        $title = db_result(db_query('SELECT title FROM {node} WHERE nid = %d', $query));
        return check_plain($title);
      }
  }
}

/**
 * Add additional query information to the article title field
 */
function views_query_handler_field_feed_item_title($fielddata, $fieldinfo, &$query) {
  $query->add_field('title', 'node');
}

/**
 * Format a field as a title to the article (possibly as a link)
 */
function views_handler_field_feed_item_title($fieldinfo, $fielddata, $value, $data) {
  if ($fielddata['options']) {
    return l($data->title, $value);
  }
  else {
    return check_plain($data->title);
  }
}

/*
 * Format a field as a link to the book parent node
 */
function views_handler_field_feed_parent_title($fieldinfo, $fielddata, $value, $data) {
  return l($value, "node/$data->feed_parent_node_nid");
}

function views_handler_field_feed_parent_title_nl($fieldinfo, $fielddata, $value, $data) {
  return check_plain($value);
}


/**
 * Implementation of hook_views_default_views().
 */
function simplefeed_item_views_default_views() {
  // feeds overview page
  $view = new stdClass();
  $view->name = 'feeds';
  $view->description = t('Show a listing of all feeds and links to see each feed.');
  $view->access = array();
  $view->view_args_php = '';
  $view->page = TRUE;
  $view->page_title = t('Feeds');
  $view->page_header = '';
  $view->page_header_format = '1';
  $view->page_footer = '';
  $view->page_footer_format = '1';
  $view->page_empty = t('No feed items found.');
  $view->page_empty_format = '1';
  $view->page_type = 'teaser';
  $view->url = 'feeds';
  $view->use_pager = TRUE;
  $view->nodes_per_page = '10';
  $view->sort = array (
    array (
      'tablename' => 'node',
      'field' => 'created',
      'sortorder' => 'DESC',
      'options' => 'normal',
    ),
  );
  $view->argument = array (
    array (
      'type' => 'feed_parent',
      'argdefault' => '4',
      'title' => '%1',
      'options' => '',
      'wildcard' => '',
      'wildcard_substitution' => '',
    ),
  );
  $view->field = array (
    array (
      'tablename' => 'node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_nodelink',
      'options' => 'link',
    ),
    array (
      'tablename' => 'node',
      'field' => 'body',
      'label' => '',
      'handler' => 'views_handler_field_teaser',
    ),
    array (
      'tablename' => 'feed_parent_node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_feed_parent_title',
    ),
  );
  $view->filter = array (
    array (
      'tablename' => 'node',
      'field' => 'status',
      'operator' => '=',
      'options' => '',
      'value' => '1',
    ),
    array (
      'tablename' => 'node',
      'field' => 'type',
      'operator' => 'OR',
      'options' => '',
      'value' => array (
      0 => 'feed_item',
    ),
  ),
  );
  $view->exposed_filter = array();
  $view->requires = array(node, feed_parent_node);
  $views[$view->name] = $view;

  // last feed items view
  $view = new stdClass();
  $view->name = 'feeds_latest';
  $view->description = 'Show the latest feeds items.';
  $view->access = array();
  $view->view_args_php = '';
  $view->page = TRUE;
  $view->page_title = 'Latest feeds';
  $view->page_header = '';
  $view->page_header_format = '1';
  $view->page_footer = '';
  $view->page_footer_format = '1';
  $view->page_empty = t('No feed items found.');
  $view->page_empty_format = '1';
  $view->page_type = 'teaser';
  $view->url = 'feeds/latest';
  $view->use_pager = TRUE;
  $view->nodes_per_page = '10';
  $view->sort = array (
    array (
      'tablename' => 'node',
      'field' => 'created',
      'sortorder' => 'DESC',
      'options' => 'normal',
    ),
  );
  $view->argument = array (
  );
  $view->field = array (
    array (
      'tablename' => 'node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_nodelink',
      'options' => 'link',
    ),
    array (
      'tablename' => 'node',
      'field' => 'body',
      'label' => '',
      'handler' => 'views_handler_field_teaser',
    ),
    array (
      'tablename' => 'feed_parent_node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_feed_parent_title',
    ),
  );
  $view->filter = array (
    array (
      'tablename' => 'node',
      'field' => 'status',
      'operator' => '=',
      'options' => '',
      'value' => '1',
    ),
    array (
      'tablename' => 'node',
      'field' => 'type',
      'operator' => 'OR',
      'options' => '',
      'value' => array (
      0 => 'feed_item',
    ),
  ),
  );
  $view->exposed_filter = array ();
  $view->requires = array(node, feed_parent_node);
  $views[$view->name] = $view;

  // latest feeds block
  $view = new stdClass();
  $view->name = 'feeds_latest_block';
  $view->description = 'Show the latest feeds items in a block.';
  $view->access = array ();
  $view->view_args_php = '';
  $view->url = 'feeds/latest';
  $view->block = TRUE;
  $view->block_title = 'Latest feeds';
  $view->block_header = '';
  $view->block_header_format = '1';
  $view->block_footer = '';
  $view->block_footer_format = '1';
  $view->block_empty = t('No feed items found.');
  $view->block_empty_format = '1';
  $view->block_type = 'list';
  $view->nodes_per_block = '10';
  $view->block_more = TRUE;
  $view->block_use_page_header = FALSE;
  $view->block_use_page_footer = FALSE;
  $view->block_use_page_empty = FALSE;
  $view->sort = array (
    array (
      'tablename' => 'node',
      'field' => 'created',
      'sortorder' => 'DESC',
      'options' => 'normal',
    ),
  );
  $view->argument = array (
  );
  $view->field = array (
    array (
      'tablename' => 'node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_nodelink',
      'options' => 'link',
    ),
    array (
      'tablename' => 'feed_parent_node',
      'field' => 'title',
      'label' => '',
      'handler' => 'views_handler_field_feed_parent_title',
    ),
  );
  $view->filter = array (
    array (
      'tablename' => 'node',
      'field' => 'status',
      'operator' => '=',
      'options' => '',
      'value' => '1',
    ),
    array (
      'tablename' => 'node',
      'field' => 'type',
      'operator' => 'OR',
      'options' => '',
      'value' => array (
      0 => 'feed_item',
    ),
  ),
  );
  $view->exposed_filter = array ();
  $view->requires = array(node, feed_parent_node);
  $views[$view->name] = $view;

  return $views;
}