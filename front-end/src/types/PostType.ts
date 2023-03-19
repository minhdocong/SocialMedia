export interface PostType {
    _id?: string;
    userId?: string;
    content?: string;
    img?: {
        public_id: string;
        url: string;
    };
    likes?: string[];
    createdAt?: string;
}
