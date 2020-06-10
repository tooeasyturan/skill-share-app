/** @format */

import { useState } from "react";
import { MeetingInfo } from "../types.d";

type FormReturn = {
  values: MeetingInfo;
  handleChange: (e: any) => void;
  handleFormSubmit: (e: any) => void;
};

const useForm = (formInput: MeetingInfo, callback: () => void): FormReturn => {
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
