interface UserComment {
    avatar: {
        url: string;
        public_id: string;
    };
    name: string;
    email: string;
    _id: string;
}

export interface CommentType {
    content: string;
    user: UserComment;
}