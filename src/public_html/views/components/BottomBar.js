"use strict";

const $ = document.querySelector.bind(document);

export default class BottomBar{
    static template() {
        return `
            <footer>
                <nav class="top-nav fixed-bottom-bar">
                    <div class="container">
                        <div class="nav-wrapper">
                            <div class="row menu">
                                <div class="col s12 center-align">
                                    <a class="btn-flat" href="#/generate"><i class="material-icons">sync</i></a>
                                    <a class="btn-flat" href="#/list"><i class="material-icons">credit_card</i></a>
                                    <a class="btn-flat" href="#/validate"><i class="material-icons">spellcheck</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
        `
    }

    static render() {
        $('#bottombar-container').innerHTML = this.template();
    }
}
