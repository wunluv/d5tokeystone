<?php

/**
 * Drupal 5.x Heavenletters.org Database Audit Script
 *
 * This script is designed to be executed from the command line to analyze the
 * structure of a Drupal 5.x database, specifically focusing on the CCK fields
 * related to the 'heavenletters' content type. It extracts schema information
 * and sample data to help validate field mappings for data migration.
 *
 * This is a read-only script and does not perform any modifications to the database.
 *
 * @version 1.0
 * @author AI Assistant
 * @license MIT
 */

// --- Database Configuration ---
// --- IMPORTANT: Replace with your actual database credentials ---
$db_host = '127.0.0.1';
$db_user = 'root';
$db_pass = 'mojah42';
$db_name = 'heaven';

// --- Output Configuration ---
$verbose = true;
$output_file = 'db_audit_results.txt';

/**
 * Main audit function
 */
function run_database_audit() {
    global $db_host, $db_user, $db_pass, $db_name, $verbose, $output_file;

    // Initialize output
    $output = [];
    $output[] = "=== Drupal 5.x Heavenletters.org Database Audit ===";
    $output[] = "Timestamp: " . date('Y-m-d H:i:s');
    $output[] = "Database: {$db_name} on {$db_host}";
    $output[] = "";

    try {
        // Connect to database
        $pdo = new PDO("mysql:host={$db_host};dbname={$db_name}", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec("SET NAMES 'utf8'");

        $output[] = "✅ Database connection successful";
        $output[] = "";

        // Step 1: Analyze all content_field_* and content_type_* tables
        $output[] = "=== STEP 1: Comprehensive CCK Field Analysis ===";
        $cck_analysis = analyze_cck_fields($pdo);
        $output = array_merge($output, $cck_analysis);

        // Step 2: Specifically look for date fields
        $output[] = "=== STEP 2: Date Field Investigation ===";
        $date_analysis = analyze_date_fields($pdo);
        $output = array_merge($output, $date_analysis);

        // Step 3: Extract sample data
        $output[] = "=== STEP 3: Sample Data Extraction ===";
        $sample_analysis = extract_sample_data($pdo);
        $output = array_merge($output, $sample_analysis);

        // Step 4: Analyze content type structure
        $output[] = "=== STEP 4: Content Type Structure Analysis ===";
        $content_type_analysis = analyze_content_types($pdo);
        $output = array_merge($output, $content_type_analysis);

        // Step 5: Generate validation questions
        $output[] = "=== STEP 5: User Validation Points ===";
        $validation_questions = generate_validation_questions($pdo);
        $output = array_merge($output, $validation_questions);

        $pdo = null;

    } catch(PDOException $e) {
        $output[] = "❌ Database connection failed: " . $e->getMessage();
        $output[] = "";
        $output[] = "Please verify your database credentials and connection settings.";
    }

    // Write results to file
    $result = implode("\n", $output);
    file_put_contents($output_file, $result);

    if ($verbose) {
        echo $result;
        echo "\n\n📄 Results also saved to: {$output_file}\n";
    }

    return $result;
}

/**
 * Analyze all CCK field tables
 */
function analyze_cck_fields($pdo) {
    $output = [];

    try {
        // Get all content_field_* tables
        $stmt = $pdo->query("SHOW TABLES LIKE 'content_field_%'");
        $field_tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (empty($field_tables)) {
            $output[] = "No content_field_* tables found.";
            return $output;
        }

        $output[] = "Found " . count($field_tables) . " CCK field tables:";
        foreach ($field_tables as $table) {
            $output[] = "  - {$table}";
        }
        $output[] = "";

        // Analyze each field table structure
        foreach ($field_tables as $table) {
            $output[] = "--- Analysis of {$table} ---";

            // Get table structure
            $stmt = $pdo->query("DESCRIBE {$table}");
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $output[] = "Table structure:";
            foreach ($columns as $column) {
                $null = $column['Null'] === 'YES' ? 'NULL' : 'NOT NULL';
                $default = $column['Default'] ? "DEFAULT '{$column['Default']}'" : '';
                $output[] = "  {$column['Field']} ({$column['Type']}) {$null} {$default}";
            }

            // Get sample data
            try {
                $stmt = $pdo->query("SELECT * FROM {$table} LIMIT 3");
                $sample_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (!empty($sample_data)) {
                    $output[] = "";
                    $output[] = "Sample data (first 3 records):";
                    foreach ($sample_data as $i => $record) {
                        $output[] = "  Record " . ($i + 1) . ":";
                        foreach ($record as $field => $value) {
                            $display_value = strlen($value) > 100 ? substr($value, 0, 100) . '...' : $value;
                            $output[] = "    {$field}: {$display_value}";
                        }
                    }
                }
            } catch (Exception $e) {
                $output[] = "  Could not retrieve sample data: " . $e->getMessage();
            }

            $output[] = "";
        }

    } catch (Exception $e) {
        $output[] = "Error analyzing CCK fields: " . $e->getMessage();
    }

    return $output;
}

/**
 * Specifically analyze date fields
 */
function analyze_date_fields($pdo) {
    $output = [];
    $target_fields = ['field_publish_date', 'field_date_written', 'publish_date', 'date_written'];

    $output[] = "Looking for specific date fields: " . implode(', ', $target_fields);
    $output[] = "";

    foreach ($target_fields as $field_name) {
        $table_name = "content_{$field_name}";

        try {
            $stmt = $pdo->query("DESCRIBE {$table_name}");
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($columns)) {
                $output[] = "--- Found {$table_name} ---";
                $output[] = "Table structure:";
                foreach ($columns as $column) {
                    $null = $column['Null'] === 'YES' ? 'NULL' : 'NOT NULL';
                    $default = $column['Default'] ? "DEFAULT '{$column['Default']}'" : '';
                    $output[] = "  {$column['Field']} ({$column['Type']}) {$null} {$default}";
                }

                // Get sample data
                $stmt = $pdo->query("SELECT * FROM {$table_name} LIMIT 5");
                $sample_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (!empty($sample_data)) {
                    $output[] = "";
                    $output[] = "Sample data (first 5 records):";
                    foreach ($sample_data as $i => $record) {
                        $output[] = "  Record " . ($i + 1) . ":";
                        foreach ($record as $field => $value) {
                            $display_value = strlen($value) > 100 ? substr($value, 0, 100) . '...' : $value;
                            $output[] = "    {$field}: {$display_value}";
                        }
                    }
                }
                $output[] = "";
            }

        } catch (Exception $e) {
            $output[] = "Table {$table_name} not found or error: " . $e->getMessage();
        }
    }

    return $output;
}

