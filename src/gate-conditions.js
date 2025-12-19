// gate conditions for Angry Cats
// Phase 1
const acSysArchP1 = 6;
const acUXLeadP1 = 13;
const acTechLeadP1 = 7;
const acTeamLeadP1 = 12;
// Phase 2
const acSysArchP2 = 24;
const acUXLeadP2 = 27;
const acTechLeadP2 = 24;
const acTeamLeadP2 = 23;
// Phase 3
const acSysArchP3 = 40;
const acUXLeadP3 = 40;
const acTechLeadP3 = 38;
const acTeamLeadP3 = 38;

// gate conditions for DysTalk
// Phase 1
const dtSysArchP1 = 12;
const dtUXLeadP1 = 9;
const dtTechLeadP1 = 6;
const dtTeamLeadP1 = 11;
// Phase 2
const dtSysArchP2 = 25;
const dtUXLeadP2 = 25;
const dtTechLeadP2 = 27;
const dtTeamLeadP2 = 20;
// Phase 3
const dtSysArchP3 = 35;
const dtUXLeadP3 = 40;
const dtTechLeadP3 = 34;
const dtTeamLeadP3 = 40;

// gate conditions for Earthbook
// Phase 1
const ebSysArchP1 = 6;
const ebUXLeadP1 = 15;
const ebTechLeadP1 = 9;
const ebTeamLeadP1 = 14;

// Phase 1 (condensed)
// const ebSysArchP1 = 3;
// const ebUXLeadP1 = Math.floor(15 / 2);
// const ebTechLeadP1 = Math.floor(9 / 2);
// const ebTeamLeadP1 = 7;

// Phase 2
const ebSysArchP2 = 22;
const ebUXLeadP2 = 30;
const ebTechLeadP2 = 24;
const ebTeamLeadP2 = 25;

// Phase 2 (condensed)
// const ebSysArchP2 = 11;
// const ebUXLeadP2 = 15;
// const ebTechLeadP2 = 12;
// const ebTeamLeadP2 = Math.floor(25 / 2);

// Phase 3
const ebSysArchP3 = 41;
const ebUXLeadP3 = 41;
const ebTechLeadP3 = 39;
const ebTeamLeadP3 = 39;

// Phase 3 (condensed)
// const ebSysArchP3 = Math.floor(41 / 2);
// const ebUXLeadP3 = Math.floor(41 / 2);
// const ebTechLeadP3 = Math.floor(39 / 2);
// const ebTeamLeadP3 = Math.floor(39 / 2);

let hideGateCheckDialog = function() {
    let gc = document.getElementById('gate-check');

    if (gc) {
        gc.remove();
    }
}

let passPhase = function() {
    hideGateCheckDialog();
    switch (currentPhase) {
        case 1: // pass phase 1
            ons.notification.alert(`Congratulations! You have successfully passed Phase 1! 4 AP points have been awarded to everyone. An extra 3 AP points have been awarded to the player with the best narrative, ${winner}.`, {title: 'You passed! 🎊'})
                .then(() => {
                    teamLeadApScore += 4;
                    techLeadApScore += 4;
                    sysArchApScore += 4;
                    uxLeadApScore += 4;
                    totalApScore += 16;
                    apTableSetup();
                })
                .then(() => {
                    switch (winner) {
                        case (players[0]): // team lead
                            teamLeadApScore += 3;
                            break;
                        case (players[1]): // tech lead
                            techLeadApScore += 3;
                            break;
                        case (players[2]): // sys arch
                            sysArchApScore += 3;
                            break;
                        case (players[3]): // ux lead
                            uxLeadApScore += 3;
                            break;
                    }
                    apTableSetup();
                })
                .then(() => {
                    // carry over scores from previous phase to new phase
                    teamLeadP2Score = teamLeadP1Score;
                    techLeadP2Score = techLeadP1Score;
                    sysArchP2Score = sysArchP1Score;
                    uxLeadP2Score = uxLeadP1Score;

                    totalTeamLeadScore += teamLeadP2Score;
                    totalTechLeadScore += techLeadP2Score;
                    totalSysArchScore += sysArchP2Score;
                    totalUXLeadScore += uxLeadP2Score;
                })
                .then(() => {
                    startNewPhase();
                })
                .then(() => {
                    phase2ScoreSetup();
                })
            break;
        case 2: // pass phase 2
            ons.notification.alert(`Congratulations! You have successfully passed Phase 2! 4 AP points have been awarded to everyone. An extra 3 AP points have been awarded to the player with the best narrative, ${winner}.`, {title: 'You passed! 🎊'})
                .then(() => {
                    teamLeadApScore += 4;
                    techLeadApScore += 4;
                    sysArchApScore += 4;
                    uxLeadApScore += 4;
                    totalApScore += 16;
                    apTableSetup();
                })
                .then(() => {
                    switch (winner) {
                        case (players[0]): // team lead
                            teamLeadApScore += 3;
                            break;
                        case (players[1]): // tech lead
                            techLeadApScore += 3;
                            break;
                        case (players[2]): // sys arch
                            sysArchApScore += 3;
                            break;
                        case (players[3]):
                            uxLeadApScore += 3;
                            break;
                    }
                    apTableSetup();
                })
                // .then(() => {
                //     if (cardWithITElement) {
                //         intertemporalElement(cardWithITElement);
                //     }
                // })
                .then(() => {
                    startNewPhase();
                    futureEffectTriggered = 'yes';
                    futureEffect();
                })
                .then(() => {
                    // carry over scores from previous phase to new phase
                    teamLeadP3Score = teamLeadP2Score;
                    techLeadP3Score = techLeadP2Score;
                    sysArchP3Score = sysArchP2Score;
                    uxLeadP3Score = uxLeadP2Score;

                    totalTeamLeadScore += teamLeadP3Score;
                    totalTechLeadScore += techLeadP3Score;
                    totalSysArchScore += sysArchP3Score;
                    totalUXLeadScore += uxLeadP3Score;
                })
                .then(() => {
                    phase3ScoreSetup();
                })
            break;
        case 3: // pass phase 3
            ons.notification.alert(`Congratulations! You have successfully passed all 3 phases! 4 AP points have been awarded to everyone. An extra 3 AP points have been awarded to the player with the best narrative, ${winner}.`, {title: 'Your project has been released! 🎊'})
                .then(() => {
                    teamLeadApScore += 4;
                    techLeadApScore += 4;
                    sysArchApScore += 4;
                    uxLeadApScore += 4;
                    totalApScore += 16;
                    apTableSetup();
                })
                .then(() => {
                    switch (winner) {
                        case (players[0]): // team lead
                            teamLeadApScore += 3;
                            break;
                        case (players[1]): // tech lead
                            techLeadApScore += 3;
                            break;
                        case (players[2]): // sys arch
                            sysArchApScore += 3;
                            break;
                        case (players[3]):
                            uxLeadApScore += 3;
                            break;
                    }
                    apTableSetup();
                })
                // .then(() => {
                //     if (cardWithITElement) {
                //         intertemporalElement(cardWithITElement);
                //     }
                // })
                // .then(() => {
                //     document.getElementById('scan-qr').disabled = true;
                // });
            break;
    }
}

