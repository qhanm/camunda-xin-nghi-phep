import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    camundaDeployment,
    camundaDeploymentWithTenantApi,
    camundaProcessDefinitionApi, camundaProcessDefinitionWithTenantApi,
    camundaTenantListApi
} from "../../services/camunda";
import DrawDiagram from "../CamundaDemo01/DrawDiagram";
import {camundaCurrentProcessAction} from "../../redux/actions/CamundaAction";
import ListTicket from "./ListTicket";
import CreateTicket from "./CreateTicket";
import Task from "./Task";
import ReviewTicket from "./ReviewTicket";

const UserGroupPage = (props) => {
    const dispatch = useDispatch();
    const { tenants,
        tenantGroup,
        processDefinitionXml,
        processDefinitions,
        currentTenant
    } = useSelector(state => state.CamundaReducer);

    const [processDefinition, setProcessDefinition] = useState({
        key: '',
    });
    const [diagram, setDiagram] = useState({
        name: '',
        id: '',
        xml: '',
    })
    const [task, setTask] = useState({});
    const [tab, setTab] = useState('');
    useEffect(() => {

        const loadProcessDefinition = async () => {
            await dispatch(await camundaProcessDefinitionApi());
        }

        loadProcessDefinition();
        }, [])

    const handleOnClickBPMN = (item, processDefinition, _tab) => {
        setDiagram(item);
        setProcessDefinition(processDefinition)
        setTab(_tab)
    }

    const handleChangeFile = async (event) => {
        let formData = new FormData();
        let blob = new Blob([event.target.files[0]], { type: "text/xml"});
        formData.append('data', blob, event.target.files[0].name);

        await dispatch(await camundaDeployment(formData));
        await dispatch(await camundaProcessDefinitionApi());
    }

    const handleSubmit = (event) => {

    }

    const renderTab = () => {
        switch (tab)
        {
            case 0: return <Task processDefinition={processDefinition} setTab={setTab} setTask={setTask}/>
            case 1: return <ReviewTicket task={task} currentProcess={diagram} setTab={setTab}/>
            case 2: return <CreateTicket currentProcess={diagram} processDefinition={processDefinition}/>
            default: return null;
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row m-3'>
                <div className='col-md-6'>
                    <div className="card m-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input type="file" name="file" onChange={handleChangeFile}/>
                            </form>
                        </div>
                    </div>

                    <ul className="list-group">
                        { processDefinitionXml.map((item, index) => {
                            const process = processDefinitions.find((_item) => _item.id === item.id );

                            return (
                                <li key={index} className={`list-group-item ${ diagram.id === item.id ? 'bg-active': '' }`}>
                                    <div className='row'>
                                        <div className='col-md-4 m-auto'>
                                            <h6>
                                                { item.name } - version: { process.version }
                                            </h6>
                                            <button type="button" className="btn btn-primary" onClick={() => { handleOnClickBPMN(item,  process, 2,) }}>Create</button>
                                            <button type="button" className="btn btn-primary" onClick={() => { handleOnClickBPMN(item,  process, 0) }}>List</button>

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
                <div className='col-md-6'>
                    <div className="position-sticky">
                        { renderTab() }
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserGroupPage;