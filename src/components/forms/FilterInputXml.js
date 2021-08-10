//https://docs.camunda.org/manual/7.15/user-guide/task-forms/

export function FilterInputXml(xml) {
    let formFields = xml.getElementsByTagName('camunda:formField');
    let result = [];

    for (let indexFormField = 0; indexFormField < formFields.length; indexFormField++)
    {
        let type = '';
        let validateType = '';
        let options = [];
        switch (formFields[indexFormField].getAttribute('type'))
        {
            case 'long':{ type = 'number'; validateType = 'number'; break; }
            case 'string': { type = 'text'; validateType = 'string';  break; }
            case 'date': { type = 'date'; validateType = 'string'; break; }
            case 'enum': {
                type = 'select';
                validateType = 'string';
                let camundaEnumOptionValue = formFields[indexFormField].getElementsByTagName('camunda:value');

                for (let indexEnumOptionValue = 0; indexEnumOptionValue < camundaEnumOptionValue.length; indexEnumOptionValue++)
                {
                    options.push({
                        key: camundaEnumOptionValue[indexEnumOptionValue].getAttribute('name'),
                        value: camundaEnumOptionValue[indexEnumOptionValue].getAttribute('name'),
                    })
                }

                break;
            }
            case 'boolean': { type = 'checkbox'; validateType = 'string'; break; }
            default:
            {
                type = formFields[indexFormField].getAttribute('type');
                validateType = 'string';
            }
        }

        // check validation
        let fieldValidationTag = formFields[indexFormField].getElementsByTagName('camunda:validation');
        let arrValidation = [];
        if(fieldValidationTag.length > 0)
        {
            let camundaValidationConstraints = fieldValidationTag[0].getElementsByTagName('camunda:constraint');

            for (let indexValidation = 0; indexValidation < camundaValidationConstraints.length; indexValidation++)
            {
                let typeValidation = camundaValidationConstraints[indexValidation].getAttribute('name');
                switch (typeValidation)
                {
                    case 'required':
                    {
                        arrValidation.push({
                            params: [
                                "Field is required"
                            ],
                            type: 'required',
                        })
                        break;
                    }
                    case 'maxlength':
                    {
                        arrValidation.push({
                            params: [
                                parseInt(camundaValidationConstraints[indexValidation].getAttribute('config')),
                                `Field is max length ${ camundaValidationConstraints[indexValidation].getAttribute('config') }`
                            ],
                            type: 'max'
                        })
                        break;
                    }
                    case 'max':
                    {
                        arrValidation.push({
                            params: [
                                parseInt(camundaValidationConstraints[indexValidation].getAttribute('config')),
                                `Field is max length ${ camundaValidationConstraints[indexValidation].getAttribute('config') }`
                            ],
                            type: 'max'
                        })
                        break;
                    }
                    case 'minlength':
                    {
                        arrValidation.push({
                            params: [
                                parseInt(camundaValidationConstraints[indexValidation].getAttribute('config')),
                                `Field is min length ${ camundaValidationConstraints[indexValidation].getAttribute('config') }`
                            ],
                            type: 'min'
                        })
                        break;
                    }

                    case 'min':
                    {
                        arrValidation.push({
                            params: [
                                parseInt(camundaValidationConstraints[indexValidation].getAttribute('config')),
                                `Field is min length ${ camundaValidationConstraints[indexValidation].getAttribute('config') }`
                            ],
                            type: 'min'
                        })
                        break;
                    }
                    default: break;
                }
            }
        }

        result.push({
            id: formFields[indexFormField].getAttribute('id'),
            name: formFields[indexFormField].getAttribute('id'),
            label: formFields[indexFormField].getAttribute('label'),
            value: formFields[indexFormField].getAttribute('defaultValue'),
            type: type,
            options: options,
            validateType: validateType,
            baseType: formFields[indexFormField].getAttribute('type'),
            validations: arrValidation
        })
    }

    return result;
}