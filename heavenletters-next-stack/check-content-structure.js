const mysql = require('mysql2/promise');

const dbConfig = {
  host: '192.168.8.103',
  port: 3306,
  user: 'root',
  password: 'mojah42',
  database: 'heaven'
};

async function checkContentStructure() {
  try {
    console.log('🔍 Checking where heavenletters content is stored...\n');

    const connection = await mysql.createConnection(dbConfig);

    // Check node_revisions table for content
    console.log('📋 Checking node_revisions for content:');
    const [revisions] = await connection.execute(`
      SELECT r.vid, r.nid, r.body
      FROM node_revisions r
      INNER JOIN node n ON n.vid = r.vid
      WHERE n.type = 'heavenletters' AND LENGTH(r.body) > 100
      ORDER BY r.timestamp DESC
      LIMIT 2
    `);

    if (revisions.length > 0) {
      console.log('✅ Found content in node_revisions table:');
      revisions.forEach(rev => {
        console.log(`  VID ${rev.vid}, NID ${rev.nid}`);
        console.log(`  Body preview: ${rev.body.substring(0, 200)}...\n`);
      });
    } else {
      console.log('❌ No content found in node_revisions\n');
    }

    // Check for additional content tables
    console.log('🔎 Looking for additional heavenletters content fields:');
    const [teaserFields] = await connection.execute(`
      SHOW TABLES LIKE '%heav%'
    `);

    if (teaserFields.length > 0) {
      for (const row of teaserFields) {
        const table = Object.values(row)[0];
        console.log(`\n🧩 Checking ${table}:`);
        try {
          const [describe] = await connection.execute(`DESCRIBE ${table}`);
          describe.forEach(field => {
            console.log(`  ${field.Field} (${field.Type})`);
          });

          // Check for sample data
          const [sample] = await connection.execute(`SELECT * FROM ${table} LIMIT 1`);
          if (sample.length > 0) {
            console.log(`  Sample data:`, sample[0]);
          }
        } catch (e) {
          console.log(`  Error checking ${table}`);
        }
      }
    }

    // Look for teaser/teaser-like content in other places
    console.log('\n🔍 Looking for teaser/content fields in heavenletters:');
    const [contentFields] = await connection.execute(`
      SELECT TABLE_NAME, COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME LIKE '%heav%'
      AND (COLUMN_NAME LIKE '%teaser%' OR COLUMN_NAME LIKE '%body%' OR COLUMN_NAME LIKE '%desc%')
    `);

    if (contentFields.length > 0) {
      contentFields.forEach(field => {
        console.log(`  ${field.TABLE_NAME}.${field.COLUMN_NAME}`);
      });
    } else {
      console.log('  No teaser/body/content fields found');
    }

    await connection.end();

  } catch (error) {
    console.error('❌ Content structure check failed:', error.message);
  }
}

checkContentStructure();