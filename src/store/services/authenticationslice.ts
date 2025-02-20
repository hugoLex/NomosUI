
import { endpoints, injectEndpoints } from "./endpoints";

export const authApiSlice = injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: credentials.id ? `/signup/${credentials.id}` : "/signup",
                method: "POST",
                body: { ...credentials.info },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/signin",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        veriyEmail: builder.mutation({
            query: (credentials) => ({
                url: "/verify-email",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: "/forgot-password",
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