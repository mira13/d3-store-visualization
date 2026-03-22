# Data visualisation chart

This project is coding exercise: 
backend serializes data from arrow file
frontend shows the data chart
visualisation insight is implemented as profit chart grouped by different categories of the data

## Installation and run

To run project localy download repository and set up backend and fronend with instructions below

### Backend 

Requirements: python3 installed and python virtual environment activated

```
cd backend
python3 -m pip install -r requirements.txt
uvicorn arrow:app
```

### Fronend

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
