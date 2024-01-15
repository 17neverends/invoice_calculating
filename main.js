let tg = window.Telegram.WebApp;

tg.expand(); 

tg.MainButton.text = "Changed Text";
tg.MainButton.setText("Changed Text1");
tg.MainButton.textColor = "#F55353";
tg.MainButton.color = "#143F6B";
tg.MainButton.setParams({"color": "#143F6B"});
tg.MainButton.enable()



let input_contract_number = document.getElementById("contract_number");

function validate_contract_number() {
    const status_contract_number = document.getElementById("status_contract_number");
    if (input_contract_number.value.trim() === "") {
        status_contract_number.innerText = "Введите номер договора";
        return false;
    }else{
        status_contract_number.innerText = "";

    }
    return true;
}


function request() {
    const key = validate_contract_number();
    if (key) {
        let data = {
            contract_number: input_contract_number.value
        };
        let tg = window.Telegram.WebApp;
        tg.sendData(JSON.stringify(data));
    } 
}



const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск',
 'Коми Княжпогостский Чиньяворык fldjhfsdf sdhflsd fsdfb sfbsdf', 'Санкт-Петербург', 'Казань', 'Новосибирск'
 , 'Санкт-Петербург', 'Казань', 'Новосибирск',, 'Санкт-Петербург', 'Казань', 'Новосибирск',];

const departureCityList = document.getElementById('departure_city_list');
const destinationCityList = document.getElementById('destination_city_list');

cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
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
    return cities.filter(city => city.toLowerCase().includes(inputText));
}

function updateDropdown(dropdown, options) {
    dropdown.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        dropdown.appendChild(optionElement);
    });
}
