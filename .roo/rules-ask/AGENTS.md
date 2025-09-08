# Project Documentation Rules (Non-Obvious Only)
- `includes/` contains core functionality, not optional components (bootstrap.inc critical)
- `misc/` includes critical JavaScript libraries (jQuery, Drupal JS) - surprising placement
- `profiles/` contains distribution templates, not user profiles
- `scripts/` contains essential build tools (code-style.pl, code-clean.sh) - not just helpers