async function gencmd() {

    let address = document.getElementById("address").value;

    // もし URLを短縮するかどうか のチェックボックスにチェックが入っているたら
    if (document.getElementById("toShortURL").checked) {
        json = await get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(address)}`);
        if (json.shorturl) {
            address = json.shorturl
            console.log(`URLを短縮しました: ${address}`)
        } else {
            console.error("URLを短縮できませんでした")
        }
    }


    const width = document.getElementById("width").value;
    const height = document.getElementById("width").value;
    const x = document.getElementById("x").value;
    const y = document.getElementById("y").value;
    const z = document.getElementById("z").value;
    const rx = document.getElementById("rx").value;
    const ry = document.getElementById("ry").value;
    const rz = document.getElementById("rz").value;


    const signText = createSignText(address, width, height, x, y, z, rx, ry, rz)

    const command = toCommand(signText);

    document.getElementById(
        "generate"
    ).innerHTML = command;
}


function get(url) {// Get リクエスト
    return new Promise((resolve) => {
        fetch(url)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(() => resolve(undefined));
    });
}

function createSignText(address, width, height, x, y, z, rx, ry, rz) {
    const texts = [address, x, y, z, height, width, rx, ry, rz]
    return texts.join("|")
}

function toCommand(signText) {

    const maxLength = 15;

    let texts = [];
    for (let i = 0; i < signText.length; i += maxLength) {
        texts.push(signText.substr(i, maxLength));
    }

    texts = texts.map(text => `'["${text}"]'`)

    texts = texts.concat(Array(4).fill(`'[""]'`)).slice(0, 4)

    return `/give @p minecraft:oak_sign{BlockEntityTag:{front_text:{messages:[${texts}]}}}`
}