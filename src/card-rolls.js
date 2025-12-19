let roll; // dice roll determining the fate of new staff or competitor commotion b cards

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
            ons.notification.alert(`Your new teammate learns quickly.<br/>Systems architect ${sessionStorage.getItem('Systems Architect')} receives an extra 4 points, and tech lead ${sessionStorage.getItem('Technical Lead')} receives an extra 2 points. Amazing!`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score += 4;
                        techLeadP1Score += 2;

                        totalSysArchScore += 4;
                        totalUXLeadScore += 2;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score += 4;
                        techLeadP2Score += 2;

                        totalSysArchScore += 4;
                        totalUXLeadScore += 2;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score += 4;
                        techLeadP3Score += 2;

                        totalSysArchScore += 4;
                        totalUXLeadScore += 2;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    currentRound++;
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert(`Unfortunately, your new teammate messes things up. Systems architect ${sessionStorage.getItem('Systems Architect')} and tech lead ${sessionStorage.getItem('Technical Lead')} both lose 2 points.`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    currentRound++;
                    setCurrentRound();
                });
        }
        // competitor commotion a played
    } else if (cca) {
        cca.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert('Your teammate stays! Carry on.', {title: 'You rolled ' + roll + '! 🎲'})
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
            ons.notification.alert(`<br/>Your teammate has unfortunately fallen victim to your competitor and decides to join them. Systems architect ${sessionStorage.getItem('Systems Architect')}, tech lead ${sessionStorage.getItem('Technical Lead')}, and team lead ${sessionStorage.getItem('Team Lead')} all lose 2 points.`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;
                        teamLeadP1Score -= 2;

                        totalSysArchScore -= 2;
                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;
                        teamLeadP2Score -= 2;

                        totalSysArchScore -= 2;
                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;
                        teamLeadP3Score -= 2;

                        totalSysArchScore -= 2;
                        totalTeamLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    currentRound++;
                    setCurrentRound();
                });
        }
    } else if (acccb && currentScenario === 'Angry Cats 🐱') {
        acccb.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert(`<br/><br/>Your competitor's game turns out to be a flop!<br/>UX lead ${sessionStorage.getItem('UX Lead')} gets 4 points and everyone receives an additional AP point.`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        uxLeadP1Score += 4;
                        totalUXLeadScore += 4;

                        teamLeadApScore++;
                        techLeadApScore++;
                        sysArchApScore++;
                        uxLeadApScore++;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase1ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 2) {
                        uxLeadP2Score += 4;
                        totalUXLeadScore += 4;

                        teamLeadApScore++;
                        techLeadApScore++;
                        sysArchApScore++;
                        uxLeadApScore++;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
                        phase2ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 3) {
                        uxLeadP3Score += 4;
                        totalUXLeadScore += 4;

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
                    currentRound++;
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert(`It turns out that your competitor's game is a big hit, rivaling <i>Angry Cats</i>!<br/>Unfortunately, UX lead ${sessionStorage.getItem('UX Lead')} loses 4 points and everyone also loses an AP point.`, {title: 'You rolled: ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        uxLeadP1Score -= 4;
                        totalUXLeadScore -= 4;

                        uxLeadApScore--;
                        teamLeadApScore--;
                        techLeadApScore--;
                        sysArchApScore--;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;

                        phase1ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 2) {
                        uxLeadP2Score -= 4;
                        totalUXLeadScore -= 4;

                        uxLeadApScore--;
                        teamLeadApScore--;
                        techLeadApScore--;
                        sysArchApScore--;
                        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;

                        phase2ScoreSetup();
                        apTableSetup();
                    } else if (currentPhase === 3) {
                        uxLeadP3Score -= 4;
                        totalUXLeadScore -= 4;

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
                    currentRound++;
                    setCurrentRound();
                });
        }
    } else if (acns && currentScenario === 'Angry Cats 🐱') {
        acns.remove();
        if (roll >= 1 && roll <= 3) {
            ons.notification.alert(`Your new teammate learns quickly.<br/>Systems architect ${sessionStorage.getItem('Systems Architect')}, UX lead ${sessionStorage.getItem('UX Lead')}, and tech lead ${sessionStorage.getItem('Technical Lead')} all receive an extra 2 points. Amazing!`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score += 2;
                        uxLeadP1Score += 2;
                        techLeadP1Score += 2;

                        totalSysArchScore += 2;
                        totalUXLeadScore += 2;
                        totalTechLeadScore += 2;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score += 2;
                        uxLeadP2Score += 2;
                        techLeadP2Score += 2;

                        totalSysArchScore += 2;
                        totalUXLeadScore += 2;
                        totalTechLeadScore += 2;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score += 2;
                        uxLeadP3Score += 2;
                        techLeadP3Score += 2;

                        totalSysArchScore += 2;
                        totalUXLeadScore += 2;
                        totalTechLeadScore += 2;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    currentRound++;
                    setCurrentRound();
                });
        } else if (roll >= 4 && roll <= 6) {
            ons.notification.alert(`Unfortunately, your new teammate messes things up. Systems architect ${sessionStorage.getItem('Systems Architect')}, tech lead ${sessionStorage.getItem('Technical Lead')}, and team lead ${sessionStorage.getItem('Team Lead')} all lose 2 points.`, {title: 'You rolled ' + roll + '! 🎲'})
                .then(() => {
                    if (currentPhase === 1) {
                        sysArchP1Score -= 2;
                        techLeadP1Score -= 2;
                        teamLeadP1Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase1ScoreSetup();
                    } else if (currentPhase === 2) {
                        sysArchP2Score -= 2;
                        techLeadP2Score -= 2;
                        teamLeadP2Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase2ScoreSetup();
                    } else if (currentPhase === 3) {
                        sysArchP3Score -= 2;
                        techLeadP3Score -= 2;
                        teamLeadP3Score -= 2;

                        totalSysArchScore -= 2;
                        totalUXLeadScore -= 2;
                        totalTechLeadScore -= 2;
                        phase3ScoreSetup();
                    }
                })
                .then(() => {
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                })
                .then(() => {
                    currentRound++;
                    setCurrentRound();
                });
        }
    }
}