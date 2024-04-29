
const countriesCities = {
  Ecuador: ['Gualaceo', 'Cuenca', 'Quito'],
  Perú: ['Lima', 'Cusco', 'Cumanda'],
  Bolivia: ['La Paz', 'Sucre', 'Trinidad'],
}

const person = {
  name: '',
  id: '',
  address: '',
  phone: '',
  age: 0,
  country: '',
  city: '',
  hour: '',
  date: '',

}

const consultas = [
  {
    persona: 'Mateo Once',
    date: '25/4/2024',
    hour: '4pm'
  },
  {
    persona: 'Jose Luis Once',
    date: '26/4/2024',
    hour: '4pm'
  },
  {
    persona: 'Belen Sarmiento',
    date: '27/4/2024',
    hour: '4pm'
  }
]


let idInput = document.getElementById('cedula');

idInput.addEventListener('input', function(event) {
  // Obtener el valor actual del input
  let valor = this.value;

  // Filtrar los caracteres no numéricos utilizando una expresión regular
  let numeros = valor.replace(/\D/g, '');

  // Si el valor cambió debido a la eliminación de caracteres no numéricos, actualizar el valor del input
  if (numeros !== valor) {
      this.value = numeros;
  }
});

const setAge =  (date, hour) =>  {

  const dateParts = date.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const hourParts = hour.split(':');
  const hourPart = parseInt(hourParts[0]);
  const minutes = parseInt(hourParts[1]);
  
  const dateBirth = new Date(year, month, day, hourPart, minutes);
  const now = new Date();
  const timeBetween = now.getTime() - dateBirth.getTime();

  const years = Math.floor(timeBetween / 3.154e+10);
  const months = Math.floor(timeBetween / 2.628e+9) - (years*12);
  const days = Math.floor(timeBetween / 8.64e+7) - (months * 30.4167)
  
  
  console.log(now - dateBirth);
  return {
    years,
    months
  }
} 

function loadData (event){

  const idNumber = document.getElementById('cedula').value;
  const name = document.getElementById('nombre').value;
  const address = document.getElementById('direccion').value;
  const phone = document.getElementById('telefono').value;
  const date = document.getElementById('fechaNacimiento').value;
  const hour = document.getElementById('horaNacimiento').value;
  const country = document.getElementById('paises').value;
  const city = document.getElementById('cities').value;
  const age = setAge(date, hour);
  event.preventDefault();
  person.name = name;
  person.id = idNumber;
  person.address = address;
  person.phone = phone;
  person.date = date;
  person.hour = hour;
  person.country = country;
  person.city = city;
  person.age = `${age.years} años, ${age.months} meses`;
  updatePeopleTable(person);
  cleanFields();
  getTableInfo();

  
}

const loadConsultas = () => {

  const tableConsultas = document.getElementById('consultas-table');

  consultas.forEach( (consulta) => {
    const row = document.createElement('tr');
    for(let key in consulta){
      const data = document.createElement('td');
      data.textContent = consulta[key];
      row.appendChild(data);
    }

    tableConsultas.querySelector('tbody').appendChild(row);
  });



}

const cleanFields = () => {
  const form = document.getElementById("formulario");

  const fields = [...form.getElementsByTagName("input")];
  fields.forEach(value => value.value = "");
}

const updatePeopleTable = (person) => {
  const infoTable = document.getElementById('info-table');

  const row = document.createElement('tr');
  for (let key in person){
    if(key === 'hour' || key === 'date') break;
    const data = document.createElement('td');
    data.textContent = person[key];
    row.appendChild(data);

  }
  infoTable.querySelector('tbody').appendChild(row);
}

function updateCitiesCombo(event){
  const countriesCombo = document.getElementById("paises");
  const citiesCombo = document.getElementById("cities");
  const option = countriesCombo.value;
  citiesCombo.innerHTML = "";
  countriesCities[option].forEach((value) => {
    citiesCombo.innerHTML += `<option value='${value}'>${value}</option>`

  });
  
  
}

const validarCedula = (event) => {

  let cedulaInput = document.getElementById('cedula');
  let cedulaError = document.getElementById('cedulaError');

  const cedula = cedulaInput.value;

  const ci = cedula.toString().split('');
  
  console.log(ci)
  if (ci.length > 10 || ci.length < 10) {
    cedulaError.textContent = 'Cédula incorrecta';
    cedulaError.style.display = 'inline';
    return false;
  }

  let digitoRegion = Number(ci[0] + ci[1]);
  if (digitoRegion < 1 || digitoRegion > 24) {
    cedulaError.textContent = 'Cédula incorrecta';
    cedulaError.style.display = 'inline';
    event.preventDefault();
    return false;
  }

  let tercerDigito = Number(ci[2]);
  if (tercerDigito < 0 || tercerDigito > 6) {
    cedulaError.textContent = 'Cédula incorrecta';
    cedulaError.style.display = 'inline';
    event.preventDefault();

    return false;
  }

  let suma = 0;
  let val = 0;
  for (let i = 0; i < 9; i++) {
      if (i & 1) {
          val = ci[i] * 1;
          if (val >= 10) {
              val = val - 9;
          }
      } else {
          val = ci[i] * 2;
          if (val >= 10) {
              val = val - 9;
          }
      }
      suma += val;
  }

  suma = suma % 10 ? 10 - suma % 10 : 0;

  if (suma === Number(ci[ci.length - 1])) {
    cedulaError.textContent = '';
    cedulaError.style.display = 'none';
    event.preventDefault();
    loadData(event);
    return true;
  } else {
    cedulaError.textContent = 'Cédula incorrecta';
    cedulaError.style.display = 'inline';
    event.preventDefault();
    return false;
  }
}

const previewImage = () => {
  
  let fileInput = document.getElementById('fileInput');
    let files = fileInput.files;
    if (files.length > 0) {
      let file = files[0];
      let reader = new FileReader();
      reader.onload = function(e) {
        let preview = document.getElementById('preview-image');
        let img = new Image();
        img.src = e.target.result;
        img.classList.add('img-fluid');
        preview.innerHTML = '';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }

}

const getTableInfo = () => {
  let table = document.getElementById('info-table');
  let columnValues = [];

  for(let i = 1; i < table.rows.length; i++) {
      let celda = table.rows[i].cells[0];
      columnValues.push(celda.innerHTML);
  }

  let combo = document.getElementById("parents");
  combo.innerHTML = '';
  // Recorrer la lista y agregar cada elemento como una opción en el combo
  columnValues.forEach((elemento) => {
      let opcion = document.createElement("option");
      opcion.text = elemento;
      opcion.value = elemento; // Puedes establecer un valor diferente si lo deseas
      combo.add(opcion);
  });

  console.log(columnValues);
}

const loadHijos = (event) => {
  const name = document.getElementById('sonName').value;
  const parent = document.getElementById('parents').value;
  const parentezco = document.getElementById('parentezco').value;
  event.preventDefault();
  updateChildrenTable({
    name,
    parent,
    parentezco
  });
}

const updateChildrenTable = (person) => {
  const infoTable = document.getElementById('children-table');

  const row = document.createElement('tr');
  for (let key in person){
    const data = document.createElement('td');
    data.textContent = person[key];
    row.appendChild(data);

  }
  infoTable.querySelector('tbody').appendChild(row);
}
window.onload = () => {
  updateCitiesCombo();
  loadConsultas();
}

