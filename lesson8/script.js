
// document



// console.log(document.getElementById("todo-input"));
// console.log(document.getElementsByClassName("container"));
// console.log(document.getElementsByName("test"));
// console.log(document.getElementsByTagName("h1"));





// for (let i = 0; i < 10; i++) {
    //     let p = document.createElement("p");
    //     p.innerHTML= "123";
    //     container.appendChild(p);
    
    // }
    
// let container = document.getElementById("container");

// let input = document.getElementById("todo-input");

// console.log(input);

// let counter = 0; 

// input.addEventListener("keypress", function(e){
//     if(e.key == "Enter"){
        
//         counter++;


//         let div = document.createElement("div");
//         div.id = "task";
//         div.classList.add("task");
//         div.setAttribute("index", counter)
//         let checkbox = document.createElement("input");
//         checkbox.setAttribute("type", "checkbox");
//         let span = document.createElement("span");
//         span.setAttribute("index")
//         span.innerHTML = this.value;
//         span.setAttribute("index", counter);
//         let button = document.createElement("button");
//         button.classList.add("btn");
//         button.innerHTML = "X";
//         button.setAttribute("index", counter);
//         div.appendChild(checkbox);
//         div.appendChild(span);
//         div.appendChild(button);
//         container.appendChild(div);
//         this.value = "";
        
//     }
// })


// $(document).ready (function(){
//     counter++;

// })

$(document).ready(function(){
    let counter = 0;

    let categories = {
        1: { "bg": "bg-primary", "clr": "text-light" },
        2: { "bg": "bg-success", "clr": "text-light" },
        3: { "bg": "bg-dark", "clr": "text-light" },
        4: { "bg": "bg-secondary", "clr": "text-light" }
    }

    function createTask(text, counter) {
        let div = $("<div></div>");
        let checkbox = $("<input>");
        let span = $("<span></span>");
        let button = $("<button></button>");
        
        div.addClass("task");
        div.attr("index", counter);

        checkbox.addClass("todo-checkbox");
        checkbox.attr("type", "checkbox");
        checkbox.attr("index", counter);

        span.addClass("todo-span");
        span.html(text);
        span.attr("index", counter);

        button.addClass("btn");
        button.addClass("todo-btn");
        button.html("X");
        button.attr("index", counter);

        div.append(checkbox, span, button);

        return div;
    }

    $("#todo-input").on("keypress", function(e) {
        if (e.key == "Enter" && $(this).val().trim() != "") { 
            counter++;
            let task = createTask(this.value, counter);
            $("#container").append(task);
            this.value = "";
        }
    });

    $("#container").on("click", ".todo-checkbox", function() {
        let index = $(this).attr("index");
        let span = $(`.todo-span[index='${index}']`);
        span.toggleClass("completed-task");
    });

    $("#container").on("click", ".todo-btn", function() {
        let index = $(this).attr("index");
        let div = $(`.task[index='${index}']`);
        div.remove();
    });
});


