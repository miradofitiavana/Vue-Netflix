import apiConfigs from "@/configs/api.configs";

export default {
    methods: {
        serieAiring() {
            return fetch(`${apiConfigs.apiURL}tv/popular?api_key=${apiConfigs.apiKey}`).then((response) => response.json());
        },
    }
}