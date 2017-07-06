import React from 'react';

export default class NewPropertyWindow extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }


    onSave() {
        this.props.onSave(this.state);
    }

    render() {
        return (
            <div>
                <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open">
                    <div className="slds-modal__container">
                        <div className="slds-modal__header">
                            <h2 className="slds-text-heading--medium">New Word</h2>
                        </div>
                        <div className="slds-modal__content">

                            <div className="slds-form--stacked">
                                <fieldset className="slds-form--compound slds-m-bottom--medium">
                                    <legend className="slds-form-element__label">Address</legend>
                                    <div className="form-element__group">
                                        <div className="slds-form-element__row">
                                            <label className="slds-form-element__control slds-size--1-of-1">
                                                <small className="slds-form-element__helper">Street</small>
                                                <input className="slds-input" type="text" valueLink={this.linkState('address')} />
                                            </label>
                                        </div>
                                        <div className="slds-form-element__row">
                                            <label className="slds-form-element__control slds-size--2-of-4">
                                                <small className="slds-form-element__helper">City</small>
                                                <input className="slds-input" type="text" valueLink={this.linkState('city')} />
                                            </label>
                                            <label className="slds-form-element__control slds-size--1-of-4">
                                                <small className="slds-form-element__helper">State</small>
                                                <input className="slds-input" type="text" valueLink={this.linkState('state')} />
                                            </label>
                                            <label className="slds-form-element__control slds-size--1-of-4">
                                                <small className="slds-form-element__helper">ZIP Code</small>
                                                <input className="slds-input" type="text" valueLink={this.linkState('zip')} />
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                        </div>
                        <div className="slds-modal__footer">
                            <button className="slds-button slds-button--neutral" onClick={this.props.onCancel}>Cancel</button>
                            <button className="slds-button slds-button--neutral slds-button--brand" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>
            </div>
        );
    }

}