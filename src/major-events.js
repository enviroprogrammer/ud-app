let noPointsCounted = 'no'; // if playing dystalk scenario and leak has been disclosed to BOD, have no points counted for one round, then resume regular scoring
let disclosedToBOD = 'no'; // if using dystalk and players choose "disclose to board of directors" option for the major event, this becomes true and no points are counted for the next round.
let workedWithExperts = 'no';

// keep track of whether a major event has been triggered so that the dialog only shows up once.
let majorEventTriggered = 'no';

// track selected option from major event to trigger future effect at start of phase 3
// on android, selected options are in all caps because onsen UI uses native ios/android design for components
let majorEventOption = '';

let gameOver = function() {
    if (majorEventOption === 'Invest in addiction increase' || majorEventOption === 'INVEST IN ADDICTION INCREASE') {
        ons.notification.alert("Someone has leaked the details surrounding these deals and the public finds out about your evil deed. Your company image is completely tarnished to the public. Your board of directors denies responsibility, the team lead gets fired, the rest of the team disbands in shame. Never shall you talk about what you’ve done. This game never happened. <b>Game over.</b>")
            .then(() => {
                document.getElementById('scan-qr').disabled = true;
            });

    } else if (majorEventOption === 'Cover up leak' || majorEventOption === 'COVER UP LEAK') {
        ons.notification.alert("By covering up the leak yourselves, you choose to keep knowledge of the leak within the team itself. By not informing higher-ups or the public, you don’t lose anything in the short term- but you still must put in the work to ensure the leak is fixed before anyone finds out. This is a band-aid solution, and might come back to haunt you in the future. <b>Game over.</b>")
            .then(() => {
                document.getElementById('scan-qr').disabled = true;
            });
    }
}

// Major Event for Angry Cats: Addiction
let addiction = function(){
    const ad = document.getElementById('addiction');

    if (ad) {
        ad.show();
    } else {
        ons.createElement('addiction.html', { append: true })
            .then(function (dialog) {
                if (ieAlert && ieCounter >= 1 && ieCounter < weeks + 1) {
                    ieAlert.then(() => {
                        dialog.show();
                    })
                } else {
                    dialog.show();
                }
            });
    }
}

// option 1 for addiction: invest resources to raise addiction levels
let raiseAddictionLevels = function() {
    const ad = document.getElementById('addiction');
    const invest = document.getElementById('invest-addiction')
    majorEventOption = invest.innerText;
    sessionStorageSetup();

    ons.notification.alert(`You see this as an opportunity and invest resources to gain user interest and retention.<br/><br/>UX Lead ${sessionStorage.getItem('UX Lead')} gets 2 action points and 3 team points.`).then(() => {
        // add 2 AP points to team lead and change total ap score as well
        uxLeadApScore += 2;
        totalApScore += 2;

        // add 3 points to ux lead score, contributing to the total team score
        switch (currentPhase) {
            case 1: // phase 1
                uxLeadP1Score += 3;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                uxLeadP2Score += 3;
                phase2ScoreSetup();
                break;
        }
    });

    if (ad) {
        ad.hide();
    }
}

let bribeCritics = function() {
    const ad = document.getElementById('addiction');
    const bribe = document.getElementById('bribe-critics');
    majorEventOption = bribe.innerText;
    sessionStorageSetup();

    ons.notification.alert(`By ignoring the controversy and continuing to work on <i>Angry Cats</i>, you bribe the critics and they keep quiet.<br/><br/>Everyone gets 2 action points while Tech Lead ${sessionStorage.getItem('Technical Lead')} gets 3 team points.`).then(() => {
        // everyone gets 2 action points!
        teamLeadApScore += 2;
        techLeadApScore += 2;
        sysArchApScore += 2;
        uxLeadApScore += 2;
        totalApScore += teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
        apTableSetup();

        // add 3 points to tech lead score
        switch (currentPhase) {
            case 1: // phase 1
                techLeadP1Score += 3;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                techLeadP2Score += 3;
                phase2ScoreSetup();
                break;
        }
    });

    if (ad) {
        ad.hide();
    }
}

