const cities = [
  {
      country: 'Россия',
      region: 'Центральный федеральный округ',
      city: 'Москва'
  },
  {
      country: 'Россия',
      region: 'Северо-Западный федеральный округ',
      city: 'Санкт-Петербург'
  },
  {
      country: 'Россия',
      region: 'Приволжский федеральный округ',
      city: 'Казань'
  },
  {
      country: 'Россия',
      region: 'Сибирский федеральный округ',
      city: 'Новосибирск'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Таганрог'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Шахты'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Новошахтинск'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Краснодар'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Батайск'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Азов'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Новочеркасск'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Аксай'
  },
  {
      country: 'Россия',
      region: 'Южный федеральный округ',
      city: 'Ростов-на-Дону'
  }
];

let modal = document.getElementById('modal');
let overlay = document.getElementById('overlay');
let body = document.body;
let filteredCities = [];
let citiesList;
let searchInput;
let modalTitle;

function openModal(inputId, title) {
  const inputElement = document.getElementById(inputId);
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const body = document.body;
  citiesList = citiesList || document.getElementById('citiesList');
  searchInput = searchInput || document.getElementById('searchInput');
  modalTitle = modalTitle || document.getElementById('modal_title');

  if (modal && overlay && inputElement) {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    body.classList.add('modal-open');

    if (filteredCities.length === 0) {
      filterList();
    } else {
      updateList();
    }

    modalTitle.textContent = title;
    modalTitle.setAttribute('data-input-id', inputId);

    const selectedCity = inputElement.value;
    if (selectedCity) {
      searchInput.value = selectedCity;
    }
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  if (modal && overlay) {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    body.classList.remove('modal-open');
  }
}

function filterList() {
  const filter = searchInput.value.toLowerCase();
  filteredCities = cities.filter(city =>
    city.country.toLowerCase().includes(filter) ||
    city.region.toLowerCase().includes(filter) ||
    city.city.toLowerCase().includes(filter)
  );
  updateList();
}

function updateList() {
  const fragment = document.createDocumentFragment();
  filteredCities.forEach(city => {
    const li = document.createElement('li');
    li.classList.add('cityItem');
    li.textContent = `${city.country}, ${city.region}, ${city.city}`;
    li.addEventListener('click', () => selectedCity(`${city.country}, ${city.region}, ${city.city}`, modalTitle.getAttribute('data-input-id')));
    fragment.appendChild(li);
  });

  citiesList.innerHTML = '';
  citiesList.appendChild(fragment);
}

function selectedCity(city, inputId) {
  console.log(`${inputId}`)
  const inputElement = document.getElementById(inputId);
  if (inputElement) {
    inputElement.value = city;
  }
  closeModal();
}




//

// Блок валидации

//
const valid = ["box_length", "box_width", "box_height", "box_weight", "destination_city", "departure_city"];
const numerical = ["box_length", "box_width", "box_height", "box_weight"];
const label_status = document.getElementById('status'); 

function check_inputs() {
  remove_error_styles();
  if (validate_inputs_value()) {
    label_status.innerText = "Заполните все поля";
  } 
}

function remove_error_styles() {
  for (const id of valid) {
    const element = document.getElementById(id);
    element.classList.remove('error');
  }
}

function validate_inputs_value() {
  let any_inputs_empty = false;
  let non_numerical_input = false;

  for (const id of valid) {
    const element = document.getElementById(id);
    const value = element.value.trim();

    if (!value) {
      any_inputs_empty = true;
    }

    if (numerical.includes(id)) {
      if (value === '' || !/^[0-9]+([.,][0-9]+)?$/.test(value)) {
        non_numerical_input = true;
      }
    }
  }

  if (any_inputs_empty) {
    return true;
  } else if (non_numerical_input) {
    label_status.innerText = "Заполните корректные числовые значения";
    apply_error_style();
  } else {
    label_status.innerText = "Успешно";
    //Действия при успешном вводе
  }

  return false;
}

function apply_error_style() {
  for (const id of numerical) {
    const element = document.getElementById(id);
    const isValid = element.value.trim() !== '' && /^[0-9]+([.,][0-9]+)?$/.test(element.value.trim());
    if (!isValid) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
    }
  }
}
