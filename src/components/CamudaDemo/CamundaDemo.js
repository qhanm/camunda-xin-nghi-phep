import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {camundaTenantCurrentAction, camundaTenantGroupAction} from "../../redux/actions/CamundaAction";
import { withRouter } from "react-router-dom";
import {camundaTenantListNotReducerApi} from "../../services/camunda";

const CamundaDemo = (props) => {
    const dispatch = useDispatch();

    const { tenants,
        tenantGroup,
        processDefinitionXml,
        processDefinitions
    } = useSelector(state => state.CamundaReducer);

    const [userGroup, setUserGroup] = useState([]);
    const [managerGroup, setManagerGroup] = useState([]);

    const handleOnClick = (tenantGroup, tenant) => {
        dispatch(camundaTenantGroupAction(tenantGroup));
        dispatch(camundaTenantCurrentAction(tenant))
        props.history.push(`/camunda-demo/${tenantGroup}`)
    }

    useEffect(() => {
        let response1 = camundaTenantListNotReducerApi('usergroup');
        response1.then((res) => {
            res.json().then((data) => {
                setUserGroup(data)
            })
        })

        let response2 = camundaTenantListNotReducerApi('mamagergroup');
        response2.then((res) => {
            res.json().then((data) => {
                setManagerGroup(data)
            })
        })
    }, [])

    return (
        <div className='container m-5'>
            <div className='row'>
                <div className='col-4'>
                    <div className="card">
                            <div className="card-body" style={{ minHeight: '200px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h5 className="card-title">User Group</h5>

                                <ul className="list-group">
                                    { userGroup.map((tenant, index) => {
                                        return (
                                            <li key={index} className="list-group-item" style={{ cursor: 'pointer' }} onClick={() => {
                                                handleOnClick('usergroup', tenant)
                                            }}>
                                                { tenant.name }
                                            </li>
                                        )
                                    }) }
                                </ul>
                            </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className="card">
                        <div className="card-body" style={{ minHeight: '200px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h5 className="card-title">Manager Group</h5>
                            <ul className="list-group">
                                { managerGroup.map((tenant, index) => {
                                    return (
                                        <li key={index} className="list-group-item" style={{ cursor: 'pointer' }} onClick={() => {
                                            handleOnClick('managergroup', tenant)
                                        }}>
                                            { tenant.name }
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CamundaDemo);