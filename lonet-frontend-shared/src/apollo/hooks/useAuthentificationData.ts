import {gql, useQuery } from "@apollo/client";


type User = {
    id: string;
    username: string;
}

type ResponseType = { me: User }

const USER_INFO = gql`
    query GetUserInfo {
      me{
        id
        username
      }
    }
`;

export const useAuthentificationData = () => {
    const {
        data,
        loading: isLoading,
        error
    } = useQuery<ResponseType>(USER_INFO);

    const isAuthorized = Boolean(data?.me?.id);

    return {
        isAuthorized,
        isLoading,
        me: data?.me,
    }
}
