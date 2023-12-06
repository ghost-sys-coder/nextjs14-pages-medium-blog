import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from 'next-auth';


export const auth0ptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ]
}

/** get server session */
export const authSession = ()=> getServerSession(auth0ptions);