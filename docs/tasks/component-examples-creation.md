# Component Example Pages Creation Plan

## Executive Summary
Create missing example pages for 130+ React UI components that have documentation but lack visual examples. This will provide users with interactive demos and improve the component library's usability.

## Project Overview
- **Total Components**: 147 components across 8 categories  
- **Components with Documentation**: 126 (86%)
- **Components with Example Pages**: 17 (12%)
- **Missing Example Pages**: ~130 components need creation
- **Estimated Timeline**: 3-4 weeks (phased approach)

## Current State Analysis

### Existing Example Pages (17 total)
**Forms** (11): checkboxes, chips-input, date-input-picker, input-amount, input-number, input-text, input-textarea, radio-button, search-objects-from-db, time-picker, toggle-button, ihub-file-uploader

**UI** (5): actions, badges, cards, color-picker, dialogs, dropdowns, modals, table-examples, table-server-examples

**Navbar** (4): breadcrumb, responsive-navbar, sidenav, tabs

**Auth** (2): login, password-match

**Other** (2): charts, cursors

### Pattern Analysis
- Each page follows pattern: `/page.tsx` imports `ExampleComponent.tsx`
- Example components are in `/src/__examples__/src/components/[category]/`
- Pages use base URL: `https://ui.instincthub.com/components/[category]/[component]`

## Phase 1: High Priority Components (40 components, Week 1-2)

### Forms Category (20 components) - 13 of 20 completed (65%)
- [x] action-dropdown → ActionDropdownExample ✅ COMPLETED
- [ ] action-callback-dropdown → ActionCallbackDropdownExample  
- [x] animated-box → AnimatedBoxExample ✅ COMPLETED
- [x] date-input → DateInputExample ✅ COMPLETED
- [ ] date-time-input → DateTimeInputExample
- [x] date-time-picker → DateTimePickerExample ✅ COMPLETED (existing)
- [x] drop-file → DropFileExample ✅ COMPLETED
- [x] file-uploader → FileUploaderExample ✅ COMPLETED
- [x] email-list → EmailListExample ✅ COMPLETED
- [x] multiple-email → MultipleEmailExample ✅ COMPLETED
- [x] filter-array → FilterArrayExample ✅ COMPLETED
- [ ] filter-by → FilterByExample
- [x] filter-objects → FilterObjectsExample ✅ COMPLETED
- [x] form-error → FormErrorExample ✅ COMPLETED
- [ ] handle-error → HandleErrorExample
- [x] message-display → MessageDisplayExample ✅ COMPLETED
- [x] password-field → PasswordFieldExample ✅ COMPLETED
- [x] phone-number-input → PhoneNumberInputExample ✅ COMPLETED
- [x] search-field → SearchFieldExample ✅ COMPLETED
- [ ] search-field-db → SearchFieldDBExample

### UI Category (15 components) - 7 of 15 completed (47%)
- [x] text-editor → CustomTextEditorExample ✅ COMPLETED
- [x] content-viewer → ContentViewerExample ✅ COMPLETED
- [x] content-view-edit → ContentViewOrEditExample ✅ COMPLETED
- [x] or-divider → OrDividerExample ✅ COMPLETED
- [x] pagination → PaginationExample ✅ COMPLETED
- [x] create-button → CreateButtonExample ✅ COMPLETED
- [ ] chart-configurator → ChartConfiguratorExample
- [ ] instincthub-chart → InstinctHubChartExample
- [ ] chart-dashboard → InstinctHubChartDashboardExample
- [x] card-list → CardListExample ✅ COMPLETED
- [x] card-grid → CardGridExample ✅ COMPLETED
- [ ] horizontal-card → HorizontalCardExample
- [ ] feature-card → FeatureCardExample
- [ ] media-card → MediaCardExample
- [ ] pricing-card → PricingCardExample

### Auth Category (5 components) - 3 of 5 completed (60%)
- [x] username-email-checker → IsUsernameEmailTakenExample ✅ COMPLETED
- [x] client-detector → ClientDetectorExample ✅ COMPLETED
- [ ] passwords-match → PasswordsMatchExample (move from auth)
- [x] signup-form → SignUpFormExample ✅ COMPLETED
- [ ] client-providers → ReactClientProvidersExample

## Phase 2: Medium Priority Components (50 components, Week 2-3)

