var hitRn = 0;
var timer = 30;
var score = 0;
let level = 1;
let totalBubblesToPop = 10;
let poppedBubbles = 0;
let timeInterval = null;
let gameOverSoundPlayed = false;


function bubbleMaker(){
    var clutter = "";
    for(var i = 1 ; i <= 70 ; i++){
        clutter += `<div class="bubble">${Math.floor(Math.random()*10)}</div>`;
    }

    var pbtm = document.querySelector('#pbtm');
    pbtm.innerHTML = clutter;

    const pbtmWidth = pbtm.offsetWidth;
    const pbtmHeight = pbtm.offsetHeight;

    document.querySelectorAll(".bubble").forEach((bubble) => {
        const randomX = Math.random() * (pbtmWidth - 50); 
        const randomY = Math.random() * (pbtmHeight - 50);
        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;

       
        bubble.addEventListener("click", function() {
            if (Number(bubble.textContent) === hitRn) {
                
                const popSound = document.querySelector("#popSound");
                popSound.currentTime = 0;
                popSound.play();


                score += 10;
                poppedBubbles++;
                document.querySelector("#Score").textContent = score;

                
                bubble.remove();

                if (poppedBubbles >= totalBubblesToPop) {
                    clearInterval(timeInterval);
                    document.getElementById("levelCompleteScreen").classList.remove("hidden");
                    document.getElementById("levelNum").innerText = level;

                     
                    const levelUpSound = document.querySelector("#levelUpSound");
                    levelUpSound.currentTime = 0;
                    levelUpSound.play();
                    
                    return;
                }

                newHitGenerator();
            }
        });
    });

   
}
function timerRunner(){
    timeInterval = setInterval(function(){
        if(timer > 0){
            timer--;
            document.querySelector("#timer").textContent = timer;
        }else{
            clearInterval(timeInterval);
            document.querySelector("#game-over-screen").style.display = "flex";

           
            const gmeOver = document.querySelector("#gameOverSound");
            if (!gameOverSoundPlayed) {
                gmeOver.currentTime = 0;
                gmeOver.play();
                gameOverSoundPlayed = true; 
            }

            
            
           
        }
        
    },1000)
}

function newHitGenerator(){
    hitRn = Math.floor(Math.random()*10);
    document.querySelector("#hit").textContent = hitRn;
}

function scoreGenerator(){
    score += 10;
    document.querySelector("#Score").textContent = score;
}

document.querySelector("#pbtm").addEventListener("click",function(dets){
    if(Number(dets.target.textContent) == hitRn){
        scoreGenerator();
        newHitGenerator();
        bubbleMaker();
    }
})

function startGame(){
    score = 0;
    timer = 30;
    poppedBubbles = 0; 
    gameOverSoundPlayed = false; 
    
    document.querySelector("#Score").textContent = score;
    document.querySelector("#timer").textContent = timer;

    document.getElementById("levelDisplay").innerText = "Level: " + level;

    document.querySelector("#levelCompleteScreen").classList.add("hidden");
    document.querySelector("#game-over-screen").style.display = "none";

    document.querySelector("#timerBar").style.width = "100%";


    // const timerBar = document.querySelector(".timer-bar");
    // timerBar.classList.remove("animate");
    // void timerBar.offsetWidth; 
    // timerBar.classList.add("animate");

    bubbleMaker();
    timerRunner();
    newHitGenerator();
    runTimerBar();
}

document.querySelector("#start-btn").addEventListener("click", function(){
    document.querySelector("#start-screen").style.display = "none";
    startGame();
});


document.querySelector("#restart-btn").addEventListener("click", function(){
    document.querySelector("#game-over-screen").style.display = "none";
    startGame();
});


document.querySelectorAll(".bubble").forEach((bubble) => {
  bubble.addEventListener("click", () => {
   
    bubble.remove(); 

    score++;
    if (score === totalBubblesToPop) {
      clearInterval(timer);
      document.getElementById("levelCompleteScreen").classList.remove("hidden");
      document.getElementById("levelNum").innerText = level;
    }
  });
});

function nextLevel() {
    level++;
    document.getElementById("levelDisplay").innerText = "Level: " + level;
    

    timer = 30;
    poppedBubbles = 0;
    score = 0;
    document.querySelector("#Score").textContent = score;
    document.querySelector("#timer").textContent = timer;

    document.getElementById("levelCompleteScreen").classList.add("hidden");
   
    document.querySelector("#timerBar").style.width = "100%";
    


    bubbleMaker();
    timerRunner();
    newHitGenerator();
    runTimerBar();

}


document.querySelector("#start-btn").addEventListener("click", startGame);
document.querySelector("#restart-btn").addEventListener("click", startGame);


function runTimerBar(duration = 30) {
    const timerBar = document.querySelector("#timerBar");
    let timeLeft = duration;
    let barInterval = setInterval(() => {
        timeLeft--;
        const percent = (timeLeft / duration) * 100;
        timerBar.style.width = percent + "%";

        if (timeLeft <= 0) {
            clearInterval(barInterval);
            showLevelCompleteScreen(); 
        }
    }, 1000);
}



