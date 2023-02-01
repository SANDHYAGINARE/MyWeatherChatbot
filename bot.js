const axios = require("axios");
const { Telegraf } = require("telegraf");
const TOKEN = "5827911657:AAFQkEXHFaK1BT0KJNagZy33VRDy3Pg8eJg";
const bot = new Telegraf(TOKEN);
const access_key = "17766bc6910080741120cfa48a6ed801";
const lat = 28.6448;
const lon = 77.216721;
const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${access_key}`;

const fetchData = () => {
  return axios
    .get(url)
    .then((res) => {
      return res.data.main.temp;
    })
    .catch((error) => {
      console.error("Failed to fetch data", error);
    });
};

function kelvinToCelsius(tempr) {
  return tempr - 273.15;
}

const getTemperature = async () => {
  try {
    const res = await axios.get(url);
    return res.data.main.temp;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const sendTemperatureUpdate = async (ctx) => {
  const temp = await getTemperature();
  const temperatureInCelsius = parseFloat(kelvinToCelsius(temp));
  ctx.reply(`The temperature in Delhi is ${temperatureInCelsius}°C`);
};

bot.on("message", (ctx) => {
  sendTemperatureUpdate(ctx);
  setInterval(() => {
    sendTemperatureUpdate(ctx);
  }, 3600000); 
});
bot.launch();
