/** @format */

import { useState } from "react";
import { MeetingProps } from "./types.d";

const useForm = (formInput: MeetingProps, callback: () => void) => {
  const [values, setValues] = useState(formInput);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("meeting", JSON.stringify(values));
    callback();
    setValues(formInput);
  };

  return { values, handleChange, handleFormSubmit };
};

export default useForm;
