# Project Debug Rules (Non-Obvious Only)

## Hidden Debug Infrastructure
- Query debugging: Enable with `dev_query` variable for performance monitoring
- Dev query outputs raw SQL with file/line tracing, but only if dev_query is enabled
- Error handler masks all errors with @ unless error_reporting() is explicitly set

## Gotchas That Cause Silent Failures
- **Variable storage**: Never `$conf['variable']` directly - always fails silently
- **Cache clearing**: drupal_flush_* functions don't exist - use cache_clear_all()
- **Module loading**: Hook system only activates after bootstrap phase 7
- **Module weight**: Controlled by database table, not registration order

## Silent Error Patterns
- Database connection failures show maintenance page instead of error logs
- Invalid hostname triggers 400 response before any logging
- Module files not found silently fail without error messages
- Bootstrap phase failures don't log but show maintenance themes

## Webview/Extension Specific
- .htaccess protects sensitive files from HTTP access with 403 responses
- clean URLs rewrite silently intercepts all file/extension requests
- RewriteRule routes non-existent files to index.php without trace

## Critical Development Tips
- ERROR_REPORTING always E_ALL - no development/production difference in visibility
- Bootstrap phases (0-7) must complete sequentially or silent failures occur
- Hook system loaded in phase 7 - any hooks before that point silently ignored
- Table prefixing syntax {table} must be used or queries fail on multi-tenant setups