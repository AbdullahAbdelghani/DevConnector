import { FC, JSX } from "react";
import { useAppSelector } from "../../config/GlobalStateConfig";

const Alert: FC = (): JSX.Element | null => {
  const alerts = useAppSelector((state) => state.alert.alerts);
  return alerts !== null && alerts.length > 0 ? (
    <>
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </>
  ) : null;
};

export default Alert;
