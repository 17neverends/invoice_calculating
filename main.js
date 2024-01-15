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
      city: 'Краснодар'
    }
  ];
  
  const departureCityList = document.getElementById('departure_city_list');
  const destinationCityList = document.getElementById('destination_city_list');
  
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = `${city.country}, ${city.region}, ${city.city}`;
    departureCityList.appendChild(option.cloneNode(true));
    destinationCityList.appendChild(option);
  });
  
  const departureCityInput = document.getElementById('departure_city');
  const departureCityDropdown = document.getElementById('departure_city_dropdown');
  const statusDepartureCity = document.getElementById('status_departure_city');
  
  departureCityInput.addEventListener('input', function () {
    const inputText = departureCityInput.value.toLowerCase();
    const matchingCities = filterCities(inputText);
    updateDropdown(departureCityDropdown, matchingCities);
  });
  
  const destinationCityInput = document.getElementById('destination_city');
  const destinationCityDropdown = document.getElementById('destination_city_dropdown');
  const statusDestinationCity = document.getElementById('status_destination_city');
  
  destinationCityInput.addEventListener('input', function () {
    const inputText = destinationCityInput.value.toLowerCase();
    const matchingCities = filterCities(inputText);
    updateDropdown(destinationCityDropdown, matchingCities);
  });
  
  function filterCities(inputText) {
    return cities.filter(city =>
      `${city.country}, ${city.region}, ${city.city}`.toLowerCase().includes(inputText)
    );
  }
  
  function updateDropdown(dropdown, options) {
    dropdown.innerHTML = '';
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = `${option.country}, ${option.region}, ${option.city}`;
      optionElement.title = `${option.country}, ${option.region}, ${option.city}`; // Добавляем всплывающую подсказку
      dropdown.appendChild(optionElement);
    });
  }
  
  var cityInputs = document.querySelectorAll('.city-input');

    cityInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            var rect = input.getBoundingClientRect();
            var dataList = input.list;
            if (dataList) {
                dataList.style.position = 'fixed';
                dataList.style.top = rect.bottom + 'px';
                dataList.style.left = rect.left + 'px';
            }
        });
    });
