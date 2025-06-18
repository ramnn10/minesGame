import React, { useState } from "react";
import { ILogin } from "../../modal/ILogin";
import { useAppDispatch, useAppSelector } from '../../hoc/Hook'
import { loginUser } from "../../appRedux/action/authAction";


interface IState {
    user: ILogin
}
const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<IState>({
        user: {
            username: '',
            password: '',
            isClint: true,
            host: window.location.host
        }
    })
    let { isLoading } = useAppSelector((state) => state.reducer.auth);
    let check = useAppSelector((state) => state.reducer.auth);
    console.log(check, "kkkk");

    const handalChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState({
            user: {
                ...state.user,
                [event.target.name]: event.target.value,
            }
        })
    }
    // const handalSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    //     event.preventDefault();
    //     const loginDetails = {
    //         username: state.user.username,
    //         password: state.user.password,
    //         isClint: true,
    //         host: window.location.host

    //     };
    //     dispatch(loginUser(loginDetails));
    // }

    const handalSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const loginDetails = {
            username: state.user.username,
            password: state.user.password,
            isClint: true,
            host: window.location.host,
        };

        dispatch(loginUser(loginDetails)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                window.location.href = "/dashboard";
            } else {
                console.error("Login failed");
            }
        });
    };

    return (

        <div className="flex justify-center items-center h-[100vh] bg-yellow-700">
            <div className="flex h-96 w-96 bg-white flex-col border-2 justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handalSubmit}>
                        <div>
                            <div className="flex items-center justify-start">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="username"
                                    type="text"
                                    onChange={handalChange}
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-1">
                                <input
                                    name="password"
                                    type="password"
                                    onChange={handalChange}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {isLoading ? <div>hhhhhh</div> :
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;