var specialConsole = (function () {

    function write(textArr) {
        var output = "";
        var len = textArr.length;

        if (len > 1) {
            output += placeholderOutput(textArr);
        }
        else {
            output += textArr[0].toString();
        }

        return output;
    }

    function writeLine() {
        var output = "Message : ";
        output += write(arguments);
        console.log(output);
    }

    function writeWarning() {
        var output = "Warning : ";
        output += write(arguments);
        console.log(output);
    }

    function writeError() {
        var output = "Error : ";
        output += write(arguments);
        console.log(output);
    }
            
    function placeholderOutput(inputArray) {
        var len = inputArray.length;
        var outputText = inputArray[0].toString();
        var pat;

        for (var index = 1; index <= len - 1; index++) {
            pat = new RegExp("\\{" + (index - 1) + "\\}", "g");
            outputText = outputText.replace(pat, inputArray[index].toString());
        }

        return outputText;
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning:writeWarning
    }
}());
