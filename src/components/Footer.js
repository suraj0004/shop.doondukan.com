import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
            <strong>Copyright &copy; 2020-2021 <a target="_blank" rel="noopener noreferrer" href="https://doondukan.com">Doondukan.com</a>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
              <b>Version</b> 0
            </div>
          </footer>
        );
    }
}

export default Footer;