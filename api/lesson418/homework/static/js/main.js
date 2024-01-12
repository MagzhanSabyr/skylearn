const createForm = document.querySelector("#create-form");
const updateForm = document.querySelector("#update-form");
const fileInput = document.getElementById("fileInput");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postText");
const idForm = document.querySelector(".id-form");

if (createForm) {
    choiceOfForm(createForm, "/create");
}

if (updateForm) {
    choiceOfForm(
        updateForm,
        `/update/${idForm.textContent}`
    );
}

function choiceOfForm(form, url) {
    form.addEventListener("submit", saveArticle);

    async function saveArticle(event) {
        event.preventDefault();

        const myFormData = new FormData(form);
        myFormData.append("postTitle", postTitle.value);
        myFormData.append("fileInput", fileInput.files[0]);
        myFormData.append("postText", postContent.value);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: myFormData,
            });

            if (response.ok) {
                console.log("File uploaded successfully.");
                window.location.href = "/";
            } else {
                console.error("File upload failed.");
            }
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    }
}

