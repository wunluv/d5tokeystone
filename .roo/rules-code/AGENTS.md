# Project Coding Rules (Non-Obvious Only)

## Critical Coding Gotchas Discovered by Reading Code

### Database Compatibility Layer
- **UTF-8 forcing**: MySQL 4.1+ connections auto-force UTF-8 encoding for consistency
- **Sequence system**: Use db_next_id() instead of auto-increment for database independence
- **Table prefixing**: Always use {table} syntax, never direct prefixing (per-table prefixes complex)
- **CLIENT_FOUND_ROWS**: Query results return matched rows, not affected rows

### PHP Compatibility Patches
- **E_DEPRECATED**: Define constant if missing for PHP <5.3 compatibility (artificial constant)
- **Magic quotes handling**: Extensive form processing for magic_quotes_gpc (upload files excepted)
- **File upload handling**: tmp_name exception when stripping monitor slashes (Windows paths)

### Security Patterns
- **HTTP_HOST validation**: Hostnames validated with RFC 952 pattern before processing
- **SQL placeholders**: Custom %d/%s/%%/%f/%b system prevents injection (unlike standard sprintf)
- **Session naming**: 'SESS' + md5(hostname + 'SSL' if cookie_secure) prevents hijacking
- **Request URI**: request_uri() reconstructs URL from components (IIS compatibility + XSS prevention)

### Drupal Core Functions
- **File discovery**: 4-level fallback for module/theme files (config > global > theme > core)
- **Cache clearing**: cache_clear_all() required after schema changes - no drupal_flush_* exists
- **Module loading**: Hook system only functional after bootstrap phase 7 completion

### Gotchas That Cause Silent Failures
- **Variable storage**: $conf['variable'] fails silently - always use variable_get()/variable_set()
- **Module weight**: Controlled by database table, not registration order (runtime modification)
- **Theme registration**: Requires explicit hook_theme() calls - no auto-discovery mechanism