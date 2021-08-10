import {
    CAMUNDA_SET_CURRENT_PROCESS, CAMUNDA_SET_CURRENT_TENANT,
    CAMUNDA_SET_DEPLOYMENT,
    CAMUNDA_SET_FORM_VARIABLE,
    CAMUNDA_SET_PROCESS_DEFINITION,
    CAMUNDA_SET_PROCESS_DEFINITION_XML, CAMUNDA_SET_TASK_LIST, CAMUNDA_SET_TENANT, CAMUNDA_SET_TENANT_GROUP
} from "../types/CamundaType";

const stateDefault = {
    processDefinition: {
        category: "",
        deploymentId: "",
        description: null,
        diagram: null,
        historyTimeToLive: null,
        id: "",
        key: "",
        name: "",
        resource: "",
        startableInTasklist: true,
        suspended: false,
        tenantId: null,
        version: 0,
        versionTag: null,
    },
    formVariables: [],
    processDefinitions: [],
    processDefinitionXml: [],
    currentProcess: {
        xml: '',
        name: '',
        id: '',
    },
    tenants: [],
    currentTenant: {
        id: '',
        name: '',
    },
    tasks: [],
    tenantGroup: '',
}

export const CamundaReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case CAMUNDA_SET_DEPLOYMENT: {
            let newState = {...state};
            return newState;
        }
        case CAMUNDA_SET_FORM_VARIABLE:

            let newState = {...state};

            for (let property in action.data) {
                newState.formVariables[property] = action.data[property];
            }

            return newState;

        case CAMUNDA_SET_PROCESS_DEFINITION:
            return {...state, processDefinitions: action.data, processDefinitionXml: []};

        case CAMUNDA_SET_PROCESS_DEFINITION_XML:
            let newProcessDefinitionXml = [...state.processDefinitionXml];
            let index = state.processDefinitionXml.findIndex(item => item.id === action.data.id)
            if (index !== -1) {
                newProcessDefinitionXml[index].xml = action.data.bpmn20Xml;
                newProcessDefinitionXml[index].name = action.data.name;
            } else {
                newProcessDefinitionXml.push({
                    id: action.data.id,
                    xml: action.data.bpmn20Xml,
                    name: action.data.name
                })
            }
            return {...state, processDefinitionXml: newProcessDefinitionXml};

        case CAMUNDA_SET_CURRENT_PROCESS: {
            let processDefinition = state.processDefinitions.find((item) => item.id === action.data.id)

            return {...state, currentProcess: action.data, processDefinition: processDefinition};
        }

        case CAMUNDA_SET_TENANT:
        {
            return {...state, tenants: action.data}
        }

        case CAMUNDA_SET_CURRENT_TENANT:
        {
            return {...state, currentTenant: action.data};
        }

        case CAMUNDA_SET_TASK_LIST: {
            return { ...state, tasks: action.data };
        }

        case CAMUNDA_SET_TENANT_GROUP: {
            return {...state, tenantGroup: action.data};
        }
        default:
            return {...state}
    }
}