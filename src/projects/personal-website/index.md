---
title: A quieter home for my work
description: Designing and building Stuart Favretto’s personal portfolio as a durable, low-maintenance publishing system.
summary: Designing and building this portfolio as a durable, low-maintenance publishing system.
contribution: Designed and built a Markdown-based portfolio with reusable layouts and automated publishing checks.
date: 2026-10-06
year: "2026"
role: Design and development
order: 1
featured: false
employer: Independent
published: true
cover: /assets/images/website-system.svg
---

## Context

The previous site did one thing well: it introduced me with confidence and very little noise. It did not, however, provide a way to understand my work or add new projects without redesigning the page.

<figure class="wide-figure">
  <img src="/assets/images/website-system.svg" alt="Diagram showing content moving through reusable components into a static website" width="1440" height="900">
  <figcaption>Content stays separate from presentation, while the published result remains ordinary HTML.</figcaption>
</figure>

## Approach

The new site keeps the restraint of the original while introducing a small editorial system. Project stories live in Markdown, reusable structures live in WebC, and Eleventy produces static pages that need no application server.

The design uses a centered reading column, familiar typography, and a simple list of selected work followed by experience.

## Principles

- Write the content before decorating it.
- Prefer semantic HTML to generic component wrappers.
- Make essential information available without JavaScript.
- Keep publishing understandable enough to maintain without specialist tooling.

## Outcome

The result is a fast, accessible foundation that can grow one considered case study at a time. GitHub holds the source, checks each proposed change, and publishes the accepted version directly to GitHub Pages.

<aside class="case-study-note" aria-labelledby="note-heading">
  <h2 id="note-heading">A living case study</h2>
  <p>This page will continue to document the site as real projects, imagery, and lessons are added.</p>
</aside>
