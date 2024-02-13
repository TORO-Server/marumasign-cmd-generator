// すべてのリクエストパラメーター取得
const urlParams = new URLSearchParams(window.location.search);

// "v"という名前のリクエストパラメーター取得
const version = urlParams.get("v")

async function gencmd() {

    // HTMLから 画像アドレス を取得
    let address = document.getElementById("address").value;

    // もし URLを短縮するかどうか のチェックボックスにチェックが入っているたら
    if (document.getElementById("toShortURL").checked) {
        // 短縮URL を取得して address に代入する
        address = await getShortURL(address);
    }

    //---------- HTMLから値を取得 ---------- start
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const x = document.getElementById("x").value;
    const y = document.getElementById("y").value;
    const z = document.getElementById("z").value;
    const rx = document.getElementById("rx").value;
    const ry = document.getElementById("ry").value;
    const rz = document.getElementById("rz").value;
    //---------- HTMLから値を取得 ---------- end


    // 看板に書かれる文字を生成して "signText" に代入
    const signText = createSignText(address, width, height, x, y, z, rx, ry, rz)

    // giveコマンドを生成
    const command = toCommand(signText, version);

    // HTMLに 生成した give コマンドを表示
    document.getElementById("generate").value = command;

    //自動コピー
    if (document.getElementById("autocopy").checked) {
        navigator.clipboard.writeText(command);
    }
}

// html の body が読み込まれたら実行される関数
function load() {
    if (version == "1.19") {
        document.getElementById("ver").insertAdjacentHTML('beforeend', '<p>1.19までモード</p>');
    }
}