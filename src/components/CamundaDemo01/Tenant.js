import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {camundaTenantListApi} from "../../services/camunda";
import { camundaTenantCurrentAction} from "../../redux/actions/CamundaAction";
import Task from "./Task";
import ReviewTask from "./ReviewTask";

const Tenant = () => {

    const dispatch = useDispatch();
    const { tenants, currentTenant } = useSelector(state => state.CamundaReducer);
    const [tab, setTab] = useState(0);
    const [task, setTask] = useState({});

    useEffect( () => {
        const loadTenant = async () => {
            await dispatch(await camundaTenantListApi());
        }
        loadTenant();
    }, [])

    const handleClickTenant = (item) => {
        dispatch(camundaTenantCurrentAction(item));
        setTab(0);
    }

    const renderTab = () => {
        switch (tab)
        {
            case 0: return <Task setTab={setTab} setTask={setTask}/>
            case 1: return <ReviewTask task={task}/>
            default: return null;
        }
    }

    return (
        <div className='container-fluid mt-3'>
            <div className='row'>
                <div className='col-md-4'>
                    <ul className="list-group">
                        { tenants.map((tenant, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`list-group-item ${ tenant.id === currentTenant.id ? 'active' : '' }`}
                                    onClick={() => {handleClickTenant(tenant)}}
                                    style={{cursor: 'pointer'}}
                                >{ tenant.name }</li>
                            )
                        }) }
                    </ul>
                </div>
                <div className='col-md-8'>
                    { currentTenant.id ? (
                        renderTab()
                    ) : '' }
                </div>
            </div>
        </div>
    );
}

export default Tenant;