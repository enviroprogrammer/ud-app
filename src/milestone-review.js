let winner; // keep track of who won each milestone review so we can give them 3 points if everyone passes the gate
let highestVotes = 0; // find the highest score out of all scores for each player
let playerList; // list of current players in the game

// to be done at the end of each phase;
// each player crafts a narrative of everything they've done up to that point
let milestoneReview = function() {
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


    // start new phase
    // if (currentPhase === 1 || currentPhase === 2) {
    //     ons.notification.alert(`Based on your votes, ${winner} had the best narrative! ${winner} gets an extra 3 AP points.`).then(() => {
    //         // get winner's role, then award 3 AP points to the winner
    //         switch (winner) {
    //             case (players[0]): // team lead
    //                 teamLeadApScore += 3;
    //                 break;
    //             case (players[1]): // tech lead
    //                 techLeadApScore += 3;
    //                 break;
    //             case (players[2]): // systems architect
    //                 sysArchApScore += 3;
    //                 break;
    //             case (players[3]): // ux lead
    //                 uxLeadApScore += 3;
    //                 break;
    //         }
    //         apTableSetup();
    //         startNewPhase();
    //     });
    // // because this is the last phase, just reveal the winner
    // } else if (currentPhase === 3) {
    //     ons.notification.alert(`Based on your votes, ${winner} had the best narrative!`);
    // }

    // hideMilestoneReview();
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