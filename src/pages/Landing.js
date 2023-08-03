import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/Testing";
import { Logo } from "../components/";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1 className="info">
            {" "}
            job <span>tracking</span> app
          </h1>
          <p>
            This app is created to make sure you can track effectively with how
            much job applications you have sent out
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>

        <img src={main} alt="job junt" className="img main-img" />
      </div>
    </Wrapper>
  );
}
