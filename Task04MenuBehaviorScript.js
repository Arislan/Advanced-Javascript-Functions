//Function To Alther Ul Menu, Element Argument Is The First UL In The Tree
function altherUlMenu(element) {
    element = document.querySelector(element);
    subMenusStorage = element.getElementsByTagName("ul");

    for (var i = subMenusStorage.length - 1; i >= 0; i--) {
        var parent = subMenusStorage[i].parentElement;
        //Added Additional Properties To Elements Containing SubMenus
        parent.storedUL = subMenusStorage[i];
        parent.clicked = false;
        //Set Default State To Hidden SubMenus
        parent.removeChild(subMenusStorage[i]);

        //Set Event To Change State OnClick
        parent.addEventListener("click", function (event) {
            showOrHide(event.target);
            event.stopPropagation();
        }, false)
    }
}

function showOrHide(element) {
    //Check If Element Contains Hidden UL
    //If Not Check If Parent Has Hidden UL /In Case We Clicked <a> tag Child/
    //If Paren Does Not Have UL, Then Exit
    if (!element.storedUL) {
        element = element.parentElement;
        if (!element.storedUL) {
            return;
        }
    }

    if (element.clicked) {
        //create virual click to put all childrens in default state
        var evt = document.createEvent("MouseEvent");
        evt.initMouseEvent("click", true, true);

        var childrensLi = element.querySelectorAll("li");
        for (var i = 0; i < childrensLi.length; i++) {
            if (childrensLi[i].storedUL) {
                if (childrensLi[i].clicked) {
                    childrensLi[i].dispatchEvent(evt);
                }
            }
        }

        element.removeChild(element.storedUL);
        element.clicked = false;
    }
    else {
        element.appendChild(element.storedUL);
        element.clicked = true;
    }
}