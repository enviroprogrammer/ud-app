// team scores across phases

// tech lead focuses on process quality
// team lead focuses on team strength
// systems architect focuses on internal quality
// ux lead focuses on external quality
let techLeadP1Score = 0;
let teamLeadP1Score = 0;
let sysArchP1Score = 0;
let uxLeadP1Score = 0;

let techLeadP2Score = 0;
let teamLeadP2Score = 0;
let sysArchP2Score = 0;
let uxLeadP2Score = 0;

let techLeadP3Score = 0;
let teamLeadP3Score = 0;
let sysArchP3Score = 0;
let uxLeadP3Score = 0;

// AP points for each player
let teamLeadApScore = 0;
let techLeadApScore = 0;
let sysArchApScore = 0;
let uxLeadApScore = 0;

// parse card database into JSON object
// app will compare QR code value against JSON object and calculate scores based on that card's score values
let cardObj = JSON.parse(cardJson);
let cardIndex;

// total scores across phases
let totalPhase1Score = techLeadP1Score + teamLeadP1Score + sysArchP1Score + uxLeadP1Score;
let totalPhase2Score = techLeadP2Score + teamLeadP2Score + sysArchP2Score + uxLeadP2Score;
let totalPhase3Score = techLeadP3Score + teamLeadP3Score + sysArchP3Score + uxLeadP3Score;

// total AP points across players
let totalApScore = 0;

let currentPhase = 1; // 3 phases; game begins at phase 1
let currentRound = 1; // each phase has a certain # of rounds players must get through
let playedCard; // the card that the user plays based on the QR code scanned from its physical counterpart
let currentPlayer; // keep track of current player (game begins with team lead and proceeds clockwise around the table)
let orderedPlayerArray = []; // players are added in the order they go in, starting with tech lead

// initialize scores upon starting a new game or resetting scoreboard
let initialScoreSetup = function() {
    setCurrentPhase();
    sessionStorageSetup();
    phase1TableSetup();
    phase2TableSetup();
    phase3TableSetup();
    apTableSetup();
    setTableHeaders();
    setCurrentPhase();
    blankCardScoreSetup();
}

// set up scores for all 3 phases
let phase1ScoreSetup = function() {
    sessionStorageSetup();
    phase1TableSetup();
    setTableHeaders();
    blankCardScoreSetup();
}
let phase2ScoreSetup = function() {
    sessionStorageSetup();
    phase2TableSetup();
    setTableHeaders();
    blankCardScoreSetup();
}
let phase3ScoreSetup = function() {
    sessionStorageSetup();
    phase3TableSetup();
    setTableHeaders();
    blankCardScoreSetup();
}

// set up sessionStorage to store game data
// this gets called whenever there are updates to the scoreboard so that the sessionStorage gets updated as well.
let sessionStorageSetup = function() {
    sessionStorage.setItem('Internal (Phase 1)', sysArchP1Score);
    sessionStorage.setItem('External (Phase 1)', uxLeadP1Score);
    sessionStorage.setItem('Process (Phase 1)', techLeadP1Score);
    sessionStorage.setItem('Team (Phase 1)', teamLeadP1Score);
    sessionStorage.setItem('Internal (Phase 2)', sysArchP2Score);
    sessionStorage.setItem('External (Phase 2)', uxLeadP2Score);
    sessionStorage.setItem('Process (Phase 2)', techLeadP2Score);
    sessionStorage.setItem('Team (Phase 2)', teamLeadP2Score);
    sessionStorage.setItem('Internal (Phase 3)', sysArchP3Score);
    sessionStorage.setItem('External (Phase 3)', uxLeadP3Score);
    sessionStorage.setItem('Process (Phase 3)', techLeadP3Score);
    sessionStorage.setItem('Team (Phase 3)', teamLeadP3Score);
    sessionStorage.setItem('Total Phase 1 Score', totalPhase1Score);
    sessionStorage.setItem('Total Phase 2 Score', totalPhase2Score);
    sessionStorage.setItem('Total Phase 3 Score', totalPhase3Score);
    sessionStorage.setItem('Phase', currentPhase);

    sessionStorage.setItem('Action Points for Team Lead', teamLeadApScore);
    sessionStorage.setItem('Action Points for Tech Lead', techLeadApScore);
    sessionStorage.setItem('Action Points for Systems Architect', sysArchApScore);
    sessionStorage.setItem('Action Points for UX Lead', uxLeadApScore);
    sessionStorage.setItem('Total Action Points', totalApScore);

    sessionStorage.setItem('Major Event Triggered?', majorEventTriggered);
    sessionStorage.setItem('Future Effect Triggered?', futureEffectTriggered);

    sessionStorage.setItem('Major Event Option', majorEventOption);
}

