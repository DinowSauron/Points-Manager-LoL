
function UpdateInfo(){
    var inicio = {
        startEmblems: document.querySelector("#pt-start input"),
        objectiveEmblems: document.querySelector("#pt-objective input"),
        daysLeft:  document.querySelector("#days-need input"),
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
    lapsedDays = parseInt((today.getTime() - startDay.getTime()) / (1000 * 3600 * 24)) + 1;



    inicio.startEmblems.value = localStorage.getItem("emblems-start");
    inicio.objectiveEmblems.value = localStorage.getItem("emblems-objective");
    inicio.totalDays.value = localStorage.getItem("date-duration");



    situação.actualEmblems.value = localStorage.getItem("emblems-actual");
    inicio.daysLeft.value = inicio.totalDays.value - lapsedDays;


    situação.leftEmblems.value = inicio.objectiveEmblems.value - situação.actualEmblems.value;
    situação.media.value = parseInt(situação.leftEmblems.value / inicio.daysLeft.value);
    situação.victory.value = Math.ceil(situação.media.value / localStorage.getItem("victory-pts"));
    situação.defeat.value = Math.ceil(situação.media.value / localStorage.getItem("defeat-pts"));
    
    UpdateOptions()
    // console.log(inicio)
}

UpdateInfo();