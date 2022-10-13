const bill = document.getElementById("bill-amount");
const tipCustom =document.getElementById("custom-amount");
const peopleAmount =document.getElementById("people-amount");
const tips = document.querySelectorAll(".tips");

const tipPerPerson = document.getElementById("price-number");
const totalPerPerson =document.getElementById("total-price");
const resetBtn = document.getElementById("reset-button");
const error = document.querySelector(".error");
const billError = document.querySelector(".bill-error");
const tooMuch = document.querySelector(".too-much");

bill.addEventListener("input", billFun);
peopleAmount.addEventListener("input", peopleAmountFun);
tips.forEach(function(val){
    val.addEventListener('click', handleClick);
});

tipCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

bill.value = "0";
peopleAmount.value = "0";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 0;
let tipValue = 0.15;



function billFun(){
    billValue = +bill.value;


    if(billValue < 0){
        billError.style.display = 'flex';
        billError.style.color = 'red';
        bill.style.border = 'thick solid red';
        bill.value = "0";
    }else if(billValue > 5000){
        tooMuch.style.display = 'flex';
        tooMuch.style.color = 'red';
        bill.style.border = 'thick solid red';
        bill.value = "5000";
    }else if(billValue > 0 && billValue < 5000){
        resetBtn.style.backgroundColor = '#26C2AE';
        tooMuch.style.display = 'none';
        billError.style.display = 'none';
        billError.style.color = 'none';
        bill.style.border = 'none';
    }else{
        billError.style.display = 'none';
        tooMuch.style.display = 'none';
        bill.style.border = 'none';
        calculateTip();
    }
}

function peopleAmountFun(){
    peopleValue = parseFloat(peopleAmount.value);
    

    if(peopleValue < 1){
        error.style.display = 'flex';
        error.style.color = 'red';
        peopleAmount.style.border = 'thick solid red';
        peopleAmount.value = "0";
    }else if(peopleValue > 0){
        resetBtn.style.backgroundColor = '#26C2AE';
        error.style.display = 'none';
        error.style.color = 'none';
        peopleAmount.style.border = 'none';
    }else{
        error.style.display = 'none';
        peopleAmount.style.border = 'none';
        calculateTip();
    }
}

function tipInputFun(){
    tipValue=parseFloat(tipCustom.value / 100);

    var n = tipCustom.value;
    n = Number(n);
    if(n < 0){
        tipCustom.style.color = 'red';
        tipCustom.value = 0;
    }else if(n > 100){
        tipCustom.style.color = 'red';
        tipCustom.value = 100;
    }else{
        tipCustom.value = n;
        tipCustom.style.color = '#5E7A7D';
    }
    calculateTip();

    tips.forEach(function(val){
        val.classList.remove("active-tip");
    })
    calculateTip();
}

function handleClick(event){
    tips.forEach(function(val){
        val.classList.remove("active-tip");
        if(event.target.innerHTML == val.innerHTML){
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    })
    calculateTip();
}

function calculateTip(){
    if(peopleValue >= 1 && billValue >= 1){
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = ( billValue + (billValue *tipValue)) / peopleValue;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

function reset(){
    bill.value = "0.0";
    billFun();
    peopleAmount.value = "1";
    peopleAmountFun();
    tipCustom.value = "";
    tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
    totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);
    resetBtn.style.backgroundColor = "#0D686D";
}