<article class="bg-cloud-white <?php print $node_classes ?> node-<?php print $node->type ?><?php if (!$status) { print ' node-unpublished'; } ?>" id="node-<?php print $node->nid; ?>">
  <div class="max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-12">

    <!-- Header Section -->
    <header class="mb-8">
      <?php if (!$page): ?>
        <h2 class="font-lora text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
          <a href="<?php print $node_url ?>" class="text-midnight-blue hover:text-sky-blue transition-colors"><?php print $title; ?></a>
        </h2>
      <?php else: ?>
        <h1 class="font-lora text-4xl md:text-5xl font-bold text-midnight-blue mb-4"><?php print $title; ?></h1>
      <?php endif; ?>

      <?php if (!empty($picture)): ?>
        <div class="mb-6">
          <?php print $picture; ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($submitted)): ?>
        <p class="font-semibold text-stone-gray text-lg mb-6">
          <?php print t('Posted ') . format_date($node->created, 'custom', "F jS, Y") . t(' by ') . theme('username', $node); ?>
        </p>
      <?php endif; ?>
    </header>

    <!-- Main Content -->
    <section class="bg-white rounded-xl border border-stone-gray p-8 md:p-12 shadow-sm">
      <?php if (!$status) : ?>
        <div class="bg-rose-pink/10 border border-rose-pink/20 rounded-lg p-4 mb-6">
          <p class="text-midnight-blue font-semibold">This Heavenletter has not been published yet</p>
        </div>
      <?php endif; ?>

      <div class="font-lora text-2xl md:text-3xl font-bold text-sky-blue mb-8 italic">
        God said:
      </div>

      <div class="prose prose-lg max-w-none">
        <div class="font-lora text-xl md:text-2xl leading-relaxed text-midnight-blue/90">
          <?php print render($content['body']); ?>
        </div>
      </div>

      <?php if ($page && !empty($field_translated_by[0]['view'])) : ?>
        <div class="mt-12 pt-8 border-t border-stone-gray">
          <p class="text-stone-gray font-semibold">
            Translated by: <?php print $field_translated_by[0]['view']; ?>
          </p>
        </div>
      <?php endif; ?>
    </section>

    <!-- Footer Section (Full Page Only) -->
    <?php if ($page): ?>
      <footer class="mt-12 space-y-8">

        <!-- Pagination -->
        <div class="flex justify-center">
          <?php print heaven_pager(); ?>
        </div>

        <!-- Permalink -->
        <div class="bg-white rounded-xl border border-stone-gray p-6 text-center">
          <p class="text-stone-gray text-sm leading-relaxed">
            Permanent link to this Heavenletter: <?php print $permalink; ?><br />
            Thank you for including this when publishing this Heavenletter elsewhere.
          </p>
        </div>

        <!-- Taxonomy -->
        <?php if (!empty($terms) && $page): ?>
          <div class="bg-white rounded-xl border border-stone-gray p-6">
            <h3 class="font-lora text-xl font-bold text-midnight-blue mb-4">Related Topics</h3>
            <div class="text-midnight-blue/80">
              <?php print $terms ?>
            </div>
          </div>
        <?php endif; ?>

        <!-- Links -->
        <?php if (!empty($links) && !$is_front): ?>
          <div class="bg-white rounded-xl border border-stone-gray p-6">
            <div class="flex flex-wrap gap-4">
              <?php print $links; ?>
            </div>
          </div>
        <?php endif; ?>

      </footer>
    <?php endif; ?>

  </div>
</article>