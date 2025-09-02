import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState, Component, useEffect, useRef } from "react";
import "react-dom";
import { UNSAFE_NavigationContext, useHref, useNavigate, useLocation, useResolvedPath, createPath, UNSAFE_DataRouterStateContext, UNSAFE_useRouteId, UNSAFE_RouteContext, UNSAFE_DataRouterContext, Outlet, useParams, Routes, Route, parsePath, Router } from "react-router";
import { stripBasename, UNSAFE_warning, UNSAFE_invariant, matchPath, joinPaths, Action } from "@remix-run/router";
import { FiX, FiMenu, FiMessageSquare, FiMail, FiMapPin } from "react-icons/fi";
import { useSelector, useDispatch, Provider } from "react-redux";
import axios from "axios";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { FaGlobe, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight, FaCrown, FaCalendarAlt, FaHistory, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaUser, FaExternalLinkAlt, FaWhatsapp, FaInfoCircle, FaUserCircle, FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import { TbHome2, TbChecklist, TbFlag3, TbUserShield, TbHeartHandshake, TbVideo, TbPhoto, TbPhoneCall } from "react-icons/tb";
import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    process.env.NODE_ENV !== "production" ? UNSAFE_warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
const ViewTransitionContext = /* @__PURE__ */ React.createContext({
  isTransitioning: false
});
if (process.env.NODE_ENV !== "production") {
  ViewTransitionContext.displayName = "ViewTransition";
}
const FetchersContext = /* @__PURE__ */ React.createContext(/* @__PURE__ */ new Map());
if (process.env.NODE_ENV !== "production") {
  FetchersContext.displayName = "Fetchers";
}
if (process.env.NODE_ENV !== "production") ;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ React.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = React.useContext(UNSAFE_NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX$1.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        process.env.NODE_ENV !== "production" ? UNSAFE_warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ React.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
const NavLink = /* @__PURE__ */ React.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React.useContext(UNSAFE_DataRouterStateContext);
  let {
    navigator,
    basename
  } = React.useContext(UNSAFE_NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ React.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
const Form = /* @__PURE__ */ React.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */ React.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";
}
if (process.env.NODE_ENV !== "production") ;
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(UNSAFE_DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : UNSAFE_invariant(false) : void 0;
  return ctx;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return React.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = React.useContext(UNSAFE_NavigationContext);
  let currentRouteId = UNSAFE_useRouteId();
  return React.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = React.useContext(UNSAFE_NavigationContext);
  let routeContext = React.useContext(UNSAFE_RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, "useFormAction must be used inside a RouteContext") : UNSAFE_invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = React.useContext(ViewTransitionContext);
  !(vtContext != null) ? process.env.NODE_ENV !== "production" ? UNSAFE_invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : UNSAFE_invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
const BASE_URL = "http://192.168.1.5:5000";
const api = axios.create({
  baseURL: BASE_URL
});
const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const representative = useSelector((state) => state.representative.data);
  console.log("Representative:", representative);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 w-full z-80 bg-[#1c3c52] shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/logo.jpeg",
            alt: "Logo",
            className: "h-12 w-12 md:h-14 md:w-14 rounded-full"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-lg md:text-2xl font-extrabold tracking-wide", children: "माझा नगर सेवक" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex space-x-6", children: ["Home", "About", "Contact"].map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/${item.toLowerCase()}`,
          className: "text-white text-sm md:text-base font-medium relative group",
          children: [
            item,
            /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-800 group-hover:w-full transition-all duration-300" })
          ]
        },
        item
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden text-white text-2xl",
          onClick: toggleMobileMenu,
          children: isMobileMenuOpen ? /* @__PURE__ */ jsx(FiX, {}) : /* @__PURE__ */ jsx(FiMenu, {})
        }
      )
    ] }),
    isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-[#1c3c52] px-4 pb-4", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-3", children: ["Home", "About", "Contact"].map((item) => /* @__PURE__ */ jsx(
      Link,
      {
        to: `/${item.toLowerCase()}`,
        className: "text-white text-base font-medium border-b border-gray-600 pb-2",
        onClick: () => setMobileMenuOpen(false),
        children: item
      },
      item
    )) }) })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gradient-to-r from-[#243c5a] via-[#1c3c52] to-[#2a506f] text-white py-10 mt-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-orange-400", children: "Mazha Nagar Sevak" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-200", children: "Empowering citizens with accessible local governance and information." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-green-300", children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: "📍 Impulse Technosoft, Amrutdham Road, Panchavati, Nashik - 422003" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-200 mt-2", children: "📞 9579477779 / 9890211843" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-200 mt-2", children: [
          "📧",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:info@mazanagarsevak.com",
              className: "underline hover:text-orange-400",
              children: "info@mazanagarsevak.com"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-green-300", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/", className: "hover:underline hover:text-orange-400", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/about",
              className: "hover:underline hover:text-orange-400",
              children: "About"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contact",
              className: "hover:underline hover:text-orange-400",
              children: "Contact"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-600 mt-10 pt-4 text-center text-gray-300 text-sm", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Mazha Nagar Sevak. All rights reserved."
    ] })
  ] });
};
const HomePageLayout = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow ", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const AboutUsPage = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About Us | माझा नगर सेवक" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Website to connect citizens with their local representatives and provide transparent information about ward development."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-[83vh] bg-fixed bg-center bg-cover flex items-center justify-center px-4 py-16 lg:mt-15 bg-gradient-to-b from-orange-200 via-white to-green-200 ", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-10 md:p-12",
        style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-orange-600 border-b-4 border-orange-300 inline-block pb-2", children: "नमस्कार मित्रांनो," }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-base sm:text-lg", children: "ह्या वेबसाईट विषयी थोडक्यात माहिती सांगायची झाली म्हणजे ह्या वेबसाईट चा मुख्य हेतू हा:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-3 text-base sm:text-lg text-gray-800", children: [
            /* @__PURE__ */ jsx("li", { children: "सर्वसामान्य नागरिकांना आपल्या प्रभागातील नगर सेवक, किंवा इच्छुक उमेदवार ह्यांची माहिती करून देणे." }),
            /* @__PURE__ */ jsx("li", { children: "आपल्या प्रभागातील होत असलेली किंवा झालेली विकासकामे ह्यांची माहिती नागरिकांना असणे." }),
            /* @__PURE__ */ jsx("li", { children: "आपल्या प्रभागात सामोरे जात असलेल्या समस्यांची माहिती आपल्या उमेदवारांना करून देणे." }),
            /* @__PURE__ */ jsx("li", { children: "प्रभागाच्या सर्वांगीण विकासासाठी काही कल्पना किंवा सूचना असल्यास त्या आपल्या उमेदवारांपर्यंत पोहचवणे." }),
            /* @__PURE__ */ jsx("li", { children: "तक्रार कुठे करावी किंवा ठराविक सरकारी कामासाठी कुठे अप्लाय करावे याची देखील संपूर्ण माहिती आम्ही देणार आहोत." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-6 text-base sm:text-lg", children: [
            "अधिक माहितीसाठी",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/contact-member",
                className: "text-blue-600 font-semibold hover:underline",
                children: "आम्हाला संपर्क करा"
              }
            ),
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 font-semibold text-green-700 text-lg sm:text-xl", children: "धन्यवाद!" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/logo.jpeg",
              alt: "Website Logo",
              className: "w-15 h-15 lg:w-28 lg:h-28 rounded-full shadow-md border-4 border-orange-400"
            }
          ) })
        ]
      }
    ) })
  ] });
};
const ContactUsPage = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us | माझा नगर सेवक" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Get in touch with Mazha Nagar Sevak for inquiries, feedback, or suggestions."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative min-h-[50vh] bg-gradient-to-b from-orange-200 via-white to-green-200 px-4 py-12 flex justify-center mt-20 items-center", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-full max-w-4xl bg-gray-100 border-4 border-double border-orange-400 rounded-3xl shadow-2xl p-6 sm:p-10 relative backdrop-blur-lg",
        style: {
          backgroundImage: "url('https://www.transparenttextures.com/patterns/lined-paper.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-5 top-6 space-y-3 hidden sm:block", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-3 h-3 bg-gray-500 rounded-full shadow"
            },
            i
          )) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 sm:top-6 sm:right-6", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/logo.jpeg",
              alt: "Website Logo",
              className: "w-15 h-15 lg:w-22 lg:h-22 rounded-full shadow-md border-2 border-orange-300"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-10", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-4xl font-bold text-orange-600", children: "📔 Contact Us" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-lg mt-2 text-gray-700", children: "We'd love to hear from you!" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-gray-800 text-base sm:text-lg px-2 sm:px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(FaGlobe, { className: "text-green-600 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Website:" }),
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.mazanagarsevak.com",
                    className: "text-blue-600 hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "www.mazanagarsevak.com"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(FaEnvelope, { className: "text-green-600 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Email:" }),
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "mailto:info@mazanagarsevak.com",
                    className: "text-blue-600 hover:underline",
                    children: "info@mazanagarsevak.com"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(FaPhoneAlt, { className: "text-green-600 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Mobile No:" }),
                " 9579477779 / 9890211843"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-green-600 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Address:" }),
                " Impulse Technosoft, Amrutdham Road, Panchavati, Nashik - 422003"
              ] })
            ] })
          ] })
        ]
      }
    ) })
  ] });
};
const Navbar = () => {
  const { memberName } = useParams();
  const location = useLocation();
  const links = [
    { label: "मुख्यपृष्ठ", path: `/member/home`, icon: /* @__PURE__ */ jsx(TbHome2, {}) },
    {
      label: "नागरीक सुविधा",
      path: `/member/home/nagrik-suvidha`,
      icon: /* @__PURE__ */ jsx(TbChecklist, {})
    },
    {
      label: "पक्षाची माहिती",
      path: `/member/home/about-party`,
      icon: /* @__PURE__ */ jsx(TbFlag3, {})
    },
    {
      label: "राजकीय प्रवास",
      path: `/member/home/about-member`,
      icon: /* @__PURE__ */ jsx(TbUserShield, {})
    },
    {
      label: "सामाजिक कार्य",
      path: `/member/home/social-work`,
      icon: /* @__PURE__ */ jsx(TbHeartHandshake, {})
    },
    {
      label: "विडिओ",
      path: `/member/home/videos`,
      icon: /* @__PURE__ */ jsx(TbVideo, {})
    },
    {
      label: "फोटो",
      path: `/member/home/images`,
      icon: /* @__PURE__ */ jsx(TbPhoto, {})
    },
    {
      label: "संपर्क साधा",
      path: `/member/home/contact-member`,
      icon: /* @__PURE__ */ jsx(TbPhoneCall, {})
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "bg-black/30 backdrop-blur-md py-3 px-2 shadow-md w-full overflow-x-auto scrollbar-hide", children: /* @__PURE__ */ jsx("nav", { className: "flex gap-3 sm:gap-4 text-sm sm:text-base font-medium text-white min-w-max justify-center sm:justify-center", children: links.map(({ label, path, icon }, idx) => /* @__PURE__ */ jsx(Link, { to: path, className: "shrink-0", children: /* @__PURE__ */ jsxs(
    "button",
    {
      className: `flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 shadow-sm border whitespace-nowrap
              ${location.pathname === path ? "bg-orange-600 text-white border-orange-600" : "bg-white text-black font-semibold hover:bg-gray-100 border-gray-300"}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
      ]
    }
  ) }, idx)) }) });
};
const fetchRepresentativeDetailsById = createAsyncThunk(
  "representative/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/representatives/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);
const representativeSlice = createSlice({
  name: "representative",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearRepresentative: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepresentativeDetailsById.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchRepresentativeDetailsById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    }).addCase(fetchRepresentativeDetailsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch";
    });
  }
});
const { clearRepresentative } = representativeSlice.actions;
const representativeReducer = representativeSlice.reducer;
const cookies = new Cookies();
const setCookie = (key, value, options = {}) => {
  cookies.set(key, value, {
    path: "/",
    ...options
  });
};
const getCookie = (key) => {
  return cookies.get(key);
};
const MemberBar = () => {
  const dispatch = useDispatch();
  const { data: selectedMember, loading } = useSelector(
    (state) => state.representative
  );
  useEffect(() => {
    const representativeId = getCookie("representativeId");
    if (representativeId) {
      dispatch(fetchRepresentativeDetailsById(representativeId));
    }
  }, [dispatch]);
  if (loading || !selectedMember) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-1 lg:bottom-4 right-2 w-[70%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[20%] max-w-sm bg-black/50 backdrop-blur-md text-white shadow-lg rounded-xl px-3 py-2 lg:py-2 flex items-center gap-3 z-50 animate-fade-in-slide", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow animate-pulse-slow", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `${BASE_URL}/uploads/representative/${selectedMember.representativephoto}`,
        alt: selectedMember.name,
        className: "w-full h-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold truncate", children: selectedMember.name }) })
  ] });
};
const getRepresentativesByWard = async (city, wardNo) => {
  try {
    const response = await api.get("/api/representatives/by-ward", {
      params: { city, wardNo }
    });
    return response.data?.data || [];
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch representatives"
    );
  }
};
const fetchRepresentativeById = async (id) => {
  try {
    const response = await api.get(`/api/representatives/${id}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};
const createUser = async (email, pincode) => {
  try {
    const response = await api.post(`/api/user`, {
      email,
      pincode
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Please Try Again !" };
  }
};
const MemberFooter = () => {
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pinCode) {
      alert("कृपया सर्व माहिती भरा!");
      return;
    }
    try {
      setLoading(true);
      const res = await createUser(email, pinCode);
      if (res.success) {
        alert("फॉर्म यशस्वीरित्या सबमिट झाला आहे!");
        setEmail("");
        setPinCode("");
      } else {
        alert("त्रुटी: कृपया पुन्हा प्रयत्न करा.");
      }
    } catch (error) {
      alert(error.message || "Server error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gradient-to-r from-[#243c5a] via-[#1c3c52] to-[#2a506f] border-t border-blue-200 mt-12 px-4 py-10 sm:py-12 shadow-inner", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "text-center mb-8 px-2",
        style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-white", children: "स्वप्न विकासाचे , स्वप्न विकसित प्रभागाचे" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-white mt-2", children: "प्रभागाचे विकासासाठी, लोकांच्या गरजांसाठी" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 w-full lg:w-2/3 lg:h-[22vh]", children: [
        /* @__PURE__ */ jsx(Link, { to: "/member/home/contact-member", className: "block h-full", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "text-blue-600 text-2xl sm:text-3xl mb-2", children: /* @__PURE__ */ jsx(FiMessageSquare, {}) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-semibold text-blue-800", children: "आमच्याशी जोडले जा" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Link, { to: "/member/home/videos", className: "block h-full", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "text-blue-600 text-2xl sm:text-3xl mb-2", children: /* @__PURE__ */ jsx(FiMessageSquare, {}) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-semibold text-blue-800", children: "बातम्या" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-md w-full lg:w-2/3 min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2", children: "आमच्याशी जोडले जा" }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-700 mb-1", children: "तुमचा ई-मेल ऍड्रेस" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-2.5 text-gray-400", children: /* @__PURE__ */ jsx(FiMail, {}) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  placeholder: "you@example.com",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-700 mb-1", children: "पिन कोड" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-2.5 text-gray-400", children: /* @__PURE__ */ jsx(FiMapPin, {}) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: pinCode,
                  onChange: (e) => setPinCode(e.target.value),
                  className: "w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  placeholder: "पिन कोड",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition font-semibold",
              disabled: loading,
              children: loading ? "सबमिट करत आहे..." : "पाठवा"
            }
          )
        ] })
      ] })
    ] })
  ] });
};
const MemberLayout = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "fixed top-20 left-0 w-full z-50", children: /* @__PURE__ */ jsx(Navbar, {}) }),
    /* @__PURE__ */ jsx(MemberBar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow mt-2", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(MemberFooter, {})
  ] });
};
const img1 = "/assets/img1-CUrxN-Lz.jpg";
const img2 = "/assets/img2-DK5mlbCp.jpg";
const img3 = "/assets/img3-BTDkl3dS.jpg";
const img4 = "/assets/img4-DoGcSBwu.jpg";
const img5 = "/assets/img5-BAxtqBsc.jpg";
const img6 = "/assets/img6-Cb4uspvS.jpg";
const img7 = "/assets/img7-DaXZ60wj.jpg";
const images$1 = [img1, img2, img3, img4, img5, img6, img7];
const MemberIntroSlider = ({ cityData }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images$1.length);
    }, 5e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-full relative mt-25",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full h-[500px] md:h-[400px] overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: images$1[current],
            alt: "Slide",
            className: "w-full h-full object-cover brightness-[0.5]"
          }
        ) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 80 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4, type: "spring", stiffness: 60 },
            className: "relative z-20 -mt-40 w-full flex justify-center px-4",
            children: /* @__PURE__ */ jsxs("div", { className: "relative z-50 bg-white backdrop-blur-md shadow-2xl border-4 border-orange-500 rounded-3xl w-full max-w-5xl p-6 md:p-10 text-gray-900 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-300 via-white/10 to-transparent blur-xl opacity-30 pointer-events-none" }),
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-orange-700 mb-4 tracking-tight", children: [
                "माननीय ",
                cityData?.name || "सदस्य"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-md md:text-base font-semibold leading-relaxed mb-6 max-w-5xl whitespace-pre-line", children: cityData?.biography ? cityData.biography.length > 400 ? cityData.biography.slice(0, 400) + "..." : cityData.biography : "माहिती लोड केली जात आहे..." }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/member/home/about-member",
                  className: "z-50 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all text-sm font-semibold",
                  children: [
                    "पुढे वाचा ",
                    /* @__PURE__ */ jsx(FaArrowRight, {})
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
};
const SamajKaryaSection = ({ cityData }) => {
  const scrollRef = useRef();
  const works = cityData?.works || [];
  const repeatedItems = [...works, ...works, ...works];
  const scroll = (direction) => {
    if (direction === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };
  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (scrollLeft <= 0) container.scrollLeft = scrollWidth / 3;
      else if (scrollLeft >= maxScrollLeft - 1)
        container.scrollLeft = scrollWidth / 3;
    };
    container.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      container.scrollLeft = container.scrollWidth / 3;
    }, 100);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-start", children: /* @__PURE__ */ jsx("section", { className: " bg-gradient-to-br from-purple-50 via-pink-50 to-white  rounded-xl shadow-lg w-full max-w-8xl px-4 sm:px-6 py-6 mt-6 border border-orange-200", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-2 sm:px-4",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "text-3xl sm:text-4xl font-extrabold text-orange-600 mb-10 \r\n        border-b-4 border-orange-500 pb-3 text-center tracking-wide",
            children: "समाजकार्य"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-10" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-4 sm:right-8 top-[120px] flex gap-2 z-10", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: "bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "text-orange-700 w-5 h-5 sm:w-6 sm:h-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: "bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-orange-700 w-5 h-5 sm:w-6 sm:h-6" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: scrollRef,
            className: "flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 cursor-grab hide-scrollbar",
            children: repeatedItems.map((item, idx) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "snap-start min-w-[340px] bg-[#d3b593] rounded-xl shadow-lg relative transform transition duration-300 hover:scale-105 hover:rotate-1",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200 rotate-[-4deg] rounded-sm shadow-sm" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-white p-2 rounded-lg shadow-inner rotate-[-2deg]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${BASE_URL}/uploads/representative/work/${item.image}`,
                      alt: item.title,
                      className: "w-full h-44 sm:h-52 object-cover rounded-md"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-md text-orange-800 font-semibold italic", children: item.title }) })
                ]
              },
              idx
            ))
          }
        )
      ]
    }
  ) }) });
};
const PhotoGalleryMain = ({ cityData }) => {
  const scrollRef = useRef();
  const photos = cityData?.photos || [];
  const repeatedItems = [...photos, ...photos, ...photos];
  const scroll = (direction) => {
    if (direction === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };
  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (scrollLeft <= 0) {
        container.scrollLeft = scrollWidth / 3;
      } else if (scrollLeft >= maxScrollLeft - 1) {
        container.scrollLeft = scrollWidth / 3;
      }
    };
    container.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      container.scrollLeft = scrollRef.current.scrollWidth / 3;
    }, 100);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-start mt-2", children: /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-xl shadow-2xl w-full max-w-8xl px-4 sm:px-6 py-5 mt-5 sm:mt-10 relative z-10 border border-orange-300", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-2 sm:px-4",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-orange-600 mb-8 border-b-4 border-orange-500 pb-2 justify-center flex", children: "फोटो" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-4 sm:right-8 top-[60px] sm:top-[70px] flex gap-2 z-10", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: "bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md transition",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "text-orange-700 w-5 h-5 sm:w-6 sm:h-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: "bg-orange-100 hover:bg-orange-300 p-2 rounded-full shadow-md transition",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-orange-700 w-5 h-5 sm:w-6 sm:h-6" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: scrollRef,
            className: "flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-6 sm:py-8 cursor-grab hide-scrollbar",
            children: repeatedItems.map((item, idx) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "snap-start min-w-[370px] lg:min-w-[300px] bg-gradient-to-br from-[#fffaf0] via-[#fcd5ce] to-[#fae1dd] border border-[#e4c6b7] rounded-[1.25rem] shadow-[4px_4px_8px_rgba(0,0,0,0.2)] p-3 relative transition-transform duration-300 hover:scale-[1.02] hover:rotate-[1deg]",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-md p-2 shadow-inner mb-3 rotate-[-1.5deg]", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${BASE_URL}/uploads/representative/photos/${item.photo}`,
                      alt: item.title,
                      className: "w-full h-44 sm:h-52 object-cover rounded-sm filter sepia-[10%] brightness-95"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 w-4 h-4 bg-orange-200 rotate-45 rounded-sm shadow-md" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 w-4 h-4 bg-orange-200 rotate-45 rounded-sm shadow-md" }),
                  /* @__PURE__ */ jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-md text-[#e6611e] font-semibold mb-1", children: [
                    new Date(item.date).toLocaleDateString("en-GB"),
                    " |",
                    " ",
                    item.title
                  ] }) })
                ]
              },
              idx
            ))
          }
        )
      ]
    }
  ) }) });
};
const VideoNewsMain = ({ videos }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const scrollAmount = 400;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-start mt-9", children: /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-xl shadow-2xl w-full max-w-8xl px-6 py-5 mt-3 relative z-10 border border-orange-300", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-orange-600 mb-5 border-b-4 border-orange-500 pb-2 justify-center flex", children: "विडिओ बातम्या" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: "p-2 bg-orange-100 hover:bg-orange-300 transition rounded-full shadow-md",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "text-orange-600" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: "p-2 bg-orange-100 hover:bg-orange-300 transition rounded-full shadow-md",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "text-orange-600" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: scrollRef,
            className: "flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar",
            children: videos?.map((item, idx) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "min-w-[320px] max-w-sm flex-shrink-0 bg-gradient-to-br from-[#fffaf0] via-[#fcd5ce] to-[#fae1dd] border border-[#e4c6b7] rounded-[1.25rem] shadow-[4px_4px_8px_rgba(0,0,0,0.2)] p-3 relative transition-transform duration-300 hover:scale-[1.02] hover:rotate-[1deg] snap-start",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-300 rounded-lg p-2 shadow-inner mb-3 rotate-[-1.5deg] relative", children: [
                    /* @__PURE__ */ jsx(
                      "iframe",
                      {
                        src: item.videoUrl,
                        title: item.title,
                        frameBorder: "0",
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        className: "w-full h-56 rounded-md filter sepia-[10%] brightness-95"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 w-3 h-3 bg-[#d4bfa2] rounded-full shadow-sm" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxs("p", { className: "text-md text-[#e6611e] font-semibold mb-1", children: [
                    new Date(item.date).toLocaleDateString("en-GB"),
                    " |",
                    " ",
                    item.title
                  ] }) })
                ]
              },
              item._id || idx
            ))
          }
        )
      ]
    }
  ) }) });
};
const PartyDetails = ({ politicalParty }) => {
  const navigate = useNavigate();
  const maxChars = 300;
  const history = politicalParty?.history || "";
  const isLong = history.length > maxChars;
  const shortText = isLong ? history.slice(0, maxChars) + "..." : history;
  if (!politicalParty) return null;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
      className: "relative max-w-8xl mx-auto p-4 sm:p-6 md:p-10 bg-gradient-to-br from-purple-100 via-pink-50 to-white\r\n      rounded-2xl shadow-xl border border-orange-300 hover:shadow-2xl transition-shadow duration-300",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-r from-orange-300 to-yellow-300 blur-sm opacity-30" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-6 border-b-4 border-orange-500 pb-2 text-center", children: "पक्ष माहिती" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-6 mb-6 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row lg:flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `${BASE_URL}/uploads/party/symbols/${politicalParty.symbol}`,
                alt: "Party Symbol",
                className: "w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-full border-4 border-orange-300 shadow-md"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg sm:text-2xl md:text-3xl font-bold text-gray-900", children: [
                politicalParty.name,
                /* @__PURE__ */ jsxs("span", { className: "text-orange-600 text-base sm:text-xl ml-2 font-semibold", children: [
                  "(",
                  politicalParty.abbreviation,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-12 sm:w-16 h-1 bg-orange-500 mt-1 sm:mt-2 mx-auto sm:mx-0 rounded" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 sm:items-end", children: [
            /* @__PURE__ */ jsx("div", { className: "w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-orange-300 shadow-md", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `${BASE_URL}/uploads/party/leader-photos/${politicalParty.mainLeadPhoto}`,
                alt: "मुख्य नेता",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "bg-orange-100 border-2 border-orange-300 text-orange-800 font-bold text-sm sm:text-base md:text-lg text-center px-4 py-2 rounded-lg shadow-sm", children: politicalParty.leader })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsx(FaCrown, { className: "text-xl sm:text-2xl text-orange-600 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-700", children: "अध्यक्ष:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: politicalParty.leader })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsx(FaCalendarAlt, { className: "text-xl sm:text-2xl text-orange-600 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-700", children: "स्थापना वर्ष:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: politicalParty.foundationYear })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-xl sm:text-2xl text-orange-600 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-700", children: "मुख्य कार्यालय:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base", children: politicalParty.headOffice })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-500 rounded-lg shadow-sm", children: [
            /* @__PURE__ */ jsx(FaGlobe, { className: "text-xl sm:text-2xl text-orange-600 mt-1" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-700", children: "साइट:" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: politicalParty.website,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-blue-700 underline hover:text-blue-900 break-words text-sm sm:text-base",
                  children: politicalParty.website
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4 mt-6 p-4 bg-orange-50 border-2 border-orange-500 rounded-xl shadow-md", children: [
          /* @__PURE__ */ jsx(FaHistory, { className: "text-2xl sm:text-3xl text-orange-700 mt-1" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-800 mb-1", children: "इतिहास:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-800 whitespace-pre-line", children: shortText }),
            isLong && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => navigate("/member/home/about-party"),
                className: "mt-2 text-orange-700 font-semibold hover:underline",
                children: "अधिक वाचा"
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const MemberInfo = ({ biography, representativePhoto, name, contactNo }) => {
  if (!biography) return null;
  const formattedBiography = biography.split("\n").filter((line) => line.trim() !== "").map((line, index) => /* @__PURE__ */ jsx(
    "p",
    {
      className: "text-gray-700 leading-relaxed mb-3 text-sm sm:text-base",
      children: line
    },
    index
  ));
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col items-center justify-start", children: /* @__PURE__ */ jsxs(
    "section",
    {
      className: "w-full max-w-8xl px-6 sm:px-10 py-8 sm:py-12 mt-8 \r\n      bg-gradient-to-br from-purple-50 via-pink-50 to-white \r\n      rounded-2xl shadow-2xl border border-orange-300",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "text-3xl sm:text-4xl font-extrabold text-orange-600 mb-10 \r\n        border-b-4 border-orange-500 pb-3 text-center tracking-wide",
            children: "व्यक्तिगत माहिती"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `${BASE_URL}/uploads/representative/${representativePhoto}`,
                  alt: "Representative",
                  className: "w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover \r\n              shadow-lg border-4 border-white \r\n              transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-orange-200"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-orange-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg sm:text-xl font-bold text-orange-700", children: name }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `tel:${contactNo}`,
                className: "inline-flex items-center gap-3 px-5 py-3 bg-orange-100 text-orange-800 \r\n  font-semibold text-lg rounded-xl shadow hover:bg-orange-200 hover:text-orange-900 \r\n  transition-all duration-300 ring-1 ring-orange-300",
                children: [
                  /* @__PURE__ */ jsx(FaPhoneAlt, { className: "text-orange-600" }),
                  contactNo
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 p-2 lg:p-5", children: /* @__PURE__ */ jsx("div", { className: "space-y-4 text-gray-800 leading-relaxed text-sm sm:text-base", children: formattedBiography }) })
        ] })
      ]
    }
  ) });
};
const MemberMainPage = () => {
  const [cityData, setCityData] = useState(null);
  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      if (representativeId) {
        try {
          const data = await fetchRepresentativeById(representativeId);
          if (data?.politicalParty?._id) {
            setCookie("politicalPartyId", data.politicalParty._id);
          }
          setCityData(data);
        } catch (err) {
        }
      }
    };
    load();
  }, []);
  const repName = cityData?.name || "";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: repName ? `सदस्य मुख्यपृष्ठ | ${repName}` : "सदस्य मुख्यपृष्ठ" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: repName ? `${repName} यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान पहा.` : "माननीय सदस्यांची मुख्य माहिती, कार्य आणि सामाजिक योगदान."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
      /* @__PURE__ */ jsx(MemberIntroSlider, { cityData }),
      /* @__PURE__ */ jsx("div", { className: "min-h-screen relative items-center justify-start px-1 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200", children: cityData && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(PartyDetails, { politicalParty: cityData?.politicalParty }),
        /* @__PURE__ */ jsx(
          MemberInfo,
          {
            biography: cityData.biography,
            representativePhoto: cityData?.representativephoto,
            name: cityData.name,
            contactNo: cityData.contactNo
          }
        ),
        /* @__PURE__ */ jsx(SamajKaryaSection, { cityData }),
        /* @__PURE__ */ jsx(PhotoGalleryMain, { cityData }),
        /* @__PURE__ */ jsx(VideoNewsMain, { videos: cityData.videos })
      ] }) })
    ] })
  ] });
};
const AboutMembers = ({
  photo,
  description = "",
  name,
  facebook,
  twitter,
  instagram,
  youtube
}) => {
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 mt-30 lg:mt-35 ", children: /* @__PURE__ */ jsx("section", { className: "w-full max-w-8xl px-0 lg:px-6 py-7 mt-2 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-8xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 px-4 lg:px-0", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-orange-600 drop-shadow-sm mb-2", children: "स्वप्न विकासाचे, स्वप्न विकसित प्रभागाचे" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 font-medium italic border-l-4 border-orange-300 pl-3", children: "माझ्या विषयी माहिती" })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        className: "relative bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl rounded-xl p-4 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start",
        children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.3, duration: 0.8 },
              className: "flex flex-col items-center md:hidden mx-auto",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${BASE_URL}/uploads/representative/${photo}`,
                    alt: name,
                    className: "rounded-full border-4 border-orange-400 w-40 h-40 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg font-semibold text-orange-700 text-center", children: name }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-4 justify-center", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: facebook || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaFacebook, { className: "text-xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: instagram || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaInstagram, { className: "text-xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: twitter || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaTwitter, { className: "text-xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: youtube || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaYoutube, { className: "text-xl" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "md:w-2/3 text-base sm:text-lg text-gray-800 leading-relaxed text-justify space-y-4",
              style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
              children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-orange-600 mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(FaUser, { className: "text-orange-500" }),
                  " माझी ओळख (About Me)"
                ] }),
                description.split("\n\n").map((para, index) => /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line", children: para }, index))
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.5, duration: 0.8 },
              className: "hidden md:flex flex-col items-center absolute top-20 right-20",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${BASE_URL}/uploads/representative/${photo}`,
                    alt: name,
                    className: "rounded-full border-4 border-orange-400 w-52 h-52 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg font-semibold text-orange-700", children: name }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: facebook || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaFacebook, { className: "text-2xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: instagram || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaInstagram, { className: "text-2xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: twitter || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaTwitter, { className: "text-2xl" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: youtube || "#",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 transition-all duration-300",
                      children: /* @__PURE__ */ jsx(FaYoutube, { className: "text-2xl" })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] }) }) });
};
const PoliticalJourney = ({ careerHistory, workImages = [] }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl rounded-xl w-full max-w-7xl mt-6 p-5 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start mx-auto", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-full md:w-2/3 text-base sm:text-lg text-gray-800 leading-relaxed order-1 md:order-1",
        style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-700 text-xl sm:text-2xl mb-4 text-center md:text-left", children: "स्वप्न विकासाचे, स्वप्न विकसित प्रभागाचे" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4 flex gap-2 justify-center md:justify-start", children: [
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Calendar, {}) }),
            "राजकीय व सामाजिक कार्यातील काही महत्वाचे साल व मला मिळालेली पदे खालील प्रमाणे:"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside space-y-2 px-2 sm:px-4", children: careerHistory?.map((item, idx) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: item.year }),
            " - ",
            item.position,
            ",",
            " ",
            item.organization,
            ", ",
            item.location
          ] }, idx)) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/3 flex flex-col gap-4 items-center order-2 md:order-2", children: workImages.slice(0, 2).map((img, idx) => /* @__PURE__ */ jsx(
      "img",
      {
        src: `${BASE_URL}/uploads/representative/work/${img}`,
        alt: `कार्यक्रम फोटो ${idx + 1}`,
        className: "rounded-xl shadow-md border-4 border-orange-300 w-full max-h-48 object-cover"
      },
      idx
    )) })
  ] });
};
const AboutMemberPage = () => {
  const [repData, setRepData] = useState(null);
  const dispatch = useDispatch();
  const { data: representative, loading } = useSelector(
    (state) => state.representative
  );
  const representativeId = getCookie("representativeId");
  useEffect(() => {
    const fetchData = async () => {
      const rep = await fetchRepresentativeById(representativeId);
      setRepData(rep);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (representativeId)
      dispatch(fetchRepresentativeDetailsById(representativeId));
  }, [representativeId, dispatch]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: representative?.name ? `राजकीय प्रवास | ${representative.name}` : "राजकीय प्रवास" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: representative?.name ? `${representative.name} यांच्या सामाजिक कार्य प्रवासाची माहिती येथे वाचा...` : "या सामाजिक कार्य प्रवासाची माहिती येथे वाचा..."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-fixed bg-center bg-cover relative flex flex-col items-center justify-start px-1 lg:px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200", children: repData && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        AboutMembers,
        {
          photo: repData?.representativephoto,
          description: repData?.biography,
          name: repData?.name,
          facebook: repData?.facebook,
          twitter: repData?.twitter,
          instagram: repData?.instagram,
          youtube: repData?.youtube
        }
      ),
      /* @__PURE__ */ jsx(
        PoliticalJourney,
        {
          careerHistory: repData.careerHistory || [],
          workImages: (repData.works || []).map((work) => work.image).slice(0, 2)
        }
      )
    ] }) })
  ] });
};
const fetchSocialWorksByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(
      `/api/work/${representativeId}`
    );
    return response.data?.data?.works || [];
  } catch (error) {
    return [];
  }
};
const fadeSlide = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
});
function SocialWorkSection() {
  const [works, setWorks] = useState([]);
  useEffect(() => {
    const loadWorks = async () => {
      const representativeId = getCookie("representativeId");
      if (!representativeId) return;
      const fetchedWorks = await fetchSocialWorksByRepresentative(
        representativeId
      );
      setWorks(fetchedWorks);
    };
    loadWorks();
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "mt-30", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "container mx-auto px-2 sm:px-4 space-y-8",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-800 mb-6 flex items-center gap-2", children: "सामाजिक कार्य" }),
        works.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center italic", children: "कोणतेही सामाजिक कार्य उपलब्ध नाही." }),
        works.map((work, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: fadeSlide(index % 2 === 0 ? "left" : "right"),
            className: `flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 
          shadow-lg border border-orange-200 rounded-xl overflow-hidden 
          transition-transform duration-500 hover:scale-[1.01]`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-full md:w-[35%]", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: `${BASE_URL}/uploads/representative/work/${work.image}`,
                  alt: work.title,
                  className: "w-full h-48 sm:h-64 md:h-full object-cover object-center"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[65%] p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 text-gray-800 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-orange-700", children: work.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base md:text-lg leading-relaxed tracking-wide", children: work.description })
              ] })
            ]
          },
          work._id
        ))
      ]
    }
  ) });
}
const SocialWorkPage = () => {
  const dispatch = useDispatch();
  const { data: representative } = useSelector((state) => state.representative);
  const representativeId = getCookie("representativeId");
  useEffect(() => {
    if (representativeId) {
      dispatch(fetchRepresentativeDetailsById(representativeId));
    }
  }, [dispatch, representativeId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: representative?.name ? `सामाजिक कार्य | ${representative.name}` : "सामाजिक कार्य" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: representative?.name ? `${representative.name} यांच्या राजकीय आणि सामाजिक प्रवासाची माहिती व कार्य.` : "राजकीय आणि सामाजिक प्रवास. भारतीय विद्यार्थी सेनेत भूषवलेली पदे आणि महत्त्वाचे कार्य."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen relative flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200", children: /* @__PURE__ */ jsx(SocialWorkSection, {}) })
  ] });
};
const fetchVideosByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(`/api/video/${representativeId}`);
    return response.data?.data?.videos || [];
  } catch (err) {
    return [];
  }
};
const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadVideos = async () => {
      const representativeId = getCookie("representativeId");
      if (!representativeId) {
        setLoading(false);
        return;
      }
      const videos2 = await fetchVideosByRepresentative(representativeId);
      setVideos(videos2);
      setLoading(false);
    };
    loadVideos();
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-b from-orange-200 via-white to-green-200 mt-20", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center text-orange-700 mb-12 drop-shadow-sm", children: "आमच्या व्हिडिओ क्लिप्स" }),
        loading ? /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 mt-8 text-lg", children: "लोडिंग व्हिडिओ..." }) : videos.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-red-600 mt-8 text-lg", children: "कोणतेही व्हिडिओ सापडले नाहीत." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10", children: videos.map((video, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 },
            className: "relative group rounded-xl overflow-hidden shadow-xl border-4 border-transparent bg-white transition-transform duration-300 transform hover:scale-105 hover:border-orange-400 hover:shadow-2xl",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  className: "w-full h-full object-cover transition-all duration-300 group-hover:scale-110",
                  src: video.videoUrl,
                  title: video.title,
                  frameBorder: "0",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white truncate drop-shadow", children: video.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-200 drop-shadow", children: video.date })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-300 group-hover:shadow-[0_0_20px_rgba(30,144,255,0.4)] transition-all duration-300 pointer-events-none" })
            ]
          },
          video._id || index
        )) })
      ]
    }
  ) });
};
const MemberVideoPage = () => {
  const [repName, setRepName] = useState("");
  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      if (representativeId) {
        try {
          const data = await fetchRepresentativeById(representativeId);
          if (data?.name) setRepName(data.name);
        } catch (error) {
        }
      }
    };
    load();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: repName ? `व्हिडिओ गॅलरी | ${repName}` : "व्हिडिओ गॅलरी" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: repName ? `${repName} यांचे उद्घाटन, रॅली, आंदोलन व इतर सर्व व्हिडिओ येथे पहा.` : "नाशिक मधील आमचे सर्व व्हिडिओ येथे पहा. उद्घाटन, रॅली, आंदोलन इत्यादी."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(VideoGallery, {})
  ] });
};
const fetchPhotosByRepresentative = async (representativeId) => {
  try {
    const response = await api.get(`/api/photo/${representativeId}`);
    return response.data?.data?.photos || [];
  } catch (err) {
    return [];
  }
};
const GallerySection = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  useEffect(() => {
    const loadPhotos = async () => {
      const representativeId = getCookie("representativeId");
      if (!representativeId) {
        return;
      }
      const fetchedPhotos = await fetchPhotosByRepresentative(representativeId);
      setPhotos(fetchedPhotos);
    };
    loadPhotos();
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "py-20 b bg-gradient-to-b from-orange-200 via-white to-green-200 mt-20", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
      style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-center text-orange-700 mb-12 drop-shadow-sm", children: "सामाजिक कार्याचे फोटो संग्रह" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10", children: [
          photos.map((item, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => setSelectedPhoto(index),
              className: "relative group cursor-pointer rounded-xl overflow-hidden shadow-xl border-4 border-transparent bg-white transition-transform duration-300 transform hover:scale-105 hover:border-orange-400 hover:shadow-2xl",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${BASE_URL}/uploads/representative/photos/${item.photo}`,
                    alt: item.title,
                    className: "w-full h-72 object-cover object-center transition-all duration-300 group-hover:scale-110"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white truncate drop-shadow", children: item.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-200 line-clamp-2 drop-shadow", children: item.description })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-300 group-hover:shadow-[0_0_20px_rgba(255,165,0,0.4)] transition-all duration-300 pointer-events-none" })
              ]
            },
            item._id || index
          )),
          /* @__PURE__ */ jsx(AnimatePresence, { children: selectedPhoto !== null && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.3 },
              className: "fixed inset-0 bg-black/80 flex items-center justify-center z-80 p-4",
              children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { y: 50, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  exit: { y: 50, opacity: 0 },
                  transition: { duration: 0.3 },
                  className: "relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-2xl max-w-4xl w-full h-[85vh] overflow-hidden border-4 flex flex-col",
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setSelectedPhoto(null),
                        className: "absolute top-3 right-3 bg-gray-500 hover:bg-gray-600 font-semibold text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition duration-200 z-10",
                        children: "✕"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "w-full h-72 lg:h-95 overflow-auto hide-scrollbar bg-black flex items-center justify-center", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setSelectedPhoto(
                            (selectedPhoto - 1 + photos.length) % photos.length
                          ),
                          className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-6xl z-10 hover:text-orange-400",
                          children: "‹"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `${BASE_URL}/uploads/representative/photos/${photos[selectedPhoto]?.photo}`,
                          alt: photos[selectedPhoto]?.title,
                          className: "object-contain"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setSelectedPhoto((selectedPhoto + 1) % photos.length),
                          className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-6xl z-10 hover:text-orange-400",
                          children: "›"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-6 overflow-y-auto flex-1 hide-scrollbar", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-orange-700 mb-2", children: photos[selectedPhoto]?.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-black text-lg whitespace-pre-line leading-relaxed", children: photos[selectedPhoto]?.description })
                    ] })
                  ]
                }
              )
            }
          ) }),
          photos.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 col-span-full text-lg", children: "No photos available." })
        ] })
      ]
    }
  ) });
};
const MemberGalleryPage = () => {
  const dispatch = useDispatch();
  const representative = useSelector((state) => state.representative.data);
  useEffect(() => {
    const id = getCookie("representativeId");
    if (id) dispatch(fetchRepresentativeDetailsById(id));
  }, [dispatch]);
  const repName = representative?.name || "";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: repName ? `फोटो संग्रह | ${repName}` : "फोटो संग्रह" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: repName ? `${repName} यांच्या समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह.` : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(GallerySection, {})
  ] });
};
const getRepresentativeDetails = async (id) => {
  try {
    const res = await api.get(`/api/representatives/details/${id}`);
    return res.data?.data || null;
  } catch (err) {
    return null;
  }
};
const ContactSection = () => {
  const [rep, setRep] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const representativeId = getCookie("representativeId");
      const result = await getRepresentativeDetails(representativeId);
      setRep(result);
    };
    fetchData();
  }, []);
  if (!rep) return null;
  return /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-b from-orange-200 via-white to-green-200 py-20 px-2 lg:px-6 mt-20", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-3xl font-bold text-orange-800 mb-4 flex items-center gap-2 pl-9", children: "संपर्क साधा" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] rounded-2xl p-8 border-4 border-orange-400 relative w-full ",
          style: {
            backgroundImage: `repeating-linear-gradient(to bottom, #fdf6e3, #fdf6e3 23px, #e6d8c3 24px)`,
            fontFamily: '"Noto Sans Devanagari", sans-serif'
          },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-orange-300 text-3xl", children: "🖊️" }),
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-orange-600 mb-2", children: rep.name }),
            /* @__PURE__ */ jsx("h4", { className: "text-2xl text-gray-700 font-semibold mb-1", children: rep.position }),
            /* @__PURE__ */ jsx("h5", { className: "text-xl text-gray-600 font-medium mb-6", children: rep.politicalParty?.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-lg text-gray-700 space-y-4 leading-relaxed", children: [
              rep.contactNo && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaPhoneAlt, { className: "text-orange-500" }),
                " मो. ",
                rep.contactNo
              ] }),
              rep.email && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaEnvelope, { className: "text-green-600" }),
                " ",
                rep.email
              ] }),
              rep.address?.map((addr, idx) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 font-semibold", children: [
                  /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-blue-500" }),
                  " कार्यालय",
                  " ",
                  idx + 1,
                  ":"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "ml-6 whitespace-pre-line", children: [
                  addr.line1,
                  ", ",
                  addr.line2,
                  "\n",
                  addr.taluka,
                  ", ",
                  addr.dist,
                  ", ",
                  addr.state,
                  " - ",
                  addr.pincode,
                  addr.nearbyLandmarks && `
जवळपास: ${addr.nearbyLandmarks}`
                ] })
              ] }, idx))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "block sm:hidden text-xl font-semibold text-orange-700 col-span-full mb-2 px-2", children: "नकाशा स्थान" }),
        rep.address?.map((addr, idx) => {
          const lat = addr.lat;
          const lng = addr.lan;
          const mapUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed` : null;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-xl border-4 border-[#d68029] shadow-lg overflow-hidden",
              style: {
                background: "url(https://www.transparenttextures.com/patterns/old-mathematics.png)",
                backgroundColor: "#f5f5dc",
                padding: "0.5rem"
              },
              children: mapUrl ? /* @__PURE__ */ jsx(
                "iframe",
                {
                  title: `Office ${idx + 1} Map`,
                  src: mapUrl,
                  width: "100%",
                  height: "300",
                  style: { border: 0 },
                  allowFullScreen: "",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-center p-4", children: "नकाशाची माहिती उपलब्ध नाही" })
            },
            idx
          );
        })
      ] })
    ] })
  ] });
};
const MemberContactPage = () => {
  const dispatch = useDispatch();
  const representative = useSelector((state) => state.representative.data);
  useEffect(() => {
    const id = getCookie("representativeId");
    if (id) dispatch(fetchRepresentativeDetailsById(id));
  }, [dispatch]);
  const repName = representative?.name || "";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: repName ? `संपर्क साधा | ${repName}` : "संपर्क साधा" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: repName ? `${repName} यांच्याशी समाजकार्य व उपक्रमांसाठी संपर्क साधा.` : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
};
const fetchServicesByRepresentative = async (id) => {
  try {
    const res = await api.get(`/api/services/representative/${id}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};
const fetchSubServicesByServiceId = async (serviceId) => {
  try {
    const response = await api.get(`/api/sub-services/${serviceId}`);
    return response.data.data || [];
  } catch (error) {
    return [];
  }
};
const NagrikSuvidha = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [showGovtSchemes, setShowGovtSchemes] = useState(false);
  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      try {
        const response = await fetchServicesByRepresentative(representativeId);
        const grouped = {};
        response?.services?.forEach((item) => {
          const category = item.category || "General";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(item);
        });
        setData(grouped);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const handleCardClick = async (category) => {
    setOpenCategory(category);
    const firstService = data[category]?.[0];
    if (firstService?._id) {
      try {
        const result = await fetchSubServicesByServiceId(firstService._id);
        setSubServices(result);
      } catch (err) {
        setSubServices([]);
      }
    }
  };
  const closeModal = () => {
    setOpenCategory(null);
  };
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-center py-6", children: "Loading..." });
  return /* @__PURE__ */ jsxs("div", { className: "relative py-10 bg-gradient-to-b from-orange-200 via-white to-green-200 min-h-[90vh] mb-6 px-4 sm:px-6 lg:px-12 mt-28 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-10 animate-float1" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-10 animate-float2" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-float3" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(15)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute rounded-full bg-gradient-to-r from-orange-100 to-green-100 opacity-20",
        style: {
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 20 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "relative mb-12 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-bold text-orange-700 mb-3 px-2 inline-block", children: /* @__PURE__ */ jsxs("span", { className: "relative z-10", children: [
        "नागरीक सुविधा",
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "सर्व सार्वजनिक सेवा एकाच ठिकाणी - सहज आणि सोप्या पध्दतीने" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-8 px-4 py-8", children: [
      "शासकीय योजना",
      // <-- Always render this first
      ...Object.keys(data).filter((key) => key !== "शासकीय योजना")
      // <-- Then the rest
    ].map((category) => {
      const isGovtScheme = category === "शासकीय योजना";
      if (isGovtScheme) {
        return /* @__PURE__ */ jsx(
          "div",
          {
            onClick: async () => {
              setShowGovtSchemes(true);
              const firstService = data["शासकीय योजना"]?.[0];
              if (firstService?._id) {
                const result = await fetchSubServicesByServiceId(firstService._id);
                setSubServices(result?.[0]?.subServices || []);
              }
            },
            className: "relative group w-full md:w-[48%] lg:w-[28%] \r\n          bg-white/10 border border-transparent rounded-2xl p-[2px] \r\n          bg-gradient-to-br from-blue-400 via-blue-100 to-blue-400 \r\n          shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer",
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative rounded-[18px] bg-white/80 backdrop-blur-lg \r\n            p-5 min-h-[220px] max-h-[280px] flex flex-col justify-between overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-14 h-14 bg-blue-100 border border-blue-300 text-blue-600 \r\n              rounded-xl flex items-center justify-center text-3xl mb-4 shadow-inner \r\n              transition-transform duration-300 group-hover:scale-110",
                      children: "🏛️"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 animate-bounce", children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-xs \r\n                font-bold px-3 py-1 rounded-full shadow-md",
                      children: "नवीन"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-extrabold text-gray-900 mb-1 tracking-tight", children: category }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2", children: "विविध शासकीय योजनांविषयी संपूर्ण माहिती" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-700 text-sm font-semibold group-hover:text-blue-800 transition", children: [
                    "अधिक माहिती",
                    /* @__PURE__ */ jsx(FaArrowRight, { className: "transition-transform group-hover:translate-x-1" })
                  ] })
                ]
              }
            )
          },
          category
        );
      }
      return /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => handleCardClick(category),
          className: "relative group w-full md:w-[48%] lg:w-[28%] \r\n        bg-white/10 border border-transparent rounded-2xl p-[2px] \r\n        bg-gradient-to-br from-red-400 via-red-100 to-red-400 \r\n        shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative rounded-[18px] bg-white/80 backdrop-blur-lg \r\n          p-5 min-h-[220px] max-h-[280px] flex flex-col justify-between overflow-hidden",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-14 h-14 bg-red-100 border border-red-300 text-red-600 \r\n            rounded-xl flex items-center justify-center text-3xl mb-4 shadow-inner \r\n            transition-transform duration-300 group-hover:scale-110",
                    children: "🚨"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 animate-bounce", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "bg-gradient-to-tr from-red-600 to-red-400 text-white text-xs \r\n              font-bold px-3 py-1 rounded-full shadow-md",
                    children: "EMERGENCY"
                  }
                ) }),
                /* @__PURE__ */ jsx("h3", { className: "text-base font-extrabold text-gray-900 mb-1 tracking-tight", children: category }),
                data[category][0] && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 mb-4 leading-relaxed line-clamp-2", children: data[category][0].description }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-red-700 text-sm font-semibold group-hover:text-red-800 transition", children: [
                  "सर्व सेवा पहा",
                  /* @__PURE__ */ jsx(FaArrowRight, { className: "transition-transform group-hover:translate-x-1" })
                ] })
              ]
            }
          )
        },
        category
      );
    }) }),
    openCategory && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4 py-6 sm:py-12 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: closeModal,
          className: "absolute top-4 right-6 text-gray-500 hover:text-red-500 text-3xl transition-transform hover:rotate-90 z-50",
          children: "×"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-red-100 p-3 rounded-xl", children: /* @__PURE__ */ jsx("span", { className: "text-3xl text-red-500", children: "🚨" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold text-gray-800", children: openCategory }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "सर्व संबंधित सेवा आणि संपर्क माहिती" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: subServices.length > 0 ? subServices.map((service, idx) => {
        const nestedSubs = Array.isArray(service.subServices) ? service.subServices : [];
        return nestedSubs.map((sub, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-3 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-2xl text-indigo-600", children: "🏥" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors", children: sub.name }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-gray-500" }),
                        " ",
                        sub.location
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(FaPhoneAlt, { className: "text-green-500" }),
                        " ",
                        sub.contact
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-4", children: sub.details })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200", children: [
                sub.appliedLink && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: sub.appliedLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-indigo-600 text-sm font-medium transition flex items-center gap-2 hover:text-indigo-800 group",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "group-hover:underline", children: "ऑनलाइन लिंक" }),
                      /* @__PURE__ */ jsx(FaExternalLinkAlt, { className: "text-xs" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => handleCall(sub.contact),
                      className: "flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition",
                      children: [
                        /* @__PURE__ */ jsx(FaPhoneAlt, {}),
                        " कॉल करा"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `https://wa.me/${sub.contact}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition",
                      children: [
                        /* @__PURE__ */ jsx(FaWhatsapp, {}),
                        " WhatsApp"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          sub._id || `${idx}-${i}`
        ));
      }) : /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex flex-col items-center justify-center py-10", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 p-6 rounded-full mb-5", children: /* @__PURE__ */ jsx(FaInfoCircle, { className: "text-5xl text-gray-400" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-medium text-gray-700 mb-2", children: "No services available" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center max-w-md", children: "Currently there are no sub-services listed for this category. Please check back later." })
      ] }) })
    ] }) }),
    showGovtSchemes && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4 py-6 sm:py-12 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl relative max-h-[70vh] overflow-y-auto border-l-8 border-indigo-500", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowGovtSchemes(false),
          className: "absolute top-4 right-6 text-gray-500 hover:text-red-500 text-3xl transition-transform hover:rotate-90 z-50",
          children: "×"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-3 rounded-xl", children: /* @__PURE__ */ jsx("span", { className: "text-3xl text-indigo-600", children: "🏛️" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold text-gray-800", children: "शासकीय योजना" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "सर्व लोकप्रिय सरकारी योजना आणि त्यांचे संकेतस्थळ" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: subServices.length > 0 ? subServices.map((scheme, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: `bg-indigo-100 p-3 rounded-lg flex-shrink-0`, children: /* @__PURE__ */ jsx("span", { className: "text-2xl text-indigo-600", children: scheme.icon || "📋" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors", children: scheme.name }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
                    scheme.location && /* @__PURE__ */ jsxs("span", { className: "text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-gray-500" }),
                      scheme.location
                    ] }),
                    scheme.contact && /* @__PURE__ */ jsxs("span", { className: "text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(FaPhoneAlt, { className: "text-green-500" }),
                      scheme.contact
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-4", children: scheme.desc || scheme.details })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-6 py-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200", children: [
              scheme.appliedLink && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: scheme.appliedLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-indigo-600 text-sm font-medium transition flex items-center gap-2 hover:text-indigo-800 group",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "group-hover:underline", children: "योजना संकेतस्थळ" }),
                    /* @__PURE__ */ jsx(FaExternalLinkAlt, { className: "text-xs" })
                  ]
                }
              ),
              scheme.contact && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleCall(scheme.contact),
                    className: "flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition",
                    children: [
                      /* @__PURE__ */ jsx(FaPhoneAlt, {}),
                      " कॉल करा"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `https://wa.me/${scheme.contact}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition",
                    children: [
                      /* @__PURE__ */ jsx(FaWhatsapp, {}),
                      " WhatsApp"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        scheme._id || index
      )) : /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex flex-col items-center justify-center py-10", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-100 p-6 rounded-full mb-5", children: /* @__PURE__ */ jsx(FaInfoCircle, { className: "text-5xl text-gray-400" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-medium text-gray-700 mb-2", children: "कोणतीही योजना सापडली नाही" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center max-w-md", children: "सध्या या श्रेणीसाठी कोणत्याही योजना सूचीबद्ध नाहीत. कृपया नंतर पुन्हा तपासा." })
      ] }) })
    ] }) })
  ] });
};
const NagrikSuvidhaPage = () => {
  const [repName, setRepName] = useState("");
  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      if (representativeId) {
        try {
          const data = await fetchRepresentativeById(representativeId);
          if (data?.name) setRepName(data.name);
        } catch (error) {
        }
      }
    };
    load();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: repName ? `नागरीक सुविधा | ${repName}` : "नागरीक सुविधा" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: repName ? `${repName} यांच्या समाजकार्याशी संबंधित विविध नागरीक सुविधा उपक्रमांची माहिती.` : "समाजकार्य व विविध उपक्रमांच्या खास छायाचित्रांचा संग्रह."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(NagrikSuvidha, {})
  ] });
};
const PrabhagDetailsPage = () => {
  const { city, wardNo } = useParams();
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!city || !wardNo) return;
    const fetchData = async () => {
      try {
        setError("");
        const data = await getRepresentativesByWard(
          decodeURIComponent(city),
          decodeURIComponent(wardNo)
        );
        setMembers(data);
      } catch (err) {
        setMembers([]);
        setError(err?.message || "अज्ञात त्रुटी");
      }
    };
    fetchData();
  }, [city, wardNo]);
  const handleClick = () => {
    navigate(`/member/home`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: `${decodeURIComponent(wardNo)} चे सदस्य` }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `${decodeURIComponent(wardNo)} मधील नगरसेवकांची यादी`
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-fixed bg-center bg-cover relative flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-orange-200 via-white to-green-200", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-8xl max-h-[120vh] px-4 sm:px-8 py-10 mt-20 relative z-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-orange-800 mb-10 text-center border-b-4 border-orange-600 pb-3 inline-block mx-auto px-4 py-3 rounded-md", children: [
        decodeURIComponent(wardNo),
        " चे सदस्य"
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-r from-red-100 via-red-200 to-red-100 text-red-800 border-l-4 border-red-500 p-4 rounded-md mb-6 py-8 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(HiOutlineExclamationCircle, { className: "text-red-600 w-8 h-8 animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base font-medium", children: error })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in", children: members.map((member) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => handleClick(member.name),
          className: "cursor-pointer bg-white/60 border-4 border-orange-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:bg-white/80 transition duration-300 p-6 flex flex-col items-center backdrop-blur-sm",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md border-4 border-white ring-4 ring-gradient-to-br from-orange-400 to-green-400 transition-transform duration-500 hover:scale-110", children: member.representativephoto ? /* @__PURE__ */ jsx(
              "img",
              {
                src: `${BASE_URL}/uploads/representative/${member.representativephoto}`,
                alt: member.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsx(FaUserCircle, { className: "w-full h-full text-orange-300" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-green-900 tracking-wide text-center", children: member.name })
          ]
        },
        member._id
      )) })
    ] }) })
  ] });
};
const PoliticalPartyDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const historyRef = React__default.useRef(null);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = React__default.useState(current);
  getCookie("politicalPartyId");
  useEffect(() => {
    const load = async () => {
      const representativeId = getCookie("representativeId");
      if (!representativeId) return;
      try {
        const repData = await fetchRepresentativeById(representativeId);
        if (repData?.politicalParty) {
          setData(repData.politicalParty);
        }
      } catch (err) {
        console.error("Failed to fetch representative or political party:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showFullText]);
  useEffect(() => {
    if (!data.banarImage || data.banarImage.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev2) => (prev2 + 1) % data.banarImage.length);
    }, 4e3);
    return () => clearInterval(interval);
  }, [data.banarImage]);
  React__default.useEffect(() => {
    if (current !== prev) {
      setPrev(current);
    }
  }, [current]);
  if (loading) {
    return /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "लोड करत आहे..." });
  }
  if (!data?.name) {
    return /* @__PURE__ */ jsx("div", { className: "text-center bg-gradient-to-b from-orange-100 via-white to-green-100 text-black text-xl font-semibold py-10 mt-40", children: "पक्षाची माहिती उपलब्ध नाही" });
  }
  data?.history?.length > 400;
  const shortText = showFullText ? data?.history : `${data?.history?.slice(0, 400)}...`;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 px-2 lg:px-2 pt-3 mt-30 bg-gradient-to-b from-orange-100 via-white to-green-100", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative bg-gradient-to-b from-orange-500 to-orange-600 text-center pb-6 rounded-b-3xl shadow-xl overflow-hidden w-full  max-h-[20vh]",
        style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden  ", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0bg-[linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_87.5%,transparent_87.5%)] bg-[length:40px_40px] opacity-20" }),
            [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute bg-white rounded-full",
                style: {
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
                }
              },
              i
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-center gap-8 mt-4 px-6", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "w-28 h-28 relative rounded-full bg-white border-4 border-orange-600 shadow-lg",
                initial: { rotateY: 0 },
                animate: { rotateY: 360 },
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                style: { perspective: 600 },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center bg-white",
                      style: {
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      },
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `${BASE_URL}/uploads/party/symbols/${data.symbol}`,
                          alt: "Party Symbol",
                          className: "w-24 h-24 object-contain rounded-full"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center bg-white",
                      style: {
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      },
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `${BASE_URL}/uploads/party/symbols/${data.symbol}`,
                          alt: "Party Symbol",
                          className: "w-24 h-24 object-contain rounded-full",
                          style: { transform: "rotateY(180deg)" }
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative text-white text-left", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]", children: data.name }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-24 bg-orange-400 clip-flag-left transform rotate-[-15deg] shadow-md" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-24 bg-orange-400 clip-flag-right transform rotate-[15deg] shadow-md" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "w-full max-w-8xl mx-auto flex flex-col gap-8 py-8  px-0 lg:px-2",
        style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-center bg-white lg:p-6 p-2 rounded-2xl shadow-xl border border-orange-200", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/3  ", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `${BASE_URL}/uploads/party/leader-photos/${data.mainLeadPhoto}`,
                alt: data.leader,
                loading: "lazy",
                className: "w-full max-w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-orange-400 hover:scale-105 transition-transform"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/3 flex flex-col relative", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-orange-700 mb-8 drop-shadow-md", children: data.leader }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `${BASE_URL}/uploads/party/symbols/${data.symbol}`,
                  alt: "Party Symbol",
                  className: "hidden sm:block w-32 h-32 object-contain rounded-full border-4 border-orange-300 shadow-md absolute top-0 right-10 mr-4"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex gap-6 text-3xl mb-8", children: [
                {
                  href: data.facebook,
                  icon: /* @__PURE__ */ jsx(FaFacebook, {}),
                  color: "text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200",
                  key: "facebook"
                },
                {
                  href: data.twitter,
                  icon: /* @__PURE__ */ jsx(FaTwitter, {}),
                  color: "text-sky-500 hover:text-sky-700 bg-sky-100 hover:bg-sky-200",
                  key: "twitter"
                },
                {
                  href: data.instagram,
                  icon: /* @__PURE__ */ jsx(FaInstagram, {}),
                  color: "text-pink-500 hover:text-pink-700 bg-pink-100 hover:bg-pink-200",
                  key: "instagram"
                },
                {
                  href: data.youtube,
                  icon: /* @__PURE__ */ jsx(FaYoutube, {}),
                  color: "text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200",
                  key: "youtube"
                }
              ].map(
                ({ href, icon, color, key }) => href ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: `p-2 rounded-full transition-all duration-300 cursor-pointer ${color} shadow-md hover:scale-110`,
                    "aria-label": key,
                    children: icon
                  },
                  key
                ) : null
              ) }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2  md:grid-cols-2 gap-6", children: [
                { title: "अध्यक्ष", content: data.leader },
                { title: "स्थापना वर्ष", content: data.foundationYear },
                { title: "मुख्य कार्यालय", content: data.headOffice },
                {
                  title: "संकेतस्थळ",
                  content: /* @__PURE__ */ jsx("div", { className: "max-w-[200px] overflow-hidden whitespace-nowrap", children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: data.website,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-blue-600 font-semibold hover:underline truncate",
                      children: data.website
                    }
                  ) })
                }
              ].map(({ title, content }) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "bg-white p-6 rounded-xl shadow-lg border border-orange-300 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200\r\n    animate-gradient-x hover:shadow-2xl transition-shadow duration-300",
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl text-orange-600 mb-3", children: title }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-lg leading-relaxed", children: content })
                  ]
                },
                title
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1 w-full my-6 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-lg animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full h-96 rounded-lg overflow-hidden border border-orange-300 shadow-lg bg-orange-50", children: [
            data.banarImage && data.banarImage.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 1, scale: 1 },
                  animate: { opacity: 0, scale: 0.95 },
                  exit: { opacity: 0 },
                  transition: { duration: 1 },
                  className: "absolute inset-0 bg-center bg-cover rounded-lg pointer-events-none",
                  style: {
                    backgroundImage: `url(${BASE_URL}/uploads/party/banner/${data.banarImage[prev]})`
                  }
                },
                `prev-${prev}`
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 1.05 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.95 },
                  transition: { duration: 1 },
                  className: "absolute inset-0 bg-center bg-cover rounded-lg",
                  style: {
                    backgroundImage: `url(${BASE_URL}/uploads/party/banner/${data.banarImage[current]})`
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 rounded-lg" }),
                    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-tight", children: "जनतेसोबत, विकासाच्या मार्गावर" }),
                      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg md:text-2xl font-medium max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]", children: "निष्ठा, सेवा आणि एकतेसह नवा महाराष्ट्र घडवूया." })
                    ] })
                  ]
                },
                `current-${current}`
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center h-full p-6 text-center text-orange-400 italic bg-orange-100 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "No images available" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: "Please check back later for updates." })
            ] }),
            data.banarImage && data.banarImage.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3", children: data.banarImage.map((_, i) => /* @__PURE__ */ jsx(
              "button",
              {
                className: `w-4 h-4 rounded-full transition-colors duration-300 shadow-md ${i === current ? "bg-orange-600 shadow-lg scale-110" : "bg-orange-300 hover:bg-orange-400"}`,
                onClick: () => setCurrent(i),
                "aria-label": `Slide ${i + 1}`,
                style: { outline: "none" }
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full p-6 md:p-10 rounded-2xl border-2 border-yellow-600 shadow-xl bg-[url('/old-paper-texture.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden group transition-all duration-500 hover:scale-[1.01]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#f8ecd6]/90 via-[#fffef7]/85 to-[#f7deb0]/90 z-0 rounded-2xl backdrop-blur-sm" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-yellow-600 text-opacity-50 text-5xl rotate-[-10deg] select-none pointer-events-none z-0 font-serif", children: "🕰️" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-gray-900", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl md:text-3xl font-extrabold text-yellow-800 mb-4 flex items-center gap-3 drop-shadow-md", children: [
                /* @__PURE__ */ jsx(FaHistory, { className: "text-2xl text-yellow-700" }),
                "इतिहास:"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line text-md leading-relaxed tracking-wide font-medium  md:text-lg text-gray-800", children: shortText }),
              data?.history?.length > 400 && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (showFullText && historyRef.current) {
                      historyRef.current.scrollIntoView({
                        behavior: "smooth"
                      });
                    }
                    setShowFullText((prev2) => !prev2);
                  },
                  className: "text-yellow-800 hover:text-yellow-600 font-semibold underline decoration-yellow-500 hover:decoration-yellow-700 transition duration-300",
                  children: showFullText ? "कमी वाचा" : "अधिक वाचा"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-extrabold text-orange-600 mb-6 flex items-center gap-3", children: "📸 फोटो गॅलरी" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: data.partyImages?.map((img, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group rounded-xl overflow-hidden shadow-lg border-2 border-yellow-800 bg-orange-50 hover:shadow-2xl transition duration-300",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${BASE_URL}/uploads/party/images/${img}`,
                      alt: `Party image ${index + 1}`,
                      className: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white text-lg font-semibold" })
                ]
              },
              index
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full p-8 rounded-2xl border-2 border-orange-600 shadow-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 text-orange-200 text-5xl rotate-[15deg] select-none pointer-events-none z-0", children: "🛠️" }),
            /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-extrabold text-orange-700 mb-6 flex items-center gap-3 z-10 relative", children: [
              /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "📋" }),
              " कार्य:"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-800 z-10 relative", children: data.work?.map((item, idx) => /* @__PURE__ */ jsx(
              "li",
              {
                className: "text-lg font-medium relative pl-8 before:content-['✔'] before:absolute before:left-0 before:top-0.5 before:text-green-600 before:text-xl",
                children: item
              },
              idx
            )) })
          ] })
        ]
      }
    )
  ] }) });
};
const PoliticalPartyPage = () => {
  const dispatch = useDispatch();
  const { data: representative } = useSelector((state) => state.representative);
  const representativeId = getCookie("representativeId");
  useEffect(() => {
    if (representativeId) {
      dispatch(fetchRepresentativeDetailsById(representativeId));
    }
  }, [dispatch, representativeId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: representative?.name ? `पक्ष माहिती | ${representative.name} ` : "पक्ष माहिती" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: representative?.name ? `${representative.name} यांच्या पक्षाची सविस्तर माहिती व कार्य.` : "पक्षाची सविस्तर माहिती."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(PoliticalPartyDetails, {})
  ] });
};
const fetchCityWards = async () => {
  try {
    const res = await api.get("/api/city-wards");
    return res.data.data;
  } catch (error) {
    return [];
  }
};
const back1 = "/assets/back1-ouV475Cc.jpg";
const back2 = "/assets/back2-DVUaZKTA.jpg";
const back3 = "/assets/back3-C3ROeaki.jpg";
const images = [back1, back3, back2];
const CityPrabhagBar = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [prabhags, setPrabhags] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    async function loadCities() {
      const data = await fetchCityWards();
      setCityList(data);
    }
    loadCities();
  }, []);
  const handleSelect = (cityName) => {
    const selected = cityList.find((c) => c.city === cityName);
    if (selected) {
      setSelectedCity(selected);
      setPrabhags(selected.wardNo);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    } else {
      setSelectedCity(null);
      setPrabhags([]);
    }
    setShowDropdown(false);
  };
  const filteredCities = cityList.filter(
    (c) => c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCardClick = async (wardNo) => {
    try {
      const reps = await getRepresentativesByWard(selectedCity?.city, wardNo);
      const rep = reps[0];
      if (rep && rep._id) {
        setCookie("representativeId", rep._id, {
          maxAge: 7 * 24 * 60 * 60
        });
      }
      navigate(
        `/prabhag/${encodeURIComponent(selectedCity.city)}/${encodeURIComponent(
          wardNo
        )}`
      );
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || "अज्ञात त्रुटी आली आहे.";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3e3,
        pauseOnHover: true,
        draggable: true
      });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative w-full h-[65vh] sm:h-[70vh] mt-17", children: [
      /* @__PURE__ */ jsx(
        Swiper,
        {
          modules: [EffectFade, Autoplay],
          effect: "fade",
          loop: true,
          autoplay: { delay: 5e3, disableOnInteraction: false },
          className: "w-full h-full",
          children: images.map((img, index) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(
            "img",
            {
              src: img,
              alt: `Slide ${index}`,
              className: "w-full h-full object-cover"
            }
          ) }, index))
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-10",
          style: {
            background: "radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.25))"
          }
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20 space-y-4",
          style: { fontFamily: '"Noto Sans Devanagari", sans-serif' },
          children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-white text-2xl sm:text-3xl lg:text-5xl font-extrabold drop-shadow-lg leading-snug", children: [
              "आता मिळवा आपल्या प्रभागातील सर्व विकास कामांची माहीती ",
              /* @__PURE__ */ jsx("br", {}),
              "फक्त एका क्लिक मध्ये."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl font-medium max-w-3xl", children: "तसेच आपल्या प्रभागातील समस्या आपल्या प्रभागातील उमेदवारांकडे मांडण्याची सुविधा." }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-lg w-full mx-auto relative z-50", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center text-white mb-6 tracking-wide", children: "शहर निवडा" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", ref: containerRef, children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => setShowDropdown((prev) => !prev),
                    className: "relative group bg-white px-5 py-3 rounded-xl shadow-lg cursor-pointer flex items-center justify-between text-lg text-gray-700 border-2 border-transparent hover:border-orange-400 transition-all duration-300",
                    children: [
                      selectedCity ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 text-gray-800 font-medium group-hover:text-orange-600 transition-all duration-300", children: [
                        /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-orange-500 animate-pulse group-hover:scale-110 transition-transform duration-300" }),
                        selectedCity.city,
                        " ",
                        /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600 font-medium", children: [
                          "(प्रतिनिधी: ",
                          selectedCity.representativeCount,
                          ")"
                        ] })
                      ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 text-gray-800 font-medium group-hover:text-orange-600 transition-all duration-300", children: [
                        /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-orange-500 animate-pulse group-hover:scale-110 transition-transform duration-300" }),
                        "शहर निवडा"
                      ] }),
                      /* @__PURE__ */ jsx(FaSearch, { className: "absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-500 text-xl pointer-events-none group-hover:scale-110 transition-transform duration-300" })
                    ]
                  }
                ),
                showDropdown && /* @__PURE__ */ jsx("ul", { className: "absolute z-50 w-full mt-2 bg-white border border-orange-200 rounded-xl shadow-xl max-h-64 overflow-y-auto animate-fade-in backdrop-blur-sm", children: filteredCities.length > 0 ? filteredCities.map((cityObj) => /* @__PURE__ */ jsx(
                  "li",
                  {
                    onClick: () => handleSelect(cityObj.city),
                    className: "bg-white border text-black border-orange-200 rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition cursor-pointer",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-orange-600" }),
                        /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: cityObj.city })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-blue-600 bg-orange-100 px-2 py-0.5 rounded", children: [
                        "प्रतिनिधी: ",
                        cityObj.representativeCount
                      ] })
                    ] })
                  },
                  cityObj.city
                )) : /* @__PURE__ */ jsx("li", { className: "px-6 py-4 text-gray-400 text-center", children: "शहर सापडले नाही" }) })
              ] })
            ] }),
            selectedCity && selectedCity.city && prabhags.length > 0 && /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-white mt-6 tracking-wider drop-shadow-md", children: /* @__PURE__ */ jsxs(
              motion.span,
              {
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
                transition: { duration: 0.4 },
                children: [
                  selectedCity.city,
                  " - प्रभाग यादी"
                ]
              },
              selectedCity.city
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-right", autoClose: 3e3 }),
    selectedCity && prabhags.length > 0 && /* @__PURE__ */ jsxs(
      "section",
      {
        ref: sectionRef,
        className: "relative w-full min-h-fit py-12 sm:py-16",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-center bg-cover z-0",
              style: {
                backgroundImage: "url('https://images.stockcake.com/public/c/a/9/ca9553c7-e2c3-43ba-abe2-af64e9a428b3_large/vibrant-political-rally-stockcake.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm z-10" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6", children: prabhags.map((prabhag, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => handleCardClick(prabhag),
              className: "relative bg-gradient-to-br from-white via-sky-50 to-sky-100 border-4 border-t-orange-500 border-b-green-500 rounded-xl p-6 sm:p-7 text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden min-h-[120px]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ashoka_Chakra.svg/1024px-Ashoka_Chakra.svg.png",
                    alt: "Ashoka Chakra",
                    className: "w-20 h-20 animate-spin",
                    style: { animationDuration: "10s" }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsx(FaMapMarkedAlt, { className: "text-blue-600 text-3xl mb-3 mx-auto" }),
                  /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg font-semibold text-blue-800", children: prabhag })
                ] })
              ]
            },
            idx
          )) }) })
        ]
      }
    )
  ] });
};
const HomePage = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "माझा नगर सेवक | तुमच्या भागातील माहितीपूर्ण सेवा" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "माझा नगरसेवक – तुमच्या स्थानिक नगरसेवकांची माहिती, प्रभागातील कामे, नागरीक सुविधा व समाजकार्य यांचे सविस्तर विवरण."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "नगरसेवक, माझा नगरसेवक, प्रभाग, सामाजिक कार्य, नागरी सुविधा, स्थानिक प्रशासन, Rajniti"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Maza Nagarsevak Team" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "माझा नगरसेवक" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "तुमच्या भागातील सामाजिक कार्य, नागरीक सुविधा व माहिती."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/banner.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://mazanagarsevak.in" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://mazanagarsevak.in" })
    ] }),
    /* @__PURE__ */ jsx(CityPrabhagBar, {})
  ] });
};
function App() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(HomePageLayout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
      " ",
      /* @__PURE__ */ jsx(Route, { path: "home", element: /* @__PURE__ */ jsx(HomePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "about", element: /* @__PURE__ */ jsx(AboutUsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "contact", element: /* @__PURE__ */ jsx(ContactUsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/prabhag/:city/:wardNo", element: /* @__PURE__ */ jsx(PrabhagDetailsPage, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: "/member/home", element: /* @__PURE__ */ jsx(MemberLayout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(MemberMainPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "about-member", element: /* @__PURE__ */ jsx(AboutMemberPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "social-work", element: /* @__PURE__ */ jsx(SocialWorkPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "videos", element: /* @__PURE__ */ jsx(MemberVideoPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "images", element: /* @__PURE__ */ jsx(MemberGalleryPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "about-party", element: /* @__PURE__ */ jsx(PoliticalPartyPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "contact-member", element: /* @__PURE__ */ jsx(MemberContactPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "nagrik-suvidha", element: /* @__PURE__ */ jsx(NagrikSuvidhaPage, {}) })
    ] })
  ] });
}
function StaticRouter({
  basename,
  children,
  location: locationProp = "/",
  future
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = Action.Pop;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ React.createElement(Router, {
    basename,
    children,
    location,
    navigationType: action,
    navigator: staticNavigator,
    future,
    static: true
  });
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const store = configureStore({
  reducer: {
    representative: representativeReducer
  }
});
function render(url, options) {
  const helmetContext = {};
  return renderToPipeableStream(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) }),
    { ...options, helmetContext }
    // pass back to server
  );
}
export {
  render
};
