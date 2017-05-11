import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Nav from './Nav.jsx';
// import config from '../../../config.js';

const CLOUDINARY_UPLOAD_PRESET = 'dropiffy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dropiffy/image/upload';
                                                                         
class Input extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log(`this is the file: ${file}`);
  
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url) {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });

        console.log('this is the response: ', response);
      }
    });
  }

  render() {
    return (
      <div>  
        <div>
          <Nav />
        </div>
        <form>
          <div className="input">
            <Dropzone
              onDrop={this.onImageDrop}
              multiple={false}
              name='file'
            >
              <div> Drop a pdf or click to select a file to upload. </div>
            </Dropzone>
          </div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div>
                <p> Thank you, your file is being uploaded </p>
              </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default Input;