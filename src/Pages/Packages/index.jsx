import React, { useState, useEffect, useContext } from "react";
import { NotificationManager } from "react-notifications";
import Swal from 'sweetalert2';

import { LoadingContext } from "../../Context/LoadingContext";
import { ButtonContext } from "../../Context/ButtonContext";

import Tabel from "../../Components/Tabel";
import Loading from "../../Components/Loading";

import Form from "./Components/Form";

import { TABEL_META } from "./config";

import { getPackage, getPackageDelete } from "../../Data";

import { CATCH_ERROR } from "../../Helper/Error";
import { FORM_TYPES } from "../../Enum/Form";

const Packages = () => {
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
        const { data: coloumnData } = await getPackage();

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
          customButton: <Form buttonLabel="Tambah Paket" formName="Paket" />,
        },
      ],
    });

    getUserData();

    dispatchLoading(false);
  }, [dispatch, dispatchLoading]);

  const RenderEditForm = ({ data }) => {
    const { id } = data; 
    
    return (
      <Form
        id={id}
        buttonLabel=""
        formName="Paket"
        buttonIcon="fas fa-edit fa-xs"
        form={data}
        formType={FORM_TYPES.EDIT}
        idModal={`editForm-${id}`}
      />
    )
  }
  
  const confirmDeleteHandel = (data) => {
    const { name, id } = data;

    Swal.fire({
        title: "Apakah anda yakin akan menghapus Data ini",
        text: `Menghapus User - ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Iya, Hapus data ini!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                await getPackageDelete(id);
            } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Success",
                text: "Berhasil Menghapus data, halaman ini akan di mulai ulang",
                icon: "success"
            });
            
            setTimeout(() => { window.location.reload() }, 3000);
        }
    });
  }

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
                enabled: false,
                customModal: (val) => (
                    <RenderEditForm data={val} />
                ),
              },
              delete: {
                enabled: true,
								onClick: (val) => {
                  confirmDeleteHandel(val);
								},
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Packages;
