
function UpdateInfo(){
    setTimeout(LateUpdate, 500);
    var inicio = {
        startEmblems: document.querySelector("#pt-start input"),
        objectiveEmblems: document.querySelector("#pt-objective input"),
        daysLeft:  document.querySelector("#days-need input"),
        daysLapsed: document.querySelector("#days-used input"),
        totalDays: document.querySelector("#tot-days input")
    }
    var situação = {
        actualEmblems:  document.querySelector("#pt-actual input"),
        leftEmblems:  document.querySelector("#pt-restante input"),
        media:  document.querySelector("#media-actual input"),
        victory:  document.querySelector("#victory-need input"),
        defeat:  document.querySelector("#defeat-need input")
    }
    var reset = {
        fimDate: document.querySelector("#date-end input"),
        objEmblem: document.querySelector("#obj-emblem input")
    }
    startDay = new Date(localStorage.getItem("date-start"))
    today =  new Date();
    inicio.daysLapsed.value  = parseInt((today.getTime() - startDay.getTime()) / (1000 * 3600 * 24)) + 1;

    frame = document.getElementById("framespec");
    frame.onload = () => {
        if(inicio.daysLapsed.value > 12){
            frame.contentWindow.scrollTo(88 * (inicio.daysLapsed.value - 11),0);
        }
    };
    
    reset.fimDate.setAttribute("min", dateToStringUs(today));
    reset.objEmblem.value = 0;

    inicio.startEmblems.value = localStorage.getItem("emblems-start");
    inicio.objectiveEmblems.value = localStorage.getItem("emblems-objective");
    inicio.totalDays.value = localStorage.getItem("date-duration");



    situação.actualEmblems.value = Number(localStorage.getItem("emblems-actual"));
    inicio.daysLeft.value = inicio.totalDays.value - inicio.daysLapsed.value;

    
    situação.leftEmblems.value = inicio.objectiveEmblems.value - (Number(situação.actualEmblems.value) + Number(localStorage.getItem("bonusTot")));
    // console.log(Number(situação.actualEmblems.value) + Number(localStorage.getItem("bonusTot")))
    situação.media.value = parseInt(situação.leftEmblems.value / (Number(inicio.daysLeft.value) ));
    situação.victory.value = Math.ceil(situação.media.value / localStorage.getItem("victory-pts"));
    situação.defeat.value = Math.ceil(situação.media.value / localStorage.getItem("defeat-pts"));
   
    
    
    UpdateOptions()
    // console.log(inicio)
}
function LateUpdate(){
    var total = {
        victorys:  document.querySelector("#victorys input"),
        defeats:  document.querySelector("#defeats input"),
        victoryPts:  document.querySelector("#victory-pts input"),
        defeatPts:  document.querySelector("#defeat-pts input"),
        played:  document.querySelector("#played input")
    }
    var partidas = {
        rest:  document.querySelector("#prt-restante input"),
        vic:  document.querySelector("#prt-victoryneed input"),
        def:  document.querySelector("#prt-defeatneed input"),
        viperdef:  document.querySelector("#prt-vpd input")
    }
    var item = document.getElementById("framespec").contentWindow.getStatus();

    total.victorys.value = item.victory;
    total.defeats.value = item.defeat;
    total.victoryPts.value = item.vicPt;
    total.defeatPts.value = item.defPt;
    total.played.value = item.playered;
    

    var totVic = Number(total.victoryPts.value) + Number(total.defeatPts.value);
    var totPart = total.played.value;

    partidas.rest.value = Math.ceil(document.querySelector("#pt-restante input").value / (totVic / totPart));
    partidas.vic.value = Math.ceil(document.querySelector("#pt-restante input").value / localStorage.getItem("victory-pts"))
    partidas.def.value = Math.ceil(document.querySelector("#pt-restante input").value / localStorage.getItem("defeat-pts"))
    partidas.viperdef.value = (item.victory / item.defeat).toFixed(2) 
}


UpdateInfo();