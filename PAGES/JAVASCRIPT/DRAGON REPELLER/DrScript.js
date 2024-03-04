//LET VARIABLES //let(VARIABLE SET TO 'text') xp(INITIALIZED TO 'number')
let xp = 0;  
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]; //[](ARRAY FOR MULTIPLE OPTIONS) ""(STRING TO INPUT TEXT)


//BUTTON CONST ARGUMENTS 
//const(A CONSTANT) red text(VARIABLE) document(TARGETS THE HTML) .querySelector(TAKES CSS'#' SELECTOR AS ARGUMENT)
const button1 = document.querySelector("#button1") 
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")


//TEXT & STATS CONST ARGUMENTS
//const(A CONSTANT) red text(VARIABLE) document(TARGETS THE HTML) .querySelector(TAKES CSS'#' SELECTOR AS ARGUMENT)
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterName = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")


//INITIALIZE BUTTONS
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


const locations = [ //const(A CONSTANT) red text(VARIABLE) [](ARRAY FOR MULTIPLE OPTIONS) 
    { //{}(INDICATES OBJECTS) 
        name: "town square", //(key: "value")(USED TO ACCESS AND MODIFY VALUE)
        "button text": ["Go to store", "Go to cave", "Fight dragon"], //"property":array[functions(""-strings)]
        "button functions": [goStore, goCave, fightDragon], //property:variables
        text: "You are in the town square. You see a sign that says \"Store\"." //property:string
    },
    { //{}(INDICATES OBJECTS)
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown], 
        text: "You enter the store." 
    },
    { //{}(INDICATES OBJECTS)
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }  
];


const weapons = [
    {
        name: "stick",
        "power": 5
    },
    {
        name: "dagger",
        "power": 30
    },
    {
        name: "claw hammer",
        "power": 50
    },
    {
        name: "sword",
        "power": 100
    },
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    },
];


function update(location) { // location(PARAMETER)
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0]; //BUTTON text CHANGES TO .innerText "" [0]="button text" 1ST ARGUMENT   
    button2.innerText = location["button text"][1];      
    button3.innerText = location["button text"][2]; 
    button1.onclick = location["button functions"][0]; //.onclick(ON CLICK OF BUTTON GO TO function array []) [0]="button function" FIRST ARGUMENT
    button2.onclick = location["button functions"][1]; 
    button3.onclick = location["button functions"][2]; 
    text.innerHTML = location.text; //TEXT BOX CHANGES TO .innerText of location "text" property
}

//function(RUNS SECTION OF CODE AT SPECIFIC TIMES)
function goTown() {//SHOWS BELOW OPTIONS ONCE button1.onclick //()=PARAMETER
    update(locations[0]); //update(call) PASS ARGUMENT(locations) INTO THE update(call) [0]=FIRST ARGUMENT(town square)
}

function goStore() { //SHOWS BELOW OPTIONS ONCE button1.onclick //()=PARAMETER
    update(locations[1]); //update(call) PASS ARGUMENT(locations) INTO THE update(call) [1]=2ND ARGUMENT(store)
}

function goCave() { //()=PARAMETER
    update(locations[2]);
}

//STORE FUNCTIONS
function buyHealth() { //MATH OF BUYING HEALTH FUNCTION BELOW //()=PARAMETER
    if (gold >= 10) { //if (CONDITION)
        gold -= 10; //SHORTHAND FOR (gold = gold -10) COMPOUND ASSIGNMENT
        health += 10; //SHORTHAND FOR (health = health +10) COMPOUND ASSIGNMENT
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) { //IF CURRENT WEAPON IS SMALLER THAN .length OF weapons array -1 COMPENSATES FOR INDEX STARTING AT 0
        if (gold >= 30) { //if (CONDITION)
            gold-=30;
            currentWeapon ++ ; //++(INCREMENTING COMPOUND ASSIGNMENT)
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name; //variable = array[variable/index]
            text.innerText = "You now have a " + newWeapon + "."; //.innerText DISPLAYS MESSAGE SPECIFYING NAME OF NEW WEAPON
            inventory.push(newWeapon); //PUSHES newWeapon TO USER inventory
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1){ //length OF INVENTORY MUST BE GREATER THAN 1
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); //.shift (DISPOSES OF WEAPON AT START OF ARRAY (STICK))
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function goFight() {
    update(locations[3]); 
    monsterHealth = monsters[fighting].health; 
    const monsterStats = document.querySelector(monsterStats); //variable element = htmlPAGE querySelector(TAKES CSS'#' SELECTOR AS ARGUMENT)
    monsterStats.style.display = "block"; // element style is displayed = PROPERTY
    monsterName.innerText = monsters[fighting].name; //innerText for monsterName = the monster(const) your fighting(variable) has the .name(object of const monsters)
    monsterHealthText.innerText = monsterHealth;
}

function fightSlime() { //()=PARAMETER
    fighting = 0;
    goFight(); 
}

function fightBeast() { //()=PARAMETER
    fighting = 1;
    goFight()
}

function fightDragon() { //()=PARAMETER
    fighting = 2;
    goFight();
}

function attack() { //()=PARAMETER
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) { //if (CONDITION)
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; //+ Math.floor(math.random() * xp) + 1 (GENERATES RANDOM NUMBER BETWEEN CURRENT XP AND 1)
    } else {
        text.innerText += " You miss."
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) { //if (CONDITION)
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
          winGame();
        } else {
          defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) { //if (CONDITION) CONDITION = random number <= 0.1  &&=(LOGICAL ADD OPERATOR ADDS SECOND CONDITION)  !==(inventory.length DOES NOT EQUAL ONE PREVENTS LAST WEAPON BREAKING)
        text.innerText += " Your " + inventory.pop() + " breaks."; //REMOVES LAST ITEM IN ARRAY AND RETURNS IT SO IT APPEARS IN YOUR STRING
        currentWeapon--; //--(INCREMENTING COMPOUND ASSIGNMENT)
    }
}

function getMonsterAttackValue(level) { //()=PARAMETER
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); //sets monster attack to 5x level -  random # between 0 and player's xp
    console.log(hit);
    return hit > 0 ? hit : 0;  //TERNARY OPERATOR IS A ONE LINE if-else STATEMENT (ENSURES NEGATIVE VALUES NOT RETURNED)
}

function dodge() { //()=PARAMETER
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function isMonsterHit() { //()=PARAMETER
    return Math.random() > .2 || health < 20; // ||(or OPERATOR)
}

function defeatMonster() { //()=PARAMETER
    gold += Math.floor(monsters[fighting].level * 6.7); //gold = gold + (monster.level x 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
 
function lose() { //()=PARAMETER
    update(locations[5]);
}

function winGame() { //()=PARAMETER
    update(locations[6]);
}

function restart() { //()=PARAMETER
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown()
}

function easterEgg() { //()=PARAMETER
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}


function pick(guess) { //()=PARAMETER
    const numbers = [];
    while (numbers.length < 10) { //while loop accepts a condition, and will run the code in the block until the condition is no longer true.
      numbers.push(Math.floor(Math.random() * 11)); //push a random number between 0 and 10 to the end of the numbers array
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // \n(causes the next part you add to text.innerText to appear on a new line)
    for (let i = 0; i < 10; i++) { //for(a,b,c)= a(initialization) b(condition/loop runs 10 times as i =0) c(final expression/increases iteration by 1 each loop)
      text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) { //.includes() determines if an array contains an element and will return either true or false
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose();
      }
    }
  }