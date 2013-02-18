/**
 * This file will add a notification to the website about cookies, as required by EU law.
 *
 * Include the below in your html.
 *
 * <script type="text/javascript" language="javascript">
 *     var cookieLifetime = 365, // lifetime in days.
 *         cookieUrl = 'path/to/cookie-policy.pdf';
 * </script>
 * <script type="text/javascript" language="javascript" src="/path/to/cookie.notification.js"></script>
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
    }, body, container, message, close, cLink, mLink,
        lifetime = 30, url = 'https://github.com/Nalum/Cookie-Notification';
    Cookies.init();
    
    if (typeof cookieLifetime == "number") {
        lifetime = cookieLifetime;
    }
    
    if (typeof cookieUrl == "string") {
        url = cookieUrl;
    }

    if ("undefined" === typeof Cookies.notification) {
        body = document.getElementsByTagName('body')[0];
        container = document.createElement('div');
        message = document.createElement('p');
        mLink = document.createElement('a');
        close = document.createElement('p');
        cLink = document.createElement('a');

        cLink.textContent   = 'close';
        cLink.style.color   = '#ccc';
        cLink.addEventListener('click', function () {
            container.style.display = 'none';
            Cookies.create('notification', 'true', lifetime);
        });

        close.appendChild(cLink);
        close.style.float       = 'right';
        close.style.width       = '150px';
        close.style.textAlign   = 'center';
        close.style.margin      = '2px';
        close.style.marginRight = '15px';
        close.style.cursor      = 'pointer';

        mLink.attributes.setNamedItem(document.createAttribute('href'));
        mLink.attributes.setNamedItem(document.createAttribute('target'));
        mLink.textContent               = 'click here';
        mLink.attributes.href.value     = url;
        mLink.attributes.target.value   = "_blank"
        mLink.style.color               = '#ccc';

        message.innerHTML = 'This website uses cookies. For more information please ';
        message.appendChild(mLink);
        message.style.float         = 'left';
        message.style.width         = '500px';
        message.style.textAlign     = 'center';
        message.style.margin        = '2px';
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
        container.style.zIndex          = '999999';
        container.appendChild(close);
        container.appendChild(message);

        body.appendChild(container);
    }
}());
