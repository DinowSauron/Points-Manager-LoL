var name = localStorage.getItem("user-name") || '';
console.log(name)

if(name){
    RemoveLogin();
}

// localStorage.clear()
 



function ClearFields(){
    var inputElement = document.querySelector(".log-container aside input#name");
    var emblemsActual = document.querySelector("#actual-points");
    var emblemsObjective = document.querySelector("#objective-points");
    var dateStart = document.querySelector("#date-start");
    var dateEnd = document.querySelector("#date-end");

    inputElement.value = "";
    emblemsActual.value = "0";
    emblemsObjective.value = "";
    dateStart.value = "";
    dateEnd.value = "";
}

function RemoveLogin(){
    var loadElement = document.querySelector(".load-wait");
    var logElement = document.querySelector(".log-container");
    var mainElement = document.querySelector(".main-container");
    
    loadElement.remove();
    logElement.remove();
    mainElement.style.display = "block";
}



function SendSettings(){
    var inputElement = document.querySelector(".log-container aside input#name");
    var loadElement = document.querySelector(".load-wait");

    loadElement.style.display = 'flex';

    if(!inputElement.value){
        ReturnEvent("Coloque seu nome!");
        return
    }
    
    GetDates();

    setTimeout(() =>{
        localStorage.setItem("user-name", inputElement.value)
        RemoveLogin();
    }, (Math.random() * 4000)+ 1500);
}
function GetEmblems(){
    var emblemsActual = document.querySelector("#actual-points");
    var emblemsObjective = document.querySelector("#objective-points");
    if(!loadElement.value){
        ReturnEvent("Coloque seu Objetivo!");
        return;
    }
    
    localStorage.setItem("emblems-actual", dateStart);
    localStorage.setItem("emblems-objective", dateEnd);
}
function GetDates(){
    var dateStart = document.querySelector("#date-start");
    var dateEnd = document.querySelector("#date-end");
    if(dateStart.value.replace("-", "") > dateEnd.value.replace("-", "")){
        ReturnEvent("Insira as datas de forma correta");
        return;
    }


    dateStart = new Date(dateStart.value);
    dateEnd = new Date(dateEnd.value);
    localStorage.setItem("date-start", dateStart)
    localStorage.setItem("date-end", dateEnd)
    

    var duration = dateEnd.getTime() - dateStart.getTime();
    duration = duration / (1000 * 3600 * 24)
    localStorage.setItem("date-duration", duration)
    console.log(duration);
}

function ReturnEvent(msg){
    var loadElement = document.querySelector(".load-wait");
    setTimeout(() => {
        alert(msg);
        loadElement.style.display = 'none';
    }, 1500);
}