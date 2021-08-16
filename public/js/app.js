console.log('Client Side JS file loaded!');

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// });

const weatherForm = document.querySelector('.searchForm')
const locationMsg = document.querySelector('#location')
const forecastMsg = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = e.target[0].value
    
    locationMsg.textContent = 'Loading Weather Data...'
    forecastMsg.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(({ error, location, forecast }) => {
            if(error) {
                locationMsg.textContent = error
            } else {
                locationMsg.textContent = location
                forecastMsg.textContent = forecast
            }
        })
    });
})