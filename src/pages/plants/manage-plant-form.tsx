/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { usePlantStore } from "../../store/plants";
import { Container } from "@mui/system";
import { /*redirect,*/ useNavigate } from "react-router";
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
import { DeepPlant, PlantTypeCol } from "Plants";
import PlantModel from "./plant-model";
import { useTraderStore } from "../../store/traders/traders";

export interface PlantEditProps {
  manageType: "create" | "edit";
  plantArgs?: DeepPlant;
  closeEdit?: () => void;
}

/**
 * Plant Edit Form Component (break into file)
 */
function ManagePlantForm({
  plantArgs = {
    name: {
      genusName: "",
      speciesName: "",
      varietyName: "",
      name1a: { species: false, name: "" },
      name1b: { species: false, name: "" },
      name2a: { species: false, name: "" },
      name2b: { species: false, name: "" },
    },
    fontSize: "13px",
    id: "",
    location: "",
    type: "none",
  },
  closeEdit,
  manageType,
}: PlantEditProps) {
  const { name, fromTrader, id, location, type, fontSize } = plantArgs;
  const navigate = useNavigate();
  const { traders } = useTraderStore();
  const { update, add } = usePlantStore();

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
    location,
    fromTrader,
    type,
  });

  const [parent1 /*, setParent1*/] = React.useState<boolean>(
    true //!!nameState.name1aName
  );
  const [grandparents1, setGrandparents1] = React.useState<boolean>(
    !!nameState.name1bName
  );

  const [parent2 /*, setParent2*/] = React.useState<boolean>(
    true //!!nameState.name2aName
  );
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

    if (manageType === "edit") {
      console.log(formData);
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
    } else if (manageType === "create") {
      await add({
        ...formData,
        fontSize,
        name: {
          genusName,
          speciesName,
          varietyName,
          name1a: mapNamesToObjects(name1aName, name1aSpecies),
          name1b: mapNamesToObjects(name1bName, name1bSpecies),
          name2a: mapNamesToObjects(name2aName, name2aSpecies),
          name2b: mapNamesToObjects(name2bName, name2bSpecies),
        },
      });
    }
    return navigate(-1);
  }

  function setPlantType(event: React.ChangeEvent<HTMLSelectElement>) {
    const perhapsType = event.target.value;
    if (
      perhapsType === "cutting" ||
      perhapsType === "seed" ||
      perhapsType === "rhizome" ||
      perhapsType === "none"
    ) {
      const type = perhapsType as PlantTypeCol;
      setFormData((prev) => ({ ...prev, type }));
    }
  }

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    const name = event.target.name as keyof {
      location?: string;
      fromTrader?: string;
      type?: PlantTypeCol;
    };

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Container>
      <Button
        variant="outlined"
        onClick={() => {
          manageType === "edit" && closeEdit ? closeEdit() : navigate(-1);
        }}
      >
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
        {manageType === "edit" ? (
          <h4>Editing {new PlantModel({ name, fontSize, id }).getName()}</h4>
        ) : (
          <h4>Create new plant</h4>
        )}

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
        <label>
          From (trader):
          {traders.length ? (
            <select
              defaultValue={fromTrader}
              name="fromTrader"
              onChange={handleInputChange}
            >
              <option key={"none"} value={"none"}>
                None
              </option>
              {traders.map((trader) => (
                <option key={trader.id} value={trader.id}>
                  {trader.name}
                </option>
              ))}
            </select>
          ) : (
            <small>No traders added yet</small>
          )}
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={formData.type} onChange={setPlantType}>
            <option value="cutting">Cutting</option>
            <option value="seed">Seed</option>
            <option value="rhizome">Rhizome</option>
            <option value="none">None</option>
          </select>
        </label>

        <label>
          From (location):
          <input
            type="text"
            name="location"
            value={formData.location === null ? "" : formData.location}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default ManagePlantForm;
