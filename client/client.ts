const xIn: HTMLInputElement = document.getElementById(
  'x-text'
) as HTMLInputElement;
const button: HTMLElement = document.getElementById('value-submit');
const clearButton: HTMLElement = document.getElementById('clear-button');
const tableHolder: HTMLElement = document.getElementById('table-holder');

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
  tableHolder.innerHTML = table;
  sessionStorage.setItem('sessionData', table);
};

const createForm = (x: number, y: number, r: number, cl: boolean): FormData => {
  const formData = new FormData();
  formData.append('x', x.toString());
  formData.append('y', y.toString());
  formData.append('r', r.toString());
  formData.append('clean', cl ? '1' : '0');
  return formData;
};

const handleData = async (form: FormData) => {
  const response = await fetch('php/main.php', {
    method: 'POST',
    body: form
  });
  return response.text();
};

button.onclick = () => {
  if (!validate()) {
    return;
  }
  setValueY();
  setValueR();
  handleData(createForm(xValue, yValue, rValue, false)).then((tableText) =>
    putTable(tableText)
  );
};

clearButton.onclick = () => {
  handleData(createForm(0, 0, 0, true)).then((result) => putTable(result));
  sessionStorage.clear();
};

putTable(sessionStorage.getItem('sessionData'));
