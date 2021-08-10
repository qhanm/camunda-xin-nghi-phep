import * as yup from "yup";

export function createYupSchema(schema, config) {
    const { id, validateType, validations = [] } = config;

    if (!yup[validateType]) {
        return schema;
    }
    let validator = yup[validateType]();
    validations.forEach(validation => {
        const { params, type } = validation;
        if (!validator[type]) {
            return;
        }
        
        validator = validator[type](...params);
    });
    schema[id] = validator;

    return schema;
}
