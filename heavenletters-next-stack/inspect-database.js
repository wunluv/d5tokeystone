const mysql = require('mysql2/promise');

const dbConfig = {
  host: '192.168.8.103',
  port: 3306,
  user: 'root',
  password: 'mojah42',
  database: 'heaven'
};

async function inspectDatabase() {
  try {
    console.log('🔍 Comprehensive Database Inspection for Heavenletters...\n');

    const connection = await mysql.createConnection(dbConfig);

    // 1. Get All Heavenletters
    console.log('📝 All heavenletters (first 10):');
    const [heavenletters] = await connection.execute(`
      SELECT n.nid, n.vid, n.title, n.created, n.status,
             h.field_heavenletter__value as number,
             ln.locale, p.title as translated_title
      FROM node n
      LEFT JOIN content_type_heavenletters h ON n.vid = h.vid
      LEFT JOIN localizernode ln ON n.nid = ln.nid
      LEFT JOIN node p ON ln.pid = p.nid
      WHERE n.type = 'heavenletters' AND n.status = 1
      ORDER BY n.created DESC
      LIMIT 10
    `);

    heavenletters.forEach(hl => {
      const date = new Date(hl.created * 1000).toISOString().split('T')[0];
      console.log(`  ${hl.nid} (#${hl.number}): "${hl.title}" (${hl.locale}) [${date}]`);
    });

    // 2. Get sample content from node_revisions
    console.log('\n📄 Sample heavenletters content:');
    const [sampleContent] = await connection.execute(`
      SELECT n.nid, n.title, r.body
      FROM node n
      INNER JOIN node_revisions r ON n.vid = r.vid
      WHERE n.type = 'heavenletters' AND n.status = 1
      ORDER BY n.created DESC
      LIMIT 3
    `);

    sampleContent.forEach((item, i) => {
      console.log(`\n--- ${item.nid}: ${item.title} ---`);
      console.log(`Body: ${item.body ? item.body.substring(0, 150) : '<no body>'}...`);
    });

    // 3. Check translation relationships
    console.log('\n🌐 Translation relationships:');
    const [translations] = await connection.execute(`
      SELECT n.nid, n.title as english_title, l.locale,
             CASE
               WHEN l.locale = 'de' THEN 'German'
               WHEN l.locale = 'es' THEN 'Spanish'
               WHEN l.locale = 'fr' THEN 'French'
               WHEN l.locale = 'it' THEN 'Italian'
               ELSE l.locale
             END as language_name,
             TRUNCATE(l.nid / 10000, 0) * 10000 + l.nid % 10000 as translated_nid
      FROM node n
      INNER JOIN localizernode l ON n.nid = l.pid
      WHERE n.type = 'heavenletters' AND n.status = 1
        AND l.locale != 'en'
      ORDER BY l.nid
      LIMIT 10
    `);

    translations.forEach(trans => {
      console.log(`  ${trans.nid} (${trans.locale}): "${trans.english_title}"`);
    });

    // 4. Count by locale
    console.log('\n📊 Heavenletters by language:');
    const [counts] = await connection.execute(`
      SELECT
        CASE
          WHEN ln.locale IS NULL THEN 'en'
          WHEN ln.locale = 'de' THEN 'German'
          WHEN ln.locale = 'es' THEN 'Spanish'
          WHEN ln.locale = 'fr' THEN 'French'
          WHEN ln.locale = 'it' THEN 'Italian'
          ELSE ln.locale
        END as language,
        COUNT(*) as count
      FROM node n
      LEFT JOIN localizernode ln ON n.nid = ln.nid
      WHERE n.type = 'heavenletters' AND n.status = 1
      GROUP BY COALESCE(ln.locale, 'en')
      ORDER BY count DESC
    `);

    counts.forEach(count => {
      console.log(`  ${count.language}: ${count.count} items`);
    });

    // 5. Schema dump for key tables
    console.log('\n🗂️  Schema Summary:');
    const tables = ['node', 'node_revisions', 'localizernode', 'content_type_heavenletters'];
    for (const table of tables) {
      try {
        const [columns] = await connection.execute(`DESCRIBE ${table}`);
        console.log(`\n  ${table}:`);
        columns.forEach(col => {
          console.log(`    ${col.Field}: ${col.Type}`);
        });
      } catch (e) {
        console.log(`    ${table}: ERROR - ${e.message}`);
      }
    }

    console.log('\n✅ Database inspection complete!\n');
    console.log('🔍 Key Findings:');
    console.log('- Content stored in: node_revisions.body');
    console.log('- Letter numbers in: content_type_heavenletters.field_heavenletter__value');
    console.log('- Translations via: localizernode table');
    console.log('- Rich multilingual content with ~10,000+ items');

    await connection.end();

  } catch (error) {
    console.error('❌ Database inspection failed:', error.message);
  }
}

inspectDatabase();