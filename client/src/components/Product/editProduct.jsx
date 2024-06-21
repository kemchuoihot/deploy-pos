import { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { waveform } from 'ldrs'


waveform.register()


const editProduct = () =>{
    const [id,setID] = useState("");
    const [name,setName] = useState("");
    const [barcode,setBarcode] = useState("");
    const [brand,setBrand] = useState("");
    const [color,setColor] = useState("");
    const [price,setPrice] = useState("");
    const [photos,setPhotos] = useState("");
    const [desc,setDesc] = useState("");
    const [status,setStatus] = useState(""); 
    const [importPrice,setImportPrice] = useState("");

    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigte = useNavigate();
    
    const getInfo = () => {
        try {    
            const data = JSON.parse(localStorage.getItem('item'));
            setID(data._id);
            setName(data.name);
            setBarcode(data.barcode);
            setBrand(data.brand);
            setColor(data.color);
            setPrice(data.price);
            setPhotos(data.photo[0]);
            setDesc(data.desc);
            setStatus(data.status);
            setImportPrice(data.import);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { 
        getInfo();
    },[]);
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/product/edit",{id,name,barcode,brand,color,price,photos,desc,status,importPrice})
            .then((result) => {
                setLoading(false);
                navigte("/dashboard/product");
            })
            console.log(response);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.response.data.message);
        }
    }
    
    return(
        <div className="d-flex justify-content-center align-items-center h-95">
            <div className="p-3 rounded w-25 border">
                <h2 className="text-center">Edit product</h2>
                <form className="row g-1">
                    <div className="col-12 mt-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter name" className="form-control" onChange={(e) => setName(e.target.value)} value={name} required/>
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="barcode">Barcode</label>
                        <input type="text" id="barcode" placeholder="Enter barcode" className="form-control" onChange={(e) => setBarcode(e.target.value)} value={barcode} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand"  placeholder="Enter brand" className="form-control" onChange={(e) => setBrand(e.target.value)} value={brand} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="color">Color</label>
                        <input type="text" id="color"  placeholder="Enter color" className="form-control" onChange={(e) => setColor(e.target.value)} value={color} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price"  placeholder="Enter price" className="form-control" onChange={(e) => setPrice(e.target.value)} value={price} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="photos">Photo's link</label>
                        <input type="text" id="photos"  placeholder="Enter photos link" className="form-control" onChange={(e) => setPhotos(e.target.value)} value={photos} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc"  placeholder="Enter Description" className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status"  placeholder="Enter status" className="form-control" onChange={(e) => setStatus(e.target.value)} value={status} required/>
                    </div>
                    <div className="col-12 mt-3 ">
                        <label htmlFor="import">Import Price</label>
                        <input type="number" id="import"  placeholder="Enter status" className="form-control" onChange={(e) => setImportPrice(e.target.value)} value={importPrice} required/>
                    </div>
                    {error && <div className="alert alert-danger text-center m-auto col-11">{error}</div>}
                    <div className="col-12 mt-3 d-flex justify-content-center" onClick={(e)=> handleSubmit(e)}>
                    {loading ? (<l-waveform
                        size="25"
                        stroke="2.5"
                        speed="1" 
                        color="#007bff" 
                        ></l-waveform>) :<button className="btn btn-info w-100 mt-2" type='submit'>Update</button>}
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default editProduct;