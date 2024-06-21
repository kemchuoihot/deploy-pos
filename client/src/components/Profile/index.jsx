import "./styles.css";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faSkype } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Profile = () => {
    const navigte = useNavigate();

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("")


    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("account"));
        setName(account.name);
        setRole(account.role);
        setEmail(account.email);
        setUsername(account.username);
    }, []);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChangePasswordClick = () => {
        setShowNewPasswordModal(true);
    };
    const handleChangePasswordCloseModal = () => {
        setShowNewPasswordModal(false);
        setMessage("");
    };

    const handleSaveChanges = () => {
        const updatedAccount = {
            name: name,
            role: role,
            email: email,
            username: username
        };
        localStorage.setItem("account", JSON.stringify(updatedAccount));
        setShowModal(false);
    };
    const changePass = async () => {
        try {
            const response = await axios.post('http://localhost:5000/changePass', { user:username,newPassword })
            .then
            (result =>{
                if(result.data.Status){
                    setMessage("Password changed successfully");
                    setTimeout(() => {
                        handleChangePasswordCloseModal()
                    }, 1000);
                    
                }else{
                    alert(result.data.message);
                }
            }
            ).catch(error =>{ console.log(error)});
            
        } catch (error) {
            console.error(error);
            // Handle error message or redirect to an error page
        }
    }

    return (
        <div>
            <section class="vh-50 min-vh-100">
                {/* <h1 className='title'>Profile</h1> */}
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-4 mt-3">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="mt-3 mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                            className="rounded-circle img-fluid" />
                                    </div>
                                    <h4 className="mb-2">{name}</h4>
                                    <p className="text-muted mb-4">@{role} <span className="mx-2">|</span> <a
                                        href="#!">{email}</a></p>
                                    <div className="mb-4 pb-2">
                                        <button type="button" className="btn m-2 btn-outline-primary btn-floating">
                                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                                        </button>
                                        <button type="button" className="btn m-2 btn-outline-primary btn-floating">
                                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                                        </button>
                                        <button type="button" className="btn m-2 btn-outline-primary btn-floating">
                                            <FontAwesomeIcon icon={faSkype} size="lg" />
                                        </button>
                                    </div>
                                    <button type="button" className="btn btn-primary btn-rounded btn-green btn-lg" onClick={handleEditClick}>
                                        Edit infor.
                                    </button>

                                    <button type="button" className="mt-3 btn btn-outline-secondary" onClick={handleChangePasswordClick}>
                                        Change Password!
                                    </button>
                                    <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                        <div>
                                            <p className="mb-2 h5">8471</p>
                                            <p className="text-muted mb-0">Wallets Balance</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-2 h5">8512</p>
                                            <p className="text-muted mb-0">Income amounts</p>
                                        </div>
                                        <div>
                                            <p className="mb-2 h5">4751</p>
                                            <p className="text-muted mb-0">Total Transactions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal className="pt-3" show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name:</label>
                    <input type="text" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Role:</label>
                    <input type="text" className="form-control mb-3" value={role} onChange={(e) => setRole(e.target.value)} />

                    <label>Email:</label>
                    <input type="text" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal className="pt-3" show={showNewPasswordModal} onHide={handleChangePasswordCloseModal}>
                <Modal.Header>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>New Password:</label>
                    <input type="password" className="form-control mb-3" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    {message && <div className="alert alert-success">{message}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleChangePasswordCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={changePass}>
                        Save Password
                    </button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
};
export default Profile;
