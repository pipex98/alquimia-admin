import Topbar from "../components/ui/topbar/Topbar";
import Sidebar from "../components/ui/sidebar/Sidebar";
import HomeScreen from "../components/home/HomeScreen";
import UserListScreen from "../components/userList/UserListScreen";
import UserScreen from "../components/user/UserScreen";
import NewUserScreen from "../components/newUser/NewUserScreen";
import ProductScreen from "../components/product/ProductScreen";
import NewProductScreen from "../components/newProduct/NewProductScreen";
import ProductListScreen from "../components/productList/ProductListScreen";
import { Routes, Route } from "react-router";
import "./App.css";

export const DashboardRoutes = () => {
    return (
        <>
        <Topbar />
            <div className="container">
              <Sidebar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/users" element={ <UserListScreen/> } />
                    <Route path="/user/:userId" element={<UserScreen />} />
                    <Route path="/newUser" element={ <NewUserScreen /> } />
                    <Route path="/products" element={ <ProductListScreen /> } />
                    <Route path="/product/:productId" element={ <ProductScreen /> } />
                    <Route path="/newproduct" element={ <NewProductScreen /> } />
                </Routes>
            </div>
        </>
    )
}
