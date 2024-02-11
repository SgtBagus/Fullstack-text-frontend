import React, { useState, useEffect, useContext } from "react";
import { NotificationManager } from "react-notifications";

import { LoadingContext } from "../../Context/LoadingContext";
import { ButtonContext } from "../../Context/ButtonContext";

import Tabel from "../../Components/Tabel";
import Loading from "../../Components/Loading";

import FormReveralCode from "./Components/FormReveralCode";

import { TABEL_META } from "./config";

import { getUser } from "../../Data";

import { CATCH_ERROR } from "../../Helper/Error";

const Users = () => {
	const [isLoading, setIsLoading] = useState(true);
  const [dataMeta, setDataMeta] = useState({
    tabelHead: TABEL_META,
    coloumnData: [],
  });

  const { dispatchLoading } = useContext(LoadingContext);
  const { dispatch } = useContext(ButtonContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: coloumnData } = await getUser();

        setDataMeta({
          tabelHead: TABEL_META,
          coloumnData,
        });
        setIsLoading(false);
      } catch (err) {
        NotificationManager.warning(
          CATCH_ERROR(err),
          "Terjadi Kesalahan",
          5000
        );
      }
    };

    dispatch({
      typeSwtich: "CHANGE_BUTTON",
      dataButtonList: [
        {
          id: 1,
          customButton: <FormReveralCode />,
        },
      ],
    });

    getUserData();

    dispatchLoading(false);
  }, [dispatch, dispatchLoading]);

  return (
    <div className="row">
      <div className="col-12">
        {isLoading ? (
          <div className="container h-100">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <Loading title="Memuat..." />
            </div>
          </div>
        ) : (
          <Tabel
						title="User List"
            dataMeta={dataMeta}
            actionButton={{
              view: { enabled: false },
              edit: {
                enabled: true,
								onClick: (val) => {
									console.log(val);
								},
              },
              delete: {
                enabled: true,
								onClick: (val) => {
									console.log(val);
								},
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
