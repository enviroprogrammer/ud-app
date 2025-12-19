document.getElementById('about').innerHTML = `
    <template id="about.html">
        <ons-page id="about">
          <ons-toolbar>
            <div class="left"><ons-back-button>Home</ons-back-button></div>
            <div class="center">About Undecided?</div>
            <div class="right">
                <ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="fa-lightbulb" size="25px"></ons-icon></ons-toolbar-button>
            </div>
          </ons-toolbar>
          <section style="text-align: center">
            <h2>About <i>Undecided?</i></h2>
            <div style="margin-left: 15px; margin-right: 15px; font-size: 18px">
                <p>                
                    <i>Undecided?</i> is an educational tabletop board game designed to equip players with a solid foundation of project management as well as software, product, and systems development. It is played in groups of <b>4 or more.</b>
                </p>
                <p>
                    The game board is split into <b>3 phases</b> to simulate real-world software project phases, and <b>playable cards</b> simulate actions typically found in software development workflows.
                </p>
                <p>Players work together in teams to complete a given <b>project</b>, as indicated in the game <b>scenario</b>. Teams will hit project milestones and aim to meet project objectives throughout the game. Additionally, players work to achieve individual goals related to their role on the project team, and these are captured in <b>Individual Action Points</b>.</p>
            </div>
            <br/>
            <h2>Role Descriptions</h2>
            <div style="margin-left: 15px; margin-right: 15px; font-size: 18px">
                <p>Teams have the following <b>4 roles</b>. Each role has a set of <b>responsibilities</b> and focuses on a particular <b>dimension</b> of the <b>project</b> from the selected scenario.</p>
<!--                <p><b>Systems Architect:</b> focuses on the <b>internal</b> quality</p>-->
<!--                <p><b>UX Lead:</b> focuses on the <b>external</b> quality</p>-->
<!--                <p><b>Technical Lead:</b> focuses on the <b>process</b> quality</p>-->
<!--                <p><b>Team Lead:</b> focuses on the <b>team strength</b></p>-->
                    <p><b>Systems Architect:</b> responsible for <b>gathering system requirements</b> and defining the <b>system architecture</b> that fulfills these requirements.<br/>Focuses on <b>internal</b> quality.</p>
                    <p><b>UX Lead:</b> ensure that users who interact with the system have a <b>positive experience</b><br/>Focuses on <b>external</b> quality.</p>
                    <p><b>Technical Lead:</b> the principal <b>software engineer</b> who leads the <b>development team</b>, uses a <b>hands-on</b> approach with code, and handles the <b>quality of technical deliverables</b><br/>Focuses on <b>process</b> quality.</p>
                    <p><b>Team Lead:</b> keeps the team <b>on schedule</b> and <b>in line</b>, meaning that if the team underperforms, the team lead takes a severe hit<br/>Focuses on <b>team</b> quality.</p>
            </div>
            <br/>
            <h2>Scenarios</h2>
            <div style="margin-left: 15px; margin-right: 15px; font-size: 18px">
                <p>There are <b>3 scenarios</b> that players can choose from, forming the <b>narrative</b> for the game. In each case, teams work on developing an app to be released to market.</p>
                <ol style="text-align: left; display: inline-block">
                    <li><b>Angry Cats:</b> You work in a cross-functional team at a startup game studio, and you have just signed a contract with a notable publisher to develop and release a new game.</li>
                    <br/>
                    <li><b>DysTalk:</b> You and your team have formed a startup to develop a secure communication and networking product.</li>
                    <br/>
                    <li><b>Earthbook (new!):</b> Inspired by the influx of social media usage, especially for addressing environmental issues, you and a team of tech-savvy, eco-conscious folks have an idea for a new kind of social media where environmentalists can connect and uplift one another to make the environment better for generations to come.</li>
                </ol>
            </div>
          </section>
        </ons-page>
    </template>
`