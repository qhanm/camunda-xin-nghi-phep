import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {camundaTaskListNotReducerApi} from "../../services/camunda";

const ListTicket = ({ diagram, ...props}) => {

    const dispatch = useDispatch();
    const {currentTenant} = useSelector(state => state.CamundaReducer);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        let params = {
            tenantIdIn: currentTenant.id,
            processDefinitionId: diagram.id,
        }

        let response = camundaTaskListNotReducerApi(params);
        response.then((res) => {
            res.json().then((data) => {
                setTasks(data);
            })
        })
    }, [diagram])

    return (
        <div>
            <h3 className='text-center mt-3 mb-3'>List ticket</h3>
        </div>
    );
}

export default ListTicket;