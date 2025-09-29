const mysql = require('mysql2/promise');

const dbConfig = {
  host: '192.168.8.103',
  port: 3306,
  user: 'root',
  password: 'mojah42',
  database: 'heaven'
};

async function testBasicQueries() {
  try {
    console.log('🧪 Testing Basic Database Connectivity...\n');

    const connection = await mysql.createConnection(dbConfig);

    // Simple connectivity test
    console.log('✅ Connected to database successfully!');

    // Test heavenletters count
    const [countResult] = await connection.execute(`
      SELECT COUNT(*) as total
      FROM node
      WHERE type = 'heavenletters' AND status = 1
    `);
    console.log(`📊 Total heavenletters: ${countResult[0].total}`);

    // Test recent heavenletters with localizer
    const [recent] = await connection.execute(`
      SELECT n.nid, n.title,
             COALESCE(ln.locale, 'en') as locale,
             FROM_UNIXTIME(n.created, '%Y-%m-%d') as created_date,
             h.field_heavenletter__value as number
      FROM node n
      LEFT JOIN localizernode ln ON n.nid = ln.nid
      LEFT JOIN content_type_heavenletters h ON n.vid = h.vid
      WHERE n.type = 'heavenletters' AND n.status = 1
      ORDER BY n.created DESC
      LIMIT 5
    `);

    console.log('\n📈 Recent heavenletters:');
    recent.forEach(hl => {
      console.log(`  ${hl.nid}(#${hl.number}): "${hl.title.substring(0, 40)}..." [${hl.locale}]`);
    });

    // Test translations via localizer
    const [translations] = await connection.execute(`
      SELECT COUNT(*) as total_translations,
             COUNT(DISTINCT ln.tnid) as unique_base_content
      FROM localizernode ln
      INNER JOIN node n ON ln.nid = n.nid
      WHERE n.type = 'heavenletters' AND ln.locale != 'en'
    `);

    console.log(`\n🌐 Translations found: ${translations[0].total_translations}`);
    console.log(`📝 Unique translated content: ${translations[0].unique_base_content}`);

    console.log('\n🎉 All database connectivity tests passed!');
    console.log('🎯 GraphQL API should now be able to serve real heavenletters data.');

    await connection.end();

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔍 Check:');
    console.log('- Database is running and accessible');
    console.log('- Network connection to 192.168.8.103:3306');
    console.log('- MariaDB is accepting connections');
  }
}

testBasicQueries();