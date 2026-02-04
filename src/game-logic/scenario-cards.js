// functions for scenario-specific cards

// for New Staff, players roll the dice by clicking on the dice button in the dialog box.
// based on the number they rolled, the new hire will either be successful or unsuccessful
// for dystalk scenario
let dystalkNewStaff = function() {
    let dtns = document.getElementById('dt-new-staff');

    if (dtns) {
        dtns.show();
    } else {
        ons.createElement('dt-new-staff.html', {append: true})
            .then(function(dialog) {
                dialog.show();
            });
    }
}

// for angry cats scenario
let angryCatsNewStaff = function() {
    let acns = document.getElementById('ac-new-staff');

    if (acns) {
        acns.show();
    } else {
        ons.createElement('ac-new-staff.html', {append: true})
            .then(function(dialog) {
                dialog.show();
            });
    }
}

// similarly, for Competitor Commotion A, players roll the dice by clicking on the dice in the dialog box to roll
// their teammate either stays or leaves depending on the number rolled
let acCompCommotionA = function() {
    let cca = document.getElementById('comp-commotion-a');

    if (cca) {
        cca.show();
    } else {
        ons.createElement('comp-commotion-a.html', {append: true})
            .then(function(dialog) {
                dialog.show();
            });
    }
}

// Competitor Commotion B: Angry Cats version
let acCompCommotionB = function() {
    let acccb = document.getElementById('ac-comp-commotion-b');

    if (acccb) {
        acccb.show();
    } else {
        ons.createElement('ac-comp-commotion-b.html', {append: true})
            .then(function(dialog) {
                dialog.show();
            });
    }
}

