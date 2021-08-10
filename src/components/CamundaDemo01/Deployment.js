import React, {Component, useEffect, useState} from 'react';
import {camundaDeployment, camundaProcessDefinitionApi} from "../../services/camunda";
import {useDispatch, useSelector} from "react-redux";
import DrawDiagram from "./DrawDiagram";
import {camundaCurrentProcessAction} from "../../redux/actions/CamundaAction";

const Deployment = (props) => {
    const dispatch = useDispatch();
    const {processDefinitions , processDefinitionXml} = useSelector(state => state.CamundaReducer);

    const handleChangeFile = async (event) => {
        let formData = new FormData();
        let blob = new Blob([event.target.files[0]], { type: "text/xml"});
        formData.append('data', blob, event.target.files[0].name);

        await dispatch(await camundaDeployment(formData));
        await dispatch(await camundaProcessDefinitionApi());
    }

    const handleSubmit = (event) => {

    }

    useEffect(() => {
        const loadProcessDefinition = async () => {
            await dispatch(await camundaProcessDefinitionApi());
        }

        loadProcessDefinition();
    }, [])

    const handleOnClickBPMN = (item) => {
        dispatch(camundaCurrentProcessAction({
            xml: item.xml,
            id: item.id,
            name: item.name
        }));

        props.setTab(1);
    }

    return (
        <div className='container-fluid mb-5'>
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
                    <ul className="list-group">
                        { processDefinitionXml.map((item, index) => {
                            const process = processDefinitions.find((_item) => _item.id === item.id );

                            return (
                                <li key={index} className="list-group-item">
                                    <div className='row'>
                                        <div className='col-md-4 m-auto'>
                                            <h6>
                                                { item.name } - version: { process.version }
                                            </h6>
                                            <button type="button" className="btn btn-primary" onClick={() => { handleOnClickBPMN(item) }}>Create ticket</button>

                                        </div>
                                        <div className='col-md-8'>
                                            <DrawDiagram
                                                item={item}
                                                definitionId={''}
                                                activityInstanceId={''}
                                            />
                                        </div>
                                    </div>

                                </li>
                            )
                        }) }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Deployment;