
SetDefaultPoints();
function SetDefaultPoints(){
    let victorys = document.querySelectorAll(".victory-btn input");
    victorys.forEach(victory => {
        victory.value = Number(localStorage.getItem("victory-pts"))
    })
    var defeats = document.querySelectorAll(".defeat-btn input");
    defeats.forEach(defeat => {
        defeat.value = Number(localStorage.getItem("defeat-pts"))
    })
    var consumes = document.querySelectorAll(".consume-btn input");
    consumes.forEach(consume => {
        consume.value = Number(localStorage.getItem("consume-pts"))
    })
    var bonuses = document.querySelectorAll(".bonus-btn input");
    bonuses.forEach(bonuses => {
        bonuses.value = Number(localStorage.getItem("bonus-pts"))
    })

    const d =  new Date();
    var dateElement = document.querySelector("#date-inject input");
    
    dateElement.setAttribute("value", dateToStringUs(d));
    dateElement.setAttribute("min", localStorage.getItem("date-start"));
    dateElement.setAttribute("max", localStorage.getItem("date-end"));

    
}
function dateToStringUs(d) {
    return [ d.getFullYear(), d.getMonth() + 1, d.getDate()].map(d => d > 9 ? d : '0' + d).join('-');
}
function dateToStringBr(d) {
    return [ d.getDate(), d.getMonth() + 1, d.getFullYear()].map(d => d > 9 ? d : '0' + d).join('-');
}

function InjectValue(element, type){
    var idElement = document.querySelector("#date-inject input").value;
    if(!idElement){
        alert("Insira uma data para a injeção")
        return;
    }
    idElement = idElement.split("-");
    idElement = `${idElement[2]}-${idElement[1]}-${idElement[0]}` 
    ChangeTable(element, idElement, type);
}

function ChangeTable(element,id, type){
    var ptns = element.target.parentElement.querySelector("input").value;
    SaveValues(element, type);
    if(type == "b"){
        var tot = Number(localStorage.getItem("bonusTot"));
        localStorage.setItem("bonusTot", Number(ptns) + tot);
    }
    

    if(!id){
        const today =  new Date();
        id = dateToStringBr(today);
    }

    var stateObj = {
        id: id,
        tipo: type,
        pts: ptns,
        total: 1,
        media: 4
    }
    var frameElement = document.getElementById("framespec");

    //pegar uma função do script que está no iframe
    frameElement.contentWindow.addValue(stateObj);

    //dar reload no iframe para recarregar os valores padrões
    frameElement.contentDocument.location.reload(true);

    //dar reload nas informações
    UpdateInfo();
    LateUpdate();
}

var dropped = false;
function FrameButton(){
    var frameElement = document.querySelector("#framespec");
    var buttonElement = document.querySelector(".more-frame");

    dropped = !dropped;
    if(dropped){
        frameElement.style.height = "680px";
        buttonElement.style.transform = "Rotate(180deg)";
    }else{
        frameElement.style.height = "320px";
        buttonElement.style.transform = "Rotate(0deg)";
    }
}

function SaveValues(element, type){
    var ptns = element.target.parentElement.querySelector("input").value;
    if(type == "v")
        localStorage.setItem("victory-pts", ptns)
    if(type == "d")
        localStorage.setItem("defeat-pts", ptns)
    if(type == "c")
        localStorage.setItem("consume-pts", ptns)
    if(type == "b")
        localStorage.setItem("bonus-pts", ptns)

    UpdateInfo();
}