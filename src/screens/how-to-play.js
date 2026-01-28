document.getElementById('how-to-play').innerHTML = `
    <template id="how-to-play.html">
        <ons-page id="how-to-play">
            <ons-toolbar>
                <div class="left"><ons-back-button>Back to Game</ons-back-button></div>
                <div class="center">How to Play</div>
                <div class="right">
                    <ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="ion-ios-contrast, material:md-brightness-6" size="25px"></ons-icon></ons-toolbar-button>
                </div>
            </ons-toolbar>
            
            <section style="text-align: center; padding: 10px; margin-left: 15px; margin-right: 15px">
                <div>
                    <h2>Player Order</h2>
                    <div style="font-size: 18px">
                        <p>The game is played in the following order, moving clockwise around the table:</p>
                        <p><b>Team</b> (Team Lead)</p>
                        <p><b>Process</b> (Tech Lead)</p>
                        <p><b>Internal</b> (Systems Architect)</p>
                        <p><b>External</b> (UX Lead)</p>
                    </div>
                </div>
                <br/>
                <div>
                    <h2>Cards</h2>
                    <div style="font-size: 18px">
                        <p>Each player starts by drawing <b>five cards</b> to their hand, laid <b>face up.</b></p>
                        <p>If a card is to be played <b>immediately</b>, place that card on the board and draw another card.</p>
                        <p>Some cards have the option to <b>be played immediately</b> or <b>be added to your hand.</b> If you decide to play the card immediately, follow the instructions provided on that card.</p>
                    </div>
                </div>
                <br/>
                <div>
                    <h2>Playing a Card</h2>
                    <div style="font-size: 18px">
                        <p>Simply scan the QR code on the card you would like to play by selecting <b>Scan QR Code on Card</b> and scanning the code with your camera. You will then be asked for confirmation in playing that card.</p>
                        <p>If you select <b>Yes</b>, scores will be updated automatically based on the card's score values, or further action needs to be done. For example, you may be asked to roll on-screen dice to determine the card's fate, or choose whether you'd like play a card immediately or add it to the hand instead.</p>
                        <p>If you play a <b>blank card</b>, however, you can distribute the total action points across all players.</p>
                        <p>Selecting <b>No</b> will not do anything, and the game continues.</p>
                    </div>
                </div>
                <br/>
                <div>
                    <h2>Major Events</h2>
                    <div style="font-size: 18px">
                        <p>After each of the four dimensions (team, process, internal, external) reaches a <b>certain number of points</b>, a <b>major event</b> for the current scenario will occur.</p>
                        <p>The major event, along with the <b>three options</b> for that event, will be read aloud by the facilitator. You will then choose <b>one of the three options</b>, and the scores will update <b>based on your selection.</b></p>
                        <p>A <b>future effect</b> will occur at the start of phase 3. More details about future effects can be read in the following section.</p>
                    </div>
                </div>
                <br/>
                <div>
                    <h2>Future Effects</h2>
                    <div style="font-size: 18px">
                        <p>As part of the <b>intertemporal nature</b> of <i>Undecided?</i>, future effects based on the choice you made for the major event will have <b>positive, negative, or neutral consequences</b> once phase 3 begins.</p>
                    </div>
                </div>
                <br/>
                <div>
                    <h2>Milestone Review and Gate Pass</h2>
                    <div style="font-size: 18px">
                        <p>Once a card has been laid over the gate (indicated by the orange borders on the game board), <b>a milestone review</b> will be conducted. Players go around the table and craft a <b>narrative</b> about the progress they have made thus far.</p>
                        <p>Players will then <b>vote</b> on who they thought had the best narrative. The person with the most votes is then revealed.</p>
                        <p>Afterwards, the <b>team scores</b> are revealed along with the scores needed to <b>move on to the next phase</b>. If the team passes, they move on. If not, the card that has been laid over the gate must be <b>turned over</b>, making this card a <b>dead card</b>. The dead card does not add to the team score. However, players have the opportunity to try again.</p>
                    </div>
                </div>
            </section>
        </ons-page>
    </template>
`;