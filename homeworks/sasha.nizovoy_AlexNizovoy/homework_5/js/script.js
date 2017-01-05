document.addEventListener("DOMContentLoaded", function() {

    // Adding switch themes
    if (localStorage.theme) {
        document.body.className = localStorage.theme;
    } else {
        document.body.className = "whiteTheme"
    }
    var themes = document.querySelectorAll("#themes ul li a");
    themes.forEach(function(elem) {
        elem.addEventListener("click", function(e) {
            var theme = e.target.getAttribute("id");
            e.preventDefault();
            if (theme) {
                document.body.className = theme;
                localStorage.theme = theme;
            }
        });
    });

    // Contact-me pop-up
    var popUp = document.getElementById("pop-up");

    document.getElementById("contactBtn").addEventListener("click", function(e) {
        e.preventDefault();
        popUp.classList.add("show");
    });

    document.getElementById("closePopup").addEventListener("click", function(e) {
        e.preventDefault();
        popUp.classList.remove("show");
    });

    popUp.addEventListener("click", function(e) {
        if (e.target === popUp) {
            popUp.classList.remove("show");
        }
    });

    // Adding in-place editing
    document.addEventListener("dblclick", function(e) {
        var elem = e.target,
            elemStyle,
            inPlaceField;

        if (elem.getAttribute("data-editable")) {
            elemStyle = window.getComputedStyle(elem);
            if (elemStyle.getPropertyValue("height") > elemStyle.getPropertyValue("line-height")) {
                inPlaceField = document.createElement("textarea");
            } else {
                inPlaceField = document.createElement("input");
            }

            inPlaceField.value = elem.innerHTML;
            inPlaceField.style.fontFamily = elemStyle.getPropertyValue("font-family");
            inPlaceField.style.fontSize = elemStyle.getPropertyValue("font-size");
            inPlaceField.style.fontWeight = elemStyle.getPropertyValue("font-weight");
            inPlaceField.style.width = elemStyle.getPropertyValue("width");
            inPlaceField.style.height = elemStyle.getPropertyValue("height");
            inPlaceField.style.color = elemStyle.getPropertyValue("color");
            inPlaceField.style.backgroundColor = elemStyle.getPropertyValue("background-color");
            inPlaceField.style.border = "1px solid " + elemStyle.getPropertyValue("color");

            elem.innerHTML = "";
            elem.appendChild(inPlaceField);
            inPlaceField.focus();

            inPlaceField.addEventListener("blur", function(e) {
                elem.innerHTML = e.target.value;
            });
        }
    });

    // Loading text content from JSON file
    // content placed in tag whith same ID that 'key'
    var request = new XMLHttpRequest(),
        data,
        done = new Event("done");

    request.open("GET", "js/textcontent.json");
    request.onreadystatechange = function() {
        var key;
        if (this.readyState === 4) {
            data = JSON.parse(request.responseText);
            for (key in data) {
                document.getElementById(key).innerHTML = data[key];
            }
            document.dispatchEvent(done);
        }
    };
    request.send();
});

document.addEventListener("done", function () {
    // Adding copyright-year and age on page
    var spanAge = document.getElementById("age"),
        spanCopyYear = document.getElementById("year"),
        born = new Date("1984-09-30"),
        now = new Date(),
        age = now.getFullYear() - born.getFullYear();

    if (now.getMonth() < born.getMonth()) {
        age--;
    }

    if ((now.getMonth() == born.getMonth()) && (now.getDate() < born.getDate())) {
        age--;
    }
    spanAge.innerHTML = age;
    spanCopyYear.innerHTML = now.getFullYear();
});
