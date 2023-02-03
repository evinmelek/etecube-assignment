import { useFormik } from 'formik'; 
import 'bootstrap/dist/css/bootstrap.min.css';
const EditCompany = ({ handleCloseEditCompany },props) => {
   
 { 
    const { handleSubmit, handleChange, values} = useFormik({
        initialValues: {
          name: '',
          legalNumber: '',
          incorporationCountry: '', 
          website: ''
        },
        onSubmit: (values) => {
          console.log(values); 
        },
      });

    return (
        <div className="modal-container">
        <h4 className='modal-title'>Edit Company</h4>
          <form className='modal-form'> 
            <label>Company Name:</label>
            <input className='modal-input'  value={values.name} name='name' type='text' maxLength={56}/> 
            <label>Company Legal Number:</label>
            <input className='modal-input' value={values.legalNumber} name='legalNumber' type='number'  maxLength={11}/> 
            <label>Incorporation Country:</label>
            <input className='modal-input' value={values.incorporationCountry} name='incorporationCountry' type='text' maxLength={56}/> 
            <label>Website:</label>
            <input className='modal-input' value={values.website} name='website' type='text' maxLength={56}/>  
            <br/>

              <button className="modal-close-button" onClick={handleCloseEditCompany}>close</button> 
              <button type='submit' className='btn btn-primary'>Update</button>
          </form> 
        </div>
      );
    }; }

    export default EditCompany;