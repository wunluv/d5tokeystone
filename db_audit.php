<?php
$pdo = new PDO('mysql:host=192.168.8.103;port=3306;dbname=heaven', 'root', 'mojah42');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

echo "=== Database Version ===\n";
$stmt = $pdo->query("SELECT VERSION()");
echo $stmt->fetchColumn() . "\n\n";

echo "=== Tables ===\n";
$stmt = $pdo->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
foreach ($tables as $table) {
    echo $table . "\n";
}
echo "\n";

$tables_to_audit = ['node', 'node_revisions', 'content_type_heavenletters', 'localizernode', 'users'];

foreach ($tables_to_audit as $table) {
    if (!in_array($table, $tables)) {
        echo "Table $table does not exist.\n";
        continue;
    }

    echo "=== Table $table Structure ===\n";
    $stmt = $pdo->query("SHOW CREATE TABLE `$table`");
    $create = $stmt->fetch(PDO::FETCH_NUM)[1];
    echo $create . ";\n\n";

    echo "=== Table $table Status ===\n";
    $stmt = $pdo->query("SHOW TABLE STATUS LIKE '$table'");
    $status = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Rows: " . $status['Rows'] . ", Engine: " . $status['Engine'] . ", Collation: " . $status['Collation'] . "\n\n";

    echo "=== Sample from $table (LIMIT 5) ===\n";
    $stmt = $pdo->query("SELECT * FROM `$table` LIMIT 5");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        echo print_r($row, true) . "\n";
    }
    echo "\n";

    // Specific checks
    if ($table == 'node') {
        echo "=== Node Counts ===\n";
        $stmt = $pdo->query("SELECT COUNT(*) AS total FROM node");
        echo "Total nodes: " . $stmt->fetchColumn() . "\n";
        $stmt = $pdo->query("SELECT COUNT(*) AS published FROM node WHERE status = 1");
        echo "Published: " . $stmt->fetchColumn() . "\n";
        echo "NULL titles: " . $pdo->query("SELECT COUNT(*) FROM node WHERE title IS NULL OR title = ''")->fetchColumn() . "\n\n";
    }

    if ($table == 'content_type_heavenletters') {
        echo "=== Content Type Counts ===\n";
        $stmt = $pdo->query("SELECT COUNT(*) FROM content_type_heavenletters");
        echo "Total: " . $stmt->fetchColumn() . "\n";
        echo "NULL fields: " . $pdo->query("SELECT COUNT(*) FROM content_type_heavenletters WHERE field_heavenletter_body_value IS NULL")->fetchColumn() . "\n\n";
    }

    if ($table == 'node_revisions') {
        echo "=== Revisions Counts ===\n";
        $stmt = $pdo->query("SELECT COUNT(*) FROM node_revisions");
        echo "Total: " . $stmt->fetchColumn() . "\n\n";
    }

    if ($table == 'users') {
        echo "=== Users Counts ===\n";
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        echo "Total: " . $stmt->fetchColumn() . "\n\n";
    }
}

// Consistency checks
echo "=== Consistency Checks ===\n";
echo "Orphaned content_type_heavenletters: " . $pdo->query("SELECT COUNT(*) FROM content_type_heavenletters ct LEFT JOIN node n ON ct.nid = n.nid WHERE n.nid IS NULL")->fetchColumn() . "\n";
echo "Nodes without content_type_heavenletters: " . $pdo->query("SELECT COUNT(*) FROM node n LEFT JOIN content_type_heavenletters ct ON n.nid = ct.nid WHERE ct.nid IS NULL AND n.type = 'heavenletters'")->fetchColumn() . "\n";
echo "Revisions without node: " . $pdo->query("SELECT COUNT(*) FROM node_revisions nr LEFT JOIN node n ON nr.nid = n.nid WHERE n.nid IS NULL")->fetchColumn() . "\n";
echo "Users referenced in nodes without user: " . $pdo->query("SELECT COUNT(*) FROM node n LEFT JOIN users u ON n.uid = u.uid WHERE u.uid IS NULL AND n.uid > 0")->fetchColumn() . "\n";
echo "Localizer nodes without node: " . $pdo->query("SELECT COUNT(*) FROM localizernode ln LEFT JOIN node n ON ln.nid = n.nid WHERE n.nid IS NULL")->fetchColumn() . "\n\n";

// Sample joins
echo "=== Sample JOIN node + content_type_heavenletters ===\n";
$stmt = $pdo->query("SELECT n.nid, n.title, ct.field_heavenletter_body_value FROM node n LEFT JOIN content_type_heavenletters ct ON n.nid = ct.nid LIMIT 5");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($rows as $row) {
    echo print_r($row, true) . "\n";
}
?>
