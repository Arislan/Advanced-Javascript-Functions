document.onkeyup = processKey;

function processKey(keyInfo) {
    if (keyInfo.keyCode == 13) {
        var command = document.getElementById("consoleLine").value;
        ExecuteCommand(command);
        var consoleWindow = document.getElementById("console");
        consoleWindow.removeChild(document.getElementById("consoleLine"));

        var newLine = document.createElement("textarea");
        newLine.id = "consoleLine";

        var oldLine = document.createElement("p");
        oldLine.innerHTML = command;

        consoleWindow.appendChild(oldLine);
        consoleWindow.appendChild(newLine);
        newLine.focus();
    }
}

function ExecuteCommand(command) {
    var engine = document.createElement("script");
    engine.id = "engine";
    engine.appendChild(document.createTextNode(command));
    document.body.appendChild(engine);
    document.body.removeChild(engine);
}