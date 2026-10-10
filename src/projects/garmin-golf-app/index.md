---
title: Garmin Golf App
description: A draft case study about leading the Garmin Golf App from its 2.x foundation toward a modern, adaptive 3.x experience.
summary: Evolving Garmin Golf from version 2.x to 3.x while preparing its design and technical foundations for a wider range of screen sizes.
contribution: Led the cross-platform product design strategy for the 3.x experience and its transition from UIKit and XML layouts to SwiftUI and Compose.
date: 2025-08-01
year: "2025"
role: Lead Product Designer
employer: Garmin
order: 1
published: true
featured: true
stub: false
---

<aside class="case-study-note" aria-labelledby="draft-heading">
  <h2 id="draft-heading">Draft case study</h2>
  <p>This page uses placeholder narrative and outcomes to explore the final case-study structure. The project direction and my role are accurate; supporting details should be reviewed and replaced before publication.</p>
</aside>

## Context

Garmin Golf had grown into an important companion for golfers before, during, and after a round. By version 2.x, however, the product was carrying years of platform-specific decisions. The iOS experience relied on UIKit, while Android used XML layouts. Both approaches worked, but they made it increasingly difficult to evolve the product as one coherent system.

Version 3.x created an opportunity to do more than refresh the interface. It allowed the team to rethink how Garmin Golf should behave across phones, tablets, foldables, and the larger or non-default display sizes emerging across Apple and Android platforms.

<figure class="wide-figure">
  <img src="/assets/images/test.jpg" alt="Golfers on a foggy course, used as placeholder imagery for the Garmin Golf case study" width="4032" height="3024">
  <figcaption>Placeholder imagery: the product needed to stay useful in the changing, often imperfect conditions of a real round.</figcaption>
</figure>

## The challenge

The work had three connected goals:

- Move the experience from the 2.x generation to a clearer and more focused 3.x product.
- Establish a shared interaction and visual language across iOS and Android without ignoring the conventions of either platform.
- Prepare the interface for SwiftUI and Compose so future layouts could adapt gracefully instead of assuming one default phone size.

This was not a simple reskin. Navigation, information hierarchy, reusable components, and implementation strategy all had to move together. A design that looked modern but reinforced the old layout assumptions would only postpone the underlying problem.

## My role

As Lead Product Designer, I worked across product management, iOS and Android engineering, research, and the broader Garmin design organization. I was responsible for connecting the product vision to a system the teams could build incrementally.

My focus included mapping the existing experience, setting interaction principles for 3.x, defining adaptive component behavior, prototyping key journeys, and helping the platform teams make consistent decisions as UIKit and XML screens moved toward SwiftUI and Compose.

## Designing the 3.x foundation

### Start with behavior, not screens

The team first catalogued the jobs golfers returned to most often: preparing for a round, following live scoring, reviewing performance, and understanding where to improve. We used those jobs to challenge the existing navigation and separate durable product behavior from patterns that existed only because of the legacy implementation.

Instead of treating every 2.x screen as a migration requirement, we documented the intent behind it. This gave engineering room to replace one-off layouts with reusable components and gave design a clearer standard for deciding what should remain familiar and what needed to change.

### Design for available space

The emerging system described how content should respond as space changed. Dense round information could move from stacked regions to side-by-side groups. Supporting controls could stay near the information they affected. Navigation could adapt without creating a second, unrelated version of the product for larger displays.

The goal was not to fill every available pixel. It was to preserve hierarchy, readability, and touch ergonomics whether Garmin Golf appeared on a compact phone, a tablet, a foldable, or a future display size the team had not yet tested.

### Migrate without pausing the product

Design and engineering organized the transition around reusable foundations rather than a single high-risk rewrite. Shared tokens, component states, accessibility behavior, and platform parity were defined early. Individual journeys could then move into SwiftUI and Compose while the existing product continued to serve golfers.

This phased model also created a practical feedback loop. Each migrated area exposed gaps in the system, and those lessons improved the next component or journey instead of becoming isolated fixes.

## Working across platforms

Consistency did not mean forcing iOS and Android to look identical. The system kept core hierarchy, terminology, and task flow aligned while respecting native navigation, input, and accessibility expectations.

Regular cross-platform reviews helped the team distinguish intentional platform differences from accidental drift. Prototypes made the difficult conversations concrete: how a layout should reflow, which information deserved persistent space, and when a native convention was more useful than visual parity.

## Draft outcome

The placeholder outcome for this draft is a more maintainable product foundation: a clearer 3.x experience, a shared adaptive design language, and a migration path that lets the iOS and Android teams modernize without stopping feature delivery.

The final case study should replace this section with verified evidence such as migration coverage, delivery milestones, customer feedback, usability findings, or improvements to design and engineering throughput.

## Reflection

The most important lesson was that a platform migration is also a product-design decision. SwiftUI and Compose made adaptive interfaces possible, but the technology alone could not determine which relationships should remain stable as the screen changed.

By defining those relationships before polishing individual screens, the team could use the 3.x redesign to prepare Garmin Golf for more devices—not simply recreate version 2.x with newer code.
