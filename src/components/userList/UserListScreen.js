import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userDeleting, userStartLoading } from "../../actions/user";
import "./userList.css";

export default function UserListScreen() {

  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( userStartLoading() );
  }, [dispatch])

  const handleDelete = (id) => {
    userDeleting(id);
  };
  
  const columns = [
    { field: "_id", headerName: "#", width: 220 },
    {
      field: "user",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={ params.row.img 
              || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              } 
              alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Acción",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
