import { DeepPlant, ShallowPlant } from "Plants";
import { ReactElement } from "react";

interface PlantName {
  genusName: string;
  speciesName?: string;
  varietyName?: string;
  name1a?: {
    species: boolean;
    name: string;
  };
  name1b?: {
    species: boolean;
    name: string;
  };

  name2a?: {
    species: boolean;
    name: string;
  };

  name2b?: {
    species: boolean;
    name: string;
  };
}

const formatParent = (
  nameA: { species: boolean; name: string } | undefined,
  nameB: { species: boolean; name: string } | undefined,
  numOfCharactersMut: number
): JSX.Element | false => {
  const thereIsAParent = nameA !== undefined || nameB !== undefined;
  const thereAreTwoParents = nameA !== undefined && nameB !== undefined;

  if (thereIsAParent && !thereAreTwoParents) {
    let parent: { species: boolean; name: string };
    if (nameA !== undefined) {
      parent = nameA;
      numOfCharactersMut += parent.name.length;

      if (parent.species) {
        return <i>{parent.name}</i>;
      } else {
        return <span>{"'" + parent.name + "'"}</span>;
      }
    } else if (nameB !== undefined) {
      parent = nameB;
      numOfCharactersMut += parent.name.length;
      if (parent.species) {
        return <i>{parent.name}</i>;
      } else {
        return <span>{"'" + parent.name + "'"}</span>;
      }
    }
  } else if (thereAreTwoParents) {
    numOfCharactersMut += nameA.name.length + nameB.name.length;

    const jsxEl = (
      <span>
        (
        <span key={1}>
          {nameA.species ? <i>{nameA.name}</i> : "'" + nameA.name + "'"}
        </span>{" "}
        &times;
        <span key={2}>
          {nameB.species ? <i>{nameB.name}</i> : "'" + nameB.name + "'"}
        </span>
        )
      </span>
    );
    return jsxEl;
  } else {
    return false;
  }
  return false;
};

function formatPlantName(nameData: PlantName) {
  let numCharacters = 0;
  const spanPadding = { paddingRight: "0.15rem", paddingLeft: "0.15rem" };
  const nodes: ReactElement[] = [];
  nodes.push(
    <span style={spanPadding}>
      <i>{nameData.genusName}</i>
    </span>
  );

  numCharacters += nameData.genusName.length;

  if (nameData.speciesName) {
    nodes.push(
      <span style={spanPadding}>
        <i>{nameData.speciesName} </i>
      </span>
    );
    numCharacters += nameData.speciesName.length;
  }

  if (nameData.varietyName) {
    nodes.push(<span style={spanPadding}>{`'${nameData.varietyName}'`} </span>);
    numCharacters += nameData.varietyName.length;
  }

  const { name1a, name1b, name2a, name2b } = nameData;
  const parentA = formatParent(name1a, name1b, numCharacters);
  const parentB = formatParent(name2a, name2b, numCharacters);
  if (parentA === false) {
    if (parentB === false) {
      // do nothing?
    } else {
      nodes.push(parentB);
    }
  } else {
    if (parentB === false) {
      nodes.push(parentA);
    } else {
      // both not false
      nodes.push(
        ...[parentA, <span key={"parentMult"}> &times; </span>, parentB]
      );
    }
  }
  console.log("numofcharacters:", numCharacters);
  /**
   * @todo
   * - [ ] adapt font-size of paragraph to number of symbols?
   */
  let pStyle = { padding: "0", margin: "0", fontSize: "10px" };

  return (
    <p style={pStyle}>
      {...nodes}
      {/* {parentJSX} */}
    </p>
  );
}

// const somePlantNames: PlantName[] = [
//   {
//     genusName: "Kohleria",
//     speciesName: "hirsuta",
//   },
//   {
//     genusName: "Achimenes",
//     speciesName: "erecta",
//     varietyName: "Tiny Red",
//   },
//   {
//     genusName: "Kohleria",
//     name1a: {
//       name: "Keiko",
//       species: false,
//     },
//     name2a: {
//       name: "Bobina",
//       species: false,
//     },
//   },
//   {
//     genusName: "Kohleria",
//     name1a: {
//       name: "Keiko2",
//       species: true,
//     },
//     name2a: {
//       name: "Bobina2",
//       species: false,
//     },
//   },
//   {
//     genusName: "Kohleria",
//     name1a: {
//       name: "Keiko3",
//       species: false,
//     },
//     name2a: {
//       name: "Bobina3",
//       species: true,
//     },
//   },
//   {
//     genusName: "Kohleria",
//     name1a: {
//       name: "Keiko4",
//       species: true,
//     },
//     name2a: {
//       name: "Bobina4",
//       species: true,
//     },
//   },
//   {
//     genusName: "Kohleria",
//     name1a: { name: "hirsuta", species: true },
//     name1b: { name: "Pinnafore", species: false },
//     name2a: { species: true, name: "varsiwitchi" },
//   },
//   {
//     genusName: "Kohleria",
//     name1a: { name: "hirsuta", species: true },
//     name1b: { name: "Pinnafore", species: false },
//     name2a: { species: true, name: "varsiwitchi" },
//     name2b: { species: false, name: "Pinnafore" },
//   },
//   {
//     genusName: "Achimenes",
//     varietyName: "Camille Brozzoni",
//   },
// ];

export default class PlantModel {
  private name: ShallowPlant["name"];
  private from?: string;
  private image?: string;
  private id?: string;
  public isDeep = () => !!this.id;

  constructor(args: ShallowPlant | DeepPlant) {
    this.name = args.name;
    this.from = args.from;
    this.image = args.image;
  }

  public getName(): ReactElement {
    return formatPlantName(this.name);
  }
}

/**
 * @todo
 * - [ ] handle plant meta-data saving in localstorage or server or something (different fields for each parent?)
 */
