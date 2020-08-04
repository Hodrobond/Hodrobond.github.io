---
title: Redesign
date: "2020-08-03T20:00:00.000Z"
description: Typescript, Lerna, Storybook!
---

Previously I was using this as a space to have some fun with Euler.

Might as well take some living notes of "Front End" in 2020.


### Original:

- [Jekyll](https://jekyllrb.com/)
- JS for Euler solutions

### Redesign:

- Gatsby (supports React)
- [Publish(ed|able) solutions](https://github.com/Hodrobond/eulertypescript)
  - [Typescript](https://www.typescriptlang.org/)
  - [Lerna](https://lerna.js.org/) in case math utils are inter-dependent
- [Blog Components](https://github.com/Hodrobond/BlogComponents)
  - [Typescript](https://www.typescriptlang.org/) as well
  - [Lerna](https://lerna.js.org/) because the components will be dependent on each other
  - [Storybook](https://storybook.js.org/) for easing development experience
