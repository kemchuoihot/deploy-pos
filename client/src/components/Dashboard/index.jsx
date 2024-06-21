import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles.css";
import { useState, useEffect } from 'react';



const Dashboard = () => {
//   const anvigate = useNavigate()
//   axios.defaults.withCredentials = true
  const handleLogout = () => {
    // axios.get('http://localhost:3000/auth/logout')
    // .then(result => {
    //   if(result.data.Status) { 
    //     localStorage.removeItem("valid")
    //     anvigate('/login')
    //   }
    // })
    localStorage.removeItem("token");
        window.location.replace("/login");
    localStorage.removeItem("account");
  }

const [isOpen,setIsOpen] = React.useState(false)
const [name, setName] = React.useState("");
const [role, setRole] = React.useState("");
const [page,setPage] = React.useState("Dashboard");

useEffect(() =>
{
  const account = JSON.parse(localStorage.getItem("account"));
  if(!account || account.status === "inactive"){
    handleLogout();
  }
  setName(account.name);
  setRole(account.role);
},[])
const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid" >
      <div className="row flex-nowrap">
        <div style={{width: isOpen ? "17%" : "4.5%"}} className="bg shadow-sm">
          <div  className={isOpen ? "d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100" : "d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100 side-bar"}>
            <div className="w-100 row justify-content-between">
                <div  style={{display: isOpen ? "block" : "none"}} className="">
                <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none col-9"
                >
                <span className="col-6 fs-5 fw-bolder d-none d-sm-inline title-menu">
                    POS System
                </span>
                </Link>
                </div>
                <i  style ={ {"color":"#6366f1"}} onClick={toggle} class="col-1 p-3 m-auto bi bi-list"></i>
            </div>
            <ul
              className="w-100 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="dash-icon w-100 p-2 align-items-center">
                <Link
                onClick={() => setPage("Dashboard")}
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-speedometer2 mr-2 h4" ></i>
                  <span className="text-purple mask  ms-2" style={{display: isOpen ? "inline" : "none"}}>Dashboard</span>
                </Link>
              </li>
              {role == "admin" && (<li className="dash-icon w-100 p-2">
                <Link
                onClick={() => setPage("Employee")}
                
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i  style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-people mr-2 h4"></i>
                  <span className="ms-2 text-purple" style={{display: isOpen ? "inline" : "none"}}>
                    Manage Employees
                  </span>
                </Link>
              </li>)}
              <li className="dash-icon w-100 p-2">
                <Link
                onClick={() => setPage("Product")}
                  to="/dashboard/product"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i  style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-columns mr-2 h4"></i>
                  <span className="ms-2 text-purple" style={{display: isOpen ? "inline" : "none"}}>Product</span>
                </Link>
              </li>
              <li className="dash-icon w-100 p-2">
                <Link
                onClick={() => setPage("Customer")}
                  to="/dashboard/customer"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i  style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-people mr-2 h4"></i>
                  <span className="ms-2 text-purple" style={{display: isOpen ? "inline" : "none"}}>Customer</span>
                </Link>
              </li>
              <li className="dash-icon w-100 p-2">
                <Link
                onClick={() => setPage("Profile")}
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i  style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-person ms-2 mr-2 h4"></i>
                  <span className="ms-2 text-purple" style={{display: isOpen ? "inline" : "none"}}>Profile</span>
                </Link>
              </li>
              <li className="dash-icon w-100 pt-2 pb-2" 
              onClick={handleLogout}
              >
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i  style ={ {"color":"#3b3b3b"}} className="tog fs-4 bi-power p-2 ms-2 mr-3 h4"></i>
                  <span className="ms-2 text-purple" style={{display: isOpen ? "inline" : "none"}}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100 bg-main col p-0 m-0">
            <div className="p-2 d-flex">
                <h2 className="pt-2 title text-title">{page}</h2>
                <span className="d-flex ml-auto">
                  {/* <span className="user-name">Xin chao {name}</span> */}
                  {/* <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="users" className="avt"/> */}
                </span>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;