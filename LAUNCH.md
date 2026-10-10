# Launch without Work

The code is prepared locally; no deployment or hosting settings have been changed by this task. Work is disabled in `src/_data/publication.js`. The normal build produces the homepage, 404, and shared assets, with no project pages or Work links. Drafts remain in the repository for further development; this switch controls the published website, not repository visibility.

## 1. Deploy the prepared code

Publish the local changes to `main` in [Personal-Website](https://github.com/stuartfavretto/Personal-Website). The existing GitHub Actions workflow installs dependencies, validates, and deploys `_site`. Do not upload the source folder as the finished website.

In [repository Pages settings](https://github.com/stuartfavretto/Personal-Website/settings/pages), set **Build and deployment → Source → GitHub Actions**. After the changes reach GitHub, confirm the **Build and deploy website** workflow succeeds in [Actions](https://github.com/stuartfavretto/Personal-Website/actions). If necessary, run it manually against `main` after enabling Pages.

The homepage uses root-relative asset paths, so the default project URL under `/Personal-Website/` is not a reliable full visual preview. Review locally with `npm run develop`; check the final hosted layout once the custom domain is connected.

## 2. Configure the domain on GitHub first

In [account Pages settings](https://github.com/settings/pages), add and verify `stuartfavretto.com` using the TXT record GitHub provides. Keep that TXT record.

In repository Pages settings, save **Custom domain → stuartfavretto.com** before switching web DNS. The source already contains this domain, but GitHub Actions deployments require the setting in GitHub; the copied `CNAME` file does not configure it.

## 3. Change web DNS at your provider

Record the current Firebase web DNS values so they are available if a rollback is needed. Replace conflicting web records at `@` and `www` with these:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | stuartfavretto.github.io |

Remove old Firebase A/AAAA or other conflicting web records for these hosts. IPv6 is optional; if you keep AAAA records, replace them with GitHub's current values from the linked documentation. Preserve MX records and unrelated TXT records used for email and verification. Use your provider's default TTL. Do not include `/Personal-Website` in the CNAME value.

GitHub documents these settings in [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). DNS and HTTPS availability can take up to 24 hours to settle.

## 4. Confirm the live release

Once GitHub's DNS check passes and the certificate is available, enable **Enforce HTTPS**. Verify:

- `https://stuartfavretto.com` loads the new homepage with styles and images.
- `https://www.stuartfavretto.com` redirects to the main domain.
- Work is absent, and `/projects/garmin-golf-app/` returns a 404.
- Contact links, experience, display controls, and the golf footer work on desktop and phone.
- A nonexistent URL displays the custom 404 page.

Keep Firebase hosting available until the new domain works reliably.

## Publish Work later

Use `npm run develop:work` while writing the case studies. When ready, set `const publishWork = true` in `src/_data/publication.js`, confirm each project's `published`/`featured` flags, run `npm run validate`, and publish the changes. No DNS changes are needed for that release.
