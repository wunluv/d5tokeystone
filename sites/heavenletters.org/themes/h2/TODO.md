# Heavenletters Theme Redesign Plan

## Phase 1: Design System & Foundation
- [ ] **Step 1.1: Create a Style Guide** - Formalize the `design_system.html` into a comprehensive style guide document. This will define the color palette, typography, spacing, and component library for the Heavenletters brand.
- [ ] **Step 1.2: Define Core Components** - Based on the style guide, design and build the following reusable components: reader testimonials, Heavenletter quotes, and product/subscription sections.
- [ ] **Step 1.3: Integrate TailwindCSS & Google Fonts** - Set up the necessary build process for TailwindCSS within the `h2` theme and embed the `Lora` and `Nunito Sans` Google Fonts.
- [ ] **Step 1.4: Cleanse the Theme** - Remove all outdated CSS files and image assets from the `h2` theme directory to ensure a clean slate.

## Phase 2: Front Page Redesign (Proof of Concept)
- [ ] **Step 2.1: Refactor `page-front.tpl.php`** - Overhaul the front page template with semantic HTML5 and TailwindCSS, creating a modern, responsive layout.
- [ ] **Step 2.2: Integrate Core Components** - Populate the new front page with the components defined in Step 1.2 (testimonials, quotes, product sections).
- [ ] **Step 2.3: Render Content with Views** - Connect the redesigned front page to the existing Drupal Views to pull in dynamic content, confirming the integration with the legacy backend.
- [ ] **Step 2.4: Review and Approve Front Page** - Conduct a thorough review of the new front page to approve the overall design, layout, and functionality before proceeding.

## Phase 3: Site-wide Implementation
- [ ] **Step 3.1: Refactor `page.tpl.php`** - Apply the new semantic HTML and TailwindCSS structure to the main `page.tpl.php` file to create a universal site wrapper.
- [ ] **Step 3.2: Redesign the Heavenletter Page** - Create a clean, readable, and engaging design for the full Heavenletter page (`node-heavenletters.tpl.php`).
- [ ] **Step 3.3: Create the Heavenletters Archive** - Design a clean, searchable, and user-friendly archive page for all Heavenletters.
- [ ] **Step 3.4: Design a Reusable Landing Page Template** - Create a new, flexible page template for future marketing and product landing pages.

## Phase 4: Finalization & Launch
- [ ] **Step 4.1: Implement Open-Source Icons** - Replace all remaining old icons with Feather Icons for a consistent look and feel.
- [ ] **Step 4.2: Cross-Browser & Device Testing** - Thoroughly test the redesigned theme across various browsers and devices.
- [ ] **Step 4.3: Final Review & Approval** - Conduct a final review of the entire theme to ensure it meets all strategic goals and is ready for deployment.