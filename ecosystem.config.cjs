module.exports = {
        apps: [
                {
                        name: "vaibhav-thakre.mns.com",
                        script: "server.js",
                        instances: 1,
                        autorestart: true,
                        watch: false,
                        max_memory_restart: "2G",
                        env: {
                                NODE_ENV: "development",
                        },
                        env_production: {
                                NODE_ENV: "production",
                        },
                },
        ],
};
