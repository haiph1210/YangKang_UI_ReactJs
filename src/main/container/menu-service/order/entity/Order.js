import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateApprovedAction, updateRefuseAction } from '../redux/OrderAction';
import { selectOrder } from '../redux/OrderSelect';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';

function Order({ id, orderCode, personResponse, people, totalAmount, totalPrice, createdDate, hour, description, type, status }) {
  const dispatch = useDispatch();
  const orderSelect = useSelector(selectOrder);
  const tokenRespone = useSelector(SelectTokenResponse);
  const conversePeoPleToString = () => {
    let TEN = "TEN";
    let FIVETEEN = "FIVETEEN";
    let TWENTY = "TWENTY";
    let THIRTY = "THIRTY";
    let FIVETY = "FIVETY";
    let ONE = "ONE";
    switch (people) {
      case 'TEN':
        return 'Custome Order Table 10 People';
        break;

      case 'FIVETEEN':
        return 'Custome Order Table 15 People';
        break;
      case 'TWENTY':
        return 'Custome Order Table 20 People';
        break;
      case 'THIRTY':
        return 'Custome Order Table 30 People';
        break;
      case 'FIVETY':
        return 'Custome Order Table 40 People';
        break;
      case 'ONE':
        return 'Custome Order Party';
        break;
      default:
        break;
    }
  }

  const convertseTypeToString = () => {
    let TAKE_HOME = 'TAKE_HOME';
    let RESTAURANT = 'RESTAURANT';
    switch (type) {
      case 'TAKE_HOME':
        return 'Order Take Home';
        break;
      case 'RESTAURANT':
        return 'Eating Food At Restaurants';
        break;
      default:
        return;
    }
  }

  const handleApproved = () => {
    dispatch(updateApprovedAction(id));


  }

  const handleRefuse = () => {
    dispatch(updateRefuseAction(id));

  }
  return (
    <div className='d-flex justify-content-end'>
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>Code: {orderCode}</Card.Title>
        <Card.Text>
          <div>
            <div>User: {personResponse.fullName}</div>
            <div>{conversePeoPleToString()}</div>
            <div>TotalAmount: {totalAmount}</div>
            <div>TotalPrice: {totalPrice}</div>
            <div>Hour: {hour}</div>
            <div>Day: {createdDate}</div>
            <div>Description: {description}</div>
            <div>Type: {convertseTypeToString}</div>
          </div>
        </Card.Text>
        {tokenRespone.user.role ==="ADMIN" 
        ?  
        <div className='d-flex justify-content-around'>
        {status === "PENDING" 
        ?
        <>
        <Button
          className='btn btn-success'
          variant="primary"
          onClick={handleApproved}
        ><i class="fa-solid fa-check"></i>&nbsp;Approved</Button>
        <Button
          className='btn btn-danger'
          variant="primary"
          onClick={handleRefuse}
        ><i class="fa-solid fa-ban"></i>&nbsp;Refuse</Button>
        </>
        :
        <>
        <Button
          className='btn btn-success'
          variant="primary"
          onClick={handleApproved}
          disabled={true}
        ><i class="fa-solid fa-check"></i>&nbsp;Approved</Button>
        <Button
          className='btn btn-danger'
          variant="primary"
          onClick={handleRefuse}
          disabled={true}
        ><i class="fa-solid fa-ban"></i>&nbsp;Refuse</Button>
        </>
        }
        
      </div>
        : null
        }
       
      </Card.Body>
    </Card>
    </div>
  );
}

export default Order;