# Heavenletters.org Migration Project Roadmap

## 🎯 **Project Overview**

**Goal**: Migrate heavenletters.org from Drupal 5.x to a modern Next.js + KeystoneJS stack while preserving all content, translations, and functionality.

**Current Status**: ✅ **Phase 1 Complete** - Database analysis and GraphQL API foundation established

---

## 📋 **Project Phases & Progress**

### ✅ **Phase 1: Discovery & Foundation** (COMPLETED)
**Duration**: Initial setup and database analysis
**Status**: 🟢 Complete

#### ✅ **Phase 1.1: Environment Setup**
- [x] Project structure created (`heavenletters-next-stack/`)
- [x] Docker environment configured for database access
- [x] MariaDB connection established (192.168.8.103:3306)
- [x] Development environment validated

#### ✅ **Phase 1.2: Database Analysis**
- [x] Drupal 5.x database structure analyzed
- [x] Content storage patterns identified:
  - Content in `node_revisions.body`
  - Letter numbers in `content_type_heavenletters.field_heavenletter__value`
  - Translations via `localizernode` table
  - Authors from `users.name` joined on `node.uid`
- [x] Multilingual architecture understood (Localizer module)
- [x] Database inspection scripts created

#### ✅ **Phase 1.3: GraphQL API Foundation**
- [x] GraphQL server created with Express.js
- [x] Schema designed based on Drupal structure
- [x] Database connection layer implemented
- [x] GraphiQL interface configured for testing
- [x] Schema issues identified and resolved
- [x] Real database connectivity validated

---

### 🔄 **Phase 2: KeystoneJS Backend** (CURRENT PHASE)
**Duration**: Backend CMS setup and data modeling
**Status**: 🟡 In Progress

#### 📋 **Phase 2.1: KeystoneJS Setup**
- [ ] Install and configure KeystoneJS 6
- [ ] Set up authentication system
- [ ] Configure database connection (existing MySQL with `ks_` table prefix)
- [ ] Create admin interface

#### 📋 **Phase 2.2: Content Models**
- [ ] Design Heavenletter content model
- [ ] Create Translation relationship model
- [ ] Set up User/Author model
- [ ] Configure multilingual support
- [ ] Add content validation rules

#### 📋 **Phase 2.3: Data Integration**
- [ ] Create data sync scripts from Drupal to KeystoneJS tables
- [ ] Import existing heavenletters into KeystoneJS models
- [ ] Import user accounts and authors
- [ ] Map translation relationships between systems
- [ ] Validate data integrity and consistency
- [ ] Create content synchronization strategy (if needed)

#### 📋 **Phase 2.4: API Design**
- [ ] Design REST/GraphQL API endpoints
- [ ] Implement content retrieval APIs
- [ ] Add translation switching functionality
- [ ] Create search and filtering capabilities
- [ ] Add pagination and performance optimization

---

### 📋 **Phase 3: Next.js Frontend**
**Duration**: Modern frontend development
**Status**: ⏳ Pending

#### 📋 **Phase 3.1: Next.js Setup**
- [ ] Initialize Next.js 14 project with App Router
- [ ] Configure TypeScript and ESLint
- [ ] Set up Tailwind CSS for styling
- [ ] Configure environment variables

#### 📋 **Phase 3.2: Core Components**
- [ ] Create layout components (header, footer, navigation)
- [ ] Build heavenletter display components
- [ ] Implement language switcher
- [ ] Add search functionality
- [ ] Create responsive design system

#### 📋 **Phase 3.3: Content Pages**
- [ ] Homepage with latest heavenletters
- [ ] Individual heavenletter pages
- [ ] Archive/browse pages
- [ ] Search results pages
- [ ] About and static pages

#### 📋 **Phase 3.4: Advanced Features**
- [ ] User authentication (if needed)
- [ ] Favorites/bookmarking system
- [ ] Social sharing integration
- [ ] RSS feed generation
- [ ] SEO optimization

---

### 📋 **Phase 4: Integration & Testing**
**Duration**: System integration and quality assurance
**Status**: ⏳ Pending

#### 📋 **Phase 4.1: System Integration**
- [ ] Connect Next.js frontend to KeystoneJS backend
- [ ] Implement error handling and loading states
- [ ] Add caching strategies (Redis/memory)
- [ ] Configure CDN for static assets

#### 📋 **Phase 4.2: Testing**
- [ ] Unit tests for components and utilities
- [ ] Integration tests for API endpoints
- [ ] End-to-end testing with Playwright
- [ ] Performance testing and optimization
- [ ] Cross-browser compatibility testing

#### 📋 **Phase 4.3: Content Validation**
- [ ] Verify all heavenletters migrated correctly
- [ ] Test translation switching functionality
- [ ] Validate search and filtering
- [ ] Check SEO metadata and structure

---

### 📋 **Phase 5: Deployment & Launch**
**Duration**: Production deployment and go-live
**Status**: ⏳ Pending

