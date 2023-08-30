// すべてのリクエストパラメーター取得
const urlParams = new URLSearchParams(window.location.search);

// "v"という名前のリクエストパラメーター取得
const version = urlParams.get("v")

async function gencmd() {

    // HTMLから 画像アドレス を取得
    let address = document.getElementById("address").value;

    // もし URLを短縮するかどうか のチェックボックスにチェックが入っているたら
    if (document.getElementById("toShortURL").checked) {
        // https://is.gd/ の URL短縮APIを利用して 短縮URLを生成
        json = await get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(address)}`);
        // 送られてきた json に shorturl があるかどうか チェック
        if (json.shorturl) {
            //もし あったら
            //address を 短縮URLに置き換える
            address = json.shorturl
            // ログを送信
            console.log(`URLを短縮しました: ${address}`)
        } else {
            //もし なかったら
            //エラーのログを送信
            console.error("URLを短縮できませんでした")
        }
    }


    //---------- HTMLから値を取得 ---------- start
    const width = document.getElementById("width").value;
    const height = document.getElementById("width").value;
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
    const command = toCommand(signText);

    // HTMLに 生成した give コマンドを表示
    document.getElementById("generate").innerHTML = command;
}