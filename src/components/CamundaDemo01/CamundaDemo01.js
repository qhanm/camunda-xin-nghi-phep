import React, {Component, useState} from 'react';
import Deployment from "./Deployment";
import CreateTask from "./CreateTask";
import QuanLyDuyet from "./QuanLyDuyet";
import HRDuyet from "./HRDuyet";
import ThongBao from "./ThongBao";

const CamundaDemo01 = () => {

    const [tab, setTab] = useState(0);

    const renderTab = () => {
        switch (tab) {
            case 0: return <Deployment setTab={setTab}/>
            case 1: return <CreateTask />
            case 2: return <QuanLyDuyet />
            case 3: return <HRDuyet />
            case 4: return <ThongBao />
        }
    }

    return (
        <div className='container-fluid mt-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <ul className="nav nav-pills nav-fill flex-column">
                        <li className="nav-item" onClick={() => { setTab(0) }}>
                            <a className={`nav-link ${ tab === 0 ? 'active' : '' }`}>Deployment BPMN</a>
                        </li>
                        <li className="nav-item" onClick={() => { setTab(1) }}>
                            <a className={`nav-link ${ tab === 1 ? 'active' : '' }`}>Tạo đơn</a>
                        </li>
                        <li className="nav-item" onClick={() => { setTab(2) }}>
                            <a className={`nav-link ${ tab === 2 ? 'active' : '' }`}>Quan ly duyet</a>
                        </li>
                        <li className="nav-item" onClick={() => { setTab(3) }}>
                            <a className={`nav-link ${ tab === 3 ? 'active' : '' }`}>Hr duyet</a>
                        </li>
                        <li className="nav-item" onClick={() => { setTab(4) }}>
                            <a className={`nav-link ${ tab === 4 ? 'active' : '' }`}>Thông báo xét duyệt</a>
                        </li>
                    </ul>
                </div>
                <div className='col-md-9'>
                    { renderTab() }
                </div>
            </div>
        </div>
    )
}

export default CamundaDemo01;