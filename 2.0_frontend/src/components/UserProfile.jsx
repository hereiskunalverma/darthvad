import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { userCreatedPinsQuery } from "../utils/data";
import { userQuery } from "../utils/data";
import { userSavedPinsQuery } from "../utils/data";
import { client } from "../client";
import MansonryLayout from "./MansonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-[#2181e2] text-white font-bold p-2 rounded-full width-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-white font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [userId, text]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading Profile..." />;
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover border-2 border-solid border-white"
              src={user.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-white text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-black p-2 rounded-full cursor-pointer outline-none shadow-md border-2 border-white border-solid"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      {" "}
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MansonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex text-white justify-center items-center w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
