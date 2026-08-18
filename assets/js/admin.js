import { redirectForAccess, requireAccess } from "./auth.js";
import { create, formatNumber, initCommon, setState } from "./common.js";
import { db, invokeFunction } from "./supabase.js";
import { t } from "./i18n.js";

initCommon();

let lots = [];
let organizations = [];
let currentOrganizationId = null;

const notice = document.querySelector("#admin-notice");
const lotForm = document.querySelector("#lot-form");
const userForm = document.querySelector("#user-form");

const lotFields = {
  id: document.querySelector("#lot-id"),
  lot_number: document.querySelector("#lot-number"),
  animal_type: document.querySelector("#animal-type"),
  breed: document.querySelector("#breed"),
  region: document.querySelector("#region"),
  quantity: document.querySelector("#quantity"),
  price: document.querySelector("#price"),
  price_unit: document.querySelector("#price-unit"),
  status: document.querySelector("#lot-status"),
  status_note: document.querySelector("#status-note"),
  action_note: document.querySelector("#action-note")
};

const productKeys = { cattle: "cattle", sheep: "sheep", horse: "horse", yak: "yak", selection: "selection" };
const statusKeys = { available: "available", reserved: "reserved", sold: "sold", closed: "closed", active: "active", pending: "pending", blocked: "blockedStatus" };

function lotTitle(lot) {
  return `${t(productKeys[lot.animal_type])} • ${lot.breed}`;
}

function priceLabel(price, unit) {
  return `${formatNumber(price)} ${unit}`;
}

function tableCell(label, text, className = "") {
  const cell = create("td", className, text);
  cell.dataset.label = label;
  return cell;
}

function actionButton(label, handler, options = {}) {
  const button = create("button", `button button--small ${options.danger ? "button--danger" : options.ghost ? "button--ghost" : ""}`.trim(), label);
  button.type = "button";
  button.addEventListener("click", handler);
  return button;
}

function showError(error, fallback = "formError") {
  const keys = {
    SELF_BLOCK_FORBIDDEN: "selfBlock",
    LAST_ADMIN_REQUIRED: "lastAdmin",
    DUPLICATE_ORGANIZATION: "duplicateOrganization"
  };
  setState(notice, "error", t(keys[error?.code || error?.message] || fallback));
}

function resetLotForm() {
  lotForm.reset();
  lotFields.id.value = "";
  document.querySelector("#lot-submit").textContent = t("createLot");
  document.querySelector("#lot-cancel").hidden = true;
}

