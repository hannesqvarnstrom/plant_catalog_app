import { DeepPlant, ShallowPlant } from "Plants";
import { ReactElement } from "react";

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
    return (
      <div style={{}}>
        <p style={{ padding: "0", margin: "0" }}>
          <b>
            <i>{this.name.sciName}</i>
          </b>
          {"   "}
          {this.name.sortName}
        </p>
        {this.name.parentNames && <small>({this.name.parentNames})</small>}
        {/* 
        // Enable this to get extra info
        {this.name.otherNameInfo && (
          <p>
            <small>{this.name.otherNameInfo}</small>
          </p>
        )} */}
      </div>
    );
  }
}

/**
 * @todo
 * - [ ] handle plant meta-data saving in localstorage or server or something (different fields for each parent?)
 */
