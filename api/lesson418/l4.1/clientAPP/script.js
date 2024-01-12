let container = document.getElementById("container");
let btn = document.getElementById("btn");

btn.addEventListener("click", function(){
    fetch("http://127.0.0.1:5000")
    .then(response => {
        if(!response.ok){
            console.log("Something went wrong.")
        }
        return response.json();
    })
    .then(json => {
        for(let i=0; i<json.length; i++ ){{
            let li = document.createElement("li");
            li.innerHTML = json[i].name;
            container.appendChild(li);
        }}


    })
    .catch(err => {
        console.log(err)
    })
})


// ANONYMOUS FUNCTIONS 

// ФОП - функционально | ПОП - прототиптно 







// 100 - INFORMATION 
// 200 - OK 
// 300 - REDIRECT (NOT SCARY, BUT NOT OKAY)
// 400 - ERROR CLIENT
// 500 - ERROR SERVER


