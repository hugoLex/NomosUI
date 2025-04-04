
import { endpoints, injectEndpoints } from "./endpoints";
// const developmentBaseURL = "https://webapp.lexanalytics.ai/api/v1/auth"
// const developmentBaseURL = "http://127.0.0.1:8000/api/v1/auth"
export const authApiSlice = injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: `/sign-up`,
                // url: `${developmentBaseURL}/sign-up`,
                // url: credentials.id ? `/signup/${credentials.id}` : "/signup",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: `/login`,
                // url: `${developmentBaseURL}/login`,
                method: "POST",
                body: { ...credentials },
            }),
        }),

        veriyEmail: builder.mutation({
            query: (credentials) => ({
                url: "/confirm-account",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: `/password-reset/initiate`,
                // url: `${developmentBaseURL}/password-reset/initiate`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        resendVerificationCode: builder.mutation({
            query: (credentials) => ({
                url: "/resend-verification-code",
                method: "POST",
                body: credentials,
            }),
        }),
        createNewPassword: builder.mutation({
            query: (credentials) => ({
                url: `/reset-password/${credentials.id}`,
                method: "POST",
                body: { newPassword: credentials.pwd },
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
            query: (id) => `/rtp/${id}`,
            // providesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: `/update-profile/${credentials.id}`,
                method: "PUT",
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
    useResendVerificationCodeMutation,
    useForgotPasswordMutation,
    useCreateNewPasswordMutation,
    useFetchUserQuery,
    useFetchAllUserInfoQuery,
    useFetchUserInfoQuery,
    useUpdateProfileMutation,
} = authApiSlice;