CREATE TABLE workspaces (
  id VARCHAR(36) PRIMARY KEY,
  account_name VARCHAR(120) NOT NULL,
  champion VARCHAR(120) NOT NULL,
  exec_sponsor VARCHAR(120),
  solution_name VARCHAR(160) NOT NULL,
  current_stage VARCHAR(32) NOT NULL,
  program_health VARCHAR(32) NOT NULL,
  decision_date DATE,
  primary_outcome TEXT,
  success_definition TEXT,
  why_now TEXT,
  decision_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestones (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  phase_name VARCHAR(64) NOT NULL,
  stage_name VARCHAR(120) NOT NULL,
  task_name VARCHAR(200) NOT NULL,
  owner_name VARCHAR(120),
  planned_window VARCHAR(64),
  due_date DATE,
  status_name VARCHAR(32) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_milestones_workspace_due (workspace_id, due_date),
  CONSTRAINT fk_milestones_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE success_criteria (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  use_case_name VARCHAR(220) NOT NULL,
  importance_level VARCHAR(32) NOT NULL,
  requires_test_plan BOOLEAN NOT NULL DEFAULT TRUE,
  status_name VARCHAR(32) NOT NULL,
  metric_target TEXT,
  verified_by VARCHAR(120),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_criteria_workspace_status (workspace_id, status_name),
  CONSTRAINT fk_criteria_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE pilot_tasks (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  phase_name VARCHAR(64) NOT NULL,
  stage_name VARCHAR(120) NOT NULL,
  task_name VARCHAR(220) NOT NULL,
  assignee_name VARCHAR(120),
  status_name VARCHAR(32) NOT NULL,
  start_date DATE,
  duration_label VARCHAR(64),
  is_milestone BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_pilot_tasks_workspace_start (workspace_id, start_date),
  CONSTRAINT fk_pilot_tasks_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE next_actions (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  title VARCHAR(220) NOT NULL,
  owner_name VARCHAR(120),
  created_date DATE,
  due_date DATE,
  status_name VARCHAR(32) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_actions_workspace_due (workspace_id, due_date),
  CONSTRAINT fk_actions_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE issues (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  title VARCHAR(220) NOT NULL,
  owner_name VARCHAR(120),
  created_date DATE,
  status_name VARCHAR(32) NOT NULL,
  impact_level VARCHAR(32) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_issues_workspace_status (workspace_id, status_name),
  CONSTRAINT fk_issues_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE discovery_items (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  category_name VARCHAR(120) NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_discovery_workspace_required (workspace_id, is_required),
  CONSTRAINT fk_discovery_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE architecture_items (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  system_name VARCHAR(120) NOT NULL,
  role_text TEXT,
  strengths_text TEXT,
  constraints_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_architecture_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);

CREATE TABLE sizing_items (
  id VARCHAR(36) PRIMARY KEY,
  workspace_id VARCHAR(36) NOT NULL,
  phase_name VARCHAR(64) NOT NULL,
  component_name VARCHAR(120) NOT NULL,
  configuration_text VARCHAR(220),
  storage_text VARCHAR(220),
  instance_count INT NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sizing_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id)
);
