<template>
    <div>
        <h2>Create New Game</h2>
        <form class='ui form' :class='{error: errorMessage}'>
            <div class='field'>
                <label>Event Name</label>
                <input>
            </div>
            <div class='field'>
                <label>Event Date</label>
                <input type='date'>
            </div>
            <div class='field'>
                <label>Run Game On</label>
                <input type='date'>
            </div>
            <div class='field'>
                <label>Message</label>
                <textarea rows='4'></textarea>
            </div>
            <div class='field'>
                <label>Maximum amount</label>
                <input type='number'>
            </div>
            <h4 class='ui dividing header'>Rules</h4>
            <div class='field' v-for='rule in rules'>
                <div class='ui toggle checkbox'>
                    <input type='checkbox' tabindex='0' v-model='rule.value'>
                    <label>{{rule.name}}</label>
                </div>
            </div>
            <div class='ui error message'>
                <div class='header'>Error</div>
                <p>{{errorMessage}}</p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        errorMessage: null,
        rules: [
            { name: 'No Siblings',      value: false },
            { name: 'No Parents',       value: false },
            { name: 'No Children',      value: false },
            { name: 'No Other Halves',  value: false }
        ]
    })
}
</script>
