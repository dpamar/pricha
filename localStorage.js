var LANG = "lang";
var MODE = "orZaruach";
var LAST = "last";

function getLastDate() {
    var time = localStorage.getItem(LAST);
    return time && new Date(+time);
}

function setLastDate(date) {
    localStorage.setItem(LAST, date.getTime());
}

function getLang() {
    return localStorage.getItem(LANG) || 'fr';
}

function setLang(value) {
    localStorage.setItem(LANG, value);
    localize();
}

function isOrZaruach() {
    return localStorage.getItem(MODE) == 1;
}

function setOrZaruach(value) {
    localStorage.setItem(MODE, value ? 1 : 0)
    reloadSettingsButtons();
}

function getConfiguration() {
    var result = {};
    result[LAST] = getLastDate() && getLastDate().getTime();
    result[LANG] = getLang();
    result[MODE] = isOrZaruach() ? 1 : 0;
    return result;
}

function importConfiguration() {
    [url, configData] = extractBackupData();
    if(configData == null) return;
    var config = JSON.parse(atob(configData));
    setLastDate(config[LAST] ? new Date(+config[LAST]) : getLastDate());
    setLang(config[LANG] || getLang());
    setOrZaruach(+config[MODE] || isOrZaruach());
    window.location.href = url;
}

