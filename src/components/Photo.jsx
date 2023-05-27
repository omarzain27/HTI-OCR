// App.js
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    navigator.mediaDevices
      .getUserMedia({ video: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    canvasRef.current.toBlob((blob) => setImage(blob));
    // Stop the camera and close the video stream
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraOpen(false);
  };

  const sendToOcrApi = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('https://9bb0-102-186-95-127.ngrok-free.app/ocr', {
      method: 'POST',
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    setOcrText(data.result);
  };

  return (
    <div className="App ">

            <header className="header w-100">
      <img 
          src={require('../hti logo.jpg')} 
          alt="logo" 
          className="w-100" 
        />
    </header>

    {/* <nav class="navbar navbar-expand-lg position-sticky top-0 z-3 col-md-6 col-lg-9 text-white navbar-brand-custom">
        <div class="container d-flex justify-content-lg-center">

           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse " id="navbarSupportedContent">
              <ul class="navbar-nav mb-2 mb-lg-0 menu small">
              </ul>
           </div>
           <h5 class="navbar-brand mb-0 text-uppercase navbar-brand-custom ms-auto">
            Powered by HTI students
         </h5>
        </div>
    </nav> */}


<div className=' w-50 p-3 mt-5 mx-auto text-center border border-secondary'>
    
      {/* <input className='input-group' type="file" accept="image/*" onChange={handleImageChange} /> */}

      <div class="mb-3">
        {/* <label for="formFile" class="form-label">Default file input example</label> */}
        <input class="form-control" type="file" id="formFile" accept="image/*" onChange={handleImageChange}/>
      </div>

      <button className='m-3 btn btn-primary' onClick={openCamera}>Scan</button>
      {isCameraOpen && (
        <>
          <video ref={videoRef} width="640" height="480" autoPlay />
          <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
          <button className='btn' onClick={takePhoto}>Capture</button>
        </>
      )}
      <button className='m-3 btn btn-success' onClick={sendToOcrApi}>Submit</button>
      <p>{ocrText}</p>


</div>

<div >

      {/* <i class="fa-solid fa-crosshairs"></i> */}
      
</div>

<section className=''>
      <p class="text-center w-100 m-auto p-5">




<div className=' row  text-start p-5 lh-lg'>
  
<span className='col-md-6 lh-lg'>
  
<span className="text-primary h1 OCR  sma">
        <span className="sma text-white h1 OCR text-uppercase">WHAT IS </span>
        OCR?
        </span>
        <br />
        OCR stands for Optical Character Recognition,
        which is a technology to recognize text in images of scanned documents and photos. With OCR,
        you can convert painted text in images into editable, searchable, indexable,
        and storable document.
        </span>
</div>

<section className='row gap-5'>
<div className="col box">
  <i class="fa-solid fa-crosshairs fa-bounce"></i>
  <br />
  High Accuracy
  </div>

  <div className="col box">
    <i class="fa-solid fa-file-signature fa-bounce"></i>
    <br />
    Handwritten 
  </div>
  <div className="col box">
  <i class="fa-solid fa-language fa-bounce"></i>
  <br />
  Arabic
  </div>

  <div className="col box">
  <i class="fa-solid fa-language fa-bounce"></i>
  <br />
  English
  </div>
</section>

<div className='mt-5 d-flex justify-content-end align-items-end text-start p-5'>

        <span className='col-md-6 lh-lg'>
          <span className="sma h3 text-uppercase">Applications of <span className='text-primary'>OCR</span></span><br />
         include data entry for business documents such as invoices,
            bank statements, bills, business cards, receipt, mails, passport and IDs,
            automatic license plate recognition, conversion of scanned books into searchable documents, text to speech for blind and visually impaired users, and much more.
        </span>
</div>


</p>

         {/* <p class="text-center w-50 m-auto p-5">
            Who we are?<br/>
            We are students in our last term at HTI and this is our graduation project. This is an end-to-end project in which extracted and manipulated the required datasets for both Arabic and English , we have used 2 million images after that we built and trained a machine learning model in order to make the OCR after that we built this website using REACT for frontend and flask for backend      
            
         </p> */}
    </section>
      

    </div>
  );
}

export default App;
