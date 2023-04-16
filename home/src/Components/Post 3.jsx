import React from 'react';

const Post = (props) => {
    return (
    <div className = "panel panel-default post-editor">
    <div className = "panel-body">
    <div className= "panel-body">
                    {props.postBody}
                </div>
        </div>
    </div>
    );
}
export default Post;