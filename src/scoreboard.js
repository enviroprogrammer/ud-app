let showResetScoreboardDialog = function() {
    let rs = document.getElementById('reset-scoreboard-dialog');

    if (rs) {
        rs.show();
    } else {
        ons.createElement('reset-scoreboard.html', { append: true })
            .then(function(dialog) {
                dialog.show();
            });
    }
}

let hideResetScoreboardDialog = function() {
    let rs = document.getElementById('reset-scoreboard-dialog');

    if (rs) {
        rs.hide();
    }
}

let showBackToScenariosDialog = function() {
    let bts = document.getElementById('back-to-scenarios');

    if (bts) {
        bts.show();
    } else {
        ons.createElement('back-to-scenarios.html', { append: true })
            .then(function(dialog) {
                dialog.show();
            });
    }
}

// reset entire scoreboard and start at phase 1
let resetScoreboard = function() {
    techLeadP1Score = 0;
    techLeadP2Score = 0;
    techLeadP3Score = 0;

    teamLeadP1Score = 0;
    teamLeadP2Score = 0;
    teamLeadP3Score = 0;

    sysArchP1Score = 0;
    sysArchP2Score = 0;
    sysArchP3Score = 0;

    uxLeadP1Score = 0;
    uxLeadP2Score = 0;
    uxLeadP3Score = 0;

    teamLeadApScore = 0;
    techLeadApScore = 0;
    sysArchApScore = 0;
    uxLeadApScore = 0;
    totalApScore = 0;

    teamLeadBlank = 0;
    techLeadBlank = 0;
    sysArchBlank = 0;
    uxLeadBlank = 0;

    totalPhase1Score = 0;
    totalPhase2Score = 0;
    totalPhase3Score = 0;

    currentPhase = 1;
    sessionStorage.setItem('Phase', currentPhase);
    currentRound = 1;
    setCurrentRound();

    currentPlayer = orderedPlayerArray[0];
    setCurrentPlayer(currentPlayer);

    majorEventTriggered = 'no';
    majorEventOption = '';
    futureEffectTriggered = 'no';
    noPointsCounted = 'no';
    disclosedToBOD = 'no';

    const ad = document.getElementById('addiction');
    const dl = document.getElementById('data-leak');
    const vc = document.getElementById('venture-capitalism');

    if (ad) {
        ad.remove();
    } else if (dl) {
        dl.remove();
    } else if (vc) {
        vc.remove();
    }

    if (document.getElementById('reset-scoreboard-dialog')) {
        document.getElementById('reset-scoreboard-dialog').hide();
    }

    initialScoreSetup();
    blankCardScoreSetup();
    if (cardWithITElement) {
        cardWithITElement = '';
        ieCounter = 0;
        setCardWithITElement(cardWithITElement);
        sessionStorage.removeItem('Card with Intertemporal Element');
    }

    if (document.getElementById('scan-qr').disabled === true) {
        document.getElementById('scan-qr').disabled = false;
    }
}

let resetScoreboardAndScenario = function() {
    resetScoreboard();
    document.querySelector('ons-navigator').popPage().then(() => {
        hideBackToScenariosDialog();
    });
}

let hideBackToScenariosDialog = function() {
    let bts = document.getElementById('back-to-scenarios');

    if (bts) {
        bts.hide();
    }
}

let showReturnHomeDialog = function() {
    const rh = document.getElementById('return-home-dialog');

    if (rh) {
        rh.show();
    } else {
        ons.createElement('return-home-dialog.html', { append: true })
            .then(function(dialog) {
                dialog.show();
            })
    }
}

let hideReturnHomeDialog = function() {
    const rh = document.getElementById('return-home-dialog');

    if (rh) {
        rh.hide();
    }
}

