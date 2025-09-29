const mysql = require('mysql2/promise');

/**
 * Database Analysis Script for Drupal 5.x Heavenletters.org
 * This script analyzes the heavenletters content type and translation structure
 */

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'mojah42',
  database: 'heaven'
};

async function analyzeHeavenlettersStructure() {
  try {
    console.log('🔍 Analyzing heavenletters database structure...\n');

    const connection = await mysql.createConnection(dbConfig);

    // Get all content types
    console.log('📝 Available Content Types:');
    const [contentTypes] = await connection.execute(`
      SELECT DISTINCT n.type, COUNT(*) as count
      FROM node n
      WHERE n.status = 1
      GROUP BY n.type
      ORDER BY count DESC
    `);

    contentTypes.forEach(ct => {
      console.log(`  - ${ct.type}: ${ct.count} items`);
    });

    console.log('\n');

    // Analyze heavenletters content type
    console.log('📄 Analyzing heavenletters content type:');
    const [heavenlettersSchema] = await connection.execute(`
      SELECT
        n.nid, n.vid, n.type, n.title, n.status, n.created, n.changed,
        u.name as author,
        nr.title as revision_title, nr.log as revision_log
      FROM node n
      LEFT JOIN users u ON n.uid = u.uid
      LEFT JOIN node_revisions nr ON n.vid = nr.vid
      WHERE n.type = 'heavenletters'
      AND n.status = 1
      ORDER BY n.created DESC
      LIMIT 5
    `);

    console.log('Sample heavenletters:');
    heavenlettersSchema.forEach(item => {
      console.log(`  - NID: ${item.nid}, Title: "${item.title}", Author: ${item.author}, Created: ${new Date(item.created * 1000).toISOString()}`);
    });

    // Look for translation module data
    console.log('\n🌐 Checking for translation data:');
    const [translationTables] = await connection.execute(`
      SHOW TABLES LIKE '%translation%'
    `);

    if (translationTables.length > 0) {
      console.log('Translation tables found:');
      translationTables.forEach(table => {
        console.log(`  - ${Object.values(table)[0]}`);
      });

      // Check i18n_node table if it exists
      try {
        const [i18nData] = await connection.execute(`
          SELECT * FROM i18n_node WHERE type = 'heavenletters' LIMIT 3
        `);
        console.log(`\nI18N Node data for heavenletters (${i18nData.length} records):`);
        i18nData.forEach(item => {
          console.log(`  - NID: ${item.nid}, Language: ${item.language}, TNID: ${item.tnid}`);
        });
      } catch (e) {
        console.log('  No i18n_node table found');
      }
    } else {
      console.log('  No translation tables found');
    }

    // Look for locale data
    console.log('\n📋 Checking for locale/language data:');
    const [localeTables] = await connection.execute(`
      SHOW TABLES LIKE '%locale%'
    `);

    if (localeTables.length > 0) {
      localeTables.forEach(table => {
        console.log(`  - ${Object.values(table)[0]}`);
      });

      // Check locales_target table
      try {
        const [localeTargetData] = await connection.execute(`
          SELECT DISTINCT lid, translation, locale FROM locales_target LIMIT 10
        `);
        console.log(`\nAvailable languages/translations (${localeTargetData.length}):`);
        localeTargetData.forEach(item => {
          console.log(`  - ${item.locale}: ${item.translation}`);
        });
      } catch (e) {
        console.log('  No locales_target table found');
      }
    }
    // Look for CCK fields
    console.log('\n🧩 Checking for CCK field data:');
    const [cckTables] = await connection.execute(`
      SHOW TABLES LIKE 'content_%'
    `);

    if (cckTables.length > 0) {
      console.log(`CCK content tables found (${cckTables.length}):`);
      cckTables.slice(0, 5).forEach(table => {
        console.log(`  - ${Object.values(table)[0]}`);
      });

      if (cckTables.length > 5) {
        console.log(`  ... and ${cckTables.length - 5} more`);
      }
    } else {
      console.log('  No CCK content tables found');
    }

    // Get heavenletter sample content
    console.log('\n📖 Sample heavenletter content:');
    try {
      const [contentData] = await connection.execute(`
        SELECT n.nid, n.title,
               LEFT(f.field_teaser_value, 150) as teaser
        FROM node n
        INNER JOIN content_type_heavenletters f ON n.vid = f.vid
        WHERE n.type = 'heavenletters'
        AND n.status = 1
        ORDER BY n.created DESC
        LIMIT 3
      `);

      if (contentData.length > 0) {
        contentData.forEach(item => {
          console.log(`\n--- NID ${item.nid}: ${item.title} ---`);
          console.log(`Teaser: ${item.teaser}${item.teaser.length >= 150 ? '...' : ''}`);
        });
      }
    } catch (e) {
      console.log('  Error reading heavenletters content:', e.message);
    }

    await connection.end();

    console.log('\n✅ Analysis complete!');
    console.log('\n📊 Next steps:');
    console.log('1. Set up GraphQL API for heavenletters data');
    console.log('2. Create KeystoneJS migration scripts');
    console.log('3. Design multilingual content models');

  } catch (error) {
    console.error('❌ Database analysis failed:', error.message);
  }
}

console.log('🚀 Starting Drupal Database Analysis...\n');
analyzeHeavenlettersStructure();