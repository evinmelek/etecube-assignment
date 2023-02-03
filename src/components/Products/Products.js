import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import EditProduct from "./EditProduct";

const Products = () => {
    const usenavigate = useNavigate();
    const [productlist, listupdate] = useState(null);
    const[displayusername,displayusernameupdate]=useState('');
    
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }else{
            displayusernameupdate(username);
        }

        let jwttoken = sessionStorage.getItem('jwttoken');
        fetch("http://localhost:3000/products/", {
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
            <h1 className="text-center">Products Page</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Product Category</td>
                        <td>Product Amount</td>
                        <td>Amount Unit</td>
                        <td>Product Company</td>
                    </tr>
                </thead>
                <tbody>
                    {productlist &&
                        productlist.map(item => (
                            <tr key={item.id} onClick={() => handleRowClick(item)}>
                                <td><input  type="checkbox"/>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                                <td>{item.amountUnit}</td>
                                <td>{item.company}</td>
                            </tr>
                        ))
                    }
                </tbody> 
            </table>
        </div>
    {modalOpen ? <EditProduct data={modalData} closeModal={() => setModalOpen(false)} /> : null}
        </>
    );
}

export default Products;