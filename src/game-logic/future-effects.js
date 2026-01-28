// keep track of whether a future effect from a major event has been triggered (in phase 3) so that the dialog only shows up once. initial value set to no.
let futureEffectTriggered = 'no';

// alert box shows up when a future effect is triggered
let feAlert;

// on android, the major event choices appear in all caps (e.g. BRIBE CRITICS) so i accounted for that
let bribeCriticsFutureEffect = function() {
    if (majorEventOption === 'Bribe critics' || majorEventOption === 'BRIBE CRITICS') {
        teamLeadP3Score -= 5;
        techLeadP3Score -= 5;
        sysArchP3Score -= 5;
        uxLeadP3Score -= 5;

        totalTeamLeadScore -= 5;
        totalTechLeadScore -= 5;
        totalSysArchScore -= 5;
        totalUXLeadScore -= 5;

        teamLeadApScore -= 5;
        techLeadApScore -= 5;
        sysArchApScore -= 5;
        uxLeadApScore -= 5;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    }
}

let addictionExpertsFutureEffect = function() {
    if (majorEventOption === 'Work with addiction experts' || majorEventOption === 'WORK WITH ADDICTION EXPERTS') {
        teamLeadP3Score += 5;
        techLeadP3Score += 5;
        sysArchP3Score += 5;
        uxLeadP3Score += 5;

        totalTeamLeadScore += 5;
        totalTechLeadScore += 5;
        totalSysArchScore += 5;
        totalUXLeadScore += 5;

        teamLeadApScore += 4;
        techLeadApScore += 4;
        sysArchApScore += 4;
        uxLeadApScore += 4;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    }
}

let bodFutureEffect = function() {
    if (majorEventOption === 'Disclose to board of directors' || majorEventOption === 'DISCLOSE TO BOARD OF DIRECTORS') {
        disclosedToBOD = 'yes';
        noPointsCounted = 'yes';

        teamLeadP3Score -= 5;
        techLeadP3Score -= 5;

        totalTeamLeadScore -= 5;
        totalTechLeadScore -= 5;
    }
}

let publicFutureEffect = function() {
    if (majorEventOption === 'Disclose to public' || majorEventOption === 'DISCLOSE TO PUBLIC') {
        teamLeadP3Score += 5;
        totalTeamLeadScore += 5;

        teamLeadApScore += 2;
        techLeadApScore += 2;
        sysArchApScore += 2;
        uxLeadApScore += 2;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    }
}

let vcFutureEffect = function() {
    if (majorEventOption === 'Accept VC offer' || majorEventOption === 'ACCEPT VC OFFER') {
        teamLeadP3Score -= 10;
        techLeadP3Score -= 10;
        sysArchP3Score -= 10;
        uxLeadP3Score -= 10;

        totalTeamLeadScore -= 10;
        totalTechLeadScore -= 10;
        totalSysArchScore -= 10;
        totalUXLeadScore -= 10;

        teamLeadApScore -= 5;
        techLeadApScore -= 5;
        sysArchApScore -= 5;
        uxLeadApScore -= 5;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    }
}

let coopFutureEffect = function() {
    if (majorEventOption === 'Become coop' || majorEventOption === 'BECOME COOP') {
        becomeCoop = true;

        teamLeadP3Score += 5;
        techLeadP3Score += 5;
        sysArchP3Score += 5;
        uxLeadP3Score += 5;

        totalTeamLeadScore += 5;
        totalTechLeadScore += 5;
        totalSysArchScore += 5;
        totalUXLeadScore += 5;

        teamLeadApScore += 5;
        techLeadApScore += 5;
        sysArchApScore += 5;
        uxLeadApScore += 5;
        totalApScore = teamLeadApScore + techLeadApScore + sysArchApScore + uxLeadApScore;
    }
}

