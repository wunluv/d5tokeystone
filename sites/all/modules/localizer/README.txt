INTRODUCTION
============
Drupal module : localizer
Drupal version : 5.x
Current version : 3.1
Date of release : 2008-02-26
Author : Roberto Gerola, roberto.gerola@speedtech.it , http://www.speedtech.it
Support, documentation and testing : Edward Ray, http://drupal.org/user/93820


This file presents "quick start" instructions for installing/upgrading to 
the Localizer 3.x module. More detailed documentation for installing and
configuring Localizer can be found at http://drupal.org/node/103419.


Install instructions (New installation: Localizer 3.x on Drupal 5.x)

0.  Make sure you have a working Drupal 5.x site. 
1.  Backup your Drupal database (and, as a normal precaution, your whole site 
    if you haven't done so for some time). 
2.  Download the various Localizer 3.x components. This includes Localizer
    itself, which can be found at http://drupal.org/project/localizer and flag
    graphics which can be found at http://www.speedtech.it/drupal-localizer.
3.  Extract the localizer-5.x-3.x.tar.gz archive under 
    sites/all/modules/ (create the modules directory if needed). This will 
    create the localizer directory and put the localizer application files in 
    sites/all/modules/localizer.
    Under sites/all/modules/localizer, extract the flag archive. This will 
    create the flags directory under sites/all/modules/localizer/.   
4.  To the end of your sites/default/settings.php file, append the following 
    code and save (overwrite the file):

       include_once('sites/all/modules/localizer/localizer_settings.php');

    View the settings.php file to be sure it has changed. (Note that you may 
    have to temporarily reset the permissions on settings.php for you changes to 
    actually be saved.)

5.  Login to your site as administrator (UID=1)
6.  Under Administer > Site building > Modules, enable all the Localizer-related
    modules you need. Click "Save configuration".
7.  Visit www.yoursite.com/[path-to-drupal-root-if-any/]update.php to run the 
    database update script.
8.  Under Administer > Site configuration > Localizer, configure options.
9.  Under Administer > User management > Access control, be sure to enable 
    (at a minimum) "access translations" under localizer module.
10. Enjoy!


Upgrade instructions (Upgrade from Localizer 1.10 on Drupal 5.x to 
                      Localizer 3.x on Drupal 5.x)

0.  Make sure you have a working site with Drupal 5.x + Localizer 1.10.
    (The latest stable combination before Localizer 3.x is Drupal 5.5 + 
     Localizer 1.10) 
1.  Backup your Drupal database (and as a normal precaution, your whole site if 
    you haven't done so for some time).    
2.  Download the various Localizer 3.x components. This includes Localizer
    itself, which can be found at http://drupal.org/project/localizer flag
    graphics which can be found at http://www.speedtech.it/drupal-localizer, but
    don't upload them yet.
3.  Login to your site as administrator (UID=1) and keep your browser window
    open.
4.  Delete the old localizer directory under sites/all/modules/.
5.  Extract the localizer-5.x-3.x.tar.gz archive under sites/all/modules/. 
    This will create the localizer directory and put the localizer application 
    files in sites/all/modules/localizer. 
    Under sites/all/modules/localizer, extract the flag archive. This will 
    create the flags directory under sites/all/modules/localizer/.    

6.  If you have previously setup Localizer 1.x correctly, you will have appended 
    the following code to the end of your sites/default/settings.php file: 

      $conf= array
      (
          'cache_inc' =>
      'sites/all/modules/localizer/system/includes/cache.inc',
      );

     Delete this code, and instead, append the following code to the end of your
     sites/default/settings.php file.

       include_once('sites/all/modules/localizer/localizer_settings.php');

    View the settings.php file to be sure it has changed. (Note that you may 
    have to temporarily reset the permissions on settings.php for you changes to 
    actually be saved.)

7.  In your browser window that you have open, visit 
    www.yoursite.com/[path-to-drupal-root-if-any/]update.php to run the
    database update script.
8.  Go to Administer > Site configuration > Localizer to configure options.
9.  Under Administer > User management > Access control, be sure to enable 
    (at a minimum) "access translations" under localizer module.
10. Enjoy!
