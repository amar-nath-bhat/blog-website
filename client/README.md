# Creating an API and making API Calls.

In order to create an API:

1. Open the terminal and navigate to the root directory of your client project.

2. In the `src/constants/config.js` file and under the SERVICE_URLS object create your new API by naming it and providing appropriate method and url along with any params or query.

```javascript
export const SERVICE_URLS = {
  newAPI: { url: "/login", method: "POST" },
  // other apis
};
```

3. Make sure to have the coressponding route and controller in the server directory.

4. Now in the required component, import the necessary files and create the function to call the api.

```javascript
import { API } from "../services/api";
// other imports

const callApi = async () => {
  let respose = await API.newAPI();
  if (response.isSuccess) setData(response.data);
};
```

5. You've create a new API.
