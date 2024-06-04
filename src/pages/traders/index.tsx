import { Box } from "@mui/system";
import { useTraderStore } from "../../store/traders/traders";
import { Link } from "react-router-dom";

function Traders() {
  const { traders } = useTraderStore();

  return (
    <Box>
      <h3>Traders</h3>
      <p>(This is under development, clearly)</p>
      <Link to={"create"}>Create</Link>
      {traders.length ? (
        <ul>
          {traders.map((trader, i) => (
            <li key={trader.id + i}>
              {trader.name} <br />
              <small>
                <i>{trader.description}</i>
              </small>
              {/* <button
                onClick={() => {
                  const confirmation = confirm(
                    "Are you sure you want to delete this trader?"
                  );
                  if (confirmation) alert("Not implemented deletion yet"); //await onDelete(trader.id)
                }}
              >
                Delete Trader
              </button> */}
            </li>
          ))}
        </ul>
      ) : (
        "No traders yet"
      )}
    </Box>
  );
}

export default Traders;
