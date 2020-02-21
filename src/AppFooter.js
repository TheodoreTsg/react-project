import React, { Component } from 'react';
import './AppFooter.css';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <img src="assets/layout/images/logoofmine.png" alt="" width="130"/>
                <span className="footer-text" style={{'marginLeft': '5px'}}>Theme and Layout</span>
            </div>
        );
    }
}