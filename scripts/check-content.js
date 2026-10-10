import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import matter from "gray-matter";
import publication from "../src/_data/publication.js";

const eleventy = resolve("node_modules/@11ty/eleventy/cmd.cjs");
const htmlValidate = resolve("node_modules/.bin/html-validate");
const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

function projectFiles(sourceRoot) {
  const projectRoot = join(sourceRoot, "projects");
  return readdirSync(projectRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(projectRoot, entry.name, "index.md"))
    .filter(existsSync);
}

function validateProjectSources(sourceRoot) {
  return projectFiles(sourceRoot).map((file) => {
    const { data, content } = matter(readFileSync(file, "utf8"));
    const label = file.replace(`${sourceRoot}/`, "");
    const slug = file.split("/").at(-2);

    assert.equal(typeof data.title, "string", `${label}: title must be a string`);
    assert(data.title.trim(), `${label}: title cannot be empty`);
    assert.equal(typeof data.order, "number", `${label}: order must be a number`);
    assert.equal(typeof data.published, "boolean", `${label}: published must be a boolean`);
    assert.equal(typeof data.featured, "boolean", `${label}: featured must be a boolean`);
    assert(!data.featured || data.published, `${label}: featured projects must be published`);
    assert.equal(data.layout, undefined, `${label}: layout belongs in project directory data`);
    assert.equal(data.permalink, undefined, `${label}: permalink belongs in project directory data`);

    if (data.stub) {
      assert.equal(data.stub, true, `${label}: stub must be true when supplied`);
    } else if (!data.externalUrl) {
      for (const field of ["description", "summary", "contribution"]) {
        assert.equal(typeof data[field], "string", `${label}: completed projects require ${field}`);
        assert(data[field].trim(), `${label}: ${field} cannot be empty`);
      }
      assert(content.trim().length >= 200, `${label}: completed projects require substantive body content`);
    }

    return { slug, data, content };
  });
}

function validateExperience(sourceRoot) {
  const groups = JSON.parse(readFileSync(join(sourceRoot, "_data", "experience.json"), "utf8"));
  for (const group of groups) {
    assert.equal(typeof group.employer, "string", "Experience employers require a name");
    assert.equal(typeof group.location, "string", `${group.employer}: location must be a string`);
    assert(Array.isArray(group.roles) && group.roles.length, `${group.employer}: roles cannot be empty`);

    for (const role of group.roles) {
      assert.match(role.start, monthPattern, `${group.employer}/${role.role}: invalid start month`);
      if (role.end) {
        assert.match(role.end, monthPattern, `${group.employer}/${role.role}: invalid end month`);
        assert(role.end >= role.start, `${group.employer}/${role.role}: end cannot precede start`);
      }
    }
  }
  return groups;
}

function writeProject(sourceRoot, project) {
  const directory = join(sourceRoot, "projects", project.slug);
  mkdirSync(directory, { recursive: true });
  const {
    slug,
    content = "## Context\n\nA substantive fixture body used to verify the completed project publishing path. ".repeat(3),
    ...data
  } = project;
  const fixtureData = data;
  const frontmatter = Object.entries(fixtureData)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  writeFileSync(join(directory, "index.md"), `---\n${frontmatter}\n---\n\n${content}\n`);
}

