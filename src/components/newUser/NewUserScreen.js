import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import app from '../../firebase/firebase-config'
import "./newUser.css";
import { userAddStartNew } from "../../actions/user";

export default function NewUser() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs( prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  
  const handleCreate = ( e ) => {
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

        const user = { ...inputs, img: downloadURL };
        dispatch(userAddStartNew( user ))

      });
    });
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo usuario</h1>
      <form className="newUserForm" autoComplete="off">
        <div className="newUserItem">
          <label>Imagen</label>
          <input type="file" 
            id="file"
            onChange={ e => setFile( e.target.files[0] ) } 
          />
        </div>
        <div className="newUserItem">
          <label>Nombre de usuario</label>
          <input type="text" 
            placeholder="john"
            name="username"
            onChange={ handleChange } 
          />
        </div>
        <div className="newUserItem">
          <label>Nombre</label>
          <input type="text" 
            placeholder="John"
            name="name"
            onChange={ handleChange } 
          />
        </div>
        <div className="newUserItem">
          <label>Apellido</label>
          <input type="text" 
            placeholder="Smith"
            name="lastname"
            onChange={ handleChange } 
          />
        </div>
        <div className="newUserItem">
          <label>Correo Electronico</label>
          <input 
            type="email" 
            name="email"
            placeholder="john@gmail.com"
            onChange={ handleChange } 
          />
        </div>
        <div className="newUserItem">
          <label>Contraseña</label>
          <input type="password"
            name="password" 
            placeholder="Ingrese una contraseña"
            onChange={ handleChange } 
          />
        </div>
        <div className="newUserItem">
          <label>Es Admin</label>
          <select className="newUserSelect" 
            name="isAdmin" 
            id="isAdmin"
            onChange={ handleChange } 
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton"
          onClick={ handleCreate }
          >
            Crear
        </button>
      </form>
    </div>
  );
}
