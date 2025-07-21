import React, { Component } from 'react';
import './App.css';
import HeaderOuter from "./components/HeaderOuter";
import TrackingComponent from './components/TrackingComponent';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderOuter />
                <div>
                    {/* Pass TrackingComponent as a child to App */}
                    <TrackingComponent />
                </div>
            </div>
        );
    }
}

export default App;
