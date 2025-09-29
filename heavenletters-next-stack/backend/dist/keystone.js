"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@keystone-6/core");
const schema_1 = require("./schema");
const auth_1 = require("./auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Keystone: dotenv loaded, DATABASE_URL=', process.env.DATABASE_URL);
console.log('Keystone: KEYSTONE_PORT=', process.env.KEYSTONE_PORT);
exports.default = (0, auth_1.withAuth)((0, core_1.config)({
    db: {
        provider: 'mysql',
        url: process.env.DATABASE_URL,
    },
    lists: schema_1.lists,
    session: auth_1.session,
    server: {
        cors: {
            origin: false,
        },
    },
    ui: {
        isAccessAllowed: (context) => {
            const session = context.session;
            return !!(session === null || session === void 0 ? void 0 : session.data) && session.data.isActive === 'true' && ['admin', 'author', 'translator'].includes(session.data.role);
        },
    },
}));
