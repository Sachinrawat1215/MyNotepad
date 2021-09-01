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
    if (password.value == re_password.value) {
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
        console.log(password.value);
        console.log(re_password.value);
    }
};


showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
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
        html +=
            `<div class="cards">
                <div class="title">Note ${index + 1}</div>
                <div class="cardtxt">         
                    <span id="main-content">${element}<span onclick="checkIndex(this.id)" id="${index}"><a href="#header">...Read More</a></span></span>
                </div>
                <i class="fas fa-trash-alt"  id="${index}" onclick="deleteNote(this.id)"></i>
            </div>`;
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
    console.log(index);
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
        // console.log(cardTxt);
    });
});

// Content box to show full content

function checkIndex(index) {
    console.log(index);
    console.log(notesObj[index]);
    let boxContent = document.getElementById("contentTxt");
    let contentBox = document.getElementById("content-box");
    let contentTitle = document.getElementById("contentTitle");
    contentBox.style.visibility = "visible";
    boxContent.innerHTML = notesObj[index];
    contentTitle.innerHTML = `Note ${parseFloat(index) + 1}`;
};

// hide content box
let hide = document.getElementById("hide");
hide.addEventListener("click", () => {
    let contentBox = document.getElementById("content-box");
    contentBox.style.visibility = "hidden";
});

// hide extra text and show read more button

let mainTxt = document.getElementById("main-content");
console.log(mainTxt.children);
let str = mainTxt.innerHTML;
let strLength = str.length;
notesObj.forEach(function (strLength, index) {
    console.log(strLength.length);
    if (strLength.length > 200) {
        console.log("this is greater than 200");
    } else {
        console.log("this is smaller");
    }
});