import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {camundaDeployment, camundaProcessDefinitionApi, camundaTaskListApi} from "../../services/camunda";
import ReviewTask from "../CamundaDemo01/ReviewTask";
import DrawDiagram from "../CamundaDemo01/DrawDiagram";
import CreateTicket from "./CreateTicket";
import Task from "./Task";
import ReviewTicket from "./ReviewTicket";

const ManagerGroup = (props) => {
    const dispatch = useDispatch();
    const { tenants,
        tenantGroup,
        processDefinitionXml,
        processDefinitions,
        currentTenant
    } = useSelector(state => state.CamundaReducer);
    const [isShowTable, setIsShowTable] = useState(false);
    const [tab, setTab] = useState(0);
    const [task, setTask] = useState({
        taskDefinitionKey: ''
    });
    const [processDefinition, setProcessDefinition] = useState({
        key: '',
        id: ''
    });
    const [diagram, setDiagram] = useState({
        name: '',
        id: '',
        xml: '',
    })
    useEffect(() => {

        const loadProcessDefinition = async () => {
            await dispatch(await camundaProcessDefinitionApi());
        }

        loadProcessDefinition();
    }, [])

    useEffect(() => {
        if(processDefinition.id){
            setIsShowTable(true)
        }
    }, [processDefinition])

    const handleOnClickBPMN = (item, processDefinition) => {
        setDiagram(item);
        setProcessDefinition(processDefinition)
        setTab(0)
    }

    const handleChangeFile = async (event) => {
        let formData = new FormData();
        let blob = new Blob([event.target.files[0]], { type: "text/xml"});
        formData.append('data', blob, event.target.files[0].name);

        await dispatch(await camundaDeployment(formData));
        await dispatch(await camundaProcessDefinitionApi());
    }

    const renderTab = () => {
        switch (tab)
        {
            case 0: return <Task processDefinition={processDefinition} setTab={setTab} setTask={setTask}/>;
            case 1: return <ReviewTicket task={task} currentProcess={diagram} setTab={setTab}/>
            default: return null;
        }
    }



    return (
        <div className='container-fluid'>
            <div className='row m-3'>
                <div className='col-md-4'>
                    <div className="card m-5">
                        <div className="card-body">
                            <form>
                                <input type="file" name="file" onChange={handleChangeFile}/>
                            </form>
                        </div>
                    </div>

                    <ul className="list-group">
                        { processDefinitionXml.map((item, index) => {
                            const process = processDefinitions.find((_item) => _item.id === item.id );
                            return (
                                <li key={index} className={`list-group-item ${ diagram.id === item.id ? 'bg-active' : '' }`}>
                                    <div className='row'>
                                        <div className='col-md-4 m-auto'>
                                            <h6>
                                                { item.name } - version: { process.version }
                                            </h6>
                                            <button type="button" className="btn btn-primary" onClick={() => { handleOnClickBPMN(item,  process) }}>Detail</button>
                                        </div>
                                        <div className='col-md-8'>
                                            <DrawDiagram
                                                item={item}
                                            />
                                        </div>
                                    </div>

                                </li>
                            )
                        }) }
                    </ul>
                </div>
                <div className='col-md-8'>
                    <div className="position-sticky">
                        { isShowTable ? renderTab() : '' }
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ManagerGroup;