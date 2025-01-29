<script setup>
    import AdviceComponent from './components/AdviceComponent.vue';
    import AttributionComponent from './components/AttributionComponent.vue';
</script>

<template>
    <div class="container">
        <AdviceComponent />
        <AttributionComponent />
    </div> 
</template>

<style scoped>
    .container {
        height: 100vh;
        background-color: hsl(218, 23%, 16%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
