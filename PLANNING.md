# A quieter portfolio: selected work and experience

## Purpose and structure

A portfolio for senior design individual-contributor roles, inspired by the modest typography and centered reading layouts of Benji.org and karrisaarinen.com.

The homepage contains Stuart’s name, two introductory paragraphs, contact links, selected work, then experience. Selected work is ordered by relevance; experience is reverse chronological. Case studies stay on separate pages.

## Visual system

- Centered 36rem column; 1.25rem mobile gutters; 5rem desktop top spacing.
- Native system UI fonts throughout, with a generic sans-serif fallback and automatic optical sizing where supported.
- Five explicit type roles: 1.75rem/2.125rem display titles, 1rem/1.375rem section titles, 0.875rem/1.25rem subheadings, 0.8125rem/1.25rem body text, and 0.75rem/1rem captions. The system uses regular, semibold, and bold weights only. The shared site identity is always an h1 in the markup but uses the 1rem/1.375rem semibold Title treatment on every page.
- Headings balance their lines, paragraphs use pretty wrapping, dates use tabular figures, and hierarchy never relies on uppercase text, opacity, or manual letter spacing.
- Three rem between sections; 1.5rem between projects; one rem between paragraphs.
- Light: background #fafaf9, text #262625, secondary #62625e.
- Dark: background #181818, text #ededeb, secondary #aaa9a5.
- Underlined links, immediate active feedback, visible keyboard focus, and subtle 120–160ms color/opacity/press transitions.
- No display hero, numbered rows, decorative rules, animated entrances, expanding rows, translucent chrome, or smooth scrolling.
- Case-study images can extend to 48rem while captions stay within 36rem.

Apple-design informs system typography, readable hierarchy, text scaling, and restraint. Frontend-design follows the explicit reference direction; personality comes from precise writing and work selection.

## Content model

Introduction and contact live in site data. Projects live in Markdown with title, date, year, role, employer, summary, optional contribution, order, featured, published, optional externalUrl and cover. Internal permalinks are derived from project directory names.

The initial release sets `publishWork = false` in `src/_data/publication.js`: Selected Work and all project pages are omitted. `npm run develop:work` previews them locally. When enabled, published featured projects populate the homepage automatically. Contribution falls back to summary. Unpublished projects generate no page. The website-redesign case study stays available but is unfeatured.

Experience data contains employer, location, and a roles array with titles and start/end dates. Current roles omit an end date. All seven roles come from the supplied LinkedIn screenshot. Display Olathe, KS for Garmin and San Francisco, CA for Nokia and LUNAR Design, as supplied by Stuart. Preserve overlapping dates. Omit descriptions, duration totals, and skill badges.

The experience component displays Garmin, Nokia, and LUNAR Design in that order. Employer headings and one location precede each ordered list of roles, newest first. Roles are separated by 1rem and employers by 2.5rem. Dates align right beside role titles; below 30rem they stack beneath the titles. Role titles use regular-weight body text; metadata uses the caption style. No dividers or animated behavior are needed.

## Semantics and verification

Use an h1 for the shared site identity on every page and labeled homepage sections with h2. Content pages retain their own h1 page title. Employer groups are sections labeled by h3 headings, followed by one location paragraph and an ordered list of roles with h4 titles and machine-readable time endpoints. Locations are not contact addresses. Build-time WebC components render ordinary HTML without retained custom-element wrappers; essential behavior needs no browser JavaScript.

The validation suite checks generated HTML and internal assets/links, and builds disposable content fixtures to check ordering, draft exclusion, featured state, external destinations, missing optional fields, current employment, and repeated employers.

Review at 320px, 390px, 768px, wide desktop, 200% zoom, keyboard navigation, and both color schemes. The golf footer respects reduced motion and pauses when offscreen or the tab is hidden.

## Content and launch requirements

Employment history has been supplied and transcribed. Selected work links to Garmin Golf App, Nokia OZO Live, and LUNAR 30th Anniversary, in that order. Garmin Golf App now has a complete draft structure based on the supplied platform-migration direction, with placeholder narrative and outcomes explicitly labeled on the page. Nokia and LUNAR remain minimal stubs. Replace all placeholder claims with approved evidence before launch.

Project pages use the shared site identity as their home navigation, followed by the project title. Omit a separate “Back to home” link, the case-study eyebrow, and cross-project navigation; no page-specific browser JavaScript is added. Optional year and role metadata is omitted when absent.

Before launch:
- Keep Work disabled for the initial release. Before enabling it, finish the case studies with specific contributions and supported outcomes.
- Verify the supplied employment history in its final layout.
- Review imagery, credits, confidentiality, and final copy.
- Run all checks and review mobile hardware.
- Verify GitHub Pages, domain ownership, DNS, HTTPS, redirects, and 404 behavior.
- Retire Firebase only after the new custom-domain site works reliably.

Hosting remains GitHub Pages. Domain migration is a separate pending step.

## Golf landscape footer

The homepage closes with a sparse, monochrome golf landscape beneath Experience, separated by 3rem and aligned with the 36rem text column. Build-time SVG text uses system monospace characters for the trees, water, green, rectangular flag, and cup. The composition stays sunny and inherits the existing light, dark, red-light, and forced-colors palettes.

The scene is an Easter egg: its accessible native button plays a 2.4-second successful golf shot without a visible instruction. Repeat activations during a shot are ignored. Water rolls, the rectangular flag waves, and individual trees sway gently whenever the footer is visible. There is no pause control. Hidden tabs and offscreen scenes suspend animation. Reduced motion keeps the landscape still and substitutes a brief opacity-only ball indication at the cup. Without JavaScript the scene remains static and controls are inactive. No footer appears on project or 404 pages.

Verify responsive scaling, keyboard and touch interaction, visibility suspension, display modes, reduced motion, and the no-JavaScript fallback alongside the standard validation suite.
