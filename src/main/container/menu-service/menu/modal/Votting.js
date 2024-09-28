import React, { useState, useEffect } from 'react';
import { Button, Modal, Rating } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { createVote } from '../service/VottingService';
import { useSelector } from 'react-redux';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import { toast } from 'react-toastify';

const Votting = ({ show, onHide, name, id ,totalStarInTotalUser,loadData}) => {
    const totalStarRes = totalStarInTotalUser.slice(0,1);
    const [star, setStar] = useState("");
    const [totalStar,setTotalStar] = useState(totalStarRes);
    const tokenRes = useSelector(SelectTokenResponse);
    const userCode = tokenRes.user.userCode;
    
    const handleVotting =  (value) => {
        let valueRes = '';
        switch (value) {
            case 1:
                valueRes = 'ONE';
                break;
            case 2:
                valueRes = 'TWO';
                break;
            case 3:
                valueRes = 'THREE';
                break;
            case 4:
                valueRes = 'FOUR';
                break;
            case 5:
                valueRes = 'FIVE';
                break;
            default: return null;
        }
        setStar(valueRes);
    }

    const votting = async(value) => {
        const res = await createVote(star, userCode, id);
        if(res && res.data.responseData) {
            toast.success(`Voting ${value} star successfully \n Thank you user ${tokenRes.user.fullName}`);
            loadData();
        }
    }

    useEffect(() => {
        votting(star);
    }, [star]);

    return (
        <div>
            <div>
                <Modal show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Star Sản Phẩm {name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={totalStar}
                            onStarClick={handleVotting}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>
                            <i className="fas fa-times-circle"></i>&nbsp;Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Votting;
