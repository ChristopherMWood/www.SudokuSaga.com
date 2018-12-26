<template>
    <div class="settings-container">
        <label>{{ title }}</label>
        <p>{{ description }}</p>
    </div>
</template>

<script>
    export default {
        data: () => ({
            title: 'Checkbox',
            description: 'Setting description'
        }),
        watches: {
            
        }
    }
</script>

<style>
</style>