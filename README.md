# Data visualisation chart

This project is coding exercise: 
backend serializes data from arrow file,
frontend shows the data chart.
Visualisation insight is implemented as profit chart grouped by different categories of the data

https://github.com/user-attachments/assets/4920fba2-deaf-4167-863f-89c10b4751bb


## Installation and run

To run project localy download repository and set up backend and fronend with instructions below

### Backend 

Requirements: python3 installed and python virtual environment activated

```
cd backend
python3 -m pip install -r requirements.txt
uvicorn main:app
```

### Frontend

Requirements: npm installed

```
cd fronend
npm install
npm run start
```

## Software stack

### Frontend
- JavaScript
- React
- D3.js library for visualisation

### Backend

- Pyhon3
- Fast API
- Pyarrow
