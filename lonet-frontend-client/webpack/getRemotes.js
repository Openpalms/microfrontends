const isProd = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

const prodHosts = {
    shared: 'https://lonet-frontend-shared.website.yandexcloud.net',
    root: 'https://lonet-frontend-root.website.yandexcloud.net',
    client: 'https://lonet-frontend-client.website.yandexcloud.net',
    transport_company: 'https://lonet-frontend-transport-company.website.yandexcloud.net',
}


const localHosts = {
    shared: 'http://localhost:2999',
    root: 'http://localhost:3000',
    client: 'http://localhost:3001',
    transport_company: 'http://localhost:3002',
}

module.exports = (key) => {
    const hostsObject = isProd ? prodHosts : localHosts;
    return { [key]: `${key}@${hostsObject[key]}/remoteEntry.js` }
}
