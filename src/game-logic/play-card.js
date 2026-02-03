let usCardPlayedInP1 = false; // check if a user studies card has been played in phase 1
let anCardPlayedInP1 = false; // check if an all nighter card has been played in phase 1
let adCardPlayedInP1 = false; // check if an architectural design card has been played in phase 1
let saCardPlayedInP2 = false; // check if a software arch card has been played in p2
let usCardPlayedInP3 = false; // check if a user studies card has been played in phase 3
let playedCards = [];

let playCard = function() {
    if (playedCard) {
        sessionStorage.setItem('Played Card', playedCard);
        playedCards.push(playedCard);
        switch (playedCard) {
            // blank cards
            case 'Blank A':
            case 'Blank B':
            case 'Blank C':
            case 'Blank D':
            case 'Blank E':
                if (totalApScore <= 0) {
                    ons.notification.alert('You do not have enough AP points to distribute among players.');
                } else {
                    showBlankCardDialog();
                }

                cardApPoints();
                handleTurns();
                break;
            // action cards
            case 'New Staff':
                if (currentScenario === 'DysTalk 📞') {
                    dystalkNewStaff();
                    cardApPoints();
                    handleTurns();
                } else if (currentScenario === 'Angry Cats 🐱') {
                    angryCatsNewStaff();
                    cardApPoints();
                    handleTurns();
                } else if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                }
                break;
            case 'Competitor Commotion A':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    acCompCommotionA();
                    cardApPoints();
                    handleTurns();
                }
                break;
            case 'Competitor Commotion B':
                if (currentScenario === 'DysTalk 📞') {
                    dtCompCommotionB();
                } else if (currentScenario === 'Angry Cats 🐱') {
                    acCompCommotionB();
                    cardApPoints();
                    handleTurns();
                } else if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                }
                break;
            case 'Stakeholder Visit':
                if (currentScenario === 'DysTalk 📞') {
                    dtStakeholderVisit();
                } else if (currentScenario === 'Angry Cats 🐱') {
                    ons.notification.alert(`This card is not yet playable with <i>Angry Cats</i>!`);
                } else if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                }
                break;
            case 'Education Workshop':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    edWorkshop();
                }
                break;
            case 'Teammate Troubles A':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    teammateTroublesA();
                }
                break;
            case 'Teammate Troubles B':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    teammateTroublesB();
                }
                break;
            case 'Change Plans A':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    changePlansA();
                }
                break;
            case 'Change Plans B':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else if (currentScenario === 'DysTalk 📞') {
                    ons.notification.alert(`This card is not yet playable with <i>DysTalk</i>!`);
                } else {
                    changePlansB();
                }
                break;
            case 'Pull All Nighter A':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    pullAllNighterA();
                }
                break;
            case 'Pull All Nighter B':
                if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                } else {
                    pullAllNighterB();
                }
                break;
            default: // regular cards
                if (currentPhase === 1) {
                    cardApPoints();
                    roleRelatedBonuses(playedCard);
                    roleApPointsByCard(playedCard);

                    // card has an intertemporal element
                    setCardWithITElement(playedCard);

                    // if (noPointsCounted === 'yes') {
                    //     noPointsCounted = 'no';
                    // }

                    if (playedCard === 'User Studies A' || playedCard === 'User Studies B') {
                        usCardPlayedInP1 = true;
                    }

                    if (playedCard === 'Pull All Nighter A' || playedCard === 'Pull All Nighter B') {
                        anCardPlayedInP1 = true;
                    }

                    if (playedCard === 'Architectural Design A' || playedCard === 'Architectural Design B') {
                        adCardPlayedInP1 = true;
                    }

                    phase1RoleAP();
                    twoInARow();
                    updatePhase1Scores(playedCard);
                    handleTurns();
                } else if (currentPhase === 2) {
                    cardApPoints();
                    roleRelatedBonuses(playedCard);
                    roleApPointsByCard(playedCard);

                    // card has an intertemporal element
                    setCardWithITElement(playedCard);

                    if (playedCard === 'Software Architecture Review A' || playedCard === 'Software Architecture Review B') {
                        saCardPlayedInP2 = true;
                    }

                    phase2RoleAP();
                    twoInARow();
                    updatePhase2Scores(playedCard);
                    handleTurns();
                } else if (currentPhase === 3) {
                    cardApPoints();
                    roleRelatedBonuses(playedCard);
                    roleApPointsByCard(playedCard);

                    // card has an intertemporal element
                    setCardWithITElement(playedCard);

                    // if (noPointsCounted === 'yes') {
                    //     noPointsCounted = 'no';
                    // }

                    if (playedCard === 'User Studies A' || playedCard === 'User Studies B') {
                        usCardPlayedInP3 = true;
                    }

                    phase3RoleAP();
                    twoInARow();
                    updatePhase3Scores(playedCard);
                    handleTurns();
                }
        }

        if (document.getElementById('qr-code-scanner')) {
            document.getElementById('qr-code-scanner').remove(); // remove scanner dialog from dom to prepare for scanning the next qr code
        }

        hidePlayCardDialog();
    }
}

let showPlayCardDialog = function(card) {
    let pcd = document.getElementById('play-card-dialog');
    playedCard = card.trim();

    if (pcd) {
        pcd.show();
    } else {
        ons.createElement('play-card-dialog.html', { append: true })
            .then(function(dialog) {
                document.getElementById('qr-card').innerHTML = `You scanned: ${playedCard}`;
                document.getElementById('qr-result').innerHTML = `Are you sure you want to play ${playedCard}?`; // some card names (pulled from scanning QR codes) have trailing white space; trim() is used to remove it
                dialog.show();
            })
            .then(() => {
                hideScannerDialog(); // hide dialog so users can keep scrolling up and down
            });
    }
}

let hidePlayCardDialog = function() {
    let pcd = document.getElementById('play-card-dialog');
    let qr = document.getElementById('qr-code-scanner');

    if (qr) {
        document.getElementById('qr-code-scanner').remove(); // remove scanner from dom to prepare for next scan
    }

    if (pcd) {
        pcd.remove();
        playedCard = ''; // reset played card
    }
}