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
        alert("Введите что-нибудь в поле X!");
        return false;
    }
    x_value = x_in.value.replace(",", ".");
    if (!isFinite(x_value)) {
        alert("Введите число в поле X!");
        return false;
    } else if (x_value < -5 || x_value > 3) {
        alert("Вы вышли за указанный диапазон в X!");
        return false;
    }
    return true;
}

let button = document.getElementById("val_submit");


function data_out() {
    $.ajax({
        type: "POST",
        url: "php/main.php",
        data: {x: x_value, y: y_value, r: r_value},
        success: function (RESPONSE) {
            let jResp = JSON.parse(RESPONSE);
            let c1 = document.createElement("th");
            c1.innerHTML = jResp.x;
            let c2 = document.createElement("th");
            c2.innerHTML = jResp.y;
            let c3 = document.createElement("th");
            c3.innerHTML = jResp.r;
            let c4 = document.createElement("th");
            c4.innerHTML = jResp.curr_time;
            let c5 = document.createElement("th");
            c5.innerHTML = jResp.exec_time;
            let c6 = document.createElement("th");
            c6.innerHTML = jResp.resp;
            c6.className = "result_" + jResp.resp;

            let r = document.createElement("tr");
            r.append(c1);
            r.append(c2);
            r.append(c3);
            r.append(c4);
            r.append(c5);
            r.append(c6);

            document.getElementById("table_body").prepend(r);
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