let failPhase = function() {
    hideGateCheckDialog();
    ons.notification.alert(`Good effort, but your team has not scored enough points to pass Phase ${currentPhase}. You can try again, but everyone loses 2 AP points.<br/><br/>Leave the gate card on the board and turn it over.`, {title: 'Try again! ❌'})
        .then(() => {
            teamLeadApScore -= 2;
            techLeadApScore -= 2;
            sysArchApScore -= 2;
            uxLeadApScore -= 2;
            totalApScore -= 8;
            apTableSetup();
        })
        .then(() => {
            currentRound++;
            setCurrentRound();
        })
}

let gateConditions = function() {
    // current session uses Angry Cats scenario
    if (currentScenario === 'Angry Cats 🐱') {
        if (currentPhase === 1 && (sysArchP1Score >= acSysArchP1 && uxLeadP1Score >= acUXLeadP1 && techLeadP1Score >= acTechLeadP1 && teamLeadP1Score >= acTeamLeadP1)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else if (currentPhase === 2 && (sysArchP2Score >= acSysArchP2 && uxLeadP2Score >= acUXLeadP2 && techLeadP2Score >= acTechLeadP2 && teamLeadP2Score >= acTeamLeadP2)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }        } else if (currentPhase === 3 && (sysArchP3Score >= acSysArchP3 && uxLeadP3Score >= acUXLeadP3 && techLeadP3Score >= acTechLeadP3 && teamLeadP3Score >= acTeamLeadP3)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    failPhase();
                });
            } else {
                failPhase();
            }
        }
    // current session uses DysTalk scenario
    } else if (currentScenario === 'DysTalk 📞') {
        if (currentPhase === 1 && (sysArchP1Score >= dtSysArchP1 && uxLeadP1Score >= dtUXLeadP1 && techLeadP1Score >= dtTechLeadP1 && teamLeadP1Score >= dtTeamLeadP1)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else if (currentPhase === 2 && (sysArchP2Score >= dtSysArchP2 && uxLeadP2Score >= dtUXLeadP2 && techLeadP2Score >= dtTechLeadP2 && teamLeadP2Score >= dtTeamLeadP2)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else if (currentPhase === 3 && (sysArchP3Score >= dtSysArchP3 && uxLeadP3Score >= dtUXLeadP3 && techLeadP3Score >= dtTechLeadP3 && teamLeadP3Score >= dtTeamLeadP3)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    failPhase();
                });
            } else {
                failPhase();
            }
        }
    // current session uses Earthbook scenario
    } else if (currentScenario === 'Earthbook 🌎') {
        if (currentPhase === 1 && (sysArchP1Score >= ebSysArchP1 && uxLeadP1Score >= ebUXLeadP1 && techLeadP1Score >= ebTechLeadP1 && teamLeadP1Score >= ebTeamLeadP1)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else if (currentPhase === 2 && (sysArchP2Score >= ebSysArchP2 && uxLeadP2Score >= ebUXLeadP2 && techLeadP2Score >= ebTechLeadP2 && teamLeadP2Score >= ebTeamLeadP2)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else if (currentPhase === 3 && (sysArchP3Score >= ebSysArchP3 && uxLeadP3Score >= ebUXLeadP3 && techLeadP3Score >= ebTechLeadP3 && teamLeadP3Score >= ebTeamLeadP3)) {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    passPhase();
                });
            } else {
                passPhase();
            }
        } else {
            if (cardWithITElement) {
                intertemporalElement(cardWithITElement);
                ieAlert.then(() => {
                    failPhase();
                });
            } else {
                failPhase();
            }
        }
    }
}