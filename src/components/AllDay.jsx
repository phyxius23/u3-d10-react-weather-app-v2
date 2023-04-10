import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const AllDay = () => {
  // stato del componente
  const [forecast, setForecast] = useState(null);

  // Redux Store
  const city = useSelector((state) => state.cities.content);

  // dati necessari per la fetch
  const baseEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const key = "5dbe3106653ea444b0de09843c5688ec";

  // data di oggi
  // let dateObject = new Date();
  // const today = dateObject.toLocaleString("it-IT", { weekday: "long", day: "numeric", month: "long" });

  useEffect(() => {
    getWeatherForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch che recupera i dati della città recuperata tramite redux store
  async function getWeatherForecast() {
    try {
      const response = await fetch(baseEndpointForecast + city.lat + "&lon=" + city.lon + "&units=metric&cnt=5&appid=" + key);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setForecast(data);
        // console.log(forecast);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {forecast && (
        <ListGroup>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};
export default AllDay;
