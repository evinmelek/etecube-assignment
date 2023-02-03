import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]); 

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) { 
            let inputobj={"username": username,
            "password": password};
            fetch("http://localhost:3000/users/",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    console.error('Login failed, invalid credentials');
                }else{
                     console.log('Success');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                } 
            }).catch((err) => {
                alert('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            alert('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            alert('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body"> 
                                <label>User Name</label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>  
                                <label>Password</label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input> 
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary m-4">Login</button> 
                            <Link className="btn btn-success" to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;