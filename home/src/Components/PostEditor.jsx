import { render } from '@fullcalendar/core/preact';
import React, {Component, useState} from 'react';


class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPostBody: '',
            link: false
        }
        this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(this);
        this.createPost = this.createPost.bind(this);
        this.setLink = this.setLink.bind(this);
    }

    handlePostEditorInputChange = (ev) => {
        this.setState({
            newPostBody: ev.target.value
        })
    }
    createPost() {
        this.props.addPost(this.state.newPostBody);
        this.setState({
            newPostBody: '',
        })
    }
    setLink() {
        this.setState({
            link: true,
        })
    }

render() {
    return (
        <div className = "panel panel-default post-editor">
                <div className = "panel-body">
                    {
                        this.state.link && <><h3>Paste your link below!</h3></>
                    }
                    <textarea className = "form-control post-editor-input" value={this.state.newPostBody} onChange={this.handlePostEditorInputChange}/>
                    <button className = "btn btn-sccess post-editor-button" onClick={this.createPost}>Post</button>
                    <br/>
                    <button onClick={this.setLink}>Upload a link</button>
                </div>
            </div> 

    )
}
}
export default PostEditor;                                                            