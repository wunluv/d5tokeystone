DESCRIPTION:
------------

A module that displays a block with similar published nodes to the
currently viewed one, based on the title and body fields.

This module is for MySQL-based Drupal sites. It uses MySQL's
FULLTEXT indexing for MyISAM tables, and should automatically add
the index when you activate the module for the first time on a
Drupal 4.7 or 5.0 site.

NOTE: If your node_revisions table is InnoDB, this module's install
file will convert your table to MyISAM. The FULLTEXT indexing
feature of MyISAM is not available for InnoDB (yet).

INSTALLATION
------------

Copy the similar directory to your modules directory.
(example.org/modules/similar)

Activate the module in administer > Site building > Modules.
Turn on the similar block in administer > Site building > Blocks.

Configure the number of similar entries and specific node types
you want the block to search for at (default is 5):
   admin/build/block/configure/similar/0

Adjust your cache settings at admin/settings/similar.

UPGRADING FROM OLDER THAN DRUPAL 4.7
------------------------------------

Execute this query BEFORE performing your Drupal 4.7 upgrade:

  ALTER TABLE node DROP INDEX title

BUG REPORTING
-------------

http://drupal.org/project/issues/similar

CONTRIBUTORS
------------
David Kent Norman http://deekayen.net/

Arnab Nandi http://arnab.org/