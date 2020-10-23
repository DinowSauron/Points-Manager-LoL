
function ToogleOptions(){
    var sectionElement = document.querySelector(".main-container #options");
    sectionElement.classList.toggle('active');
}

UpdateOptions();
function UpdateOptions(){
    var nameElement = document.querySelector(".main-container #options #box-name");
    var ptsElement = document.querySelector(".main-container #options span#box-points");

    nameElement.innerHTML = localStorage.getItem("user-name");
    ptsElement.innerHTML = localStorage.getItem("emblems-actual") + " Emblemas";
}

function DeleteAll(){
    if(window.confirm("Deseja apagar todos os dados?"))
    {
        localStorage.clear();
        document.location.assign("./index.html");
    }
}