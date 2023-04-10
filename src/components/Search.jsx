import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../icons/02d.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();

  const baseEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const key = "5dbe3106653ea444b0de09843c5688ec";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&appid=" + key);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
        console.log(data);
      } else {
        alert("alert: error fetching results");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Container className="search-page">
        <Row className="justify-content-center">
          <Col xs={9}>
            <div className="img-wrapper">
              <Image fluid src={logo} />
            </div>
            <h1>EpicSearch</h1>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control type="search" className="me-2" value={query} onChange={handleChange} />
              <Button type="submit" variant="outline-primary">
                Search
              </Button>
            </Form>
          </Col>
          <Col xs={9} className="mx-auto mt-3">
            {cities.map((city, index) => (
              <div key={index}>
                <Link to={`/city/${city.local_names.it}`}>
                  <Button onClick={() => dispatch({ type: "ADD_CITY", payload: city })}>
                    {city.local_names.it}, {city.country}
                  </Button>
                </Link>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Search;
