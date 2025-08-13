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

// JSTのDATETIME形式文字列を返す
const getJSTDateTime = (d) => {
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Tokyo',
    hour12: false
  });

  const parts = formatter.formatToParts(d);
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const second = parts.find(p => p.type === 'second').value;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// UTCのDATETIME形式文字列を返す
const getUTCDateTime = (d) => {
  return d.toISOString().slice(0, 19).replace('T', ' ');
};

// 入力初期化処理
const initializeInput = () => {
  const d = new Date();

  // ISO8601
  const jst8601Input = document.querySelector('#jst-input-iso8601');
  const utc8601Input = document.querySelector('#utc-input-iso8601');
  utc8601Input.value = d.toISOString();
  jst8601Input.value = getJSTISO8601(d);

  // DATETIME
  const jstDateTimeInput = document.querySelector('#jst-input-datetime');
  const utcDateTimeInput = document.querySelector('#utc-input-datetime');
  jstDateTimeInput.value = getJSTDateTime(d);
  utcDateTimeInput.value = getUTCDateTime(d);
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

// JST(DATETIME)からUTC(DATETIME)へ変換ボタンをクリックした時
const jstInputDateTimeToUtcOutputDateTime = () => {
  const jstDateTimeInput = document.querySelector('#jst-input-datetime');
  const utcDateTimeOutput = document.querySelector('#utc-output-datetime');

  try {
    // NOTE: `YYYY-MM-DD HH:MM:SS`という形式はそのままDateコンストラクタに入れると環境によってUTCと解釈されたり、ローカルタイムと解釈されたりする
    //       挙動を安定させるため、JSTであることを明示するために`+09:00`を付与する
    const d = new Date(jstDateTimeInput.value + '+09:00');
    utcDateTimeOutput.value = getUTCDateTime(d);
  } catch (e) {
    alert('DATETIMEのJSTの入力に誤りがあります');
  }
};

// UTC(DATETIME)からJST(DATETIME)へ変換ボタンをクリックした時
const utcInputDateTimeToJstOutputDateTime = () => {
  const utcDateTimeInput = document.querySelector('#utc-input-datetime');
  const jstDateTimeOutput = document.querySelector('#jst-output-datetime');

  try {
    // NOTE: `YYYY-MM-DD HH:MM:SS`という形式はそのままDateコンストラクタに入れると環境によってUTCと解釈されたり、ローカルタイムと解釈されたりする
    //       挙動を安定させるため、UTCであることを明示するために`Z`を付与する
    const d = new Date(utcDateTimeInput.value + 'Z');
    jstDateTimeOutput.value = getJSTDateTime(d);
  } catch (e) {
    alert('DATETIMEのUTCの入力に誤りがあります');
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

  // JST(DATETIME)からUTC(DATETIME)へ変換ボタンをクリックした時
  document.querySelector('#btn-jst-2-utc-datetime').addEventListener('click', jstInputDateTimeToUtcOutputDateTime);

  // UTC(DATETIME)からJST(DATETIME)へ変換ボタンをクリックした時
  document.querySelector('#btn-utc-2-jst-datetime').addEventListener('click', utcInputDateTimeToJstOutputDateTime);
});