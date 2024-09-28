import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Form.scss'
import { useDispatch } from 'react-redux';
import { updateBookedAction, updateMaintenanceAction, updatePendingAction, updateReadyAction } from '../redux/FormAction';
const Form = ({ id, formCode, status, }) => {
    const dispatch = useDispatch();
    const [statusConfig, setStatusConfig] = useState('');
    useEffect(() => {
        const READY = 'READY';
        const PENDING = 'PENDING';
        const MAINTENANCE = 'MAINTENANCE';
        const BOOKED = 'BOOKED';

        if (status) {
            switch (status) {
                case READY:
                    setStatusConfig('Sẵn Sàng Nhận Khách');
                    break;
                case PENDING:
                    setStatusConfig('Chờ Phục Vụ');
                    break;
                case MAINTENANCE:
                    setStatusConfig('Đang Bảo Trì');
                    break;
                case BOOKED:
                    setStatusConfig('Đã Được Đặt');
                    break;
                default:
                    setStatusConfig('Không có');
                    break;
            }
        }
    }, [status]);
    const mapFormCode = (code) => {
        if (code === 'MVN') {
            return 'Mang về nhà';
        } else if (code.startsWith('T')) {
            const parts = code.split('-');
            if (parts.length === 2) {
                const floor = parts[0].slice(1);
                const table = parts[1].slice(1);
                return `Tầng ${floor} - Bàn ${table}`;
            }
        }
        return code;
    };

    let hideReadyButton = false;
    let hidePendingButton = false;
    let hideMaintenanceButton = false;
    let hideBookedButton = false;
    let cardClassName = '';
    switch (status) {
        case 'READY':
            cardClassName = 'ready';
            hideReadyButton = true;
            break;
        case 'PENDING':
            cardClassName = 'pending';
            hidePendingButton = true;
            break;
        case 'MAINTENANCE':
            cardClassName = 'maintenance';
            hideMaintenanceButton = true;
            break;
        case 'BOOKED':
            cardClassName = 'booked';
            hideBookedButton = true;
            break;
        default:
            cardClassName = '';
            break;
    }

    const handleReady = () => {
        dispatch(updateReadyAction(id))
    }

    const handlePending = () => {
        dispatch(updatePendingAction(id))
    }

    const handleMaintenance = () => {
        dispatch(updateMaintenanceAction(id))
    }

    const handleBooked = () => {
        dispatch(updateBookedAction(id))
    }
    return (
        <div>
            <Card
                style={{ width: '18rem' }}
            >
                <Card.Body className={cardClassName}>
                    <Card.Title>{formCode}</Card.Title>
                    <Card.Text>
                        {mapFormCode(formCode)}
                    </Card.Text>
                    <div className='d-flex flex-column'>
                        {!hideReadyButton && (
                            <Button className='btn btn-success' onClick={handleReady}>Update READY</Button>
                        )}
                        {!hidePendingButton && (
                            <Button className='btn btn-warning' onClick={handlePending}>Update PENDING</Button>
                        )}
                        {!hideMaintenanceButton && (
                            <Button className='btn btn-danger' onClick={handleMaintenance}>Update MAINTENANCE</Button>
                        )}
                        {!hideBookedButton && (
                            <Button className='btn btn-info' onClick={handleBooked}>Update BOOKED</Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Form