// set up rows for each phase in both team and individual action point tables
let phase1TableSetup = function() {
    document.getElementById('sys-arch-phase-1').innerHTML = sysArchP1Score;
    document.getElementById('ux-lead-phase-1').innerHTML = uxLeadP1Score;
    document.getElementById('tech-lead-phase-1').innerHTML = techLeadP1Score;
    document.getElementById('team-lead-phase-1').innerHTML = teamLeadP1Score;
    document.getElementById('total-phase-1').innerHTML = totalPhase1Score;
    apTableSetup();
}

let phase2TableSetup = function() {
    document.getElementById('sys-arch-phase-2').innerHTML = sysArchP2Score;
    document.getElementById('ux-lead-phase-2').innerHTML = uxLeadP2Score;
    document.getElementById('tech-lead-phase-2').innerHTML = techLeadP2Score;
    document.getElementById('team-lead-phase-2').innerHTML = teamLeadP2Score;
    document.getElementById('total-phase-2').innerHTML = totalPhase2Score;
    apTableSetup();
}

let phase3TableSetup = function() {
    document.getElementById('sys-arch-phase-3').innerHTML = sysArchP3Score;
    document.getElementById('ux-lead-phase-3').innerHTML = uxLeadP3Score;
    document.getElementById('tech-lead-phase-3').innerHTML = techLeadP3Score;
    document.getElementById('team-lead-phase-3').innerHTML = teamLeadP3Score;
    document.getElementById('total-phase-3').innerHTML = totalPhase3Score;
    apTableSetup();
}

let apTableSetup = function() {
    document.getElementById('team-lead-ap-score').innerHTML = teamLeadApScore;
    document.getElementById('tech-lead-ap-score').innerHTML = techLeadApScore;
    document.getElementById('sys-arch-ap-score').innerHTML = sysArchApScore;
    document.getElementById('ux-lead-ap-score').innerHTML = uxLeadApScore;
    document.getElementById('total-ap-score').innerHTML = totalApScore;
}

// game starts at round 1
// start a new round each time a turn is completed
let setCurrentRound = function() {
    document.getElementById('current-round').innerHTML = `Current Round: ${currentRound}`;
}

let setCurrentPhase = function() {
    document.getElementById('current-phase').innerHTML = `Current Phase: ${currentPhase}`;
}


let setCurrentPlayer = function(player) {
    currentPlayer = player;
    document.getElementById('current-player').innerHTML = `It is currently ${player}'s turn.`;
}

let setPlayerArray = function() {
    orderedPlayerArray = [sessionStorage.getItem('Team Lead'), sessionStorage.getItem('Technical Lead'), sessionStorage.getItem('Systems Architect'), sessionStorage.getItem('UX Lead')];
    sessionStorage.setItem('Players', orderedPlayerArray);
}

