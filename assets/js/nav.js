 "use strict";

(function () {

  // let Opera Mini use the footer-anchor pattern
  if (navigator.userAgent.indexOf('Opera Mini') === - 1) {

    // let newer browsers use js-powered menu
    if('querySelector' in document &&
       'addEventListener' in window) {

      // set js nav class
      document.documentElement.classList.add('js-nav');

      // set up the variables
      var menuLink = document.querySelector('[href="#nav"]');
      var menu = document.querySelector('#nav');

      // hide the menu until we click the link
      menu.classList.add("visuallyhidden");

      // add a close button
      var closeButton = '<button data-toggle data-nav-close>';
          closeButton += '<span class="visuallyhidden">Close menu</span>';
          closeButton += '</button>';
      menu.insertAdjacentHTML('afterBegin', closeButton);

      // hide the children and add the button for toggling
      var subMenus = document
                    .querySelectorAll('#nav .has-children, #nav .has-children');
      var showChildrenButton = '<button data-toggle data-toggle-nav>';
          showChildrenButton += '<span class="visuallyhidden">Toggle</span>'
          showChildrenButton += '</button>';
      for (var i = 0; i < subMenus.length; i++) {
        subMenus[i].querySelector('ol, ul').classList.add('visuallyhidden');
        subMenus[i].querySelector('a')
                   .insertAdjacentHTML('afterend', showChildrenButton);
      }

      // show the menu when we click the link
      menuLink.addEventListener("click", function(ev) {
        ev.preventDefault();
        menu.classList.toggle("visuallyhidden");
        document.documentElement.classList.toggle('js-nav-open');
      }, true);

      var ebHideMenu = function() {
          menu.classList.add("visuallyhidden");
          document.documentElement.classList.remove('js-nav-open');
      }

      // listen for clicks inside the menu
      menu.addEventListener("click", function(ev) {
        var clickedElement = ev.target || ev.srcElement;

        // hide the menu when we click the button
        if (clickedElement.hasAttribute("data-nav-close")) {
            ev.preventDefault();
            ebHideMenu();
            return;
        }

        // show the children when we click a .has-children
        if (clickedElement.hasAttribute("data-toggle-nav")) {
            ev.preventDefault();
            clickedElement.classList.toggle('show-children');
            clickedElement.nextElementSibling.classList.toggle('visuallyhidden');
            return;
        }

        // if it's an anchor with an href (an in-page link)
        if (clickedElement.tagName === "A" && clickedElement.getAttribute('href')) {
            ebHideMenu();
            return;
        }

        // if it's an anchor without an href (a nav-only link)
        if (clickedElement.tagName === "A") {
            clickedElement.nextElementSibling.classList.toggle('show-children');
            clickedElement.nextElementSibling.nextElementSibling.classList.toggle('visuallyhidden');
            return;
        }


      });

    }

  }

}());
