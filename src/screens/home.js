// clear session storage each time the app reloads
window.onload = function() {
    sessionStorage.clear();
}

document.getElementById('home').innerHTML = `
   <ons-navigator swipeable id="navigator" page="home.html"></ons-navigator>
      
   <template id="home.html">
       <ons-page id="homepage">
          <ons-toolbar>
            <div class="center" style="font-size: 20px !important;">Undecided?</div>
            <div class="right" tabindex="0">
                <ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="ion-ios-contrast, material:md-brightness-6" size="35px"></ons-icon></ons-toolbar-button>
            </div>
          </ons-toolbar>
          <section style="text-align: center; padding: 10px">
            <h1 tabindex="0">Welcome to the companion app for <i>Undecided?</i></h1>
            <p style="font-size: 20px; margin-top: 3px;" tabindex="0">Say goodbye to using spreadsheets to moderate the game <span role="img" aria-label="wave">👋</span></p>
            <div tabindex="0">
              <ons-button id="new-game"><ons-icon icon="fa-puzzle-piece" size="25px" style="padding-right: 5px; vertical-align: middle"></ons-icon aria-label="New Game">New Game</ons-button>
            </div>
            <br/>
            <div tabindex="0">
              <ons-button id="about"><ons-icon icon="ion-ios-help-circle, material:md-help" size="25px" style="padding-right: 5px; vertical-align: middle"></ons-icon aria-label="About">About</ons-button>
            </div>
            <br/>
            <div tabindex="0">
                <ons-button id="report-a-bug" onclick="ons.notification.alert('Bug reporting coming soon!')"><ons-icon icon="ion-ios-bug, material:md-bug" size="25px" style="padding-right: 5px; vertical-align: middle"></ons-icon aria-label="Report a Bug">Report a Bug</ons-button>
            </div>
          </section>
       </ons-page>
   </template>

`

// listen for UI-related events here
// e.g. if a user presses a button on a page to go to another page, the new page will be pushed to the navigator (and in some cases a function will also be called)
// this can also be used to handle updates to the HTML when a new page loads
document.addEventListener('init', function(event) {
    let page = event.target;

    if (page.id === 'homepage') {
        page.querySelector('ons-toolbar .center').innerHTML = 'Undecided?';
        page.querySelector('#new-game').onclick = function () {
            document.querySelector('#navigator').pushPage('players.html', {data: {title: 'Players'}});
        };
        page.querySelector('#about').onclick = function () {
            document.querySelector('#navigator').pushPage('about.html', {data: {title: 'About'}});
        }
    } else if (page.id === 'players') {
        page.querySelector('#choose-roles').onclick = function () {
            savePlayersToStorage();
        }
    } else if (page.id === 'roles') {
        loadPlayerNames();
        page.querySelector('#choose-scenario').onclick = function() {
            document.querySelector('#navigator').pushPage('scenarios.html', {data: {title: 'Scenarios'}});
        };
    } else if (page.id === 'scenarios') {
        // in case users would like to be reminded of what each scenario is about
        page.querySelector('#scenario-desc').onclick = function () {
            let sd = document.getElementById('scenario-descriptions');

            if (sd) {
                sd.show();
            } else {
                ons.createElement('scenario-descriptions.html', { append: true })
                    .then(function(dialog) {
                        dialog.show();
                    })
            }
        }

        page.querySelector('#start').onclick = function () {
            saveScenarioToStorage();
            document.querySelector('#navigator').pushPage('scorecard.html', {data: {title: sessionStorage.getItem('Scenario')}});
        };
    } else if (page.id === 'scorecard') {
        initialScoreSetup();
        setCurrentRound();
        currentScenario = sessionStorage.getItem('Scenario');
        setPlayerArray();
        setCurrentPlayer(orderedPlayerArray[0]);
        page.querySelector('ons-toolbar .center').innerHTML = sessionStorage.getItem('Scenario');
        page.querySelector('#help').onclick = function () {
            document.querySelector('#navigator').pushPage('how-to-play.html', {data: {title: 'How to Play'}});
        }
    } else if (page.id === 'about') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
});
