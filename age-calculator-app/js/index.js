"use strict";

/**@param {NodeListOf<HTMLInputElement>} inputNumDate */
function validyInput(inputNumDate){

    /**Elemento com class="warning" abaixo do input
     * @type {HTMLElement}*/ 
    let errorElement = null;
    let errorPrimary = 0;

    //individuals errors
    for(let input of inputNumDate){
        errorElement = input.nextElementSibling;
        
        if(input.value == ""){
            errorElement.textContent = "This field is required";
            input.previousElementSibling.style.color = "hsl(0, 100%, 67%)"; //colore o label
            input.style.borderColor = "hsl(0, 100%, 67%)"; //ele mesmo
            errorPrimary = 1;
            continue;
        }

        //Pega o valor do atributo para definir em qualesta
        let digitDataId = input.getAttribute('data-digit');
        let inputToNumber = Number(input.value);
     
        if(digitDataId == "day"){
            if(!Number.isInteger(inputToNumber) || inputToNumber < 1 || inputToNumber > 31){
                errorElement.textContent = "Must be a valid day";
                errorPrimary = 1;
            }
               
        }else if(digitDataId == "month"){
            if(!Number.isInteger(inputToNumber) || inputToNumber < 1 || inputToNumber > 12){
                errorElement.textContent = "Must be a valid month";
                errorPrimary = 1;
            }
        }else{
            const currentDate = new Date();
            if(!Number.isInteger(inputToNumber) || inputToNumber < 1){
                errorElement.textContent = "Must be a valid year";
                errorPrimary = 1;
            } else if(inputToNumber > currentDate.getFullYear()){
                errorElement.textContent = "must be in the past";
                errorPrimary = 1;
            }
        }
    
        if(errorPrimary)
            input.previousElementSibling.style.color = "hsl(0, 100%, 67%)"; //colore o label
    }


    //-----------------------//---------------------------//
    //error whole forms
    let day, month, year;
    let errorSecundary = 0;

    let d = null;

    if(!errorPrimary){
        [day, month, year] = [
                Number(inputNumDate[0].value), Number(inputNumDate[1].value), Number(inputNumDate[2].value)
        ];

        d = new Date(year, month-1, day, (new Date()).getHours(), (new Date()).getMinutes(), 0);
        console.log(d);
        switch(month){
            case 1:case 3:
            case 5:case 7:
            case 8:case 10:
            case 12:
                if(day > 31)
                    errorSecundary = 1;
                break;
            case 2:
                if(day > 28)
                    errorSecundary = 1;
                break;
            default:
                if(day > 30)
                    errorSecundary = 1;
        }

        let time = Date.now() - d;
            
        
        if(errorSecundary || time < 0){
            inputNumDate[0].nextElementSibling.textContent = "Must be a valid date";
            inputNumDate.forEach((element)=>{
                element.previousElementSibling.style.color = "hsl(0, 100%, 67%)";
                element.style.borderColor = "hsl(0, 100%, 67%)"; //ele mesmo
            })
            d = null;  
        }
            
        
    }
    //-----------------------//---------------------------//

     //-----------------------//---------------------------//
    // limpar todos erros quando começar a digitar
    const clean = ()=>{
        for(let element of inputNumDate){
            element.nextElementSibling.textContent = "";
            element.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
            element.style.borderColor = "hsl(0, 0%, 86%)";
        }

    }
    inputNumDate.forEach((inputNum)=>{
        inputNum.addEventListener('focus', clean);
    });
    //-----------------------//---------------------------//
    
    return d;
}

/**@param {Date} dateIn */
function calcDate(dateIn){
    let time = Date.now() - dateIn; //diferença data atual e dada como argumento millissegundos

    time = time / (365.2425*24*60*60*1000); //quantidade de anos float
    let years = Math.floor(time);

    time = (time - years)*12; //quantidade de meses float
    let months = Math.floor(time);
    
    time = (time - months)*30.43; //quantidade de dias floats
    let days = Math.floor(time);

    return {years, months, days}; //desistruturação
}

(function main(){
    const inputNumDate = document.querySelectorAll('.numDate input');
    const btnCalc = document.getElementById('calcular');
    const spYear = document.getElementById('year');
    const spMonth = document.getElementById('month');
    const spDay = document.getElementById('day');

    /**@type {Date} dateIn */
    let dateIn = null;
    let age = null;
    btnCalc.addEventListener('click',()=>{
        dateIn = validyInput(inputNumDate);
        console.log(dateIn);
        if(dateIn){
            age = calcDate(dateIn);
            spYear.innerHTML = age.years;
            spMonth.innerHTML  = age.months;
            spDay.innerHTML = age.days;
        }else{
            spYear.innerHTML = "--";
            spMonth.innerHTML  = "--";
            spDay.innerHTML =  "--"; 
        }
    })
})()