### Forms Category (25 components)
- [ ] input-search-dropdown → InputSearchDropdownExample
- [ ] country-input → CountryInputExample
- [ ] country-state-input → CountryStateInputExample
- [ ] radio-field → RadioFieldExample
- [ ] radio-simple → RadioSimpleExample
- [ ] radio-group → RadioGroupExample
- [ ] range-radio → RangeRadioExample
- [ ] step-progress-bar → StepProgressBarExample
- [ ] submit-button → SubmitButtonExample
- [ ] tables → TablesExample
- [ ] text-area → TextAreaExample
- [ ] text-field → TextFieldExample
- [ ] download-excel → DownloadAsExcelExample
- [ ] table-sort-btn → THeadSortBtnExample
- [ ] table-sort-list → THeadSortListExample
- [ ] table-no-data → TBodyNoDataExample
- [ ] checkboxes-field → CheckBoxesFieldExample
- [ ] react-time-ago → ReactTimeAgoExample
- [ ] terms-conditions → ReadTermsAndConditionExample
- [ ] logout → LogoutExample
- [ ] page-loading → PageLoadingExample
- [ ] tooltip → TooltipExample
- [ ] unsplash-image → UnsplashRandomImageExample
- [ ] input-amount → InputAmountExample (exists but needs verification)
- [ ] time-picker → TimePickerExample (exists but needs verification)

### UI Category (15 components)
- [ ] profile-card → ProfileCardExample
- [x] random-gradient → RandomGradientImageExample ✅ COMPLETED
- [ ] pagination-demo → PaginationDemoExample
- [ ] create-button-example → CreateButtonExampleExample
- [ ] menu-bar → MenuBarExample
- [ ] code-display → CodeDisplayExample
- [ ] badge → BadgeExample (verify existing)
- [ ] action → ActionExample (verify existing)
- [ ] dropdown → DropdownExample (verify existing)
- [ ] color-picker → ColorPickerExample (verify existing)
- [ ] dialog → DialogExample (verify existing)
- [ ] modal-examples → ModalExamplesExample
- [ ] multi-modal → MultiPurposeModalExample
- [ ] table-examples → IHubTableExample (verify existing)
- [ ] table-server-examples → IHubTableServerExample (verify existing)

### Status Category (10 components)
- [ ] time-tracker → TimeTrackerExample
- [ ] session-handler → SessionHandleProviderExample
- [ ] error-500 → Error500Example
- [ ] error-state → ErrorStateExample
- [ ] react-time-tracker → ReactTimeTrackerExample
- [ ] delete-confirmation → DeleteConfirmationModalExample
- [ ] copy-clipboard → CopyToClipboardExample
- [ ] not-found → NotFoundExample
- [ ] unauthorized → UnauthorizedExample
- [ ] modal-examples → ModalExamplesExample

## Phase 3: Lower Priority Components (40 components, Week 3-4)

### Navbar Category (6 components)
- [ ] channel-avatar → ChannelListAvatarExample
- [ ] menu-dropdown → MenuDropdownExample
- [ ] sidenav-context → SideNavbarContextExample
- [ ] breadcrumb → BreadcrumbExample (verify existing)
- [ ] responsive-navbar → ResponsiveNavbarExample (verify existing)
- [ ] sidenav → SideNavbarExample (verify existing)

### Theme Category (6 components)
- [ ] style-variables → ChangeStyleVariableExample
- [ ] dark-mode → DarkModeProviderExample
- [ ] loading-animate → LoadingAnimateExample
- [ ] session-providers → SessionProvidersExample
- [ ] session-expires → SessionExpiresLogoutExample
- [ ] signout-session → SignOutSessionExample

### Tabs Category (4 components)
- [ ] tabs → TabsExample (move from navbars)
- [ ] vertical-tabs → VerticalTabsExample
- [ ] tab-content → TabContentExample
- [ ] tabs-demo → TabsDemoExample

### Cursors Category (5 components)
- [ ] magnetic-button → MagneticButtonExample
- [ ] cursor-context → CursorContextExample
- [ ] cursor-interaction → useCursorInteractionExample
- [ ] cursor-demo → CursorControlDemoExample
- [ ] cursor → CursorExample (verify existing)

### Auth Category (Remaining 8 components)
- [ ] from-instincthub → FromInstinctHubExample
- [ ] client-only → ClientOnlyExample
- [ ] use-client-side → useClientSideExample
- [ ] use-formatted-date → useFormattedDateExample
- [ ] use-stable-random → useStableRandomExample
- [ ] use-external-data → useExternalDataExample
- [ ] login-form → LoginFormExample (verify existing)
- [ ] react-client-providers → ReactClientProvidersExample

