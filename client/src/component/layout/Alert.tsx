import React, { FC, JSX } from "react";
import { connect } from "react-redux";
import { Alert } from "../../reducers/alert";
import { GlobalStateType } from "../../reducers";

type Props = {
  alerts: Alert[];
};

const Alert: FC<Props> = ({ alerts }): JSX.Element | null =>
  alerts !== null && alerts.length > 0 ? (
    <>
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </>
  ) : null;

const mapStateToProps = (state: GlobalStateType) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
