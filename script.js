import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


let showingButtons = document.querySelectorAll('.box');
let inbetweenScreen = document.querySelector('.inbetweenScreen');
let nextButton = document.querySelector('.next');
let wordScreen = document.querySelector('.wordScreen');
let leaderboard = document.querySelector('.theLeaderBoard');
let words = document.querySelector('.words');
let list = document.querySelector('.list');
let enterName = document.querySelector('.enterName');

let dead = true;
let done = false;
let reset = false;
let lost = false;
let level = 5;
let number = 1;
let i =0;
 let randomNumber;
 let   inputName ;


 let correctOrder = 0;

 let randomPlaces =[];


  const db = getDatabase();
  let playerId;
 
firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid)
  
      //You're logged in!
      playerId = user.uid;
      console.log(playerId);
  })


  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

  function writeUserData(userId,name, score ){

    const reference = ref(db, 'users/' + userId)
    
    set(reference, {
    name : name,
    score: score
    });
    
   
    const points = ref(db, 'users/' + userId + '/score')
    
    console.log(points)
    }
    
    let players = {};
    const users = ref(db, 'users/');
    let redo = false;
    onValue(users, (snapshot) => {
    
      players = snapshot.val() || {};
    ;});


    document.querySelector('#player-name-button').addEventListener('click', ()=>{
        enterName.style.display = "none";
         inputName = document.getElementById('player-name').value;
        
         writeUserData(playerId,inputName,level);
        
        const result = Object.entries(players)
          .sort((a, b) => b[1].score - a[1].score)
          .map((p) => `${p[1].name} | ${p[1].score}`);
        
          console.log(result);
          if (redo){
           
            leaderboard.innerHTML = "";
            }
        
          for (let i = 0; i < result.length; i++) {
            let stick = document.createElement("div");
            stick.classList.add("leaders");
            stick.innerHTML = result[i];
            leaderboard.append(stick);
           redo = true;
           
          } 
        });




 
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
    const characterState = players[playerId];
   console.log( characterState.score);


   
   if(level > characterState.score){

    onValue(users, (snapshot) => {
    
        players = snapshot.val() || {};
      });
  
       writeUserData(playerId,inputName,level);

       const result = Object.entries(players)
       .sort((a, b) => b[1].score - a[1].score)
       .map((p) => `${p[1].name} | ${p[1].score}`);
     
       console.log(result);
       if (redo){
        
         leaderboard.innerHTML = "";
         }
     
       for (let i = 0; i < result.length; i++) {
         let stick = document.createElement("div");
         stick.classList.add("leaders");
         stick.innerHTML = result[i];
         leaderboard.append(stick);
        redo = true;
        
       } 
       
    }
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



 