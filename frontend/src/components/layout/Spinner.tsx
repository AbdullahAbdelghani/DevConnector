import { Fragment, FC, JSX } from "react";
import spinner from "./spinner.gif";

const Spinner: FC = (): JSX.Element => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="loading..."
    />
  </Fragment>
);

export default Spinner;
