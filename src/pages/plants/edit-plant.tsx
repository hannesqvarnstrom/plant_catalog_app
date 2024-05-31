/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { usePlantStore } from "../../store/plants";
import { Container } from "@mui/system";
import { /*redirect,*/ useNavigate } from "react-router";
import { useTraderStore } from "../../store/traders/traders";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import CreatePlantInputGroup from "../../components/forms/create-plant-input-group";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PlantCreationFormData, PlantNameFields } from "./plant-form";
import { DeepPlant } from "Plants";
import PlantModel from "./plant-model";

export type PlantEditProps = DeepPlant & { closeEdit: () => void };
// export interface PlantEditProps extends DeepPlant {}

/**
 * Plant Edit Form Component (break into file)
 */
function PlantEditForm({ name, fontSize, id, closeEdit }: PlantEditProps) {
  /**
   * 1. get plant current data (1. route parameter -> 2. get from store by id?)
   * 2. make reverse mapper to populate current data (or just hardcode)
   * 3. use some update-endpoint (PUT /plants/:plantId (not made yet))
   *
   * 4. perhaps place this INSIDE the view-plant component, so you can see the results in the pdf-preview
   */
  const navigate = useNavigate();
  const { traders } = useTraderStore();
  const { update } = usePlantStore();

  const [nameState, setNameState] = React.useState<PlantNameFields>({
    genusName: name.genusName,
    speciesName: name.speciesName,
    varietyName: name.varietyName,
    name1aSpecies: name.name1a?.species,
    name1aName: name.name1a?.name,
    name1bSpecies: name.name1b?.species,
    name1bName: name.name1b?.name,
    name2aSpecies: name.name2a?.species,
    name2aName: name.name2a?.name,
    name2bSpecies: name.name2b?.species,
    name2bName: name.name2b?.name,
  });

  const [formData, setFormData] = React.useState<
    Omit<PlantCreationFormData, "name">
  >({
    from: "",
    type: "",
  });

  const [parent1, setParent1] = React.useState<boolean>(!!nameState.name1aName);
  const [grandparents1, setGrandparents1] = React.useState<boolean>(
    !!nameState.name1bName
  );

  const [parent2, setParent2] = React.useState<boolean>(!!nameState.name2aName);
  const [grandparents2, setGrandparents2] = React.useState<boolean>(
    !!nameState.name2bName
  );

  function handleInputChangeCheckBox(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { checked } = event.target;
    const name = event.target.name as keyof PlantNameFields;
    const newValue = checked;

    setNameState((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleInputNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const name = event.target.name as keyof PlantNameFields;

    setNameState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    /**
     * @param actualName The intended name of the parent plant. Can be undefined or empty string
     * @param speciesValue Whether plant parent is species or not. If name is empty, this will not be applied.
     * @returns An object with name and species to their corresponding values, or undefined if a name was not supplied
     */
    const mapNamesToObjects = (
      actualName: string | undefined,
      speciesValue: boolean | undefined
    ): { name: string; species: boolean } | undefined => {
      if (actualName?.trim()) {
        const species = speciesValue ?? false;
        return { name: actualName, species };
      }
    };

    event.preventDefault();
    const {
      genusName,
      speciesName,
      varietyName,

      name1aSpecies,
      name1aName,

      name1bSpecies,
      name1bName,

      name2aSpecies,
      name2aName,

      name2bSpecies,
      name2bName,
    } = nameState;

    await update(
      {
        ...formData,
        name: {
          genusName,
          speciesName,
          varietyName,
          name1a: mapNamesToObjects(name1aName, name1aSpecies),
          name1b: mapNamesToObjects(name1bName, name1bSpecies),
          name2a: mapNamesToObjects(name2aName, name2aSpecies),
          name2b: mapNamesToObjects(name2bName, name2bSpecies),
        },
      },
      id
    );
    return navigate(-1);
  }

  return (
    <Container>
      {/* <button onClick={() => navigate(-1)}>Back</button> */}
      <Button variant="outlined" onClick={closeEdit}>
        Back
      </Button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h4>Editing {new PlantModel({ name, fontSize, id }).getName()}</h4>
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
                  name="genusName"
                  value={nameState.genusName}
                  onChange={handleInputNameChange}
                  label="Genus:"
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
                  name="speciesName"
                  value={nameState.speciesName}
                  onChange={handleInputNameChange}
                  label="Species:"
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
                  name="varietyName"
                  value={nameState.varietyName}
                  onChange={handleInputNameChange}
                  label="Variety:"
                />
              </FormGroup>
            </FormControl>
          </Grid2>
        </Grid2>
        <Divider
          variant="middle"
          style={{ marginBottom: "15px", marginTop: "15px" }}
        />
        <Grid2 container spacing={2}>
          <Grid2 sm={12}>
            <h3>
              {parent1
                ? grandparents1
                  ? "First grandparent's name"
                  : "First parent's name"
                : ""}
            </h3>
          </Grid2>
          <Grid2>
            <FormControlLabel
              label={"Convert first parent to grandparents"}
              control={
                <Switch
                  checked={grandparents1}
                  onChange={(event) => setGrandparents1(event.target.checked)}
                ></Switch>
              }
            ></FormControlLabel>
          </Grid2>
          <Grid2
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {parent1 ? (
              <CreatePlantInputGroup
                checked={nameState.name1aSpecies}
                switchName="name1aSpecies"
                switchChangeHandler={handleInputChangeCheckBox}
                textFieldLabel={
                  parent1
                    ? grandparents1
                      ? "First grandparent's name"
                      : "First parent Name"
                    : ""
                }
                textFieldName="name1aName"
                textFieldChangeHandler={handleInputNameChange}
                initialValue={nameState.name1aName}
              />
            ) : (
              <></>
            )}{" "}
          </Grid2>
          {grandparents1 ? (
            <Grid2
              sm={6}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CreatePlantInputGroup
                checked={nameState.name1bSpecies}
                switchName="name1bSpecies"
                switchChangeHandler={handleInputChangeCheckBox}
                textFieldLabel="Second grandparent's name"
                textFieldName="name1bName"
                textFieldChangeHandler={handleInputNameChange}
                initialValue={nameState.name1bName}
              />
            </Grid2>
          ) : (
            <></>
          )}
          <Grid2 sm={12}>
            <h3>
              {parent2
                ? grandparents2
                  ? "First grandparent's name"
                  : "Second parent's name"
                : ""}
            </h3>
          </Grid2>
          <Grid2>
            <FormControlLabel
              label={"Convert second parent to grandparents"}
              control={
                <Switch
                  checked={grandparents2}
                  onChange={(event) => setGrandparents2(event.target.checked)}
                ></Switch>
              }
            ></FormControlLabel>
          </Grid2>
          <Grid2
            sm={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CreatePlantInputGroup
              checked={nameState.name2aSpecies}
              switchName="name2aSpecies"
              switchChangeHandler={handleInputChangeCheckBox}
              textFieldLabel={
                parent2
                  ? grandparents2
                    ? "First grandparent's name"
                    : "Second parent's name"
                  : ""
              }
              textFieldName="name2aName"
              textFieldChangeHandler={handleInputNameChange}
              initialValue={nameState.name2aName}
            />
          </Grid2>
          {grandparents2 ? (
            <Grid2
              sm={6}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CreatePlantInputGroup
                checked={nameState.name2bSpecies}
                switchName="name2bSpecies"
                switchChangeHandler={handleInputChangeCheckBox}
                textFieldLabel="Second grandparent's name"
                textFieldName="name2bName"
                textFieldChangeHandler={handleInputNameChange}
                initialValue={nameState.name2bName}
              />
            </Grid2>
          ) : (
            <></>
          )}
        </Grid2>
        {/* <label>
          From (trader): */}
        {/* {traders.length ? (
            <select name="from" onChange={handleInputChange}>
              {/* @todo implement this */}
        {/* <option key={"unknown trader"} value={user.id}>
                Me
              </option> */}
        {/* <option key={"unknown trader"} value="">
                Unknown
              </option>
              {traders.map((trader, i) => (
                <option key={trader.name + i} value={trader.id}>
                  {trader.name}
                </option>
              ))}
            </select> */}
        {/* ) : ( */}
        {/* <small>No traders added yet</small> */}
        {/* )} */}
        {/* <input type="text" name="from" value={formData.from} onChange={handleInputChange} /> */}
        {/* </label> */}
        <br />
        {/* <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </label> */}
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default PlantEditForm;
