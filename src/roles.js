let p1Role;
let p2Role;
let p3Role;
let p4Role;

// get player names from previous screen
let loadPlayerNames = function () {
    document.getElementById('p1-name').innerHTML = sessionStorage.getItem('Player 1');
    document.getElementById('p2-name').innerHTML = sessionStorage.getItem('Player 2');
    document.getElementById('p3-name').innerHTML = sessionStorage.getItem('Player 3');
    document.getElementById('p4-name').innerHTML = sessionStorage.getItem('Player 4');
}

// p1 gets first dibs on any of the 4 roles
let saveP1Role = function () {
    let p1Selection = document.getElementById('p1-role');
    p1Role = p1Selection.options[p1Selection.selectedIndex].text;
    if (!(p1Role in sessionStorage)) {
        sessionStorage.setItem(p1Role, sessionStorage.getItem('Player 1'));
        document.getElementById('p1-role').disabled = true;
    } else {
        ons.notification.alert(p1Role + " has already been taken. Choose another role.");
        document.getElementById('p1-role').value = '';
    }
}

let saveP2Role = function () {
    let p2Selection = document.getElementById('p2-role');
    p2Role = p2Selection.options[p2Selection.selectedIndex].text;
    if (!(p2Role in sessionStorage)) {
        sessionStorage.setItem(p2Role, sessionStorage.getItem('Player 2'));
        document.getElementById('p2-role').disabled = true;
    } else {
        ons.notification.alert(p2Role + " has already been taken. Choose another role.");
        document.getElementById('p2-role').value = '';
    }
}

let saveP3Role = function () {
    let p3Selection = document.getElementById('p3-role');
    p3Role = p3Selection.options[p3Selection.selectedIndex].text;
    if (!(p3Role in sessionStorage)) {
        sessionStorage.setItem(p3Role, sessionStorage.getItem('Player 3'));
        document.getElementById('p3-role').disabled = true;
    } else {
        ons.notification.alert(p3Role + " has already been taken. Choose another role.");
        document.getElementById('p3-role').value = '';
    }
}

let saveP4Role = function () {
    let p4Selection = document.getElementById('p4-role');
    p4Role = p4Selection.options[p4Selection.selectedIndex].text;
    if (!(p4Role in sessionStorage)) {
        sessionStorage.setItem(p4Role, sessionStorage.getItem('Player 4'));
        document.getElementById('p4-role').disabled = true;
    } else {
        ons.notification.alert(p4Role + " has already been taken. Choose another role.");
        document.getElementById('p4-role').value = '';
    }
    enableChooseScenario();
}

let enableChooseScenario = function () {
    if (p1Role !== '' && p2Role !== '' && p3Role !== '' && p4Role !== '') {
        document.getElementById('choose-scenario').disabled = false;
    }
}

let showResetRolesDialog = function() {
    let rr = document.getElementById('reset-roles-confirmation');

    if (rr) {
        rr.show();
    } else {
        ons.createElement('reset-roles-confirmation.html', {append: true})
            .then(function (dialog) {
                dialog.show();
            });
    }
}

let hideResetRolesDialog = function() {
    let rr = document.getElementById('reset-roles-confirmation');

    if (rr) {
        rr.remove();
    }
}

// option for users to start over
// e.g. in case they made a mistake
let resetRoles = function(){
    sessionStorage.removeItem(p1Role);
    sessionStorage.removeItem(p2Role);
    sessionStorage.removeItem(p3Role);
    sessionStorage.removeItem(p4Role);

    document.getElementById('p1-role').disabled = false;
    document.getElementById('p2-role').disabled = false;
    document.getElementById('p3-role').disabled = false;
    document.getElementById('p4-role').disabled = false;

    document.getElementById('p1-role').value = '';
    document.getElementById('p2-role').value = '';
    document.getElementById('p3-role').value = '';
    document.getElementById('p4-role').value = '';

    document.getElementById('choose-scenario').disabled = true;

    document.getElementById('reset-roles-confirmation').hide();
}

let hideRoleDescriptions = function() {
    let rd = document.getElementById('role-descriptions');

    if (rd) {
        rd.hide();
    }
}

