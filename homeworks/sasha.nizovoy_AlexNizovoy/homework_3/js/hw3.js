(function() {
    /* #1
     * Переписать дефолтный метод window.setTimeout(callback, delay) для применения по новым правилам : первым параметром должна стать задержка, вторым коллбек. Чтобы можно было вызвать метод в виде window.setTimeout(delay, callback)
     */
    var nativeSetTimeout = window.setTimeout;

    /* Function may be called like this:
        window.setTimeout(time_to_delay, callback[, arg1_for_callback, arg2, ... , arg3]);
    */
    window.setTimeout = function(delay, callback) {
        var args = [],
            idx = 0,
            len = arguments.length;

        for (; idx < len; idx++) {
            args.push(arguments[idx]);
        }

        args[0] = callback;
        args[1] = delay;

        return nativeSetTimeout.apply(null, args);
    };

    //For testing #1
    // var clr = window.setTimeout(3000, console.log, "Testing");

    // console.log("clr = " + clr);


    /* #2
    Переписать дефолтный метод window.setInterval(callback, delay) таким образом, чтобы временные интервалы считались с использованием написанного в задании №1 метода setTimeout. Порядок параметров для setInterval менять не нужно
    */
    window.setInterval = function(callback, delay) {
        window.setTimeout(delay, function loop() {
            callback();
            window.setTimeout(delay, loop);
        });
    };

    // For testing #2
    // console.log("start test");
    // window.setInterval(function() {console.log("Delayed");}, 1000);

    /* #3
    Переделать функцию freeze из лекции, чтобы в декорированную функцию передавался не последний параметр, а первый.
    */
    function fncToDelay(param) {
        console.log("Delayed run : " + param);
    }

    function freeze(delay, fnc) {
        var timeout;

        return function() {
            var args = arguments;

            if (!timeout) {
                timeout = setTimeout(delay, function() {
                    fnc.apply(this, args);
                });
            }
        };
    }

    // For testing #3
    // console.log("Start");
    // var frozenFunc = freeze(1000, fncToDelay);

    // frozenFunc("1");
    // frozenFunc("2");
    // frozenFunc("3");
    // frozenFunc("4");
    // frozenFunc("5");
    // frozenFunc("6");
    // frozenFunc("7");
    // frozenFunc("8");
    // frozenFunc("9");


    /* #4
    Написать декоратор следующего вида function createPipe (originalFnc, [fnc1, fnc2, fnc3 ... fncN]). Декоратор принимает первым параметром оригинальную функцию, вторым параметром массив функций-фильтров. Возвращенная декоратором функция должна организовать последовательный вызов каждой функции из массива след.образом: сначала вызывается fnc1 с входящим параметром, потом fnc2 с параметром, который является результатом fnc1, потом fnc3 с результатом fnc2 и так далее до конца массива функций. Когда фильтры в массиве закончились, должна быть вызвана оригинальная функция с результатом выполнения последней функции из массива.
    */
    function createPipe(originalFnc, args) {

        return function(result) {
            var idx = 0,
                len = args.length;

            for (; idx < len; idx++) {
                result = args[idx](result);
            }

            originalFnc(result);
        };
    }

    function originalFnc(string) {
        var result = "",
            idx = 0,
            len = string.length,
            nextToUpper = true;

        // <for> cycle use in case of presence of double spaces
        for (; idx < len; idx++) {
            if (nextToUpper) {
                result += string.charAt(idx).toUpperCase();
                nextToUpper = false;
            } else {
                result += string.charAt(idx);
            }
            if (string.charAt(idx) === " " && string.charAt(idx + 1) !== " ") {
                nextToUpper = true;
            }
        }

        console.log(result);
    }

    function filterDigits(string) {
        var regDigits = /\d/;
        var result = string;

        while (regDigits.test(result)) {
            result = result.replace(regDigits, "");
        }

        return result;
    }

    function filterSpecial(string) {
        var regSpecial = /[!@#$%^&*()+=]/;
        var result = string;

        while (regSpecial.test(result)) {
            result = result.replace(regSpecial, "");
        }

        return result;
    }

    function filterWhiteSpaces(string) {
        var regWhiteSpaces = /\s{2,}/;
        var result = string;

        while (regWhiteSpaces.test(result)) {
            result = result.replace(regWhiteSpaces, " ");
        }

        return result;
    }

    // For testing #4
    // originalFnc("1text for testing  with  double spaces.");
    // console.log("dig24i5ts 4 f67i8ltered" + "  -->>  " + filterDigits("dig24i5ts 4 f67i8ltered"));
    // console.log("s!p@e#c$i%a^l& sym*bol+s *f(i)l+t=ered" + "  -->>  " + filterSpecial("s!p@e#c$i%a^l& sym*bol+s *f(i)l+t=ered"));
    // console.log("white spaces      deleted" + "  -->>  " + filterWhiteSpaces("white spaces      deleted"));

    // var pipe = createPipe(originalFnc, [filterDigits, filterSpecial, filterWhiteSpaces]);
    // pipe("on345l90y    te**x((((t     h$&er@@@e"); // logs "Only Text Here"

})();