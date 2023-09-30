let x_in = document.getElementById("x_text");
let x_value = 0;
let y_value = -4;
let r_value = 1.5;

function set_y() {
    y_value =
        document.getElementById("y_select")
            .options[document.getElementById("y_select")
            .options.selectedIndex].value;
}

function set_r() {
    r_value =
        document.getElementById("r_range").value;
}

function validate() {
    if (x_in.value === '') {
        x_in.setCustomValidity("Введите что-нибудь в поле X!");
        return false;
    }
    x_value = x_in.value.replace(",", ".");
    if (x_value < -5 || x_value > 3) {
        x_in.setCustomValidity("Вы вышли за указанный диапазон в X!");
        return false;
    }
    return true;
}

let button = document.getElementById("val_submit");


function data_out() {
    // любую современную библиотеку для отправки HTTP ЗАПРОСОВ НО НЕ AXIOS
    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {x: x_value, y: y_value, r: r_value},
        success: function (RESPONSE) {
            const res = document.createElement("table");
            res.innerHTML = RESPONSE.value;
            document.getElementById("table").append(res);
        }
    });
}

button.onclick = function (e) {
    if (!validate()) {
        return;
    }
    data_out();
    e.preventDefault()
}
