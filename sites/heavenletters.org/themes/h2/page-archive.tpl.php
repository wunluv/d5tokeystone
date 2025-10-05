<!DOCTYPE html>
<html lang="<?php print $language ?>">
<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?php print $base_path . path_to_theme() ?>/dist/output.css" type="text/css" />
</head>
<body class="bg-cloud-white font-sans text-midnight-blue antialiased">
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="lenguaje flex justify-between items-center mb-4">
        <?php print $header; ?>
        <?php print $search_box; ?>
      </div>
      <div class="text-center">
        <?php if ($logo): ?>
          <a href="<?php print $base_path; ?>" title="<?php print t('Home'); ?>">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="mx-auto mb-4" />
          </a>
        <?php endif; ?>
        <?php if ($site_name): ?>
          <h1 class="font-lora text-4xl md:text-5xl font-bold text-midnight-blue"><a href="<?php print $base_path ?>" class="hover:text-sky-blue transition-colors"><?php print $site_name; ?></a></h1>
        <?php endif; ?>
        <?php if ($site_slogan): ?>
          <div class="font-lora text-xl text-midnight-blue/80 mt-2"><?php print $site_slogan; ?></div>
        <?php endif; ?>
      </div>
      <nav class="mt-6">
        <?php if ($primary_links): ?>
          <div class="clear-block">
            <?php print theme('links', $primary_links, array('class' =>'links', 'id' => 'navlist')) ?>
          </div>
        <?php endif; ?>
      </nav>
      <?php if ($breadcrumb): ?>
        <div class="mt-4"><?php print $breadcrumb; ?></div>
      <?php endif; ?>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-8">
      <?php if ($sidebar_left && arg(0) != 'admin'): ?>
        <aside class="w-64 flex-shrink-0">
          <?php print theme_views_sidebar(2, 4); ?>
          <?php print $sidebar_left; ?>
        </aside>
      <?php endif; ?>
      <main class="flex-1">
        <?php if ($mission): ?>
          <section class="mb-8"><?php print $mission; ?></section>
        <?php endif; ?>
        <?php if ($content_top):?>
          <section class="mb-8"><?php print $content_top; ?></section>
        <?php endif; ?>
        <?php if ($tabs): ?>
          <div class="tabs"><?php print $tabs; ?></div>
        <?php endif; ?>
        <?php if ($title): ?>
          <h1 class="title"><?php print $title; ?></h1>
        <?php endif; ?>
        <?php print $help; ?>
        <?php print $messages; ?>

        <!-- Heavenletters Archive Section -->
        <section class="bg-white rounded-xl border border-stone-gray p-8 shadow-sm mb-8">
          <div class="text-center mb-8">
            <h2 class="font-lora text-3xl md:text-4xl font-bold text-midnight-blue mb-4">Heavenletters Archive</h2>
            <p class="text-midnight-blue/80 text-lg">Explore our collection of divine messages and spiritual guidance</p>
          </div>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="relative">
              <input type="text" placeholder="Search Heavenletters..." class="w-full px-4 py-3 border border-stone-gray rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-colors text-midnight-blue placeholder-midnight-blue/50" />
              <button type="submit" class="absolute right-2 top-2 px-4 py-1 bg-sky-blue text-white rounded-md hover:bg-sky-blue/80 transition-colors">
                Search
              </button>
            </div>
          </div>

          <!-- Archive Content (View will be embedded here) -->
          <div class="archive-content">
            <?php print $heavenletters_archive_view; ?>
          </div>
        </section>

        <?php print $content; ?>
        <?php print $feed_icons; ?>
        <?php if ($content_bottom): ?>
          <div id="content-bottom"><?php print $content_bottom; ?></div>
        <?php endif; ?>
      </main>
      <?php if ($sidebar_right): ?>
        <aside class="w-64 flex-shrink-0">
          <?php print $sidebar_right; ?>
          <div class="top">
            <a href="#"><i data-feather="chevron-up" title="Back to the top"></i></a>
          </div>
        </aside>
      <?php endif; ?>
    </div>
  </div>

  <footer class="bg-white border-t border-stone-gray mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <?php print $footer_message; ?>
    </div>
  </footer>

  <?php print $scripts; ?>
  <?php print $closure; ?>
</body>
</html>