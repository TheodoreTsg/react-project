import React, { Component } from 'react';
import classNames from 'classnames';
import { userService } from './_services/user.service';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            username: userService.getUsernameFromToken()
        };
        this.onClick = this.onClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        userService.logout();
        window.location.reload();
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        const logo = 'assets/layout/images/Lambda-Explosion.png';
        return  (
            <div className="layout-profile">
                <div>
                    <img alt="Logo" src={logo} />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                <span className="username">{this.state.username}</span>
                    <i className="pi pi-fw pi-caret-down"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button className="p-link" onClick={this.logout}><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}