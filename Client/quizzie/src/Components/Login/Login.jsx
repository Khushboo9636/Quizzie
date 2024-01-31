import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import style from './Style.module.css';
import Button from '../Buttons/Button';


function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password : ""
  });
  
  const handleChange = (e) => {
    setData({...data,[e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.email && data.password) {
       try {
        const response = await fetch("http://localhost:4000/api/user/login",{
          method : "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),

        });
   if(!response.ok){
    throw new Error("Network response was not ok");

   }
    const responseData = await response.json()
    console.log(responseData);
    window.localStorage.setItem("name", responseData.name)
    window.localStorage.setItem("email", responseData.email)
    window.localStorage.setItem("token", responseData.token)
    navigate("/dashboard")
        

        
       } catch (error) {
        console.log(error.message);
       
        alert("There was problem with the request , please try again");
        
       }
       
    }
  }
  return (
    <div className={style.container}>
      <div className={style.formValues}>
            <label className={style.label}>email: </label>
            <input className={style.input}
               type="email" 
               name='email'
               value={data.email}
               onChange={handleChange}
               placeholder='Email'
            />
        </div>
        <div className={style.formValues}>
            <label className={style.label}>Password: </label>
            <input className={style.input}
               type="password" 
               name='password'
               value={data.password}
               onChange={handleChange}
               placeholder='password'
            />
        </div>

      <Button onClick = {handleSubmit} > Login</Button>
      
    </div>
  )
}

export default Login
