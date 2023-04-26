import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'toiktntw',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true
});

export default client;
