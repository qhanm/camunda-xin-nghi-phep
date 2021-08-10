import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to={'/deployment'} className="nav-link" href="#">Deployment</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/tasks'} className="nav-link" href="#">Task</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/create-task'} className="nav-link" href="#">Create task</NavLink>
                        </li>

                        {/*<li className="nav-item">*/}
                        {/*    <NavLink to={'/diagram'} className="nav-link" href="#">Diagram</NavLink>*/}
                        {/*</li>*/}

                        {/*<li className="nav-item">*/}
                        {/*    <NavLink to={'/test-diagram'} className="nav-link" href="#">Test Diagram</NavLink>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink to={'/so-do-xin-nghi-phep'} className="nav-link" href="#">Camunda 01</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={'/tenants'} className="nav-link" href="#">Tenants</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/camunda-demo'} className="nav-link" href="#">Camunda Demo</NavLink>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Header;