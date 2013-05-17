var controls = (function () {
    function treeView(element) {

        if (typeof element == "string") {
            element = document.querySelector(element);
        }

        var tree = (function () {
            var hasChildren = false;

            function AddUlSkeleton() {
                var ulSkeleton = document.createElement("ul");
                element.appendChild(ulSkeleton);
                element = ulSkeleton;
                hasChildren = true;
                
            }

            function addNode() {
                if (!hasChildren) {
                    if (element.firstChild) {
                        element.firstChild.style.color = "teal";
                    }
                    AddUlSkeleton();
                }
                
                var li = document.createElement("li");
                element.appendChild(li);
                return treeView(li);
            }

            function addContent(text, path) {
                var hyperLink = document.createElement("a");
                hyperLink.setAttribute("href", path || "#");
                hyperLink.innerHTML = text;
                if (hasChildren) {
                    hyperLink.style.color = "red";
                }

                element.appendChild(hyperLink);
            }

            return {
                addNode: addNode,
                content: addContent
            }
        }());

        return tree;
    }
    return {
        treeView: treeView
    }
}());