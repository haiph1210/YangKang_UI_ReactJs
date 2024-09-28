import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SelectTokenResponse } from '../auth-service/redux/AuthSelector';
import img3 from '../../../asset/img-restaurant/img3.jpg';
import img5 from '../../../asset/img-restaurant/img5.jpg';
import img6 from '../../../asset/img-restaurant/img6.jpg';

const Home = () => {
  const userToken = useSelector(SelectTokenResponse);
  const imgRestaurant = useMemo(() => [img3, img5, img6], []);

  return (
    <div>
      <div>Xin chào khách hàng <i>{userToken.user.fullName}</i></div>
      <div>Rất hân hạnh được đón tiếp Khách hàng</div>
      <div>Sau đây là không gian quán</div>

      {imgRestaurant.map((item, index) => (
        <div className='d-flex flex-column '>
          <div className='mb-5 justify-content-center'>
        <img
          key={index}
          src={item}
          alt={`Image ${index + 1}`}
          width="300"
          height="200"
        />
        </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
