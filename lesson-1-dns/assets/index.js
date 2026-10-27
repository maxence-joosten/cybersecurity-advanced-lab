document.addEventListener("DOMContentLoaded", init);


function init() {
    document.querySelector("#ping").addEventListener("submit", ping);
    document.querySelector("#exec").addEventListener("submit", exec);
}

function ping(evt){
    evt.preventDefault();
    const ip = document.querySelector("#ping input[type='text']").value;
    fetch("/ping", {
        method : "post",
        body : JSON.stringify({ip})
    }).then(res=>res.json())
        .then(json=>{
            document.querySelector("pre").innerHTML = json.output;
        });
}

function exec(evt){
    evt.preventDefault();
    const cmd = document.querySelector("#exec input[type='text']").value;
    fetch("/exec", {
        method : "post",
        body : JSON.stringify({cmd})
    }).then(res=>res.json())
        .then(json=>{
            document.querySelector("pre").innerHTML = json.output;
        });
}
