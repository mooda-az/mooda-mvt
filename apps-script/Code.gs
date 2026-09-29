// Google Sheets qəbuledicisi. Cədvəldə Extensions → Apps Script, bu kodu yapışdırın,
// Project Settings → Script properties-də SECRET əlavə edin (SHEETS_WEBHOOK_SECRET ilə eyni),
// Deploy → New deployment → Web app, "Execute as: Me", "Who has access: Anyone".
// "orders" və "events" vərəqləri yoxdursa, ilk sətirdə başlıqla yaradılır.

function doPost(e) {
  var body = JSON.parse(e.postData.contents);
  var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || body.secret !== secret) return json({ ok: false, error: "forbidden" });
  if (body.sheet !== "orders" && body.sheet !== "events") return json({ ok: false, error: "sheet" });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(body.sheet) || book.insertSheet(body.sheet);
    var keys = Object.keys(body.row);
    if (sheet.getLastRow() === 0) sheet.appendRow(keys);
    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    keys.forEach(function (k) {
      if (header.indexOf(k) === -1) {
        header.push(k);
        sheet.getRange(1, header.length).setValue(k);
      }
    });
    sheet.appendRow(header.map(function (k) { return body.row[k] === undefined ? "" : body.row[k]; }));
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
