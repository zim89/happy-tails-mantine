import { useEffect } from 'react';

export default function ParseCode() {
  useEffect(() => {
    // Parse the query string
    const queryParams = new URLSearchParams(window.location.search);
    // Extract the 'code' parameter
    const authCode = queryParams.get('code');

    if (authCode) {
      // Remove the 'code' parameter from the URL
      queryParams.delete('code');
      const newRelativeUrl =
        window.location.pathname + '?' + queryParams.toString();
      window.history.pushState({}, '', newRelativeUrl);
    }
  }, []);
}