let workWithExperts = function() {
    const ad = document.getElementById('addiction');
    const experts = document.getElementById('work-with-experts');
    majorEventOption = experts.innerText;
    workedWithExperts = 'yes';
    noPointsCounted = 'yes';
    sessionStorageSetup();

    ons.notification.alert(`You do not take these concerns lightly, and so you invite digital addiction experts to collaborate and ensure that <i>Angry Cats</i> does no harm. This takes a toll on process and internal system quality.<br/><br/>Everyone loses 5 team points and 2 action points. No points are counted for one round.`).then(() => {
        // everyone loses 2 action points :(
        teamLeadApScore -= 2;
        techLeadApScore -= 2;
        sysArchApScore -= 2;
        uxLeadApScore -= 2;
        totalApScore += teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
        apTableSetup();

        // subtract 5 points from each dimension
        switch (currentPhase) {
            case 1: // phase 1
                sysArchP1Score -= 5;
                uxLeadP1Score -= 5
                techLeadP1Score -= 5;
                teamLeadP1Score -= 5;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                sysArchP2Score -= 5;
                uxLeadP2Score -= 5;
                techLeadP2Score -= 5;
                teamLeadP2Score -= 5;
                phase2ScoreSetup();
                break;
        }
    });

    if (ad) {
        ad.hide();
    }
}

// Major Event for DysTalk: Data Leak
let dataLeak = function(){
    const dl = document.getElementById('data-leak');

    if (dl) {
        dl.show();
    } else {
        ons.createElement('data-leak.html', { append: true })
            .then(function (dialog) {
                if (ieAlert && ieCounter >= 1 && ieCounter < weeks + 1) {
                    ieAlert.then(() => {
                        dialog.show();
                    })
                } else {
                    dialog.show();
                }
            });
    }
}

let coverLeak = function() {
    const dl = document.getElementById('data-leak');
    const cover = document.getElementById('cover-leak');
    majorEventOption = cover.innerText;
    sessionStorageSetup();

    // everyone loses 2 AP points
    teamLeadApScore -= 2;
    techLeadApScore -= 2;
    sysArchApScore -= 2;
    uxLeadApScore -= 2;
    totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    apTableSetup();

    // document.getElementById('team-lead-ap-score').innerHTML = teamLeadApScore;
    // document.getElementById('tech-lead-ap-score').innerHTML = techLeadApScore;
    // document.getElementById('sys-arch-ap-score').innerHTML = sysArchApScore;
    // document.getElementById('ux-lead-ap-score').innerHTML = uxLeadApScore;

    ons.notification.alert(`By covering up the data leak and keeping it to the team, everyone loses 2 action points, while the team lead, ${sessionStorage.getItem('Team Lead')}, receives an extra 5 points. <b>Note: this is a short-term solution.</b>`).then(() => {
        // add 5 points to team lead score, contributing to the total team score
        switch (currentPhase) {
            case 1: // phase 1
                teamLeadP1Score += 5;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                teamLeadP2Score += 5;
                phase2ScoreSetup();
                break;
        }
    });

    if (dl) {
        dl.hide();
    }
}

let discloseToBOD = function() {
    const dl = document.getElementById('data-leak');
    const board = document.getElementById('disclose-board');
    majorEventOption = board.innerText;
    sessionStorageSetup();

    ons.notification.alert(`The team lead ${sessionStorage.getItem('Team Lead')} loses 5 action points as well as 2 role points for disclosing the leak to the board of directors.`).then(() => {
        // subtract 5 AP points from team lead and total AP score
        teamLeadApScore -= 5;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
        // document.getElementById('team-lead-ap-score').innerHTML = teamLeadApScore;

        // subtract 2 points from team lead score
        switch (currentPhase) {
            case 1: // phase 1
                teamLeadP1Score -= 2;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                teamLeadP2Score -= 2;
                phase2ScoreSetup();
                break;
        }
    });

    if (dl) {
        dl.hide();
    }
}

let discloseToPublic = function() {
    const dl = document.getElementById('data-leak');
    const public = document.getElementById('disclose-public');
    majorEventOption = public.innerText;
    sessionStorageSetup();

    ons.notification.alert(`You demonstrate transparency by disclosing the data leak to the public. While it may be a wise decision now, it will severely hurt your profits in the long run and you must work overtime to fix the leak.<br/><br/>As a result, team lead ${sessionStorage.getItem('Team Lead')} and tech lead ${sessionStorage.getItem('Technical Lead')} both lose 5 points while systems architect ${sessionStorage.getItem('Systems Architect')} gains 5 points.`).then(() => {
        switch (currentPhase) {
            case 1: // phase 1
                sysArchP1Score += 2;
                techLeadP1Score -= 5
                teamLeadP1Score -= 5;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                sysArchP2Score += 2;
                techLeadP2Score -= 5;
                teamLeadP2Score -= 5;
                phase2ScoreSetup();
                break;
        }

    });

    if (dl) {
        dl.hide();
    }
}

