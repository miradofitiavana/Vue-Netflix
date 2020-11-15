import apiConfigs from "@/configs/api.configs";

export default {
    methods: {
        movieGetLatest() {
            return fetch(`${apiConfigs.apiURL}movie/latest?api_key=${apiConfigs.apiKey}`).then((response) => response.json());
        },
    }
}