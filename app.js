const STORAGE_KEY = "common-ground-workspace-v1";

const overviewStageOptions = {
  align: "Align",
  scope: "Scope",
  validate: "Validate",
  decide: "Decide"
};

const healthOptions = {
  "on-track": "On track",
  watch: "Watch",
  risk: "Risk"
};

const planStageOptions = {
  "": "Select stage",
  discovery: "Discovery",
  "mutual-plan": "Mutual Plan",
  validation: "Validation",
  decision: "Decision"
};

const planSignalOptions = {
  track: "Track",
  watch: "Watch",
  risk: "Risk"
};

const criteriaImportanceOptions = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low"
};

const criteriaStatusOptions = {
  "not-reviewed": "Not reviewed",
  "in-review": "In review",
  met: "Met",
  missed: "Missed"
};

const testStepStatusOptions = {
  "not-started": "Not started",
  "in-progress": "In progress",
  done: "Done"
};

const blockerStatusOptions = {
  open: "Open",
  mitigating: "Mitigating",
  resolved: "Resolved"
};

const blockerImpactOptions = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

const contextTypeOptions = {
  business: "Business",
  technical: "Technical",
  buying: "Buying",
  architecture: "Architecture",
  assumption: "Assumption"
};

const orgSideOptions = {
  "": "Select side",
  internal: "Our team",
  customer: "Customer team",
  partner: "Partner",
  shared: "Shared"
};

const orgChartViewOptions = {
  all: "Shared view",
  internal: "Our team",
  customer: "Customer team"
};

const orgCardSizeOptions = {
  compact: {
    label: "Compact cards",
    width: 176,
    height: 116,
    columnGap: 36,
    rowGap: 84,
    minHeight: 460
  },
  standard: {
    label: "Standard cards",
    width: 220,
    height: 142,
    columnGap: 64,
    rowGap: 120,
    minHeight: 520
  }
};

const resourceTypeOptions = {
  "": "Select type",
  blog: "Blog",
  video: "Video",
  recording: "Recording",
  deck: "Deck",
  architecture: "Architecture",
  guide: "Guide",
  faq: "FAQ",
  contract: "Contract",
  other: "Other"
};

const resourceAudienceOptions = {
  "": "Select audience",
  all: "All",
  executive: "Executive",
  business: "Business",
  technical: "Technical",
  internal: "Internal"
};

const accessOptions = {
  "": "Select access",
  shared: "Shared",
  internal: "Internal"
};

const assetCategoryOptions = {
  "": "Select category",
  architecture: "Architecture",
  contract: "Contract",
  pricing: "Pricing",
  proposal: "Proposal",
  security: "Security",
  recording: "Recording",
  demo: "Demo",
  note: "Note",
  faq: "FAQ"
};

const assetStatusOptions = {
  "": "Select status",
  draft: "Draft",
  ready: "Ready",
  shared: "Shared",
  pending: "Pending",
  signed: "Signed"
};

const visualCategoryOptions = {
  architecture: "Architecture",
  workflow: "Workflow",
  org: "Org chart",
  screenshot: "Screenshot",
  benchmark: "Benchmark",
  other: "Other"
};

const checklistKeys = [
  "overview",
  "plan",
  "criteria",
  "testPlan",
  "actions",
  "blockers",
  "context"
];

const rowFactories = {
  planRows: createPlanRow,
  criteriaRows: createCriteriaRow,
  testPlanRows: createTestPlanRow,
  actions: createActionRow,
  blockers: createBlockerRow,
  contextRows: createContextRow,
  orgMapRows: createOrgMapRow,
  resources: createResourceRow,
  assets: createAssetRow
};

const collectionKeys = Object.keys(rowFactories);
const ORG_BOARD_PADDING = 36;

const state = loadState();
let orgDragState = null;
let suppressOrgCardClick = false;
let resizeFrame = 0;

const elements = {
  overviewForm: document.getElementById("overviewForm"),
  appTabs: Array.from(document.querySelectorAll("[data-tab]")),
  tabPanels: Array.from(document.querySelectorAll("[data-tab-panel]")),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  resetTemplateBtn: document.getElementById("resetTemplateBtn"),
  workspaceMessage: document.getElementById("workspaceMessage"),
  sharedSlackLink: document.getElementById("sharedSlackLink"),
  sharedSlackOpen: document.getElementById("sharedSlackOpen"),
  statusKicker: document.getElementById("statusKicker"),
  statusTitle: document.getElementById("statusTitle"),
  statusSummary: document.getElementById("statusSummary"),
  statusContent: document.getElementById("statusContent"),
  legendKicker: document.getElementById("legendKicker"),
  legendTitle: document.getElementById("legendTitle"),
  legendContent: document.getElementById("legendContent"),
  legendNote: document.getElementById("legendNote"),
  orgViewButtons: Array.from(document.querySelectorAll("[data-org-view]")),
  orgCardSizeButtons: Array.from(document.querySelectorAll("[data-org-card-size]")),
  orgBoardShell: document.getElementById("orgBoardShell"),
  orgBoardNote: document.getElementById("orgBoardNote"),
  metricValues: [
    document.getElementById("metricValue1"),
    document.getElementById("metricValue2"),
    document.getElementById("metricValue3"),
    document.getElementById("metricValue4")
  ],
  metricLabels: [
    document.getElementById("metricLabel1"),
    document.getElementById("metricLabel2"),
    document.getElementById("metricLabel3"),
    document.getElementById("metricLabel4")
  ],
  planTableHead: document.getElementById("planTableHead"),
  criteriaTableHead: document.getElementById("criteriaTableHead"),
  testPlanTableHead: document.getElementById("testPlanTableHead"),
  actionsTableHead: document.getElementById("actionsTableHead"),
  blockersTableHead: document.getElementById("blockersTableHead"),
  contextTableHead: document.getElementById("contextTableHead"),
  orgMapTableHead: document.getElementById("orgMapTableHead"),
  resourcesTableHead: document.getElementById("resourcesTableHead"),
  assetsTableHead: document.getElementById("assetsTableHead"),
  planTableBody: document.getElementById("planTableBody"),
  criteriaTableBody: document.getElementById("criteriaTableBody"),
  testPlanTableBody: document.getElementById("testPlanTableBody"),
  actionsTableBody: document.getElementById("actionsTableBody"),
  blockersTableBody: document.getElementById("blockersTableBody"),
  contextTableBody: document.getElementById("contextTableBody"),
  orgMapTableBody: document.getElementById("orgMapTableBody"),
  resourcesTableBody: document.getElementById("resourcesTableBody"),
  assetsTableBody: document.getElementById("assetsTableBody"),
  orgChartBoard: document.getElementById("orgChartBoard"),
  orgChartLines: document.getElementById("orgChartLines"),
  orgCardLayer: document.getElementById("orgCardLayer"),
  resourcePreviewGrid: document.getElementById("resourcePreviewGrid"),
  documentGallery: document.getElementById("documentGallery"),
  visualGallery: document.getElementById("visualGallery"),
  addPlanRow: document.getElementById("addPlanRow"),
  addCriteriaRow: document.getElementById("addCriteriaRow"),
  addTestPlanRow: document.getElementById("addTestPlanRow"),
  addActionRow: document.getElementById("addActionRow"),
  addBlockerRow: document.getElementById("addBlockerRow"),
  addContextRow: document.getElementById("addContextRow"),
  addOrgMapRow: document.getElementById("addOrgMapRow"),
  addResourceRow: document.getElementById("addResourceRow"),
  addAssetRow: document.getElementById("addAssetRow"),
  addPlanColumn: document.getElementById("addPlanColumn"),
  addCriteriaColumn: document.getElementById("addCriteriaColumn"),
  addTestPlanColumn: document.getElementById("addTestPlanColumn"),
  addActionColumn: document.getElementById("addActionColumn"),
  addBlockerColumn: document.getElementById("addBlockerColumn"),
  addContextColumn: document.getElementById("addContextColumn"),
  addOrgMapColumn: document.getElementById("addOrgMapColumn"),
  addResourceColumn: document.getElementById("addResourceColumn"),
  addAssetColumn: document.getElementById("addAssetColumn"),
  diagramInput: document.getElementById("diagramInput"),
  documentInput: document.getElementById("documentInput")
};

initialize();

function initialize() {
  bindEvents();
  renderAll();
  setMessage("Autosaves locally.");
}

function bindEvents() {
  if (elements.overviewForm) {
    elements.overviewForm.addEventListener("submit", (event) => event.preventDefault());
    elements.overviewForm.addEventListener("input", handleOverviewEdit);
    elements.overviewForm.addEventListener("change", handleOverviewEdit);
  }

  if (elements.sharedSlackLink) {
    elements.sharedSlackLink.addEventListener("input", handleOverviewEdit);
    elements.sharedSlackLink.addEventListener("change", handleOverviewEdit);
  }

  elements.orgViewButtons.forEach((button) => {
    button.addEventListener("click", () => setOrgChartView(button.dataset.orgView));
  });

  elements.orgCardSizeButtons.forEach((button) => {
    button.addEventListener("click", () => setOrgCardSize(button.dataset.orgCardSize));
  });

  if (elements.exportBtn) {
    elements.exportBtn.addEventListener("click", exportWorkspace);
  }

  if (elements.importInput) {
    elements.importInput.addEventListener("change", importWorkspace);
  }

  if (elements.resetTemplateBtn) {
    elements.resetTemplateBtn.addEventListener("click", resetWorkspace);
  }

  elements.appTabs.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  bindAddRow(elements.addPlanRow, "planRows");
  bindAddRow(elements.addCriteriaRow, "criteriaRows");
  bindAddRow(elements.addTestPlanRow, "testPlanRows");
  bindAddRow(elements.addActionRow, "actions");
  bindAddRow(elements.addBlockerRow, "blockers");
  bindAddRow(elements.addContextRow, "contextRows");
  bindAddRow(elements.addOrgMapRow, "orgMapRows");
  bindAddRow(elements.addResourceRow, "resources");
  bindAddRow(elements.addAssetRow, "assets");

  bindAddColumn(elements.addPlanColumn, "planRows");
  bindAddColumn(elements.addCriteriaColumn, "criteriaRows");
  bindAddColumn(elements.addTestPlanColumn, "testPlanRows");
  bindAddColumn(elements.addActionColumn, "actions");
  bindAddColumn(elements.addBlockerColumn, "blockers");
  bindAddColumn(elements.addContextColumn, "contextRows");
  bindAddColumn(elements.addOrgMapColumn, "orgMapRows");
  bindAddColumn(elements.addResourceColumn, "resources");
  bindAddColumn(elements.addAssetColumn, "assets");

  if (elements.statusContent) {
    elements.statusContent.addEventListener("change", handleChecklistToggle);
  }

  if (elements.diagramInput) {
    elements.diagramInput.addEventListener("change", handleDiagramUpload);
  }

  if (elements.documentInput) {
    elements.documentInput.addEventListener("change", handleDocumentUpload);
  }

  if (elements.orgCardLayer) {
    elements.orgCardLayer.addEventListener("pointerdown", handleOrgCardPointerDown);
    elements.orgCardLayer.addEventListener("click", handleOrgCardClick);
  }

  document.addEventListener("pointermove", handleOrgCardPointerMove);
  document.addEventListener("pointerup", handleOrgCardPointerUp);
  document.addEventListener("pointercancel", handleOrgCardPointerUp);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleWindowResize);
  }

  document.addEventListener("input", handleInlineEdit);
  document.addEventListener("change", handleInlineEdit);
  document.addEventListener("click", handleDeleteClick);
}

function bindAddRow(element, collectionName) {
  if (!element) {
    return;
  }

  element.addEventListener("click", () => addRow(collectionName));
}

function bindAddColumn(element, collectionName) {
  if (!element) {
    return;
  }

  element.addEventListener("click", () => addColumn(collectionName));
}

