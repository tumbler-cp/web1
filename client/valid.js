var x_in = document.getElementById("x-text");
var x_value;
var y_value = -4;
var r_value = 1.5;
var set_y = function () {
    y_value = Number(document.getElementById("y-select")
        .options[document.getElementById("y-select")
        .options.selectedIndex].value);
};
var set_r = function () {
    r_value =
        Number(document.getElementById("r-range").value);
};
var validate = function () {
    if (x_in.value === '') {
        x_in.setCustomValidity("Введите что-нибудь в поле X!");
        x_in.reportValidity();
        return false;
    }
    x_value = parseFloat(x_in.value.replace(",", "."));
    if (x_value < -5 || x_value > 3) {
        x_in.setCustomValidity("Вы вышли за указанный диапазон в X!");
        x_in.reportValidity();
        return false;
    }
    return true;
};
var data_out = function () {
    var formData = new FormData();
    formData.append('x', x_value.toString());
    formData.append('y', y_value.toString());
    formData.append('r', r_value.toString());
    fetch('php/main.php', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        return response.text();
    }).then(function (table) {
        table = table.slice(0, -1);
        document.getElementById("table-holder").innerHTML = table;
    }).catch(function (error) {
        console.error('Ошибка: ', error);
    });
};
var button = document.getElementById("val-submit");
button.onclick = function () {
    if (!validate()) {
        return;
    }
    data_out();
};
