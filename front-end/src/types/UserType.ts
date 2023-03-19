interface Website {
    facebook?: string;
    instagram?: string;
    linkedIn?: string;
}
export interface User {
    _id: string;
    email: string;
    name?: string;
    bio?: string;
    location?: string;
    avatar?: {
        public_id: string;
        url: string;
    };
    requestFollowers?: string[];
    requestFollowings?: string[];
    followers?: string[];
    followings?: string[];
    website?: Website;
}