// major event for earthbook: venture capital(ism)
let ventureCapitalism = function() {
    const vc = document.getElementById('venture-capitalism');

    if (vc) {
        vc.show();
    } else {
        ons.createElement('venture-capitalism.html', { append: true })
            .then(function (dialog) {
                if (ieAlert && ieCounter >= 1 && ieCounter < weeks + 1) {
                    ieAlert.then(() => {
                        dialog.show();
                    })
                } else {
                    dialog.show();
                }
            });
    }
}

let acceptVcOffer = function() {
    const vc = document.getElementById('venture-capitalism');
    const accept = document.getElementById('accept-vc');
    majorEventOption = accept.innerText;
    sessionStorageSetup();


    ons.notification.alert(`Short-term funding from venture capitalists will help you hit the ground running and turn <i>Earthbook</i> into a profitable business.<br/><br/>Everyone earns 5 team points and 3 action points.`).then(() => {
        teamLeadApScore += 3;
        techLeadApScore += 3;
        sysArchApScore += 3;
        uxLeadApScore += 3;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
        apTableSetup();

        switch (currentPhase) {
            case 1: // phase 1
                teamLeadP1Score += 5;
                techLeadP1Score += 5;
                sysArchP1Score += 5;
                uxLeadP1Score += 5;
                phase1ScoreSetup();
                break;
            case 2: // phase 2
                teamLeadP2Score += 5;
                techLeadP2Score += 5;
                sysArchP2Score += 5;
                uxLeadP2Score += 5;
                phase2ScoreSetup();
                break;
        }
    });

    if (vc) {
        vc.hide();
    }
}

let rejectContinue = function() {
    const vc = document.getElementById('venture-capitalism');
    const cont = document.getElementById('reject-continue');
    majorEventOption = cont.innerText;
    sessionStorageSetup();

    ons.notification.alert('You\'ve chosen the neutral option, so your scores will not be impacted. Carry on.');

    if (vc) {
        vc.hide();
    }
}

let rejectFormCoop = function() {
    const vc = document.getElementById('venture-capitalism');
    const coop = document.getElementById('reject-coop');
    majorEventOption = coop.innerText;
    sessionStorageSetup();

    ons.notification.alert(`While this may be a wise choice that aligns with <i>Earthbook</i>'s values, lack of funding from not receiving VC help means there are no immediate short-term effects.<br/><br/>Everyone loses all but 1 action point, and process quality has taken a hit; tech lead ${sessionStorage.getItem('Technical Lead')} loses 2 points.`).then(() => {
        if (teamLeadApScore > 0 && techLeadApScore > 0 && sysArchApScore > 0 && uxLeadApScore > 0) {
            teamLeadApScore = teamLeadApScore - (teamLeadApScore - 1);
            techLeadApScore = techLeadApScore - (techLeadApScore - 1);
            sysArchApScore = sysArchApScore - (sysArchApScore - 1);
            uxLeadApScore = uxLeadApScore - (uxLeadApScore - 1);
            totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
        }

        switch (currentPhase) {
            case 1:
                techLeadP1Score -= 2;
                phase1ScoreSetup();
                break;
            case 2:
                techLeadP2Score -= 2;
                phase2ScoreSetup();
                break;
        }
    });

    if (vc) {
        vc.hide();
    }
}

let triggerMajorEvent = function () {
    if (currentScenario === 'Angry Cats 🐱' && majorEventTriggered === 'no') {
        addiction();
        majorEventTriggered = 'yes';
        sessionStorageSetup();
    } else if (currentScenario === 'DysTalk 📞' && majorEventTriggered === 'no') {
        dataLeak();
        majorEventTriggered = 'yes';
        sessionStorageSetup();
    } else if (currentScenario === 'Earthbook 🌎' && majorEventTriggered === 'no') {
        ventureCapitalism();
        majorEventTriggered = 'yes';
        sessionStorageSetup();
    }
}