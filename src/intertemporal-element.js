let cardWithITElement; // card with intertemporal element
let ieCounter = 0; // for intertemporal elements; count up to 4 weeks
let ieAlert; // alert message that shows up each time the intertemporal element from a card is applied
let weeks; // how many weeks do intertemporal effects take place?
let ie; // intertemporal element from card to be applied

let setCardWithITElement = function(card) {
    if (cardObj.cards[cardIndex].intertemporalElement) {
        cardWithITElement = card;
        sessionStorage.setItem('Card with Intertemporal Element', cardWithITElement);
        sessionStorageSetup();
    }
}

// if a card has an intertemporal element,
// scores will automatically change over the next 4 weeks
// a dialog box pops up each time the intertemporal element is applied.
let intertemporalElement = function (card) {
    getCardIndex(card);

    ie = cardObj.cards[cardIndex].intertemporalElement;
    weeks = Number(cardObj.cards[cardIndex].intertemporalElement["weeks"]);

    if (noPointsCounted === 'no') {
        // intertemporal effect begins the week after the card was played
        if (ieCounter === 0) {
            ieCounter = 1;
        } else if (ieCounter >= 1 && ieCounter < weeks + 1) {
            if (facilitatorModeOn) {
                ieAlert = ons.notification.alert(`Intertemporal effect from ${cardWithITElement} added:<br/><br/>Team: ${ie["team"]}<br/>Process: ${ie["process"]}<br/>Internal: ${ie["internal"]}<br/>External: ${ie["external"]}`);
            } else {
                ieAlert = ons.notification.alert(`Intertemporal effect from ${cardWithITElement} added.`);
            }


            if (currentPhase === 1) {
                teamLeadP1Score += ie["team"];
                techLeadP1Score += ie["process"];
                sysArchP1Score += ie["internal"];
                uxLeadP1Score += ie["external"];
                totalPhase1Score = teamLeadP1Score + techLeadP1Score + sysArchP1Score + uxLeadP1Score;

                ieAlert.then(() => {
                    phase1ScoreSetup();
                });
            } else if (currentPhase === 2) {
                teamLeadP2Score += ie["team"];
                techLeadP2Score += ie["process"];
                sysArchP2Score += ie["internal"];
                uxLeadP2Score += ie["external"];
                totalPhase2Score = teamLeadP2Score + techLeadP2Score + uxLeadP2Score + sysArchP2Score;

                ieAlert.then(() => {
                    phase2ScoreSetup();
                });
            } else if (currentPhase === 3) {
                teamLeadP3Score += ie["team"];
                techLeadP3Score += ie["process"];
                sysArchP3Score += ie["internal"];
                uxLeadP3Score += ie["external"];
                totalPhase3Score = teamLeadP3Score + techLeadP3Score + uxLeadP3Score + sysArchP3Score;

                ieAlert.then(() => {
                    phase3ScoreSetup();
                });
            }
            ieCounter++;
        } else {
            cardWithITElement = ''; // reset card with IT element so another similar card can be played
            ieCounter = 0; // reset counter to allow another card with IT element to be played
        }
    }
}