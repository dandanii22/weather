import { DayCardWrap } from "../styled/Style";

const DayCard = ({ item, editBtn, onDel, showDatailPage }) => {
  const { id, city, country, temp, imgCode } = item;

  return (
    <DayCardWrap>
      <div className="wrap">
        {!editBtn && (
          <div className="editbutton" onClick={() => onDel(id)}>
            <i className="xi-minus"></i>
          </div>
        )}
        <div className="card" onClick={showDatailPage}>
          <p className="cityname">
            {city} , {country}
          </p>
          <img
            className="weathericon"
            src={`../../public/images/${imgCode}.png`}
            alt="weathericon"
          />
          <p className="temper">{temp}℃</p>
        </div>
      </div>
    </DayCardWrap>
  );
};

export default DayCard;
