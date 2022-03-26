<template>
    <div class="tie-fighter">
        <img src="@/assets/tie-fighter.png" />
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="css">
    .tie-fighter {
        margin-top: 25vh;
        animation: beat .5s infinite alternate;
        transform-origin: center;
    }

    /* Heart beat animation */
    @keyframes beat{
        to { transform: scale(1.5); }
    }
</style>