/**
 * Extract sample data from heavenletters content
 */
function extract_sample_data($pdo) {
    $output = [];

    try {
        // Get sample heavenletters nodes
        $stmt = $pdo->query("
            SELECT n.nid, n.vid, n.title, n.created, n.changed, n.status, u.name as author
            FROM node n
            LEFT JOIN users u ON n.uid = u.uid
            WHERE n.type = 'heavenletters' AND n.status = 1
            ORDER BY n.created DESC
            LIMIT 10
        ");

        $nodes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($nodes)) {
            $output[] = "No heavenletters nodes found.";
            return $output;
        }

        $output[] = "Found " . count($nodes) . " heavenletters nodes (showing first 10):";
        $output[] = "";

        foreach ($nodes as $node) {
            $output[] = "--- NID {$node['nid']} (VID {$node['vid']}): {$node['title']} ---";
            $output[] = "Author: {$node['author']}";
            $output[] = "Created: " . date('Y-m-d H:i:s', $node['created']);
            $output[] = "Changed: " . date('Y-m-d H:i:s', $node['changed']);
            $output[] = "Status: " . ($node['status'] ? 'Published' : 'Unpublished');

            // Try to get content type data
            try {
                $stmt = $pdo->prepare("SELECT * FROM content_type_heavenletters WHERE vid = ?");
                $stmt->execute([$node['vid']]);
                $content_data = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($content_data) {
                    $output[] = "Content type data:";
                    foreach ($content_data as $field => $value) {
                        if ($field !== 'vid' && $field !== 'nid') {
                            $display_value = strlen($value) > 100 ? substr($value, 0, 100) . '...' : $value;
                            $output[] = "  {$field}: {$display_value}";
                        }
                    }
                } else {
                    $output[] = "No content_type_heavenletters data found for this VID";
                }
            } catch (Exception $e) {
                $output[] = "Error retrieving content data: " . $e->getMessage();
            }

            $output[] = "";
        }

    } catch (Exception $e) {
        $output[] = "Error extracting sample data: " . $e->getMessage();
    }

    return $output;
}

