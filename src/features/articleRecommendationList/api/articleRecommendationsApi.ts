import {rtkApi} from "shared/api/rtkApi";
import {Article} from "entities/Article";

const recommentdationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendations: build.query<Article[], number>({
            query: (limit) => ({
                url: "/articles",
                params: {
                    _limit: limit
                }
            })
        }),
    }),
    overrideExisting: false,
})
export const useArticleRecommendations = recommentdationsApi.useGetArticleRecommendationsQuery
