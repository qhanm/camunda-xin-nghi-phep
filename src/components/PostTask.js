import React, {Component} from 'react';
import { connect } from "react-redux";
import {processDefinitionPushItemAction} from "../redux/actions/TaskAction";
import {DOMAIN} from "../constants/GlobalSetting";

class PostTask extends Component {
    state = {
        formKey: this.props.formKey,
        taskId: 'b5223743-e543-11eb-9933-9ead97ddbdcd',
        name: 'quach hoai nam',
        email: 'qhnam.66@gmail.com',
        taskName: 'Task 01',
        age: 15,
        processDefinitions: this.props.processDefinitions,
    }

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        if(nextProps.formKey !== prevState.formKey){
            return {
                ...prevState,
                formKey: nextProps.formKey,
            }
        }else if(nextProps.processDefinitions !== prevState.processDefinitions){
            return {
                ...prevState,
                processDefinitions: nextProps.processDefinitions
            }
        }else{
            return null;
        }
    }

    // postProcessInstance
    handleSubmit = (e) => {
        e.preventDefault();

        let response = fetch(`${DOMAIN}/process-definition/key/${this.state.formKey}/start`, {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                variables: {
                    name: {value: this.state.name},
                    email: { value: this.state.email },
                    age: { value: this.state.age },
                    taskName: { value: this.state.taskName }
                }

            })
        })

        response.then((r) => {
            r.json().then(json => {
                alert('create task success')
                console.log('json create', json);
                this.props.handlePushItem({
                    definitionId:  json.definitionId,
                    id: json.id,
                    data: {
                        name: this.state.name,
                        email: this.state.email,
                        age: this.state.age,
                        taskName: this.state.taskName,
                    }
                });
            })
        })
    }

    render() {

        return (
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input value={this.state.taskName} type="text" onChange={this.handleOnChange} name="taskName" className="form-control" placeholder="Enter task name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input value={this.state.name} type="text" onChange={this.handleOnChange} name="name" className="form-control" placeholder="Enter name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input value={this.state.email} type="text" onChange={this.handleOnChange}  name="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Age</label>
                                <input type="text" value={this.state.age} onChange={this.handleOnChange}  name="age" className="form-control" placeholder="Enter age" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        formKey: state.TaskReducer.deployment.key,
        processDefinitions: state.TaskReducer.processDefinitions,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handlePushItem: (item) => {
            dispatch(processDefinitionPushItemAction(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PostTask);