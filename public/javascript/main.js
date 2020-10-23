
SetDefaultPoints();
function SetDefaultPoints(){
    var victorys = document.querySelectorAll(".victory-btn input");
    victorys.forEach(victory => {
        victory.value = Number(localStorage.getItem("victory-pts"))
    })
    var defeats = document.querySelectorAll(".defeat-btn input");
    defeats.forEach(defeat => {
        defeat.value = Number(localStorage.getItem("defeat-pts"))
    })
}


function ChangeTable(element,id, type){
    var ptns = element.target.parentElement.querySelector("input").value;
    if(type == "v")
        localStorage.setItem("victory-pts", ptns)
    if(type == "d")
        localStorage.setItem("defeat-pts", ptns)
    

    if(!id){
        const today =  new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        id = `${day}-${month}-${year}`;
    }

    var stateObj = {
        id: id,
        tipo: type,
        pts: ptns,
        total: 1,
        media: 4
    }
    document.getElementById("framespec").contentWindow.addValue(stateObj);
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