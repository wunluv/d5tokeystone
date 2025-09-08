<?php
// $Id: localizer.admin.inc,v 1.1.2.3 2008/09/11 08:17:42 robertogerola Exp $

function localizer_strings() {
  $o = drupal_get_form('localizer_strings_find');
  $o .= drupal_get_form('localizer_strings_list');

  print theme('page', $o);
}

function localizer_strings_list() {
  $languages = localizer_supported_languages();
  $language_translations = $_SESSION['localizer_strings_find']['language_translations'];

  $header = array(
    array(
      'data' => t('Language'),
      'field' => 'l.language'),
    array(
      'data' => t('Text'),
      'field' => 'l.translation'),
    array(
      'data' => t('Operations')),
  );

  $cond = '';
  $language = $_SESSION['localizer_strings_find']['language']? $_SESSION['localizer_strings_find']['language'] : localizer_get_language();
  if ($language) {
    if ($cond) $cond .= ' AND ';
    $cond .= "language='". $language ."'";
  }

  $translations_exist = $_SESSION['localizer_strings_find']['translations_exist'];
  if ($translations_exist && is_array($translations_exist)) {
    if ($cond) $cond .= ' AND ';
    $l_string = implode($translations_exist, "','");
    $count = sizeof($translations_exist);
    $cond .= "(SELECT COUNT(l1.tid) FROM {localizertranslation} l1 WHERE l1.object_name=l.object_name AND l1.object_key=l.object_key AND l1.object_field=l.object_field  AND l1.language IN('". $l_string ."') AND l1.translation <> '') = ". $count;
  }

  $translations_not_exist = $_SESSION['localizer_strings_find']['translations_not_exist'];
  if ($translations_not_exist && is_array($translations_not_exist)) {
    if ($cond) $cond .= ' AND ';
    $l_string = implode($translations_not_exist, "','");
    $cond .= "(SELECT COUNT(l1.tid) FROM {localizertranslation} l1 WHERE l1.object_name=l.object_name AND l1.object_key=l.object_key AND l1.object_field=l.object_field  AND l1.language IN('". $l_string ."') AND l1.translation <> '') = 0";
  }

  $translation = $_SESSION['localizer_strings_find']['translation'];
  if ($translation) {
    if ($cond) $cond .= ' AND ';
    $cond .= "LOWER(translation) LIKE LOWER('". $translation ."')";
  }

  $s = "SELECT * FROM {localizertranslation} l";
  if ($cond) $s .= ' WHERE '. $cond;
  $tablesort = tablesort_sql($header);
  $r = pager_query($s, $_SESSION['localizer_strings_find']['results_per_page'], 0, NULL);
  $rows = array();
  while ($item = db_fetch_array($r)) {
    $form['items'][$item['tid']]['language'] = array(
       '#type' => 'checkbox',
       '#title' => $languages[$item['language']],
    );

    $form['items'][$item['tid']]['translation'] = array(
       '#value' => $item['translation'],
    );

    if (_localizer_access_translation($languages[$item['language']]) && user_access('Localizer strings: delete translations')) {
      $form['items'][$item['tid']]['operations'] = array(
        '#value' => l(t('Delete'), 'admin/content/localizer/strings/delete/'. $item['tid'], array(), 'destination=admin/content/localizer/strings'),
      );
    }

    $translations = array();
    $ts = "SELECT tid, translation, language FROM {localizertranslation} WHERE object_key='%s' AND object_name='%s' AND object_field='%s'";
    $tr = db_query($ts, $item['object_key'], $item['object_name'], $item['object_field']);
    while ($t = db_fetch_array($tr)) {
      $translations[$t['language']]['translation'] = $t['translation'];
      $translations[$t['language']]['tid'] = $t['tid'];
    }

    foreach ($languages as $l => $n) {
      if ($l == $item['language']) continue;
      if (sizeof($language_translations)>0 && !array_key_exists($l, $language_translations)) continue;
      if (array_key_exists($l, $translations)) {
        $translation = $translations[$l]['translation'];
      }
      else {
        $translation = $item['translation'];
      }
      $key = 'translationfor|'. $item['object_key'] .'|'. $item['object_name'] .'|'. $item['object_field'] .'|'. $l;
      $form['items'][$item['tid']]['translations']['language'][$key] = array(
       '#value' => $n,
      );

      if (_localizer_access_translation($n)) {
        $form['items'][$item['tid']]['translations']['translation'][$key] = array(
          '#type' => 'textarea',
          '#default_value' => $translation,
        );
        if (user_access('Localizer strings: delete translations')) {
          $form['items'][$item['tid']]['translations']['operations'][$key] = array(
            '#value' => l(t('Delete'), 'admin/content/localizer/strings/delete/'. $translations[$l]['tid'] , array(), 'destination=admin/content/localizer/strings'),
          );
        }
      }
      else {
        $form['items'][$item['tid']]['translations']['translation'][$key] = array(
          '#value' => $translation,
        );
      }
    }
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save')
  );

  $form['pager'] = array('#value' => theme('pager', NULL, $_SESSION['localizer_strings_find']['results_per_page'], 0));
  $form['header'] = array('#value' => $header);
  return $form;
}

