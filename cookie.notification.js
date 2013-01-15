/**
 * This file will add a notification to the website about cookies, as required by EU law.
 *
 * Just include this file in your html.
 *
 * <script type="text/css" language="javascript" src="/path/to/cookie.notification.js"></script>
 */

(function () {
    "use strict";

    var Cookies = {
        init: function () {
            var allCookies = document.cookie.split('; '), i, cookiePair;

            for (i = 0; i < allCookies.length; i++) {
                cookiePair = allCookies[i].split('=');
                this[cookiePair[0]] = cookiePair[1];
            }
        },
        create: function (name, value, days) {
            var expires = "", date;

            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";
            this[name] = value;
        },
        erase: function (name) {
            this.create(name, '', -1);
            this[name] = undefined;
        }
    }, body, container, message, close, cLink, mLink;
    Cookies.init();

    if ("undefined" === typeof Cookies.notification) {
        body = document.getElementsByTagName('body')[0];
        container = document.createElement('div');
        message = document.createElement('p');
        mLink = document.createElement('a');
        close = document.createElement('p');
        cLink = document.createElement('a');

        cLink.textContent   = 'close';
        cLink.style.color   = '#fff';
        cLink.addEventListener('click', function () {
            container.style.display = 'none';
            Cookies.create('notification', 'true', 30); // TODO: Change 30 to change the cookies lifetime. (days)
        });

        close.appendChild(cLink);
        close.style.float       = 'right';
        close.style.width       = '150px';
        close.style.textAlign   = 'center';
        close.style.marginRight = '15px';
        close.style.cursor      = 'pointer';

        mLink.textContent = 'click here';
        mLink.attributes.setNamedItem(document.createAttribute('href'));
        mLink.attributes.href.value = ''; // TODO: Insert URL here.
        mLink.style.color           = '#fff';

        message.innerHTML = 'This website uses cookies. For more information please ';
        message.appendChild(mLink);
        message.style.float         = 'left';
        message.style.width         = '500px';
        message.style.textAlign     = 'center';
        message.style.marginLeft    = '15px';
        message.style.color         = '#fff';

        container.style.color           = '#fff';
        container.style.backgroundColor = '#000';
        container.style.borderBottom    = '1px solid #aaa';
        container.style.height          = '25px';
        container.style.width           = '100%';
        container.style.position        = 'fixed';
        container.style.left            = '0';
        container.style.top             = '0';
        container.appendChild(close);
        container.appendChild(message);

        body.appendChild(container);
    }
}());
