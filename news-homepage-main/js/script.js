"use strict";

(function main(){
    const btnOpenMobileMenu = document.getElementById('mob-menu-icon');
    const btnCloseMobileMenu = document.getElementById('mob-menu-close');
    const navBar = document.getElementById('nav-bar');
    const links = document.getElementById('links');
    const linksLi = document.querySelector('.links-li');

    btnOpenMobileMenu.onclick = function (){
        navBar.classList.add('displaymob-menu','nav-bar-show');
        links.classList.add('displaymob-menu','links-show');
        btnCloseMobileMenu.setAttribute('style','display:block;');
        this.setAttribute('style','display:none;');
        linksLi.setAttribute('style','display:block;');
    }
    function setBack(){
        navBar.classList.remove('displaymob-menu','nav-bar-show');
        links.classList.remove('displaymob-menu','links-show');
        btnCloseMobileMenu.removeAttribute("style");
        btnOpenMobileMenu.removeAttribute("style");
        linksLi.removeAttribute("style");
    }

    btnCloseMobileMenu.onclick = setBack;

    window.addEventListener('resize',()=>{
        if (window.innerWidth > 600) 
            setBack();
    });

})();