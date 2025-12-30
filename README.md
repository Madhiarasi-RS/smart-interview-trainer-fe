# Smart Interview Trainer – Frontend

This repository contains the frontend application for the Smart Interview Trainer platform.

## Responsibilities
- User authentication UI
- Interview setup and flow screens
- Browser-based video & audio recording (WebRTC / MediaRecorder)
- Real-time behavioural feedback visualization via WebSockets
- AI scorecard and analytics dashboards

**Live Demo:** [Click here](https://smart-interview-trainer-fe.vercel.app/)


## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + MUI
- WebRTC / MediaRecorder API
- Redux / Zustand for global state
- WebSockets for real-time feedback
- Chart.js for score visualization

## Architecture Principles
- UI components never call APIs directly
- All API interactions go through service layers
- WebSocket logic is centralized using React Context
- Strong typing enforced across components, services, and state
- Follows `Smart-Interview-Trainer-Copilot-Instructions.md`

## Status
🚧 Initial setup in progress. Backend APIs will be integrated after contracts are finalized.
