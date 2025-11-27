# 🌦️ Weather App

A simple weather application built with **HTML, CSS, and JavaScript**.  
It uses the [OpenWeatherMap API](https://openweathermap.org/) to fetch real-time weather data for any city.

---

## 🚀 Features
- 🔍 Search weather by city name  
- 🌡️ Displays temperature, humidity, and wind speed  
- ☁️ Dynamic weather icons for different conditions  
- ⚠️ Error handling for invalid city names  
- 🎨 Clean and responsive UI  

---

## 🌐 Live Demo
👉 [Check it out here](https://weather-app-dg58-git-main-daniyaa1s-projects.vercel.app/)  
 

---

## 🛠️ Tech Stack
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **OpenWeatherMap API**

---

## ⚙️ How to Run
1. Clone this repository:
   ```bash
   git clone https://github.com/daniyaa1/weather-app.git

2.Navigate into the project folder:
```bash
cd weather-app

3. Open index.html in your browser.

---
📌 Notes

Make sure you replace the apiKey in script.js with your own key from OpenWeatherMap.
API calls are free up to a certain limit.


---
👩‍💻 Author

Daniya Ishteyaque


---

## 🧪 Local development (backend proxy)

If you want to run the project locally (recommended), the repository includes a small backend in `backend/` that forwards requests to OpenWeatherMap so your API key is kept server-side.

1. Install and run the backend:

```bash
cd backend
npm install
# create a file named .env in the backend folder with a single line:
# API_KEY=your_openweather_api_key_here
npm start
```

2. Open `index.html` in your browser. The frontend is configured to call `http://localhost:3000/weather?city=...` by default.

If you prefer to use the deployed backend, change the endpoint in `script.js` back to the deployed URL.

## 🚀 Deployment (Vercel)

When you deploy the app to Vercel, the backend needs an OpenWeatherMap API key available as an environment variable named `API_KEY`.

Steps to configure on Vercel (UI):
1. Go to your Vercel dashboard and open the project.
2. Settings → Environment Variables → Add New
   - Name: `API_KEY`
   - Value: your OpenWeatherMap API key (no quotes)
   - Environment: select `Production` (and `Preview` if you want it available for previews)
3. Save and trigger a redeploy (Deployments → Redeploy latest) or push a new commit.

How to verify the deployment:
- Call the status endpoint to check whether the API key is set (it will not return the key value):

```bash
curl -i "https://<your-vercel-domain>/status"
# example response when missing:
# {"ok":true,"apiKeySet":false,"message":"API key missing on server"}
```

Once `apiKeySet` is `true`, the `/weather` endpoint should return real weather data for valid city names.

Security note: never commit your API key. Keep it in Vercel environment variables or in a local `backend/.env` (which is ignored by .gitignore). Use `backend/.env.example` as a template.


Now just:  

```bash
git add README.md
git commit -m "Added live demo link in README"
git push




