const mysql = require('mysql2/promise');

async function quickDBTest() {
  console.log('Testing database connectivity...');

  try {
    const connection = await mysql.createConnection({
      host: '192.168.8.103',
      user: 'root',
      password: 'mojah42',
      database: 'heaven',
      connectTimeout: 5000, // 5 second timeout
      acquireTimeout: 5000
    });

    console.log('✅ Connected to MySQL');

    const [results] = await connection.execute('SELECT DATABASE() as db');
    console.log('Current database:', results[0].db);

    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Tables found:', tables.length);

    // Log tables with ks_ prefix
    const ksTables = tables.filter(table => table[Object.keys(table)[0]].startsWith('ks_'));
    console.log('ks_ prefixed tables:', ksTables.map(row => Object.values(row)[0]).join(', '));

    await connection.end();
    console.log('✅ Database test completed successfully');

  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    console.log('This could indicate:');
    console.log('1. Database server not running');
    console.log('2. Authentication credentials incorrect');
    console.log('3. Network connectivity issues');
    console.log('4. Database "heaven" does not exist');
  }
}

quickDBTest().catch(console.error);