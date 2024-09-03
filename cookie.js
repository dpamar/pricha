var cookieProperties = ["last", "lang", "orZaruach", "history"];
var cookieData = {last: null, lang: "fr", orZaruach: 0, "history": []};

var HISTORY_LIMIT = 36;

function setCookieLastDate(date) {
    cookieData.last = date.getTime();
    cookieData.history.push(date.getTime());
    if(cookieData.history.length > HISTORY_LIMIT) cookieData.history.shift();
    writeCookie();
}

function writeCookie() {
    var data = '{' + cookieProperties.map(prop => format(prop)).join(", ") + '}';
    document.cookie = "cookie=" + data + "; expires=Sat, Feb 01 2200 12:00:00 UTC; path=/";
}

function format(propertyName) {
    var prefix = '"' + propertyName + '": ';
    if(propertyName == "history") {
        return prefix + "[" + cookieData.history.join(',') + "]";
    }
    return prefix + '"' + cookieData[propertyName] + '"';
}

function readCookie() {
    var cookie = null;
    var cookieValue = document.cookie.split("; ").filter(x=>x.startsWith("cookie="))[0];
    if(cookieValue != null) eval(cookieValue);
    if(cookie != null) cookieProperties.map(prop => cookie[prop] != null && (cookieData[prop] = cookie[prop]));
    reloadSettingsButtons();
}

function reloadSettingsButtons() {
    getElement("durationBtn_half").style.fontStyle = cookieData.orZaruach == 0 ? "italic" : "normal";
    getElement("durationBtn_full").style.fontStyle = cookieData.orZaruach == 1 ? "italic" : "normal";
}

function getDateFromCookie() {
    if(cookieData.last == null) return null;
    var lastDate = new Date(+cookieData.last);
    return lastDate;
}
