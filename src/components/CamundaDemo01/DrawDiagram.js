import React from 'react';

import Viewer from 'bpmn-js/lib/NavigatedViewer';
import { withRouter } from "react-router-dom";

class DrawDiagram extends React.Component {
    constructor(props) {
        super(props);

        this.viewer = new Viewer({
            canvas: {
                deferUpdate: false
            }
        });

        this.state = {
            loaded: false
        };

        console.log(this.props.item)
    }

    storeContainer = container => {
        this.container = container;
    }

    render() {

        return (
            <div className='BPMNDiagram' style={{ width: '100%', height: '500px'}} ref={this.storeContainer}>
                {this.state.loaded && this.props.children && React.cloneElement(this.props.children, { viewer: this.viewer })}
            </div>
        );
    }

    componentDidUpdate(prevProps, aaa, aaaa) {
        if(prevProps.item.xml !== this.props.item.xml) {
            this.setState({loaded: false});
            this.importXML(this.props.item.xml);
        }
    }

    importXML(xml) {
        this.viewer.importXML(xml, () => {
            const canvas = this.viewer.get('canvas');

            canvas.resized();
            canvas.zoom('fit-viewport', 'auto');

            if(this.props.activity){

                let overlays = this.viewer.get('overlays');
                console.log(this.props.item)
                overlays.add(this.props.activity, {
                    position: {
                        bottom: 30,
                        left: 10
                    },
                    html: `<div>
                            <i class="far fa-check-circle" style="color:red; font-size: 1.5em;" />
                        </div>`
                })
            }


            var eventBus = this.viewer.get('eventBus');

            var events = [
                'element.click',
            ];

            events.forEach(function(event) {

                eventBus.on(event, function(e) {
                    // e.element = the model element
                    // e.gfx = the graphical element

                    console.log(event, 'on', e.element);
                });
            });

            this.setState({loaded: true});
        });
    }

    componentDidMount() {
        this.viewer.attachTo(this.container);

        this.importXML(this.props.item.xml);
    }
}

export default withRouter(DrawDiagram);
