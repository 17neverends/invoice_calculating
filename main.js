let departure_from_list = false;
let destination_from_list = false;
const departureInput = document.getElementById('departure_city');
const target_input = document.getElementById('destination_city');

document.addEventListener('DOMContentLoaded', function () {

  const departure_city_list = document.getElementById('departure_city-list');
  const destination_city_list = document.getElementById('destination_city-list');

  const cities = [
    'Москва, Центральный федеральный округ, Россия',
    'Санкт-Петербург, Северо-Западный федеральный округ, Россия',
    'Казань, Приволжский федеральный округ, Россия',
    'Новосибирск, Сибирский федеральный округ, Россия',
    'Таганрог, Южный федеральный округ, Россия',
    'Шахты, Южный федеральный округ, Россия',
    'Новошахтинск, Южный федеральный округ, Россия',
    'Краснодар, Южный федеральный округ, Россия',
    'Батайск, Южный федеральный округ, Россия',
    'Азов, Южный федеральный округ, Россия',
    'Новочеркасск, Южный федеральный округ, Россия',
    'Аксай, Южный федеральный округ, Россия',
    'Ростов-на-Дону, Южный федеральный округ, Россия'
  ];


  const input_value = target_input.value.toLowerCase();
  const filtered_cities = filter_all_items(cities, input_value, 0);
  const filtered_regions = filtered_cities.length === 0 ? filter_all_items(cities, input_value, 1) : [];
  const filtered_countries = (filtered_cities.length === 0 && filtered_regions.length === 0) ? filter_all_items(cities, input_value, 2) : [];
  dropdown_list(destination_city_list, filtered_cities, filtered_regions, filtered_countries, input_value, target_input, departure_city_list);
  departureInput.addEventListener('input', function () {


    if (departureInput.value.trim() !== '') {
      departure_from_list = false;
    }
  });

  target_input.addEventListener('input', function () {


    if (target_input.value.trim() !== '') {
      destination_from_list = false;
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target !== departureInput && event.target !== target_input) {
      departure_city_list.style.display = 'none';
      destination_city_list.style.display = 'none';
  

    }
  });
  

  function dropdown_list(list, filtered_cities, filtered_regions, filtered_countries, input_value, inputElement, otherList) {
    if (input_value === '') {
      list.style.display = 'none';
    } else if (filtered_cities.length > 0) {
      display_all_items(list, filtered_cities.slice(0, 5), input_value, inputElement);
      list.style.display = 'block';
    } else if (filtered_regions.length > 0) {
      display_all_items(list, filtered_regions.slice(0, 5), input_value, inputElement);
      list.style.display = 'block';
    } else if (filtered_countries.length > 0) {
      display_all_items(list, filtered_countries.slice(0, 5), input_value, inputElement);
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  }

  function display_all_items(list, dislpay_items, input_value, inputElement, otherList) {
    list.innerHTML = '';
    dislpay_items.forEach(item => {
      const li = document.createElement('li');
      const matcher = item.toLowerCase().match(input_value) || [];
      const highlight_text = item.replace(new RegExp(matcher.join('|'), 'gi'), match => `<span class="highlight">${match}</span>`);
      li.innerHTML = highlight_text;
      li.addEventListener('click', function () {
        inputElement.value = item;
        list.style.display = 'none';
        if (list === departure_city_list) {
          departure_from_list = true;
          // console.log('Выбран город отправления:', item);
        } else if (list === destination_city_list) {
          destination_from_list = true;
          // console.log('Выбран город назначения:', item);
        }
      });
      list.appendChild(li);
    });
  }
  

  function filter_all_items(items, input_value, priorityIndex) {
    return items.filter(item => item.toLowerCase().split(', ')[priorityIndex].includes(input_value));
  }
});


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
  } else if (!destination_from_list) {
    label_status.innerText = "Выберите город получателя из меню";
    target_input.value = '';
    apply_error_styles_for_destination();
  }  else if (!departure_from_list) {
      label_status.innerText = "Выберите город отправителя из меню";
      departureInput.value = '';
      apply_error_styles_for_departure();
    
  } else if (non_numerical_input) {
    label_status.innerText = "Заполните корректные числовые значения";
    apply_error_styles_for_nymerical();
  } else {
    label_status.innerText = "Успешно";
    //Действия при успешном вводе
  }

  return false;
}

function apply_error_styles_for_nymerical() {
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

function apply_error_styles_for_departure() {
  const element = document.getElementById("departure_city");
    if (!departure_from_list) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
  }
}


function apply_error_styles_for_destination() {
  const element = document.getElementById("destination_city");
    if (!destination_from_list) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
  }
}
