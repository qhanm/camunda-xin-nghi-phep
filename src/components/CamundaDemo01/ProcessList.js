import React, {Component, useEffect, useState} from 'react';
import {camundaDeployment, camundaProcessDefinitionApi} from "../../services/camunda";
import {useDispatch, useSelector} from "react-redux";
import {camundaProcessDefinitionAction} from "../../redux/actions/CamundaAction";
import Viewer from "bpmn-js/lib/NavigatedViewer";
import DrawDiagram from "./DrawDiagram";

const ProcessList = () => {
    const dispatch = useDispatch();
    const {processDefinitions , processDefinitionXml} = useSelector(state => state.CamundaReducer);

    const handleChangeFile = async (event) => {
        let formData = new FormData();
        let blob = new Blob([event.target.files[0]], { type: "text/xml"});
        formData.append('data', blob, event.target.files[0].name);

        await dispatch(await camundaDeployment(formData));
    }

    const handleSubmit = (event) => {

    }

    useEffect(() => {
        const loadProcessDefinition = async () => {
            await dispatch(await camundaProcessDefinitionApi());
        }

        loadProcessDefinition();
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className="card m-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input type="file" name="file" onChange={handleChangeFile}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    { processDefinitionXml.map((item, index) => {

                        return <DrawDiagram
                            key={index}
                            xml={item.xml}
                            name={item.name}
                            definitionId={''}
                            activityInstanceId={''}
                            dispatch={dispatch}
                        />
                    }) }
                </div>
            </div>
        </div>
    );
}

export default ProcessList;