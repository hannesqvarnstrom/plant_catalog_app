import React from "react";
import { TraderCreationArgs } from "TraderTypes";
import { useTraderStore } from "../../store/traders/traders";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
import { Button } from "@mui/material";

/**
 * Trader Creation Form Comopnent (break into file)
 */
function TraderCreationForm() {
  const [formData, setFormData] = React.useState<TraderCreationArgs>({
    name: "",
    description: "",
    location: "",
  });
  const traderStore = useTraderStore();
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await traderStore.add(formData);
    return navigate(-1);
  }

  return (
    <Container>
      <Button onClick={() => navigate(-1)}> Back</Button>
      <form onSubmit={void handleSubmit}>
        <h4>Create a new trader</h4>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          From:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default TraderCreationForm;
