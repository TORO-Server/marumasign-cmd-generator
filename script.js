function gencmd(){
    address = document.getElementById("address").value;
    width = document.getElementById("width").value;
    height = document.getElementById("width").value;
    x = document.getElementById("x").value;
    y = document.getElementById("y").value;
    z = document.getElementById("z").value;
    rx = document.getElementById("rx").value;
    ry = document.getElementById("ry").value;
    rz= document.getElementById("rz").value;
    if (height == 0){
        height = width;
    }
    if (x == 0){
        x = 0;
    }
    if (y == 0){
        y = 0;
    }
    if (z == 0){
        z = 0;
    }
    if (rx == 0){
        rx = 0;
    }
    if (ry == 0){
        ry = 0;
    }
    if (rz == 0){
        rz = 0;
    }
    const text1=address.substr(0,20);
    const text2=address.substr(20,40);
    const text3=address.substr(40,60);
    const text4="|"+x+"|"+y+"|"+z+"|"+width+"|"+height+"|"+rx+"|"+ry+"|"+rz;
    const dec1 = atob("L2dpdmUgQHAgbWluZWNyYWZ0Om9ha19zaWdue0Jsb2NrRW50aXR5VGFnOntUZXh0MToneyJ0ZXh0Ijoi");
    const dec2 = atob("In0nLFRleHQyOid7InRleHQiOiI");
    const dec3 = atob("In0nLFRleHQzOid7InRleHQiOiI");
    const dec4 = atob("In0nLFRleHQ0Oid7InRleHQiOiI");
    const dec5 = atob("In0nfSxkaXNwbGF5OntOYW1lOid7InRleHQiOiJHZW5lcmF0ZWQgU2lnbiJ9J319");
    // [/give @p minecraft:oak_sign{BlockEntityTag:{Text1:'{"text":"]をbase64でエンコード→L2dpdmUgQHAgbWluZWNyYWZ0Om9ha19zaWdue0Jsb2NrRW50aXR5VGFnOntUZXh0MToneyJ0ZXh0Ijoi
    // ["}',Text2:'{"text":"]→In0nLFRleHQyOid7InRleHQiOiI
    // ["}',Text3:'{"text":"]→In0nLFRleHQzOid7InRleHQiOiI
    // ["}',Text4:'{"text":"]→In0nLFRleHQ0Oid7InRleHQiOiI
    // ["}'},display:{Name:'{"text":"Generated Sign"}'}}]→In0nfSxkaXNwbGF5OntOYW1lOid7InRleHQiOiJHZW5lcmF0ZWQgU2lnbiJ9J319
    document.getElementById("generate").innerHTML = `${dec1}${text1}${dec2}${text2}${dec3}${text3}${dec4}${text4}${dec5}`
}