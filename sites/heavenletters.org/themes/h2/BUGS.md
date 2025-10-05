# Bug Fixes

## 1. Username Truncation
- **Issue:** Usernames longer than 12 characters were being truncated too aggressively, leading to poor readability.
- **Fix:** Increased the truncation limit to 20 characters and the substring to 15 characters in the `phptemplate_username` function in `template.php`. This provides a more reasonable truncation length for longer usernames.