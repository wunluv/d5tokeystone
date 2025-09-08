# Code Mode Rules (Non-Obvious Only)

## Critical Coding Gotchas Discovered by Reading Code

### Database Compatibility Layer
- **UTF-8 forcing**: MySQL 4.1+ connections auto-force UTF-8 encoding for consistency
- **Sequence system**: Use db_next_id() instead of auto-increment for database independence
- **Table prefixing**: Always use {table} syntax, never {table} prefixing (per-table prefixes not supported)
- **CLIENT_FOUND_ROWS**: Query results return matched rows, not affected rows

### PHP Compatibility Patches
- **E_DEPRECATED**: Define constant if missing for PHP <5.3 compatibility
- **Magic quotes handling**: Extensive form processing for deprecated magic_quotes_gpc
- **File upload handling**: Different stripslashes behavior for uploaded files vs form fields

### Security Patterns
- **HTTP_HOST validation**: Hostnames validated before processing or 400 response issued
- **SQL placeholders**: Custom %d/%s/%%/%f/%b system with callback processing
- **Session naming**: Hostname-based session names prevent hijacking
- **Request URI**: Always use request_uri() function instead of $_SERVER['REQUEST_URI']

### Drupal Core Functions
- **File location discovery**: Use drupal_get_path() for module/theme asset paths
- **Cache clearing**: Never use drupal_flush_* - use cache_clear_all() after schema changes
- **Module loading**: Hook system activates in bootstrap phase 7 - design accordingly

### Gotchas That Cause Silent Failures
- **Variable storage**: Never access $conf[width] directly - use variable_get()/variable_set()
- **Module weight**: Order controlled by system.weight table value, not registration order
- **Theme registration**: Templates registered via hook_theme(), not auto-discovery