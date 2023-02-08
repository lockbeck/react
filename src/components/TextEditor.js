import React, { useState } from "react";
import { connect } from "react-redux";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ru-RU";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";

const TextEditor = ({saveText =""}) => {

  const  onChange=(content) => {
    console.log(content);
     saveText(content)
  }
  return (
    <React.Fragment>
      <div className="modal-data">
        <ReactSummernote
          value="<p>aaaaaaaaaa</p>"
          options={{
            disableDragAndDrop: true,
            height: 200,
            toolbar: [
              ["style", ["bold", "italic", "underline", "clear"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["fontname", ["fontname"]],
              ["insert", ["picture", "link"]],
            ],
          }}
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );
};

export default connect()(TextEditor);
