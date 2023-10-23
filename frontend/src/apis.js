export const loginUser=async(form)=>{
    let respons=await fetch(`http://localhost/users/login`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8'

        },
        body:JSON.stringify(form),
        cache: 'default'
      })
      console.log("RES",respons)
      if(!respons){
        return {networkerror:"Network Error"}
      }
    let json=await respons.json();
    console.log(json);
    return json
}
export const signupUser=async(form)=>{
    let respons=await fetch(`http://localhost/users/register`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8'

        },
        body:JSON.stringify(form),
        cache: 'default'
      })
      console.log("RES",respons)
      if(!respons){
        return {networkerror:"Network Error"}
      }
    let json=await respons.json();
    console.log(json);
    return json
}

export const addHistory=async(token,object)=>{
    let respons=await fetch(`http://localhost/users/addtohistory`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8',
            'userToken': token

        },
        body:JSON.stringify(object),
        cache: 'default'
      })

    if(!respons){
        return {networkerror:"Network Error"}
      }
    let json=await respons.json();
    console.log(json);
    return json
}

export const getHistory=async(token)=>{
    let respons=await fetch(`http://localhost/users/history`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type':'application/json; charset=utf-8',
            'userToken': token

        },
        cache: 'default'
      })

    if(!respons){
        return {networkerror:"Network Error"}
      }
    let json=await respons.json();
    console.log(json);
    return json

}

export const getoutput=async(url)=>{
  let respons=await fetch(`http://127.0.0.1:8000/getclass?url=${url}`, {
      method: 'GET',
      headers: {
          'Accept': '*/*',
          'Content-Type':'application/json; charset=utf-8',
          // 'url': url,
          // 'Access-Control-Allow-Origin':"*",
          // 'Vary':'Origin'

      },
      cache: 'default'
    })

  if(!respons){
      return {networkerror:"Network Error"}
    }
  let json=await respons.json();
  console.log(json);
  return json

}