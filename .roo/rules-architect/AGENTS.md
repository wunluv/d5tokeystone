# Project Architecture Rules (Non-Obvious Only)
- **7-phase bootstrap dependency**: Complete all 0-7 phases or modules fail silently
- **Hook execution timing**: Hooks dormant until phase 7 completion
- **Page cache optimization**: Early cache check bypasses full module loading
- **Database independence**: Custom sequences replace AUTO_INCREMENT universally
- **Query rewriting**: Runtime modification via hook_db_rewrite_sql with complex insertion logic
- **File discovery**: 4-level fallback (config > global > theme > module locations)
- **Variable system**: Serialized caching from {variable} table with critical memory impact
- **Session security**: Hostname + SSL-based session names prevent cross-site attacks