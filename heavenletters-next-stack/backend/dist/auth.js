"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = exports.withAuth = void 0;
const auth_1 = require("@keystone-6/auth");
const session_1 = require("@keystone-6/core/session");
let sessionSecret = process.env.KEYSTONE_SECRET;
if (!sessionSecret) {
    sessionSecret = 'abcdefghijklmnopqrstuvwxyz1234567890';
}
const { withAuth } = (0, auth_1.createAuth)({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password', 'role'],
        itemData: {
            role: 'admin',
        },
    },
    passwordResetLink: {
        sendToken: async ({ token, identity }) => {
            // TODO: Implement email sending for password reset
            console.log(`Password reset for ${identity}: ${token}`);
            // In production, send email with this token
        },
        tokensValidForMins: 60, // 1 hour
    },
});
exports.withAuth = withAuth;
const sessionMaxAge = 8 * 60 * 60; // 8 hours for better security
const session = (0, session_1.statelessSessions)({
    maxAge: sessionMaxAge,
    secret: sessionSecret,
});
exports.session = session;
