
function UpdateInfo(){
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
    startDay = new Date(localStorage.getItem("date-start"))
    today =  new Date();
    inicio.daysLapsed.value  = parseInt((today.getTime() - startDay.getTime()) / (1000 * 3600 * 24)) + 1;
   


    inicio.startEmblems.value = localStorage.getItem("emblems-start");
    inicio.objectiveEmblems.value = localStorage.getItem("emblems-objective");
    inicio.totalDays.value = localStorage.getItem("date-duration");



    situação.actualEmblems.value = localStorage.getItem("emblems-actual");
    inicio.daysLeft.value = inicio.totalDays.value - inicio.daysLapsed.value;


    situação.leftEmblems.value = inicio.objectiveEmblems.value - situação.actualEmblems.value - Number(localStorage.getItem("bonusTot"));
    situação.media.value = parseInt(situação.leftEmblems.value / inicio.daysLeft.value + 1);
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


    var item = document.getElementById("framespec").contentWindow.getStatus();

    total.victorys.value = item.victory;
    total.defeats.value = item.defeat;
    total.victoryPts.value = item.vicPt;
    total.defeatPts.value = item.defPt;
    total.played.value = item.playered;
    
}


UpdateInfo();
setTimeout(LateUpdate, 500);