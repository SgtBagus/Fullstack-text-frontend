import React, { Component } from "react";
import update from "immutability-helper";
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';
import PropTypes from 'prop-types';
import { NotificationManager } from "react-notifications";


import Modals from "../../../Components/Modals";
import FormValidation from "../../../Components/FormValidation";

import InputText from "../../../Components/Form/InputText";
import InputTextArea from "../../../Components/Form/InputTextArea";
import InputSelect from "../../../Components/Form/InputSelect";
import InputFile from "../../../Components/Form/InputFile";

import { withHocks } from '../../../Context/WithParams';

import {
    getUserCreate, getUserUpdate,
} from "../../../Data";
import { UPLOAD_IMAGE } from "../../../Data/UploadImage";

import { CATCH_ERROR, GENERATE_ERROR_MESSAGE } from "../../../Helper/Error";

import { FORM_TYPES } from "../../../Enum/Form";


class FormReveralCode extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            form: {
                id: '',
                name: '',
                phone: '',
                address: '',
                status: '',
                packageId: '',
                ktpImage: '',
                houseImage: '',
            },
            changeImage: false,
            loading: true,
            onSend: false,
            isFormSubmitted: false,
        };
    }

    componentDidMount = () => {
        const { formType, form } = this.props;

        if (FORM_TYPES.EDIT === formType) {
            const {
                id,
                customerName,
                customerPhone,
                customerAddress,
                customerStatus,
                packageId,
                customerKtpImage,
                customerHouseImage,
            } = form;

            this.setState({
                form: {
                    id,
                    name: customerName,
                    phone: customerPhone,
                    address: customerAddress,
                    status: customerStatus,
                    packageId,
                    ktpImage: customerKtpImage,
                    houseImage: customerHouseImage,
                },
            })
        }
    }

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
            this.setState({
                loading: true,
            }, async () => {
                this.setState({
                    onSend: true,
                }, async () => {
                    await this.handleSubmit();
                })
            });
        }
    
        this.setState({
          isFormSubmitted: true,
        });
    }

    resetForm = () => {
        this.setState({
            form: {
                id: '',
                name: '',
                phone: '',
                address: '',
                status: '',
                packageId: '',
                ktpImage: '',
                houseImage: '',
            },
            onSend: false,
        })
    }

    handleSubmit = async () => {
        const { form, changeImage } = this.state;
        const { name, ktpImage, houseImage } = form;

        try {
            if (changeImage) {
                try {
                    const { data: { image_url: imageURLKTP } } = await UPLOAD_IMAGE(ktpImage, `customers/${name}`);
                    const { data: { image_url: imageURLHouse } } = await UPLOAD_IMAGE(houseImage, `customers/${name}`);

                    this.sendData(form, imageURLKTP, imageURLHouse);
                } catch (error) {
                    NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
                }
            } else {
                this.sendData(form, ktpImage, houseImage );
            }
        } catch (error) {
            this.setState({
                onSend: false,
            }, () => {
                NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
            })
        }
    }

    sendData = async (data, urlImageKTP = null, urlImageHouse = null) => {
        const { formType, dataLogin: { id: idLogin } } = this.props;

        const {
            id, name, phone, address, status, packageId,
        } = data;

        const payload = {
            name: name,
            phone: phone,
            address: address,
            status: status,
            package_id: packageId,
            ktpImage: urlImageKTP,
            houseImage: urlImageHouse,
            created_by: idLogin,
        }

        if (formType === FORM_TYPES.CREATE) {
            try {
                await getUserCreate(payload);

                NotificationManager.success('Data Telah Tersimpan!, halaman ini akan segera di refresh', 'Success', 3000);
                setTimeout(() => { window.location.reload() }, 3000);
            } catch (error) {
                this.setState({
                    onSend: false,
                }, () => {
                    NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
                })
            }
        } else {
            try {
                await getUserUpdate(payload, id);
    
                NotificationManager.success('Data Telah Diupdate!, halaman ini akan segera di refresh', 'Success', 3000);
                setTimeout(() => { window.location.reload() }, 3000);
            } catch (error) {
                this.setState({
                    onSend: false,
                }, () => {
                    NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
                })
            }
        }
    }

    
    render() {
        const {
            form: {
                id, name, phone,
                address, packageId,
                ktpImage, houseImage,
            },
            onSend,
        } = this.state;
        const { idModal, onClick, buttonLabel, buttonIcon, formType, dataPackageList } = this.props;

        return (
            <Modals
                idModal={idModal}
                buttonIcon={buttonIcon}
                buttonLabel={buttonLabel}
                typeModal="primary"
                btnSubmitHandel={() => { this.submitHandel(); }}
                btnCancelHandel={() => { this.resetForm(); }}
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
                        <FormValidation ref={(c) => { this.form = c; }}>
                            <div className="d-flex flex-column mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Nama
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputText
                                                    placeholder="Nama"
                                                    name="name"
                                                    value={name}
                                                    changeEvent={(val, e) => this._changeInputHandler('name', val, e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <FieldFeedbacks for="name">
                                            <FieldFeedback when="valueMissing">
                                                {GENERATE_ERROR_MESSAGE('Nama', 'valueMissing')} 
                                            </FieldFeedback>
                                        </FieldFeedbacks>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Nomor Telepon
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputText
                                                    type="number"
                                                    placeholder="Phone"
                                                    name="phone"
                                                    value={phone}
                                                    changeEvent={(val, e) => this._changeInputHandler('phone', val, e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <FieldFeedbacks for="phone">
                                            <FieldFeedback when="valueMissing">
                                                {GENERATE_ERROR_MESSAGE('Nomor Telepon', 'valueMissing')}
                                            </FieldFeedback>
                                        </FieldFeedbacks>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Alamat
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputTextArea                                        
                                                    value={address}
                                                    name="address"
                                                    placeholder="Alamat"
                                                    changeEvent={(val, e) => this._changeInputHandler('address', val, e)}
                                                    row="4"
                                                />
                                            </div>
                                        </div>
                                        <FieldFeedbacks for="address">
                                            <FieldFeedback when="valueMissing">
                                                {GENERATE_ERROR_MESSAGE('Alamat', 'valueMissing')} 
                                            </FieldFeedback>
                                        </FieldFeedbacks>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Paket
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputSelect
                                                    data={dataPackageList}
                                                    value={packageId}
                                                    changeEvent={(val, e) => this._changeInputHandler('packageId', val, e)}
                                                    placeholder="Pilih Paket"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Gambar KTP
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputFile                 
                                                    value={ktpImage}
                                                    placeHolder="Pilih File"
                                                    style={{ objectFit: 'contain', height: '325px' }}
                                                    changeEvent={(val, e) => {
                                                        this.setState({
                                                            changeImage: true,
                                                        }, () => {
                                                            this._changeInputHandler('ktpImage', val, e)
                                                        })
                                                    }}
                                                    idPrewiev={
                                                        FORM_TYPES.CREATE === formType ? "PreviewImageKTPCreate" : `PreviewImageKTPEdit-${id}`
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Gambar Rumah
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputFile                 
                                                    value={houseImage}
                                                    placeHolder="Pilih File"
                                                    style={{ objectFit: 'contain', height: '325px' }}
                                                    changeEvent={(val, e) => {
                                                        this.setState({
                                                            changeImage: true,
                                                        }, () => {
                                                            this._changeInputHandler('houseImage', val, e)
                                                        })
                                                    }}
                                                    idPrewiev={
                                                        FORM_TYPES.CREATE === formType ? "PreviewImageKTPCreate" : `PreviewImageKTPEdit-${id}`
                                                    }
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
};

FormReveralCode.propTypes = {
    form: PropTypes.shape({}),
    formType: PropTypes.string,
    idModal: PropTypes.string,
    onClick: PropTypes.func,
    buttonLabel: PropTypes.string,
    buttonIcon: PropTypes.string,
    dataPackageList: PropTypes.array,
};

FormReveralCode.defaultProps = {
    form: {},
    formType: FORM_TYPES.CREATE,
    idModal: 'id-create',
    onClick: () => {},
    buttonLabel: 'Tamabh User',
    buttonIcon: "fas fa-plus mx-2",
    dataPackageList: [],
};

export default withHocks(FormReveralCode);
