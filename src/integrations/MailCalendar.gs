/**
 * Gmail・Googleカレンダー連携モジュール
 */

function getUnreadEmails(maxResults) {
  maxResults = maxResults || 50;
  var threads = GmailApp.search('is:unread', 0, maxResults);
  var emails = [];
  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    var latestMessage = messages[messages.length - 1];
    emails.push({
      id: latestMessage.getId(),
      subject: latestMessage.getSubject(),
      from: latestMessage.getFrom(),
      date: latestMessage.getDate()
    });
  });
  return emails;
}

function logUnreadEmailsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('メール履歴');
  if (!sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.insertSheet('メール履歴');
    sheet.appendRow(['日時', '差出人', '件名', 'メールID']);
  }
  var emails = getUnreadEmails(20);
  emails.forEach(function(email) {
    sheet.appendRow([email.date, email.from, email.subject, email.id]);
  });
}

function getTodayEvents() {
  var calendar = CalendarApp.getDefaultCalendar();
  var today = new Date();
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return calendar.getEvents(today, tomorrow);
}

function logWeekEventsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('カレンダー予定');
  if (!sheet) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.insertSheet('カレンダー予定');
    sheet.appendRow(['開始日時', '終了日時', 'タイトル', '場所']);
  }
  var calendar = CalendarApp.getDefaultCalendar();
  var today = new Date();
  var nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  var events = calendar.getEvents(today, nextWeek);
  events.forEach(function(event) {
    sheet.appendRow([event.getStartTime(), event.getEndTime(), event.getTitle(), event.getLocation()]);
  });
}

function sendDailyScheduleReminder() {
  var events = getTodayEvents();
  if (events.length === 0) return;
  var emailBody = '本日の予定\n\n';
  events.forEach(function(event, index) {
    emailBody += (index + 1) + '. ' + event.getTitle() + '\n';
  });
  var userEmail = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(userEmail, '本日の予定リマインド', emailBody);
}

function setupDailyReminderTrigger() {
  ScriptApp.newTrigger('sendDailyScheduleReminder').timeBased().atHour(7).everyDays(1).create();
}
