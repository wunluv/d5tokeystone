<?php
// $Id: localizernode.admin.inc,v 1.1.2.2 2008/07/15 08:52:07 robertogerola Exp $

function localizernode_content() {
  $o = drupal_get_form('localizernode_content_find');
  $o .= drupal_get_form('localizernode_content_list');

  print theme('page', $o);
}

function localizernode_content_find() {
  $form = array();

  $form['language'] = array(
    '#type' => 'select',
    '#title' => t('Language'),
    '#default_value' => $_SESSION['localizer_content_find']['language'] ? $_SESSION['localizer_content_find']['language'] : localizer_get_language(),
    '#options' => localizer_supported_languages(),
  );

  $form['language_translations'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('Language translations'),
    '#description' => t('No selection means all.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_content_find']['language_translations'],
    '#options' => localizer_supported_languages(),
  );

  $form['translations_exist'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('With language translations'),
    '#description' => t('No selection means not apply.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_content_find']['translations_exist'],
    '#options' => localizer_supported_languages(),
  );

  $form['translations_not_exist'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('Without language translations'),
    '#description' => t('No selection means not apply.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_content_find']['translations_not_exist'],
    '#options' => localizer_supported_languages(),
  );

  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => $_SESSION['localizer_content_find']['title'],
  );

  if (!$_SESSION['localizer_content_find']['results_per_page']) {
    $_SESSION['localizer_content_find']['results_per_page'] = 5;
  }
  $form['results_per_page'] = array(
    '#type' => 'textfield',
    '#size' => 5,
    '#title' => t('Results per page'),
    '#default_value' => $_SESSION['localizer_content_find']['results_per_page'],
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Search')
  );

  return $form;
}

function localizernode_content_find_submit($form_id, $form_values) {
  if ($form_values['op'] == t('Search')) {
    $_SESSION['localizer_content_find']['language'] = $form_values['language'];
    $_SESSION['localizer_content_find']['language_translations'] = $form_values['language_translations'];
    $_SESSION['localizer_content_find']['translations_exist'] = $form_values['translations_exist'];
    $_SESSION['localizer_content_find']['translations_not_exist'] = $form_values['translations_not_exist'];
    $_SESSION['localizer_content_find']['results_per_page'] = $form_values['results_per_page'];
    $_SESSION['localizer_content_find']['title'] = $form_values['title'];
    return 'admin/content/localizer/content';
  }
};

function theme_localizernode_content_find($form) {
  drupal_add_js('misc/collapse.js', 'core', 'header');
  $o  = '';
  $o .= '<fieldset class="collapsible collapsed"><legend>'. t('Search') .'</legend>';
  $o .= '<table><tbody style="border: none;">';
  $o .= '<tr>';
  $o .= '<td>'. drupal_render($form['language']) .'</td>';
  $o .= '<td>'. drupal_render($form['language_translations']) .'</td>';
  $o .= '</tr>';
  $o .= '<tr>';
  $o .= '<td>'. drupal_render($form['translations_exist']) .'</td>';
  $o .= '<td>'. drupal_render($form['translations_not_exist']) .'</td>';
  $o .= '</tr>';
  $o .= '<tr>';
  $o .= '<td colpsan="2">'. drupal_render($form['title']) .'</td>';
  $o .= '</tr>';
  $o .= '<tr>';
  $o .= '<td>'. drupal_render($form['submit']) .'</td>';
  $o .= '<td>'. drupal_render($form['results_per_page']) .'</td>';
  $o .= '</tr>';
  $o .= '</tbody></table>';
  $o .= drupal_render($form);
  $o .= '</fieldset';
  return $o;
}

