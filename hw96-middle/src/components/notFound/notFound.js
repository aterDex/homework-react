import React from 'react';
import BasePane from "../panes";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

export default class NotFound extends React.Component {
    render() {
        return (<BasePane>
            <div className="d-flex justify-content-center"><Button><Link to='/'>Not found, click for return</Link></Button></div>
        </BasePane>)
    }
}