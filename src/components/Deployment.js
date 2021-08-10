import React, {Component} from 'react';
import { connect } from "react-redux";
import {deploymentFileAction} from "../redux/actions/TaskAction";

class Deployment extends Component {

    state = {
        file: {},
        deployment: this.props.deployment,
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(nextProps.deployment !== prevState.deployment){
            return {
                ...prevState,
                deployment: nextProps.deployment,
            }
        }else{
            return null;
        }
    }

    handleChangeFile = (event) => {

        let formData = new FormData();
        let blob = new Blob([event.target.files[0]], { type: "text/xml"});

        formData.append('data', blob, event.target.files[0].name);
        //formData.append('tenant-id', 'tenantTwo')
        let response = fetch('/engine-rest/deployment/create',{
            method: 'post',
            body: formData,
            headers: {
                Accept: "application/json",
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            }
        })

        response.then((r) => {
            if(r.status === 200)
            {
                r.json().then(json => {
                    console.log('deploymentObject', json)
                    let property = Object.keys(json.deployedProcessDefinitions)[0]
                    let deploymentObject = json.deployedProcessDefinitions[property];
                    this.setState({ deployment: json })
                    this.props.handleDeploymentFile({
                        deploymentId: json.id,
                        id: deploymentObject.id,
                        key: deploymentObject.key,
                        source: deploymentObject.resource,
                        name: deploymentObject.name,
                    })

                    alert('deployment success');
                })
            }else {
                r.json().then(json => {
                    console.log(json)
                })

            }


        })

        response.catch((err) => {
            console.log(err)
        })


    }

    render() {
        console.log('state', this.state.deployment)
        return (
            <div className="card m-5">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <input type="file" name="file" onChange={this.handleChangeFile}/>
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deployment: state.TaskReducer.deployment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDeploymentFile: (deployment) => {
            dispatch(deploymentFileAction(deployment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);