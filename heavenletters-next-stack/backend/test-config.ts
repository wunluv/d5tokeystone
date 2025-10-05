import { config } from '@keystone-6/core';
import { lists } from './schema';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Keystone configuration...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('KEYSTONE_PORT:', process.env.KEYSTONE_PORT || 'Not set');

try {
  const keystoneConfig = config({
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL,
    },
    lists,
    server: {
      cors: {
        origin: true,
        credentials: true,
      },
      port: 3000,
    },
    ui: {
      isAccessAllowed: () => true,
    },
  });

  console.log('✅ Keystone configuration created successfully');
  console.log('Configuration has', Object.keys(keystoneConfig).length, 'top-level keys');
  process.exit(0);
} catch (error) {
  console.error('❌ Error creating Keystone configuration:', error.message);
  process.exit(1);
}