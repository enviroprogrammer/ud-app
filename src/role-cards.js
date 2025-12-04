let roleRelatedBonuses = function(card) {
    getCardIndex(card); // use card index to locate card in database and pull that card's score values

    // factor in scores from intertemporal elements
    // if (cardWithITElement) {
    //     intertemporalElement(cardWithITElement);
    // }

    // increase AP score of a certain role by 1 if the card has added benefits to that role
    if (cardObj.cards[cardIndex].scoreValues["team"] > 5) { // team lead benefits from teamwide learning and growth
        teamLeadApScore++;
        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
    } else if (cardObj.cards[cardIndex].scoreValues["process"] > 5) { // tech lead benefits when process is considered
        techLeadApScore++;
        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
    } else if (cardObj.cards[cardIndex].scoreValues["internal"] > 5) { // sys arch benefits from working efficiently and having a good internal structure
        sysArchApScore++;
        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
    } else if (cardObj.cards[cardIndex].scoreValues["external"] > 5) { // ux lead's hard work pays off
        uxLeadApScore++;
        totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
    }
}

// playing certain cards at any point of the game will impact certain roles either positively or negatively.
let roleApPointsByCard = function(card) {
    switch (card) {
        case 'Education Workshop':
            teamLeadApScore += 2;
            totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
            break;
        case ('Requirements Workshop A' || 'Requirements Workshop B'):
            uxLeadApScore += 2;
            totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
            break;
        case ('Github Day A' || 'Github Day B'):
            techLeadApScore += 2;
            totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
            break;
        case ('Test Automation A' || 'Test Automation B'):
            techLeadApScore += 2;
            totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
            break;
        case ('Refactor A' || 'Refactor B'):
            sysArchApScore -= 2;
            totalApScore = teamLeadApScore + techLeadApScore + uxLeadApScore + sysArchApScore;
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
