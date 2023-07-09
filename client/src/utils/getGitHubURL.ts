export function getGitHubURL(path: string): string {
    const rootURL = 'https://github.com/login/oauth/authorize';

    let clientID : string ;
    // check if the server is running in development mode and set the client_id accordingly
    if (process.env.NODE_ENV === 'development') {
        clientID = process.env.REACT_APP_GITHUB_CLIENT_ID_DEV as string;
    } else {
        clientID = process.env.REACT_APP_GITHUB_CLIENT_ID as string;
    }
    
    const options = {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID as string,
        redirect_uri: clientID,
        scope: 'user:email',
        state: path,
    };

    const queryString = new URLSearchParams(options).toString();

    return `${rootURL}?${queryString}`;
};