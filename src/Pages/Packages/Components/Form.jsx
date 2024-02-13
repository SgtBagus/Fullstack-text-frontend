import React, { Component } from "react";
import update from "immutability-helper";
import { FieldFeedback, FieldFeedbacks } from "react-form-with-constraints";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";

import Modals from "../../../Components/Modals";
import FormValidation from "../../../Components/FormValidation";

import InputText from "../../../Components/Form/InputText";
import InputSelect from "../../../Components/Form/InputSelect";

import { withHocks } from "../../../Context/WithParams";

import { CATCH_ERROR, GENERATE_ERROR_MESSAGE } from "../../../Helper/Error";
import { FORM_TYPES } from "../../../Enum/Form";

import { getPackageCreate, getPackageUpdate } from "../../../Data";
import { STATUS_PACKET_LIST } from "../config";

class FormReveralCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: "",
        name: "",
        desc: "",
        price: "",
        status: "true",
      },
      loading: true,
      onSend: false,
      isFormSubmitted: false,
    };
  }

  componentDidMount = () => {
    const { formType, form } = this.props;

    if (FORM_TYPES.EDIT === formType) {
      const { id, name, desc, price, status } = form;

      this.setState({
        form: {
          id,
          name,
          desc,
          price,
          status,
        },
      });
    }
  };

  _onInputChangeValidate = ({ target }) => {
    this.form.validateInput(target);
  };

  _changeInputHandler = async (type, val, e) => {
    const { form, isFormSubmitted } = this.state;

    if (isFormSubmitted && e) {
      const onInputChangeValidate = this._onInputChangeValidate(e);
      await onInputChangeValidate;
    }

    const newForm = update(form, {
      [type]: { $set: val },
    });

    this.setState({
      form: newForm,
    });
  };

  submitHandel = async () => {
    const isFormValid = await this.form.validateForm();

    if (isFormValid) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          this.setState(
            {
              onSend: true,
            },
            async () => {
              await this.handleSubmit();
            }
          );
        }
      );
    }

    this.setState({
      isFormSubmitted: true,
    });
  };

  resetForm = () => {
    this.setState({
      form: {
        id: "",
        name: "",
        desc: "",
        price: "",
        status: "true",
      },
      onSend: false,
    });
  };

  handleSubmit = async () => {
    const { formType } = this.props;
    const {
      form: { id, name, desc, price, status },
    } = this.state;
    const payload = {
      name,
      desc,
      price,
      status,
    };

    console.log(payload);
    try {
      if (formType === FORM_TYPES.CREATE) {
        try {
          await getPackageCreate(payload);

          NotificationManager.success(
            "Data Telah Tersimpan!, halaman ini akan segera di refresh",
            "Success",
            3000
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } catch (error) {
          this.setState(
            {
              onSend: false,
            },
            () => {
              NotificationManager.warning(
                CATCH_ERROR(error),
                "Terjadi Kesalahan",
                5000
              );
            }
          );
        }
      } else {
        try {
          await getPackageUpdate(payload, id);

          NotificationManager.success(
            "Data Telah Diupdate!, halaman ini akan segera di refresh",
            "Success",
            3000
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } catch (error) {
          this.setState(
            {
              onSend: false,
            },
            () => {
              NotificationManager.warning(
                CATCH_ERROR(error),
                "Terjadi Kesalahan",
                5000
              );
            }
          );
        }
      }
    } catch (error) {
      this.setState(
        {
          onSend: false,
        },
        () => {
          NotificationManager.warning(
            CATCH_ERROR(error),
            "Terjadi Kesalahan",
            5000
          );
        }
      );
    }
  };

  render() {
    const {
      form: { name, desc, price, status },
      onSend,
    } = this.state;
    const { idModal, onClick, buttonLabel, buttonIcon } = this.props;

    return (
      <Modals
        idModal={idModal}
        buttonIcon={buttonIcon}
        buttonLabel={buttonLabel}
        typeModal="primary"
        btnSubmitHandel={() => {
          this.submitHandel();
        }}
        btnCancelHandel={() => {
          this.resetForm();
        }}
        btnSubmitText={!onSend ? "Simpan" : "Menyimpan"}
        buttonSubmitIcon={onSend ? "fas fa-sync-alt fa-spin mx-2" : ""}
        btnSubmitDisabled={onSend}
        modalLarge={true}
        onClick={onClick}
      >
        <div className="row">
          <div className="col-md-12 my-2">
            <h3> Form User </h3>
            <hr />
            <FormValidation
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="d-flex flex-column mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">
                      Nama <span className="text-red"> * </span>
                    </label>
                    <div className="row">
                      <div className="col-md-12">
                        <InputText
                          placeholder="Nama"
                          name="name"
                          value={name}
                          changeEvent={(val, e) =>
                            this._changeInputHandler("name", val, e)
                          }
                          required
                        />
                      </div>
                    </div>
                    <FieldFeedbacks for="name">
                      <FieldFeedback when="valueMissing">
                        {GENERATE_ERROR_MESSAGE("Nama", "valueMissing")}
                      </FieldFeedback>
                    </FieldFeedbacks>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">
                      Deskripsi <span className="text-red"> * </span>
                    </label>
                    <div className="row">
                      <div className="col-md-12">
                        <InputText
                          placeholder="Deskripsi"
                          name="desc"
                          value={desc}
                          changeEvent={(val, e) =>
                            this._changeInputHandler("desc", val, e)
                          }
                          required
                        />
                      </div>
                    </div>
                    <FieldFeedbacks for="desc">
                      <FieldFeedback when="valueMissing">
                        {GENERATE_ERROR_MESSAGE("Deskripsi", "valueMissing")}
                      </FieldFeedback>
                    </FieldFeedbacks>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">
                      Harga Paket <span className="text-red"> * </span>
                    </label>
                    <div className="row">
                      <div className="col-md-12">
                        <InputText
                          placeholder="Harga Paket"
                          name="price"
                          value={price}
                          changeEvent={(val, e) =>
                            this._changeInputHandler("price", val, e)
                          }
                          required
                        />
                      </div>
                    </div>
                    <FieldFeedbacks for="price">
                      <FieldFeedback when="valueMissing">
                        {GENERATE_ERROR_MESSAGE("Harga Paket", "valueMissing")}
                      </FieldFeedback>
                    </FieldFeedbacks>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">
                      Status Paket <span className="text-red"> * </span>
                    </label>
                    <div className="row">
                      <div className="col-md-12">
                        <InputSelect
                          data={STATUS_PACKET_LIST}
                          value={status}
                          changeEvent={(val, e) =>
                            this._changeInputHandler("status", val, e)
                          }
                          placeholder="Pilih Status Paket"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormValidation>
          </div>
        </div>
      </Modals>
    );
  }
}

FormReveralCode.propTypes = {
  form: PropTypes.shape({}),
  formType: PropTypes.string,
  idModal: PropTypes.string,
  onClick: PropTypes.func,
  buttonLabel: PropTypes.string,
  buttonIcon: PropTypes.string,
};

FormReveralCode.defaultProps = {
  form: {},
  formType: FORM_TYPES.CREATE,
  idModal: "id-create",
  onClick: () => {},
  buttonLabel: "Tamabh User",
  buttonIcon: "fas fa-plus mx-2",
};

export default withHocks(FormReveralCode);
