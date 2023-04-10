const CardCarousel = ({ oneday, index, icons }) => {
  const timestamp = oneday.dt;
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleString("it-IT", { day: "numeric", month: "short" });
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const hour = addZero(date.getUTCHours());

  return (
    <>
      <div className="img-wrapper" key={index}>
        <img src={require(`../icons/${icons[oneday.weather[0].icon]}.png`)} className="img-fluid" alt="" />
      </div>
      <div className="text-body">
        <p className="date">
          {day} ore {hour}
        </p>
        <p className="temperature">
          {oneday.main.temp.toString().slice(0, oneday.main.temp.toString().indexOf("."))}
          <span> C°</span>
        </p>
      </div>
    </>
  );
};
export default CardCarousel;
