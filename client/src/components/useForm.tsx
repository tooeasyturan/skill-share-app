/** @format */

import { useState } from "react";
import { writeMeeting } from "../services/firebase";
import { Meeting } from "../types.d";

type FormReturn = {
  values: any;
  handleChange: (e: any) => void;
  handleFormSubmit: (e: any) => void;
};

const useForm = (formInput: any, callback): FormReturn => {
  const [values, setValues] = useState(formInput);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    callback();
    setValues(formInput);
  };

  return { values, handleChange, handleFormSubmit };
};

export default useForm;
