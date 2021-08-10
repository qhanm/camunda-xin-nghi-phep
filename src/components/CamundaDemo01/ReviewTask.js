import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    camundaProcessDefinitionStartApi,
    camundaTaskCompleteApi,
    camundaVariableInstanceApi
} from "../../services/camunda";
import DrawDiagram from "./DrawDiagram";
import {FilterInputXml} from "../forms/FilterInputXml";
import SelectField from "../forms/SelectField";
import InputField from "../forms/InputField";
import {useFormik} from "formik";
import * as yup from "yup";
import {createYupSchema} from "../forms/YubSchema";
import {CamundaOutGoing} from "../forms/CamundaOutGoing";

const ReviewTask = ({task, ...props}) => {

    const dispatch = useDispatch();
    const { currentProcess } = useSelector(state => state.CamundaReducer);
    const [variableInstance, setVariableInstance] = useState([]);

    const [initialValues, setInitialValue] = useState({});
    const [inputs, setInputs] = useState([]);
    const [yupSchema, setYupSchema] = useState({});
    const [formReview, setFormReview] = useState([]);

    useEffect(() => {
        let data= camundaVariableInstanceApi(task.processInstanceId)
        data.then((response) => {
            response.json().then((json) => {
                setVariableInstance(json);
            })
        })
    }, [task])

    useEffect(() => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(currentProcess.xml, 'text/xml');

        let userTasks = xmlDoc.getElementsByTagName('bpmn:userTask');

        let nodeCurrent = null;
        for (let indexUserTask = 0; indexUserTask < userTasks.length; indexUserTask++)
        {
            if(userTasks[indexUserTask].getAttribute('id') === task.taskDefinitionKey){
                nodeCurrent = userTasks[indexUserTask];
                break;
            }
        }

        if(nodeCurrent)
        {
            let formDataNode = nodeCurrent.getElementsByTagName('camunda:formData');
            if(formDataNode[0])
            {
                let inputs = FilterInputXml(formDataNode[0]);
                let initialValues = {};
                inputs.forEach((input) => {
                    initialValues[input.name] = input.value ? input.value : '';
                })

                let yupSchema = inputs.reduce(createYupSchema, {});

                setInputs(inputs);
                setInitialValue(initialValues);
                setYupSchema(yupSchema);

                let nodeInComing = nodeCurrent.getElementsByTagName('bpmn:incoming');
                let arrNodeComingContent = [];

                for(let index = 0; index < nodeInComing.length; index++)
                {
                    arrNodeComingContent.push(nodeInComing[index].firstChild.nodeValue);
                }
                let result = [];
                CamundaOutGoing(xmlDoc, arrNodeComingContent, result)
                setFormReview(result);
            }
        }

    }, [variableInstance])

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

            await dispatch(await camundaTaskCompleteApi({
                variables: arrData
            }, task.id))
        },
    });

    const renderForm = () => {
        let arrContent = [];
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

    const renderReview = () => {
        let arrContent = [];

        for(let index = 0; index < formReview.length; index++)
        {
            let inputs = FilterInputXml(formReview[index].form);

            let fieldContent = [];
            for (let indexInput = 0; indexInput < inputs.length; indexInput++)
            {
                let variableItem = variableInstance.find((item) => item.name === inputs[indexInput].name);

                fieldContent.push(
                    <tr key={indexInput}>
                        <th>{ inputs[indexInput].label }</th>
                        <td>{ variableItem?.value }</td>
                    </tr>
                )
            }

            arrContent.push(
                <div key={index}>
                    <h4 className='text-center'>{ formReview[index].name }</h4>
                    <table className='table'>
                        <tbody key={index}>
                        { fieldContent }
                        </tbody>
                    </table>
                </div>
            )
        }

        return arrContent;

    }

    return (
        <div className='container-fluid'>
            <h2 className='text-center m-3'>Ticket Detail</h2>
            <div className='row'>
                <div className='col-md-6'>
                    { renderReview() }
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                { renderForm() }
                                <div className="form-group">
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <DrawDiagram
                        item={ currentProcess }
                        activity={task.taskDefinitionKey}
                    />
                </div>
            </div>

        </div>
    );
}

export default ReviewTask;