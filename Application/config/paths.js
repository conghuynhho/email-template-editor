let path = require('path');
let fs = require('fs');
let appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => {
    return path.resolve(appDirectory, relativePath);
};

// Config after eject: we're in ./config/
module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('docs/index.js'),
    appIndexTsx: resolveApp('docs/index.tsx'),
    appSandbox: resolveApp(process.env.STATIC_SANDBOX_FOLDER || 'static'),
    buildIndexJs: resolveApp('components/index.js'),
    buildIndexTs: resolveApp('components/index.tsx'),
    appSrc: resolveApp('lib')
};
