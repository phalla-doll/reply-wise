# ReplyWise — Inline AI Comment Generator

*(LinkedIn Native Integration Version)*

---

# 1. Product Overview

## Vision

A Chrome extension that generates high-quality, thoughtful LinkedIn comments directly inside the comment input toolbar — positioned next to the emoji picker — and feels completely native.

No floating hacks.
No intrusive overlays.
Native-feeling enhancement.

---

# 2. UX Behavior (Inline Integration)

## Placement

Inside LinkedIn comment editor toolbar:

```
[ 😊 ] [ ✦ ]
```

* Same size as emoji button (≈32px)
* Circular
* Perfect vertical alignment
* Subtle hover state

---

## Interaction Flow

1. User focuses comment box
2. AI button appears next to emoji
3. User clicks ✦
4. Compact popover opens above input
5. User selects tone & length
6. Clicks Generate
7. AI returns comment
8. User clicks Insert
9. Text populates in textarea properly (LinkedIn detects it)

---

# 3. UI Design — Modern Vercel Style (Compact)

## Button Style

* 32px x 32px
* Border-radius: 50%
* Transparent background
* Subtle hover glow
* Minimal spark SVG icon

---

## Popover Layout

```
┌─────────────────────────┐
│ ✦ CommentForge          │
│ Tone: Professional ▼    │
│ Length: Medium ▼        │
│                         │
│ [ Generate ]            │
│                         │
│ ────────────────────    │
│ Generated text here...  │
│                         │
│ [ Insert ] [ Retry ]    │
└─────────────────────────┘
```

### Dimensions

* Width: 340–380px
* Rounded: 16px
* Dark background
* Subtle border
* Soft shadow
* Smooth 150ms scale-in animation

---

## Visual System

### Colors

* Background: `#11161C`
* Border: `rgba(255,255,255,0.06)`
* Text Primary: `#F5F7FA`
* Text Muted: `#8B949E`
* Accent: `#4F8CFF`

---

# 4. Technical Architecture

## Stack (Recommended)

* React
* TypeScript
* TailwindCSS
* Zustand (state)
* Vite
* CRXJS
* Manifest V3
* Shadow DOM (for popover only)

Hybrid approach:

* Native inline button (no Shadow DOM)
* React popover inside Shadow DOM

---

# 5. Extension Structure

```
src/
 ├─ background/
 │   └─ aiService.ts
 ├─ content/
 │   ├─ observer.ts
 │   ├─ editorInjector.ts
 │   ├─ aiButton.ts
 │   ├─ popoverMount.tsx
 │   ├─ platformParser.ts
 │   └─ domUtils.ts
 ├─ ui/
 │   ├─ Panel.tsx
 │   ├─ Controls.tsx
 │   ├─ Output.tsx
 │   └─ useStore.ts
 ├─ lib/
 │   ├─ promptBuilder.ts
 │   └─ storage.ts
 └─ manifest.json
```

---

# 6. Core Engineering Strategy

## 1. Detect Comment Editors

* Use `MutationObserver`
* Detect when comment textarea is mounted
* Avoid scanning entire DOM repeatedly
* Throttle observer

---

## 2. Inject AI Button

Locate emoji button:

```ts
const emojiButton = container.querySelector('[aria-label="Add an emoji"]')
emojiButton.parentElement.appendChild(aiButton)
```

Best practices:

* Add fallback selectors
* Use WeakMap to track injected editors
* Prevent duplicate injection

---

## 3. Popover Behavior

* Anchored to comment input
* Close on outside click
* Close on ESC
* Auto-focus first control
* Animate in/out smoothly

---

## 4. Insert Generated Text Properly

LinkedIn uses controlled inputs.

After setting value:

```ts
textarea.value = generatedText
textarea.dispatchEvent(new Event('input', { bubbles: true }))
```

Without dispatching input event, LinkedIn won’t detect the change.

---

# 7. AI Prompt Structure

## System

```
You are an expert LinkedIn engagement strategist.
```

## User

```
Post:
"{POST_CONTENT}"

User Profile:
Role: {role}
Industry: {industry}
Style: {style}
Expertise: {keywords}

Tone: {tone}
Length: {length}

Write a high-value LinkedIn comment that:
- Adds unique insight
- Avoids generic praise
- Sounds human
- Encourages discussion
```

---

# 8. Settings (Extension Popup)

* API Key input
* Default tone
* Default length
* Daily usage counter
* Toggle auto-detect

Stored using:

```
chrome.storage.local
```

---

# 9. Edge Cases to Handle

* Multiple comment editors open
* Nested comments
* Feed page vs post page
* Dynamic re-renders
* Detached nodes

Use:

* WeakMap for editor tracking
* Clean up listeners on node removal
* Debounced observer

---

# 10. AI-Agent Build Prompt (Paste into Cursor)

```
Build a Chrome Extension (Manifest V3) called "CommentForge".

Goal:
Inject an AI comment generator button directly inside the LinkedIn comment input toolbar, positioned next to the emoji picker button, matching its size and alignment.

Tech Stack:
- React
- TypeScript
- TailwindCSS
- Zustand
- Vite
- CRXJS
- Shadow DOM for popover only

Requirements:

1. Use MutationObserver to detect dynamically rendered comment editors.
2. Locate emoji button inside the comment toolbar.
3. Inject a circular AI button (32px) beside it.
4. The button must visually match LinkedIn native controls.
5. When clicked:
   - Extract post content associated with the comment box.
   - Open a small anchored popover above the comment field.
6. Popover must:
   - Dark Vercel-style UI
   - Tone selector
   - Length selector
   - Generate button
   - Display result
   - Insert into textarea
7. Use chrome.storage for API key storage.
8. Dispatch proper input events so LinkedIn detects changes.
9. Use WeakMap to prevent duplicate injections.
10. Optimize performance and avoid excessive DOM scanning.

Structure platform-specific logic modularly.
```

---

# 11. Build Level Decision

### If This Is Just an Experiment

* Ship LinkedIn only
* BYO API key
* No backend
* No auth

### If This Is SaaS Direction

* Central API proxy
* Usage tracking
* Comment scoring
* Multi-platform support
* Subscription model

---
