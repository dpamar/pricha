var lastDateSelector = null;
var dateSelector = null;
var testMode = false;

function startNewCycleFromButton() {
    if(!showMessage("startNewCycle", 1)) {
        return;
    }
    var lastCycleDate = new Date(lastDateSelector.value);
    var newCycleDate = new Date(dateSelector.value);
    startNewCycle(newCycleDate, lastCycleDate);
}

function startNewCycle(newCycleDate, lastCycleDate) {
    var dateRanges = computeDates(newCycleDate, lastCycleDate);
    setCalendarReminders(dateRanges);
    setLastDate(newCycleDate);
}

function computeDates(newDate, lastDate) {
    var result = [];

    var newHebrewDate = getHebrewDate(newDate);
    var lastHebrewDate = isDateValid(lastDate) ? getHebrewDate(lastDate) : null;

    result.push(computeDate30(newHebrewDate));
    result.push(computeDateFromMonth(newHebrewDate));
    result.push(computeDateFromLast(newHebrewDate, lastHebrewDate));
    result = filterDates(result);

    var newCycleDuringDay = isDay(newDate);
  
    return getDateRanges(result, newCycleDuringDay);
}

function getHebrewDate(date) {
    var hebrewDate = Hebcal.HDate(date);
    if (hebrewDate.getZemanim().shkiah < date) hebrewDate = hebrewDate.next();
    return hebrewDate;
}

function isDateValid(date) {
    return date != null && date != "Invalid Date";
}

function computeDate30(hebrewDate) {
    return addDaysToHebrewDate(hebrewDate, 30);
}

function addDaysToHebrewDate(date, nbDays) {
    var result = Hebcal.HDate(date.greg());
    for(i = 0; i<nbDays; i++) result = result.next();
    return result;
}

function computeDateFromMonth(hebrewDate) {
    var daysInMonth = hebrewDate.getMonthObject().length;
    var newDate = addDaysToHebrewDate(hebrewDate, daysInMonth);
    if(newDate.getDate() != hebrewDate.getDate()) return null;
    return newDate;
}

function computeDateFromLast(newHebrewDate, lastHebrewDate) {
    if(lastHebrewDate == null) {
      showMessage("noPreviousDateWarning", 0);
      return null;
    }
    var nbDaysBetween = getDaysBetweenHebrewDates(lastHebrewDate, newHebrewDate);
    return addDaysToHebrewDate(newHebrewDate, nbDaysBetween);
}

function getDaysBetweenHebrewDates(fromDate, toDate) {
    return Math.round((toDate.greg() - fromDate.greg())/864E5);
}

function filterDates(hebrewDates) {
    var result = hebrewDates
        .filter(x => x != null)
        .map(x => x.getZemanim().chatzot.getTime());
    result = result
        .filter((x,i) => result.indexOf(x) == i)
        .map(x => new Date(x))
        .map(getHebrewDate);
    return result;
}

function isDay(gregorianDate) {
    var hebDate = Hebcal.HDate(gregorianDate);
    if (hebDate.getZemanim().shkiah < gregorianDate) return false;
    return hebDate.getZemanim().alot_hashachar <= gregorianDate;
}

function getDateRanges(hebrewDates, useDayPeriod) {
    return hebrewDates.map(x => getDateRange(x, useDayPeriod));
}

function getDateRange(hebrewDate, useDayPeriod) {
    var orZaruach = isOrZaruach();
    if (useDayPeriod) {
        if(orZaruach) {
            return [hebrewDate.prev().getZemanim().shkiah, hebrewDate.getZemanim().shkiah];
        } else {
            return [hebrewDate.getZemanim().alot_hashachar, hebrewDate.getZemanim().shkiah];
        }
    } else {
        if(orZaruach) {
            return [hebrewDate.prev().getZemanim().alot_hashachar, hebrewDate.getZemanim().alot_hashachar];
        } else {
            return [hebrewDate.prev().getZemanim().shkiah, hebrewDate.getZemanim().alot_hashachar];
        }
    }
}

function setCalendarReminders(dateRanges) {
    var data = ['BEGIN:VCALENDAR','VERSION:2.0'];
    
    dateRanges.map(x => {
      var startTime = x[0];
      var endTime = x[1];
      data.push('BEGIN:VEVENT');
      data.push('URL:' + getExportUrl());
      data.push('DTSTART:' + startTime.toISOString().replace(/-|:|\.\d+/g, ''));
      data.push('DTEND:' + endTime.toISOString().replace(/-|:|\.\d+/g, ''));
      data.push('SUMMARY:Pricha');
      data.push('DESCRIPTION:');
      data.push('END:VEVENT');
    });

    data.push('END:VCALENDAR');

    var href = encodeURI('data:text/calendar;charset=utf8,' + data.join('\n'));

    getElement("new-cal").innerHTML = 
        '<a target="_blank" href="' + href + '">' + getStr("addReminders").replace("XXX", dateRanges.length) + '</a>' + 
        '<ul>' +
        dateRanges.map(x => '<li>' + getStr("fromTo").replace("XXX", x[0].toLocaleString()).replace("YYY", x[1].toLocaleString()) + '</li>').join('') +
        '<ul>';
}

function getElement(id) {
    return document.getElementById(id);
}

function setCalendarValue(cal, date) {
    if(!isDateValid(date)) return;
    cal.value = date2Text(date);
}

function pad2(value) {
    return ("00" + value).substr(-2);
}

function date2Text(date) {
    return date.getFullYear() + "-" + 
        pad2(date.getMonth() + 1) + "-" +
        pad2(date.getDate()) + "T" + 
        pad2(date.getHours()) + ":" + 
        pad2(date.getMinutes()) + ":" + 
        pad2(date.getSeconds());
}

function showMessage(strId, useConfirm) {
    if(testMode) return true;
    if(useConfirm) return confirm(getStr(strId));
    alert(getStr(strId));
}

function enableTestMode() {
    testMode = true;
}

function reloadSettingsButtons() {
    getElement("durationBtn_half").style.fontStyle = isOrZaruach() ? "normal" : "italic";
    getElement("durationBtn_full").style.fontStyle = isOrZaruach() ? "italic" : "normal";
}
