const BaseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let dropdownSelects=document.querySelectorAll(".country_select select");
let btn=document.querySelector("#button");
let fromCurr=document.querySelector(".from_container select");
let toCurr=document.querySelector(".to_container select");
let msg=document.querySelector(".msg")



for (select of dropdownSelects){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag =(element)=>{
 currCode=element.value;
 countryCode=countryList[currCode];
 let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
 let img=element.parentElement.querySelector("img");
 img.src=newSrc;
}

const updateExchangeRate= async ()=> {
     let amount=document.querySelector(".amount_div input")
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    
    let URL= `${BaseURL}/${fromCurr.value.toLowerCase()}.json`
    let responce=await fetch(URL);
    let data=await responce.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]

    if(fromCurr.value===toCurr.value){
        msg.innerText="Please Select Two Different Currencies"
    }else{
        let finalAmount=amtVal*rate;
        msgText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
        console.log(msgText);
        msg.innerText=msgText;
    }    
    
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})

