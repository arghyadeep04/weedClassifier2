export const loginUser=async(form)=>{
    let respons=await fetch(`http://localhost/user/login`, {
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
    let respons=await fetch(`http://localhost/user/signup`, {
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
    let respons=await fetch(`http://localhost/user/addtohistory`, {
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
    let respons=await fetch(`http://localhost/user/history`, {
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