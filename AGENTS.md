# Repository guidance

This repository builds and publishes [stuartfavretto.com](https://stuartfavretto.com). Preserve its restrained editorial design, accessible semantics, and static-first implementation. Refer to `PLANNING.md` for the detailed design and content requirements.

## Development and validation

Use Node.js 22 or newer.

```sh
npm ci
npm run develop
```

- `npm run develop` previews the release build with Work hidden.
- `npm run develop:work` previews Work locally without changing its release setting.
- `npm run validate` is required before publishing. It lints CSS and custom properties, cleans and builds `_site`, validates generated HTML, checks internal links, and exercises the content workflow with disposable fixtures.
- Do not edit `_site`; it is generated output and is cleaned before every build.

## Site content

Edit the introduction, email address, LinkedIn URL, site metadata, and social preview metadata in `src/_data/site.json`. The introduction is an array of short paragraphs. Contact details are passed explicitly to the contact component.

Edit employment history in `src/_data/experience.json`. Each employer requires an `employer`, one `location`, and a nonempty `roles` array. Roles use ISO `YYYY-MM` values for `start` and optional `end`; omit `end` for a current role. Employer order follows the data file, while roles are rendered newest first. Preserve overlapping appointments and show only role, employer, dates, and location.

Store site media in `src/assets/images`; the build copies that directory through unchanged. Prefer SVG for diagrams and optimized WebP or AVIF for screenshots and photographs. Give content images meaningful alt text and captions, and include dimensions to reserve layout space. Maintain the default social preview in `social-card.svg` and export it as a 1200×630 `social-card.png`.

## Work publication

The global switch in `src/_data/publication.js` must remain `publishWork = false` until Stuart approves the case studies for publication. A normal build must omit the entire Selected Work section and every project page. `WORK_PREVIEW=true`, exposed through `npm run develop:work`, is for local preview only; GitHub Actions explicitly disables that override.

Create a project by copying `templates/project.md` to `src/projects/project-name/index.md`. The directory name becomes the internal URL; do not add `layout` or `permalink` to project frontmatter because `src/projects/projects.11tydata.js` supplies them.

Project metadata rules:

- `published: true` generates the page once global Work publication is enabled; `false` always suppresses it.
- `featured: true` includes a published project on the homepage.
- `order` controls homepage order, lowest first.
- `employer` provides context; `contribution` is the preferred homepage summary and falls back to `summary`.
- `externalUrl` sends the project title to an external destination.
- `stub: true` is reserved for incomplete previews and must not include invented summaries or contribution claims.
- A completed internal project requires nonempty `description`, `summary`, `contribution`, and substantive body content. Year and role are optional until confirmed.

The Garmin Golf App case study contains explicitly labeled placeholder narrative, outcomes, and imagery that require review before publication. Nokia OZO Live and LUNAR 30th Anniversary remain stubs. Before completing a stub, replace its placeholder body with approved content, supply the required metadata, and remove `stub: true`.

The homepage derives its Work list from project metadata; do not duplicate project links in homepage markup. Content validation rejects invalid metadata, featured drafts, incomplete finished case studies, invalid employment dates, and public placeholder claims.

## Publishing

GitHub Pages is the production host for `stuartfavretto.com`. GitHub Actions runs validation and deploys `_site` whenever changes reach `main`; pull requests run validation without deploying. The repository Pages source must remain GitHub Actions, and the custom domain must remain `stuartfavretto.com` with HTTPS enforced.

Before publishing, run `npm run validate` and review the relevant pages locally. Keep Work disabled unless Stuart has explicitly approved its release. After pushing to `main`, confirm the **Build and deploy website** workflow succeeds and verify the production site, redirects, assets, and custom 404 page.
