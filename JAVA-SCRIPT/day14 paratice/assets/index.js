 const btn = document.getElementById("btn")
 const text = document.getElementById("text")
 

 btn.addEventListener("click",()=>{

if ( text.style.display ==="none"){
    btn.style.display ="block"

} else{
    text.style.display = "none"
   
}

 })