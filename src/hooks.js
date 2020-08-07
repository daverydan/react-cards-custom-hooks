import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

export const useFlip = (initialState = true) => {
  const [state, setState] = useState(initialState);
  const flipState = () => {
    setState((isFlipped) => !isFlipped);
  };
  return [state, flipState];
};

export const useAxios = (baseURL) => {
  const initialState = [];
  const [state, setState] = useState(initialState);
  const addToState = async (endpoint) => {
    const response = await axios.get(
      `${(baseURL += typeof endpoint !== "object" ? endpoint : "")}`
    );
    setState((state) => [...state, { ...response.data, id: uuid() }]);
  };
  const resetState = () => setState(initialState);
  return [state, addToState, resetState];
};