function handleOrgCardPointerDown(event) {
  const card = event.target.closest("[data-org-card]");
  if (!card || (typeof event.button === "number" && event.button !== 0)) {
    return;
  }

  const item = state.orgMapRows.find((person) => person.id === card.dataset.orgCard);
  if (!item || !elements.orgChartBoard) {
    return;
  }

  const boardRect = elements.orgChartBoard.getBoundingClientRect();
  orgDragState = {
    id: item.id,
    pointerId: event.pointerId,
    offsetX: event.clientX - boardRect.left - item.x,
    offsetY: event.clientY - boardRect.top - item.y,
    moved: false,
    startX: item.x,
    startY: item.y
  };

  card.classList.add("is-dragging");

  if (card.setPointerCapture) {
    try {
      card.setPointerCapture(event.pointerId);
    } catch (_error) {
      // Ignore pointer capture failures in unsupported environments.
    }
  }

  event.preventDefault();
}

function handleOrgCardPointerMove(event) {
  if (!orgDragState || event.pointerId !== orgDragState.pointerId || !elements.orgChartBoard) {
    return;
  }

  const item = state.orgMapRows.find((person) => person.id === orgDragState.id);
  if (!item) {
    return;
  }

  const metrics = getOrgMetrics();
  autoScrollOrgBoardShell(event);
  const boardRect = elements.orgChartBoard.getBoundingClientRect();
  const rawX = Math.round(event.clientX - boardRect.left - orgDragState.offsetX);
  const rawY = Math.round(event.clientY - boardRect.top - orgDragState.offsetY);
  expandOrgBoardForDrag(rawX, rawY);

  const boardWidth = Math.max(
    elements.orgChartBoard.scrollWidth,
    elements.orgChartBoard.clientWidth,
    metrics.width + ORG_BOARD_PADDING * 2
  );
  const boardHeight = Math.max(
    elements.orgChartBoard.scrollHeight,
    elements.orgChartBoard.clientHeight,
    metrics.height + ORG_BOARD_PADDING * 2
  );

  const nextX = clamp(
    rawX,
    ORG_BOARD_PADDING / 2,
    boardWidth - metrics.width - ORG_BOARD_PADDING / 2
  );
  const nextY = clamp(
    rawY,
    ORG_BOARD_PADDING / 2,
    boardHeight - metrics.height - ORG_BOARD_PADDING / 2
  );

  item.x = nextX;
  item.y = nextY;
  orgDragState.moved =
    orgDragState.moved ||
    Math.abs(nextX - orgDragState.startX) > 3 ||
    Math.abs(nextY - orgDragState.startY) > 3;

  updateOrgCardPosition(item.id, item.x, item.y);
  elements.orgChartLines.innerHTML = renderOrgLines(getVisibleOrgRows(true).filter(isOrgMapRowActive));
}

function handleOrgCardPointerUp(event) {
  if (!orgDragState || event.pointerId !== orgDragState.pointerId) {
    return;
  }

  const card = document.querySelector(`[data-org-card="${orgDragState.id}"]`);
  if (card) {
    card.classList.remove("is-dragging");
  }

  const moved = orgDragState.moved;
  orgDragState = null;

  if (!moved) {
    return;
  }

  suppressOrgCardClick = true;
  saveState();
  renderOrgChartBoard();
  setMessage("Org chart updated.");

  if (typeof window !== "undefined") {
    window.setTimeout(() => {
      suppressOrgCardClick = false;
    }, 0);
  } else {
    suppressOrgCardClick = false;
  }
}

function handleOrgCardClick(event) {
  const card = event.target.closest("[data-org-card]");
  if (!card || suppressOrgCardClick) {
    return;
  }

  focusRow("orgMapRows", card.dataset.orgCard);
}

function handleWindowResize() {
  if (typeof window === "undefined") {
    return;
  }

  if (resizeFrame) {
    window.cancelAnimationFrame(resizeFrame);
  }

  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = 0;
    renderOrgChartBoard();
  });
}

function autoScrollOrgBoardShell(event) {
  if (!elements.orgBoardShell) {
    return;
  }

  const shellRect = elements.orgBoardShell.getBoundingClientRect();
  const edge = 72;
  const step = 30;

  if (event.clientX > shellRect.right - edge) {
    elements.orgBoardShell.scrollLeft += step;
  } else if (event.clientX < shellRect.left + edge) {
    elements.orgBoardShell.scrollLeft -= step;
  }

  if (event.clientY > shellRect.bottom - edge) {
    elements.orgBoardShell.scrollTop += step;
  } else if (event.clientY < shellRect.top + edge) {
    elements.orgBoardShell.scrollTop -= step;
  }
}

function expandOrgBoardForDrag(rawX, rawY) {
  if (!elements.orgChartBoard) {
    return;
  }

  const metrics = getOrgMetrics();
  const currentWidth = Math.max(
    elements.orgChartBoard.scrollWidth,
    elements.orgChartBoard.clientWidth,
    metrics.width * 2 + ORG_BOARD_PADDING * 2
  );
  const currentHeight = Math.max(
    elements.orgChartBoard.scrollHeight,
    elements.orgChartBoard.clientHeight,
    metrics.minHeight
  );
  const nextWidth = Math.max(
    currentWidth,
    rawX + metrics.width + ORG_BOARD_PADDING * 2
  );
  const nextHeight = Math.max(
    currentHeight,
    rawY + metrics.height + ORG_BOARD_PADDING * 2
  );

  if (nextWidth !== currentWidth || nextHeight !== currentHeight) {
    applyOrgBoardDimensions(nextWidth, nextHeight);
  }
}

function renderAll() {
  renderOverview();
  renderPlanTable();
  renderCriteriaTable();
  renderTestPlanTable();
  renderActionsTable();
  renderBlockersTable();
  renderContextTable();
  renderOrgSection();
  renderResourcesTable();
  renderResourcePreviews();
  renderAssetsTable();
  renderDocumentFiles();
  renderVisualAssets();
  renderShell();
  autoResizeTextareas(document);
}

function renderShell() {
  renderTabs();
  renderMetrics();
  renderStatusPanel();
}

function renderOrgSection() {
  renderOrgControls();
  renderOrgMapTable();
  renderOrgChartBoard();
}

