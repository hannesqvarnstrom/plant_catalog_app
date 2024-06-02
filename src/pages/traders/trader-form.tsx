/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { TraderCreationArgs } from "TraderTypes";
import { useTraderStore } from "../../store/traders/traders";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

/**
 * Trader Creation Form Comopnent (break into file)
 */
function TraderCreationForm() {
  const [formData, setFormData] = React.useState<TraderCreationArgs>({
    name: "",
    location: "",
  });
  const traderStore = useTraderStore();
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    console.log("event:", event);
    await traderStore.add(formData);
    return navigate("/");
  }

  return (
    <Container>
      <Button onClick={() => navigate(-1)}> Back</Button>
      <form onSubmit={handleSubmit}>
        <h4>Create a new trader</h4>
        <Grid2 container spacing={2} display="flex">
          <Grid2
            md={4}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControl component="fieldset" variant="outlined">
              <FormGroup>
                <TextField
                  required={true}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  label="Name:"
                />
              </FormGroup>
            </FormControl>
          </Grid2>
          <Grid2
            md={4}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControl component="fieldset" variant="outlined">
              <FormGroup>
                <TextField
                  required={false}
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  label="Location:"
                />
              </FormGroup>
            </FormControl>
          </Grid2>
        </Grid2>
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default TraderCreationForm;
