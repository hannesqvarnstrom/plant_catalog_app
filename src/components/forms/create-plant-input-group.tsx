import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import { CreatePlantInputGroupProps } from "../../pages/page-prop-types";

function CreatePlantInputGroup({
  checked,
  switchChangeHandler,
  switchName,
  textFieldLabel,
  textFieldName,
  textFieldChangeHandler,
  initialValue,
}: CreatePlantInputGroupProps) {
  return (
    <>
      <FormControl component="fieldset" variant="outlined">
        <FormGroup>
          <TextField
            label={textFieldLabel}
            variant="outlined"
            name={textFieldName}
            onChange={textFieldChangeHandler}
            value={initialValue}
          />
          <FormControlLabel
            label={"Species"}
            control={
              <Switch
                checked={checked}
                onChange={(event) => {
                  switchChangeHandler(event);
                }}
                name={switchName}
              />
            }
          />
          <p>{checked}</p>
        </FormGroup>
      </FormControl>
    </>
  );
}

export default CreatePlantInputGroup;
