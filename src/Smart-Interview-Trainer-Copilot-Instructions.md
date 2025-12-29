This project strictly follows Smart-Interview-Trainer-Copilot-Instructions.md.

Smart Interview Trainer – Copilot Instructions

For GitHub Copilot (VS Code)

Purpose

This document defines strict engineering, architectural, UX, and real-time interaction rules for the Smart Interview Trainer platform.

The goal is to ensure that all generated code is:

Production-ready

Strongly typed

Scalable

Suitable for AI-driven, real-time interview feedback systems

Rule:
If generated code violates this document, it is not acceptable.

PART A — FRONTEND ENGINEERING RULES (STRICT)
1. Language & Type Safety (Non-Negotiable)

All frontend code must be written in TypeScript

strict: true must be enabled in tsconfig.json

❌ any is strictly forbidden

Use unknown if necessary

Explicit typing required for:

Component props

State

API responses

Context values

WebSocket payloads

Centralized types only:

src/types/
src/interfaces/

2. State Management Rules

Global state → Redux or Zustand

Local UI state → React state only

❌ Do NOT use global state for:

Modals

Toggles

Timers

Temporary UI flags

Redux rules:

Slice-based architecture

Serializable state only

Persistence only for auth & interview session metadata

3. API Layer Separation (Hard Rule)

🚨 UI components must never call APIs directly

All API calls must exist inside:

src/services/


Rules:

Services expose typed methods

Components consume service methods only

No Axios / fetch inside components

4. Styling Rules

Allowed only:

Tailwind CSS

MUI (Material UI)

❌ Not allowed:

styled-components

random CSS files

inline styles (except unavoidable cases)

Use Tailwind for:

Layout

Spacing

Responsiveness

Typography

Use MUI for:

Inputs

Dialogs

Tables

Forms

5. Component Architecture

Components must:

Follow single-responsibility principle

Be reusable

Be readable

Rules:

❌ No component > 300 lines

Prefer container + presentational split

No business logic inside UI components

Recommended structure:

components/
  ├── interview/
  ├── feedback/
  ├── charts/
  └── ui/

6. Hooks Rules

Custom hooks must start with use

Hooks must never return JSX

Side effects must live in useEffect

Dependency arrays must be correct and complete

7. WebSocket & Real-Time Rules (Critical)

All WebSocket logic must live in React Context

❌ Never initialize sockets inside components

src/context/
  └── SocketContext.tsx


Context must handle:

Connection lifecycle

Reconnection

Cleanup on unmount

Typed event handling

8. Error Handling & UX

No silent failures

All API & socket errors must:

Show user feedback (toast / banner)

Be logged appropriately

Use centralized error handling utilities

9. Performance Rules

Lazy-load heavy components (charts, video review)

Use useMemo / useCallback only when justified

Avoid unnecessary re-renders in live interview sessions

PART B — INTERVIEW-SPECIFIC UX RULES
1. Real-Time Behaviour Feedback (Core Feature)

Allowed:

Subtle visual prompts

Icon highlights

Color pulses

Textual cues:

“Slow Down”

“Be Clear”

“Stay on Topic”

Rules:

Feedback must be:

Non-blocking

Minimal

Context-aware

❌ No flashing or disruptive animations

Animation duration ≤ 300ms

2. Interview Experience Design

Professional interview-style UI

Clear focus on:

Webcam

Question

Timer

Feedback cues

No clutter during interview session

One primary action per screen

3. Accessibility & Usability

Keyboard accessible

Clear contrast ratios

Readable font sizes

Avoid distracting motion

Accessibility is important, but this is not an ASD-first product.

4. Content Language Rules

Clear, professional language

Avoid slang

Use short, actionable feedback messages

Avoid overly verbose explanations during live interview

PART C — CODE QUALITY & TOOLING
1. Linting & Formatting

ESLint + Prettier mandatory

No lint warnings allowed

Naming conventions:

camelCase → variables & functions

PascalCase → components

2. File & Folder Discipline

No unused files

No dead code

No commented-out logic

Group by feature, not by type

FINAL RULE

If the code does not support real-time AI feedback, clean architecture, and interview realism, it does not belong in this project.