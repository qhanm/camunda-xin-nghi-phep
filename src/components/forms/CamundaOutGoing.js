export function CamundaOutGoing(xml, arrInComing = [], result) {
    let listOutGoing = xml.getElementsByTagName('bpmn:outgoing');
    let resultOutComing = [];
    for(let indexOutGoing = 0; indexOutGoing < listOutGoing.length; indexOutGoing++)
    {
        for(let indexInputComing = 0; indexInputComing < arrInComing.length; indexInputComing++)
        {
            if(arrInComing[indexInputComing] === listOutGoing[indexOutGoing].firstChild.nodeValue){
                let tagName = listOutGoing[indexOutGoing].parentNode.tagName;
                if(['bpmn:parallelGateway'].includes(tagName)){
                    let xmlInComingGetway = listOutGoing[indexOutGoing].parentNode.getElementsByTagName('bpmn:incoming');
                    if(xmlInComingGetway.length > 0){
                        let _arrComing = [];
                        for(let i = 0; i < xmlInComingGetway.length; i++){
                            _arrComing.push(xmlInComingGetway[i].firstChild.nodeValue);
                        }

                        CamundaOutGoing(xml, _arrComing, result);
                    }

                }
                else if(['bpmn:userTask'].includes(tagName))
                {

                    let xmlUserTask = listOutGoing[indexOutGoing].parentNode;

                    let __index = result.findIndex((item) => item.id === xmlUserTask.getAttribute("id"));
                    if(__index === -1){

                        let formData = xmlUserTask.getElementsByTagName('camunda:formData');
                        if(formData.length > 0){
                            formData = formData[0];
                        }

                        result.push({
                            id: xmlUserTask.getAttribute("id"),
                            form: formData,
                            name: xmlUserTask.getAttribute("name")
                        })
                    }



                    if(xmlUserTask.getElementsByTagName('bpmn:incoming').length > 0){

                        let _arrComing = [];
                        for(let i = 0; i < xmlUserTask.getElementsByTagName('bpmn:incoming').length; i++){
                            _arrComing.push(xmlUserTask.getElementsByTagName('bpmn:incoming')[i].firstChild.nodeValue);
                        }

                        CamundaOutGoing(xml, _arrComing, result);
                    }
                }
                else if(['bpmn:startEvent'].includes(tagName))
                {
                    let __index = result.findIndex((item) => item.id === 'node_01');
                    if(__index === -1){

                        let formData = listOutGoing[indexOutGoing].parentNode.getElementsByTagName('camunda:formData');
                        if(formData.length > 0){
                            formData = formData[0];
                        }

                        result.push({
                            id: 'node_01',
                            name: 'Biểu mẫu xin nghĩ phép',
                            form: formData
                        })
                    }


                }
            }
        }
    }

}