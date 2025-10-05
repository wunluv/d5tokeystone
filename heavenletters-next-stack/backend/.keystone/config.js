var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default,
  keystoneConfig: () => keystoneConfig
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && session.data.role === "admin",
        update: ({ session, item }) => {
          if (!session?.data) return false;
          if (session.data.role === "admin") return true;
          if (item?.id === session.data.id) return true;
          return false;
        },
        delete: ({ session }) => !!session?.data && session.data.role === "admin",
        query: ({ session }) => !!session?.data
      },
      filter: {
        query: ({ session }) => {
          if (!session?.data) return false;
          if (session.data.role === "admin") return true;
          return { id: { equals: session.data.id } };
        },
        update: ({ session }) => {
          if (!session?.data) return false;
          if (session.data.role === "admin") return true;
          return { id: { equals: session.data.id } };
        }
      }
    },
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true
      }),
      password: (0, import_fields.password)({
        validation: {
          isRequired: true,
          length: { min: 8 }
        }
      }),
      bio: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      role: (0, import_fields.select)({
        options: [
          { label: "Admin", value: "admin" },
          { label: "Author", value: "author" },
          { label: "Translator", value: "translator" }
        ],
        defaultValue: "author",
        ui: {
          displayMode: "segmented-control"
        }
      }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "role", "bio"]
      }
    }
  }),
  Heavenletter: (0, import_core.list)({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && session.data.role === "admin",
        update: ({ session }) => !!session?.data && session.data.role === "admin",
        delete: ({ session }) => !!session?.data && session.data.role === "admin",
        query: ({ session }) => !!session?.data
      }
    },
    fields: {
      permalink: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      body: (0, import_fields.text)({
        validation: { isRequired: true },
        ui: {
          displayMode: "textarea"
        }
      }),
      locale: (0, import_fields.text)({
        validation: { isRequired: true, length: { min: 2, max: 8 } },
        isIndexed: true
      }),
      publishNumber: (0, import_fields.integer)({
        isFilterable: true
      }),
      publishedOn: (0, import_fields.timestamp)(),
      writtenOn: (0, import_fields.timestamp)(),
      nid: (0, import_fields.integer)(),
      tnid: (0, import_fields.integer)(),
      tags: (0, import_fields.json)(),
      embeddings: (0, import_fields.json)(),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" },
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "read" }
        }
      }),
      updatedAt: (0, import_fields.timestamp)({
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "read" }
        }
      })
    },
    ui: {
      labelField: "title",
      listView: {
        initialColumns: ["title", "locale", "publishNumber", "publishedOn", "permalink"]
      }
    }
  }),
  Post: (0, import_core.list)({
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ["admin", "author"].includes(session.data.role),
        update: ({ session, item }) => {
          if (!session?.data) return false;
          if (session.data.role === "admin") return true;
          if (session.data.role === "author" && item?.author === session.data.id) return true;
          return false;
        },
        delete: ({ session }) => !!session?.data && session.data.role === "admin",
        query: ({ session }) => !!session?.data
      }
    },
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control"
        }
      }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      publishedAt: (0, import_fields.timestamp)()
    }
  }),
  Tag: (0, import_core.list)({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ["admin", "author"].includes(session.data.role),
        update: ({ session }) => !!session?.data && ["admin", "author"].includes(session.data.role),
        delete: ({ session }) => !!session?.data && session.data.role === "admin",
        query: ({ session }) => !!session?.data
      }
    },
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true }),
      createdAt: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } })
    }
  })
};