let playCard = function() {
    if (playedCard) {
        sessionStorage.setItem('Played Card', playedCard);
        switch (playedCard) {
            case 'Blank A' || 'Blank B' || 'Blank C' || 'Blank D' || 'Blank E':
                if (totalApScore <= 0) {
                    ons.notification.alert('You do not have enough AP points to distribute among players.');
                } else {
                    showBlankCardDialog();
                }

                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
                cardApPoints();
                handleTurns();
                break;
            case 'New Staff':
                if (currentScenario === 'DysTalk 📞') {
                    console.log('new staff: dystalk version')
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
                    compCommotionA();
                    cardApPoints();
                    handleTurns();
                }
                break;
            case 'Competitor Commotion B':
                if (currentScenario === 'DysTalk 📞') {
                    ons.notification.alert(`Well done! You have successfully filed a legal complaint against your competitor and won the case.<br/><br/>Systems architect ${sessionStorage.getItem('Systems Architect')} gets 4 points, tech lead ${sessionStorage.getItem('Technical Lead')} gets 2 points, and team lead ${sessionStorage.getItem('Team Lead')} gets 3 points!`)
                        .then(() => {
                            if (currentPhase === 1) {
                                sysArchP1Score += 4;
                                techLeadP1Score += 2;
                                teamLeadP1Score += 3;
                                totalPhase1Score = sysArchP1Score + techLeadP1Score + teamLeadP1Score + uxLeadP1Score;
                                phase1ScoreSetup();
                            } else if (currentPhase === 2) {
                                sysArchP2Score += 4;
                                techLeadP2Score += 2;
                                teamLeadP2Score += 3;
                                totalPhase2Score = sysArchP2Score + techLeadP2Score + teamLeadP2Score + uxLeadP2Score;
                                phase2ScoreSetup();
                            } else if (currentPhase === 3) {
                                sysArchP3Score += 4;
                                techLeadP3Score += 2;
                                teamLeadP3Score += 3;
                                totalPhase3Score = sysArchP3Score + techLeadP3Score + teamLeadP3Score + uxLeadP3Score;
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
                            setCurrentRound();
                        })
                        .then(() => {
                            apTableSetup();
                        })
                        .then(() => {
                            handleTurns();
                        });
                } else if (currentScenario === 'Angry Cats 🐱') {
                    acCompCommotionB();
                    cardApPoints();
                    handleTurns();
                } else if (currentScenario === 'Earthbook 🌎') {
                    ons.notification.alert(`This card is not yet playable with <i>Earthbook</i>!`);
                }
                break;
            case 'Stakeholder Visit':
                ons.notification.alert('Pitch a narrative of your development progress to the facilitator to evaluate. If your narrative is a success, do nothing. If your narrative is a loss, lose 2 cards.')
                    .then(() => {
                        cardApPoints();
                    })
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
                    })
                    .then(() => {
                        handleTurns();
                    });
                break;
            default:
                if (currentPhase === 1) {
                    cardApPoints();
                    updatePhase1Scores(playedCard);
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                    if (noPointsCounted === 'yes') {
                        noPointsCounted = 'no';
                    }
                    handleTurns();
                } else if (currentPhase === 2) {
                    cardApPoints();
                    updatePhase2Scores(playedCard);
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                    handleTurns();
                } else if (currentPhase === 3) {
                    cardApPoints();
                    updatePhase3Scores(playedCard);
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }
                    if (noPointsCounted === 'yes') {
                        noPointsCounted = 'no';
                    }
                    handleTurns();
                }
                break;
        }

        if (document.getElementById('qr-code-scanner')) {
            document.getElementById('qr-code-scanner').remove(); // remove scanner dialog from dom to prepare for scanning the next qr code
        }

        hidePlayCardDialog();
    }
    currentRound++;
}

// add 1 to each player's AP points once they finish their turn playing a card
let cardApPoints = function() {
    switch (currentPlayer) {
        case (orderedPlayerArray[0]): // team lead
            teamLeadApScore++;
            break;
        case (orderedPlayerArray[1]): // tech lead
            techLeadApScore++;
            break;
        case (orderedPlayerArray[2]): // systems architect
            sysArchApScore++;
            break;
        case (orderedPlayerArray[3]): // ux lead
            uxLeadApScore++;
            break;
    }
    totalApScore += 1;
}

let getCardIndex = function(card) {
    cardIndex = cardObj["cards"].findIndex((c) => {
        return c.name === card;
    });
}

