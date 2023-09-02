import React from "react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import './HomePage.css'
import { useParams } from "react-router-dom";
export default function HomePage() {
  const {userId}=useParams();
  const [items, setItems] = useState([]);
  function getAllItems() {
    fetch(`https://todo-list-hci6.onrender.com/api/todoList/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }

  function deleteItem(itemId) {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`https://todo-list-hci6.onrender.com/api/todoList/${itemId}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            getAllItems();
          } else alert("failed to delete");
        });
      }
    });
  }

  function addNewItem() {
    Swal.fire({
      title: "Enter Title:",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://todo-list-hci6.onrender.com/api/todoList`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name: result.value,userId:userId }),
        }).then((res) => {
          if (res.ok) {
            getAllItems();
          } else {
            alert("failed to add item");
          }
        });
      }
    });
  }

  function checkUnCheck(itemId,isCheck){
    fetch(`https://todo-list-hci6.onrender.com/api/todoList/${itemId}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({isChecked:!isCheck})
    }).then(res=>{
      if(res.ok){
        getAllItems();
        return res.json();
      }else alert("failed to edit item");
    })
  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="container">
      <div className="innerContainer">
        {items?.map((item, index) => {
          return (
            <div className="singleItemContainer">
              <h3 onClick={()=>checkUnCheck(item._id,item.isChecked)} style={{textDecoration:item.isChecked?'line-through':null,color:item.isChecked?'gray':'black'}}>{index + 1 + ") " + item.name}</h3>
              <FaTrash 
                onClick={() => deleteItem(item._id)}
                style={{
                  marginRight: "10px",
                  color: "#b51b1b",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
          );
        })}
        <button onClick={addNewItem}>Add New Item</button>
      </div>
    </div>
  );
}
