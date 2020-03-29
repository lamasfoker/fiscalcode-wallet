"use strict";

import NavigationBar from './views/components/NavigationBar.js'
import Validate from './views/pages/Validate.js'
import List from './views/pages/List.js'
import Generate from './views/pages/Generate.js'
import {isBrowserCompatible} from './services/Utils.js'

document.addEventListener('DOMContentLoaded', async () => {
    if (!isBrowserCompatible()) {
        return;
    }

    try {
        await navigator.serviceWorker.register('/serviceWorker.js');
        console.log('[SW] Service worker has been registered');
    } catch (e) {
        console.error('[SW] Service worker registration failed', e);
    }

    NavigationBar.render();
    List.render();
    Validate.render();
    Generate.render();
});
