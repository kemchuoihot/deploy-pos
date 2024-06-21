import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles.css";

import { infinity } from 'ldrs'

infinity.register()

// Default values shown


const Employee = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [block, setBlock] = useState([]);
    const [blockModal, setBlockModal] = useState("");
    const [status, setStatus] = useState("");
    const [emailResent, setEmailResent] = useState("");
    const [showModalAdd, setShowModalAdd] = useState(false);
    const handleCloseModalAdd = () => setShowModalAdd(false);
    const handleShowModalAdd = () => setShowModalAdd(true);
    useEffect(() => { 
        fetchData();
    },[]);

    const fetchData = () => {
        axios.get('http://localhost:5000/auth/employee')
        .then(result =>{
            if(result.data.Status){
                setEmployee(result.data.employee);
            }else{
                alert(result.data.Error);
            }
        }).catch(error =>{ console.log(error)});
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/account",{name,email},{headers: {
                'authorization':  `${localStorage.getItem("token")}`,
            }})
            .then((result) => {
                setLoading(false);
                navigte("/dashboard/employee");
            })
            console.log(response);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.response.data.message);
        }
    }

    const handleRefresh = () => {
        setLoading(true);
        fetchData();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    const blockEmployee = () => {
        axios.post('http://localhost:5000/auth/block_employee', {email: block})
        .then(result =>{
            if(result.data.Status){
                fetchData();
                setBlock("")
            }else{
                alert(result.data.message);
            }
        }).catch(error =>{ console.log(error)});
    }
    const resend = (email) => {
        axios.post('http://localhost:5000/auth/newtoken', {email})
        .then(result =>{
            if(result.data.Status){
                fetchData();
            }else{
                alert(result.data.message);
            }
        }).catch(error =>{ console.log(error)})
    };



    return(
        <>
        <div className=" px-5 mt-3">
            <div className="d-flex justify-content-center">
                {/* <h1 className='title'>Employee List</h1> */}
            </div>
            <div className="d-flex justify-content-between">
                {/* <Link to="/dashboard/add_employee" className="btn btn-add">
                    Add Employee
                </Link> */}
                <button className="btn btn-add" onClick={handleShowModalAdd}>
                    Add Employee
                </button>
                {loading ? ( <l-infinity
                    size="55"
                    stroke="4"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3" 
                    color="#4f46e5" 
                    ></l-infinity> )
                    : <button className="btn ml-2 btn-refresh" onClick={handleRefresh}>Refresh</button>}
            </div>
            <div className="mt-3">
                <table className='table table-striped table-bordered table-hover align-middle mb-0 bg-white'>
                    <thead className='text-white bg-head borderd'>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                            <th scope='col'>Block</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        employee.map((e, index) =>(
                            <tr key={index}>
                                <th scope='row' className='idNumber'>{index + 1}</th>
                                <td>{e.name == 'admin'? <strong>{e.name}</strong> : e.name}</td>
                                <td>{e.email}</td>
                                <td>
                                    {e.status === "inactive" && <span className="badge badge-primary rounded-pill d-inline">Inactive</span>}
                                    {e.status === "active" && <span className="badge badge-success rounded-pill d-inline">Active</span>}
                                    {e.status === "block" && <span className="badge badge-danger rounded-pill d-inline">Block</span>}
                                </td>
                                <td>
                                    <Button 
                                        type="button"
                                        className ="btn btn-outline-secondary btn-rounded btn-green btn-sm mr-2"
                                        data-mdb-ripple-color="dark"
                                        onClick={() => { handleShowEdit(); setBlockModal(e.name); setEmailResent(e.email);}}
                                        >
                                    Resend
                                </Button>
                                </td>
                                <td>
                                    {e.status === "inactive" || e.role ==="admin" ? 
                                    <Button 
                                        type="button"
                                        className = ""
                                        size='sm'
                                        data-mdb-ripple-color="dark"
                                        variant="outline-danger"
                                        disabled
                                    >
                                        Lock
                                        
                                    </Button>
                                 :
                                
                                        <Button 
                                            type="button"
                                            className = {e.status === "block" ? "btn btn-outline-secondary btn-rounded btn-blue text-white btn-sm mr-2" : "btn btn-outline-secondary btn-rounded btn-red btn-sm mr-2"}
                                            // className ="btn btn-outline-danger btn-rounded btn-red btn-sm"
                                            data-mdb-ripple-color="dark"
                                            onClick={() => { setStatus(e.status);setBlock(e.email); handleShow(); setBlockModal(e.name); }}
                                        >
                                            {e.status === "active" ? "Lock":"Unlock"}
                                            
                                        </Button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
        <Modal className="pt-3" show={showModalAdd} onHide={handleCloseModalAdd}>
                <Modal.Header>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name:</label>
                    <input type="text" className="form-control mb-3" onChange={(e) => setName(e.target.value)} />
                    <label>Email:</label>
                    <input type="text" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModalAdd}>
                        Close
                    </button>
                    <button className="btn btn-primary"  onClick={handleSubmit}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Block employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to lock/unlock <em>{blockModal}</em>!?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant={status === "block" ? "primary" : "danger"} onClick={() => { handleClose(); blockEmployee(); }}>
                {status === "block" ? "Unlock" : "Lock"}
            </Button>
            </Modal.Footer>
        </Modal>
        
        <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Resend Gmail Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to resend the Gmail login for <em>{blockModal}</em>?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { handleCloseEdit();resend(emailResent)}}>
                    Resend
                </Button>
            </Modal.Footer>
        </Modal>
        
      </>
    )
};
export default Employee;
