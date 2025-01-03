import axios from "axios";
import {
    ChannelHomeParams,
    ChannelVideos,
    CommentParams,
    CommentResponse,
    SearchParams,
    ShortDetail,
    ShortResponse,
    VideoResponse,
} from "../types";

const BASE_URL = "https://yt-api.p.rapidapi.com";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "X-RapidAPI-Key": "1f38b8ed59mshaee3e67dd81e967p1a8795jsne747106aa251", // Add your RapidAPI key here
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
});

interface FetchVideosParams {
    type: string;
    token: string | null;
    geo?: string;
    lang?: string;
    id?: string;
}

export const fetchVideos = async ({
    type,
    token,
    geo = "US",
    lang = "en",
    id,
}: FetchVideosParams) => {
    try {
        const { data } = await apiClient.get<VideoResponse>(`/${type}`, {
            params: {
                token,
                geo,
                lang,
                id,
            },
        });
        return data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw new Error("Failed to fetch videos");
    }
};

export const searchVideos = async (params: SearchParams) => {
    const { data } = await apiClient.get<VideoResponse>("/search", {
        params: params,
    });
    return data;
};

export const fetchVideoDetails = async (id: string) => {
    const { data } = await apiClient.get(`/video/${id}`);
    return data;
};

export const fetchShorts = async (params: string) => {
    const { data } = await apiClient.get<ShortResponse>("/shorts/sequence", {
        params: { params },
    });
    return data;
};

export const fetchShortDetails = async (id: string) => {
    const { data } = await apiClient.get<ShortDetail>(`/shorts/info`, {
        params: { id },
    });
    return data;
};

export const fetchChannelDetails = async (params: ChannelHomeParams) => {
    const { data } = await apiClient.get<ChannelVideos>(`/channel/home`, {
        params: params,
    });
    return data;
};

export const fetchChannelVideos = async (params: ChannelHomeParams) => {
    const { data } = await apiClient.get<ChannelVideos>(`/channel/videos`, {
        params: params,
    });
    return data;
};

export const fetchChannelShorts = async (params: ChannelHomeParams) => {
    const { data } = await apiClient.get<ChannelVideos>(`/channel/shorts`, {
        params: params,
    });
    return data;
};

export const fetchComments = async (params: CommentParams) => {
    const { data } = await apiClient.get<CommentResponse>(`/comments`, {
        params: params,
    });
    return data;
};