function editLot(lot) {
  Object.entries(lotFields).forEach(([key, field]) => {
    field.value = key === "id" ? lot.id : lot[key] ?? "";
  });
  document.querySelector("#lot-submit").textContent = t("save");
  document.querySelector("#lot-cancel").hidden = false;
  lotForm.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

async function deleteLot(lot) {
  if (!confirm(t("confirmDelete"))) return;
  try {
    const removed = await db("lots", { method: "DELETE", query: `?id=eq.${encodeURIComponent(lot.id)}&select=id`, prefer: "return=representation" });
    if (!Array.isArray(removed) || removed.length !== 1) throw new Error("LOT_NOT_FOUND");
    await loadLots();
    setState(notice, "success", t("successSaved"));
  } catch (error) {
    showError(error, "deleteError");
  }
}

function renderLots() {
  const body = document.querySelector("#admin-lots");
  body.replaceChildren();
  if (!lots.length) {
    const row = document.createElement("tr");
    const cell = tableCell("", t("emptyLots"));
    cell.colSpan = 5;
    row.append(cell);
    body.append(row);
    return;
  }

  lots.forEach((lot) => {
    const row = document.createElement("tr");
    row.append(
      tableCell(t("lotId"), `#${lot.lot_number}`, "lot-number"),
      tableCell(t("product"), lotTitle(lot)),
      tableCell(t("priceColumn"), priceLabel(lot.price, lot.price_unit)),
      (() => {
        const statusCell = tableCell(t("status"), "");
        statusCell.append(create("span", `status status--${lot.status}`, lot.status_note || t(statusKeys[lot.status])));
        return statusCell;
      })(),
      (() => {
        const actions = tableCell(t("action"), "", "actions-cell");
        actions.append(
          actionButton(t("edit"), () => editLot(lot), { ghost: true }),
          actionButton(t("remove"), () => deleteLot(lot), { danger: true })
        );
        return actions;
      })()
    );
    body.append(row);
  });
}

function renderOrganizations() {
  const body = document.querySelector("#organizations-body");
  body.replaceChildren();
  organizations.forEach((organization) => {
    const profiles = organization.profiles?.length ? organization.profiles : [null];
    profiles.forEach((profile) => {
      const row = document.createElement("tr");
      row.append(
        tableCell(t("company"), organization.company_name),
        tableCell(t("inn"), organization.inn),
        tableCell(t("emailLogin"), profile?.login_email || "—")
      );
      const statusCell = tableCell(t("orgStatus"), "");
      statusCell.append(create("span", `status status--${organization.status}`, t(statusKeys[organization.status])));
      row.append(statusCell);
      row.append(tableCell(t("role"), profile ? t(profile.role === "admin" ? "adminRole" : "buyer") : "—"));
      const actions = tableCell(t("action"), "", "actions-cell");
      if (profile && organization.id !== currentOrganizationId) {
        const next = organization.status === "blocked" ? "active" : "blocked";
        actions.append(actionButton(t(next === "active" ? "unblock" : "block"), () => setOrganizationStatus(organization.id, next), { danger: next === "blocked", ghost: next !== "blocked" }));
      }
      row.append(actions);
      body.append(row);
    });
  });
}

async function loadLots() {
  lots = await db("lots", { query: "?select=id,lot_number,animal_type,breed,region,quantity,weight_kg,feed_type,contract_type,contract_label,price,price_unit,price_note,primary_metric_label,primary_metric_value,secondary_metric_label,secondary_metric_value,tertiary_metric_label,tertiary_metric_value,status,status_note,action_note,is_demo&order=created_at.asc" });
  renderLots();
}

async function loadOrganizations() {
  organizations = await db("organizations", { query: "?select=id,company_name,inn,status,profiles(id,full_name,role,login_email)&order=created_at.desc" });
  renderOrganizations();
}

async function setOrganizationStatus(organizationId, status) {
  setState(notice, "loading", t("loading"));
  try {
    await invokeFunction("manage-user", { action: "set_status", organization_id: organizationId, status });
    await loadOrganizations();
    setState(notice, "success", t("successSaved"));
  } catch (error) {
    showError(error);
  }
}

lotForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!lotForm.reportValidity()) return;
  const payload = {
  lot_number: lotFields.lot_number.value.trim(),
  animal_type: lotFields.animal_type.value,
  breed: lotFields.breed.value.trim(),
  region: lotFields.region.value.trim(),
  quantity: Number(lotFields.quantity.value),
  contract_type: "spot",
  price: Number(lotFields.price.value),
  price_unit: lotFields.price_unit.value.trim(),
  status: lotFields.status.value,
  status_note: lotFields.status_note.value.trim() || null,
  action_note: lotFields.action_note.value.trim() || null,
  is_demo: false
};
  const submit = document.querySelector("#lot-submit");
  submit.disabled = true;
  try {
    const changed = lotFields.id.value
      ? await db("lots", { method: "PATCH", query: `?id=eq.${encodeURIComponent(lotFields.id.value)}&select=id`, body: payload, prefer: "return=representation" })
      : await db("lots", { method: "POST", body: payload, prefer: "return=representation" });
    if (!Array.isArray(changed) || changed.length !== 1) throw new Error("LOT_NOT_SAVED");
    resetLotForm();
    await loadLots();
    setState(notice, "success", t("successSaved"));
  } catch (error) {
    showError(error);
  } finally {
    submit.disabled = false;
  }
});

document.querySelector("#lot-cancel").addEventListener("click", resetLotForm);
document.querySelector("#inn").addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 14);
});

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!userForm.reportValidity()) return;
  const inn = document.querySelector("#inn").value;
  if (!/^\d{8,14}$/.test(inn)) return setState(notice, "error", t("invalidInn"));
  const submit = userForm.querySelector("button[type=submit]");
  submit.disabled = true;
  try {
    await invokeFunction("manage-user", {
      action: "create",
      company_name: document.querySelector("#company").value.trim(),
      inn,
      full_name: document.querySelector("#full-name").value.trim(),
      role: document.querySelector("#user-role").value,
      password: document.querySelector("#temp-password").value
    });
    userForm.reset();
    await loadOrganizations();
    setState(notice, "success", t("successSaved"));
  } catch (error) {
    showError(error);
  } finally {
    document.querySelector("#temp-password").value = "";
    submit.disabled = false;
  }
});

async function start() {
  const result = await requireAccess("admin");
  if (redirectForAccess(result)) return;
  currentOrganizationId = result.access.organization_id;
  document.querySelector("#user-meta").textContent = `${result.access.full_name} · ${result.access.company_name}`;
  try {
    await Promise.all([loadLots(), loadOrganizations()]);
  } catch (error) {
    showError(error);
  }
  document.addEventListener("agromal:language", () => {
    renderLots();
    renderOrganizations();
    if (!lotFields.id.value) document.querySelector("#lot-submit").textContent = t("createLot");
  });
}

start();
