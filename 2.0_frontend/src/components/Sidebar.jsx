import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";
import logo from "../assets/logoWhite.jpeg";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white hover:text-white transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-[#2181e2] font-extrabold border-r-2 border-white transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-black h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center justify-center"
          onClick={handleCloseSideBar}
        >
          <img
            src={logo}
            alt="logo"
            className="w-28 items-center justify-center"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-white 2xl:text-xl">
            {" "}
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category?.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSideBar}
              key={category?.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm border-solid border-white border-2"
                alt="category"
              />
              {category?.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-black rounded-lg shadow-lg mx-3 border-t-2 border-solid"
          onClick={handleCloseSideBar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full border-white ring-white border-solid border-white border-2"
            alt="user-profile"
          />
          <p className="text-white">{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
