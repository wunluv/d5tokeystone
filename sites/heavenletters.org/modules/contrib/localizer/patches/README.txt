To apply the patches see instructions here : http://drupal.org/node/60108

1. Copy patch files for your Drupal version under your Drupal installation root directory
2. Move to Drupal root installation directory
3. Type the following commands

patch -p0 < taxonomy.module.patch
patch -p0 < menu.module.patch
patch -p0 < block.module.patch
patch -p0 < taxonomy.info.patch
patch -p0 < menu.info.patch
patch -p0 < block.info.patch
