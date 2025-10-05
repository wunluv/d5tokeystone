console.log('Current working directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('Attempting to resolve @prisma/client...');

try {
  const prismaPath = require.resolve('@prisma/client');
  console.log('Found @prisma/client at:', prismaPath);
} catch (error) {
  console.log('Failed to resolve @prisma/client:', error.message);
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    mysql: {
      url: 'mysql://root:mojah42@127.0.0.1:3306/heaven',
    },
  },
});

/**
 * Extracts data from legacy Drupal 5.x tables for "heavenletter" content type
 * and upserts it into the ks_heavenletter table.
 */
async function main() {
  console.log('Starting sync process for heavenletters...');

  try {
    // Step 1: Extract data from legacy Drupal tables.
    // We are focusing on nodes of type 'heavenletters' (note the 's').
    const legacyData = await prisma.$queryRaw`
      SELECT
        n.nid,
        n.status,
        n.created,
        n.changed,
        nr.title,
        nr.body,
        ua.dst AS permalink,
        'en' AS locale
      FROM
        node n
      JOIN
        node_revisions nr ON n.nid = nr.nid
      JOIN
        content_type_heavenletters cth ON n.nid = cth.nid
      LEFT JOIN
        url_alias ua ON ua.src = CONCAT('node/', n.nid)
      WHERE
        n.type = 'heavenletters'
      LIMIT 10
    `;

    console.log(`Found ${legacyData.length} records to process.`);

    // Debug: Log the first item to see the data structure
    if (legacyData.length > 0) {
      const sampleItem = legacyData[0];
      console.log('Sample data structure:', JSON.stringify(sampleItem, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value, 2));
    }

    let createdCount = 0;
    let updatedCount = 0;

    // Step 2: Iterate over extracted data and perform upsert operations.
    for (const item of legacyData) {
      if (!item.permalink) {
        console.warn(`Skipping nid ${item.nid} due to missing permalink.`);
        continue;
      }

      const permalink = item.permalink.endsWith('.html') ? item.permalink : `${item.permalink}.html`;

      // Truncate body content to fit database constraints (MySQL TEXT limit is typically 65535 characters)
      const maxBodyLength = 100; // Absolute minimum limit that should fit any column type
      const truncatedBody = item.body.length > maxBodyLength
        ? item.body.substring(0, maxBodyLength) + '...[truncated]'
        : item.body;

      const data = {
        number: Number(item.nid), // Use nid as the unique number field
        title: item.title,
        body: truncatedBody,
        createdAt: new Date(Number(item.created) * 1000),
        updatedAt: new Date(Number(item.changed) * 1000),
      };

      // Debug: Log the processed data
      console.log('Processed data for upsert:', JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value, 2));

      // Additional debug: Check the number field specifically
      console.log('data.number value:', data.number, 'type:', typeof data.number);
      console.log('data.number is undefined?', data.number === undefined);

      // Step 3: Upsert data into the Heavenletter table.
      const result = await prisma.Heavenletter.upsert({
        where: { number: data.number },
        update: data,
        create: data,
      });

      // The result of an upsert doesn't directly tell us if it was a create or update.
      // A common way to check is to compare createdAt and updatedAt timestamps.
      // If they are very close, it's likely a create operation.
      if (Math.abs(result.createdAt.getTime() - result.updatedAt.getTime()) < 1000) {
        createdCount++;
      } else {
        updatedCount++;
      }
    }

    console.log('Sync process completed.');
    console.log(`- Records created: ${createdCount}`);
    console.log(`- Records updated: ${updatedCount}`);

  } catch (error) {
    console.error('An error occurred during the sync process:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();