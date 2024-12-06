Sample weather app built with Vue3 + Vite + TS<br>
Demo at http://tawk-to-weather-app.surge.sh<br>
Deployed using https://surge.sh

## Libraries:
- Axios: https://www.npmjs.com/package/axios, for API calling
- dayjs: https://www.npmjs.com/package/dayjs, for easy date formatting
- Quasar: https://www.npmjs.com/package/quasar for UI framework, simplifies whole lot because of the ready made components
- pinia: https://www.npmjs.com/package/pinia, for state management

## Technical Details
1. Using Quasar makes the UI design easier, with lots of available components
2. List of country codes mapping JSON retrieved from https://gist.github.com/ssskip/5a94bfcd2835bf1dea52
3. Using 3 free APIs from OpenWeather API: 
- api.openweathermap.org/geo/1.0/direct,
- api.openweathermap.org/data/2.5/weather,
- api.openweathermap.org/data/2.5/forecast

## 🚀 How to test in your local environment
1.  **Start developing.**

    ```shell
    npm install
    npm run dev
    ```

2.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:5173`!