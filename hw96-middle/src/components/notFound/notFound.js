import React from 'react';
import BasePane from "../panes";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

export default class NotFound extends React.Component {
    render() {
        return (<BasePane>
            <Button><Link to='/'>Click for return</Link></Button>
        </BasePane>)
    }
}