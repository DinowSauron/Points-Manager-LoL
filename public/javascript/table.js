var headerElement = document.querySelector('header');
var mainElement = document.querySelector('main .container');
localStorage.setItem("emblems-actual", Number(localStorage.getItem("emblems-start")) + (Number(localStorage.getItem("bonusTot"))));

var victorysStatus = 0
var defeatsStatus = 0
var vicPtsStatus = 0
var defPtsStatus = 0
var playedStatus = 0;


function addDayColum(day, valuesObj){
    var headElement = document.createElement("span");
    var linkText = document.createTextNode(day);

    var tableElement = document.createElement("div");
    var inpElement = document.createElement("input");

    //add text
    headElement.appendChild(linkText);
    tableElement.setAttribute('class', 'sector');
    tableElement.setAttribute('id', day);
    dayUs = Number(day.split("-")[2] + day.split("-")[1] + day.split("-")[0])
        if(dayUs <= GetTodayUs().split("-").join(""))
    inpElement.setAttribute("class", "lower")
    inpElement.setAttribute("readonly","true")
    inpElement.setAttribute("value", "~" + valuesObj.media);
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

function getStatus(){
    return {
        victory: victorysStatus,
        defeat: defeatsStatus,
        vicPt: vicPtsStatus,
        defPt: defPtsStatus,
        playered: playedStatus
    }
}
function CountStatus(tipo, pts){
    if(tipo == "v"){
        playedStatus += 1;
        victorysStatus += 1;
        vicPtsStatus += Number(pts);
    }
    if(tipo == "d"){
        playedStatus += 1;
        defeatsStatus += 1;
        defPtsStatus += Number(pts);
    }
}

function addValue({id, tipo, pts}){
    //id = "20-10-2020"
    var tableElement = document.getElementById(id);
    var sectionElement = document.createElement("section");
    var spanElement = document.createElement("span");
    var sectionText = document.createTextNode(tipo.toUpperCase());
    var spanText = document.createTextNode(" " + pts);
    spanElement.appendChild(spanText);
    var imgElement = document.createElement("img");

    var valuesTable = tableElement.querySelectorAll('section');

    //pega os pontos totais do dia
    var totalPoints = 0;
    valuesTable.forEach(value => {
        totalPoints += Number(value.querySelector("span").innerHTML)
    })
    var inputTable = tableElement.querySelector('input');



    // localStorage.removeItem(id + '-val');
    if(localStorage.getItem(id + "-val")){
        var valuesSave = {value: JSON.parse(localStorage.getItem(id + "-val"))};
    }else{
        var valuesSave = {value: []}
    }

    valuesSave.value.push({
        type: tipo,
        pt: pts
    });



    if(tipo != "b"){ //insert Normals
        totalPoints += Number(pts);
        var media = CalculateMedia(id);
        inputTable.value = "~" + media + " | " + (totalPoints);
        stateDay = totalPoints < media ? "lower" : "highter";
        inputTable.setAttribute("class", stateDay)
    }else{
        pts = 0;
    }

    localStorage.setItem(id + "-val", JSON.stringify(valuesSave.value));
    localStorage.setItem("emblems-actual", GetEmblems() + Number(pts));
    
    CountStatus(tipo, pts);

    imgElement.setAttribute("src", "./public/pictures/cross.png")
    imgElement.setAttribute("class", "delete-value")
    imgElement.setAttribute("onclick", `removeValue("${id}", ${(valuesSave.value.length - 1)})`)
    sectionElement.setAttribute('class', tipo);
    sectionElement.appendChild(imgElement);

    sectionElement.appendChild(sectionText);
    sectionElement.appendChild(spanElement);

    tableElement.appendChild(sectionElement);
}

function removeValue(id, indexValue){
    var valuesSave = {value: JSON.parse(localStorage.getItem(id + "-val"))};
    console.log()
    if(valuesSave.value[indexValue].type == "b"){ //remover o bonus
        var tot = Number(localStorage.getItem("bonusTot"))
        localStorage.setItem("bonusTot", tot - Number(valuesSave.value[indexValue].pt))
        console.log(localStorage.getItem("bonusTot"))
    }

    valuesSave.value.splice(indexValue, 1);
    localStorage.setItem(id + '-val', JSON.stringify(valuesSave.value));
    document.location.reload();
}




function GetEmblems(){
    return Number(localStorage.getItem("emblems-actual"));
}
function CalculateMedia(id){
    var days = Number(localStorage.getItem("date-duration"));
    var startDay = new Date(localStorage.getItem("date-start"));
    var today = new Date(id.split("-")[2] + "-" + (id.split("-")[1]) + "-" + id.split("-")[0]);

    lapsedDays = parseInt((today.getTime() - startDay.getTime()) / (1000 * 3600 * 24)) + 1;
    // console.log(lapsedDays); 
    return parseInt((Number(localStorage.getItem("emblems-objective")) -
    (Number(localStorage.getItem("emblems-actual")))) / (days - lapsedDays))
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
    
    var lapsedCount = 0;
    for (var i = 0; i <= days; i++) {
        var otherDay = new Date(ano, mes - 1, dia + i);
        var thisDay = new Date();

        lapsedDays = parseInt((otherDay.getTime() - thisDay.getTime()) / (1000 * 3600 * 24))
        lapsedCount = lapsedDays <= 0 ? lapsedCount += 1 : lapsedCount;

        // console.log(otherDay)
        daySettings = {
            total: 0,
            media: parseInt((Number(localStorage.getItem("emblems-objective")) - Number(localStorage.getItem("emblems-actual"))) / (days - lapsedCount)),
            values: JSON.parse(localStorage.getItem(dateToString(otherDay) + "-val"))
        }
        addDayColum(dateToString(otherDay),daySettings);
        // localStorage.removeItem(dateToString(outroDia) + '-val');
    }
    localStorage.setItem("emblems-actual", Number(localStorage.getItem("emblems-actual")) - (Number(localStorage.getItem("bonusTot"))));

    function dateToString(d) {
        return [ d.getDate(), d.getMonth() + 1, d.getFullYear()].map(d => d > 9 ? d : '0' + d).join('-');
    }

    

    // localStorage.removeItem('21-10-2020' + '-val');
    // removeValue(0,3);
}

var name = localStorage.getItem("user-name") || '';
if(name)
    GenerateTable();
