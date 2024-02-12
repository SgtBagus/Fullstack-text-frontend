import React, { Component } from "react";
import update from "immutability-helper";
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';
import PropTypes from 'prop-types';
import { NotificationManager } from "react-notifications";


import Modals from "../../../Components/Modals";
import FormValidation from "../../../Components/FormValidation";

import InputText from "../../../Components/Form/InputText";
import InputSelect from "../../../Components/Form/InputSelect";
import InputFile from "../../../Components/Form/InputFile";

import { withHocks } from '../../../Context/WithParams';

import { UPLOAD_IMAGE } from "../../../Data/UploadImage";

import { CATCH_ERROR, GENERATE_ERROR_MESSAGE, validateEmail } from "../../../Helper/Error";
import { FORM_TYPES } from "../../../Enum/Form";
import { USER_LIST } from "../config";
import { getUserCreate, getUserUpdate } from "../../../Data";


class FormReveralCode extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            form: {
                id: '',
                name: '',
                email: '',
                password: '',
                confirmPasword: '',
                image: '',
                role: 'sales',
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
            const { id, name, email, image, role } = form;

            this.setState({
                form: {
                    id,
                    name, email, image, role,
                    password: '',
                    confirmPasword: '',
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
                name: '',
                email: '',
                password: '',
                confirmPasword: '',
                image: '',
                role: 'sales',
            },
            onSend: false,
        })
    }

    handleSubmit = async () => {
        const { form, changeImage } = this.state;
        const { image } = form;

        try {
            if (changeImage) {
                try {
                    const { data: { image_url: imageURL } } = await UPLOAD_IMAGE(image, 'users');

                    this.sendData(form, imageURL);
                } catch (error) {
                    NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
                }
            } else {
                this.sendData(form, image);
            }
        } catch (error) {
            this.setState({
                onSend: false,
            }, () => {
                NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
            })
        }
    }

    sendData = async (data, urlImage = null) => {
        const { formType } = this.props;
        const { id, name, email, password, confirmPasword, role, } = data;

        const payload = {
            name,
            email,
            password,
            password_confirmation: confirmPasword,
            image: urlImage,
            role,
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
                id, name, email, password, confirmPasword, image, role,
            },
            onSend,
        } = this.state;
        const { idModal, onClick, buttonLabel, buttonIcon, formType } = this.props;

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
                                            Email
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputText
                                                    placeholder="Email"
                                                    name="email"
                                                    value={email}
                                                    changeEvent={(val, e) => this._changeInputHandler('email', val, e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    <FieldFeedbacks for="email">
                                        <div>
                                            <FieldFeedback when="valueMissing">
                                                {GENERATE_ERROR_MESSAGE('Email Anda', 'valueMissing')}
                                            </FieldFeedback>
                                            <FieldFeedback when={val => !validateEmail(val)}>
                                                {GENERATE_ERROR_MESSAGE('Email Anda', 'emailInvalid')}
                                            </FieldFeedback>
                                        </div>
                                    </FieldFeedbacks>
                                    </div>
                                </div>
                            </div>
                            {
                                FORM_TYPES.CREATE === formType && (
                                    <div className="d-flex flex-column mb-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="control-label">
                                                    Password
                                                    {' '}
                                                    <span className="text-red"> * </span>
                                                </label>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <InputText
                                                            placeholder="Password"
                                                            name="password"
                                                            type="password"
                                                            value={password}
                                                            changeEvent={(val, e) => this._changeInputHandler('password', val, e)}
                                                            maxlength="10"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <FieldFeedbacks for="password">
                                                    <div>
                                                        <FieldFeedback when="valueMissing">
                                                            {GENERATE_ERROR_MESSAGE('Password', 'valueMissing')}
                                                        </FieldFeedback>
                                                        <FieldFeedback when={val => val.length < 8 }>
                                                            {GENERATE_ERROR_MESSAGE('Password', 'notInValidLength', 8)}
                                                        </FieldFeedback>
                                                    </div>
                                                </FieldFeedbacks>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="control-label">
                                                    Konfrimasi Password
                                                    {' '}
                                                    <span className="text-red"> * </span>
                                                </label>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <InputText
                                                            placeholder="Konfrimasi Password"
                                                            name="confirmPasword"
                                                            type="password"
                                                            value={confirmPasword}
                                                            changeEvent={(val, e) => this._changeInputHandler('confirmPasword', val, e)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <FieldFeedbacks for="confirmPasword">
                                                    <div>
                                                        <FieldFeedback when="valueMissing">
                                                            {GENERATE_ERROR_MESSAGE('Konfrimasi Password', 'valueMissing')}
                                                        </FieldFeedback>
                                                        <FieldFeedback when={val => val.length < 8 }>
                                                            {GENERATE_ERROR_MESSAGE('Konfrimasi Password', 'notInValidLength', 8)}
                                                        </FieldFeedback>
                                                    </div>
                                                </FieldFeedbacks>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="d-flex flex-column mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Foto Profile
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputFile                 
                                                    value={image}
                                                    placeHolder="Pilih File"
                                                    style={{ objectFit: 'contain', height: '325px' }}
                                                    changeEvent={(val, e) => {
                                                        this.setState({
                                                            changeImage: true,
                                                        }, () => {
                                                            this._changeInputHandler('image', val, e)
                                                        })
                                                    }}
                                                    idPrewiev={
                                                        FORM_TYPES.CREATE === formType ? "PreviewImageCreate" : `PreviewImageEdit-${id}`
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">
                                            Role
                                            {' '}
                                            <span className="text-red"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <InputSelect
                                                    data={USER_LIST}
                                                    value={role}
                                                    changeEvent={(val, e) => this._changeInputHandler('role', val, e)}
                                                    placeholder="Pilih Role"
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
};

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
    idModal: 'id-create',
    onClick: () => {},
    buttonLabel: 'Tamabh User',
    buttonIcon: "fas fa-plus mx-2",
};

export default withHocks(FormReveralCode);
