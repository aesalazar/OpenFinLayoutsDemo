const layouts = require('openfin-layouts');

//Log text to the dom element
const logTextArea = document.getElementById("logTextArea");
let logCount = 0;

const logText = (text) => {
    if (++logCount < 1000) {
        logTextArea.textContent = `${text}\n${logTextArea.textContent}`;
    } else {
        logTextArea.textContent = text;
        logCount = 1;
    }
};

//Undock function
const undockWindow = () => {
    logText("Undocking child window...\n");

    layouts
        .undock()
        .then(() => logText("Child window undocked."))
        .catch((reject) => logText(`ERROR: ${reject}`));
};

//Undock function
const deregisterWindow = () => {
    logText("De-registering child window...\n");

    layouts
        .deregister()
        .then(() => logText("Child window unregistered."))
        .catch((reject) => logText(`ERROR: ${reject}`));
};

//wire the buttons
const btnUndock = document.getElementById('btnUndock');
btnUndock.onclick = undockWindow;

const btnDeregister = document.getElementById('btnDeregister');
btnDeregister.onclick = deregisterWindow;

logText("Window ready.\n");