/**
 * Analyze content type structure
 */
function analyze_content_types($pdo) {
    $output = [];

    try {
        // Get all content_type_* tables
        $stmt = $pdo->query("SHOW TABLES LIKE 'content_type_%'");
        $content_type_tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (empty($content_type_tables)) {
            $output[] = "No content_type_* tables found.";
            return $output;
        }

        $output[] = "Found " . count($content_type_tables) . " content type tables:";
        foreach ($content_type_tables as $table) {
            $output[] = "  - {$table}";
        }
        $output[] = "";

        // Analyze heavenletters content type specifically
        $heavenletters_table = 'content_type_heavenletters';
        if (in_array($heavenletters_table, $content_type_tables)) {
            $output[] = "--- Analysis of {$heavenletters_table} ---";

            $stmt = $pdo->query("DESCRIBE {$heavenletters_table}");
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $output[] = "Table structure:";
            foreach ($columns as $column) {
                $null = $column['Null'] === 'YES' ? 'NULL' : 'NOT NULL';
                $default = $column['Default'] ? "DEFAULT '{$column['Default']}'" : '';
                $output[] = "  {$column['Field']} ({$column['Type']}) {$null} {$default}";
            }

            // Get field count
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM {$heavenletters_table}");
            $count = $stmt->fetch(PDO::FETCH_ASSOC);
            $output[] = "";
            $output[] = "Total records: {$count['count']}";
        }

    } catch (Exception $e) {
        $output[] = "Error analyzing content types: " . $e->getMessage();
    }

    return $output;
}

/**
 * Generate validation questions for user
 */
function generate_validation_questions($pdo) {
    $output = [];

    $output[] = "Based on the analysis above, here are the key validation questions:";
    $output[] = "";

    $output[] = "1. FIELD MAPPING VALIDATION:";
    $output[] = "   - Is 'publishNumber' correctly mapped to 'field_heavenletter__value'?";
    $output[] = "   - Is 'publishedOn' correctly mapped to 'field_publish_date'?";
    $output[] = "   - Is 'writtenOn' correctly mapped to 'field_date_written'?";
    $output[] = "";

    $output[] = "2. DATA TYPE VALIDATION:";
    $output[] = "   - Are the date fields storing timestamps as expected?";
    $output[] = "   - Are numeric fields (like publishNumber) storing integers?";
    $output[] = "   - Are text fields properly encoded (UTF-8)?";
    $output[] = "";

    $output[] = "3. RELATIONSHIP VALIDATION:";
    $output[] = "   - Do the VID (version ID) relationships match between node and content tables?";
    $output[] = "   - Are there any orphaned records in CCK field tables?";
    $output[] = "";

    $output[] = "4. CONTENT VALIDATION:";
    $output[] = "   - Does the sample data look correct for each field?";
    $output[] = "   - Are there any unexpected NULL values in required fields?";
    $output[] = "";

    $output[] = "5. MIGRATION SCOPE VALIDATION:";
    $output[] = "   - Should unpublished content (status=0) be migrated?";
    $output[] = "   - Are there any content types that should be excluded from migration?";
    $output[] = "";

    return $output;
}

// Run the audit if this script is executed directly
if (php_sapi_name() === 'cli') {
    run_database_audit();
}

?>
