import { StatsPanel } from "../StatsPanel/StatsPanel";
import styles from "./Dashboard.module.css";
import { RecentActivity } from "../RecentActivity/RecentActivity";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Ticket } from "../../../tickets/types/ticket.types";

export function Dashboard() {
  // 🔴 TODO:
  // 1. Fetch GET /stats and GET /stats/recent with axios (base URL: http://localhost:4000/api)
  // 2. Display the stats and recent activity data (pass them to StatsPanel and RecentActivity)
  // 3. Handle loading and error states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState<Ticket[]>([]);

  useEffect(() => {

    const fetchData = async() => {
      try{
        const statsResponse = await axios.get("http://localhost:4000/api/stats");
        // console.log("statsResponse", statsResponse.data);
        const recentResponse = await axios.get("http://localhost:4000/api/stats/recent");
        // console.log("recent", recentResponse.data);

        setStats(statsResponse.data.data);
        setRecent(recentResponse.data.data);
      } catch(error){
        setError("Failed to fetch dashboard data");
      } finally{
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if(loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>{error}</div>;
  }
  

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {stats && <StatsPanel stats={stats} />}
      <RecentActivity tickets={recent} />
    </div>
  );
}
