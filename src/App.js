import Deployment from "./components/Deployment";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import Task from "./components/Task";
import PostTask from "./components/PostTask";
import Diagram from "./components/Diagram";
import TestDiagram from "./components/TestDiagram";
import CamundaDemo01 from "./components/CamundaDemo01/CamundaDemo01";
import ProcessList from "./components/CamundaDemo01/ProcessList";
import CreateTask from "./components/CamundaDemo01/CreateTask";
import Tenant from "./components/CamundaDemo01/Tenant";
import CamundaDemo from "./components/CamudaDemo/CamundaDemo";
import UserGroupPage from "./components/CamudaDemo/UserGroupPage";
import ManagerGroup from "./components/CamudaDemo/ManagerGroup";
import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Route path={'/deployment'} exact component={ Deployment }/>
                <Route path={'/tasks'} exact component={ Task }/>
                <Route path={'/create-task'} exact component={ PostTask }/>
                <Route path={'/diagram'} exact component={ Diagram }/>
                {/*<Route path={'/test-diagram'} exact component={ TestDiagram }/>*/}
                <Route path={'/so-do-xin-nghi-phep'} exact component={ CamundaDemo01 }/>
                <Route path={'/tenants'} exact component={ Tenant }/>
                <Route path={'/diagram/create-task'} exact component={ CreateTask }/>
                <Route path={'/camunda-demo'} exact component={ CamundaDemo }/>
                <Route path={'/camunda-demo/usergroup'} exact component={ UserGroupPage }/>
                <Route path={'/camunda-demo/managergroup'} exact component={ ManagerGroup }/>
            </BrowserRouter>
        </div>
    );
}

export default App;
