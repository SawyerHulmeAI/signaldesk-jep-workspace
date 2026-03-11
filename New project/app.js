const STORAGE_KEY = "signaldesk-jep-workspace-v1";

const phaseOrder = {
  Solutioning: 0,
  "Phase 1": 1,
  "Phase 2": 2,
  Decision: 3
};

const stageLabels = {
  align: "Align",
  design: "Design",
  validate: "Validate",
  decide: "Decide"
};

const milestoneStatusLabels = {
  "not-started": "Not started",
  "on-track": "On track",
  "at-risk": "At risk",
  blocked: "Blocked",
  complete: "Complete"
};

const criteriaStatusLabels = {
  "not-tested": "Not tested",
  watch: "Watch",
  pass: "Pass",
  fail: "Fail"
};

const actionStatusLabels = {
  open: "Open",
  "in-progress": "In progress",
  waiting: "Waiting",
  done: "Done"
};

const issueStatusLabels = {
  open: "Open",
  mitigating: "Mitigating",
  blocked: "Blocked",
  resolved: "Resolved"
};

const importanceLabels = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low"
};

const demoData = {
  overview: {
    accountName: "HubSpot",
    champion: "Sawyer Hulme",
    execSponsor: "Michal",
    solutionName: "TiDB Joint Pilot",
    currentStage: "validate",
    programHealth: "on-track",
    decisionDate: "2026-04-30",
    primaryOutcome:
      "Prove TiDB can support HubSpot's search and analytics workloads with lower operational overhead and a credible production path.",
    successDefinition:
      "Align on the use cases that matter, run the agreed benchmarks, verify the latency and throughput targets, and leave the pilot with a clear go/no-go decision and rollout path.",
    whyNow:
      "The account needs a path that scales beyond the current search and warehouse split without adding more latency, cost, and platform complexity.",
    decisionNotes:
      "The buying conversation depends on benchmark credibility, architecture confidence for self-managed deployment, and enough proof that TiDB can absorb the critical query paths."
  },
  milestones: [
    {
      id: "ms-1",
      phase: "Solutioning",
      stage: "Solutioning",
      task: "NDA signed",
      owner: "Sawyer / Michal",
      plannedWindow: "Week 1",
      dueDate: "2026-03-04",
      status: "complete",
      notes: "Commercial access and initial discovery are already unlocked."
    },
    {
      id: "ms-2",
      phase: "Solutioning",
      stage: "Solutioning",
      task: "Solution confirmed",
      owner: "Kyle / Michal",
      plannedWindow: "Week 1",
      dueDate: "2026-03-06",
      status: "complete",
      notes: "Team alignment is now centered on a TiDB pilot rather than a generic evaluation."
    },
    {
      id: "ms-3",
      phase: "Phase 1",
      stage: "PoC Prep",
      task: "Success criteria defined",
      owner: "Kyle / Michal",
      plannedWindow: "Week 2",
      dueDate: "2026-03-13",
      status: "complete",
      notes: "The high-value workload and query targets are visible in the criteria board."
    },
    {
      id: "ms-4",
      phase: "Phase 1",
      stage: "PoC Prep",
      task: "Finalize PoC test plan",
      owner: "Kyle / Michal",
      plannedWindow: "Week 2",
      dueDate: "2026-03-14",
      status: "on-track",
      notes: "Need the final query bundle and the agreed benchmark sequence."
    },
    {
      id: "ms-5",
      phase: "Phase 1",
      stage: "PoC",
      task: "Phase 1 PoC start",
      owner: "Joint team",
      plannedWindow: "Week 3",
      dueDate: "2026-03-17",
      status: "on-track",
      notes: "Cloud-based validation starts once connectivity and benchmark inputs are locked."
    },
    {
      id: "ms-6",
      phase: "Phase 1",
      stage: "Validate Results",
      task: "Review Phase 1 results",
      owner: "Kyle / Michal",
      plannedWindow: "Week 4",
      dueDate: "2026-03-28",
      status: "not-started",
      notes: "Decision gate for whether the pilot expands to the self-managed path."
    },
    {
      id: "ms-7",
      phase: "Phase 2",
      stage: "PoC Prep",
      task: "Define self-managed architecture and sizing",
      owner: "Kyle / Michal",
      plannedWindow: "Week 5",
      dueDate: "2026-04-03",
      status: "not-started",
      notes: "Needs final topology assumptions and service split decisions."
    },
    {
      id: "ms-8",
      phase: "Phase 2",
      stage: "PoC",
      task: "Mixed workload validation",
      owner: "Joint team",
      plannedWindow: "Week 7",
      dueDate: "2026-04-15",
      status: "not-started",
      notes: "Focus on ingestion plus search/read concurrency."
    },
    {
      id: "ms-9",
      phase: "Decision",
      stage: "Contract Prep",
      task: "Commercial review",
      owner: "Sawyer / Michal",
      plannedWindow: "Week 8",
      dueDate: "2026-04-24",
      status: "not-started",
      notes: "Only opens after the success criteria are credible and the architecture path is agreed."
    },
    {
      id: "ms-10",
      phase: "Decision",
      stage: "Executive Decision",
      task: "Go / no-go call",
      owner: "Buying committee",
      plannedWindow: "Week 9",
      dueDate: "2026-04-30",
      status: "blocked",
      notes: "Blocked by incomplete benchmark evidence and unresolved self-managed assumptions."
    }
  ],
  criteria: [
    {
      id: "cr-1",
      useCase: "UPSERT with low data latency on the object workload",
      importance: "critical",
      requiresTestPlan: true,
      status: "watch",
      metricTarget:
        "Target latency is closer to Elasticsearch than Snowflake. Capture real observed latency during streaming ingestion, ideally below 10 seconds.",
      verifiedBy: "Joint team",
      notes: "Important because the replacement cannot increase freshness lag materially."
    },
    {
      id: "cr-2",
      useCase: "JOIN support across the operational model",
      importance: "critical",
      requiresTestPlan: true,
      status: "not-tested",
      metricTarget:
        "Test join-heavy SQL paths that are not available in the current Elasticsearch stack and compare the cost and latency against the warehouse path.",
      verifiedBy: "",
      notes: "This is part of the strategic reason to evaluate TiDB."
    },
    {
      id: "cr-3",
      useCase: "Full analytic SQL for Snowflake-style use cases",
      importance: "high",
      requiresTestPlan: true,
      status: "not-tested",
      metricTarget:
        "Use a representative query set with joins, aggregations, and window functions. Lower QPS is acceptable if the economics and performance are credible.",
      verifiedBy: "",
      notes: ""
    },
    {
      id: "cr-4",
      useCase: "High QPS / low-latency reads",
      importance: "critical",
      requiresTestPlan: true,
      status: "pass",
      metricTarget:
        "Read SQL simple and complex paths should aim for sub-second p99 at meaningful query volume.",
      verifiedBy: "TiDB SA",
      notes: "Early benchmark path is encouraging, but the full customer set still needs review."
    },
    {
      id: "cr-5",
      useCase: "Partial record update support",
      importance: "high",
      requiresTestPlan: true,
      status: "watch",
      metricTarget:
        "Verify partial updates can reduce system impact versus the current Elasticsearch model at production-relevant rates.",
      verifiedBy: "Joint team",
      notes: "Needs tighter workload definition."
    },
    {
      id: "cr-6",
      useCase: "Compute and storage separation",
      importance: "medium",
      requiresTestPlan: false,
      status: "pass",
      metricTarget:
        "Confirm the architecture can scale read and storage pressure independently enough for the target use case.",
      verifiedBy: "Architecture review",
      notes: "Covered in the architecture and sizing discussion."
    },
    {
      id: "cr-7",
      useCase: "Fast search on arbitrary properties",
      importance: "critical",
      requiresTestPlan: true,
      status: "watch",
      metricTarget:
        "Validate that semi-structured property filtering, search, and aggregation remain usable for customer-facing query paths.",
      verifiedBy: "",
      notes: "Needs concrete benchmark coverage from the actual application patterns."
    },
    {
      id: "cr-8",
      useCase: "Write SQL throughput",
      importance: "high",
      requiresTestPlan: true,
      status: "pass",
      metricTarget:
        "Acceptable test is a meaningful load on the chosen cluster shape. Example target: 5k writes per second with measurement during read pressure.",
      verifiedBy: "TiDB team",
      notes: ""
    },
    {
      id: "cr-9",
      useCase: "Join SQL at query volume",
      importance: "high",
      requiresTestPlan: true,
      status: "not-tested",
      metricTarget:
        "Aim for 2 to 3 second p99 on representative join workloads, understanding some larger queries may need more latency budget.",
      verifiedBy: "",
      notes: ""
    }
  ],
  testTasks: [
    {
      id: "tt-1",
      phase: "Phase 1",
      stage: "PoC Prep",
      task: "Scope PoC testing scenario",
      assignee: "Joint team",
      status: "complete",
      startDate: "2026-03-04",
      duration: "2 days",
      isMilestone: false,
      notes: "Business scenario and first-pass data volume are agreed."
    },
    {
      id: "tt-2",
      phase: "Phase 1",
      stage: "PoC Prep",
      task: "Define test cases with success criteria",
      assignee: "Kyle / Michal",
      status: "complete",
      startDate: "2026-03-05",
      duration: "2 days",
      isMilestone: false,
      notes: "Linked directly to the success criteria board."
    },
    {
      id: "tt-3",
      phase: "Phase 1",
      stage: "Setup",
      task: "Create TiDB Cloud org and user access",
      assignee: "TiDB team",
      status: "complete",
      startDate: "2026-03-07",
      duration: "1 day",
      isMilestone: false,
      notes: ""
    },
    {
      id: "tt-4",
      phase: "Phase 1",
      stage: "Setup",
      task: "Set up connectivity and cluster access",
      assignee: "Joint team",
      status: "in-progress",
      startDate: "2026-03-10",
      duration: "3 days",
      isMilestone: true,
      notes: "Dependent on the final network and credential handoff."
    },
    {
      id: "tt-5",
      phase: "Phase 1",
      stage: "Test 1: Perf / Search query",
      task: "Run the business benchmark",
      assignee: "HubSpot + TiDB",
      status: "not-started",
      startDate: "2026-03-17",
      duration: "4 days",
      isMilestone: false,
      notes: "Waiting for final benchmark query set."
    },
    {
      id: "tt-6",
      phase: "Phase 1",
      stage: "Test 2: Data ingestion",
      task: "Run data ingest process around 40K RPS",
      assignee: "TiDB team",
      status: "not-started",
      startDate: "2026-03-20",
      duration: "3 days",
      isMilestone: false,
      notes: ""
    },
    {
      id: "tt-7",
      phase: "Phase 2",
      stage: "Setup",
      task: "Generate the 15 TB data and stage in object storage",
      assignee: "HubSpot team",
      status: "not-started",
      startDate: "2026-04-02",
      duration: "5 days",
      isMilestone: false,
      notes: ""
    },
    {
      id: "tt-8",
      phase: "Phase 2",
      stage: "Setup",
      task: "15 TB data ingestion via import workflow",
      assignee: "TiDB team",
      status: "not-started",
      startDate: "2026-04-08",
      duration: "5 days",
      isMilestone: true,
      notes: "Key self-managed readiness milestone."
    },
    {
      id: "tt-9",
      phase: "Phase 2",
      stage: "Test 3: Mixed workload",
      task: "Run mixed workload with updates plus search queries",
      assignee: "Joint team",
      status: "not-started",
      startDate: "2026-04-15",
      duration: "4 days",
      isMilestone: false,
      notes: "Should validate ingestion and read concurrency in one test."
    }
  ],
  actions: [
    {
      id: "ac-1",
      title: "Scope pilot testing scenario",
      owner: "Joint team",
      createdDate: "2026-03-11",
      dueDate: "2026-03-13",
      status: "in-progress",
      notes:
        "Choose the core business scenario and the first production-relevant data slice."
    },
    {
      id: "ac-2",
      title: "Lock success criteria and benchmark targets",
      owner: "Kyle / Michal",
      createdDate: "2026-03-11",
      dueDate: "2026-03-14",
      status: "open",
      notes:
        "Include QPS, latency, and what counts as acceptable inference for scale."
    },
    {
      id: "ac-3",
      title: "Collect schema, top SQL, and workload queries",
      owner: "HubSpot data team",
      createdDate: "2026-03-11",
      dueDate: "2026-03-18",
      status: "open",
      notes: "Need the representative query set before the main benchmark run."
    },
    {
      id: "ac-4",
      title: "Finalize the pilot use cases",
      owner: "Sawyer / TiDB SA",
      createdDate: "2026-03-11",
      dueDate: "2026-03-19",
      status: "waiting",
      notes: "Depends on query review and scenario sign-off."
    }
  ],
  issues: [
    {
      id: "is-1",
      title: "Final benchmark query set is not fully approved",
      owner: "HubSpot data team",
      createdDate: "2026-03-11",
      status: "open",
      impact: "high",
      notes:
        "This directly slows the main benchmark work and weakens the credibility of any early performance result."
    },
    {
      id: "is-2",
      title: "Self-managed topology assumptions still need alignment",
      owner: "TiDB team",
      createdDate: "2026-03-11",
      status: "mitigating",
      impact: "medium",
      notes:
        "Sizing, service split, and rollout shape are directionally defined but not yet signed off."
    }
  ],
  discovery: [
    {
      id: "dc-1",
      category: "Data Sources",
      question:
        "For the data stores in scope, what types of data are expected and how much semi-structured content needs to be searchable?",
      answer:
        "Structured data plus some semi-structured JSON. There is also occasional protobuf-style unstructured payload data.",
      important: true
    },
    {
      id: "dc-2",
      category: "Data Volume",
      question:
        "What are the indicative data volumes and growth assumptions for the services in scope?",
      answer:
        "Roughly 10 to 15 TiB per service today, growing around 30 percent per year. Overall online platform volume is materially larger.",
      important: true
    },
    {
      id: "dc-3",
      category: "Value",
      question:
        "What is the ideal business outcome of adopting TiDB if the pilot succeeds?",
      answer:
        "Higher scale, stronger availability, and lower management overhead than the current split architecture.",
      important: true
    },
    {
      id: "dc-4",
      category: "Performance",
      question: "What are the QPS and latency expectations for the new platform?",
      answer:
        "Expectation is 100k+ QPS with room to scale materially higher, while staying close to regular MySQL latency expectations.",
      important: true
    },
    {
      id: "dc-5",
      category: "Availability",
      question: "What are the RPO and RTO expectations?",
      answer: "Zero RPO and low RTO within region. Cross-region is not in scope today.",
      important: true
    }
  ],
  architecture: [
    {
      id: "ar-1",
      system: "HBase",
      role:
        "Source of truth for the online platform and optimized for OLTP-style lookups and writes.",
      strengths: "Excellent mutation throughput and point lookups.",
      constraints:
        "Poor fit for broad scans, aggregation-heavy analysis, and richer reporting patterns."
    },
    {
      id: "ar-2",
      system: "Elasticsearch",
      role:
        "Search and reporting layer used for customer-facing filtering and query-heavy paths.",
      strengths: "Strong high-QPS search and aggregation behavior for the current experience.",
      constraints:
        "Data freshness lag from the source system and no native join support for broader analytical patterns."
    },
    {
      id: "ar-3",
      system: "Snowflake",
      role:
        "Warehouse layer used for richer SQL and join-oriented analysis that the online stack cannot support directly.",
      strengths: "Good fit for complex joins and warehouse-style query paths.",
      constraints:
        "Expensive, not self-hosted, and creates architectural friction for the current operating model."
    },
    {
      id: "ar-4",
      system: "TiDB target path",
      role:
        "Candidate platform intended to consolidate more of the online search and analytical workload into one operational model.",
      strengths: "Potential to unify operational scale with richer SQL access and clearer horizontal scaling paths.",
      constraints:
        "Must prove benchmark credibility, deployment fit, and operational readiness before the account will move."
    }
  ],
  sizing: [
    {
      id: "sz-1",
      phase: "Phase 2",
      component: "TiDB node",
      configuration: "32 vCPU / 128 GiB",
      storage: "N/A",
      count: 15,
      notes: "Application-facing SQL layer in the self-managed topology."
    },
    {
      id: "sz-2",
      phase: "Phase 2",
      component: "TiKV node",
      configuration: "16 vCPU / 128 GiB",
      storage: "4 TB GP3",
      count: 50,
      notes: "Storage and transactional layer based on the workbook topology."
    },
    {
      id: "sz-3",
      phase: "Phase 2",
      component: "TiFlash node",
      configuration: "32 vCPU / 128 GiB",
      storage: "4 TB GP3",
      count: 12,
      notes: "Read-optimized layer for analytical acceleration and isolation."
    }
  ]
};