// Competitor Commotion B (DysTalk)
let dtCompCommotionB = function () {
    ons.notification.alert(`Well done! You have successfully filed a legal complaint against your competitor and won the case.<br/><br/>Systems architect ${sessionStorage.getItem('Systems Architect')} gets 4 points, tech lead ${sessionStorage.getItem('Technical Lead')} gets 2 points, and team lead ${sessionStorage.getItem('Team Lead')} gets 3 points!`, {title: 'Competitor Commotion'})
        .then(() => {
            if (currentPhase === 1) {
                sysArchP1Score += 4;
                techLeadP1Score += 2;
                teamLeadP1Score += 3;

                totalSysArchScore += 4;
                totalTechLeadScore += 2;
                totalTeamLeadScore += 3;
                phase1ScoreSetup();
            } else if (currentPhase === 2) {
                sysArchP2Score += 4;
                techLeadP2Score += 2;
                teamLeadP2Score += 3;

                totalSysArchScore += 4;
                totalTechLeadScore += 2;
                totalTeamLeadScore += 3;
                phase2ScoreSetup();
            } else if (currentPhase === 3) {
                sysArchP3Score += 4;
                techLeadP3Score += 2;
                teamLeadP3Score += 3;

                totalSysArchScore += 4;
                totalTechLeadScore += 2;
                totalTeamLeadScore += 3;
                phase3ScoreSetup();
            }
        })
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Stakeholder Visit (DysTalk)
let dtStakeholderVisit = function () {
    ons.notification.alert('Pitch a narrative of your development progress to the facilitator to evaluate. If your narrative is a success, do nothing. If your narrative is a loss, lose 2 cards.', {title: 'Stakeholder Visit'})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Education Workshop (Angry Cats & DysTalk)
let edWorkshop = function () {
    ons.notification.confirm('To develop your team strength, your team spends the day in an Education Workshop. You can either play this card immediately by drawing 2 cards from the deck or add it to your hand.', {title: 'Education Workshop 📚', primaryButtonIndex: 0, buttonLabels: ['Play', 'Add to Hand'], callback: function (selected) {
            switch (selected) {
                case 0: // play immediately
                    cardWithITElement = 'Education Workshop'; // this is to make sure the intertemporal effect from the workshop is applied
                    if (currentPhase === 1) {
                        teamLeadP1Score += 5;
                        totalTeamLeadScore += 5;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        teamLeadP2Score += 5;
                        totalTeamLeadScore += 5;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        teamLeadP3Score += 5;
                        totalTeamLeadScore += 5;
                        phase3ScoreSetup();
                    }
                    break;
                case 1: // add to hand
                    break;
            }
        }})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            intertemporalElement(cardWithITElement);
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Teammate Troubles A (Angry Cats & DysTalk)
let teammateTroublesA = function () {
    ons.notification.alert('Oh no! One of your teammates came down with the flu, putting your whole team behind. <span role="img" aria-label="sick">🤢</span>', {title: 'Teammate Troubles'})
        .then(() => {
            if (currentPhase === 1) {
                teamLeadP1Score -= 2;
                sysArchP1Score -= 2;
                techLeadP1Score -= 2;

                totalTeamLeadScore -= 2;
                totalSysArchScore -= 2;
                totalTechLeadScore -= 2;
                phase1ScoreSetup();
            } else if (currentPhase === 2) {
                teamLeadP2Score -= 2;
                sysArchP2Score -= 2;
                techLeadP2Score -= 2;

                totalTeamLeadScore -= 2;
                totalSysArchScore -= 2;
                totalTechLeadScore -= 2;
                phase2ScoreSetup();
            } else if (currentPhase === 3) {
                teamLeadP3Score -= 2;
                sysArchP3Score -= 2;
                techLeadP3Score -= 2;

                totalTeamLeadScore -= 2;
                totalSysArchScore -= 2;
                totalTechLeadScore -= 2;
                phase3ScoreSetup();
            }
        })
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Teammate Troubles B (Angry Cats & DysTalk)
let teammateTroublesB = function () {
    ons.notification.alert('Oh no! One of your teammates came down with the flu, putting your whole team behind. <span role="img" aria-label="sick">🤢</span>', {title: 'Teammate Troubles'})
        .then(() => {
            if (currentPhase === 1) {
                teamLeadP1Score -= 1;
                sysArchP1Score -= 1;
                uxLeadP1Score -= 2;

                totalTeamLeadScore -= 1;
                totalSysArchScore -= 1;
                totalUXLeadScore -= 2;
                phase1ScoreSetup();
            } else if (currentPhase === 2) {
                teamLeadP2Score -= 1;
                sysArchP2Score -= 1;
                uxLeadP2Score -= 2;

                totalTeamLeadScore -= 1;
                totalSysArchScore -= 1;
                totalUXLeadScore -= 2;
                phase2ScoreSetup();
            } else if (currentPhase === 3) {
                teamLeadP3Score -= 1;
                sysArchP3Score -= 1;
                uxLeadP3Score -= 2;

                totalTeamLeadScore -= 1;
                totalSysArchScore -= 1;
                totalUXLeadScore -= 2;
                phase3ScoreSetup();
            }
        })
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Change Plans A (Angry Cats & DysTalk)
let changePlansA = function () {
    ons.notification.alert(`Your teammate has decided to rethink their strategy and possible next steps. As a result, you exchange your team's cards.<br/><br/>Replace your team's hand with the same number of cards.`, {title: 'Change Plans'})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Change Plans B (Angry Cats & DysTalk)
let changePlansB = function () {
    ons.notification.alert(`Your team has decided to rethink their strategy and possible next steps, but anticipate that the changes will be minor.<br/><br/>Lose one card from your team's hand.`, {title: 'Change of plans!'})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Pull All Nighter A (Angry Cats & DysTalk)
let pullAllNighterA = function () {
    ons.notification.confirm('Due to an unexpected issue, your team has to spend the night working. Add the card to your hand or play immediately.', {title: 'Pull All Nighter 🌙', primaryButtonIndex: 0, buttonLabels: ['Play', 'Add to Hand'], callback: function (selected) {
            switch (selected) {
                case 0: // play immediately
                    if (currentPhase === 1) {
                        teamLeadP1Score -= 2;
                        sysArchP1Score++;
                        techLeadP1Score -= 2
                        uxLeadP1Score += 5;

                        totalTeamLeadScore -= 2;
                        totalSysArchScore++;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 5;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        teamLeadP2Score -= 2;
                        sysArchP2Score++;
                        techLeadP2Score -= 2;
                        uxLeadP2Score += 5;

                        totalTeamLeadScore -= 2;
                        totalSysArchScore++;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 5;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        teamLeadP3Score -= 2;
                        sysArchP3Score++;
                        techLeadP3Score -= 2;
                        uxLeadP3Score += 5;

                        totalTeamLeadScore -= 2;
                        totalSysArchScore++;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 5;
                        phase3ScoreSetup();
                    }
                    break;
                case 1: // add to hand
                    break;
            }
        }})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}

// Pull All Nighter B (Angry Cats & DysTalk)
let pullAllNighterB = function () {
    ons.notification.alert('Due to an unexpected issue, your team has to spend the night working. Add the card to your hand or play immediately.', {title: 'Pull All Nighter 🌙', primaryButtonIndex: 0, buttonLabels: ['Play', 'Add to Hand'], callback: function (selected) {
            switch (selected) {
                case 0: // play immediately
                    if (currentPhase === 1) {
                        teamLeadP1Score -= 2;
                        techLeadP1Score -= 2;
                        uxLeadP1Score += 6;

                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 6;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        teamLeadP2Score -= 2;
                        techLeadP2Score -= 2;
                        uxLeadP2Score += 6;

                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 6;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        teamLeadP3Score -= 2;
                        techLeadP3Score -= 2;
                        uxLeadP3Score += 6;

                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        totalUXLeadScore += 6;
                        phase3ScoreSetup();
                    }
                    break;
                case 1: // add to hand
                    break;
            }
        }})
        .then(() => {
            cardApPoints();
        })
        .then(() => {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
            }
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
        .then(() => {
            apTableSetup();
        })
        .then(() => {
            handleTurns();
        });
}
