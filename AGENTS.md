# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands

- `perl scripts/code-style.pl <file>` - Check Drupal 5.x code style compliance
- `bash scripts/code-clean.sh` - Remove backup files, normalize whitespace to 2 spaces

## Code Style Rules (Non-Obvious Only)

### Syntax Enforcement
- **Array syntax**: ONLY `["key"]`, `[$variable]`, `[0]` allowed - `$array['key']` forbidden
- **IIS REQUEST_URI bug**: `$_SERVER['REQUEST_URI']` doesn't work on IIS - always use `request_uri()`
- **E_DEPRECATED constant**: Must be defined for PHP <5.3 compatibility (not standard constant)

### String Gluing Rules
- **Concatenation syntax**: Strict `foo . "bar"` spacing - no extra spaces around `.`
- **HTML auto-closing**: `<br />` only (space required) - `<br/>` forbidden
- **Attribute quoting**: `key="value"` only - `key=value` forbidden

### Control Structure Rules
- **Brace positioning**: `} else {` only - `}\nelse\n{` forbidden
- **Conditional braces**: All `if/while/foreach` must have braces even for single statements
- **Space before opening paren**: `$1 (` NOT `$1(`
- **Function paren spacing**: `func(` NOT `func (`

### Whitespace Normalization
- **Tab conversion**: Enforces 2 spaces, removes all tabs (not 4 spaces standard)
- **Backup file removal**: Removes `*#~`, `.#*`, `*.rej`, `*.orig`, `DEADJOE`

## Critical Architecture Patterns

### Database Compatibility Layer
- **CLIENT_FOUND_ROWS flag**: Results return matched rows - essential for proper pagination
- **Sequence system**: Custom sequences table replaces AUTO_INCREMENT for cross-database portability
- **Table name restriction**: Only `[A-Za-z0-9_]+` allowed in db_escape_table() - no hyphens
- **Per-table prefixing**: Complex logic handles mixed prefixing strategies simultaneously

### Session Security Layer
- **Hostname-based session names**: `$session_name = 'SESS' . md5($session_name . 'SSL'*cookie_secure)`
- **Cookie domain logic**: Strips www., leading periods, requires ≥2 dots, handles ports/stripping

### Bootstrap Sequence Validation
- **Phase dependencies**: All functionality depends on completing phases 0-7 sequentially
- **Module activation**: Hooks only functional after phase 7 (session/db/cache initialized)
- **Error handling bypass**: `@` suppression defeats `error_reporting(E_ALL)` due to handler positioning

### Runtime Query Modification
- **hook_db_rewrite_sql**: Modules can modify SELECT queries at runtime based on context
- **Complex JOIN/WHERE insertion**: Query rewriting system intelligently places clauses

### File System Security
- **HTTP requests blocked**: `.module`, `.inc`, `.install`, `.test`, `.theme` forbidden via .htaccess
- **Multi-path file discovery**: 4-level fallback (config > global > theme > core)

### Form Processing Pitfalls
- **File upload stripslashes**: `tmp_name` exception for Windows path compatibility
- **magic_quotes_gpc detection**: Recursive array processing with upload file exception

## Gotchas That Cause Silent Failures

- **HTTP_HOST validation**: Invalid hostnames trigger immediate 400 response (no logging)
- **Database connection failures**: Maintenance page shown, no error logs written
- **UTF-8 validation strictness**: Any invalid UTF-8 returns empty string (security hardening)
- **Unicode header forcing**: UTF-8 charset ALWAYS added to Content-Type (XSS prevention)