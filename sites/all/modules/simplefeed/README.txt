// $Id: README.txt,v 1.18 2007/11/16 18:59:09 m3avrck Exp $

###   ABOUT   #############################################################################

SimpleFeed, Version 1.0

Authors:

 Ted Serbinski, aka, m3avrck (original author)
   hello@tedserbinski.com
   http://tedserbinski.com

 Bill O'Connor, aka, csevb10
   billiamo@gmail.com
   http://achieveinternet.com

Requirements: Drupal 5.0



###   FEATURES   #############################################################################

- uses SimplePie <http://simplepie.org/> as the default feed parsing engine
- very simple and fast: everything is a node, use hook_nodeapi() to manipulate anything you want
- feed & feed items obey default node workflow + options (e.g., set if feed items should be published by default)
- auto-taxonomy, automatically add categories in feeds to Drupal's taxonomy system
- revisions support for both feeds & feed items
- automatically delete feed items after a certain amount of time
- automatically generate feed item titles if they don't exist in the feed
- optionally save specific feed items by editing their expiration time to "never"
- edit any feed or feed item that comes in
- manually insert feed items into feeds
- customizable default input format for imported feeds (e.g., which tags to strip from feeds, if any)
- postgres support
- duplicate checking of both feeds & feed items
- granular feed permissions
- optional views support
- optional token support



###   INSTALLATION   #############################################################################

1. Download and unzip the SimpleFeed module into your modules directory.

2. Download SimplePie library (http://simplepie.org/), either the 1.0 or 1.1 development version (recommended).
   Place simplepie.inc in your SimpleFeed module directory.

3. Goto Administer > Site Building > Modules and enable both SimpleFeed and SimpleFeed Item.

4. Goto Administer > Site Configuration > Simplefeed and configure the options.

5. If you wish to use auto-taxonomy support:
   a. Enable taxonomy module
   b. Create a new vocabulary and assign it to both the "feed" and "feed item" node types.
   c. Check the "free tagging" box, since this feature only works with free tagging enabled taxonomies.
   d. Revisit the settings page to have this vocabulary shown.

6. Goto User Management > Access control and set the permissions for both feeds and feed items.

7. Ensure that your "files" directory is public and writeable. Visit admin/logs/status to check this status.
   (this is needed to cache feeds on the filesystem for significantly improved performance
    if this is not possible, SimpleFeed will still work but you will see warnings in your logs)

8. Goto Create content > Feed to create a new feed.

9. Setup cron to run and download need items for the newly added feed.

10. Optionally install Views module that provides various views for seeing all feeds & feed items on your site.

11. Optionally enable the default block provided (requires Views).



###   NOTES   #############################################################################

- Even though aggressive says this caching won't work, it will -- it's only needed for non-cached pages and hence no affect.

- If some feeds aren't parsed, likely this is an issue with SimplePie <http://simplepie.org/> and not the module, which only
  implements this library (e.g., it doesn't actually parse anything). Please submit those bugs to: http://simplepie.org/support/

- If you want your feeds to use a different default input format than "filtered html", make sure you give
  anonymous users the right to use that input filter under Admin > Site Configuration > Input Formats

- If cron.php does not return because of a script timeout (e.g., trying to parse too many feeds at once),
  wget calls by default the site up to 20 times total until it gets a valid response. Change your wget to -t 1 (try once)
  0   *   *   *   *   wget -O - -q -t 1 http://www.example.com/cron.php

- Any registered Drupal user that creates a feed node will also own all subsequent feed item children. If you want
  different behavior or don't want this at all, consider overriding this in a node template for this node type.         
  
- If you want to change or remove the links at the bottom of each feed node or feed item node, simply use
  Drupal's hook_form_alter <http://api.drupal.org/api/function/hook_link_alter/5> to alter them.  



###   CHANGELOG   #############################################################################

SimpleFeed 1.0, 2007-xx-xx
----------------------
- Initial release
