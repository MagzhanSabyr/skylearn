const servResponse = document.getElementById("response");
const searchInput = document.getElementById("searchInput");
const form = document.querySelector("form");

form.addEventListener("input", function (e) {
    e.preventDefault();
    data = searchInput.value;
    if (!data) {
        servResponse.innerHTML = "No user selected";
    } else {
        servResponse.innerHTML = "";
    }
    return ajaxFunc(data);
});

function ajaxFunc(data) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:81/" + data, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log("test", response.users);
            renderCard(response.users);
        } else {
            console.log("Error: ", xhr.status);
        }
    };
    xhr.onerror = function () {
        console.log("Request error");
    };
    const sendData = JSON.stringify({ text: data });
    xhr.send(sendData);
}

function renderCard(cards) {
    if (cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            servResponse.innerHTML += `
            <div class="col-xl-3 lg-3 col-md-5 col-sm-10 col-12">
                <div class="card">
                    <img src="${cards[i].photo}" class="card-img-top" alt="${cards[i].name}">
                    <div class="card-body">
                        <h5 class="card-title">${cards[i].name}</h5>
                        <p class="card-text"><b>Email:</b> ${cards[i].email} </p>
                    </div>
                </div>
            </div>
            `;
        }
    } else {
        servResponse.innerHTML = "No users";
    }
}


