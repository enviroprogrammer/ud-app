let roll; // dice roll determining the fate of new staff or competitor commotion b cards

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
let compCommotionA = function() {
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

// roll the (virtual) dice!
let diceRoll = function() {
    const rolls = [1, 2, 3, 4, 5, 6];
    roll = rolls[Math.floor(Math.random() * rolls.length)];

    let dtns = document.getElementById('dt-new-staff');
    let acns = document.getElementById('ac-new-staff');
    let cca = document.getElementById('comp-commotion-a');
    let acccb = document.getElementById('ac-comp-commotion-b');

    // new staff card (dystalk version) played
    if (dtns && currentScenario === 'DysTalk 📞') {
        dtns.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert('You rolled ' + roll + `! Your new teammate learns quickly.<br/><br/>Systems architect ${sessionStorage.getItem('Systems Architect')} receives an extra 4 points, and tech lead ${sessionStorage.getItem('Technical Lead')} receives an extra 2 points. Amazing!`)
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score += 4;
                        techLeadP1Score += 2;
                        totalPhase1Score = sysArchP1Score + techLeadP1Score + teamLeadP1Score + uxLeadP1Score;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score += 4;
                        techLeadP2Score += 2;
                        totalPhase2Score = sysArchP2Score + techLeadP2Score + teamLeadP2Score + uxLeadP2Score;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score += 4;
                        techLeadP3Score += 2;
                        totalPhase3Score = sysArchP3Score + techLeadP3Score + teamLeadP3Score + uxLeadP3Score;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert('You rolled ' + roll + `! Unfortunately, your new teammate messes things up. Systems architect ${sessionStorage.getItem('Systems Architect')} and tech lead ${sessionStorage.getItem('Technical Lead')} both lose 2 points.`)
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;
                        totalPhase1Score = techLeadP1Score + sysArchP1Score + teamLeadP1Score + uxLeadP1Score;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;
                        totalPhase2Score = techLeadP2Score + sysArchP2Score + teamLeadP2Score + uxLeadP2Score;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;
                        totalPhase3Score = teamLeadP3Score + techLeadP3Score + uxLeadP3Score + sysArchP3Score;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        }
        // competitor commotion a played
    } else if (cca) {
        cca.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert(`You rolled: ${roll}.<br/><br/>Your teammate stays! Carry on.`)
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                })
                .then(() => {
                    apTableSetup();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert(`You rolled: ${roll}.<br/><br/>Your teammate has unfortunately fallen victim to your competitor and decides to join them. Systems architect ${sessionStorage.getItem('Systems Architect')}, tech lead ${sessionStorage.getItem('Technical Lead')}, and team lead ${sessionStorage.getItem('Team Lead')} all lose 2 points.`)
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;
                        teamLeadP1Score -= 2;
                        totalPhase1Score = sysArchP1Score + techLeadP1Score + teamLeadP1Score + uxLeadP1Score;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;
                        teamLeadP2Score -= 2;
                        totalPhase2Score = sysArchP2Score + techLeadP2Score + teamLeadP2Score + uxLeadP2Score;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;
                        teamLeadP3Score -= 2;
                        totalPhase3Score = sysArchP3Score + techLeadP3Score + teamLeadP3Score + uxLeadP3Score;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        }
    } else if (acccb && currentScenario === 'Angry Cats 🐱') {
        acccb.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert(`You rolled: ${roll}.<br/><br/>Your competitor's game turns out to be a flop!<br/><br/>UX lead ${sessionStorage.getItem('UX Lead')} gets 4 points and everyone receives an additional AP point.`)
                .then(() => {
                    if (currentPhase === 1) {
                        uxLeadP1Score += 4;
                        totalPhase1Score = teamLeadP1Score + techLeadP1Score + uxLeadP1Score + sysArchP1Score;
                        teamLeadApScore++;
                        techLeadApScore++;
                        sysArchApScore++;
                        uxLeadApScore++;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase1ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 2) {
                        uxLeadP2Score += 4;
                        totalPhase2Score = teamLeadP2Score + techLeadP2Score + uxLeadP2Score + sysArchP2Score;
                        teamLeadApScore++;
                        techLeadApScore++;
                        sysArchApScore++;
                        uxLeadApScore++;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase2ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 3) {
                        uxLeadP3Score += 4;
                        totalPhase3Score = teamLeadP3Score + techLeadP3Score + uxLeadP3Score + sysArchP3Score;
                        teamLeadApScore++;
                        techLeadApScore++;
                        sysArchApScore++;
                        uxLeadApScore++;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase3ScoreSetup();
                        apTableSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert(`You rolled: ${roll}.<br/><br/>It turns out that your competitor's game is a big hit, rivaling <i>Angry Cats</i>!<br/><br/>Unfortunately, UX lead ${sessionStorage.getItem('UX Lead')} loses 4 points and everyone also loses an AP point.`)
                .then(() => {
                    if (currentPhase === 1) {
                        uxLeadP1Score -= 4;
                        totalPhase1Score = teamLeadP1Score + techLeadP1Score + uxLeadP1Score + sysArchP1Score;
                        uxLeadApScore--;
                        teamLeadApScore--;
                        techLeadApScore--;
                        sysArchApScore--;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase1ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 2) {
                        uxLeadP2Score -= 4;
                        totalPhase2Score = teamLeadP2Score + techLeadP2Score + uxLeadP2Score + sysArchP2Score;

                        uxLeadApScore--;
                        teamLeadApScore--;
                        techLeadApScore--;
                        sysArchApScore--;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;

                        phase2ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 3) {
                        uxLeadP3Score -= 4;
                        totalPhase3Score = teamLeadP3Score + techLeadP3Score + uxLeadP3Score + sysArchP3Score;
                        uxLeadApScore--;
                        teamLeadApScore--;
                        techLeadApScore--;
                        sysArchApScore--;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;

                        phase3ScoreSetup();
                        apTableSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        }
    } else if (acns && currentScenario === 'Angry Cats 🐱') {
        acns.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert(`You rolled: ${roll}.<br/><br/>Your new teammate learns quickly.<br/><br/>Systems architect ${sessionStorage.getItem('Systems Architect')}, UX lead ${sessionStorage.getItem('UX Lead')}, and tech lead ${sessionStorage.getItem('Technical Lead')} all receive an extra 2 points. Amazing!`)
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score += 2;
                        uxLeadP1Score += 2;
                        techLeadP1Score += 2;
                        totalPhase1Score = teamLeadP1Score + techLeadP1Score + uxLeadP1Score + sysArchP1Score;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score += 2;
                        uxLeadP2Score += 2;
                        techLeadP2Score += 2;
                        totalPhase2Score = teamLeadP2Score + techLeadP2Score + uxLeadP2Score + sysArchP2Score;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score += 2;
                        uxLeadP3Score += 2;
                        techLeadP3Score += 2;
                        totalPhase3Score = teamLeadP3Score + techLeadP3Score + uxLeadP3Score + sysArchP3Score;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert('You rolled ' + roll + `! Unfortunately, your new teammate messes things up. Systems architect ${sessionStorage.getItem('Systems Architect')}, tech lead ${sessionStorage.getItem('Technical Lead')}, and team lead ${sessionStorage.getItem('Team Lead')} all lose 2 points.`)
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;
                        teamLeadP1Score -= 2;
                        totalPhase1Score = sysArchP1Score + techLeadP1Score + teamLeadP1Score + uxLeadP1Score;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;
                        teamLeadP2Score -= 2;
                        totalPhase2Score = sysArchP2Score + techLeadP2Score + teamLeadP2Score + uxLeadP2Score;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;
                        teamLeadP3Score -= 2;
                        totalPhase3Score = sysArchP3Score + techLeadP3Score + teamLeadP3Score + uxLeadP3Score;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    setCurrentRound();
                });
        }
    }
}