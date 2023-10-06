const x_in = document.getElementById("x-text") as HTMLInputElement;
let x_value: number;
let y_value: number = -4;
let r_value: number = 1.5;

let set_y = () => {
    y_value = Number((document.getElementById("y-select") as HTMLSelectElement)
        .options[(document.getElementById("y-select") as HTMLSelectElement)
        .options.selectedIndex].value);
}

let set_r = () => {
    r_value =
        Number((document.getElementById("r-range") as HTMLInputElement).value);
}

let validate = () => {
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
}

let data_out = () => {
    let formData = new FormData();
    formData.append('x', x_value.toString());
    formData.append('y', y_value.toString());
    formData.append('r', r_value.toString());

    fetch('php/main.php', {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.text();
    }).then(table => {
        table = table.slice(0, -1);
        document.getElementById("table-holder").innerHTML = table;
    }).catch(error => {
        console.error('Ошибка: ', error);
    })
}

let button = document.getElementById("val-submit");

button.onclick = () => {
    if (!validate()) {
        return;
    }
    data_out();
}
