import {rtkApi} from "@/shared/api/rtkApi";
import {Rating} from "@/entities/Rating";
import * as url from "url";

interface getProfileRatingArg {
    userId: string;
    profileId: string;
}
interface rateProfileArg{
    userId: string,
    profileId: string,
    rate: number,
    feedback?: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], getProfileRatingArg>({
            query: ({userId, profileId}) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId
                }
            })
        }),
        rateProfile:build.mutation<void,rateProfileArg>({
            query:(arg)=>({
                url:'/profile-ratings',
                method:"POST",
                body:arg
            })
        })

    })
})

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const  useRateProfileRating = profileRatingApi.useRateProfileMutation;
