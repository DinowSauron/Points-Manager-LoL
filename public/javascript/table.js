var headerElement = document.querySelector('header');
var mainElement = document.querySelector('main .container');
localStorage.setItem("emblems-actual", Number(localStorage.getItem("emblems-start")));



function addDayColum(day, valuesObj){
    var headElement = document.createElement("span");
    var linkText = document.createTextNode(day);

    var tableElement = document.createElement("div");
    var inpElement = document.createElement("input");

    //add text
    headElement.appendChild(linkText);
    tableElement.setAttribute('class', 'sector');
    tableElement.setAttribute('id', day);
    inpElement.setAttribute("value", "~" + valuesObj.media + " | " + valuesObj.total);
    tableElement.appendChild(inpElement);

    //add to html
    headerElement.appendChild(headElement);
    mainElement.appendChild(tableElement);

    
    localStorage.removeItem(day + '-val');
    if(valuesObj.values)
    valuesObj.values.forEach(obj => {
        
        value = {
            id: day,
            tipo: obj.type,
            pts: obj.pt
        }
        addValue(value);
    })
}

function addValue({id, tipo, pts}){
    var tablesElement = document.getElementById(id);
    var sectionElement = document.createElement("section");
    var spanElement = document.createElement("span");
    var sectionText = document.createTextNode(tipo.toUpperCase());
    var spanText = document.createTextNode(" " + pts);

    var valuesTable = tablesElement.querySelectorAll('section');

    //pega os pontos totais do dia
    var totalPoints = 0;
    valuesTable.forEach(value => {
        totalPoints += Number(value.querySelector("span").innerHTML)
    })
    var inputTable = tablesElement.querySelector('input');




    // localStorage.removeItem(id + '-val');
    if(localStorage.getItem(id + "-val")){
        var valuesSave = {value: JSON.parse(localStorage.getItem(id + "-val"))};
    }else{
        var valuesSave = {value: []}
    }
    // console.log(valuesTable.length)
    valuesSave.value.push({
        type: tipo,
        pt: pts
    });
    localStorage.setItem(id + "-val", JSON.stringify(valuesSave.value));
    // console.log(localStorage.getItem(id + "-val"))
    

    localStorage.setItem("emblems-start", 500);
    // localStorage.setItem("emblems-actual", 500);
    // console.log(GetEmblems() + Number(pts))
    localStorage.setItem("emblems-actual", GetEmblems() + Number(pts));
    var media = CalculateMedia();

    inputTable.value = "~" + media + " | " + (totalPoints + Number(pts));
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




function GetEmblems(){
    return Number(localStorage.getItem("emblems-actual"));
}
function CalculateMedia(){
    var days = Number(localStorage.getItem("date-duration"));
    return parseInt((Number(localStorage.getItem("emblems-objective")) - 
    (Number(localStorage.getItem("emblems-actual")))) / days)
}
function GetTodayBr(){
    const today =  new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}
function GetTodayUs(){
    const today =  new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
}

function GenerateTable(){
    var hoje = localStorage.getItem("date-start").split("-")
    var ano = Number(hoje[0])
    var mes = Number(hoje[1])
    var dia = Number(hoje[2])
    var days = Number(localStorage.getItem("date-duration"))


    // console.log(daySettings.media);
    for (var i = 0; i < days; i++) {
        var outroDia = new Date(ano, mes, dia + i);
        
        daySettings = {
            total: 0,
            media: parseInt((Number(localStorage.getItem("emblems-objective")) - Number(localStorage.getItem("emblems-actual"))) / days),
            values: JSON.parse(localStorage.getItem(dateToString(outroDia) + "-val"))
        }
        addDayColum(dateToString(outroDia),daySettings);
        // localStorage.removeItem(dateToString(outroDia) + '-val');
    }
    function dateToString(d) {
        return [ d.getDate(), d.getMonth(), d.getFullYear()].map(d => d > 9 ? d : '0' + d).join('-');
    }

    

    //  addValue(stateObj);
    //  addValue(stateObj);
    //  addValue(stateObj);
    //  addValue(stateObj2);
    //  addValue(stateObj2);
    // localStorage.removeItem('21-10-2020' + '-val');
    // removeValue(0,3);
}



GenerateTable();
