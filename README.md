# stuartfavretto.com

A small portfolio built with Eleventy, Markdown, and WebC. GitHub Pages publishes the static output in `_site`.

Typography uses the native system UI font stack with automatic optical sizing where supported.

## Local development

Use Node.js 22 or newer:

```sh
npm ci
npm run develop
```

Follow the preview URL printed by Eleventy. Use `npm run validate` before publishing; it lints CSS and custom properties, builds the site, validates generated HTML, checks internal links, and verifies the content workflow with disposable fixtures.

## Introduction and contact

Edit `src/_data/site.json`. The introduction is an array of short paragraphs. The contact component receives email and LinkedIn explicitly from that data.

## Work publication switch

`src/_data/publication.js` currently sets `publishWork = false`. Normal builds omit the entire Selected Work section and every project page, including unfeatured projects. No coming-soon message appears. The intro, contact, experience, display controls, and golf footer remain available.

- `npm run develop`: preview the release with Work hidden.
- `npm run develop:work`: preview Work locally without changing the release setting.
- When the case studies are approved, change `const publishWork = false` to `true`, validate, and deploy. Individual `published` and `featured` flags still apply.

GitHub Actions explicitly disables the local preview override. Builds clean `_site` first so old project pages cannot survive into a release. Validation exercises both publishing states using temporary copies of the actual project directory data.

## Selected work

Copy `templates/project.md` into `src/projects/project-name/index.md`.

- Set `published: true` to generate its page. Drafts with `published: false` produce no page.
- Set `featured: true` to include it in selected work.
- Set `order` to choose its position; lower numbers appear first.
- Supply `employer` for context and `contribution` for your specific contribution and result. If contribution is omitted, the homepage uses `summary`.
- Set `externalUrl` when the title should link to work elsewhere.
- The project directory name determines its internal URL; do not add a `permalink` to project frontmatter.
- Optional cover metadata does not create a homepage thumbnail. Add meaningful images to the case study with `figure`, descriptive alt text, and a caption.

The homepage updates automatically from project metadata. No homepage markup changes are needed.

Garmin Golf App has a complete draft structure with explicitly labeled placeholder narrative, outcomes, and imagery. Its product direction and Lead Product Designer role reflect supplied information, but the supporting story still requires review before launch. Nokia OZO Live and LUNAR 30th Anniversary remain minimal previews marked `stub: true`; stub listings never publish example summaries or invented contribution claims.

To complete a stub, replace its placeholder Markdown with approved content, add a description, summary, and contribution, and remove `stub: true` (or set it to `false`). Year and role are optional; omit them until confirmed. Keep `published: true` and `featured: true` to retain its page and homepage link.

Project layout, collection membership, and internal permalinks are inherited from `src/projects/projects.11tydata.js`; project files should not repeat them. The content checks reject invalid metadata, featured drafts, incomplete finished case studies, invalid employment dates, and public placeholder claims.

Use SVG for diagrams and optimized WebP or AVIF for screenshots and photographs where practical. Include image width and height to reserve space. Store media in `src/assets/images`; files there are copied into the build. The default social preview is maintained as `social-card.svg` and exported as a 1200×630 `social-card.png`.

## Experience

Edit `src/_data/experience.json`. Each employer has one `location` and a `roles` array. Employer order follows the file; the build-time `experience-list.webc` component sorts roles within each employer by start month, newest first. Dates use ISO year-month format and display as abbreviated month and year. Omit `end` for a current role; overlapping appointments are preserved.

```json
[
  {
    "employer": "Employer name",
    "location": "City, region",
    "roles": [
      { "role": "Senior product designer", "start": "2024-03", "end": "2026-01" }
    ]
  }
]
```

The seven current roles are transcribed from Stuart’s LinkedIn screenshot. The experience section shows role, employer, dates, and location only. Descriptions, duration totals, skill badges, and links are omitted.

## Publishing

Create a branch and open a pull request. GitHub Actions runs all validation; merging to `main` deploys through GitHub Pages.

In repository Settings → Pages, choose GitHub Actions. Domain migration remains pending: verify the temporary deployment, verify domain ownership, configure `stuartfavretto.com` and its DNS records, then enable HTTPS. Retire Firebase after the custom domain works reliably.

Follow [LAUNCH.md](LAUNCH.md) for the GitHub Pages and domain handoff. See [PLANNING.md](PLANNING.md) for the design requirements.
