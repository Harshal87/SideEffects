import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
// import { useReducer } from 'react/cjs/react.production.min';

const emailReducer = (state, action) => {
  if (action.type === "user_input")
    return { value: action.value, isValid: action.value.includes("@") };

  if (action.type === "input_blur")
    return { value: state.value, isValid: state.value.includes("@") };

  return { value: "", isValid: true };
};

const passReducer = (state, action) => {
  if (action.type === "user_input")
    return { value: action.value, isValid: action.value.trim().length > 6 };

  if(action.type==="input_blur") 
  return {value: state.value, isValid:state.value.trim().length>6} 

  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatch_pass] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatch({ type: "user_input", value: event.target.value });

    setFormIsValid(
     emailState.value.includes("@") && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatch_pass({ type: "user_input", value: event.target.value });

    setFormIsValid(
      passwordState.value.trim().length > 6 && emailState.value.includes("@")
    );
  };

  const validateEmailHandler = () => {
    dispatch({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatch_pass({type:"input_blur"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
