export function getGitHubOAuthURL(path: string): string {
    const rootURL = 'https://github.com/login/oauth/authorize';

    let clientID : string ;
    let redirectURL : string ;
    // check if the server is running in development mode and set the client_id accordingly
    if (process.env.NODE_ENV === 'development') {
        clientID = process.env.GITHUB_CLIENT_ID_DEV as string;
        // join the API_URL and the GITHUB_OAUTH_REDIRECT_URL to get the redirectURL
        redirectURL = process.env.API_URL?.concat(process.env.GITHUB_OAUTH_REDIRECT_URL as string) as string;
    } else {
        clientID = process.env.GITHUB_CLIENT_ID_PROD as string;
        redirectURL = process.env.API_URL_REMOTE?.concat(process.env.GITHUB_OAUTH_REDIRECT_URL as string) as string;
    }
    
    const options = {
        client_id: clientID,
        redirect_uri: redirectURL,
        scope: 'user:email',
        state: path,
    };

    const queryString = new URLSearchParams(options).toString();

    return `${rootURL}?${queryString}`;
};

export function getGoogleOAuthURL (path: string) {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
    let clientID : string ;
    let redirectURL : string ;
    // check if the server is running in development mode and set the client_id accordingly
    if (process.env.NODE_ENV === 'development') {
        clientID = process.env.GOOGLE_CLIENT_ID_DEV as string;
        // join the API_URL and the GITHUB_OAUTH_REDIRECT_URL to get the redirectURL
        redirectURL = process.env.API_URL?.concat(process.env.GOOGLE_OAUTH_REDIRECT_URL as string) as string;
    } else {
        clientID = process.env.GOOGLE_CLIENT_ID_PROD as string;
        redirectURL = process.env.API_URL_REMOTE?.concat(process.env.GOOGLE_OAUTH_REDIRECT_URL as string) as string;
    }

    const options = {
      redirect_uri: redirectURL,
      client_id: clientID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: path,
    };
  
    const queryString = new URLSearchParams(options).toString();
  
    return `${rootUrl}?${queryString}`;
  };