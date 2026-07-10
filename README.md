# Obsidian: AI Governance & Cost Audit Platform - Comprehensive Analysis

## 1. PROJECT OVERVIEW

### What does this project do?
Obsidian is a modern, full-stack AI governance platform that provides audit trails, cost control, compliance monitoring, and trust scoring for LLM applications. It enables organizations to:
- Track every LLM query decision with complete audit trails
- Control costs by enforcing budget limits at global and agent-specific levels
- Monitor compliance by blocking queries that violate sensitive data policies or jailbreak attempts
- Optimize routing by automatically switching to cheaper models when cost escalation is detected
- Measure trust with a 0-100 trust score based on compliance, efficiency, and recall accuracy
- Isolate agents with completely independent budgets and event logs

### What problem does it solve?
Organizations using LLMs face challenges with:
- **Cost control**: Unregulated LLM usage can lead to unexpected costs
- **Compliance**: Ensuring queries don't violate data privacy policies (GDPR, etc.)
- **Transparency**: Lack of audit trails for LLM decisions
- **Trust**: Difficulty measuring the reliability and efficiency of LLM agents

### Who is it for?
- AI engineering teams building LLM-powered applications
- DevOps/SRE teams responsible for cost management and compliance
- Organizations needing audit trails for regulatory purposes
- Teams managing multiple AI agents with different use cases

---

## 2. TECH STACK

### Backend
| Technology | Purpose | Reason for Selection |
|------------|---------|---------------------|
| **Python** | Primary backend language | Industry standard for AI/ML applications, rich ecosystem |
| **FastAPI** | Web framework for API | High performance, async support, automatic OpenAPI docs, type safety via Pydantic |
| **Uvicorn** | ASGI server | Fast, production-grade ASGI server for FastAPI |
| **Cascadeflow** | Policy enforcement and budget tracking | Purpose-built for AI governance with enforce mode, budget tracking, and compliance checks |
| **Groq (via OpenAI SDK)** | LLM inference | Fast inference with OpenAI-compatible API, cost-effective |
| **Hindsight (optional)** | Semantic memory layer | Provides semantic search and reasoning over audit history |
| **Pydantic** | Data validation | Type-safe data models, automatic request/response validation |
| **python-dotenv** | Environment management | Loads environment variables from .env file |

### Frontend
| Technology | Purpose | Reason for Selection |
|------------|---------|---------------------|
| **Next.js 15** | React framework with App Router | Full-stack React framework, built-in API routes, server components, optimized performance |
| **React 19** | UI library | Industry-standard, hooks-based, rich ecosystem |
| **TypeScript** | Static type checking | Improved code quality, better developer experience, catch errors early |
| **Tailwind CSS** | Utility-first CSS framework | Rapid styling, consistent design, responsive layouts |
| **Recharts** | Composable charting library | Flexible, customizable charts for data visualization |
| **Framer Motion** | Animation library | Smooth UI transitions, improved user experience |
| **Lucide React** | Icon library | Consistent, modern icons |
| **OGL** | WebGL library (for visual effects) | High-performance 3D rendering |

---

## 3. PROJECT STRUCTURE

```
Obsidian/
├── backend/
│   ├── main.py                          # FastAPI app with all endpoints
│   ├── obsidian_core.py                 # Core logic, LLM routing, budget enforcement
│   ├── hindsight_store.py               # Event storage and Hindsight integration
│   ├── settings_store.py                # Global settings management
│   ├── slack_alerts.py                  # Slack notification integration
│   ├── agent_profiles.py                # Agent profile definitions
│   ├── simulation_runner.py             # Simulation runner for testing
│   ├── generate_data.py                 # Script to generate synthetic data
│   ├── fix_insights.py                  # Script to generate insights offline
│   ├── simple_server.py                 # Minimal server for demo (no cascadeflow)
│   ├── test_remediation.py              # Tests for remediation logic
│   ├── obsidian_events_store.json       # Persistent event log
│   ├── requirements.txt                 # Python dependencies
│   ├── README.md                        # Backend documentation
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/[...path]/route.ts   # Next.js API proxy to backend
│   │   │   ├── dashboard/               # All dashboard pages
│   │   │   │   ├── page.tsx             # Dashboard overview
│   │   │   │   ├── analytics/           # Analytics page
│   │   │   │   ├── events/              # Events audit trail
│   │   │   │   ├── health/              # System health
│   │   │   │   ├── insights/            # Insights and recommendations
│   │   │   │   ├── platform/            # Platform settings
│   │   │   │   ├── query/               # Query testing interface
│   │   │   │   ├── session/             # Session management
│   │   │   │   ├── settings/            # Global settings
│   │   │   │   └── trust-score/         # Trust score calculator
│   │   │   │   └── layout.tsx           # Dashboard layout
│   │   │   ├── page.tsx                 # Landing page
│   │   │   ├── layout.tsx               # Root layout
│   │   │   └── globals.css              # Global styles
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── DashboardContext.tsx     # Global state management
│   │   │   ├── DashboardNavbar.tsx      # Navigation bar
│   │   │   ├── Sidebar.tsx              # Sidebar navigation
│   │   │   ├── TopNavbar.tsx            # Top navigation bar
│   │   │   ├── Toast.tsx                # Toast notifications
│   │   │   └── Ferrofluid.tsx           # 3D background effect
│   │   └── lib/
│   │       ├── api.ts                   # API client and type definitions
│   │       └── currency.ts              # Currency formatting utilities
│   ├── next.config.ts                   # Next.js configuration
│   ├── tailwind.config.ts               # Tailwind CSS configuration
│   ├── postcss.config.js                # PostCSS configuration
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── package.json                     # Node.js dependencies
│   ├── package-lock.json
│   └── .gitignore
└── README.md                            # Project overview
```

