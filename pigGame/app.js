/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- The player looses its score if two 6 occurs
- The player can Enter the winning score


*/

var scores, activePlayer, roundScore, gamePlaying;

init();

var lastDice;

function btn()
{
    if(gamePlaying){
    //1. Get the random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //2. update the image
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    
    //3.update the score
    if(dice === 6 && lastDice === 6)
        {//player looses its score
            scores[activePlayer]= 0;
            document.getElementById('score-'+activePlayer).textContent='0';
            nextPlayer();
        }
    else if(dice !== 1){
    //update the score
    roundScore +=  dice;
    document.getElementById('current-'+ activePlayer).textContent = roundScore;
    }
    else
    { 
        nextPlayer();
    }
        lastDice = dice;
  }
}

btn();

function hold()
{
    if(gamePlaying){
   //update the score value
    scores[activePlayer] += roundScore;
    
    //update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
        var winscore;
        if(input)
            {
                winscore = input;
            }
        else{
            winscore = 20;
            
        }
    //check if player won the game
    if(scores[activePlayer] >= winscore)
        {
        document.getElementById('score-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+ activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active'); 
        gamePlaying = false;
        }
     else
       {
        nextPlayer();
       }
    }
       
}

hold();


document.querySelector('.btn-roll').addEventListener('click', btn);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
    
}



function init()
{
     scores = [0,0];
     activePlayer = 0;
     roundScore =0;
     gamePlaying = true;
    
     document.querySelector('.dice').style.display = 'none';
    
 
     document.getElementById('score-0').textContent = '0';
     document.getElementById('score-1').textContent = '0';
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.getElementById('name-0').textContent ='Player-0';
     document.getElementById('name-1').textContent ='Player-1';
    
     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
    
     document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-1-panel').classList.remove('active'); 
    
     document.querySelector('.player-0-panel').classList.add('active'); 
}













