import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles.css";

const Product = () => {
    const [phones, setPhones] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deleteValue, setDeleteValue] = useState("");
    const [items, setItems] = useState({});
    const [role, setRole] = useState("");

    useEffect(() => { 
        fetchData();
    },[]);

    const fetchData = () => {
        const account = JSON.parse(localStorage.getItem("account"));
        setRole(account.role);
        axios.get('http://localhost:5000/product')
        .then(result =>{
            if(result.data.Status){
                setPhones(result.data.phones);
            }else{
                alert(result.data.Error);
            }
        }).catch(error =>{ console.log(error)});
        localStorage.removeItem('item');
    };

    const deleteProduct = () => {
        axios.post('http://localhost:5000/product/delete', {id: deleteValue})
        .then(result =>{
            
            if(result.data.Status){
                fetchData();
                setDeleteValue("")
            }else{
                alert(result.data.message);
            }
        }
        ).catch(error =>{ console.log(error)});
    };

    // const handleRefresh = () => {
    //     setLoading(true);
    //     fetchData();
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // };
    

    return(
        <>
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                {/* <h1 className='title'>Product List</h1> */}
            </div>
            <div className="d-flex justify-content-between">
                <Link to="/dashboard/add_product" className="btn btn-add">
                    Add Product
                </Link>
                {/* <Link to="/dashboard/add_employee" className="btn btn-info btn-add">
                    Add Employee
                </Link>
                {loading ? ( <l-infinity
                    size="55"
                    stroke="4"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3" 
                    color="#93B1A6" 
                    ></l-infinity> )
                    : <button className="btn text-white ml-2 btn-refresh" onClick={handleRefresh}>Refresh</button>} */}
            </div>
            <div className="mt-3">
                <table className='table table-striped table-hover align-middle mb-0 bg-white'>
                    <thead className='text-white bg-head border'>
                        <tr>
                            <th>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Brand</th>
                            <th scope='col'>Color</th>
                            <th scope='col'>Price (VNĐ)</th>
                            
                            {role === 'admin' && (<th scope='col'>Import Price (VNĐ)</th>)}
                            {role == 'admin' && (<th scope='col'>Action</th>)}
                            
                        </tr>
                    </thead>
                    <tbody>
                    {
                        phones.map((e, index) =>(
                            <tr key={index}>
                                <th scope='row' className='idNumber'>{index + 1}</th>
                                <td> 
                                <img
                                src={e.photo[0]}
                                alt=""
                                style={{ width: "45px", height: "45px", borderRadius: "10%" }}
                                className="mr-3"
                                />
                                {e.name}</td>
                                <td>{e.brand}</td>
                                <td>{e.color}</td>
                                <td>{e.price}đ</td>
                                {role == 'admin' && (<td>{e.import}đ</td>)}
                                
                                {role == 'admin' && (<td>
                                    <Button 
                                        type="button"
                                        className ="btn btn-outline-secondary btn-rounded btn-green btn-sm mr-2"
                                        data-mdb-ripple-color="dark"
                                        >
                                    <Link to="/dashboard/edit_product" className='text-white' onClick={() =>localStorage.setItem('item', JSON.stringify(e))}>Edit</Link>
                                    </Button>
                                    <Button 
                                        type="button"
                                        className ="btn btn-outline-danger btn-rounded btn-red btn-sm mr-2"
                                        data-mdb-ripple-color="dark"
                                        onClick={() => { handleShow(); setDeleteValue(e._id);}}
                                        >
                                    Delete
                                    </Button>
                                </td>)}
                                
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Block employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete this product !?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={() => { handleClose();deleteProduct() }}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>


        </>
    )
};
export default Product;
