
import React from 'react';
import PropTypes from 'prop-types';

import './assets/css/style.css'
import FileIcon from './assets/img/file.png'


  
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            files:[]
        }
        this.handleFileSelect=this.handleFileSelect.bind(this)        
    }
    componentDidMount() {
        window.addEventListener('simple-react-file-upload', this.handleFileUpload);
        window.addEventListener('dragover', this.handleFileUpload);
        document.getElementById('simple-react-file-upload').addEventListener('drop', this.handleFileUpload);
    }

    handleFileSelect() {
        this.refs.fileUploader.click()
    }

    handleFileUpload=(e)=> {
        e.preventDefault();       
        let {target} = e
        if (this.props.multiple) {
            let files = this.state.files
            Object.keys(target.files).map(key=>{
                files.push(target.files[key])
            })
            this.setState({
                files:files
            })
            this.props.onChange(files)

        } else {
            let newFile = []
            newFile.push(target.files[0])
            this.setState({
                files:newFile
            })
            this.props.onChange(newFile)
        }

    }

    handleDeleteFile=(index)=>{
        let {files} = this.state;
        if (files.length===1) {
            files = []
        } else {
            delete files[index]
        }
        this.setState({files:files})
        this.props.onChange(files)
    }

    handleFileDrop=(e)=> {
        e.preventDefault();
        e.stopPropagation()
        let files = e.dataTransfer.files; 
        if (!this.props.multiple) {
            let newFile = []
            newFile.push(e.dataTransfer.files[0])
            this.setState({
                files:newFile
            })
            this.props.onChange(newFile)     
        } else {
            let prevFile = this.state.files
            Object.keys(files).map(key=>{
                prevFile.push(files[key])
            })     
            this.setState({files:prevFile});
            this.props.onChange(prevFile)
        }
        return false;
    }


    render() {
        let {files} = this.state
        let fileList = this.state.files && Object.keys(files).map(key=>{
            return (
            <li key={key}>
            <div id="simple-react-file-uploader-icon">
                <img src={FileIcon} alt={files[key].name} id="file"/>
                {/* <p className="file-type">{files[key].type}</p> */}
               <p className="file-name">{files[key].name}</p>
              <span onClick={()=>{this.handleDeleteFile(key)}}></span>
            </div>
        </li>
           )
        })

        return (
            <div id="simple-react-file-upload" className={this.props.className}>
			<div id="simple-react-file-drop" onDrop={this.handleFileDrop} onDragOver={this.handleFileDrop}>
                Drop Here
				<a onClick={this.handleFileSelect}>Browse</a>
				<input type="file" ref="fileUploader" accept={this.props.accept} onChange={this.handleFileUpload} multiple={this.props.multiple?true:false} name="upl" />
			</div>
			<ul>
               {fileList}   
			</ul>
		</div>
        )
    }
}

FileInput.propTypes = {
    multiple: PropTypes.bool,
    accept:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    className:PropTypes.string

}

export default FileInput;




