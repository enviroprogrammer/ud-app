// blank card points
let teamLeadBlank = 0;
let techLeadBlank = 0;
let sysArchBlank = 0;
let uxLeadBlank = 0;

let updateBlankCardScores = function (s1, s2, s3, s4) {
    const totalDistribution = s1 + s2 + s3 + s4;
    teamLeadBlank += s1;
    techLeadBlank += s2;
    sysArchBlank += s3;
    uxLeadBlank += s4;

    teamLeadApScore -= s1;
    techLeadApScore -= s2;
    sysArchApScore -= s3;
    uxLeadApScore -= s4;

    totalApScore = totalApScore - totalDistribution;

    sessionStorageSetup();
    blankCardScoreSetup();

    if (currentPhase === 1) {
        phase1ScoreSetup();
    } else if (currentPhase === 2) {
        phase2ScoreSetup();
    } else if (currentPhase === 3) {
        phase3ScoreSetup();
    }
}

let playBlankCard = function() {
    let inputs = document.getElementsByName('bc-points');
    let teaml = Number(inputs[0].value);
    let techl = Number(inputs[1].value);
    let sys = Number(inputs[2].value);
    let ux = Number(inputs[3].value);

    if (teaml + techl + sys + ux > totalApScore) {
        ons.notification.alert(`You can only distribute up to ${totalApScore} points. Try again.`)
            .then(() => {
                showBlankCardDialog();
            });
    } else {
        updateBlankCardScores(teaml, techl, sys, ux);
        switch (currentPhase) {
            case 1:
                teamLeadP1Score += teaml;
                techLeadP1Score += techl;
                sysArchP1Score += sys;
                uxLeadP1Score += ux;
                totalPhase1Score = teamLeadP1Score + techLeadP1Score + sysArchP1Score + uxLeadP1Score;
                break;
            case 2:
                teamLeadP2Score += teaml;
                techLeadP2Score += techl;
                sysArchP2Score += sys;
                uxLeadP2Score += ux;
                totalPhase2Score += teamLeadP2Score + techLeadP2Score + sysArchP2Score + uxLeadP2Score;
                break;
            case 3:
                teamLeadP3Score += teaml;
                techLeadP3Score += techl;
                sysArchP3Score += sys;
                uxLeadP3Score += ux;
                totalPhase3Score += teamLeadP3Score + techLeadP3Score + sysArchP3Score + uxLeadP3Score;
                break;
        }
    }
    ons.notification.alert(`Blank card point distribution:<br/><br/>${sessionStorage.getItem('Team Lead')}: ${teaml}<br/>${sessionStorage.getItem('Technical Lead')}: ${techl}<br/>${sessionStorage.getItem('Systems Architect')}: ${sys}<br/>${sessionStorage.getItem('UX Lead')}: ${ux}`);
    removeBlankCardDialog();
}

let showBlankCardDialog = function() {
    let bc = document.getElementById('blank-card-dialog');

    if (bc) {
        bc.show();
    } else {
        ons.createElement('blank-card.html', {append: true})
            .then(function (dialog) {
                blankCardDistribution();
                if (ieAlert && ieCounter >= 1 && ieCounter < weeks + 1) {
                    ieAlert.then(() => {
                        document.getElementById('team-lead-ap-total').innerHTML = `Team Lead: ${teamLeadApScore}`;
                        document.getElementById('tech-lead-ap-total').innerHTML = `Tech Lead: ${techLeadApScore}`;
                        document.getElementById('sys-arch-ap-total').innerHTML = `Systems Architect: ${sysArchApScore}`;
                        document.getElementById('ux-lead-ap-total').innerHTML = `UX Lead: ${uxLeadApScore}`;
                        document.getElementById('ap-total').innerHTML = `${totalApScore}`;
                        dialog.show();
                    })
                } else {
                    document.getElementById('team-lead-ap-total').innerHTML = `Team Lead: ${teamLeadApScore}`;
                    document.getElementById('tech-lead-ap-total').innerHTML = `Tech Lead: ${techLeadApScore}`;
                    document.getElementById('sys-arch-ap-total').innerHTML = `Systems Architect: ${sysArchApScore}`;
                    document.getElementById('ux-lead-ap-total').innerHTML = `UX Lead: ${uxLeadApScore}`;
                    document.getElementById('ap-total').innerHTML = `${totalApScore}`;
                    dialog.show();
                }
            });
    }
}

let removeBlankCardDialog = function() {
    let bc = document.getElementById('blank-card-dialog');

    if (bc) {
        bc.remove();
    }
}

// set up blank card table
let blankCardScoreSetup = function() {
    sessionStorage.setItem('Team Lead (Blank Card)', teamLeadBlank);
    sessionStorage.setItem('Tech Lead (Blank Card)', techLeadBlank);
    sessionStorage.setItem('Systems Architect (Blank Card)', sysArchBlank);
    sessionStorage.setItem('UX Lead (Blank Card)', uxLeadBlank);

    document.getElementById('team-lead-blank').innerHTML = sessionStorage.getItem('Team Lead');
    document.getElementById('tech-lead-blank').innerHTML = sessionStorage.getItem('Technical Lead');
    document.getElementById('sys-arch-blank').innerHTML = sessionStorage.getItem('Systems Architect');
    document.getElementById('ux-lead-blank').innerHTML = sessionStorage.getItem('UX Lead');

    document.getElementById('team-lead-blank-score').innerHTML = teamLeadBlank;
    document.getElementById('tech-lead-blank-score').innerHTML = techLeadBlank;
    document.getElementById('sys-arch-blank-score').innerHTML = sysArchBlank;
    document.getElementById('ux-lead-blank-score').innerHTML = uxLeadBlank;
}

// show AP points for each dimension + total AP scores whenever a blank card is played
// this helps the player decide how to distribute scores among players
let blankCardDistribution = function() {
    document.getElementById('team-lead-ap-total').innerHTML = `Team Lead: ${teamLeadApScore}`;
    document.getElementById('tech-lead-ap-total').innerHTML = `Tech Lead: ${techLeadApScore}`;
    document.getElementById('sys-arch-ap-total').innerHTML = `Systems Architect: ${sysArchApScore}`;
    document.getElementById('ux-lead-ap-total').innerHTML = `UX Lead: ${uxLeadApScore}`;
    document.getElementById('ap-total').innerHTML = `${totalApScore}`;
}