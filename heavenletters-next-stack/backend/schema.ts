import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
} from '@keystone-6/core/fields';

export const lists = {
  User: list({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && session.data.role === 'admin',
        update: ({ session, item }: any) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          if (item?.id === session.data.id) return true; // self update
          return false;
        },
        delete: ({ session }) => !!session?.data && session.data.role === 'admin',
        query: ({ session }) => !!session?.data,
      },
      filter: {
        query: ({ session }) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          return { id: { equals: session.data.id } };
        },
        update: ({ session }) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
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
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({
        validation: {
          isRequired: true,
          length: { min: 8 }
        }
      }),
      bio: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      role: select({
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
      posts: relationship({ ref: 'Post.author', many: true }),
      heavenletters: relationship({ ref: 'Heavenletter.author', many: true }),
      translations: relationship({ ref: 'Translation.translator', many: true }),
      lastLogin: timestamp(),
      isActive: select({
        options: [
          { label: 'Active', value: 'true' },
          { label: 'Inactive', value: 'false' },
        ],
        defaultValue: 'true',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'role', 'bio'],
      },
    },
  }),
  Heavenletter: list({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ['admin', 'author'].includes(session.data.role),
        update: ({ session, item }: any) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          if (session.data.role === 'author' && item?.author === session.data.id) return true;
          return false;
        },
        delete: ({ session }) => !!session?.data && session.data.role === 'admin',
        query: ({ session }) => !!session?.data,
      },
    },
    fields: {
      number: integer({
        validation: { isRequired: true, min: 1 },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      title: text({ validation: { isRequired: true } }),
      body: text({
        validation: { isRequired: true },
        ui: {
          displayMode: 'textarea',
        },
      }),
      status: select({
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
      publishedAt: timestamp(),
      author: relationship({
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
      translations: relationship({
        ref: 'Translation.heavenletter',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['languageCode', 'status', 'translatedTitle'],
          hideCreate: true,
        },
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      updatedAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['number', 'title', 'status', 'author', 'translations', 'publishedAt'],
      },
    },
  }),
  Translation: list({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ['admin', 'translator'].includes(session.data.role),
        update: ({ session, item }: any) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          if (session.data.role === 'translator' && item?.translator === session.data.id) return true;
          return false;
        },
        delete: ({ session, item }: any) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          if (session.data.role === 'translator' && item?.translator === session.data.id) return true;
          return false;
        },
        query: ({ session }) => !!session?.data,
      },
    },
    fields: {
      languageCode: select({
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
      translatedTitle: text({ validation: { isRequired: true } }),
      translatedBody: text({
        validation: { isRequired: true },
        ui: {
          displayMode: 'textarea',
        },
      }),
      translator: relationship({
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
      status: select({
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
      heavenletter: relationship({
        ref: 'Heavenletter.translations',
        ui: {
          displayMode: 'cards',
          cardFields: ['number', 'title', 'status'],
          linkToItem: true,
          inlineConnect: false,
        },
        many: false,
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      updatedAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['heavenletter', 'languageCode', 'status', 'translatedTitle', 'translator'],
      },
    },
  }),
  Post: list({
    ui: {
      isHidden: true,
    },
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ['admin', 'author'].includes(session.data.role),
        update: ({ session, item }: any) => {
          if (!session?.data) return false;
          if (session.data.role === 'admin') return true;
          if (session.data.role === 'author' && item?.author === session.data.id) return true;
          return false;
        },
        delete: ({ session }) => !!session?.data && session.data.role === 'admin',
        query: ({ session }) => !!session?.data,
      },
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      status: select({
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      author: relationship({
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
      tags: relationship({
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
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      publishedAt: timestamp(),
    },
  }),
  Tag: list({
    access: {
      operation: {
        create: ({ session }) => !!session?.data && ['admin', 'author'].includes(session.data.role),
        update: ({ session }) => !!session?.data && ['admin', 'author'].includes(session.data.role),
        delete: ({ session }) => !!session?.data && session.data.role === 'admin',
        query: ({ session }) => !!session?.data,
      },
    },
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),
};