import React, {Component} from 'react';
import { connect } from "react-redux";
import {DOMAIN} from "../constants/GlobalSetting";

class Task extends Component {

    state = {
        formKey: this.props.formKey,
        taskId: 'd9b8b16d-e556-11eb-9933-9ead97ddbdcd',
        deploymentId: this.props.deploymentId,
        task: [],
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(nextProps.formKey !== prevState.formKey || nextProps.deploymentId !== prevState.deploymentId){
            return {
                ...prevState,
                formKey: nextProps.formKey,
                deploymentId: nextProps.deploymentId
            }
        }else{
            return null;
        }
    }

    componentDidMount() {
        this.loadTask();
    }

    loadTask = () => {
        let response = fetch(`/engine-rest/task?processDefinitionId=${this.state.deploymentId}&sortBy=created&sortOrder=desc`, {
            method: 'get',
        })

        response.then(r => {
            r.json().then(json => {
                console.log('json task list',json)
                this.setState({
                    ...this.state,
                    task: json ? json : [],
                })
            })
        })
    }

    handleComplete = (id) => {
        let response = fetch(`${DOMAIN}task/${id}/complete`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                variables: {
                    approved: {value: true},
                    name: {value: 'quach hoai nam'},
                    email: { value: 'qhnam.66@gmail.com' },
                    age: { value: 15 },
                }
            })
        })

        response.then(r => {
           this.loadTask()
            alert('Completed success')
        }).catch(err => {
            console.log(err)
        })
    }

    getTaskDetail = (id) => {
        try{
            let response =  fetch(`${DOMAIN}task/${id}/form-variables?variableNames=name,email,age`, {
                method: 'get',
            })

            response.then(res=>{
                res.json().then(json => {
                    console.log(json)
                })
            })

        }catch (err) {
            console.log('error', err)
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="card m-5">
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr><th>Id</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.state.task.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                    <td>{ item.created }</td>
                                    <td>
                                        <button type="buton" onClick={() => { this.handleComplete(item.id) }}>
                                            Completed
                                        </button>
                                        <button type="button" onClick={() => this.getTaskDetail(item.id)}>Show detail</button>
                                    </td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        formKey: state.TaskReducer.deployment.key,
        deploymentId: state.TaskReducer.deployment.id,
    }
}

export default connect(mapStateToProps, null) (Task);