<?php 


$options['sites'] = array (
);
$options['profiles'] = array (
  0 => 'default',
);
$options['packages'] = array (
  'base' => 
  array (
    'modules' => 
    array (
      'search' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/search/search.module',
        'basename' => 'search.module',
        'name' => 'search',
        'info' => 
        array (
          'name' => 'Search',
          'description' => 'Enables site-wide keyword searching.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'filter' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/filter/filter.module',
        'basename' => 'filter.module',
        'name' => 'filter',
        'info' => 
        array (
          'name' => 'Filter',
          'description' => 'Handles the filtering of content in preparation for display.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'help' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/help/help.module',
        'basename' => 'help.module',
        'name' => 'help',
        'info' => 
        array (
          'name' => 'Help',
          'description' => 'Manages the display of online help.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'poll' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/poll/poll.module',
        'basename' => 'poll.module',
        'name' => 'poll',
        'info' => 
        array (
          'name' => 'Poll',
          'description' => 'Allows your site to capture votes on different topics in the form of multiple choice questions.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'blog' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/blog/blog.module',
        'basename' => 'blog.module',
        'name' => 'blog',
        'info' => 
        array (
          'name' => 'Blog',
          'description' => 'Enables keeping easily and regularly updated user web pages or blogs.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'menu' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/menu/menu.module',
        'basename' => 'menu.module',
        'name' => 'menu',
        'info' => 
        array (
          'name' => 'Menu',
          'description' => 'Allows administrators to customize the site navigation menu.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'tracker' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/tracker/tracker.module',
        'basename' => 'tracker.module',
        'name' => 'tracker',
        'info' => 
        array (
          'name' => 'Tracker',
          'description' => 'Enables tracking of recent posts for users.',
          'dependencies' => 'comment',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'ping' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/ping/ping.module',
        'basename' => 'ping.module',
        'name' => 'ping',
        'info' => 
        array (
          'name' => 'Ping',
          'description' => 'Alerts other sites when your site has been updated.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'node' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/node/node.module',
        'basename' => 'node.module',
        'name' => 'node',
        'info' => 
        array (
          'name' => 'Node',
          'description' => 'Allows content to be submitted to the site and displayed on pages.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'aggregator' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/aggregator/aggregator.module',
        'basename' => 'aggregator.module',
        'name' => 'aggregator',
        'info' => 
        array (
          'name' => 'Aggregator',
          'description' => 'Aggregates syndicated content (RSS, RDF, and Atom feeds).',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'comment' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/comment/comment.module',
        'basename' => 'comment.module',
        'name' => 'comment',
        'info' => 
        array (
          'name' => 'Comment',
          'description' => 'Allows users to comment on and discuss published content.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => '1',
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'legacy' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/legacy/legacy.module',
        'basename' => 'legacy.module',
        'name' => 'legacy',
        'info' => 
        array (
          'name' => 'Legacy',
          'description' => 'Provides legacy handlers for upgrades from older Drupal installations.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'profile' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/profile/profile.module',
        'basename' => 'profile.module',
        'name' => 'profile',
        'info' => 
        array (
          'name' => 'Profile',
          'description' => 'Supports configurable user profiles.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'locale' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/locale/locale.module',
        'basename' => 'locale.module',
        'name' => 'locale',
        'info' => 
        array (
          'name' => 'Locale',
          'description' => 'Enables the translation of the user interface to languages other than English.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => '1',
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'taxonomy' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/taxonomy/taxonomy.module',
        'basename' => 'taxonomy.module',
        'name' => 'taxonomy',
        'info' => 
        array (
          'name' => 'Taxonomy',
          'description' => 'Enables the categorization of content.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'block' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/block/block.module',
        'basename' => 'block.module',
        'name' => 'block',
        'info' => 
        array (
          'name' => 'Block',
          'description' => 'Controls the boxes that are displayed around the main content.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'color' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/color/color.module',
        'basename' => 'color.module',
        'name' => 'color',
        'info' => 
        array (
          'name' => 'Color',
          'description' => 'Allows the user to change the color scheme of certain themes.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'statistics' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/statistics/statistics.module',
        'basename' => 'statistics.module',
        'name' => 'statistics',
        'info' => 
        array (
          'name' => 'Statistics',
          'description' => 'Logs access statistics for your site.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => '1000',
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'system' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/system/system.module',
        'basename' => 'system.module',
        'name' => 'system',
        'info' => 
        array (
          'name' => 'System',
          'description' => 'Handles general site configuration for administrators.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => '1022',
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'drupal' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/drupal/drupal.module',
        'basename' => 'drupal.module',
        'name' => 'drupal',
        'info' => 
        array (
          'name' => 'Drupal',
          'description' => 'Lets you register your site with a central server and improve ranking of Drupal projects by posting information on your installed modules and themes; also enables users to log in using a Drupal ID.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'path' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/path/path.module',
        'basename' => 'path.module',
        'name' => 'path',
        'info' => 
        array (
          'name' => 'Path',
          'description' => 'Allows users to rename URLs.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'watchdog' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/watchdog/watchdog.module',
        'basename' => 'watchdog.module',
        'name' => 'watchdog',
        'info' => 
        array (
          'name' => 'Watchdog',
          'description' => 'Logs and records system events.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'upload' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/upload/upload.module',
        'basename' => 'upload.module',
        'name' => 'upload',
        'info' => 
        array (
          'name' => 'Upload',
          'description' => 'Allows users to upload and attach files to content.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'book' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/book/book.module',
        'basename' => 'book.module',
        'name' => 'book',
        'info' => 
        array (
          'name' => 'Book',
          'description' => 'Allows users to collaboratively author a book.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'blogapi' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/blogapi/blogapi.module',
        'basename' => 'blogapi.module',
        'name' => 'blogapi',
        'info' => 
        array (
          'name' => 'Blog API',
          'description' => 'Allows users to post content using applications that support XML-RPC blog APIs.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => '5000',
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'throttle' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/throttle/throttle.module',
        'basename' => 'throttle.module',
        'name' => 'throttle',
        'info' => 
        array (
          'name' => 'Throttle',
          'description' => 'Handles the auto-throttling mechanism, to control site congestion.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'contact' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/contact/contact.module',
        'basename' => 'contact.module',
        'name' => 'contact',
        'info' => 
        array (
          'name' => 'Contact',
          'description' => 'Enables the use of both personal and site-wide contact forms.',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'user' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/user/user.module',
        'basename' => 'user.module',
        'name' => 'user',
        'info' => 
        array (
          'name' => 'User',
          'description' => 'Manages the user registration and login system.',
          'package' => 'Core - required',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'dependencies' => 
          array (
          ),
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
      'forum' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/modules/forum/forum.module',
        'basename' => 'forum.module',
        'name' => 'forum',
        'info' => 
        array (
          'name' => 'Forum',
          'description' => 'Enables threaded discussions about general topics.',
          'dependencies' => 'taxonomy comment',
          'package' => 'Core - optional',
          'version' => '5.23+3-dev',
          'project' => 'drupal',
          'datestamp' => '1380570434',
          'php' => 'DRUPAL_MINIMUM_PHP',
        ),
        'schema_version' => 0,
        'project' => 'drupal',
        'version' => '5.23+3-dev',
      ),
    ),
    'themes' => 
    array (
      'chameleon' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/chameleon/chameleon.theme',
        'basename' => 'chameleon.theme',
        'name' => 'chameleon',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
      'pushbutton' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/pushbutton/page.tpl.php',
        'basename' => 'page.tpl.php',
        'name' => 'page.tpl',
        'template' => true,
        'engine' => 'phptemplate',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
      'garland' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/garland/page.tpl.php',
        'basename' => 'page.tpl.php',
        'name' => 'page.tpl',
        'template' => true,
        'engine' => 'phptemplate',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
      'bluemarine' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/bluemarine/page.tpl.php',
        'basename' => 'page.tpl.php',
        'name' => 'page.tpl',
        'template' => true,
        'engine' => 'phptemplate',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
      'marvin' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/chameleon/marvin/style.css',
        'basename' => 'style.css',
        'name' => 'marvin',
        'style' => true,
        'template' => false,
        'owner' => '/var/aegir/platforms/drupal-5.x-dev/themes/chameleon/chameleon.theme',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
      'minnelli' => 
      array (
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/themes/garland/minnelli/style.css',
        'basename' => 'style.css',
        'name' => 'minnelli',
        'style' => true,
        'template' => true,
        'owner' => '/var/aegir/platforms/drupal-5.x-dev/themes/garland/page.tpl.php',
        'project' => '',
        'info' => 
        array (
          'version' => NULL,
        ),
        'version' => NULL,
      ),
    ),
    'platforms' => 
    array (
      'drupal' => 
      array (
        'short_name' => 'drupal',
        'version' => '5.24-dev',
        'description' => 'This platform is running Drupal 5.24-dev',
      ),
    ),
    'profiles' => 
    array (
      'default' => 
      array (
        'name' => 'default',
        'filename' => '/var/aegir/platforms/drupal-5.x-dev/profiles/default/default.profile',
        'project' => '',
        'info' => 
        array (
          'name' => 'Drupal',
          'description' => 'Select this profile to enable some basic Drupal functionality and the default theme.',
          'languages' => 
          array (
            0 => 'en',
          ),
          'old_short_name' => 'acquia',
          'version' => NULL,
        ),
        'version' => '5.24-dev',
      ),
    ),
  ),
  'sites-all' => 
  array (
    'modules' => 
    array (
    ),
    'themes' => 
    array (
    ),
  ),
  'profiles' => 
  array (
    'default' => 
    array (
      'modules' => 
      array (
      ),
      'themes' => 
      array (
      ),
    ),
  ),
);