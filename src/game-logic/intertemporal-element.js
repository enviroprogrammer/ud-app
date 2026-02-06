let cardWithITElement = ''; // card with intertemporal element
let ieCounter = 0; // for intertemporal elements; count up to 4 weeks
let ieAlert; // alert message that shows up each time the intertemporal element from a card is applied
let weeks; // how many weeks do intertemporal effects take place?
let ie; // intertemporal element from card to be applied

let setCardWithITElement = function(card) {
    if (cardObj.cards[cardIndex].intertemporalElement && cardWithITElement === '') { // scanned card has an intertemporal element
        cardWithITElement = card;
        sessionStorage.setItem('Card with Intertemporal Element', cardWithITElement);
        sessionStorageSetup();
    }
}

// if a card has an intertemporal element,
// scores will automatically change over the next 4 weeks
// a dialog box pops up each time the intertemporal element is applied as a reminder for the players
let intertemporalElement = function (card) {
    getCardIndex(card);

    ie = cardObj.cards[cardIndex].intertemporalElement;
    weeks = Number(cardObj.cards[cardIndex].intertemporalElement["weeks"]);

    // intertemporal effect begins the week after the card was played
    // if (noPointsCounted === 'no') {
        if (ieCounter === 0) {
            ieCounter++;
        } else if (ieCounter >= 1 && ieCounter < weeks + 1) {
            console.log('intertemporal effect counter: ' + ieCounter);
            if (facilitatorModeOn) { // display score values from intertemporal element
                ieAlert = ons.notification.alert(`Intertemporal effect from ${cardWithITElement} added:<br/><br/>Team: ${ie["team"]}<br/>Process: ${ie["process"]}<br/>Internal: ${ie["internal"]}<br/>External: ${ie["external"]}`);
            } else { // do not reveal score values from intertemporal element; just let players know it's been added
                ieAlert = ons.notification.alert(`Intertemporal effect from ${cardWithITElement} added.`);
            }

            if (currentPhase === 1) {
                teamLeadP1Score += ie["team"];
                techLeadP1Score += ie["process"];
                sysArchP1Score += ie["internal"];
                uxLeadP1Score += ie["external"];

                totalTeamLeadScore += ie["team"];
                totalTechLeadScore += ie["process"];
                totalSysArchScore += ie["internal"];
                totalUXLeadScore += ie["external"];

                if (totalTeamLeadScore >= 10 && totalTechLeadScore >= 10 && totalSysArchScore >= 10 && totalUXLeadScore >= 10) {
                    ieAlert.then(() => {
                        triggerMajorEvent();
                    })
                        .then(() => {
                            phase1ScoreSetup();
                        })
                } else {
                    ieAlert.then(() => {
                        phase1ScoreSetup();
                    });
                }
            } else if (currentPhase === 2) {
                teamLeadP2Score += ie["team"];
                techLeadP2Score += ie["process"];
                sysArchP2Score += ie["internal"];
                uxLeadP2Score += ie["external"];

                totalTeamLeadScore += ie["team"];
                totalTechLeadScore += ie["process"];
                totalSysArchScore += ie["internal"];
                totalUXLeadScore += ie["external"];

                ieAlert.then(() => {
                    phase2ScoreSetup();
                });
            } else if (currentPhase === 3) {
                teamLeadP3Score += ie["team"];
                techLeadP3Score += ie["process"];
                sysArchP3Score += ie["internal"];
                uxLeadP3Score += ie["external"];

                totalTeamLeadScore += ie["team"];
                totalTechLeadScore += ie["process"];
                totalSysArchScore += ie["internal"];
                totalUXLeadScore += ie["external"];

                ieAlert.then(() => {
                    phase3ScoreSetup();
                })
            }
            ieCounter++;
        }
    if (ieCounter >= weeks + 1) {
        ieCounter = 0; // reset counter to allow another card with an intertemporal element to be played
        cardWithITElement = ''; // reset card with intertemporal element so another similar card can be played
    }
}