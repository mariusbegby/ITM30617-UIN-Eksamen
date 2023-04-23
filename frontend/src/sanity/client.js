import sanityClient from '@sanity/client';

const options = {
    projectId: 'toiktntw',
    dataset: 'production'
};

const client = sanityClient({
    ...options,
    apiVersion: '2021-10-21',
    useCdn: true
});

export default client;
