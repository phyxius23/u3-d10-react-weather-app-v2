import { Card } from "react-bootstrap";

// const Item = ({ oneday, index, icons }) => {
const Item111 = (props) => {
  console.log("oneday.dt_text:", props.oneday.dt_txt);
  console.log("oneday.main.temp:", props.oneday.main.temp);
  console.log("icons:", props.icons[props.oneday.weather[0].icon]);
  return (
    <Card>
      <div className="img-wrapper">
        <Card.Img variant="top" src={require(`../icons/${props.icons[props.oneday.weather[0].icon]}.png`)} alt="" />
      </div>
      <Card.Body className="py-0 px-3">
        <Card.Title>{props.oneday.dt_txt}</Card.Title>
        <Card.Text>{props.oneday.main.temp}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Item111;
