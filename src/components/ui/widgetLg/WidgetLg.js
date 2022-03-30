import { useEffect, useState } from "react";
import { privateRequest } from "../../../helpers/requestMethods";
import { format } from 'timeago.js'
import "./widgetLg.css";

export default function WidgetLg() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const getOrders = async () => {

      try {
        const res = await privateRequest('orders');
        setOrders(res.data.orders);

      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Últimas transacciones</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Cliente</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Monto</th>
          <th className="widgetLgTh">Estado</th>
        </tr>
        { orders.map((order) => (
          <tr className="widgetLgTr" key={ order._id }>
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
              />
            <span className="widgetLgName">{ order.userId }</span>
          </td>
          <td className="widgetLgDate">{ format(order.createdAt) }</td>
          <td className="widgetLgAmount">${ order.amount }</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
      ))}
      </table>
    </div>
  );
}
