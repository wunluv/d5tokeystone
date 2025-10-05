<!DOCTYPE html>
<html lang="<?php print $language ?>">
<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
</head>
<body class="bg-cloud-white font-sans text-midnight-blue antialiased">
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="lenguaje flex justify-between items-center mb-4">
        <?php print $header; ?>
        <?php print $search_box; ?>
      </div>
      <div class="text-center">
        <?php if ($site_name): ?>
          <h1 class="font-lora text-4xl md:text-5xl font-bold text-midnight-blue"><a href="<?php print $base_path ?>" class="hover:text-sky-blue transition-colors"><?php print $site_name; ?></a></h1>
        <?php endif; ?>
        <div class="font-lora text-xl text-midnight-blue/80 mt-2"><?php print $site_slogan; ?></div>
      </div>
      <nav class="mt-6">
        <?php if ($primary_links): ?>
          <div class="clear-block">
            <?php print theme('links', $primary_links, array('class' =>'links', 'id' => 'navlist')) ?>
          </div>
        <?php endif; ?>
      </nav>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <?php if ($content_top):?>
      <section class="mb-8"><?php print $content_top; ?></section>
    <?php endif; ?>

    <?php print $messages; ?>

    <section class="text-center mb-12">
      <?php print $mission ?>
      <div class="bg-white p-8 rounded-xl border border-stone-gray shadow-sm mt-6">
        <div class="font-lora italic text-xl text-midnight-blue/90"><?php print $frontpage_view; ?></div>
      </div>
    </section>

    <section class="text-center mb-12">
      <?php print $testimonials_view; ?>
    </section>

    <section class="space-y-12">
      <article>
        <h1 class="font-lora text-3xl md:text-4xl font-bold text-midnight-blue mb-6">Today's Heavenletter</h1>
        <?php print $heavenletter_view; ?>
      </article>
      <article>
        <h1 class="font-lora text-3xl md:text-4xl font-bold text-midnight-blue mb-6">A Beautiful Story</h1>
        <?php print $content; ?>
      </article>
    </section>

    <section class="text-center mb-12">
      <?php print $products_view; ?>
    </section>
  </main>

  <footer class="bg-white border-t border-stone-gray mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <?php print $footer_message; ?>
    </div>
  </footer>

  <?php print $scripts; ?>
  <?php print $closure; ?>
</body>
</html>