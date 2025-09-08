# Project Debug Rules (Non-Obvious Only)
- **Variable storage**: $conf['variable'] attempt fails silently - undetectable without debugging
- **Cache clearing**: drupal_flush_* functions nonexistent - cache_clear_all() only option
- **Module loading**: Hook system dormant until bootstrap phase 7 completion
- **Module weight**: Database-controlled ordering, runtime modifiable without warnings
- **Database connection failures**: No logged errors - only maintenance page displayed
- **Invalid HTTP_HOST**: 400 response with zero logging or traceability
- **Bootstrap phases**: Sequential order mandatory - partial completion undetectable
- **Error handler masking**: @ operator defeats E_ALL reporting due to handler timing