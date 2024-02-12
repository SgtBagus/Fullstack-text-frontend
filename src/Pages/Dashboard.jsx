import { useContext, useEffect } from "react";

import { LoadingContext } from "../Context/LoadingContext";

const Dashboard = () => {
    const { dispatchLoading } = useContext(LoadingContext);

    useEffect(() => {
      dispatchLoading(false);
    }, [dispatchLoading]);

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