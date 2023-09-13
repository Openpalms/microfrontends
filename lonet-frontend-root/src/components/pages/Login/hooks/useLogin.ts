import {gql, useMutation } from "@apollo/client";
import Cookies from "js-cookie";

type User = {
    id: string;
    username: string;
}

type InputType = { input: { identifier: string; password: string; } };
type ResponseType = { login: { jwt: string; user: User } }

const LOGIN = gql`
      mutation LoginUser($input: UsersPermissionsLoginInput!) {
      login(input: $input) {
        jwt
        user {
          id
          email
        }
      }
}
`;

export const useLogin = () => {
    const [login] = useMutation<ResponseType, InputType>(LOGIN, {
            onCompleted: ({ login: { jwt, user } }) => {
                Cookies.set('Authorization', 'Bearer ' + jwt);
            }
        },
    );

    return ({ email, password }: { email: string; password: string}) => {
        login({
            variables: {
                input: {
                    identifier: email,
                    password
                }
            }
        })
    }
}
