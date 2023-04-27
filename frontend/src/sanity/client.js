import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'toiktntw',
    dataset: 'production',
    apiVersion: '2021-10-21',
    token: 'skZTsrbfdsmChMXW1Jc5WixaNhixbyy4ItkbUdJtVkqVH9xkcaYFE88gp15BQmWb5oENN9iwBaxLtq8bsgsquUCoA7dIlX7Lb6M9eygmfW9BHlaEhh9EFf5vGuk2c9m7qhaXnhoeODTGdSpANQHVbfiwfnW7wUDchpq8DJh2OZmDjSDDkKH7',
    useCdn: false,
    ignoreBrowserTokenWarning: true
});

export default client;
