import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';


    useEffect(() => {

        if (userInfo) {
            navigate(redirect);
        }

    }, [navigate, redirect, userInfo]);



    const submitHandler = async e => {
        e.preventDefault();

        try {

            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredientials({ ...res }));

        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }


    }


    return (
        <div>
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>

                    <form className="container w-[40rem]"
                        onSubmit={submitHandler}>

                        <div className="my-[2rem]">
                            <label htmlFor="email"
                                className="block text-sm font-medium text-white">
                                Email Address
                            </label>
                            <input type="email" id="email" value={email}
                                className="mt-1 p-2 border rounded w-full"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="my-[2rem]">
                            <label htmlFor="password"
                                className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <input type="password" id="password" value={password}
                                className="mt-1 p-2 border rounded w-full"
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button disabled={isLoading} type="submit"
                            className="bg-orange-500 text-white px-4 py-2 
                            rounded cursor-pointer my-[1rem]">
                            {isLoading ? "Signing ..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}

                    </form>


                    <div className="mt-4">
                        <p className="text-white">
                            New Customer ?<span>&ensp;</span>
                            <Link to={redirect ?
                                `/register?redirect=${redirect}` : "/register"}
                                className="text-orange-400 hover:underline">
                                Register
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
        </div>
    )
};


export default Login;