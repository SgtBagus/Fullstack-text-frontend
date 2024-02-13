import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Swal from 'sweetalert2';

import Tabel from "../../Components/Tabel";
import Loading from "../../Components/Loading";

import Form from "./Components/Form";

import { TABEL_META } from "./config";

import { getCusomer, getCusomerDelete, getCustomerUpdateStatus, getPackage } from "../../Data";

import { CATCH_ERROR } from "../../Helper/Error";
import { FORM_TYPES } from "../../Enum/Form";

import { withHocks } from '../../Context/WithParams';

class Customers extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          coloumnData: [],
          getPakageList: [],
          isLoading: true,
          onSend: false,
        };
    }

    componentDidMount = () => {
      this.getCustomerData();
      this.getPakageList();
    }

    getCustomerData = async () => {
      try {
        const { data: coloumnData } = await getCusomer();

        this.setState({
          coloumnData,
        })
      } catch (err) {
        NotificationManager.warning(CATCH_ERROR(err), "Terjadi Kesalahan", 5000);
      }
    }

    changeStatus = (id, customerStatus) => {
      this.setState({
        onSend: true,
      }, async () => {
        try {
          const payload = {
            status: customerStatus === 'true' ? 'false' : 'true',
          };
  
          await getCustomerUpdateStatus(payload, id);
  
          this.setState({
            onSend: false,
          }, () => {
            NotificationManager.success('Data Telah Tersimpan! ', 'Success', 3000);

            this.getCustomerData();
          })
        } catch (error) {
          this.setState({
            onSend: false,
          }, () => {
            NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
          })
        }
      })
    }

    getPakageList = async () => {
      const { buttonHeader: { dispatch }, loadingParam: { dispatchLoading } } = this.props;

      try {
        const { data: coloumnData } = await getPackage();

        const getPakageList = coloumnData.map(x => ({ value: x.id, option: x.name }))
        this.setState({
          getPakageList,
          isLoading: false,
        });

        dispatch({
          typeSwtich: "CHANGE_BUTTON",
          dataButtonList: [
            {
              id: 1,
              customButton: <Form dataPackageList={getPakageList} />,
            },
          ],
        });

        dispatchLoading(false);
      } catch (err) {
        NotificationManager.warning(CATCH_ERROR(err), "Terjadi Kesalahan", 5000);
      }
    }

    confirmDeleteHandel = (data) => {
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
                  await getCusomerDelete(id);
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
              
              this.getCustomerData();
          }
      });
    }

    renderEditForm = (data) => {
      const { getPakageList } = this.state;
      const { id } = data; 
      
      return (
        <Form
          id={id}
          buttonLabel=""
          buttonIcon="fas fa-edit fa-xs"
          form={data}
          dataPackageList={getPakageList}
          formType={FORM_TYPES.EDIT}
          idModal={`editForm-${id}`}
        />
      )
    }
    
    render() {
      const { dataLogin: { role } } = this.props;
        const {
          isLoading, coloumnData, onSend,
        } = this.state;

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
                  title="Data Sales List"
                  dataMeta={{     
                    tabelHead: TABEL_META(onSend, role, this.changeStatus),
                    coloumnData,
                  }}
                  actionButton={{
                    view: { enabled: false },
                    edit: {
                      enabled: false,
                      customModal: (val) => ( this.renderEditForm(val)),
                    },
                    delete: {
                      enabled: true,
                      onClick: (val) => {
                        this.confirmDeleteHandel(val);
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        );
    }
};

export default withHocks(Customers);
