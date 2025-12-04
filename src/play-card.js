let playCard = function() {
    if (playedCard) {
        roleRelatedBonuses(playedCard);
        roleApPointsByCard(playedCard);
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
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }

                    if (noPointsCounted === 'yes') {
                        noPointsCounted = 'no';
                    }

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
                    updatePhase1Scores(playedCard);
                    handleTurns();
                } else if (currentPhase === 2) {
                    cardApPoints();
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }

                    if (playedCard === 'Software Architecture Review A' || playedCard === 'Software Architecture Review B') {
                        saCardPlayedInP2 = true;
                    }

                    phase2RoleAP();
                    updatePhase2Scores(playedCard);
                    handleTurns();
                } else if (currentPhase === 3) {
                    cardApPoints();
                    // card has an intertemporal element
                    if (cardWithITElement) {
                        intertemporalElement(cardWithITElement);
                    }

                    if (playedCard === 'User Studies A' || playedCard === 'User Studies B') {
                        usCardPlayedInP3 = true;
                    }

                    if (noPointsCounted === 'yes') {
                        noPointsCounted = 'no';
                    }

                    phase3RoleAP();
                    updatePhase3Scores(playedCard);
                    handleTurns();
                }
                break;
        }

        if (document.getElementById('qr-code-scanner')) {
            document.getElementById('qr-code-scanner').remove(); // remove scanner dialog from dom to prepare for scanning the next qr code
        }

        hidePlayCardDialog();
    }
}