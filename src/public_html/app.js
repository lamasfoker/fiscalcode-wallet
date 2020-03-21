"use strict";

import Utils from './services/Utils.js'
import HeaderBar from './views/components/HeaderBar.js'
import BottomBar from './views/components/BottomBar.js'
import Validate from './views/pages/Validate.js'
import List from './views/pages/List.js'
import Generate from './views/pages/Generate.js'
import SaveModal from "./views/pages/SaveModal.js";
import OmocodieModal from "./views/pages/OmocodieModal.js";

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

    HeaderBar.render();
    BottomBar.render();
    window.onhashchange = router;

    window.dispatchEvent(new HashChangeEvent("hashchange"));
    location.hash = '#/';
});

const routes = {
    '/': List
    , '/validate': Validate
    , '/generate': Generate
    , '/list': List
    , '/save-modal': SaveModal
    , '/omocodie-modal': OmocodieModal
};

const router = () => {
    let parsedURL = location.hash.slice(1);
    let page = routes[parsedURL] ? routes[parsedURL] : List;
    page.render();
};
