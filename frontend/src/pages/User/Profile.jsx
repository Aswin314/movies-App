import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import Loader from "../../Components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/user";
import { useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully.");
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error || "An error occurred");
      }
    }
  };
  return (
    <div>
      <div className="container mx-auto p-5 mt-[1rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter old password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Confirm Passwrod "
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600 cursor-pointer"
                >
                  Update
                </button>

                {loadingUpdateProfile && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
