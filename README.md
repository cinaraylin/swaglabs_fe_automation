## TEST EXECUTION
- `npm install`  --> installs dependencies
- `npm run cypress:run` --> runs all test cases with no user interface
or
- `npm run cypress:open` --> opens cypress ui interface
    - click 'E2E Testing' on welcome screen
    - select a browser
    - click 'Start E2E Testing' button
    - click 'TestSuite.cy.js' file from spec list
    and then test cases will start to run
    (you can switch the browser by using the drop down near the top right corner of the window)


## NOTES ##
- I used all 4 user accounts for different test cases

- One of the test cases is failing; which is expected since I used problem_user for it

- I generally used class attributes to select ui elements since most of the elements had no test id
