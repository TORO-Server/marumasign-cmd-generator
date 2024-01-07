// Get リクエスト
// json を return する
function get(url) {
    return new Promise((resolve) => {
        fetch(url)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(() => resolve(undefined));
    });
}


// アドレス、大きさ、位置、回転 のデータから
// 看板に書かれる文字を生成して
// それを return する
function createSignText(url, width, height, x, y, z, rx, ry, rz) {
    const texts = [url, x, y, z, height, width, rx, ry, rz]
    return texts.join("|")
}


// giveコマンドに変換して
// それを return する
function toCommand(signText, version) {

    const maxLength = 15;

    let texts = [];
    for (let i = 0; i < signText.length; i += maxLength)
        texts.push(signText.substr(i, maxLength));


    if (version == "1.19") {
        texts = texts.map((text, index) => `Text${index + 1}:'["${text}"]'`)
        return `/give @p minecraft:oak_sign{BlockEntityTag:{${texts}}}`;
        } else {
            texts = texts.map(text => `'["${text}"]'`)
        texts = texts.concat(Array(4).fill(`'[""]'`)).slice(0, 4);
        return `/give @p minecraft:oak_sign{BlockEntityTag:{front_text:{messages:[${texts}]}}}`;
    }
}

async function getShortURL(url) {

    let shorturl = localStorage.getItem(url);

    // ローカルストレージに短縮したURLがキャッシュされていたら
    // それを return する
    if (shorturl) return shorturl

    // https://is.gd/ の URL短縮APIを利用して 短縮URLを生成
    json = await get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
    // 送られてきた json に shorturl があるかどうか チェック

    // shorturl の値を置き換える
    shorturl = json.shorturl

    if (shorturl) {
        //もし あったら

        // ローカルストレージを利用して 短縮したURLをキャッシュ
        localStorage.setItem(url, shorturl);

        // ログを送信
        console.log(`URLを短縮しました: ${url}`);
        return shorturl
    } else {
        //もし なかったら
        //エラーのログを送信
        console.error("URLを短縮できませんでした");
        return url
    }
}