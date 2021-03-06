import React, { Component, useRef } from "react";
import VideoUpload from "./components/VideoUpload";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import "./App.css";
import { FileInput, Meter } from "grommet";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2 em;
  text-align: center;
  color: whitesmoke;
`;

export default class App extends Component {
  state = {
    selectedFile: null,
    sendingRequest: false,
    //This value most come from de Api when
    percentage: 0,
    url: null,
    buttonText: "Send to Backend",
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  hundleInput = () => {
    const urlInput = document.getElementById("urlInput").value;
    this.setState({ url: urlInput });
    console.log(this.state.url);
  };

  onFileUpload = async () => {
    if (this.state.selectedFile) {
      this.setState({ buttonText: "Sending ..." });
      while (this.state.buttonText === "Sending ...") {
        this.setState({ percentage: this.state.percentage + 1 });
      }
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      await axios
        .post("api/uploadfile", formData)
        .then((res) => {
          this.setState({ buttonText: "Send to Backend" });
          alert("This video was send it correctly");
        })
        .catch((error) => {
          throw new Error("Error sending video");
        });
    } else {
      alert("Please select a file to send before!");
    }
  };
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <hr />
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>File Size (kb): {this.state.selectedFile.size}</p>
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <VideoUpload value={this.state.url} />
        </div>
      );
    }
  };

  render() {
    return (
      <div style={container}>
        <Title>Video Upload Component</Title>
        <hr style={{ height: 20 }} />

        <div>
          <input type="file" onChange={this.onFileChange} />
          <Button variant="success" onClick={this.onFileUpload}>
            {this.state.buttonText}
          </Button>
          <br />
          <br />
          {this.state.buttonText === "Sending ..." ? (
            <Meter
              values={[
                {
                  value: this.state.percentage,
                  label: "sixty",
                },
              ]}
              aria-label="meter"
            />
          ) : null}

          <br />
          <br />
          <InputGroup className="mb-3" onChange={this.hundleInput}>
            <FormControl
              placeholder="Paste the URL video to display it down here"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="urlInput"
            />
          </InputGroup>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

const container = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#34495e",
  padding: 50,
  justifyContent: "center",
  textAlign: "center",
  color: "whitesmoke",
};