function buildFixture(publishWork = true) {
  const workspace = mkdtempSync(join(tmpdir(), "portfolio-content-"));
  const source = join(workspace, "src");
  const output = join(workspace, "site");
  cpSync("src", source, { recursive: true });
  cpSync("package.json", join(workspace, "package.json"));
  writeFileSync(join(source, "_data", "publication.js"), `export default ${JSON.stringify({ publishWork })};\n`);

  for (const project of [
    {
      slug: "first", title: "first", description: "First project description", summary: "Fallback summary",
      contribution: "Specific contribution", order: -4, featured: true, published: true
    },
    {
      slug: "second", title: "second", description: "Second project description", summary: "External summary",
      contribution: "External contribution", order: -3, featured: true, published: true,
      externalUrl: "https://example.com/work"
    },
    { slug: "preview", title: "preview", order: -2, featured: true, published: true, stub: true, content: "Case study coming soon." },
    { slug: "hidden", title: "hidden", order: -5, featured: false, published: false, stub: true },
    {
      slug: "unfeatured", title: "unfeatured", description: "Unfeatured project description", summary: "Unfeatured summary",
      contribution: "Unfeatured contribution", order: -6, featured: false, published: true
    }
  ]) {
    writeProject(source, project);
  }

  writeFileSync(join(source, "_data", "experience.json"), JSON.stringify([
    {
      employer: "Current employer", location: "Olathe, KS", roles: [
        { role: "Earlier role", start: "2024-01", end: "2024-02" },
        { role: "Current role", start: "2024-03" }
      ]
    },
    {
      employer: "A very long employer name to check wrapping", location: "San Francisco, CA",
      roles: [{ role: "Older role", start: "2020-01", end: "2023-02" }]
    }
  ]));

  execFileSync(process.execPath, [eleventy, `--config=${resolve("eleventy.config.js")}`, `--output=${output}`], { cwd: workspace, stdio: "pipe" });
  return { workspace, output };
}

function assertFixture(output) {
  const home = readFileSync(join(output, "index.html"), "utf8");
  assert(home.indexOf('href="/projects/first/"') < home.indexOf('href="https://example.com/work"'), home);
  assert(home.includes("Specific contribution"));
  assert(home.includes("External contribution"));
  assert(home.includes("Case study coming soon."));
  assert(!home.includes('href="/projects/hidden/"'));
  assert(!home.includes('href="/projects/unfeatured/"'));
  assert(!existsSync(join(output, "projects", "hidden", "index.html")));
  assert(existsSync(join(output, "projects", "unfeatured", "index.html")));
  assert(home.indexOf("Current role") < home.indexOf("Earlier role"));
  assert(home.indexOf("Earlier role") < home.indexOf("Older role"));
  assert.equal((home.match(/class="experience-employer"/g) || []).length, 2);
  assert(home.includes('datetime="2024-03">Mar 2024</time>'));
  assert(home.includes('datetime="2024-02">Feb 2024</time>'));
  assert(!home.includes("<experience-list"));
  assert(home.includes("Present"));
  execFileSync(htmlValidate, ["--config", resolve(".htmlvalidate.json"), join(output, "**/*.html")], { stdio: "inherit" });
}

function assertSocialImage() {
  const image = readFileSync("src/assets/images/social-card.png");
  assert.equal(image.toString("hex", 1, 4), "504e47", "Social image must be a PNG");
  assert.equal(image.readUInt32BE(16), 1200, "Social image must be 1200 pixels wide");
  assert.equal(image.readUInt32BE(20), 630, "Social image must be 630 pixels tall");
}

