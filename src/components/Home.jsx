import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../icons/02d.png";

const Home = () => {
  return (
    <>
      <Container>
        <div className="hero">
          <Image fluid src={logo} />
          <h1>
            <span>Epic</span>Weather
          </h1>
          <Link to="/search">
            <Button variant="primary">Get start</Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
export default Home;
