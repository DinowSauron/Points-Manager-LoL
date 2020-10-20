var name = localStorage.getItem("user-name") || '';
console.log(name)

if(name){
    RemoveLogin();
}

localStorage.clear()
 



function ClearFields(){
    var inputElement = document.querySelector(".log-container aside input#name");

    inputElement.value = '';
}

function SendSettings(){
    var inputElement = document.querySelector(".log-container aside input#name");
    var loadElement = document.querySelector(".load-wait");

    if(!inputElement.value){
        alert("Coloque seu nome!");
        return;
    }

    loadElement.style.display = 'flex';
    setTimeout(() =>{
        localStorage.setItem("user-name", inputElement.value)
        RemoveLogin();
    }, (Math.random() * 4000)+ 1500);
}

function RemoveLogin(){
    var loadElement = document.querySelector(".load-wait");
    var logElement = document.querySelector(".log-container");
    
    loadElement.remove();
    logElement.remove();
}

