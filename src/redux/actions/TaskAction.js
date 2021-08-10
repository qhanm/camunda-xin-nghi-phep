import {DEPLOYMENT_FILE, PROCESS_DEFINITION_PUSH_ITEM} from "../types/TaskType";

export const deploymentFileAction = (deployment) => {
    return {
        type: DEPLOYMENT_FILE,
        deployment
    }
}

export const processDefinitionPushItemAction = (item) => {
    return {
        type: PROCESS_DEFINITION_PUSH_ITEM,
        item
    }
}