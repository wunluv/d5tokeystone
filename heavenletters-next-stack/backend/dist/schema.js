"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lists = void 0;
const core_1 = require("@keystone-6/core");
const fields_1 = require("@keystone-6/core/fields");
exports.lists = {
    User: (0, core_1.list)({
        access: {
            operation: {
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                update: ({ session, item }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    if ((item === null || item === void 0 ? void 0 : item.id) === session.data.id)
                        return true; // self update
                    return false;
                },
                delete: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
            filter: {
                query: ({ session }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    return { id: { equals: session.data.id } };
                },
                update: ({ session }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    return { id: { equals: session.data.id } };
                },
            },
        },
        hooks: {
            afterOperation: ({ operation, item }) => {
                if ((operation === 'create' || operation === 'update') && item) {
                    // Update lastLogin
                    item.lastLogin = new Date();
                }
            },
        },
        fields: {
            name: (0, fields_1.text)({ validation: { isRequired: true } }),
            email: (0, fields_1.text)({
                validation: { isRequired: true },
                isIndexed: 'unique',
                isFilterable: true,
            }),
            password: (0, fields_1.password)({
                validation: {
                    isRequired: true,
                    length: { min: 8 }
                }
            }),
            bio: (0, fields_1.text)({
                ui: {
                    displayMode: 'textarea',
                },
            }),
            role: (0, fields_1.select)({
                options: [
                    { label: 'Admin', value: 'admin' },
                    { label: 'Author', value: 'author' },
                    { label: 'Translator', value: 'translator' },
                ],
                defaultValue: 'author',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            posts: (0, fields_1.relationship)({ ref: 'Post.author', many: true }),
            heavenletters: (0, fields_1.relationship)({ ref: 'Heavenletter.author', many: true }),
            translations: (0, fields_1.relationship)({ ref: 'Translation.translator', many: true }),
            lastLogin: (0, fields_1.timestamp)(),
            isActive: (0, fields_1.select)({
                options: [
                    { label: 'Active', value: 'true' },
                    { label: 'Inactive', value: 'false' },
                ],
                defaultValue: 'true',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            createdAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
        },
        ui: {
            listView: {
                initialColumns: ['name', 'email', 'role', 'bio'],
            },
        },
    }),
    Heavenletter: (0, core_1.list)({
        access: {
            operation: {
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && ['admin', 'author'].includes(session.data.role),
                update: ({ session, item }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    if (session.data.role === 'author' && (item === null || item === void 0 ? void 0 : item.author) === session.data.id)
                        return true;
                    return false;
                },
                delete: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
        },
        fields: {
            number: (0, fields_1.integer)({
                validation: { isRequired: true, min: 1 },
                isIndexed: 'unique',
                isFilterable: true,
            }),
            title: (0, fields_1.text)({ validation: { isRequired: true } }),
            body: (0, fields_1.text)({
                validation: { isRequired: true },
                ui: {
                    displayMode: 'textarea',
                },
            }),
            status: (0, fields_1.select)({
                options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                    { label: 'Archived', value: 'archived' },
                ],
                defaultValue: 'draft',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            publishedAt: (0, fields_1.timestamp)(),
            author: (0, fields_1.relationship)({
                ref: 'User.heavenletters',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name', 'email', 'role'],
                    inlineEdit: { fields: ['name', 'email'] },
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: false,
            }),
            translations: (0, fields_1.relationship)({
                ref: 'Translation.heavenletter',
                many: true,
                ui: {
                    displayMode: 'cards',
                    cardFields: ['languageCode', 'status', 'translatedTitle'],
                    hideCreate: true,
                },
            }),
            createdAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
            updatedAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
        },
        ui: {
            listView: {
                initialColumns: ['number', 'title', 'status', 'author', 'translations', 'publishedAt'],
            },
        },
    }),
    Translation: (0, core_1.list)({
        access: {
            operation: {
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && ['admin', 'translator'].includes(session.data.role),
                update: ({ session, item }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    if (session.data.role === 'translator' && (item === null || item === void 0 ? void 0 : item.translator) === session.data.id)
                        return true;
                    return false;
                },
                delete: ({ session, item }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    if (session.data.role === 'translator' && (item === null || item === void 0 ? void 0 : item.translator) === session.data.id)
                        return true;
                    return false;
                },
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
        },
        fields: {
            languageCode: (0, fields_1.select)({
                options: [
                    { label: 'English', value: 'en' },
                    { label: 'German', value: 'de' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                    { label: 'Italian', value: 'it' },
                    { label: 'Portuguese', value: 'pt' },
                    { label: 'Russian', value: 'ru' },
                    { label: 'Chinese', value: 'zh' },
                    { label: 'Japanese', value: 'ja' },
                    { label: 'Arabic', value: 'ar' },
                ],
                validation: { isRequired: true },
                isFilterable: true,
            }),
            translatedTitle: (0, fields_1.text)({ validation: { isRequired: true } }),
            translatedBody: (0, fields_1.text)({
                validation: { isRequired: true },
                ui: {
                    displayMode: 'textarea',
                },
            }),
            translator: (0, fields_1.relationship)({
                ref: 'User.translations',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name', 'email', 'role'],
                    inlineEdit: { fields: ['name', 'email'] },
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: false,
            }),
            status: (0, fields_1.select)({
                options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Translated', value: 'translated' },
                    { label: 'Published', value: 'published' },
                ],
                defaultValue: 'draft',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            heavenletter: (0, fields_1.relationship)({
                ref: 'Heavenletter.translations',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['number', 'title', 'status'],
                    linkToItem: true,
                    inlineConnect: false,
                },
                many: false,
            }),
            createdAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
            updatedAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
        },
        ui: {
            listView: {
                initialColumns: ['heavenletter', 'languageCode', 'status', 'translatedTitle', 'translator'],
            },
        },
    }),
    Post: (0, core_1.list)({
        ui: {
            isHidden: true,
        },
        access: {
            operation: {
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && ['admin', 'author'].includes(session.data.role),
                update: ({ session, item }) => {
                    if (!(session === null || session === void 0 ? void 0 : session.data))
                        return false;
                    if (session.data.role === 'admin')
                        return true;
                    if (session.data.role === 'author' && (item === null || item === void 0 ? void 0 : item.author) === session.data.id)
                        return true;
                    return false;
                },
                delete: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
        },
        fields: {
            title: (0, fields_1.text)({ validation: { isRequired: true } }),
            content: (0, fields_1.text)({
                ui: {
                    displayMode: 'textarea',
                },
            }),
            status: (0, fields_1.select)({
                options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                ],
                defaultValue: 'draft',
                ui: {
                    displayMode: 'segmented-control',
                },
            }),
            author: (0, fields_1.relationship)({
                ref: 'User.posts',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name', 'email'],
                    inlineEdit: { fields: ['name', 'email'] },
                    linkToItem: true,
                    inlineConnect: true,
                },
                many: false,
            }),
            tags: (0, fields_1.relationship)({
                ref: 'Tag.posts',
                many: true,
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineEdit: { fields: ['name'] },
                    linkToItem: true,
                    inlineConnect: true,
                    inlineCreate: { fields: ['name'] },
                },
            }),
            createdAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
            }),
            publishedAt: (0, fields_1.timestamp)(),
        },
    }),
    Tag: (0, core_1.list)({
        access: {
            operation: {
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && ['admin', 'author'].includes(session.data.role),
                update: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && ['admin', 'author'].includes(session.data.role),
                delete: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
        },
        ui: {
            isHidden: true,
        },
        fields: {
            name: (0, fields_1.text)(),
            posts: (0, fields_1.relationship)({ ref: 'Post.tags', many: true }),
            createdAt: (0, fields_1.timestamp)({ defaultValue: { kind: 'now' } }),
        },
    }),
};
