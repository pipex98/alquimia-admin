import { useEffect, useMemo, useState } from "react";
import FeaturedInfo from "../ui/featuredInfo/FeaturedInfo";
import WidgetSm from "../ui/widgetSm/WidgetSm";
import WidgetLg from "../ui/widgetLg/WidgetLg";
import Chart from "../ui/chart/Chart";
import { privateRequest } from "../../helpers/requestMethods";
import "./home.css";

export default function HomeScreen() {

  const [userStats, setUserStats] = useState([]);

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
        const res = await privateRequest.get('/users/stats');
        res.data.map(item => (
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[item._id - 1], "Usuario activo": item.total},
          ])
        ))
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="Análisis de usuario" grid dataKey="Usuario activo"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
