let winner; // keep track of who won each milestone review so we can give them 3 points if everyone passes the gate
let highestVotes = 0; // find the highest score out of all scores for each player
let playerList; // list of current players in the game

// to be done at the end of each phase;
// each player crafts a narrative of everything they've done up to that point
let gatePass = function() {
    // startNewPhase();
    // futureEffectTriggered = 'yes';
    let mr = document.getElementById('milestone-review');

    if (mr && (majorEventOption !== 'Invest in addiction increase' || majorEventOption !== 'Cover up the leak')) {
        mr.show();
    } else {
        ons.createElement('milestone-review.html', {append: true})
            .then(function (dialog) {
                document.querySelector('label[for="team-lead"]').innerHTML = `${sessionStorage.getItem('Team Lead')}: `;
                document.querySelector('label[for="tech-lead"]').innerHTML = `${sessionStorage.getItem('Technical Lead')}: `;
                document.querySelector('label[for="sys-arch"]').innerHTML = `${sessionStorage.getItem('Systems Architect')}: `;
                document.querySelector('label[for="ux-lead"]').innerHTML = `${sessionStorage.getItem('UX Lead')}: `;
                dialog.show();
            });
    }
}

let hideMilestoneReview = function() {
    let mr = document.getElementById('milestone-review');

    if (mr) {
        mr.hide();
    }
}

// gather votes from milestone review
// and display alert message that shows which player had the most votes
let collectMilestoneReviewVotes = function() {
    let inputs = document.getElementsByName('mr-vote');
    let labels = document.getElementById('votes').querySelectorAll('label');

    let voteDictionary = {};
    voteDictionary[labels[0].innerText.slice(0, -1)] = Number(inputs[0].value);
    voteDictionary[labels[1].innerText.slice(0, -1)] = Number(inputs[1].value);
    voteDictionary[labels[2].innerText.slice(0, -1)] = Number(inputs[2].value);
    voteDictionary[labels[3].innerText.slice(0, -1)] = Number(inputs[3].value);

    // get highest votes among players
    for (let player in voteDictionary) {
        if (voteDictionary[player] > highestVotes) {
            highestVotes = voteDictionary[player];
        }
    }

    // get list of players from dictionary
    playerList = Object.keys(voteDictionary);

    // identify the player who has the highest votes
    playerList.forEach((player) => {
        if (voteDictionary[player] === highestVotes) {
            winner = player;
        }
    });

    document.getElementsByName('mr-vote').forEach(input => input.value = 0);
}

let showWinner = function() {
    collectMilestoneReviewVotes();

    let bn = document.getElementById('best-narrative');
    // hideMilestoneReview();

    if (bn) {
        bn.remove();
    } else {
        ons.createElement('best-narrative.html', {append: true})
            .then(function (dialog) {
                document.getElementById('winner').innerHTML = `${winner} had the best narrative! 🥳`;
                hideMilestoneReview();
                dialog.show();
            });
    }
}

let addScoresToGatePass = function() {
    document.getElementById('tl-header').innerHTML = `Team (${sessionStorage.getItem('Team Lead')})`;
    document.getElementById('techl-header').innerHTML = `Process (${sessionStorage.getItem('Technical Lead')})`;
    document.getElementById('sa-header').innerHTML = `Internal (${sessionStorage.getItem('Systems Architect')})`;
    document.getElementById('ux-header').innerHTML = `External (${sessionStorage.getItem('UX Lead')})`;

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