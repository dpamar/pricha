var languages = ["fr", "en"];

var en = {
    "title": "Perisha Calculator",
    "lastCycleLabel": "Last cycle's start date",
    "newCycleLabel": "New cycle's start date",
    "newCycleButton": "Start a new cycle",
    "startNewCycle": "Start a new cycle ?",
    "noPreviousDateWarning": "Warning: it's not possible to compute one of the dates without the previous cycle date",
    "addReminders": "Add calendar reminders",
    "fromTo": "From XXX to YYY",
    "durationBtn_half": "Half days",
    "durationBtn_full": "Full days (Or Zaruach)",
    "durationLabel": "Calculation mode",
    "exportBtn": "📤 Export data to another device",
    "exportTitle": "Perisha calculator backup",
    "importData": "Do you want to replace your data and use this backup ?"
}

var fr = {
    "title": "Calculateur de Pricha",
    "lastCycleLabel": "Date du dernier cycle:",
    "newCycleLabel": "Date du nouveau cycle:",
    "newCycleButton": "Démarrer un nouveau cycle",
    "startNewCycle": "Démarrer un nouveau cycle ?",
    "noPreviousDateWarning": "Attention: impossible de calculer une des dates sans connaitre le début du cycle précédent",
    "addReminders": "Ajouter rappels calendrier",
    "fromTo": "Du XXX au YYY",
    "durationBtn_half": "Demi-journées",
    "durationBtn_full": "Jours entiers (Or Zaruach)",
    "durationLabel": "Mode de calcul",
    "exportBtn": "📤 Exporter les données vers un autre appareil",
    "exportTitle": "Sauvegarde calculateur de pricha",
    "importData": "Souhaitez-vous remplacer vos données par cette sauvegarde ?"
}

function getLanguageStrings() {
    return eval(getLang());
}

function getStr(stringId) {
    return getLanguageStrings()[stringId];
}

function localize() {
    document.title = getStr("title");
    getElement("title").innerText = getStr("title");
    getElement("lastCycleLabel").innerText = getStr("lastCycleLabel");
    getElement("newCycleLabel").innerText = getStr("newCycleLabel");
    getElement("newCycleButton").innerText = getStr("newCycleButton");

    // Duration label and buttons
    getElement("durationLabel").innerText = getStr("durationLabel");
    getElement("durationBtn_half").innerText = getStr("durationBtn_half");
    getElement("durationBtn_full").innerText = getStr("durationBtn_full");

    getElement("exportBtn").innerText = getStr("exportBtn");

    // Update language buttons
    languages.map(lang => {
        var btn = getElement("langBtn_" + lang);
        btn.className = getLang() == lang ? "lang-btn active" : "lang-btn";
    });
}
