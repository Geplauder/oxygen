import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PrimaryButton } from '../../components/buttons/Buttons';
import ErrorBox from '../../components/ErrorBox';
import { registerAsync, selectToken } from './authSlice';

export default function Register(): JSX.Element {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const token = useAppSelector(selectToken);

    if (token !== null) {
        return <Redirect to='/' />;
    }

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const executeSignup = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
                setError('Please fill out all fields.');

                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match.');

                return;
            }

            const status = await dispatch(registerAsync({ name: username, email, password }));

            if (status.type === registerAsync.rejected.type) {
                switch ((status.payload as any).status) {
                    case 400: {
                        setError((status.payload as any).data);

                        return;
                    }
                    case 500: {
                        setError('Whoops, something went wrong. Please try again later.');

                        return;
                    }
                }
            }

            history.push('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        await executeSignup();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-main py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up</h2>
                    <p className="mt-2 text-center text-sm text-gray-100">
                        Or{' '}
                        <Link to='/login' className="font-medium text-indigo-500 hover:text-indigo-400">
                            Sign in
                        </Link>
                    </p>
                </div>

                <ErrorBox error={error} />

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 block w-full sm:text-sm border-main-black rounded-md"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

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
                            className="bg-main-dark text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 block w-full sm:text-sm border-main-black rounded-md"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                className="bg-main-dark text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-main-black placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="password"
                                required
                                className="bg-main-dark text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-main-black placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onKeyDown={handleSubmit}
                            />
                        </div>
                    </div>

                    <div>
                        <PrimaryButton className='w-full flex justify-center' onClick={executeSignup} isLoading={isLoading}>
                            Sign up
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}