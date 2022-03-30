import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Chart from "../../components/ui/chart/Chart"
import { privateRequest } from "../../helpers/requestMethods";
import { productStartUpdate } from "../../actions/product";
import app from '../../firebase/firebase-config';
import "./product.css";

export default function ProductScreen() {

    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split('/')[2];
    const [pStats, setPStats] = useState([]);
    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState({});

    const product = useSelector(state => 
        state.products.products.find((product) => product._id === productId)
    );
    
    const handleChange = (e) => {
        setInputs( prev => {
          return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const StorageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(StorageRef, file);

        uploadTask.on('state_changed', function(snapshot){
        
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('La carga esta ' + progress + '% hecha');
            switch (snapshot.state) {
            case "paused":
                console.log('La carga está pausada');
                break;
            case "running":
                console.log('La carga está corriendo');
                break;
            }
        }, function(error) {
            
        }, function() {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    
                const product = { id: productId, ...inputs, img: downloadURL };
                dispatch(productStartUpdate( product ))
    
            });
        });
    }

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );

      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await privateRequest.get('orders/income?pid=' + productId);
            const list = res.data.income.sort((a, b) => {
                return a._id - b._id
            })
            list.map((item) => (
              setPStats(prev => [
                ...prev,
                {name: MONTHS[item._id - 1], "Sales": item.total},
              ])
            ))
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [MONTHS, productId]);

    return (
        <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Producto</h1>
            <Link to="/newproduct">
            <button className="productAddButton">Crear</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Rendimiento de las ventas"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img 
                    src={ product.img } 
                    alt={ product.img } 
                    className="productInfoImg" />
                    <span className="productName">{ product.title }</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id: </span>
                        <span className="productInfoValue"> { product._id } </span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">ventas:</span>
                        <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">en stock:</span>
                        <span className="productInfoValue">{ (product.inStock) ? 'Si' : 'No' }</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Nombre del producto</label>
                    <input 
                        type="text"
                        name="title" 
                        placeholder={ product.title }
                        onChange={ handleChange } 
                    />
                    <label>Descripcion del producto</label>
                    <input 
                        type="text" 
                        name="desc" 
                        placeholder={ product.desc } 
                        onChange={ handleChange } 
                    />
                    <label>Precio</label>
                    <input 
                        type="text"
                        name="price" 
                        placeholder={ product.price }
                        onChange={ handleChange } 
                    />
                    <label>En Stock</label>
                    <select 
                        name="inStock" 
                        id="idStock"
                        onChange={ handleChange } 
                    >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img 
                        src={ product.img }
                        alt="" 
                        className="productUploadImg" />
                        <label for="file">
                            <Publish/>
                        </label>
                        <input 
                            type="file" 
                            id="file" 
                            style={{display:"none"}}
                            onChange={ e => setFile( e.target.files[0] ) } 
                        />
                    </div>
                    <button 
                        className="productButton"
                        onClick={ handleUpdate }
                    >
                            Actualizar
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}
