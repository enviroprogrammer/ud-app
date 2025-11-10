// toggle between light and dark mode to promote accessible design/design justice and reduce energy usage
let toggleMode = function() {
    let theme = document.getElementById("theme");
    if (theme.getAttribute('href') === "./onsen-css-components.css") { // toggle from light to dark mode
        theme.setAttribute('href', './dark-onsen-css-components.css'); // set theme to dark
    } else { // toggle from dark to light mode
        theme.setAttribute('href', './onsen-css-components.css'); // set theme to light
    }
}