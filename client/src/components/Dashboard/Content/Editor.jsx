import React from 'react';
import '@vaadin/rich-text-editor';

const Editor = () => {

    return (
        <div className="custom-editor w-100 d-flex justify-content-center">
            <vaadin-rich-text-editor></vaadin-rich-text-editor>
        </div>


    );
};

export default Editor;
