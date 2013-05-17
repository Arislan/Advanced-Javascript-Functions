var movingShapes = (function () {
    //Storage,Constants,Intialiser
    var movingShapesStorage;
    var parent;

    var FIELD_SIZE;
    var SHAPE_SIZE;
    var ROTATION_CENTER;

    function initialiseShapeField(elSelector, shapeSize, fieldSize) {
        movingShapesStorage = {};
        parent = document.querySelector(elSelector);
        parent.style.width = fieldSize + "px";
        parent.style.height = fieldSize + "px";
        FIELD_SIZE = fieldSize;
        SHAPE_SIZE = shapeSize;
        ROTATION_CENTER = FIELD_SIZE / 2 - (SHAPE_SIZE / 2);

        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
    }

    var RECT_SPEED = 2;
    var ROTATION_SPEED = 0.05;
    
    //Create A Div To Be Added In Internal Storage Array
    function CreateDiv() {
        var divElement = document.createElement("div");
                 
        divElement.style.width = SHAPE_SIZE + "px";
        divElement.style.height = SHAPE_SIZE + "px";
        divElement.style.position = "absolute";
        divElement.innerHTML = "DIV";

        divElement.style.backgroundColor = Color();
        divElement.style.color = Color();
        divElement.style.border = RandomValue(1, 6) + "px solid " + Color();

        return divElement;
    }

    //Add Div Elements To A Specific Movement Style
    //According To The Movement Style Some Additional Properties Are Added To Each Elements
    function Add(movement) {
        var div = CreateDiv();

        if (!movingShapesStorage[movement]) {
            movingShapesStorage[movement] = new Array();
        }

        switch (movement) {
            case "rect":
                div.moveAxisX = true;
                div.LeftDirection = true;
                div.BottomDirection = true;
                div.maxX = RandomValue(100,FIELD_SIZE - SHAPE_SIZE);
                div.maxY = div.maxX/3;
                div.startX = RandomValue(0, FIELD_SIZE - SHAPE_SIZE - div.maxX);
                div.startY = RandomValue(0, FIELD_SIZE - SHAPE_SIZE - div.maxY);
                div.style.top = div.startY + "px";
                div.style.left = div.startX + "px"
                break;
            default:
                div.time = Math.PI;
                div.radius = RandomValue(50,FIELD_SIZE/2);
        }

        div.innerHTML = movement;
        movingShapesStorage[movement].push(div);

        //After Append Div To Storage, Append It To DOM Also
        parent.appendChild(div);
    }
    
    //Get All Elements In Internal Storage And Move Them In A Specific Style
    function MoveLoop() {
        for (var movement in movingShapesStorage) {
            switch (movement) {
                case "rect":
                    for (var i = 0; i < movingShapesStorage[movement].length; i++) {
                        if (movingShapesStorage[movement][i].moveAxisX) {
                            MoveAxisX(movingShapesStorage[movement][i]);
                        }
                        else {
                            MoveAxisY(movingShapesStorage[movement][i]);
                        }
                    }
                    break;
                case "circle":
                    for (var i = 0; i < movingShapesStorage[movement].length; i++) {
                        MoveInCircle(movingShapesStorage[movement][i]);
                    }
                    break;
                case "elipse":
                    for (var i = 0; i < movingShapesStorage[movement].length; i++) {
                        MoveInElipse(movingShapesStorage[movement][i]);
                    }
                    break;
            }
        }
    }

    //Rectangular X-axis Move
    function MoveAxisX(el) {
        var pointX = el.style.left;
        var pixels = ParsePixels(pointX);
        if ((pixels >= el.startX + el.maxX) && el.LeftDirection) {
            el.LeftDirection = false;
            el.moveAxisX = false;
        }
        else if (pixels <= el.startX && !el.LeftDirection) {
            el.LeftDirection= true;
            el.moveAxisX = false;
        }

        if (el.LeftDirection) {
            el.style.left= pixels + RECT_SPEED + "px";
        }
        else {
            el.style.left= pixels + RECT_SPEED * -1 + "px";
        }
    }

    //Rectangular Y-axis Move
    function MoveAxisY(el) {
        var pointY = el.style.top;
        var pixels = ParsePixels(pointY);

        if (pixels >= el.startY + el.maxY && el.BottomDirection) {
            el.BottomDirection = false;
            el.moveAxisX = true;
        }
        else if (pixels <= el.startY && !el.BottomDirection) {
            el.BottomDirection = true;
            el.moveAxisX = true;
        }

        if (el.BottomDirection) {
            el.style.top = pixels + RECT_SPEED + "px";
        }
        else {
            el.style.top = pixels + RECT_SPEED * -1 + "px";
        }
    }

    //Circle Movment
    function MoveInCircle(el) {
        el.time = el.time + ROTATION_SPEED;

        el.style.left = (ROTATION_CENTER + Math.sin(el.time) * el.radius) + "px";
        el.style.top = (ROTATION_CENTER + Math.cos(el.time) * el.radius) + "px";

        if (el.time === 2 * Math.PI) {
            el.time = 0;
        }
    }

    //Elispe Movement
    function MoveInElipse(el) {
        el.time = el.time + ROTATION_SPEED;

        el.style.left = (ROTATION_CENTER + Math.sin(el.time) * el.radius) + "px";
        el.style.top = (ROTATION_CENTER + Math.cos(el.time) * el.radius / 2) + "px";

        if (el.time === 2 * Math.PI) {
            el.time = 0;
        }
    }

    //Parse Number From Pixel Value
    function ParsePixels(pixels) {
        var pixelNum = pixels.match(/^\d+/);

        if (pixelNum) {
            return parseFloat(pixelNum[0]);
        }
        else {
            return 0;
        }
    }

    //Generate Random Color
    function Color() {
        return "rgb(" +
            RandomValue(0, 257) + ", " +
            RandomValue(0, 257) + ", " +
            RandomValue(0, 257) + ")";
    }

    function RandomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //Some Custom Function To Change Sizes Of The Shapes
    function ChangeSizes() {

        for (var movement in movingShapesStorage) {
            for (var i = 0; i < movingShapesStorage[movement].length; i++) {
                var ran = RandomValue(20, 100);
                movingShapesStorage[movement][i].style.width = ran + "px";
                movingShapesStorage[movement][i].style.height = ran + "px";
                movingShapesStorage[movement][i].innerHTML = "";
            }
        }
    }
    
    //Implement Interval
    var loopInterval;
    var intervalCount = 100;

    //Create Interval With Differen Value
    var createInterval = function (offset) {
        offset = offset || 0;

        if(intervalCount + offset >= 0)
        {
            intervalCount += offset;
        }

        clearInterval(loopInterval);
        loopInterval = setInterval(MoveLoop, intervalCount);
    }
           
    var stopLoop = function () {
        clearInterval(loopInterval);
    }

    createInterval();

    return {
        add: Add,
        stop: stopLoop,
        start: createInterval,
        randomShapeSize: ChangeSizes,
        initialiseShapeField: initialiseShapeField
    }
}());