// update scores for phase 1 upon playing a card
let updatePhase1Scores = function(card) {
    getCardIndex(card);

    if (currentPhase === 1) { // no points counted for one round
        if (workedWithExperts === 'yes' && noPointsCounted === 'yes') {
            techLeadP1Score += 0;
            teamLeadP1Score += 0;
            sysArchP1Score += 0;
            uxLeadP1Score += 0;
        } else if ((workedWithExperts === 'yes' && noPointsCounted === 'no') || workedWithExperts === 'no') {
            techLeadP1Score += cardObj.cards[cardIndex].scoreValues["process"];
            teamLeadP1Score += cardObj.cards[cardIndex].scoreValues["team"];
            sysArchP1Score += cardObj.cards[cardIndex].scoreValues["internal"];
            uxLeadP1Score += cardObj.cards[cardIndex].scoreValues["external"];
            totalPhase1Score = techLeadP1Score + teamLeadP1Score + sysArchP1Score + uxLeadP1Score;

            setCurrentRound();
            setCardWithITElement(card);

            if (teamLeadP1Score >= 10 && techLeadP1Score >= 10 && sysArchP1Score >= 10 && uxLeadP1Score >= 10) {
                triggerMajorEvent();
            }
        }
        phase1ScoreSetup();
    }
}

// update scores for phase 2 upon playing a card
let updatePhase2Scores = function(card) {
    getCardIndex(card);

    if (currentPhase === 2) {
        techLeadP2Score += cardObj.cards[cardIndex].scoreValues["process"];
        teamLeadP2Score += cardObj.cards[cardIndex].scoreValues["team"];
        sysArchP2Score += cardObj.cards[cardIndex].scoreValues["internal"];
        uxLeadP2Score += cardObj.cards[cardIndex].scoreValues["external"];
        totalPhase2Score = techLeadP2Score + teamLeadP2Score + sysArchP2Score + uxLeadP2Score;

        setCurrentRound();
        setCardWithITElement(card);

        if (teamLeadP2Score >= 10 && techLeadP2Score >= 10 && sysArchP2Score >= 10 && uxLeadP2Score >= 10) {
            triggerMajorEvent();
        }
    }
    phase2ScoreSetup();
}

// update scores for phase 3 upon playing a card
let updatePhase3Scores = function(card) {
    getCardIndex(card);

    if (currentPhase === 3) {
        if (disclosedToBOD === 'yes' && noPointsCounted === 'yes') { // no points counted for one round
            techLeadP1Score += 0;
            teamLeadP1Score += 0;
            sysArchP1Score += 0;
            uxLeadP1Score += 0;
        } else if ((disclosedToBOD === 'yes' && noPointsCounted === 'no') || disclosedToBOD === 'no') {
            techLeadP3Score += cardObj.cards[cardIndex].scoreValues["process"];
            teamLeadP3Score += cardObj.cards[cardIndex].scoreValues["team"];
            sysArchP3Score += cardObj.cards[cardIndex].scoreValues["internal"];
            uxLeadP3Score += cardObj.cards[cardIndex].scoreValues["external"];
            totalPhase3Score = techLeadP3Score + teamLeadP3Score + sysArchP3Score + uxLeadP3Score;

            setCurrentRound();
            setCardWithITElement(card);

            if (teamLeadP3Score >= 10 && techLeadP3Score >= 10 && sysArchP3Score >= 10 && uxLeadP3Score >= 10) {
                triggerMajorEvent();
            }
        }
        phase3ScoreSetup();
    }
}

let setTableHeaders = function() {
    let internal = document.getElementById('internal');
    let external = document.getElementById('external');
    let process = document.getElementById('process');
    let team = document.getElementById('team');

    internal.innerHTML = `Internal (${sessionStorage.getItem('Systems Architect')})`;
    external.innerHTML = `External (${sessionStorage.getItem('UX Lead')})`;
    process.innerHTML = `Process (${sessionStorage.getItem('Technical Lead')})`;
    team.innerHTML = `Team (${sessionStorage.getItem('Team Lead')})`;

    document.getElementById('team-lead').innerHTML = sessionStorage.getItem('Team Lead');
    document.getElementById('tech-lead').innerHTML = sessionStorage.getItem('Technical Lead');
    document.getElementById('sys-arch').innerHTML = sessionStorage.getItem('Systems Architect');
    document.getElementById('ux-lead').innerHTML = sessionStorage.getItem('UX Lead');
}

