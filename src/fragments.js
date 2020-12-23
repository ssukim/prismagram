export const USER_FRAGMENT = `
    id
    userName
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        userName
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        location
        caption
        File {
            ${FILE_FRAGMENT}
        }
        comment {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`;