/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { usePlantStore } from "../../store/plants";
import { Container } from "@mui/system";
import { /*redirect,*/ useNavigate } from "react-router";
import { useTraderStore } from "../../store/traders/traders";
import InputGroup from "../../components/forms/input-group";

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
    });
    return navigate(-1);
  }

  return (
    <Container>
      <button onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleSubmit}>
        <h4>Create a new plant</h4>

        <label>
          Genus*:
          <input
            type="text"
            name="genusName"
            value={nameState.genusName}
            onChange={handleInputNameChange}
          />
        </label>
        <br />
        <label>
          Species:
          <input
            type="text"
            name="speciesName"
            value={nameState.speciesName}
            onChange={handleInputNameChange}
          />
        </label>
        <br />
        <label>
          Variety:
          <input
            type="text"
            name="varietyName"
            value={nameState.varietyName}
            onChange={handleInputNameChange}
          />
        </label>
        <br></br>
        <br></br>
        <div>
          {/* 
          
          @todo
          - make component to group input-groups into form-sections? 
          - make a somewhat better design. maybe use an AI for design-generation?
          - how to deploy
          
          */}
          <InputGroup
            name="name1aName"
            labelText="Parent Name 1A:"
            onInput={handleInputNameChange}
          ></InputGroup>
          <InputGroup
            name="name1aSpecies"
            checked={nameState.name1aSpecies}
            type="checkbox"
            onInput={handleInputChangeCheckBox}
            labelText="Species??"
          ></InputGroup>
        </div>
        <div>
          <InputGroup
            name="name1bName"
            labelText="Parent Name 1B:"
            onInput={handleInputNameChange}
          ></InputGroup>

          <label htmlFor="">Species?</label>
          <input
            type="checkbox"
            name="name1bSpecies"
            value={nameState.name1bSpecies ? "true" : "false"}
            id=""
            onChange={handleInputChangeCheckBox}
          />
        </div>
        <br></br>
        <div>
          <InputGroup
            name="name2aName"
            labelText="Parent Name 2A:"
            onInput={handleInputNameChange}
          ></InputGroup>
          <label htmlFor="">Species?</label>
          <input
            type="checkbox"
            name="name2aSpecies"
            value={nameState.name2aSpecies ? "true" : "false"}
            id=""
            onChange={handleInputChangeCheckBox}
          />
        </div>
        <div>
          <InputGroup
            name="name2bName"
            labelText="Parent Name 2B:"
            onInput={handleInputNameChange}
          ></InputGroup>
          <label htmlFor="">Species?</label>
          <input
            type="checkbox"
            name="name2bSpecies"
            value={nameState.name2bSpecies ? "true" : "false"}
            id=""
            onChange={handleInputChangeCheckBox}
          />
        </div>
        <br />
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
