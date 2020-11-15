import apiConfigs from "@/configs/api.configs";

export default {
    methods: {

        // NOUVEAUTES

        queryNews(page, media) {
            let from = (new Date()).toISOString().slice(0, 10);
            let to = new Date();
            to.setDate((new Date()).getDate() - 30);
            to = to.toISOString().slice(0, 10);
            return fetch(`${apiConfigs.apiURL}discover/${media}?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&page=${page}&primary_release_date.lte=${from}&primary_release_date.gte=${to}&sort_by=primary_release_date.desc`).then((response) => response.json());
        },
        // DETAILS

        getMovieDetails(id_movie) {
            return fetch(`${apiConfigs.apiURL}movie/${id_movie}?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&append_to_response=similar,credits`).then((response) => response.json());
        },
        getTVDetails(id_movie) {
            return fetch(`${apiConfigs.apiURL}tv/${id_movie}?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&append_to_response=similar,credits`).then((response) => response.json());
        },

        // UPCOMING

        queryUpcomingMovies(page) {
            let date = new Date().toISOString().slice(0, 10);
            return fetch(`${apiConfigs.apiURL}movie/upcoming?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&page=${page}&sort_by=release_date.desc&release_date.gte=${date}&region=FR`).then((response) => response.json());
        },

        // SEARCH

        executeQuery(query, page) {
            return fetch(`${apiConfigs.apiURL}search/multi?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&query=${query}&page=${page}`).then((response) => response.json());
        },

        // LIST
        // isInWatchList(movie_id){
        // /movie/{movie_id}/account_states
        isInWatchList(movie_id, type) {
            let user = this.getCurrentSession();
            let mysess = user.uid;
            return fetch(`${apiConfigs.apiURL}${type}/${movie_id}/account_states?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&session_id=${mysess}`).then((response) => response.json());
        },

        getMovieWatchList(page) {
            let user = this.getCurrentSession();
            let myid = user.userid;
            let mysess = user.uid;
            return fetch(`${apiConfigs.apiURL}account/${myid}/watchlist/movies?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&session_id=${mysess}&page=${page}`, {
                method: "get",
            }).then((response) => response.json());
        },

        getTvWatchList(page) {
            let user = this.getCurrentSession();
            let myid = user.userid;
            let mysess = user.uid;
            return fetch(`${apiConfigs.apiURL}account/${myid}/watchlist/tv?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&session_id=${mysess}&page=${page}`, {
                method: "get",
            }).then((response) => response.json());
        },

        toggleWatchList(media_id, media_type, state) {
            let user = this.getCurrentSession();
            let myid = user.userid;
            let mysess = user.uid;
            return fetch(`${apiConfigs.apiURL}account/${myid}/watchlist?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&session_id=${mysess}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "media_type": media_type,
                    "media_id": media_id,
                    "watchlist": state
                })
            }).then((response) => response.json());
        },

        // FIN LIST

        getDiscover() {
            return fetch(`${apiConfigs.apiURL}discover/movie?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}`)
                .then((response) => response.json());
        },

        getList(requestUrl) {
            return fetch(`https://api.themoviedb.org/3${requestUrl}?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}`)
                .then((response) => response.json());
        },

        getPopularTv() {
            return fetch(`${apiConfigs.apiURL}tv/popular?api_key=${apiConfigs.apiKey}&language=${apiConfigs.appLang}&page=1`)
                .then((response) => response.json());
        },
    }
}