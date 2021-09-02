// SignUp Details fetch 
let signUpObj = [];
let loginObj = [];
let user = {
    first: "",
    lastName: "",
    gmail: "",
    password: ""
};

const signUp = () => {
    if (user.first != "" && user.lastName != "" && user.gmail != "" && password.value === re_password.value) {

        // if(user.first != ""){
        //     user.first = firstName.value;
        // }else{
        //     password_match_error.style.visibility = "visible";
        //     password_match_error.innerText = "Enter first name..."
        // }

        // if(user.lastName != ""){
        //     user.first = lastName.value;
        // }else{
        //     password_match_error.style.visibility = "visible";
        //     password_match_error.innerText = "Enter last name..."
        // }

        // if(user.gmail != ""){
        //     user.gmail = email.value;
        // }else{
        //     password_match_error.style.visibility = "visible";
        //     password_match_error.innerText = "Enter email address..."
        // }
        user.first = firstName.value;
        user.lastName = lastName.value;
        user.gmail = email.value;
        user.password = password.value;
        password_match_error.style.visibility = "visible";
        password_match_error.innerText = "SignUp sucessfull... Login now..."
        loginObj.push(user);
        console.log(user);
        console.log(loginObj);
    } else {
        password_match_error.style.visibility = "visible";
        password_match_error.innerText = "you have missed something...";
        console.log(password.value);
        console.log(re_password.value);
    }
};


showNotes();
let addBtn = document.getElementById("addBtn");
let blankTxt = document.getElementById("blank_txt_error");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if(addTxt.value === ""){
        blank_txt_error.style.visibility = "visible";
    }else{
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        showNotes();
        blank_txt_error.style.visibility = "hidden";
    }  
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        let readMore = `<span onclick="checkIndex(this.id)" id="${index}"><a href="#header">...Read More</a></span></span>`;         
        if(element.length > 200){
            let subText = element.substring(0, 200);
            element = subText;
            html += `<div class="cards">
            <div class="title">Note ${index + 1}</div>
            <div class="cardtxt">         
                <span id="main-content">${element}${readMore}
            </div>
            <i class="fas fa-trash-alt"  id="${index}" onclick="deleteNote(this.id)"></i>
            </div>`;
        }else{
           html += `<div class="cards">
           <div class="title">Note ${index + 1}</div>
           <div class="cardtxt">         
               <span id="main-content">${element}
           </div>
           <i class="fas fa-trash-alt"  id="${index}" onclick="deleteNote(this.id)"></i>
           </div>`;
        }
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note"
        section above to add notes`;
    }
}

// To delete note

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// To search function

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('cards');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "inline-block";
        }
        else {
            element.style.display = "none";
        }
    });
});

// Content box to show full note and blur background

let boxContent = document.getElementById("contentTxt");
let contentBox = document.getElementById("content-box");
let contentTitle = document.getElementById("contentTitle");
let hide = document.getElementById("hide");
let mainTxt = document.getElementById("main-content");

function checkIndex(index) {
    contentBox.style.visibility = "visible";
    boxContent.innerHTML = notesObj[index];
    contentTitle.innerHTML = `Note ${parseFloat(index) + 1}`;
    wrapper.classList.toggle("active");
    contentBox.classList.toggle("active");
};

// hide content box
hide.addEventListener("click", () => {
    contentBox.style.visibility = "hidden";
    wrapper.classList.toggle("active");
    contentBox.classList.toggle("active");
});