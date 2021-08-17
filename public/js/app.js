const weatherForm = document.querySelector('.searchForm')
const locationMsg = document.querySelector('#location')
const forecastMsg = document.querySelector('#forecast')
const iconURL = document.querySelector('#icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = e.target[0].value
    
    locationMsg.textContent = 'Loading Weather Data...'
    forecastMsg.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then(({ error, location, forecast, icon }) => {
            if (error) {
                locationMsg.textContent = error;
            } else {
                locationMsg.textContent = location;
                forecastMsg.textContent = forecast;
                iconURL.src = icon;
            }
        });
    });
})