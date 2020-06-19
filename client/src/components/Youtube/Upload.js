import React, { useState } from 'react'
import { MDBContainer, MDBInput, MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBBtn, MDBProgress } from "mdbreact";
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Dropzone from 'react-dropzone'

var Privacy = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

var Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

var initialVaules = {
    title: "",
    desc: "",
    privacy: 0,
    category: "Music",
    video: null,

}

function Upload() {

    const [values, setValues] = useState(initialVaules)
    const [percent, setPercent] = useState(0)
    const [disimage, setDisimage] = useState(null)

    const notify = () => toast.success('🦄 Wow Video Uploaded!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });


    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleVideo = (files) => {

        setDisimage(URL.createObjectURL(files[0]))

        setValues({
            ...values,
            video: files[0]
        })


    }

    const onSubmit = (event) => {

        event.preventDefault();
        let formData = new FormData();

        const config = {
            onUploadProgress: progressEvent => {
                const { total, loaded } = progressEvent
                var percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}`);
                if (percent < 100)
                    setPercent(percent)
            },

            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append("file", values.video)
        formData.append("title", values.title)
        formData.append("desc", values.desc)
        formData.append("privacy", values.privacy)
        formData.append("category", values.category)


        axios.post('/api/video/upload', formData, config)
            .then(res => {
                setPercent(100)
                notify()  
                console.log(res)
                setTimeout(() => {
                    setDisimage(null)
                    setPercent(0)
                    setValues(initialVaules)
                }, 3000);
               
            })
            .catch(err => {
                console.log(err.response.data);
                setPercent(0)
                toast.error('🦄'+ err.response.data.error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
            })
    }


    return (
        <MDBContainer style={{ marginTop: "2rem" }}>
            <ToastContainer />

            <MDBCard>

                <MDBCardBody>
                    <form onSubmit={onSubmit}>
                        <MDBRow center>
                            {disimage && <MDBCol md="4" xs="12" >
                                <video width="100%" height="150px" controls src={disimage}></video>
                            </MDBCol>}

                            <MDBCol md="4" xs="12">
                                <Dropzone
                                    onDrop={(files) => handleVideo(files)}
                                    multiple={false}
                                    accept="video/*"
                                    maxSize={800000000}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div style={{ height: "150px", width: "100%", border: '1px solid lightgray', display: 'flex', alignItems: "center", justifyContent: "center" }}
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} />
                                            <MDBIcon icon="cloud-upload-alt" size="5x" className="red-text pr-2" />
                                        </div>

                                    )}
                                </Dropzone>
                            </MDBCol >

                        </MDBRow>


                        <MDBRow>
                            <MDBCol md="12">

                                {percent > 0 && <MDBProgress material value={percent} height="10px">{percent}</MDBProgress>}

                                <MDBInput label="Title:" value={values.title} name="title" onChange={handleChange} required />

                                <MDBInput type="textarea" label="Description:" name="desc" value={values.desc} onChange={handleChange} required />
                                <p className="font-weight-bold">Privacy :</p>
                                <select className="browser-default custom-select" name="privacy" onChange={handleChange}> {Privacy.map((data, key) => <option value={data.value}>{data.label}</option>)}  </select>
                                <br /><br />

                                <p className="font-weight-bold">Category :</p>
                                <select className="browser-default custom-select" name="category" onChange={handleChange}> {Category.map((data, key) => <option value={data.label}>{data.label}</option>)}  </select>
                                <br /><br />

                                <div className="text-center">
                                    <MDBBtn gradient="blue" type="submit"> Upload </MDBBtn>
                                </div>

                            </MDBCol>


                        </MDBRow>

                    </form>
                </MDBCardBody>
            </MDBCard>

            


        </MDBContainer>

    )
}

export default Upload
