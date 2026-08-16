import { redirectForAccess, requireAccess } from "./auth.js";
import { create, formatNumber, initCommon, setState, setWhatsappLink, whatsappUrl } from "./common.js";
import { db } from "./supabase.js";
import { language, t } from "./i18n.js";

initCommon();
let lots = [];
let access;
let loadStatus = "loading";
const state = document.querySelector("#lots-state");
const table = document.querySelector("#lots-table-wrap");
const tbody = document.querySelector("#lots-body");
const cards = document.querySelector("#lot-cards");

const productKeys = { cattle: "cattle", sheep: "sheep", horse: "horse", yak: "yak" };
const statusKeys = { available: "available", reserved: "reserved", sold: "sold", closed: "closed" };
function lotMessage(lot) {
  const values = {
    ru: `Здравствуйте! По открытому лоту №${lot.lot_number} на сайте AgroMal готовы сделать предложение.`,
    ky: `Саламатсызбы! AgroMal сайтындагы ачык №${lot.lot_number} лот боюнча сунуш берүүгө даярбыз.`,
    en: `Hello! We are ready to make an offer for open lot No. ${lot.lot_number} on AgroMal.`
  };
  return values[language()] || values.ru;
}
function valueCell(text, className = "") { return create("td", className, text); }
function statusNode(lot) { return create("span", `status status--${lot.status}`, t(statusKeys[lot.status])); }
function lotAction(lot) {
  const link = create("a", "button button--small", t("propose"));
  if (lot.status === "available") {
    const url = whatsappUrl(window.AGROMAL_CONFIG?.whatsappModeration, lotMessage(lot));
    if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
    else { link.setAttribute("aria-disabled", "true"); link.title = t("configMissing"); }
  } else { link.setAttribute("aria-disabled", "true"); link.title = t("unavailable"); }
  return link;
}
function numberLabel(value, suffix) { return `${formatNumber(value)} ${suffix}`; }
function renderError() {
  table.hidden = true;
  setState(state, "error", t("loadError"));
  const retry = create("button", "button button--ghost button--small", t("retry"));
  retry.type = "button";
  retry.addEventListener("click", loadLots, { once: true });
  state.append(document.createElement("br"), retry);
}
function render() {
  tbody.replaceChildren(); cards.replaceChildren();
  if (loadStatus === "error") { renderError(); return; }
  if (!lots.length) { table.hidden = true; setState(state, "loading", t("emptyLots")); return; }
  state.hidden = true; table.hidden = false;
  lots.forEach((lot) => {
    const row = document.createElement("tr");
    const number = valueCell(lot.lot_number, "lot-number");
    if (lot.is_demo) number.append(create("span", "demo-tag", "DEMO"));
    row.append(number, valueCell(t(productKeys[lot.animal_type]) || lot.animal_type), valueCell(lot.breed), valueCell(numberLabel(lot.quantity, "HEAD")), valueCell(numberLabel(lot.weight_kg, "KG")), valueCell(lot.region), valueCell(lot.feed_type), valueCell(lot.contract_type.toUpperCase()));
    const statusCell = document.createElement("td"); statusCell.append(statusNode(lot)); row.append(statusCell);
    const actionCell = document.createElement("td"); actionCell.append(lotAction(lot)); row.append(actionCell); tbody.append(row);
    const card = create("article", "lot-card"); const top = create("div", "lot-card__top");
    const heading = document.createElement("div"); const id = create("span", "lot-number", lot.lot_number); if (lot.is_demo) id.append(create("span", "demo-tag", "DEMO")); heading.append(id, create("h3", "lot-card__title", `${t(productKeys[lot.animal_type])} · ${lot.breed}`)); top.append(heading, statusNode(lot));
    const grid = create("div", "lot-card__grid"); [["quantity", numberLabel(lot.quantity,"HEAD")],["weight",numberLabel(lot.weight_kg,"KG")],["region",lot.region],["feed",lot.feed_type],["contract",lot.contract_type.toUpperCase()]].forEach(([key,value]) => { const pair=create("div","data-pair"); pair.append(create("span","",t(key)),create("strong","",value)); grid.append(pair); });
    card.append(top, grid, lotAction(lot)); cards.append(card);
  });
}
async function loadLots() {
  loadStatus = "loading";
  setState(state, "loading", t("loading")); table.hidden = true;
  try { lots = await db("lots", { query: "?select=id,lot_number,animal_type,breed,region,quantity,weight_kg,feed_type,contract_type,status,is_demo&order=created_at.desc" }); loadStatus = "loaded"; render(); }
  catch { loadStatus = "error"; renderError(); }
}
async function start() {
  const result = await requireAccess(); if (redirectForAccess(result)) return;
  access = result.access;
  document.querySelector("#user-meta").textContent = `${access.full_name} · ${access.company_name}`;
  document.querySelector("#admin-link").hidden = access.role !== "admin";
  const moderationMessages = { ru: "Салам Алейкум! Я хочу передать данные по новому оптовому лоту на модерацию в ТД AgroMal.", ky: "Салам Алейкум! AgroMal Соода Үйүнө жаңы дүң лот боюнча маалыматты модерацияга бергим келет.", en: "Hello! I would like to submit a new wholesale lot to AgroMal Trading House for moderation." };
  const updateWa = () => setWhatsappLink(document.querySelector("#moderation-whatsapp"), window.AGROMAL_CONFIG?.whatsappModeration, moderationMessages);
  updateWa(); document.addEventListener("agromal:language", () => { updateWa(); render(); });
  await loadLots();
}
start();
