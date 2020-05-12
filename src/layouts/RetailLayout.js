import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PageLoader from '../components/PageLoader';
class RetailLayout extends Component {
    render() {
        return (
            <div className="wrapper">
                <PageLoader isLoader={this.props.isLoader}/>
                <Header />
                <Sidebar  pathname={this.props.pathname}/>
                <div className="content-wrapper">
               
                {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default RetailLayout;