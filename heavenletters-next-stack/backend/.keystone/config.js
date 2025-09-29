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
        create: ({ session: session2 }) => !!session2?.data && session2.data.role === "admin",
        update: ({ session: session2, item }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          if (item?.id === session2.data.id) return true;
          return false;
        },
        delete: ({ session: session2 }) => !!session2?.data && session2.data.role === "admin",
        query: ({ session: session2 }) => !!session2?.data
      },
      filter: {
        query: ({ session: session2 }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          return { id: { equals: session2.data.id } };
        },
        update: ({ session: session2 }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          return { id: { equals: session2.data.id } };
        }
      }
    },
    hooks: {
      afterOperation: ({ operation, item }) => {
        if ((operation === "create" || operation === "update") && item) {
          item.lastLogin = /* @__PURE__ */ new Date();
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
      heavenletters: (0, import_fields.relationship)({ ref: "Heavenletter.author", many: true }),
      translations: (0, import_fields.relationship)({ ref: "Translation.translator", many: true }),
      lastLogin: (0, import_fields.timestamp)(),
      isActive: (0, import_fields.select)({
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" }
        ],
        defaultValue: "true",
        ui: {
          displayMode: "segmented-control"
        }
      }),
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
        create: ({ session: session2 }) => !!session2?.data && ["admin", "author"].includes(session2.data.role),
        update: ({ session: session2, item }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          if (session2.data.role === "author" && item?.author === session2.data.id) return true;
          return false;
        },
        delete: ({ session: session2 }) => !!session2?.data && session2.data.role === "admin",
        query: ({ session: session2 }) => !!session2?.data
      }
    },
    fields: {
      number: (0, import_fields.integer)({
        validation: { isRequired: true, min: 1 },
        isIndexed: "unique",
        isFilterable: true
      }),
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      body: (0, import_fields.text)({
        validation: { isRequired: true },
        ui: {
          displayMode: "textarea"
        }
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
          { label: "Archived", value: "archived" }
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control"
        }
      }),
      publishedAt: (0, import_fields.timestamp)(),
      author: (0, import_fields.relationship)({
        ref: "User.heavenletters",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email", "role"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      translations: (0, import_fields.relationship)({
        ref: "Translation.heavenletter",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["languageCode", "status", "translatedTitle"],
          hideCreate: true
        }
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      updatedAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    },
    ui: {
      listView: {
        initialColumns: ["number", "title", "status", "author", "translations", "publishedAt"]
      }
    }
  }),
  Translation: (0, import_core.list)({
    access: {
      operation: {
        create: ({ session: session2 }) => !!session2?.data && ["admin", "translator"].includes(session2.data.role),
        update: ({ session: session2, item }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          if (session2.data.role === "translator" && item?.translator === session2.data.id) return true;
          return false;
        },
        delete: ({ session: session2, item }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          if (session2.data.role === "translator" && item?.translator === session2.data.id) return true;
          return false;
        },
        query: ({ session: session2 }) => !!session2?.data
      }
    },
    fields: {
      languageCode: (0, import_fields.select)({
        options: [
          { label: "English", value: "en" },
          { label: "German", value: "de" },
          { label: "Spanish", value: "es" },
          { label: "French", value: "fr" },
          { label: "Italian", value: "it" },
          { label: "Portuguese", value: "pt" },
          { label: "Russian", value: "ru" },
          { label: "Chinese", value: "zh" },
          { label: "Japanese", value: "ja" },
          { label: "Arabic", value: "ar" }
        ],
        validation: { isRequired: true },
        isFilterable: true
      }),
      translatedTitle: (0, import_fields.text)({ validation: { isRequired: true } }),
      translatedBody: (0, import_fields.text)({
        validation: { isRequired: true },
        ui: {
          displayMode: "textarea"
        }
      }),
      translator: (0, import_fields.relationship)({
        ref: "User.translations",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email", "role"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "draft" },
          { label: "Translated", value: "translated" },
          { label: "Published", value: "published" }
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control"
        }
      }),
      heavenletter: (0, import_fields.relationship)({
        ref: "Heavenletter.translations",
        ui: {
          displayMode: "cards",
          cardFields: ["number", "title", "status"],
          linkToItem: true,
          inlineConnect: false
        },
        many: false
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      updatedAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    },
    ui: {
      listView: {
        initialColumns: ["heavenletter", "languageCode", "status", "translatedTitle", "translator"]
      }
    }
  }),
  Post: (0, import_core.list)({
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        create: ({ session: session2 }) => !!session2?.data && ["admin", "author"].includes(session2.data.role),
        update: ({ session: session2, item }) => {
          if (!session2?.data) return false;
          if (session2.data.role === "admin") return true;
          if (session2.data.role === "author" && item?.author === session2.data.id) return true;
          return false;
        },
        delete: ({ session: session2 }) => !!session2?.data && session2.data.role === "admin",
        query: ({ session: session2 }) => !!session2?.data
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
        create: ({ session: session2 }) => !!session2?.data && ["admin", "author"].includes(session2.data.role),
        update: ({ session: session2 }) => !!session2?.data && ["admin", "author"].includes(session2.data.role),
        delete: ({ session: session2 }) => !!session2?.data && session2.data.role === "admin",
        query: ({ session: session2 }) => !!session2?.data
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

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.KEYSTONE_SECRET;
if (!sessionSecret) {
  sessionSecret = "abcdefghijklmnopqrstuvwxyz1234567890";
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password", "role"],
    itemData: {
      role: "admin"
    }
  },
  passwordResetLink: {
    sendToken: async ({ token, identity }) => {
      console.log(`Password reset for ${identity}: ${token}`);
    },
    tokensValidForMins: 60
    // 1 hour
  }
});
var sessionMaxAge = 8 * 60 * 60;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

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
  session,
  server: {
    cors: {
      origin: "http://192.168.8.105:34773",
      credentials: true
    }
  },
  graphql: {
    extendGraphqlSchema: (schema) => {
      const { parse, extendSchema } = require("graphql");
      const typeDefs = `
        extend type Query {
          heavenlettersByTitle(search: String, title: String): [Heavenletter]
          heavenletterByNumber(number: Int): Heavenletter
        }
      `;
      const extended = extendSchema(schema, parse(typeDefs));
      const queryType = extended.getType("Query");
      if (queryType && queryType.getFields) {
        const fields = queryType.getFields();
        fields.heavenlettersByTitle.resolve = async (_root, args, context) => {
          const search = args.search || args.title;
          console.log("Keystone: heavenlettersByTitle resolver called with args.search=", args.search, "args.title=", args.title, "resolved search=", search);
          if (!search) return [];
          try {
            return await context.query.Heavenletter.findMany({
              where: {
                title: {
                  contains: search
                }
              }
            });
          } catch (err) {
            console.warn("Keystone: query failed in heavenlettersByTitle resolver, error=", err);
            return [];
          }
        };
        fields.heavenletterByNumber.resolve = async (_root, args, context) => {
          const num = args.number;
          console.log("Keystone: heavenletterByNumber resolver called with number=", num);
          if (typeof num !== "number") return null;
          try {
            if (typeof context.query.Heavenletter.findOne === "function") {
              return await context.query.Heavenletter.findOne({ where: { number: num } });
            }
            const items = await context.query.Heavenletter.findMany({ where: { number: num }, take: 1 });
            return items && items.length ? items[0] : null;
          } catch (err) {
            console.warn("Keystone: query failed in heavenletterByNumber resolver, error=", err);
            return null;
          }
        };
      }
      return extended;
    }
  },
  ui: {
    isAccessAllowed: (context) => {
      const session2 = context.session;
      return !!session2?.data && session2.data.isActive === "true" && ["admin", "author", "translator"].includes(session2.data.role);
    }
  }
});
console.log("Keystone: keystoneConfig built, extendGraphqlSchema present=", !!keystoneConfig.extendGraphqlSchema);
var keystone_default = withAuth(keystoneConfig);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  keystoneConfig
});
//# sourceMappingURL=config.js.map
