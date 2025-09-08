# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands

- `perl scripts/code-style.pl <file>` - Check Drupal 5.x code style compliance
- `bash scripts/code-clean.sh` - Remove backup files and normalize whitespace (tabs→spaces, no trailing spaces)

## Critical Project Patterns (Non-Obvious Only)

### Compatibility & Security
- **E_DEPRECATED handling**: For PHP <5.3 compatibility, always define E_DEPRECATED if missing
- **REQUEST_URI forbidden**: Never use $_SERVER['REQUEST_URI'] directly - always use `request_uri()` function to prevent XSS attacks
- **Magic quotes**: Extensive handling for PHP's deprecated magic_quotes_gpc in form processing
- **Error reporting**: System reports ALL errors including E_NOTICE (unusual for production)

### Database Architecture
- **Table prefixing**: Complex system supports both single prefix and per-table prefixes using {table} syntax
- **Sequence system**: Uses custom sequences table instead of AUTO_INCREMENT for database independence
- **MySQL CLIENT_FOUND_ROWS**: Connection uses CLIENT_FOUND_ROWS flag (returns matched vs affected rows)
- **UTF-8 forcing**: Auto-forces UTF-8 encoding for MySQL 4.1+ connections

### Bootstrap System
- **7-phase initialization**: Configuration → Cache → DB → Access → Session → Page Cache → Path → Full
- **Module loading**: Hooks system loaded in phase 7 allows runtime extension
- **Cache modes**: Normal (skip modules), Aggressive (skip all except hooks)

### Hook System
- **Query rewriting**: hook_db_rewrite_sql() enables modules to modify SELECT queries at runtime
- **Multi-scoped variables**: Configuration stored in {variable} table with caching layer
- **Event system**: watchdog() logging with 7 severity levels (NOTICE, WARNING, ERROR)

## Code Style Rules (from scripts/code-style.pl)

### Naming & Structure
- **Lowercase only**: No camelCase or mixed-case function/variable names (use underscores)
- **Curly braces**: Opening brace stays on same line as condition, not next line
- **Function spacing**: No space before opening parenthesis: `foo(` not `foo (`
- **Array syntax**: Only `["key"]`, `[$variable]`, `[0]` formats allowed for array access

### String Handling
- **Concatenation syntax**: Strict rules for `"."` operator spacing: correct `foo . "bar"`
- **HTML attributes**: Use lowercase tags, add space before self-closing: `<br />` not `<br/>`
- **Attribute values**: Must use quoted values: `<tag key="value">` not `<tag key=value>`

### Control Structures
- **Control spacing**: Always space between control word and parenthesis: `if (` not `if(`
- **Braces in conditionals**: Single statements must have braces for if/while/foreach
- **Else placement**: `} else {` (brace on same line) not `}\nelse\n{`

### Operators & Spacing
- **Operator spacing**: Consistent spacing around operators: `$a + $b` not `$a+$b`
- **Comma spacing**: Space after comma only: `func(a, b)` not `func(a,b)`
- **Parentheses**: No extra spaces: `($a + $b)` not `( $a + $b )`

### Critical Security Rules
- **HTTP_HOST validation**: Hostname must pass validation or 400 response issued
- **SQL injection prevention**: Custom %d/%s/%f/%b placeholders with callback system
- **Session security**: Session hijacking protection with HTTP_HOST-based session names
- **File path security**: All file operations use drupal_get_path() for location abstraction

## Server Configuration (.htaccess Requirements)

### PHP Security Settings
- `magic_quotes_gpc = 0` - Required for form handling compatibility
- `register_globals = 0` - Critical security setting
- `session.auto_start = 0` - Must be disabled for Drupal
- `mbstring.*` settings configured for multibyte support

### File Protection
- Sensitive files (.module, .inc, .install, .test, .theme) blocked from HTTP access
- favicon.ico requests redirected with plain text (not processed by PHP)

### URL Routing
- All non-static requests routed to index.php via RewriteRule
- Clean URLs transform `?q=path` to `/path`
- ErrorDocument 404 routed to index.php for Drupal handling

### Caching
- Expires headers set for 2-week cache on all files
- Except for dynamic `text/html` content (1-second expiration)

## Directory Structure Conventions

### Multi-site Support
- `sites/default/` - Default configuration
- `sites/example.com/` - Site-specific overrides (database, modules, themes)
- Module location precedence: sites/example.com/modules/ > sites/all/modules/ > modules/

### Module Architecture
- Core modules in `/modules/` subdirectory
- Site modules in `/sites/all/modules/` or `/sites/[site]/modules/`
- Module file structure: modulename.module, modulename.theme, modulename.install

### Theme System
- `themes/` - Core themes
- Themes can customize via .theme files and override functions
- Template files use .tpl.php extension (deprecated in favor of .theme files)

## Development Workflow

### Local Development
- Create database with MySQL GRANT permissions for full Drupal access
- Set up sites/default/settings.php with database connection
- Enable clean URLs in .htaccess for development
- Cron runs via HTTP request to cron.php endpoint

### Deployment Process
- Files protected by .htaccess rules must not be accessible via web
- Database schema managed by .install files (hook_install/uninstall)
- Variable system manages all configuration (avoid hardcoded values)

## Gotchas & Critical Notes

- **Variable system**: Never `$conf['variable']` directly - use `variable_get()/variable_set()`
- **Cache clearing**: After schema changes, must call `cache_clear_all()` not just `drupal_flush_*`
- **Module weight**: Module loading order controlled by system.weight in database
- **Session handling**: Custom session storage with database fallback
- **URL generation**: Always use `url()` or `l()` functions, never direct links
- **Database queries**: All queries use {table} syntax for prefix support
- **Theme registration**: Templates must be registered via hook_theme()
- **Menu system**: Dynamic menu generation with access control and hierarchy

This Drupal 5.x installation includes PHP 5.3/4 compatibility patches and custom security enhancements that deviate from standard Drupal patterns. Always reference core functions before implementing custom solutions, as many edge cases are already handled by the framework.