import { useEffect } from 'react';

export default function ParseCode() {
  useEffect(() => {
    // Parse the query string
    const queryParams = new URLSearchParams(window.location.search);
    // Extract the 'code' parameter
    const authCode = queryParams.get('code');

    if (authCode) {
      console.log('Authorization Code:', authCode);

      // Optional: Do something with the authorization code here
      // For example, exchange it for an access token

      // Remove the 'code' parameter from the URL
      queryParams.delete('code');
      const newRelativeUrl =
        window.location.pathname + '?' + queryParams.toString();
      window.history.pushState({}, '', newRelativeUrl);
    }
  }, []);
}
