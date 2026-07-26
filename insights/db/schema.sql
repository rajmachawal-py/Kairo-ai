-- iNSIGHTS initial schema
-- Auto-loaded by Postgres container on first run

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    full_name   TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id),
    raw_idea            TEXT NOT NULL,
    problem_statement   JSONB,
    validation_summary  JSONB,
    roadmap             JSONB,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS research_workspaces (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id          UUID NOT NULL REFERENCES projects(id),
    deepsearch_results  JSONB,
    clusters            JSONB,
    gap_analysis        JSONB,
    notes               TEXT,
    created_at          TIMESTAMPTZ DEFAULT now(),
    updated_at          TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS resources (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID NOT NULL REFERENCES projects(id),
    resource_type   TEXT NOT NULL,      -- github | paper | api | dataset | learning
    payload         JSONB NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID NOT NULL REFERENCES projects(id),
    platform        TEXT NOT NULL,      -- telegram | whatsapp
    messages        JSONB,
    created_at      TIMESTAMPTZ DEFAULT now()
);
