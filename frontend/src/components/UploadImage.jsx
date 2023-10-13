import React from "react";
import { useState } from "react";
// import assets from "../assets/assets.gif";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import { selectImageUrl, selectInputLoading } from "../redux/input/input.selector";
import { setImageUrl, setInputLoading } from "../redux/input/input.actions";
import { connect } from "react-redux";
import { setMessage, setVisible } from "../redux/alert/alert.action";
import LoadSpinner from "./loadspinner";

const UploadImage=({setLoading,setUrl,url,loading,setalert,setvisible})=> {

  const alertPage=(msg)=>{
    setalert({msg,type:"success"})
    setvisible(true)
  }


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post("http://localhost:5000/uploadImage", { image: base64 })
      .then((res) => {
        setUrl(res.data);
        alertPage("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post("http://localhost:5000/uploadMultipleImages", { images })
      .then((res) => {
        setUrl(res.data);
        alertPage("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  return(
    <div>
        <div className="flex justify-around p-4 ">
        <div><label className="block mb-2 text-2xl  font-medium text-blue-500" htmlFor="file_input">Upload Your Image</label>
        <input className="block text-sm text-gray-100 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-80 max-w-[90vw]" id="file_input" type="file" onChange={uploadImage} /></div>
        </div>
        {/* <div role="status" className={`${loading?"visible":"invisible"} flex justify-around`}>
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div> */}
        <LoadSpinner loading={loading}/>
        
        <div className="text-blue-600 text-center text-2xl">Preview</div>
        <div className="flex justify-around">
            <img src={url} alt="No Image To Show" className="border-[2px] border-blue-500 rounded-lg max-w-[90vw] max-h-[55vh] md:max-h-[50vh] md:max-w-[50vw] p-4"/>
        </div>
    </div>
  )



}

const mapStateToProps=createStructuredSelector({
  url:selectImageUrl,
  loading:selectInputLoading

})

const mapDispatchToProps=(dispatch)=>({
  setLoading:(bool)=>dispatch(setInputLoading(bool)),
  setUrl:(url)=>dispatch(setImageUrl(url)),
  setalert:(msg)=>dispatch(setMessage(msg)),
  setvisible:(bool)=>dispatch(setVisible(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)(UploadImage)