let startNewPhase = function() {
    currentPhase++;
    setCurrentPhase();
    sessionStorageSetup();

    // if (currentPhase === 3 && futureEffectTriggered === 'no') {
    //     // console.log('future effect');
    //     futureEffectTriggered = 'yes';
    //     futureEffect();
    // }
}

let addScoresToGatePass = function() {
    document.getElementById('tl-header').innerHTML = `Team (${sessionStorage.getItem('Team Lead')})`;
    document.getElementById('techl-header').innerHTML = `Process (${sessionStorage.getItem('Technical Lead')})`;
    document.getElementById('sa-header').innerHTML = `Internal (${sessionStorage.getItem('Systems Architect')})`;
    document.getElementById('ux-header').innerHTML = `External (${sessionStorage.getItem('UX Lead')})`;

    document.getElementById('gs-tl-header').innerHTML = `Team (${sessionStorage.getItem('Team Lead')})`;
    document.getElementById('gs-techl-header').innerHTML = `Process (${sessionStorage.getItem('Technical Lead')})`;
    document.getElementById('gs-sa-header').innerHTML = `Internal (${sessionStorage.getItem('Systems Architect')})`;
    document.getElementById('gs-ux-header').innerHTML = `External (${sessionStorage.getItem('UX Lead')})`;

    let currentTeamLeadScore = document.getElementById('current-team-lead-score');
    let currentTechLeadScore = document.getElementById('current-tech-lead-score');
    let currentSysArchScore = document.getElementById('current-sys-arch-score');
    let currentUXLeadScore = document.getElementById('current-ux-lead-score');

    let teamLeadGateScore = document.getElementById('team-lead-gate-score');
    let techLeadGateScore = document.getElementById('tech-lead-gate-score');
    let sysArchGateScore = document.getElementById('sys-arch-gate-score');
    let uxLeadGateScore = document.getElementById('ux-lead-gate-score');

    switch (currentPhase) {
        case 1:
            currentTeamLeadScore.innerHTML = teamLeadP1Score;
            currentTechLeadScore.innerHTML = techLeadP1Score;
            currentSysArchScore.innerHTML = sysArchP1Score;
            currentUXLeadScore.innerHTML = uxLeadP1Score;
            break;
        case 2:
            currentTeamLeadScore.innerHTML = teamLeadP2Score;
            currentTechLeadScore.innerHTML = techLeadP2Score;
            currentSysArchScore.innerHTML = sysArchP2Score;
            currentUXLeadScore.innerHTML = uxLeadP2Score;
            break;
        case 3:
            currentTeamLeadScore.innerHTML = teamLeadP3Score;
            currentTechLeadScore.innerHTML = techLeadP3Score;
            currentSysArchScore.innerHTML = sysArchP3Score;
            currentUXLeadScore.innerHTML = uxLeadP3Score;
            break;
    }

    if (currentScenario === 'Angry Cats 🐱') {
        if (currentPhase === 1) {
            teamLeadGateScore.innerHTML = acTeamLeadP1.toString();
            techLeadGateScore.innerHTML = acTechLeadP1.toString();
            sysArchGateScore.innerHTML = acSysArchP1.toString();
            uxLeadGateScore.innerHTML = acUXLeadP1.toString();
        } else if (currentPhase === 2) {
            teamLeadGateScore.innerHTML = acTeamLeadP2.toString();
            techLeadGateScore.innerHTML = acTechLeadP2.toString();
            sysArchGateScore.innerHTML = acSysArchP2.toString();
            uxLeadGateScore.innerHTML = acUXLeadP2.toString();
        } else if (currentPhase === 3) {
            teamLeadGateScore.innerHTML = acTeamLeadP3.toString();
            techLeadGateScore.innerHTML = acTechLeadP3.toString();
            sysArchGateScore.innerHTML = acSysArchP3.toString();
            uxLeadGateScore.innerHTML = acUXLeadP3.toString();
        }
    } else if (currentScenario === 'DysTalk 📞') {
        if (currentPhase === 1) {
            teamLeadGateScore.innerHTML = dtTeamLeadP1.toString();
            techLeadGateScore.innerHTML = dtTechLeadP1.toString();
            sysArchGateScore.innerHTML = dtSysArchP1.toString();
            uxLeadGateScore.innerHTML = dtUXLeadP1.toString();
        } else if (currentPhase === 2) {
            teamLeadGateScore.innerHTML = dtTeamLeadP2.toString();
            techLeadGateScore.innerHTML = dtTechLeadP2.toString();
            sysArchGateScore.innerHTML = dtSysArchP2.toString();
            uxLeadGateScore.innerHTML = dtUXLeadP2.toString();
        } else if (currentPhase === 3) {
            teamLeadGateScore.innerHTML = dtTeamLeadP3.toString();
            techLeadGateScore.innerHTML = dtTechLeadP3.toString();
            sysArchGateScore.innerHTML = dtSysArchP3.toString();
            uxLeadGateScore.innerHTML = dtUXLeadP3.toString();
        }
    } else if (currentScenario === 'Earthbook 🌎') {
        if (currentPhase === 1) {
            teamLeadGateScore.innerHTML = ebTeamLeadP1.toString();
            techLeadGateScore.innerHTML = ebTechLeadP1.toString();
            sysArchGateScore.innerHTML = ebSysArchP1.toString();
            uxLeadGateScore.innerHTML = ebUXLeadP1.toString();
        } else if (currentPhase === 2) {
            teamLeadGateScore.innerHTML = ebTeamLeadP2.toString();
            techLeadGateScore.innerHTML = ebTechLeadP2.toString();
            sysArchGateScore.innerHTML = ebSysArchP2.toString();
            uxLeadGateScore.innerHTML = ebUXLeadP2.toString();
        } else if (currentPhase === 3) {
            teamLeadGateScore.innerHTML = ebTeamLeadP3.toString();
            techLeadGateScore.innerHTML = ebTechLeadP3.toString();
            sysArchGateScore.innerHTML = ebSysArchP3.toString();
            uxLeadGateScore.innerHTML = ebUXLeadP3.toString();
        }
    }
}

