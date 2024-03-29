import { useState } from 'react';
//import { useNavigate } from 'react-router';
import React from 'react';
import style from './Style.module.css';
import Button from '../Buttons/Button';

function SignUp({setSignupSuccess }) {
  //const navigate = useNavigate();
 
 const [formData, setFFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    setFFormData({...formData,[e.target.name] : e.target.value})

  }
 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Click on submit button');
   console.log(formData);
    
    //check for email and name
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]*$/;

    if(!formData.name.match(namePattern)) {
      alert('Name is invalid. Only contain alphabets.')
      return;
    }
    // Check if password is less than 5 characters
     if (formData.password.length < 5) {
         alert('Password must be at least 7 characters long');
        return; // Prevent form submission
       }

    if(!formData.email.match(emailPattern)) {
      alert('Invalid email');
      return;
    }

    if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword){
      alert('Please fill in all fields')
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
  }

  try {
    const response = await fetch("https://quiz-api-djxd.onrender.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    
  const responseData = await response.json();
  const { user, token } = responseData; // Destructure user and token from the response data

  console.log(user); // Log user information
  console.log(token); // Log authentication token

  // Save user information and token to local storage or state
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("name", user.name);
  window.localStorage.setItem("token", token);
  setSignupSuccess(true); // Set signup success state
    

  } catch (error) {
    console.error("Error during fetching", error);
    alert("There was an error during signup. Please try again later.");
  }

  }

  return (
    <div className={style.container}>
      <div className={style.formbody}> 
       <form onSubmit={handleSubmit}>  
         <div className={style.formValues}>
            <label className={style.label}>Name: </label>
            <input className={style.input}
               type="text" 
               name='name'
               value={formData.name}
               onChange={handleChange}
               placeholder='Name'
            />
        </div>
        <div className={style.formValues}>
            <label className={style.label}>email: </label>
            <input className={style.input}
                type="email" 
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email'
            />
         </div>
        <div className={style.formValues}>
            <label className={style.label}>Password: </label>
            <input className={style.input}
                   type="password" 
                   name='password'
                   value={formData.password}
                   onChange={handleChange}
                   placeholder='password'
             />
        </div>
        <div className={style.formValues}>
           <label className={style.label}>Confirm Password: </label>
           <input className={style.input}
                   type="password" 
                   name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                   placeholder='confirm Password'
          />
        </div>
           <div className={style.buttonAlign}>
               <Button className={style.button} type="submit" > Signup</Button>
           </div>
 

           </form>


      </div>  
      
    </div>
  )
}

export default SignUp
