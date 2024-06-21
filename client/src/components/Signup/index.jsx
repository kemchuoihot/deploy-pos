import { useState } from 'react';
import styles from "./styles.module.css";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/account",{name,email,password});
            console.log(response);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome to POS!</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>Sign up</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} value={name} required className={styles.input} />
                        <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required className={styles.input} />
                        <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required className={styles.input} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn} onClick={(e)=> handleSubmit(e)}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;