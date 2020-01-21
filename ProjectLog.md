## Feature

- Training, prompt user with dialog, when leaving the trainings area, reset local storage
- Dashboard, count how many trainings of type X have been completed.

- Training, change resources to objects with link and title. - see Design task
- Training, create preview of types / difficulties of questions - see Design task
- Training, add store button to resources so it can be read later on, show related questions. - see Design task

* New View, Currate the learning path based on the amount of time some has to prepare for the interview, as who they are interviewing with.

## SECURITY

- mdfile reader, concern related to XSS with injecting html

- issue new Token for each request reached the backend.

## Bug Fixes

- replace mock data with actual data from backend. / rm unsued Card component
- Training, overwrite overflow of view body, in body things should overflow

## ARCHITECTURE

- dataManager, change logic from promise chain to async await for readability
- dataManager, change name to indicate async behaviour
- dataManager, create abstraction for setting Headers

- requests, write abstraction to not repeat yourself all the time

# Design

- reorganise Training experience
  - meta information of session between headline and questions card - question counter 4/10, difficulty, type tags - js, node, css etc.