function localizernode_content_list() {
  global $user;
  $form = array();

  $languages = localizer_supported_languages();
  $language_translations = $_SESSION['localizer_content_find']['language_translations'];
  $title = $_SESSION['localizer_content_find']['title'];

  $header = array(
    array(
      'data' => t('Language'),
      'field' => 'l.language'),
    array(
      'data' => t('Title'),
      'field' => 'n.title'),
    array(
      'data' => t('Operations')),
  );

  $cond = '';
  $language = $_SESSION['localizer_content_find']['language'] ? $_SESSION['localizer_content_find']['language'] : localizer_get_language();
  if ($language) {
    if ($cond) $cond .= ' AND ';
    $cond .= "language='" . $language ."'";
  }

  if ($title) {
    if ($cond) $cond .= ' AND ';
    $cond .= "LOWER(n.title) LIKE LOWER('". $title ."')";
  }

  $translations_exist = $_SESSION['localizer_content_find']['translations_exist'];
  if ($translations_exist && is_array($translations_exist)) {
    if ($cond) $cond .= ' AND ';
    $l_string = implode($translations_exist, "','");
    $count = sizeof($translations_exist);
    $cond .= "(SELECT COUNT(l1.nid) FROM {localizernode} l1 WHERE l1.pid=l.pid AND l1.language IN('". $l_string ."')) = " . $count;
  }

  $translations_not_exist = $_SESSION['localizer_content_find']['translations_not_exist'];
  if ($translations_not_exist && is_array($translations_not_exist)) {
    if ($cond) $cond .= ' AND ';
    $l_string = implode($translations_not_exist, "','");
    $cond .= "(SELECT COUNT(l2.nid) FROM {localizernode} l2 WHERE l2.pid=l.pid AND l2.language IN('". $l_string ."')) = 0";
  }

  if (user_access('Localizer content: view all available translations')) {
  }
  else if (user_access('Localizer content: view own available translations')) {
    if ($cond) $cond .= ' AND ';
    $cond .= " n.uid=" . $user->uid;
  }

  $s = "SELECT n.nid, n.title, l.language, l.pid FROM {node} n LEFT JOIN {localizernode} l ON n.nid=l.nid";
  if ($cond) $s .= ' WHERE '. $cond;

  $s .= tablesort_sql($header);

  $r = pager_query($s, $_SESSION['localizer_content_find']['results_per_page'], 0, NULL);
  $rows = array();
  while ($item = db_fetch_array($r)) {
    $node = node_load($item['nid']);
    if (!node_access('view', $node, $user)) continue;
    $translations = localizernode_get_translations($item['nid']);

    foreach ($languages as $l => $n) {
      if ($l == $item['language']) continue;
      if (sizeof($language_translations)>0 && !array_key_exists($l, $language_translations)) continue;

      $key = 'nodefor-'. $item['nid'] .'-'. $item['pid'] .'-'. $l;
      $form['nodes'][$item['nid']]['translations']['language'][$key] = array(
        '#value' => $n,
      );

      if (array_key_exists($l, $translations)) {
        $trnode = $translations[$l];
        $form['nodes'][$item['nid']]['translations']['title'][$key] = array(
          '#value' => l($trnode->title, 'node/'. $trnode->nid),
        );

        $operations = '';
        if (node_access('update', $trnode)) {
          $operations .= l(t('Edit'), 'node/'. $trnode->nid .'/edit', array(), 'destination=admin/content/localizer/content');
        }
        if ((_localizer_access_translation($n) || $node->localizer_pid==$trnode->nid) && user_access('Localizer content: disconnect translations')) {
          if ($operations) $operations .= ' ';
          $operations .= l(t('Disconnect'), 'admin/content/localizer/content/translation/remove/'. $trnode->nid, array(), 'destination=admin/content/localizer/content');
        }
        if ($operations) {
          $form['nodes'][$item['nid']]['translations']['operations'][$key] = array(
            '#value' =>  $operations,
          );
        }
      }
      else {
        if (_localizer_access_translation($n)) {
        if (user_access('Localizer content: view all available translations')) {
          $r_nodes = db_query("SELECT n.nid, n.title FROM {node} n LEFT JOIN {localizernode} l ON n.nid=l.nid WHERE (SELECT COUNT(l2.nid) FROM {localizernode} l2 WHERE l2.pid=l.pid AND l2.language='%s')=0 AND l.language='%s'", $item['language'], $l);
        }
        else if (user_access('Localizer content: view own available translations')) {
          $r_nodes = db_query("SELECT n.nid, n.title FROM {node} n LEFT JOIN {localizernode} l ON n.nid=l.nid WHERE (SELECT COUNT(l2.nid) FROM {localizernode} l2 WHERE l2.pid=l.pid AND l2.language='%s')=0 AND l.language='%s' AND n.uid=%d", $item['language'], $l, $user->uid);
        }

          $nodes = array();
          while ($tritem = db_fetch_array($r_nodes)) {
            $nodes[$tritem['nid']] = $tritem['title'];
          }
          $form['nodes'][$item['nid']]['translations']['title'][$key] = array(
            '#type' => 'select',
            '#options' => array(-1 => t('- Select -')) + $nodes,
          );
        }
        else {
          $form['nodes'][$item['nid']]['translations']['title'][$key] = array(
          '#title' => t($n),
          '#value' => t('Not assigned'),
          );
        }
        if (_localizer_access_translation($n) && user_access('Localizer content: create translations')) {
          $form['nodes'][$item['nid']]['translations']['operations'][$key] = array(
            '#value' => l(t('Create'), 'admin/content/localizer/content/translation/create/'. $item['nid'] .'/'. $l),
          );
        }
      }
    }

    $form['nodes'][$item['nid']]['language'] = array(
      '#type' => 'checkbox',
      '#title' => $languages[$item['language']]
    );

    $form['nodes'][$item['nid']]['title'] = array(
      '#value' => l($item['title'], 'node/'. $item['nid'])
    );

    $operations = '';
    if (node_access('update', $node)) {
      $operations .= l(t('Edit'), 'node/'. $node->nid .'/edit', array(), 'destination=admin/content/localizer/content');
    }
    if (_localizer_access_translation($languages[$node->localizer_language]) && user_access('Localizer content: disconnect translations')) {
      if ($operations) $operations .= ' ';
        $operations .= l(t('Disconnect'), 'admin/content/localizer/content/translation/remove/'. $node->nid, array(), 'destination=admin/content/localizer/content');
    }
    if ($operations) {
      $form['nodes'][$item['nid']]['operations'] = array(
        '#value' =>  $operations,
        );
    }
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save')
  );

  $form['pager'] = array('#value' => theme('pager', NULL, $_SESSION['localizer_content_find']['results_per_page'], 0));
  $form['header'] = array('#value' => $header);
  return $form;
}