document.getElementById('roles').innerHTML = `
    <template id="roles.html">
        <ons-page id="roles">
          <ons-toolbar>
            <div class="left"><ons-back-button onclick="sessionStorage.clear()">Players</ons-back-button></div>
            <div class="center">Assign Roles</div>
            <div class="right"><ons-toolbar-button onclick="toggleMode()"><ons-icon id="toggle" icon="fa-lightbulb" size="25px"></ons-icon></ons-toolbar-button></div>
          </ons-toolbar>
          <section style="text-align: center">
            <h2>Assign roles to each player:</h2>
            <div style="align-items: center;">
                <p id="p1-name"></p>
                <p>
                    <ons-select id="p1-role" onchange="saveP1Role()">
                        <option value="" disabled selected>Choose a role...</option>
                        <option value="sys-arch">Systems Architect</option>
                        <option value="ux-lead">UX Lead</option>
                        <option value="tech-lead">Technical Lead</option>
                        <option value="team-lead">Team Lead</option>
                    </ons-select>
                </p>
                <p id="p2-name"></p>
                <ons-select id="p2-role" onchange="saveP2Role()">
                    <option value="" disabled selected>Choose a role...</option>
                    <option value="sys-arch">Systems Architect</option>
                    <option value="ux-lead">UX Lead</option>
                    <option value="tech-lead">Technical Lead</option>
                    <option value="team-lead">Team Lead</option>
                </ons-select>
                <p id="p3-name"></p>
                <ons-select id="p3-role" onchange="saveP3Role()">
                    <option value="" disabled selected>Choose a role...</option>
                    <option value="sys-arch">Systems Architect</option>
                    <option value="ux-lead">UX Lead</option>
                    <option value="tech-lead">Technical Lead</option>
                    <option value="team-lead">Team Lead</option>
                </ons-select>
                <p id="p4-name"></p>
                <ons-select id="p4-role" onchange="saveP4Role()">
                    <option value="" disabled selected>Choose a role...</option>
                    <option value="sys-arch">Systems Architect</option>
                    <option value="ux-lead">UX Lead</option>
                    <option value="tech-lead">Technical Lead</option>
                    <option value="team-lead">Team Lead</option>
                </ons-select>
            </div>
            <br/>
            <div>
                <ons-button id="choose-scenario" disabled>
                    <ons-icon icon="ion-ios-film, material:md-movie" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                    Choose Scenario
                </ons-button>
            </div>
            <br/>
            <div>
                <ons-button id="role-desc">
                    <ons-icon icon="ion-ios-information-circle, material:md-info" size="25px" style="vertical-align: middle; padding-right: 5px;"></ons-icon>
                    Role Descriptions
                </ons-button>
            </div>
            <br/>
            <div>
                <ons-button id="start-over" onclick="showResetRolesDialog()">
                    <ons-icon icon="ion-ios-refresh, material:md-rotate-right" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                    Restart Role Selection
                </ons-button>
            </div>
            
<!--              <ons-fab position="bottom right" onclick="toggleMode()">-->
<!--                <ons-icon id="toggle" icon="fa-lightbulb" size="60px" style="vertical-align: middle"></ons-icon>-->
<!--              </ons-fab>-->
          </section>
        </ons-page>
    </template>
    
    <template id="role-descriptions.html">
        <ons-dialog id="role-descriptions">
            <div style="text-align: center; padding: 10px">
                <h3>Roles</h3>
                <div style="display: inline-block">
                    <p><b>Systems Architect:</b> focuses on internal quality</p>
                    <p><b>UX Lead:</b> focuses on external quality</p>
                    <p><b>Technical Lead:</b> focuses on process quality</p>
                    <p><b>Team Lead:</b> focuses on team strength</p>
                </div>
                <ons-button id="close" onclick="hideRoleDescriptions()">
                    <ons-icon icon="ion-ios-close-circle, material:md-close-circle" size="25px" style="vertical-align: middle; padding-right: 5px"></ons-icon>
                    Close
                </ons-button>
            </div>
        </ons-dialog>
    </template>
    
    <template id="reset-roles-confirmation.html">
        <ons-alert-dialog id="reset-roles-confirmation" modifier="rowfooter">
            <div class="alert-dialog-title">Restart Role Selection</div>
            <div class="alert-dialog-content">
                Are you sure you want to restart role selection?
            </div>
            <div class="alert-dialog-footer">
                <ons-alert-dialog-button onclick="resetRoles()">Yes</ons-alert-dialog-button>
                <ons-alert-dialog-button style="color: red" onclick="hideResetRolesDialog()">No</ons-alert-dialog-button>
            </div>
        </ons-alert-dialog>
    </template>
`