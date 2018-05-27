const layouts = require('openfin-layouts');

//Log text to the dom element
const logTextArea = document.getElementById("logTextArea");
let logCount = 0;
let windowCount = 0;

//Log text to the dom element
const logText = (text) => {
    if (++logCount < 1000) {
        logTextArea.textContent = `${text}\n${logTextArea.textContent}`;
    } else {
        logTextArea.textContent = text;
        logCount = 1;
    }
};

//Create a new window
const createWindow = () => {
    logText("Created window...\n");

    const config = {
        url: "child.html",
        autoShow: true,
        defaultHeight: 300,
        defaultWidth: 300,
        defaultLeft: 320 + (50 * windowCount++),
        defaultTop: 200 + (50 * windowCount),
        saveWindowState: false,
        frame: true,
        name: `Window ${windowCount}`,
    };

    new fin.desktop.Window(
        config,
        () => logText(`Window number ${windowCount} created.`),
        (error) => logText(`ERROR: Could not create window: ${error}`)
    );
};

//Undock function
const undockWindow = () => {
    logText("Undocking main window...\n");

    layouts
        .undock()
        .then(() => logText("Main window undocked."))
        .catch((reject) => logText(`ERROR: ${reject}`));
};

//Store the fin object
fin.desktop.main(() => {
    //setup the buttons
    const btnCreateWindow = document.getElementById('btnCreateWindow');
    btnCreateWindow.onclick = createWindow;

    const btnUndock = document.getElementById('btnUndock');
    btnUndock.onclick = undockWindow;

    logText("Application ready.\n");
    logText(`OpenFin Version: ${fin.desktop.getVersion()}`);
});