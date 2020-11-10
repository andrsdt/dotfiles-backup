//@ts-check

// NAME: Keyboard Shortcut
// AUTHOR: khanhas
// DESCRIPTION: Register a few more keybinds to support keyboard-driven navigation in Spotify client. 

/// <reference path="../globals.d.ts" />

(function KeyboardShortcut() {
    if (!Spicetify.Keyboard) {
        setTimeout(KeyboardShortcut, 1000);
        return;
    }

    const SCROLL_STEP = 50;
    const SCROLL_STEP_BIG = 500;

    /**
     * Register your own keybind with function `registerBind`
     * 
     * Syntax:
     *     registerBind(keyName, ctrl, shift, alt, callback)
     * 
     * ctrl, shift and alt are boolean, true or false
     * 
     * Valid keyName:
     * - BACKSPACE       - C               - Y               - F3
     * - TAB             - D               - Z               - F4
     * - ENTER           - E               - WINDOW_LEFT     - F5
     * - SHIFT           - F               - WINDOW_RIGHT    - F6
     * - CTRL            - G               - SELECT          - F7
     * - ALT             - H               - NUMPAD_0        - F8
     * - PAUSE/BREAK     - I               - NUMPAD_1        - F9
     * - CAPS            - J               - NUMPAD_2        - F10
     * - ESCAPE          - K               - NUMPAD_3        - F11
     * - SPACE           - L               - NUMPAD_4        - F12
     * - PAGE_UP         - M               - NUMPAD_5        - NUM_LOCK
     * - PAGE_DOWN       - N               - NUMPAD_6        - SCROLL_LOCK
     * - END             - O               - NUMPAD_7        - ;
     * - HOME            - P               - NUMPAD_8        - =
     * - ARROW_LEFT      - Q               - NUMPAD_9        - ,
     * - ARROW_UP        - R               - MULTIPLY        - -
     * - ARROW_RIGHT     - S               - ADD             - /
     * - ARROW_DOWN      - T               - SUBTRACT        - `
     * - INSERT          - U               - DECIMAL_POINT   - [
     * - DELETE          - V               - DIVIDE          - \
     * - A               - W               - F1              - ]
     * - B               - X               - F2              - "
     * 
     * Use one of keyName as a string. If key that you want isn't in that list,
     * you can also put its keycode number in keyName as a number.
     * 
     * callback is name of function you want your shortcut to bind to. It also 
     * returns one KeyboardEvent parameter.
     * 
     * Following are my default keybinds, use them as examples.
     */

    // Ctrl + Tab and Ctrl + Shift + Tab to switch sidebar items
    registerBind("TAB", true, false, false, rotateSidebarDown);
    registerBind("TAB", true, true, false, rotateSidebarUp);

    // Ctrl + Q to open Queue page
    registerBind("Q", true, false, false, clickQueueButton);

    // Shift + H and Shift + L to go back and forward page
    registerBind("H", false, true, false, clickNavigatingBackButton);
    registerBind("L", false, true, false, clickNavigatingForwardButton);

    // PageUp, PageDown to focus on iframe app before scrolling
    registerBind("PAGE_UP", false, true, false, focusOnApp);
    registerBind("PAGE_DOWN", false, true, false, focusOnApp);

    // J and K to vertically scroll app
    registerBind("J", false, false, false, appScrollDown);
    registerBind("K", false, false, false, appScrollUp);

    // D and U to vertically scroll app (big steps)
    registerBind("D", false, false, false, appScrollDownBig);
    registerBind("U", false, false, false, appScrollUpBig);

    // H and L to horizontally scroll carousel
    registerBind("H", false, false, false, carouselScrollLeft);
    registerBind("L", false, false, false, carouselScrollRight);

    // G and Shift + G to scroll to top and to bottom
    registerBind("G", false, false, false, appScrollTop);
    registerBind("G", false, true, false, appScrollBottom);

    // M to Like/Unlike track
    registerBind("M", false, false, false, Spicetify.Player.toggleHeart);

    // Forward Slash to open search page
    registerBind("/", false, false, false, openSearchPage);

    // F to activate Link Follow function
    const vim = new VimBind();
    registerBind("F", false, false, false, vim.activate.bind(vim));
    // Esc to cancle Link Follow
    registerBind("ESCAPE", false, false, false, vim.deactivate.bind(vim));

    function rotateSidebarDown() {
        rotateSidebar(1)
    }

    function rotateSidebarUp() {
        rotateSidebar(-1)
    }

    function clickQueueButton() {
        document.getElementById("player-button-queue").click();
    }

    function clickNavigatingBackButton() {
        document.querySelector("#header .back").click();
    }

    function clickNavigatingForwardButton() {
        document.querySelector("#header .forward").click();
    }

    function appScrollDown() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, SCROLL_STEP);
        }
    }

    function appScrollDownBig() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, SCROLL_STEP_BIG);
        }
    }

    function appScrollUp() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, -SCROLL_STEP);
        }
    }

    function appScrollUpBig() {
        const app = focusOnApp();
        if (app) {
            app.scrollBy(0, -SCROLL_STEP_BIG);
        }
    }

    function carouselScrollLeft() {
        const app = focusOnApp();
        if (app) {
            scrollCarousel(app.querySelectorAll(CAROUSEL_CLASSES), false);
        }
    }

    function carouselScrollRight() {
        const app = focusOnApp();
        if (app) {
            scrollCarousel(app.querySelectorAll(CAROUSEL_CLASSES), true);
        }
    }

    function appScrollBottom() {
        const app = focusOnApp();
        app.scroll(0, app.scrollHeight);
    }

    function appScrollTop() {
        const app = focusOnApp();
        app.scroll(0, 0);
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    function openSearchPage(event) {
        const sidebarItem = document.querySelector(`#view-navigation-bar a[href="spotify:app:search:"]`);
        if (sidebarItem) {
            sidebarItem.click();
            return;
        }

        const searchInput = document.querySelector(".SearchInput__input");
        if (searchInput) {
            searchInput.focus();
        }

        event.preventDefault();
    }

    const CAROUSEL_CLASSES = `.Carousel, .crsl-item.col-xs-12.col-sm-12.col-md-12.col-lg-12`;
    const CAROUSEL_NEXT_CLASSES = `[data-ta-id="next-button"], [data-button="carousel-next"]`;
    const CAROUSEL_PREVIOUS_CLASSES = `[data-ta-id="previous-button"], [data-button="carousel-previous"]`;

    /**
     * 
     * @param {string | number} keyName 
     * @param {boolean} ctrl 
     * @param {boolean} shift 
     * @param {boolean} alt 
     * @param {(event: KeyboardEvent) => void} callback 
     */
    function registerBind(keyName, ctrl, shift, alt, callback) {
        if (typeof keyName === "string") {
            keyName = Spicetify.Keyboard.KEYS[keyName];
        }

        Spicetify.Keyboard.registerShortcut(
            {
                key: keyName,
                ctrl,
                shift,
                alt,
            },
            callback,
        );
    }

    function focusOnApp() {
        /** @type {HTMLIFrameElement} */
        const iframe = document.querySelector("iframe.active");
        if (iframe) {
            iframe.focus();
            return iframe.contentDocument.querySelector("html");
        }

        /** @type {HTMLDivElement} */
        const embebbed = document.querySelector(".embedded-app.active");
        if (embebbed) {
            embebbed.firstChild.focus();
            return embebbed;
        }
    }

    /**
     * @returns {number}
     */
    function findActiveIndex(allItems) {
        const active = document.querySelector(
            ".SidebarListItem--is-active, .SidebarListItemLink--is-highlighted"
        );
        if (!active) {
            return -1;
        }

        let index = 0;
        for (const item of allItems) {
            if (item === active) {
                return index;
            }

            index++;
        }
    }

    /**
     * 
     * @param {1 | -1} direction 
     */
    function rotateSidebar(direction) {
        const allItems = document.querySelectorAll(
            ".SidebarListItem, .RootlistItem__link .SidebarListItemLink"
        );
        const maxIndex = allItems.length - 1;
        let index = findActiveIndex(allItems) + direction;

        if (index < 0) index = maxIndex;
        else if (index > maxIndex) index = 0;

        let toClick = allItems[index];
        if (!toClick.hasAttribute("href")) {
            toClick = toClick.querySelector(".SidebarListItemLink");
        }

        toClick.click();
    }

    /**
     * Find first visible carousel and hit next/previous button
     * @param {NodeListOf<Element>} carouselList 
     * @param {boolean} isNext
     */
    function scrollCarousel(carouselList, isNext) {
        if (carouselList.length === 0) {
            return;
        }

        for (const carousel of carouselList) {
            const bound = carousel.getBoundingClientRect();
            if (bound.top < 0) {
                continue;
            }

            if (isNext) {
                const next = carousel.querySelector(CAROUSEL_NEXT_CLASSES);
                if (next) {
                    next.click();
                }
            } else {
                const previous = carousel.querySelector(CAROUSEL_PREVIOUS_CLASSES);
                if (previous) {
                    previous.click();
                }
            }

            return;
        }
    }
})();


