
const mainsignup = document.querySelector(".sign-btnn");
const mainlogin = document.querySelector("#log-btnn")
const maincard = document.querySelector(".form-card")

function updateLocalStorage() {
    const user = document.querySelector("#username").value;
    const SignEmail = document.querySelector("#signemail").value;
    const SignPass = document.querySelector("#signpass").value;
    const SignConfPass = document.querySelector("#confpass").value;
    const logemail = document.querySelector("#logemail").value;


    localStorage.setItem("Username", user);
    localStorage.setItem("Email", SignEmail);
    localStorage.setItem("Password", SignPass);
    localStorage.setItem("Confirm", SignConfPass);
}

document.querySelector("#username").addEventListener("input", updateLocalStorage);
document.querySelector("#signemail").addEventListener("input", updateLocalStorage);
document.querySelector("#signpass").addEventListener("input", updateLocalStorage);
document.querySelector("#confpass").addEventListener("input", updateLocalStorage);

mainsignup.addEventListener("click", function (event) {
    event.preventDefault();

    const SignPass = document.querySelector("#signpass").value;
    const SignConfPass = document.querySelector("#confpass").value;

    function error() {
        document.querySelector(".warning").classList.remove("d-none");
    }

    function signup() {
        console.log("Account has been created, please login.");

        setTimeout(function () {
            signform.classList.add("d-none");
            logform.classList.remove("d-none");

            logopt.classList.add("d-none");
            signopt.classList.remove("d-none");
        }, 2000);
        let emaill = localStorage.getItem("Email")
        document.querySelector("#logemail").value = emaill;
    }


    if (SignPass === SignConfPass && SignPass !== "" && SignConfPass !== "") {
        signup();
    } else {
        error();
    }
    
});
mainlogin.addEventListener("click", function (event) {
    event.preventDefault();

    const logemail = document.querySelector("#logemail").value;
    const logpass = document.querySelector("#logpass").value;
    const SignEmail = localStorage.getItem("Email");
    const SignPassword = localStorage.getItem("Password");

    if (logemail === SignEmail && logpass === SignPassword) {

        window.location.href = "./site/index2.html";

    }
    else {
        document.querySelector(".form-card").classList.add("animate__animated", "animate__headShake")

    }
});
