
let showingButtons = document.querySelectorAll('.box');
let inbetweenScreen = document.querySelector('.inbetweenScreen');
let nextButton = document.querySelector('.next');
let wordScreen = document.querySelector('.wordScreen');

let dead = true;
let done = false;
let reset = false;
let lost = false;
let level = 5;
let number = 1;
let i =0;
 let randomNumber;


 let correctOrder = 0;

 let randomPlaces =[];
 
const placeCharacter = () => {
 if(randomPlaces.length < level){
    
    randomNumberGenerator()

    console.log(randomPlaces)
}

if(randomPlaces.length >= level && !done){
    
    createButtons()
}

if(correctOrder >= randomPlaces.length){
    inbetweenScreen.style.display = "flex";
    // inbetweenScreen.innerHTML = "you won"
    wordScreen.innerHTML = "you won level " + level;
randomPlaces = [];
level++;
correctOrder = 0;
done = false;
reset = false;
}

      }
      
     



const step = () => {
  placeCharacter();
     
     window.requestAnimationFrame(() => {
        step();
     })
  }
  step(); //kick off the first step!

    
    
    function randomNumberGenerator(){


   let max = 40;
   let min = 1;
        randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
            
if(!randomPlaces.includes(randomNumber)){
   
    randomPlaces.push(randomNumber)
    // console.log("doesnt already contains it")
}

else{
    // console.log("already contains it")
}

    }



    function createButtons(){
        // let testbutton = document.querySelector(`#${CSS.escape(40)}`);
        
        // let button = document.querySelector(`#${CSS.escape(randomPlaces[0])}`);
        // button.innerHTML = "YAY";

        // console.log(button)

        for(let i = 0; i <= level - 1; i++ ){

            let button = document.querySelector(`#${CSS.escape(randomPlaces[i])}`);
            button.classList.add("button");

            button.classList.add("showing");
            button.innerHTML = i + 1;
// console.log(button);
// console.log(i);
        }
done = true;



    }



  
showingButtons.forEach(function(button) {

    button.onclick = function()
    {
        console.log(button.id);
        let buttonId = parseInt(button.id);
        if(randomPlaces.includes(buttonId) && button.classList.contains("button")){

if(button.id != randomPlaces[correctOrder]){

console.log("wrong");
inbetweenScreen.style.display = "flex";
wordScreen.innerHTML = "you lost :( you got to level " + level;
lost = true;

for(let i = 0; i <= level - 1; i++ ){

    let button = document.querySelector(`#${CSS.escape(randomPlaces[i])}`);
   

    button.classList.remove("showing");
    button.classList.remove("button");
    button.innerHTML = "";
console.log("reseting")
}
}
correctOrder ++;



        // console.log(button);
        // console.log(button.id);
        button.classList.remove("showing");
        button.classList.remove("button");


if(!reset){
        for(let i = 0; i <= level - 1; i++ ){

            let button = document.querySelector(`#${CSS.escape(randomPlaces[i])}`);
           

            button.classList.remove("showing");
            button.innerHTML = "";
console.log("reseting")
        }

    }
    reset = true;
        button.innerHTML = "";

    }




    }
});
     

nextButton.addEventListener("click", event => {
if(lost){
    
    for(let i = 0; i <= level - 1; i++ ){

        let button = document.querySelector(`#${CSS.escape(randomPlaces[i])}`);
       

        button.classList.remove("showing");
        button.classList.remove("button");
        button.innerHTML = "";
console.log("reseting")
    }

inbetweenScreen.style.display = "none";
randomPlaces = [];
level = 5;
correctOrder = 0;
done = false;
reset = false;
lost = false;
}


    inbetweenScreen.style.display = "none";
 })
