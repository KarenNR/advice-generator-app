<script setup>
import { onMounted, ref } from 'vue';

/* ADVICE GENERATOR */

let adviceId = ref(0);
let advice = ref("");
let loading = ref(false);

async function getAdvice() {
    loading.value = true;
    // Get content from API
    let res = await fetch("/api/advice", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        cache: "no-cache"
    });
    let data = await res.json();
    // Update content in component
    adviceId.value = data.slip.id;
    advice.value = data.slip.advice;
    loading.value = false;
}

/* DISPLAY IMAGE BASED ON CONTENT */

let imageSRC = ref("/images/pattern-divider-desktop.svg");
var media = window.matchMedia("(max-width: 767.98px)")

media.addEventListener("change", function() {
    if (media.matches) {
        imageSRC.value = "/images/pattern-divider-mobile.svg";
    } else {
        imageSRC.value = "/images/pattern-divider-desktop.svg";
    }
});

/* GET ADVICE WHEN COMPONENT IS RENDERED */

onMounted(async () => {
    await getAdvice();
});
</script>

<template>
    <div class="advice-container">
        <h5>Advice #{{ adviceId }}</h5>
        <p>
            "{{ advice }}"
        </p>
        <img alt="divider" :src="imageSRC" class="divider"><br> 
        <button @click="getAdvice()" :disabled="loading">
            <template v-if="loading">
                <div class="loader"></div>
            </template>
            <template v-else>
                <img alt="dice" src="/images/icon-dice.svg">
            </template>
        </button>
    </div>
</template>

<style scoped>
    .advice-container {
        background-color: hsl(217, 19%, 24%);
        color: hsl(193, 38%, 86%);
        border-radius: 10px;
        padding: 20px 40px 60px 40px;
        width: 30%;
    }

    .divider {
        width: 100%;
    }

    h5 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: hsl(150, 100%, 66%);
    }

    p {
        text-align: center;
        font-size: 28px;
    }

    button {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        color: hsl(218, 23%, 16%);
        background-color: hsl(150, 100%, 66%);
        border: none;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        margin-top: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        box-shadow: 0 0 50px -5px hsl(150, 100%, 66%);
    }

    button:disabled {
        box-shadow: none;
        background-color: hsl(217, 19%, 38%);
        cursor: progress;
    }

    .loader {
        border: 2px solid hsl(217, 19%, 24%);
        border-top: 2px solid hsl(193, 38%, 86%);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* -------------------- MOBILE STYLES -------------------- */

    @media screen and (max-width: 767.98px) { 
        .advice-container {
            width: 80%;
        }
    }
</style>