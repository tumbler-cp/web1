const xIn = document.getElementById('x-text') as HTMLInputElement;
const button = document.getElementById('value-submit');

let xValue: number;
let yValue: number = -4;
let rValue: number = 1.5;

const setValueY = () => {
  yValue = Number(
    (document.getElementById('y-select') as HTMLSelectElement).value
  );
};

const setValueR = () => {
  rValue = Number(
    (document.getElementById('r-range') as HTMLInputElement).value
  );
};

const validate = () => {
  if (xIn.value === '') {
    xIn.setCustomValidity('Введите что-нибудь в поле X!');
    xIn.reportValidity();
    return false;
  }
  xValue = parseFloat(xIn.value.replace(',', '.'));
  if (xValue < -5 || xValue > 3) {
    xIn.setCustomValidity('Вы вышли за указанный диапазон в X!');
    xIn.reportValidity();
    return false;
  }
  return true;
};

const putTable = (table: string) => {
  const holder = document.getElementById('table-holder');
  holder.innerHTML = table;
};

const handleData = async (x: number, y: number, r: number) => {
  const formData = new FormData();
  formData.append('x', x.toString());
  formData.append('y', y.toString());
  formData.append('r', r.toString());

  const response = await fetch('php/main.php', {
    method: 'POST',
    body: formData
  });
  return response.text();
};

const reloadSession = async () => {
  const response = await fetch('php/table.php', { method: 'POST' });
  return response.text();
};

button.onclick = () => {
  if (!validate()) {
    return;
  }
  setValueY();
  setValueR();
  handleData(xValue, yValue, rValue).then((tableText) => putTable(tableText));
};

reloadSession().then((tableText) => putTable(tableText));
