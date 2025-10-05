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
                create: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                update: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                delete: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data) && session.data.role === 'admin',
                query: ({ session }) => !!(session === null || session === void 0 ? void 0 : session.data),
            },
        },
        fields: {
            permalink: (0, fields_1.text)({
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),
            title: (0, fields_1.text)({ validation: { isRequired: true } }),
            body: (0, fields_1.text)({
                validation: { isRequired: true },
                ui: {
                    displayMode: 'textarea',
                },
            }),
            locale: (0, fields_1.text)({
                validation: { isRequired: true, length: { min: 2, max: 8 } },
                isIndexed: true,
            }),
            publishNumber: (0, fields_1.integer)({
                isFilterable: true,
            }),
            publishedOn: (0, fields_1.timestamp)(),
            writtenOn: (0, fields_1.timestamp)(),
            nid: (0, fields_1.integer)(),
            tnid: (0, fields_1.integer)(),
            tags: (0, fields_1.json)(),
            embeddings: (0, fields_1.json)(),
            createdAt: (0, fields_1.timestamp)({
                defaultValue: { kind: 'now' },
                ui: {
                    createView: { fieldMode: 'hidden' },
                    itemView: { fieldMode: 'read' },
                },
            }),
            updatedAt: (0, fields_1.timestamp)({
                ui: {
                    createView: { fieldMode: 'hidden' },
                    itemView: { fieldMode: 'read' },
                },
            }),
        },
        ui: {
            labelField: 'title',
            listView: {
                initialColumns: ['title', 'locale', 'publishNumber', 'publishedOn', 'permalink'],
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