document.getElementById('scorecard').innerHTML = `
    <template id="scorecard.html">
        <ons-page id="scorecard">
            <ons-toolbar>
                <div class="left">
                    <ons-toolbar-button><ons-icon id="help" icon="ion-ios-help-circle-outline, material:md-help-outline" size="25px"></ons-icon></ons-toolbar-button>
<!--                    <ons-toolbar-button><ons-icon id="home" icon="ion-ios-home, material:md-home" onclick="window.location = '/'"></ons-icon></ons-toolbar-button>-->
                </div>
                <div class="center"></div>
                <div class="right">
                    <ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="fa-lightbulb" size="25px"></ons-icon></ons-toolbar-button>
                </div>
            </ons-toolbar>
            
            <section style="text-align: center; padding: 10px">
                <div id="tables">
                    <h1 id="current-phase"></h1>
                    <h1 id="current-round"></h1>
                    <h1 id="current-player"></h1>
                    <br/><br/>
                    <h2>Team Scores</h2>
                    <table id="team-scorecard-table" style="width: 100%;">
                        <tr id="team-headers">
                            <th>Phase</th>
                            <th id="team"></th>
                            <th id="process"></th>
                            <th id="internal"></th>
                            <th id="external"></th>
                            <th>Total</th>
                        </tr>
                        <tr id="p1-team-scores">
                            <td id="phase-1">1</td>
                            <td id="team-lead-phase-1"></td>
                            <td id="tech-lead-phase-1"></td>
                            <td id="sys-arch-phase-1"></td>
                            <td id="ux-lead-phase-1"></td>
                            <td id="total-phase-1"></td>
                        </tr>
                        <tr id="p2-team-scores">
                            <td id="phase-2">2</td>
                            <td id="team-lead-phase-2"></td>
                            <td id="tech-lead-phase-2"></td>
                            <td id="sys-arch-phase-2"></td>
                            <td id="ux-lead-phase-2"></td>
                            <td id="total-phase-2"></td>
                        </tr>
                        <tr id="p3-team-scores">
                            <td id="phase-3">3</td>
                            <td id="team-lead-phase-3"></td>
                            <td id="tech-lead-phase-3"></td>
                            <td id="sys-arch-phase-3"></td>
                            <td id="ux-lead-phase-3"></td>
                            <td id="total-phase-3"></td>
                        </tr>
                    </table>
                </div>
                <div style="padding: 10px;">
                    <h2>Individual Action Points</h2>
                    <table id="ap-scorecard-table" style="width: 100%;">
                        <tr id="ap-headers">
                            <th id="team-lead"></th>
                            <th id="tech-lead"></th>
                            <th id="sys-arch"></th>
                            <th id="ux-lead"></th>
                            <th id="total-ap">Total</th>
                        </tr>
                        <tr id=ap-scores">
                            <td id="team-lead-ap-score"></td>
                            <td id="tech-lead-ap-score"></td>
                            <td id="sys-arch-ap-score"></td>
                            <td id="ux-lead-ap-score"></td>
                            <td id="total-ap-score"></td>
                        </tr>
                    </table>
                </div>
                <div style="padding: 10px;">
                    <h2>Blank Cards</h2>
                    <table id="blank-scorecard-table" style="width: 100%;">
                        <tr id="blank-headers">
                            <th id="team-lead-blank"></th>
                            <th id="tech-lead-blank"></th>
                            <th id="sys-arch-blank"></th>
                            <th id="ux-lead-blank"></th>
                        </tr>
                        <tr id="blank-cards">
                            <td id="team-lead-blank-score"></td>
                            <td id="tech-lead-blank-score"></td>
                            <td id="sys-arch-blank-score"></td>
                            <td id="ux-lead-blank-score"></td>
                        </tr>
                    </table>
                </div>
                <div>
                </div>
                <div id="buttons">
                <br/>
                    <div><ons-button id="scan-qr" onclick="showScannerDialog()">
                        <ons-icon icon="fa-qrcode" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Scan QR Code to Play Card
                    </ons-button></div>
                    <br/>
                    <div><ons-button id="reset" onclick="showResetScoreboardDialog()">
                        <ons-icon icon="ion-ios-refresh, material:md-rotate-right" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Reset Scoreboard
                    </ons-button></div>
                    <br/>
                    <div><ons-button id="change-scenario" onclick="showBackToScenariosDialog()">
                        <ons-icon icon="ion-ios-shuffle, material:md-shuffle" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Change Scenario
                    </ons-button></div>
                    <br/>
                    <div><ons-button id="start-milestone-review" onclick="milestoneReview()">
                        <ons-icon icon="fa-ticket" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Gate Pass
                    </ons-button></div>
                    <br/>
                    <div><ons-button id="home" onclick="showReturnHomeDialog()">
                        <ons-icon icon="ion-ios-home, material:md-home" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Return Home
                    </ons-button></div>
                </div>
                
<!--              <ons-fab position="bottom right" onclick="toggleMode()">-->
<!--                <ons-icon id="toggle" icon="fa-lightbulb" size="60px" style="vertical-align: middle"></ons-icon>-->
<!--              </ons-fab>-->
            </section>
        </ons-page>
    </template>
    
    <template id="qr-code-scanner.html">
        <ons-dialog id="qr-code-scanner">
            <div style="display: flex; flex-direction: column; align-items: center; padding: 10px;">
                <h3 style="text-align: center">Use your phone's camera to scan the QR code on the card you wish to play!</h3>
                <div>
                    <div id="reader"></div>
                </div>
                <div style="margin-top: 10px">
                    <ons-button onclick="hideScannerDialog()">
                        <ons-icon icon="ion-ios-arrow-back, material:md-long-arrow-left" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                        Back to Game
                    </ons-button>
                </div>
            </div>
        </ons-dialog>
    </template>
    
    <template id="play-card-dialog.html">
        <ons-alert-dialog id="play-card-dialog" modifier="rowfooter">
            <div class="alert-dialog-title" id="qr-card"></div>
            <div class="alert-dialog-content" id="qr-result"></div>
            <div class="alert-dialog-footer">
                <ons-alert-dialog-button onclick="playCard()">Yes</ons-alert-dialog-button>
                <ons-alert-dialog-button style="color: red;" onclick="hidePlayCardDialog()">No</ons-alert-dialog-button>
            </div>
        </ons-alert-dialog>
    </template>
    
    <template id="addiction.html">
       <ons-dialog id="addiction">
        <div style="text-align: center; padding: 10px; height: 70vh; overflow-y: auto">
            <h3>Addiction!</h3>
            <p>Digital productivity critics found out about <i>Angry Cats</i> and have started to voice their concerns about the game. They argue that games like <i>Angry Cats</i> promote mobile gaming addiction and technological dependence, leading to mixed media attention. Your team must decide how to proceed after hearing about this.</p>
            <div style="text-align: center; padding: 10px;">
                <b>Choose from one of the following options:</b>
                <p><b>Invest in addiction increase:</b> Your team sees this as an opportunity to make the game catchier and more viral in hopes of getting critics hooked onto <i>Angry Cats</i>. You invest more resources into feature development and research to increase user interest and retention.</p>
                <p><b>Bribe critics:</b> You ignore any critics and continue to diligently work on <i>Angry Cats</i>. However, the critics won't budge. Your team confronts them by bribing them to be quiet or to say positive things about <i>Angry Cats</i>.</p>
                <p><b>Work with addiction experts:</b> You take the critics' concerns seriously and invite digital addiction experts to ensure that the game is not harmful at all. You find ways to balance players' wellbeing with company profit.</p>
                <br/><br/>
                <div>
                    <ons-button id="invest-addiction" onclick="raiseAddictionLevels()">Invest in addiction increase</ons-button>
                </div>
                <br/>
                <div>
                    <ons-button id="bribe-critics" onclick="bribeCritics()">Bribe critics</ons-button>
                </div>
                <br/>
                <div>
                    <ons-button id="work-with-experts" onclick="workWithExperts()">Work with addiction experts</ons-button>
                </div>
            </div>
        </div>
    </template>
    
    <template id="data-leak.html">
        <ons-dialog id="data-leak">
            <div style="text-align: center; padding: 10px; height: 70vh; overflow-y: auto">
                <h3>Data Leak</h3>
                <p>Despite making great progress on starting <i>DysTalk</i>, a data leak has just occurred. Your competitors hired a security consultant to gain access to your system and, ultimately, <i>DysTalk</i>'s data. Luckily, not much user data has been collected, and not a lot has been built yet, but some chat content has been leaked from test sessions. Your team can still pick up where you left off, but with some small hits.</p>
                <div style="text-align: center; padding: 10px;">
                    <b>Choose one of the following 3 options:</b>
                    <p><b>Cover up leak:</b> keep the knowledge of the leak within the team</p>
                    <p><b>Disclose to board of directors:</b> the board of directors will ensure proper measures are taken in the future, but they will not go public with the leak</p>
                    <p><b>Disclose to public:</b> by disclosing the leak to the public, those affected will know that their account has been compromised</p>
                    <br/><br/>
                    <div>
                        <ons-button id="cover-leak" onclick="coverLeak()">Cover up leak</ons-button>
                    </div>
                    <br/>
                    <div>
                        <ons-button id="disclose-board" onclick="discloseToBOD()">Disclose to board of directors</ons-button>
                    </div>
                    <br/>
                    <div>
                        <ons-button id="disclose-public" onclick="discloseToPublic()">Disclose to public</ons-button>
                    </div>
                </div>
            </div>
        </ons-dialog>
    </template>
    
    <template id="venture-capitalism.html">
        <ons-dialog id="venture-capitalism">
            <div style="text-align: center; padding: 10px; height: 70vh; overflow-y: auto">
                <h3>Venture Capital(ism)</h3>
                <p><i>Earthbook</i> circulates around well-known venture capital (VC) firms who are very receptive to the idea. Pre-seed venture capitalists firmly believe that <i>Earthbook</i> has massive growth potential. To fuel their constant desire to maximize profit in a capitalist society, they offer to invest in <i>Earthbook</i>, expand their portfolio, and transform it from a simple idea into a business plan. Your team must decide on how to proceed.</p>
                <br/><br/>
                <div style="text-align: center; padding: 10px;">
                    <b>Choose one of the following 3 options:</b>
                    <p><b>Accept VC offer:</b> You view this as an opportunity for <i>Earthbook</i>'s growth. You will lose creative control over <i>Earthbook</i>, but you'll receive mentorship and funding from venture capitalists.</p>
                    <p><b>Reject VC offer:</b> The offer sounds promising, but you'd rather have <i>Earthbook</i> supported by donations instead of turn it into a VC-backed company for profit.</p>
                    <p><b>Become coop:</b> Because Earthbook thrives on sustainability. Sustainability heavily prides itself on cutting down on energy and resource consumption to prioritize human wellbeing over profit within planetary boundaries. This is also known as <b>degrowth</b>. As a result, you decide to turn Earthbook into a coop.</p>
                    <br/><br/>
                    <div>
                        <ons-button id="accept-vc" onclick="acceptVcOffer()">Accept VC offer</ons-button>
                    </div>
                    <br/>
                    <div>
                        <ons-button id="reject-continue" onclick="rejectContinue()">Reject VC offer</ons-button>
                    </div>
                    <br/>
                    <div>
                        <ons-button id="reject-coop" onclick="rejectFormCoop()">Become coop</ons-button>
                    </div>
                </div>
            </div>
        </ons-dialog>
    </template>
    
    <template id="blank-card.html">
       <ons-dialog id="blank-card-dialog">
        <div style="text-align: center; padding: 10px;">
            <h3>How would you like to distribute points?</h3>
            <b>Note: Points must add up to the sum of the total action points.</b>
            <div style="display: flex; flex-direction: row">
                <div style="display: flex; align-items: center; flex-direction: column;">
                    <p><b>Action Points Per Player</b></p>
                    <p id="team-lead-ap-total"></p>
                    <p id="tech-lead-ap-total"></p>
                    <p id="sys-arch-ap-total"></p>
                    <p id="ux-lead-ap-total"></p>
                </div>
                <div style="display: flex; align-items: center; flex-direction: column;">
                    <p><b>Total Action Points</b></p>
                    <p style="font-size: 50px;" id="ap-total"></p>
                </div>
                <div style="display: flex; align-items: center; flex-direction: column; justify-content: space-between">
                    <p><b>Point Distribution</b></p>
                    <label for="bc-team-lead">Team Lead: </label><input type="number" name="bc-points" id="bc-team-lead" value="0" min="0" max="100">
                    <br/>
                    <label for="bc-tech-lead">Tech Lead: </label><input type="number" name="bc-points" id="bc-tech-lead" value="0" min="0" max="100">
                    <br/>
                    <label for="bc-sys-arch">Systems Architect: </label><input type="number" name="bc-points" id="bc-sys-arch" value="0" min="0" max="100">
                    <br/>
                    <label for="bc-ux-lead">UX Lead: </label><input type="number" name="bc-points" id="bc-ux-lead" value="0" min="0" max="100">
                </div>
            </div>

            <br/><br/>
            <ons-button onclick="playBlankCard()">
                <ons-icon icon="fa-divide" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                Distribute Points
            </ons-button>
        </div>
    </template>
    
    <template id="milestone-review.html">
        <ons-dialog id="milestone-review">
            <div style="text-align: center; padding: 10px;">
                <h3>Vote on the best narrative!</h3>
                <div id="votes" style="display: flex; flex-direction: column; align-items: center">
                    <div style="display: flex; flex-direction: row">
                        <label for="team-lead"></label><input type="number" name="mr-vote" id="bc-tech-lead" value="0" min="0" max="100">
                    </div>
    
                    <div style="display: flex; flex-direction: row">
                        <label for="tech-lead"></label><input type="number" name="mr-vote" id="bc-tech-lead" value="0" min="0" max="100">
                    </div>
                    
                    <div style="display: flex; flex-direction: row">
                        <label for="sys-arch"></label><input type="number" name="mr-vote" id="bc-tech-lead" value="0" min="0" max="100">
                    </div>
                    
                    <div style="display: flex; flex-direction: row">
                        <label for="ux-lead"></label><input type="number" name="mr-vote" id="bc-tech-lead" value="0" min="0" max="100">
                    </div>
                    <div style="padding-top: 10px">
                        <ons-button onclick="showWinner()">
                            <ons-icon icon="ion-ios-checkmark-circle, material:md-check-circle" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                            Submit Votes
                        </ons-button>
                        <br/><br/>
                        <ons-button onclick="hideMilestoneReview()">
                            <ons-icon icon="ion-ios-arrow-back, material:md-long-arrow-left" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                            Back to Game
                        </ons-button>
                    </div>
                </div>
            </div>
        </ons-dialog>
    </template>
    
    <template id="best-narrative.html">
        <ons-dialog id="best-narrative">
            <div style="text-align: center; padding: 10px;">
                <h3>Winner, winner, chicken dinner <span role="img" aria-label="chicken">🍗</span></h3>
                <div id="winner" style="font-size: 18px; margin-bottom: 20px" ></div>
                <div><ons-button onclick="displayCurrentTeamScores()">
                    <ons-icon icon="fa-torii-gate" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                    Check Gate Conditions
                </ons-button></div>
            </div>
        </ons-dialog>
    </template>
    
    <template id="gate-check.html">
        <ons-dialog id="gate-check">
            <div style="text-align: center; padding: 10px;">
                <h3>Team Scores:</h3>
                <br/>
                <div style="font-size: 18px"><i><b>Note to facilitator:</b> reveal both team and gate scores and let the team know whether they've passed the gate.</i></div>
                <br/>
                <table id="team-scores" style="width: 100%;">
                    <tr>
                        <th id="tl-header"></th>
                        <th id="techl-header"></th>
                        <th id="sa-header"></th>
                        <th id="ux-header"></th>
                    </tr>
                    <tr>
                        <td id="current-team-lead-score"></td>
                        <td id="current-tech-lead-score"></td>
                        <td id="current-sys-arch-score"></td>
                        <td id="current-ux-lead-score"></td>
                    </tr>
                </table>
                <br/>
                <table id="gate-scores" style="width: 100%">
                    <h3>Gate Scores:</h3>
                    <br/>
                        <tr>
                            <th id="gs-tl-header"></th>
                            <th id="gs-techl-header"></th>
                            <th id="gs-sa-header"></th>
                            <th id="gs-ux-header"></th>
                        </tr>
                        <tr>
                            <td id="team-lead-gate-score"></td>
                            <td id="tech-lead-gate-score"></td>
                            <td id="sys-arch-gate-score"></td>
                            <td id="ux-lead-gate-score"></td>
                        </tr>
                </table>
                <br/>
                <ons-button onclick="gateConditions()">
                    <ons-icon icon="fa-arrow-right" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                    Next Steps
                </ons-button>
            </div>
        </ons-dialog>
    </template>
    
    <template id="reset-scoreboard.html">
        <ons-alert-dialog id="reset-scoreboard-dialog" modifier="rowfooter">
            <div id="reset-scoreboard-title" class="alert-dialog-title">Reset Scoreboard</div>
            <div id="reset-scoreboard-content" class="alert-dialog-content">
                Are you sure you want to reset the scoreboard?
            </div>
            <div class="alert-dialog-footer">
                <ons-alert-dialog-button onclick="resetScoreboard()">Yes</ons-alert-dialog-button>
                <ons-alert-dialog-button style="color: red;" onclick="hideResetScoreboardDialog()">No</ons-alert-dialog-button>
            </div>
        </ons-alert-dialog>
    </template>
    
    <template id="back-to-scenarios.html">
        <ons-alert-dialog id="back-to-scenarios" modifier="rowfooter">
            <div class="alert-dialog-title">Change Scenario</div>
            <div class="alert-dialog-content">
                Are you sure you want to change the game scenario? Doing so will reset the entire scoreboard.
            </div>
            <div class="alert-dialog-footer">
                <ons-alert-dialog-button id="yes-back-to-scenarios" onclick="resetScoreboardAndScenario()">Yes</ons-alert-dialog-button>
                <ons-alert-dialog-button style="color: red;" onclick="hideBackToScenariosDialog()">No</ons-alert-dialog-button>
            </div>
        </ons-alert-dialog>
    </template>
    
    <-- new staff card: dystalk version -->
    <template id="dt-new-staff.html">
        <ons-dialog id="dt-new-staff">
            <div style="text-align: center; padding: 10px;">
                <h4>Roll the dice to determine the success of your new teammate, who is a security expert.</h4>
                <br/>
                <div><img src="/dice-six-svgrepo-com.svg" alt="dice" style="width: 100%;" onclick="diceRoll()"></div>
                <br/>
            </div>
        </ons-dialog>
    </template>
    
    <-- new staff card: angry cats version -->
    <template id="ac-new-staff.html">
        <ons-dialog id="ac-new-staff">
            <div style="text-align: center; padding: 10px;">
                <h4>Roll the dice to determine the success of your new teammate, who is a game developer.</h4>
                <br/>
                <div><img src="/dice-six-svgrepo-com.svg" alt="dice" style="width: 100%;" onclick="diceRoll()"></div>
                <br/>
            </div>
        </ons-dialog>
    </template>
    
    <template id="comp-commotion-a.html">
        <ons-dialog id="comp-commotion-a">
            <div style="text-align: center; padding: 10px;">
                <h4>Roll the dice to determine if you will lose your teammate to your competitor.</h4>
                <br/>
                <div><img src="/dice-six-svgrepo-com.svg" alt="dice" style="width: 100%;" onclick="diceRoll()"></div>
                <br/>
            </div>
        </ons-dialog>
    </template>
    
    <template id="ac-comp-commotion-b.html">
        <ons-dialog id="ac-comp-commotion-b">
            <div style="text-align: center; padding: 10px;">
                <h4>Roll the dice to determine the success of your competitor's new game.</h4>
                <br/>
                <div><img src="/dice-six-svgrepo-com.svg" alt="dice" style="width: 100%;" onclick="diceRoll()"></div>
                <br/>
            </div>
        </ons-dialog>
    </template>
    
    <template id="return-home-dialog.html">
        <ons-alert-dialog id="return-home-dialog" modifier="rowfooter">
            <div class="alert-dialog-title">Return Home</div>
            <div class="alert-dialog-content">Are you sure you want to return to the homepage? Doing so will erase all game data.</div>
            <div class="alert-dialog-footer">
                <ons-alert-dialog-button id="yes-home" onclick="window.location.href = '/'">Yes</ons-alert-dialog-button>
                <ons-alert-dialog-button id="no-home" style="color: red" onclick="hideReturnHomeDialog()">No</ons-alert-dialog-button>
            </div>
        </ons-alert-dialog>
    </template>
`