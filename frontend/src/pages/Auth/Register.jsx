import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";



const Register = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';


    useEffect(() => {

        if (userInfo) {
            navigate(redirect)
        }

    }, [navigate, redirect, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            toast.error("Passwords Dosn't Match");
        } else {
            try {

                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredientials({ ...res }));
                navigate(redirect);
                toast.success("User Created Successfully");

            } catch (error) {
                console.log(error);
                toast.error(error.data.message)
            }
        }
    }


    return (
        <section className="pl-[10rem] flex flex-wrap text-white">
            <div className="mr-[4rem] mt-[5rem]">

                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={submitHandler}
                    className="container w-[40rem]">

                    <div className="my-[2rem]">
                        <label htmlFor="name"
                            className="block text-sm font-medium text-white">
                            Name </label>
                        <input type="text" id="name" placeholder="Your Name"
                            value={username} onChange={e => setUserName(e.target.value)}
                            className="mt-1 p-2 border rounded w-full text-black" />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="email"
                            className="block text-sm font-medium text-white">
                            Email </label>
                        <input type="email" id="email" placeholder="Email Address"
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="mt-1 p-2 border rounded w-full text-black" />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password"
                            className="block text-sm font-medium text-white">
                            Password </label>
                        <input type="password" id="password" placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)}
                            className="mt-1 p-2 border rounded w-full text-black" />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="confirm"
                            className="block text-sm font-medium text-white">
                            Password Confirmation </label>
                        <input type="password" id="confirm"
                            placeholder="Re-Type Password" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="mt-1 p-2 border rounded w-full text-black" />
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="bg-orange-500 text-white px-4 py-2 
                        rounded cursor-pointer my-[1rem]">
                        {isLoading ? "Registering ..." : "Register"}
                    </button>

                    {isLoading && <Loader />}

                </form>


                <div className="mt-4">
                    <p className="text-white">
                        Already have an Account ? <span>&ensp;</span>
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}
                            className="text-orange-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </div>


            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt=""
                className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
            />


        </section>
    )
};

export default Register;