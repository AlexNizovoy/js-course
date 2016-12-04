(function() {
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
})();