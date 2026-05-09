const navbutton = document.querySelector("#ham-btn");

const navBar = document.querySelector('nav');

//toggle the show class off and on

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');

});