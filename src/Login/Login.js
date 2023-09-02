import React, { useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate=useNavigate();
  function login() {
    if (userNameRef.current.value === "" || passwordRef.current.value === "") {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Valid Email And Password',
       
      });
      return;
    }
    const formData={userName: userNameRef.current.value, password: passwordRef.current.value}
    
    fetch(`https://todo-list-hci6.onrender.com/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData)
    })
    .then(res=>{
      if(res.ok){
        return res.json();
      }
    }).then(data=>{
      if(data){
        navigate(`/HomePage/${data._id}`)
      }else {
        Swal.fire({
          title: 'Wrong username or password!',
        });
      }
    }).catch(err=>{
      Swal.fire({
        title: 'Check Network Connection',
      });
    });
  }

  function register(){
    if(userNameRef.current.value===''||passwordRef.current.value===''){
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Valid Email And Password',
       
      });
      return;
    }
    fetch(`https://todo-list-hci6.onrender.com/api/users`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({userName:userNameRef.current.value,password:passwordRef.current.value})
    }).then(res=>{
      if(res.ok){
        return res.json();
      }else {
        Swal.fire({
          icon: 'error',
          title: 'This Username Already Exists',
         
        });
        return;
      }
    }).then(data=>{
      if(data){
        navigate(`/HomePage/${data._id}`)
      }
    })
  }

  return (
    <div className="loginContainer">
      <div className="innerLoginContainer">
        <div className="inputLine">
          <label>Username</label>
          <input ref={userNameRef} placeholder="username..."></input>
        </div>
        <div className="inputLine">
          <label>Password</label>
          <input ref={passwordRef} type="password" placeholder="Password..."></input>
        </div>
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}
