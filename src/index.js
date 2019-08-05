// index.scss を読み込む
import './index.scss';
import 'jquery-ui-dist/jquery-ui.css';

const $ = require('jquery');
window.jQuery = $; // for jquery-ui
require('jquery-ui-dist/jquery-ui');

function confirmExPromise(message) {
  var _showConfirmDialog = function(message, okFunction, cancelFunction) {
    // Dialogを破棄する関数
    var _destroyDialog = function(dialogElement) {
      dialogElement.dialog('destroy'); // ※destroyなので、closeイベントは発生しない
      dialogElement.remove(); // ※動的に生成された要素を削除する必要がある
    };

    // Dialog要素(呼び出し毎に、動的に生成)
    var $dialog = $('<div></div>').text(message);

    // prettier-ignore
    // 各ボタンに対応する関数を宣言
    // ※Dialogを破棄後、コールバック関数を実行する
    {
    var _funcOk     = function() { _destroyDialog($dialog); if (okFunction)     { okFunction();     } };
    var _funcCancel = function() { _destroyDialog($dialog); if (cancelFunction) { cancelFunction(); } };
    }

    $dialog.dialog({
      modal: true,
      dialogClass: 'jsc-confirm',

      // 「閉じる」の設定
      closeText: 'Cancel',
      closeOnEscape: true,
      close: _funcCancel,

      // prettier-ignore
      // 各ボタンの設定
      buttons: [
        { text: 'OK',     click: _funcOk },
        { text: 'Cancel', click: function() { $(this).dialog('close'); } } // Dialogのcloseのみ
      ]
    });
  };

  return new Promise(function(resolve, reject) {
    _showConfirmDialog(message, resolve, reject);
  });

}



function approve() {
  alert('OK!');
}

function notApprove() {
  alert('Cancel!');
}


$(() => {
  $('.js-confirm').on('click', function() {
    console.log('test');
    confirmExPromise('Are you ready?')
        .then(approve) // ※OK時の処理
        .catch(notApprove); // ※Cancel時の処理
  })

  $( document ).on( "click", ".ui-widget-overlay", function(){
    $(this).prev().find(".ui-dialog-content").dialog("close");
  });
});