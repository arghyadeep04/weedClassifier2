import React, { useEffect } from "react";
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
import { addHistory, getoutput } from "../apis";
import { host } from "../metaData";
// import '../compression-loop'

const UploadImage=({setLoading,setUrl,url,loading,setalert,setvisible,setoutput,setoutputloading,usertoken})=> {
  // useEffect(()=>{
    //   if(url){
//     output(url)
//   }
// },[url])

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

  const output=(url)=>{
    setoutputloading(true)
    getoutput(url).then((json)=>{
      let ans=json.answer
      setoutput(ans)
      setoutputloading(false)
      if(usertoken){

        addHistory(usertoken,{inputImageURL:url,output:ans}).then((json)=>{
          if(json.networkerror){
            setalert({msg:"Network Error",type:"error"})
            setvisible(true)
          setoutputloading(false)
          return
        }
        if(json.status){
          alertPage("Pushed output to history")
          setoutputloading(false)
          return
        }
    }).catch(err=>{
      setalert({msg:"Network Error",type:"error"})
        setvisible(true)
        setoutputloading(false)
        return
      })
    }
    })
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

  async function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post(`${host}:5000/uploadImage`, { image: base64 })
      .then((res) => {
        setUrl(res.data);
        alertPage("Image uploaded Succesfully");
        output(res.data)
      })
      .then(() => setLoading(false))
      .catch(()=>{
        setalert({msg:"Network Error", type:"error"})
        setvisible(true)
        setLoading(false)
      });
  }

  async function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post(`${host}:5000/uploadMultipleImages`, { images })
      .then((res) => {
        setUrl(res.data);
        alertPage("Image uploaded Succesfully");
        output(res.data)
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
    <div className="border-[2px] border-blue-500 rounded-2xl bg-blue-700 p-3">
        <div className="flex justify-around p-4 ">
        <div><h1 className="block mb-2 text-2xl  font-medium text-white rounded-full px-5 py-3 bg-orange-600 w-[80vw] md:w-[40vw]" htmlFor="file_input">Upload Your Image</h1>
        <button className=" border-black border-[2px] text-white rounded-3xl w-40 h-14" onClick={()=>{document.getElementById('file_input').click()}}><img src="https://www.mbsplugins.de/images/drop-files-here-extra.jpg" className="w-full h-full rounded-3xl opacity-80 hover:opacity-100" alt="Upload"/></button>
        <input className="text-sm border-gray-300 bg-orange-400 cursor-pointer  focus:outline-none  h-10 dark:border-gray-600 text-black w-80 max-w-[90vw] border-[4px] rounded-full hidden" id="file_input" type="file" onChange={uploadImage} /></div>
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