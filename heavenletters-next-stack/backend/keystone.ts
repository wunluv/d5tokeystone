import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import dotenv from 'dotenv';

dotenv.config();
console.log('Keystone: dotenv loaded, DATABASE_URL=', process.env.DATABASE_URL);
console.log('Keystone: KEYSTONE_PORT=', process.env.KEYSTONE_PORT);

export const keystoneConfig = config({
  db: {
    provider: 'mysql',
    url: process.env.DATABASE_URL!,
  },
  lists,
  session,
  server: {
    cors: {
      origin: 'http://192.168.8.105:34773',
      credentials: true,
    },
  },
  graphql: {
    extendGraphqlSchema: (schema: any) => {
      // Use graphql-js to extend the generated schema with typeDefs, then attach a resolver to the new field.
      const { parse, extendSchema } = require('graphql');
      const typeDefs = `
        extend type Query {
          heavenlettersByTitle(search: String, title: String): [Heavenletter]
          heavenletterByNumber(number: Int): Heavenletter
        }
      `;
      const extended = extendSchema(schema, parse(typeDefs));
      // Attach resolver directly to the new field on the Query type.
      const queryType = extended.getType('Query');
      if (queryType && (queryType as any).getFields) {
        const fields = (queryType as any).getFields();
        fields.heavenlettersByTitle.resolve = async (_root: any, args: { search?: string, title?: string }, context: any) => {
          const search = args.search || args.title;
          console.log('Keystone: heavenlettersByTitle resolver called with args.search=', args.search, 'args.title=', args.title, 'resolved search=', search);
          if (!search) return [];
          // Use Keystone's query API. MySQL default collations are usually
          // case-insensitive, so `contains` will typically behave insensitively.
          try {
            return await context.query.Heavenletter.findMany({
              where: {
                title: {
                  contains: search,
                },
              },
            });
          } catch (err) {
            console.warn('Keystone: query failed in heavenlettersByTitle resolver, error=', err);
            return [];
          }
        };
        fields.heavenletterByNumber.resolve = async (_root: any, args: { number?: number }, context: any) => {
          const num = args.number;
          console.log('Keystone: heavenletterByNumber resolver called with number=', num);
          if (typeof num !== 'number') return null;
          try {
            // Prefer findOne for unique fields if available; otherwise fall back to findMany.
            if (typeof context.query.Heavenletter.findOne === 'function') {
              return await context.query.Heavenletter.findOne({ where: { number: num } });
            }
            const items = await context.query.Heavenletter.findMany({ where: { number: num }, take: 1 });
            return items && items.length ? items[0] : null;
          } catch (err) {
            console.warn('Keystone: query failed in heavenletterByNumber resolver, error=', err);
            return null;
          }
        };
      }
      return extended;
    },
  },
  ui: {
    isAccessAllowed: (context: any) => {
      const session = context.session;
      return !!session?.data && session.data.isActive === 'true' && ['admin', 'author', 'translator'].includes(session.data.role);
    },
  },
} as any);

console.log('Keystone: keystoneConfig built, extendGraphqlSchema present=', !!(keystoneConfig as any).extendGraphqlSchema);

export default withAuth(keystoneConfig);