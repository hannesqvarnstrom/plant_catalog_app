import { FormGroup, InputBase, InputLabel, Paper, Switch } from "@mui/material";
import React from "react";

interface InputGroupState {
  name: string;
  labelText: string;
  type?: string; // should be a valid html5 input type
  id?: string;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  checked?: boolean;
}

const InputGroup = ({
  labelText,
  type,
  id,
  name,
  onInput,
  children,
}: InputGroupState) => {
  if (!type) {
    type = "text";
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
      }}
    >
      <FormGroup style={FormGroupBaseStyle}>
        <InputLabel>{labelText}</InputLabel>
        <InputBase
          id={id ?? labelText}
          type={type}
          name={name}
          style={InputBaseStyle}
          onInput={onInput}
        ></InputBase>
        {children}
      </FormGroup>
    </Paper>
  );
};

const InputBaseStyle = {
  border: "1px solid darkgrey",
  borderRadius: "5px",
};

const FormGroupBaseStyle = {
  // borderColor: "grey",
  // borderWidth: "2px",
  // border: "1px solid grey",
  // borderRadius: "5px",
  // padding: "0.5rem",
};
export default InputGroup;
