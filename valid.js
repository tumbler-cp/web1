let x_in = document.getElementById("x_text");
let x = 0;
let y_value = -4;
let r_value = 1.5;

function set_y () {
    y_value =
        document.getElementById("y_select")
            .options[document.getElementById("y_select")
            .options.selectedIndex].value;
}

function set_r () {
    r_value =
        document.getElementById("r_range").value;
}

function validate() {
    if (x_in.value === '') {
        alert("Введите что-нибудь в поле X!");
        return false;
    }
    x = x_in.value.replace(",", ".");
    if (!isFinite(x)) {
        alert("Введите число в поле X!");
        return false;
    } else if (x < -5 || x > 3) {
        alert("Вы вышли за указанный диапазон в X!");
        return false;
    }
    return true;
}
let button = document.getElementById("val_submit");

function data_out () {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'main.php?' + 'x='+x+'&y='+y_value+'$r'+r_value);
    xhr.send();
}

button.onclick = function () {
    if (!validate()) {
        return;
    }
    console.log(x);
    console.log(y_value);
    console.log(r_value);
    data_out();
}
