var en = {
    "title": "Perisha calculator",
    "lastCycleLabel": "Last cycle's start date",
    "newCycleLabel": "New cycle's start date",
    "newCycleButton": "Start a new cycle",
    "startNewCycle": "Start a new cycle ?",
    "noPreviousDateWarning": "Warning: it's not possible to compute one of the dates without the previous cycle date",
    "addReminders": "Add a calendar reminder for the XXX dates",
    "fromTo": "From XXX to YYY"
}

var fr = {
    "title": "Calculateur de pricha",
    "lastCycleLabel": "Date du dernier cycle:",
    "newCycleLabel": "Date du nouveau cycle:",
    "newCycleButton": "Démarrer un nouveau cycle",
    "startNewCycle": "Démarrer un nouveau cycle ?",
    "noPreviousDateWarning": "Attention: impossible de calculer une des dates sans connaitre le début du cycle précédent",
    "addReminders": "Ajouter un rappel pour les XXX dates",
    "fromTo": "Du XXX au YYY"
}

function getStr(stringId) {
    var strings = eval(cookieData.lang) || fr;
    return strings[stringId];
}

function localize() {
    document.title = getStr("title");
    getElement("lastCycleLabel").innerText = getStr("lastCycleLabel");
    getElement("newCycleLabel").innerText = getStr("newCycleLabel");
    getElement("newCycleButton").value = getStr("newCycleButton");
}

function setLang(lang) {
    cookieData.lang = lang;
    writeCookie();
    localize();
}
