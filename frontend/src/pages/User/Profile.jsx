import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";


const Profile = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const { userInfo } = useSelector(state => state.auth);

    const [updateProfile,
        { isLoading: loadingUpdateProfile }]
        = useProfileMutation();


    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email]);

    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            toast.error("Passwords Dosn't Match");
        } else {
            try {

                const res = await updateProfile({
                    _id: userInfo._id,
                    username, email, password
                }).unwrap();

                dispatch(setCredientials({ ...res }));
                toast.success("Profile Updated Successfully");

            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }

    }




    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center align-center md:flex md:space-x-4">

                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4 text-white">
                        Update Profile
                    </h2>

                    <form onSubmit={submitHandler}>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Name</label>
                            <input type="text" placeholder="Your Name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="form-input p-4 rounded-sm w-full" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Email</label>
                            <input type="email" placeholder="Your Email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="form-input p-4 rounded-sm w-full" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Password</label>
                            <input type="password" placeholder="New Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="form-input p-4 rounded-sm w-full" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Confirm Password</label>
                            <input type="password" placeholder="Re-Type Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="form-input p-4 rounded-sm w-full" />
                        </div>

                        <div className="flex justify-between">
                            <button type="submit"
                                className="bg-orange-500 text-white py-2 px-4 rounded
                                hover:bg-orange-600">
                                Update</button>
                            <Link to="/user-orders"
                                className="bg-orange-600 text-white py-2 px-4 rounded 
                                hover:bg-orange-700">
                                My Orders</Link>
                        </div>

                    </form>
                </div>

                {loadingUpdateProfile && <Loader />}

            </div>
        </div>
    )
};


export default Profile;