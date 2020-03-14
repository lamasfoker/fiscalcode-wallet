"use strict";

import Utils from './services/Utils.js'
import HeaderBar from './views/components/HeaderBar.js'
import BottomBar from './views/components/BottomBar.js'
import Validate from './views/pages/Validate.js'
import List from './views/pages/List.js'
import Generate from './views/pages/Generate.js'

document.addEventListener('DOMContentLoaded', async () => {
    if (!Utils.isBrowserCompatible()) {
        return;
    }

    try {
        await navigator.serviceWorker.register('/serviceWorker.js');
        console.log('[SW] Service worker has been registered');
    } catch (e) {
        console.error('[SW] Service worker registration failed', e);
    }

    const headerBarContainer = document.querySelector('#headerbar-container');
    const bottomBarContainer = document.querySelector('#bottombar-container');

    headerBarContainer.innerHTML = await HeaderBar.render();
    bottomBarContainer.innerHTML = await BottomBar.render();
    window.onhashchange = router;

    window.dispatchEvent(new HashChangeEvent("hashchange"));
    location.hash = '#/';
});

const routes = {
    '/': List
    , '/validate': Validate
    , '/generate': Generate
    , '/list': List
};

const router = async () => {
    const content = document.querySelector('#main-container');
    let parsedURL = location.hash.slice(1);
    let page = routes[parsedURL] ? routes[parsedURL] : List;
    content.innerHTML = page.render();
    await page.after_render();
};
