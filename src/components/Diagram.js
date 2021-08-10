import React from 'react';
import { connect } from "react-redux";
import Viewer from 'bpmn-js/lib/NavigatedViewer';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import {DOMAIN} from "../constants/GlobalSetting";

class Diagram extends React.Component {
    constructor(props) {
        super(props);

        this.viewer = new Viewer({
            canvas: {
                deferUpdate: false
            },
        });

        this.state = {
            loaded: false,
            deploymentId: this.props.deploymentId,
            processDefinitions: this.props.processDefinitions,
        };
    }

    storeContainer = container => {
        this.container = container;
    }

    handleChooseDiagram = (definitionId, activityInstanceId) => {
        this.viewer.attachTo(this.container);

        let response = fetch(`${DOMAIN}process-definition/${this.state.deploymentId}/xml`,{
            method: 'get',
        })
        response.then((res) => {
            res.json().then(json => {
                let xml = json.bpmn20Xml
                //console.log(xml)
                this.importXML(xml, definitionId, activityInstanceId);
            })
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card m-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <ul className="list-group">
                                    { this.state.processDefinitions.map((item, index) => {
                                        return (
                                            <li
                                                onClick={() => { this.handleChooseDiagram(item.definitionId, item.id) }}
                                                key={index}
                                                className="list-group-item"
                                                style={{cursor: 'pointer'}}
                                            >{ item.data.taskName }</li>
                                        )
                                    }) }
                                </ul>
                            </div>
                            <div className="col-md-8">
                                <div className='' style={{
                                    height: '700px',
                                    width: '100%'
                                }} ref={this.storeContainer}>
                                    {this.state.loaded && this.props.children && React.cloneElement(this.props.children, { viewer: this.viewer })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if(prevProps.xml !== this.props.xml) {
            this.setState({loaded: false});
            this.importXML(this.props.xml);
        }
    }

    importXML(xml, definitionId, activityInstanceId) {
        this.viewer.importXML(xml, (err) => {
            const canvas = this.viewer.get('canvas');
            canvas.resized();
            canvas.zoom('fit-viewport', 'auto');
            let overlays = this.viewer.get('overlays');

            // this.loadDefinitionStatic(definitionId).then(data => {
            //     if(data.length)
            //     {
            //         for (let i = 0; i < data.length; i++)
            //         {
            //             overlays.add(data[i].id, {
            //                 position: {
            //                     bottom: 30,
            //                     left: 10
            //                 },
            //                 html: `<div style="
            //            height: 25px;
            //           width: 25px;
            //           background-color: red;
            //           border-radius: 50%;
            //           display: inline-block;
            //           text-align: center;
            //     ">${1}</div>`
            //             })
            //         }
            //     }else{
            //         overlays.add('end_process', {
            //             position: {
            //                 bottom: 30,
            //                 left: 5
            //             },
            //             html: `<div style="
            //                height: 25px;
            //               width: 25px;
            //               background-color: red;
            //               border-radius: 50%;
            //               display: inline-block;
            //               text-align: center;
            //             ">${1}</div>`
            //         })
            //     }
            //
            //
            //
            //     let elements = overlays?._elementRegistry?._elements;
            //     // if(elements)
            //     // {
            //     //     for (let property in elements){
            //     //         console.log(property)
            //     //     }
            //     // }
            // })

            this.loadActivityInstance(activityInstanceId).then(data => {
                let instance = data.childActivityInstances;

                if(instance?.length)
                {
                    for(let i = 0; i < instance.length; i++)
                    {
                        overlays.add(instance[i].activityId, {
                            position: {
                                bottom: 30,
                                left: 10
                            },
                            html: `<div>
                            <i class="far fa-check-circle" style="color:red; font-size: 1.5em;" /> 
                        </div>`
                        })
                    }
                }else{
                    overlays.add('end_process', {
                                    position: {
                                        bottom: 30,
                                        left: 5
                                    },
                                    html: `<div><i class="far fa-check-circle" style="color:red; font-size: 1.5em;" /> </div>`
                                })
                }
            })

            this.setState({loaded: true});
        });
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(nextProps.deploymentId !== prevState.deploymentId){
            return {
                ...prevState,
                deploymentId: nextProps.deploymentId
            }
        }else if(nextProps.processDefinitions !== prevState.processDefinitions){
            return {
                ...prevState,
                processDefinitions: nextProps.processDefinitions,
            }
        } else{
            return null;
        }
    }

    loadDiagram = async () => {
        let response = await fetch(`${DOMAIN}process-definition/${this.state.deploymentId}/xml`,{
            method: 'get',
        })

        return await response.json();
    }

    loadDefinitionStatic = async (definitionId) => {
        let response = await fetch(`${DOMAIN}process-definition/${ definitionId }/statistics`, {method: 'get'});
        return await response.json();
    }

    loadActivityInstance = async (processInstanceId) => {
        let response = await fetch(`${DOMAIN}process-instance/${processInstanceId}/activity-instances`)
        return await response.json();
    }


    componentDidMount() {

    }
}

const mapStateToProps = (state) => {
    return {
        deploymentId: state.TaskReducer.deployment.id,
        processDefinitions: state.TaskReducer.processDefinitions
    }
}

export default connect(mapStateToProps, null) (Diagram);