function VimBind() {
    const elementQuery = [
        "[href]",
        "button.button-green",
        "button.button-with-stroke",
        "button.Button--style-green",
        "button.Button--style-stroke",
        "tr.tl-row",
    ].join(",");

    const keyList = "qwertasdfgzxcvyuiophjklbnm".split("");

    const lastKeyIndex = keyList.length - 1;

    /** @type {Document | undefined} */
    let currentIframe;

    let isActive = false;

    keyList.forEach((key) => {
        Spicetify.Keyboard.registerImportantShortcut(
            Spicetify.Keyboard.KEYS[key.toUpperCase()],
            listenFirstKey.bind(this),
        );
    });

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    this.activate = function (event) {
        /** @type {HTMLIFrameElement} */
        const iframe = document.querySelector("iframe.active");
        if (iframe) {
            currentIframe = iframe.contentDocument;
        } else {
            currentIframe = undefined;
        }

        const vimkey = getVims();
        if (vimkey.length > 0) {
            vimkey.forEach((e) => e.remove());
            return;
        }

        const elements = getLinks().filter((e) => {
            if (
                e.style.display === "none" ||
                e.style.visibility === "hidden" ||
                e.style.opacity === "0"
            ) {
                return false;
            }

            const bound = e.getBoundingClientRect();

            if (
                bound.bottom > document.body.clientHeight ||
                bound.left > document.body.clientWidth ||
                bound.right < 0 ||
                bound.top < 0 ||
                bound.width === 0 ||
                bound.height === 0
            ) {
                return false;
            }

            return true;
        });

        if (elements.length === 0) {
            return;
        }

        isActive = true

        let firstKey = 0;
        let secondKey = 0;

        elements.forEach((e) => {
            e.append(createKey(
                keyList[firstKey] + keyList[secondKey],
                e.tagName === "A"
            ));

            secondKey++;
            if (secondKey > lastKeyIndex) {
                secondKey = 0;
                firstKey++;
            }
        });

    }

    this.deactivate = function () {
        isActive = false;
        Spicetify.Keyboard._isPopoverOpen = false;
        getVims().forEach((e) => e.remove());
    }

    function getLinks() {
        const elements = [];
        elements.push(...document.body.querySelectorAll(elementQuery));

        if (currentIframe) {
            const el = currentIframe.querySelectorAll(elementQuery);
            elements.push(...el);
        }

        return elements;
    }

    /**
     * @returns {HTMLDivElement[]}
     */
    function getVims() {
        /** @type {HTMLDivElement[]} */
        const elements = [];

        /** @type {NodeListOf<HTMLDivElement>} */
        let vimKeys = document.querySelectorAll(".vim-key");

        elements.push(...vimKeys);

        if (currentIframe) {
            vimKeys = currentIframe.querySelectorAll(".vim-key");
            elements.push(...vimKeys);
        }

        return elements;
    }

    /**
     * @param {KeyboardEvent} event
     */
    function listenFirstKey(event) {
        if (!isActive) {
            return;
        }

        const vimkey = getVims();

        if (vimkey.length === 0) {
            Spicetify.Keyboard._isPopoverOpen = false;
            return;
        }

        Spicetify.Keyboard._isPopoverOpen = true;

        for (const div of vimkey) {
            if (div.innerText[0] !== event.key) {
                div.remove();
                continue;
            }

            const newText = div.innerText.slice(1);
            if (newText.length === 0) {
                click(div);
                div.remove();

                Spicetify.Keyboard._isPopoverOpen = false;
                continue;
            }
            div.innerText = newText;
        }
    }

    function click(div) {
        const element = div.parentNode;
        if (element.hasAttribute("href") || element.tagName === "BUTTON") {
            element.click();
            return;
        }

        const findButton = element.querySelector("button");
        if (findButton) {
            findButton.click();
            return;
        }
    }

    /**
     * @param {string} key
     * @param {boolean} isATag
     * @returns {HTMLSpanElement}
     */
    function createKey(key, isATag) {
        const div = document.createElement("span");
        div.classList.add("vim-key");
        div.innerText = key;
        div.style.backgroundColor = "black";
        div.style.border = "solid 1px white";
        div.style.color = "white";
        div.style.textTransform = "lowercase";
        div.style.position = "absolute";
        div.style.zIndex = "10";
        div.style.padding = "3px 6px";
        div.style.lineHeight = "normal";
        div.style.left = "0";
        div.style.fontSize = "14px";
        div.style.fontWeight = "500";
        if (!isATag) {
            div.style.top = "0";
        }
        return div;
    }

    return this;
}
