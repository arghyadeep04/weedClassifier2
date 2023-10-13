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
import { selectuserToken } from "../redux/user/user.selector";
import { setOutput, setOutputLoading } from "../redux/output/output.action";
import { addHistory } from "../apis";

const UploadImage=({setLoading,setUrl,url,loading,setalert,setvisible,setoutput,setoutputloading,usertoken})=> {

  const alertPage=(msg)=>{
    setalert({msg,type:"success"})
    setvisible(true)
  }

  const falseOut=(inputImageURL,output)=>{
    setoutput(output)
    if(usertoken){

      addHistory(usertoken,{inputImageURL,output}).then((json)=>{
        if(json.networkerror){
          setalert({msg:"Network Error",type:"error"})
          setvisible(true)
        return
      }
      if(json.status){
        alertPage("Pushed output to history")
        return
      }
    }).catch(err=>{
      setalert({msg:"Network Error",type:"error"})
        setvisible(true)
        return
    })
  }
    
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
        falseOut(res.data,res.data)
      })
      .then(() => setLoading(false))
      .catch(()=>{
        setalert({msg:"Network Error", type:"error"})
        setvisible(true)
        setLoading(false)
      });
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post("http://localhost:5000/uploadMultipleImages", { images })
      .then((res) => {
        setUrl(res.data);
        alertPage("Image uploaded Succesfully");
        falseOut(res.data,res.data)
      })
      .then(() => setLoading(false))
      .catch(()=>{
        setalert({msg:"Network Error", type:"error"})
        setvisible(true)
        setLoading(false)
      });
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
    <div className="border-[2px] border-blue-500 rounded-2xl bg-blue-800 p-3">
        <div className="flex justify-around p-4 ">
        <div><h1 className="block mb-2 text-2xl  font-medium text-white rounded-full px-5 py-3 bg-red-900 w-[98%]" htmlFor="file_input">Upload Your Image</h1>
        <input className="block text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  h-10 dark:border-gray-600 text-black w-80 max-w-[90vw]" id="file_input" type="file" onChange={uploadImage} /></div>
        </div>

        <LoadSpinner loading={loading}/>
        
        <div className="text-white text-center text-2xl">Preview</div>
        <div className="flex justify-around">
            <img src={url} alt="No Image To Show" className="border-[4px] border-green-500 rounded-lg max-w-[90vw] max-h-[55vh] md:max-h-[50vh] md:max-w-[50vw] p-4"/>
        </div>
    </div>
  )



}

const mapStateToProps=createStructuredSelector({
  url:selectImageUrl,
  loading:selectInputLoading,
  usertoken:selectuserToken,

})

const mapDispatchToProps=(dispatch)=>({
  setLoading:(bool)=>dispatch(setInputLoading(bool)),
  setUrl:(url)=>dispatch(setImageUrl(url)),
  setalert:(msg)=>dispatch(setMessage(msg)),
  setvisible:(bool)=>dispatch(setVisible(bool)),
  setoutput:(txt)=>dispatch(setOutput(txt)),
  setoutputloading:(bool)=>dispatch(setOutputLoading(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)(UploadImage)