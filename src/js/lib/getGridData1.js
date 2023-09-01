function getGridData(n) {
    var data = [];
    for (var i=0;i<n;i++) {
        var num = i.toString();
        data.push({id:i,aa:"aa"+num,bb:"bb"+num,cc:"cc"+num,dd:"dd"+num,ee:"ee"+num,ff:"ff"+num,gg:"gg"+num,
                   hh:"hh"+num,ii:"ii"+num,jj:"jj"+num,kk:"kk"+num,ll:"ll"+num,mm:"mm"+num,nn:"nn"+num});
    }
    return data;
}