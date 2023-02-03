import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css"

const Home = () => {
    const usenavigate = useNavigate();
    const [companylist, listupdate] = useState(null);
    const[displayusername,displayusernameupdate]=useState('');
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }else{
            displayusernameupdate(username);
        }

        let jwttoken = sessionStorage.getItem('jwttoken');
        fetch("http://localhost:3000/companies/", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) =>  {
            resp = resp.slice(-3)
            listupdate(resp);
        }).catch((err) => {
            console.log(err.messsage)
        });

    }, []);

    return (
        <div>
            <div className="header">
                <Link to={'/'} className="navlink">Home</Link>
                <Link to={'/companies'} className="navlink">Companies</Link>
                <Link to={'/products'} className="navlink">Products</Link>
                <Link style={{ float: 'right' }} to={'/login'} className="navlink">Logout</Link>
            </div>
            <h2 className="text-center">Welcome <b>{displayusername}</b></h2>
            <table className="table table-bordered">  
                        <h2>Last Added Companies</h2>  
                    {companylist &&
                        companylist.map(item => (
                            <ul key={item}>
                              <li>{item.name}</li>  
                            </ul>

                        ))
                    } 
            </table>
        </div>
    );
}

export default Home;