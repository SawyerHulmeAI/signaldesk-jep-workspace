const STORAGE_KEY = "signaldesk-jep-template-v2";

const phaseOrder = {
  Discovery: 0,
  "Mutual Plan": 1,
  Validation: 2,
  Decision: 3
};

const stageLabels = {
  align: "Align",
  design: "Plan",
  validate: "Validate",
  decide: "Advance"
};

const milestoneStatusLabels = {
  "not-started": "Not started",
  "on-track": "On track",
  "at-risk": "At risk",
  blocked: "Blocked",
  complete: "Complete"
};

const criteriaStatusLabels = {
  "not-tested": "Not reviewed",
  watch: "In review",
  pass: "Met",
  fail: "Missed"
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
    accountName: "",
    accountExecutive: "",
    salesEngineer: "",
    customerLead: "",
    solutionName: "",
    currentStage: "align",
    programHealth: "on-track",
    decisionDate: "",
    primaryOutcome: "",
    successDefinition: "",
    whyNow: "",
    decisionNotes: ""
  },
  milestones: [
    {
      id: "ms-1",
      phase: "Discovery",
      stage: "Discovery",
      task: "Customer goals and stakeholders aligned",
      owner: "AE / Customer",
      plannedWindow: "",
      dueDate: "",
      status: "not-started",
      notes: "Use this for the moment the team agrees what matters, who is involved, and why the deal is moving now."
    },
    {
      id: "ms-2",
      phase: "Mutual Plan",
      stage: "Mutual Plan",
      task: "Joint execution plan reviewed with the customer",
      owner: "AE / SE / Customer",
      plannedWindow: "",
      dueDate: "",
      status: "not-started",
      notes: "Use this as the checkpoint where owners, criteria, and next steps are mutually visible."
    },
    {
      id: "ms-3",
      phase: "Validation",
      stage: "Validation",
      task: "Technical and business proof points completed",
      owner: "SE / Customer",
      plannedWindow: "",
      dueDate: "",
      status: "not-started",
      notes: "Use this for demos, workshops, proof sessions, references, or any validation the deal needs."
    },
    {
      id: "ms-4",
      phase: "Decision",
      stage: "Decision",
      task: "Commercial next step and decision process confirmed",
      owner: "AE / Customer",
      plannedWindow: "",
      dueDate: "",
      status: "not-started",
      notes: "Use this for proposal, procurement, security, or executive alignment steps that move the deal forward."
    }
  ],
  criteria: [
    {
      id: "cr-1",
      useCase: "Customer outcome is clearly defined",
      importance: "critical",
      requiresTestPlan: false,
      status: "not-tested",
      metricTarget:
        "Capture the business outcome, the customer language for success, and what would make them say yes to the next step.",
      verifiedBy: "",
      notes: ""
    },
    {
      id: "cr-2",
      useCase: "Technical validation criteria are agreed",
      importance: "high",
      requiresTestPlan: true,
      status: "not-tested",
      metricTarget:
        "List the technical proof points, the owner of each one, and the evidence needed to call them complete.",
      verifiedBy: "",
      notes: ""
    },
    {
      id: "cr-3",
      useCase: "Buying process and stakeholders are mapped",
      importance: "critical",
      requiresTestPlan: false,
      status: "not-tested",
      metricTarget:
        "Identify the customer lead, decision makers, blockers, and what approvals must happen before the deal can advance.",
      verifiedBy: "",
      notes: ""
    },
    {
      id: "cr-4",
      useCase: "Next-step decision path is mutually aligned",
      importance: "high",
      requiresTestPlan: false,
      status: "not-tested",
      metricTarget:
        "Define the next checkpoint, expected outcome, and the commercial or technical actions needed to get there.",
      verifiedBy: "",
      notes: ""
    }
  ],
  testTasks: [
    {
      id: "tt-1",
      phase: "Discovery",
      stage: "Discovery",
      task: "Gather current workflow, goals, and risks",
      assignee: "AE / SE",
      status: "not-started",
      startDate: "",
      duration: "",
      isMilestone: false,
      notes: "Use this for account prep, stakeholder mapping, and problem framing."
    },
    {
      id: "tt-2",
      phase: "Mutual Plan",
      stage: "Planning",
      task: "Review the JEP with the customer and confirm owners",
      assignee: "AE / Customer",
      status: "not-started",
      startDate: "",
      duration: "",
      isMilestone: true,
      notes: "Use this to confirm who owns each workstream and what needs to happen next."
    },
    {
      id: "tt-3",
      phase: "Validation",
      stage: "Validation",
      task: "Run workshops, demos, or proof sessions",
      assignee: "SE / Customer",
      status: "not-started",
      startDate: "",
      duration: "",
      isMilestone: false,
      notes: "Use this for technical validation, business alignment, or internal review sessions."
    },
    {
      id: "tt-4",
      phase: "Decision",
      stage: "Decision",
      task: "Summarize findings and confirm the next commercial step",
      assignee: "AE",
      status: "not-started",
      startDate: "",
      duration: "",
      isMilestone: true,
      notes: "Use this to wrap the work, align the story, and advance the deal."
    }
  ],
  actions: [],
  issues: [],
  discovery: [
    {
      id: "dc-1",
      category: "Business outcome",
      question: "What business result matters most to the customer right now?",
      answer: "",
      important: true
    },
    {
      id: "dc-2",
      category: "Stakeholders",
      question: "Which internal and customer stakeholders need to approve or support next steps?",
      answer: "",
      important: true
    },
    {
      id: "dc-3",
      category: "Workflow",
      question: "What current workflow, process, or tools are in scope for this deal?",
      answer: "",
      important: true
    },
    {
      id: "dc-4",
      category: "Risks",
      question: "What could slow this deal down or cause the plan to slip?",
      answer: "",
      important: true
    }
  ],
  architecture: [],
  sizing: []
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
  setValue("accountExecutive", overview.accountExecutive);
  setValue("salesEngineer", overview.salesEngineer);
  setValue("customerLead", overview.customerLead);
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
    `AE: ${state.overview.accountExecutive || "Unassigned"}. SE: ${
      state.overview.salesEngineer || "Unassigned"
    }. Customer lead: ${state.overview.customerLead || "Not captured"}.`,
    state.overview.primaryOutcome || "Primary outcome not defined yet."
  ]);

  elements.summaryProof.innerHTML = renderSummaryList([
    `${state.criteria.filter((item) => item.status === "pass").length} mutual criteria are currently marked met.`,
    `${answeredDiscovery} discovery prompts have confirmed answers captured.`,
    criticalUnproven.length
      ? `${criticalUnproven.length} critical criteria still need proof or a stronger readout.`
      : "Critical criteria currently have enough evidence recorded."
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
      '<div class="empty-state">Add the mutual criteria that define what alignment and validation look like.</div>';
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
                  ${item.requiresTestPlan ? "Needs workstream" : "No workstream"}
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
      '<div class="empty-state">Add the concrete workstreams and checkpoints that support the joint execution plan.</div>';
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
      '<div class="empty-state">No active blockers logged.</div>';
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
      '<div class="empty-state">Add the current workflows, systems, or process notes the team needs for context.</div>';
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
      '<div class="empty-state">Capture the assumptions, dependencies, and operating notes the team is working from.</div>';
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
    accountExecutive: formData.get("accountExecutive"),
    salesEngineer: formData.get("salesEngineer"),
    customerLead: formData.get("customerLead"),
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
  commit("Criterion saved.");
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
  commit("Workstream saved.");
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
  commit("Discovery note saved.");
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
  commit("Environment note saved.");
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
  commit("Assumption saved.");
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
  setValue("milestonePhase", "Discovery");
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
  setValue("testTaskPhase", "Discovery");
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
  setValue("sizingPhase", "Discovery");
}

function exportWorkspace() {
  const payload = {
    exportedAt: new Date().toISOString(),
    workspace: state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  downloadBlob(blob, "signaldesk-jep-workspace.json");
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
  if (!window.confirm("Reload the blank template? This replaces your current local data.")) {
    return;
  }

  replaceState(normalizeState(cloneValue(demoData)));
  commit("Template restored.");
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
    accountExecutive: cleanText(overview.accountExecutive),
    salesEngineer: cleanText(overview.salesEngineer),
    customerLead: cleanText(overview.customerLead),
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
    phase: phaseOrder.hasOwnProperty(milestone.phase) ? milestone.phase : "Discovery",
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
    phase: phaseOrder.hasOwnProperty(task.phase) ? task.phase : "Discovery",
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
    phase: phaseOrder.hasOwnProperty(sizing.phase) ? sizing.phase : "Discovery",
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
        <p class="record-meta"><strong>Owner / detail:</strong> ${
          escapeHtml(item.configuration || "Not set")
        }</p>
        <p class="record-meta"><strong>Status:</strong> ${
          escapeHtml(item.storage || "Not set")
        }</p>
        <p class="record-meta"><strong>Priority:</strong> ${item.count || 0}</p>
      </div>
      <p class="detail-text">${item.notes ? formatText(item.notes) : "No notes yet."}</p>
    </article>
  `;
}

function getProcessCards() {
  const importantDiscovery = state.discovery.filter((item) => item.important);
  const importantAnswered = importantDiscovery.filter((item) => item.answer).length;
  const planningMilestones = state.milestones.filter((item) =>
    ["Discovery", "Mutual Plan"].includes(item.phase)
  );
  const planningComplete = planningMilestones.filter((item) => item.status === "complete").length;
  const validatedCriteria = state.criteria.filter((item) => item.status !== "not-tested").length;
  const completedTasks = state.testTasks.filter((item) => item.status === "complete").length;
  const decisionMilestones = state.milestones.filter((item) => item.phase === "Decision");
  const resolvedIssues = state.issues.filter((item) => item.status === "resolved").length;

  return [
    {
      id: "align",
      step: "Step 1",
      title: "Align",
      summary: "Lock the account context, internal owners, and mutual success criteria.",
      metric: `${importantAnswered}/${importantDiscovery.length || 0} required discovery answers captured`
    },
    {
      id: "design",
      step: "Step 2",
      title: "Plan",
      summary: "Define the milestone path, customer checkpoints, and working cadence.",
      metric: `${planningComplete}/${planningMilestones.length || 0} planning milestones complete`
    },
    {
      id: "validate",
      step: "Step 3",
      title: "Validate",
      summary: "Run the agreed workstreams, capture proof, and keep the readout current.",
      metric: `${validatedCriteria} criteria in evaluation, ${completedTasks} tasks complete`
    },
    {
      id: "decide",
      step: "Step 4",
      title: "Advance",
      summary: "Keep the next-step decision path clear without losing the operating thread.",
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
