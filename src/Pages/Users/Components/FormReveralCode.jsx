import React, { Component } from "react";
import update from "immutability-helper";
import { FieldFeedback, FieldFeedbacks } from 'react-form-with-constraints';


import Modals from "../../../Components/Modals";
import FormValidation from "../../../Components/FormValidation";

import InputText from "../../../Components/Form/InputText"

import { withHocks } from '../../../Context/WithParams';

import { GENERATE_ERROR_MESSAGE } from "../../../Helper/Error";

class FormReveralCode extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            form: {
                name: '',
            },
            loading: true,
            onSend: false,
            isFormSubmitted: false,
        };
    }

    componentDidMount = () => {}

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
            },
        })
    }

    handleSubmit = async () => {
        console.log('submitnya disini!')
    }

    render() {
        const {
            form: { name },
            onSend,
        } = this.state;

        return (
            <Modals
                buttonIcon="fas fa-plus mx-2"
                buttonLabel="Tambah Reveal Code Baru"
                typeModal="primary"
                btnSubmitHandel={() => { this.submitHandel(); }}
                btnCancelHandel={() => { this.resetForm(); }}
                btnSubmitText={!onSend ? "Simpan" : "Menyimpan"}
                buttonSubmitIcon={ onSend ? "fas fa-sync-alt fa-spin mx-2" : ""}
                btnSubmitDisabled={onSend}
                modalLarge={true}
            >
                <div className="row">
                    <div className="col-md-12 my-2">
                        <h3> Tambah Reveal Code </h3>
                        <hr />
                        <FormValidation ref={(c) => { this.form = c; }}>
                            <div className="d-flex flex-column mb-2">
                                <label className="control-label">
                                    Reveral Code
                                    {' '}
                                    <span className="text-red"> * </span>
                                </label>
                                <div className="row">
                                    <div className="col-md-12">
                                        <InputText
                                            placeholder="Revelal Code"
                                            name="codeReveal"
                                            value={name}
                                            changeEvent={(val, e) => this._changeInputHandler('codeReveal', val, e)}
                                            maxlength="10"
                                            required
                                        />
                                    </div>
                                </div>
                                <FieldFeedbacks for="codeReveal">
                                    <FieldFeedback when="valueMissing">
                                        {GENERATE_ERROR_MESSAGE('Revelal Code', 'valueMissing')} 
                                    </FieldFeedback>
                                </FieldFeedbacks>
                            </div>
                        </FormValidation>
                    </div>
                </div>
            </Modals>
        );
    }
};

export default withHocks(FormReveralCode);
