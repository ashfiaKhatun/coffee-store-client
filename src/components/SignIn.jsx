import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SignIn = () => {

    const { signInUser } = useContext(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                const user = {
                    email,
                    lastLoggedAt: result.user?.metadata?.lastSignInTime
                }
                // update last logged at in the database
                fetch('https://coffee-store-server-teal-gamma.vercel.app/user', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="min-h-screen bg-base-200">
            <h1 className="text-5xl text-center font-bold py-8">Sign In!</h1>

            <div className="w-1/3 mx-auto shadow-2xl bg-base-100 rounded-lg">
                <form onSubmit={handleSignIn} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;