"use strict";

const $ = document.querySelector.bind(document);

export default class HeaderBar{
    static template() {
        return `
            <header>
                <nav class="top-nav fixed-nav-bar">
                    <div class="container">
                        <div class="nav-wrapper">
                            <div class="row">
                                <div class="col s12">
                                    <h5 id="header-title" class="header center-align">Codici Fiscali Salvati</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        `
    }

    static render() {
        $('#headerbar-container').innerHTML = this.template();
    }
}
