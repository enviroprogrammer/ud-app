let scenario; // the scenario to be used for the current session

// scenario will be saved to session storage which persists for that game session only
let saveScenarioToStorage = function(){
    // get list of available scenarios
    let scenarios = document.querySelectorAll('ons-list-item');

    // identify selected scenario by iterating over all scenarios
    scenarios.forEach(sc => {
        if (sc.querySelector('ons-radio[name=scenario]') && sc.querySelector('ons-radio[name=scenario]').checked) {
            scenario = sc.getElementsByTagName('label')[0].innerHTML;
            sessionStorage.setItem('Scenario', scenario);
        }
    });
}

let hideScenarioDescriptions = function() {
    let sd = document.getElementById('scenario-descriptions');

    if (sd) {
        sd.hide();
    }
}

// the start button is disabled by default; will be enabled once user makes a selection
let toggleButtonState = function() {
    let startButton = document.getElementById('start');
    startButton.disabled = false;
}

document.getElementById('scenarios').innerHTML = `
    <template id="scenarios.html">
        <ons-page id="scenarios">
            <ons-toolbar>
                <div class="left"><ons-back-button>Roles</ons-back-button></div>
                <div class="center" style="font-size: 20px !important;">Scenario Selection</div>
                <div class="right"><ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="ion-ios-contrast, material:md-brightness-6" size="35px"></ons-icon></ons-toolbar-button></div>
            </ons-toolbar>
            <section style="text-align: center">
                <h2>Choose the <b>scenario</b> you wish to play:</h2>
                  <ons-list>
                    <ons-list-item onclick="toggleButtonState()" tappable>
                      <label class="left">
                        <ons-radio name="scenario" input-id="angry-cats"></ons-radio>
                      </label>
                      <label for="angry-cats" class="center">Angry Cats 🐱</label>
                      <ons-input input-id="angry-cats"></ons-input>
                    </ons-list-item>
                    <ons-list-item onclick="toggleButtonState()" tappable>
                      <label class="left">
                        <ons-radio name="scenario" input-id="dystalk"></ons-radio>
                      </label>
                      <label for="dystalk" class="center">DysTalk 📞</label>
                      <ons-input input-id="dystalk"></ons-input>
                    </ons-list-item>
                    <ons-list-item onclick="toggleButtonState()" tappable>
                      <label class="left">
                        <ons-radio name="scenario" input-id="earthbook"></ons-radio>
                      </label>
                      <label for="earthbook" class="center">Earthbook 🌎</label>
                      <ons-input input-id="earthbook"></ons-input>
                    </ons-list-item>
                  </ons-list>
                  <div style="padding-top: 10px;">
                      <ons-button id="start" disabled>
                        <ons-icon icon="ion-ios-play, material:md-play" size="25px" style="vertical-align: middle; padding-right: 5px;"></ons-icon>
                        Start Game
                      </ons-button>
                  </div>
                  <br/>
                  <div>
                    <ons-button id="scenario-desc">
                        <ons-icon icon="ion-ios-information-circle, material:md-info" size="25px" style="vertical-align: middle; padding-right: 5px;"></ons-icon>
                        Scenario Descriptions
                    </ons-button>
                  </div>
            </section>
        </ons-page>
    </template>
    
    <template id="scenario-descriptions.html">
        <ons-alert-dialog id="scenario-descriptions">
            <div style="overflow-y: auto;">
                <div class="alert-dialog-title" style="font-size: 23px !important;">Scenarios</div>
                <div class="alert-dialog-content" style="font-size: 16px !important;">
                        <p><b>Angry Cats:</b> You work in a cross-functional team at a startup game studio, and you have just signed a contract with a notable publisher to develop and release a new game.</p>
                        <p><b>DysTalk:</b> You and your team have formed a startup to develop a secure communication and networking product.</p>
                        <p><b>Earthbook (new!):</b> Inspired by the influx of social media usage, especially for addressing environmental issues, you and a team of tech-savvy, eco-conscious folks have an idea for a new kind of social media where environmentalists can connect and uplift one another to make the environment better for generations to come.</p>
                </div>
                <div class="alert-dialog-footer">
                    <ons-alert-dialog-button onclick="hideScenarioDescriptions()">Back to Game</ons-alert-dialog-button>
                </div>
            </div>
        </ons-alert-dialog>
    </template>
`