#### 📋 **Phase 5.1: Infrastructure Setup**
- [ ] Set up production hosting (Vercel/Netlify for frontend)
- [ ] Configure production database
- [ ] Set up domain and SSL certificates
- [ ] Configure monitoring and logging

#### 📋 **Phase 5.2: Deployment Pipeline**
- [ ] Set up CI/CD with GitHub Actions
- [ ] Configure staging environment
- [ ] Implement automated testing in pipeline
- [ ] Set up backup and recovery procedures

#### 📋 **Phase 5.3: Go-Live**
- [ ] Final content migration and sync
- [ ] DNS cutover planning
- [ ] Launch monitoring and support
- [ ] Post-launch optimization

---

## 🏗️ **Technical Architecture**

### **Current Stack**
- **Legacy**: Drupal 5.x + PHP + MySQL
- **Database**: MariaDB (192.168.8.103:3306)
- **Content**: ~4,000+ heavenletters in multiple languages

### **Target Stack**
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: KeystoneJS 6 + GraphQL
- **Database**: Existing MySQL (192.168.8.103:3306) with `ks_` table prefix
- **Hosting**: Vercel (frontend) + Railway/DigitalOcean (backend)
- **CDN**: Vercel Edge Network or Cloudflare

### **Database Strategy**
- **Approach**: Shared database with table prefixing
- **Drupal Tables**: Existing tables (no prefix)
- **KeystoneJS Tables**: New tables with `ks_` prefix
- **Benefits**:
  - No data migration required during development
  - Gradual transition from Drupal to KeystoneJS
  - Existing production database infrastructure
  - Easy rollback capability

### **Key Features to Preserve**
- ✅ Multilingual content (10+ languages)
- ✅ Sequential heavenletter numbering
- ✅ Author attribution (Gloria Wendroff)
- ✅ Content search and browsing
- ✅ RSS feeds
- ✅ SEO-friendly URLs

---

## 📊 **Database Schema Discoveries**

### **Content Structure**
```sql
-- Main content tables
node                          -- Basic node info
node_revisions               -- Content body (main text)
content_type_heavenletters   -- CCK fields (letter numbers, etc.)
users                        -- Author information
localizernode               -- Translation relationships

-- Key relationships
node.nid -> node_revisions.nid (content)
node.vid -> content_type_heavenletters.vid (metadata)
node.uid -> users.uid (authors)
localizernode.nid -> node.nid (translations)
```

### **Translation System**
- **Localizer Module**: Manages multilingual content
- **Language Codes**: en, es, fr, de, it, pt, nl, tr, ru, hr
- **Translation Groups**: Related content linked via `tnid`

---

## 🔧 **Development Tools & Scripts**

### **Current Tools**
- `heavenletters-next-stack/graphql-api/` - GraphQL server
- `heavenletters-next-stack/inspect-database.js` - Database analysis
- `heavenletters-next-stack/test-graphql-simple.js` - API testing
- GraphiQL interface at `http://localhost:4000/graphql`

### **Useful Commands**
```bash
# Start GraphQL API
cd heavenletters-next-stack/graphql-api && npm start

# Inspect database structure
cd heavenletters-next-stack && node inspect-database.js

# Test GraphQL queries
cd heavenletters-next-stack && node test-graphql-simple.js
```

---

## 🎯 **Next Immediate Actions**

### **Phase 2.1: KeystoneJS Setup** (Next Sprint)
1. **Install KeystoneJS 6** in `heavenletters-next-stack/backend/`
2. **Configure Database** connection (PostgreSQL recommended)
3. **Set up Admin Interface** for content management
4. **Create Initial Schema** based on Drupal analysis
5. **Test Basic CRUD** operations

### **Success Criteria for Phase 2.1**
- ✅ KeystoneJS admin interface accessible
- ✅ Database connection established
- ✅ Basic Heavenletter model created
- ✅ Can create/read/update/delete test content
- ✅ GraphQL API auto-generated by KeystoneJS

---

## 📝 **Notes & Considerations**

### **Migration Challenges**
- **Data Volume**: ~4,000+ heavenletters across multiple languages
- **URL Structure**: Maintain SEO-friendly URLs from Drupal
- **Translation Relationships**: Complex many-to-many relationships
- **Content Formatting**: Preserve text formatting and special characters

### **Performance Considerations**
- **Caching Strategy**: Implement aggressive caching for static content
- **Image Optimization**: Use Next.js Image component for performance
- **Database Indexing**: Optimize queries for large content volume
- **CDN Strategy**: Serve static assets from edge locations

### **SEO Requirements**
- **URL Structure**: Maintain existing URL patterns where possible
- **Meta Tags**: Preserve and enhance SEO metadata
- **Sitemap**: Generate dynamic sitemaps for all content
- **Schema Markup**: Add structured data for better search visibility

---

**Last Updated**: 2025-01-08
**Current Phase**: Phase 2 - KeystoneJS Backend Setup
**Next Milestone**: KeystoneJS installation and basic content model creation