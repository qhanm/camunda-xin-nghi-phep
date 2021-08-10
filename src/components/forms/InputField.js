import React, {Component} from 'react';

const InputField = ({input, formik, ...props}) => {
    const renderType = () => {
        return input.type ? input.type : 'text';
    }

    const renderRequired = () => {
        if(Array.isArray(input.validations)){
            for (let i = 0; i < input.validations.length; i++)
            {
                if(input.validations[i].type === 'required'){
                    return true;
                }
            }
        }

        return false;
    }

    return (
        <div className="form-group">
            {renderRequired()}
            <label htmlFor="usr">
                { input.label }
                { renderRequired() === true ? <span className='text-danger'>*</span> : '' }
            </label>
            <input
                type={ renderType() }
                className="form-control"
                name={input.name}
                value={formik.values[input.name]}
                onChange={formik.handleChange}
            />
            { formik.touched[input.name] && formik.errors[input.name] && <label className='text-danger'>{ formik.errors[input.name] }</label> }
        </div>
    );
}

export default InputField;