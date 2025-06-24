"use client";
import { useState } from "react";
import { Menu, X, Bell, Upload, User } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { sidbarMethod } from "../State/Slice/Sidebar";
import { Link } from "react-router-dom";

export default function Header() {
  const sideBar = useSelector((state)=>state.Sidebar)
  const dispatch = useDispatch();

  return (
    <>
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md fixed w-full z-50">
      <div className="flex items-center gap-4 ">
        <button className="cursor-pointer" onClick={() => dispatch(sidbarMethod(sideBar?false:true))}>
          <Menu className="w-6 h-6" />
        </button>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="h-6"
        />
      </div>

      <div className="flex-1 mx-4 max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Upload className="w-6 h-6 cursor-pointer" />
        <Bell className="w-6 h-6 cursor-pointer" />
        <Link to="/login">
        <User className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>

      {/* Side Menu */}
    </header>
    
    </>
  );
}
