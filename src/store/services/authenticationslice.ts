
import { baseURL } from "@app/utils";
import { injectEndpoints } from "./endpoints";

// Some services are not running locally hence the discrepancy in logic
//  for api for dev and prod
// Helper function to create headers with auth token if available


const BaseURL = {
    production: `${baseURL}/v1/auth`, test: `${baseURL}/v1/auth`,
    development: "http://127.0.0.1:8000/api/v1/auth"
}[process.env.NODE_ENV]
export const authApiSlice = injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/sign-up`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                // url: `/login`,
                // url: `${"http://127.0.0.1:8000/api/v1/auth"}/login`,
                url: `${BaseURL}/login`,
                method: "POST",
                body: { ...credentials },
            }),
        }),

        veriyEmail: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/confirm-account`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        veriy_SC_no: builder.mutation({
            query: (user_data: {
                SC_NO: number | string;
                email: string
            }) => ({
                url: `${BaseURL}/lawyers/${user_data.SC_NO}/verify`,
                method: "POST",
                body: { email: user_data.email },
                // headers: createHeaders()
            }),
        }),

        forgot_password_initiate: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/password-reset/initiate`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        resendVerificationCode: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/resend-verification-code`,
                method: "POST",
                body: credentials,
            }),
        }),
        createNewPassword: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/password-reset/complete`,
                // url: `${BaseURL}/reset-password/${credentials.id}`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        // this is for the signup referral id
        fetchUser: builder.query({
            query: (id) => `/get-user/${id}`,
        }),
        // this fetches all the user info and hydrates the rest of the components
        fetchAllUserInfo: builder.query({
            query: (id) => `/get/${id}`,
            // providesTags: ["User"],
        }),
        // this fetches the user info for profile page
        fetchUserInfo: builder.query({
            query: (id) => ({

                url: `${BaseURL}/users/${id}`,
                // headers: createHeaders(),
                // credentials: "include"
            }),

            providesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: `/update-profile/${credentials.id}`,
                method: "PUT",
                body: { ...credentials },
            }),
            // invalidatesTags: ["User"],
        }),
        onboard_account: builder.mutation({
            query: (credentials) => ({
                url: `${BaseURL}/onboard-account`,
                method: "POST",
                body: { ...credentials },
            }),
            // invalidatesTags: ["User"],
        }),
    }),
});
export const {
    useLoginMutation,
    useSignupMutation,
    useVeriyEmailMutation,
    useVeriy_SC_noMutation,
    useResendVerificationCodeMutation,
    useForgot_password_initiateMutation,
    useCreateNewPasswordMutation,
    useFetchUserQuery,
    useFetchAllUserInfoQuery,
    useFetchUserInfoQuery,
    useOnboard_accountMutation,
    useUpdateProfileMutation,
} = authApiSlice;