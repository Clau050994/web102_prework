/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(GAMES_JSON) {

    for(let i=0; i< GAMES_JSON.length; i++){
        let currentGame= GAMES_JSON[i];


        let gameCard = document.createElement('div');

        gameCard.classList.add('game-card');
        
        gameCard.innerHTML = `
        <h2>${currentGame.name}</h2>
        <img src="${currentGame.img}" alt="${currentGame.name}" class="game-img" />
        <p>Description: ${currentGame.description}</p>
        <p>Pledged: $${currentGame.pledged}</p>
        <p>Goal: $${currentGame.goal}</p>
    `;
    

        gamesContainer.appendChild(gameCard);
    }

    
    // add the class game-card to the list
    
    
    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    
    
    // append the game to the games-container
    
}
       

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);


// Format the totalContributions number with commas using toLocaleString
const formattedTotalContributions = totalContributions.toLocaleString('en-US');

// Update the content of the contributionsCard element with the formatted number
contributionsCard.textContent = formattedTotalContributions;





// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc,games) =>{
return acc + games.pledged;
},0)


// set inner HTML using template literal
// Format the totalRaised number with commas and add a dollar sign
const formattedTotalRaised = "$" + totalRaised.toLocaleString('en-US');

// Update the content of the raisedCard element with the formatted number
raisedCard.textContent = formattedTotalRaised;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");


// use reduce() to count the total number of games
const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc + 1; // Add 1 for each game
}, 0);

// Update the content of the gamesCard element
gamesCard.textContent = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const gamesUnderGoal = GAMES_JSON.filter((game) => {
        console.log(`Pledged: ${game.pledged}, Goal: ${game.goal}`);
        return game.pledged < game.goal;
    });

    // Check how many games meet the filter condition
    console.log(`Number of unfunded games: ${gamesUnderGoal.length}`);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesUnderGoal);
}
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
 // use filter() to get a list of games that have not yet met their goal
 const gamesMeetGoal = GAMES_JSON.filter((game) => {
    console.log(`Pledged: ${game.pledged}, Goal: ${game.goal}`);
    return game.pledged >= game.goal;
});

// Check how many games meet the filter condition
console.log(`Number of funded games: ${gamesMeetGoal.length}`);

// use the function we previously created to add the unfunded games to the DOM
addGamesToPage(gamesMeetGoal);

}
filterFundedOnly()


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section

const unfundedBtn = document.getElementById("unfunded-btn"); // Corrected ID
const fundedBtn = document.getElementById("funded-btn"); // Corrected ID
const allGamesBtn = document.getElementById("all-btn"); // Corrected ID

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allGamesBtn.addEventListener("click", showAllGames);

// ...rest of your code...


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const statement = `A total of $${totalRaised} has been raised for ${totalGames} games. Currently, there ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} unfunded ${unfundedGamesCount === 1 ? 'game' : 'games'} remaining.`;

// create a new DOM element containing the template string and append it to the description container
const description = document.createElement('p');
description.innerHTML = statement;
descriptionContainer.appendChild(description);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [mostFundedGame, secondMostFundedGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstWordMostFunded = mostFundedGame.name.split(' ')[0];
const firstWordSecondMostFunded = secondMostFundedGame.name.split(' ')[0];
// Create elements for the top funded and second most funded games
const topGameElement = document.createElement('p');
const secondTopGameElement = document.createElement('p');

// Set the text content of these elements
topGameElement.textContent = mostFundedGame.name;
secondTopGameElement.textContent = secondMostFundedGame.name;

// Append these elements to the respective containers
firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(secondTopGameElement);