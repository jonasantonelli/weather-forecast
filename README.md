# Weather Forecast App

Single Page JS app to displays the weather forecast

----

## Requirements

- `Node 12.18.2+`
- `Yarn`
- `Docker 20.10.0+`

## Installing

Installing all dependencies:

```bash
yarn install
```

## Application

Go the app package to run the application

```bash
cd packages/app
yarn start
```

The application is available on `http://localhost:3000`

## API

### Running

Go to the service package to build and run a docker container

```bash
cd packages/service
docker-compose up --build
```

By default the database will be seeded, use the `.env` to avoid this step

### Using

The API is available on `http://localhost:9000`

#### `/forecast`

##### Get

Used to get all forecasts

```bash
curl --location --request GET 'http://localhost:9000/forecast'
```

##### Get Weekly

Used to get weekly forecasts filtering by location and current date

```bash
curl --location --request GET 'http://localhost:9000/forecasts?location=Florianópolis'
```

Filtering by custom date

```bash
curl --location --request GET 'http://localhost:9000/forecasts?location=Florianópolis&date='
```

##### Post

Used to create a new forecast

```bash
curl --location --request POST 'http://localhost:9000/forecast' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "date": "2021-07-22T00:00:00.000Z",
    "location": { "city": "Florianópolis", "country": "BR" },
    "weather": "snow",
    "weatherHourly": [
      {
        "time": "2021-07-19T00:00:00Z",
        "temp": 32,
        "fells_like": 23,
        "temp_min": 9,
        "temp_max": 32,
        "humidity": 37,
        "clouds": 94,
        "wind_speed": 9.43
      }
    ]
  }'
```

##### Delete

Used to delete all forecasts

```bash
curl --location --request DELETE 'http://localhost:9000/forecast'
```

#####



## Build packages for production

At the root of the repository:

```bash
yarn build
```

This command will generate the compiled assets to the `/build` folder of each package.