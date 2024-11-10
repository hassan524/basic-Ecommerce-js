
const pass = document.querySelector("#logpass")
const hide = document.querySelector(".bi-eye-slash-fill")
const show = document.querySelector(".bi-eye-fill")

const signup = document.querySelector("#signup")
const login = document.querySelector("#login")
const logform = document.querySelector(".main-form:first-child");
const signform = document.querySelector(".main-form:nth-child(2)");
const signopt = document.querySelector(".signup-option ")
const logopt = document.querySelector(".login-option ")


signup.addEventListener("click", function () {

    signform.classList.remove("d-none");
    logform.classList.add("d-none");

    logopt.classList.remove("d-none")
    signopt.classList.add("d-none")

});

login.addEventListener("click", function () {
    signform.classList.add("d-none");
    logform.classList.remove("d-none");


    logopt.classList.add("d-none")
    signopt.classList.remove("d-none")
});



pass.addEventListener("focus", function () {
    if (pass.getAttribute('type') === 'password') {
        hide.classList.remove("d-none");
        show.classList.add("d-none");
    }
});

hide.addEventListener("click", function () {
    hide.classList.add("d-none");
    show.classList.remove("d-none");
    pass.setAttribute('type', 'text');
});

show.addEventListener("click", function () {
    show.classList.add("d-none");
    hide.classList.remove("d-none");
    pass.setAttribute('type', 'password');
});
