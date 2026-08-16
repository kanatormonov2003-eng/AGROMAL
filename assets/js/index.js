import { initCommon, setState, setWhatsappLink } from "./common.js";
import { requireAccess } from "./auth.js";
import { signIn, signOut } from "./supabase.js";
import { t } from "./i18n.js";

initCommon();

const form = document.querySelector("#login-form");
const identifier = document.querySelector("#identifier");
const password = document.querySelector("#password");
const submit = document.querySelector("#login-button");
const message = document.querySelector("#login-message");
const verification = document.querySelector("#verification-whatsapp");
const waMessages = {
  ru: "Здравствуйте! Мы хотим пройти B2B-верификацию и получить доступ к Торговому Дому AgroMal.",
  ky: "Саламатсызбы! Биз B2B-текшерүүдөн өтүп, AgroMal Соода Үйүнө кирүүнү каалайбыз.",
  en: "Hello! We would like to complete B2B verification and access AgroMal Trading House."
};

function updateWhatsapp() {
  setWhatsappLink(verification, window.AGROMAL_CONFIG?.whatsappVerification, waMessages);
}
updateWhatsapp();
document.addEventListener("agromal:language", updateWhatsapp);

const authReason = new URLSearchParams(location.search).get("auth");
if (authReason) {
  const reasonKeys = { blocked: "blocked", expired: "expired", forbidden: "forbidden", configuration: "configMissing" };
  setState(message, "error", t(reasonKeys[authReason] || "expired"));
}

identifier.addEventListener("input", () => { identifier.value = identifier.value.replace(/\D/g, "").slice(0, 14); });
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setState(message, "error", "");
  const inn = identifier.value.trim();
  if (!/^\d{8,14}$/.test(inn)) return setState(message, "error", t("invalidInn"));
  if (password.value.length < 8) return setState(message, "error", t("passwordShort"));
  submit.disabled = true;
  submit.textContent = t("connecting");
  try {
    await signIn(inn, password.value);
    const result = await requireAccess();
    if (!result.ok) {
      await signOut();
      const key = result.reason === "blocked" ? "blocked" : result.reason === "configuration" ? "configMissing" : "loginDenied";
      setState(message, "error", t(key));
      return;
    }
    location.replace("./dashboard.html");
  } catch (error) {
    const key = error.message === "NOT_CONFIGURED" ? "configMissing" : "loginDenied";
    setState(message, "error", t(key));
  } finally {
    password.value = "";
    submit.disabled = false;
    submit.textContent = t("connect");
  }
});
