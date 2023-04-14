import React, {Component, useState} from 'react';
import Discuss from './Discuss.css'
import Post from './Post';
import PostEditor from './PostEditor'
import ThreadDisplay from './ThreadDisplay';
class DisplayBoard extends Component {
    constructor(props) {
        super(props);
        
    
    }


    render() {
        return (
            <div className = "App">
            <ThreadDisplay />

            </div>
            
        );
    }
}
export default DisplayBoard;