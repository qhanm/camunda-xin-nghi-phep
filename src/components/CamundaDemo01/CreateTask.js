import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InputField from "../forms/InputField";
import {useFormik} from "formik";
import {createYupSchema} from "../forms/YubSchema";
import {FilterInputXml} from "../forms/FilterInputXml";
import * as yup from "yup";
import {camundaProcessDefinitionStartApi} from "../../services/camunda";
import SelectField from "../forms/SelectField";
import DrawDiagram from "./DrawDiagram";

const CreateTask = (props) => {
    const dispatch = useDispatch();

    const {currentProcess, processDefinition, processDefinitions} = useSelector(state => state.CamundaReducer)
    const [initialValues, setInitialValue] = useState({});
    const [inputs, setInputs] = useState([]);
    const [yupSchema, setYupSchema] = useState({});

    useEffect(() => {
        prepareData();
    }, []);

    const prepareData = () => {

        if(!currentProcess.xml) return '';

        let parser = new DOMParser();

        let xmlDoc = parser.parseFromString(currentProcess.xml, 'text/xml');

        let startEventNode = xmlDoc.getElementsByTagName('bpmn:startEvent')

        let formDataNode = startEventNode[0].getElementsByTagName('camunda:formData')

        if(formDataNode[0])
        {
            let inputs = FilterInputXml(formDataNode[0]);
            let initialValues = {};
            inputs.forEach((input) => {
                initialValues[input.name] = input.value ? input.value : '';
            })

            let yupSchema = inputs.reduce(createYupSchema, {});

            setInputs(inputs)
            setInitialValue(initialValues);
            setYupSchema(yupSchema);
        }
    }

    const renderForm = () => {
        let arrContent = [];
        console.log(inputs)
        inputs.forEach((input, index) => {
            if(input.type === 'select'){
                arrContent.push(<SelectField
                    key={index}
                    input={input}
                    formik={formik}
                />)
            }else{
                arrContent.push(<InputField
                    key={index}
                    input={input}
                    formik={formik}
                />)
            }

        })

        return arrContent;
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape(yupSchema),
        enableReinitialize: true,
        onSubmit: async (values) => {
            let arrData = {};
            for(let property in values)
            {
                let itemInput = inputs.find((__item) => __item.name === property);

                arrData[property] = {
                    value: values[property],
                    //type: itemInput.baseType,
                };
            }

            await dispatch(await camundaProcessDefinitionStartApi(
                processDefinition.key, {
                    variables: arrData,
                    //businessKey: processDefinition.key,
                }))
        },
    });

    return (
        <div className='container-fluid mt-3'>
            <div className='row'>
                <div className='col-md-6'>
                    <h1 className='text-center'>Form Create Ticket</h1>
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                        <input type="submit" style={{ display: 'none' }}/>
                        { renderForm() }
                        <div className="form-group">
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-6'>
                    <DrawDiagram
                        item={currentProcess}
                    />
                </div>
            </div>

        </div>
    )
}

export default CreateTask;