const state = loadState();

const elements = {
  overviewForm: document.getElementById("overviewForm"),
  overviewMessage: document.getElementById("overviewMessage"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  resetDemoBtn: document.getElementById("resetDemoBtn"),
  processRail: document.getElementById("processRail"),
  completionMetric: document.getElementById("completionMetric"),
  criteriaMetric: document.getElementById("criteriaMetric"),
  actionsMetric: document.getElementById("actionsMetric"),
  issuesMetric: document.getElementById("issuesMetric"),
  checkpointMetric: document.getElementById("checkpointMetric"),
  summaryAlignment: document.getElementById("summaryAlignment"),
  summaryProof: document.getElementById("summaryProof"),
  summaryGaps: document.getElementById("summaryGaps"),
  summaryDecision: document.getElementById("summaryDecision"),
  currentStage: document.getElementById("currentStage"),
  milestoneForm: document.getElementById("milestoneForm"),
  milestoneId: document.getElementById("milestoneId"),
  milestoneList: document.getElementById("milestoneList"),
  milestonePhaseFilter: document.getElementById("milestonePhaseFilter"),
  milestoneStatusFilter: document.getElementById("milestoneStatusFilter"),
  milestoneSearch: document.getElementById("milestoneSearch"),
  cancelMilestoneEdit: document.getElementById("cancelMilestoneEdit"),
  criteriaForm: document.getElementById("criteriaForm"),
  criteriaId: document.getElementById("criteriaId"),
  criteriaList: document.getElementById("criteriaList"),
  cancelCriteriaEdit: document.getElementById("cancelCriteriaEdit"),
  testTaskForm: document.getElementById("testTaskForm"),
  testTaskId: document.getElementById("testTaskId"),
  testTaskList: document.getElementById("testTaskList"),
  cancelTestTaskEdit: document.getElementById("cancelTestTaskEdit"),
  actionForm: document.getElementById("actionForm"),
  actionId: document.getElementById("actionId"),
  actionList: document.getElementById("actionList"),
  cancelActionEdit: document.getElementById("cancelActionEdit"),
  issueForm: document.getElementById("issueForm"),
  issueId: document.getElementById("issueId"),
  issueList: document.getElementById("issueList"),
  cancelIssueEdit: document.getElementById("cancelIssueEdit"),
  discoveryForm: document.getElementById("discoveryForm"),
  discoveryId: document.getElementById("discoveryId"),
  discoveryList: document.getElementById("discoveryList"),
  cancelDiscoveryEdit: document.getElementById("cancelDiscoveryEdit"),
  architectureForm: document.getElementById("architectureForm"),
  architectureId: document.getElementById("architectureId"),
  architectureList: document.getElementById("architectureList"),
  cancelArchitectureEdit: document.getElementById("cancelArchitectureEdit"),
  sizingForm: document.getElementById("sizingForm"),
  sizingId: document.getElementById("sizingId"),
  sizingList: document.getElementById("sizingList"),
  cancelSizingEdit: document.getElementById("cancelSizingEdit")
};

initialize();

function initialize() {
  bindEvents();
  clearMilestoneForm();
  clearCriteriaForm();
  clearTestTaskForm();
  clearActionForm();
  clearIssueForm();
  clearDiscoveryForm();
  clearArchitectureForm();
  clearSizingForm();
  renderAll();
}

function bindEvents() {
  elements.overviewForm.addEventListener("submit", handleOverviewSubmit);
  elements.exportBtn.addEventListener("click", exportWorkspace);
  elements.importInput.addEventListener("change", importWorkspace);
  elements.resetDemoBtn.addEventListener("click", resetWorkspace);

  elements.milestoneForm.addEventListener("submit", handleMilestoneSubmit);
  elements.cancelMilestoneEdit.addEventListener("click", clearMilestoneForm);
  elements.milestonePhaseFilter.addEventListener("change", renderMilestones);
  elements.milestoneStatusFilter.addEventListener("change", renderMilestones);
  elements.milestoneSearch.addEventListener("input", renderMilestones);
  elements.milestoneList.addEventListener("click", handleMilestoneListClick);

  elements.criteriaForm.addEventListener("submit", handleCriteriaSubmit);
  elements.cancelCriteriaEdit.addEventListener("click", clearCriteriaForm);
  elements.criteriaList.addEventListener("click", handleCriteriaListClick);

  elements.testTaskForm.addEventListener("submit", handleTestTaskSubmit);
  elements.cancelTestTaskEdit.addEventListener("click", clearTestTaskForm);
  elements.testTaskList.addEventListener("click", handleTestTaskListClick);

  elements.actionForm.addEventListener("submit", handleActionSubmit);
  elements.cancelActionEdit.addEventListener("click", clearActionForm);
  elements.actionList.addEventListener("click", handleActionListClick);

  elements.issueForm.addEventListener("submit", handleIssueSubmit);
  elements.cancelIssueEdit.addEventListener("click", clearIssueForm);
  elements.issueList.addEventListener("click", handleIssueListClick);

  elements.discoveryForm.addEventListener("submit", handleDiscoverySubmit);
  elements.cancelDiscoveryEdit.addEventListener("click", clearDiscoveryForm);
  elements.discoveryList.addEventListener("click", handleDiscoveryListClick);

  elements.architectureForm.addEventListener("submit", handleArchitectureSubmit);
  elements.cancelArchitectureEdit.addEventListener("click", clearArchitectureForm);
  elements.architectureList.addEventListener("click", handleArchitectureListClick);

  elements.sizingForm.addEventListener("submit", handleSizingSubmit);
  elements.cancelSizingEdit.addEventListener("click", clearSizingForm);
  elements.sizingList.addEventListener("click", handleSizingListClick);
}

function renderAll() {
  renderOverview();
  renderMetrics();
  renderProcess();
  renderSnapshots();
  renderMilestones();
  renderCriteria();
  renderTestTasks();
  renderActions();
  renderIssues();
  renderDiscovery();
  renderArchitecture();
  renderSizing();
}

function renderOverview() {
  const overview = state.overview;

  setValue("accountName", overview.accountName);
  setValue("champion", overview.champion);
  setValue("execSponsor", overview.execSponsor);
  setValue("solutionName", overview.solutionName);
  setValue("currentStage", overview.currentStage);
  setValue("programHealth", overview.programHealth);
  setValue("decisionDate", overview.decisionDate);
  setValue("primaryOutcome", overview.primaryOutcome);
  setValue("successDefinition", overview.successDefinition);
  setValue("whyNow", overview.whyNow);
  setValue("decisionNotes", overview.decisionNotes);
}

function renderMetrics() {
  const completeMilestones = state.milestones.filter(
    (item) => item.status === "complete"
  ).length;
  const milestonePercent = state.milestones.length
    ? Math.round((completeMilestones / state.milestones.length) * 100)
    : 0;
  const passCriteria = state.criteria.filter((item) => item.status === "pass").length;
  const openActions = state.actions.filter((item) => item.status !== "done").length;
  const activeIssues = state.issues.filter((item) => item.status !== "resolved").length;
  const checkpoint = getNextCheckpoint();

  elements.completionMetric.textContent = `${milestonePercent}%`;
  elements.criteriaMetric.textContent = `${passCriteria} / ${state.criteria.length}`;
  elements.actionsMetric.textContent = String(openActions);
  elements.issuesMetric.textContent = String(activeIssues);
  elements.checkpointMetric.textContent = checkpoint;
}

function renderProcess() {
  const cards = getProcessCards();
  elements.processRail.innerHTML = cards
    .map(
      (card) => `
        <article class="process-step${
          state.overview.currentStage === card.id ? " is-current" : ""
        }">
          <p class="step-kicker">${escapeHtml(card.step)}</p>
          <h3 class="step-title">${escapeHtml(card.title)}</h3>
          <p class="step-summary">${escapeHtml(card.summary)}</p>
          <div class="step-metric">${escapeHtml(card.metric)}</div>
        </article>
      `
    )
    .join("");
}

function renderSnapshots() {
  const openIssues = state.issues.filter((item) => item.status !== "resolved");
  const blockedMilestones = state.milestones.filter((item) => item.status === "blocked");
  const overdueActions = state.actions.filter((item) => isOverdue(item.dueDate, item.status === "done"));
  const criticalUnproven = state.criteria.filter(
    (item) => item.importance === "critical" && item.status !== "pass"
  );
  const answeredDiscovery = state.discovery.filter((item) => item.answer).length;

  elements.summaryAlignment.innerHTML = renderSummaryList([
    `${state.overview.accountName || "Account"} is currently in ${
      stageLabels[state.overview.currentStage] || "Align"
    } with ${labelFor(state.overview.programHealth, {
      "on-track": "on-track health",
      "at-risk": "at-risk health",
      blocked: "blocked health"
    })}.`,
    `Champion: ${state.overview.champion || "Unassigned"}. Executive sponsor: ${
      state.overview.execSponsor || "Not captured"
    }.`,
    state.overview.primaryOutcome || "Primary outcome not defined yet."
  ]);

  elements.summaryProof.innerHTML = renderSummaryList([
    `${state.criteria.filter((item) => item.status === "pass").length} success criteria are currently marked pass.`,
    `${answeredDiscovery} discovery prompts have confirmed answers captured.`,
    criticalUnproven.length
      ? `${criticalUnproven.length} critical criteria still need proof or a stronger readout.`
      : "Critical criteria currently have passing evidence."
  ]);

  elements.summaryGaps.innerHTML = renderSummaryList([
    overdueActions.length
      ? `${overdueActions.length} actions are overdue.`
      : "No overdue actions right now.",
    blockedMilestones.length
      ? `${blockedMilestones.length} milestone is blocked.`
      : "No milestones are marked blocked.",
    openIssues.length
      ? `${openIssues.length} active issues still need mitigation or resolution.`
      : "No active issues are open."
  ]);

  elements.summaryDecision.innerHTML = renderSummaryList([
    state.overview.decisionDate
      ? `Decision target: ${formatDate(state.overview.decisionDate)}.`
      : "No decision date is set.",
    state.overview.successDefinition || "Success definition not captured yet.",
    state.overview.decisionNotes || "Decision notes not captured yet."
  ]);
}

function renderMilestones() {
  const phaseFilter = elements.milestonePhaseFilter.value;
  const statusFilter = elements.milestoneStatusFilter.value;
  const query = cleanText(elements.milestoneSearch.value).toLowerCase();

  const filtered = state.milestones
    .filter((item) => (phaseFilter === "all" ? true : item.phase === phaseFilter))
    .filter((item) => (statusFilter === "all" ? true : item.status === statusFilter))
    .filter((item) =>
      !query
        ? true
        : [item.phase, item.stage, item.task, item.owner, item.notes, item.plannedWindow]
            .join(" ")
            .toLowerCase()
            .includes(query)
    )
    .sort(sortMilestones);

  if (!filtered.length) {
    elements.milestoneList.innerHTML =
      '<div class="empty-state">No milestones match the current filter.</div>';
    return;
  }

  const groups = groupBy(filtered, "phase");

  elements.milestoneList.innerHTML = Object.entries(groups)
    .map(([phase, items]) => {
      const completeCount = items.filter((item) => item.status === "complete").length;

      return `
        <section class="phase-group">
          <div class="phase-heading">
            <div>
              <p class="section-kicker">Phase</p>
              <h3>${escapeHtml(phase)}</h3>
            </div>
            <p>${completeCount} of ${items.length} complete</p>
          </div>
          ${items.map(renderMilestoneCard).join("")}
        </section>
      `;
    })
    .join("");
}

function renderCriteria() {
  if (!state.criteria.length) {
    elements.criteriaList.innerHTML =
      '<div class="empty-state">Add the success criteria that define the pilot outcome.</div>';
    return;
  }

  const items = state.criteria.slice().sort(sortCriteria);

  elements.criteriaList.innerHTML = items
    .map(
      (item) => `
        <article class="criterion-card">
          <div class="record-head">
            <div>
              <div class="pill-row">
                <span class="status-pill status-${escapeHtml(item.importance)}">${
                  importanceLabels[item.importance]
                }</span>
                <span class="status-pill status-${escapeHtml(item.status)}">${
                  criteriaStatusLabels[item.status]
                }</span>
                <span class="status-pill status-${item.requiresTestPlan ? "yes" : "no"}">
                  ${item.requiresTestPlan ? "Needs test plan" : "No test plan"}
                </span>
              </div>
              <h3>${escapeHtml(item.useCase)}</h3>
            </div>
            <div class="record-actions">
              <button class="btn-inline" type="button" data-action="edit" data-id="${
                item.id
              }">Edit</button>
              <button
                class="btn-inline is-danger"
                type="button"
                data-action="delete"
                data-id="${item.id}"
              >
                Delete
              </button>
            </div>
          </div>
          <p class="detail-text">${formatText(item.metricTarget || "No metric target captured.")}</p>
          <div class="meta-grid">
            <p class="record-meta"><strong>Verified by:</strong> ${
              escapeHtml(item.verifiedBy || "Unassigned")
            }</p>
            <p class="record-meta"><strong>Notes:</strong> ${
              item.notes ? formatText(item.notes) : "No notes."
            }</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTestTasks() {
  if (!state.testTasks.length) {
    elements.testTaskList.innerHTML =
      '<div class="empty-state">Add the concrete work items that execute the pilot.</div>';
    return;
  }

  const items = state.testTasks.slice().sort(sortTestTasks);
  elements.testTaskList.innerHTML = items.map(renderTestTaskCard).join("");
}

function renderActions() {
  if (!state.actions.length) {
    elements.actionList.innerHTML =
      '<div class="empty-state">Add the next actions for the team.</div>';
    return;
  }

  const items = state.actions.slice().sort(sortActions);
  elements.actionList.innerHTML = items.map(renderActionCard).join("");
}

function renderIssues() {
  if (!state.issues.length) {
    elements.issueList.innerHTML =
      '<div class="empty-state">No issues logged.</div>';
    return;
  }

  const items = state.issues.slice().sort(sortIssues);
  elements.issueList.innerHTML = items.map(renderIssueCard).join("");
}

function renderDiscovery() {
  if (!state.discovery.length) {
    elements.discoveryList.innerHTML =
      '<div class="empty-state">Capture the discovery questions that matter to the deal team.</div>';
    return;
  }

  const items = state.discovery.slice().sort(sortDiscovery);
  elements.discoveryList.innerHTML = items.map(renderDiscoveryCard).join("");
}

function renderArchitecture() {
  if (!state.architecture.length) {
    elements.architectureList.innerHTML =
      '<div class="empty-state">Add the current-state systems and their tradeoffs.</div>';
    return;
  }

  const items = state.architecture.slice().sort((left, right) =>
    left.system.localeCompare(right.system)
  );
  elements.architectureList.innerHTML = items.map(renderArchitectureCard).join("");
}

function renderSizing() {
  if (!state.sizing.length) {
    elements.sizingList.innerHTML =
      '<div class="empty-state">Capture the proposed topology and counts here.</div>';
    return;
  }

  const items = state.sizing.slice().sort(sortSizing);
  elements.sizingList.innerHTML = items.map(renderSizingCard).join("");
}

function handleOverviewSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.overviewForm);

  state.overview = normalizeOverview({
    accountName: formData.get("accountName"),
    champion: formData.get("champion"),
    execSponsor: formData.get("execSponsor"),
    solutionName: formData.get("solutionName"),
    currentStage: formData.get("currentStage"),
    programHealth: formData.get("programHealth"),
    decisionDate: formData.get("decisionDate"),
    primaryOutcome: formData.get("primaryOutcome"),
    successDefinition: formData.get("successDefinition"),
    whyNow: formData.get("whyNow"),
    decisionNotes: formData.get("decisionNotes")
  });

  commit("Overview saved.");
}

function handleMilestoneSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.milestoneForm);
  const milestone = normalizeMilestone({
    id: formData.get("milestoneId"),
    phase: formData.get("phase"),
    stage: formData.get("stage"),
    task: formData.get("task"),
    owner: formData.get("owner"),
    plannedWindow: formData.get("plannedWindow"),
    dueDate: formData.get("dueDate"),
    status: formData.get("status"),
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.milestones, milestone);
  clearMilestoneForm();
  commit("Milestone saved.");
}

function handleCriteriaSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.criteriaForm);
  const criterion = normalizeCriterion({
    id: formData.get("criteriaId"),
    useCase: formData.get("useCase"),
    importance: formData.get("importance"),
    requiresTestPlan: formData.get("requiresTestPlan") === "yes",
    status: formData.get("status"),
    metricTarget: formData.get("metricTarget"),
    verifiedBy: formData.get("verifiedBy"),
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.criteria, criterion);
  clearCriteriaForm();
  commit("Success criterion saved.");
}

function handleTestTaskSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.testTaskForm);
  const task = normalizeTestTask({
    id: formData.get("testTaskId"),
    phase: formData.get("phase"),
    stage: formData.get("stage"),
    task: formData.get("task"),
    assignee: formData.get("assignee"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    duration: formData.get("duration"),
    isMilestone: formData.get("isMilestone") === "on",
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.testTasks, task);
  clearTestTaskForm();
  commit("Pilot task saved.");
}

function handleActionSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.actionForm);
  const action = normalizeAction({
    id: formData.get("actionId"),
    title: formData.get("title"),
    owner: formData.get("owner"),
    createdDate: formData.get("createdDate"),
    dueDate: formData.get("dueDate"),
    status: formData.get("status"),
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.actions, action);
  clearActionForm();
  commit("Action saved.");
}

function handleIssueSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.issueForm);
  const issue = normalizeIssue({
    id: formData.get("issueId"),
    title: formData.get("title"),
    owner: formData.get("owner"),
    createdDate: formData.get("createdDate"),
    status: formData.get("status"),
    impact: formData.get("impact"),
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.issues, issue);
  clearIssueForm();
  commit("Issue saved.");
}

function handleDiscoverySubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.discoveryForm);
  const item = normalizeDiscovery({
    id: formData.get("discoveryId"),
    category: formData.get("category"),
    question: formData.get("question"),
    answer: formData.get("answer"),
    important: formData.get("important") === "on"
  });

  upsertCollectionItem(state.discovery, item);
  clearDiscoveryForm();
  commit("Discovery prompt saved.");
}

function handleArchitectureSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.architectureForm);
  const item = normalizeArchitecture({
    id: formData.get("architectureId"),
    system: formData.get("system"),
    role: formData.get("role"),
    strengths: formData.get("strengths"),
    constraints: formData.get("constraints")
  });

  upsertCollectionItem(state.architecture, item);
  clearArchitectureForm();
  commit("System summary saved.");
}

function handleSizingSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.sizingForm);
  const item = normalizeSizing({
    id: formData.get("sizingId"),
    phase: formData.get("phase"),
    component: formData.get("component"),
    configuration: formData.get("configuration"),
    storage: formData.get("storage"),
    count: formData.get("count"),
    notes: formData.get("notes")
  });

  upsertCollectionItem(state.sizing, item);
  clearSizingForm();
  commit("Sizing row saved.");
}

function handleMilestoneListClick(event) {
  handleListAction(event, state.milestones, populateMilestoneForm, "Delete this milestone?");
}

function handleCriteriaListClick(event) {
  handleListAction(event, state.criteria, populateCriteriaForm, "Delete this criterion?");
}

function handleTestTaskListClick(event) {
  handleListAction(event, state.testTasks, populateTestTaskForm, "Delete this task?");
}

function handleActionListClick(event) {
  handleListAction(event, state.actions, populateActionForm, "Delete this action?");
}

function handleIssueListClick(event) {
  handleListAction(event, state.issues, populateIssueForm, "Delete this issue?");
}

function handleDiscoveryListClick(event) {
  handleListAction(event, state.discovery, populateDiscoveryForm, "Delete this discovery prompt?");
}

function handleArchitectureListClick(event) {
  handleListAction(event, state.architecture, populateArchitectureForm, "Delete this system summary?");
}

function handleSizingListClick(event) {
  handleListAction(event, state.sizing, populateSizingForm, "Delete this sizing row?");
}

function handleListAction(event, collection, editFn, confirmationText) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const id = button.dataset.id;
  const action = button.dataset.action;
  const record = collection.find((item) => item.id === id);

  if (!record) {
    return;
  }

  if (action === "edit") {
    editFn(record);
    return;
  }

  if (action === "delete" && window.confirm(confirmationText)) {
    const index = collection.findIndex((item) => item.id === id);
    if (index >= 0) {
      collection.splice(index, 1);
      commit("Record deleted.");
    }
  }
}

function populateMilestoneForm(item) {
  setValue("milestoneId", item.id);
  setValue("milestonePhase", item.phase);
  setValue("milestoneStatus", item.status);
  setValue("milestoneStage", item.stage);
  setValue("milestoneTask", item.task);
  setValue("milestoneOwner", item.owner);
  setValue("milestoneWindow", item.plannedWindow);
  setValue("milestoneDueDate", item.dueDate);
  setValue("milestoneNotes", item.notes);
  elements.milestoneForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateCriteriaForm(item) {
  setValue("criteriaId", item.id);
  setValue("criteriaUseCase", item.useCase);
  setValue("criteriaImportance", item.importance);
  setValue("criteriaNeedsPlan", item.requiresTestPlan ? "yes" : "no");
  setValue("criteriaStatus", item.status);
  setValue("criteriaMetricTarget", item.metricTarget);
  setValue("criteriaVerifiedBy", item.verifiedBy);
  setValue("criteriaNotes", item.notes);
  elements.criteriaForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateTestTaskForm(item) {
  setValue("testTaskId", item.id);
  setValue("testTaskPhase", item.phase);
  setValue("testTaskStatus", item.status);
  setValue("testTaskStage", item.stage);
  setValue("testTaskTitle", item.task);
  setValue("testTaskAssignee", item.assignee);
  setValue("testTaskStartDate", item.startDate);
  setValue("testTaskDuration", item.duration);
  document.getElementById("testTaskMilestone").checked = item.isMilestone;
  setValue("testTaskNotes", item.notes);
  elements.testTaskForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateActionForm(item) {
  setValue("actionId", item.id);
  setValue("actionTitle", item.title);
  setValue("actionOwner", item.owner);
  setValue("actionCreatedDate", item.createdDate);
  setValue("actionDueDate", item.dueDate);
  setValue("actionStatus", item.status);
  setValue("actionNotes", item.notes);
  elements.actionForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateIssueForm(item) {
  setValue("issueId", item.id);
  setValue("issueTitle", item.title);
  setValue("issueOwner", item.owner);
  setValue("issueCreatedDate", item.createdDate);
  setValue("issueStatus", item.status);
  setValue("issueImpact", item.impact);
  setValue("issueNotes", item.notes);
  elements.issueForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateDiscoveryForm(item) {
  setValue("discoveryId", item.id);
  setValue("discoveryCategory", item.category);
  setValue("discoveryQuestion", item.question);
  setValue("discoveryAnswer", item.answer);
  document.getElementById("discoveryImportant").checked = item.important;
  elements.discoveryForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateArchitectureForm(item) {
  setValue("architectureId", item.id);
  setValue("architectureSystem", item.system);
  setValue("architectureRole", item.role);
  setValue("architectureStrengths", item.strengths);
  setValue("architectureConstraints", item.constraints);
  elements.architectureForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateSizingForm(item) {
  setValue("sizingId", item.id);
  setValue("sizingPhase", item.phase);
  setValue("sizingComponent", item.component);
  setValue("sizingConfiguration", item.configuration);
  setValue("sizingStorage", item.storage);
  setValue("sizingCount", item.count);
  setValue("sizingNotes", item.notes);
  elements.sizingForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearMilestoneForm() {
  elements.milestoneForm.reset();
  setValue("milestoneId", "");
  setValue("milestonePhase", "Solutioning");
  setValue("milestoneStatus", "not-started");
}

function clearCriteriaForm() {
  elements.criteriaForm.reset();
  setValue("criteriaId", "");
  setValue("criteriaImportance", "critical");
  setValue("criteriaNeedsPlan", "yes");
  setValue("criteriaStatus", "not-tested");
}

function clearTestTaskForm() {
  elements.testTaskForm.reset();
  setValue("testTaskId", "");
  setValue("testTaskPhase", "Phase 1");
  setValue("testTaskStatus", "not-started");
}

function clearActionForm() {
  elements.actionForm.reset();
  setValue("actionId", "");
  setValue("actionStatus", "open");
  setValue("actionCreatedDate", todayDateInputValue());
}

function clearIssueForm() {
  elements.issueForm.reset();
  setValue("issueId", "");
  setValue("issueStatus", "open");
  setValue("issueImpact", "high");
  setValue("issueCreatedDate", todayDateInputValue());
}

function clearDiscoveryForm() {
  elements.discoveryForm.reset();
  setValue("discoveryId", "");
}

function clearArchitectureForm() {
  elements.architectureForm.reset();
  setValue("architectureId", "");
}

function clearSizingForm() {
  elements.sizingForm.reset();
  setValue("sizingId", "");
  setValue("sizingPhase", "Phase 1");
}

function exportWorkspace() {
  const payload = {
    exportedAt: new Date().toISOString(),
    workspace: state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  downloadBlob(blob, "signaldesk-workspace.json");
}

function importWorkspace(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || "{}"));
      const nextState = normalizeState(payload.workspace || payload);
      replaceState(nextState);
      commit("Workspace imported.");
      elements.importInput.value = "";
    } catch (error) {
      setMessage(`Import failed: ${error instanceof Error ? error.message : "Invalid JSON."}`);
      elements.importInput.value = "";
    }
  };
  reader.onerror = () => {
    setMessage("Import failed: could not read the selected file.");
    elements.importInput.value = "";
  };
  reader.readAsText(file);
}

function resetWorkspace() {
  if (!window.confirm("Reload the demo workspace? This replaces your current local data.")) {
    return;
  }

  replaceState(normalizeState(cloneValue(demoData)));
  commit("Demo workspace restored.");
}

function replaceState(nextState) {
  state.overview = nextState.overview;
  state.milestones = nextState.milestones;
  state.criteria = nextState.criteria;
  state.testTasks = nextState.testTasks;
  state.actions = nextState.actions;
  state.issues = nextState.issues;
  state.discovery = nextState.discovery;
  state.architecture = nextState.architecture;
  state.sizing = nextState.sizing;

  clearMilestoneForm();
  clearCriteriaForm();
  clearTestTaskForm();
  clearActionForm();
  clearIssueForm();
  clearDiscoveryForm();
  clearArchitectureForm();
  clearSizingForm();
  renderAll();
}

function commit(message) {
  saveState();
  renderAll();
  setMessage(message);
}

function setMessage(message) {
  elements.overviewMessage.textContent = message;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return normalizeState(cloneValue(demoData));
    }

    return normalizeState(JSON.parse(raw));
  } catch (_error) {
    return normalizeState(cloneValue(demoData));
  }
}

function normalizeState(input) {
  const source = input || {};

  return {
    overview: normalizeOverview(source.overview),
    milestones: Array.isArray(source.milestones)
      ? source.milestones.map(normalizeMilestone)
      : [],
    criteria: Array.isArray(source.criteria)
      ? source.criteria.map(normalizeCriterion)
      : [],
    testTasks: Array.isArray(source.testTasks)
      ? source.testTasks.map(normalizeTestTask)
      : [],
    actions: Array.isArray(source.actions)
      ? source.actions.map(normalizeAction)
      : [],
    issues: Array.isArray(source.issues)
      ? source.issues.map(normalizeIssue)
      : [],
    discovery: Array.isArray(source.discovery)
      ? source.discovery.map(normalizeDiscovery)
      : [],
    architecture: Array.isArray(source.architecture)
      ? source.architecture.map(normalizeArchitecture)
      : [],
    sizing: Array.isArray(source.sizing)
      ? source.sizing.map(normalizeSizing)
      : []
  };
}

function normalizeOverview(item) {
  const overview = item || {};
  return {
    accountName: cleanText(overview.accountName),
    champion: cleanText(overview.champion),
    execSponsor: cleanText(overview.execSponsor),
    solutionName: cleanText(overview.solutionName),
    currentStage: stageLabels[overview.currentStage] ? overview.currentStage : "align",
    programHealth: ["on-track", "at-risk", "blocked"].includes(overview.programHealth)
      ? overview.programHealth
      : "on-track",
    decisionDate: normalizeDate(overview.decisionDate),
    primaryOutcome: cleanText(overview.primaryOutcome),
    successDefinition: cleanText(overview.successDefinition),
    whyNow: cleanText(overview.whyNow),
    decisionNotes: cleanText(overview.decisionNotes)
  };
}

function normalizeMilestone(item) {
  const milestone = item || {};
  return {
    id: cleanText(milestone.id) || createId("ms"),
    phase: phaseOrder.hasOwnProperty(milestone.phase) ? milestone.phase : "Phase 1",
    stage: cleanText(milestone.stage),
    task: cleanText(milestone.task),
    owner: cleanText(milestone.owner),
    plannedWindow: cleanText(milestone.plannedWindow),
    dueDate: normalizeDate(milestone.dueDate),
    status: milestoneStatusLabels[milestone.status] ? milestone.status : "not-started",
    notes: cleanText(milestone.notes)
  };
}

function normalizeCriterion(item) {
  const criterion = item || {};
  return {
    id: cleanText(criterion.id) || createId("cr"),
    useCase: cleanText(criterion.useCase),
    importance: importanceLabels[criterion.importance] ? criterion.importance : "medium",
    requiresTestPlan: toBoolean(criterion.requiresTestPlan),
    status: criteriaStatusLabels[criterion.status] ? criterion.status : "not-tested",
    metricTarget: cleanText(criterion.metricTarget),
    verifiedBy: cleanText(criterion.verifiedBy),
    notes: cleanText(criterion.notes)
  };
}

function normalizeTestTask(item) {
  const task = item || {};
  const validStatuses = ["not-started", "in-progress", "blocked", "complete"];

  return {
    id: cleanText(task.id) || createId("tt"),
    phase: ["Phase 1", "Phase 2"].includes(task.phase) ? task.phase : "Phase 1",
    stage: cleanText(task.stage),
    task: cleanText(task.task),
    assignee: cleanText(task.assignee),
    status: validStatuses.includes(task.status) ? task.status : "not-started",
    startDate: normalizeDate(task.startDate),
    duration: cleanText(task.duration),
    isMilestone: toBoolean(task.isMilestone),
    notes: cleanText(task.notes)
  };
}

function normalizeAction(item) {
  const action = item || {};
  return {
    id: cleanText(action.id) || createId("ac"),
    title: cleanText(action.title),
    owner: cleanText(action.owner),
    createdDate: normalizeDate(action.createdDate) || todayDateInputValue(),
    dueDate: normalizeDate(action.dueDate),
    status: actionStatusLabels[action.status] ? action.status : "open",
    notes: cleanText(action.notes)
  };
}

function normalizeIssue(item) {
  const issue = item || {};
  return {
    id: cleanText(issue.id) || createId("is"),
    title: cleanText(issue.title),
    owner: cleanText(issue.owner),
    createdDate: normalizeDate(issue.createdDate) || todayDateInputValue(),
    status: issueStatusLabels[issue.status] ? issue.status : "open",
    impact: importanceLabels[issue.impact] ? issue.impact : "medium",
    notes: cleanText(issue.notes)
  };
}

function normalizeDiscovery(item) {
  const discovery = item || {};
  return {
    id: cleanText(discovery.id) || createId("dc"),
    category: cleanText(discovery.category),
    question: cleanText(discovery.question),
    answer: cleanText(discovery.answer),
    important: toBoolean(discovery.important)
  };
}

function normalizeArchitecture(item) {
  const architecture = item || {};
  return {
    id: cleanText(architecture.id) || createId("ar"),
    system: cleanText(architecture.system),
    role: cleanText(architecture.role),
    strengths: cleanText(architecture.strengths),
    constraints: cleanText(architecture.constraints)
  };
}

function normalizeSizing(item) {
  const sizing = item || {};
  return {
    id: cleanText(sizing.id) || createId("sz"),
    phase: ["Phase 1", "Phase 2"].includes(sizing.phase) ? sizing.phase : "Phase 1",
    component: cleanText(sizing.component),
    configuration: cleanText(sizing.configuration),
    storage: cleanText(sizing.storage),
    count: Math.max(0, Number(sizing.count) || 0),
    notes: cleanText(sizing.notes)
  };
}

function renderMilestoneCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="tag-pill tag-phase">${escapeHtml(item.phase)}</span>
            <span class="tag-pill tag-stage">${escapeHtml(item.stage || "Stage")}</span>
            <span class="status-pill status-${escapeHtml(item.status)}">${
              milestoneStatusLabels[item.status]
            }</span>
          </div>
          <h3>${escapeHtml(item.task || "Untitled milestone")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="meta-grid">
        <p class="record-meta"><strong>Owner:</strong> ${
          escapeHtml(item.owner || "Unassigned")
        }</p>
        <p class="record-meta"><strong>Window:</strong> ${
          escapeHtml(item.plannedWindow || "Not set")
        }</p>
        <p class="record-meta"><strong>Due:</strong> ${
          item.dueDate ? formatDate(item.dueDate) : "Not set"
        }</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function renderTestTaskCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="tag-pill tag-phase">${escapeHtml(item.phase)}</span>
            <span class="tag-pill tag-stage">${escapeHtml(item.stage || "Stage")}</span>
            <span class="status-pill status-${escapeHtml(item.status)}">${labelFor(
              item.status,
              {
                "not-started": "Not started",
                "in-progress": "In progress",
                blocked: "Blocked",
                complete: "Complete"
              }
            )}</span>
            ${
              item.isMilestone
                ? '<span class="status-pill status-yes">Milestone task</span>'
                : ""
            }
          </div>
          <h3>${escapeHtml(item.task || "Untitled task")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="meta-grid">
        <p class="record-meta"><strong>Assignee:</strong> ${
          escapeHtml(item.assignee || "Unassigned")
        }</p>
        <p class="record-meta"><strong>Start:</strong> ${
          item.startDate ? formatDate(item.startDate) : "Not set"
        }</p>
        <p class="record-meta"><strong>Duration:</strong> ${
          escapeHtml(item.duration || "Not set")
        }</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function renderActionCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="status-pill status-${escapeHtml(item.status)}">${
              actionStatusLabels[item.status]
            }</span>
            ${
              isOverdue(item.dueDate, item.status === "done")
                ? '<span class="status-pill status-blocked">Overdue</span>'
                : ""
            }
          </div>
          <h3>${escapeHtml(item.title || "Untitled action")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="meta-grid">
        <p class="record-meta"><strong>Owner:</strong> ${
          escapeHtml(item.owner || "Unassigned")
        }</p>
        <p class="record-meta"><strong>Created:</strong> ${
          item.createdDate ? formatDate(item.createdDate) : "Not set"
        }</p>
        <p class="record-meta"><strong>Due:</strong> ${
          item.dueDate ? formatDate(item.dueDate) : "Not set"
        }</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function renderIssueCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="status-pill status-${escapeHtml(item.status)}">${
              issueStatusLabels[item.status]
            }</span>
            <span class="status-pill status-${escapeHtml(item.impact)}">${
              importanceLabels[item.impact]
            } impact</span>
          </div>
          <h3>${escapeHtml(item.title || "Untitled issue")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="meta-grid">
        <p class="record-meta"><strong>Owner:</strong> ${
          escapeHtml(item.owner || "Unassigned")
        }</p>
        <p class="record-meta"><strong>Created:</strong> ${
          item.createdDate ? formatDate(item.createdDate) : "Not set"
        }</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function renderDiscoveryCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="tag-pill tag-stage">${escapeHtml(item.category || "Category")}</span>
            ${
              item.important
                ? '<span class="tag-pill tag-important">Required</span>'
                : ""
            }
          </div>
          <h3>${escapeHtml(item.question || "Untitled question")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <p class="detail-text">${item.answer ? formatText(item.answer) : "No answer captured yet."}</p>
    </article>
  `;
}

function renderArchitectureCard(item) {
  return `
    <article class="architecture-card">
      <div class="record-head">
        <div>
          <p class="section-kicker">System</p>
          <h3>${escapeHtml(item.system || "Untitled system")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <p class="detail-text"><strong>Role:</strong> ${
        item.role ? formatText(item.role) : "No role summary."
      }</p>
      <p class="detail-text"><strong>Strengths:</strong> ${
        item.strengths ? formatText(item.strengths) : "No strengths noted."
      }</p>
      <p class="detail-text"><strong>Constraints:</strong> ${
        item.constraints ? formatText(item.constraints) : "No constraints noted."
      }</p>
    </article>
  `;
}

function renderSizingCard(item) {
  return `
    <article class="record-card">
      <div class="record-head">
        <div>
          <div class="badge-row">
            <span class="tag-pill tag-phase">${escapeHtml(item.phase)}</span>
          </div>
          <h3>${escapeHtml(item.component || "Untitled component")}</h3>
        </div>
        <div class="record-actions">
          <button class="btn-inline" type="button" data-action="edit" data-id="${
            item.id
          }">Edit</button>
          <button
            class="btn-inline is-danger"
            type="button"
            data-action="delete"
            data-id="${item.id}"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="meta-grid">
        <p class="record-meta"><strong>Config:</strong> ${
          escapeHtml(item.configuration || "Not set")
        }</p>
        <p class="record-meta"><strong>Storage:</strong> ${
          escapeHtml(item.storage || "Not set")
        }</p>
        <p class="record-meta"><strong>Count:</strong> ${item.count || 0}</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function getProcessCards() {
  const importantDiscovery = state.discovery.filter((item) => item.important);
  const importantAnswered = importantDiscovery.filter((item) => item.answer).length;
  const prepMilestones = state.milestones.filter((item) =>
    ["Solutioning", "Phase 1"].includes(item.phase) && /prep|solutioning/i.test(item.stage)
  );
  const prepComplete = prepMilestones.filter((item) => item.status === "complete").length;
  const validatedCriteria = state.criteria.filter((item) => item.status !== "not-tested").length;
  const completedTasks = state.testTasks.filter((item) => item.status === "complete").length;
  const decisionMilestones = state.milestones.filter((item) => item.phase === "Decision");
  const resolvedIssues = state.issues.filter((item) => item.status === "resolved").length;

  return [
    {
      id: "align",
      step: "Step 1",
      title: "Align",
      summary: "Lock the business case, owners, and must-win success criteria.",
      metric: `${importantAnswered}/${importantDiscovery.length || 0} required discovery answers captured`
    },
    {
      id: "design",
      step: "Step 2",
      title: "Design",
      summary: "Define the milestone path, pilot scope, and execution sequence.",
      metric: `${prepComplete}/${prepMilestones.length || 0} prep milestones complete`
    },
    {
      id: "validate",
      step: "Step 3",
      title: "Validate",
      summary: "Run the work, verify the numbers, and make the readout credible.",
      metric: `${validatedCriteria} criteria in evaluation, ${completedTasks} tasks complete`
    },
    {
      id: "decide",
      step: "Step 4",
      title: "Decide",
      summary: "Drive the commercial and production decision without losing the thread.",
      metric: `${resolvedIssues}/${state.issues.length || 0} issues resolved, ${
        decisionMilestones.filter((item) => item.status === "complete").length
      } decision milestones complete`
    }
  ];
}

function getNextCheckpoint() {
  const candidates = [
    ...state.milestones
      .filter((item) => item.status !== "complete" && item.dueDate)
      .map((item) => ({
        date: item.dueDate,
        label: item.task
      })),
    ...state.actions
      .filter((item) => item.status !== "done" && item.dueDate)
      .map((item) => ({
        date: item.dueDate,
        label: item.title
      }))
  ].sort((left, right) => left.date.localeCompare(right.date));

  if (!candidates.length) {
    return "No upcoming date";
  }

  const next = candidates[0];
  return `${formatDate(next.date)} · ${truncate(next.label, 40)}`;
}

function renderSummaryList(items) {
  const filtered = items.filter(Boolean);
  if (!filtered.length) {
    return "<p>No data yet.</p>";
  }

  return `<ul>${filtered
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function upsertCollectionItem(collection, item) {
  const index = collection.findIndex((entry) => entry.id === item.id);

  if (index >= 0) {
    collection[index] = item;
    return;
  }

  collection.push(item);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const groupKey = item[key] || "Other";
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
}

function sortMilestones(left, right) {
  const phaseDifference = phaseOrder[left.phase] - phaseOrder[right.phase];
  if (phaseDifference !== 0) {
    return phaseDifference;
  }

  const dateDifference = compareDateStrings(left.dueDate, right.dueDate);
  if (dateDifference !== 0) {
    return dateDifference;
  }

  return left.task.localeCompare(right.task);
}

function sortCriteria(left, right) {
  const importanceRank = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3
  };

  const importanceDifference =
    importanceRank[left.importance] - importanceRank[right.importance];
  if (importanceDifference !== 0) {
    return importanceDifference;
  }

  return left.useCase.localeCompare(right.useCase);
}

function sortTestTasks(left, right) {
  const phaseDifference = phaseOrder[left.phase] - phaseOrder[right.phase];
  if (phaseDifference !== 0) {
    return phaseDifference;
  }

  const dateDifference = compareDateStrings(left.startDate, right.startDate);
  if (dateDifference !== 0) {
    return dateDifference;
  }

  return left.task.localeCompare(right.task);
}

function sortActions(left, right) {
  const leftDone = left.status === "done";
  const rightDone = right.status === "done";

  if (leftDone !== rightDone) {
    return leftDone ? 1 : -1;
  }

  return compareDateStrings(left.dueDate, right.dueDate) || left.title.localeCompare(right.title);
}

function sortIssues(left, right) {
  const rank = {
    high: 0,
    medium: 1,
    low: 2
  };

  const impactDifference = rank[left.impact] - rank[right.impact];
  if (impactDifference !== 0) {
    return impactDifference;
  }

  return compareDateStrings(left.createdDate, right.createdDate) || left.title.localeCompare(right.title);
}

function sortDiscovery(left, right) {
  if (left.important !== right.important) {
    return left.important ? -1 : 1;
  }

  return left.category.localeCompare(right.category);
}

function sortSizing(left, right) {
  const phaseDifference = phaseOrder[left.phase] - phaseOrder[right.phase];
  if (phaseDifference !== 0) {
    return phaseDifference;
  }

  return left.component.localeCompare(right.component);
}

function compareDateStrings(left, right) {
  if (left && right) {
    return left.localeCompare(right);
  }

  if (left) {
    return -1;
  }

  if (right) {
    return 1;
  }

  return 0;
}

function isOverdue(dateString, completed) {
  if (!dateString || completed) {
    return false;
  }

  return dateString < todayDateInputValue();
}

function setValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.value = value || "";
  }
}

function labelFor(value, labels) {
  return labels[value] || value;
}

function formatDate(dateString) {
  if (!dateString) {
    return "Not set";
  }

  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function normalizeDate(value) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function cleanText(value) {
  return String(value || "").trim();
}

function toBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value || "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "on"].includes(normalized);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatText(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}...`;
}

function todayDateInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
