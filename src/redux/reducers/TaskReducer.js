import {DEPLOYMENT_FILE, PROCESS_DEFINITION_PUSH_ITEM} from "../types/TaskType";

const initial = {
    deployment: {
        deploymentId: '',
        id: '',
        key: '',
        source: '',
        name: '',
    },
    processDefinitions: []
}

const TaskReduce = (state = initial, action) =>
{
    switch (action.type)
    {
        case DEPLOYMENT_FILE:
        {
            return {...state, deployment: action.deployment }
        }
        case PROCESS_DEFINITION_PUSH_ITEM:
        {
            let newProcess = [...state.processDefinitions];

            newProcess.push(action.item);

            return {...state, processDefinitions: newProcess}
        }
        default: break;
    }

    return {...state}
}

export default TaskReduce;