### Library Category (1 component)
- [ ] paystack → PaystackExample

## Technical Implementation Details

### File Structure for Each Component
```
/src/__examples__/src/app/components/[category]/[component-name]/
├── page.tsx (route handler)
└── /src/__examples__/src/components/[category]/
    └── [ComponentName]Example.tsx (example component)
```

### Example Component Template
```tsx
"use client";
import React, { useState } from "react";
import { ComponentName } from "../../../../index";

const ComponentNameExample: React.FC = () => {
  // Component state and handlers
  return (
    <div className="ihub-container ihub-my-5">
      <h2>Component Name Examples</h2>
      {/* Multiple usage examples */}
    </div>
  );
};

export default ComponentNameExample;
```

### Page Template
```tsx
import ComponentNameExample from "../../../../components/[category]/ComponentNameExample";

export default async function ComponentNamePage() {
  return <ComponentNameExample />;
}
```

## ComponentLists.tsx Integration

### Add visual_demo_url field to ComponentInfo interface
```tsx
interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  example_path: string;
  visual_demo_url?: string; // NEW FIELD
}
```

### Update component objects with demo URLs
```tsx
{
  name: "InputText",
  // ... existing fields
  visual_demo_url: "https://ui.instincthub.com/components/forms/input-text"
}
```

### Add visual demo link in component card
```tsx
{component.visual_demo_url && (
  <div className="ihub-link-group ihub-flex ihub-mt-2">
    <a
      href={component.visual_demo_url}
      target="_blank"
      rel="noopener noreferrer"
      className="ihub-component-link ihub-demo-link"
    >
      Live Demo
    </a>
  </div>
)}
```

## Quality Assurance

### Review Checkpoints
- [ ] Phase 1 Review: Test 40 high-priority component examples
- [ ] Phase 2 Review: Verify medium-priority components 
- [ ] Phase 3 Review: Complete lower-priority components
- [ ] Final Review: Full integration test of ComponentLists.tsx

### Success Criteria
- [ ] All 130+ components have working example pages
- [ ] ComponentLists.tsx shows visual demo links for all applicable components
- [ ] Examples follow consistent patterns and styling
- [ ] All routes work correctly
- [ ] Documentation is updated

## Resource Requirements
- **Time**: 3-4 weeks (1 developer)
- **Files to Create**: ~260 files (130 pages + 130 examples)
- **Dependencies**: Use existing component documentation and import patterns

## Risk Mitigation
- **Missing Components**: Verify all component imports work
- **Routing Issues**: Test each route individually  
- **Styling Inconsistencies**: Follow existing example patterns
- **Performance**: Implement lazy loading if needed

## Documentation Updates
- [ ] Update DOCUMENTATION_PROGRESS_CHECKLIST.md
- [x] Create `docs/tasks/component-examples-creation.md` (this document)
- [x] Update ComponentLists.tsx with visual_demo_url support ✅ COMPLETED
- [ ] Update README with example page links

## Progress Summary (Updated: 2025-01-22)
**Phase 1 High Priority:** 23 of 40 components completed (58%)
- **Forms:** 13 of 20 completed (65%) 
- **UI:** 7 of 15 completed (47%)
- **Auth:** 3 of 5 completed (60%)

**Phase 2 Medium Priority:** 1 of 50 components completed (2%)
- **UI:** 1 of 15 completed (RandomGradientImage moved from phase 2)

**Total Project:** 24 of 130+ components completed (~18%)

**Remaining Phase 1 High Priority Components:**
1. **Forms (7 remaining):** action-callback-dropdown, date-time-input, filter-by, handle-error, search-field-db
2. **UI (8 remaining):** chart-configurator, instincthub-chart, chart-dashboard, horizontal-card, feature-card, media-card, pricing-card
3. **Auth (2 remaining):** passwords-match, client-providers

## Restart Instructions
If session ends unexpectedly:
1. Check `docs/tasks/component-examples-creation.md` for current progress
2. Reference existing example patterns in `/src/__examples__/src/components/forms/InputTextExample.tsx`
3. Use ComponentLists.tsx at line 18-947 for component list reference
4. Follow page structure from `/src/__examples__/src/app/components/forms/input-text/page.tsx`
5. Continue from last unchecked phase items

**Created**: 2025-01-22  
**Version**: 1.0  
**Estimated Completion**: 4 weeks from start date