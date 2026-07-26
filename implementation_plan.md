# iNSIGHTS — Phase-by-Phase Implementation Plan

> AI-Powered Research & Innovation Copilot for Students  
> *"Search Less. Solve More. with iNSIGHTS Layer 2."*

This plan turns the scaffolded monorepo into a fully working product, one demoable phase at a time. Each phase builds on the previous one and ends with a **demo checkpoint** — critical for hackathon judging.

---

## User Review Required

> [!IMPORTANT]
> **API Keys**: Phases 1–2 require working API keys for OpenAI, Tavily, arXiv, GitHub, and NewsAPI. Please confirm you have (or can obtain) these before we start Phase 1.

> [!IMPORTANT]
> **Database**: You'll need PostgreSQL running locally (e.g. installed via the [PostgreSQL installer](https://www.postgresql.org/download/windows/)) or a cloud-hosted instance (Supabase, Neon, etc.). Let me know which you prefer and I'll configure accordingly.

> [!WARNING]
> **Telegram Bot**: Phase 7 requires a Telegram Bot Token from [@BotFather](https://t.me/BotFather) and a publicly accessible URL (ngrok or deployed) for the webhook. This can be deferred if needed.

## Open Questions

1. **Authentication scope** — Should we implement full JWT auth with signup/login in Phase 0, or skip auth for the hackathon and add a mock user? (Recommendation: mock user for speed, add real auth in Phase 8 polish.)
2. **Tailwind version** — The scaffold uses Tailwind v3. Do you want to upgrade to Tailwind v4, or stick with v3?
3. **Deployment target** — Are you planning to deploy (Vercel + Railway/Render) for the hackathon demo, or run everything locally?
4. **WhatsApp vs Telegram** — PROJECT_CONTEXT.md mentions both. Telegram is far simpler (free bot API, no business verification). Should we go Telegram-only for the hackathon?
5. **PostgreSQL** — Do you want to use a local PostgreSQL install or a cloud-hosted DB (Supabase / Neon)?

---

## Phase 0 — Setup & Scaffolding ✅ (Partially Complete)

> **Goal**: Working dev environment with frontend shell, backend health check, and database connected.

### What's already done
- ✅ Monorepo scaffolded (35 dirs, 94 files)
- ✅ Python venv created at `insights/.venv/`
- ✅ Backend dependencies installed
- ✅ `.gitignore` updated (root + insights)

### Remaining work

---

#### Frontend Shell

##### [MODIFY] [package.json](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/package.json)
- Run `npm install` to generate `package-lock.json` and pull dependencies

##### [MODIFY] [App.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/App.tsx)
- Add a shared `<Layout>` wrapper component with Navbar + Sidebar around all routes
- Set up dark theme as default

##### [NEW] `frontend/src/components/layout/Navbar.tsx`
- App logo, nav links (Discovery, Workspace, Hub, Dashboard), user avatar placeholder

##### [NEW] `frontend/src/components/layout/Sidebar.tsx`
- Collapsible sidebar with project list and quick-action links

##### [NEW] `frontend/src/components/layout/Layout.tsx`
- Shell component that wraps Navbar + Sidebar + `<Outlet />`

##### [MODIFY] All page files (`Landing.tsx`, `Discovery.tsx`, etc.)
- Replace stubs with properly styled empty-state shells (consistent dark theme, heading, breadcrumb)

---

#### Backend Setup

##### [MODIFY] [main.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/main.py)
- Register all route routers (discovery, deepsearch, workspace, projecthub, resources, dashboard, agents)
- Add startup event to verify DB connection

##### [MODIFY] [db.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/core/db.py)
- Fix import paths (use relative imports for when running from `insights/` root)

##### [MODIFY] [config.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/core/config.py)
- Add `DATABASE_URL` direct override for local dev (localhost instead of Docker service name)
- Default `POSTGRES_HOST` to `localhost` instead of `postgres`

---

#### Database

##### Run [schema.sql](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/db/schema.sql) manually
- Connect to your Postgres instance and run `schema.sql` to create all 5 tables

---

#### Cleanup — Remove Docker Files

##### [DELETE] `docker-compose.yml`
##### [DELETE] `infra/docker/frontend.Dockerfile`
##### [DELETE] `infra/docker/backend.Dockerfile`

We won't use Docker. Services run locally:
- **Frontend**: `cd frontend && npm run dev` → `http://localhost:5173`
- **Backend**: `cd insights && uvicorn backend.app.main:app --reload` → `http://localhost:8000`
- **Postgres**: local install or cloud-hosted

---

#### Verification
- Frontend loads at `http://localhost:5173` with Navbar + Sidebar shell
- Backend health check at `http://localhost:8000/health` returns `{"status": "ok"}`
- PostgreSQL tables exist (check via `psql` or pgAdmin)

---

## Phase 1 — Problem Discovery & Validation

> **Goal**: User types a raw idea → gets back a validated, structured problem statement.  
> **Demo checkpoint**: Idea in → structured problem + feasibility out.

### AI Layer

##### [MODIFY] [openai_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/openai_client.py)
- Implement async OpenAI chat completion wrapper (GPT-4o)
- Support system/user message pairs, temperature control, JSON mode

##### [MODIFY] [discovery_graph.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/graphs/discovery_graph.py)
- Build LangGraph state machine with nodes:
  1. **parse_idea** — extract domain, target users, core problem from raw text
  2. **generate_clarifying_questions** — optional follow-up questions if idea is too vague
  3. **validate_feasibility** — assess technical feasibility, market need, novelty
  4. **structure_output** — produce structured JSON: `{ problem_statement, domain, target_users, feasibility_score, validation_summary, clarifying_questions }`

##### [NEW] `ai_layer/prompts/discovery_prompts.py`
- Prompt templates for each graph node

### Backend

##### [MODIFY] [discovery.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/discovery.py) (route)
- Accept `{ idea: string, user_id?: string }`, call discovery_graph, persist `Project` record, return structured result

##### [MODIFY] [discovery_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/discovery_service.py)
- Orchestrate: create project → run graph → update project with results → return

##### [NEW] `backend/app/schemas/discovery.py`
- Pydantic models: `DiscoverRequest`, `DiscoverResponse`, `ProblemStatement`

### Frontend

##### [MODIFY] [Discovery.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/Discovery.tsx)
- Full-page idea input with animated textarea, "Discover" CTA button
- Loading state with step-by-step progress indicators (parsing → validating → structuring)
- Result card: structured problem statement, feasibility score gauge, validation summary

##### [NEW] `frontend/src/components/discovery/IdeaInput.tsx`
- Large textarea with character count, example prompts, auto-resize

##### [NEW] `frontend/src/components/discovery/ValidationResult.tsx`
- Displays structured problem, feasibility score (radial gauge), domain tags, target users

##### [MODIFY] [projects.ts](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/api/projects.ts)
- Wire up `discoverIdea()` to the real endpoint with proper types

---

#### Verification
- Type "Build an AI solution to reduce food waste in college hostels" → receive structured problem statement with feasibility score
- Project record persisted in PostgreSQL `projects` table
- Re-loading the page shows the saved project

---

## Phase 2 — DeepSearch & Real-Time Web Intelligence

> **Goal**: Citation-backed multi-source research for the validated problem.  
> **Demo checkpoint**: DeepSearch returns a synthesized research summary with citations from web, papers, news, and GitHub.

### AI Layer — Integration Clients

##### [MODIFY] [tavily_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/tavily_client.py)
- Async Tavily search: `search(query, max_results, search_depth)` → list of `{title, url, snippet, score}`

##### [MODIFY] [arxiv_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/arxiv_client.py)
- Async arXiv search via Atom feed: `search(query, max_results)` → list of `{title, authors, abstract, url, published_date}`

##### [MODIFY] [github_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/github_client.py)
- Async GitHub search (repos + code): `search_repos(query)` → list of `{name, url, description, stars, language}`

##### [MODIFY] [newsapi_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/newsapi_client.py)
- Async NewsAPI top headlines + everything: `search(query)` → list of `{title, url, source, published_at, description}`

### AI Layer — DeepSearch Graph

##### [MODIFY] [deepsearch_graph.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/graphs/deepsearch_graph.py)
- LangGraph state machine:
  1. **generate_queries** — decompose problem into 3–5 targeted search queries
  2. **fan_out_search** — parallel calls to Tavily, arXiv, GitHub, NewsAPI
  3. **deduplicate** — merge and deduplicate results across sources
  4. **rag_synthesize** — GPT-4o synthesizes a structured research summary with inline citations
  5. **format_output** — produce `{ summary, sources[], key_findings[], citations[] }`

### AI Layer — RAG Pipeline

##### [MODIFY] [embeddings.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/rag/embeddings.py)
- OpenAI `text-embedding-3-small` wrapper

##### [MODIFY] [vector_store.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/rag/vector_store.py)
- In-memory FAISS store (lightweight for hackathon; swap to pgvector later if needed)

##### [MODIFY] [retriever.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/rag/retriever.py)
- Embed search results → store → retrieve top-k relevant chunks for synthesis

### Backend

##### [MODIFY] [deepsearch.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/deepsearch.py) (route)
- Accept `{ project_id }`, run deepsearch_graph as background task, return job ID or stream results via SSE

##### [MODIFY] [research_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/research_service.py)
- Orchestrate: fetch project → run deepsearch_graph → persist results in `research_workspaces` table → return

##### [NEW] `backend/app/schemas/research.py`
- Pydantic models: `DeepSearchRequest`, `DeepSearchResponse`, `Source`, `Citation`

### Frontend

##### [MODIFY] [Landing.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/Landing.tsx)
- Hero section with animated tagline, CTA to Discovery page
- Feature showcase cards (Discovery, DeepSearch, Project HUB, etc.)

##### [NEW] `frontend/src/pages/DeepSearch.tsx`
- New page (add route `/research/:projectId`)
- Shows research summary with expandable citation cards
- Source filtering by type (Web, Papers, GitHub, News)
- Real-time loading animation during search

##### [NEW] `frontend/src/components/deepsearch/CitationCard.tsx`
- Displays source title, snippet, URL, source type icon, relevance score

##### [NEW] `frontend/src/components/deepsearch/ResearchSummary.tsx`
- Rendered markdown summary with inline citation links

##### [MODIFY] [App.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/App.tsx)
- Add `/research/:projectId` route

---

#### Verification
- From a validated project → click "Run DeepSearch" → citation-backed research summary appears
- Sources include results from Tavily, arXiv, GitHub, NewsAPI
- Results persisted in `research_workspaces` table
- Each citation links back to the original source URL

---

## Phase 3 — Knowledge Clustering & Research Workspace

> **Goal**: Organize DeepSearch results into thematic clusters + identify research gaps.  
> **Demo checkpoint**: User sees clustered research + innovation opportunities.

### AI Layer

##### [MODIFY] [clustering_graph.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/graphs/clustering_graph.py)
- LangGraph state machine:
  1. **extract_themes** — identify 4–7 thematic categories from DeepSearch results
  2. **assign_clusters** — classify each source/finding into a cluster
  3. **generate_cluster_summaries** — per-cluster mini-summaries
  4. **output** — `{ clusters[]: { name, summary, sources[], key_insights[] } }`

##### [MODIFY] [gap_analysis_graph.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/graphs/gap_analysis_graph.py)
- LangGraph state machine:
  1. **map_existing_solutions** — identify and categorize existing solutions from clusters
  2. **compare_approaches** — strengths/weaknesses matrix
  3. **detect_gaps** — what's missing, underserved, or unsolved
  4. **surface_opportunities** — actionable innovation opportunities ranked by impact
  5. **output** — `{ existing_solutions[], comparison_matrix, gaps[], opportunities[] }`

### Backend

##### [MODIFY] [workspace.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/workspace.py) (route)
- CRUD: `GET /workspace/:projectId`, `POST /workspace/:projectId/cluster`, `PUT /workspace/:projectId/notes`
- `POST /workspace/:projectId/gap-analysis` — triggers gap analysis

##### [MODIFY] [clustering_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/clustering_service.py)
- Orchestrate clustering + gap analysis graphs, persist results

##### [NEW] `backend/app/schemas/workspace.py`
- Pydantic models for clusters, gaps, workspace notes

### Frontend

##### [MODIFY] [Workspace.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/Workspace.tsx)
- Split-pane layout: clusters on left, detail view on right
- Cluster visualization (interactive tree or grouped cards)
- Notes editor (rich text or markdown)
- Gap analysis panel with innovation opportunity cards

##### [NEW] `frontend/src/components/workspace/ClusterView.tsx`
- Interactive cluster cards with expand/collapse, source count badges

##### [NEW] `frontend/src/components/workspace/GapAnalysis.tsx`
- Comparison matrix table, gap cards, opportunity cards with impact scores

##### [NEW] `frontend/src/components/workspace/NotesEditor.tsx`
- Simple markdown editor for user annotations

---

#### Verification
- DeepSearch results automatically clustered into 4–7 themes
- Each cluster shows a summary + list of contributing sources
- Gap analysis produces existing-solution comparison + innovation opportunities
- User can add/edit notes in the workspace

---

## Phase 4 — Project HUB (Planning & Roadmap Generation)

> **Goal**: Generate a full project plan: architecture, tech stack, milestones, timeline.  
> **Demo checkpoint**: User gets an implementation-ready project plan from their original idea.

### AI Layer

##### [MODIFY] [roadmap_graph.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/graphs/roadmap_graph.py)
- LangGraph state machine:
  1. **analyze_requirements** — derive functional/non-functional requirements from problem + research
  2. **recommend_architecture** — system architecture (components, data flow, deployment)
  3. **recommend_tech_stack** — technology choices with justifications
  4. **generate_milestones** — 4–8 milestones with deliverables and estimated duration
  5. **build_timeline** — Gantt-style timeline with dependencies
  6. **output** — `{ requirements, architecture, tech_stack, milestones[], timeline }`

### Backend

##### [MODIFY] [projecthub.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/projecthub.py) (route)
- `POST /projecthub/generate` — triggers roadmap generation
- `GET /projecthub/:projectId` — returns stored roadmap

##### [MODIFY] [projecthub_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/projecthub_service.py)
- Orchestrate roadmap_graph, persist to project.roadmap JSONB column

##### [NEW] `backend/app/schemas/projecthub.py`
- Pydantic models for requirements, architecture, milestones, timeline

### Frontend

##### [MODIFY] [ProjectHub.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/ProjectHub.tsx)
- Tab layout: Requirements | Architecture | Tech Stack | Roadmap
- Interactive milestone timeline (vertical stepper or horizontal Gantt)
- Architecture diagram (rendered from Mermaid or custom SVG)
- Tech stack cards with justification tooltips

##### [NEW] `frontend/src/components/projecthub/MilestoneTimeline.tsx`
- Visual timeline with milestone cards, durations, status indicators

##### [NEW] `frontend/src/components/projecthub/ArchitectureDiagram.tsx`
- Renders system architecture (Mermaid.js or custom SVG)

##### [NEW] `frontend/src/components/projecthub/TechStackCards.tsx`
- Grid of technology recommendation cards with icons and justifications

---

#### Verification
- Generate roadmap for a validated project → 4–8 milestones with timeline
- Architecture diagram renders correctly
- Tech stack recommendations have justifications
- All data persisted in `projects.roadmap` JSONB column

---

## Phase 5 — Smart Resource Recommendation

> **Goal**: Ranked GitHub repos, papers, APIs, datasets, and learning resources for each project.  
> **Demo checkpoint**: Project shows curated resource recommendations.

### AI Layer

##### [MODIFY] [github_recommender.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/recommenders/github_recommender.py)
- Use GitHub API search + GPT scoring to rank repos by relevance to project

##### [MODIFY] [papers_recommender.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/recommenders/papers_recommender.py)
- Use arXiv results + GPT to rank and summarize relevant papers

##### [MODIFY] [api_dataset_recommender.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/recommenders/api_dataset_recommender.py)
- Use Tavily + GPT to find and rank relevant APIs and datasets

##### [MODIFY] [learning_resource_recommender.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/recommenders/learning_resource_recommender.py)
- Use Tavily to find tutorials, courses, and documentation; GPT ranks by relevance

### Backend

##### [MODIFY] [resources.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/resources.py) (route)
- `POST /resources/:projectId/generate` — triggers recommendation engine
- `GET /resources/:projectId` — returns stored recommendations by type

##### [MODIFY] [recommendation_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/recommendation_service.py)
- Orchestrate all 4 recommenders, persist to `resources` table

##### [NEW] `backend/app/schemas/resources.py`
- Pydantic models for each resource type

### Frontend

##### [NEW] `frontend/src/pages/Resources.tsx`
- Tabbed view: GitHub | Papers | APIs & Datasets | Learning Resources
- Add route `/resources/:projectId`

##### [NEW] `frontend/src/components/resources/ResourceCard.tsx`
- Reusable card: title, description, relevance score, external link, type icon

##### [MODIFY] [ProjectHub.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/ProjectHub.tsx)
- Add inline resource recommendations within the roadmap view

---

#### Verification
- Each resource type returns 5–10 ranked results
- GitHub repos show stars, language; papers show authors, abstract; APIs show description
- Resources persisted in `resources` table with `resource_type` categorization

---

## Phase 6 — Personalized Dashboard

> **Goal**: One-glance summary of the entire project lifecycle.  
> **Demo checkpoint**: Dashboard shows aggregated project data with visual indicators.

### Backend

##### [MODIFY] [dashboard.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/dashboard.py) (route)
- `GET /dashboard/:projectId` — aggregates: validation status, research completeness, cluster count, roadmap progress, resource counts
- `GET /dashboard/overview` — multi-project summary (if time allows)

##### [NEW] `backend/app/schemas/dashboard.py`
- Pydantic models for dashboard aggregation

### Frontend

##### [MODIFY] [Dashboard.tsx](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/frontend/src/pages/Dashboard.tsx)
- Project overview card (idea, domain, feasibility score)
- Progress pipeline (Discovery → Research → Clusters → Roadmap → Resources) with completion status
- Stats widgets: sources found, clusters created, milestones planned, resources recommended
- Quick-links back into each module
- Charts (simple bar/donut using lightweight chart lib or pure CSS)

##### [NEW] `frontend/src/components/dashboard/ProgressPipeline.tsx`
- Horizontal stepper showing which phases are complete

##### [NEW] `frontend/src/components/dashboard/StatsGrid.tsx`
- Grid of metric cards with icons and counts

##### [NEW] `frontend/src/components/dashboard/ProjectOverviewCard.tsx`
- Hero card with project name, idea, domain tags, feasibility gauge

---

#### Verification
- Dashboard accurately reflects all data generated in Phases 1–5
- Progress pipeline shows correct completion states
- Stats match actual database records

---

## Phase 7 — AI Agents (Telegram Bot)

> **Goal**: Telegram bot for reminders, progress tracking, and project Q&A.  
> **Demo checkpoint**: User receives a Telegram message and can chat about their project.

### AI Layer

##### [MODIFY] [telegram_client.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/ai_layer/integrations/telegram_client.py)
- Thin async client: `send_message(chat_id, text)`, `set_webhook(url)`, `parse_update(payload)`

### Backend

##### [MODIFY] [agents.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/api/routes/agents.py) (route)
- `POST /agents/telegram/webhook` — handles incoming Telegram updates
- Parse commands: `/start`, `/status`, `/remind`, `/ask <question>`

##### [MODIFY] [agent_service.py](file:///c:/Users/Lakshay/Desktop/Projects/Kairo%20AI/insights/backend/app/services/agent_service.py)
- Link Telegram chat to a user/project
- `/status` — fetch project progress from dashboard aggregation
- `/remind` — schedule milestone reminders (use APScheduler or simple in-memory scheduler)
- `/ask` — RAG-powered Q&A against stored project data (problem statement, research, roadmap)
- Persist conversation in `chat_sessions` table

### Frontend

- Add a "Connect Telegram" button on Dashboard (generates a deep link to the bot with project ID)

### Local Development

- Use [ngrok](https://ngrok.com/) to expose `localhost:8000` for the Telegram webhook:
  ```bash
  ngrok http 8000
  ```
- Set webhook URL via Telegram API to `https://<ngrok-url>/agents/telegram/webhook`

---

#### Verification
- `/start` in Telegram → bot responds with welcome message
- `/status` → returns current project progress summary
- `/ask What tech stack should I use?` → answers from stored project data
- Conversations persisted in `chat_sessions` table

---

## Phase 8 — Polish, Integration Testing & Demo Prep

> **Goal**: End-to-end flow works flawlessly, UI is polished, demo project is seeded.

### End-to-End Integration
- Full flow test: idea → discovery → deepsearch → clustering/gaps → roadmap → resources → dashboard → telegram agent
- Fix any broken data handoffs between phases
- Add proper error handling, loading states, and empty states across all pages

### UI Polish
- Dark theme consistency pass across all pages
- Responsive layout check (desktop + tablet minimum)
- Micro-animations: page transitions, card reveals, loading skeletons
- Typography: integrate Google Fonts (Inter or similar)
- Glassmorphism accents on key cards/panels

### Demo Preparation
- Seed the "AI solution to reduce food waste in college hostels" example as a complete project
- Pre-generate all AI outputs so live demo doesn't depend on API latency
- Prepare fallback cached responses for unreliable API calls

### Documentation
- Export presentation-ready documentation from Project HUB (PDF or markdown)
- Update `README.md` with setup instructions, screenshots, architecture diagram

---

## Phase 9 — Stretch Goals (Time Permitting)

Implement in priority order:

| # | Feature | Builds on | Effort |
|---|---------|-----------|--------|
| 1 | **AI Innovation Score** | Gap analysis output → scoring model (novelty/feasibility/impact) | Low |
| 2 | **AI Memory & Learning Graph** | Cross-project persistent memory of explored topics | Medium |
| 3 | **Patent Search & Gap Analysis** | Extend gap_analysis_graph with patent search API | Medium |
| 4 | **AI Project Twin** | Digital twin tracking project state over time | High |
| 5 | **Resource Cost Estimator** | Cost estimation layer over recommended APIs/infra | Medium |

---

## How to Run (No Docker)

```bash
# Terminal 1 — Backend
cd insights
.venv\Scripts\activate
uvicorn backend.app.main:app --reload --port 8000

# Terminal 2 — Frontend
cd insights/frontend
npm run dev

# PostgreSQL — must be running separately
# Either local install or cloud-hosted (Supabase / Neon)
```

---

## Verification Plan

### Automated Tests
```bash
# Backend unit tests
cd insights
python -m pytest backend/tests/ -v

# Frontend build check
cd insights/frontend
npm run build
```

### Manual Verification (per phase)
- Each phase has a "Demo checkpoint" — verify that specific user flow works end-to-end
- Check PostgreSQL for persisted records after each AI operation
- Verify API responses match Pydantic schemas (FastAPI auto-validates)

### Integration Test (Phase 8)
- Complete end-to-end walkthrough: idea → all phases → dashboard → Telegram bot
- Seed demo project and verify all views render correctly
