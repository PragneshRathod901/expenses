import { useEffect } from "react";
import { useSelector } from "react-redux";
import { alert } from "../../features/ExpenseSlice";
import { useSnackbar } from "notistack";

const AlertComponent = () => {
  const alertMessage = useSelector(alert);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (alertMessage)
      enqueueSnackbar(alertMessage.message, { variant: alertMessage.type });
  }, [alertMessage]);
};

export default AlertComponent;
