/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { usePlantStore } from "../../store/plants";
import { Container } from "@mui/system";
import { /*redirect,*/ useNavigate } from "react-router";
import { useTraderStore } from "../../store/traders/traders";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import CreatePlantInputGroup from "../../components/forms/create-plant-input-group";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PlantModel from "./plant-model";

/**
 * Plant Creation Form Component (break into file)
 */

interface PlantCreationFormData {
  //   name: string;
  from?: string;
  type?: string;
  name: PlantNameFields;
}

interface PlantNameFields {
  genusName: string;
  speciesName?: string;
  varietyName?: string;

  name1aSpecies?: boolean;
  name1aName?: string;

  name1bSpecies?: boolean;
  name1bName?: string;

  name2aSpecies?: boolean;
  name2aName?: string;

  name2bSpecies?: boolean;
  name2bName?: string;
}

function PlantCreationForm() {
  const navigate = useNavigate();
  const { traders } = useTraderStore();
  const { add } = usePlantStore();

  const [nameState, setNameState] = React.useState<PlantNameFields>({
    genusName: "",
    speciesName: "",
    varietyName: "",
    name1aSpecies: false,
    name1aName: "",
    name1bSpecies: false,
    name1bName: "",
    name2aSpecies: false,
    name2aName: "",
    name2bSpecies: false,
    name2bName: "",
  });

  const [formData, setFormData] = React.useState<
    Omit<PlantCreationFormData, "name">
  >({
    from: "",
    type: "",
  });

  const [currentStep, setCurrentStep] = React.useState<number>(1);

  const steps = {
    scinameBase: {
      number: 1,
      text: "Enter the scientific name (where applicable) of your plant.",
      name: "scinameBase",
    },
    hasParentage: {
      number: 2,
      text: "Does the plant have a parentage worth inputting?",
      name: "hasParentage",
    },
    parentAHasParents: {
      number: 3,
      text: "Do you want to add another level of parentage? (e.g. grandparents)",
      name: "parent1HasParents",
    },
    parentBHasParents: {
      number: 4,
      text: "Do you want to add another level of parentage? (e.g. grandparents)",
      name: "parent2HasParents",
    },
  };

  const [parent1, setParent1] = React.useState<boolean>(true);
  const [grandparents1, setGrandparents1] = React.useState<boolean>(false);

  const [parent2, setParent2] = React.useState<boolean>(true);
  const [grandparents2, setGrandparents2] = React.useState<boolean>(false);

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

    await add({
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
      settings: { fontSize: 15 },
    });
    return navigate(-1);
  }

  return (
    <Container>
      <button onClick={() => navigate(-1)}>Back</button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h4>Create a new plant</h4>
        {currentStep !== 1 ? (
          <div>
            <p>
              {new PlantModel({
                id: "",
                settings: { fontSize: 13 },
                name: {
                  genusName: nameState.genusName,
                  speciesName: nameState.speciesName,
                  varietyName: nameState.varietyName,
                },
              }).getName()}
            </p>
            <button
              style={{
                display: currentStep === 1 ? "none" : "block",
              }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentStep(1);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}

        <Grid2
          container
          spacing={2}
          display={currentStep === 1 ? "flex" : "none"}
        >
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
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </button>
        <Divider
          variant="middle"
          style={{ marginBottom: "15px", marginTop: "15px" }}
        />
        <Grid2 container spacing={2}>
          <h3>
            {parent1
              ? grandparents1
                ? "First grandparent's name"
                : "First parent's name"
              : ""}
          </h3>
          <Grid2>
            {/* <FormControlLabel
              label={""}
              control={
                <Switch
                  checked={parent1}
                  onChange={(event) => setParent1(event.target.checked)}
                ></Switch>
              }
            ></FormControlLabel> */}
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
              />
            </Grid2>
          ) : (
            <></>
          )}
          <h3>
            {parent2
              ? grandparents2
                ? "First grandparent's name"
                : "Second parent's name"
              : ""}
          </h3>
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
              />
            </Grid2>
          ) : (
            <></>
          )}
        </Grid2>
        {/* <div> */}
        {/* 
          
          @todo
          - how to deploy
          
          */}
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
        {/* <InputGroup
          name="something"
          labelText="Something: "
          onInput={handleInputNameChange}
        ></InputGroup> */}
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default PlantCreationForm;
