# Bug Handoff — instincthub-react-ui

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
- Full arrow-key roving-tabindex navigation inside the day grid is still not
  implemented. Day cells are real buttons so they are Tab-reachable, but
  Up/Down/Left/Right do not move between dates.
- `dist/` and `.rollup.cache/` still hold the OLD build. Run `pnpm rollup`
  before publishing.
- I added `/Users/noaholatoye/Documents/code_projects/npm_packages/.claude/launch.json`
  (a dev-server config for the example app) to drive the browser verification.
  Harmless, but delete it if you don't want it.
