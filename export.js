function exportData() {
    var sharedData = {};
    sharedData["title"] = getStr("exportTitle");
    sharedData["url"] = getExportUrl();
    navigator.share(sharedData);
}

function getExportUrl() {
    return this.location.href.replace(/#.*/,'')
        + "?backupData="
        + getBackupData();
}

function getBackupData() {
    var conf = getConfiguration();
    var data = JSON.stringify(conf);
    return btoa(data);
}

function extractBackupData() {
    return this.location.href.split("?backupData=");
}
