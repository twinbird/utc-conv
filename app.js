// JSTのISO8601形式文字列を返す
const getJSTISO8601 = (d) => {
  const offset = '+09:00'; // JSTのタイムゾーンオフセット

  // Intl.DateTimeFormatを使用して、JSTでの各要素を取得する
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Tokyo',
    fractionalSecondDigits: 3 // ミリ秒の桁数を指定
  });

  const parts = formatter.formatToParts(d);

  // 各要素をISO 8601形式の文字列に整形する
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const second = parts.find(p => p.type === 'second').value;
  const millisecond = parts.find(p => p.type === 'fractionalSecond').value;

  // 最終的なISO 8601文字列を組み立てて返す
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}${offset}`;
};

// 入力初期化処理
const initializeInput = () => {
  const jst8601Input = document.querySelector('#jst-input-iso8601');
  const utc8601Input = document.querySelector('#utc-input-iso8601');

  const d = new Date();
  utc8601Input.value = d.toISOString();
  jst8601Input.value = getJSTISO8601(d);
};

// JST(ISO8601)からUTC(ISO8601)へ変換ボタンをクリックした時
const jstInputISO8601ToUtcInputISO8601 = () => {
  const jst8601Input = document.querySelector('#jst-input-iso8601');
  const utc8601Output = document.querySelector('#utc-output-iso8601');

  try {
    const d = new Date(jst8601Input.value);
    utc8601Output.value = d.toISOString(); 
  } catch (e) {
    alert('ISO8601のJSTの入力に誤りがあります');
  }
};

// UTC(ISO8601)からJST(ISO8601)へ変換ボタンをクリックした時
const utcInputISO8601ToJstOutputISO8601 = () => {
  const utc8601Input = document.querySelector('#utc-input-iso8601');
  const jst8601Output = document.querySelector('#jst-output-iso8601');

  try {
    const d = new Date(utc8601Input.value);
    jst8601Output.value = getJSTISO8601(d);
  } catch (e) {
    alert('ISO8601のUTCの入力に誤りがあります');
  }
};

// ページ読み込み完了時
document.addEventListener("DOMContentLoaded", (event) => {
  // 入力初期化
  initializeInput();

  // JST(ISO8601)からUTC(ISO8601)へ変換ボタンをクリックした時
  document.querySelector('#btn-jst-2-utc-iso8601').addEventListener('click', jstInputISO8601ToUtcInputISO8601);

  // UTC(ISO8601)からJST(ISO8601)へ変換ボタンをクリックした時
  document.querySelector('#btn-utc-2-jst-iso8601').addEventListener('click', utcInputISO8601ToJstOutputISO8601);
});
