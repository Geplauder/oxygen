import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAsync, selectToken } from "./authSlice";
import { Link, Redirect } from "react-router-dom";
import { PrimaryButton } from "../../components/buttons/Buttons";
import ErrorBox from "../../components/ErrorBox";
import { ErrorResponse } from "../../types";

export default function Login(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const token = useAppSelector(selectToken);

    if (token !== null) {
        return <Redirect to='/' />;
    }

    const dispatch = useAppDispatch();

    const executeLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (email.trim().length === 0 || password.trim().length === 0) {
                setError('Please fill out all fields.');

                return;
            }

            const status = await dispatch(loginAsync({ email, password }));

            if (status.type === loginAsync.rejected.type) {
                const errorResponse = status.payload as ErrorResponse;

                switch (errorResponse.status) {
                    case 401: {
                        setError('Wrong email and/or password.');

                        return;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');

                        return;
                    }
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        await executeLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-main py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-100">
                        Or{' '}
                        <Link to="/register" className="font-medium text-indigo-500 hover:text-indigo-400">
                            Sign up
                        </Link>
                    </p>
                </div>

                <ErrorBox error={error} />

                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-main-dark text-white border border-main-black placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={handleSubmit}
                                data-testid='email-address'
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-main-dark text-white border border-main-black placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleSubmit}
                                data-testid='password'
                            />
                        </div>
                    </div>

                    <div>
                        <PrimaryButton className='w-full flex justify-center' onClick={executeLogin} isLoading={isLoading}>
                            Sign in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}