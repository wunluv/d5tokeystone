<div class="node<?php if ($sticky) { print " sticky"; } ?><?php if (!$status) { print " node-unpublished"; } ?>" id="node-<?php print $node->nid; ?>">
  <?php if (!$page): ?>
    <h2 class="title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>

  <?php if (!empty($picture)): ?>
    <?php print $picture; ?>
  <?php endif; ?>

  <?php if (!empty($submitted)):
    ?><span class="submitted"><?php print t('Posted ') . date("F jS, Y", $node->created) . t(' by ') . theme('username', $node); ?></span><?php endif; ?>

  <div class="content forum">
    <?php print $content; ?>
    <div class="clear"></div>
  </div>

  <?php if (!empty($links) && !$is_front): ?>
    <div class="links"><?php print $links; ?></div>
  <?php endif; ?>
</div>
