import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userStartUpdate } from "../../actions/user";
import app from '../../firebase/firebase-config';
import "./user.css";

export default function UserScreen() {

  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const user = useSelector(state => 
    state.users.users.find((user) => user._id === userId )  
  )

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

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

        const user = { id: userId, ...inputs, img: downloadURL };
        dispatch(userStartUpdate( user ))

      });
    });
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Usuario</h1>
        <Link to="/newUser">
          <button className="userAddButton">Crear</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={ user.img || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif' }
              alt={ user.img }
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{ `${ user.name } ${user.lastname}` }</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{ `${ user.username }` }</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Es admin: { (user.isAdmin) ? 'Si' : 'No'  }</span>
            </div>
            <span className="userShowTitle">Detalles de contacto</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ user.email }</span>
            </div>
            <span className="userShowTitle">Fechas de cambio</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Creado en: { user.createdAt } </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Actualizado en: { user.updatedAt } </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form className="userUpdateForm" autoComplete="off">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  name="username"
                  placeholder={ user.username }
                  className="userUpdateInput"
                  onChange={ handleChange }
                />
              </div>
              <div className="userUpdateItem">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  placeholder={ user.name }
                  className="userUpdateInput"
                  onChange={ handleChange }
                />
              </div>
              <div className="userUpdateItem">
                <label>Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder={ user.lastname }
                  className="userUpdateInput"
                  onChange={ handleChange }
                />
              </div>
              <div className="userUpdateItem">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder={ user.email }
                  className="userUpdateInput"
                  onChange={ handleChange }
                />
              </div>
              <div className="userUpdateItem">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder={ user.password }
                  className="userUpdateInput"
                  onChange={ handleChange }
                />
              </div>
              <div className="userUpdateItem">
                <label>Es Admin</label>
                  <select 
                    name="isAdmin" 
                    id="isAdmin"
                    onChange={ handleChange }
                  >
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={ user.img || 
                    'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                  }
                  alt={ user.img }
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" 
                  id="file" 
                  style={{ display: "none" }}
                  onChange={ e => setFile( e.target.files[0] ) } 
                />
              </div>
              <button 
                className="userUpdateButton"
                onClick={ handleUpdate }
                >
                  Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
