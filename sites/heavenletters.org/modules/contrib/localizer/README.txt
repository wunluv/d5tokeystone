INTRODUCTION
============
Drupal module : localizer
Drupal version : 5.x
Current version : 1.10
Date of release : 2007-09-15
Author : Roberto Gerola, roberto.gerola@speedtech.it , http://www.speedtech.it
Main contributors :
Edward Ray (EdInJapan on drupal.org : http://drupal.org/user/93820) : documentation, testing, support
Ablivio (http://drupal.org/user/172754) : patches porting to Druapl 5.2

Installation instructions (New installation: Localizer 1.10 on Drupal 5.1 and Drupal 5.2)

1. Download the latest Localizer module from http://drupal.org/project/localizer
2. Download the flags icons from http://www.speedtech.it/files/localizer-flags.tgz
3. Download pre-patched core files from 
   http://www.speedtech.it/files/localizer-sites-all-5.1-1.10.tgz (Drupal 5.1)
   http://www.speedtech.it/files/localizer-sites-all-5.2-1.10.tgz (Drupal 5.2)   
4. Extract localizer-5.x-1.10.tgz archive under sites/all/modules (create the modules directory if needed)
   This will create sites/all/modules/localizer that contains the Localizer-related module code.
5. Extract localizer-flags.tgz under sites/all/modules/localizer. This
   will create sites/all/modules/localizer/flags with the flag files in it.
6. Extract localizer-sites-all-5.1-1.10.tgz (or localizer-sites-all-5.2-1.10.tgz) under sites/all (it already
   has the modules and localizer directory, so the contents will go into
   sites/all/modules/localizer.
7. To the end of your sites/default/settings.php file, append and save
   (overwrite the file):
   $conf= array
   (
      'cache_inc' =>
      'sites/all/modules/localizer/system/includes/cache.inc',
   );
8. Login to your site as administrator (UID=1)
9. Under Administer > Site building > modules, enable all the
   Localizer-related modules you need. Click Save configuration.
10. Visit www.yoursite.com/update.php and run the update script.
11. Under Administer > Site configuration > Localizer to configure options.
12. Enjoy!


Upgrade instructions (Upgrade from older versions of Localizer to Localizer
1.10 on Drupal 5.1 and Drupal 5.2)

1. Download the latest Localizer module from http://drupal.org/project/localizer
2. Download the flags icons from http://www.speedtech.it/files/localizer-flags.tgz
3. Download pre-patched core files from 
   http://www.speedtech.it/files/localizer-sites-all-5.1-1.10.tgz (Drupal 5.1)
   http://www.speedtech.it/files/localizer-sites-all-5.2-1.10.tgz (Drupal 5.2)   
4. Login to your site as administrator and under Administer > Site
   building > modules, disable all the Localizer-related modules
5. Delete the old module/localizer directory (could be sites/all/modules/localizer)
6. Return the Drupal 5.x modules that you previously patched for
   Localizer versions prior to 1.10 to their original state. (In other
   words, download Drupal 5.x and extract the the following files from
   the tarball: block.module, menu.module, taxonomy.module, bootstrap.inc,
   and common.inc. Upload these to your site, overwriting the existing
   modules.)
7. Extract localizer-5.x-1.10.tgz archive under sites/all/modules
   (create the modules directory if needed) This will create
   sites/all/modules/localizer that contains the Localizer-related module code.
8. Extract localizer-flags.tgz under sites/all/modules/localizer. This
   will create sites/all/modules/localizer/flags with the flag files in it.
9. Extract localizer-sites-all-5.1-1.10.tgz (or localizer-sites-all-5.2-1.10.tgz) under sites/all (it already
   has the modules and localizer directory, so the contents will go into
   sites/all/modules/localizer.
10. To the end of your sites/default/settings.php file, append and
   save (overwrite the file):
   $conf= array
   (

       'cache_inc' =>
   'sites/all/modules/localizer/system/includes/cache.inc',

   );
11. Login to your site as administrator (UID=1)
12. Under Administer > Site building > modules, enable all the
    Localizer-related modules you need. Click Save configuration.
13. Visit www.yoursite.com/update.php and run the update script.
14. Under Administer > Site configuration > Localizer to configure
    options.
15. Enjoy!
