<template>
    <div>
        <p>Git revision: <a :href='commitURL'>{{revision}}</a> - {{message}}</p>
        <h2 class='ui header'>Third Party Licenses</h2>
        <div class='ui vertical segment'>
            <h3 class='ui header'>
                Open Source Software
            </h3>
            <p> Licenses and dependencies to Open Source sofware can be found
                on the
                <a href='https://github.com/Franky47/secret-santa-app'>GitHub repository</a>, in
                <a href='https://github.com/Franky47/secret-santa-app/blob/master/package.json'>package.json</a>.
            </p>
        </div>
        <div class='ui vertical segment'>
            <h3 class='ui header'>
                Firebase
                <div class='sub header'>Auth + Realtime Database + Storage + Hosting</div>
            </h3>
            <p> <a href='https://firebase.google.com'>Firebase</a>
                is a project acquired by Google that provides authentication,
                realtime database, storage and hosting services.
                It is used at the core of the app to handle the user authentication
                workflow, the bindings with Facebook Login, serves as a reactive source of
                truth for the app state, stores avatars and other resources,
                and is the main hosting platform for the built static pages, at
                <a href='https://secret-santa.io'>secret-santa.io</a>.
            </p>
        </div>
        <div class='ui vertical segment'>
            <h3 class='ui header'>
                BrowserStack
                <div class='sub header'>Automated testing across Desktop & Mobile browsers</div>
            </h3>
            <p> This app uses <a href='https://www.browserstack.com'>BrowserStack</a> for automated testing of the rendering
                on various platforms and browsers.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        revision:   __git__.revision,
        message:    __git__.message
    }),
    computed: {
        commitURL() {
            return `https://github.com/Franky47/secret-santa-app/commit/${this.revision}`
        }
    }
}
</script>
