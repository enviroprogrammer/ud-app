let roleRelatedBonuses = function(card) {
    getCardIndex(card); // use card index to locate card in database and pull that card's score values

    // factor in scores from intertemporal elements
    // if (cardWithITElement) {
    //     intertemporalElement(cardWithITElement);
    // }

    // increase AP score of a certain role by 1 if the card has added benefits to that role
    if (cardObj.cards[cardIndex].scoreValues["team"] > 5) { // team lead benefits from teamwide learning and growth
        teamLeadApScore++;
        totalApScore++;
    } else if (cardObj.cards[cardIndex].scoreValues["process"] > 5) { // tech lead benefits when process is considered
        techLeadApScore++;
        totalApScore++;
    } else if (cardObj.cards[cardIndex].scoreValues["internal"] > 5) { // sys arch benefits from working efficiently and having a good internal structure
        sysArchApScore++;
        totalApScore++;
    } else if (cardObj.cards[cardIndex].scoreValues["external"] > 5) { // ux lead's hard work pays off
        uxLeadApScore++;
        totalApScore++;
    }
}

// playing certain cards at any point of the game will impact certain roles either positively or negatively.
let roleApPointsByCard = function(card) {
    switch (card) {
        case 'Education Workshop':
            teamLeadApScore += 2;
            totalApScore += 2;
            break;
        case 'Requirements Workshop A':
        case 'Requirements Workshop B':
            uxLeadApScore += 2;
            totalApScore += 2;
            break;
        case 'Github Day A':
        case 'Github Day B':
            techLeadApScore += 2;
            totalApScore += 2;
            break;
        case 'Test Automation A':
        case 'Test Automation B':
            techLeadApScore += 2;
            totalApScore += 2;
            break;
        case 'Refactor A':
        case 'Refactor B':
            sysArchApScore -= 2;
            totalApScore += 2;
            break;
        case 'Mentorship A':
        case 'Mentorship B':
            teamLeadApScore++;
            totalApScore++;
            break;
        case 'Feature Development A':
        case 'Feature Development B':
            uxLeadApScore++;
            totalApScore++;
            break;
        case 'Test-Driven Development A':
        case 'Test-Driven Development B':
            sysArchApScore++;
            totalApScore++;
            break;
        case 'Celebration of Honesty': // +2 AP points per player when this is played
            teamLeadApScore += 2;
            techLeadApScore += 2;
            sysArchApScore += 2;
            uxLeadApScore += 2;
            totalApScore += 8;
            break;
    }
}

// playing certain cards in phase 1 will result in significant AP points gained (or lost)
let phase1RoleAP = function() {
    if (usCardPlayedInP1) {
        uxLeadApScore += 4;
        totalApScore += 4;
    } else if (anCardPlayedInP1) {
        techLeadApScore -= 4;
        totalApScore -= 4;
    } else if (adCardPlayedInP1) {
        sysArchApScore += 4;
        totalApScore += 4;
    }
}

let phase2RoleAP = function() {
    if (saCardPlayedInP2) {
        sysArchApScore += 4;
        totalApScore += 4;
    } else if (!usCardPlayedInP1) { // ux lead failed to conduct user studies in phase 1, costing them ap points :(
        uxLeadApScore -= 4;
        totalApScore -= 4;
    }
}

let phase3RoleAP = function() {
    if (usCardPlayedInP3) {
        uxLeadApScore += 2;
        totalApScore += 2;
    }
}

// call this function if the tech lead plays 2 all nighter cards or 2 development cards in a row
let twoInARow = function() {
    // 2 all nighter cards in a row: lose 8 AP points when the second card is laid
    if ((playedCards.at(-1) === 'Pull All Nighter A' && playedCards.at(-2) === 'Pull All Nighter B') || (playedCards.at(-1) === 'Pull All Nighter B' && playedCards.at(-2) === 'Pull All Nighter A')) {
        techLeadApScore -= 8;
        totalApScore -= 8;
    // 2 dev cards in a row (test-driven development/development): gain 4 action points; the effect stacks for each subsequent card laid
    } else if (playedCards.at(-1) === 'Development A' || playedCards.at(-1) === 'Development B' || playedCards.at(-1) === 'Test-Driven Development A' || playedCards.at(-1) === 'Test-Driven Development B') {
        techLeadApScore += 4;
        totalApScore += 4;
        if (playedCards.at(-2) === 'Development A' || playedCards.at(-2) === 'Development B' || playedCards.at(-2) === 'Test-Driven Development A' || playedCards.at(-2) === 'Test-Driven Development B') {
            techLeadApScore += 4;
            totalApScore += 4;
        }
    }
}
