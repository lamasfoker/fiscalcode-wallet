"use strict";

import Utils from './services/Utils.js'
import HeaderBar from './views/components/HeaderBar.js'
import BottomBar from './views/components/BottomBar.js'
import Validate from './views/pages/Validate.js'
import List from './views/pages/List.js'
import Generate from './views/pages/Generate.js'
import Save from "./views/components/modals/Save.js";
import Omocodie from "./views/components/modals/Omocodie.js";
import Delete from "./views/components/modals/Delete.js";

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
    , '/save-fiscalcode': Save
    , '/check-omocodie': Omocodie
    , '/delete-fiscalcode': Delete
};

const router = () => {
    let parsedURL = location.hash.slice(1);
    let page = routes[parsedURL] ? routes[parsedURL] : List;
    page.render();
};
