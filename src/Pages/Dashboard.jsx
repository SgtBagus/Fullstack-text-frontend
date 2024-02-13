import { useContext, useEffect } from "react";

import { LoadingContext } from "../Context/LoadingContext";
import { ButtonContext } from "../Context/ButtonContext";

const Dashboard = () => {
    const { dispatchLoading } = useContext(LoadingContext);
    const { dispatch } = useContext(ButtonContext);

    useEffect(() => {
      dispatchLoading(false);
      dispatch({
        typeSwtich: "CHANGE_BUTTON",
        dataButtonList: [],
      });
    }, [dispatch, dispatchLoading]);

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            HALAMAN DASHBOARD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
 
export default Dashboard;