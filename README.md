# Secret Santa - Front-End
Secret Santa 2.0 - Santa as a Service.

This web application aims to simplify the random process of assinging gifts for
a "Secret Santa" party, where a group of friends choose to exchange gifts to one
another without knowing from whom they are receiving, and then guessing.

It presents itself as a SPA, where participants can sign in using either their Facebook account,
or a more traditional email/password system, and say if they are participating or not.
The date of the final assignation is indicated by the form of a giant countdown.
When the time comes, the engine runs and assigns givers with receivers.
Upon next visit of the page, each player will see who they have been assigned to give a gift to,
and will be able to secretly chat with them to get hints at what good gifts might be.
The secret chat will be anonymous so that the receiver does not know the identity of the giver.

## Install

```
npm install
npm start
```

## Tech Stuff

This project uses Google's Firebase as a back-end for authentication (through email/password or Facebook)
and real-time database (for storing user & game infos). Firebase is the single source of truth that
the front-end state and the back-end engine consume and update.

The front-end code runs on Vue.js and its pals (vue-router, vuex and a bunch of vue-* for convenience).
The look and feel is handled by Semantic UI.
Everything is bundled by webpack and deployed with Surge.