// keystone.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
console.log("Keystone: dotenv loaded, DATABASE_URL=", process.env.DATABASE_URL);
console.log("Keystone: KEYSTONE_PORT=", process.env.KEYSTONE_PORT);
var keystoneConfig = (0, import_core2.config)({
  db: {
    provider: "mysql",
    url: process.env.DATABASE_URL
  },
  lists,
  // Temporarily disable session and auth to test basic functionality
  // session,
  server: {
    cors: {
      origin: true,
      credentials: true
    },
    port: 3e3
  },
  ui: {
    // Temporarily disable UI access control to test basic functionality
    isAccessAllowed: () => true
  }
  // Temporarily disable GraphQL extensions to test basic functionality
  // graphql: {
  //   extendGraphqlSchema: (schema: any) => {
  //     // Use graphql-js to extend the generated schema with typeDefs, then attach a resolver to the new field.
  //     const { parse, extendSchema } = require('graphql');
  //     const typeDefs = `
  //       extend type Query {
  //         heavenlettersByTitle(search: String, title: String): [Heavenletter]
  //         heavenletterByNumber(number: Int): Heavenletter
  //         heavenletterByPermalink(permalink: String!, locale: String): Heavenletter
  //       }
  //     `;
  //     const extended = extendSchema(schema, parse(typeDefs));
  //     // Attach resolver directly to the new field on the Query type.
  //     const queryType = extended.getType('Query');
  //     if (queryType && (queryType as any).getFields) {
  //       const fields = (queryType as any).getFields();
  //       fields.heavenlettersByTitle.resolve = async (_root: any, args: { search?: string, title?: string }, context: any) => {
  //         const search = args.search || args.title;
  //         console.log('Keystone: heavenlettersByTitle resolver called with args.search=', args.search, 'args.title=', args.title, 'resolved search=', search);
  //         if (!search) return [];
  //         // Use Keystone's query API. MySQL default collations are usually
  //         // case-insensitive, so `contains` will typically behave insensitively.
  //         try {
  //           return await context.query.Heavenletter.findMany({
  //             where: {
  //               title: {
  //                 contains: search,
  //               },
  //             },
  //           });
  //         } catch (err) {
  //           console.warn('Keystone: query failed in heavenlettersByTitle resolver, error=', err);
  //           return [];
  //         }
  //       };
  //       fields.heavenletterByNumber.resolve = async (_root: any, args: { number?: number }, context: any) => {
  //         const num = args.number;
  //         console.log('Keystone: heavenletterByNumber resolver called with number=', num);
  //         if (typeof num !== 'number') return null;
  //         try {
  //           // Prefer findOne for unique fields if available; otherwise fall back to findMany.
  //           if (typeof context.query.Heavenletter.findOne === 'function') {
  //             return await context.query.Heavenletter.findOne({ where: { publishNumber: num } });
  //           }
  //           const items = await context.query.Heavenletter.findMany({ where: { publishNumber: num }, take: 1 });
  //           return items && items.length ? items[0] : null;
  //         } catch (err) {
  //           console.warn('Keystone: query failed in heavenletterByNumber resolver, error=', err);
  //           return null;
  //         }
  //       };
  //       fields.heavenletterByPermalink.resolve = async (_root: any, args: { permalink: string, locale?: string }, context: any) => {
  //         const { permalink, locale } = args;
  //         console.log('Keystone: heavenletterByPermalink resolver called with permalink=', permalink, 'locale=', locale);
  //         if (!permalink) return null;
  //         try {
  //           const where = { permalink: { equals: permalink } };
  //           if (locale) {
  //             (where as any).locale = { equals: locale };
  //           }
  //           // Prefer findOne for unique fields if available; otherwise fall back to findMany.
  //           if (typeof context.query.Heavenletter.findOne === 'function') {
  //             return await context.query.Heavenletter.findOne({ where });
  //           }
  //           const items = await context.query.Heavenletter.findMany({ where, take: 1 });
  //           return items && items.length ? items[0] : null;
  //         } catch (err) {
  //           console.warn('Keystone: query failed in heavenletterByPermalink resolver, error=', err);
  //           return null;
  //         }
  //       };
  //     }
  //     return extended;
  //   },
  // },
  // Temporarily disable UI access control to test basic functionality
  // ui: {
  //   isAccessAllowed: (context: any) => {
  //     const session = context.session;
  //     return !!session?.data && session.data.isActive === 'true' && ['admin', 'author', 'translator'].includes(session.data.role);
  //   },
  // },
});
console.log("Keystone: keystoneConfig built, extendGraphqlSchema present=", !!keystoneConfig.graphql?.extendGraphqlSchema);
var keystone_default = keystoneConfig;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  keystoneConfig
});
//# sourceMappingURL=config.js.map