### Key Directories and Files:
- **backend/main.py**: FastAPI application defining all API endpoints
- **backend/obsidian_core.py**: Core logic including LLM routing, budget enforcement, and category classification
- **backend/hindsight_store.py**: Event storage, escalation pattern detection, and Hindsight integration
- **frontend/src/app/dashboard/**: All dashboard pages with different functionality
- **frontend/src/components/DashboardContext.tsx**: Global state management for the dashboard
- **frontend/src/lib/api.ts**: API client with TypeScript types for all backend endpoints

---

## 4. ARCHITECTURE & WORKFLOW

### High-Level Architecture
Obsidian follows a **client-server architecture** with:
- A FastAPI backend serving REST APIs
- A Next.js frontend with App Router
- Optional Hindsight semantic memory layer
- In-memory and JSON-based persistence (for demo purposes)

### Data/Request Flow
1. **User submits a query** via frontend or direct API call
2. **FastAPI endpoint** (`POST /query`) receives the request
3. **Query is classified** into one of four categories: `order_status`, `refund`, `sensitive_data`, `general_faq`
4. **Compliance checks** are performed (PII detection, jailbreak prevention)
5. **Budget check** is enforced via Cascadeflow
6. **Model is selected** based on routing policy (category-based or single-model)
7. **LLM inference** is performed via Groq API
8. **Audit event** is logged to in-memory store and persisted to JSON
9. **Escalation pattern detection** runs (every 10 events)
10. **Auto-remediation** applies routing fixes if needed
11. **Response is returned** to the user with audit details

### Typical User Action Lifecycle (Query Submission)
1. User navigates to Dashboard > Query page
2. User enters a query and selects an agent (optional)
3. Frontend sends `POST /api/query` (proxied to backend)
4. Backend processes the query as described above
5. Frontend displays the response, audit event, and budget summary
6. New event appears in the Events page in real-time (via polling)
7. Insights are updated based on the new audit trail

---

## 5. PIPELINE / BUILD / DEPLOYMENT

### Build Process
- **Backend**: No build step needed (Python is interpreted)
- **Frontend**: 
  - `npm run dev`: Starts development server with hot reload
  - `npm run build`: Creates optimized production build
  - `npm start`: Starts production server

### Deployment
The project doesn't include a formal CI/CD pipeline, but typical deployment would involve:
1. **Backend**: Deploy as a FastAPI app on platforms like AWS EC2, ECS, or Render
2. **Frontend**: Deploy as a Next.js app on Vercel, Netlify, or similar
3. **Environment Variables**: Configure `.env` file with Groq API key and other settings
4. **Persistence**: For production, replace JSON file with a proper database (PostgreSQL, MongoDB, etc.)

### Environment Configuration
Required environment variables (backend):
- `GROQ_API_KEY`: Groq API key (required)
- `USE_HINDSIGHT`: Set to "true" to enable Hindsight integration (optional)
- `HINDSIGHT_URL`: Hindsight container URL (default: http://localhost:8888)
- `DEMO_BUDGET`: Per-session budget cap (default: 1.00)
- `EXPENSIVE_COST_THRESHOLD`: Cost threshold for escalation detection (default: 0.006)

---

## 6. FEATURE-BY-FEATURE BREAKDOWN

### 1. Multi-Agent Isolation
**What it does**: Each agent operates in complete isolation with its own budget, event log, and routing policy.

**How it works**:
- `_active_ctxs` dictionary in `obsidian_core.py` stores separate `HarnessRunContext` per agent
- `_agent_event_store` in `hindsight_store.py` maintains isolated event lists
- Hindsight uses separate banks per agent: `f"obsidian-{agent_id}"`
- Endpoints accept optional `agent_id` parameter (defaults to "default" for backward compatibility)

**Design decisions**:
- Backward compatibility maintained by keeping "default" agent
- Thread-safe access via locks (`_session_lock`, `_agent_lock`)
- Isolation proven via separate endpoints like `/agents/{id}/reset`

**Dependencies**:
- `obsidian_core.py`: Session management
- `hindsight_store.py`: Event storage
- `main.py`: API endpoints

---

### 2. Real-Time Audit Trail
**What it does**: Every query through Obsidian is logged with rich metadata including timestamp, category, model used, cost, latency, and action taken.

**How it works**:
- `store_event()` in `hindsight_store.py` persists events
- Events are stored in-memory and written to `obsidian_events_store.json`
- `GET /events` endpoint retrieves events (filterable by agent_id)
- Frontend polls every 15 seconds for updates

**Key code**:
```python
# hindsight_store.py - store_event()
record = {
    "timestamp_ms": audit_event.get("timestamp_ms", time.time() * 1000),
    "category": category,
    "agent_id": agent_id,
    "audit_event": audit_event,
}
```

**Design decisions**:
- JSON persistence for simplicity (demo purposes)
- Polling instead of WebSockets for simplicity
- Events sorted by timestamp for chronological view

---

### 3. Cost Governance
**What it does**: Enforces budget limits, tracks costs in real-time, and provides ROI analytics.

**How it works**:
- Cascadeflow's `HarnessRunContext` tracks accumulated cost
- `BudgetExceededError` is raised when budget is exhausted
- `GET /roi` endpoint calculates actual vs baseline costs
- Auto-remediation switches categories to cheaper models when escalation is detected

**Key code**:
```python
# obsidian_core.py - budget enforcement
cascadeflow.init(mode="enforce")
# ...
ctx = _ensure_session(agent_id)
_current_run.set(ctx)  # Re-register persistent context
```

**Design decisions**:
- Persistent `HarnessRunContext` per agent to maintain budget across requests
- Auto-remediation applies only to non-sensitive categories
- ROI baseline uses most expensive single-query cost in history

---

### 4. Compliance & Policy Enforcement
**What it does**: Blocks queries containing PII, detects jailbreak attempts, and enforces category-based policies.

**How it works**:
- Pre-flight checks in `run_query()` before LLM inference
- Regex-based PII detection (SSN patterns)
- Keyword-based jailbreak detection
- Strict sensitive data blocking option

**Key code**:
```python
# obsidian_core.py - compliance checks
if settings.piiDetection:
    if re.search(r'\b\d{3}-\d{2}-\d{4}\b', query) or "ssn" in query.lower():
        raise HarnessStopError("PII detected in query. Blocked by compliance guardrail.")
```

**Design decisions**:
- Pre-flight checks to avoid incurring LLM costs for blocked queries
- Simple regex/keyword-based detection for performance
- Policy stops raise `HarnessStopError` which is caught and returned to user

---

### 5. Trust Score
**What it does**: Calculates a 0-100 trust score for each agent based on compliance, cost efficiency, and recall accuracy.

**How it works**:
- **Compliance score (40%)**: % of events that passed policy checks
- **Cost efficiency score (30%)**: How close actual average cost is to cheapest model
- **Recall accuracy score (30%)**: Hindsight's ability to recall past query details

**Key code**:
```python
# hindsight_store.py - compute_trust_score()
composite = round(
    0.40 * compliance_score +
    0.30 * cost_efficiency_score +
    0.30 * recall_accuracy_score,
    1,
)
```

**Design decisions**:
- Recall accuracy tested by asking Hindsight about a known past event
- Neutral 50 score for recall if Hindsight is disabled or no events exist
- Transparent formula shown to users in the UI

---

### 6. Rich Frontend Dashboard
**What it does**: Provides a modern, responsive UI with live metrics, charts, and deep-dive pages.

**How it works**:
- Next.js App Router for page routing
- React Context (`DashboardContext`) for global state
- Recharts for data visualization
- Framer Motion for animations
- Polling every 15 seconds for real-time updates

**Key components**:
- `DashboardContext.tsx`: Manages global state and polling
- `api.ts`: API client with TypeScript types
- Various page components for each dashboard section

---

## 7. DATA FLOW & STATE MANAGEMENT

### Backend Data Storage
1. **In-memory stores**:
   - `_event_store`: Legacy category-keyed store (backward compatibility)
   - `_agent_event_store`: Per-agent isolated event store
   - `_active_ctxs`: Per-agent Cascadeflow contexts
   - `_routing_policy`: Current routing policy

2. **Persistence**:
   - `obsidian_events_store.json`: JSON file for persisting events
   - Loaded on startup via `_load_initial_events()`
   - Saved after each event via `_persist_events()`

3. **Hindsight (optional)**:
   - Semantic memory stored in Hindsight container
   - Separate banks per agent

### Frontend State Management
- **Global state**: Managed via React Context in `DashboardContext.tsx`
- **Polling**: Every 15 seconds to fetch updated events and insights
- **Local component state**: For form inputs, UI toggles, etc.

---

## 8. KEY DESIGN PATTERNS & PRACTICES

### Design Patterns
1. **Singleton Pattern**: Hindsight client initialized once and reused
2. **Factory Pattern**: `_create_handle_query()` creates handler functions with dynamic models
3. **Repository Pattern**: `hindsight_store.py` abstracts event storage
4. **Context Pattern**: React Context for global state in frontend
5. **Policy Pattern**: Routing policy and compliance rules as configurable policies

### Coding Practices
- **Type safety**: Pydantic models in backend, TypeScript in frontend
- **Thread safety**: Locks for shared state in backend
- **Backward compatibility**: Maintained while adding new features (multi-agent)
- **Graceful degradation**: Works without Hindsight
- **Logging**: Comprehensive logging for debugging and monitoring
- **Error handling**: Try/except blocks around critical operations

---

## 9. ERROR HANDLING & EDGE CASES

### Backend Error Handling
- **BudgetExceededError**: Caught and returned as budget stop message
- **HarnessStopError**: Caught and returned as policy stop message
- **General exceptions**: Caught and returned as error messages
- **Hindsight failures**: Logged but don't block main functionality (fallback to local heuristics)

### Edge Cases Handled
- Empty query string: Returns 422 validation error
- Agent with no events: Defaults to 100 trust score, no insights
- Hindsight not available: Falls back to local heuristic insights
- Zero-cost events: Handled in ROI and cost efficiency calculations
- Sensitive data category: Never auto-remediated to cheaper models

---

## 10. STRENGTHS, WEAKNESSES & IMPROVEMENT SUGGESTIONS

### Strengths
- **Well-structured code**: Clear separation of concerns between backend modules
- **Comprehensive feature set**: Audit trails, cost control, compliance, trust scoring
- **Multi-agent isolation**: Well-designed with backward compatibility
- **Modern frontend**: Clean UI with good user experience
- **Extensible**: Easy to add new categories, models, or policies

### Weaknesses
- **Persistence**: JSON file storage not suitable for production
- **Scalability**: In-memory stores won't work for high traffic
- **Real-time updates**: Polling instead of WebSockets for real-time data
- **Testing**: Limited test coverage
- **Security**: CORS allows all origins (*), no authentication

### Improvement Suggestions
1. **Database integration**: Replace JSON file with PostgreSQL/MongoDB
2. **Authentication**: Add user authentication (OAuth2, JWT)
3. **WebSockets**: Replace polling with WebSockets for real-time updates
4. **Testing**: Add unit tests, integration tests, and E2E tests
5. **Dockerization**: Containerize the application for easier deployment
6. **CI/CD**: Add GitHub Actions or similar for automated testing and deployment
7. **Rate limiting**: Add API rate limiting to prevent abuse
8. **Advanced compliance**: Use NLP models for better PII/jailbreak detection
9. **A/B testing**: Add A/B testing for routing policies
10. **Export functionality**: Allow exporting audit logs to CSV/JSON

---

## 11. SUMMARY / TL;DR

Obsidian is a modern, full-stack AI governance platform built with FastAPI (backend) and Next.js 15 (frontend). It provides audit trails, cost control, compliance monitoring, and trust scoring for LLM applications.

### Key Features:
- Multi-agent isolation with independent budgets and logs
- Real-time audit trails for every LLM query
- Cost governance with budget enforcement and auto-remediation
- Compliance checks for PII and jailbreak attempts
- 0-100 trust score based on compliance, efficiency, and recall
- Modern, responsive frontend dashboard

### Tech Stack:
- Backend: Python, FastAPI, Cascadeflow, Groq, Hindsight
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Recharts

### Ideal For:
- Organizations using LLMs needing cost control and compliance
- Teams managing multiple AI agents
- Anyone needing audit trails for LLM decisions

The project is well-structured and feature-rich, with room for improvement in persistence, scalability, and testing for production use.