function localizernode_content_list_submit($form_id, $form_values) {
  if ($form_values['op'] == t('Save')) {
    $supported_languages = localizer_supported_languages();
    foreach ($form_values as $key => $value) {
      if (substr($key, 0, 7)=='nodefor' && $value>0) {
        $nodefor = explode('-', $key);
        $pid = $nodefor[2];
        db_query("UPDATE {localizernode} SET pid=%d WHERE nid=%d", $pid, $value);
        drupal_set_message(t($supported_languages[$lang] .' translation successfully added to this set.'));
      }
    }
  }
}

function localizernode_content_list_validate($form_id, $form_values) {
  if ($form_values['op'] == t('Save')) {
    $nodeforlist = array();
    foreach ($form_values as $key => $value) {
      if (substr($key, 0, 7)=='nodefor') {
        $nodeforlist[$key] = $value;
      }
    }

    $nodeforlist = array_reverse($nodeforlist);
    $c = sizeof($nodeforlist);
    for ($i=0; $i<$c; $i++) {
      $nodefor = array_slice($nodeforlist, 0, 1);
      array_shift($nodeforlist);
      $key = key($nodefor);
      $value = $nodefor[$key];
      if ($value>0 && in_array($value, $nodeforlist)) {
        form_set_error($key, t('You cannot assign the same translation to multiple sets.'));
      }
    }
  }
}

function theme_localizernode_content_list($form) {
  drupal_add_js('misc/collapse.js', 'core', 'header');
  $pre = '<fieldset class="collapsible collapsed"><legend>'. t('Translations') .'</legend>';
  $suf = '</fieldset>';

  $header = $form['header']['#value'];
  unset($form['header']);

  $rows = array();
  foreach (element_children($form['nodes']) as $nid) {
    $rows[] = array(
      drupal_render($form['nodes'][$nid]['language']),
      drupal_render($form['nodes'][$nid]['title']),
      drupal_render($form['nodes'][$nid]['operations']),
    );

    $trows = array();
    foreach (element_children($form['nodes'][$nid]['translations']['title']) as $key) {
      $trows[] = array(
        drupal_render($form['nodes'][$nid]['translations']['language'][$key]),
        drupal_render($form['nodes'][$nid]['translations']['title'][$key]),
        drupal_render($form['nodes'][$nid]['translations']['operations'][$key]),
      );
    }

    $rows[] = array(
      array(
             'data' => $pre . theme('table', array(), $trows) . $suf,
             'colspan' => 3,
      ),
    );
  }

  $o = theme('table', $header, $rows);
  $o .= drupal_render($form['pager']);
  $o .= drupal_render($form);
  return $o;
}

