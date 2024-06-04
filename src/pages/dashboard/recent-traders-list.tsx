import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { DeepTrader } from "TraderTypes";

const RecentTradersList: React.FC<{ traders: DeepTrader[] }> = ({
  traders,
}: {
  traders: DeepTrader[];
}) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recent Traders
      </Typography>
      {traders.length ? (
        <List>
          {traders.map((trader, i) => (
            <ListItem
              key={i}
              component={Link}
              to={`/traders/${trader.id.toString()}`}
            >
              <ListItemText
                color="textPrimary"
                primary={trader.name}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No traders available</p>
      )}
    </div>
  );
};

export default RecentTradersList;
