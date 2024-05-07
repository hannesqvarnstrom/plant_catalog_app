import React from "react";
import { usePlantStore } from "../../store/plants";
import { Container } from "@mui/system";
import { /*redirect,*/ useNavigate } from "react-router";
import { useTraderStore } from "../../store/traders/traders";

/**
 * Plant Creation Form Component (break into file)
 */

interface PlantCreationFormData {
  name: string;
  from?: string;
  type?: string;
}

function PlantCreationForm() {
  const navigate = useNavigate();
  const { traders } = useTraderStore();
  const { add } = usePlantStore();
  const [formData, setFormData] = React.useState<PlantCreationFormData>({
    name: "",
    from: "",
    type: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("{ name, value }:", { name, value });
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await add(formData);
    return navigate(-1);
  }

  return (
    <Container>
      <button onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleSubmit}>
        <h4>Create a new plant</h4>
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
          From (trader):
          {traders.length ? (
            <select name="from" onChange={handleInputChange}>
              {/* @todo implement this */}
              {/* <option key={"unknown trader"} value={user.id}>
                Me
              </option> */}
              <option key={"unknown trader"} value="">
                Unknown
              </option>
              {traders.map((trader, i) => (
                <option key={trader.name + i} value={trader.id}>
                  {trader.name}
                </option>
              ))}
            </select>
          ) : (
            <small>No traders added yet</small>
          )}
          {/* <input type="text" name="from" value={formData.from} onChange={handleInputChange} /> */}
        </label>
        <br />
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default PlantCreationForm;
