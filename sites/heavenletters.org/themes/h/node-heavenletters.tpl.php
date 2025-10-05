<div class="<?php print $node_classes ?> node-<?php print $node->type ?><?php if (!$status) { print ' node-unpublished'; } ?>" id="node-<?php print $node->nid; ?>">
  <?php if (!$page): ?>
    <h2 class="title">
      <a href="<?php print $node_url ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>

  <?php if (!empty($picture)): ?>
    <?php print $picture; ?>
  <?php endif; ?>

  <?php if (!empty($submitted)):
    ?><span class="submitted"><?php print t('Posted ') . format_date($node->created, 'custom', "F jS, Y") . t(' by ') . theme('username', $node); ?></span><?php endif; ?>

  <div class="content <?php print $node->type ?>">
    <?php if (!$status) : ?>
      <br />This Heavenletter has not been published yet
    <?php endif; ?>
    <div class="god-said">God said:</div>
    <?php print render($content['body']); ?>
    <?php if ($page && !empty($field_translated_by[0]['view'])) : ?>
      <span class="autor">Translated by: <?php print $field_translated_by[0]['view']; ?></span>
    <?php endif; ?>

    <?php if ($page): ?>
      <?php print heaven_pager(); ?>
    <?php endif; ?>
  </div>

  <?php if ($page): ?>
    <div class="permalink">
      <span class="small_font"><br /><br />Permanent link to this Heavenletter:
        <?php print $permalink; ?> - Thank you for including this when publishing this Heavenletter elsewhere.
      </span>
    </div>
  <?php endif; ?>

  <?php if (!empty($terms) && $page): ?>
    <div class="taxonomy"><?php print t(' Related Topics ') . $terms ?></div>
  <?php endif; ?>

  <?php if (!empty($links) && !$is_front): ?>
    <div class="links">
      <?php print $links; ?>
    </div>
  <?php endif; ?>
</div>