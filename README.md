# Emfactor

*NOTE: Emfactor is currently in pre-alpha development. Not all planned features are implemented. Code quality, documentation, test 
coverage, design, and functionality are not representative of a release version
of the project.*

Emfactor is an intelligent retail staff and schedule management app that saves time 
and provides a superior experience for managers and employees alike. Some key planned features:
* Scheduling system that automatically takes employee availability, vacations, overtime, 
roles, and other info into account, allowing managers to easily find the right employees 
for each shift.
* Vacation/Shift Swap requests that fully integrate with the schedule system, allowing
managers to instantly see and approve possible replacements before approving the request.
* Notification system for requests/schedule changes that keeps everyone on the same page.
* Accessible on all platforms (computer/tablet/mobile) for ease of access.
* Company-wide policies as well as role-specific guides that automatically become 
available to the relevant employees, giving them easy access to info they need to do 
their jobs well.

In addition to its own value as a product, I'm building it to gain experience with a few libraries I have not
used before (like TypeScript) and to provide a readily available demonstration of my 
skills for potential employers.

## Demo

You can try out the current progress of the project at [https://emfactorapp.com](https://emfactorapp.com). 

Currently you are automatically logged in as a manager and thus able to see all app features

## Structure

There are 4 distinct modules which are treated as their own packages within the app. Each has 
their own README which you can consult for additional details.

* `client-core` [(README)](./client-core/README.md)
    * Handles state management, actions, and interaction with the server. 
Front-end business logic goes here so that it can be easily re-used between platforms. It is blind
to the specific implementation of the interface and is solely concerned with the data of the application.
* `client-web` [(README)](./client-web/README.md)
    * Handles display and user interactions for web browsers. It 
* `client-mobile` (Not yet implemented)
    * Handles display and UI for the native mobile environment. 
This may be split into `client-android` and `client-ios` depending on project needs. 
* `server` (Only file serving implemented)
    * Handles serving files, authentication API requests from the client, fetching/persisting
entities to the database, and authentication.


### Running Development Environment

Execute each command in a separate terminal tab. Make sure to start up all sections you will be 
making changes to.

**Client Core**  
`npm run dev-core`  
This is mostly needed for TypeScript transpilation. Alternatively you can set up 
file watchers through your IDE.

**Web Client**  
`npm run dev-web`
