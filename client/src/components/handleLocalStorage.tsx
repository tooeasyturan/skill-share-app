/** @format */

export const getMeeting = (key: string) => {
  return JSON.parse(localStorage.getItem(`${key}`));
};

// this function does not work, set value to [object Object] in local storage
export const setMeeting = (key, value) => {
  console.log("key:", key, "value:", value);
  localStorage.setItem(`${key}`, JSON.stringify(`${value}`));
};
