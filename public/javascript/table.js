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

function addValue({id, tipo, pts}){
    //id = "20-10-2020"
    var tableElement = document.getElementById(id);
    var sectionElement = document.createElement("section");
    var spanElement = document.createElement("span");
    var sectionText = document.createTextNode(tipo.toUpperCase());
    var spanText = document.createTextNode(" " + pts);
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
    // console.log(valuesTable.length)
    valuesSave.value.push({
        type: tipo,
        pt: pts
    });
    localStorage.setItem(id + "-val", JSON.stringify(valuesSave.value));
    // console.log(localStorage.getItem(id + "-val"))
    

    
    localStorage.setItem("emblems-actual", GetEmblems() + Number(pts));
    totalPoints += Number(pts);
    var media = CalculateMedia(id);

    inputTable.value = "~" + media + " | " + (totalPoints);
    spanElement.appendChild(spanText);
    imgElement.setAttribute("src", "./public/pictures/cross.png")
    imgElement.setAttribute("class", "delete-value")
    imgElement.setAttribute("onclick", `removeValue("${id}", ${(valuesSave.value.length - 1)})`)
    sectionElement.setAttribute('class', tipo);
    sectionElement.appendChild(imgElement);

    stateDay = totalPoints < media ? "lower" : "highter";
    inputTable.setAttribute("class", stateDay)
    sectionElement.appendChild(sectionText);
    sectionElement.appendChild(spanElement);

    tableElement.appendChild(sectionElement);
}

function removeValue(id, indexValue){
    var valuesSave = {value: JSON.parse(localStorage.getItem(id + "-val"))};
    valuesSave.value.splice(indexValue, 1);
    localStorage.setItem(id + '-val', JSON.stringify(valuesSave.value));
    document.location.reload(true);
}




function GetEmblems(){
    return Number(localStorage.getItem("emblems-actual"));
}
function CalculateMedia(id){
    var days = Number(localStorage.getItem("date-duration"));
    var startDay = new Date(localStorage.getItem("date-start"));
    var today = new Date(id.split("-")[2] + "-" + (id.split("-")[1]) + "-" + id.split("-")[0]);

    lapsedDays = parseInt((today.getTime() - startDay.getTime()) / (1000 * 3600 * 24)) + 1
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
    for (var i = 0; i < days; i++) {
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
    function dateToString(d) {
        return [ d.getDate(), d.getMonth() + 1, d.getFullYear()].map(d => d > 9 ? d : '0' + d).join('-');
    }

    

    // localStorage.removeItem('21-10-2020' + '-val');
    // removeValue(0,3);
}

var name = localStorage.getItem("user-name") || '';
if(name)
    GenerateTable();
