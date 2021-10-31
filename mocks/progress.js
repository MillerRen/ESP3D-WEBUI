const sleep = (value) =>
    new Promise((resolve) => setTimeout(resolve, value));

// this mocks a request which slowly resolves (20% progress every 500ms)
export default async (config) => {
    const total = 1024; // mocked file size
    for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
        await sleep(500);
        if (config.onUploadProgress) {
            console.log(`uploading: ${100 * progress}%`)
            config.onUploadProgress({ loaded: total * progress, total });
        }
    }
    return [200, {}];
}