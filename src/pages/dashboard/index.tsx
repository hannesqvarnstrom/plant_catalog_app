import {
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { usePlantStore } from "../../store/plants";
// import { useTraderStore } from "../../store/traders/traders";
import RecentPlantsList from "./recent-plants-list";
// import RecentTradersList from "./recent-traders-list";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Add,
  LocalFloristOutlined,
  PeopleAltOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeepPlant } from "Plants";
import SectionDivider from "../../components/section-divider";

const Dashboard: React.FC = () => {
  const { plants, getMostRecentPlants } = usePlantStore();
  const [recentPlants, setRecentPlants] = useState<DeepPlant[]>([]);
  // const { traders } = useTraderStore();
  // const [recentTraders, setRecentTraders] = useState<DeepTrader[]>([]);
  useEffect(() => {
    setRecentPlants(getMostRecentPlants());
  }, [plants]);

  // const { traders } = useTraderStore();

  const actions = [
    // { text: "Dashboard", icon: <Home />, path: "/dashboard" },
    { text: "Create Plant", icon: <Add />, path: "/plants/create" },
    { text: "Plants", icon: <LocalFloristOutlined />, path: "/plants" },
    {
      text: "Create Trader",
      icon: <Person2Outlined />,
      path: "/traders/create",
    },
    { text: "Traders", icon: <PeopleAltOutlined />, path: "/traders" },
  ];
  return (
    <Container sx={{ padding: "0" }}>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Grid2 container spacing={2}>
        {actions.map((action, index) => (
          <Grid2 xs={6} sm={3} key={index}>
            <Card>
              <Link to={action.path}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <IconButton color="primary" size="large">
                    {action.icon}
                  </IconButton>
                  <Typography variant="h6" color="textPrimary">
                    {action.text}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <SectionDivider />
      <RecentPlantsList plants={recentPlants} />
      {/* <RecentTradersList traders={traders} /> */}
    </Container>
  );
};

export default Dashboard;
