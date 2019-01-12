This directory contains tests for both top-level components (such as App.tsx) as well as 
test for components in the `/pages` folder. The reason `/pages` components are included
here is that by design they are generally single-use components that wrap many other components
and actions into themselves and are thus natural candidates for
integration tests, so that is the focus of this top-level `__tests__` folder.