import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalCombo from '../modal/ModalComboDetail';
import ImageSlider from '../silder/ImgSlider';
import ModalCheckRemove from '../modal/ModalCheckRemove';
import '../entity/Combo.scss'
import { useSelector } from 'react-redux';
import { SelectAuth } from '../../../auth-service/redux/AuthSelector';
const Combo = ({ id, name, code, price, usd, imgUrl, description, menuIds, totalStarInTotalUser, comboData, comboList, data, loadData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [getImgUrl, setGetImgUrl] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [menuId, setMenuId] = useState([]);
  const isAuth = useSelector(SelectAuth);
  useEffect(() => {
    const fetchData = async () => {
      const base64Image = await imgUrl();
      setGetImgUrl(base64Image);
    };
    fetchData();
  }, [imgUrl]);

  useEffect(() => {
    menuIds.map((item) =>  setMenuId((prevMenuIds) => [...prevMenuIds, item.id]));
  },[])

  const hanldleUpdate = () => {
    setIsUpdate(true);
  }

  const updateSuccess = () => {
    setIsUpdate(false);
  }
  
  useEffect(() => {
    if(isUpdate) {
      comboData({ id, name, price, imgUrl, description, menuId, isUpdate: true , updateSuccess})
    }
  },[isUpdate]);

  const hanldleDelete = (event) => {
    event.preventDefault();
    setShowModalCheck(true);
  }
  const hanldleComboDetail = (event) => {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <div className='d-flex justify-content-center'>
      <Card style={{ width: '20rem', height: '29rem' }} className='d-flex'>
        <ImageSlider imageUrls={getImgUrl} />
        <Card.Body>
          <Card.Title>
            <div className='d-flex'><div>{name}</div>
            </div>

          </Card.Title>
          <Card.Text>
            <div className=''>Mã Code:{code}</div>
            <p>Giá: {price} Hoặc {usd}</p>
          </Card.Text>
          <div className='d-flex'>
            <div className=''>
              <Button
                variant="primary"
                onClick={(event) => hanldleComboDetail(event)}>
                <i class="fas fa-info-circle"></i>
                &nbsp;Details</Button>
            </div>
            {isAuth ? (
              <>
                <div className='ms-2'>
                  <Button variant="warning" onClick={hanldleUpdate}>
                    <i class="fas fa-edit"></i>&nbsp;Edit
                  </Button>
                </div>
                <div className='ms-2'>
                  <Button variant="danger" onClick={(event) => hanldleDelete(event)}>
                    <i class="fas fa-trash"></i>&nbsp;Remove
                  </Button>
                </div>
              </>
            ) : null}


          </div>
        </Card.Body>
      </Card>
      {showModal && (
        <ModalCombo
          id={id}
          name={name}
          code={code}
          price={price}
          imgUrl={imgUrl}
          description={description}
          totalStarInTotalUser={totalStarInTotalUser}
          show={showModal}
          onHide={() => setShowModal(false)}
          loadData={loadData}
        />
      )}
      {showModalCheck && (
        <ModalCheckRemove
          show={showModalCheck}
          onHide={() => setShowModalCheck(false)}
          id={id}
          name={name}
          afterRemove={comboList}
          data={data}
        ></ModalCheckRemove>
      )}
    </div>
  );
};

export default Combo;
