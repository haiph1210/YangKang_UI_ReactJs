import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalMenu from '../modal/ModalMenuDetail';
import ImageSlider from '../silder/ImgSlider';
import ModalCheckRemove from '../modal/ModalCheckRemove';
import '../entity/Menu.scss'
import { useSelector } from 'react-redux';
import { SelectAuth, SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
const Menu = ({ id, name, code, price, usd, imgUrl, description , totalStarInTotalUser, menuData, menuList, data,loadData,isDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [getImgUrl, setGetImgUrl] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const tokenRespone = useSelector(SelectTokenResponse);
  const isAuth = useSelector(SelectAuth);
  const [isDeleted,setIsDeleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(!isDeleted) {
        const base64Image = await imgUrl();
        console.log(base64Image);
        setGetImgUrl(base64Image);
        setIsDeleted(false);
      }
      return;
    };
    fetchData();
  }, [imgUrl]);

  

  const hanldleUpdate = (event) => {
    event.preventDefault();
    setIsUpdate(true);
    menuData({ id, name, price, imgUrl, description, isUpdate: true })
  }

  const hanldleDelete = (event) => {
    event.preventDefault();
    setShowModalCheck(true);
  }
  const hanldleMenuDetail = (event) => {
    event.preventDefault();
    setShowModal(true);
  }

  const handleDelete = (value) => {
    setIsDeleted(value);
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
                onClick={(event) => hanldleMenuDetail(event)}>
                <i class="fas fa-info-circle"></i>
                &nbsp;Details</Button>
            </div>
            {isAuth && tokenRespone.user.role === "ADMIN"  ? (
              <>
                <div className='ms-2'>
                  <Button variant="warning" onClick={(event) => hanldleUpdate(event)}>
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
        <ModalMenu
          id={id}
          name={name}
          code={code}
          price={price}
          imgUrl={imgUrl}
          description={description}
          totalStarInTotalUser={totalStarInTotalUser}
          show={showModal}
          onHide={() => setShowModal(false)}
          loadData = {loadData}

        />
      )}
      {showModalCheck && (
        <ModalCheckRemove
          show={showModalCheck}
          onHide={() => setShowModalCheck(false)}
          id={id}
          name={name}
          afterRemove={menuList}
          data={data}
          isDelete={handleDelete}
        ></ModalCheckRemove>
      )}
    </div>
  );
};

export default Menu;
