<?php
// $Id: simplefeed_views.inc,v 1.4 2007/10/03 21:19:05 m3avrck Exp $

/**
 * Implementation of hook_views_tables().
 */
function simplefeed_views_tables() {
  $tables['simplefeed'] = array(
    'name' => 'simplefeed',
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
        'name' => t('SimpleFeed Feed: Expires'),
        'sortable' => TRUE,
        'handler' => views_handler_field_dates(),
        'option' => 'string',
        'help' => t('The default expiration date for a feed.')
      ),
      'refresh' => array(
        'name' => t('SimpleFeed Feed: Refresh'),
        'sortable' => TRUE,
        'handler' => views_handler_field_dates(),
        'option' => 'string',
        'help' => t('How often a feed should be refreshed.')
      ),
      'url' => array(
        'name' => t('SimpleFeed Feed: URL'),
        'help' => t('The URL to the RSS feed.')
      )
    ),
    'sorts' => array(
      'expires' => array(
        'name' => t('SimpleFeed Feed: Expires'),
        'handler' => 'views_handler_sort_data',
        'option' => views_handler_sort_date_options(),
        'help' => t('Sort by the default expiration date for a feed.')
      ),
      'refresh' => array(
        'name' => t('SimpleFeed Feed: Refresh'),
        'handler' => 'views_handler_sort_data',
        'option' => views_handler_sort_date_options(),
        'help' => t('Sort by the default refresh time period for a feed.')
      )
    ),
    'filters' => array(
      'expires' => array(
        'name' => t('SimpleFeed Feed: Expires'),
        'operator' => 'views_handler_operator_gtlt',
        'value' => views_handler_filter_date_value_form(),
        'handler' => 'views_handler_filter_timestamp',
        'option' => 'string',
        'help' => t('Filter by the default expiration date for a feed. ') .' '. views_t_strings('filter date'),
      ),
      'refresh' => array(
        'name' => t('SimpleFeed Feed: Refresh'),
        'operator' => 'views_handler_operator_gtlt',
        'value' => views_handler_filter_date_value_form(),
        'handler' => 'views_handler_filter_timestamp',
        'option' => 'string',
        'help' => t('Filter by the default refresh time period for a feed. ') .' '. views_t_strings('filter date'),
      )
    )
  );

  return $tables;
}