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
function createSignText(address, width, height, x, y, z, rx, ry, rz) {
    const texts = [address, x, y, z, height, width, rx, ry, rz]
    return texts.join("|")
}


// giveコマンドに変換して
// それを return する
function toCommand(signText, version) {

    const maxLength = 15;

    let texts = [];
    for (let i = 0; i < signText.length; i += maxLength)
        texts.push(signText.substr(i, maxLength));


    if (version == "1.20") {
        texts = texts.map(text => `'["${text}"]'`)
        texts = texts.concat(Array(4).fill(`'[""]'`)).slice(0, 4);
        return `/give @p minecraft:oak_sign{BlockEntityTag:{front_text:{messages:[${texts}]}}}`;
    } else {
        texts = texts.map((text, index) => `Text${index}:'["${text}"]'`)
        return `/give @p minecraft:oak_sign{BlockEntityTag:{front_text:{messages:[${texts}]}}}`;
    }
}