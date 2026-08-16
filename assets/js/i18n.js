const messages = {
  ru: {
    tickerLot1: "КРС · АЛА-ТОО · 40 ГОЛОВ · 17 600 КГ · ТАЛАССКАЯ ОБЛАСТЬ",
tickerLot2: "КРС · ШВИЦКАЯ · 24 ГОЛОВЫ · 10 800 КГ · ЧУЙСКАЯ ОБЛАСТЬ",
tickerLot3: "ЛОШАДИ · НОВО-КЫРГЫЗСКАЯ · 18 ГОЛОВ · 7 200 КГ · ИССЫК-КУЛЬ",
tickerLot4: "ЯКИ · КЫРГЫЗСКИЙ ЯК · 30 ГОЛОВ · 9 000 КГ · ОШСКАЯ ОБЛАСТЬ",
tickerSold: "ВЫКУПЛЕНО",
    tagline: "ОПТОВЫЕ ПАРТИИ СКОТА · ДҮҢ МАЛ ПАРТИЯЛАРЫ", privateAccess: "ЗАКРЫТЫЙ ДОСТУП", logout: "ВЫЙТИ", admin: "АДМИН",
    heroLabel: "ЗАКРЫТАЯ ЦИФРОВАЯ ИНФОРМАЦИОННО-ТОРГОВАЯ ПЛАТФОРМА", heroTitle: "Оптимизация оптовых закупок и обеспечение сырьевой стабильности для пищевой промышленности.", heroText: "AGROMAL структурирует взаимодействие между поставщиками животноводческой продукции и промышленными закупщиками Кыргызстана.",
    verified: "РУЧНАЯ ВЕРИФИКАЦИЯ", direct: "ПРЯМОЕ ВЗАИМОДЕЙСТВИЕ", forward: "SPOT И FORWARD", ecosystem: "DIGITAL AGRO ECOSYSTEM", ecosystemTitle: "Архитектура готова к будущим интеграциям",
ecosystemText: "MVP объединяет проверку доступа, закрытую витрину оптовых лотов и ручное управление торговыми данными. Архитектура платформы подготовлена к дальнейшему информационному взаимодействию с государственными и отраслевыми системами.",
    loginTitle: "ВХОД В ТОРГОВЫЙ ТЕРМИНАЛ", loginSub: "Доступ только для активных проверенных организаций", identifier: "ИНН ОРГАНИЗАЦИИ", identifierPlaceholder: "Укажите ИНН организации", password: "ПАРОЛЬ ДОСТУПА", passwordPlaceholder: "Введите пароль доступа", connect: "ПОДКЛЮЧИТЬСЯ К ТОРГОВОЙ СЕССИИ", connecting: "ПОДКЛЮЧЕНИЕ…", requestLead: "Для получения доступа к закрытой витрине актуальных B2B-лотов и прохождения верификации предприятия:", requestAccess: "ПОДАТЬ ЗАЯВКУ НА ПОЛУЧЕНИЕ КЛЮЧЕЙ ДОСТУПА", loginDenied: "Доступ отклонён. Проверьте идентификатор организации и пароль.", blocked: "Доступ к платформе заблокирован. Обратитесь к администратору.", expired: "Сессия завершена. Войдите снова.", forbidden: "Недостаточно прав для доступа к разделу.", configMissing: "Подключение Supabase не настроено. Администратору необходимо заполнить assets/js/config.js.", required: "Заполните обязательные поля.", invalidInn: "ИНН должен содержать от 8 до 14 цифр.", passwordShort: "Пароль должен содержать не менее 8 символов.",
    demoData: "ВЫКУПЛЕННЫЕ ЛОТЫ",
    ticker: "ИСТОРИЯ СДЕЛОК · КРС / ЧУЙ · МРС / НАРЫН · ЛОШАДИ / ИССЫК-КУЛЬ · ЯКИ / ВЫСОКОГОРЬЕ · БЕЗ ПУБЛИКАЦИИ НЕПОДТВЕРЖДЁННЫХ ЦЕН",
    dashboardTitle: "ТОРГОВАЯ СЕССИЯ", dashboardIntro: "Актуальные оптовые лоты для проверенных закупщиков", lots: "ЛОТЫ", loading: "Загрузка…", emptyLots: "В текущей торговой сессии нет доступных лотов.", loadError: "Не удалось загрузить лоты. Проверьте соединение и попробуйте ещё раз.", retry: "ПОВТОРИТЬ", lotId: "LOT ID", product: "ПРОДУКТ", breed: "ПОРОДА", quantity: "КОЛИЧЕСТВО", weight: "ВЕС", region: "РЕГИОН", contract: "ТИП КОНТРАКТА", status: "СТАТУС", action: "ДЕЙСТВИЕ", feed: "ТИП КОРМА", available: "ОТКРЫТА ТОРГОВАЯ СЕССИЯ", reserved: "ЛОТ ЗАБРОНИРОВАН", sold: "ВЫКУПЛЕНО", closed: "ТОРГИ ЗАКРЫТЫ", propose: "ПОДАТЬ ЦЕНОВОЕ ПРЕДЛОЖЕНИЕ", unavailable: "Действие недоступно для текущего статуса", moderationLead: "Крупным фермерским хозяйствам и специалистам для передачи данных по новым оптовым партиям:", moderation: "ПЕРЕДАТЬ ДАННЫЕ В СЛУЖБУ МОДЕРАЦИИ",
    adminTitle: "УПРАВЛЕНИЕ ПЛАТФОРМОЙ", adminIntro: "Лоты и доступ организаций", organizations: "USERS / ORGANIZATIONS", createLot: "СОЗДАТЬ ЛОТ", save: "СОХРАНИТЬ", cancel: "ОТМЕНА", edit: "ИЗМЕНИТЬ", remove: "УДАЛИТЬ", lotNumber: "НОМЕР ЛОТА", animalType: "ТИП СКОТА", select: "ВЫБЕРИТЕ", company: "ОРГАНИЗАЦИЯ", inn: "ИНН", emailLogin: "EMAIL / LOGIN", role: "РОЛЬ", orgStatus: "СТАТУС", createUser: "СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ", block: "ЗАБЛОКИРОВАТЬ", unblock: "РАЗБЛОКИРОВАТЬ", fullName: "ФИО", tempPassword: "ВРЕМЕННЫЙ ПАРОЛЬ", successSaved: "Изменения сохранены.", confirmDelete: "Удалить этот лот? Действие нельзя отменить.", formError: "Проверьте заполнение формы.", selfBlock: "Нельзя заблокировать собственную организацию администратора.", lastAdmin: "На платформе должен остаться хотя бы один активный администратор.", duplicateOrganization: "Организация с таким ИНН уже существует.", deleteError: "Не удалось удалить лот.", userHint: "Передайте временный пароль пользователю по защищённому каналу. Он не сохраняется в базе данных AGROMAL.",
    active: "АКТИВНА", pending: "ОЖИДАЕТ", blockedStatus: "ЗАБЛОКИРОВАНА", buyer: "ЗАКУПЩИК", adminRole: "АДМИНИСТРАТОР", cattle: "КРС", sheep: "МРС", horse: "ЛОШАДИ", yak: "ЯКИ", spot: "SPOT", forwardContract: "FORWARD",
    footerDocs: "Юридические документы находятся в подготовке", privacy: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ", rules: "ПРАВИЛА ПЛАТФОРМЫ", offer: "ПУБЛИЧНАЯ ОФЕРТА", backHome: "НА ГЛАВНУЮ", notFound: "СТРАНИЦА НЕ НАЙДЕНА", notFoundText: "Запрошенный адрес недоступен или был перемещён."
    
  },
  ky: {
    tickerLot1: "КРС · АЛА-ТОО · 40 БАШ · 17 600 КГ · ТАЛАС ОБЛАСТЫ",
tickerLot2: "КРС · ШВИЦКАЯ · 24 БАШ · 10 800 КГ · ЧҮЙ ОБЛАСТЫ",
tickerLot3: "ЖЫЛКЫ · НОВО-КЫРГЫЗСКАЯ · 18 БАШ · 7 200 КГ · ЫСЫК-КӨЛ",
tickerLot4: "ТОПОЗ · КЫРГЫЗ ТОПОЗУ · 30 БАШ · 9 000 КГ · ОШ ОБЛАСТЫ",
tickerSold: "САТЫЛДЫ",
    tagline: "ОПТОВЫЕ ПАРТИИ СКОТА · ДҮҢ МАЛ ПАРТИЯЛАРЫ", privateAccess: "ЖАБЫК КИРҮҮ", logout: "ЧЫГУУ", admin: "АДМИН",
    heroLabel: "ЖАБЫК САНАРИПТИК МААЛЫМАТТЫК-СООДА ПЛАТФОРМАСЫ", heroTitle: "Тамак-аш өнөр жайы үчүн дүң сатып алууларды оптималдаштыруу жана чийки зат туруктуулугун камсыз кылуу.", heroText: "AGROMAL Кыргызстандагы мал чарба продукциясын жеткирүүчүлөр менен өнөр жай сатып алуучуларынын иштешүүсүн түзүмдөштүрөт.",
    verified: "КОЛ МЕНЕН ТЕКШЕРҮҮ", direct: "ТҮЗ ИШТЕШҮҮ", forward: "SPOT ЖАНА FORWARD", ecosystem: "DIGITAL AGRO ECOSYSTEM", ecosystemTitle: "Архитектура келечектеги интеграцияларга даяр",
ecosystemText: "MVP кирүүнү текшерүүнү, дүң лоттордун жабык витринасын жана соода маалыматтарын кол менен башкарууну бириктирет. Платформанын архитектурасы мамлекеттик жана тармактык системалар менен мындан аркы маалыматтык өз ара аракеттенүүгө даяр.",
    loginTitle: "СООДА ТЕРМИНАЛЫНА КИРҮҮ", loginSub: "Активдүү текшерилген уюмдар үчүн гана", identifier: "УЮМДУН ИНН", identifierPlaceholder: "Уюмдун ИНН номерин киргизиңиз", password: "КИРҮҮ СЫРСӨЗҮ", passwordPlaceholder: "Кирүү сырсөзүн киргизиңиз", connect: "СООДА СЕССИЯСЫНА КОШУЛУУ", connecting: "КОШУЛУУДА…", requestLead: "Жабык актуалдуу B2B-лотторго кирүү жана ишкананы текшерүүдөн өткөрүү үчүн:", requestAccess: "КИРҮҮ АЧКЫЧТАРЫН АЛУУГА ӨТҮНМӨ БЕРҮҮ", loginDenied: "Кирүүгө уруксат берилген жок. Уюмдун идентификаторун жана сырсөздү текшериңиз.", blocked: "Платформага кирүү бөгөттөлгөн. Администраторго кайрылыңыз.", expired: "Сессия аяктады. Кайра кириңиз.", forbidden: "Бул бөлүмгө кирүүгө укук жетишсиз.", configMissing: "Supabase туташуусу жөндөлгөн эмес. Администратор assets/js/config.js файлын толтурушу керек.", required: "Милдеттүү талааларды толтуруңуз.", invalidInn: "ИНН 8ден 14кө чейинки сандардан турушу керек.", passwordShort: "Сырсөз кеминде 8 белгиден турушу керек.",
   demoData: "САТЫЛГАН ЛОТТОР",
ticker: "БҮТКӨН СООДАЛАР · КРС / ЧҮЙ · МРС / НАРЫН · ЖЫЛКЫ / ЫСЫК-КӨЛ · ТОПОЗ / БИЙИК ТОО · ТАСТЫКТАЛБАГАН БААЛАР ЖАРЫЯЛАНБАЙТ",
    dashboardTitle: "СООДА СЕССИЯСЫ", dashboardIntro: "Текшерилген сатып алуучулар үчүн актуалдуу дүң лоттор", lots: "ЛОТТОР", loading: "Жүктөлүүдө…", emptyLots: "Учурдагы соода сессиясында жеткиликтүү лоттор жок.", loadError: "Лоттор жүктөлгөн жок. Байланышты текшерип, кайра аракет кылыңыз.", retry: "КАЙРА АРАКЕТ", lotId: "LOT ID", product: "ПРОДУКТ", breed: "ПОРОДА", quantity: "САНЫ", weight: "САЛМАГЫ", region: "АЙМАК", contract: "КОНТРАКТ ТҮРҮ", status: "СТАТУС", action: "АРАКЕТ", feed: "ТОЮТ ТҮРҮ", available: "СООДА СЕССИЯСЫ АЧЫК", reserved: "ЛОТ БРОНДОЛГОН", sold: "САТЫЛДЫ", closed: "СООДА ЖАБЫК", propose: "БАА СУНУШУН БЕРҮҮ", unavailable: "Учурдагы статус үчүн аракет жеткиликсиз", moderationLead: "Ири фермердик чарбалар жана адистер жаңы дүң партиялар боюнча маалымат берүү үчүн:", moderation: "МААЛЫМАТТЫ МОДЕРАЦИЯ КЫЗМАТЫНА БЕРҮҮ",
    adminTitle: "ПЛАТФОРМАНЫ БАШКАРУУ", adminIntro: "Лоттор жана уюмдардын кирүүсү", organizations: "КОЛДОНУУЧУЛАР / УЮМДАР", createLot: "ЛОТ ТҮЗҮҮ", save: "САКТОО", cancel: "ЖОККО ЧЫГАРУУ", edit: "ӨЗГӨРТҮҮ", remove: "ӨЧҮРҮҮ", lotNumber: "ЛОТ НОМЕРИ", animalType: "МАЛ ТҮРҮ", select: "ТАНДАҢЫЗ", company: "УЮМ", inn: "ИНН", emailLogin: "EMAIL / LOGIN", role: "РОЛЬ", orgStatus: "СТАТУС", createUser: "КОЛДОНУУЧУ ТҮЗҮҮ", block: "БӨГӨТТӨӨ", unblock: "БӨГӨТТӨН ЧЫГАРУУ", fullName: "АТЫ-ЖӨНҮ", tempPassword: "УБАКТЫЛУУ СЫРСӨЗ", successSaved: "Өзгөртүүлөр сакталды.", confirmDelete: "Бул лотту өчүрөсүзбү? Аракетти кайтаруу мүмкүн эмес.", formError: "Форманын толтурулушун текшериңиз.", selfBlock: "Администратор өз уюмун бөгөттөй албайт.", lastAdmin: "Платформада жок дегенде бир активдүү администратор калышы керек.", duplicateOrganization: "Мындай ИНН менен уюм мурунтан бар.", deleteError: "Лот өчүрүлгөн жок.", userHint: "Убактылуу сырсөздү корголгон канал аркылуу бериңиз. Ал AGROMAL базасында сакталбайт.",
    active: "АКТИВДҮҮ", pending: "КҮТҮҮДӨ", blockedStatus: "БӨГӨТТӨЛГӨН", buyer: "САТЫП АЛУУЧУ", adminRole: "АДМИНИСТРАТОР", cattle: "КРС", sheep: "МРС", horse: "ЖЫЛКЫ", yak: "ТОПАЗ", spot: "SPOT", forwardContract: "FORWARD",
    footerDocs: "Юридикалык документтер даярдалууда", privacy: "КУПУЯЛУУЛУК САЯСАТЫ", rules: "ПЛАТФОРМА ЭРЕЖЕЛЕРИ", offer: "КООМДУК ОФЕРТА", backHome: "БАШКЫ БЕТКЕ", notFound: "БЕТ ТАБЫЛГАН ЖОК", notFoundText: "Суралган дарек жеткиликсиз же жылдырылган."
  },
  en: {
    tickerLot1: "CATTLE · ALA-TOO · 40 HEAD · 17,600 KG · TALAS REGION",
tickerLot2: "CATTLE · SWISS · 24 HEAD · 10,800 KG · CHUY REGION",
tickerLot3: "HORSES · NOVO-KYRGYZ · 18 HEAD · 7,200 KG · ISSYK-KUL",
tickerLot4: "YAK · KYRGYZ YAK · 30 HEAD · 9,000 KG · OSH REGION",
tickerSold: "SOLD",
    tagline: "WHOLESALE LIVESTOCK LOTS · ДҮҢ МАЛ ПАРТИЯЛАРЫ", privateAccess: "PRIVATE ACCESS", logout: "SIGN OUT", admin: "ADMIN",
    heroLabel: "PRIVATE DIGITAL INFORMATION AND TRADING PLATFORM", heroTitle: "Optimizing wholesale procurement and supporting raw-material stability for the food industry.", heroText: "AGROMAL structures engagement between livestock suppliers and industrial buyers in Kyrgyzstan.",
    verified: "MANUAL VERIFICATION", direct: "DIRECT ENGAGEMENT", forward: "SPOT AND FORWARD", ecosystem: "DIGITAL AGRO ECOSYSTEM", ecosystemTitle: "Architecture ready for future integrations",
ecosystemText: "The MVP combines access verification, a private wholesale-lot showcase and manual trading-data management. The platform architecture is prepared for further information exchange with government and industry systems.",
    loginTitle: "TRADING TERMINAL ACCESS", loginSub: "Active verified organizations only", identifier: "ORGANIZATION TIN", identifierPlaceholder: "Enter organization TIN", password: "ACCESS PASSWORD", passwordPlaceholder: "Enter access password", connect: "CONNECT TO TRADING SESSION", connecting: "CONNECTING…", requestLead: "To access the private showcase of current B2B lots and complete organization verification:", requestAccess: "REQUEST ACCESS CREDENTIALS", loginDenied: "Access denied. Check the organization identifier and password.", blocked: "Platform access is blocked. Contact the administrator.", expired: "Your session has ended. Sign in again.", forbidden: "You do not have permission to access this section.", configMissing: "Supabase is not configured. An administrator must complete assets/js/config.js.", required: "Complete all required fields.", invalidInn: "TIN must contain 8 to 14 digits.", passwordShort: "Password must contain at least 8 characters.",
    demoData: "COMPLETED LOTS",
ticker: "TRADE HISTORY · CATTLE / CHUY · SHEEP / NARYN · HORSES / ISSYK-KUL · YAK / HIGHLANDS · NO UNVERIFIED PRICES PUBLISHED",
    dashboardTitle: "TRADING SESSION", dashboardIntro: "Current wholesale lots for verified buyers", lots: "LOTS", loading: "Loading…", emptyLots: "There are no lots in the current trading session.", loadError: "Lots could not be loaded. Check your connection and try again.", retry: "RETRY", lotId: "LOT ID", product: "PRODUCT", breed: "BREED", quantity: "QUANTITY", weight: "WEIGHT", region: "REGION", contract: "CONTRACT TYPE", status: "STATUS", action: "ACTION", feed: "FEED TYPE", available: "TRADING SESSION OPEN", reserved: "LOT RESERVED", sold: "SOLD", closed: "TRADING CLOSED", propose: "SUBMIT PRICE PROPOSAL", unavailable: "Action unavailable for the current status", moderationLead: "For large farms and specialists submitting information about new wholesale lots:", moderation: "SUBMIT DATA TO MODERATION",
    adminTitle: "PLATFORM MANAGEMENT", adminIntro: "Lots and organization access", organizations: "USERS / ORGANIZATIONS", createLot: "CREATE LOT", save: "SAVE", cancel: "CANCEL", edit: "EDIT", remove: "DELETE", lotNumber: "LOT NUMBER", animalType: "ANIMAL TYPE", select: "SELECT", company: "ORGANIZATION", inn: "TIN", emailLogin: "EMAIL / LOGIN", role: "ROLE", orgStatus: "STATUS", createUser: "CREATE USER", block: "BLOCK", unblock: "UNBLOCK", fullName: "FULL NAME", tempPassword: "TEMPORARY PASSWORD", successSaved: "Changes saved.", confirmDelete: "Delete this lot? This action cannot be undone.", formError: "Check the form fields.", selfBlock: "Administrators cannot block their own organization.", lastAdmin: "At least one active platform administrator must remain.", duplicateOrganization: "An organization with this TIN already exists.", deleteError: "The lot could not be deleted.", userHint: "Share the temporary password through a secure channel. It is not stored in the AGROMAL database.",
    active: "ACTIVE", pending: "PENDING", blockedStatus: "BLOCKED", buyer: "BUYER", adminRole: "ADMIN", cattle: "CATTLE", sheep: "SHEEP", horse: "HORSES", yak: "YAK", spot: "SPOT", forwardContract: "FORWARD",
    footerDocs: "Legal documents are in preparation", privacy: "PRIVACY POLICY", rules: "PLATFORM RULES", offer: "PUBLIC OFFER", backHome: "BACK HOME", notFound: "PAGE NOT FOUND", notFoundText: "The requested address is unavailable or has moved."
  }
  
};

const aliases = { kg: "ky", ky: "ky", ru: "ru", en: "en" };
function savedLanguage() {
  try { return localStorage.getItem("agromal_language"); } catch { return null; }
}
let current = aliases[savedLanguage()] || "ru";

export function t(key) { return messages[current]?.[key] ?? messages.ru[key] ?? key; }
export function language() { return current; }

export function applyLanguage(lang = current) {
  current = aliases[lang] || "ru";
  try { localStorage.setItem("agromal_language", current); } catch { /* Preference persistence is optional. */ }
  document.documentElement.lang = current === "ky" ? "ky" : current;
  document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = aliases[button.dataset.lang] === current;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-current", String(active));
  });
  document.dispatchEvent(new CustomEvent("agromal:language", { detail: current }));
}

export function initI18n() {
  document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  applyLanguage(current);
}
