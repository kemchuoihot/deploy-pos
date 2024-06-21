import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./addEmployee.css"
import { waveform } from 'ldrs'

waveform.register()


const add_employee = () =>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigte = useNavigate();

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
    
    return(
        <div className="d-flex justify-content-center align-items-center h-75 mh-">
            <div className="p-3 rounded w-25 border">
                <h2 className="text-center">Add new staff</h2>
                <form className="row g-1">
                    <div className="col-12 mt-3">
                        <label htmlFor="nameEmployee">Full Name</label>
                        <input type="text" id="nameEmployee" name='fullname' placeholder="Enter name" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required/>
                    </div>
                    <div className="col-12 mt-3 mb-3">
                        <label htmlFor="emailEmployee">Email</label>
                        <input type="email" id="emailEmployee" name='email' placeholder="Enter email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    </div>
                    {error && <div className="alert alert-danger text-center m-auto col-11">{error}</div>}
                    <div className="col-12 mt-3 d-flex justify-content-center" onClick={(e)=> handleSubmit(e)}>
                    {loading ? (<l-waveform
                        size="25"
                        stroke="2.5"
                        speed="1" 
                        color="#007bff" 
                        ></l-waveform>) :<button className="btn btn-info w-100 mt-2" type='submit'>Add</button>}
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default add_employee;