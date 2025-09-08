TELLAFRIEND MODULE - INSTALL
---------------------------

This module creates a "tell-a-friend" page to direct traffic towards your site.

5.x version has the following improvements : 
	* flood control with a default of 3 requests per hour. This value can be changed from the 
settings page. This prevents malicious users from sending bulk emails from a drupal site where 
tell-a-friend is enabled.
	* restriction on the number of e-mail addresses that can be included per attempt. The default 
is 10, but this number can also be changed from the settings page. This prevents malicious users from 
exploiting tell-a-friend to send bulk emails.

Installation
------------

1. Install the module.
2. Set all settings in Administer -> Site configuration -> Tell a friend.
3. Form page exists at path 'http://www.example.com/drupal/?q=tellafriend'. 
Change with a URL alias if you had like to.

Author
------
- Version 4.5.2 author: sbulua <sbulua@middlebury.edu>
- Upgrade for 5.x: 
	+ Gurpartap Singh - http://drupal.org/user/41470
	+ Thierry Guégan - http://drupal.org/user/43798 
	
	
	