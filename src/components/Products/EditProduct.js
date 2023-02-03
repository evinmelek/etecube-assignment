import { useFormik } from 'formik'; 
import 'bootstrap/dist/css/bootstrap.min.css';
const EditProduct = ({ handleCloseEditProduct },props) => {
   
 { 
    const { handleSubmit, handleChange, values} = useFormik({
        initialValues: {
          name: '',
          category: '',
          amount: '', 
          amountUnit: '',
          company: ''
        },
        onSubmit: (values) => {
          console.log(values); 
        },
      });

    return (
        <div className="modal-container">
        <h4 className='modal-title'>Edit Product</h4>
          <form className='modal-form'> 
            <label>Product Name:</label>
            <input className='modal-input'  value={values.name} name='name' type='text' maxLength={24}/> 
            <label>Project Category:</label>
            <input className='modal-input' value={values.category} name='category' type='text'  maxLength={11}/> 
            <label>Product Amount:</label>
            <input className='modal-input' value={values.amount} name='amount' type='text' maxLength={56}/> 
            <label>Amount Unit:</label>
            <input className='modal-input' value={values.amountUnit} name='amountUnit' type='text' maxLength={56}/> 
            <label>Product Company:</label>
            <input className='modal-input' value={values.company} name='company' type='text' maxLength={56}/> 
            <br/>

              <button className="modal-close-button" onClick={handleCloseEditProduct}>close</button> 
              <button type='submit' className='btn btn-primary'>Update</button>
          </form> 
    </div>
      );
    }; }

    export default EditProduct;