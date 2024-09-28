import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Combo from '../entity/Combo';
import { findAll, findAllCombo, loadListImages, loadListImagesCombo } from '../service/ComboService';
import FilterCombo from '../filter/SearchCombo';
import ModalRequest from '../modal/ModalRequest';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { SelectAuth, SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import {NumberFormat} from 'intl';
import 'intl/locale-data/jsonp/en';
const ListCombos = () => {
    const [combos, setCombos] = useState([]);
    const [totalPage, setTotalPage] = useState("");
    const [filteredCombo, setFilteredCombo] = useState([]);
    const [saveComboToUpdate, setSaveComboToUpdate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const tokenRes = useSelector(SelectTokenResponse);
    const isAuth = useSelector(SelectAuth);
    const formatPrice = (price) => {
        const formatter = new NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
        return formatter.format(price);
      };
      const formatPriceUSD = (priceVND) => {
        const exchangeRate = 23000; // Tỷ giá hối đoái: 23.000 VND = 1 USD
        const priceUSD = priceVND / exchangeRate;
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return formatter.format(priceUSD);
      };

    const getAllCombo = async (page) => {
        const res = await findAllCombo(page);
        if (res && res.responseData && res.responseData.content) {
            setCombos(res.responseData);
            setFilteredCombo(res.responseData.content);
            setTotalPage(res.responseData.totalPages);
        }

    };

    const handlePageClick = (event) => {
        getAllCombo(+event.selected + 1)
    }

    const getAllBase64Image = async (id) => {
        const res = await loadListImagesCombo(id);
        if (res) {
            const bodies = res.map((item) => item.body);
            return bodies;
        } else {
            return "1";
        }
    };


    const handleFilter = (filter) => {
        const updatedFilteredCombo = filter;
        console.log(filter);
        setFilteredCombo(updatedFilteredCombo);
    }

    const handleAffterAdd = () => {
        getAllCombo();
    }

    const handleAffterDelete = (datas) => {
        const data = datas;
        setFilteredCombo(data);
    }
    const hanldeSaveDataToUpdate = (menuData) => {
        const data = menuData;
        console.log(menuData);
        setSaveComboToUpdate(data);
    }

    const handleRefresh = () => {
        setRefresh(true);
    }

    useEffect(() => {
        getAllCombo(1);
    }, []);



    return (
        <div>
            <Container className='' >
                <FilterCombo
                    listCombos={combos.content}
                    afterFilter={handleFilter}
                    refresh={handleRefresh}
                ></FilterCombo>
                {(isAuth === true && tokenRes.user.role === "ADMIN") && (
                    <ModalRequest
                        afterAdd={handleAffterAdd}
                        comboData={saveComboToUpdate}
                        resfresh={refresh}
                        setRefresh={() => setRefresh(false)}
                    ></ModalRequest>
                )}

                <Row xs={1} md={3} className="g-sm-4 border mt-3 ms-0 me-0 hanlde-1236 ">
                    {filteredCombo &&
                        filteredCombo.length > 0 &&
                        filteredCombo.map((item, index) => (
                            <Col key={"combo" + index} >
                                {item.id !== null ? (
                                    <Combo
                                        id={item.id}
                                        name={item.name}
                                        code= {item.code}
                                        price={formatPrice(item.price)}
                                        usd = {formatPriceUSD((item.price))}
                                        imgUrl={() => getAllBase64Image(item.id)}
                                        description={item.description}
                                        menuIds={item.menus}
                                        totalStarInTotalUser = {item.totalStarInTotalUser}
                                        comboData={hanldeSaveDataToUpdate}
                                        comboList={filteredCombo}
                                        data={handleAffterDelete}
                                        loadData ={handleAffterAdd}
                                    />
                                ) : null}
                            </Col>
                        ))}
                </Row>
            </Container>
            <ReactPaginate
                className='d-flex justify-content-center mt-3 list-unstyled'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />

        </div>
    );
};

export default ListCombos;
