var languages = ["fr", "en"];

var en = {
    "title": "Perisha calculator",
    "lastCycleLabel": "Last cycle's start date",
    "newCycleLabel": "New cycle's start date",
    "newCycleButton": "Start a new cycle",
    "startNewCycle": "Start a new cycle ?",
    "noPreviousDateWarning": "Warning: it's not possible to compute one of the dates without the previous cycle date",
    "addReminders": "Add a calendar reminder for the XXX dates",
    "fromTo": "From XXX to YYY",
    "durationBtn_half": "Half days",
    "durationBtn_full": "Full days (Or Zaruach) for some ashkenazim"
}

var fr = {
    "title": "Calculateur de pricha",
    "lastCycleLabel": "Date du dernier cycle:",
    "newCycleLabel": "Date du nouveau cycle:",
    "newCycleButton": "Démarrer un nouveau cycle",
    "startNewCycle": "Démarrer un nouveau cycle ?",
    "noPreviousDateWarning": "Attention: impossible de calculer une des dates sans connaitre le début du cycle précédent",
    "addReminders": "Ajouter un rappel pour les XXX dates",
    "fromTo": "Du XXX au YYY",
    "durationBtn_half": "Demi-journées",
    "durationBtn_full": "Journées complètes (Or Zaruach) pour certains ashkenazes"
}

function getLanguage() {
    var defaultLanguage = "fr";
    if(cookieData.lang == null) { return defaultLanguage; }
    if(languages.indexOf(cookieData.lang) == -1) { return defaultLanguage; }
    return cookieData.lang;
}

function getLanguageStrings() {
    return eval(getLanguage());
}

function getStr(stringId) {
    return getLanguageStrings()[stringId];
}

function localize() {
    document.title = getStr("title");
    getElement("lastCycleLabel").innerText = getStr("lastCycleLabel");
    getElement("newCycleLabel").innerText = getStr("newCycleLabel");
    getElement("newCycleButton").value = getStr("newCycleButton");

    getElement("durationBtn_half").innerText = getStr("durationBtn_half");
    getElement("durationBtn_full").innerText = getStr("durationBtn_full");

    languages.map(lang => getElement("langBtn_" + lang).style.fontStyle = getLanguage() == lang ? "italic" : "normal");
}

function setLang(lang) {
    cookieData.lang = lang;
    writeCookie();
    localize();
}
