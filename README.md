# JSC Pair Generator

> Never Search Alone

A lightweight browser tool for randomly pairing JSC members for sessions. Click the chips above the button to select or deselect a member. Hit the button, get your pairs — no setup required. 

## What it does

- Randomly shuffles group  members and assigns them into pairs
- Handles the odd-one-out by forming a group of 3 when needed
- Displays each member's photo alongside their name
- Loads a shared links reference table from a Markdown file

## Instructions

1. Clone this repo
2. Change the member names in 

## Project structure

```
jsc/
├── index.html          # App shell
├── app.js              # Pairing logic and rendering
├── styles.css          # Styling
└── assets/
    ├── images/         # Member photos
    └── docs/
        └── links.md    # Shared links table (Markdown)
```

## Adding or updating members

Edit the `members` array and `memberImages` object at the top of [app.js](app.js), then drop the corresponding photo into `assets/images/`.

## Adding links

Edit [assets/docs/links.md](assets/docs/links.md). The table is sorted alphabetically by name automatically on load.
