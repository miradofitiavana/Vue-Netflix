import apiConfigs from "@/configs/api.configs";


export default {
    methods: {

        logout() {
            this.deleteSession().then((res) => {
                if (res.success) {
                    localStorage.removeItem('user_token');
                    this.$store.dispatch('setLogged', { iud: '', username: '' });
                }
            });
        },

        deleteSession() {
            let user = this.getCurrentSession();
            let mysess = user.uid;
            return fetch(`${apiConfigs.apiURL}authentication/session?api_key=${apiConfigs.apiKey}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ session_id: mysess })
            }).then((res) => res.json());

        },

        getCurrentSession() {
            let donnees = JSON.parse(localStorage.getItem('user_token')) || { user: { iud: '', username: '' } };
            return donnees.user;
        },

        getAccountDetails(session_id) {
            return fetch(`${apiConfigs.apiURL}account?api_key=${apiConfigs.apiKey}&session_id=${session_id}`, {
                method: "get",
            }).then((res) => res.json());
        },

        authenticate(user) {
            let token = {
                status_message: "Erreur de connexion",
                success: false
            };
            let id_session = 0;
            return this.getToken().then((resToken) => {
                if (resToken.success) {
                    token = resToken;
                    return this.createSessionWithLogin(user.username, user.password, resToken.request_token).then((token_valide) => {
                        if (token_valide.success) {
                            return this.createSessionID(token_valide.request_token).then((token_session) => {
                                token = token_session;
                                if (token_session.success) {
                                    id_session = token_session.session_id;

                                    return this.getAccountDetails(id_session).then((res) => {
                                        let account_details = res;

                                        token.status_message = "OK";
                                        let userData = { uid: token_session.session_id, username: user.username, userid: account_details.id, adult: account_details.include_adult };
                                        localStorage.setItem('user_token', JSON.stringify({ success: token_session.success, user: userData }));
                                        this.$store.dispatch('setLogged', userData);
                                        return token;
                                    });
                                }
                                return null;
                            });
                        }
                        return null;
                    });
                }
                return null;
            });
        },

        getToken() {
            return fetch(`${apiConfigs.apiURL}authentication/token/new?api_key=${apiConfigs.apiKey}`, {
                method: "get"
            })
                .then((response) => response.json());
        },

        createSessionWithLogin(username, password, request_token) {
            return fetch(`${apiConfigs.apiURL}authentication/token/validate_with_login?api_key=${apiConfigs.apiKey}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username, password: password, request_token: request_token })
                })
                .then((res) => res.json());
        },

        createSessionID(request_token) {
            return fetch(`${apiConfigs.apiURL}authentication/session/new?api_key=${apiConfigs.apiKey}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ request_token: request_token })
                })
                .then((response) => response.json());
        },
    }
}