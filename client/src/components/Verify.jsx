import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Verify = () => {
    const navigte = useNavigate();

    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            handleChangeStatus(token);
        } 
    }, []);

    const handleChangeStatus = async (token) => {
        try {
            const response = await axios.get(`http://localhost:5000/verify/${token}`).catch((err) => {console.log(err);});
            console.log(response.data);
            setResponse(response.data.message);
            setUser(response.data.username);
        } catch (error) {
            console.error(error);
            alert("Token expired");
        }
    };

    const handlePasswordChange = async () => {
        try {
            const response = await axios.post('http://localhost:5000/changePass', { user,newPassword })
            .then
            (result =>{
                if(result.data.Status){
                    alert("Password changed successfully");
                    setTimeout(() => {
                        navigte("/login");
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
    };

    return (
        <div className='m-5'> 
            <h1>{response && response.message}</h1>
            <h3>Change password here!</h3>
            <label  className='row ml-1' for="pass">New password:</label>
            <input className='row ml-1' id="pass" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <small id="passHelp" class="form-text text-muted">You need to change to a new password to start your work!.</small>
            <button className="btn btn-primary mt-4" onClick={handlePasswordChange}>Change Password</button>
        </div>
    );
};

export default Verify;