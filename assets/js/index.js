import { initCommon, setState } from "./common.js";
import { requireAccess } from "./auth.js";
import { signIn, signOut } from "./supabase.js";
import { t } from "./i18n.js";

initCommon();

const form = document.querySelector("#login-form");
const identifier = document.querySelector("#identifier");
const password = document.querySelector("#password");
const submit = document.querySelector("#login-button");
const message = document.querySelector("#login-message");

const HOMEPAGE_WHATSAPP_URL = "https://wa.me/996501095950";

function ensureHomepageWhatsappLinks() {
  document
    .querySelectorAll(
      ".hero-access-card--buyer, .hero-access-card--farm, .hero-help__content a"
    )
    .forEach((link) => {
      link.href = HOMEPAGE_WHATSAPP_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
}

ensureHomepageWhatsappLinks();

document.addEventListener(
  "agromal:language",
  () => {
    // DEMO-лоты на главной странице являются
    // статическим контентом index.html.
    // Здесь намеренно ничего не загружаем из Supabase.
  }
);


/* =========================================================
   AUTH MESSAGE
   ========================================================= */

const authReason =
  new URLSearchParams(location.search).get("auth");

if (authReason) {
  const reasonKeys = {
    blocked: "blocked",
    expired: "expired",
    forbidden: "forbidden",
    configuration: "configMissing"
  };

  setState(
    message,
    "error",
    t(reasonKeys[authReason] || "expired")
  );
}


/* =========================================================
   IDENTIFIER
   ========================================================= */

identifier.addEventListener(
  "input",
  () => {
    identifier.value = identifier.value
      .replace(/\D/g, "")
      .slice(0, 14);
  }
);


/* =========================================================
   LOGIN
   ========================================================= */

form.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    setState(
      message,
      "error",
      ""
    );

    const inn =
      identifier.value.trim();

    if (!/^\d{8,14}$/.test(inn)) {
      return setState(
        message,
        "error",
        t("invalidInn")
      );
    }

    if (password.value.length < 8) {
      return setState(
        message,
        "error",
        t("passwordShort")
      );
    }

    submit.disabled = true;
    submit.textContent =
      t("connecting");

    try {
      await signIn(
        inn,
        password.value
      );

      const result =
        await requireAccess();

      if (!result.ok) {
        await signOut();

        const key =
          result.reason === "blocked"
            ? "blocked"
            : result.reason ===
                "configuration"
              ? "configMissing"
              : "loginDenied";

        setState(
          message,
          "error",
          t(key)
        );

        return;
      }

      location.replace(
        "./dashboard.html"
      );

    } catch (error) {
      const key =
        error.message ===
        "NOT_CONFIGURED"
          ? "configMissing"
          : "loginDenied";

      setState(
        message,
        "error",
        t(key)
      );
    } finally {
      password.value = "";
      submit.disabled = false;
      submit.textContent =
        t("connect");
    }
  }
);