function renderOrgControls() {
  elements.orgViewButtons.forEach((button) => {
    const isActive = button.dataset.orgView === state.orgChartView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  elements.orgCardSizeButtons.forEach((button) => {
    const isActive = button.dataset.orgCardSize === state.orgCardSize;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!elements.orgBoardNote) {
    return;
  }

  const viewLabel = orgChartViewOptions[state.orgChartView] || orgChartViewOptions.all;
  const sizeLabel = orgCardSizeOptions[state.orgCardSize].label.toLowerCase();
  elements.orgBoardNote.textContent =
    state.orgChartView === "all"
      ? `Drag cards to lay out the shared map. The board expands as you move toward the edge, and you can switch to ${orgChartViewOptions.internal.toLowerCase()} or ${orgChartViewOptions.customer.toLowerCase()} to work each org separately. Current card mode: ${sizeLabel}.`
      : `Showing ${viewLabel.toLowerCase()}. Drag cards to lay out this org chart, use “Reports to” to draw the lines, and switch card mode when you need a tighter fit. Current card mode: ${sizeLabel}.`;
}

function renderTabs() {
  elements.appTabs.forEach((button) => {
    const isActive = button.dataset.tab === state.activeTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  elements.tabPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === state.activeTab;
    panel.classList.toggle("is-hidden", !isActive);
    panel.hidden = !isActive;
  });
}

function renderMetrics() {
  if (state.activeTab === "resources") {
    const activeResources = state.resources.filter(isResourceRowActive);
    const sharedResources = activeResources.filter((item) => item.access === "shared").length;
    const internalResources = activeResources.filter((item) => item.access === "internal").length;
    const sharedFiles = state.sharedFiles.filter((item) => item.access === "shared").length;

    setMetricCards([
      { value: String(activeResources.length), label: "Total links" },
      { value: String(sharedResources), label: "Shared with both teams" },
      { value: String(internalResources), label: "Internal only" },
      { value: `${sharedFiles} / ${state.sharedFiles.length}`, label: "Uploaded files" }
    ]);
    return;
  }

  const activePlanRows = state.planRows.filter(isPlanRowActive);
  const completedPlanRows = activePlanRows.filter((item) => item.done).length;
  const planProgress = activePlanRows.length
    ? Math.round((completedPlanRows / activePlanRows.length) * 100)
    : 0;

  const activeCriteria = state.criteriaRows.filter(isCriteriaRowActive);
  const metCriteria = activeCriteria.filter((item) => item.status === "met").length;

  const activeTestSteps = state.testPlanRows.filter(isTestPlanRowActive);
  const completedTestSteps = activeTestSteps.filter((item) => item.status === "done").length;

  const openActions = state.actions.filter((item) => isActionRowActive(item) && !item.done).length;

  setMetricCards([
    { value: `${planProgress}%`, label: "Plan progress" },
    { value: `${metCriteria} / ${activeCriteria.length}`, label: "Criteria met" },
    { value: `${completedTestSteps} / ${activeTestSteps.length}`, label: "Test steps done" },
    { value: String(openActions), label: "Open actions" }
  ]);
}

function setMetricCards(cards) {
  cards.forEach((card, index) => {
    if (elements.metricValues[index]) {
      elements.metricValues[index].textContent = card.value;
    }
    if (elements.metricLabels[index]) {
      elements.metricLabels[index].textContent = card.label;
    }
  });
}

function renderStatusPanel() {
  if (state.activeTab === "resources") {
    renderResourceStatusPanel();
    return;
  }

  const items = getChecklistItems();
  const checkedCount = items.filter((item) => state.sectionChecks[item.key]).length;

  elements.statusKicker.textContent = "Plan readiness";
  elements.statusTitle.textContent = "Shared plan checkpoints";
  elements.statusSummary.textContent = `${checkedCount} / ${items.length} checked`;
  elements.statusContent.innerHTML = items.map(renderChecklistItem).join("");

  elements.legendKicker.textContent = "Signal key";
  elements.legendTitle.textContent = "How to read the workspace";
  elements.legendContent.innerHTML = [
    renderLegendChip("Track", "is-track"),
    renderLegendChip("Watch", "is-watch"),
    renderLegendChip("Risk", "is-risk"),
    renderLegendChip("Done", "is-done")
  ].join("");
  elements.legendNote.textContent =
    "Use Done to close completed items. Use Signal to show what still needs attention.";
}

function renderResourceStatusPanel() {
  const items = getResourceCoverageItems();
  const readyCount = items.filter((item) => item.ready).length;

  elements.statusKicker.textContent = "Resource coverage";
  elements.statusTitle.textContent = "Shared room coverage";
  elements.statusSummary.textContent = `${readyCount} / ${items.length} ready`;
  elements.statusContent.innerHTML = items.map(renderStaticStatusItem).join("");

  elements.legendKicker.textContent = "Access key";
  elements.legendTitle.textContent = "How to use the room";
  elements.legendContent.innerHTML = [
    renderLegendChip("Shared", "is-shared"),
    renderLegendChip("Internal", "is-internal"),
    renderLegendChip("Ready", "is-ready"),
    renderLegendChip("Pending", "is-pending")
  ].join("");
  elements.legendNote.textContent =
    "Keep shared materials visible for both teams, and keep internal prep in the same room so the full team has context.";
}

function renderChecklistItem(item) {
  return `
    <label class="checklist-item${state.sectionChecks[item.key] ? " is-complete" : ""}${
      item.ready ? " is-ready" : ""
    }">
      <input
        type="checkbox"
        data-checklist-key="${escapeAttribute(item.key)}"
        ${state.sectionChecks[item.key] ? "checked" : ""}
      />
      <span class="checklist-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <span class="checklist-hint${item.ready ? " is-ready" : ""}">${
        item.ready ? "Ready" : "In progress"
      }</span>
    </label>
  `;
}

function renderStaticStatusItem(item) {
  return `
    <div class="checklist-item is-static${item.ready ? " is-ready" : ""}">
      <span class="checklist-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <small>${escapeHtml(item.detail)}</small>
      </span>
      <span class="checklist-hint${item.ready ? " is-ready" : ""}">${
        item.ready ? "Ready" : "Missing"
      }</span>
    </div>
  `;
}

function renderLegendChip(label, className) {
  return `<span class="legend-chip ${escapeAttribute(className)}">${escapeHtml(label)}</span>`;
}

function renderOverview() {
  setOverviewValue("accountName", state.overview.accountName);
  setOverviewValue("accountExecutive", state.overview.accountExecutive);
  setOverviewValue("salesEngineer", state.overview.salesEngineer);
  setOverviewValue("customerLead", state.overview.customerLead);
  setOverviewValue("solutionName", state.overview.solutionName);
  setOverviewValue("currentStage", state.overview.currentStage);
  setOverviewValue("programHealth", state.overview.programHealth);
  setOverviewValue("decisionDate", state.overview.decisionDate);
  setOverviewValue("primaryOutcome", state.overview.primaryOutcome);
  setOverviewValue("successDefinition", state.overview.successDefinition);
  setOverviewValue("whyNow", state.overview.whyNow);
  setOverviewValue("decisionNotes", state.overview.decisionNotes);
  setOverviewValue("sharedSlackLink", state.overview.sharedSlackLink);
  renderSharedChannel();
}

function renderSharedChannel() {
  if (!elements.sharedSlackOpen) {
    return;
  }

  const parsedLink = parseExternalUrl(state.overview.sharedSlackLink);
  if (parsedLink) {
    elements.sharedSlackOpen.href = parsedLink.href;
    elements.sharedSlackOpen.classList.remove("is-disabled");
    elements.sharedSlackOpen.setAttribute("aria-disabled", "false");
    return;
  }

  elements.sharedSlackOpen.href = "#";
  elements.sharedSlackOpen.classList.add("is-disabled");
  elements.sharedSlackOpen.setAttribute("aria-disabled", "true");
}

function renderPlanTable() {
  renderTableHead(elements.planTableHead, "planRows", [
    { label: "#", className: "col-number" },
    { label: "Stage" },
    { label: "Task" },
    { label: "Owner" },
    { label: "Due", className: "col-date" },
    { label: "Done", className: "col-check" },
    { label: "Signal", className: "col-signal" },
    { label: "Comments" }
  ]);

  elements.planTableBody.innerHTML = state.planRows
    .map((item, index) => {
      const tone = getPlanTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td><div class="row-index">${index + 1}</div></td>
          <td>${renderSelect("planRows", item.id, "stage", item.stage, planStageOptions)}</td>
          <td>${renderTextInput("planRows", item.id, "task", item.task, "Shared milestone or task")}</td>
          <td>${renderTextInput("planRows", item.id, "owner", item.owner, "Owner")}</td>
          <td>${renderDateInput("planRows", item.id, "dueDate", item.dueDate)}</td>
          <td class="check-cell">${renderCheckbox("planRows", item.id, "done", item.done, "Done")}</td>
          <td>${renderSelect("planRows", item.id, "signal", item.signal, planSignalOptions)}</td>
          <td>${renderTextArea("planRows", item.id, "comments", item.comments, "Comment or blocker")}</td>
          ${renderCustomCellInputs("planRows", item)}
          <td>${renderDeleteButton("planRows", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderCriteriaTable() {
  renderTableHead(elements.criteriaTableHead, "criteriaRows", [
    { label: "#", className: "col-number" },
    { label: "Use case" },
    { label: "Proof needed" },
    { label: "Importance", className: "col-tight" },
    { label: "Test?", className: "col-check" },
    { label: "Status", className: "col-signal" }
  ]);

  elements.criteriaTableBody.innerHTML = state.criteriaRows
    .map((item, index) => {
      const tone = getCriteriaTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td><div class="row-index">${index + 1}</div></td>
          <td>${renderTextInput(
            "criteriaRows",
            item.id,
            "useCase",
            item.useCase,
            "Use case or proof point"
          )}</td>
          <td>${renderTextArea(
            "criteriaRows",
            item.id,
            "proof",
            item.proof,
            "Target, metric, or proof needed"
          )}</td>
          <td>${renderSelect(
            "criteriaRows",
            item.id,
            "importance",
            item.importance,
            criteriaImportanceOptions
          )}</td>
          <td class="check-cell">${renderCheckbox(
            "criteriaRows",
            item.id,
            "needTestPlan",
            item.needTestPlan,
            "Needs test plan"
          )}</td>
          <td>${renderSelect(
            "criteriaRows",
            item.id,
            "status",
            item.status,
            criteriaStatusOptions
          )}</td>
          ${renderCustomCellInputs("criteriaRows", item)}
          <td>${renderDeleteButton("criteriaRows", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderTestPlanTable() {
  renderTableHead(elements.testPlanTableHead, "testPlanRows", [
    { label: "SC #", className: "col-number" },
    { label: "Step" },
    { label: "Description" },
    { label: "Status", className: "col-signal" },
    { label: "Result" },
    { label: "Exception", className: "col-check" }
  ]);

  elements.testPlanTableBody.innerHTML = state.testPlanRows
    .map((item) => {
      const tone = getTestPlanTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderNumberInput("testPlanRows", item.id, "criterionRef", item.criterionRef, "1")}</td>
          <td>${renderTextInput("testPlanRows", item.id, "step", item.step, "1")}</td>
          <td>${renderTextInput(
            "testPlanRows",
            item.id,
            "description",
            item.description,
            "Describe the validation step"
          )}</td>
          <td>${renderSelect(
            "testPlanRows",
            item.id,
            "status",
            item.status,
            testStepStatusOptions
          )}</td>
          <td>${renderTextInput(
            "testPlanRows",
            item.id,
            "result",
            item.result,
            "Pass, fail, note"
          )}</td>
          <td class="check-cell">${renderCheckbox(
            "testPlanRows",
            item.id,
            "exception",
            item.exception,
            "Exception"
          )}</td>
          ${renderCustomCellInputs("testPlanRows", item)}
          <td>${renderDeleteButton("testPlanRows", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderActionsTable() {
  renderTableHead(elements.actionsTableHead, "actions", [
    { label: "Created", className: "col-date" },
    { label: "Action" },
    { label: "Due", className: "col-date" },
    { label: "Owner" },
    { label: "Notes" },
    { label: "Done", className: "col-check" }
  ]);

  elements.actionsTableBody.innerHTML = state.actions
    .map((item) => {
      const tone = getActionTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderDateInput("actions", item.id, "createdDate", item.createdDate)}</td>
          <td>${renderTextInput("actions", item.id, "title", item.title, "Next action")}</td>
          <td>${renderDateInput("actions", item.id, "dueDate", item.dueDate)}</td>
          <td>${renderTextInput("actions", item.id, "owner", item.owner, "Owner")}</td>
          <td>${renderTextArea("actions", item.id, "notes", item.notes, "Notes")}</td>
          <td class="check-cell">${renderCheckbox("actions", item.id, "done", item.done, "Done")}</td>
          ${renderCustomCellInputs("actions", item)}
          <td>${renderDeleteButton("actions", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderBlockersTable() {
  renderTableHead(elements.blockersTableHead, "blockers", [
    { label: "Blocker" },
    { label: "Owner" },
    { label: "Status", className: "col-signal" },
    { label: "Impact", className: "col-tight" },
    { label: "Notes" }
  ]);

  elements.blockersTableBody.innerHTML = state.blockers
    .map((item) => {
      const tone = getBlockerTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderTextInput("blockers", item.id, "title", item.title, "Blocker or decision risk")}</td>
          <td>${renderTextInput("blockers", item.id, "owner", item.owner, "Owner")}</td>
          <td>${renderSelect(
            "blockers",
            item.id,
            "status",
            item.status,
            blockerStatusOptions
          )}</td>
          <td>${renderSelect(
            "blockers",
            item.id,
            "impact",
            item.impact,
            blockerImpactOptions
          )}</td>
          <td>${renderTextArea("blockers", item.id, "notes", item.notes, "Mitigation or notes")}</td>
          ${renderCustomCellInputs("blockers", item)}
          <td>${renderDeleteButton("blockers", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderContextTable() {
  renderTableHead(elements.contextTableHead, "contextRows", [
    { label: "Type", className: "col-signal" },
    { label: "Topic" },
    { label: "Notes" }
  ]);

  elements.contextTableBody.innerHTML = state.contextRows
    .map((item) => {
      const tone = isContextRowActive(item) ? "track" : "blank";

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderSelect("contextRows", item.id, "type", item.type, contextTypeOptions)}</td>
          <td>${renderTextInput("contextRows", item.id, "topic", item.topic, "Topic")}</td>
          <td>${renderTextArea("contextRows", item.id, "notes", item.notes, "Notes")}</td>
          ${renderCustomCellInputs("contextRows", item)}
          <td>${renderDeleteButton("contextRows", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderOrgMapTable() {
  renderTableHead(elements.orgMapTableHead, "orgMapRows", [
    { label: "Name" },
    { label: "Title" },
    { label: "Email" },
    { label: "Side", className: "col-signal" },
    { label: "Org / Team" },
    { label: "Responsibility" },
    { label: "Reports to" },
    { label: "Notes" }
  ]);

  const visibleRows = getVisibleOrgRows(true);
  if (!visibleRows.length) {
    elements.orgMapTableBody.innerHTML = `
      <tr>
        <td class="empty-table-cell" colspan="${9 + state.customColumns.orgMapRows.length}">
          No people in this view yet. Use Add Person to start this org chart.
        </td>
      </tr>
    `;
    return;
  }

  elements.orgMapTableBody.innerHTML = visibleRows
    .map((item) => {
      const tone = isOrgMapRowActive(item) ? "track" : "blank";

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderTextInput("orgMapRows", item.id, "name", item.name, "Person")}</td>
          <td>${renderTextInput("orgMapRows", item.id, "title", item.title, "Title")}</td>
          <td>${renderTextInput("orgMapRows", item.id, "email", item.email, "name@company.com")}</td>
          <td>${renderSelect("orgMapRows", item.id, "side", item.side, orgSideOptions)}</td>
          <td>${renderTextInput("orgMapRows", item.id, "team", item.team, "Org or team")}</td>
          <td>${renderTextArea(
            "orgMapRows",
            item.id,
            "responsibility",
            item.responsibility,
            "What this person owns"
          )}</td>
          <td>${renderTextInput("orgMapRows", item.id, "reportsTo", item.reportsTo, "Manager name")}</td>
          <td>${renderTextArea("orgMapRows", item.id, "notes", item.notes, "Notes")}</td>
          ${renderCustomCellInputs("orgMapRows", item)}
          <td>${renderDeleteButton("orgMapRows", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderOrgChartBoard() {
  if (!elements.orgChartBoard || !elements.orgChartLines || !elements.orgCardLayer) {
    return;
  }

  const activePeople = getVisibleOrgRows(true).filter(isOrgMapRowActive);
  const metrics = getOrgMetrics();
  elements.orgChartBoard.dataset.cardSize = state.orgCardSize;
  if (!activePeople.length) {
    const emptyWidth = Math.max(
      elements.orgChartBoard.clientWidth,
      metrics.width * 2 + ORG_BOARD_PADDING * 2
    );
    applyOrgBoardDimensions(emptyWidth, metrics.minHeight);
    elements.orgChartLines.innerHTML = "";
    elements.orgCardLayer.innerHTML = `
      <div class="org-chart-empty">
        Add people below, then drag their cards here to build this org chart.
      </div>
    `;
    return;
  }

  const layoutChanged = ensureOrgLayout(activePeople);
  const boardSize = getOrgBoardSize(activePeople);

  applyOrgBoardDimensions(boardSize.width, boardSize.height);
  elements.orgChartLines.innerHTML = renderOrgLines(activePeople);
  elements.orgCardLayer.innerHTML = activePeople.map(renderOrgCard).join("");

  if (layoutChanged) {
    saveState();
  }
}

function getVisibleOrgRows(includeBlankRows) {
  return state.orgMapRows.filter((item) => matchesOrgChartView(item, includeBlankRows));
}

function matchesOrgChartView(item, includeBlankRows) {
  if (state.orgChartView === "all") {
    return true;
  }

  if (item.side === state.orgChartView) {
    return true;
  }

  return includeBlankRows && !hasText(item.side);
}

function getOrgMetrics() {
  return orgCardSizeOptions[state.orgCardSize] || orgCardSizeOptions.standard;
}

function applyOrgBoardDimensions(width, height) {
  if (!elements.orgChartBoard || !elements.orgChartLines) {
    return;
  }

  elements.orgChartBoard.style.minWidth = `${width}px`;
  elements.orgChartBoard.style.minHeight = `${height}px`;
  elements.orgChartLines.setAttribute("viewBox", `0 0 ${width} ${height}`);
  elements.orgChartLines.setAttribute("width", String(width));
  elements.orgChartLines.setAttribute("height", String(height));
}

function renderOrgCard(item) {
  const title = item.title || "Role / title";
  const name = item.name || "Unnamed person";
  const meta = [orgSideOptions[item.side], item.team].filter(hasText).join(" · ");

  return `
    <button
      class="org-node"
      type="button"
      data-org-card="${escapeAttribute(item.id)}"
      data-side="${escapeAttribute(item.side || "shared")}"
      style="left:${item.x}px; top:${item.y}px;"
      aria-label="Open ${escapeAttribute(name)} in the people table"
    >
      <span class="org-node-title">${escapeHtml(title)}</span>
      <span class="org-node-body">
        <strong class="org-node-name">${escapeHtml(name)}</strong>
        ${
          hasText(item.email)
            ? `<span class="org-node-email">${escapeHtml(item.email)}</span>`
            : ""
        }
        ${
          hasText(meta)
            ? `<span class="org-node-meta">${escapeHtml(meta)}</span>`
            : ""
        }
        ${
          hasText(item.responsibility)
            ? `<span class="org-node-focus">${escapeHtml(item.responsibility)}</span>`
            : ""
        }
      </span>
    </button>
  `;
}

function renderOrgLines(activePeople) {
  const metrics = getOrgMetrics();
  return activePeople
    .map((item) => {
      const manager = findOrgManager(item, activePeople);
      if (!manager) {
        return "";
      }

      const startX = manager.x + metrics.width / 2;
      const startY = manager.y + metrics.height;
      const endX = item.x + metrics.width / 2;
      const endY = item.y;
      const midY = startY + Math.max(28, (endY - startY) / 2);

      return `
        <path
          class="org-line"
          d="M ${startX} ${startY} V ${midY} H ${endX} V ${endY}"
        />
      `;
    })
    .join("");
}

function renderResourcesTable() {
  renderTableHead(elements.resourcesTableHead, "resources", [
    { label: "#", className: "col-number" },
    { label: "Title" },
    { label: "Type", className: "col-signal" },
    { label: "Audience", className: "col-signal" },
    { label: "Access", className: "col-signal" },
    { label: "Link" },
    { label: "Notes" }
  ]);

  elements.resourcesTableBody.innerHTML = state.resources
    .map((item, index) => {
      const tone = getResourceTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td><div class="row-index">${index + 1}</div></td>
          <td>${renderTextInput("resources", item.id, "title", item.title, "Resource title")}</td>
          <td>${renderSelect("resources", item.id, "type", item.type, resourceTypeOptions)}</td>
          <td>${renderSelect(
            "resources",
            item.id,
            "audience",
            item.audience,
            resourceAudienceOptions
          )}</td>
          <td>${renderSelect("resources", item.id, "access", item.access, accessOptions)}</td>
          <td>${renderTextInput("resources", item.id, "link", item.link, "https://...")}</td>
          <td>${renderTextArea("resources", item.id, "notes", item.notes, "Why this belongs here")}</td>
          ${renderCustomCellInputs("resources", item)}
          <td>${renderDeleteButton("resources", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderResourcePreviews() {
  if (!elements.resourcePreviewGrid) {
    return;
  }

  const previewItems = state.resources.filter(
    (item) => isResourceRowActive(item) && (hasText(item.link) || hasText(item.title))
  );

  if (!previewItems.length) {
    elements.resourcePreviewGrid.innerHTML = `
      <div class="empty-gallery">
        Add a video, blog, recording, or link above to generate a preview card here.
      </div>
    `;
    return;
  }

  elements.resourcePreviewGrid.innerHTML = previewItems
    .map((item) => renderResourcePreviewCard(item))
    .join("");
}

function renderResourcePreviewCard(item) {
  const preview = getResourcePreview(item);
  const typeLabel = resourceTypeOptions[item.type] || "Reference";
  const audienceLabel = resourceAudienceOptions[item.audience] || "General audience";
  const accessLabel = accessOptions[item.access] || "Access not labeled";
  const accessTone =
    item.access === "internal" ? "is-internal" : item.access === "shared" ? "is-shared" : "is-pending";
  const description = item.notes || `${typeLabel} for ${audienceLabel.toLowerCase()}.`;

  return `
    <article class="resource-preview-card" data-tone="${escapeAttribute(getResourceTone(item))}">
      <div class="resource-preview-media${preview.kind === "generic" ? " is-generic" : ""}">
        ${preview.media}
        <div class="resource-preview-badges">
          <span class="legend-chip ${accessTone}">
            ${escapeHtml(accessLabel)}
          </span>
          <span class="resource-preview-badge">${escapeHtml(typeLabel)}</span>
        </div>
      </div>

      <div class="resource-preview-body">
        <div class="resource-preview-meta">
          <span class="resource-preview-domain">${escapeHtml(preview.domain || "Link preview")}</span>
          <span class="resource-preview-audience">${escapeHtml(audienceLabel)}</span>
        </div>
        <h3>${escapeHtml(item.title || preview.defaultTitle)}</h3>
        <p>${escapeHtml(description)}</p>
        <div class="resource-preview-footer">
          <span>${escapeHtml(preview.summary)}</span>
          ${
            preview.href
              ? `<a class="resource-preview-link" href="${escapeAttribute(
                  preview.href
                )}" target="_blank" rel="noreferrer noopener">Open resource</a>`
              : `<span class="resource-preview-link is-disabled">Add a full link</span>`
          }
        </div>
      </div>
    </article>
  `;
}

function renderVisualAssets() {
  if (!elements.visualGallery) {
    return;
  }

  if (!state.visualAssets.length) {
    elements.visualGallery.innerHTML = `
      <div class="empty-gallery">
        Upload architecture diagrams, org charts, screenshots, and other plan visuals.
      </div>
    `;
    return;
  }

  elements.visualGallery.innerHTML = state.visualAssets
    .map(
      (item) => `
        <article class="visual-card">
          <div class="visual-card-head">
            <p class="sheet-kicker">${escapeHtml(visualCategoryOptions[item.category] || "Visual")}</p>
            <button
              class="visual-delete"
              type="button"
              data-delete-visual="${escapeAttribute(item.id)}"
              aria-label="Delete image"
            >
              Remove
            </button>
          </div>
          <div class="visual-preview-shell">
            <img
              class="visual-preview"
              src="${escapeAttribute(item.imageData)}"
              alt="${escapeAttribute(item.title || item.fileName || "Uploaded visual")}"
            />
          </div>
          <div class="visual-meta-grid">
            <label>
              Title
              <input
                class="visual-input"
                type="text"
                value="${escapeAttribute(item.title)}"
                placeholder="Architecture overview"
                data-visual-id="${escapeAttribute(item.id)}"
                data-visual-field="title"
              />
            </label>
            <label>
              Category
              ${renderVisualSelect(item.id, "category", item.category, visualCategoryOptions)}
            </label>
            <label class="visual-wide">
              Notes
              <textarea
                class="visual-area"
                rows="1"
                placeholder="What this image explains or why it matters"
                data-visual-id="${escapeAttribute(item.id)}"
                data-visual-field="notes"
              >${escapeHtml(item.notes)}</textarea>
            </label>
          </div>
          <p class="visual-file-name">${escapeHtml(item.fileName)}</p>
        </article>
      `
    )
    .join("");
}

function renderAssetsTable() {
  if (!elements.assetsTableHead || !elements.assetsTableBody) {
    return;
  }

  renderTableHead(elements.assetsTableHead, "assets", [
    { label: "Item" },
    { label: "Category", className: "col-signal" },
    { label: "Access", className: "col-signal" },
    { label: "Status", className: "col-signal" },
    { label: "Owner" },
    { label: "Link" },
    { label: "Notes" }
  ]);

  elements.assetsTableBody.innerHTML = state.assets
    .map((item) => {
      const tone = getAssetTone(item);

      return `
        <tr data-tone="${escapeAttribute(tone)}">
          <td>${renderTextInput("assets", item.id, "title", item.title, "File or artifact name")}</td>
          <td>${renderSelect("assets", item.id, "category", item.category, assetCategoryOptions)}</td>
          <td>${renderSelect("assets", item.id, "access", item.access, accessOptions)}</td>
          <td>${renderSelect("assets", item.id, "status", item.status, assetStatusOptions)}</td>
          <td>${renderTextInput("assets", item.id, "owner", item.owner, "Owner")}</td>
          <td>${renderTextInput("assets", item.id, "link", item.link, "https://...")}</td>
          <td>${renderTextArea("assets", item.id, "notes", item.notes, "Notes")}</td>
          ${renderCustomCellInputs("assets", item)}
          <td>${renderDeleteButton("assets", item.id)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderDocumentFiles() {
  if (!elements.documentGallery) {
    return;
  }

  if (!state.sharedFiles.length) {
    elements.documentGallery.innerHTML = `
      <div class="empty-gallery">
        Upload PDFs, signed contracts, proposals, or other shared files here.
      </div>
    `;
    return;
  }

  elements.documentGallery.innerHTML = state.sharedFiles
    .map(
      (item) => `
        <article class="document-card">
          <div class="document-card-head">
            <div>
              <p class="sheet-kicker">${escapeHtml(getFileExtension(item.fileName) || "File")}</p>
              <h3>${escapeHtml(item.title || item.fileName || "Shared document")}</h3>
            </div>
            <button
              class="visual-delete"
              type="button"
              data-delete-document="${escapeAttribute(item.id)}"
              aria-label="Delete file"
            >
              Remove
            </button>
          </div>

          <div class="document-meta-grid">
            <label>
              Title
              <input
                class="visual-input"
                type="text"
                value="${escapeAttribute(item.title)}"
                placeholder="Signed order form"
                data-document-id="${escapeAttribute(item.id)}"
                data-document-field="title"
              />
            </label>
            <label>
              Category
              ${renderDocumentSelect(item.id, "category", item.category, assetCategoryOptions)}
            </label>
            <label>
              Access
              ${renderDocumentSelect(item.id, "access", item.access, accessOptions)}
            </label>
            <label>
              Status
              ${renderDocumentSelect(item.id, "status", item.status, assetStatusOptions)}
            </label>
            <label class="visual-wide">
              Notes
              <textarea
                class="visual-area"
                rows="1"
                placeholder="What this file is for, who should review it, or what changed"
                data-document-id="${escapeAttribute(item.id)}"
                data-document-field="notes"
              >${escapeHtml(item.notes)}</textarea>
            </label>
          </div>

          <div class="document-card-footer">
            <p class="document-file-name">
              ${escapeHtml(item.fileName)}${item.fileSize ? ` · ${escapeHtml(formatFileSize(item.fileSize))}` : ""}
            </p>
            <div class="document-card-actions">
              <a
                class="resource-preview-link"
                href="${escapeAttribute(item.fileData)}"
                target="_blank"
                rel="noreferrer noopener"
              >
                ${escapeHtml(isPdfFile(item) ? "Open PDF" : "Open file")}
              </a>
              <a
                class="resource-preview-link"
                href="${escapeAttribute(item.fileData)}"
                download="${escapeAttribute(item.fileName)}"
              >
                Download
              </a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTableHead(headElement, collectionName, fixedColumns) {
  if (!headElement) {
    return;
  }

  const customColumns = state.customColumns[collectionName] || [];
  headElement.innerHTML =
    fixedColumns.map(renderStaticHeaderCell).join("") +
    customColumns.map((column) => renderCustomHeaderCell(collectionName, column)).join("") +
    '<th class="col-delete"></th>';
}

function renderStaticHeaderCell(column) {
  return `<th${column.className ? ` class="${escapeAttribute(column.className)}"` : ""}>${escapeHtml(
    column.label
  )}</th>`;
}

function renderCustomHeaderCell(collectionName, column) {
  return `<th class="col-custom">
    <div class="custom-header-shell">
      <input
        class="header-input"
        type="text"
        value="${escapeAttribute(column.label)}"
        placeholder="Column name"
        data-column-collection="${escapeAttribute(collectionName)}"
        data-column-id="${escapeAttribute(column.id)}"
      />
      <button
        class="column-delete"
        type="button"
        data-delete-column="${escapeAttribute(collectionName)}"
        data-column-id="${escapeAttribute(column.id)}"
        aria-label="Delete column"
      >
        x
      </button>
    </div>
  </th>`;
}

function renderCustomCellInputs(collectionName, record) {
  return (state.customColumns[collectionName] || [])
    .map((column) => {
      const value = record.custom && Object.prototype.hasOwnProperty.call(record.custom, column.id)
        ? record.custom[column.id]
        : "";

      return `<td>${renderCustomTextInput(
        collectionName,
        record.id,
        column.id,
        value,
        column.label || "Add detail"
      )}</td>`;
    })
    .join("");
}

function renderCustomTextInput(collectionName, id, columnId, value, placeholder) {
  return `<input
    class="cell-input"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-custom-key="${escapeAttribute(columnId)}"
    type="text"
    value="${escapeAttribute(value)}"
    placeholder="${escapeAttribute(placeholder)}"
  />`;
}

function renderVisualSelect(id, field, value, options) {
  return `<select
    class="visual-select"
    data-visual-id="${escapeAttribute(id)}"
    data-visual-field="${escapeAttribute(field)}"
  >
    ${Object.entries(options)
      .map(
        ([optionValue, label]) => `
          <option value="${escapeAttribute(optionValue)}" ${
            optionValue === value ? "selected" : ""
          }>${escapeHtml(label)}</option>
        `
      )
      .join("")}
  </select>`;
}

function renderDocumentSelect(id, field, value, options) {
  return `<select
    class="visual-select"
    data-document-id="${escapeAttribute(id)}"
    data-document-field="${escapeAttribute(field)}"
  >
    ${Object.entries(options)
      .map(
        ([optionValue, label]) => `
          <option value="${escapeAttribute(optionValue)}" ${
            optionValue === value ? "selected" : ""
          }>${escapeHtml(label)}</option>
        `
      )
      .join("")}
  </select>`;
}

function handleOverviewEdit(event) {
  const field = event.target.dataset.overviewField;
  if (!field) {
    return;
  }

  state.overview[field] = field === "decisionDate"
    ? normalizeDate(event.target.value)
    : cleanText(event.target.value);

  saveState();
  renderMetrics();
  renderStatusPanel();
  autoResizeTextareas(elements.overviewForm);
  setMessage("Saved locally.");
}

function handleChecklistToggle(event) {
  const key = event.target.dataset.checklistKey;
  if (!key || !Object.prototype.hasOwnProperty.call(state.sectionChecks, key)) {
    return;
  }

  state.sectionChecks[key] = event.target.checked;
  saveState();
  renderStatusPanel();
  setMessage("Checklist updated.");
}

function handleInlineEdit(event) {
  const target = event.target;

  if (target.dataset.columnCollection && target.dataset.columnId) {
    updateColumnLabel(target);
    return;
  }

  if (target.dataset.visualId && target.dataset.visualField) {
    updateVisualField(target);
    return;
  }

  if (target.dataset.documentId && target.dataset.documentField) {
    updateDocumentField(target);
    return;
  }

  const collectionName = target.dataset.collection;
  const id = target.dataset.id;

  if (!collectionName || !id) {
    return;
  }

  const collection = state[collectionName];
  if (!Array.isArray(collection)) {
    return;
  }

  const record = collection.find((item) => item.id === id);
  if (!record) {
    return;
  }

  const customKey = target.dataset.customKey;
  if (customKey) {
    record.custom[customKey] = cleanText(target.value);
    saveState();
    updateRowTone(target, collectionName, record);
    renderMetrics();
    renderStatusPanel();
    setMessage("Saved locally.");
    return;
  }

  const field = target.dataset.field;
  if (!field) {
    return;
  }

  record[field] = readTargetValue(target);
  saveState();
  updateRowTone(target, collectionName, record);
  renderMetrics();
  renderStatusPanel();

  if (collectionName === "orgMapRows") {
    if (field === "side") {
      renderOrgSection();
    } else {
      renderOrgChartBoard();
    }
  }

  if (collectionName === "resources") {
    renderResourcePreviews();
  }

  if (target.tagName === "TEXTAREA") {
    autoResizeTextareas(target.closest("td") || document);
  }

  setMessage("Saved locally.");
}

function updateColumnLabel(target) {
  const collectionName = target.dataset.columnCollection;
  const columnId = target.dataset.columnId;
  const columns = state.customColumns[collectionName];

  if (!Array.isArray(columns)) {
    return;
  }

  const column = columns.find((item) => item.id === columnId);
  if (!column) {
    return;
  }

  column.label = cleanText(target.value);
  saveState();
  setMessage("Column saved.");
}

function handleDeleteClick(event) {
  const visualButton = event.target.closest("[data-delete-visual]");
  if (visualButton) {
    deleteVisualAsset(visualButton.dataset.deleteVisual);
    return;
  }

  const documentButton = event.target.closest("[data-delete-document]");
  if (documentButton) {
    deleteDocumentFile(documentButton.dataset.deleteDocument);
    return;
  }

  const columnButton = event.target.closest("[data-delete-column]");
  if (columnButton) {
    deleteColumn(columnButton.dataset.deleteColumn, columnButton.dataset.columnId);
    return;
  }

  const button = event.target.closest("[data-delete-row]");
  if (!button) {
    return;
  }

  deleteRow(button.dataset.deleteRow, button.dataset.id);
}

function setActiveTab(tabName) {
  if (!tabName || (tabName !== "plan" && tabName !== "resources")) {
    return;
  }

  if (state.activeTab === tabName) {
    return;
  }

  state.activeTab = tabName;
  saveState();
  renderShell();
  setMessage(tabName === "plan" ? "Joint execution plan open." : "Resource center open.");
}

function setOrgChartView(viewName) {
  if (!orgChartViewOptions[viewName] || state.orgChartView === viewName) {
    return;
  }

  state.orgChartView = viewName;
  saveState();
  renderOrgSection();
  setMessage(`${orgChartViewOptions[viewName]} open.`);
}

function setOrgCardSize(sizeName) {
  if (!orgCardSizeOptions[sizeName] || state.orgCardSize === sizeName) {
    return;
  }

  state.orgCardSize = sizeName;
  saveState();
  renderOrgSection();
  setMessage(`${orgCardSizeOptions[sizeName].label} enabled.`);
}

function addRow(collectionName) {
  const factory = rowFactories[collectionName];
  if (!factory) {
    return;
  }

  const row = factory(state.customColumns[collectionName]);
  if (
    collectionName === "orgMapRows" &&
    (state.orgChartView === "internal" || state.orgChartView === "customer")
  ) {
    row.side = state.orgChartView;
  }

  state[collectionName].push(row);
  saveState();
  renderAll();
  focusRow(collectionName, row.id);
  setMessage("Row added.");
}

function addColumn(collectionName) {
  const label = `New Column ${state.customColumns[collectionName].length + 1}`;
  const column = createCustomColumn(label);
  state.customColumns[collectionName].push(column);
  state[collectionName].forEach((record) => {
    record.custom[column.id] = "";
  });
  saveState();
  renderAll();
  focusColumnHeader(collectionName, column.id);
  setMessage("Column added.");
}

function deleteRow(collectionName, id) {
  const collection = state[collectionName];
  const factory = rowFactories[collectionName];

  if (!Array.isArray(collection) || !factory) {
    return;
  }

  const index = collection.findIndex((item) => item.id === id);
  if (index < 0) {
    return;
  }

  const record = collection[index];
  if (isRowActive(collectionName, record) && !window.confirm("Delete this row?")) {
    return;
  }

  if (collection.length === 1) {
    collection[0] = factory(state.customColumns[collectionName]);
  } else {
    collection.splice(index, 1);
  }

  saveState();
  renderAll();
  setMessage("Row removed.");
}

function deleteColumn(collectionName, columnId) {
  const columns = state.customColumns[collectionName];
  const collection = state[collectionName];

  if (!Array.isArray(columns) || !Array.isArray(collection)) {
    return;
  }

  const index = columns.findIndex((column) => column.id === columnId);
  if (index < 0) {
    return;
  }

  const hasData = collection.some((record) => hasText(record.custom[columnId]));
  if (hasData && !window.confirm("Delete this column and all of its values?")) {
    return;
  }

  columns.splice(index, 1);
  collection.forEach((record) => {
    delete record.custom[columnId];
  });

  saveState();
  renderAll();
  setMessage("Column removed.");
}

function updateVisualField(target) {
  const id = target.dataset.visualId;
  const field = target.dataset.visualField;
  const item = state.visualAssets.find((asset) => asset.id === id);

  if (!item || !field) {
    return;
  }

  item[field] = cleanText(target.value);
  saveState();

  if (target.tagName === "TEXTAREA") {
    autoResizeTextareas(target.closest(".visual-card") || document);
  }

  setMessage("Image details saved.");
}

function updateDocumentField(target) {
  const id = target.dataset.documentId;
  const field = target.dataset.documentField;
  const item = state.sharedFiles.find((asset) => asset.id === id);

  if (!item || !field) {
    return;
  }

  item[field] = cleanText(target.value);
  saveState();

  if (target.tagName === "TEXTAREA") {
    autoResizeTextareas(target.closest(".document-card") || document);
  }

  setMessage("File details saved.");
}

async function handleDiagramUpload(event) {
  const files = Array.from(event.target.files || []).filter((file) =>
    String(file.type || "").startsWith("image/")
  );

  if (!files.length) {
    elements.diagramInput.value = "";
    return;
  }

  setMessage("Uploading images...");

  try {
    const assets = [];
    for (const file of files) {
      assets.push(await createVisualAssetFromFile(file));
    }

    state.visualAssets.push(...assets);
    saveState();
    renderVisualAssets();
    autoResizeTextareas(elements.visualGallery);
    setMessage(`${assets.length} image${assets.length === 1 ? "" : "s"} added.`);
  } catch (error) {
    setMessage(`Image upload failed: ${error instanceof Error ? error.message : "Unknown error."}`);
  } finally {
    elements.diagramInput.value = "";
  }
}

async function handleDocumentUpload(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) {
    if (elements.documentInput) {
      elements.documentInput.value = "";
    }
    return;
  }

  setMessage("Uploading files...");

  try {
    const uploads = [];
    for (const file of files) {
      uploads.push(await createSharedFileFromUpload(file));
    }

    state.sharedFiles.push(...uploads);
    saveState();
    renderDocumentFiles();
    autoResizeTextareas(elements.documentGallery);
    setMessage(`${uploads.length} file${uploads.length === 1 ? "" : "s"} added.`);
  } catch (error) {
    setMessage(`File upload failed: ${error instanceof Error ? error.message : "Unknown error."}`);
  } finally {
    if (elements.documentInput) {
      elements.documentInput.value = "";
    }
  }
}

function deleteVisualAsset(id) {
  const index = state.visualAssets.findIndex((asset) => asset.id === id);
  if (index < 0) {
    return;
  }

  if (!window.confirm("Delete this image?")) {
    return;
  }

  state.visualAssets.splice(index, 1);
  saveState();
  renderVisualAssets();
  setMessage("Image removed.");
}

function deleteDocumentFile(id) {
  const index = state.sharedFiles.findIndex((asset) => asset.id === id);
  if (index < 0) {
    return;
  }

  if (!window.confirm("Delete this file?")) {
    return;
  }

  state.sharedFiles.splice(index, 1);
  saveState();
  renderDocumentFiles();
  setMessage("File removed.");
}

function ensureOrgLayout(activePeople) {
  const metrics = getOrgMetrics();
  const boardWidth = Math.max(
    elements.orgChartBoard ? elements.orgChartBoard.clientWidth : 0,
    metrics.width * 3 + ORG_BOARD_PADDING * 2
  );
  const groupedLevels = getOrgLevelGroups(activePeople);
  const allMissing = activePeople.every((item) => !hasCoordinate(item.x) || !hasCoordinate(item.y));
  let changed = false;

  groupedLevels.forEach((group, level) => {
    const top = ORG_BOARD_PADDING + level * (metrics.height + metrics.rowGap);

    if (allMissing) {
      const rowWidth =
        group.length * metrics.width + Math.max(0, group.length - 1) * metrics.columnGap;
      const startX = Math.max(ORG_BOARD_PADDING, Math.round((boardWidth - rowWidth) / 2));

      group.forEach((item, index) => {
        item.x = startX + index * (metrics.width + metrics.columnGap);
        item.y = top;
        changed = true;
      });

      return;
    }

    const positioned = group.filter((item) => hasCoordinate(item.x) && hasCoordinate(item.y));
    let nextX = positioned.length
      ? Math.max(...positioned.map((item) => item.x)) + metrics.width + metrics.columnGap
      : ORG_BOARD_PADDING;

    group.forEach((item) => {
      if (!hasCoordinate(item.x) || !hasCoordinate(item.y)) {
        item.x = nextX;
        item.y = top;
        nextX += metrics.width + metrics.columnGap;
        changed = true;
      }
    });
  });

  return changed;
}

function getOrgLevelGroups(activePeople) {
  const groups = new Map();

  activePeople.forEach((item) => {
    const level = getOrgLevel(item, activePeople, new Set());
    if (!groups.has(level)) {
      groups.set(level, []);
    }
    groups.get(level).push(item);
  });

  return Array.from(groups.entries())
    .sort((left, right) => left[0] - right[0])
    .map((entry) =>
      entry[1].sort((left, right) =>
        cleanText(left.name || left.title).localeCompare(cleanText(right.name || right.title))
      )
    );
}

function getOrgLevel(item, activePeople, trail) {
  if (trail.has(item.id)) {
    return 0;
  }

  trail.add(item.id);
  const manager = findOrgManager(item, activePeople);
  if (!manager) {
    return 0;
  }

  return 1 + getOrgLevel(manager, activePeople, trail);
}

function findOrgManager(item, activePeople) {
  const reference = cleanText(item.reportsTo).toLowerCase();
  if (!reference) {
    return null;
  }

  return (
    activePeople.find(
      (candidate) => candidate.id !== item.id && matchesOrgReference(candidate, reference)
    ) || null
  );
}

function matchesOrgReference(candidate, reference) {
  return [candidate.id, candidate.name, candidate.email, candidate.title]
    .map((value) => cleanText(value).toLowerCase())
    .some((value) => value && value === reference);
}

function getOrgBoardSize(activePeople) {
  const metrics = getOrgMetrics();
  const minWidth = Math.max(
    elements.orgChartBoard ? elements.orgChartBoard.clientWidth : 0,
    metrics.width * 3 + ORG_BOARD_PADDING * 2
  );
  const minHeight = metrics.minHeight;
  const maxX = activePeople.reduce(
    (result, item) => Math.max(result, item.x + metrics.width),
    ORG_BOARD_PADDING
  );
  const maxY = activePeople.reduce(
    (result, item) => Math.max(result, item.y + metrics.height),
    ORG_BOARD_PADDING
  );

  return {
    width: Math.max(minWidth, maxX + ORG_BOARD_PADDING),
    height: Math.max(minHeight, maxY + ORG_BOARD_PADDING)
  };
}

function updateOrgCardPosition(id, x, y) {
  if (!elements.orgCardLayer) {
    return;
  }

  const card = elements.orgCardLayer.querySelector(`[data-org-card="${id}"]`);
  if (!card) {
    return;
  }

  card.style.left = `${x}px`;
  card.style.top = `${y}px`;
}

function getResourcePreview(item) {
  const parsedUrl = parseExternalUrl(item.link);
  const href = parsedUrl ? parsedUrl.href : "";
  const domain = parsedUrl ? parsedUrl.hostname.replace(/^www\./, "") : cleanText(item.link);
  const typeLabel = resourceTypeOptions[item.type] || "Reference";
  const title = item.title || domain || "Linked resource";
  const youtubeId = extractYouTubeId(parsedUrl);

  if (youtubeId) {
    return {
      kind: "youtube",
      href,
      domain,
      defaultTitle: title,
      summary: "YouTube preview",
      media: `
        <img
          class="resource-preview-image"
          src="https://img.youtube.com/vi/${escapeAttribute(youtubeId)}/hqdefault.jpg"
          alt="${escapeAttribute(title)}"
        />
        <span class="resource-preview-play">Video</span>
      `
    };
  }

  if (href && isImageLink(href)) {
    return {
      kind: "image",
      href,
      domain,
      defaultTitle: title,
      summary: "Image preview",
      media: `
        <img
          class="resource-preview-image"
          src="${escapeAttribute(href)}"
          alt="${escapeAttribute(title)}"
        />
      `
    };
  }

  const monogram = getPreviewMonogram(domain || title);
  return {
    kind: "generic",
    href,
    domain,
    defaultTitle: title,
    summary: href ? `${typeLabel} preview` : "Add a valid URL to open this resource",
    media: `
      <div class="resource-preview-placeholder">
        <span class="resource-preview-mark">${escapeHtml(monogram)}</span>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(domain || typeLabel)}</span>
      </div>
    `
  };
}

function parseExternalUrl(value) {
  const input = cleanText(value);
  if (!input) {
    return null;
  }

  const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(input) ? input : `https://${input}`;

  try {
    return new URL(candidate);
  } catch (_error) {
    return null;
  }
}

function extractYouTubeId(parsedUrl) {
  if (!parsedUrl) {
    return "";
  }

  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  if (hostname === "youtu.be") {
    return cleanText(parsedUrl.pathname.split("/").filter(Boolean)[0]);
  }

  if (hostname === "youtube.com" || hostname === "m.youtube.com") {
    if (parsedUrl.pathname === "/watch") {
      return cleanText(parsedUrl.searchParams.get("v"));
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    if (pathParts[0] === "embed" || pathParts[0] === "shorts") {
      return cleanText(pathParts[1]);
    }
  }

  return "";
}

function isImageLink(url) {
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url);
}

function getPreviewMonogram(text) {
  const parts = cleanText(text)
    .replace(/^www\./, "")
    .split(/[\s.-]+/)
    .filter(Boolean);

  return (parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "LK").slice(
    0,
    2
  );
}

async function createVisualAssetFromFile(file) {
  const imageData = await readFileAsDataUrl(file);

  return {
    id: createId("visual"),
    title: stripExtension(file.name),
    category: "architecture",
    notes: "",
    fileName: file.name,
    imageData
  };
}

async function createSharedFileFromUpload(file) {
  const fileData = await readFileAsDataUrl(file);

  return {
    id: createId("shared-file"),
    title: stripExtension(file.name),
    category: inferUploadedFileCategory(file.name),
    access: "shared",
    status: "ready",
    notes: "",
    fileName: file.name,
    fileType: cleanText(file.type) || getFileExtension(file.name).toLowerCase(),
    fileSize: Number(file.size) || 0,
    fileData
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.readAsDataURL(file);
  });
}

function exportWorkspace() {
  const payload = {
    exportedAt: new Date().toISOString(),
    workspace: state
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });

  downloadBlob(blob, "workroom-workspace.json");
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
      replaceState(normalizeState(payload.workspace || payload));
      setMessage("Workspace imported.");
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
  if (!window.confirm("Reset this workspace back to the blank template?")) {
    return;
  }

  replaceState(defaultState());
  setMessage("Template restored.");
}

function replaceState(nextState) {
  state.activeTab = nextState.activeTab;
  state.orgChartView = nextState.orgChartView;
  state.orgCardSize = nextState.orgCardSize;
  state.overview = nextState.overview;
  state.sectionChecks = nextState.sectionChecks;
  state.customColumns = nextState.customColumns;
  state.planRows = nextState.planRows;
  state.criteriaRows = nextState.criteriaRows;
  state.testPlanRows = nextState.testPlanRows;
  state.actions = nextState.actions;
  state.blockers = nextState.blockers;
  state.contextRows = nextState.contextRows;
  state.orgMapRows = nextState.orgMapRows;
  state.resources = nextState.resources;
  state.assets = nextState.assets;
  state.sharedFiles = nextState.sharedFiles;
  state.visualAssets = nextState.visualAssets;
  saveState();
  renderAll();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState();
    }

    return normalizeState(JSON.parse(raw));
  } catch (_error) {
    return defaultState();
  }
}

function defaultState() {
  return normalizeState({
    activeTab: "plan",
    orgChartView: "all",
    orgCardSize: "standard",
    overview: {},
    sectionChecks: {},
    customColumns: defaultCustomColumns(),
    planRows: buildRows(4, () => createPlanRow([])),
    criteriaRows: buildRows(4, () => createCriteriaRow([])),
    testPlanRows: buildRows(3, () => createTestPlanRow([])),
    actions: buildRows(2, () => createActionRow([])),
    blockers: buildRows(1, () => createBlockerRow([])),
    contextRows: buildRows(2, () => createContextRow([])),
    orgMapRows: buildRows(3, () => createOrgMapRow([])),
    resources: buildRows(3, () => createResourceRow([])),
    assets: buildRows(3, () => createAssetRow([])),
    sharedFiles: [],
    visualAssets: []
  });
}

function normalizeState(input) {
  const source = input || {};
  const customColumns = normalizeCustomColumns(source.customColumns);

  return {
    activeTab: source.activeTab === "resources" ? "resources" : "plan",
    orgChartView: orgChartViewOptions[source.orgChartView] ? source.orgChartView : "all",
    orgCardSize: orgCardSizeOptions[source.orgCardSize] ? source.orgCardSize : "standard",
    overview: normalizeOverview(source.overview),
    sectionChecks: normalizeSectionChecks(source.sectionChecks),
    customColumns,
    planRows: normalizeCollection(
      source.planRows,
      createPlanRow,
      normalizePlanRow,
      1,
      customColumns.planRows
    ),
    criteriaRows: normalizeCollection(
      source.criteriaRows,
      createCriteriaRow,
      normalizeCriteriaRow,
      1,
      customColumns.criteriaRows
    ),
    testPlanRows: normalizeCollection(
      source.testPlanRows,
      createTestPlanRow,
      normalizeTestPlanRow,
      1,
      customColumns.testPlanRows
    ),
    actions: normalizeCollection(
      source.actions,
      createActionRow,
      normalizeActionRow,
      1,
      customColumns.actions
    ),
    blockers: normalizeCollection(
      source.blockers,
      createBlockerRow,
      normalizeBlockerRow,
      1,
      customColumns.blockers
    ),
    contextRows: normalizeCollection(
      source.contextRows,
      createContextRow,
      normalizeContextRow,
      1,
      customColumns.contextRows
    ),
    orgMapRows: normalizeCollection(
      source.orgMapRows,
      createOrgMapRow,
      normalizeOrgMapRow,
      1,
      customColumns.orgMapRows
    ),
    resources: normalizeCollection(
      source.resources,
      createResourceRow,
      normalizeResourceRow,
      1,
      customColumns.resources
    ),
    assets: normalizeCollection(
      source.assets,
      createAssetRow,
      normalizeAssetRow,
      1,
      customColumns.assets
    ),
    sharedFiles: normalizeSharedFiles(source.sharedFiles),
    visualAssets: normalizeVisualAssets(source.visualAssets)
  };
}

function defaultCustomColumns() {
  return collectionKeys.reduce((result, key) => {
    result[key] = [];
    return result;
  }, {});
}

function normalizeCustomColumns(input) {
  const source = input || {};

  return collectionKeys.reduce((result, key) => {
    const items = Array.isArray(source[key]) ? source[key] : [];
    result[key] = items.map(normalizeCustomColumn);
    return result;
  }, {});
}

function normalizeCustomColumn(item) {
  const column = item || {};
  return {
    id: cleanText(column.id) || createId("column"),
    label: cleanText(column.label)
  };
}

function createCustomColumn(label) {
  return {
    id: createId("column"),
    label: cleanText(label)
  };
}

function normalizeSectionChecks(input) {
  const source = input || {};
  return checklistKeys.reduce((result, key) => {
    result[key] = toBoolean(source[key]);
    return result;
  }, {});
}

function normalizeCollection(items, factory, normalizer, minimumRows, customColumns) {
  const next = Array.isArray(items)
    ? items.map((item) => normalizer(item, customColumns))
    : [];

  while (next.length < minimumRows) {
    next.push(factory(customColumns));
  }

  return next;
}

function normalizeOverview(item) {
  const overview = item || {};
  return {
    accountName: cleanText(overview.accountName),
    accountExecutive: cleanText(overview.accountExecutive),
    salesEngineer: cleanText(overview.salesEngineer),
    customerLead: cleanText(overview.customerLead),
    solutionName: cleanText(overview.solutionName),
    currentStage: overviewStageOptions[overview.currentStage] ? overview.currentStage : "align",
    programHealth: healthOptions[overview.programHealth] ? overview.programHealth : "on-track",
    decisionDate: normalizeDate(overview.decisionDate),
    primaryOutcome: cleanText(overview.primaryOutcome),
    successDefinition: cleanText(overview.successDefinition),
    whyNow: cleanText(overview.whyNow),
    decisionNotes: cleanText(overview.decisionNotes),
    sharedSlackLink: cleanText(overview.sharedSlackLink)
  };
}

function normalizePlanRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("plan"),
      stage: planStageOptions[row.stage] ? row.stage : "",
      task: cleanText(row.task),
      owner: cleanText(row.owner),
      dueDate: normalizeDate(row.dueDate),
      done: toBoolean(row.done),
      signal: planSignalOptions[row.signal] ? row.signal : "track",
      comments: cleanText(row.comments)
    },
    customColumns,
    row.custom
  );
}

function normalizeCriteriaRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("criteria"),
      useCase: cleanText(row.useCase),
      proof: cleanText(row.proof),
      importance: criteriaImportanceOptions[row.importance] ? row.importance : "high",
      needTestPlan: toBoolean(row.needTestPlan),
      status: criteriaStatusOptions[row.status] ? row.status : "not-reviewed"
    },
    customColumns,
    row.custom
  );
}

function normalizeTestPlanRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("test"),
      criterionRef: cleanText(row.criterionRef),
      step: cleanText(row.step),
      description: cleanText(row.description),
      status: testStepStatusOptions[row.status] ? row.status : "not-started",
      result: cleanText(row.result),
      exception: toBoolean(row.exception)
    },
    customColumns,
    row.custom
  );
}

function normalizeActionRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("action"),
      createdDate: normalizeDate(row.createdDate),
      title: cleanText(row.title),
      dueDate: normalizeDate(row.dueDate),
      owner: cleanText(row.owner),
      notes: cleanText(row.notes),
      done: toBoolean(row.done)
    },
    customColumns,
    row.custom
  );
}

function normalizeBlockerRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("blocker"),
      title: cleanText(row.title),
      owner: cleanText(row.owner),
      status: blockerStatusOptions[row.status] ? row.status : "open",
      impact: blockerImpactOptions[row.impact] ? row.impact : "medium",
      notes: cleanText(row.notes)
    },
    customColumns,
    row.custom
  );
}

function normalizeContextRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("context"),
      type: contextTypeOptions[row.type] ? row.type : "business",
      topic: cleanText(row.topic),
      notes: cleanText(row.notes)
    },
    customColumns,
    row.custom
  );
}

function normalizeOrgMapRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("org"),
      title: cleanText(row.title || row.role),
      name: cleanText(row.name),
      email: cleanText(row.email),
      side: orgSideOptions[row.side] ? row.side : "",
      team: cleanText(row.team),
      responsibility: cleanText(row.responsibility),
      reportsTo: cleanText(row.reportsTo),
      notes: cleanText(row.notes),
      x: normalizeCoordinate(row.x),
      y: normalizeCoordinate(row.y)
    },
    customColumns,
    row.custom
  );
}

function normalizeResourceRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("resource"),
      title: cleanText(row.title),
      type: resourceTypeOptions[row.type] ? row.type : "",
      audience: resourceAudienceOptions[row.audience] ? row.audience : "",
      access: accessOptions[row.access] ? row.access : "",
      link: cleanText(row.link),
      notes: cleanText(row.notes)
    },
    customColumns,
    row.custom
  );
}

function normalizeAssetRow(item, customColumns) {
  const row = item || {};
  return withCustomFields(
    {
      id: cleanText(row.id) || createId("asset"),
      title: cleanText(row.title),
      category: assetCategoryOptions[row.category] ? row.category : "",
      access: accessOptions[row.access] ? row.access : "",
      status: assetStatusOptions[row.status] ? row.status : "",
      owner: cleanText(row.owner),
      link: cleanText(row.link),
      notes: cleanText(row.notes)
    },
    customColumns,
    row.custom
  );
}

function normalizeVisualAssets(items) {
  return Array.isArray(items) ? items.map(normalizeVisualAsset).filter((item) => item.imageData) : [];
}

function normalizeSharedFiles(items) {
  return Array.isArray(items)
    ? items.map(normalizeSharedFile).filter((item) => item.fileData)
    : [];
}

function normalizeVisualAsset(item) {
  const visual = item || {};
  return {
    id: cleanText(visual.id) || createId("visual"),
    title: cleanText(visual.title),
    category: visualCategoryOptions[visual.category] ? visual.category : "architecture",
    notes: cleanText(visual.notes),
    fileName: cleanText(visual.fileName),
    imageData: cleanText(visual.imageData)
  };
}

function normalizeSharedFile(item) {
  const file = item || {};
  return {
    id: cleanText(file.id) || createId("shared-file"),
    title: cleanText(file.title),
    category: assetCategoryOptions[file.category] ? file.category : "note",
    access: accessOptions[file.access] ? file.access : "shared",
    status: assetStatusOptions[file.status] ? file.status : "ready",
    notes: cleanText(file.notes),
    fileName: cleanText(file.fileName),
    fileType: cleanText(file.fileType),
    fileSize: normalizeFileSize(file.fileSize),
    fileData: cleanText(file.fileData)
  };
}

function createPlanRow(customColumns) {
  return withCustomFields(
    {
      id: createId("plan"),
      stage: "",
      task: "",
      owner: "",
      dueDate: "",
      done: false,
      signal: "track",
      comments: ""
    },
    customColumns
  );
}

function createCriteriaRow(customColumns) {
  return withCustomFields(
    {
      id: createId("criteria"),
      useCase: "",
      proof: "",
      importance: "high",
      needTestPlan: false,
      status: "not-reviewed"
    },
    customColumns
  );
}

function createTestPlanRow(customColumns) {
  return withCustomFields(
    {
      id: createId("test"),
      criterionRef: "",
      step: "",
      description: "",
      status: "not-started",
      result: "",
      exception: false
    },
    customColumns
  );
}

function createActionRow(customColumns) {
  return withCustomFields(
    {
      id: createId("action"),
      createdDate: "",
      title: "",
      dueDate: "",
      owner: "",
      notes: "",
      done: false
    },
    customColumns
  );
}

function createBlockerRow(customColumns) {
  return withCustomFields(
    {
      id: createId("blocker"),
      title: "",
      owner: "",
      status: "open",
      impact: "medium",
      notes: ""
    },
    customColumns
  );
}

function createContextRow(customColumns) {
  return withCustomFields(
    {
      id: createId("context"),
      type: "business",
      topic: "",
      notes: ""
    },
    customColumns
  );
}

function createOrgMapRow(customColumns) {
  return withCustomFields(
    {
      id: createId("org"),
      title: "",
      name: "",
      email: "",
      side: "",
      team: "",
      responsibility: "",
      reportsTo: "",
      notes: "",
      x: null,
      y: null
    },
    customColumns
  );
}

function createResourceRow(customColumns) {
  return withCustomFields(
    {
      id: createId("resource"),
      title: "",
      type: "",
      audience: "",
      access: "",
      link: "",
      notes: ""
    },
    customColumns
  );
}

function createAssetRow(customColumns) {
  return withCustomFields(
    {
      id: createId("asset"),
      title: "",
      category: "",
      access: "",
      status: "",
      owner: "",
      link: "",
      notes: ""
    },
    customColumns
  );
}

function withCustomFields(base, customColumns, sourceCustom) {
  return {
    ...base,
    custom: normalizeCustomValues(sourceCustom, customColumns)
  };
}

function normalizeCustomValues(input, customColumns) {
  const source = input || {};
  return (customColumns || []).reduce((result, column) => {
    result[column.id] = cleanText(source[column.id]);
    return result;
  }, {});
}

function getChecklistItems() {
  const overviewFields = [
    state.overview.accountName,
    state.overview.accountExecutive,
    state.overview.customerLead,
    state.overview.primaryOutcome
  ];
  const overviewFilled = overviewFields.filter(hasText).length;

  const activePlanRows = state.planRows.filter(isPlanRowActive);
  const completePlanRows = activePlanRows.filter((item) => item.done).length;

  const activeCriteria = state.criteriaRows.filter(isCriteriaRowActive);
  const metCriteria = activeCriteria.filter((item) => item.status === "met").length;

  const requiredCriteria = state.criteriaRows
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => isCriteriaRowActive(item) && item.needTestPlan);
  const coveredCriteria = requiredCriteria.filter(({ index }) =>
    state.testPlanRows.some(
      (step) => isTestPlanRowActive(step) && cleanText(step.criterionRef) === String(index + 1)
    )
  ).length;

  const activeActions = state.actions.filter(isActionRowActive);
  const assignedOpenActions = activeActions.filter(
    (item) => !item.done && hasText(item.owner) && hasText(item.dueDate)
  ).length;

  const activeBlockers = state.blockers.filter(isBlockerRowActive);
  const ownedBlockers = activeBlockers.filter(
    (item) => hasText(item.title) && hasText(item.owner)
  ).length;

  const activeContext = state.contextRows.filter(isContextRowActive).length;

  return [
    {
      key: "overview",
      label: "Overview aligned",
      detail: `${overviewFilled}/4 core fields filled`,
      ready: overviewFilled === 4
    },
    {
      key: "plan",
      label: "Plan reviewed",
      detail: `${completePlanRows}/${activePlanRows.length || 0} plan rows done`,
      ready: activePlanRows.length > 0 && completePlanRows === activePlanRows.length
    },
    {
      key: "criteria",
      label: "Criteria agreed",
      detail: `${metCriteria}/${activeCriteria.length || 0} criteria marked met`,
      ready: activeCriteria.length > 0 && metCriteria > 0
    },
    {
      key: "testPlan",
      label: "Validation steps mapped",
      detail: requiredCriteria.length
        ? `${coveredCriteria}/${requiredCriteria.length} required criteria covered`
        : `${state.testPlanRows.filter(isTestPlanRowActive).length} steps listed`,
      ready:
        requiredCriteria.length === 0
          ? state.testPlanRows.some(isTestPlanRowActive)
          : coveredCriteria === requiredCriteria.length
    },
    {
      key: "actions",
      label: "Next actions assigned",
      detail: `${assignedOpenActions}/${activeActions.length || 0} open actions assigned`,
      ready: activeActions.length > 0 && assignedOpenActions === activeActions.length
    },
    {
      key: "blockers",
      label: "Blockers reviewed",
      detail: activeBlockers.length
        ? `${ownedBlockers}/${activeBlockers.length} blockers owned`
        : "No blockers logged",
      ready: activeBlockers.length === 0 || ownedBlockers === activeBlockers.length
    },
    {
      key: "context",
      label: "Context attached",
      detail: `${activeContext} context rows captured`,
      ready: activeContext > 0
    }
  ];
}

function getResourceCoverageItems() {
  const activeResources = state.resources.filter(isResourceRowActive);
  const sharedResources = activeResources.filter((item) => item.access === "shared");
  const executiveResources = activeResources.filter(
    (item) => item.access === "shared" && item.audience === "executive"
  );
  const technicalResources = activeResources.filter(
    (item) =>
      (item.audience === "technical" || item.type === "architecture") &&
      item.access === "shared"
  );
  const activeFiles = state.sharedFiles;
  const commercialFiles = activeFiles.filter(
    (item) =>
      item.access === "shared" &&
      (item.category === "contract" || item.category === "proposal" || item.category === "pricing")
  );
  const technicalFiles = activeFiles.filter(
    (item) =>
      item.category === "architecture" || item.category === "security" || item.category === "recording"
  );

  return [
    {
      label: "Shared links",
      detail: `${sharedResources.length}/${activeResources.length || 0} links marked shared`,
      ready: sharedResources.length > 0
    },
    {
      label: "Executive narrative",
      detail: executiveResources.length
        ? `${executiveResources.length} executive-ready resource${executiveResources.length === 1 ? "" : "s"}`
        : "Add a brief, deck, or summary for executive stakeholders",
      ready: executiveResources.length > 0
    },
    {
      label: "Technical references",
      detail:
        technicalResources.length || technicalFiles.length
          ? `${technicalResources.length + technicalFiles.length} technical item${
              technicalResources.length + technicalFiles.length === 1 ? "" : "s"
            } tracked`
          : "Add architecture, recordings, or technical explainers",
      ready: technicalResources.length + technicalFiles.length > 0
    },
    {
      label: "Commercial artifacts",
      detail: commercialFiles.length
        ? `${commercialFiles.length} shared commercial file${commercialFiles.length === 1 ? "" : "s"}`
        : "Add pricing, proposal, or contract artifacts when ready",
      ready: commercialFiles.length > 0
    }
  ];
}

function getPlanTone(item) {
  if (!isPlanRowActive(item)) {
    return "blank";
  }

  if (item.done) {
    return "done";
  }

  if (isOverdue(item.dueDate)) {
    return "risk";
  }

  return item.signal;
}

function getCriteriaTone(item) {
  if (!isCriteriaRowActive(item)) {
    return "blank";
  }

  if (item.status === "met") {
    return "track";
  }

  if (item.status === "in-review") {
    return "watch";
  }

  if (item.status === "missed") {
    return "risk";
  }

  return "blank";
}

function getTestPlanTone(item) {
  if (!isTestPlanRowActive(item)) {
    return "blank";
  }

  if (item.exception) {
    return "risk";
  }

  if (item.status === "done") {
    return "done";
  }

  if (item.status === "in-progress") {
    return "watch";
  }

  return "blank";
}

function getActionTone(item) {
  if (!isActionRowActive(item)) {
    return "blank";
  }

  if (item.done) {
    return "done";
  }

  if (isOverdue(item.dueDate)) {
    return "risk";
  }

  return "blank";
}

function getBlockerTone(item) {
  if (!isBlockerRowActive(item)) {
    return "blank";
  }

  if (item.status === "resolved") {
    return "done";
  }

  if (item.status === "mitigating") {
    return "watch";
  }

  return "risk";
}

function getResourceTone(item) {
  if (!isResourceRowActive(item)) {
    return "blank";
  }

  if (item.access === "shared") {
    return "track";
  }

  if (item.access === "internal") {
    return "watch";
  }

  return "blank";
}

function getAssetTone(item) {
  if (!isAssetRowActive(item)) {
    return "blank";
  }

  if (item.status === "signed") {
    return "done";
  }

  if (item.status === "pending") {
    return "watch";
  }

  if (item.status === "ready" || item.status === "shared") {
    return item.access === "internal" ? "watch" : "track";
  }

  if (item.access === "internal") {
    return "watch";
  }

  return "blank";
}

function updateRowTone(target, collectionName, record) {
  const row = target.closest("tr");
  if (!row) {
    return;
  }

  row.dataset.tone = getRowTone(collectionName, record);
}

function getRowTone(collectionName, record) {
  if (collectionName === "planRows") {
    return getPlanTone(record);
  }

  if (collectionName === "criteriaRows") {
    return getCriteriaTone(record);
  }

  if (collectionName === "testPlanRows") {
    return getTestPlanTone(record);
  }

  if (collectionName === "actions") {
    return getActionTone(record);
  }

  if (collectionName === "blockers") {
    return getBlockerTone(record);
  }

  if (collectionName === "contextRows") {
    return isContextRowActive(record) ? "track" : "blank";
  }

  if (collectionName === "orgMapRows") {
    return isOrgMapRowActive(record) ? "track" : "blank";
  }

  if (collectionName === "resources") {
    return getResourceTone(record);
  }

  if (collectionName === "assets") {
    return getAssetTone(record);
  }

  return "blank";
}

function isRowActive(collectionName, record) {
  if (collectionName === "planRows") {
    return isPlanRowActive(record);
  }

  if (collectionName === "criteriaRows") {
    return isCriteriaRowActive(record);
  }

  if (collectionName === "testPlanRows") {
    return isTestPlanRowActive(record);
  }

  if (collectionName === "actions") {
    return isActionRowActive(record);
  }

  if (collectionName === "blockers") {
    return isBlockerRowActive(record);
  }

  if (collectionName === "contextRows") {
    return isContextRowActive(record);
  }

  if (collectionName === "orgMapRows") {
    return isOrgMapRowActive(record);
  }

  if (collectionName === "resources") {
    return isResourceRowActive(record);
  }

  if (collectionName === "assets") {
    return isAssetRowActive(record);
  }

  return false;
}

function isPlanRowActive(item) {
  return (
    hasText(item.stage) ||
    hasText(item.task) ||
    hasText(item.owner) ||
    hasText(item.dueDate) ||
    hasText(item.comments) ||
    hasCustomData(item.custom) ||
    item.done
  );
}

function isCriteriaRowActive(item) {
  return (
    hasText(item.useCase) ||
    hasText(item.proof) ||
    hasCustomData(item.custom) ||
    item.needTestPlan ||
    item.status !== "not-reviewed" ||
    item.importance !== "high"
  );
}

function isTestPlanRowActive(item) {
  return (
    hasText(item.criterionRef) ||
    hasText(item.step) ||
    hasText(item.description) ||
    hasText(item.result) ||
    hasCustomData(item.custom) ||
    item.status !== "not-started" ||
    item.exception
  );
}

function isActionRowActive(item) {
  return (
    hasText(item.createdDate) ||
    hasText(item.title) ||
    hasText(item.dueDate) ||
    hasText(item.owner) ||
    hasText(item.notes) ||
    hasCustomData(item.custom) ||
    item.done
  );
}

function isBlockerRowActive(item) {
  return (
    hasText(item.title) ||
    hasText(item.owner) ||
    hasText(item.notes) ||
    hasCustomData(item.custom) ||
    item.status !== "open" ||
    item.impact !== "medium"
  );
}

function isContextRowActive(item) {
  return hasText(item.topic) || hasText(item.notes) || hasCustomData(item.custom);
}

function isOrgMapRowActive(item) {
  return (
    hasText(item.title) ||
    hasText(item.name) ||
    hasText(item.email) ||
    hasText(item.side) ||
    hasText(item.team) ||
    hasText(item.responsibility) ||
    hasText(item.reportsTo) ||
    hasText(item.notes) ||
    hasCustomData(item.custom)
  );
}

function isResourceRowActive(item) {
  return (
    hasText(item.title) ||
    hasText(item.type) ||
    hasText(item.audience) ||
    hasText(item.access) ||
    hasText(item.link) ||
    hasText(item.notes) ||
    hasCustomData(item.custom)
  );
}

function isAssetRowActive(item) {
  return (
    hasText(item.title) ||
    hasText(item.category) ||
    hasText(item.access) ||
    hasText(item.status) ||
    hasText(item.owner) ||
    hasText(item.link) ||
    hasText(item.notes) ||
    hasCustomData(item.custom)
  );
}

function hasCustomData(customValues) {
  return Object.values(customValues || {}).some(hasText);
}

function renderTextInput(collectionName, id, field, value, placeholder) {
  return `<input
    class="cell-input"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
    type="text"
    value="${escapeAttribute(value)}"
    placeholder="${escapeAttribute(placeholder)}"
  />`;
}

function renderNumberInput(collectionName, id, field, value, placeholder) {
  return `<input
    class="cell-input"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
    type="number"
    min="1"
    step="1"
    value="${escapeAttribute(value)}"
    placeholder="${escapeAttribute(placeholder)}"
  />`;
}

function renderDateInput(collectionName, id, field, value) {
  return `<input
    class="cell-input"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
    type="date"
    value="${escapeAttribute(value)}"
  />`;
}

function renderTextArea(collectionName, id, field, value, placeholder) {
  return `<textarea
    class="cell-area"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
    rows="1"
    placeholder="${escapeAttribute(placeholder)}"
  >${escapeHtml(value)}</textarea>`;
}

function renderSelect(collectionName, id, field, value, options) {
  return `<select
    class="cell-select"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
  >
    ${Object.entries(options)
      .map(
        ([optionValue, label]) => `
          <option value="${escapeAttribute(optionValue)}" ${
            optionValue === value ? "selected" : ""
          }>${escapeHtml(label)}</option>
        `
      )
      .join("")}
  </select>`;
}

function renderCheckbox(collectionName, id, field, checked, label) {
  return `<input
    class="cell-checkbox"
    data-collection="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    data-field="${escapeAttribute(field)}"
    type="checkbox"
    aria-label="${escapeAttribute(label)}"
    ${checked ? "checked" : ""}
  />`;
}

function renderDeleteButton(collectionName, id) {
  return `<button
    class="row-delete"
    type="button"
    data-delete-row="${escapeAttribute(collectionName)}"
    data-id="${escapeAttribute(id)}"
    aria-label="Delete row"
  >
    x
  </button>`;
}

function focusRow(collectionName, id) {
  const selector = `[data-collection="${collectionName}"][data-id="${id}"]`;
  const focusTarget = document.querySelector(
    `${selector}[data-field]:not([type="checkbox"]), ${selector}[data-custom-key]`
  );
  if (!focusTarget) {
    return;
  }

  const runFocus = () => {
    if (focusTarget.scrollIntoView) {
      focusTarget.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (focusTarget.focus) {
      focusTarget.focus();
    }
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(runFocus);
    return;
  }

  runFocus();
}

function focusColumnHeader(collectionName, columnId) {
  const selector = `[data-column-collection="${collectionName}"][data-column-id="${columnId}"]`;
  const focusTarget = document.querySelector(selector);
  if (!focusTarget) {
    return;
  }

  const runFocus = () => {
    if (focusTarget.scrollIntoView) {
      focusTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
    if (focusTarget.focus) {
      focusTarget.focus();
    }
    if (focusTarget.select) {
      focusTarget.select();
    }
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(runFocus);
    return;
  }

  runFocus();
}

function autoResizeTextareas(root) {
  const scope = root || document;
  if (!scope.querySelectorAll) {
    return;
  }

  scope.querySelectorAll("textarea").forEach((textarea) => {
    const minHeight =
      typeof window !== "undefined" && window.getComputedStyle
        ? parseFloat(window.getComputedStyle(textarea).minHeight) || 42
        : 42;
    textarea.style.height = "0px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
  });
}

function setOverviewValue(id, value) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  if (element.value !== value) {
    element.value = value;
  }
}

function setMessage(message) {
  if (elements.workspaceMessage) {
    elements.workspaceMessage.textContent = message;
  }
}

function readTargetValue(target) {
  if (target.type === "checkbox") {
    return target.checked;
  }

  if (target.type === "date") {
    return normalizeDate(target.value);
  }

  return cleanText(target.value);
}

function buildRows(count, factory) {
  return Array.from({ length: count }, () => factory());
}

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeCoordinate(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number) : null;
}

function normalizeFileSize(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function hasCoordinate(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function stripExtension(filename) {
  return cleanText(filename).replace(/\.[^.]+$/, "");
}

function getFileExtension(filename) {
  const match = cleanText(filename).match(/\.([^.]+)$/);
  return match ? match[1].toUpperCase() : "";
}

function hasText(value) {
  return cleanText(value).length > 0;
}

function normalizeDate(value) {
  const input = cleanText(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(input) ? input : "";
}

function toBoolean(value) {
  return value === true || value === "true" || value === "on" || value === 1;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function isOverdue(dateValue) {
  if (!dateValue) {
    return false;
  }

  const today = new Date();
  const isoToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;
  return dateValue < isoToday;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatFileSize(bytes) {
  const size = normalizeFileSize(bytes);
  if (!size) {
    return "";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function inferUploadedFileCategory(fileName) {
  const lower = cleanText(fileName).toLowerCase();

  if (/(contract|agreement|msa|sow|order|quote)/.test(lower)) {
    return "contract";
  }

  if (/(proposal|pricing|commercial)/.test(lower)) {
    return "proposal";
  }

  if (/(arch|architecture|diagram|topology|design)/.test(lower)) {
    return "architecture";
  }

  if (/(security|soc|compliance)/.test(lower)) {
    return "security";
  }

  if (/(recording|demo|call|meeting)/.test(lower)) {
    return "recording";
  }

  return "note";
}

function isPdfFile(item) {
  return String(item.fileType || "").toLowerCase().includes("pdf") || getFileExtension(item.fileName) === "PDF";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
