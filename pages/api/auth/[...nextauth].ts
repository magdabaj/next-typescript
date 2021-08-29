import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: "b5921b02c441b25cb25a",
            clientSecret: "37e998b112985b9cfc60001fe69a8437bb095b75",
            // authorizationUrl: 'https://github.com/login/oauth/authorize',
            // nextAuthUrl: 'https://github.com/login/oauth/authorize'
        })
    ]
})