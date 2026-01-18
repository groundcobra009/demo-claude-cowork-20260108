/**
 * Google Apps Script メインコード
 *
 * プロジェクトのメインロジックを実装してください
 */

// ========================================
// 🎯 メイン処理
/**
 * Google Apps Script メインコード
 * メール・カレンダー連携機能を提供
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('メール・カレンダー連携')
    .addItem('未読メールを記録', 'logUnreadEmailsToSheet')
    .addItem('今週の予定を記録', 'logWeekEventsToSheet')
    .addSeparator()
    .addItem('今日の予定をメール送信', 'sendDailyScheduleReminder')
    .addSeparator()
    .addSubMenu(ui.createMenu('トリガー設定')
      .addItem('毎朝リマインド設定', 'setupDailyReminderTrigger'))
    .addToUi();
}

function onFormSubmit(e) {
  Logger.log('フォームが送信されました');
}

function getCurrentDateTime() {
  return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
}

function showSpreadsheetInfo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.alert('スプレッドシート情報', 'ID: ' + ss.getId(), ui.ButtonSet.OK);
}// ========================================

/**
 * スプレッドシート起動時にカスタムメニューを追加
 */
function onOpen() {
  // カスタムメニューの実装をここに追加
}

/**
 * フォーム送信時に自動実行される関数
 * トリガーによって呼び出される
 */
function onFormSubmit(e) {
  // フォーム送信時の処理をここに追加
}

// ========================================
// その他の関数
// ========================================

