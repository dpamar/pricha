function exportData() {
    var sharedData = {};
    sharedData["title"] = getStr("exportTitle");
    sharedData["url"] = getExportUrl();
    navigator.share(sharedData);
};

function getExportUrl() {
    return this.location.href.replace(/#.*/,'')
        + "?backupData="
        + btoa(getCookieAsText());
}
