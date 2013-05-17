var domModule = (function () {

    var mainParent = document;
    var buffer = {};
    var bufferCapacity = 100;
    //Offtopic Functionality
    var randomWeaveColor = RandomColor();

    function Append(child, parent) {
        var selected = mainParent.querySelector(parent);
        selected.appendChild(child);
    }

    function Remove(parents, childs) {
        var selectedParents = mainParent.querySelectorAll(parents);
        var selectedChilds = mainParent.querySelectorAll(parents + " " + childs);

        for (var i = 0; i < selectedParents.length; i++) {

            for (var j = 0; j < selectedChilds.length; j++) {

                if (selectedParents[i].contains(selectedChilds[j])) {
                    selectedParents[i].removeChild(selectedChilds[j]);
                }
            }
        }
    }

    function AttachEvent(element, event, eventHandler, multiple) {
        var selected;

        if (multiple) {
            selected = mainParent.querySelectorAll(element);
            for (var i = 0; i < selected.length; i++) {
                selected[i].addEventListener(event, eventHandler);
            }
        }
        else {
            selected = mainParent.querySelector(element);
            selected.addEventListener(event, eventHandler);
        }
    }

    function AppendToBuffer(parentSelector, child) {
        child.style.backgroundColor = randomWeaveColor;

        if (!buffer[parentSelector]) {
            buffer[parentSelector] = document.createDocumentFragment();
            buffer[parentSelector].appendChild(child);
        }
        else {
            buffer[parentSelector].appendChild(child);
        }

        child.innerHTML = buffer[parentSelector].childNodes.length;

        if (buffer[parentSelector].childNodes.length == bufferCapacity) {
            var parent = mainParent.querySelector(parentSelector);

            parent.appendChild(buffer[parentSelector]);
            buffer[parentSelector] = document.createDocumentFragment();
            randomWeaveColor = RandomColor();
        }
    }

    function RandomColor() {
        var red = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }

    return {
        appendChild: Append,
        removeChild: Remove,
        attachEvent: AttachEvent,
        appendToBuffer: AppendToBuffer
    }
}());