let futureEffect = function() {
    if (futureEffectTriggered === 'yes') {
        if (majorEventOption === ' Invest in addiction increase' || majorEventOption === ' INVEST IN ADDICTION INCREASE') {
            gameOver();
        } else if (majorEventOption === ' Bribe critics' || majorEventOption === ' BRIBE CRITICS') {
            feAlert = ons.notification.alert('Because you have chosen death - I mean, bribing the critics and ignoring the addiction controversy - all of you have lost 5 points. 2 action points have been deducted from everyone as well.')
            .then(() => {
                bribeCriticsFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        } else if (majorEventOption === ' Work with addiction experts' || majorEventOption === ' WORK WITH ADDICTION EXPERTS') {
            feAlert = ons.notification.alert(`At a game conference, you spill all the tea on how <i>Angry Cats</i> can be fun and compelling without being addictive. You later receive extensive media coverage, ranging from news features to magazine interviews. Many notable game publishers have even approached you with wonderful offers.<br/><br/>Let's also give a shoutout to ${sessionStorage.getItem('Team Lead')} for their promotion!<br/><br/>Also, everyone gets 4 action points and 5 team points! (Oprah voice: You get points! And you get points!) Keep up the good work!`)
            .then(() => {
                addictionExpertsFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        } else if (majorEventOption === ' Cover up leak' || majorEventOption === ' COVER UP LEAK') {
            gameOver();
        } else if (majorEventOption === ' Disclose to board of directors' || majorEventOption === ' DISCLOSE TO BOARD OF DIRECTORS') {
            feAlert = ons.notification.alert(`The board of directors decided not to reveal the data leak to the public, and so the public is calling for disciplinary action. As a consequence, a board member gets fired, and all senior levels have been demoted. You must rebrand if you want to continue with launching <i>DysTalk</i>. You will be backed by an oversight committee, appointed by the board of directors, to see this rebranding through.<br/><br/>No team points will be counted for the next round. Team lead and tech lead, ${sessionStorage.getItem('Team Lead')} and ${sessionStorage.getItem('Technical Lead')}, lose 5 team points each.`)
            .then(() => {
                bodFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        } else if (majorEventOption === ' Disclose to public' || majorEventOption === ' DISCLOSE TO PUBLIC') {
            feAlert = ons.notification.alert(`They say honesty is the best policy. It clearly shows in your efforts in addressing the issues you faced earlier with great honesty. You become the recipient of the first good corporate digital citizenship award from a privacy foundation, and the media now have a greater interest in <i>DysTalk</i>. Best of all, the board of directors express their trust in you!<br/><br/>Everyone gets an extra 2 action points and team lead ${sessionStorage.getItem('Team Lead')} gets an extra 5 points for the team! Fantastic!`)
            .then(() => {
                publicFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        } else if (majorEventOption === ' Accept VC offer' || majorEventOption === ' ACCEPT VC OFFER') {
            feAlert = ons.notification.alert(`Up until this point, you believe you have been successful thanks to the venture capitalists\' efforts. Come to find out, they decide to sell <i>Earthbook</i> to a reputable climate tech startup, leading to a payout.<br/><br/>Sure, you may have won through receiving this payout, but ultimately, you all lost because you decided to make <i>Earthbook</i> for profit and have failed to make the world a better place. All of you have lost 10 team points and 5 action points.`).then(() => {
                vcFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        } else if (majorEventOption === ' Reject offer and continue' || majorEventOption === ' REJECT OFFER AND CONTINUE') {
            feAlert = ons.notification.alert('Nothing to see here. Move along.')
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            });
        } else if (majorEventOption === ' Reject offer and become coop' || majorEventOption === ' REJECT OFFER AND BECOME COOP') {
            feAlert = ons.notification.alert(`While there were little to no short-term effects with <i>Earthbook</i>, the long-term effects are actually very positive because you decided to form a coop rather than accept venture capital funding. <i>Earthbook</i> ends up going viral among many environmentalist circles around the world, with more new users than you can count joining every week! Some of these new users say that it is far better than Facebook and other mainstream social networks, and they have never looked back.<br/><br/>Everyone has earned 5 team points and 5 action points each. Amazing work!`).then(() => {
                coopFutureEffect();
            })
            .then(() => {
                if (cardWithITElement) {
                    intertemporalElement(cardWithITElement);
                }
            })
            .then(() => {
                phase3ScoreSetup();
            });
        }
    }
}