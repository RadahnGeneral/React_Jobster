import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  }

  function display() {
    console.log(values);
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-block"
          onClick={display}
          disabled={isLoading}
        >
          {isLoading ? "Loading... Plese wait" : "Submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
