import {DOMAIN} from "../../constants/GlobalSetting";
import {
    CAMUNDA_SET_CURRENT_PROCESS, CAMUNDA_SET_CURRENT_TENANT,
    CAMUNDA_SET_DEPLOYMENT,
    CAMUNDA_SET_FORM_VARIABLE,
    CAMUNDA_SET_PROCESS_DEFINITION,
    CAMUNDA_SET_PROCESS_DEFINITION_XML, CAMUNDA_SET_TASK_LIST, CAMUNDA_SET_TENANT, CAMUNDA_SET_TENANT_GROUP
} from "../types/CamundaType";

export const camundaDeploymentAction = (data) => {
    return {
        type: CAMUNDA_SET_DEPLOYMENT,
        data
    }
}

export const camundaFormVariableAction = (data) => {
    return {
        type: CAMUNDA_SET_FORM_VARIABLE,
        data,
    }
}

export const camundaProcessDefinitionAction = (data) => {
    return {
        type: CAMUNDA_SET_PROCESS_DEFINITION,
        data,
    }
}

export const camundaProcessDefinitionXmlAction = (data) => {
    return {
        type: CAMUNDA_SET_PROCESS_DEFINITION_XML,
        data,
    }
}

export const camundaCurrentProcessAction = (data) => {
    return {
        type: CAMUNDA_SET_CURRENT_PROCESS,
        data
    }
}

export const camundaTenantAction = (data) => {
    return {
        type: CAMUNDA_SET_TENANT,
        data,
    }
}

export const camundaTenantCurrentAction = (data) => {
    return {
        type: CAMUNDA_SET_CURRENT_TENANT,
        data
    }
}

export const camundaTaskListAction = (data) => {
    return {
        type: CAMUNDA_SET_TASK_LIST,
        data,
    }
}

export const camundaTenantGroupAction = (data) => {
    return {
        type: CAMUNDA_SET_TENANT_GROUP,
        data
    }
}