let displayCurrentTeamScores = function() {
    let bn = document.getElementById('best-narrative');
    let gc = document.getElementById('gate-check');

    if (bn) {
        bn.remove();
    }

    if (gc) {
        gc.show();
    } else {
        ons.createElement('gate-check.html', {append: true})
            .then(function(dialog) {
                addScoresToGatePass();
                dialog.show();
            });
    }
}

let showPlayCardDialog = function(card) {
    let pcd = document.getElementById('play-card-dialog');
    playedCard = card;

    if (pcd) {
        pcd.show();
    } else {
        ons.createElement('play-card-dialog.html', { append: true })
            .then(function(dialog) {
                document.getElementById('qr-card').innerHTML = `You scanned: ${card.trim()}`;
                document.getElementById('qr-result').innerHTML = `Are you sure you want to play ${card.trim()}?`; // some card names (pulled from scanning QR codes) have trailing white space; trim() is used to remove it
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
        playedCard = '';
    }
}

// keep track of whose turn it is
let handleTurns = function() {
    switch (currentPlayer) {
        case orderedPlayerArray[0]: // team lead
            currentPlayer = orderedPlayerArray[1]; // pass to tech lead
            break;
        case orderedPlayerArray[1]: // tech lead
            currentPlayer = orderedPlayerArray[2]; // pass to sys arch
            break;
        case orderedPlayerArray[2]: // systems architect
            currentPlayer = orderedPlayerArray[3]; // pass to ux lead
            break;
        case orderedPlayerArray[3]: // ux lead
            currentPlayer = orderedPlayerArray[0]; // pass to team lead
            break;
    }
    setCurrentPlayer(currentPlayer);
}