import { EditBtnWrap, ClearEditBtnWrap } from "../styled/Style";

const EditBtn = ({ hours, onEdit, editBtn }) => {
  return (
    <>
      {editBtn ? (
        // editBtn이 true인 경우
        hours >= 18 || hours < 6 ? (
          <EditBtnWrap className="on" onClick={onEdit}>
            <img
              src={"https://dandanii22.github.io/weather/images/editn.png"}
              alt="Edit Button Night"
            />
          </EditBtnWrap>
        ) : (
          <EditBtnWrap onClick={onEdit}>
            <img
              src={"https://dandanii22.github.io/weather/images/editd.png"}
              alt="Edit Button Day"
            />
          </EditBtnWrap>
        )
      ) : // editBtn이 false인 경우
      hours >= 18 || hours < 6 ? (
        <ClearEditBtnWrap className="on" onClick={onEdit}>
          <img
            src={"https://dandanii22.github.io/weather/images/editoffn.png"}
            alt="Edit Off Button Night"
          />
        </ClearEditBtnWrap>
      ) : (
        <ClearEditBtnWrap onClick={onEdit}>
          <img
            src={"https://dandanii22.github.io/weather/images/editoffd.png"}
            alt="Edit Off Button Day"
          />
        </ClearEditBtnWrap>
      )}
    </>
  );
};

export default EditBtn;
