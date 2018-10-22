import Axios from 'axios';

const client = Axios.create({
    baseURL: `https://devfest-nantes-2018-api.cleverapps.io/`,
    timeout: 1000,
});

export const endpoints = {
    speakers: {
        getAll: () => client.get(`/speakers`)
    },
    sessions: {
        getAll:() => client.get(`/sessions`)
    },
    schedule: {
        getAll:() => client.get(`/schedule`)
    }
};

export default client;