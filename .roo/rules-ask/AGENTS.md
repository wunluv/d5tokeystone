# Project Documentation Rules (Non-Obvious Only)

## Directory Structure Counter-Intuitions
- `includes/` contains core functionality, not optional components
- `misc/` includes critical JavaScript libraries (jQuery, Drupal JS)
- `profiles/` contains distribution templates, not just user profiles
- `scripts/` contains essential build tools (code-style.pl, code-clean.sh)

## File Organization Mysteries
- Core Drupal files scattered across includes/ for performance (bootstrap.inc critical)
- Theme files in misc/ directory instead of themes/ (legacy organization)
- Database drivers in includes/ instead of database/ (bootstrapping dependency)
- XML-RPC functionality in separate inc files due to optional nature

## Functional Architecture Insights
- Database abstraction layer handles MySQL/PostgreSQL differences silently
- Module system loads all .module files from multiple discovery paths
- Hook system activated late in bootstrap (phase 7) for performance
- Cache system supports aggressive skipping of modules entirely

## Non-Obvious Dependencies
- All MySQL support requires CLIENT_FOUND_ROWS connection flag
- Clean URLs rewrite to ?q= parameter system for legacy compatibility
- Table prefixing syntax {table} handles both single/per-table prefixes
- UTF-8 forcing patches active for MySQL clients < 4.1 compatibility

## Critical Context for Questioning
- Bootstrap phases 0-7 must complete for modules to function (not documented)
- Hook_db_rewrite_sql allows runtime query modification (powerful but confusing)
- Magic quotes handling in form system affects all user input processing
- Request_uri() function exists purely for XSS prevention (not URL construction)