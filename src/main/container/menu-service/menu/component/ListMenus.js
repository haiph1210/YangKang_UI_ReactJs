import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from '../entity/Menu';
import { findAll, loadListImages } from '../service/MenuService';
import FilterMenu from '../filter/SearchMenu';
import ModalRequest from '../modal/ModalRequest';
import ReactPaginate from 'react-paginate';
const ListMenus = () => {
    // const URL_LOAD_IMAGE_TOBASE64 = "http://localhost:8000/api/menu/fileName/"
    const [menus, setMenus] = useState([]);
    const [totalPage, setTotalPage] = useState("");
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [saveMenuToUpdate, setSaveMenuToUpdate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const getAllMenus = async (page) => {
        const res = await findAll(page);
        if (res && res.responseData && res.responseData.content) {
            setMenus(res.responseData);
            setFilteredMenus(res.responseData.content);
            setTotalPage(res.responseData.totalPages);
        }

    };

    const handlePageClick = (event) => {
        getAllMenus(+event.selected + 1)
    }

    const getAllBase64Image = async (id) => {
        const res = await loadListImages(id);
        if (res) {
            const bodies = res.map((item) => item.body);
            return bodies;
        } else {
            return "1";
        }
    };


    const handleFilter = (filter) => {
        const updatedFilteredMenus = filter;
        setFilteredMenus(updatedFilteredMenus);
    }

    const handleAffterAdd = () => {
        getAllMenus();
    }

    const handleAffterDelete = (datas) => {
        const data = datas;
        setFilteredMenus(data);
    }
    const hanldeSaveDataToUpdate = (menuData) => {
        const data = menuData;
        setSaveMenuToUpdate(data);
    }

    const handleRefresh = () => {
        setRefresh(true);
    }

    useEffect(() => {
        getAllMenus(1);
    }, []);



    return (
        <div>
            <Container className='' >
                <FilterMenu
                    listMenus={menus.content}
                    afterFilter={handleFilter}
                    refresh={handleRefresh}
                ></FilterMenu>
                <ModalRequest
                    afterAdd={handleAffterAdd}
                    menuData={saveMenuToUpdate}
                    resfresh={refresh}
                    setRefresh={() => setRefresh(false)}
                ></ModalRequest>
                    <Row xs={1} md={3} className="g-sm-4 border mt-3 ms-0 me-0 hanlde-1236 ">
                        {filteredMenus &&
                            filteredMenus.length > 0 &&
                            filteredMenus.map((item, index) => (

                                <Col key={"Menu" + index} >
                                    {item.id !== null ? (
                                        <Menu
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            imgUrl={() => getAllBase64Image(item.id)}
                                            description={item.description}
                                            menuData={hanldeSaveDataToUpdate}
                                            menuList={menus.content}
                                            data={handleAffterDelete}
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

export default ListMenus;
