import React, {Component} from 'react';
import { connect } from "react-redux";
import {DOMAIN} from "../constants/GlobalSetting";

class TestDiagram extends Component {
    state = {
        html: ''
    }
    componentDidMount() {
        let response = fetch(`${DOMAIN}process-definition/${this.props.deploymentId}/rendered-form`, {
            method: 'get',
        })

        response.then((res) => {
            res.json().then((json) => {
                console.log(json)
                // this.setState({
                //     html: json
                // })
            })
        })

    }

    render() {
        console.log(this.state.html)
        return (
            <div>
                { this.state.html }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deploymentId: state.TaskReducer.deployment.id
    }
}

export default connect(mapStateToProps, null)(TestDiagram);