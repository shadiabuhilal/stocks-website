# stocks-website
Demo stocks website

<video width="320" height="240" controls>
  <source src="https://github.com/shadiabuhilal/stocks-website/raw/main/Stock-App.mp4" type="video/mp4">
</video>

----------

## Technology Used:
- JavaScript framework/lib: React using TypeScript. https://create-react-app.dev/docs/adding-typescript/
- Presentation layer: Tailwind CSS https://tailwindcss.com/
- React Svg icon components: react-icons https://www.npmjs.com/package/react-icons
- React Loaders/spinners component: react-spinners https://www.npmjs.com/package/react-spinners
- React toast component: react-toastify https://www.npmjs.com/package/react-toastify
- React click outside detection component: use-outside-click-react-hook https://www.npmjs.com/package/use-outside-click-react-hook

----------
## How to run:

### How to run the mock backend:
```
npm run start:server
```

### Backend API Endpoint:
http://localhost:3001/stocks


### Mocked DB file:

Note: This file will remove entries when applying delete. to try again you can copy the content of the readonly file and paste it to this file.

```
mock-server/db.json
```


### Mocked readonly DB file:

```
mock-server/db-readonly.json
```


### How to run the front end as Prod:
```
npm run start:prod
```

### How to run the front end as Dev:
```
npm run start
```

### Frontend Endpoint:
http://localhost:3000

----------

## Covered functionality:
- BE:
    - BE mock server to apply CRUD using 'json-server' pkg
    - Implement and prepare http://localhost:3001/stocks 
- FE:
    - Create resauble UI components, like: DropdownList, Label, Grid ..etc
    - Create Stock grid listing page with tag filter.
    - Call BE api to get stocks, and show loading skeletons for better UX.
    - Call BE api to delete stock by id (note: 'json-server' has limitation, it depends on id for delete).
    - Apply tag filtering.
    - Showing detail panel after clicking on the symbol link (I user a button instead of link for better UX).
    - In action column and 'X' icon is shown upon hover, and upon a single click, deletes that stock entry from the grid and persistence. 
    - Handling errors/failures.
    - DropdownList menu with scroll support for long content.
    - Semantics of JavaScript.
    - Documentation of code (for some of the app, in future UI components can be documented using storybook).
    - Apply accessibility (we can improve more).
    - No need to user redux or any state managment for this small demo project.
    

----------

## Troubleshooting:

### The stock list is fetched twice, when page loads when running FE as dev using `npm run start`?
This is a common problem in react when it's using `<React.StrictMode>`, this component only runs in dev js bundle, it will be ignored on prod bundle.
Running `npm run start:prod` will run the production bundle. Or removing `<React.StrictMode>` usage by checking a condition from env var, and turn it on and off based on the needs.

For more info regarding `<React.StrictMode>`, please check:
- https://stackoverflow.com/a/72238236/1319387
- https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode


----------

## Future plans:
- Add pagination to grid data.
- User react routing for deeplink to support browser history in navigation, or slecting stock items and tag filters.
- Add StoryBook https://storybook.js.org/ to this project, it provides auto documentation for UI components, ability to build component without depending on parent component/page and more.
- Add unit tests using Jest https://jestjs.io/ and react-testing-library https://testing-library.com/docs/react-testing-library/intro/
- Adding function/e2e tests using cypress https://www.cypress.io/
- Integrate Github CI/CD actions to build and test and publish StoryBook.

