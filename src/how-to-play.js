document.getElementById('how-to-play').innerHTML = `
    <template id="how-to-play.html">
        <ons-page id="how-to-play">
            <ons-toolbar>
                <div class="left"><ons-back-button>Back to Game</ons-back-button></div>
                <div class="center">How to Play</div>
                <div class="right">
                    <ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="fa-lightbulb" size="25px"></ons-icon></ons-toolbar-button>
                </div>
            </ons-toolbar>
            
            <section style="text-align: center; padding: 10px">
                <div>
                    <h2>Player Order</h2>
                    <h3>The game is played in the following order, moving clockwise around the table:</h3>
                    <div style="margin-left: 15px; margin-right: 15px">
                        <p><b>Team</b> (Team Lead)</p>
                        <p><b>Process</b> (Tech Lead)</p>
                        <p><b>Internal</b> (Systems Architect)</p>
                        <p><b>External</b> (UX Lead)</p>
                    </div>
                    <br/>
                    <div style="margin-left: 15px; margin-right: 15px">
                        <h2>Playing a Card</h2>
                        <p>Simply scan the QR code on the card you would like to play by selecting <b>Scan QR Code on Card</b> and scanning the code with your camera. You will then be asked for confirmation in playing that card.</p>
                        <p>If you select <b>Yes</b>, scores will update based on the score values for that card (with the exception of <b>blank cards</b> where you can assign points across all players based on the total action points). Selecting <b>No</b> will not do anything, and the game continues.</p>
                    </div>
                    <br/>
                    <div style="margin-left: 15px; margin-right: 15px">
                        <h2>Major Events</h2>
                        <p>After each dimension reaches a number of points, a major event will occur, read aloud by the facilitator. This is where you choose between 3 options, and the scores will update based on your selection. A <b>future effect</b> will occur at the start of phase 3. More details about future effects can be read in the following section.</p>
                    </div>
                    <br/>
                    <div style="margin-left: 15px; margin-right: 15px">
                        <h2>Future Effects</h2>
                        <p>As part of the intertemporal nature of <i>Undecided?</i>, future effects based on the choice you made for the major event will have positive, negative, or neutral consequences once phase 3 begins.</p>
                    </div>
                </div>
            </section>
        </ons-page>
    </template>
`;