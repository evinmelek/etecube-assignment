import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import EditCompany from "./EditCompany";

const Companies = () => {
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
        }).then((resp) => {
            listupdate(resp);
        }).catch((err) => {
            console.log(err.messsage)
        });

    }, []);

      
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
  
    const handleRowClick = data => {
      setModalOpen(true);
      setModalData(data);
    }

    return (
        <>
        <div>
            <div className="header">
                <Link to={'/'} className="navlink">Home</Link>
                <span style={{marginLeft:'80%'}}>User <b>{displayusername}</b></span>
                <Link style={{ float: 'right' }} to={'/login'} className="navlink">Logout</Link>
            </div>
            <h1 className="text-center">Companies Page</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Company Name</td>
                        <td>Company Legal Number</td>
                        <td>Incorporation Country</td>
                        <td>Website</td>
                    </tr>
                </thead>
                <tbody>
                    {companylist &&
                        companylist.map(item => ( 
                            <tr key={item.id} onClick={() => handleRowClick(item)}> 
                                <td><input  type="checkbox"/>{item.name}</td>
                                <td>{item.legalNumber}</td>
                                <td>{item.incorporationCountry}</td>
                                <td>{item.website}</td>
                            </tr>

                        ))
                    }
                </tbody> 
            </table>
        </div>
       {modalOpen ? <EditCompany data={modalData} closeModal={() => setModalOpen(false)} /> : null}
        </>
    );
}

export default Companies;