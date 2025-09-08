# Project Architecture Rules (Non-Obvious Only)

## Architecture Constraints
- **7-phase bootstrap dependency**: all module functionality depends on completing phases 0-7
- **Database independence requirement**: custom sequence system replaces AUTO_INCREMENT
- **Hook execution timing**: hooks only functional after phase 7 bootstrap completion
- **Table prefixing complexity**: supports both single and per-table prefix systems

## Hidden Coupling Points
- **Module weight**: controlled entirely through database system.weight values
- **Theme registration**: requires explicit hook_theme() calls, no auto-discovery
- **Cache system**: aggressive mode bypasses all modules except critical hooks
- **Session storage**: database-backed with hostname-based session names

## Performance Architecture Secrets
- **Page cache first**: check early page cache before any module loading
- **Module skipping**: possible in aggressive cache mode for performance
- **Query rewriting**: runtime modification capability via hook_db_rewrite_sql
- **Memory optimization**: custom bootstrap to minimize resource usage

## Scalability Patterns
- **Multi-database support**: connection switching via db_set_active()
- **Prefix isolation**: table prefixing enables multi-tenant deployments
- **Incremental cache**: page caching bypasses module loading entirely
- **Minimal dependencies**: core functions available without module activation

## Security Architecture
- **Hostname validation**: required before any request processing
- **SQL injection protection**: custom %d/%s/%f/%b placeholder system
- **Session isolation**: per-hostname session namespaces prevent cross-site
- **File type blocking**: .htaccess prevents access to sensitive file types

## Deprecated Patterns to Avoid
- **$_SERVER['REQUEST_URI']**: always use request_uri() for XSS protection
- **Direct variables**: always use variable_get/set() instead of $conf array
- **AUTO_INCREMENT**: always use db_next_id() for cross-database compatibility
- **Filesystem operations**: always use drupal_get_path() for module assets