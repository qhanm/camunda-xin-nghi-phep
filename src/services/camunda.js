import {DOMAIN} from "../constants/GlobalSetting";
import {
    camundaDeploymentAction,
    camundaFormVariableAction,
    camundaProcessDefinitionAction, camundaProcessDefinitionXmlAction, camundaTaskListAction, camundaTenantAction
} from "../redux/actions/CamundaAction";
import queryString from 'query-string';
import axios from "axios";
import {processDefinitionPushItemAction} from "../redux/actions/TaskAction";

export const camundaDeployment = async (formData) => {
    return async (dispatch) => {
        try{
            let response =  await fetch(`${DOMAIN}/deployment/create`, {
                method: 'post',
                body: formData,
            })

            response.json().then((data) => {
                dispatch(camundaDeploymentAction(data));
            })

            alert('Deployment success');
        }catch (error){
            console.log(error)
        }
    }
}

export const camundaDeploymentWithTenantApi = async (tenantId, formData) => {
    return async (dispatch) => {
        try{
            let response = await fetch(`http://localhost:3002/engine-rest/deployment/create`, {
                method: 'post',
                body: formData,
            })


            response.json().then((data) => {
                dispatch(camundaDeploymentAction(data));
                alert('Deployment success');
            })

        }catch (error){
            console.log(error)
        }
    }
}

export const camundaGetFormVariable = async (processDefinition_deployedProcessDefinitions_id) => {
    return async (dispatch) => {
        try{
            let response =  await fetch(`${DOMAIN}/process-definition/${processDefinition_deployedProcessDefinitions_id}/form-variables`, {
                method: 'get',
            })

            response.json().then((data) => {
                dispatch(camundaFormVariableAction(data));
            })
        }catch (error){
            console.log(error)
        }
    }
}

export const camundaProcessDefinitionApi = async () => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/process-definition?latestVersion=true`, { method:'get' });

        response.json().then((res) => {
            try{
                if(res.length > 0){
                    dispatch(camundaProcessDefinitionAction(res));
                    res.forEach( async (item) => {
                        await dispatch(await camundaProcessDefinitionXmlApi(item.id, item.name));
                    })
                }
            }catch (err){
                console.log(err)
            }
        })
    }
}

export const camundaProcessDefinitionWithTenantApi = async (tenantId) => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/process-definition?latestVersion=true&tenantIdIn=${tenantId}`, { method:'get' });

        response.json().then((res) => {
            try{
                if(res.length > 0){
                    dispatch(camundaProcessDefinitionAction(res));
                    res.forEach( async (item) => {
                        await dispatch(await camundaProcessDefinitionXmlApi(item.id, item.name));
                    })
                }
            }catch (err){
                console.log(err)
            }
        })
    }
}

export const camundaProcessDefinitionXmlApi = async (deploymentId, name = '') => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/process-definition/${deploymentId}/xml`, { method: 'get' });

        response.json().then((res) => {
            res.name = name
            dispatch(camundaProcessDefinitionXmlAction(res));
        })

    }
}

export const camundaProcessDefinitionStartApi = async (deployedProcessDefinitions_deploymentId, data) => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/process-definition/key/${deployedProcessDefinitions_deploymentId}/start`, {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        })

        response.json().then((data) => {
            alert('Create task success');
        })
    }
}

export const camundaProcessDefinitionStartWithTenant = async (processDefinitionKey, tenantId, data) => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/process-definition/key/${processDefinitionKey}/tenant-id/${tenantId}/start`, {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        })

        response.json().then((data) => {
            alert('Create task success');
        })
    }
}

export const camundaTenantListApi = async (tenantGroup = '') => {
    return async (dispatch) => {

        let url = `${DOMAIN}/tenant`;

        if(tenantGroup){
            url += `?groupMember=${tenantGroup}`
        }
        let response = await fetch(url, { method: 'get' });

        response.json().then((data) => {
            dispatch(camundaTenantAction(data));
        })
    }
}

export const camundaTenantListNotReducerApi = (tenantGroup = '') => {
    let url = `${DOMAIN}/tenant`;

    if(tenantGroup){
        url += `?groupMember=${tenantGroup}`
    }
    let response = fetch(url, { method: 'get' });
    return  response;
}

export const camundaTaskListApi = async (objParams = {}) => {
    return async (dispatch) => {
        let response = await fetch(`${DOMAIN}/task?${queryString.stringify(objParams)}`, { method: 'get' });

        response.json().then((res) => {
            dispatch(camundaTaskListAction(res));
        })
    }
}

export const camundaTaskListNotReducerApi =  (objParams = {}) => {
    let response = fetch(`${DOMAIN}/task?${queryString.stringify(objParams)}`, { method: 'get' });
    return response;
}

export const camundaVariableInstanceApi = async (processInstanceIdIn) => {
    return await  fetch(`${DOMAIN}/variable-instance?processInstanceIdIn=${processInstanceIdIn}`, {method: 'get'})
}

export const camundaTaskCompleteApi = async (data, taskId) => {
    try{
        let response = await fetch(`${ DOMAIN }/task/${taskId}/complete`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        alert('success')
    }catch (err) {
        alert('Error');
    }
}
