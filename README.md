# ChartEase

ChartEase is a MERN web application that allows users to create simple flowcharts with an intuitive interface. Users can make flowcharts without needing to log in, and if they create an account, they can save and edit their flowcharts.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or a cloud instance)

1. **Clone the Repository:**
```
git clone https://github.com/jthomas981/ChartEase
cd ChartEase
```

2. **Install Dependencies:**
```
cd backend
npm install
cd ../frontend
npm install
```

3. **Set Up `.env` file:**
See the `.envexample` file for how the `.env` should look like. The MongoDB uri needs to be changed.

## Run the Application
To start both the backend and frontend simultaneously, return to the root of your project and run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:5000` (or the appropriate port for your frontend).
