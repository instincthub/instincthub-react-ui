# Bug Handoff — instincthub-react-ui

## InputText — floating label rendered on top of the placeholder (2026-09-08, 0.1.60)

**Status:** FIXED. CSS only, no API change, no component touched.

File: `src/assets/css/forms/input-fields.css`

**Symptom.** Any `InputText` given both a `label` and a `placeholder` drew the
label *inside* the input, overlapping the placeholder text, until the user
typed. On the Leadboard Dynamic Fields modal that read as
`Field name * stry` — the label sitting across `e.g. Industry` — and
`Placeholder (optional) ıe empty input`. Present in every app consuming the
package, on every placeholder'd input, in both themes.

**Why.** Two rules share the work and only one listed the class.

- The label rule (~line 48) selects `:focus`, `.ihub-has-placeholder` and
  `.ihub-value`, and gives all three the floated *appearance* — 14px, cyan,
  `background: var(--White)` to punch through the border.
- The rule that actually lifts the label (~line 1829, "Improve animation for
  floating label") applies `transform: translateY(-22px) scale(0.85)` — and
  listed only `:focus`, `.ihub-value` and the chips label. **`.ihub-has-placeholder`
  was missing.**

So a placeholder'd empty input got a label styled as though it had floated,
which never moved: `top: 15px` inside a 50px input, directly over the
placeholder. Measured on production before the fix — label offset **+15px**
from the input's top edge, against **−7px** for the `.ihub-value` case that
renders correctly.

**Fix.** Add `.ihub-wrapper.ihub-has-placeholder .ihub-text-label` to the
transform rule, so the two selector lists agree. A placeholder'd input now
renders identically to a filled one (−7px, label on the border).

**Not affected, checked:**

- `InputTextarea` — guards in JS instead, passing `placeholder` only when
  focused or non-empty, so the label and placeholder are never both visible.
- `time-picker.css` — moves its label with `top: -10px` rather than a
  transform, and already lists `.ihub-has-placeholder` in that rule.

**Found by** reading the Leadboard Dynamic Fields page while scripting demo
video LBD-13b; the modal's first frame is on camera in that video.

---

## DateRangePicker — day grid had no arrow-key navigation (2026-09-06, 0.1.59)

**Status:** FIXED and VERIFIED live. Clears the a11y follow-up recorded in the
2026-09-02 DateRangePicker audit below.

File: `src/components/forms/DateRangePicker.tsx`
CSS:  unchanged — `.ihub-datetime-day:focus` already had a visible outline.

**No public API change.** No new props.

Folded into 0.1.59, which was still unpublished (npm was on 0.1.58). Bump it to
0.1.60/0.2.0 before publishing if you would rather ship the Dropdown fixes and
this separately — see the Tab note below, which is a deliberate behaviour change.

---

### MEDIUM (a11y) — arrow keys did nothing in the day grid  [FIXED]

Day cells were real `<button>`s, so they were Tab-reachable, but nothing bound
Up/Down/Left/Right — `onKeyDown` existed only on the wrapper (Escape) and the
two inputs (open-on-ArrowDown). A keyboard user had to Tab through **every**
day cell one at a time to reach a date, and Tab then walked all ~30 of them
before reaching anything after the grid. That fails the WAI-ARIA date-grid
pattern, where the grid is a single composite widget.

Fix — roving tabindex plus arrow navigation:

- `rovingDate` picks the one cell carrying `tabIndex={0}`; every other cell is
  `-1`, so the grid is a single tab stop. It resolves to the first *selectable*
  candidate among focusedDate / pendingStart / startDate / endDate / today,
  falling back to the first selectable day of the month. It has to be
  selectable: a `disabled` button cannot take focus, so anchoring on one would
  make Tab skip the entire grid — and a caller is free to pass a `value` that
  lands on a `disabledDates` entry.
- Keys: Left/Right +/-1 day, Up/Down +/-7, Home/End week edges, PageUp/PageDown
  +/-1 month, Shift+PageUp/PageDown +/-1 year. Crossing a month boundary
  switches `currentMonth` and focuses the cell in the new month.
- `moveFocusTo` steps **over** `disabledDates` in the direction of travel so a
  run of them cannot trap the cursor, bounded by `MAX_DISABLED_SKIP` (400) so
  an exhaustively disabled calendar cannot spin. A move that would leave
  `minDate`/`maxDate` is refused outright — at a bound the cursor stays put.
- Only handled keys `preventDefault`/`stopPropagation`; Escape and Tab fall
  through to `default` so Escape still closes on the wrapper and Tab still
  leaves the grid.
- Focus is moved in a `useLayoutEffect` gated by `shouldFocusDayRef`, so DOM
  focus is only stolen for an actual key press, never on an incidental
  re-render (which would yank focus off the inputs or the presets). Day
  elements are tracked in a `dayRefs` Map keyed by `yyyy-MM-dd`, deleted on
  unmount, so a cell can be focused after a month switch.
- `cancelSelection` clears `focusedDate` so the next open starts fresh.

**Deliberate behaviour change:** Tab no longer visits all ~30 day cells; it
visits one and the arrows move within the grid. That is the point of a roving
tabindex, but it is a change consumers may notice.

### Verification performed
1. **Typecheck** — `npx tsc --noEmit -p tsconfig.build.json`: 96 total (the
   unchanged baseline), 0 in `DateRangePicker.tsx`.
2. **Live browser** — `src/__examples__` at `/components/forms/date-range-picker`:
   - Roving tabindex: exactly 1 of 30 cells has `tabIndex 0`, 29 have `-1`.
   - Arrows: Right/Left +/-1, Down/Up +/-7, Home -> Sunday, End -> Saturday.
   - Cross-month: 24 x Right from Sep 6 landed on Oct 6 with the header
     switching to October and the roving cell following into the new month.
   - PageDown/PageUp -> Nov/Oct; Shift+PageDown/PageUp -> 2027/2026.
   - Bounds (`minDate`=today, `maxDate`=today+90d): Left at minDate stays put,
     Up (-7) past minDate stays put, PageUp into August stays put. Walking
     forward reached exactly Dec 5 (maxDate); a further Right, Down and End all
     stayed put, and Left moved back inside to Dec 4.
   - Disabled skip: with Sep 7/8/9 disabled, Right from Sep 6 landed on Sep 10.
   - Full range selected by keyboard alone: staged Oct 1, arrowed to Oct 4,
     committed `2026-10-01` -> `2026-10-04`.
   - Escape still bubbles to the wrapper: picker closed, focus returned to the
     input.
   - Range preview follows the keyboard: with Oct 4 staged, focus on Oct 9 gave
     range-start/in-range x4/range-end, extending correctly to Oct 12.
   - No React console errors (the 404s are the example app's missing static
     assets, pre-existing).

**Harness note for the next session:** the Browser pane runs hidden, so the
document has no system focus — `el.focus()` updates `document.activeElement`
but fires **no** focus event, and `window.scrollBy` fires no scroll event.
Programmatic `new MouseEvent('mouseenter')` also does nothing, because React
synthesises `onMouseEnter` from `mouseover`, not native `mouseenter`. Drive
React's `onFocus` with `new FocusEvent('focusin', {bubbles:true})` instead.
This cost real time twice; do not mistake it for a component bug.

---

## Dropdown — scrolling the option list closed the menu (2026-09-06, 0.1.59)

**Status:** FIXED and VERIFIED live. Same class of bug as the Action fix below,
in a different component: both portalled their menu and then closed it on any
captured scroll.

File: `src/components/ui/Dropdown.tsx`
CSS:  `src/assets/css/ui/dropdown-styles.css`

**No public API change.** Every prop behaves as documented.

---

### HIGH — a long option list could not be scrolled  [FIXED]

The open-state effect registered:

    const handleViewportChange = () => setIsOpen(false);
    window.addEventListener("scroll", handleViewportChange, true);

Capture phase, so it also received scroll events raised by the menu's own
`.ihub-dropdown-options` container. Scrolling a long list closed the dropdown
before a choice could be made; scrolling any surrounding modal closed it too,
which reads as jarring rather than helpful. Confirmed by dispatching
`new Event('scroll')` on `.ihub-dropdown-options` — `isOpen` went false.

Fix:

- `handleScroll` returns early when the event target is inside `menuRef`, and
  otherwise calls `positionMenu()` to re-anchor to the trigger instead of
  closing. Resize does the same. It closes only when the trigger has actually
  left the viewport — checked on both axes, since a table scrolls sideways.
- `positionMenu()` now returns a boolean and caps the menu to the space the
  chosen side actually has, setting `maxHeight` inline instead of passing the
  raw `maxHeight` prop through. It flips above the trigger only when below
  cannot show a usable amount and above is genuinely roomier.
- `toggleDropdown` opens only when `positionMenu()` succeeds, so an off-screen
  trigger cannot drop the menu at 0,0 in the top-left corner.
- Escape now closes from a `document` keydown listener. The menu is portalled,
  so it can hold focus outside the trigger's subtree where the wrapper's own
  `onKeyDown` never fires. `touchstart` joins `mousedown` for outside-close.
- A `useLayoutEffect` re-anchors on selection change: in multi mode each pick
  adds a tag to the trigger, which can grow it onto another line and leave the
  menu overlapping the trigger it belongs to.
- Both handlers now guard `event.target instanceof Node` before
  `contains()`. A scroll event dispatched at `window` has a non-Node target,
  and `Node.contains()` throws on it — which stranded the menu open and
  unresponsive. Caught by the live console during verification.

CSS:

- `.ihub-dropdown-menu-portal` is a flex column, and its `.ihub-dropdown-options`
  drops the flat `max-height: 250px` for `flex: 1 1 auto; min-height: 0`. The
  container's `overflow: hidden` plus a 250px menu cap and a separate 250px
  list cap meant the search box pushed ~69px of options past the bottom edge
  with no way to reach them. The list now takes whatever the menu has left.
- `overscroll-behavior: contain` on `.ihub-dropdown-options`, so reaching the
  end of the list does not chain the scroll to the page.

### Verification performed
1. **Typecheck** — `npx tsc --noEmit -p tsconfig.build.json`: 96 total (the
   unchanged baseline), 0 in `Dropdown.tsx`.
2. **Live browser** — `src/__examples__` at `/components/ui/dropdowns`:
   - The confirmed repro (`new Event('scroll')` on `.ihub-dropdown-options`)
     leaves the menu open; the list scrolls to its end (413px of content in
     an 89-181px viewport) and stays open.
   - An outside scroll keeps it open and re-anchored: menu top tracked the
     trigger exactly (422.7 == trigger bottom + 5) across several positions.
   - Scrolling the trigger out of the viewport closes it.
   - Multi-select: three picks kept the menu open, tags accumulated,
     `aria-selected` tracked, re-clicking toggled off, search filtered, and the
     menu re-anchored as the tags grew the trigger (428.2 -> 432.2).
   - Single-select: opens anchored, its own list scroll does not close it,
     picking closes and commits ("Selected: Germany").
   - Escape closes; outside mousedown closes; a window-targeted scroll event
     repositions (430.2 -> 426.7) with no uncaught error.

---

### MEDIUM — search filtered against a stale `key_name`, and crashed on a
### non-string one  [FIXED, same 0.1.59]

Folded into 0.1.59 before it was published (npm was still on 0.1.58), so this
did not need its own version.

`filteredOptions`'s `useMemo` listed only `[options, searchTerm]`. Changing
`key_name` while a search term was active therefore reused the previous
filtered array: the list could sit on "No options available" for a term that
matches perfectly well under the new field. Confirmed live — with options
`{name, code}`, `key_name="name"` and the term `z3`, swapping to
`key_name="code"` left the menu empty instead of matching `Z3`.

Found while fixing that, in the same predicate: the field was read as
`(option[key_name] || "").toLowerCase()`. `DropdownOptionType` is indexed
`[key: string]: any`, so `key_name` can name a **number** — and the
component's own JSDoc example is `key_name="id"`, where ids are usually
numeric — or a React node like `icon`. `toLowerCase()` is not a function on
those, so typing into the search box threw
`TypeError: (option[key_name] || "").toLowerCase is not a function` and tore
the entire menu down mid-keystroke. Reproduced live before fixing.

Fix: `key_name` added to the dependency list; the field is resolved once, then
numbers are stringified so they stay searchable (`"10"` matches id `101`) and
anything that is neither string nor number is skipped rather than called into.
Options with a missing field are still excluded, as before. The lowercased
term is hoisted out of the per-option callback.

**Verified live:** numeric `key_name` — searching `10` -> `101`, `303` ->
`303`, `999` -> no options, no console errors, menu stays mounted. Stale memo
— `z3` under `key_name="name"` shows no options, swapping to `"code"` matches
`Z3`, swapping back shows no options again. Regression on the normal label
path: `uni` and `UNITED` both match United States/United Kingdom, a no-match
term shows no-options, clearing restores all 11, picking after filtering still
works in multi mode, and the option-list scroll still does not close the menu.

---

## Action (dropdown) — scrolling the menu closed it (2026-09-04, 0.1.58)

**Status:** FIXED. Follow-up to the 0.1.57 portal fix below — same component,
bug introduced by that change.

File: `src/components/ui/Action.tsx`
CSS:  `src/assets/css/ui/action.css`

**No public API change.**

---

### HIGH — a menu long enough to need scrolling could not be scrolled  [FIXED]

0.1.57 moved the menu to `position: fixed` and closed it on any scroll, on the
reasoning that fixed coordinates go stale. They do — but the handler was bound
in the capture phase on `window`, so it also fired for scrolls originating
INSIDE the menu. The CSS caps the menu at 300px, so any list past ~7 items
needs to scroll, and it closed on the first wheel tick.

Fix, three parts:

- `handleScroll` ignores events whose target is inside the menu, and calls
  `positionMenu()` to keep the menu pinned to its trigger rather than closing.
  It closes only when the trigger has actually left the viewport — checked on
  both axes, since a table scrolls sideways too.
- `positionMenu()` now caps the menu to the space the chosen side actually has
  (bounded by `MAX_MENU_HEIGHT`) and sets it inline, instead of relying on a
  flat 300px that could still overflow the viewport near the bottom of a page.
  The flip-up branch only triggers when the other side is genuinely roomier.
- CSS: `overflow: hidden` (which clipped a long list with no way to reach the
  rest) became `overflow-x: hidden; overflow-y: auto` plus
  `overscroll-behavior: contain`, so the scroll does not chain to the page and
  drag the trigger out from under the menu.

Also: `toggleDropdown` now opens only when `positionMenu()` succeeds. An
off-screen trigger previously opened the menu at 0,0 in the top-left corner.

### Verification performed
1. **Typecheck** — `npx tsc --noEmit -p tsconfig.build.json`: 96 total (the
   unchanged baseline), 0 in `Action.tsx`.
2. **Live browser** — verified on the equivalent component in
   `leadboard_nextjs_v2` (`RowActionsDropdown`, same logic): a scroll dispatched
   from inside the menu leaves it open; a page scroll keeps it open and moves
   it with the trigger (top 68.2 -> 8.2); scrolling the trigger out of view
   closes it; and with the menu constrained below its content height the last
   item is reachable by scrolling inside it.

---

## Action (dropdown) — menu clipped inside scrolling ancestors (2026-09-04)

**Status:** FIXED and VERIFIED in a consuming app.

File: `src/components/ui/Action.tsx`
CSS:  `src/assets/css/ui/action.css`
Types: unchanged.

**No public API change.** Every prop (`dropdown`, `dropdownItems`,
`dropdownPosition`, …) behaves as documented. Existing call sites need no edits.

---

### HIGH — the dropdown menu was clipped by any scrolling ancestor  [FIXED]

`.ihub-action-dropdown-menu` was `position: absolute; top: calc(100% + 8px)`
inside `.ihub-action-dropdown-container`, so it was laid out inside whatever the
trigger sits in. The dominant host for this component is a table row rendered by
`IHubTableServer`, which wraps its rows in `.ihub-scroll-container`
(`overflow: auto`). That container is only as tall as its rows.

The result is a bug that hides during development and appears in production:

    8-row table   container ~500px tall   104px menu fits    looks fine
    1-row table   container ~134px tall   17px of 104 shown  unusable

Measured in a consuming app on a one-row table: menu `top: 784.0 / bottom:
888.4`, clipping container bottom `801.0` — 17px of a 104px menu visible. And
filtering a table down to a single result is precisely when a user reaches for
that row's actions, so the broken case was the common one.

Fix: the menu is rendered through `createPortal` into `document.body` and
positioned `fixed` from the trigger's `getBoundingClientRect()`. No ancestor can
clip it. Specifically:

- `positionMenu()` computes coordinates on open, resolving `dropdownPosition`
  (`left` / `right` / `center`) in JS instead of via CSS offsets, flipping above
  the trigger when there is not enough room below, and clamping to the viewport
  horizontally so a menu on a far-right column cannot run off screen.
- The outside-click handler now checks BOTH `dropdownRef` and a new `menuRef`.
  The menu has left the trigger's subtree, so testing only the container would
  have closed the menu on its own items — i.e. the portal alone would have
  broken every dropdown item.
- Fixed coordinates go stale the moment anything scrolls, so any `scroll`
  (capture phase — the table's own scroll container never bubbles to `window`)
  or `resize` closes the menu. Capture is required, not stylistic.
- The trigger now carries `aria-haspopup="menu"` and `aria-expanded`, which also
  replaces the chevron-flip rule: it keyed off
  `.ihub-action-dropdown-container:has(.ihub-action-dropdown-menu)`, and the
  menu is no longer a descendant of the container.
- `.ihub-action-dropdown-{left,right,center}` are reduced to
  `right: auto; transform: none` — they were trigger-relative offsets that would
  now fight the inline coordinates. Kept as classes so existing markup keeps a
  stable hook.

### Verification performed
1. **Typecheck** — `npx tsc --noEmit -p tsconfig.build.json`: 0 `Action.tsx`
   errors. Total repo errors 96 BEFORE and 96 AFTER, confirmed by stashing the
   change and recounting (all pre-existing, in `ui/editor/MenuBar.tsx` and
   `ui/viewer/DangerousRenderer.tsx`).
2. **Live browser** — reproduced and fixed in `leadboard_nextjs_v2` on the
   Communications Hub log table. With the table filtered to one row, the menu
   now reports `parentElement === BODY`, zero clipping ancestors, and both its
   top and bottom corners hit-test inside the menu (`elementFromPoint`).
   Verified in light and dark mode.

### Notes for whoever picks this up
- The same class of bug applies to **every** `Action dropdown` in a table — in
  Leadboard that includes `InvoiceListClient`. Those pages need no code change;
  they just need this version installed.
- `leadboard_nextjs_v2` shipped a local `src/components/ui/RowActionsDropdown.tsx`
  with the same portal approach, because it consumes the published package and
  could not wait for a release. Once this version is installed there, that
  component can be retired and those pages can go back to `Action`.
- This package still has **no test runner** (`npm test` is a stub) — see the
  DateRangePicker follow-ups below. A portal + fixed-position menu is exactly the
  kind of thing that regresses silently under a CSS refactor.

---

## DateRangePicker — bug audit + fixes (2026-09-02)

**Status:** FIXED and VERIFIED. All 6 confirmed bugs + 4 minor issues resolved.

File:  `src/components/forms/DateRangePicker.tsx` (559 -> 705 lines)
CSS:   `src/assets/css/forms/date-range-picker.css` (unchanged — class names already matched)
Types: `src/types/index.ts:951` (`DateRangePickerPropsType`) (unchanged — no API change)

**No public API change.** Every prop behaves as documented; several now actually
work. Existing call sites need no edits.

---

### 1. CRITICAL — timezone off-by-one in `parseDate`  [FIXED]
`new Date("2024-01-15")` parses as UTC midnight; `startOfDay()` then converted to
local, landing on the previous day in every UTC-negative zone (all of the
Americas). Because `emitChange` formats in LOCAL time, each controlled
round-trip walked the range one more day backwards.

Measured before/after, 5 round-trips of "2024-01-15":
    America/New_York     old -> 2024-01-10   fixed -> 2024-01-15
    America/Los_Angeles  old -> 2024-01-10   fixed -> 2024-01-15
    Africa/Lagos         old -> 2024-01-15   fixed -> 2024-01-15
    Asia/Tokyo           old -> 2024-01-15   fixed -> 2024-01-15

Fix: `parseDate` is now module-level and parses `yyyy-MM-dd` explicitly via
`new Date(y, m-1, d)` (local calendar date), rejecting rollovers like
"2024-13-01" / "2024-02-31". Non-`yyyy-MM-dd` input (ISO datetimes, which carry
their own offset) still goes through the Date constructor. `minDate`/`maxDate`
are parsed through the same helper (`minBound`/`maxBound`).

### 2. HIGH — first click destroyed the end date without emitting  [FIXED]
Old flow set `endDate = null` on the first click and never called `onChange`;
clicking away just closed the dropdown. The UI showed a blank "To" while the
parent still held the old range — a filter kept applying a range the user could
no longer see.

Fix: added `pendingStart`. The first click stages into `pendingStart` and
touches NOTHING committed. Only the second click commits + emits. Abandoning
(outside click / Escape) calls `cancelSelection()`, which drops the draft and
leaves the committed range intact.

### 3. HIGH (a11y) — keyboard could not open the picker  [FIXED]
Only trigger was `onClick` on a bare `<div>`; inputs were `readOnly` with no
handlers and the icon buttons were `tabIndex={-1}` with no `onClick`.
Fix: `onKeyDown` on both inputs (Enter / Space / ArrowDown open), Escape on the
wrapper closes and returns focus to the active input, icon buttons are now real
buttons (`tabIndex` 0, own `onClick` with `stopPropagation`, `aria-expanded`).

### 4. MEDIUM — `errorMessage` was a mount-time snapshot  [FIXED]
`useState(errorMessage || null)` never resynced, and every date click's
`setError(null)` discarded a parent-supplied message.
Fix: split into `internalError` (component validation) and the prop;
`displayError = errorMessage || internalError` reads the prop directly, so the
parent always wins and late updates render.

### 5. MEDIUM — quick presets bypassed minDate/maxDate/disabledDates  [FIXED]
`applyPreset` did no validation; "Last 30 Days" emitted out-of-bounds dates.
Fix: `clampToBounds()` pulls both endpoints into [minDate, maxDate]; impossible
bounds or a disabled endpoint raise an internal error instead of emitting.
Preset dates are normalised with `startOfDay` (endOfWeek/endOfMonth return
23:59:59.999, which used to trip the maxDate comparison on the boundary day).

### 6. MEDIUM (a11y) — label/error not associated  [FIXED]
`htmlFor={id}` pointed at nothing (no element carried `id`), and the error div's
`${id}-error` was referenced by nobody.
Fix: `React.useId()` fallback so association works even when the consumer passes
no `id`. Start input gets `baseId`, end input `${baseId}-end`, error
`${baseId}-error` with `role="alert"`; both inputs carry `aria-describedby` and
`aria-invalid` when errored.

### Minor  [ALL FIXED]
- `required` now validates: clearing a required range raises
  "Please select a date range."
- Backwards-hover corner inversion: `getDayRangeClass` now normalises
  start/end BEFORE assigning edge classes, so `range-start` (left-rounded)
  always lands on the left edge.
- `clearRange` resets `pendingStart`/`hoverDate`/phase and focuses the start
  field. It deliberately keeps the dropdown OPEN (you almost always want to pick
  again immediately) — that asymmetry with the other presets is intentional.
- `aria-selected` on a `<button>` (invalid ARIA) replaced with `aria-pressed`
  plus `aria-current="date"` for today. Day buttons also sync hover preview on
  `onFocus` so keyboard users get the same preview as mouse users.
- Dropped the unused `DateRange` import and the now-unused `endOfDay` import.
- The `if (value)` sync guard was KEPT deliberately: it preserves the
  controlled/uncontrolled contract (`{startDate:"",endDate:""}` clears; omitting
  the prop leaves the component uncontrolled). Not a bug.

---

### Verification performed
1. **Typecheck** — `npx tsc --noEmit -p tsconfig.build.json`: 0 DateRangePicker
   errors. Total repo errors 96 BEFORE and 96 AFTER (all pre-existing, in
   `ui/editor/MenuBar.tsx` and `ui/viewer/DangerousRenderer.tsx`).
2. **Timezone harness** — 23 assertions x 6 zones (New_York, Los_Angeles, Lagos,
   Tokyo, Kiritimati, UTC), all passing. Covers round-trip stability, rollover
   rejection, leap day, DST boundary days, clamping, min/max inclusivity, and
   range-class normalisation. Script kept at
   `<scratchpad>/verify-drp.cjs` — run with `TZ=America/New_York node verify-drp.cjs`
   from the package root (needs `date-fns` resolution).
3. **Live browser (Playwright, example app)** — verified on
   `/components/forms/date-range-picker`:
   - Enter and ArrowDown open the picker; Escape closes it.
   - First click stages `2024-06-10` with a blank end; clicking OUTSIDE restores
     the committed `2024-06-01 / 2024-06-30`.
   - Two-click selection commits and closes; backwards selection auto-swaps
     (clicked 20 then 10 -> `2026-09-10 / 2026-09-20`).
   - Presets on the restricted picker all land inside [minDate, maxDate].
   - Real-mouse backwards hover: day10=`range-start`, day15=`in-range`,
     day20=`range-end` (previously inverted).
   - `required` + Clear raises the validation error.
   - Error picker: label resolves to the start input, `aria-describedby`
     resolves to the error node, ids unique, `role="alert"`, `aria-invalid=true`.
   - Disabled picker stays closed and keeps its value; `disabledDates` days
     remain non-clickable.
   - No React console errors (the 5 console errors are missing static assets in
     the example app: logo.svg, twitter.svg, github.svg, discord.svg,
     instincthub-thumbnail.png — pre-existing, unrelated).

### Follow-ups for a future session
- **This package has NO test runner** (`npm test` is a stub). The verification
  above was ad-hoc. Standing up vitest + @testing-library/react and porting the
  timezone harness into real regression tests is the highest-value follow-up —
  bug 1 in particular is exactly the kind of thing that silently regresses.
- ~~Full arrow-key roving-tabindex navigation inside the day grid~~ — DONE
  2026-09-06, see the entry at the top of this file.
- ~~`dist/` and `.rollup.cache/` still hold the OLD build~~ — rebuilt
  2026-09-06; `dist` now matches source at 0.1.59.
- `/Users/noaholatoye/Documents/code_projects/npm_packages/.claude/launch.json`
  (a dev-server config for the example app) is still there from that session.
  Harmless; delete it if you don't want it.
