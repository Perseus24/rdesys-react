import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button"
import { LoaderCircle } from 'lucide-react';

type LoginForm = {
    email: string;
    password: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div >
            <Head title="Log in" />
            <div className='h-screen w-screen flex justify-center items-center bg-white'>
                <div className='flex rounded-lg shadow-xl w-3/4 h-[90%]'>
                    <div className='flex w-1/2 flex-col p-6 bg-cyan-500 rounded-lg'>
                        <div className='flex items-center my-5'>
                            <img src="/images/bu_logo.svg" width={45} height={45} alt="BU Logo"  className='mr-2' />
                            <div className='flex bg-white rounded-lg px-3 py-1'>
                                <p className='text-cyan-500 text-xl font-semibold  mr-1'>BICOL</p>
                                <p className='text-orange-400 text-xl font-semibold  ' >UNIVERSITY</p>
                            </div>
                        </div>
                        <p className='text-xl font-semibold text-white'>RDEsys: Integrated Databank System</p>
                        <img src="/images/login_character.svg" width={225} height={225} alt="Logo"  className='mt-auto ml-auto' />
                    </div>
                    <div className='flex w-1/2 flex-col justify-center py-6 px-20 rounded-lg relative'>
                        <img src="/images/bu_logo.svg" width={120} height={120} alt="BU Logo"  className='ml-auto mr-auto' />
                        <form className='flex flex-col gap-6 h-min mt-6' onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className='text-[#464F60]'>Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className='border border-gray-200 text-black focus:ring-blue-300 focus:ring-2 focus:outline-none focus:border-transparent placeholder:font-primary'
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className='text-[#464F60]'>Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className='border border-gray-200 text-black focus:ring-blue-300 focus:ring-2 focus:outline-none focus:border-transparent placeholder:font-primary'

                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className='flex flex-col gap-3 mt-auto'>
                                <Button 
                                    className='bg-cyan-500  hover:bg-cyan-500/90 text-white' 
                                    disabled={processing}
                                    type='submit'>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Sign In
                                </Button>
                                <a href={route('auth.google')} className='w-full'>
                                    <Button
                                        type='button' 
                                        className='border border-gray-200 flex py-2 text-gray-600 w-full' 
                                        variant="secondary"
                                        disabled={processing}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" preserveAspectRatio="xMidYMid" viewBox="-3 0 262 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                                            Sign in with Google
                                    </Button>
                                </a>
                            </div>
                        </form>
                        <p className='text-sm text-cyan-500 font-semibold absolute bottom-5 left-1/2 transform -translate-x-1/2'>Bicol University OVPRDE <span className='text-gray-400'>2025</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
//             <Head title="Log in" />

//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             placeholder="email@example.com"
//                         />
//                         <InputError message={errors.email} />
//                     </div>

//                     <div className="grid gap-2">
//                         <div className="flex items-center">
//                             <Label htmlFor="password">Password</Label>
//                             {canResetPassword && (
//                                 <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
//                                     Forgot password?
//                                 </TextLink>
//                             )}
//                         </div>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={2}
//                             autoComplete="current-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="flex items-center space-x-3">
//                         <Checkbox
//                             id="remember"
//                             name="remember"
//                             checked={data.remember}
//                             onClick={() => setData('remember', !data.remember)}
//                             tabIndex={3}
//                         />
//                         <Label htmlFor="remember">Remember me</Label>
//                     </div>

//                     <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Log in
//                     </Button>
//                 </div>

//                 <div className="text-center text-sm text-muted-foreground">
//                     Don't have an account?{' '}
//                     <TextLink href={route('register')} tabIndex={5}>
//                         Sign up
//                     </TextLink>
//                 </div>
//             </form>

//             {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
//         </AuthLayout>
