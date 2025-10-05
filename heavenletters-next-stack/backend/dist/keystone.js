"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.keystoneConfig = void 0;
const core_1 = require("@keystone-6/core");
const schema_1 = require("./schema");
const auth_1 = require("./auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Keystone: dotenv loaded, DATABASE_URL=', process.env.DATABASE_URL);
console.log('Keystone: KEYSTONE_PORT=', process.env.KEYSTONE_PORT);
exports.keystoneConfig = (0, core_1.config)({
    db: {
        provider: 'mysql',
        url: process.env.DATABASE_URL,
    },
    lists: schema_1.lists,
    session: auth_1.session,
    server: {
        cors: {
            origin: true,
            credentials: true,
        },
    },
    graphql: {
        extendGraphqlSchema: (schema) => {
            // Use graphql-js to extend the generated schema with typeDefs, then attach a resolver to the new field.
            const { parse, extendSchema } = require('graphql');
            const typeDefs = `
        extend type Query {
          heavenlettersByTitle(search: String, title: String): [Heavenletter]
          heavenletterByNumber(number: Int): Heavenletter
          heavenletterByPermalink(permalink: String!, locale: String): Heavenletter
        }
      `;
            const extended = extendSchema(schema, parse(typeDefs));
            // Attach resolver directly to the new field on the Query type.
            const queryType = extended.getType('Query');
            if (queryType && queryType.getFields) {
                const fields = queryType.getFields();
                fields.heavenlettersByTitle.resolve = async (_root, args, context) => {
                    const search = args.search || args.title;
                    console.log('Keystone: heavenlettersByTitle resolver called with args.search=', args.search, 'args.title=', args.title, 'resolved search=', search);
                    if (!search)
                        return [];
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
                    }
                    catch (err) {
                        console.warn('Keystone: query failed in heavenlettersByTitle resolver, error=', err);
                        return [];
                    }
                };
                fields.heavenletterByNumber.resolve = async (_root, args, context) => {
                    const num = args.number;
                    console.log('Keystone: heavenletterByNumber resolver called with number=', num);
                    if (typeof num !== 'number')
                        return null;
                    try {
                        // Prefer findOne for unique fields if available; otherwise fall back to findMany.
                        if (typeof context.query.Heavenletter.findOne === 'function') {
                            return await context.query.Heavenletter.findOne({ where: { publishNumber: num } });
                        }
                        const items = await context.query.Heavenletter.findMany({ where: { publishNumber: num }, take: 1 });
                        return items && items.length ? items[0] : null;
                    }
                    catch (err) {
                        console.warn('Keystone: query failed in heavenletterByNumber resolver, error=', err);
                        return null;
                    }
                };
                fields.heavenletterByPermalink.resolve = async (_root, args, context) => {
                    const { permalink, locale } = args;
                    console.log('Keystone: heavenletterByPermalink resolver called with permalink=', permalink, 'locale=', locale);
                    if (!permalink)
                        return null;
                    try {
                        const where = { permalink: { equals: permalink } };
                        if (locale) {
                            where.locale = { equals: locale };
                        }
                        // Prefer findOne for unique fields if available; otherwise fall back to findMany.
                        if (typeof context.query.Heavenletter.findOne === 'function') {
                            return await context.query.Heavenletter.findOne({ where });
                        }
                        const items = await context.query.Heavenletter.findMany({ where, take: 1 });
                        return items && items.length ? items[0] : null;
                    }
                    catch (err) {
                        console.warn('Keystone: query failed in heavenletterByPermalink resolver, error=', err);
                        return null;
                    }
                };
            }
            return extended;
        },
    },
    ui: {
        isAccessAllowed: (context) => {
            const session = context.session;
            return !!(session === null || session === void 0 ? void 0 : session.data) && session.data.isActive === 'true' && ['admin', 'author', 'translator'].includes(session.data.role);
        },
    },
});
console.log('Keystone: keystoneConfig built, extendGraphqlSchema present=', !!((_a = exports.keystoneConfig.graphql) === null || _a === void 0 ? void 0 : _a.extendGraphqlSchema));
exports.default = (0, auth_1.withAuth)(exports.keystoneConfig);