function assertProduction(experience, projects) {
  const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));
  const home = readFileSync("_site/index.html", "utf8");
  assert(home.includes("You can connect with me on"));
  assert(home.includes(`href="${site.linkedin}" target="_blank" rel="me noopener noreferrer">LinkedIn</a>`));
  assert(home.includes(`href="mailto:${site.email}">email</a>`));
  assert(!home.includes(`href="mailto:${site.email}" target="_blank"`));
  assert(!home.includes("Example summary"));
  assert(!home.includes("Example contribution"));
  assert(!home.includes('class="work-link" aria-label='));
  assert(home.includes('class="site-header"'));
  assert(home.includes(`<a href="/">${site.name}</a>`));
  assert(home.includes('id="theme-toggle"'));
  assert(home.includes('id="red-light-toggle"'));
  assert(home.includes('src="/assets/display-modes.js"'));
  assert.equal((home.match(/<h1[ >]/g) || []).length, 1);

  const { publishWork } = publication;
  assert.equal(typeof publishWork, "boolean", "publishWork must be a boolean");
  assert.equal(home.includes('id="work"'), publishWork);
  const previews = projects
    .filter(({ data }) => publishWork && data.published && data.featured)
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  let previousPosition = -1;
  for (const { slug, data } of previews) {
    const destination = data.externalUrl || `/projects/${slug}/`;
    const position = home.indexOf(`href="${destination}"`);
    assert(position > previousPosition, `Missing or incorrectly ordered preview: ${data.title}`);
    previousPosition = position;
  }

  for (const { slug, data } of projects) {
    const detailPath = join("_site", "projects", slug, "index.html");
    if (!publishWork || !data.published) {
      assert(!existsSync(detailPath), `${data.title}: unpublished project generated a page`);
      continue;
    }

    assert(existsSync(detailPath), `${data.title}: published project did not generate a page`);
    const detail = readFileSync(join("_site", "projects", slug, "index.html"), "utf8");
    assert(detail.includes(`<h1>${data.title}</h1>`));
    assert.equal((detail.match(/<h1[ >]/g) || []).length, 2);
    if (data.employer) assert(detail.includes(data.employer));
    assert(detail.includes('class="site-header"'));
    assert(detail.includes(`<a href="/">${site.name}</a>`));
    assert(detail.includes('id="theme-toggle"'));
    assert(detail.includes('id="red-light-toggle"'));
    assert(!detail.includes("Back to home"));
    assert(!detail.includes('class="content-grid"'));
    assert(detail.includes('src="/assets/display-modes.js"'));
    if (data.stub) {
      assert(detail.includes("Case study coming soon."));
      assert(detail.includes('<meta property="og:type" content="website">'));
      assert(!detail.includes("project-facts"));
    } else {
      assert(detail.includes('<meta property="og:type" content="article">'));
      assert.equal(detail.includes('class="project-facts"'), Boolean(data.year || data.role));
      assert(detail.includes(`<meta property="og:image" content="${site.url + (data.socialImage || site.socialImage)}">`));
      assert(detail.includes('<meta name="twitter:card" content="summary_large_image">'));
    }

    const destination = data.externalUrl || `/projects/${slug}/`;
    assert.equal(home.includes(`href="${destination}"`), Boolean(data.featured), `${data.title}: incorrect featured state`);
  }

  const locationCounts = new Map();
  for (const group of experience) {
    locationCounts.set(group.location, (locationCounts.get(group.location) ?? 0) + 1);
  }
  for (const [location, count] of locationCounts) {
    assert.equal(home.split(location).length - 1, count);
  }

  for (const [groupIndex, group] of experience.entries()) {
    assert(home.includes(`<h3 id="experience-employer-${groupIndex}">${group.employer}</h3>`));
    const orderedRoles = [...group.roles].sort((a, b) => b.start.localeCompare(a.start));
    let priorRolePosition = -1;
    for (const role of orderedRoles) {
      const rolePosition = home.indexOf(`<h4>${role.role}</h4>`);
      assert(rolePosition > priorRolePosition, `${group.employer}: roles are not newest first`);
      priorRolePosition = rolePosition;
      const entry = home.slice(rolePosition, home.indexOf("</li>", rolePosition));
      assert(entry.includes(`datetime="${role.start}"`));
      assert(entry.includes(role.end ? `datetime="${role.end}"` : "Present"));
    }
  }
}

const projects = validateProjectSources("src");
const experience = validateExperience("src");
assertSocialImage();

const fixture = buildFixture();
try {
  assertFixture(fixture.output);
} finally {
  rmSync(fixture.workspace, { recursive: true, force: true });
}

const hiddenFixture = buildFixture(false);
try {
  const home = readFileSync(join(hiddenFixture.output, "index.html"), "utf8");
  assert(!home.includes('id="work"'));
  assert(!home.includes("Selected Work"));
  assert(!home.includes("Selected work is being prepared"));
  assert(!home.includes('href="/projects/'));
  assert(!existsSync(join(hiddenFixture.output, "projects")), "Work-disabled build generated project pages");
  assert(home.includes('id="experience-heading"'));
} finally {
  rmSync(hiddenFixture.workspace, { recursive: true, force: true });
}

assertProduction(experience, projects);
console.log("Content checks passed: source invariants, publishing behavior, metadata, navigation, and experience.");
