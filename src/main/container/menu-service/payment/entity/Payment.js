import React from 'react'

const Payments = ({id,index,paymentCode,orderResponse,discountResponse,totalPrice,customerPay,remain,status,score,createDate}) => {

    const convertPercentToString = (percent) => {
        let ONE = "ONE";
        let TWO = "TWO";
        let FIVE = "FIVE";
        let TEN = "TEN";
        switch (percent) {
            case ONE:
                return '1%';
            case TWO:
                return '2%';
            case FIVE:
                return '5%';
            case TEN:
                return '10%';
            default:
                return 'NULL';
        }
    }

    const convertIsExStatusToString = (exStatus) => {
        let CREATE = "CREATE";
        let EXPIRED = "EXPIRED";
        switch (exStatus) {
            case CREATE:
                return 'HSD:';
            case EXPIRED:
                return 'Đã Hết Hạn Sử Dụng Mã Giảm Giá';
           
            default:
                return 'NULL';
        }
    }
  
    return (
    <>
        <td>{index}</td>
        <td>{paymentCode}</td>
        <td>{orderResponse.orderCode}</td>
        <td>{discountResponse.discountCode}</td>
        <td>{convertPercentToString(discountResponse.percentDiscount)}</td>
        <td>{convertIsExStatusToString(discountResponse.status)}</td>
        <td>{totalPrice}</td>
        <td>{customerPay}</td>
        <td>{remain}</td>
        <td>{status}</td>
        <td>{score}</td>
        <td>{createDate}</td>
    </>
  )
}

export default Payments;