let players = document.getElementsByTagName('ons-input'); // list of players
let playerNum = 0; // number of players
let playerArray = [];

// increase player count when user adds another player
// create an ons-input element for each new player with attributes
let addPlayer = function() {
    if (playerNum < 4) {
        playerNum++; // increase number of players by 1 each time "add player" is pressed
        const inputFields = document.getElementById('input-fields')
        const newPlayer = inputFields.appendChild(document.createElement('ons-input'));
        newPlayer.style.paddingBottom = '25px';
        newPlayer.style.fontSize = '18px';

        const attributes = {
            type: 'text',
            name: 'player',
            placeholder: 'Player ' + playerNum,
            modifier: 'material underbar',
            float: true,
        }
        setAttributes(newPlayer, attributes);
    }
    else {
        ons.notification.alert("Due to the nature of the game, we can only keep track of 4 players at a time. Add another name to an existing field for groups larger than 4.");
    }
    enableChooseRoles();
}

// set multiple attributes for each new ons-input field all at once
let setAttributes = function(element, attributes) {
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    })
}

let populatePlayerArray = function (player) {
    playerArray.push(player);
}

// save player details to session storage
let savePlayersToStorage = function () {
    sessionStorage.setItem('Number of Players', playerNum);
    for (let i = 1; i < players.length + 1; i++) {
        const pl = players[i-1].value;
        populatePlayerArray(pl);
        if (pl === '') {
            ons.notification.alert('You must fill out each player\'s name to continue.');
            return;
        } else {
            sessionStorage.setItem('Player ' + i, pl);
        }
    }
    document.querySelector('#navigator').pushPage('roles.html', {data: {title: 'Roles'}});
}

let enableChooseRoles = function () {
    if (playerNum === 4) {
        document.getElementById('choose-roles').disabled = false;
    }
}

let resetPlayers = function() {
    playerNum = 0;
}

document.getElementById('players').innerHTML = `
    <template id="players.html">
        <ons-page id="players">
          <ons-toolbar>
            <div class="left"><ons-back-button onclick="resetPlayers()">Home</ons-back-button></div>
            <div class="center">Player Setup</div>
            <div class="right"><ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="ion-ios-contrast, material:md-brightness-6" size="25px"></ons-icon></ons-toolbar-button></div>
          </ons-toolbar>
          <section style="text-align: center">
            <h2>Add <b>players</b> below:</h2>
            <h3><i><b>Note:</b> At least 4 players' names must be added to be able to assign roles.</i></h3>
            <br/>
            <div id="input-fields" style="display: flex; align-items: center; flex-direction: column"></div>
            <div style="margin-top: 30px;">
                <ons-button id="add-player" onclick="addPlayer()">
                    <ons-icon icon="ion-ios-add-circle, material:md-plus-circle" size="25px" style="padding-right: 5px; vertical-align: middle"></ons-icon>
                    Add Player
                </ons-button>
            </div>
            <br/>
            <div>
                <ons-button id="choose-roles" disabled>
                    <ons-icon icon="ion-ios-people, material:md-accounts" size="25px" style="padding-right: 5px; vertical-align: middle"></ons-icon>
                    Choose Roles
                </ons-button>
            </div>
          </section>
        </ons-page>
    </template>
`