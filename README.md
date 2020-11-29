# Mask Tracker

## Description

This is an application that allows users to create accounts and then track the
longevity of their masks as they use them. They are able to update the number of
hours that they have used their masks and therefore make sure that they are
still safe for use.

The application utilizes Firebase Firestore for authentication, storage and user
and mask data. React and Redux are used on the front end.

## Known Issues and Backlog

- Edit mask re-routes to the mask details component before Redux has finished
  updating the store data
- Add models for other mask brands such as Planet Mask and filter tracking
- If user is authorized, Index defaults to login view before redirecting to user's masks list view
