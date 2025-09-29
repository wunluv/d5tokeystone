const mysql = require('mysql2/promise');

/**
 * Real Database Schema Explorer for Drupal 5.x Heavenletters.org
 * We'll analyze the actual table structure and field names
 */

const dbConfig = {
  host: '192.168.8.103',
  port: 3306,
  user: 'root',
  password: 'mojah42',
  database: 'heaven'
};

async function exploreRealSchema() {
  try {
    console.log('🔍 Connecting to real heavenletters database at 192.168.8.103:3306...\n');

    const connection = await mysql.createConnection(dbConfig);

    // Show all content tables
    console.log('📋 Available CCK content tables:');
    const [tables] = await connection.execute("SHOW TABLES LIKE 'content_%'");
    if (tables.length > 0) {
      tables.forEach(row => {
        const tableName = Object.values(row)[0];
        console.log(`  - ${tableName}`);
      });
    } else {
      console.log('  No CCK content tables found');
    }
    console.log();

    // Examine heavenletters content type table
    console.log('📄 Examining heavenletters content type table:', '\n');
    try {
      const [heavenlettersStructure] = await connection.execute('DESCRIBE content_type_heavenletters');
      console.log('Heavenletters table fields:');
      heavenlettersStructure.forEach(field => {
        console.log(`  ${field.Field} (${field.Type}) ${field.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${field.Default ? `DEFAULT ${field.Default}` : ''}`);
      });
    } catch (e) {
      console.log('  ERROR: content_type_heavenletters table not found');
    }

    // Check for localization tables
    console.log('\n🌐 Checking localization tables:');
    const [localeTables] = await connection.execute("SHOW TABLES LIKE '%localiz%'");
    if (localeTables.length > 0) {
      localeTables.forEach(row => {
        const tableName = Object.values(row)[0];
        console.log(`  Found: ${tableName}`);
      });
    } else {
      console.log('  No localization tables found');
    }

    // Look at actual node data
    console.log('\n📝 Sample node data for heavenletters:');
    try {
      const [nodes] = await connection.execute("SELECT nid, vid, type, title, status, created FROM node WHERE type = 'heavenletters' AND status = 1 ORDER BY created DESC LIMIT 5");
      if (nodes.length > 0) {
        nodes.forEach(node => {
          console.log(`  NID: ${node.nid}, Title: "${node.title}", Created: ${new Date(node.created * 1000).toISOString()}`);
        });
      } else {
        console.log('  No heavenletters found');
      }
    } catch (e) {
      console.log('  ERROR fetching node data');
    }

    // Look for any field data in CCK content tables
    if (tables.length > 0) {
      console.log('\n🔎 Looking for sample CCK data:');
      for (const row of tables.slice(0, 2)) {
        const tableName = Object.values(row)[0];
        try {
          const [sampleData] = await connection.execute(`SELECT * FROM ${tableName} LIMIT 1`);
          if (sampleData.length > 0) {
            console.log(`  ${tableName} sample fields:`);
            Object.keys(sampleData[0]).forEach(key => {
              console.log(`    ${key}: ${sampleData[0][key]}`);
            });
          }
        } catch (e) {
          console.log(`  Error checking ${tableName}: ${e.message}`);
        }
      }
    }

    console.log('\n✅ Schema exploration complete!');

    await connection.end();

  } catch (error) {
    console.error('❌ Schema exploration failed:', error.message);
  }
}

exploreRealSchema();