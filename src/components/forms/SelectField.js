import React, {Component} from 'react';

const SelectField = ({input, formik, ...props}) => {

    return (
        <div className="form-group">
            <label>{ input.label }</label>
            <select defaultValue={input.value} className="form-control" onChange={formik.handleChange} name={input.name}>
                { input.options.map((option, index) => {
                    return (
                        <option key={index} value={ option.key }>{ option.value }</option>
                    )
                }) }
            </select>
        </div>
    );
}

export default SelectField;