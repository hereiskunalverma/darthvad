import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import UserProfile from "../components/UserProfile";
import SideBar from "../components/Sidebar";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logoWhite.jpeg";
import { userQuery } from "../utils/data";
import Sidebar from "../components/Sidebar";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSideBar, settoggleSideBar] = useState(false);
  const [User, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={User && User} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="bg-black p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            color="white"
            onClick={() => {
              settoggleSideBar(true);
            }}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${User?._id}`}>
            <img src={User?.image} alt="logo" className="w-28 hideUserImage" />
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                color="white"
                onClick={() => {
                  settoggleSideBar(false);
                }}
              />
            </div>
            <Sidebar user={User && User} closeToggle={settoggleSideBar} />
          </div>
        )}
      </div>
      <div
        className="bg-black pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={User && User} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
