import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import toast from 'react-hot-toast';
import axios from 'axios';
import User from '@/models/User';
import { connectDB } from '@/utils/mongoose';
import { errorOptions, successOptions } from '@/constants';


export const AuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log('user', user);
            console.log('account', account);

            const { email, name, image } = user;
            const { provider } = account;
            
            await connectDB();

            if (account.provider === 'google') {
                try {

                    const userExists = await User.findOne({ provider });

                    if (!userExists) {
                        const { data, status } = await axios.post('http://localhost:3000/api/user', {
                            email, name, image, provider
                        });
                        console.log(data);
                        if (status === 200) {
                            return user;
                        }   
                    }
                    return userExists;
                } catch (error) {
                    console.log(error)
                }
            } else if (account.provider === 'github') {
                try {
                    const userExists = await User.findOne({ provider });

                    if (!userExists) {
                        const { data, status } = await axios.post('http://localhost:3000/api/user', {
                            email, name, image, provider
                        });

                        console.log(data);
                        toast.success('Login Successful', successOptions);

                        if (status === 200) {
                            return user;
                        }
                    }
                    
                    return userExists;
                } catch (error) {
                    console.log(error);
                }
            }

            return user;
        }
    }
};

export default NextAuth(AuthOptions);


