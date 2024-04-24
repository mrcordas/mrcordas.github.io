"use strict";

const changeBannerMediaquery = () =>{
    const banner = document.querySelector('#ilustration img[alt="ilustration-banner"]');
    const mediaquery = matchMedia("(min-width:768px)");
    function changeImg(){
        if(mediaquery.matches){
            banner.src = "./assets/images/illustration-sign-up-desktop.svg";
        }else{
            banner.src = "./assets/images/illustration-sign-up-mobile.svg"
        }
    }
    changeImg();
    mediaquery.addEventListener("change", changeImg) // se mudar a width
}

const emailValidy = (btn, container1, container2)=>{

    const email = document.getElementById('email');
    const error = document.getElementById('error');
    const spanMessage = document.querySelector('#message span');
    
    btn.addEventListener('click', function(){
        let inputValue = email.value;
        let validyEmail = !(/\s/.test(inputValue)) && /([a-z]|[0-9])@[a-z]+\x2E/.test(inputValue);
    
        if(inputValue == "" || !validyEmail){
            error.style.display = "block";
            email.className = "emailerror";
        }else{
            container1.style.display = "none";
            container2.style.display = "block";
            spanMessage.innerHTML = email.value;
            email.value = "";
        }

    })

    email.addEventListener('focus', function(){
        error.style.display = "none";
        email.className = "email";
    })
}

(function main(){
    changeBannerMediaquery();
    const containerMain = document.getElementById('main');
    const containerSucess = document.getElementById('sec');
    let btn = document.getElementById('submit');
    
    emailValidy(btn, containerMain, containerSucess);
    
    btn = document.getElementById('dismiss');
    btn.addEventListener('click', function(){
        containerMain.style.display = "block";
        containerSucess.style.display = "none";
    })
})();





