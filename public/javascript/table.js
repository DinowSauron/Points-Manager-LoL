var headerElement = document.querySelector('header');
var mainElement = document.querySelector('main .container');




function addDayColum(day, {total, media}){
    var headElement = document.createElement("span");
    var linkText = document.createTextNode(day);

    var tableElement = document.createElement("div");
    var inpElement = document.createElement("input");

    //add text
    headElement.appendChild(linkText);
    tableElement.setAttribute('class', 'sector');
    tableElement.setAttribute('id', day);
    inpElement.setAttribute("value", "~" + media + " | " + total);
    tableElement.appendChild(inpElement);

    //add to html
    headerElement.appendChild(headElement);
    mainElement.appendChild(tableElement);

}

function addValue({id, tipo, pts, total, media}){
    var tablesElement = document.getElementById(id);
    var sectionElement = document.createElement("section");
    var spanElement = document.createElement("span");
    var sectionText = document.createTextNode(tipo.toUpperCase());
    var spanText = document.createTextNode(" " + pts);
    var inputTable = tablesElement.querySelector('input');


    inputTable.value = "~" + media + " | " + (total + pts);
    spanElement.appendChild(spanText);
    sectionElement.setAttribute('class', tipo);
    sectionElement.appendChild(sectionText);
    sectionElement.appendChild(spanElement);

    tablesElement.appendChild(sectionElement);
}

function removeValue(indexSector, indexValue){
    var tablesElement = document.querySelectorAll("main .container .sector");
    var valueElement = tablesElement[indexSector].querySelectorAll("section");
    valueElement[indexValue].remove();
}




function dateToString(d) {
    return [ d.getDate(), d.getMonth(), d.getFullYear()].map(d => d > 9 ? d : '0' + d).join('-');
}

daySettings = {
    total: 125,
    media: 45
}
var hoje = new Date();
var ano = hoje.getFullYear();
var mes = hoje.getMonth() + 1;
var dia = hoje.getDate();
for (var i = 0; i < 20; i++) {
    var outroDia = new Date(ano, mes, dia + i);
    addDayColum(dateToString(outroDia),daySettings);
    //console.log(dateToString(outroDia));
}

  

var stateObj = {
    id: `${dia + 2}-${mes}-${ano}`,
    tipo: "v",
    pts: 6,
    total: 125,
    media: 45
}
var stateObj2 = {
    id: `${dia + 2}-${mes}-${ano}`,
    tipo: "d",
    pts: 3,
    total: 125,
    media: 45
}
addValue(stateObj);
addValue(stateObj2);
removeValue(0,3);