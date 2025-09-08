<?php
// $Id: localizernode.admin.translations.inc,v 1.1.2.2 2008/07/15 08:52:07 robertogerola Exp $

function localizernode_translation_create($nid, $language) {
  global $user;

  $node = node_load($nid);
  $pid = $node->localizer_pid;
  $node->uid = $user->uid;
  $node->localizer_language = $language;
  $node->localizer_pid = $pid;
  $node->nid = NULL;
  $node->created = 0;
  $node->menu = NULL;
  if ($node->path && variable_get('localizer_language_prefix_on_translation', false)
  && !variable_get('localizer_content_language_prefix', true)) {
    $node->path = $language .'/'. localizer_path_without_language($node->path);
  }
  else {
    $node->path = NULL;
  }
  node_save($node);
  drupal_goto('node/'. $node->nid .'/edit');
}

function localizernode_translations() {
  global $user;
  $languages = localizer_supported_languages();
  $node = node_load(arg(1));
  drupal_set_title(check_plain($node->title));
  $form = array();

  $form['nid'] = array('#type' => 'hidden', '#value' => $node->nid);
  $form['localizer_pid'] = array('#type' => 'hidden', '#value' => $node->localizer_pid);
  $form['localizer_language'] = array('#type' => 'hidden', '#value' => $node->localizer_language);
  $form['node_language'] = array(
                            '#type' => 'item',
                            '#title' => t('Content language'),
                            '#value' => $languages[$node->localizer_language],
  );

  foreach ($languages as $l => $n) {
    $trnid = localizernode_get_localized_nid($node->nid, $l);
    if ($trnid != $node->nid) {
      $trnode = node_load($trnid);
      $form['languages']['nodefor|'. $l] = array(
        '#type' => 'item',
        '#title' => t($n),
        '#value' => l($trnode->title, 'node/'. $trnode->nid),
      );

      $operations = '';

      if (node_access('update', $trnode)) {
        $operations .= l(t('Edit'), 'node/'. $trnid .'/edit', array(),
                     'destination=node/'. $form['nid']['#value'] .'/translations');
      }
      if ((_localizer_access_translation($n) || $node->localizer_pid==$trnode->nid) && user_access('Localizer content: disconnect translations')) {
        if ($operations) $operations .= ' ';
        $operations .= l(t('Disconnect'), 'admin/content/localizer/content/translation/remove/'. $trnid, array(),
        'destination=node/'. $form['nid']['#value'] .'/translations');
      }
      if ($operations) {
        $form['operations'][$l] = array(
          '#type' => 'item',
          '#value' =>  $operations ,
        );
      }
    }
    else {
      if ($node->localizer_language == $l) continue;
      if (_localizer_access_translation($n)) {
        if (user_access('Localizer content: view all available translations')) {
          $r = db_query("SELECT n.nid, n.title FROM {node} n LEFT JOIN {localizernode} l ON n.nid=l.nid WHERE (SELECT COUNT(l2.nid) FROM {localizernode} l2 WHERE l2.pid=l.pid AND l2.language='%s')=0 AND l.language='%s'", $node->localizer_language, $l);
        }
        else if (user_access('Localizer content: view own available translations')) {
          $r = db_query("SELECT n.nid, n.title FROM {node} n LEFT JOIN {localizernode} l ON n.nid=l.nid WHERE (SELECT COUNT(l2.nid) FROM {localizernode} l2 WHERE l2.pid=l.pid AND l2.language='%s')=0 AND l.language='%s' AND n.uid=%d", $node->localizer_language, $l, $user->uid);
        }

        $nodes = array();
        while ($item = db_fetch_array($r)) {
          $nodeavail = node_load($item['nid']);
          if (node_access('view', $nodeavail, $user)) {
            $nodes[$item['nid']] = $item['title'];
          }
        }

        $nodes = array(-1 => t('- Select -')) + $nodes;
        $form['languages']['nodefor|'. $l] = array(
          '#type' => 'select',
          '#title' => t($n),
          '#default_value' => $node->localizer_pid,
          '#options' => $nodes
        );
      }
      else {
        $form['languages']['nodefor|'. $l] = array(
          '#title' => t($n),
          '#value' => t('Not assigned'),
        );
      }
      if (_localizer_access_translation($n) && user_access('Localizer content: create translations')) {
        $form['operations'][$l] = array(
          '#type' => 'item',
          '#value' => l(t('Create'), 'admin/content/localizer/content/translation/create/'. $form['nid']['#value'] .'/'. $l),
        );
      }
    }
  }
  if (_localizer_access_translation($languages[$node->localizer_language]) && user_access('Localizer content: disconnect translations')) {
    $form['remove'] = array(
      '#type' => 'item',
      '#value' => l(t('Disconnect'), 'admin/content/localizer/content/translation/remove/'. $node->nid, array(), 'destination=node/'. $node->nid .'/translations'),
    );
  }
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return $form;
}

function theme_localizernode_translations($form) {
  $o = '';
  $header = array(
                  t('Language'),
                  t('Translation'),
                  t('Operations'),
  );
  $rows = array();
  foreach (element_children($form['languages']) as $key) {
    $title = $form['languages'][$key]['#title'];
    unset($form['languages'][$key]['#title']);
    $lang = substr($key, 8);
    $rows[] = array(
                    $title,
                    drupal_render($form['languages'][$key]),
                    drupal_render($form['operations'][$lang]),
    );
  }
  $o .= '<div class="container-inline">'. drupal_render($form['node_language']) .'</div>';
  $o .= drupal_render($form['remove']);
  $o .= theme('table', $header, $rows);
  $o .= drupal_render($form);
  return $o;
}

function localizernode_translations_submit($form_id, $form_values) {
  $op = $form_values['op'];
  $nid = $form_values['nid'];
  $pid = $form_values['localizer_pid'];
  $language = $form_values['localizer_language'];
  $supported_languages = localizer_supported_languages();
  if ($op == t('Save')) {
    foreach ($form_values as $key => $value) {
      if (substr($key, 0, 7)=='nodefor' && $value>0) {
        db_query("UPDATE {localizernode} SET pid=%d WHERE nid=%d", $pid, $value);
        drupal_set_message(t($supported_languages[$lang] .' translation successfully added to this set.'));
      }
    }
  }
}

function localizernode_translation_remove($nid) {
  if ($nid) {
    $supported_languages = localizer_supported_languages();
    $node = node_load($nid);
    $pid = $node->localizer_pid;
    db_query('UPDATE {localizernode} SET pid=%d WHERE nid=%d', $nid, $nid);
    $r = db_query('SELECT nid FROM {localizernode} WHERE pid=%d AND nid<>%d', $pid, $nid);
    $nids = array();
    while ($i = db_fetch_array($r)) {
      $nids[] = $i['nid'];
    }

    $newpid = 0;
    foreach ($nids as $k => $nid) {
      if (!$newpid) $newpid = $nid;
      db_query('UPDATE {localizernode} SET pid=%d WHERE nid=%d', $newpid, $nid);
    }
    drupal_set_message(t($supported_languages[$node->localizer_language] .' translation successfully removed from this set.'));
    drupal_goto();
  }
}

