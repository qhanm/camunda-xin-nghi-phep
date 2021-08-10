import React, {Component, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {camundaTaskListApi} from "../../services/camunda";

const Task = ({processDefinition, ...props}) => {

    const { currentTenant, processDefinitions, processDefinitionXml, tasks } = useSelector(state => state.CamundaReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        const loadTask = async () => {
            await dispatch(await camundaTaskListApi({
                assignee: currentTenant.id,
                processDefinitionId: processDefinition?.id
            }))
        }

        loadTask();
    }, [processDefinition])

    return (
        <table className='table'>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Diagram</th>
                <th>Created</th>
                <th>Detail</th>
            </tr>
            </thead>
            <tbody>
            { tasks.map((task, index) => {

                let diagram = processDefinitions.find((pro) => pro.id === task.processDefinitionId)
                return (
                    <tr key={index}>
                        <td>{ index + 1 }</td>
                        <td>{ task.name }</td>
                        <td>{ diagram?.name }</td>
                        <td>{ task.created }</td>
                        <td>
                            <button type='button' className='btn btn-primary btn-sm' onClick={() => {
                                props.setTab(1);
                                props.setTask(task);
                            }}>Detail</button>
                        </td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    );
}

export default Task;