function theme_localizer_strings_list($form) {
  drupal_add_js('misc/collapse.js', 'core', 'header');
  $pre = '<fieldset class="collapsible collapsed"><legend>'. t('Translations') .'</legend>';
  $suf = '</fieldset>';

  $header = $form['header']['#value'];
  unset($form['header']);

  $rows = array();
  foreach (element_children($form['items']) as $tid) {
    $rows[] = array(
      drupal_render($form['items'][$tid]['language']),
      drupal_render($form['items'][$tid]['translation']),
      drupal_render($form['items'][$tid]['operations']),
    );
    $trows = array();
    foreach (element_children($form['items'][$tid]['translations']['language']) as $key) {
      $trows[] = array(
        drupal_render($form['items'][$tid]['translations']['language'][$key]),
        drupal_render($form['items'][$tid]['translations']['translation'][$key]),
        drupal_render($form['items'][$tid]['translations']['operations'][$key]),
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

function localizer_strings_list_submit($form_id, $form_values) {
  if ($form_values['op'] == t('Save')) {
    $supported_languages = localizer_supported_languages();
    foreach ($form_values as $key => $value) {
      if (substr($key, 0, 14)=='translationfor') {
        $translationfor = explode('|', $key);
        $t = array();
        
        $item = localizertranslation_findone("object_name='". $translationfor[2] ."'  AND object_key = '". $translationfor[1] ."' AND language='" . localizer_get_default_language() ."'");
        $t['object_key'] = $translationfor[1];
        $t['object_name'] = $translationfor[2];
        $t['object_field'] = $translationfor[3];
        $t['language'] = $translationfor[4];
        $t['translation'] = $value;
        $t['settings'] = $item['settings'];
        if (localizertranslation_save($t)) {
          drupal_set_message(t($supported_languages[$t['language']] .' translation successfully saved.'));
        }
      }
    }
  }
}

function localizer_strings_find() {
  $form = array();

  $form['language'] = array(
    '#type' => 'select',
    '#title' => t('Language'),
    '#default_value' => $_SESSION['localizer_strings_find']['language']? $_SESSION['localizer_strings_find']['language'] : localizer_get_language(),
    '#options' => localizer_supported_languages(),
  );

  $form['language_translations'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('Language translations'),
    '#description' => t('No selection means all.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_strings_find']['language_translations'],
    '#options' => localizer_supported_languages(),
  );

  $form['translations_exist'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('With language translations'),
    '#description' => t('No selection means not apply.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_strings_find']['translations_exist'],
    '#options' => localizer_supported_languages(),
  );

  $form['translations_not_exist'] = array(
    '#type' => 'select',
    '#size' => 5,
    '#multiple' => true,
    '#title' => t('Without language translations'),
    '#description' => t('No selection means not apply.<br />Select/deselect criteria by clicking on the item while holding ctrl-key.'),
    '#default_value' => $_SESSION['localizer_strings_find']['translations_not_exist'],
    '#options' => localizer_supported_languages(),
  );

  $form['translation'] = array(
    '#type' => 'textfield',
    '#title' => t('Translation'),
    '#default_value' => $_SESSION['localizer_strings_find']['translation'],
  );

  if (!$_SESSION['localizer_strings_find']['results_per_page']) {
    $_SESSION['localizer_strings_find']['results_per_page'] = 5;
  }
  $form['results_per_page'] = array(
    '#type' => 'textfield',
    '#size' => 5,
    '#title' => t('Results per page'),
    '#default_value' => $_SESSION['localizer_strings_find']['results_per_page'],
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Search')
  );

  return $form;
}

function localizer_strings_find_submit($form_id, $form_values) {
  if ($form_values['op'] == t('Search')) {
    $_SESSION['localizer_strings_find']['language'] = $form_values['language'];
    $_SESSION['localizer_strings_find']['language_translations'] = $form_values['language_translations'];
    $_SESSION['localizer_strings_find']['translation'] = $form_values['translation'];
    $_SESSION['localizer_strings_find']['translations_exist'] = $form_values['translations_exist'];
    $_SESSION['localizer_strings_find']['translations_not_exist'] = $form_values['translations_not_exist'];
    $_SESSION['localizer_strings_find']['results_per_page'] = $form_values['results_per_page'];
    return 'admin/content/localizer/strings';
  }
}

function theme_localizer_strings_find($form) {
  drupal_add_js('misc/collapse.js', 'core', 'header');
  $o  = '';
  $o .= '<fieldset class="collapsible collapsed"><legend>'. t('Search') .'</legend>';
  $o .= '<table><tbody style="border: none;">';
  $o .= '<tr>';
  $o .= '<td>'. drupal_render($form['language']) .'</td>';
  $o .= '<td>'. drupal_render($form['language_translations']) .'</td>';
  $o .= '<tr>';
  $o .= '<tr>';
  $o .= '<td>'. drupal_render($form['translations_exist']) .'</td>';
  $o .= '<td>'. drupal_render($form['translations_not_exist']) .'</td>';
  $o .= '</tr>';
  $o .= '<tr>';
  $o .= '<td colspan="2">'. drupal_render($form['translation']) .'</td>';
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

function localizer_strings_delete($tid) {
  if ($tid) {
    localizertranslation_delete($tid);
    drupal_set_message('Translation successfully deleted');
    drupal_goto();
  }
}

