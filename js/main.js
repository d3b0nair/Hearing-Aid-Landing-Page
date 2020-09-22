/* loading website*/
document.onreadystatechange = function state() {
    let readyState = document.readyState;
    let body = document.querySelector("body");
    let loader = document.querySelector("#loader");
    switch (readyState) {
        case ("loading"):
        case ("interactive"):
            body.style.visibility = "hidden";
            loader.style.visibility = "visible";
        case ("complete"):
            body.style.visibility = "visible";
            loader.style.display = "none";
    }
};
/* page change */
function pageSwitch(page) {
    setTimeout(function () {
        switchThisPage(page)
    }, 300); // making button animation visible via delay
};

function switchThisPage(nextPage) {
    let allPages = document.getElementsByClassName("page");
    let newPage = document.getElementById(nextPage);
    for (let x = 0; x < allPages.length; x++) {
        allPages[x].style.display = "none";
    }
    newPage.style.display = "block";
    newPage.style.animation = "fadeIn 2s linear";
    checkbox.checked = false;
    window.scrollTo(0,0);
    openMenu();
}

// show menu
function openMenu() {
    var checkbox = document.getElementById("checkbox");
    let myMenu = document.getElementById("menu");
    switch (checkbox.checked) {
        case (true):
            setTimeout(function () {
                myMenu.style.display = "block"
            }, 300);
        case (false):
            setTimeout(function () {
                myMenu.style.display = "none"
            }, 200);
    }
}

/* work around with php contact form */

//collecting user's data
function submit() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let time = document.getElementById("time");
    let message = document.getElementById("message");
    let userData = [name, email, phone, time, message];
    validation(userData);
}
//validating user's data
function validation(userData) {
    //forcing a client to check user's form
    for (let x = 0; x < userData.length; x++) {
        if (!userData[x].checkValidity()) {
            userData[x].value = userData[x].validationMessage;
        }
    }
    if (phoneValidation(userData)) {
        let index = userData.indexOf(name);
        if (userData[index] == "Please fill out this field.") {
            //gotta keep it empty
        } else {
            fetchAPI(userData);
        }
    }
}
/* checking required information */

function phoneValidation(userData) {
    let index = userData.indexOf(phone);
    let phoneNum = userData[index].value;
    const regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regEx.test(String(phoneNum));
}


//submiting data to the server
function fetchAPI(userData) {
    let btn = document.getElementById("btn-send");
    btn.textContent = "Відправляєм!"; //letting the client to know that we are sending data to server
    fetch('contact.php', {
            method: 'POST',
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: `name=${userData[0].value}&email=${userData[1].value}&phone=${userData[2].value}&time=${userData[3].value}&message=${userData[4].value}`
        })
        .then(function () {
            btn.textContent = "Очікуйте дзвінка!"; //letting the client to know the info was sent
            btn.disabled = true;
        })
        .catch(function () {
            btn.textContent = "Помилка! Попробуйте знову."; //letting the client to know that info was not sent
        });

}
