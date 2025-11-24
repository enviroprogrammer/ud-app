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