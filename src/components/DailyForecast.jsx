import { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Carousel } from "@trendyol-js/react-carousel";
import CardCarousel from "./CardCarousel";

const DailyForecast = () => {
  // stato del componente
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // icone custom
  const icons = {
    "01d": "01d",
    "02d": "02d",
    "03d": "03d",
    "04d": "04d",
    "09d": "09d",
    "10d": "10d",
    "11d": "11d",
    "13d": "13d",
    "50d": "50d",
    "01n": "01n",
    "02n": "02n",
    "03n": "03n",
    "04n": "04n",
    "09n": "09n",
    "10n": "10n",
    "11n": "11n",
    "13n": "13n",
    "50n": "50n",
  };

  // Redux Store
  const city = useSelector((state) => state.cities.content);

  // dati necessari per la fetch
  const baseEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=";
  const baseEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const key = "5dbe3106653ea444b0de09843c5688ec";

  // data di oggi
  let dateObject = new Date();
  const today = dateObject.toLocaleString("it-IT", { weekday: "long", day: "numeric", month: "long" });

  // componentDidMount()
  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nextForecast = [];

  useEffect(() => {
    getWeatherForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const test = () => {
    forecast.list.map((item, index) => (index === 7 || index === 15 || index === 23 || index === 31 || index === 39 ? nextForecast.push([item]) : console.log(nextForecast)));
    nextForecast.splice(0, 1);
    console.log(nextForecast);
  };

  useEffect(() => {
    test();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch che recupera i dati della città recuperata tramite redux store
  const getWeather = async () => {
    try {
      const response = await fetch(baseEndpoint + city.lat + "&lon=" + city.lon + "&units=metric&appid=" + key);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setWeather(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch che recupera i dati della città recuperata tramite redux store
  const getWeatherForecast = async () => {
    try {
      const response = await fetch(baseEndpointForecast + city.lat + "&lon=" + city.lon + "&units=metric&appid=" + key);

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);

        setForecast(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      {weather && (
        <Row className="daily-forecast justify-content-center g-0">
          <Col xs={12}>
            <h2 className="text-center">
              <span>Epic</span>Weather Forecast
            </h2>
            <Card className="p-3">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between date">
                  <span className="today">Today</span>
                  <span className="date">{today}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between temperature my-4">
                  <div className="d-flex">
                    <span className="gradeDynamic">{weather.main.temp.toString().slice(0, weather.main.temp.toString().indexOf("."))}</span>
                    <span className="grade">°C</span>
                  </div>
                  <div className="img-wrapper">
                    <Image src={require(`../icons/${icons[weather.weather[0].icon]}.png`)} alt="" fluid />
                  </div>
                </div>
                <div className="d-flex align-items-center location">
                  <span className="icon">
                    <GeoAlt />
                  </span>
                  <span className="name">{weather.name},</span>
                  <span className="country">{weather.sys.country}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* {nextForecast.length > 1 && (
        <Row className="next-forecast justify-content-center g-0">
          <Col xs={12}>
            <h2>Next 5 Days</h2>
            <Carousel show={2.5} slide={3} swiping={true} rightArrow={true} leftArrow={true}>
              {console.log("riga 151:", nextForecast)}
              {nextForecast.map((oneday, index) => (
                <>
                  <CardCarousel oneday={oneday} icons={icons} index={index} key={index} />
                </>
              ))}
            </Carousel>
          </Col>
        </Row>
      )} */}

      {forecast && (
        <Row className="next-forecast justify-content-center g-0">
          <Col xs={12}>
            <h2>Next 5 Days</h2>
            <Carousel show={2.5} slide={3} swiping={true} rightArrow={true} leftArrow={true}>
              {/* {forecast.list.map((oneday, index) =>
                index === 7 || index === 15 || index === 23 || index === 31 || index === 39 ? <CardCarousel oneday={oneday} icons={icons} index={index} key={index} /> : ""
              )} */}
              {forecast.list.map((oneday, index) => {
                if (index === 7 || index === 15 || index === 23 || index === 31 || index === 39) {
                  return <CardCarousel oneday={oneday} icons={icons} index={index} key={index} />;
                }
              })}
            </Carousel>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default DailyForecast;
