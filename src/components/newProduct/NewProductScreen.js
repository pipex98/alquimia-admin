import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { useDispatch } from "react-redux";
import app from '../../firebase/firebase-config'
import { productAddStartNew } from "../../actions/product";
import "./newProduct.css";

export default function NewProductScreen() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs( prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(','));
  }

  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  }

  const handleCreate = (e) => {
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

        const product = { ...inputs, img: downloadURL, categories: cat, sizes: size };
        dispatch(productAddStartNew( product ))

      });
    });
  }
  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Producto</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Imagen</label>
          <input 
            type="file" 
            id="file" 
            onChange={ e => setFile( e.target.files[0] ) } 
          />
        </div>
        <div className="addProductItem">
          <label>Titulo</label>
          <input 
            type="text"
            name="title" 
            placeholder="Abrigo de cuero" 
            onChange={ handleChange } 
          />
        </div>
        <div className="addProductItem">
          <label>Descripción</label>
          <input 
            type="text"
            name="desc"
            placeholder="Descripcion..." 
            onChange={ handleChange } 
          />
        </div>
        <div className="addProductItem">
          <label>Precio</label>
          <input 
            type="number"
            name="price" 
            placeholder="100000" 
            onChange={ handleChange } 
          />
        </div>
        <div className="addProductItem">
          <label>Categorias</label>
          <input 
            type="text" 
            placeholder="pantalones, faldas" 
            onChange={ handleCat } 
          />
        </div>
        <div className="addProductItem">
          <label>Tamaños</label>
          <input 
            type="text" 
            placeholder="X, L, XS" 
            onChange={ handleSize } 
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={ handleChange }>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <button 
          onClick={ handleCreate }
          className="addProductButton">Crear</button>
      </form>
    </div>
  );
}
