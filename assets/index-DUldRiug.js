var rv=Object.defineProperty;var sv=(t,e,n)=>e in t?rv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Ce=(t,e,n)=>sv(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function av(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Wm={exports:{}},Vl={},jm={exports:{}},Ye={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ja=Symbol.for("react.element"),ov=Symbol.for("react.portal"),lv=Symbol.for("react.fragment"),cv=Symbol.for("react.strict_mode"),uv=Symbol.for("react.profiler"),dv=Symbol.for("react.provider"),fv=Symbol.for("react.context"),hv=Symbol.for("react.forward_ref"),pv=Symbol.for("react.suspense"),mv=Symbol.for("react.memo"),gv=Symbol.for("react.lazy"),Ph=Symbol.iterator;function xv(t){return t===null||typeof t!="object"?null:(t=Ph&&t[Ph]||t["@@iterator"],typeof t=="function"?t:null)}var Xm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ym=Object.assign,qm={};function zs(t,e,n){this.props=t,this.context=e,this.refs=qm,this.updater=n||Xm}zs.prototype.isReactComponent={};zs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};zs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function $m(){}$m.prototype=zs.prototype;function rf(t,e,n){this.props=t,this.context=e,this.refs=qm,this.updater=n||Xm}var sf=rf.prototype=new $m;sf.constructor=rf;Ym(sf,zs.prototype);sf.isPureReactComponent=!0;var Nh=Array.isArray,Km=Object.prototype.hasOwnProperty,af={current:null},Zm={key:!0,ref:!0,__self:!0,__source:!0};function Jm(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Km.call(e,i)&&!Zm.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:ja,type:t,key:s,ref:a,props:r,_owner:af.current}}function vv(t,e){return{$$typeof:ja,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function of(t){return typeof t=="object"&&t!==null&&t.$$typeof===ja}function _v(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Lh=/\/+/g;function dc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?_v(""+t.key):e.toString(36)}function Go(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case ja:case ov:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+dc(a,0):i,Nh(r)?(n="",t!=null&&(n=t.replace(Lh,"$&/")+"/"),Go(r,e,n,"",function(c){return c})):r!=null&&(of(r)&&(r=vv(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Lh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Nh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+dc(s,o);a+=Go(s,e,n,l,r)}else if(l=xv(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+dc(s,o++),a+=Go(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function to(t,e,n){if(t==null)return t;var i=[],r=0;return Go(t,i,"","",function(s){return e.call(n,s,r++)}),i}function yv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ln={current:null},Wo={transition:null},Sv={ReactCurrentDispatcher:ln,ReactCurrentBatchConfig:Wo,ReactCurrentOwner:af};function Qm(){throw Error("act(...) is not supported in production builds of React.")}Ye.Children={map:to,forEach:function(t,e,n){to(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return to(t,function(){e++}),e},toArray:function(t){return to(t,function(e){return e})||[]},only:function(t){if(!of(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ye.Component=zs;Ye.Fragment=lv;Ye.Profiler=uv;Ye.PureComponent=rf;Ye.StrictMode=cv;Ye.Suspense=pv;Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sv;Ye.act=Qm;Ye.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Ym({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=af.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Km.call(e,l)&&!Zm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:ja,type:t.type,key:r,ref:s,props:i,_owner:a}};Ye.createContext=function(t){return t={$$typeof:fv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:dv,_context:t},t.Consumer=t};Ye.createElement=Jm;Ye.createFactory=function(t){var e=Jm.bind(null,t);return e.type=t,e};Ye.createRef=function(){return{current:null}};Ye.forwardRef=function(t){return{$$typeof:hv,render:t}};Ye.isValidElement=of;Ye.lazy=function(t){return{$$typeof:gv,_payload:{_status:-1,_result:t},_init:yv}};Ye.memo=function(t,e){return{$$typeof:mv,type:t,compare:e===void 0?null:e}};Ye.startTransition=function(t){var e=Wo.transition;Wo.transition={};try{t()}finally{Wo.transition=e}};Ye.unstable_act=Qm;Ye.useCallback=function(t,e){return ln.current.useCallback(t,e)};Ye.useContext=function(t){return ln.current.useContext(t)};Ye.useDebugValue=function(){};Ye.useDeferredValue=function(t){return ln.current.useDeferredValue(t)};Ye.useEffect=function(t,e){return ln.current.useEffect(t,e)};Ye.useId=function(){return ln.current.useId()};Ye.useImperativeHandle=function(t,e,n){return ln.current.useImperativeHandle(t,e,n)};Ye.useInsertionEffect=function(t,e){return ln.current.useInsertionEffect(t,e)};Ye.useLayoutEffect=function(t,e){return ln.current.useLayoutEffect(t,e)};Ye.useMemo=function(t,e){return ln.current.useMemo(t,e)};Ye.useReducer=function(t,e,n){return ln.current.useReducer(t,e,n)};Ye.useRef=function(t){return ln.current.useRef(t)};Ye.useState=function(t){return ln.current.useState(t)};Ye.useSyncExternalStore=function(t,e,n){return ln.current.useSyncExternalStore(t,e,n)};Ye.useTransition=function(){return ln.current.useTransition()};Ye.version="18.3.1";jm.exports=Ye;var Be=jm.exports;const Mv=av(Be);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ev=Be,wv=Symbol.for("react.element"),bv=Symbol.for("react.fragment"),Tv=Object.prototype.hasOwnProperty,Av=Ev.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Rv={key:!0,ref:!0,__self:!0,__source:!0};function e0(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)Tv.call(e,i)&&!Rv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:wv,type:t,key:s,ref:a,props:r,_owner:Av.current}}Vl.Fragment=bv;Vl.jsx=e0;Vl.jsxs=e0;Wm.exports=Vl;var g=Wm.exports,xu={},t0={exports:{}},Rn={},n0={exports:{}},i0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(F,X){var J=F.length;F.push(X);e:for(;0<J;){var ne=J-1>>>1,ae=F[ne];if(0<r(ae,X))F[ne]=X,F[J]=ae,J=ne;else break e}}function n(F){return F.length===0?null:F[0]}function i(F){if(F.length===0)return null;var X=F[0],J=F.pop();if(J!==X){F[0]=J;e:for(var ne=0,ae=F.length,ze=ae>>>1;ne<ze;){var Je=2*(ne+1)-1,We=F[Je],K=Je+1,se=F[K];if(0>r(We,J))K<ae&&0>r(se,We)?(F[ne]=se,F[K]=J,ne=K):(F[ne]=We,F[Je]=J,ne=Je);else if(K<ae&&0>r(se,J))F[ne]=se,F[K]=J,ne=K;else break e}}return X}function r(F,X){var J=F.sortIndex-X.sortIndex;return J!==0?J:F.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],f=1,h=null,d=3,p=!1,_=!1,E=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(F){for(var X=n(c);X!==null;){if(X.callback===null)i(c);else if(X.startTime<=F)i(c),X.sortIndex=X.expirationTime,e(l,X);else break;X=n(c)}}function S(F){if(E=!1,M(F),!_)if(n(l)!==null)_=!0,Y(T);else{var X=n(c);X!==null&&H(S,X.startTime-F)}}function T(F,X){_=!1,E&&(E=!1,u(v),v=-1),p=!0;var J=d;try{for(M(X),h=n(l);h!==null&&(!(h.expirationTime>X)||F&&!N());){var ne=h.callback;if(typeof ne=="function"){h.callback=null,d=h.priorityLevel;var ae=ne(h.expirationTime<=X);X=t.unstable_now(),typeof ae=="function"?h.callback=ae:h===n(l)&&i(l),M(X)}else i(l);h=n(l)}if(h!==null)var ze=!0;else{var Je=n(c);Je!==null&&H(S,Je.startTime-X),ze=!1}return ze}finally{h=null,d=J,p=!1}}var b=!1,R=null,v=-1,A=5,P=-1;function N(){return!(t.unstable_now()-P<A)}function U(){if(R!==null){var F=t.unstable_now();P=F;var X=!0;try{X=R(!0,F)}finally{X?j():(b=!1,R=null)}}else b=!1}var j;if(typeof x=="function")j=function(){x(U)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,O=Z.port2;Z.port1.onmessage=U,j=function(){O.postMessage(null)}}else j=function(){m(U,0)};function Y(F){R=F,b||(b=!0,j())}function H(F,X){v=m(function(){F(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,Y(T))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(F){switch(d){case 1:case 2:case 3:var X=3;break;default:X=d}var J=d;d=X;try{return F()}finally{d=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,X){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var J=d;d=F;try{return X()}finally{d=J}},t.unstable_scheduleCallback=function(F,X,J){var ne=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ne+J:ne):J=ne,F){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=J+ae,F={id:f++,callback:X,priorityLevel:F,startTime:J,expirationTime:ae,sortIndex:-1},J>ne?(F.sortIndex=J,e(c,F),n(l)===null&&F===n(c)&&(E?(u(v),v=-1):E=!0,H(S,J-ne))):(F.sortIndex=ae,e(l,F),_||p||(_=!0,Y(T))),F},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(F){var X=d;return function(){var J=d;d=X;try{return F.apply(this,arguments)}finally{d=J}}}})(i0);n0.exports=i0;var Cv=n0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pv=Be,An=Cv;function re(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r0=new Set,ba={};function Vr(t,e){Cs(t,e),Cs(t+"Capture",e)}function Cs(t,e){for(ba[t]=e,t=0;t<e.length;t++)r0.add(e[t])}var Ci=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vu=Object.prototype.hasOwnProperty,Nv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ih={},Dh={};function Lv(t){return vu.call(Dh,t)?!0:vu.call(Ih,t)?!1:Nv.test(t)?Dh[t]=!0:(Ih[t]=!0,!1)}function Iv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Dv(t,e,n,i){if(e===null||typeof e>"u"||Iv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function cn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new cn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new cn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new cn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new cn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new cn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new cn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new cn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new cn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new cn(t,5,!1,t.toLowerCase(),null,!1,!1)});var lf=/[\-:]([a-z])/g;function cf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(lf,cf);qt[e]=new cn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(lf,cf);qt[e]=new cn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(lf,cf);qt[e]=new cn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new cn(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new cn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new cn(t,1,!1,t.toLowerCase(),null,!0,!0)});function uf(t,e,n,i){var r=qt.hasOwnProperty(e)?qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Dv(e,n,r,i)&&(n=null),i||r===null?Lv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ui=Pv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,no=Symbol.for("react.element"),os=Symbol.for("react.portal"),ls=Symbol.for("react.fragment"),df=Symbol.for("react.strict_mode"),_u=Symbol.for("react.profiler"),s0=Symbol.for("react.provider"),a0=Symbol.for("react.context"),ff=Symbol.for("react.forward_ref"),yu=Symbol.for("react.suspense"),Su=Symbol.for("react.suspense_list"),hf=Symbol.for("react.memo"),Yi=Symbol.for("react.lazy"),o0=Symbol.for("react.offscreen"),Uh=Symbol.iterator;function Xs(t){return t===null||typeof t!="object"?null:(t=Uh&&t[Uh]||t["@@iterator"],typeof t=="function"?t:null)}var Mt=Object.assign,fc;function oa(t){if(fc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);fc=e&&e[1]||""}return`
`+fc+t}var hc=!1;function pc(t,e){if(!t||hc)return"";hc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{hc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?oa(t):""}function Uv(t){switch(t.tag){case 5:return oa(t.type);case 16:return oa("Lazy");case 13:return oa("Suspense");case 19:return oa("SuspenseList");case 0:case 2:case 15:return t=pc(t.type,!1),t;case 11:return t=pc(t.type.render,!1),t;case 1:return t=pc(t.type,!0),t;default:return""}}function Mu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ls:return"Fragment";case os:return"Portal";case _u:return"Profiler";case df:return"StrictMode";case yu:return"Suspense";case Su:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case a0:return(t.displayName||"Context")+".Consumer";case s0:return(t._context.displayName||"Context")+".Provider";case ff:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case hf:return e=t.displayName||null,e!==null?e:Mu(t.type)||"Memo";case Yi:e=t._payload,t=t._init;try{return Mu(t(e))}catch{}}return null}function Fv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mu(e);case 8:return e===df?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ur(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function l0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function kv(t){var e=l0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function io(t){t._valueTracker||(t._valueTracker=kv(t))}function c0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=l0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ol(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Eu(t,e){var n=e.checked;return Mt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Fh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=ur(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function u0(t,e){e=e.checked,e!=null&&uf(t,"checked",e,!1)}function wu(t,e){u0(t,e);var n=ur(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?bu(t,e.type,n):e.hasOwnProperty("defaultValue")&&bu(t,e.type,ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function kh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function bu(t,e,n){(e!=="number"||ol(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var la=Array.isArray;function _s(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+ur(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Tu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return Mt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Oh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(re(92));if(la(n)){if(1<n.length)throw Error(re(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:ur(n)}}function d0(t,e){var n=ur(e.value),i=ur(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Bh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function f0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Au(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?f0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ro,h0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ro=ro||document.createElement("div"),ro.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ro.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ta(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ma={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ov=["Webkit","ms","Moz","O"];Object.keys(ma).forEach(function(t){Ov.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ma[e]=ma[t]})});function p0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ma.hasOwnProperty(t)&&ma[t]?(""+e).trim():e+"px"}function m0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=p0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Bv=Mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ru(t,e){if(e){if(Bv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function Cu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pu=null;function pf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Nu=null,ys=null,Ss=null;function zh(t){if(t=qa(t)){if(typeof Nu!="function")throw Error(re(280));var e=t.stateNode;e&&(e=Xl(e),Nu(t.stateNode,t.type,e))}}function g0(t){ys?Ss?Ss.push(t):Ss=[t]:ys=t}function x0(){if(ys){var t=ys,e=Ss;if(Ss=ys=null,zh(t),e)for(t=0;t<e.length;t++)zh(e[t])}}function v0(t,e){return t(e)}function _0(){}var mc=!1;function y0(t,e,n){if(mc)return t(e,n);mc=!0;try{return v0(t,e,n)}finally{mc=!1,(ys!==null||Ss!==null)&&(_0(),x0())}}function Aa(t,e){var n=t.stateNode;if(n===null)return null;var i=Xl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(re(231,e,typeof n));return n}var Lu=!1;if(Ci)try{var Ys={};Object.defineProperty(Ys,"passive",{get:function(){Lu=!0}}),window.addEventListener("test",Ys,Ys),window.removeEventListener("test",Ys,Ys)}catch{Lu=!1}function zv(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var ga=!1,ll=null,cl=!1,Iu=null,Vv={onError:function(t){ga=!0,ll=t}};function Hv(t,e,n,i,r,s,a,o,l){ga=!1,ll=null,zv.apply(Vv,arguments)}function Gv(t,e,n,i,r,s,a,o,l){if(Hv.apply(this,arguments),ga){if(ga){var c=ll;ga=!1,ll=null}else throw Error(re(198));cl||(cl=!0,Iu=c)}}function Hr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function S0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Vh(t){if(Hr(t)!==t)throw Error(re(188))}function Wv(t){var e=t.alternate;if(!e){if(e=Hr(t),e===null)throw Error(re(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Vh(r),t;if(s===i)return Vh(r),e;s=s.sibling}throw Error(re(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(re(189))}}if(n.alternate!==i)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?t:e}function M0(t){return t=Wv(t),t!==null?E0(t):null}function E0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=E0(t);if(e!==null)return e;t=t.sibling}return null}var w0=An.unstable_scheduleCallback,Hh=An.unstable_cancelCallback,jv=An.unstable_shouldYield,Xv=An.unstable_requestPaint,Ct=An.unstable_now,Yv=An.unstable_getCurrentPriorityLevel,mf=An.unstable_ImmediatePriority,b0=An.unstable_UserBlockingPriority,ul=An.unstable_NormalPriority,qv=An.unstable_LowPriority,T0=An.unstable_IdlePriority,Hl=null,ci=null;function $v(t){if(ci&&typeof ci.onCommitFiberRoot=="function")try{ci.onCommitFiberRoot(Hl,t,void 0,(t.current.flags&128)===128)}catch{}}var qn=Math.clz32?Math.clz32:Jv,Kv=Math.log,Zv=Math.LN2;function Jv(t){return t>>>=0,t===0?32:31-(Kv(t)/Zv|0)|0}var so=64,ao=4194304;function ca(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function dl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=ca(o):(s&=a,s!==0&&(i=ca(s)))}else a=n&~r,a!==0?i=ca(a):s!==0&&(i=ca(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-qn(e),r=1<<n,i|=t[n],e&=~r;return i}function Qv(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function e_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-qn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=Qv(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Du(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function A0(){var t=so;return so<<=1,!(so&4194240)&&(so=64),t}function gc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Xa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-qn(e),t[e]=n}function t_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-qn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function gf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-qn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var st=0;function R0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var C0,xf,P0,N0,L0,Uu=!1,oo=[],nr=null,ir=null,rr=null,Ra=new Map,Ca=new Map,$i=[],n_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Gh(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":Ra.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ca.delete(e.pointerId)}}function qs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=qa(e),e!==null&&xf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function i_(t,e,n,i,r){switch(e){case"focusin":return nr=qs(nr,t,e,n,i,r),!0;case"dragenter":return ir=qs(ir,t,e,n,i,r),!0;case"mouseover":return rr=qs(rr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ra.set(s,qs(Ra.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ca.set(s,qs(Ca.get(s)||null,t,e,n,i,r)),!0}return!1}function I0(t){var e=Ar(t.target);if(e!==null){var n=Hr(e);if(n!==null){if(e=n.tag,e===13){if(e=S0(n),e!==null){t.blockedOn=e,L0(t.priority,function(){P0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function jo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Fu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Pu=i,n.target.dispatchEvent(i),Pu=null}else return e=qa(n),e!==null&&xf(e),t.blockedOn=n,!1;e.shift()}return!0}function Wh(t,e,n){jo(t)&&n.delete(e)}function r_(){Uu=!1,nr!==null&&jo(nr)&&(nr=null),ir!==null&&jo(ir)&&(ir=null),rr!==null&&jo(rr)&&(rr=null),Ra.forEach(Wh),Ca.forEach(Wh)}function $s(t,e){t.blockedOn===e&&(t.blockedOn=null,Uu||(Uu=!0,An.unstable_scheduleCallback(An.unstable_NormalPriority,r_)))}function Pa(t){function e(r){return $s(r,t)}if(0<oo.length){$s(oo[0],t);for(var n=1;n<oo.length;n++){var i=oo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(nr!==null&&$s(nr,t),ir!==null&&$s(ir,t),rr!==null&&$s(rr,t),Ra.forEach(e),Ca.forEach(e),n=0;n<$i.length;n++)i=$i[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<$i.length&&(n=$i[0],n.blockedOn===null);)I0(n),n.blockedOn===null&&$i.shift()}var Ms=Ui.ReactCurrentBatchConfig,fl=!0;function s_(t,e,n,i){var r=st,s=Ms.transition;Ms.transition=null;try{st=1,vf(t,e,n,i)}finally{st=r,Ms.transition=s}}function a_(t,e,n,i){var r=st,s=Ms.transition;Ms.transition=null;try{st=4,vf(t,e,n,i)}finally{st=r,Ms.transition=s}}function vf(t,e,n,i){if(fl){var r=Fu(t,e,n,i);if(r===null)Tc(t,e,i,hl,n),Gh(t,i);else if(i_(r,t,e,n,i))i.stopPropagation();else if(Gh(t,i),e&4&&-1<n_.indexOf(t)){for(;r!==null;){var s=qa(r);if(s!==null&&C0(s),s=Fu(t,e,n,i),s===null&&Tc(t,e,i,hl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Tc(t,e,i,null,n)}}var hl=null;function Fu(t,e,n,i){if(hl=null,t=pf(i),t=Ar(t),t!==null)if(e=Hr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=S0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return hl=t,null}function D0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Yv()){case mf:return 1;case b0:return 4;case ul:case qv:return 16;case T0:return 536870912;default:return 16}default:return 16}}var Ji=null,_f=null,Xo=null;function U0(){if(Xo)return Xo;var t,e=_f,n=e.length,i,r="value"in Ji?Ji.value:Ji.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Xo=r.slice(t,1<i?1-i:void 0)}function Yo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function lo(){return!0}function jh(){return!1}function Cn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?lo:jh,this.isPropagationStopped=jh,this}return Mt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=lo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=lo)},persist:function(){},isPersistent:lo}),e}var Vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yf=Cn(Vs),Ya=Mt({},Vs,{view:0,detail:0}),o_=Cn(Ya),xc,vc,Ks,Gl=Mt({},Ya,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ks&&(Ks&&t.type==="mousemove"?(xc=t.screenX-Ks.screenX,vc=t.screenY-Ks.screenY):vc=xc=0,Ks=t),xc)},movementY:function(t){return"movementY"in t?t.movementY:vc}}),Xh=Cn(Gl),l_=Mt({},Gl,{dataTransfer:0}),c_=Cn(l_),u_=Mt({},Ya,{relatedTarget:0}),_c=Cn(u_),d_=Mt({},Vs,{animationName:0,elapsedTime:0,pseudoElement:0}),f_=Cn(d_),h_=Mt({},Vs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),p_=Cn(h_),m_=Mt({},Vs,{data:0}),Yh=Cn(m_),g_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},x_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},v_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function __(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=v_[t])?!!e[t]:!1}function Sf(){return __}var y_=Mt({},Ya,{key:function(t){if(t.key){var e=g_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Yo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?x_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sf,charCode:function(t){return t.type==="keypress"?Yo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Yo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),S_=Cn(y_),M_=Mt({},Gl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qh=Cn(M_),E_=Mt({},Ya,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sf}),w_=Cn(E_),b_=Mt({},Vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),T_=Cn(b_),A_=Mt({},Gl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),R_=Cn(A_),C_=[9,13,27,32],Mf=Ci&&"CompositionEvent"in window,xa=null;Ci&&"documentMode"in document&&(xa=document.documentMode);var P_=Ci&&"TextEvent"in window&&!xa,F0=Ci&&(!Mf||xa&&8<xa&&11>=xa),$h=" ",Kh=!1;function k0(t,e){switch(t){case"keyup":return C_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function O0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var cs=!1;function N_(t,e){switch(t){case"compositionend":return O0(e);case"keypress":return e.which!==32?null:(Kh=!0,$h);case"textInput":return t=e.data,t===$h&&Kh?null:t;default:return null}}function L_(t,e){if(cs)return t==="compositionend"||!Mf&&k0(t,e)?(t=U0(),Xo=_f=Ji=null,cs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return F0&&e.locale!=="ko"?null:e.data;default:return null}}var I_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!I_[t.type]:e==="textarea"}function B0(t,e,n,i){g0(i),e=pl(e,"onChange"),0<e.length&&(n=new yf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var va=null,Na=null;function D_(t){K0(t,0)}function Wl(t){var e=fs(t);if(c0(e))return t}function U_(t,e){if(t==="change")return e}var z0=!1;if(Ci){var yc;if(Ci){var Sc="oninput"in document;if(!Sc){var Jh=document.createElement("div");Jh.setAttribute("oninput","return;"),Sc=typeof Jh.oninput=="function"}yc=Sc}else yc=!1;z0=yc&&(!document.documentMode||9<document.documentMode)}function Qh(){va&&(va.detachEvent("onpropertychange",V0),Na=va=null)}function V0(t){if(t.propertyName==="value"&&Wl(Na)){var e=[];B0(e,Na,t,pf(t)),y0(D_,e)}}function F_(t,e,n){t==="focusin"?(Qh(),va=e,Na=n,va.attachEvent("onpropertychange",V0)):t==="focusout"&&Qh()}function k_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Wl(Na)}function O_(t,e){if(t==="click")return Wl(e)}function B_(t,e){if(t==="input"||t==="change")return Wl(e)}function z_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Zn=typeof Object.is=="function"?Object.is:z_;function La(t,e){if(Zn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!vu.call(e,r)||!Zn(t[r],e[r]))return!1}return!0}function ep(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function tp(t,e){var n=ep(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ep(n)}}function H0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?H0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function G0(){for(var t=window,e=ol();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ol(t.document)}return e}function Ef(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function V_(t){var e=G0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&H0(n.ownerDocument.documentElement,n)){if(i!==null&&Ef(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=tp(n,s);var a=tp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var H_=Ci&&"documentMode"in document&&11>=document.documentMode,us=null,ku=null,_a=null,Ou=!1;function np(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ou||us==null||us!==ol(i)||(i=us,"selectionStart"in i&&Ef(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),_a&&La(_a,i)||(_a=i,i=pl(ku,"onSelect"),0<i.length&&(e=new yf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=us)))}function co(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ds={animationend:co("Animation","AnimationEnd"),animationiteration:co("Animation","AnimationIteration"),animationstart:co("Animation","AnimationStart"),transitionend:co("Transition","TransitionEnd")},Mc={},W0={};Ci&&(W0=document.createElement("div").style,"AnimationEvent"in window||(delete ds.animationend.animation,delete ds.animationiteration.animation,delete ds.animationstart.animation),"TransitionEvent"in window||delete ds.transitionend.transition);function jl(t){if(Mc[t])return Mc[t];if(!ds[t])return t;var e=ds[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in W0)return Mc[t]=e[n];return t}var j0=jl("animationend"),X0=jl("animationiteration"),Y0=jl("animationstart"),q0=jl("transitionend"),$0=new Map,ip="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){$0.set(t,e),Vr(e,[t])}for(var Ec=0;Ec<ip.length;Ec++){var wc=ip[Ec],G_=wc.toLowerCase(),W_=wc[0].toUpperCase()+wc.slice(1);pr(G_,"on"+W_)}pr(j0,"onAnimationEnd");pr(X0,"onAnimationIteration");pr(Y0,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(q0,"onTransitionEnd");Cs("onMouseEnter",["mouseout","mouseover"]);Cs("onMouseLeave",["mouseout","mouseover"]);Cs("onPointerEnter",["pointerout","pointerover"]);Cs("onPointerLeave",["pointerout","pointerover"]);Vr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Vr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Vr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Vr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Vr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Vr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ua="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),j_=new Set("cancel close invalid load scroll toggle".split(" ").concat(ua));function rp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Gv(i,e,void 0,t),t.currentTarget=null}function K0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;rp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;rp(r,o,c),s=l}}}if(cl)throw t=Iu,cl=!1,Iu=null,t}function ht(t,e){var n=e[Gu];n===void 0&&(n=e[Gu]=new Set);var i=t+"__bubble";n.has(i)||(Z0(e,t,2,!1),n.add(i))}function bc(t,e,n){var i=0;e&&(i|=4),Z0(n,t,i,e)}var uo="_reactListening"+Math.random().toString(36).slice(2);function Ia(t){if(!t[uo]){t[uo]=!0,r0.forEach(function(n){n!=="selectionchange"&&(j_.has(n)||bc(n,!1,t),bc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[uo]||(e[uo]=!0,bc("selectionchange",!1,e))}}function Z0(t,e,n,i){switch(D0(e)){case 1:var r=s_;break;case 4:r=a_;break;default:r=vf}n=r.bind(null,e,n,t),r=void 0,!Lu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Tc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Ar(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}y0(function(){var c=s,f=pf(n),h=[];e:{var d=$0.get(t);if(d!==void 0){var p=yf,_=t;switch(t){case"keypress":if(Yo(n)===0)break e;case"keydown":case"keyup":p=S_;break;case"focusin":_="focus",p=_c;break;case"focusout":_="blur",p=_c;break;case"beforeblur":case"afterblur":p=_c;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Xh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=c_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=w_;break;case j0:case X0:case Y0:p=f_;break;case q0:p=T_;break;case"scroll":p=o_;break;case"wheel":p=R_;break;case"copy":case"cut":case"paste":p=p_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=qh}var E=(e&4)!==0,m=!E&&t==="scroll",u=E?d!==null?d+"Capture":null:d;E=[];for(var x=c,M;x!==null;){M=x;var S=M.stateNode;if(M.tag===5&&S!==null&&(M=S,u!==null&&(S=Aa(x,u),S!=null&&E.push(Da(x,S,M)))),m)break;x=x.return}0<E.length&&(d=new p(d,_,null,n,f),h.push({event:d,listeners:E}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==Pu&&(_=n.relatedTarget||n.fromElement)&&(Ar(_)||_[Pi]))break e;if((p||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Ar(_):null,_!==null&&(m=Hr(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(E=Xh,S="onMouseLeave",u="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(E=qh,S="onPointerLeave",u="onPointerEnter",x="pointer"),m=p==null?d:fs(p),M=_==null?d:fs(_),d=new E(S,x+"leave",p,n,f),d.target=m,d.relatedTarget=M,S=null,Ar(f)===c&&(E=new E(u,x+"enter",_,n,f),E.target=M,E.relatedTarget=m,S=E),m=S,p&&_)t:{for(E=p,u=_,x=0,M=E;M;M=Xr(M))x++;for(M=0,S=u;S;S=Xr(S))M++;for(;0<x-M;)E=Xr(E),x--;for(;0<M-x;)u=Xr(u),M--;for(;x--;){if(E===u||u!==null&&E===u.alternate)break t;E=Xr(E),u=Xr(u)}E=null}else E=null;p!==null&&sp(h,d,p,E,!1),_!==null&&m!==null&&sp(h,m,_,E,!0)}}e:{if(d=c?fs(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var T=U_;else if(Zh(d))if(z0)T=B_;else{T=k_;var b=F_}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(T=O_);if(T&&(T=T(t,c))){B0(h,T,n,f);break e}b&&b(t,d,c),t==="focusout"&&(b=d._wrapperState)&&b.controlled&&d.type==="number"&&bu(d,"number",d.value)}switch(b=c?fs(c):window,t){case"focusin":(Zh(b)||b.contentEditable==="true")&&(us=b,ku=c,_a=null);break;case"focusout":_a=ku=us=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,np(h,n,f);break;case"selectionchange":if(H_)break;case"keydown":case"keyup":np(h,n,f)}var R;if(Mf)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else cs?k0(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(F0&&n.locale!=="ko"&&(cs||v!=="onCompositionStart"?v==="onCompositionEnd"&&cs&&(R=U0()):(Ji=f,_f="value"in Ji?Ji.value:Ji.textContent,cs=!0)),b=pl(c,v),0<b.length&&(v=new Yh(v,t,null,n,f),h.push({event:v,listeners:b}),R?v.data=R:(R=O0(n),R!==null&&(v.data=R)))),(R=P_?N_(t,n):L_(t,n))&&(c=pl(c,"onBeforeInput"),0<c.length&&(f=new Yh("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:c}),f.data=R))}K0(h,e)})}function Da(t,e,n){return{instance:t,listener:e,currentTarget:n}}function pl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Aa(t,n),s!=null&&i.unshift(Da(t,s,r)),s=Aa(t,e),s!=null&&i.push(Da(t,s,r))),t=t.return}return i}function Xr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function sp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Aa(n,s),l!=null&&a.unshift(Da(n,l,o))):r||(l=Aa(n,s),l!=null&&a.push(Da(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var X_=/\r\n?/g,Y_=/\u0000|\uFFFD/g;function ap(t){return(typeof t=="string"?t:""+t).replace(X_,`
`).replace(Y_,"")}function fo(t,e,n){if(e=ap(e),ap(t)!==e&&n)throw Error(re(425))}function ml(){}var Bu=null,zu=null;function Vu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Hu=typeof setTimeout=="function"?setTimeout:void 0,q_=typeof clearTimeout=="function"?clearTimeout:void 0,op=typeof Promise=="function"?Promise:void 0,$_=typeof queueMicrotask=="function"?queueMicrotask:typeof op<"u"?function(t){return op.resolve(null).then(t).catch(K_)}:Hu;function K_(t){setTimeout(function(){throw t})}function Ac(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Pa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Pa(e)}function sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function lp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Hs=Math.random().toString(36).slice(2),ai="__reactFiber$"+Hs,Ua="__reactProps$"+Hs,Pi="__reactContainer$"+Hs,Gu="__reactEvents$"+Hs,Z_="__reactListeners$"+Hs,J_="__reactHandles$"+Hs;function Ar(t){var e=t[ai];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pi]||n[ai]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=lp(t);t!==null;){if(n=t[ai])return n;t=lp(t)}return e}t=n,n=t.parentNode}return null}function qa(t){return t=t[ai]||t[Pi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function fs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(re(33))}function Xl(t){return t[Ua]||null}var Wu=[],hs=-1;function mr(t){return{current:t}}function mt(t){0>hs||(t.current=Wu[hs],Wu[hs]=null,hs--)}function ft(t,e){hs++,Wu[hs]=t.current,t.current=e}var dr={},nn=mr(dr),mn=mr(!1),Dr=dr;function Ps(t,e){var n=t.type.contextTypes;if(!n)return dr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function gn(t){return t=t.childContextTypes,t!=null}function gl(){mt(mn),mt(nn)}function cp(t,e,n){if(nn.current!==dr)throw Error(re(168));ft(nn,e),ft(mn,n)}function J0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,Fv(t)||"Unknown",r));return Mt({},n,i)}function xl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||dr,Dr=nn.current,ft(nn,t),ft(mn,mn.current),!0}function up(t,e,n){var i=t.stateNode;if(!i)throw Error(re(169));n?(t=J0(t,e,Dr),i.__reactInternalMemoizedMergedChildContext=t,mt(mn),mt(nn),ft(nn,t)):mt(mn),ft(mn,n)}var Si=null,Yl=!1,Rc=!1;function Q0(t){Si===null?Si=[t]:Si.push(t)}function Q_(t){Yl=!0,Q0(t)}function gr(){if(!Rc&&Si!==null){Rc=!0;var t=0,e=st;try{var n=Si;for(st=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Si=null,Yl=!1}catch(r){throw Si!==null&&(Si=Si.slice(t+1)),w0(mf,gr),r}finally{st=e,Rc=!1}}return null}var ps=[],ms=0,vl=null,_l=0,In=[],Dn=0,Ur=null,Ei=1,wi="";function Mr(t,e){ps[ms++]=_l,ps[ms++]=vl,vl=t,_l=e}function eg(t,e,n){In[Dn++]=Ei,In[Dn++]=wi,In[Dn++]=Ur,Ur=t;var i=Ei;t=wi;var r=32-qn(i)-1;i&=~(1<<r),n+=1;var s=32-qn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Ei=1<<32-qn(e)+r|n<<r|i,wi=s+t}else Ei=1<<s|n<<r|i,wi=t}function wf(t){t.return!==null&&(Mr(t,1),eg(t,1,0))}function bf(t){for(;t===vl;)vl=ps[--ms],ps[ms]=null,_l=ps[--ms],ps[ms]=null;for(;t===Ur;)Ur=In[--Dn],In[Dn]=null,wi=In[--Dn],In[Dn]=null,Ei=In[--Dn],In[Dn]=null}var Tn=null,bn=null,xt=!1,jn=null;function tg(t,e){var n=Un(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function dp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Tn=t,bn=sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Tn=t,bn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ur!==null?{id:Ei,overflow:wi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Un(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Tn=t,bn=null,!0):!1;default:return!1}}function ju(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Xu(t){if(xt){var e=bn;if(e){var n=e;if(!dp(t,e)){if(ju(t))throw Error(re(418));e=sr(n.nextSibling);var i=Tn;e&&dp(t,e)?tg(i,n):(t.flags=t.flags&-4097|2,xt=!1,Tn=t)}}else{if(ju(t))throw Error(re(418));t.flags=t.flags&-4097|2,xt=!1,Tn=t}}}function fp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Tn=t}function ho(t){if(t!==Tn)return!1;if(!xt)return fp(t),xt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Vu(t.type,t.memoizedProps)),e&&(e=bn)){if(ju(t))throw ng(),Error(re(418));for(;e;)tg(t,e),e=sr(e.nextSibling)}if(fp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(re(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){bn=sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}bn=null}}else bn=Tn?sr(t.stateNode.nextSibling):null;return!0}function ng(){for(var t=bn;t;)t=sr(t.nextSibling)}function Ns(){bn=Tn=null,xt=!1}function Tf(t){jn===null?jn=[t]:jn.push(t)}var ey=Ui.ReactCurrentBatchConfig;function Zs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var i=n.stateNode}if(!i)throw Error(re(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,t))}return t}function po(t,e){throw t=Object.prototype.toString.call(e),Error(re(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function hp(t){var e=t._init;return e(t._payload)}function ig(t){function e(u,x){if(t){var M=u.deletions;M===null?(u.deletions=[x],u.flags|=16):M.push(x)}}function n(u,x){if(!t)return null;for(;x!==null;)e(u,x),x=x.sibling;return null}function i(u,x){for(u=new Map;x!==null;)x.key!==null?u.set(x.key,x):u.set(x.index,x),x=x.sibling;return u}function r(u,x){return u=cr(u,x),u.index=0,u.sibling=null,u}function s(u,x,M){return u.index=M,t?(M=u.alternate,M!==null?(M=M.index,M<x?(u.flags|=2,x):M):(u.flags|=2,x)):(u.flags|=1048576,x)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,x,M,S){return x===null||x.tag!==6?(x=Uc(M,u.mode,S),x.return=u,x):(x=r(x,M),x.return=u,x)}function l(u,x,M,S){var T=M.type;return T===ls?f(u,x,M.props.children,S,M.key):x!==null&&(x.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Yi&&hp(T)===x.type)?(S=r(x,M.props),S.ref=Zs(u,x,M),S.return=u,S):(S=el(M.type,M.key,M.props,null,u.mode,S),S.ref=Zs(u,x,M),S.return=u,S)}function c(u,x,M,S){return x===null||x.tag!==4||x.stateNode.containerInfo!==M.containerInfo||x.stateNode.implementation!==M.implementation?(x=Fc(M,u.mode,S),x.return=u,x):(x=r(x,M.children||[]),x.return=u,x)}function f(u,x,M,S,T){return x===null||x.tag!==7?(x=Ir(M,u.mode,S,T),x.return=u,x):(x=r(x,M),x.return=u,x)}function h(u,x,M){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Uc(""+x,u.mode,M),x.return=u,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case no:return M=el(x.type,x.key,x.props,null,u.mode,M),M.ref=Zs(u,null,x),M.return=u,M;case os:return x=Fc(x,u.mode,M),x.return=u,x;case Yi:var S=x._init;return h(u,S(x._payload),M)}if(la(x)||Xs(x))return x=Ir(x,u.mode,M,null),x.return=u,x;po(u,x)}return null}function d(u,x,M,S){var T=x!==null?x.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return T!==null?null:o(u,x,""+M,S);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case no:return M.key===T?l(u,x,M,S):null;case os:return M.key===T?c(u,x,M,S):null;case Yi:return T=M._init,d(u,x,T(M._payload),S)}if(la(M)||Xs(M))return T!==null?null:f(u,x,M,S,null);po(u,M)}return null}function p(u,x,M,S,T){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(M)||null,o(x,u,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case no:return u=u.get(S.key===null?M:S.key)||null,l(x,u,S,T);case os:return u=u.get(S.key===null?M:S.key)||null,c(x,u,S,T);case Yi:var b=S._init;return p(u,x,M,b(S._payload),T)}if(la(S)||Xs(S))return u=u.get(M)||null,f(x,u,S,T,null);po(x,S)}return null}function _(u,x,M,S){for(var T=null,b=null,R=x,v=x=0,A=null;R!==null&&v<M.length;v++){R.index>v?(A=R,R=null):A=R.sibling;var P=d(u,R,M[v],S);if(P===null){R===null&&(R=A);break}t&&R&&P.alternate===null&&e(u,R),x=s(P,x,v),b===null?T=P:b.sibling=P,b=P,R=A}if(v===M.length)return n(u,R),xt&&Mr(u,v),T;if(R===null){for(;v<M.length;v++)R=h(u,M[v],S),R!==null&&(x=s(R,x,v),b===null?T=R:b.sibling=R,b=R);return xt&&Mr(u,v),T}for(R=i(u,R);v<M.length;v++)A=p(R,u,v,M[v],S),A!==null&&(t&&A.alternate!==null&&R.delete(A.key===null?v:A.key),x=s(A,x,v),b===null?T=A:b.sibling=A,b=A);return t&&R.forEach(function(N){return e(u,N)}),xt&&Mr(u,v),T}function E(u,x,M,S){var T=Xs(M);if(typeof T!="function")throw Error(re(150));if(M=T.call(M),M==null)throw Error(re(151));for(var b=T=null,R=x,v=x=0,A=null,P=M.next();R!==null&&!P.done;v++,P=M.next()){R.index>v?(A=R,R=null):A=R.sibling;var N=d(u,R,P.value,S);if(N===null){R===null&&(R=A);break}t&&R&&N.alternate===null&&e(u,R),x=s(N,x,v),b===null?T=N:b.sibling=N,b=N,R=A}if(P.done)return n(u,R),xt&&Mr(u,v),T;if(R===null){for(;!P.done;v++,P=M.next())P=h(u,P.value,S),P!==null&&(x=s(P,x,v),b===null?T=P:b.sibling=P,b=P);return xt&&Mr(u,v),T}for(R=i(u,R);!P.done;v++,P=M.next())P=p(R,u,v,P.value,S),P!==null&&(t&&P.alternate!==null&&R.delete(P.key===null?v:P.key),x=s(P,x,v),b===null?T=P:b.sibling=P,b=P);return t&&R.forEach(function(U){return e(u,U)}),xt&&Mr(u,v),T}function m(u,x,M,S){if(typeof M=="object"&&M!==null&&M.type===ls&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case no:e:{for(var T=M.key,b=x;b!==null;){if(b.key===T){if(T=M.type,T===ls){if(b.tag===7){n(u,b.sibling),x=r(b,M.props.children),x.return=u,u=x;break e}}else if(b.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Yi&&hp(T)===b.type){n(u,b.sibling),x=r(b,M.props),x.ref=Zs(u,b,M),x.return=u,u=x;break e}n(u,b);break}else e(u,b);b=b.sibling}M.type===ls?(x=Ir(M.props.children,u.mode,S,M.key),x.return=u,u=x):(S=el(M.type,M.key,M.props,null,u.mode,S),S.ref=Zs(u,x,M),S.return=u,u=S)}return a(u);case os:e:{for(b=M.key;x!==null;){if(x.key===b)if(x.tag===4&&x.stateNode.containerInfo===M.containerInfo&&x.stateNode.implementation===M.implementation){n(u,x.sibling),x=r(x,M.children||[]),x.return=u,u=x;break e}else{n(u,x);break}else e(u,x);x=x.sibling}x=Fc(M,u.mode,S),x.return=u,u=x}return a(u);case Yi:return b=M._init,m(u,x,b(M._payload),S)}if(la(M))return _(u,x,M,S);if(Xs(M))return E(u,x,M,S);po(u,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,x!==null&&x.tag===6?(n(u,x.sibling),x=r(x,M),x.return=u,u=x):(n(u,x),x=Uc(M,u.mode,S),x.return=u,u=x),a(u)):n(u,x)}return m}var Ls=ig(!0),rg=ig(!1),yl=mr(null),Sl=null,gs=null,Af=null;function Rf(){Af=gs=Sl=null}function Cf(t){var e=yl.current;mt(yl),t._currentValue=e}function Yu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Es(t,e){Sl=t,Af=gs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(pn=!0),t.firstContext=null)}function kn(t){var e=t._currentValue;if(Af!==t)if(t={context:t,memoizedValue:e,next:null},gs===null){if(Sl===null)throw Error(re(308));gs=t,Sl.dependencies={lanes:0,firstContext:t}}else gs=gs.next=t;return e}var Rr=null;function Pf(t){Rr===null?Rr=[t]:Rr.push(t)}function sg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Pf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ni(t,i)}function Ni(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var qi=!1;function Nf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ag(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ti(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ar(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ni(t,n)}return r=i.interleaved,r===null?(e.next=e,Pf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ni(t,n)}function qo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gf(t,n)}}function pp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Ml(t,e,n,i){var r=t.updateQueue;qi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,f=c=l=null,o=s;do{var d=o.lane,p=o.eventTime;if((i&d)===d){f!==null&&(f=f.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,E=o;switch(d=e,p=n,E.tag){case 1:if(_=E.payload,typeof _=="function"){h=_.call(p,h,d);break e}h=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=E.payload,d=typeof _=="function"?_.call(p,h,d):_,d==null)break e;h=Mt({},h,d);break e;case 2:qi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[o]:d.push(o))}else p={eventTime:p,lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,a|=d;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;d=o,o=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(f===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);kr|=a,t.lanes=a,t.memoizedState=h}}function mp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var $a={},ui=mr($a),Fa=mr($a),ka=mr($a);function Cr(t){if(t===$a)throw Error(re(174));return t}function Lf(t,e){switch(ft(ka,e),ft(Fa,t),ft(ui,$a),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Au(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Au(e,t)}mt(ui),ft(ui,e)}function Is(){mt(ui),mt(Fa),mt(ka)}function og(t){Cr(ka.current);var e=Cr(ui.current),n=Au(e,t.type);e!==n&&(ft(Fa,t),ft(ui,n))}function If(t){Fa.current===t&&(mt(ui),mt(Fa))}var vt=mr(0);function El(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Cc=[];function Df(){for(var t=0;t<Cc.length;t++)Cc[t]._workInProgressVersionPrimary=null;Cc.length=0}var $o=Ui.ReactCurrentDispatcher,Pc=Ui.ReactCurrentBatchConfig,Fr=0,yt=null,kt=null,Ht=null,wl=!1,ya=!1,Oa=0,ty=0;function Kt(){throw Error(re(321))}function Uf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Zn(t[n],e[n]))return!1;return!0}function Ff(t,e,n,i,r,s){if(Fr=s,yt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,$o.current=t===null||t.memoizedState===null?sy:ay,t=n(i,r),ya){s=0;do{if(ya=!1,Oa=0,25<=s)throw Error(re(301));s+=1,Ht=kt=null,e.updateQueue=null,$o.current=oy,t=n(i,r)}while(ya)}if($o.current=bl,e=kt!==null&&kt.next!==null,Fr=0,Ht=kt=yt=null,wl=!1,e)throw Error(re(300));return t}function kf(){var t=Oa!==0;return Oa=0,t}function ri(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?yt.memoizedState=Ht=t:Ht=Ht.next=t,Ht}function On(){if(kt===null){var t=yt.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=Ht===null?yt.memoizedState:Ht.next;if(e!==null)Ht=e,kt=t;else{if(t===null)throw Error(re(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},Ht===null?yt.memoizedState=Ht=t:Ht=Ht.next=t}return Ht}function Ba(t,e){return typeof e=="function"?e(t):e}function Nc(t){var e=On(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=kt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var f=c.lane;if((Fr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,yt.lanes|=f,kr|=f}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,Zn(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,yt.lanes|=s,kr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Lc(t){var e=On(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Zn(s,e.memoizedState)||(pn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function lg(){}function cg(t,e){var n=yt,i=On(),r=e(),s=!Zn(i.memoizedState,r);if(s&&(i.memoizedState=r,pn=!0),i=i.queue,Of(fg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ht!==null&&Ht.memoizedState.tag&1){if(n.flags|=2048,za(9,dg.bind(null,n,i,r,e),void 0,null),Gt===null)throw Error(re(349));Fr&30||ug(n,e,r)}return r}function ug(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function dg(t,e,n,i){e.value=n,e.getSnapshot=i,hg(e)&&pg(t)}function fg(t,e,n){return n(function(){hg(e)&&pg(t)})}function hg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Zn(t,n)}catch{return!0}}function pg(t){var e=Ni(t,1);e!==null&&$n(e,t,1,-1)}function gp(t){var e=ri();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ba,lastRenderedState:t},e.queue=t,t=t.dispatch=ry.bind(null,yt,t),[e.memoizedState,t]}function za(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function mg(){return On().memoizedState}function Ko(t,e,n,i){var r=ri();yt.flags|=t,r.memoizedState=za(1|e,n,void 0,i===void 0?null:i)}function ql(t,e,n,i){var r=On();i=i===void 0?null:i;var s=void 0;if(kt!==null){var a=kt.memoizedState;if(s=a.destroy,i!==null&&Uf(i,a.deps)){r.memoizedState=za(e,n,s,i);return}}yt.flags|=t,r.memoizedState=za(1|e,n,s,i)}function xp(t,e){return Ko(8390656,8,t,e)}function Of(t,e){return ql(2048,8,t,e)}function gg(t,e){return ql(4,2,t,e)}function xg(t,e){return ql(4,4,t,e)}function vg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function _g(t,e,n){return n=n!=null?n.concat([t]):null,ql(4,4,vg.bind(null,e,t),n)}function Bf(){}function yg(t,e){var n=On();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Uf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Sg(t,e){var n=On();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Uf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Mg(t,e,n){return Fr&21?(Zn(n,e)||(n=A0(),yt.lanes|=n,kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,pn=!0),t.memoizedState=n)}function ny(t,e){var n=st;st=n!==0&&4>n?n:4,t(!0);var i=Pc.transition;Pc.transition={};try{t(!1),e()}finally{st=n,Pc.transition=i}}function Eg(){return On().memoizedState}function iy(t,e,n){var i=lr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},wg(t))bg(e,n);else if(n=sg(t,e,n,i),n!==null){var r=an();$n(n,t,i,r),Tg(n,e,i)}}function ry(t,e,n){var i=lr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(wg(t))bg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Zn(o,a)){var l=e.interleaved;l===null?(r.next=r,Pf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=sg(t,e,r,i),n!==null&&(r=an(),$n(n,t,i,r),Tg(n,e,i))}}function wg(t){var e=t.alternate;return t===yt||e!==null&&e===yt}function bg(t,e){ya=wl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Tg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gf(t,n)}}var bl={readContext:kn,useCallback:Kt,useContext:Kt,useEffect:Kt,useImperativeHandle:Kt,useInsertionEffect:Kt,useLayoutEffect:Kt,useMemo:Kt,useReducer:Kt,useRef:Kt,useState:Kt,useDebugValue:Kt,useDeferredValue:Kt,useTransition:Kt,useMutableSource:Kt,useSyncExternalStore:Kt,useId:Kt,unstable_isNewReconciler:!1},sy={readContext:kn,useCallback:function(t,e){return ri().memoizedState=[t,e===void 0?null:e],t},useContext:kn,useEffect:xp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ko(4194308,4,vg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ko(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ko(4,2,t,e)},useMemo:function(t,e){var n=ri();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ri();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=iy.bind(null,yt,t),[i.memoizedState,t]},useRef:function(t){var e=ri();return t={current:t},e.memoizedState=t},useState:gp,useDebugValue:Bf,useDeferredValue:function(t){return ri().memoizedState=t},useTransition:function(){var t=gp(!1),e=t[0];return t=ny.bind(null,t[1]),ri().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=yt,r=ri();if(xt){if(n===void 0)throw Error(re(407));n=n()}else{if(n=e(),Gt===null)throw Error(re(349));Fr&30||ug(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,xp(fg.bind(null,i,s,t),[t]),i.flags|=2048,za(9,dg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ri(),e=Gt.identifierPrefix;if(xt){var n=wi,i=Ei;n=(i&~(1<<32-qn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Oa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ty++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},ay={readContext:kn,useCallback:yg,useContext:kn,useEffect:Of,useImperativeHandle:_g,useInsertionEffect:gg,useLayoutEffect:xg,useMemo:Sg,useReducer:Nc,useRef:mg,useState:function(){return Nc(Ba)},useDebugValue:Bf,useDeferredValue:function(t){var e=On();return Mg(e,kt.memoizedState,t)},useTransition:function(){var t=Nc(Ba)[0],e=On().memoizedState;return[t,e]},useMutableSource:lg,useSyncExternalStore:cg,useId:Eg,unstable_isNewReconciler:!1},oy={readContext:kn,useCallback:yg,useContext:kn,useEffect:Of,useImperativeHandle:_g,useInsertionEffect:gg,useLayoutEffect:xg,useMemo:Sg,useReducer:Lc,useRef:mg,useState:function(){return Lc(Ba)},useDebugValue:Bf,useDeferredValue:function(t){var e=On();return kt===null?e.memoizedState=t:Mg(e,kt.memoizedState,t)},useTransition:function(){var t=Lc(Ba)[0],e=On().memoizedState;return[t,e]},useMutableSource:lg,useSyncExternalStore:cg,useId:Eg,unstable_isNewReconciler:!1};function Gn(t,e){if(t&&t.defaultProps){e=Mt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function qu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Mt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var $l={isMounted:function(t){return(t=t._reactInternals)?Hr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=an(),r=lr(t),s=Ti(i,r);s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&($n(e,t,r,i),qo(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=an(),r=lr(t),s=Ti(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&($n(e,t,r,i),qo(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=an(),i=lr(t),r=Ti(n,i);r.tag=2,e!=null&&(r.callback=e),e=ar(t,r,i),e!==null&&($n(e,t,i,n),qo(e,t,i))}};function vp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!La(n,i)||!La(r,s):!0}function Ag(t,e,n){var i=!1,r=dr,s=e.contextType;return typeof s=="object"&&s!==null?s=kn(s):(r=gn(e)?Dr:nn.current,i=e.contextTypes,s=(i=i!=null)?Ps(t,r):dr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=$l,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function _p(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&$l.enqueueReplaceState(e,e.state,null)}function $u(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Nf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=kn(s):(s=gn(e)?Dr:nn.current,r.context=Ps(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(qu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&$l.enqueueReplaceState(r,r.state,null),Ml(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ds(t,e){try{var n="",i=e;do n+=Uv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Ic(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Ku(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var ly=typeof WeakMap=="function"?WeakMap:Map;function Rg(t,e,n){n=Ti(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Al||(Al=!0,ad=i),Ku(t,e)},n}function Cg(t,e,n){n=Ti(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Ku(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Ku(t,e),typeof i!="function"&&(or===null?or=new Set([this]):or.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function yp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new ly;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=My.bind(null,t,e,n),e.then(t,t))}function Sp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Mp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ti(-1,1),e.tag=2,ar(n,e,1))),n.lanes|=1),t)}var cy=Ui.ReactCurrentOwner,pn=!1;function sn(t,e,n,i){e.child=t===null?rg(e,null,n,i):Ls(e,t.child,n,i)}function Ep(t,e,n,i,r){n=n.render;var s=e.ref;return Es(e,r),i=Ff(t,e,n,i,s,r),n=kf(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Li(t,e,r)):(xt&&n&&wf(e),e.flags|=1,sn(t,e,i,r),e.child)}function wp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Yf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Pg(t,e,s,i,r)):(t=el(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:La,n(a,i)&&t.ref===e.ref)return Li(t,e,r)}return e.flags|=1,t=cr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Pg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(La(s,i)&&t.ref===e.ref)if(pn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(pn=!0);else return e.lanes=t.lanes,Li(t,e,r)}return Zu(t,e,n,i,r)}function Ng(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(vs,Mn),Mn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ft(vs,Mn),Mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ft(vs,Mn),Mn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ft(vs,Mn),Mn|=i;return sn(t,e,r,n),e.child}function Lg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Zu(t,e,n,i,r){var s=gn(n)?Dr:nn.current;return s=Ps(e,s),Es(e,r),n=Ff(t,e,n,i,s,r),i=kf(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Li(t,e,r)):(xt&&i&&wf(e),e.flags|=1,sn(t,e,n,r),e.child)}function bp(t,e,n,i,r){if(gn(n)){var s=!0;xl(e)}else s=!1;if(Es(e,r),e.stateNode===null)Zo(t,e),Ag(e,n,i),$u(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=kn(c):(c=gn(n)?Dr:nn.current,c=Ps(e,c));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&_p(e,a,i,c),qi=!1;var d=e.memoizedState;a.state=d,Ml(e,i,a,r),l=e.memoizedState,o!==i||d!==l||mn.current||qi?(typeof f=="function"&&(qu(e,n,f,i),l=e.memoizedState),(o=qi||vp(e,n,o,i,d,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,ag(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Gn(e.type,o),a.props=c,h=e.pendingProps,d=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=kn(l):(l=gn(n)?Dr:nn.current,l=Ps(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||d!==l)&&_p(e,a,i,l),qi=!1,d=e.memoizedState,a.state=d,Ml(e,i,a,r);var _=e.memoizedState;o!==h||d!==_||mn.current||qi?(typeof p=="function"&&(qu(e,n,p,i),_=e.memoizedState),(c=qi||vp(e,n,c,i,d,_,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Ju(t,e,n,i,s,r)}function Ju(t,e,n,i,r,s){Lg(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&up(e,n,!1),Li(t,e,s);i=e.stateNode,cy.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ls(e,t.child,null,s),e.child=Ls(e,null,o,s)):sn(t,e,o,s),e.memoizedState=i.state,r&&up(e,n,!0),e.child}function Ig(t){var e=t.stateNode;e.pendingContext?cp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&cp(t,e.context,!1),Lf(t,e.containerInfo)}function Tp(t,e,n,i,r){return Ns(),Tf(r),e.flags|=256,sn(t,e,n,i),e.child}var Qu={dehydrated:null,treeContext:null,retryLane:0};function ed(t){return{baseLanes:t,cachePool:null,transitions:null}}function Dg(t,e,n){var i=e.pendingProps,r=vt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ft(vt,r&1),t===null)return Xu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Jl(a,i,0,null),t=Ir(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=ed(n),e.memoizedState=Qu,t):zf(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return uy(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=cr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=cr(o,s):(s=Ir(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?ed(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Qu,i}return s=t.child,t=s.sibling,i=cr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function zf(t,e){return e=Jl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function mo(t,e,n,i){return i!==null&&Tf(i),Ls(e,t.child,null,n),t=zf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function uy(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Ic(Error(re(422))),mo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Jl({mode:"visible",children:i.children},r,0,null),s=Ir(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ls(e,t.child,null,a),e.child.memoizedState=ed(a),e.memoizedState=Qu,s);if(!(e.mode&1))return mo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(re(419)),i=Ic(s,i,void 0),mo(t,e,a,i)}if(o=(a&t.childLanes)!==0,pn||o){if(i=Gt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ni(t,r),$n(i,t,r,-1))}return Xf(),i=Ic(Error(re(421))),mo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Ey.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,bn=sr(r.nextSibling),Tn=e,xt=!0,jn=null,t!==null&&(In[Dn++]=Ei,In[Dn++]=wi,In[Dn++]=Ur,Ei=t.id,wi=t.overflow,Ur=e),e=zf(e,i.children),e.flags|=4096,e)}function Ap(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Yu(t.return,e,n)}function Dc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Ug(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(sn(t,e,i.children,n),i=vt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ap(t,n,e);else if(t.tag===19)Ap(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ft(vt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&El(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Dc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&El(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Dc(e,!0,n,null,s);break;case"together":Dc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Zo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Li(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(re(153));if(e.child!==null){for(t=e.child,n=cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function dy(t,e,n){switch(e.tag){case 3:Ig(e),Ns();break;case 5:og(e);break;case 1:gn(e.type)&&xl(e);break;case 4:Lf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ft(yl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ft(vt,vt.current&1),e.flags|=128,null):n&e.child.childLanes?Dg(t,e,n):(ft(vt,vt.current&1),t=Li(t,e,n),t!==null?t.sibling:null);ft(vt,vt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Ug(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ft(vt,vt.current),i)break;return null;case 22:case 23:return e.lanes=0,Ng(t,e,n)}return Li(t,e,n)}var Fg,td,kg,Og;Fg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};td=function(){};kg=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Cr(ui.current);var s=null;switch(n){case"input":r=Eu(t,r),i=Eu(t,i),s=[];break;case"select":r=Mt({},r,{value:void 0}),i=Mt({},i,{value:void 0}),s=[];break;case"textarea":r=Tu(t,r),i=Tu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=ml)}Ru(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ba.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ba.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ht("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Og=function(t,e,n,i){n!==i&&(e.flags|=4)};function Js(t,e){if(!xt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function fy(t,e,n){var i=e.pendingProps;switch(bf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Zt(e),null;case 1:return gn(e.type)&&gl(),Zt(e),null;case 3:return i=e.stateNode,Is(),mt(mn),mt(nn),Df(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ho(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,jn!==null&&(cd(jn),jn=null))),td(t,e),Zt(e),null;case 5:If(e);var r=Cr(ka.current);if(n=e.type,t!==null&&e.stateNode!=null)kg(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return Zt(e),null}if(t=Cr(ui.current),ho(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ai]=e,i[Ua]=s,t=(e.mode&1)!==0,n){case"dialog":ht("cancel",i),ht("close",i);break;case"iframe":case"object":case"embed":ht("load",i);break;case"video":case"audio":for(r=0;r<ua.length;r++)ht(ua[r],i);break;case"source":ht("error",i);break;case"img":case"image":case"link":ht("error",i),ht("load",i);break;case"details":ht("toggle",i);break;case"input":Fh(i,s),ht("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ht("invalid",i);break;case"textarea":Oh(i,s),ht("invalid",i)}Ru(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&fo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&fo(i.textContent,o,t),r=["children",""+o]):ba.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&ht("scroll",i)}switch(n){case"input":io(i),kh(i,s,!0);break;case"textarea":io(i),Bh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=ml)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=f0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ai]=e,t[Ua]=i,Fg(t,e,!1,!1),e.stateNode=t;e:{switch(a=Cu(n,i),n){case"dialog":ht("cancel",t),ht("close",t),r=i;break;case"iframe":case"object":case"embed":ht("load",t),r=i;break;case"video":case"audio":for(r=0;r<ua.length;r++)ht(ua[r],t);r=i;break;case"source":ht("error",t),r=i;break;case"img":case"image":case"link":ht("error",t),ht("load",t),r=i;break;case"details":ht("toggle",t),r=i;break;case"input":Fh(t,i),r=Eu(t,i),ht("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Mt({},i,{value:void 0}),ht("invalid",t);break;case"textarea":Oh(t,i),r=Tu(t,i),ht("invalid",t);break;default:r=i}Ru(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?m0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&h0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ta(t,l):typeof l=="number"&&Ta(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ba.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ht("scroll",t):l!=null&&uf(t,s,l,a))}switch(n){case"input":io(t),kh(t,i,!1);break;case"textarea":io(t),Bh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+ur(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?_s(t,!!i.multiple,s,!1):i.defaultValue!=null&&_s(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=ml)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Zt(e),null;case 6:if(t&&e.stateNode!=null)Og(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(n=Cr(ka.current),Cr(ui.current),ho(e)){if(i=e.stateNode,n=e.memoizedProps,i[ai]=e,(s=i.nodeValue!==n)&&(t=Tn,t!==null))switch(t.tag){case 3:fo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&fo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ai]=e,e.stateNode=i}return Zt(e),null;case 13:if(mt(vt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(xt&&bn!==null&&e.mode&1&&!(e.flags&128))ng(),Ns(),e.flags|=98560,s=!1;else if(s=ho(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[ai]=e}else Ns(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Zt(e),s=!1}else jn!==null&&(cd(jn),jn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||vt.current&1?Ot===0&&(Ot=3):Xf())),e.updateQueue!==null&&(e.flags|=4),Zt(e),null);case 4:return Is(),td(t,e),t===null&&Ia(e.stateNode.containerInfo),Zt(e),null;case 10:return Cf(e.type._context),Zt(e),null;case 17:return gn(e.type)&&gl(),Zt(e),null;case 19:if(mt(vt),s=e.memoizedState,s===null)return Zt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)Js(s,!1);else{if(Ot!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=El(t),a!==null){for(e.flags|=128,Js(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ft(vt,vt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ct()>Us&&(e.flags|=128,i=!0,Js(s,!1),e.lanes=4194304)}else{if(!i)if(t=El(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Js(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!xt)return Zt(e),null}else 2*Ct()-s.renderingStartTime>Us&&n!==1073741824&&(e.flags|=128,i=!0,Js(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ct(),e.sibling=null,n=vt.current,ft(vt,i?n&1|2:n&1),e):(Zt(e),null);case 22:case 23:return jf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(Zt(e),e.subtreeFlags&6&&(e.flags|=8192)):Zt(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function hy(t,e){switch(bf(e),e.tag){case 1:return gn(e.type)&&gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Is(),mt(mn),mt(nn),Df(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return If(e),null;case 13:if(mt(vt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(re(340));Ns()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return mt(vt),null;case 4:return Is(),null;case 10:return Cf(e.type._context),null;case 22:case 23:return jf(),null;case 24:return null;default:return null}}var go=!1,en=!1,py=typeof WeakSet=="function"?WeakSet:Set,ye=null;function xs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Tt(t,e,i)}else n.current=null}function nd(t,e,n){try{n()}catch(i){Tt(t,e,i)}}var Rp=!1;function my(t,e){if(Bu=fl,t=G0(),Ef(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,f=0,h=t,d=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(p=h.firstChild)!==null;)d=h,h=p;for(;;){if(h===t)break t;if(d===n&&++c===r&&(o=a),d===s&&++f===i&&(l=a),(p=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(zu={focusedElem:t,selectionRange:n},fl=!1,ye=e;ye!==null;)if(e=ye,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ye=t;else for(;ye!==null;){e=ye;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var E=_.memoizedProps,m=_.memoizedState,u=e.stateNode,x=u.getSnapshotBeforeUpdate(e.elementType===e.type?E:Gn(e.type,E),m);u.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(S){Tt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,ye=t;break}ye=e.return}return _=Rp,Rp=!1,_}function Sa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&nd(e,n,s)}r=r.next}while(r!==i)}}function Kl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function id(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Bg(t){var e=t.alternate;e!==null&&(t.alternate=null,Bg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ai],delete e[Ua],delete e[Gu],delete e[Z_],delete e[J_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function zg(t){return t.tag===5||t.tag===3||t.tag===4}function Cp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||zg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function rd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ml));else if(i!==4&&(t=t.child,t!==null))for(rd(t,e,n),t=t.sibling;t!==null;)rd(t,e,n),t=t.sibling}function sd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(sd(t,e,n),t=t.sibling;t!==null;)sd(t,e,n),t=t.sibling}var Wt=null,Wn=!1;function zi(t,e,n){for(n=n.child;n!==null;)Vg(t,e,n),n=n.sibling}function Vg(t,e,n){if(ci&&typeof ci.onCommitFiberUnmount=="function")try{ci.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 5:en||xs(n,e);case 6:var i=Wt,r=Wn;Wt=null,zi(t,e,n),Wt=i,Wn=r,Wt!==null&&(Wn?(t=Wt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Wt.removeChild(n.stateNode));break;case 18:Wt!==null&&(Wn?(t=Wt,n=n.stateNode,t.nodeType===8?Ac(t.parentNode,n):t.nodeType===1&&Ac(t,n),Pa(t)):Ac(Wt,n.stateNode));break;case 4:i=Wt,r=Wn,Wt=n.stateNode.containerInfo,Wn=!0,zi(t,e,n),Wt=i,Wn=r;break;case 0:case 11:case 14:case 15:if(!en&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&nd(n,e,a),r=r.next}while(r!==i)}zi(t,e,n);break;case 1:if(!en&&(xs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Tt(n,e,o)}zi(t,e,n);break;case 21:zi(t,e,n);break;case 22:n.mode&1?(en=(i=en)||n.memoizedState!==null,zi(t,e,n),en=i):zi(t,e,n);break;default:zi(t,e,n)}}function Pp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new py),e.forEach(function(i){var r=wy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Bn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Wt=o.stateNode,Wn=!1;break e;case 3:Wt=o.stateNode.containerInfo,Wn=!0;break e;case 4:Wt=o.stateNode.containerInfo,Wn=!0;break e}o=o.return}if(Wt===null)throw Error(re(160));Vg(s,a,r),Wt=null,Wn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Hg(e,t),e=e.sibling}function Hg(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Bn(e,t),ti(t),i&4){try{Sa(3,t,t.return),Kl(3,t)}catch(E){Tt(t,t.return,E)}try{Sa(5,t,t.return)}catch(E){Tt(t,t.return,E)}}break;case 1:Bn(e,t),ti(t),i&512&&n!==null&&xs(n,n.return);break;case 5:if(Bn(e,t),ti(t),i&512&&n!==null&&xs(n,n.return),t.flags&32){var r=t.stateNode;try{Ta(r,"")}catch(E){Tt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&u0(r,s),Cu(o,a);var c=Cu(o,s);for(a=0;a<l.length;a+=2){var f=l[a],h=l[a+1];f==="style"?m0(r,h):f==="dangerouslySetInnerHTML"?h0(r,h):f==="children"?Ta(r,h):uf(r,f,h,c)}switch(o){case"input":wu(r,s);break;case"textarea":d0(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?_s(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?_s(r,!!s.multiple,s.defaultValue,!0):_s(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ua]=s}catch(E){Tt(t,t.return,E)}}break;case 6:if(Bn(e,t),ti(t),i&4){if(t.stateNode===null)throw Error(re(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){Tt(t,t.return,E)}}break;case 3:if(Bn(e,t),ti(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Pa(e.containerInfo)}catch(E){Tt(t,t.return,E)}break;case 4:Bn(e,t),ti(t);break;case 13:Bn(e,t),ti(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Gf=Ct())),i&4&&Pp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(en=(c=en)||f,Bn(e,t),en=c):Bn(e,t),ti(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(ye=t,f=t.child;f!==null;){for(h=ye=f;ye!==null;){switch(d=ye,p=d.child,d.tag){case 0:case 11:case 14:case 15:Sa(4,d,d.return);break;case 1:xs(d,d.return);var _=d.stateNode;if(typeof _.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(E){Tt(i,n,E)}}break;case 5:xs(d,d.return);break;case 22:if(d.memoizedState!==null){Lp(h);continue}}p!==null?(p.return=d,ye=p):Lp(h)}f=f.sibling}e:for(f=null,h=t;;){if(h.tag===5){if(f===null){f=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=p0("display",a))}catch(E){Tt(t,t.return,E)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(E){Tt(t,t.return,E)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Bn(e,t),ti(t),i&4&&Pp(t);break;case 21:break;default:Bn(e,t),ti(t)}}function ti(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(zg(n)){var i=n;break e}n=n.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ta(r,""),i.flags&=-33);var s=Cp(t);sd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Cp(t);rd(t,o,a);break;default:throw Error(re(161))}}catch(l){Tt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function gy(t,e,n){ye=t,Gg(t)}function Gg(t,e,n){for(var i=(t.mode&1)!==0;ye!==null;){var r=ye,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||go;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||en;o=go;var c=en;if(go=a,(en=l)&&!c)for(ye=r;ye!==null;)a=ye,l=a.child,a.tag===22&&a.memoizedState!==null?Ip(r):l!==null?(l.return=a,ye=l):Ip(r);for(;s!==null;)ye=s,Gg(s),s=s.sibling;ye=r,go=o,en=c}Np(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ye=s):Np(t)}}function Np(t){for(;ye!==null;){var e=ye;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:en||Kl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!en)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Gn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&mp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}mp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Pa(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}en||e.flags&512&&id(e)}catch(d){Tt(e,e.return,d)}}if(e===t){ye=null;break}if(n=e.sibling,n!==null){n.return=e.return,ye=n;break}ye=e.return}}function Lp(t){for(;ye!==null;){var e=ye;if(e===t){ye=null;break}var n=e.sibling;if(n!==null){n.return=e.return,ye=n;break}ye=e.return}}function Ip(t){for(;ye!==null;){var e=ye;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Kl(4,e)}catch(l){Tt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var s=e.return;try{id(e)}catch(l){Tt(e,s,l)}break;case 5:var a=e.return;try{id(e)}catch(l){Tt(e,a,l)}}}catch(l){Tt(e,e.return,l)}if(e===t){ye=null;break}var o=e.sibling;if(o!==null){o.return=e.return,ye=o;break}ye=e.return}}var xy=Math.ceil,Tl=Ui.ReactCurrentDispatcher,Vf=Ui.ReactCurrentOwner,Fn=Ui.ReactCurrentBatchConfig,tt=0,Gt=null,Ft=null,Xt=0,Mn=0,vs=mr(0),Ot=0,Va=null,kr=0,Zl=0,Hf=0,Ma=null,hn=null,Gf=0,Us=1/0,yi=null,Al=!1,ad=null,or=null,xo=!1,Qi=null,Rl=0,Ea=0,od=null,Jo=-1,Qo=0;function an(){return tt&6?Ct():Jo!==-1?Jo:Jo=Ct()}function lr(t){return t.mode&1?tt&2&&Xt!==0?Xt&-Xt:ey.transition!==null?(Qo===0&&(Qo=A0()),Qo):(t=st,t!==0||(t=window.event,t=t===void 0?16:D0(t.type)),t):1}function $n(t,e,n,i){if(50<Ea)throw Ea=0,od=null,Error(re(185));Xa(t,n,i),(!(tt&2)||t!==Gt)&&(t===Gt&&(!(tt&2)&&(Zl|=n),Ot===4&&Ki(t,Xt)),xn(t,i),n===1&&tt===0&&!(e.mode&1)&&(Us=Ct()+500,Yl&&gr()))}function xn(t,e){var n=t.callbackNode;e_(t,e);var i=dl(t,t===Gt?Xt:0);if(i===0)n!==null&&Hh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Hh(n),e===1)t.tag===0?Q_(Dp.bind(null,t)):Q0(Dp.bind(null,t)),$_(function(){!(tt&6)&&gr()}),n=null;else{switch(R0(i)){case 1:n=mf;break;case 4:n=b0;break;case 16:n=ul;break;case 536870912:n=T0;break;default:n=ul}n=Zg(n,Wg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Wg(t,e){if(Jo=-1,Qo=0,tt&6)throw Error(re(327));var n=t.callbackNode;if(ws()&&t.callbackNode!==n)return null;var i=dl(t,t===Gt?Xt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Cl(t,i);else{e=i;var r=tt;tt|=2;var s=Xg();(Gt!==t||Xt!==e)&&(yi=null,Us=Ct()+500,Lr(t,e));do try{yy();break}catch(o){jg(t,o)}while(!0);Rf(),Tl.current=s,tt=r,Ft!==null?e=0:(Gt=null,Xt=0,e=Ot)}if(e!==0){if(e===2&&(r=Du(t),r!==0&&(i=r,e=ld(t,r))),e===1)throw n=Va,Lr(t,0),Ki(t,i),xn(t,Ct()),n;if(e===6)Ki(t,i);else{if(r=t.current.alternate,!(i&30)&&!vy(r)&&(e=Cl(t,i),e===2&&(s=Du(t),s!==0&&(i=s,e=ld(t,s))),e===1))throw n=Va,Lr(t,0),Ki(t,i),xn(t,Ct()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:Er(t,hn,yi);break;case 3:if(Ki(t,i),(i&130023424)===i&&(e=Gf+500-Ct(),10<e)){if(dl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){an(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Hu(Er.bind(null,t,hn,yi),e);break}Er(t,hn,yi);break;case 4:if(Ki(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-qn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Ct()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*xy(i/1960))-i,10<i){t.timeoutHandle=Hu(Er.bind(null,t,hn,yi),i);break}Er(t,hn,yi);break;case 5:Er(t,hn,yi);break;default:throw Error(re(329))}}}return xn(t,Ct()),t.callbackNode===n?Wg.bind(null,t):null}function ld(t,e){var n=Ma;return t.current.memoizedState.isDehydrated&&(Lr(t,e).flags|=256),t=Cl(t,e),t!==2&&(e=hn,hn=n,e!==null&&cd(e)),t}function cd(t){hn===null?hn=t:hn.push.apply(hn,t)}function vy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Zn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ki(t,e){for(e&=~Hf,e&=~Zl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-qn(e),i=1<<n;t[n]=-1,e&=~i}}function Dp(t){if(tt&6)throw Error(re(327));ws();var e=dl(t,0);if(!(e&1))return xn(t,Ct()),null;var n=Cl(t,e);if(t.tag!==0&&n===2){var i=Du(t);i!==0&&(e=i,n=ld(t,i))}if(n===1)throw n=Va,Lr(t,0),Ki(t,e),xn(t,Ct()),n;if(n===6)throw Error(re(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Er(t,hn,yi),xn(t,Ct()),null}function Wf(t,e){var n=tt;tt|=1;try{return t(e)}finally{tt=n,tt===0&&(Us=Ct()+500,Yl&&gr())}}function Or(t){Qi!==null&&Qi.tag===0&&!(tt&6)&&ws();var e=tt;tt|=1;var n=Fn.transition,i=st;try{if(Fn.transition=null,st=1,t)return t()}finally{st=i,Fn.transition=n,tt=e,!(tt&6)&&gr()}}function jf(){Mn=vs.current,mt(vs)}function Lr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,q_(n)),Ft!==null)for(n=Ft.return;n!==null;){var i=n;switch(bf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&gl();break;case 3:Is(),mt(mn),mt(nn),Df();break;case 5:If(i);break;case 4:Is();break;case 13:mt(vt);break;case 19:mt(vt);break;case 10:Cf(i.type._context);break;case 22:case 23:jf()}n=n.return}if(Gt=t,Ft=t=cr(t.current,null),Xt=Mn=e,Ot=0,Va=null,Hf=Zl=kr=0,hn=Ma=null,Rr!==null){for(e=0;e<Rr.length;e++)if(n=Rr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Rr=null}return t}function jg(t,e){do{var n=Ft;try{if(Rf(),$o.current=bl,wl){for(var i=yt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}wl=!1}if(Fr=0,Ht=kt=yt=null,ya=!1,Oa=0,Vf.current=null,n===null||n.return===null){Ot=1,Va=e,Ft=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Xt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=o,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Sp(a);if(p!==null){p.flags&=-257,Mp(p,a,o,s,e),p.mode&1&&yp(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var E=new Set;E.add(l),e.updateQueue=E}else _.add(l);break e}else{if(!(e&1)){yp(s,c,e),Xf();break e}l=Error(re(426))}}else if(xt&&o.mode&1){var m=Sp(a);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Mp(m,a,o,s,e),Tf(Ds(l,o));break e}}s=l=Ds(l,o),Ot!==4&&(Ot=2),Ma===null?Ma=[s]:Ma.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=Rg(s,l,e);pp(s,u);break e;case 1:o=l;var x=s.type,M=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(or===null||!or.has(M)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=Cg(s,o,e);pp(s,S);break e}}s=s.return}while(s!==null)}qg(n)}catch(T){e=T,Ft===n&&n!==null&&(Ft=n=n.return);continue}break}while(!0)}function Xg(){var t=Tl.current;return Tl.current=bl,t===null?bl:t}function Xf(){(Ot===0||Ot===3||Ot===2)&&(Ot=4),Gt===null||!(kr&268435455)&&!(Zl&268435455)||Ki(Gt,Xt)}function Cl(t,e){var n=tt;tt|=2;var i=Xg();(Gt!==t||Xt!==e)&&(yi=null,Lr(t,e));do try{_y();break}catch(r){jg(t,r)}while(!0);if(Rf(),tt=n,Tl.current=i,Ft!==null)throw Error(re(261));return Gt=null,Xt=0,Ot}function _y(){for(;Ft!==null;)Yg(Ft)}function yy(){for(;Ft!==null&&!jv();)Yg(Ft)}function Yg(t){var e=Kg(t.alternate,t,Mn);t.memoizedProps=t.pendingProps,e===null?qg(t):Ft=e,Vf.current=null}function qg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=hy(n,e),n!==null){n.flags&=32767,Ft=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ot=6,Ft=null;return}}else if(n=fy(n,e,Mn),n!==null){Ft=n;return}if(e=e.sibling,e!==null){Ft=e;return}Ft=e=t}while(e!==null);Ot===0&&(Ot=5)}function Er(t,e,n){var i=st,r=Fn.transition;try{Fn.transition=null,st=1,Sy(t,e,n,i)}finally{Fn.transition=r,st=i}return null}function Sy(t,e,n,i){do ws();while(Qi!==null);if(tt&6)throw Error(re(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(re(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(t_(t,s),t===Gt&&(Ft=Gt=null,Xt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||xo||(xo=!0,Zg(ul,function(){return ws(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Fn.transition,Fn.transition=null;var a=st;st=1;var o=tt;tt|=4,Vf.current=null,my(t,n),Hg(n,t),V_(zu),fl=!!Bu,zu=Bu=null,t.current=n,gy(n),Xv(),tt=o,st=a,Fn.transition=s}else t.current=n;if(xo&&(xo=!1,Qi=t,Rl=r),s=t.pendingLanes,s===0&&(or=null),$v(n.stateNode),xn(t,Ct()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Al)throw Al=!1,t=ad,ad=null,t;return Rl&1&&t.tag!==0&&ws(),s=t.pendingLanes,s&1?t===od?Ea++:(Ea=0,od=t):Ea=0,gr(),null}function ws(){if(Qi!==null){var t=R0(Rl),e=Fn.transition,n=st;try{if(Fn.transition=null,st=16>t?16:t,Qi===null)var i=!1;else{if(t=Qi,Qi=null,Rl=0,tt&6)throw Error(re(331));var r=tt;for(tt|=4,ye=t.current;ye!==null;){var s=ye,a=s.child;if(ye.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(ye=c;ye!==null;){var f=ye;switch(f.tag){case 0:case 11:case 15:Sa(8,f,s)}var h=f.child;if(h!==null)h.return=f,ye=h;else for(;ye!==null;){f=ye;var d=f.sibling,p=f.return;if(Bg(f),f===c){ye=null;break}if(d!==null){d.return=p,ye=d;break}ye=p}}}var _=s.alternate;if(_!==null){var E=_.child;if(E!==null){_.child=null;do{var m=E.sibling;E.sibling=null,E=m}while(E!==null)}}ye=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,ye=a;else e:for(;ye!==null;){if(s=ye,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Sa(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,ye=u;break e}ye=s.return}}var x=t.current;for(ye=x;ye!==null;){a=ye;var M=a.child;if(a.subtreeFlags&2064&&M!==null)M.return=a,ye=M;else e:for(a=x;ye!==null;){if(o=ye,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Kl(9,o)}}catch(T){Tt(o,o.return,T)}if(o===a){ye=null;break e}var S=o.sibling;if(S!==null){S.return=o.return,ye=S;break e}ye=o.return}}if(tt=r,gr(),ci&&typeof ci.onPostCommitFiberRoot=="function")try{ci.onPostCommitFiberRoot(Hl,t)}catch{}i=!0}return i}finally{st=n,Fn.transition=e}}return!1}function Up(t,e,n){e=Ds(n,e),e=Rg(t,e,1),t=ar(t,e,1),e=an(),t!==null&&(Xa(t,1,e),xn(t,e))}function Tt(t,e,n){if(t.tag===3)Up(t,t,n);else for(;e!==null;){if(e.tag===3){Up(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(or===null||!or.has(i))){t=Ds(n,t),t=Cg(e,t,1),e=ar(e,t,1),t=an(),e!==null&&(Xa(e,1,t),xn(e,t));break}}e=e.return}}function My(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=an(),t.pingedLanes|=t.suspendedLanes&n,Gt===t&&(Xt&n)===n&&(Ot===4||Ot===3&&(Xt&130023424)===Xt&&500>Ct()-Gf?Lr(t,0):Hf|=n),xn(t,e)}function $g(t,e){e===0&&(t.mode&1?(e=ao,ao<<=1,!(ao&130023424)&&(ao=4194304)):e=1);var n=an();t=Ni(t,e),t!==null&&(Xa(t,e,n),xn(t,n))}function Ey(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),$g(t,n)}function wy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),$g(t,n)}var Kg;Kg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return pn=!1,dy(t,e,n);pn=!!(t.flags&131072)}else pn=!1,xt&&e.flags&1048576&&eg(e,_l,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Zo(t,e),t=e.pendingProps;var r=Ps(e,nn.current);Es(e,n),r=Ff(null,e,i,t,r,n);var s=kf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,gn(i)?(s=!0,xl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Nf(e),r.updater=$l,e.stateNode=r,r._reactInternals=e,$u(e,i,t,n),e=Ju(null,e,i,!0,s,n)):(e.tag=0,xt&&s&&wf(e),sn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Zo(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Ty(i),t=Gn(i,t),r){case 0:e=Zu(null,e,i,t,n);break e;case 1:e=bp(null,e,i,t,n);break e;case 11:e=Ep(null,e,i,t,n);break e;case 14:e=wp(null,e,i,Gn(i.type,t),n);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),Zu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),bp(t,e,i,r,n);case 3:e:{if(Ig(e),t===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,ag(t,e),Ml(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ds(Error(re(423)),e),e=Tp(t,e,i,n,r);break e}else if(i!==r){r=Ds(Error(re(424)),e),e=Tp(t,e,i,n,r);break e}else for(bn=sr(e.stateNode.containerInfo.firstChild),Tn=e,xt=!0,jn=null,n=rg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ns(),i===r){e=Li(t,e,n);break e}sn(t,e,i,n)}e=e.child}return e;case 5:return og(e),t===null&&Xu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Vu(i,r)?a=null:s!==null&&Vu(i,s)&&(e.flags|=32),Lg(t,e),sn(t,e,a,n),e.child;case 6:return t===null&&Xu(e),null;case 13:return Dg(t,e,n);case 4:return Lf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ls(e,null,i,n):sn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),Ep(t,e,i,r,n);case 7:return sn(t,e,e.pendingProps,n),e.child;case 8:return sn(t,e,e.pendingProps.children,n),e.child;case 12:return sn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,ft(yl,i._currentValue),i._currentValue=a,s!==null)if(Zn(s.value,a)){if(s.children===r.children&&!mn.current){e=Li(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ti(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Yu(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(re(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Yu(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}sn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Es(e,n),r=kn(r),i=i(r),e.flags|=1,sn(t,e,i,n),e.child;case 14:return i=e.type,r=Gn(i,e.pendingProps),r=Gn(i.type,r),wp(t,e,i,r,n);case 15:return Pg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Gn(i,r),Zo(t,e),e.tag=1,gn(i)?(t=!0,xl(e)):t=!1,Es(e,n),Ag(e,i,r),$u(e,i,r,n),Ju(null,e,i,!0,t,n);case 19:return Ug(t,e,n);case 22:return Ng(t,e,n)}throw Error(re(156,e.tag))};function Zg(t,e){return w0(t,e)}function by(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Un(t,e,n,i){return new by(t,e,n,i)}function Yf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ty(t){if(typeof t=="function")return Yf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ff)return 11;if(t===hf)return 14}return 2}function cr(t,e){var n=t.alternate;return n===null?(n=Un(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function el(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Yf(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case ls:return Ir(n.children,r,s,e);case df:a=8,r|=8;break;case _u:return t=Un(12,n,e,r|2),t.elementType=_u,t.lanes=s,t;case yu:return t=Un(13,n,e,r),t.elementType=yu,t.lanes=s,t;case Su:return t=Un(19,n,e,r),t.elementType=Su,t.lanes=s,t;case o0:return Jl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case s0:a=10;break e;case a0:a=9;break e;case ff:a=11;break e;case hf:a=14;break e;case Yi:a=16,i=null;break e}throw Error(re(130,t==null?t:typeof t,""))}return e=Un(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Ir(t,e,n,i){return t=Un(7,t,i,e),t.lanes=n,t}function Jl(t,e,n,i){return t=Un(22,t,i,e),t.elementType=o0,t.lanes=n,t.stateNode={isHidden:!1},t}function Uc(t,e,n){return t=Un(6,t,null,e),t.lanes=n,t}function Fc(t,e,n){return e=Un(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Ay(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gc(0),this.expirationTimes=gc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function qf(t,e,n,i,r,s,a,o,l){return t=new Ay(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Un(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Nf(s),t}function Ry(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:os,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Jg(t){if(!t)return dr;t=t._reactInternals;e:{if(Hr(t)!==t||t.tag!==1)throw Error(re(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(gn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(t.tag===1){var n=t.type;if(gn(n))return J0(t,n,e)}return e}function Qg(t,e,n,i,r,s,a,o,l){return t=qf(n,i,!0,t,r,s,a,o,l),t.context=Jg(null),n=t.current,i=an(),r=lr(n),s=Ti(i,r),s.callback=e??null,ar(n,s,r),t.current.lanes=r,Xa(t,r,i),xn(t,i),t}function Ql(t,e,n,i){var r=e.current,s=an(),a=lr(r);return n=Jg(n),e.context===null?e.context=n:e.pendingContext=n,e=Ti(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=ar(r,e,a),t!==null&&($n(t,r,a,s),qo(t,r,a)),a}function Pl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Fp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function $f(t,e){Fp(t,e),(t=t.alternate)&&Fp(t,e)}function Cy(){return null}var ex=typeof reportError=="function"?reportError:function(t){console.error(t)};function Kf(t){this._internalRoot=t}ec.prototype.render=Kf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(re(409));Ql(t,e,null,null)};ec.prototype.unmount=Kf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Or(function(){Ql(null,t,null,null)}),e[Pi]=null}};function ec(t){this._internalRoot=t}ec.prototype.unstable_scheduleHydration=function(t){if(t){var e=N0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$i.length&&e!==0&&e<$i[n].priority;n++);$i.splice(n,0,t),n===0&&I0(t)}};function Zf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function tc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function kp(){}function Py(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Pl(a);s.call(c)}}var a=Qg(e,i,t,0,null,!1,!1,"",kp);return t._reactRootContainer=a,t[Pi]=a.current,Ia(t.nodeType===8?t.parentNode:t),Or(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Pl(l);o.call(c)}}var l=qf(t,0,!1,null,null,!1,!1,"",kp);return t._reactRootContainer=l,t[Pi]=l.current,Ia(t.nodeType===8?t.parentNode:t),Or(function(){Ql(e,l,n,i)}),l}function nc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Pl(a);o.call(l)}}Ql(e,a,t,r)}else a=Py(n,e,t,r,i);return Pl(a)}C0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ca(e.pendingLanes);n!==0&&(gf(e,n|1),xn(e,Ct()),!(tt&6)&&(Us=Ct()+500,gr()))}break;case 13:Or(function(){var i=Ni(t,1);if(i!==null){var r=an();$n(i,t,1,r)}}),$f(t,1)}};xf=function(t){if(t.tag===13){var e=Ni(t,134217728);if(e!==null){var n=an();$n(e,t,134217728,n)}$f(t,134217728)}};P0=function(t){if(t.tag===13){var e=lr(t),n=Ni(t,e);if(n!==null){var i=an();$n(n,t,e,i)}$f(t,e)}};N0=function(){return st};L0=function(t,e){var n=st;try{return st=t,e()}finally{st=n}};Nu=function(t,e,n){switch(e){case"input":if(wu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Xl(i);if(!r)throw Error(re(90));c0(i),wu(i,r)}}}break;case"textarea":d0(t,n);break;case"select":e=n.value,e!=null&&_s(t,!!n.multiple,e,!1)}};v0=Wf;_0=Or;var Ny={usingClientEntryPoint:!1,Events:[qa,fs,Xl,g0,x0,Wf]},Qs={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ly={bundleType:Qs.bundleType,version:Qs.version,rendererPackageName:Qs.rendererPackageName,rendererConfig:Qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ui.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=M0(t),t===null?null:t.stateNode},findFiberByHostInstance:Qs.findFiberByHostInstance||Cy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vo.isDisabled&&vo.supportsFiber)try{Hl=vo.inject(Ly),ci=vo}catch{}}Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ny;Rn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Zf(e))throw Error(re(200));return Ry(t,e,null,n)};Rn.createRoot=function(t,e){if(!Zf(t))throw Error(re(299));var n=!1,i="",r=ex;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=qf(t,1,!1,null,null,n,!1,i,r),t[Pi]=e.current,Ia(t.nodeType===8?t.parentNode:t),new Kf(e)};Rn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(re(188)):(t=Object.keys(t).join(","),Error(re(268,t)));return t=M0(e),t=t===null?null:t.stateNode,t};Rn.flushSync=function(t){return Or(t)};Rn.hydrate=function(t,e,n){if(!tc(e))throw Error(re(200));return nc(null,t,e,!0,n)};Rn.hydrateRoot=function(t,e,n){if(!Zf(t))throw Error(re(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=ex;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Qg(e,null,t,1,n??null,r,!1,s,a),t[Pi]=e.current,Ia(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new ec(e)};Rn.render=function(t,e,n){if(!tc(e))throw Error(re(200));return nc(null,t,e,!1,n)};Rn.unmountComponentAtNode=function(t){if(!tc(t))throw Error(re(40));return t._reactRootContainer?(Or(function(){nc(null,null,t,!1,function(){t._reactRootContainer=null,t[Pi]=null})}),!0):!1};Rn.unstable_batchedUpdates=Wf;Rn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!tc(n))throw Error(re(200));if(t==null||t._reactInternals===void 0)throw Error(re(38));return nc(t,e,n,!1,i)};Rn.version="18.3.1-next-f1338f8080-20240426";function tx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(tx)}catch(t){console.error(t)}}tx(),t0.exports=Rn;var Iy=t0.exports,Op=Iy;xu.createRoot=Op.createRoot,xu.hydrateRoot=Op.hydrateRoot;/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),nx=(...t)=>t.filter((e,n,i)=>!!e&&i.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Uy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fy=Be.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:a,...o},l)=>Be.createElement("svg",{ref:l,...Uy,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:nx("lucide",r),...o},[...a.map(([c,f])=>Be.createElement(c,f)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=(t,e)=>{const n=Be.forwardRef(({className:i,...r},s)=>Be.createElement(Fy,{ref:s,iconNode:e,className:nx(`lucide-${Dy(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=Oe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=Oe("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ix=Oe("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nl=Oe("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx=Oe("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=Oe("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx=Oe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy=Oe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vy=Oe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hy=Oe("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=Oe("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jf=Oe("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=Oe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=Oe("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wy=Oe("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ll=Oe("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax=Oe("FolderGit2",[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8",key:"pkpw2h"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ic=Oe("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=Oe("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=Oe("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xy=Oe("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=Oe("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=Oe("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox=Oe("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=Oe("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=Oe("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $y=Oe("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=Oe("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const th=Oe("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zy=Oe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=Oe("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=Oe("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qy=Oe("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=Oe("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e1=Oe("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t1=Oe("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=Oe("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=Oe("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i1=Oe("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r1=Oe("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=Oe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=Oe("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),pt={name:"Ratnesh Kumar Singh",role:"Full Stack Developer & AI Engineer",tagline:"I build exceptional, real-time, and AI-powered digital experiences for web, mobile, and embedded systems.",location:"Kolkata, India",email:"kumarsinghratnesh3@gmail.com",github:"https://github.com/Ratnesh919",linkedin:"https://linkedin.com/in/ratnesh-kumar-singh",twitter:"https://twitter.com",projects:[{id:"syncpulse",title:"SyncPulse",subtitle:"Multi-Device Spatial Audio Network",tagline:"Sub-millisecond multi-device synchronized audio playback over WebSockets.",desc:"Architected a real-time distributed audio synchronization engine implementing Cristian's NTP clock sync algorithm to achieve ±5ms precision across diverse client devices, paired with an 8D binaural 360° soundstage and an interactive Three.js 3D audio visualizer.",category:"Full-Stack",tags:["Node.js","Web Audio API","Three.js","WebSockets","NTP Sync"],techStack:"Node.js · Web Audio · Three.js",accent:"#a855f7",glowColor:"rgba(168, 85, 247, 0.4)",badge:"Featured / Real-Time DSP",liveUrl:"https://syncpulse-1igt.onrender.com",githubUrl:"https://github.com/Ratnesh919/SyncPulse",highlights:["±5ms multi-device audio clock synchronization via custom NTP implementation","Interactive 3D Three.js spatial soundstage with head-tracking","WebSockets broadcast network capable of seamless multi-room streaming"]},{id:"pak-converter",title:"PAK Video Converter",subtitle:"Android MediaCodec & MediaMuxer Pipeline",tagline:"Low-latency hardware accelerated video extractor & transcoder.",desc:"Engineered a native Android application using Kotlin and Jetpack Compose that directly interfaces with Android's MediaCodec and MediaMuxer hardware pipelines to extract, transcode, and stream raw video payloads, game archives, and dashcam footage.",category:"Android",tags:["Kotlin","Jetpack Compose","MediaCodec","Room SQLite","Coroutines"],techStack:"Kotlin · Jetpack Compose · MediaCodec",accent:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.4)",badge:"Native Android",githubUrl:"https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",highlights:["Hardware-accelerated transcoding pipeline with zero frame drops","Reactive modern UI built from scratch using Jetpack Compose","Custom binary header parser for proprietary container formats"]},{id:"mediflow",title:"MediFlow",subtitle:"Outpatient Queue & Wait-Time Forecasting",tagline:"Machine learning wait-time estimation & real-time queue orchestration.",desc:"Full-stack hospital queue management system combining FastAPI, React 18, and PostgreSQL with a Scikit-Learn Random Forest ML regression model to forecast patient wait times dynamically with real-time WebSocket token broadcasts.",category:"Full-Stack",tags:["FastAPI","React 18","PostgreSQL","Scikit-Learn","WebSockets"],techStack:"FastAPI · React 18 · Scikit-Learn",accent:"#ec4899",glowColor:"rgba(236, 72, 153, 0.4)",badge:"Healthcare ML",liveUrl:"https://github.com/Ratnesh919/Medi_Flow",githubUrl:"https://github.com/Ratnesh919/Medi_Flow",highlights:["Dynamic wait-time prediction using Random Forest regression","Real-time WebSocket token display boards for hospital waiting rooms","Emergency triage preemption system with audit logging"]},{id:"jobpilot",title:"JobPilot AI",subtitle:"Autonomous Job Search & Application Agent",tagline:"Automated agent workflow scanning job feeds and dispatching tailored applications.",desc:"Engineered an autonomous workflow on n8n Cloud powered by Google Gemini API to continuously aggregate job openings across platforms, evaluate semantic candidate fit, dynamically tailor resumes, and trigger webhook dispatches.",category:"AI & Automation",tags:["n8n Cloud","Google Gemini API","Webhooks","Automation","TypeScript"],techStack:"n8n · Google Gemini · Webhooks",accent:"#22c55e",glowColor:"rgba(34, 197, 94, 0.4)",badge:"AI Agent Workflow",liveUrl:"https://ratnesh919.app.n8n.cloud",githubUrl:"https://github.com/Ratnesh919/Job_Pilot-AI",highlights:["Continuous multi-source RSS and API ingestion pipeline","Semantic matching with Google Gemini 1.5 Flash models","Automated applicant tracking and personalized email notifications"]},{id:"bmw-m3",title:"BMW M3 GTR 3D",subtitle:"Interactive WebGL Automotive Showcase",tagline:"Real-time 3D vehicle inspection with custom GLSL lighting shaders.",desc:"Interactive 3D vehicle experience built with Three.js and WebGL. Features real-time PBR shaders, HDRI reflection environment mapping, orbital camera inspection, and interactive customization controls.",category:"3D Graphics",tags:["Three.js","WebGL","GLSL Shaders","JavaScript","OrbitControls"],techStack:"Three.js · WebGL · GLSL",accent:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.4)",badge:"WebGL / Three.js",githubUrl:"https://github.com/Ratnesh919/BMW-M3-GTR",highlights:["Physically Based Rendering (PBR) with custom GLSL reflection shaders","Smooth orbital camera kinematics with damping controls","Real-time paint material selector and lighting controls"]},{id:"smart-antenna",title:"Smart Antenna V2X",subtitle:"Dielectric-Loaded Capacitive Monopole Antenna",tagline:"HFSS RF antenna design achieving 74% physical size reduction.",desc:"Designed and simulated a capacitive-loaded monopole antenna for automotive Vehicle-to-Everything (V2X) communication at 535.57 MHz in Ansys HFSS. Succeeded in reducing physical footprint by 74% while maintaining -31.87 dB return loss and 98.34% radiation efficiency.",category:"Hardware & IoT",tags:["Ansys HFSS","RF Design","VNA Testing","V2X Communication","Electromagnetics"],techStack:"Ansys HFSS · RF Simulation",accent:"#6366f1",glowColor:"rgba(99, 102, 241, 0.4)",badge:"ECE Hardware",highlights:["74% physical footprint miniaturization at 535.57 MHz","-31.87 dB return loss with 98.34% radiation efficiency","Full 3D radiation pattern and Smith Chart impedance matching"]}],skillCategories:[{title:"Full-Stack & Real-Time Web",description:"Building responsive, sub-second web platforms and real-time distributed pipelines.",icon:"Code2",skills:[{name:"React 18 & Next.js",level:90,highlight:!0},{name:"TypeScript",level:88,highlight:!0},{name:"Node.js & Express",level:85,highlight:!0},{name:"FastAPI & Python",level:82},{name:"WebSockets & Real-Time DSP",level:92,highlight:!0},{name:"PostgreSQL & Supabase",level:80},{name:"Tailwind CSS & Modern UI",level:95,highlight:!0}]},{title:"Mobile App Development",description:"Native high-efficiency Android software utilizing hardware decoders.",icon:"Smartphone",skills:[{name:"Kotlin & Android SDK",level:88,highlight:!0},{name:"Jetpack Compose",level:85,highlight:!0},{name:"MediaCodec & MediaMuxer",level:90,highlight:!0},{name:"Room SQLite Database",level:84},{name:"Kotlin Coroutines & Flow",level:86}]},{title:"AI Agents & Automation",description:"Orchestrating autonomous AI workflows and LLM applications.",icon:"Cpu",skills:[{name:"n8n Workflow Automation",level:92,highlight:!0},{name:"Google Gemini API",level:90,highlight:!0},{name:"OpenAI API Integration",level:85},{name:"Prompt Engineering",level:94,highlight:!0},{name:"Python Scripting & Scikit-Learn",level:82}]},{title:"Embedded Systems & RF Hardware",description:"Hardware circuit modeling, RF antenna simulation, and microcontroller firmware.",icon:"Radio",skills:[{name:"Ansys HFSS Simulation",level:86,highlight:!0},{name:"RF Antennas & V2X",level:85,highlight:!0},{name:"Arduino IDE & IoT Prototypes",level:88},{name:"MATLAB & Tinkercad",level:80},{name:"Verilog & Digital Systems",level:75}]},{title:"UI/UX & Interactive 3D",description:"Crafting tactile 3D visuals, shaders, and fluid interfaces.",icon:"Sparkles",skills:[{name:"Three.js & WebGL",level:88,highlight:!0},{name:"GLSL Fragment Shaders",level:82,highlight:!0},{name:"Figma UI/UX Design",level:90},{name:"Framer Motion",level:88},{name:"3D Neomorphism & Glassmorphism",level:94,highlight:!0}]}],certifications:[{id:"iot-cert",title:"Internet of Things (IoT) Online Course",issuer:"Udemy (Makeintern & Learntoupgrade Online)",instructor:"Learntoupgrade / Makeintern",date:"July 30, 2026",certId:"UC-45f867df-23bf-440a-b362-0508bfb8d29f",category:"IoT & Hardware",verifyUrl:"https://ude.my/UC-45f867df-23bf-440a-b362-0508bfb8d29f",skills:["IoT Architecture","Sensors & Actuators","Embedded Protocols","Cloud Telemetry"]},{id:"prompt-eng-cert",title:"Prompt Engineering for Everyone (Tool-Agnostic)",issuer:"Udemy",instructor:"Dr. Amar Massoud",date:"May 4, 2025",certId:"UC-58952f65-94dc-45c4-abd9-aa490de18afc",category:"AI & LLMs",verifyUrl:"https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",skills:["Zero-shot & Few-shot Prompting","Chain of Thought","LLM Reasoning Patterns"]},{id:"all-in-one-prog-cert",title:"Master Java, Python, C & C++: All-in-One Programming",issuer:"Udemy",instructor:"Knowledge Nest",date:"May 5, 2025",certId:"UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",category:"Core Computer Science",verifyUrl:"https://ude.my/UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",skills:["Data Structures & Algorithms","Memory Management","Object-Oriented Programming"]},{id:"cpp-intro-cert",title:"The Complete Introduction to C++ Programming",issuer:"Udemy",instructor:"Yassin Marco MBA",date:"July 14, 2025",certId:"UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",category:"Systems Programming",verifyUrl:"https://ude.my/UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",skills:["Pointers & References","Templates","STL Algorithms","Low-Level Performance"]}],experiences:[{period:"2022 – 2026",title:"B.Tech in Electronics and Communication Engineering",institution:"Swami Vivekananda Institute of Science & Technology, MAKAUT",type:"Education",description:"Focused on RF antenna design, embedded systems, microprocessors, digital signal processing, and telecommunications alongside independent full-stack and mobile app engineering.",badge:"Degree / Graduation 2026"},{period:"2025",title:"BSNL Telecom Industrial Visit",institution:"Bharat Sanchar Nigam Limited (BSNL)",type:"Industrial Visit",description:"Studied carrier-grade telecom switching centers, fiber-optic distribution systems, transmission hierarchies (SDH/DWDM), and cellular core network routing infrastructure.",badge:"Telecommunications"},{period:"2025",title:"HAM Radio Innovation & General Awareness Workshop",institution:"Amateur Radio Society / MAKAUT",type:"Workshop",description:"Hands-on experience with HF/VHF radio transceiver tuning, modulation techniques, antenna impedance matching, and emergency communication protocols.",badge:"RF & Wireless"},{period:"2024",title:"Electric Vehicle Service Technology (1-Month Training)",institution:"Technical Institute of EV Engineering",type:"Training",description:"Trained on EV powertrain architectures, battery management systems (BMS), regenerative braking motor controllers, and DC-DC converter diagnostics.",badge:"EV & Power"},{period:"2025",title:"Cyber Security: Cyber Awareness Workshop",institution:"Tech Summit 2025",type:"Workshop",description:"Covered enterprise network security, encryption protocols, defense-in-depth, and secure coding practices.",badge:"Security"}]},s1=({activeSection:t,onNavigate:e,onToggleRaya:n})=>{const i=[{id:"home",label:"Home",icon:Xy},{id:"about",label:"About",icon:n1},{id:"skills",label:"Skills",icon:Jf},{id:"projects",label:"Projects",icon:ax},{id:"experience",label:"Experience",icon:rx},{id:"contact",label:"Contact",icon:ud}];return g.jsxs("aside",{className:"w-full lg:w-64 flex flex-col justify-between p-4 lg:p-6 bg-[#0f0b18]/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-purple-500/15 select-none z-30 lg:min-h-full",children:[g.jsxs("div",{className:"flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-4",children:[g.jsxs("div",{onClick:()=>e("home"),className:"group cursor-pointer flex items-center gap-3",children:[g.jsx("div",{className:"relative w-12 h-12 rounded-2xl bg-gradient-to-b from-[#7e22ce] via-[#6b21a8] to-[#3b0764] p-0.5 shadow-[0_10px_25px_rgba(147,51,234,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform group-hover:scale-105 group-active:scale-95 flex items-center justify-center",children:g.jsx("div",{className:"w-full h-full rounded-[14px] bg-[#1a0f2e] flex items-center justify-center border border-purple-400/30",children:g.jsx("span",{className:"font-black text-2xl bg-gradient-to-b from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(168,85,247,0.8)]",children:"R"})})}),g.jsxs("div",{className:"hidden lg:block",children:[g.jsx("h1",{className:"text-sm font-bold text-white tracking-wide",children:"Ratnesh Singh"}),g.jsx("p",{className:"text-[11px] font-mono text-purple-400",children:"ECE • Full-Stack • AI"})]})]}),g.jsxs("button",{onClick:n,className:"lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono",children:[g.jsx(Nl,{size:14,className:"animate-pulse text-purple-400"}),g.jsx("span",{children:"Ask Raya AI"})]})]}),g.jsx("nav",{className:"my-4 lg:my-8 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none",children:i.map(r=>{const s=r.icon,a=t===r.id;return g.jsxs("button",{onClick:()=>e(r.id),className:`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${a?"bg-gradient-to-r from-purple-900/60 to-purple-950/30 text-purple-200 border border-purple-500/40 shadow-[0_4px_16px_rgba(147,51,234,0.25)]":"text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"}`,children:[a&&g.jsx("span",{className:"hidden lg:block absolute left-0 top-2 bottom-2 w-1 bg-purple-500 rounded-r-full shadow-[0_0_8px_#a855f7]"}),g.jsx(s,{size:18,className:`transition-transform duration-300 group-hover:scale-110 ${a?"text-purple-400":"text-slate-400 group-hover:text-purple-300"}`}),g.jsx("span",{children:r.label})]},r.id)})}),g.jsxs("div",{className:"pt-4 border-t border-purple-500/10 hidden lg:flex flex-col gap-4",children:[g.jsxs("button",{onClick:n,className:"w-full group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-500/20 hover:border-purple-400/50 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] active:scale-98",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx("div",{className:"w-7 h-7 rounded-lg bg-purple-900/60 flex items-center justify-center border border-purple-400/30",children:g.jsx(Nl,{size:15,className:"text-purple-300 group-hover:rotate-12 transition-transform"})}),g.jsxs("div",{className:"text-left",children:[g.jsx("div",{className:"text-xs font-semibold text-purple-200",children:"Raya AI"}),g.jsx("div",{className:"text-[10px] text-purple-400/80 font-mono",children:"Portfolio Companion"})]})]}),g.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-pulse"})]}),g.jsxs("div",{className:"flex items-center justify-start gap-4 px-1 text-slate-400",children:[g.jsx("a",{href:pt.github,target:"_blank",rel:"noreferrer",className:"hover:text-purple-300 hover:scale-110 transition-all",title:"GitHub Profile",children:g.jsx(ic,{size:18})}),g.jsx("a",{href:pt.linkedin,target:"_blank",rel:"noreferrer",className:"hover:text-purple-300 hover:scale-110 transition-all",title:"LinkedIn Profile",children:g.jsx(ox,{size:18})}),g.jsx("a",{href:pt.twitter,target:"_blank",rel:"noreferrer",className:"hover:text-purple-300 hover:scale-110 transition-all",title:"Twitter / X",children:g.jsx(ux,{size:18})}),g.jsx("a",{href:`mailto:${pt.email}`,className:"hover:text-purple-300 hover:scale-110 transition-all",title:"Direct Email",children:g.jsx(ud,{size:18})})]})]})]})},a1=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,zp=1920*1080*4;class o1{constructor(e,n,i,r,s=0,a=0,o=2,l=zp,c=[]){Ce(this,"parentElement");Ce(this,"canvasElement");Ce(this,"gl");Ce(this,"program",null);Ce(this,"uniformLocations",{});Ce(this,"fragmentShader");Ce(this,"rafId",null);Ce(this,"lastRenderTime",0);Ce(this,"currentFrame",0);Ce(this,"speed",0);Ce(this,"currentSpeed",0);Ce(this,"providedUniforms");Ce(this,"mipmaps",[]);Ce(this,"hasBeenDisposed",!1);Ce(this,"resolutionChanged",!0);Ce(this,"textures",new Map);Ce(this,"minPixelRatio");Ce(this,"maxPixelCount");Ce(this,"isSafari",u1());Ce(this,"uniformCache",{});Ce(this,"textureUnitMap",new Map);Ce(this,"ownerDocument");Ce(this,"initProgram",()=>{const e=l1(this.gl,a1,this.fragmentShader);e&&(this.program=e)});Ce(this,"setupPositionAttribute",()=>{const e=this.gl.getAttribLocation(this.program,"a_position"),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n);const i=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(i),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});Ce(this,"setupUniforms",()=>{const e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([n,i])=>{if(e[n]=this.gl.getUniformLocation(this.program,n),i instanceof HTMLImageElement){const r=`${n}AspectRatio`;e[r]=this.gl.getUniformLocation(this.program,r)}}),this.uniformLocations=e});Ce(this,"renderScale",1);Ce(this,"parentWidth",0);Ce(this,"parentHeight",0);Ce(this,"parentDevicePixelWidth",0);Ce(this,"parentDevicePixelHeight",0);Ce(this,"devicePixelsSupported",!1);Ce(this,"intersectionObserver",null);Ce(this,"isInViewport",!0);Ce(this,"resizeObserver",null);Ce(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var n;if(e!=null&&e.borderBoxSize[0]){const i=(n=e.devicePixelContentBoxSize)==null?void 0:n[0];i!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=i.inlineSize,this.parentDevicePixelHeight=i.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});Ce(this,"setupIntersectionObserver",()=>{const e=this.ownerDocument.defaultView;e!=null&&e.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([n])=>{this.isInViewport=(n==null?void 0:n.isIntersecting)??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))});Ce(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});Ce(this,"handleResize",()=>{let e=0,n=0;const i=Math.max(1,window.devicePixelRatio),r=(visualViewport==null?void 0:visualViewport.scale)??1;if(this.devicePixelsSupported){const f=Math.max(1,this.minPixelRatio/i);e=this.parentDevicePixelWidth*f*r,n=this.parentDevicePixelHeight*f*r}else{let f=Math.max(i,this.minPixelRatio)*r;if(this.isSafari){const h=d1(this.ownerDocument);f*=Math.max(1,h)}e=Math.round(this.parentWidth)*f,n=Math.round(this.parentHeight)*f}const s=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*n),a=Math.min(1,s),o=Math.round(e*a),l=Math.round(n*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==l||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=l,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});Ce(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}const n=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=n*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});Ce(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});Ce(this,"setTextureUniform",(e,n)=>{if(!n.complete||n.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);const i=this.textures.get(e);i&&this.gl.deleteTexture(i),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);const r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);const s=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,n),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));const a=this.gl.getError();if(a!==this.gl.NO_ERROR||s===null){console.error("Paper Shaders: WebGL error when uploading texture:",a);return}this.textures.set(e,s);const o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);const l=`${e}AspectRatio`,c=this.uniformLocations[l];if(c){const f=n.naturalWidth/n.naturalHeight;this.gl.uniform1f(c,f)}}});Ce(this,"areUniformValuesEqual",(e,n)=>e===n?!0:Array.isArray(e)&&Array.isArray(n)&&e.length===n.length?e.every((i,r)=>this.areUniformValuesEqual(i,n[r])):!1);Ce(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([n,i])=>{let r=i;if(i instanceof HTMLImageElement&&(r=`${i.src.slice(0,200)}|${i.naturalWidth}x${i.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[n],r))return;this.uniformCache[n]=r;const s=this.uniformLocations[n];if(!s){console.warn(`Uniform location for ${n} not found`);return}if(i instanceof HTMLImageElement)this.setTextureUniform(n,i);else if(Array.isArray(i)){let a=null,o=null;if(i[0]!==void 0&&Array.isArray(i[0])){const l=i[0].length;if(i.every(c=>c.length===l))a=i.flat(),o=l;else{console.warn(`All child arrays must be the same length for ${n}`);return}}else a=i,o=a.length;switch(o){case 2:this.gl.uniform2fv(s,a);break;case 3:this.gl.uniform3fv(s,a);break;case 4:this.gl.uniform4fv(s,a);break;case 9:this.gl.uniformMatrix3fv(s,!1,a);break;case 16:this.gl.uniformMatrix4fv(s,!1,a);break;default:console.warn(`Unsupported uniform array length: ${o}`)}}else typeof i=="number"?this.gl.uniform1f(s,i):typeof i=="boolean"?this.gl.uniform1i(s,i?1:0):console.warn(`Unsupported uniform type for ${n}: ${typeof i}`)})});Ce(this,"getCurrentFrame",()=>this.currentFrame);Ce(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});Ce(this,"setSpeed",(e=1)=>{this.speed=e,this.updateCurrentSpeed()});Ce(this,"updateCurrentSpeed",()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)});Ce(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});Ce(this,"setMaxPixelCount",(e=zp)=>{this.maxPixelCount=e,this.handleResize()});Ce(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});Ce(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});Ce(this,"handleDocumentVisibilityChange",()=>{this.updateCurrentSpeed()});Ce(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if((e==null?void 0:e.nodeType)===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){const d=this.ownerDocument.createElement("style");d.innerHTML=c1,d.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(d)}const f=this.ownerDocument.createElement("canvas");this.canvasElement=f,this.parentElement.prepend(f),this.fragmentShader=n,this.providedUniforms=i,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=l;const h=f.getContext("webgl2",r);if(!h)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=h,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(s),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}}function Vp(t,e,n){const i=t.createShader(e);return i?(t.shaderSource(i,n),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)?i:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(i)),t.deleteShader(i),null)):null}function l1(t,e,n){const i=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),r=i?i.precision:null;r&&r<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));const s=Vp(t,t.VERTEX_SHADER,e),a=Vp(t,t.FRAGMENT_SHADER,n);if(!s||!a)return null;const o=t.createProgram();return o?(t.attachShader(o,s),t.attachShader(o,a),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.detachShader(o,s),t.detachShader(o,a),t.deleteShader(s),t.deleteShader(a),o):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(o)),t.deleteProgram(o),t.deleteShader(s),t.deleteShader(a),null)):null}const c1=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function u1(){const t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function d1(t){const e=(visualViewport==null?void 0:visualViewport.scale)??1,n=(visualViewport==null?void 0:visualViewport.width)??window.innerWidth,i=window.innerWidth-t.documentElement.clientWidth,r=e*n+i,s=outerWidth/r,a=Math.round(100*s);return a%5===0?a/100:a===33?1/3:a===67?2/3:a===133?4/3:s}const f1=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,h1=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,p1=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,m1=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,g1=`#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform vec2 u_resolution;
uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorTint;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_angle;

uniform float u_shape;
uniform bool u_isImage;

in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_imageUV;

out vec4 fragColor;

${f1}
${h1}
${m1}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {

  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  if (u_isImage == true) {
    bump = smoothstep(.2, .8, bump);
  }
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));

  // Tint color is applied with color burn blending
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).r;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).r;

  return sum / norm;
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  vec2 uv = v_imageUV;
  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec4 img = textureGrad(u_image, uv, dudx, dudy);

  if (u_isImage == false) {
    uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
  }

  float cycleWidth = u_repetition;
  float edge = 0.;
  float contOffset = 1.;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = (-u_angle + 70.) * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  rotatedUV = vec2(
  rotatedUV.x * cosA - rotatedUV.y * sinA,
  rotatedUV.x * sinA + rotatedUV.y * cosA
  ) + vec2(.5);

  if (u_isImage == true) {
    float edgeRaw = img.r;
    edge = blurEdge3x3(u_image, uv, dudx, dudy, 6., edgeRaw);
    edge = pow(edge, 1.6);
    edge *= mix(0.0, 1.0, smoothstep(0.0, 0.4, u_contour));
  } else {
    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);

      uv = v_responsiveUV;
      if (ratio > 1.) {
        uv.y /= ratio;
      } else {
        uv.x *= ratio;
      }
      uv += .5;
      uv.y = 1. - uv.y;

      cycleWidth *= 2.;
      contOffset = 1.5;

    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * t));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;

      uv *= .8;
      cycleWidth *= 1.6;

    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    edge = mix(smoothstep(.9 - 2. * fwidth(edge), .9, edge), edge, smoothstep(0.0, 0.4, u_contour));

  }

  float opacity = 0.;
  if (u_isImage == true) {
    opacity = img.g;
    float frame = getImgFrame(v_imageUV, 0.);
    opacity *= frame;
  } else {
    opacity = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    if (u_shape < 2.) {
      edge = 1.2 * edge;
    } else if (u_shape < 5.) {
      edge = 1.8 * pow(edge, 1.5);
    }
  }

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;
  float diagTLtoBR = rotatedUV.x + rotatedUV.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);


  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  edge += (1. - edge) * u_distortion * noise;

  direction += diagBLtoTR;
  float contour = 0.;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - edge) * bump);

  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));

  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;


  float colorDispersion = (1. - bump);
  colorDispersion = clamp(colorDispersion, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;

  float dispersionBlue = colorDispersion;
  dispersionBlue *= 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = 0.;
  float rExtraBlur = 0.;
  float gExtraBlur = 0.;
  if (u_isImage == true) {
    float softness = 0.05 * u_softness;
    blur = softness + .5 * smoothstep(1., 10., u_repetition) * smoothstep(.0, 1., edge);
    float smallCanvasT = 1.0 - smoothstep(100., 500., min(u_resolution.x, u_resolution.y));
    blur += smallCanvasT * smoothstep(.0, 1., edge);
    rExtraBlur = softness * (0.05 + .1 * (u_shiftRed / 20.) * bump);
    gExtraBlur = softness * 0.05 / max(0.001, abs(1. - diagBLtoTR));
  } else {
    blur = u_softness / 15. + .3 * contour;
  }

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r) + rExtraBlur, bump, u_colorTint.r);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g) + gExtraBlur, bump, u_colorTint.g);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${p1}

  fragColor = vec4(color, opacity);
}
`;function x1({label:t="Get Started",onClick:e,viewMode:n="text"}){const[i,r]=Be.useState(!1),[s,a]=Be.useState(!1),[o,l]=Be.useState([]),c=Be.useRef(null),f=Be.useRef(null),h=Be.useRef(null),d=Be.useRef(0),p=Be.useMemo(()=>n==="icon"?{width:46,height:46,innerWidth:42,innerHeight:42,shaderWidth:46,shaderHeight:46}:{width:142,height:46,innerWidth:138,innerHeight:42,shaderWidth:142,shaderHeight:46},[n]);Be.useEffect(()=>{const u="shader-canvas-style-exploded";if(!document.getElementById(u)){const M=document.createElement("style");M.id=u,M.textContent=`
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `,document.head.appendChild(M)}return(async()=>{var M;try{c.current&&((M=f.current)!=null&&M.destroy&&f.current.destroy(),f.current=new o1(c.current,g1,{u_repetition:4,u_softness:.5,u_shiftRed:.3,u_shiftBlue:.3,u_distortion:0,u_contour:0,u_angle:45,u_scale:8,u_shape:1,u_offsetX:.1,u_offsetY:-.1},void 0,.6))}catch(S){console.error("[LiquidMetalButton] Shader initialization note:",S)}})(),()=>{var M;(M=f.current)!=null&&M.destroy&&(f.current.destroy(),f.current=null)}},[]);const _=()=>{var u,x;r(!0),(x=(u=f.current)==null?void 0:u.setSpeed)==null||x.call(u,1)},E=()=>{var u,x;r(!1),a(!1),(x=(u=f.current)==null?void 0:u.setSpeed)==null||x.call(u,.6)},m=u=>{var x;if((x=f.current)!=null&&x.setSpeed&&(f.current.setSpeed(2.4),setTimeout(()=>{var M,S,T,b;i?(S=(M=f.current)==null?void 0:M.setSpeed)==null||S.call(M,1):(b=(T=f.current)==null?void 0:T.setSpeed)==null||b.call(T,.6)},300)),h.current){const M=h.current.getBoundingClientRect(),S=u.clientX-M.left,T=u.clientY-M.top,b={x:S,y:T,id:d.current++};l(R=>[...R,b]),setTimeout(()=>{l(R=>R.filter(v=>v.id!==b.id))},600)}e==null||e()};return g.jsx("div",{className:"relative inline-block select-none",children:g.jsx("div",{style:{perspective:"1000px",perspectiveOrigin:"50% 50%"},children:g.jsxs("div",{style:{position:"relative",width:`${p.width}px`,height:`${p.height}px`,transformStyle:"preserve-3d",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",transform:"none"},children:[g.jsxs("div",{style:{position:"absolute",top:0,left:0,width:`${p.width}px`,height:`${p.height}px`,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",transformStyle:"preserve-3d",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, gap 0.4s ease",transform:"translateZ(20px)",zIndex:30,pointerEvents:"none"},children:[n==="icon"&&g.jsx(Fi,{size:16,style:{color:"#d8b4fe",filter:"drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.8))",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",transform:"scale(1)"}}),n==="text"&&g.jsx("span",{style:{fontSize:"14px",color:"#f3e8ff",fontWeight:600,textShadow:"0px 1px 3px rgba(0, 0, 0, 0.8)",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",transform:"scale(1)",whiteSpace:"nowrap"},children:t})]}),g.jsx("div",{style:{position:"absolute",top:0,left:0,width:`${p.width}px`,height:`${p.height}px`,transformStyle:"preserve-3d",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",transform:`translateZ(10px) ${s?"translateY(1px) scale(0.98)":"translateY(0) scale(1)"}`,zIndex:20},children:g.jsx("div",{style:{width:`${p.innerWidth}px`,height:`${p.innerHeight}px`,margin:"2px",borderRadius:"100px",background:"linear-gradient(180deg, #1e1330 0%, #0d0915 100%)",boxShadow:s?"inset 0px 2px 4px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(0, 0, 0, 0.4)":"none",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)"}})}),g.jsx("div",{style:{position:"absolute",top:0,left:0,width:`${p.width}px`,height:`${p.height}px`,transformStyle:"preserve-3d",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",transform:`translateZ(0px) ${s?"translateY(1px) scale(0.98)":"translateY(0) scale(1)"}`,zIndex:10},children:g.jsx("div",{style:{height:`${p.height}px`,width:`${p.width}px`,borderRadius:"100px",boxShadow:s?"0px 0px 0px 1px rgba(168, 85, 247, 0.4), 0px 1px 2px 0px rgba(0, 0, 0, 0.5)":i?"0px 0px 0px 1px rgba(168, 85, 247, 0.6), 0px 12px 20px 0px rgba(168, 85, 247, 0.25), 0px 4px 8px 0px rgba(0, 0, 0, 0.4)":"0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 8px 16px 0px rgba(0, 0, 0, 0.4)",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",background:"radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)"},children:g.jsx("div",{ref:c,className:"shader-container-exploded",style:{borderRadius:"100px",overflow:"hidden",position:"relative",width:`${p.shaderWidth}px`,maxWidth:`${p.shaderWidth}px`,height:`${p.shaderHeight}px`,transition:"width 0.4s ease, height 0.4s ease"}})})}),g.jsx("button",{ref:h,onClick:m,onMouseEnter:_,onMouseLeave:E,onMouseDown:()=>a(!0),onMouseUp:()=>a(!1),style:{position:"absolute",top:0,left:0,width:`${p.width}px`,height:`${p.height}px`,background:"transparent",border:"none",cursor:"pointer",outline:"none",zIndex:40,transformStyle:"preserve-3d",transform:"translateZ(25px)",transition:"all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",overflow:"hidden",borderRadius:"100px"},"aria-label":t,children:o.map(u=>g.jsx("span",{style:{position:"absolute",left:`${u.x}px`,top:`${u.y}px`,width:"20px",height:"20px",borderRadius:"50%",background:"radial-gradient(circle, rgba(216, 180, 254, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",pointerEvents:"none",animation:"ripple-animation 0.6s ease-out"}},u.id))})]})})})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nh="185",v1=0,Hp=1,_1=2,tl=1,fx=2,fa=3,fr=0,vn=1,Mi=2,Ai=0,bs=1,Gp=2,Wp=3,jp=4,y1=5,br=100,S1=101,M1=102,E1=103,w1=104,b1=200,T1=201,A1=202,R1=203,dd=204,fd=205,C1=206,P1=207,N1=208,L1=209,I1=210,D1=211,U1=212,F1=213,k1=214,hd=0,pd=1,md=2,Fs=3,gd=4,xd=5,vd=6,_d=7,hx=0,O1=1,B1=2,di=0,px=1,mx=2,gx=3,xx=4,vx=5,_x=6,yx=7,Sx=300,Br=301,ks=302,kc=303,Oc=304,rc=306,yd=1e3,bi=1001,Sd=1002,jt=1003,z1=1004,_o=1005,tn=1006,Bc=1007,Pr=1008,wn=1009,Mx=1010,Ex=1011,Ha=1012,ih=1013,hi=1014,oi=1015,Ii=1016,rh=1017,sh=1018,Ga=1020,wx=35902,bx=35899,Tx=1021,Ax=1022,Yn=1023,Di=1026,Nr=1027,Rx=1028,ah=1029,zr=1030,oh=1031,lh=1033,nl=33776,il=33777,rl=33778,sl=33779,Md=35840,Ed=35841,wd=35842,bd=35843,Td=36196,Ad=37492,Rd=37496,Cd=37488,Pd=37489,Il=37490,Nd=37491,Ld=37808,Id=37809,Dd=37810,Ud=37811,Fd=37812,kd=37813,Od=37814,Bd=37815,zd=37816,Vd=37817,Hd=37818,Gd=37819,Wd=37820,jd=37821,Xd=36492,Yd=36494,qd=36495,$d=36283,Kd=36284,Dl=36285,Zd=36286,V1=3200,Jd=0,H1=1,Zi="",Ln="srgb",Ul="srgb-linear",Fl="linear",rt="srgb",Yr=7680,Xp=519,G1=512,W1=513,j1=514,ch=515,X1=516,Y1=517,uh=518,q1=519,Yp=35044,qp="300 es",li=2e3,Wa=2001;function $1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function kl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function K1(){const t=kl("canvas");return t.style.display="block",t}const $p={};function Kp(...t){const e="THREE."+t.shift();console.log(e,...t)}function Cx(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ie(...t){t=Cx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function et(...t){t=Cx(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Ts(...t){const e=t.join(" ");e in $p||($p[e]=!0,Ie(...t))}function Z1(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const J1={[hd]:pd,[md]:vd,[gd]:_d,[Fs]:xd,[pd]:hd,[vd]:md,[_d]:gd,[xd]:Fs};class Gr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zc=Math.PI/180,Qd=180/Math.PI;function Ka(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Jt[t&255]+Jt[t>>8&255]+Jt[t>>16&255]+Jt[t>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[n&63|128]+Jt[n>>8&255]+"-"+Jt[n>>16&255]+Jt[n>>24&255]+Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]).toLowerCase()}function qe(t,e,n){return Math.max(e,Math.min(n,t))}function Q1(t,e){return(t%e+e)%e}function Vc(t,e,n){return(1-n)*t+n*e}function ea(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const gh=class gh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gh.prototype.isVector2=!0;let Xe=gh;class Gs{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3],d=s[a+0],p=s[a+1],_=s[a+2],E=s[a+3];if(h!==E||l!==d||c!==p||f!==_){let m=l*d+c*p+f*_+h*E;m<0&&(d=-d,p=-p,_=-_,E=-E,m=-m);let u=1-o;if(m<.9995){const x=Math.acos(m),M=Math.sin(x);u=Math.sin(u*x)/M,o=Math.sin(o*x)/M,l=l*u+d*o,c=c*u+p*o,f=f*u+_*o,h=h*u+E*o}else{l=l*u+d*o,c=c*u+p*o,f=f*u+_*o,h=h*u+E*o;const x=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=x,c*=x,f*=x,h*=x}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[a],d=s[a+1],p=s[a+2],_=s[a+3];return e[n]=o*_+f*h+l*p-c*d,e[n+1]=l*_+f*d+c*h-o*p,e[n+2]=c*_+f*p+o*d-l*h,e[n+3]=f*_-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),h=o(s/2),d=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=d*f*h+c*p*_,this._y=c*p*h-d*f*_,this._z=c*f*_+d*p*h,this._w=c*f*h-d*p*_;break;case"YXZ":this._x=d*f*h+c*p*_,this._y=c*p*h-d*f*_,this._z=c*f*_-d*p*h,this._w=c*f*h+d*p*_;break;case"ZXY":this._x=d*f*h-c*p*_,this._y=c*p*h+d*f*_,this._z=c*f*_+d*p*h,this._w=c*f*h-d*p*_;break;case"ZYX":this._x=d*f*h-c*p*_,this._y=c*p*h+d*f*_,this._z=c*f*_-d*p*h,this._w=c*f*h+d*p*_;break;case"YZX":this._x=d*f*h+c*p*_,this._y=c*p*h+d*f*_,this._z=c*f*_-d*p*h,this._w=c*f*h-d*p*_;break;case"XZY":this._x=d*f*h-c*p*_,this._y=c*p*h-d*f*_,this._z=c*f*_+d*p*h,this._w=c*f*h+d*p*_;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],f=n[6],h=n[10],d=i+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const xh=class xh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Zp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Zp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*f,this.y=i+l*f+o*c-s*h,this.z=r+l*h+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Hc.copy(this).projectOnVector(e),this.sub(Hc)}reflect(e){return this.sub(Hc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xh.prototype.isVector3=!0;let B=xh;const Hc=new B,Zp=new Gs,vh=class vh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],d=i[2],p=i[5],_=i[8],E=r[0],m=r[3],u=r[6],x=r[1],M=r[4],S=r[7],T=r[2],b=r[5],R=r[8];return s[0]=a*E+o*x+l*T,s[3]=a*m+o*M+l*b,s[6]=a*u+o*S+l*R,s[1]=c*E+f*x+h*T,s[4]=c*m+f*M+h*b,s[7]=c*u+f*S+h*R,s[2]=d*E+p*x+_*T,s[5]=d*m+p*M+_*b,s[8]=d*u+p*S+_*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*a*f-n*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*a-o*c,d=o*l-f*s,p=c*s-a*l,_=n*h+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=h*E,e[1]=(r*c-f*i)*E,e[2]=(o*i-r*a)*E,e[3]=d*E,e[4]=(f*n-r*l)*E,e[5]=(r*s-o*n)*E,e[6]=p*E,e[7]=(i*l-c*n)*E,e[8]=(a*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Ts("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Gc.makeScale(e,n)),this}rotate(e){return Ts("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Gc.makeRotation(-e)),this}translate(e,n){return Ts("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Gc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vh.prototype.isMatrix3=!0;let Ue=vh;const Gc=new Ue,Jp=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qp=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eS(){const t={enabled:!0,workingColorSpace:Ul,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=Ri(r.r),r.g=Ri(r.g),r.b=Ri(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=As(r.r),r.g=As(r.g),r.b=As(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zi?Fl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ul]:{primaries:e,whitePoint:i,transfer:Fl,toXYZ:Jp,fromXYZ:Qp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ln},outputColorSpaceConfig:{drawingBufferColorSpace:Ln}},[Ln]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Jp,fromXYZ:Qp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ln}}}),t}const $e=eS();function Ri(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function As(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let qr;class tS{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{qr===void 0&&(qr=kl("canvas")),qr.width=e.width,qr.height=e.height;const r=qr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=qr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=kl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ri(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ri(n[i]/255)*255):n[i]=Ri(n[i]);return{data:n,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nS=0;class dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nS++}),this.uuid=Ka(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Wc(r[a].image)):s.push(Wc(r[a]))}else s=Wc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Wc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?tS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let iS=0;const jc=new B;class on extends Gr{constructor(e=on.DEFAULT_IMAGE,n=on.DEFAULT_MAPPING,i=bi,r=bi,s=tn,a=Pr,o=Yn,l=wn,c=on.DEFAULT_ANISOTROPY,f=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:iS++}),this.uuid=Ka(),this.name="",this.source=new dh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jc).x}get height(){return this.source.getSize(jc).y}get depth(){return this.source.getSize(jc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ie(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ie(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yd:e.x=e.x-Math.floor(e.x);break;case bi:e.x=e.x<0?0:1;break;case Sd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yd:e.y=e.y-Math.floor(e.y);break;case bi:e.y=e.y<0?0:1;break;case Sd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Sx;on.DEFAULT_ANISOTROPY=1;const _h=class _h{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],d=l[1],p=l[5],_=l[9],E=l[2],m=l[6],u=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-E)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+E)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,S=(p+1)/2,T=(u+1)/2,b=(f+d)/4,R=(h+E)/4,v=(_+m)/4;return M>S&&M>T?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=b/i,s=R/i):S>T?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=b/r,s=v/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=R/s,r=v/s),this.set(i,r,s,n),this}let x=Math.sqrt((m-_)*(m-_)+(h-E)*(h-E)+(d-f)*(d-f));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(h-E)/x,this.z=(d-f)/x,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this.w=qe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this.w=qe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_h.prototype.isVector4=!0;let _t=_h;class rS extends Gr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new _t(0,0,e,n),this.scissorTest=!1,this.viewport=new _t(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new on(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new dh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends rS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Px extends on{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class sS extends on{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const zl=class zl{constructor(e,n,i,r,s,a,o,l,c,f,h,d,p,_,E,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,f,h,d,p,_,E,m)}set(e,n,i,r,s,a,o,l,c,f,h,d,p,_,E,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=f,u[10]=h,u[14]=d,u[3]=p,u[7]=_,u[11]=E,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zl().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/$r.setFromMatrixColumn(e,0).length(),s=1/$r.setFromMatrixColumn(e,1).length(),a=1/$r.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*f,p=a*h,_=o*f,E=o*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+_*c,n[5]=d-E*c,n[9]=-o*l,n[2]=E-d*c,n[6]=_+p*c,n[10]=a*l}else if(e.order==="YXZ"){const d=l*f,p=l*h,_=c*f,E=c*h;n[0]=d+E*o,n[4]=_*o-p,n[8]=a*c,n[1]=a*h,n[5]=a*f,n[9]=-o,n[2]=p*o-_,n[6]=E+d*o,n[10]=a*l}else if(e.order==="ZXY"){const d=l*f,p=l*h,_=c*f,E=c*h;n[0]=d-E*o,n[4]=-a*h,n[8]=_+p*o,n[1]=p+_*o,n[5]=a*f,n[9]=E-d*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const d=a*f,p=a*h,_=o*f,E=o*h;n[0]=l*f,n[4]=_*c-p,n[8]=d*c+E,n[1]=l*h,n[5]=E*c+d,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,_=o*l,E=o*c;n[0]=l*f,n[4]=E-d*h,n[8]=_*h+p,n[1]=h,n[5]=a*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*h+_,n[10]=d-E*h}else if(e.order==="XZY"){const d=a*l,p=a*c,_=o*l,E=o*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=d*h+E,n[5]=a*f,n[9]=p*h-_,n[2]=_*h-p,n[6]=o*f,n[10]=E*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(aS,e,oS)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Vi.crossVectors(i,yn),Vi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Vi.crossVectors(i,yn)),Vi.normalize(),yo.crossVectors(yn,Vi),r[0]=Vi.x,r[4]=yo.x,r[8]=yn.x,r[1]=Vi.y,r[5]=yo.y,r[9]=yn.y,r[2]=Vi.z,r[6]=yo.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],d=i[9],p=i[13],_=i[2],E=i[6],m=i[10],u=i[14],x=i[3],M=i[7],S=i[11],T=i[15],b=r[0],R=r[4],v=r[8],A=r[12],P=r[1],N=r[5],U=r[9],j=r[13],Z=r[2],O=r[6],Y=r[10],H=r[14],F=r[3],X=r[7],J=r[11],ne=r[15];return s[0]=a*b+o*P+l*Z+c*F,s[4]=a*R+o*N+l*O+c*X,s[8]=a*v+o*U+l*Y+c*J,s[12]=a*A+o*j+l*H+c*ne,s[1]=f*b+h*P+d*Z+p*F,s[5]=f*R+h*N+d*O+p*X,s[9]=f*v+h*U+d*Y+p*J,s[13]=f*A+h*j+d*H+p*ne,s[2]=_*b+E*P+m*Z+u*F,s[6]=_*R+E*N+m*O+u*X,s[10]=_*v+E*U+m*Y+u*J,s[14]=_*A+E*j+m*H+u*ne,s[3]=x*b+M*P+S*Z+T*F,s[7]=x*R+M*N+S*O+T*X,s[11]=x*v+M*U+S*Y+T*J,s[15]=x*A+M*j+S*H+T*ne,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],d=e[10],p=e[14],_=e[3],E=e[7],m=e[11],u=e[15],x=l*p-c*d,M=o*p-c*h,S=o*d-l*h,T=a*p-c*f,b=a*d-l*f,R=a*h-o*f;return n*(E*x-m*M+u*S)-i*(_*x-m*T+u*b)+r*(_*M-E*T+u*R)-s*(_*S-E*b+m*R)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],d=e[10],p=e[11],_=e[12],E=e[13],m=e[14],u=e[15],x=n*o-i*a,M=n*l-r*a,S=n*c-s*a,T=i*l-r*o,b=i*c-s*o,R=r*c-s*l,v=f*E-h*_,A=f*m-d*_,P=f*u-p*_,N=h*m-d*E,U=h*u-p*E,j=d*u-p*m,Z=x*j-M*U+S*N+T*P-b*A+R*v;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/Z;return e[0]=(o*j-l*U+c*N)*O,e[1]=(r*U-i*j-s*N)*O,e[2]=(E*R-m*b+u*T)*O,e[3]=(d*b-h*R-p*T)*O,e[4]=(l*P-a*j-c*A)*O,e[5]=(n*j-r*P+s*A)*O,e[6]=(m*S-_*R-u*M)*O,e[7]=(f*R-d*S+p*M)*O,e[8]=(a*U-o*P+c*v)*O,e[9]=(i*P-n*U-s*v)*O,e[10]=(_*b-E*S+u*x)*O,e[11]=(h*S-f*b-p*x)*O,e[12]=(o*A-a*N-l*v)*O,e[13]=(n*N-i*A+r*v)*O,e[14]=(E*M-_*T-m*x)*O,e[15]=(f*T-h*M+d*x)*O,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,f=a+a,h=o+o,d=s*c,p=s*f,_=s*h,E=a*f,m=a*h,u=o*h,x=l*c,M=l*f,S=l*h,T=i.x,b=i.y,R=i.z;return r[0]=(1-(E+u))*T,r[1]=(p+S)*T,r[2]=(_-M)*T,r[3]=0,r[4]=(p-S)*b,r[5]=(1-(d+u))*b,r[6]=(m+x)*b,r[7]=0,r[8]=(_+M)*R,r[9]=(m-x)*R,r[10]=(1-(d+E))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=$r.set(r[0],r[1],r[2]).length();const o=$r.set(r[4],r[5],r[6]).length(),l=$r.set(r[8],r[9],r[10]).length();s<0&&(a=-a),zn.copy(this);const c=1/a,f=1/o,h=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=f,zn.elements[5]*=f,zn.elements[6]*=f,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,n.setFromRotationMatrix(zn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=li,l=!1){const c=this.elements,f=2*s/(n-e),h=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let _,E;if(l)_=s/(a-s),E=a*s/(a-s);else if(o===li)_=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===Wa)_=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=li,l=!1){const c=this.elements,f=2/(n-e),h=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,E;if(l)_=1/(a-s),E=a/(a-s);else if(o===li)_=-2/(a-s),E=-(a+s)/(a-s);else if(o===Wa)_=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};zl.prototype.isMatrix4=!0;let St=zl;const $r=new B,zn=new St,aS=new B(0,0,0),oS=new B(1,1,1),Vi=new B,yo=new B,yn=new B,em=new St,tm=new Gs;class hr{constructor(e=0,n=0,i=0,r=hr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return em.makeRotationFromQuaternion(e),this.setFromRotationMatrix(em,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return tm.setFromEuler(this),this.setFromQuaternion(tm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hr.DEFAULT_ORDER="XYZ";class Nx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lS=0;const nm=new B,Kr=new Gs,mi=new St,So=new B,ta=new B,cS=new B,uS=new Gs,im=new B(1,0,0),rm=new B(0,1,0),sm=new B(0,0,1),am={type:"added"},dS={type:"removed"},Zr={type:"childadded",child:null},Xc={type:"childremoved",child:null};class Yt extends Gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lS++}),this.uuid=Ka(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new B,n=new hr,i=new Gs,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ue}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Kr.setFromAxisAngle(e,n),this.quaternion.multiply(Kr),this}rotateOnWorldAxis(e,n){return Kr.setFromAxisAngle(e,n),this.quaternion.premultiply(Kr),this}rotateX(e){return this.rotateOnAxis(im,e)}rotateY(e){return this.rotateOnAxis(rm,e)}rotateZ(e){return this.rotateOnAxis(sm,e)}translateOnAxis(e,n){return nm.copy(e).applyQuaternion(this.quaternion),this.position.add(nm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(im,e)}translateY(e){return this.translateOnAxis(rm,e)}translateZ(e){return this.translateOnAxis(sm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?So.copy(e):So.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(ta,So,this.up):mi.lookAt(So,ta,this.up),this.quaternion.setFromRotationMatrix(mi),r&&(mi.extractRotation(r.matrixWorld),Kr.setFromRotationMatrix(mi),this.quaternion.premultiply(Kr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(am),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(dS),Xc.child=e,this.dispatchEvent(Xc),Xc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(am),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,e,cS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,uS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Yt.DEFAULT_UP=new B(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class er extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fS={type:"move"};class Yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new er,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new er,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new er,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const m=n.getJointPose(E,i),u=this._getHandJoint(c,E);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=f.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fS)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new er;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Lx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function qc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class je{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=$e.workingColorSpace){return this.r=e,this.g=n,this.b=i,$e.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=$e.workingColorSpace){if(e=Q1(e,1),n=qe(n,0,1),i=qe(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=qc(a,s,e+1/3),this.g=qc(a,s,e),this.b=qc(a,s,e-1/3)}return $e.colorSpaceToWorking(this,r),this}setStyle(e,n=Ln){function i(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ie("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ln){const i=Lx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ln){return $e.workingToColorSpace(Qt.copy(this),e),Math.round(qe(Qt.r*255,0,255))*65536+Math.round(qe(Qt.g*255,0,255))*256+Math.round(qe(Qt.b*255,0,255))}getHexString(e=Ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=$e.workingColorSpace){$e.workingToColorSpace(Qt.copy(this),n);const i=Qt.r,r=Qt.g,s=Qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=f<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=$e.workingColorSpace){return $e.workingToColorSpace(Qt.copy(this),n),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Ln){$e.workingToColorSpace(Qt.copy(this),e);const n=Qt.r,i=Qt.g,r=Qt.b;return e!==Ln?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(Mo);const i=Vc(Hi.h,Mo.h,n),r=Vc(Hi.s,Mo.s,n),s=Vc(Hi.l,Mo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new je;je.NAMES=Lx;class hS extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hr,this.environmentIntensity=1,this.environmentRotation=new hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Vn=new B,gi=new B,$c=new B,xi=new B,Jr=new B,Qr=new B,om=new B,Kc=new B,Zc=new B,Jc=new B,Qc=new _t,eu=new _t,tu=new _t;class Xn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Vn.subVectors(e,n),r.cross(Vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Vn.subVectors(r,n),gi.subVectors(i,n),$c.subVectors(e,n);const a=Vn.dot(Vn),o=Vn.dot(gi),l=Vn.dot($c),c=gi.dot(gi),f=gi.dot($c),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-o*f)*d,_=(a*f-o*l)*d;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Qc.setScalar(0),eu.setScalar(0),tu.setScalar(0),Qc.fromBufferAttribute(e,n),eu.fromBufferAttribute(e,i),tu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Qc,s.x),a.addScaledVector(eu,s.y),a.addScaledVector(tu,s.z),a}static isFrontFacing(e,n,i,r){return Vn.subVectors(i,n),gi.subVectors(e,n),Vn.cross(gi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Vn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Xn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Xn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Jr.subVectors(r,i),Qr.subVectors(s,i),Kc.subVectors(e,i);const l=Jr.dot(Kc),c=Qr.dot(Kc);if(l<=0&&c<=0)return n.copy(i);Zc.subVectors(e,r);const f=Jr.dot(Zc),h=Qr.dot(Zc);if(f>=0&&h<=f)return n.copy(r);const d=l*h-f*c;if(d<=0&&l>=0&&f<=0)return a=l/(l-f),n.copy(i).addScaledVector(Jr,a);Jc.subVectors(e,s);const p=Jr.dot(Jc),_=Qr.dot(Jc);if(_>=0&&p<=_)return n.copy(s);const E=p*c-l*_;if(E<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Qr,o);const m=f*_-p*h;if(m<=0&&h-f>=0&&p-_>=0)return om.subVectors(s,r),o=(h-f)/(h-f+(p-_)),n.copy(r).addScaledVector(om,o);const u=1/(m+E+d);return a=E*u,o=d*u,n.copy(i).addScaledVector(Jr,a).addScaledVector(Qr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Za{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(s,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Eo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Eo.copy(i.boundingBox)),Eo.applyMatrix4(e.matrixWorld),this.union(Eo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(na),wo.subVectors(this.max,na),es.subVectors(e.a,na),ts.subVectors(e.b,na),ns.subVectors(e.c,na),Gi.subVectors(ts,es),Wi.subVectors(ns,ts),vr.subVectors(es,ns);let n=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-vr.z,vr.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,vr.z,0,-vr.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-vr.y,vr.x,0];return!nu(n,es,ts,ns,wo)||(n=[1,0,0,0,1,0,0,0,1],!nu(n,es,ts,ns,wo))?!1:(bo.crossVectors(Gi,Wi),n=[bo.x,bo.y,bo.z],nu(n,es,ts,ns,wo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vi=[new B,new B,new B,new B,new B,new B,new B,new B],Hn=new B,Eo=new Za,es=new B,ts=new B,ns=new B,Gi=new B,Wi=new B,vr=new B,na=new B,wo=new B,bo=new B,_r=new B;function nu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){_r.fromArray(t,s);const o=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),l=e.dot(_r),c=n.dot(_r),f=i.dot(_r);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const Dt=new B,To=new Xe;let pS=0;class Kn extends Gr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pS++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Yp,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)To.fromBufferAttribute(this,n),To.applyMatrix3(e),this.setXY(n,To.x,To.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ea(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=fn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ea(n,this.array)),n}setX(e,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ea(n,this.array)),n}setY(e,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ea(n,this.array)),n}setZ(e,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ea(n,this.array)),n}setW(e,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),r=fn(r,this.array),s=fn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yp&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ix extends Kn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Dx extends Kn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Pt extends Kn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const mS=new Za,ia=new B,iu=new B;class sc{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):mS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ia.subVectors(e,this.center);const n=ia.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ia,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ia.copy(e.center).add(iu)),this.expandByPoint(ia.copy(e.center).sub(iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let gS=0;const Nn=new St,ru=new Yt,is=new B,Sn=new Za,ra=new Za,Vt=new B;class un extends Gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gS++}),this.uuid=Ka(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($1(e)?Dx:Ix)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ue().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return ru.lookAt(e),ru.updateMatrix(),this.applyMatrix4(ru.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Za);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];ra.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(Sn.min,ra.min),Sn.expandByPoint(Vt),Vt.addVectors(Sn.max,ra.max),Sn.expandByPoint(Vt)):(Sn.expandByPoint(ra.min),Sn.expandByPoint(ra.max))}Sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Vt.fromBufferAttribute(o,c),l&&(is.fromBufferAttribute(e,c),Vt.add(is)),r=Math.max(r,i.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Kn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new B,l[v]=new B;const c=new B,f=new B,h=new B,d=new Xe,p=new Xe,_=new Xe,E=new B,m=new B;function u(v,A,P){c.fromBufferAttribute(i,v),f.fromBufferAttribute(i,A),h.fromBufferAttribute(i,P),d.fromBufferAttribute(s,v),p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,P),f.sub(c),h.sub(c),p.sub(d),_.sub(d);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(E.copy(f).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(N),m.copy(h).multiplyScalar(p.x).addScaledVector(f,-_.x).multiplyScalar(N),o[v].add(E),o[A].add(E),o[P].add(E),l[v].add(m),l[A].add(m),l[P].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,A=x.length;v<A;++v){const P=x[v],N=P.start,U=P.count;for(let j=N,Z=N+U;j<Z;j+=3)u(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const M=new B,S=new B,T=new B,b=new B;function R(v){T.fromBufferAttribute(r,v),b.copy(T);const A=o[v];M.copy(A),M.sub(T.multiplyScalar(T.dot(A))).normalize(),S.crossVectors(b,A);const N=S.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,N)}for(let v=0,A=x.length;v<A;++v){const P=x[v],N=P.start,U=P.count;for(let j=N,Z=N+U;j<Z;j+=3)R(e.getX(j+0)),R(e.getX(j+1)),R(e.getX(j+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Kn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,f=new B,h=new B;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),E=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,m),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),a.fromBufferAttribute(n,d+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Vt.fromBufferAttribute(e,n),Vt.normalize(),e.setXYZ(n,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,d=new c.constructor(l.length*f);let p=0,_=0;for(let E=0,m=l.length;E<m;E++){o.isInterleavedBufferAttribute?p=l[E]*o.data.stride+o.offset:p=l[E]*f;for(let u=0;u<f;u++)d[_++]=c[p++]}return new Kn(d,f,h)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new un,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const d=c[f],p=e(d,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let d=0,p=h.length;d<p;d++)f.push(h[d].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let xS=0;class Ws extends Gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xS++}),this.uuid=Ka(),this.name="",this.type="Material",this.blending=bs,this.side=fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dd,this.blendDst=fd,this.blendEquation=br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yr,this.stencilZFail=Yr,this.stencilZPass=Yr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ie(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ie(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==fr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==dd&&(i.blendSrc=this.blendSrc),this.blendDst!==fd&&(i.blendDst=this.blendDst),this.blendEquation!==br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Xe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _i=new B,su=new B,Ao=new B,ji=new B,au=new B,Ro=new B,ou=new B;class Ux{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=_i.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,n),_i.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){su.copy(e).add(n).multiplyScalar(.5),Ao.copy(n).sub(e).normalize(),ji.copy(this.origin).sub(su);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Ao),o=ji.dot(this.direction),l=-ji.dot(Ao),c=ji.lengthSq(),f=Math.abs(1-a*a);let h,d,p,_;if(f>0)if(h=a*l-o,d=a*o-l,_=s*f,h>=0)if(d>=-_)if(d<=_){const E=1/f;h*=E,d*=E,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-_?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=_?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(su).addScaledVector(Ao,d),p}intersectSphere(e,n){_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),r=_i.dot(_i)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,n,i,r,s){au.subVectors(n,e),Ro.subVectors(i,e),ou.crossVectors(au,Ro);let a=this.direction.dot(ou),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(Ro.crossVectors(ji,Ro));if(l<0)return null;const c=o*this.direction.dot(au.cross(ji));if(c<0||l+c>a)return null;const f=-o*ji.dot(ou);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fx extends Ws{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.combine=hx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lm=new St,yr=new Ux,Co=new sc,cm=new B,Po=new B,No=new B,Lo=new B,lu=new B,Io=new B,um=new B,Do=new B;class Ut extends Yt{constructor(e=new un,n=new Fx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Io.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(lu.fromBufferAttribute(h,e),a?Io.addScaledVector(lu,f):Io.addScaledVector(lu.sub(n),f))}n.add(Io)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Co.copy(i.boundingSphere),Co.applyMatrix4(s),yr.copy(e.ray).recast(e.near),!(Co.containsPoint(yr.origin)===!1&&(yr.intersectSphere(Co,cm)===null||yr.origin.distanceToSquared(cm)>(e.far-e.near)**2))&&(lm.copy(s).invert(),yr.copy(e.ray).applyMatrix4(lm),!(i.boundingBox!==null&&yr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,yr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const m=d[_],u=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,T=M;S<T;S+=3){const b=o.getX(S),R=o.getX(S+1),v=o.getX(S+2);r=Uo(this,u,e,i,c,f,h,b,R,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let m=_,u=E;m<u;m+=3){const x=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);r=Uo(this,a,e,i,c,f,h,x,M,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const m=d[_],u=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,T=M;S<T;S+=3){const b=S,R=S+1,v=S+2;r=Uo(this,u,e,i,c,f,h,b,R,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let m=_,u=E;m<u;m+=3){const x=m,M=m+1,S=m+2;r=Uo(this,a,e,i,c,f,h,x,M,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function vS(t,e,n,i,r,s,a,o){let l;if(e.side===vn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===fr,o),l===null)return null;Do.copy(o),Do.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Do);return c<n.near||c>n.far?null:{distance:c,point:Do.clone(),object:t}}function Uo(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,Po),t.getVertexPosition(l,No),t.getVertexPosition(c,Lo);const f=vS(t,e,n,i,Po,No,Lo,um);if(f){const h=new B;Xn.getBarycoord(um,Po,No,Lo,h),r&&(f.uv=Xn.getInterpolatedAttribute(r,o,l,c,h,new Xe)),s&&(f.uv1=Xn.getInterpolatedAttribute(s,o,l,c,h,new Xe)),a&&(f.normal=Xn.getInterpolatedAttribute(a,o,l,c,h,new B),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new B,materialIndex:0};Xn.getNormal(Po,No,Lo,d.normal),f.face=d,f.barycoord=h}return f}class _S extends on{constructor(e=null,n=1,i=1,r,s,a,o,l,c=jt,f=jt,h,d){super(null,a,o,l,c,f,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cu=new B,yS=new B,SS=new Ue;class wr{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=cu.subVectors(i,n).cross(yS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(cu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||SS.getNormalMatrix(e),r=this.coplanarPoint(cu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new sc,MS=new Xe(.5,.5),Fo=new B;class fh{constructor(e=new wr,n=new wr,i=new wr,r=new wr,s=new wr,a=new wr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=li,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],d=s[6],p=s[7],_=s[8],E=s[9],m=s[10],u=s[11],x=s[12],M=s[13],S=s[14],T=s[15];if(r[0].setComponents(c-a,p-f,u-_,T-x).normalize(),r[1].setComponents(c+a,p+f,u+_,T+x).normalize(),r[2].setComponents(c+o,p+h,u+E,T+M).normalize(),r[3].setComponents(c-o,p-h,u-E,T-M).normalize(),i)r[4].setComponents(l,d,m,S).normalize(),r[5].setComponents(c-l,p-d,u-m,T-S).normalize();else if(r[4].setComponents(c-l,p-d,u-m,T-S).normalize(),n===li)r[5].setComponents(c+l,p+d,u+m,T+S).normalize();else if(n===Wa)r[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){Sr.center.set(0,0,0);const n=MS.distanceTo(e.center);return Sr.radius=.7071067811865476+n,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Fo.x=r.normal.x>0?e.max.x:e.min.x,Fo.y=r.normal.y>0?e.max.y:e.min.y,Fo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class kx extends Ws{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dm=new St,ef=new Ux,ko=new sc,Oo=new B;class ES extends Yt{constructor(e=new un,n=new kx){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(r),ko.radius+=s,e.ray.intersectsSphere(ko)===!1)return;dm.copy(r).invert(),ef.copy(e.ray).applyMatrix4(dm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=d,E=p;_<E;_++){const m=c.getX(_);Oo.fromBufferAttribute(h,m),fm(Oo,m,l,r,e,n,this)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=d,E=p;_<E;_++)Oo.fromBufferAttribute(h,_),fm(Oo,_,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function fm(t,e,n,i,r,s,a){const o=ef.distanceSqToPoint(t);if(o<n){const l=new B;ef.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ox extends on{constructor(e=[],n=Br,i,r,s,a,o,l,c,f){super(e,n,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Os extends on{constructor(e,n,i=hi,r,s,a,o=jt,l=jt,c,f=Di,h=1){if(f!==Di&&f!==Nr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:h};super(d,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class wS extends Os{constructor(e,n=hi,i=Br,r,s,a=jt,o=jt,l,c=Di){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,n,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bx extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ja extends un{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(h,2));function _(E,m,u,x,M,S,T,b,R,v,A){const P=S/R,N=T/v,U=S/2,j=T/2,Z=b/2,O=R+1,Y=v+1;let H=0,F=0;const X=new B;for(let J=0;J<Y;J++){const ne=J*N-j;for(let ae=0;ae<O;ae++){const ze=ae*P-U;X[E]=ze*x,X[m]=ne*M,X[u]=Z,c.push(X.x,X.y,X.z),X[E]=0,X[m]=0,X[u]=b>0?1:-1,f.push(X.x,X.y,X.z),h.push(ae/R),h.push(1-J/v),H+=1}}for(let J=0;J<v;J++)for(let ne=0;ne<R;ne++){const ae=d+ne+O*J,ze=d+ne+O*(J+1),Je=d+(ne+1)+O*(J+1),We=d+(ne+1)+O*J;l.push(ae,ze,We),l.push(ze,Je,We),F+=6}o.addGroup(p,F,A),p+=F,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ol extends un{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],a=[],o=[],l=[],c=new B,f=new Xe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=n;h++,d+=3){const p=i+h/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),f.x=(a[d]/e+1)/2,f.y=(a[d+1]/e+1)/2,l.push(f.x,f.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(o,3)),this.setAttribute("uv",new Pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ol(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rs extends un{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],h=[],d=[],p=[];let _=0;const E=[],m=i/2;let u=0;x(),a===!1&&(e>0&&M(!0),n>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new Pt(h,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(p,2));function x(){const S=new B,T=new B;let b=0;const R=(n-e)/i;for(let v=0;v<=s;v++){const A=[],P=v/s,N=P*(n-e)+e;for(let U=0;U<=r;U++){const j=U/r,Z=j*l+o,O=Math.sin(Z),Y=Math.cos(Z);T.x=N*O,T.y=-P*i+m,T.z=N*Y,h.push(T.x,T.y,T.z),S.set(O,R,Y).normalize(),d.push(S.x,S.y,S.z),p.push(j,1-P),A.push(_++)}E.push(A)}for(let v=0;v<r;v++)for(let A=0;A<s;A++){const P=E[A][v],N=E[A+1][v],U=E[A+1][v+1],j=E[A][v+1];(e>0||A!==0)&&(f.push(P,N,j),b+=3),(n>0||A!==s-1)&&(f.push(N,U,j),b+=3)}c.addGroup(u,b,0),u+=b}function M(S){const T=_,b=new Xe,R=new B;let v=0;const A=S===!0?e:n,P=S===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,m*P,0),d.push(0,P,0),p.push(.5,.5),_++;const N=_;for(let U=0;U<=r;U++){const Z=U/r*l+o,O=Math.cos(Z),Y=Math.sin(Z);R.x=A*Y,R.y=m*P,R.z=A*O,h.push(R.x,R.y,R.z),d.push(0,P,0),b.x=O*.5+.5,b.y=Y*.5*P+.5,p.push(b.x,b.y),_++}for(let U=0;U<r;U++){const j=T+U,Z=N+U;S===!0?f.push(Z,Z+1,j):f.push(Z+1,Z,j),v+=3}c.addGroup(u,v,S===!0?1:2),u+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hh extends Rs{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new hh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ac extends un{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,h=e/o,d=n/l,p=[],_=[],E=[],m=[];for(let u=0;u<f;u++){const x=u*d-a;for(let M=0;M<c;M++){const S=M*h-s;_.push(S,-x,0),E.push(0,0,1),m.push(M/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<o;x++){const M=x+c*u,S=x+c*(u+1),T=x+1+c*(u+1),b=x+1+c*u;p.push(M,S,b),p.push(S,T,b)}this.setIndex(p),this.setAttribute("position",new Pt(_,3)),this.setAttribute("normal",new Pt(E,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.width,e.height,e.widthSegments,e.heightSegments)}}class Bl extends un{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const f=[],h=new B,d=new B,p=[],_=[],E=[],m=[];for(let u=0;u<=i;u++){const x=[],M=u/i,S=a+M*o,T=e*Math.cos(S),b=Math.sqrt(e*e-T*T);let R=0;u===0&&a===0?R=.5/n:u===i&&l===Math.PI&&(R=-.5/n);for(let v=0;v<=n;v++){const A=v/n,P=r+A*s;h.x=-b*Math.cos(P),h.y=T,h.z=b*Math.sin(P),_.push(h.x,h.y,h.z),d.copy(h).normalize(),E.push(d.x,d.y,d.z),m.push(A+R,1-M),x.push(c++)}f.push(x)}for(let u=0;u<i;u++)for(let x=0;x<n;x++){const M=f[u][x+1],S=f[u][x],T=f[u+1][x],b=f[u+1][x+1];(u!==0||a>0)&&p.push(M,S,b),(u!==i-1||l<Math.PI)&&p.push(S,T,b)}this.setIndex(p),this.setAttribute("position",new Pt(_,3)),this.setAttribute("normal",new Pt(E,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wa extends un{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const l=[],c=[],f=[],h=[],d=new B,p=new B,_=new B;for(let E=0;E<=i;E++){const m=a+E/i*o;for(let u=0;u<=r;u++){const x=u/r*s;p.x=(e+n*Math.cos(m))*Math.cos(x),p.y=(e+n*Math.cos(m))*Math.sin(x),p.z=n*Math.sin(m),c.push(p.x,p.y,p.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),_.subVectors(p,d).normalize(),f.push(_.x,_.y,_.z),h.push(u/r),h.push(E/i)}}for(let E=1;E<=i;E++)for(let m=1;m<=r;m++){const u=(r+1)*E+m-1,x=(r+1)*(E-1)+m-1,M=(r+1)*(E-1)+m,S=(r+1)*E+m;l.push(u,x,S),l.push(x,M,S)}this.setIndex(l),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(f,3)),this.setAttribute("uv",new Pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Bs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(hm(r))r.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(hm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function rn(t){const e={};for(let n=0;n<t.length;n++){const i=Bs(t[n]);for(const r in i)e[r]=i[r]}return e}function hm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function bS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function zx(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const TS={clone:Bs,merge:rn};var AS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Ws{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AS,this.fragmentShader=RS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=bS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new je().setHex(r.value);break;case"v2":this.uniforms[i].value=new Xe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new _t().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ue().fromArray(r.value);break;case"m4":this.uniforms[i].value=new St().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class CS extends pi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ha extends Ws{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jd,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class PS extends ha{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class NS extends Ws{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class LS extends Ws{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ph extends Yt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const uu=new St,pm=new B,mm=new B;class Vx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fh,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;pm.setFromMatrixPosition(e.matrixWorld),n.position.copy(pm),mm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(mm),n.updateMatrixWorld(),uu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uu,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===Wa||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(uu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Bo=new B,zo=new Gs,ni=new B;class Hx extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Bo,zo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,zo,ni.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Bo,zo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,zo,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new B,gm=new Xe,xm=new Xe;class En extends Hx{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Qd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qd*2*Math.atan(Math.tan(zc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,n){return this.getViewBounds(e,gm,xm),n.subVectors(xm,gm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class IS extends Vx{constructor(){super(new En(90,1,.5,500)),this.isPointLightShadow=!0}}class DS extends ph{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new IS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class mh extends Hx{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class US extends Vx{constructor(){super(new mh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vm extends ph{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new US}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class FS extends ph{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const rs=-90,ss=1;class kS extends Yt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(rs,ss,e,n);r.layers=this.layers,this.add(r);const s=new En(rs,ss,e,n);s.layers=this.layers,this.add(s);const a=new En(rs,ss,e,n);a.layers=this.layers,this.add(a);const o=new En(rs,ss,e,n);o.layers=this.layers,this.add(o);const l=new En(rs,ss,e,n);l.layers=this.layers,this.add(l);const c=new En(rs,ss,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(h,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class OS extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class BS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ie("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const yh=class yh{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};yh.prototype.isMatrix2=!0;let _m=yh;function ym(t,e,n,i){const r=zS(i);switch(n){case Tx:return t*e;case Rx:return t*e/r.components*r.byteLength;case ah:return t*e/r.components*r.byteLength;case zr:return t*e*2/r.components*r.byteLength;case oh:return t*e*2/r.components*r.byteLength;case Ax:return t*e*3/r.components*r.byteLength;case Yn:return t*e*4/r.components*r.byteLength;case lh:return t*e*4/r.components*r.byteLength;case nl:case il:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case rl:case sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ed:case bd:return Math.max(t,16)*Math.max(e,8)/4;case Md:case wd:return Math.max(t,8)*Math.max(e,8)/2;case Td:case Ad:case Cd:case Pd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Rd:case Il:case Nd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Id:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Dd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Ud:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case kd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Od:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case zd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Vd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Hd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Gd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Wd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case jd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Xd:case Yd:case qd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case $d:case Kd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Dl:case Zd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function zS(t){switch(t){case wn:case Mx:return{byteLength:1,components:1};case Ha:case Ex:case Ii:return{byteLength:2,components:1};case rh:case sh:return{byteLength:2,components:4};case hi:case ih:case oi:return{byteLength:4,components:1};case wx:case bx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nh}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gx(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function VS(t){const e=new WeakMap;function n(o,l){const c=o.array,f=o.usage,h=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const f=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,f);else{h.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<h.length;p++){const _=h[d],E=h[p];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++d,h[d]=E)}h.length=d+1;for(let p=0,_=h.length;p<_;p++){const E=h[p];t.bufferSubData(c,E.start*f.BYTES_PER_ELEMENT,f,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var HS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,WS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,YS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$S=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,KS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ZS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,JS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,QS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,iM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,rM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,aM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,oM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,uM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,dM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,pM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vM="gl_FragColor = linearToOutputTexel( gl_FragColor );",_M=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,SM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,MM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,EM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,TM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,RM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,CM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,PM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,NM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,DM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,UM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,FM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,BM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,VM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,WM=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,jM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,XM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$M=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,KM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ZM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,JM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,iE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,oE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,vE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_E=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ME=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,EE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,TE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,AE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,RE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,CE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,PE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,LE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,IE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,UE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,FE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,OE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,BE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,VE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const HE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,GE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$E=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,KE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ZE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,JE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ew=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,iw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ow=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,uw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_w=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:HS,alphahash_pars_fragment:GS,alphamap_fragment:WS,alphamap_pars_fragment:jS,alphatest_fragment:XS,alphatest_pars_fragment:YS,aomap_fragment:qS,aomap_pars_fragment:$S,batching_pars_vertex:KS,batching_vertex:ZS,begin_vertex:JS,beginnormal_vertex:QS,bsdfs:eM,iridescence_fragment:tM,bumpmap_pars_fragment:nM,clipping_planes_fragment:iM,clipping_planes_pars_fragment:rM,clipping_planes_pars_vertex:sM,clipping_planes_vertex:aM,color_fragment:oM,color_pars_fragment:lM,color_pars_vertex:cM,color_vertex:uM,common:dM,cube_uv_reflection_fragment:fM,defaultnormal_vertex:hM,displacementmap_pars_vertex:pM,displacementmap_vertex:mM,emissivemap_fragment:gM,emissivemap_pars_fragment:xM,colorspace_fragment:vM,colorspace_pars_fragment:_M,envmap_fragment:yM,envmap_common_pars_fragment:SM,envmap_pars_fragment:MM,envmap_pars_vertex:EM,envmap_physical_pars_fragment:DM,envmap_vertex:wM,fog_vertex:bM,fog_pars_vertex:TM,fog_fragment:AM,fog_pars_fragment:RM,gradientmap_pars_fragment:CM,lightmap_pars_fragment:PM,lights_lambert_fragment:NM,lights_lambert_pars_fragment:LM,lights_pars_begin:IM,lights_toon_fragment:UM,lights_toon_pars_fragment:FM,lights_phong_fragment:kM,lights_phong_pars_fragment:OM,lights_physical_fragment:BM,lights_physical_pars_fragment:zM,lights_fragment_begin:VM,lights_fragment_maps:HM,lights_fragment_end:GM,lightprobes_pars_fragment:WM,logdepthbuf_fragment:jM,logdepthbuf_pars_fragment:XM,logdepthbuf_pars_vertex:YM,logdepthbuf_vertex:qM,map_fragment:$M,map_pars_fragment:KM,map_particle_fragment:ZM,map_particle_pars_fragment:JM,metalnessmap_fragment:QM,metalnessmap_pars_fragment:eE,morphinstance_vertex:tE,morphcolor_vertex:nE,morphnormal_vertex:iE,morphtarget_pars_vertex:rE,morphtarget_vertex:sE,normal_fragment_begin:aE,normal_fragment_maps:oE,normal_pars_fragment:lE,normal_pars_vertex:cE,normal_vertex:uE,normalmap_pars_fragment:dE,clearcoat_normal_fragment_begin:fE,clearcoat_normal_fragment_maps:hE,clearcoat_pars_fragment:pE,iridescence_pars_fragment:mE,opaque_fragment:gE,packing:xE,premultiplied_alpha_fragment:vE,project_vertex:_E,dithering_fragment:yE,dithering_pars_fragment:SE,roughnessmap_fragment:ME,roughnessmap_pars_fragment:EE,shadowmap_pars_fragment:wE,shadowmap_pars_vertex:bE,shadowmap_vertex:TE,shadowmask_pars_fragment:AE,skinbase_vertex:RE,skinning_pars_vertex:CE,skinning_vertex:PE,skinnormal_vertex:NE,specularmap_fragment:LE,specularmap_pars_fragment:IE,tonemapping_fragment:DE,tonemapping_pars_fragment:UE,transmission_fragment:FE,transmission_pars_fragment:kE,uv_pars_fragment:OE,uv_pars_vertex:BE,uv_vertex:zE,worldpos_vertex:VE,background_vert:HE,background_frag:GE,backgroundCube_vert:WE,backgroundCube_frag:jE,cube_vert:XE,cube_frag:YE,depth_vert:qE,depth_frag:$E,distance_vert:KE,distance_frag:ZE,equirect_vert:JE,equirect_frag:QE,linedashed_vert:ew,linedashed_frag:tw,meshbasic_vert:nw,meshbasic_frag:iw,meshlambert_vert:rw,meshlambert_frag:sw,meshmatcap_vert:aw,meshmatcap_frag:ow,meshnormal_vert:lw,meshnormal_frag:cw,meshphong_vert:uw,meshphong_frag:dw,meshphysical_vert:fw,meshphysical_frag:hw,meshtoon_vert:pw,meshtoon_frag:mw,points_vert:gw,points_frag:xw,shadow_vert:vw,shadow_frag:_w,sprite_vert:yw,sprite_frag:Sw},pe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},si={basic:{uniforms:rn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:rn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:rn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:rn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:rn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new je(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:rn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:rn([pe.points,pe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:rn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:rn([pe.common,pe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:rn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:rn([pe.sprite,pe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:rn([pe.common,pe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:rn([pe.lights,pe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};si.physical={uniforms:rn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Vo={r:0,b:0,g:0},Mw=new St,Wx=new Ue;Wx.set(-1,0,0,0,1,0,0,0,1);function Ew(t,e,n,i,r,s){const a=new je(0);let o=r===!0?0:1,l,c,f=null,h=0,d=null;function p(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const S=x.backgroundBlurriness>0;M=e.get(M,S)}return M}function _(x){let M=!1;const S=p(x);S===null?m(a,o):S&&S.isColor&&(m(S,1),M=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(x,M){const S=p(M);S&&(S.isCubeTexture||S.mapping===rc)?(c===void 0&&(c=new Ut(new Ja(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Bs(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Mw.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Wx),c.material.toneMapped=$e.getTransfer(S.colorSpace)!==rt,(f!==S||h!==S.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,f=S,h=S.version,d=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Ut(new ac(2,2),new pi({name:"BackgroundMaterial",uniforms:Bs(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:fr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=$e.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||h!==S.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,f=S,h=S.version,d=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,M){x.getRGB(Vo,zx(t)),n.buffers.color.setClear(Vo.r,Vo.g,Vo.b,M,s)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:_,addToRenderList:E,dispose:u}}function ww(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(N,U,j,Z,O){let Y=!1;const H=h(N,Z,j,U);s!==H&&(s=H,c(s.object)),Y=p(N,Z,j,O),Y&&_(N,Z,j,O),O!==null&&e.update(O,t.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(N,U,j,Z),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function f(N){return t.deleteVertexArray(N)}function h(N,U,j,Z){const O=Z.wireframe===!0;let Y=i[U.id];Y===void 0&&(Y={},i[U.id]=Y);const H=N.isInstancedMesh===!0?N.id:0;let F=Y[H];F===void 0&&(F={},Y[H]=F);let X=F[j.id];X===void 0&&(X={},F[j.id]=X);let J=X[O];return J===void 0&&(J=d(l()),X[O]=J),J}function d(N){const U=[],j=[],Z=[];for(let O=0;O<n;O++)U[O]=0,j[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:j,attributeDivisors:Z,object:N,attributes:{},index:null}}function p(N,U,j,Z){const O=s.attributes,Y=U.attributes;let H=0;const F=j.getAttributes();for(const X in F)if(F[X].location>=0){const ne=O[X];let ae=Y[X];if(ae===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(ae=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(ae=N.instanceColor)),ne===void 0||ne.attribute!==ae||ae&&ne.data!==ae.data)return!0;H++}return s.attributesNum!==H||s.index!==Z}function _(N,U,j,Z){const O={},Y=U.attributes;let H=0;const F=j.getAttributes();for(const X in F)if(F[X].location>=0){let ne=Y[X];ne===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(ne=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(ne=N.instanceColor));const ae={};ae.attribute=ne,ne&&ne.data&&(ae.data=ne.data),O[X]=ae,H++}s.attributes=O,s.attributesNum=H,s.index=Z}function E(){const N=s.newAttributes;for(let U=0,j=N.length;U<j;U++)N[U]=0}function m(N){u(N,0)}function u(N,U){const j=s.newAttributes,Z=s.enabledAttributes,O=s.attributeDivisors;j[N]=1,Z[N]===0&&(t.enableVertexAttribArray(N),Z[N]=1),O[N]!==U&&(t.vertexAttribDivisor(N,U),O[N]=U)}function x(){const N=s.newAttributes,U=s.enabledAttributes;for(let j=0,Z=U.length;j<Z;j++)U[j]!==N[j]&&(t.disableVertexAttribArray(j),U[j]=0)}function M(N,U,j,Z,O,Y,H){H===!0?t.vertexAttribIPointer(N,U,j,O,Y):t.vertexAttribPointer(N,U,j,Z,O,Y)}function S(N,U,j,Z){E();const O=Z.attributes,Y=j.getAttributes(),H=U.defaultAttributeValues;for(const F in Y){const X=Y[F];if(X.location>=0){let J=O[F];if(J===void 0&&(F==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),F==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const ne=J.normalized,ae=J.itemSize,ze=e.get(J);if(ze===void 0)continue;const Je=ze.buffer,We=ze.type,K=ze.bytesPerElement,se=We===t.INT||We===t.UNSIGNED_INT||J.gpuType===ih;if(J.isInterleavedBufferAttribute){const ie=J.data,Le=ie.stride,De=J.offset;if(ie.isInstancedInterleavedBuffer){for(let Pe=0;Pe<X.locationSize;Pe++)u(X.location+Pe,ie.meshPerAttribute);N.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Pe=0;Pe<X.locationSize;Pe++)m(X.location+Pe);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let Pe=0;Pe<X.locationSize;Pe++)M(X.location+Pe,ae/X.locationSize,We,ne,Le*K,(De+ae/X.locationSize*Pe)*K,se)}else{if(J.isInstancedBufferAttribute){for(let ie=0;ie<X.locationSize;ie++)u(X.location+ie,J.meshPerAttribute);N.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ie=0;ie<X.locationSize;ie++)m(X.location+ie);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let ie=0;ie<X.locationSize;ie++)M(X.location+ie,ae/X.locationSize,We,ne,ae*K,ae/X.locationSize*ie*K,se)}}else if(H!==void 0){const ne=H[F];if(ne!==void 0)switch(ne.length){case 2:t.vertexAttrib2fv(X.location,ne);break;case 3:t.vertexAttrib3fv(X.location,ne);break;case 4:t.vertexAttrib4fv(X.location,ne);break;default:t.vertexAttrib1fv(X.location,ne)}}}}x()}function T(){A();for(const N in i){const U=i[N];for(const j in U){const Z=U[j];for(const O in Z){const Y=Z[O];for(const H in Y)f(Y[H].object),delete Y[H];delete Z[O]}}delete i[N]}}function b(N){if(i[N.id]===void 0)return;const U=i[N.id];for(const j in U){const Z=U[j];for(const O in Z){const Y=Z[O];for(const H in Y)f(Y[H].object),delete Y[H];delete Z[O]}}delete i[N.id]}function R(N){for(const U in i){const j=i[U];for(const Z in j){const O=j[Z];if(O[N.id]===void 0)continue;const Y=O[N.id];for(const H in Y)f(Y[H].object),delete Y[H];delete O[N.id]}}}function v(N){for(const U in i){const j=i[U],Z=N.isInstancedMesh===!0?N.id:0,O=j[Z];if(O!==void 0){for(const Y in O){const H=O[Y];for(const F in H)f(H[F].object),delete H[F];delete O[Y]}delete j[Z],Object.keys(j).length===0&&delete i[U]}}}function A(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:E,enableAttribute:m,disableUnusedAttributes:x}}function bw(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let d=0;for(let p=0;p<f;p++)d+=c[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Tw(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Yn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const v=R===Ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==wn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==oi&&!v)}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Ie("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),b=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:S,maxSamples:T,samples:b}}function Aw(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new wr,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=f(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,E=h.clipIntersection,m=h.clipShadows,u=t.get(h);if(!r||_===null||_.length===0||s&&!m)s?f(null):c();else{const x=s?0:i,M=x*4;let S=u.clippingState||null;l.value=S,S=f(_,d,M,p);for(let T=0;T!==M;++T)S[T]=n[T];u.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,p,_){const E=h!==null?h.length:0;let m=null;if(E!==0){if(m=l.value,_!==!0||m===null){const u=p+E*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<u)&&(m=new Float32Array(u));for(let M=0,S=p;M!==E;++M,S+=4)a.copy(h[M]).applyMatrix4(x,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,m}}const tr=4,Sm=[.125,.215,.35,.446,.526,.582],Tr=20,Rw=256,sa=new mh,Mm=new je;let du=null,fu=0,hu=0,pu=!1;const Cw=new B;class Em{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=Cw}=s;du=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),hu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(du,fu,hu),this._renderer.xr.enabled=pu,e.scissorTest=!1,as(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Br||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),du=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),hu=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Ii,format:Yn,colorSpace:Ul,depthBuffer:!1},r=wm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wm(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Pw(s)),this._blurMaterial=Lw(s,e,n),this._ggxMaterial=Nw(s,e,n)}return r}_compileMaterial(e){const n=new Ut(new un,e);this._renderer.compile(n,sa)}_sceneToCubeUV(e,n,i,r,s){const l=new En(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Mm),h.toneMapping=di,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ut(new Ja,new Fx({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,m=E.material;let u=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,u=!0):(m.color.copy(Mm),u=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[M],s.y,s.z)):S===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[M]));const T=this._cubeSize;as(r,S*T,M>2?T:0,T,T),h.setRenderTarget(r),u&&h.render(E,l),h.render(e,l)}h.toneMapping=p,h.autoClear=d,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Br||e.mapping===ks;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;as(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,sa)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),d=0+c*1.25,p=h*d,{_lodMax:_}=this,E=this._sizeLods[i],m=3*E*(i>_-tr?i-_+tr:0),u=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,as(s,m,u,3*E,2*E),r.setRenderTarget(s),r.render(o,sa),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,as(e,m,u,3*E,2*E),r.setRenderTarget(e),r.render(o,sa)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const f=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Tr-1),E=s/_,m=isFinite(s)?1+Math.floor(f*E):Tr;m>Tr&&Ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Tr}`);const u=[];let x=0;for(let R=0;R<Tr;++R){const v=R/E,A=Math.exp(-v*v/2);u.push(A),R===0?x+=A:R<m&&(x+=2*A)}for(let R=0;R<u.length;R++)u[R]=u[R]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=u,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=_,d.mipInt.value=M-i;const S=this._sizeLods[r],T=3*S*(r>M-tr?r-M+tr:0),b=4*(this._cubeSize-S);as(n,T,b,3*S,2*S),l.setRenderTarget(n),l.render(h,sa)}}function Pw(t){const e=[],n=[],i=[];let r=t;const s=t-tr+1+Sm.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>t-tr?l=Sm[a-t+tr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),f=-c,h=1+c,d=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,_=6,E=3,m=2,u=1,x=new Float32Array(E*_*p),M=new Float32Array(m*_*p),S=new Float32Array(u*_*p);for(let b=0;b<p;b++){const R=b%3*2/3-1,v=b>2?0:-1,A=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];x.set(A,E*_*b),M.set(d,m*_*b);const P=[b,b,b,b,b,b];S.set(P,u*_*b)}const T=new un;T.setAttribute("position",new Kn(x,E)),T.setAttribute("uv",new Kn(M,m)),T.setAttribute("faceIndex",new Kn(S,u)),i.push(new Ut(T,null)),r>tr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function wm(t,e,n){const i=new fi(t,e,n);return i.texture.mapping=rc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function as(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Nw(t,e,n){return new pi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Rw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Lw(t,e,n){const i=new Float32Array(Tr),r=new B(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function bm(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Tm(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class jx extends fi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ox(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ja(5,5,5),s=new pi({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:Ai});s.uniforms.tEquirect.value=n;const a=new Ut(r,s),o=n.minFilter;return n.minFilter===Pr&&(n.minFilter=tn),new kS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function Iw(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===kc||p===Oc)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const E=new jx(_.height);return E.fromEquirectangularTexture(t,d),e.set(d,E),d.addEventListener("dispose",c),o(E.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,_=p===kc||p===Oc,E=p===Br||p===ks;if(_||E){let m=n.get(d);const u=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return i===null&&(i=new Em(t)),m=_?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),m.texture;if(m!==void 0)return m.texture;{const x=d.image;return _&&x&&x.height>0||E&&x&&l(x)?(i===null&&(i=new Em(t)),m=_?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),d.addEventListener("dispose",f),m.texture):null}}}return d}function o(d,p){return p===kc?d.mapping=Br:p===Oc&&(d.mapping=ks),d}function l(d){let p=0;const _=6;for(let E=0;E<_;E++)d[E]!==void 0&&p++;return p===_}function c(d){const p=d.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function f(d){const p=d.target;p.removeEventListener("dispose",f);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Dw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Ts("WebGLRenderer: "+i+" extension not supported."),r}}}function Uw(t,e,n,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,n.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,_=h.attributes.position;let E=0;if(_===void 0)return;if(p!==null){const x=p.array;E=p.version;for(let M=0,S=x.length;M<S;M+=3){const T=x[M+0],b=x[M+1],R=x[M+2];d.push(T,b,b,R,R,T)}}else{const x=_.array;E=_.version;for(let M=0,S=x.length/3-1;M<S;M+=3){const T=M+0,b=M+1,R=M+2;d.push(T,b,b,R,R,T)}}const m=new(_.count>=65535?Dx:Ix)(d,1);m.version=E;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function f(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function Fw(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){t.drawElements(i,d,s,h*a),n.update(d,i,1)}function c(h,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,h*a,p),n.update(d,i,p))}function f(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,p);let E=0;for(let m=0;m<p;m++)E+=d[m];n.update(E,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function kw(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Ow(t,e,n){const i=new WeakMap,r=new _t;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let P=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",P)};var p=P;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),E===!0&&(S=2),m===!0&&(S=3);let T=o.attributes.position.count*S,b=1;T>e.maxTextureSize&&(b=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*b*4*h),v=new Px(R,T,b,h);v.type=oi,v.needsUpdate=!0;const A=S*4;for(let N=0;N<h;N++){const U=u[N],j=x[N],Z=M[N],O=T*b*4*N;for(let Y=0;Y<U.count;Y++){const H=Y*A;_===!0&&(r.fromBufferAttribute(U,Y),R[O+H+0]=r.x,R[O+H+1]=r.y,R[O+H+2]=r.z,R[O+H+3]=0),E===!0&&(r.fromBufferAttribute(j,Y),R[O+H+4]=r.x,R[O+H+5]=r.y,R[O+H+6]=r.z,R[O+H+7]=0),m===!0&&(r.fromBufferAttribute(Z,Y),R[O+H+8]=r.x,R[O+H+9]=r.y,R[O+H+10]=r.z,R[O+H+11]=Z.itemSize===4?r.w:1)}}d={count:h,texture:v,size:new Xe(T,b)},i.set(o,d),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const E=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function Bw(t,e,n,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==f&&(e.update(d),s.set(d,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return d}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:a,dispose:o}}const zw={[px]:"LINEAR_TONE_MAPPING",[mx]:"REINHARD_TONE_MAPPING",[gx]:"CINEON_TONE_MAPPING",[xx]:"ACES_FILMIC_TONE_MAPPING",[_x]:"AGX_TONE_MAPPING",[yx]:"NEUTRAL_TONE_MAPPING",[vx]:"CUSTOM_TONE_MAPPING"};function Vw(t,e,n,i,r,s){const a=new fi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Os(e,n):void 0}),o=new fi(e,n,{type:Ii,depthBuffer:!1,stencilBuffer:!1}),l=new un;l.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Pt([0,2,0,0,2,0],2));const c=new CS({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Ut(l,c),h=new mh(-1,1,1,-1,0,1);let d=null,p=null,_=!1,E,m=null,u=[],x=!1;this.setSize=function(M,S){a.setSize(M,S),o.setSize(M,S);for(let T=0;T<u.length;T++){const b=u[T];b.setSize&&b.setSize(M,S)}},this.setEffects=function(M){u=M,x=u.length>0&&u[0].isRenderPass===!0;const S=a.width,T=a.height;for(let b=0;b<u.length;b++){const R=u[b];R.setSize&&R.setSize(S,T)}},this.begin=function(M,S){if(_||M.toneMapping===di&&u.length===0)return!1;if(m=S,S!==null){const T=S.width,b=S.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return x===!1&&M.setRenderTarget(a),E=M.toneMapping,M.toneMapping=di,!0},this.hasRenderPass=function(){return x},this.end=function(M,S){M.toneMapping=E,_=!0;let T=a,b=o;for(let R=0;R<u.length;R++){const v=u[R];if(v.enabled!==!1&&(v.render(M,b,T,S),v.needsSwap!==!1)){const A=T;T=b,b=A}}if(d!==M.outputColorSpace||p!==M.toneMapping){d=M.outputColorSpace,p=M.toneMapping,c.defines={},$e.getTransfer(d)===rt&&(c.defines.SRGB_TRANSFER="");const R=zw[p];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(m),M.render(f,h),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Xx=new on,tf=new Os(1,1),Yx=new Px,qx=new sS,$x=new Ox,Am=[],Rm=[],Cm=new Float32Array(16),Pm=new Float32Array(9),Nm=new Float32Array(4);function js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Am[r];if(s===void 0&&(s=new Float32Array(r),Am[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Bt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function zt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function lc(t,e){let n=Rm[e];n===void 0&&(n=new Int32Array(e),Rm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Hw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Gw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2fv(this.addr,e),zt(n,e)}}function Ww(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Bt(n,e))return;t.uniform3fv(this.addr,e),zt(n,e)}}function jw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4fv(this.addr,e),zt(n,e)}}function Xw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),zt(n,e)}else{if(Bt(n,i))return;Nm.set(i),t.uniformMatrix2fv(this.addr,!1,Nm),zt(n,i)}}function Yw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),zt(n,e)}else{if(Bt(n,i))return;Pm.set(i),t.uniformMatrix3fv(this.addr,!1,Pm),zt(n,i)}}function qw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),zt(n,e)}else{if(Bt(n,i))return;Cm.set(i),t.uniformMatrix4fv(this.addr,!1,Cm),zt(n,i)}}function $w(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Kw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2iv(this.addr,e),zt(n,e)}}function Zw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Bt(n,e))return;t.uniform3iv(this.addr,e),zt(n,e)}}function Jw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4iv(this.addr,e),zt(n,e)}}function Qw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function eb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2uiv(this.addr,e),zt(n,e)}}function tb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Bt(n,e))return;t.uniform3uiv(this.addr,e),zt(n,e)}}function nb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4uiv(this.addr,e),zt(n,e)}}function ib(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(tf.compareFunction=n.isReversedDepthBuffer()?uh:ch,s=tf):s=Xx,n.setTexture2D(e||s,r)}function rb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||qx,r)}function sb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||$x,r)}function ab(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Yx,r)}function ob(t){switch(t){case 5126:return Hw;case 35664:return Gw;case 35665:return Ww;case 35666:return jw;case 35674:return Xw;case 35675:return Yw;case 35676:return qw;case 5124:case 35670:return $w;case 35667:case 35671:return Kw;case 35668:case 35672:return Zw;case 35669:case 35673:return Jw;case 5125:return Qw;case 36294:return eb;case 36295:return tb;case 36296:return nb;case 35678:case 36198:case 36298:case 36306:case 35682:return ib;case 35679:case 36299:case 36307:return rb;case 35680:case 36300:case 36308:case 36293:return sb;case 36289:case 36303:case 36311:case 36292:return ab}}function lb(t,e){t.uniform1fv(this.addr,e)}function cb(t,e){const n=js(e,this.size,2);t.uniform2fv(this.addr,n)}function ub(t,e){const n=js(e,this.size,3);t.uniform3fv(this.addr,n)}function db(t,e){const n=js(e,this.size,4);t.uniform4fv(this.addr,n)}function fb(t,e){const n=js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function hb(t,e){const n=js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function pb(t,e){const n=js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function mb(t,e){t.uniform1iv(this.addr,e)}function gb(t,e){t.uniform2iv(this.addr,e)}function xb(t,e){t.uniform3iv(this.addr,e)}function vb(t,e){t.uniform4iv(this.addr,e)}function _b(t,e){t.uniform1uiv(this.addr,e)}function yb(t,e){t.uniform2uiv(this.addr,e)}function Sb(t,e){t.uniform3uiv(this.addr,e)}function Mb(t,e){t.uniform4uiv(this.addr,e)}function Eb(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=tf:a=Xx;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function wb(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||qx,s[a])}function bb(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||$x,s[a])}function Tb(t,e,n){const i=this.cache,r=e.length,s=lc(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Yx,s[a])}function Ab(t){switch(t){case 5126:return lb;case 35664:return cb;case 35665:return ub;case 35666:return db;case 35674:return fb;case 35675:return hb;case 35676:return pb;case 5124:case 35670:return mb;case 35667:case 35671:return gb;case 35668:case 35672:return xb;case 35669:case 35673:return vb;case 5125:return _b;case 36294:return yb;case 36295:return Sb;case 36296:return Mb;case 35678:case 36198:case 36298:case 36306:case 35682:return Eb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return bb;case 36289:case 36303:case 36311:case 36292:return Tb}}class Rb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ob(n.type)}}class Cb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Ab(n.type)}}class Pb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const mu=/(\w+)(\])?(\[|\.)?/g;function Lm(t,e){t.seq.push(e),t.map[e.id]=e}function Nb(t,e,n){const i=t.name,r=i.length;for(mu.lastIndex=0;;){const s=mu.exec(i),a=mu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Lm(n,c===void 0?new Rb(o,t,e):new Cb(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new Pb(o),Lm(n,h)),n=h}}}class al{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);Nb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Im(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Lb=37297;let Ib=0;function Db(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Dm=new Ue;function Ub(t){$e._getMatrix(Dm,$e.workingColorSpace,t);const e=`mat3( ${Dm.elements.map(n=>n.toFixed(4))} )`;switch($e.getTransfer(t)){case Fl:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Um(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+Db(t.getShaderSource(e),o)}else return s}function Fb(t,e){const n=Ub(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const kb={[px]:"Linear",[mx]:"Reinhard",[gx]:"Cineon",[xx]:"ACESFilmic",[_x]:"AgX",[yx]:"Neutral",[vx]:"Custom"};function Ob(t,e){const n=kb[e];return n===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ho=new B;function Bb(){$e.getLuminanceCoefficients(Ho);const t=Ho.x.toFixed(4),e=Ho.y.toFixed(4),n=Ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zb(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function Vb(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Hb(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function pa(t){return t!==""}function Fm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function km(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Gb=/^[ \t]*#include +<([\w\d./]+)>/gm;function nf(t){return t.replace(Gb,jb)}const Wb=new Map;function jb(t,e){let n=Ve[e];if(n===void 0){const i=Wb.get(e);if(i!==void 0)n=Ve[i],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return nf(n)}const Xb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Om(t){return t.replace(Xb,Yb)}function Yb(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const qb={[tl]:"SHADOWMAP_TYPE_PCF",[fa]:"SHADOWMAP_TYPE_VSM"};function $b(t){return qb[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Kb={[Br]:"ENVMAP_TYPE_CUBE",[ks]:"ENVMAP_TYPE_CUBE",[rc]:"ENVMAP_TYPE_CUBE_UV"};function Zb(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Kb[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Jb={[ks]:"ENVMAP_MODE_REFRACTION"};function Qb(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Jb[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const e2={[hx]:"ENVMAP_BLENDING_MULTIPLY",[O1]:"ENVMAP_BLENDING_MIX",[B1]:"ENVMAP_BLENDING_ADD"};function t2(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":e2[t.combine]||"ENVMAP_BLENDING_NONE"}function n2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function i2(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=$b(n),c=Zb(n),f=Qb(n),h=t2(n),d=n2(n),p=zb(n),_=Vb(s),E=r.createProgram();let m,u,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(pa).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(pa).join(`
`),u.length>0&&(u+=`
`)):(m=[Bm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),u=[Bm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==di?"#define TONE_MAPPING":"",n.toneMapping!==di?Ve.tonemapping_pars_fragment:"",n.toneMapping!==di?Ob("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Fb("linearToOutputTexel",n.outputColorSpace),Bb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(pa).join(`
`)),a=nf(a),a=Fm(a,n),a=km(a,n),o=nf(o),o=Fm(o,n),o=km(o,n),a=Om(a),o=Om(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===qp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===qp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const M=x+m+a,S=x+u+o,T=Im(r,r.VERTEX_SHADER,M),b=Im(r,r.FRAGMENT_SHADER,S);r.attachShader(E,T),r.attachShader(E,b),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function R(N){if(t.debug.checkShaderErrors){const U=r.getProgramInfoLog(E)||"",j=r.getShaderInfoLog(T)||"",Z=r.getShaderInfoLog(b)||"",O=U.trim(),Y=j.trim(),H=Z.trim();let F=!0,X=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(F=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,T,b);else{const J=Um(r,T,"vertex"),ne=Um(r,b,"fragment");et("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+J+`
`+ne)}else O!==""?Ie("WebGLProgram: Program Info Log:",O):(Y===""||H==="")&&(X=!1);X&&(N.diagnostics={runnable:F,programLog:O,vertexShader:{log:Y,prefix:m},fragmentShader:{log:H,prefix:u}})}r.deleteShader(T),r.deleteShader(b),v=new al(r,E),A=Hb(r,E)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(E,Lb)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ib++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=T,this.fragmentShader=b,this}let r2=0;class s2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new a2(e),n.set(e,i)),i}}class a2{constructor(e){this.id=r2++,this.code=e,this.usedTimes=0}}function o2(t){return t===zr||t===Il||t===Dl}function l2(t,e,n,i,r,s){const a=new Nx,o=new s2,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function E(v,A,P,N,U,j){const Z=N.fog,O=U.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=e.get(v.envMap||Y,H),X=F&&F.mapping===rc?F.image.height:null,J=p[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&Ie("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const ne=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ae=ne!==void 0?ne.length:0;let ze=0;O.morphAttributes.position!==void 0&&(ze=1),O.morphAttributes.normal!==void 0&&(ze=2),O.morphAttributes.color!==void 0&&(ze=3);let Je,We,K,se;if(J){const Se=si[J];Je=Se.vertexShader,We=Se.fragmentShader}else{Je=v.vertexShader,We=v.fragmentShader;const Se=o.getVertexShaderStage(v),wt=o.getFragmentShaderStage(v);o.update(v,Se,wt),K=Se.id,se=wt.id}const ie=t.getRenderTarget(),Le=t.state.buffers.depth.getReversed(),De=U.isInstancedMesh===!0,Pe=U.isBatchedMesh===!0,gt=!!v.map,He=!!v.matcap,nt=!!F,Ke=!!v.aoMap,Ae=!!v.lightMap,Ze=!!v.bumpMap&&v.wireframe===!1,ct=!!v.normalMap,Nt=!!v.displacementMap,Lt=!!v.emissiveMap,Et=!!v.metalnessMap,It=!!v.roughnessMap,I=v.anisotropy>0,dn=v.clearcoat>0,it=v.dispersion>0,C=v.iridescence>0,y=v.sheen>0,k=v.transmission>0,G=I&&!!v.anisotropyMap,q=dn&&!!v.clearcoatMap,oe=dn&&!!v.clearcoatNormalMap,ce=dn&&!!v.clearcoatRoughnessMap,$=C&&!!v.iridescenceMap,ee=C&&!!v.iridescenceThicknessMap,ue=y&&!!v.sheenColorMap,we=y&&!!v.sheenRoughnessMap,he=!!v.specularMap,de=!!v.specularColorMap,Re=!!v.specularIntensityMap,Ne=k&&!!v.transmissionMap,Fe=k&&!!v.thicknessMap,L=!!v.gradientMap,le=!!v.alphaMap,Q=v.alphaTest>0,fe=!!v.alphaHash,xe=!!v.extensions;let te=di;v.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(te=t.toneMapping);const Ee={shaderID:J,shaderType:v.type,shaderName:v.name,vertexShader:Je,fragmentShader:We,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:se,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Pe,batchingColor:Pe&&U._colorsTexture!==null,instancing:De,instancingColor:De&&U.instanceColor!==null,instancingMorph:De&&U.morphTexture!==null,outputColorSpace:ie===null?t.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:gt,matcap:He,envMap:nt,envMapMode:nt&&F.mapping,envMapCubeUVHeight:X,aoMap:Ke,lightMap:Ae,bumpMap:Ze,normalMap:ct,displacementMap:Nt,emissiveMap:Lt,normalMapObjectSpace:ct&&v.normalMapType===H1,normalMapTangentSpace:ct&&v.normalMapType===Jd,packedNormalMap:ct&&v.normalMapType===Jd&&o2(v.normalMap.format),metalnessMap:Et,roughnessMap:It,anisotropy:I,anisotropyMap:G,clearcoat:dn,clearcoatMap:q,clearcoatNormalMap:oe,clearcoatRoughnessMap:ce,dispersion:it,iridescence:C,iridescenceMap:$,iridescenceThicknessMap:ee,sheen:y,sheenColorMap:ue,sheenRoughnessMap:we,specularMap:he,specularColorMap:de,specularIntensityMap:Re,transmission:k,transmissionMap:Ne,thicknessMap:Fe,gradientMap:L,opaque:v.transparent===!1&&v.blending===bs&&v.alphaToCoverage===!1,alphaMap:le,alphaTest:Q,alphaHash:fe,combine:v.combine,mapUv:gt&&_(v.map.channel),aoMapUv:Ke&&_(v.aoMap.channel),lightMapUv:Ae&&_(v.lightMap.channel),bumpMapUv:Ze&&_(v.bumpMap.channel),normalMapUv:ct&&_(v.normalMap.channel),displacementMapUv:Nt&&_(v.displacementMap.channel),emissiveMapUv:Lt&&_(v.emissiveMap.channel),metalnessMapUv:Et&&_(v.metalnessMap.channel),roughnessMapUv:It&&_(v.roughnessMap.channel),anisotropyMapUv:G&&_(v.anisotropyMap.channel),clearcoatMapUv:q&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:we&&_(v.sheenRoughnessMap.channel),specularMapUv:he&&_(v.specularMap.channel),specularColorMapUv:de&&_(v.specularColorMap.channel),specularIntensityMapUv:Re&&_(v.specularIntensityMap.channel),transmissionMapUv:Ne&&_(v.transmissionMap.channel),thicknessMapUv:Fe&&_(v.thicknessMap.channel),alphaMapUv:le&&_(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ct||I),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!O.attributes.uv&&(gt||le),fog:!!Z,useFog:v.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&ct===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Le,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ze,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:te,decodeVideoTexture:gt&&v.map.isVideoTexture===!0&&$e.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:Lt&&v.emissiveMap.isVideoTexture===!0&&$e.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Mi,flipSided:v.side===vn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)A.push(P),A.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(u(A,v),x(A,v),A.push(t.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function u(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function x(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){const A=p[v.type];let P;if(A){const N=si[A];P=TS.clone(N.uniforms)}else P=v.uniforms;return P}function S(v,A){let P=f.get(A);return P!==void 0?++P.usedTimes:(P=new i2(t,A,v,r),c.push(P),f.set(A,P)),P}function T(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),f.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function R(){o.dispose()}return{getParameters:E,getProgramCacheKey:m,getUniforms:M,acquireProgram:S,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:R}}function c2(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function u2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function zm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Vm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,_,E,m,u){let x=t[e];return x===void 0?(x={id:d.id,object:d,geometry:p,material:_,materialVariant:a(d),groupOrder:E,renderOrder:d.renderOrder,z:m,group:u},t[e]=x):(x.id=d.id,x.object=d,x.geometry=p,x.material=_,x.materialVariant=a(d),x.groupOrder=E,x.renderOrder=d.renderOrder,x.z=m,x.group=u),e++,x}function l(d,p,_,E,m,u){const x=o(d,p,_,E,m,u);_.transmission>0?i.push(x):_.transparent===!0?r.push(x):n.push(x)}function c(d,p,_,E,m,u){const x=o(d,p,_,E,m,u);_.transmission>0?i.unshift(x):_.transparent===!0?r.unshift(x):n.unshift(x)}function f(d,p,_){n.length>1&&n.sort(d||u2),i.length>1&&i.sort(p||zm),r.length>1&&r.sort(p||zm),_&&(n.reverse(),i.reverse(),r.reverse())}function h(){for(let d=e,p=t.length;d<p;d++){const _=t[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:f}}function d2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Vm,t.set(i,[a])):r>=s.length?(a=new Vm,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function f2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new je};break;case"SpotLight":n={position:new B,direction:new B,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new je,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new je,groundColor:new je};break;case"RectAreaLight":n={color:new je,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function h2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let p2=0;function m2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function g2(t){const e=new f2,n=h2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new St,a=new St;function o(c){let f=0,h=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,_=0,E=0,m=0,u=0,x=0,M=0,S=0,T=0,b=0,R=0;c.sort(m2);for(let A=0,P=c.length;A<P;A++){const N=c[A],U=N.color,j=N.intensity,Z=N.distance;let O=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===zr?O=N.shadow.map.texture:O=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)f+=U.r*j,h+=U.g*j,d+=U.b*j;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(N.sh.coefficients[Y],j);R++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const H=N.shadow,F=n.get(N);F.shadowIntensity=H.intensity,F.shadowBias=H.bias,F.shadowNormalBias=H.normalBias,F.shadowRadius=H.radius,F.shadowMapSize=H.mapSize,i.directionalShadow[p]=F,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=N.shadow.matrix,x++}i.directional[p]=Y,p++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(U).multiplyScalar(j),Y.distance=Z,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,i.spot[E]=Y;const H=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,H.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[E]=H.matrix,N.castShadow){const F=n.get(N);F.shadowIntensity=H.intensity,F.shadowBias=H.bias,F.shadowNormalBias=H.normalBias,F.shadowRadius=H.radius,F.shadowMapSize=H.mapSize,i.spotShadow[E]=F,i.spotShadowMap[E]=O,S++}E++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(U).multiplyScalar(j),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=Y,m++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const H=N.shadow,F=n.get(N);F.shadowIntensity=H.intensity,F.shadowBias=H.bias,F.shadowNormalBias=H.normalBias,F.shadowRadius=H.radius,F.shadowMapSize=H.mapSize,F.shadowCameraNear=H.camera.near,F.shadowCameraFar=H.camera.far,i.pointShadow[_]=F,i.pointShadowMap[_]=O,i.pointShadowMatrix[_]=N.shadow.matrix,M++}i.point[_]=Y,_++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(j),Y.groundColor.copy(N.groundColor).multiplyScalar(j),i.hemi[u]=Y,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==p||v.pointLength!==_||v.spotLength!==E||v.rectAreaLength!==m||v.hemiLength!==u||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==S||v.numSpotMaps!==T||v.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=E,i.rectArea.length=m,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,v.directionalLength=p,v.pointLength=_,v.spotLength=E,v.rectAreaLength=m,v.hemiLength=u,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=S,v.numSpotMaps=T,v.numLightProbes=R,i.version=p2++)}function l(c,f){let h=0,d=0,p=0,_=0,E=0;const m=f.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const M=c[u];if(M.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(M.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const S=i.hemi[E];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),E++}}}return{setup:o,setupView:l,state:i}}function Hm(t){const e=new g2(t),n=[],i=[],r=[];function s(d){h.camera=d,n.length=0,i.length=0,r.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function f(d){e.setupView(n,d)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function x2(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Hm(t),e.set(r,[o])):s>=a.length?(o=new Hm(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const v2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,y2=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],S2=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Gm=new St,aa=new B,gu=new B;function M2(t,e,n){let i=new fh;const r=new Xe,s=new Xe,a=new _t,o=new NS,l=new LS,c={},f=n.maxTextureSize,h={[fr]:vn,[vn]:fr,[Mi]:Mi},d=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:v2,fragmentShader:_2}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new un;_.setAttribute("position",new Kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Ut(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let u=this.type;this.render=function(b,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===fx&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=tl);const A=t.getRenderTarget(),P=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),U=t.state;U.setBlending(Ai),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const j=u!==this.type;j&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(O=>O.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,O=b.length;Z<O;Z++){const Y=b[Z],H=Y.shadow;if(H===void 0){Ie("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const F=H.getFrameExtents();r.multiply(F),s.copy(H.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/F.x),r.x=s.x*F.x,H.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/F.y),r.y=s.y*F.y,H.mapSize.y=s.y));const X=t.state.buffers.depth.getReversed();if(H.camera._reversedDepth=X,H.map===null||j===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===fa){if(Y.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new fi(r.x,r.y,{format:zr,type:Ii,minFilter:tn,magFilter:tn,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new Os(r.x,r.y,oi),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=Di,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt}else Y.isPointLight?(H.map=new jx(r.x),H.map.depthTexture=new wS(r.x,hi)):(H.map=new fi(r.x,r.y),H.map.depthTexture=new Os(r.x,r.y,hi)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=Di,this.type===tl?(H.map.depthTexture.compareFunction=X?uh:ch,H.map.depthTexture.minFilter=tn,H.map.depthTexture.magFilter=tn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt);H.camera.updateProjectionMatrix()}const J=H.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<J;ne++){if(H.map.isWebGLCubeRenderTarget)t.setRenderTarget(H.map,ne),t.clear();else{ne===0&&(t.setRenderTarget(H.map),t.clear());const ae=H.getViewport(ne);a.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),U.viewport(a)}if(Y.isPointLight){const ae=H.camera,ze=H.matrix,Je=Y.distance||ae.far;Je!==ae.far&&(ae.far=Je,ae.updateProjectionMatrix()),aa.setFromMatrixPosition(Y.matrixWorld),ae.position.copy(aa),gu.copy(ae.position),gu.add(y2[ne]),ae.up.copy(S2[ne]),ae.lookAt(gu),ae.updateMatrixWorld(),ze.makeTranslation(-aa.x,-aa.y,-aa.z),Gm.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Gm,ae.coordinateSystem,ae.reversedDepth)}else H.updateMatrices(Y);i=H.getFrustum(),S(R,v,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===fa&&x(H,v),H.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(A,P,N)};function x(b,R){const v=e.update(E);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new fi(r.x,r.y,{format:zr,type:Ii})),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(R,null,v,d,E,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(R,null,v,p,E,null)}function M(b,R,v,A){let P=null;const N=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)P=N;else if(P=v.isPointLight===!0?l:o,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const U=P.uuid,j=R.uuid;let Z=c[U];Z===void 0&&(Z={},c[U]=Z);let O=Z[j];O===void 0&&(O=P.clone(),Z[j]=O,R.addEventListener("dispose",T)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,A===fa?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:h[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const U=t.properties.get(P);U.light=v}return P}function S(b,R,v,A,P){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===fa)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const j=e.update(b),Z=b.material;if(Array.isArray(Z)){const O=j.groups;for(let Y=0,H=O.length;Y<H;Y++){const F=O[Y],X=Z[F.materialIndex];if(X&&X.visible){const J=M(b,X,A,P);b.onBeforeShadow(t,b,R,v,j,J,F),t.renderBufferDirect(v,null,j,J,b,F),b.onAfterShadow(t,b,R,v,j,J,F)}}}else if(Z.visible){const O=M(b,Z,A,P);b.onBeforeShadow(t,b,R,v,j,O,null),t.renderBufferDirect(v,null,j,O,b,null),b.onAfterShadow(t,b,R,v,j,O,null)}}const U=b.children;for(let j=0,Z=U.length;j<Z;j++)S(U[j],R,v,A,P)}function T(b){b.target.removeEventListener("dispose",T);for(const v in c){const A=c[v],P=b.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function E2(t,e){function n(){let L=!1;const le=new _t;let Q=null;const fe=new _t(0,0,0,0);return{setMask:function(xe){Q!==xe&&!L&&(t.colorMask(xe,xe,xe,xe),Q=xe)},setLocked:function(xe){L=xe},setClear:function(xe,te,Ee,Se,wt){wt===!0&&(xe*=Se,te*=Se,Ee*=Se),le.set(xe,te,Ee,Se),fe.equals(le)===!1&&(t.clearColor(xe,te,Ee,Se),fe.copy(le))},reset:function(){L=!1,Q=null,fe.set(-1,0,0,0)}}}function i(){let L=!1,le=!1,Q=null,fe=null,xe=null;return{setReversed:function(te){if(le!==te){const Ee=e.get("EXT_clip_control");te?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),le=te;const Se=xe;xe=null,this.setClear(Se)}},getReversed:function(){return le},setTest:function(te){te?ie(t.DEPTH_TEST):Le(t.DEPTH_TEST)},setMask:function(te){Q!==te&&!L&&(t.depthMask(te),Q=te)},setFunc:function(te){if(le&&(te=J1[te]),fe!==te){switch(te){case hd:t.depthFunc(t.NEVER);break;case pd:t.depthFunc(t.ALWAYS);break;case md:t.depthFunc(t.LESS);break;case Fs:t.depthFunc(t.LEQUAL);break;case gd:t.depthFunc(t.EQUAL);break;case xd:t.depthFunc(t.GEQUAL);break;case vd:t.depthFunc(t.GREATER);break;case _d:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}fe=te}},setLocked:function(te){L=te},setClear:function(te){xe!==te&&(xe=te,le&&(te=1-te),t.clearDepth(te))},reset:function(){L=!1,Q=null,fe=null,xe=null,le=!1}}}function r(){let L=!1,le=null,Q=null,fe=null,xe=null,te=null,Ee=null,Se=null,wt=null;return{setTest:function(ut){L||(ut?ie(t.STENCIL_TEST):Le(t.STENCIL_TEST))},setMask:function(ut){le!==ut&&!L&&(t.stencilMask(ut),le=ut)},setFunc:function(ut,Jn,Qn){(Q!==ut||fe!==Jn||xe!==Qn)&&(t.stencilFunc(ut,Jn,Qn),Q=ut,fe=Jn,xe=Qn)},setOp:function(ut,Jn,Qn){(te!==ut||Ee!==Jn||Se!==Qn)&&(t.stencilOp(ut,Jn,Qn),te=ut,Ee=Jn,Se=Qn)},setLocked:function(ut){L=ut},setClear:function(ut){wt!==ut&&(t.clearStencil(ut),wt=ut)},reset:function(){L=!1,le=null,Q=null,fe=null,xe=null,te=null,Ee=null,Se=null,wt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},h={},d={},p=new WeakMap,_=[],E=null,m=!1,u=null,x=null,M=null,S=null,T=null,b=null,R=null,v=new je(0,0,0),A=0,P=!1,N=null,U=null,j=null,Z=null,O=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,F=0;const X=t.getParameter(t.VERSION);X.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=F>=1):X.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=F>=2);let J=null,ne={};const ae=t.getParameter(t.SCISSOR_BOX),ze=t.getParameter(t.VIEWPORT),Je=new _t().fromArray(ae),We=new _t().fromArray(ze);function K(L,le,Q,fe){const xe=new Uint8Array(4),te=t.createTexture();t.bindTexture(L,te),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ee=0;Ee<Q;Ee++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(le,0,t.RGBA,1,1,fe,0,t.RGBA,t.UNSIGNED_BYTE,xe):t.texImage2D(le+Ee,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,xe);return te}const se={};se[t.TEXTURE_2D]=K(t.TEXTURE_2D,t.TEXTURE_2D,1),se[t.TEXTURE_CUBE_MAP]=K(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[t.TEXTURE_2D_ARRAY]=K(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),se[t.TEXTURE_3D]=K(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(t.DEPTH_TEST),a.setFunc(Fs),Ze(!1),ct(Hp),ie(t.CULL_FACE),Ke(Ai);function ie(L){f[L]!==!0&&(t.enable(L),f[L]=!0)}function Le(L){f[L]!==!1&&(t.disable(L),f[L]=!1)}function De(L,le){return d[L]!==le?(t.bindFramebuffer(L,le),d[L]=le,L===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=le),L===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=le),!0):!1}function Pe(L,le){let Q=_,fe=!1;if(L){Q=p.get(le),Q===void 0&&(Q=[],p.set(le,Q));const xe=L.textures;if(Q.length!==xe.length||Q[0]!==t.COLOR_ATTACHMENT0){for(let te=0,Ee=xe.length;te<Ee;te++)Q[te]=t.COLOR_ATTACHMENT0+te;Q.length=xe.length,fe=!0}}else Q[0]!==t.BACK&&(Q[0]=t.BACK,fe=!0);fe&&t.drawBuffers(Q)}function gt(L){return E!==L?(t.useProgram(L),E=L,!0):!1}const He={[br]:t.FUNC_ADD,[S1]:t.FUNC_SUBTRACT,[M1]:t.FUNC_REVERSE_SUBTRACT};He[E1]=t.MIN,He[w1]=t.MAX;const nt={[b1]:t.ZERO,[T1]:t.ONE,[A1]:t.SRC_COLOR,[dd]:t.SRC_ALPHA,[I1]:t.SRC_ALPHA_SATURATE,[N1]:t.DST_COLOR,[C1]:t.DST_ALPHA,[R1]:t.ONE_MINUS_SRC_COLOR,[fd]:t.ONE_MINUS_SRC_ALPHA,[L1]:t.ONE_MINUS_DST_COLOR,[P1]:t.ONE_MINUS_DST_ALPHA,[D1]:t.CONSTANT_COLOR,[U1]:t.ONE_MINUS_CONSTANT_COLOR,[F1]:t.CONSTANT_ALPHA,[k1]:t.ONE_MINUS_CONSTANT_ALPHA};function Ke(L,le,Q,fe,xe,te,Ee,Se,wt,ut){if(L===Ai){m===!0&&(Le(t.BLEND),m=!1);return}if(m===!1&&(ie(t.BLEND),m=!0),L!==y1){if(L!==u||ut!==P){if((x!==br||T!==br)&&(t.blendEquation(t.FUNC_ADD),x=br,T=br),ut)switch(L){case bs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Gp:t.blendFunc(t.ONE,t.ONE);break;case Wp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case jp:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:et("WebGLState: Invalid blending: ",L);break}else switch(L){case bs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Gp:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Wp:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jp:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",L);break}M=null,S=null,b=null,R=null,v.set(0,0,0),A=0,u=L,P=ut}return}xe=xe||le,te=te||Q,Ee=Ee||fe,(le!==x||xe!==T)&&(t.blendEquationSeparate(He[le],He[xe]),x=le,T=xe),(Q!==M||fe!==S||te!==b||Ee!==R)&&(t.blendFuncSeparate(nt[Q],nt[fe],nt[te],nt[Ee]),M=Q,S=fe,b=te,R=Ee),(Se.equals(v)===!1||wt!==A)&&(t.blendColor(Se.r,Se.g,Se.b,wt),v.copy(Se),A=wt),u=L,P=!1}function Ae(L,le){L.side===Mi?Le(t.CULL_FACE):ie(t.CULL_FACE);let Q=L.side===vn;le&&(Q=!Q),Ze(Q),L.blending===bs&&L.transparent===!1?Ke(Ai):Ke(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const fe=L.stencilWrite;o.setTest(fe),fe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Lt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(t.SAMPLE_ALPHA_TO_COVERAGE):Le(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(L){N!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),N=L)}function ct(L){L!==v1?(ie(t.CULL_FACE),L!==U&&(L===Hp?t.cullFace(t.BACK):L===_1?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Le(t.CULL_FACE),U=L}function Nt(L){L!==j&&(H&&t.lineWidth(L),j=L)}function Lt(L,le,Q){L?(ie(t.POLYGON_OFFSET_FILL),(Z!==le||O!==Q)&&(Z=le,O=Q,a.getReversed()&&(le=-le),t.polygonOffset(le,Q))):Le(t.POLYGON_OFFSET_FILL)}function Et(L){L?ie(t.SCISSOR_TEST):Le(t.SCISSOR_TEST)}function It(L){L===void 0&&(L=t.TEXTURE0+Y-1),J!==L&&(t.activeTexture(L),J=L)}function I(L,le,Q){Q===void 0&&(J===null?Q=t.TEXTURE0+Y-1:Q=J);let fe=ne[Q];fe===void 0&&(fe={type:void 0,texture:void 0},ne[Q]=fe),(fe.type!==L||fe.texture!==le)&&(J!==Q&&(t.activeTexture(Q),J=Q),t.bindTexture(L,le||se[L]),fe.type=L,fe.texture=le)}function dn(){const L=ne[J];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function it(){try{t.compressedTexImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function C(){try{t.compressedTexImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function y(){try{t.texSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function k(){try{t.texSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function G(){try{t.compressedTexSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function q(){try{t.compressedTexSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function oe(){try{t.texStorage2D(...arguments)}catch(L){et("WebGLState:",L)}}function ce(){try{t.texStorage3D(...arguments)}catch(L){et("WebGLState:",L)}}function $(){try{t.texImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function ee(){try{t.texImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function ue(L){return h[L]!==void 0?h[L]:t.getParameter(L)}function we(L,le){h[L]!==le&&(t.pixelStorei(L,le),h[L]=le)}function he(L){Je.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),Je.copy(L))}function de(L){We.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),We.copy(L))}function Re(L,le){let Q=c.get(le);Q===void 0&&(Q=new WeakMap,c.set(le,Q));let fe=Q.get(L);fe===void 0&&(fe=t.getUniformBlockIndex(le,L.name),Q.set(L,fe))}function Ne(L,le){const fe=c.get(le).get(L);l.get(le)!==fe&&(t.uniformBlockBinding(le,fe,L.__bindingPointIndex),l.set(le,fe))}function Fe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},h={},J=null,ne={},d={},p=new WeakMap,_=[],E=null,m=!1,u=null,x=null,M=null,S=null,T=null,b=null,R=null,v=new je(0,0,0),A=0,P=!1,N=null,U=null,j=null,Z=null,O=null,Je.set(0,0,t.canvas.width,t.canvas.height),We.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ie,disable:Le,bindFramebuffer:De,drawBuffers:Pe,useProgram:gt,setBlending:Ke,setMaterial:Ae,setFlipSided:Ze,setCullFace:ct,setLineWidth:Nt,setPolygonOffset:Lt,setScissorTest:Et,activeTexture:It,bindTexture:I,unbindTexture:dn,compressedTexImage2D:it,compressedTexImage3D:C,texImage2D:$,texImage3D:ee,pixelStorei:we,getParameter:ue,updateUBOMapping:Re,uniformBlockBinding:Ne,texStorage2D:oe,texStorage3D:ce,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:G,compressedTexSubImage3D:q,scissor:he,viewport:de,reset:Fe}}function w2(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,f=new WeakMap,h=new Set;let d;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(C,y){return _?new OffscreenCanvas(C,y):kl("canvas")}function m(C,y,k){let G=1;const q=it(C);if((q.width>k||q.height>k)&&(G=k/Math.max(q.width,q.height)),G<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const oe=Math.floor(G*q.width),ce=Math.floor(G*q.height);d===void 0&&(d=E(oe,ce));const $=y?E(oe,ce):d;return $.width=oe,$.height=ce,$.getContext("2d").drawImage(C,0,0,oe,ce),Ie("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+oe+"x"+ce+")."),$}else return"data"in C&&Ie("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),C;return C}function u(C){return C.generateMipmaps}function x(C){t.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?t.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(C,y,k,G,q,oe=!1){if(C!==null){if(t[C]!==void 0)return t[C];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ce;G&&(ce=e.get("EXT_texture_norm16"),ce||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=y;if(y===t.RED&&(k===t.FLOAT&&($=t.R32F),k===t.HALF_FLOAT&&($=t.R16F),k===t.UNSIGNED_BYTE&&($=t.R8),k===t.UNSIGNED_SHORT&&ce&&($=ce.R16_EXT),k===t.SHORT&&ce&&($=ce.R16_SNORM_EXT)),y===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.R8UI),k===t.UNSIGNED_SHORT&&($=t.R16UI),k===t.UNSIGNED_INT&&($=t.R32UI),k===t.BYTE&&($=t.R8I),k===t.SHORT&&($=t.R16I),k===t.INT&&($=t.R32I)),y===t.RG&&(k===t.FLOAT&&($=t.RG32F),k===t.HALF_FLOAT&&($=t.RG16F),k===t.UNSIGNED_BYTE&&($=t.RG8),k===t.UNSIGNED_SHORT&&ce&&($=ce.RG16_EXT),k===t.SHORT&&ce&&($=ce.RG16_SNORM_EXT)),y===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RG8UI),k===t.UNSIGNED_SHORT&&($=t.RG16UI),k===t.UNSIGNED_INT&&($=t.RG32UI),k===t.BYTE&&($=t.RG8I),k===t.SHORT&&($=t.RG16I),k===t.INT&&($=t.RG32I)),y===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RGB8UI),k===t.UNSIGNED_SHORT&&($=t.RGB16UI),k===t.UNSIGNED_INT&&($=t.RGB32UI),k===t.BYTE&&($=t.RGB8I),k===t.SHORT&&($=t.RGB16I),k===t.INT&&($=t.RGB32I)),y===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RGBA8UI),k===t.UNSIGNED_SHORT&&($=t.RGBA16UI),k===t.UNSIGNED_INT&&($=t.RGBA32UI),k===t.BYTE&&($=t.RGBA8I),k===t.SHORT&&($=t.RGBA16I),k===t.INT&&($=t.RGBA32I)),y===t.RGB&&(k===t.UNSIGNED_SHORT&&ce&&($=ce.RGB16_EXT),k===t.SHORT&&ce&&($=ce.RGB16_SNORM_EXT),k===t.UNSIGNED_INT_5_9_9_9_REV&&($=t.RGB9_E5),k===t.UNSIGNED_INT_10F_11F_11F_REV&&($=t.R11F_G11F_B10F)),y===t.RGBA){const ee=oe?Fl:$e.getTransfer(q);k===t.FLOAT&&($=t.RGBA32F),k===t.HALF_FLOAT&&($=t.RGBA16F),k===t.UNSIGNED_BYTE&&($=ee===rt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT&&ce&&($=ce.RGBA16_EXT),k===t.SHORT&&ce&&($=ce.RGBA16_SNORM_EXT),k===t.UNSIGNED_SHORT_4_4_4_4&&($=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&($=t.RGB5_A1)}return($===t.R16F||$===t.R32F||$===t.RG16F||$===t.RG32F||$===t.RGBA16F||$===t.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function T(C,y){let k;return C?y===null||y===hi||y===Ga?k=t.DEPTH24_STENCIL8:y===oi?k=t.DEPTH32F_STENCIL8:y===Ha&&(k=t.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===hi||y===Ga?k=t.DEPTH_COMPONENT24:y===oi?k=t.DEPTH_COMPONENT32F:y===Ha&&(k=t.DEPTH_COMPONENT16),k}function b(C,y){return u(C)===!0||C.isFramebufferTexture&&C.minFilter!==jt&&C.minFilter!==tn?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function R(C){const y=C.target;y.removeEventListener("dispose",R),A(y),y.isVideoTexture&&f.delete(y),y.isHTMLTexture&&h.delete(y)}function v(C){const y=C.target;y.removeEventListener("dispose",v),N(y)}function A(C){const y=i.get(C);if(y.__webglInit===void 0)return;const k=C.source,G=p.get(k);if(G){const q=G[y.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(C),Object.keys(G).length===0&&p.delete(k)}i.remove(C)}function P(C){const y=i.get(C);t.deleteTexture(y.__webglTexture);const k=C.source,G=p.get(k);delete G[y.__cacheKey],a.memory.textures--}function N(C){const y=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(y.__webglFramebuffer[G]))for(let q=0;q<y.__webglFramebuffer[G].length;q++)t.deleteFramebuffer(y.__webglFramebuffer[G][q]);else t.deleteFramebuffer(y.__webglFramebuffer[G]);y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer[G])}else{if(Array.isArray(y.__webglFramebuffer))for(let G=0;G<y.__webglFramebuffer.length;G++)t.deleteFramebuffer(y.__webglFramebuffer[G]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&t.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let G=0;G<y.__webglColorRenderbuffer.length;G++)y.__webglColorRenderbuffer[G]&&t.deleteRenderbuffer(y.__webglColorRenderbuffer[G]);y.__webglDepthRenderbuffer&&t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const k=C.textures;for(let G=0,q=k.length;G<q;G++){const oe=i.get(k[G]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(k[G])}i.remove(C)}let U=0;function j(){U=0}function Z(){return U}function O(C){U=C}function Y(){const C=U;return C>=r.maxTextures&&Ie("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),U+=1,C}function H(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function F(C,y){const k=i.get(C);if(C.isVideoTexture&&I(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){const G=C.image;if(G===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(k,C,y);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+y)}function X(C,y){const k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Le(k,C,y);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+y)}function J(C,y){const k=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){Le(k,C,y);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+y)}function ne(C,y){const k=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&k.__version!==C.version){De(k,C,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+y)}const ae={[yd]:t.REPEAT,[bi]:t.CLAMP_TO_EDGE,[Sd]:t.MIRRORED_REPEAT},ze={[jt]:t.NEAREST,[z1]:t.NEAREST_MIPMAP_NEAREST,[_o]:t.NEAREST_MIPMAP_LINEAR,[tn]:t.LINEAR,[Bc]:t.LINEAR_MIPMAP_NEAREST,[Pr]:t.LINEAR_MIPMAP_LINEAR},Je={[G1]:t.NEVER,[q1]:t.ALWAYS,[W1]:t.LESS,[ch]:t.LEQUAL,[j1]:t.EQUAL,[uh]:t.GEQUAL,[X1]:t.GREATER,[Y1]:t.NOTEQUAL};function We(C,y){if(y.type===oi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===tn||y.magFilter===Bc||y.magFilter===_o||y.magFilter===Pr||y.minFilter===tn||y.minFilter===Bc||y.minFilter===_o||y.minFilter===Pr)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(C,t.TEXTURE_WRAP_S,ae[y.wrapS]),t.texParameteri(C,t.TEXTURE_WRAP_T,ae[y.wrapT]),(C===t.TEXTURE_3D||C===t.TEXTURE_2D_ARRAY)&&t.texParameteri(C,t.TEXTURE_WRAP_R,ae[y.wrapR]),t.texParameteri(C,t.TEXTURE_MAG_FILTER,ze[y.magFilter]),t.texParameteri(C,t.TEXTURE_MIN_FILTER,ze[y.minFilter]),y.compareFunction&&(t.texParameteri(C,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(C,t.TEXTURE_COMPARE_FUNC,Je[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===jt||y.minFilter!==_o&&y.minFilter!==Pr||y.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function K(C,y){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",R));const G=y.source;let q=p.get(G);q===void 0&&(q={},p.set(G,q));const oe=H(y);if(oe!==C.__cacheKey){q[oe]===void 0&&(q[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,k=!0),q[oe].usedTimes++;const ce=q[C.__cacheKey];ce!==void 0&&(q[C.__cacheKey].usedTimes--,ce.usedTimes===0&&P(y)),C.__cacheKey=oe,C.__webglTexture=q[oe].texture}return k}function se(C,y,k){return Math.floor(Math.floor(C/k)/y)}function ie(C,y,k,G){const oe=C.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,y.width,y.height,k,G,y.data);else{oe.sort((we,he)=>we.start-he.start);let ce=0;for(let we=1;we<oe.length;we++){const he=oe[ce],de=oe[we],Re=he.start+he.count,Ne=se(de.start,y.width,4),Fe=se(he.start,y.width,4);de.start<=Re+1&&Ne===Fe&&se(de.start+de.count-1,y.width,4)===Ne?he.count=Math.max(he.count,de.start+de.count-he.start):(++ce,oe[ce]=de)}oe.length=ce+1;const $=n.getParameter(t.UNPACK_ROW_LENGTH),ee=n.getParameter(t.UNPACK_SKIP_PIXELS),ue=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,y.width);for(let we=0,he=oe.length;we<he;we++){const de=oe[we],Re=Math.floor(de.start/4),Ne=Math.ceil(de.count/4),Fe=Re%y.width,L=Math.floor(Re/y.width),le=Ne,Q=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Fe),n.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,Fe,L,le,Q,k,G,y.data)}C.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,$),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ee),n.pixelStorei(t.UNPACK_SKIP_ROWS,ue)}}function Le(C,y,k){let G=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(G=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(G=t.TEXTURE_3D);const q=K(C,y),oe=y.source;n.bindTexture(G,C.__webglTexture,t.TEXTURE0+k);const ce=i.get(oe);if(oe.version!==ce.__version||q===!0){if(n.activeTexture(t.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const Q=$e.getPrimaries($e.workingColorSpace),fe=y.colorSpace===Zi?null:$e.getPrimaries(y.colorSpace),xe=y.colorSpace===Zi||Q===fe?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment);let ee=m(y.image,!1,r.maxTextureSize);ee=dn(y,ee);const ue=s.convert(y.format,y.colorSpace),we=s.convert(y.type);let he=S(y.internalFormat,ue,we,y.normalized,y.colorSpace,y.isVideoTexture);We(G,y);let de;const Re=y.mipmaps,Ne=y.isVideoTexture!==!0,Fe=ce.__version===void 0||q===!0,L=oe.dataReady,le=b(y,ee);if(y.isDepthTexture)he=T(y.format===Nr,y.type),Fe&&(Ne?n.texStorage2D(t.TEXTURE_2D,1,he,ee.width,ee.height):n.texImage2D(t.TEXTURE_2D,0,he,ee.width,ee.height,0,ue,we,null));else if(y.isDataTexture)if(Re.length>0){Ne&&Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,Re[0].width,Re[0].height);for(let Q=0,fe=Re.length;Q<fe;Q++)de=Re[Q],Ne?L&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,de.width,de.height,ue,we,de.data):n.texImage2D(t.TEXTURE_2D,Q,he,de.width,de.height,0,ue,we,de.data);y.generateMipmaps=!1}else Ne?(Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,ee.width,ee.height),L&&ie(y,ee,ue,we)):n.texImage2D(t.TEXTURE_2D,0,he,ee.width,ee.height,0,ue,we,ee.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ne&&Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,he,Re[0].width,Re[0].height,ee.depth);for(let Q=0,fe=Re.length;Q<fe;Q++)if(de=Re[Q],y.format!==Yn)if(ue!==null)if(Ne){if(L)if(y.layerUpdates.size>0){const xe=ym(de.width,de.height,y.format,y.type);for(const te of y.layerUpdates){const Ee=de.data.subarray(te*xe/de.data.BYTES_PER_ELEMENT,(te+1)*xe/de.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,te,de.width,de.height,1,ue,Ee)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,0,de.width,de.height,ee.depth,ue,de.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Q,he,de.width,de.height,ee.depth,0,de.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?L&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,0,de.width,de.height,ee.depth,ue,we,de.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Q,he,de.width,de.height,ee.depth,0,ue,we,de.data)}else{Ne&&Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,Re[0].width,Re[0].height);for(let Q=0,fe=Re.length;Q<fe;Q++)de=Re[Q],y.format!==Yn?ue!==null?Ne?L&&n.compressedTexSubImage2D(t.TEXTURE_2D,Q,0,0,de.width,de.height,ue,de.data):n.compressedTexImage2D(t.TEXTURE_2D,Q,he,de.width,de.height,0,de.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?L&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,de.width,de.height,ue,we,de.data):n.texImage2D(t.TEXTURE_2D,Q,he,de.width,de.height,0,ue,we,de.data)}else if(y.isDataArrayTexture)if(Ne){if(Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,he,ee.width,ee.height,ee.depth),L)if(y.layerUpdates.size>0){const Q=ym(ee.width,ee.height,y.format,y.type);for(const fe of y.layerUpdates){const xe=ee.data.subarray(fe*Q/ee.data.BYTES_PER_ELEMENT,(fe+1)*Q/ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,fe,ee.width,ee.height,1,ue,we,xe)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ue,we,ee.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,he,ee.width,ee.height,ee.depth,0,ue,we,ee.data);else if(y.isData3DTexture)Ne?(Fe&&n.texStorage3D(t.TEXTURE_3D,le,he,ee.width,ee.height,ee.depth),L&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ue,we,ee.data)):n.texImage3D(t.TEXTURE_3D,0,he,ee.width,ee.height,ee.depth,0,ue,we,ee.data);else if(y.isFramebufferTexture){if(Fe)if(Ne)n.texStorage2D(t.TEXTURE_2D,le,he,ee.width,ee.height);else{let Q=ee.width,fe=ee.height;for(let xe=0;xe<le;xe++)n.texImage2D(t.TEXTURE_2D,xe,he,Q,fe,0,ue,we,null),Q>>=1,fe>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in t){const Q=t.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),ee.parentNode!==Q){Q.appendChild(ee),h.add(y),Q.onpaint=fe=>{const xe=fe.changedElements;for(const te of h)xe.includes(te.image)&&(te.needsUpdate=!0)},Q.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ee);else{const xe=t.RGBA,te=t.RGBA,Ee=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,xe,te,Ee,ee)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ne&&Fe){const Q=it(Re[0]);n.texStorage2D(t.TEXTURE_2D,le,he,Q.width,Q.height)}for(let Q=0,fe=Re.length;Q<fe;Q++)de=Re[Q],Ne?L&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,ue,we,de):n.texImage2D(t.TEXTURE_2D,Q,he,ue,we,de);y.generateMipmaps=!1}else if(Ne){if(Fe){const Q=it(ee);n.texStorage2D(t.TEXTURE_2D,le,he,Q.width,Q.height)}L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue,we,ee)}else n.texImage2D(t.TEXTURE_2D,0,he,ue,we,ee);u(y)&&x(G),ce.__version=oe.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function De(C,y,k){if(y.image.length!==6)return;const G=K(C,y),q=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+k);const oe=i.get(q);if(q.version!==oe.__version||G===!0){n.activeTexture(t.TEXTURE0+k);const ce=$e.getPrimaries($e.workingColorSpace),$=y.colorSpace===Zi?null:$e.getPrimaries(y.colorSpace),ee=y.colorSpace===Zi||ce===$?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ue=y.isCompressedTexture||y.image[0].isCompressedTexture,we=y.image[0]&&y.image[0].isDataTexture,he=[];for(let te=0;te<6;te++)!ue&&!we?he[te]=m(y.image[te],!0,r.maxCubemapSize):he[te]=we?y.image[te].image:y.image[te],he[te]=dn(y,he[te]);const de=he[0],Re=s.convert(y.format,y.colorSpace),Ne=s.convert(y.type),Fe=S(y.internalFormat,Re,Ne,y.normalized,y.colorSpace),L=y.isVideoTexture!==!0,le=oe.__version===void 0||G===!0,Q=q.dataReady;let fe=b(y,de);We(t.TEXTURE_CUBE_MAP,y);let xe;if(ue){L&&le&&n.texStorage2D(t.TEXTURE_CUBE_MAP,fe,Fe,de.width,de.height);for(let te=0;te<6;te++){xe=he[te].mipmaps;for(let Ee=0;Ee<xe.length;Ee++){const Se=xe[Ee];y.format!==Yn?Re!==null?L?Q&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee,0,0,Se.width,Se.height,Re,Se.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee,Fe,Se.width,Se.height,0,Se.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee,0,0,Se.width,Se.height,Re,Ne,Se.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee,Fe,Se.width,Se.height,0,Re,Ne,Se.data)}}}else{if(xe=y.mipmaps,L&&le){xe.length>0&&fe++;const te=it(he[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,fe,Fe,te.width,te.height)}for(let te=0;te<6;te++)if(we){L?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,he[te].width,he[te].height,Re,Ne,he[te].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,he[te].width,he[te].height,0,Re,Ne,he[te].data);for(let Ee=0;Ee<xe.length;Ee++){const wt=xe[Ee].image[te].image;L?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee+1,0,0,wt.width,wt.height,Re,Ne,wt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee+1,Fe,wt.width,wt.height,0,Re,Ne,wt.data)}}else{L?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re,Ne,he[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,Re,Ne,he[te]);for(let Ee=0;Ee<xe.length;Ee++){const Se=xe[Ee];L?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee+1,0,0,Re,Ne,Se.image[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ee+1,Fe,Re,Ne,Se.image[te])}}}u(y)&&x(t.TEXTURE_CUBE_MAP),oe.__version=q.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Pe(C,y,k,G,q,oe){const ce=s.convert(k.format,k.colorSpace),$=s.convert(k.type),ee=S(k.internalFormat,ce,$,k.normalized,k.colorSpace),ue=i.get(y),we=i.get(k);if(we.__renderTarget=y,!ue.__hasExternalTextures){const he=Math.max(1,y.width>>oe),de=Math.max(1,y.height>>oe);q===t.TEXTURE_3D||q===t.TEXTURE_2D_ARRAY?n.texImage3D(q,oe,ee,he,de,y.depth,0,ce,$,null):n.texImage2D(q,oe,ee,he,de,0,ce,$,null)}n.bindFramebuffer(t.FRAMEBUFFER,C),It(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,G,q,we.__webglTexture,0,Et(y)):(q===t.TEXTURE_2D||q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,G,q,we.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function gt(C,y,k){if(t.bindRenderbuffer(t.RENDERBUFFER,C),y.depthBuffer){const G=y.depthTexture,q=G&&G.isDepthTexture?G.type:null,oe=T(y.stencilBuffer,q),ce=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;It(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Et(y),oe,y.width,y.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,Et(y),oe,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,oe,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ce,t.RENDERBUFFER,C)}else{const G=y.textures;for(let q=0;q<G.length;q++){const oe=G[q],ce=s.convert(oe.format,oe.colorSpace),$=s.convert(oe.type),ee=S(oe.internalFormat,ce,$,oe.normalized,oe.colorSpace);It(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Et(y),ee,y.width,y.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,Et(y),ee,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,ee,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function He(C,y,k){const G=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(y.depthTexture);if(q.__renderTarget=y,(!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G){if(q.__webglInit===void 0&&(q.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),We(t.TEXTURE_CUBE_MAP,y.depthTexture);const ue=s.convert(y.depthTexture.format),we=s.convert(y.depthTexture.type);let he;y.depthTexture.format===Di?he=t.DEPTH_COMPONENT24:y.depthTexture.format===Nr&&(he=t.DEPTH24_STENCIL8);for(let de=0;de<6;de++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,he,y.width,y.height,0,ue,we,null)}}else F(y.depthTexture,0);const oe=q.__webglTexture,ce=Et(y),$=G?t.TEXTURE_CUBE_MAP_POSITIVE_X+k:t.TEXTURE_2D,ee=y.depthTexture.format===Nr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(y.depthTexture.format===Di)It(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,$,oe,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,ee,$,oe,0);else if(y.depthTexture.format===Nr)It(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,$,oe,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,ee,$,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(C){const y=i.get(C),k=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const G=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),G){const q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,G.removeEventListener("dispose",q)};G.addEventListener("dispose",q),y.__depthDisposeCallback=q}y.__boundDepthTexture=G}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let G=0;G<6;G++)He(y.__webglFramebuffer[G],C,G);else{const G=C.texture.mipmaps;G&&G.length>0?He(y.__webglFramebuffer[0],C,0):He(y.__webglFramebuffer,C,0)}else if(k){y.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[G]),y.__webglDepthbuffer[G]===void 0)y.__webglDepthbuffer[G]=t.createRenderbuffer(),gt(y.__webglDepthbuffer[G],C,!1);else{const q=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=y.__webglDepthbuffer[G];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,oe)}}else{const G=C.texture.mipmaps;if(G&&G.length>0?n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),gt(y.__webglDepthbuffer,C,!1);else{const q=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,oe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ke(C,y,k){const G=i.get(C);y!==void 0&&Pe(G.__webglFramebuffer,C,C.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&nt(C)}function Ae(C){const y=C.texture,k=i.get(C),G=i.get(y);C.addEventListener("dispose",v);const q=C.textures,oe=C.isWebGLCubeRenderTarget===!0,ce=q.length>1;if(ce||(G.__webglTexture===void 0&&(G.__webglTexture=t.createTexture()),G.__version=y.version,a.memory.textures++),oe){k.__webglFramebuffer=[];for(let $=0;$<6;$++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[$]=[];for(let ee=0;ee<y.mipmaps.length;ee++)k.__webglFramebuffer[$][ee]=t.createFramebuffer()}else k.__webglFramebuffer[$]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let $=0;$<y.mipmaps.length;$++)k.__webglFramebuffer[$]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(ce)for(let $=0,ee=q.length;$<ee;$++){const ue=i.get(q[$]);ue.__webglTexture===void 0&&(ue.__webglTexture=t.createTexture(),a.memory.textures++)}if(C.samples>0&&It(C)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let $=0;$<q.length;$++){const ee=q[$];k.__webglColorRenderbuffer[$]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[$]);const ue=s.convert(ee.format,ee.colorSpace),we=s.convert(ee.type),he=S(ee.internalFormat,ue,we,ee.normalized,ee.colorSpace,C.isXRRenderTarget===!0),de=Et(C);t.renderbufferStorageMultisample(t.RENDERBUFFER,de,he,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+$,t.RENDERBUFFER,k.__webglColorRenderbuffer[$])}t.bindRenderbuffer(t.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),gt(k.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture),We(t.TEXTURE_CUBE_MAP,y);for(let $=0;$<6;$++)if(y.mipmaps&&y.mipmaps.length>0)for(let ee=0;ee<y.mipmaps.length;ee++)Pe(k.__webglFramebuffer[$][ee],C,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,ee);else Pe(k.__webglFramebuffer[$],C,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);u(y)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ce){for(let $=0,ee=q.length;$<ee;$++){const ue=q[$],we=i.get(ue);let he=t.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(he,we.__webglTexture),We(he,ue),Pe(k.__webglFramebuffer,C,ue,t.COLOR_ATTACHMENT0+$,he,0),u(ue)&&x(he)}n.unbindTexture()}else{let $=t.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&($=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture($,G.__webglTexture),We($,y),y.mipmaps&&y.mipmaps.length>0)for(let ee=0;ee<y.mipmaps.length;ee++)Pe(k.__webglFramebuffer[ee],C,y,t.COLOR_ATTACHMENT0,$,ee);else Pe(k.__webglFramebuffer,C,y,t.COLOR_ATTACHMENT0,$,0);u(y)&&x($),n.unbindTexture()}C.depthBuffer&&nt(C)}function Ze(C){const y=C.textures;for(let k=0,G=y.length;k<G;k++){const q=y[k];if(u(q)){const oe=M(C),ce=i.get(q).__webglTexture;n.bindTexture(oe,ce),x(oe),n.unbindTexture()}}}const ct=[],Nt=[];function Lt(C){if(C.samples>0){if(It(C)===!1){const y=C.textures,k=C.width,G=C.height;let q=t.COLOR_BUFFER_BIT;const oe=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=i.get(C),$=y.length>1;if($)for(let ue=0;ue<y.length;ue++)n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const ee=C.texture.mipmaps;ee&&ee.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<y.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(q|=t.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(q|=t.STENCIL_BUFFER_BIT)),$){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const we=i.get(y[ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,we,0)}t.blitFramebuffer(0,0,k,G,0,0,k,G,q,t.NEAREST),l===!0&&(ct.length=0,Nt.length=0,ct.push(t.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ct.push(oe),Nt.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Nt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ct))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),$)for(let ue=0;ue<y.length;ue++){n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const we=i.get(y[ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,we,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const y=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function Et(C){return Math.min(r.maxSamples,C.samples)}function It(C){const y=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function I(C){const y=a.render.frame;f.get(C)!==y&&(f.set(C,y),C.update())}function dn(C,y){const k=C.colorSpace,G=C.format,q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Ul&&k!==Zi&&($e.getTransfer(k)===rt?(G!==Yn||q!==wn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",k)),y}function it(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=j,this.getTextureUnits=Z,this.setTextureUnits=O,this.setTexture2D=F,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=ne,this.rebindTextures=Ke,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=It,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function b2(t,e){function n(i,r=Zi){let s;const a=$e.getTransfer(r);if(i===wn)return t.UNSIGNED_BYTE;if(i===rh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===sh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===wx)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===bx)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Mx)return t.BYTE;if(i===Ex)return t.SHORT;if(i===Ha)return t.UNSIGNED_SHORT;if(i===ih)return t.INT;if(i===hi)return t.UNSIGNED_INT;if(i===oi)return t.FLOAT;if(i===Ii)return t.HALF_FLOAT;if(i===Tx)return t.ALPHA;if(i===Ax)return t.RGB;if(i===Yn)return t.RGBA;if(i===Di)return t.DEPTH_COMPONENT;if(i===Nr)return t.DEPTH_STENCIL;if(i===Rx)return t.RED;if(i===ah)return t.RED_INTEGER;if(i===zr)return t.RG;if(i===oh)return t.RG_INTEGER;if(i===lh)return t.RGBA_INTEGER;if(i===nl||i===il||i===rl||i===sl)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===nl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===nl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Md||i===Ed||i===wd||i===bd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Md)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ed)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===bd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Td||i===Ad||i===Rd||i===Cd||i===Pd||i===Il||i===Nd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Td||i===Ad)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Rd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Cd)return s.COMPRESSED_R11_EAC;if(i===Pd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Il)return s.COMPRESSED_RG11_EAC;if(i===Nd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ld||i===Id||i===Dd||i===Ud||i===Fd||i===kd||i===Od||i===Bd||i===zd||i===Vd||i===Hd||i===Gd||i===Wd||i===jd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ld)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Id)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Dd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ud)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Od)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jd)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xd||i===Yd||i===qd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Xd)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$d||i===Kd||i===Dl||i===Zd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===$d)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Kd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Dl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ga?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const T2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class R2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Bx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new pi({vertexShader:T2,fragmentShader:A2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ut(new ac(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C2 extends Gr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,h=null,d=null,p=null,_=null;const E=typeof XRWebGLBinding<"u",m=new R2,u={},x=n.getContextAttributes();let M=null,S=null;const T=[],b=[],R=new Xe;let v=null;const A=new En;A.viewport=new _t;const P=new En;P.viewport=new _t;const N=[A,P],U=new OS;let j=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let se=T[K];return se===void 0&&(se=new Yc,T[K]=se),se.getTargetRaySpace()},this.getControllerGrip=function(K){let se=T[K];return se===void 0&&(se=new Yc,T[K]=se),se.getGripSpace()},this.getHand=function(K){let se=T[K];return se===void 0&&(se=new Yc,T[K]=se),se.getHandSpace()};function O(K){const se=b.indexOf(K.inputSource);if(se===-1)return;const ie=T[se];ie!==void 0&&(ie.update(K.inputSource,K.frame,c||a),ie.dispatchEvent({type:K.type,data:K.inputSource}))}function Y(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let K=0;K<T.length;K++){const se=b[K];se!==null&&(b[K]=null,T[K].disconnect(se))}j=null,Z=null,m.reset();for(const K in u)delete u[K];e.setRenderTarget(M),p=null,d=null,h=null,r=null,S=null,We.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),x.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Le=null,De=null;x.depth&&(De=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=x.stencil?Nr:Di,Le=x.stencil?Ga:hi);const Pe={colorFormat:n.RGBA8,depthFormat:De,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Pe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new fi(d.textureWidth,d.textureHeight,{format:Yn,type:wn,depthTexture:new Os(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ie={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new fi(p.framebufferWidth,p.framebufferHeight,{format:Yn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),We.setContext(r),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(K){for(let se=0;se<K.removed.length;se++){const ie=K.removed[se],Le=b.indexOf(ie);Le>=0&&(b[Le]=null,T[Le].disconnect(ie))}for(let se=0;se<K.added.length;se++){const ie=K.added[se];let Le=b.indexOf(ie);if(Le===-1){for(let Pe=0;Pe<T.length;Pe++)if(Pe>=b.length){b.push(ie),Le=Pe;break}else if(b[Pe]===null){b[Pe]=ie,Le=Pe;break}if(Le===-1)break}const De=T[Le];De&&De.connect(ie)}}const F=new B,X=new B;function J(K,se,ie){F.setFromMatrixPosition(se.matrixWorld),X.setFromMatrixPosition(ie.matrixWorld);const Le=F.distanceTo(X),De=se.projectionMatrix.elements,Pe=ie.projectionMatrix.elements,gt=De[14]/(De[10]-1),He=De[14]/(De[10]+1),nt=(De[9]+1)/De[5],Ke=(De[9]-1)/De[5],Ae=(De[8]-1)/De[0],Ze=(Pe[8]+1)/Pe[0],ct=gt*Ae,Nt=gt*Ze,Lt=Le/(-Ae+Ze),Et=Lt*-Ae;if(se.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Et),K.translateZ(Lt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),De[10]===-1)K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const It=gt+Lt,I=He+Lt,dn=ct-Et,it=Nt+(Le-Et),C=nt*He/I*It,y=Ke*He/I*It;K.projectionMatrix.makePerspective(dn,it,C,y,It,I),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ne(K,se){se===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(se.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let se=K.near,ie=K.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),U.near=P.near=A.near=se,U.far=P.far=A.far=ie,(j!==U.near||Z!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),j=U.near,Z=U.far),U.layers.mask=K.layers.mask|6,A.layers.mask=U.layers.mask&-5,P.layers.mask=U.layers.mask&-3;const Le=K.parent,De=U.cameras;ne(U,Le);for(let Pe=0;Pe<De.length;Pe++)ne(De[Pe],Le);De.length===2?J(U,A,P):U.projectionMatrix.copy(A.projectionMatrix),ae(K,U,Le)};function ae(K,se,ie){ie===null?K.matrix.copy(se.matrixWorld):(K.matrix.copy(ie.matrixWorld),K.matrix.invert(),K.matrix.multiply(se.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Qd*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(K){return u[K]};let ze=null;function Je(K,se){if(f=se.getViewerPose(c||a),_=se,f!==null){const ie=f.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Le=!1;ie.length!==U.cameras.length&&(U.cameras.length=0,Le=!0);for(let He=0;He<ie.length;He++){const nt=ie[He];let Ke=null;if(p!==null)Ke=p.getViewport(nt);else{const Ze=h.getViewSubImage(d,nt);Ke=Ze.viewport,He===0&&(e.setRenderTargetTextures(S,Ze.colorTexture,Ze.depthStencilTexture),e.setRenderTarget(S))}let Ae=N[He];Ae===void 0&&(Ae=new En,Ae.layers.enable(He),Ae.viewport=new _t,N[He]=Ae),Ae.matrix.fromArray(nt.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(nt.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),He===0&&(U.matrix.copy(Ae.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Le===!0&&U.cameras.push(Ae)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){h=i.getBinding();const He=h.getDepthInformation(ie[0]);He&&He.isValid&&He.texture&&m.init(He,r.renderState)}if(De&&De.includes("camera-access")&&E){e.state.unbindTexture(),h=i.getBinding();for(let He=0;He<ie.length;He++){const nt=ie[He].camera;if(nt){let Ke=u[nt];Ke||(Ke=new Bx,u[nt]=Ke);const Ae=h.getCameraImage(nt);Ke.sourceTexture=Ae}}}}for(let ie=0;ie<T.length;ie++){const Le=b[ie],De=T[ie];Le!==null&&De!==void 0&&De.update(Le,se,c||a)}ze&&ze(K,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),_=null}const We=new Gx;We.setAnimationLoop(Je),this.setAnimationLoop=function(K){ze=K},this.dispose=function(){}}}const P2=new St,Kx=new Ue;Kx.set(-1,0,0,0,1,0,0,0,1);function N2(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,zx(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,x,M,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(m,u):u.isMeshLambertMaterial?(s(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(s(m,u),_(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),E(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,x,M):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===vn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===vn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const x=e.get(u),M=x.envMap,S=x.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(P2.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Kx),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,x,M){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*x,m.scale.value=M*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,x){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===vn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function E(m,u){const x=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function L2(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const b=T.program;i.uniformBlockBinding(S,b)}function c(S,T){let b=r[S.id];b===void 0&&(m(S),b=f(S),r[S.id]=b,S.addEventListener("dispose",x));const R=T.program;i.updateUBOMapping(S,R);const v=e.render.frame;s[S.id]!==v&&(d(S),s[S.id]=v)}function f(S){const T=h();S.__bindingPointIndex=T;const b=t.createBuffer(),R=S.__size,v=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,R,v),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,b),b}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const T=r[S.id],b=S.uniforms,R=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let v=0,A=b.length;v<A;v++){const P=b[v];if(Array.isArray(P))for(let N=0,U=P.length;N<U;N++)p(P[N],v,N,R);else p(P,v,0,R)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(S,T,b,R){if(E(S,T,b,R)===!0){const v=S.__offset,A=S.value;if(Array.isArray(A)){let P=0;for(let N=0;N<A.length;N++){const U=A[N],j=u(U);_(U,S.__data,P),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(P+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,S.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,v,S.__data)}}function _(S,T,b){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,b)}function E(S,T,b,R){const v=S.value,A=T+"_"+b;if(R[A]===void 0)return typeof v=="number"||typeof v=="boolean"?R[A]=v:ArrayBuffer.isView(v)?R[A]=v.slice():R[A]=v.clone(),!0;{const P=R[A];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(S){const T=S.uniforms;let b=0;const R=16;for(let A=0,P=T.length;A<P;A++){const N=Array.isArray(T[A])?T[A]:[T[A]];for(let U=0,j=N.length;U<j;U++){const Z=N[U],O=Array.isArray(Z.value)?Z.value:[Z.value];for(let Y=0,H=O.length;Y<H;Y++){const F=O[Y],X=u(F),J=b%R,ne=J%X.boundary,ae=J+ne;b+=ne,ae!==0&&R-ae<X.storage&&(b+=R-ae),Z.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=b,b+=X.storage}}}const v=b%R;return v>0&&(b+=R-v),S.__size=b,S.__cache={},this}function u(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",S),T}function x(S){const T=S.target;T.removeEventListener("dispose",x);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),t.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function M(){for(const S in r)t.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:M}}const I2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function D2(){return ii===null&&(ii=new _S(I2,16,16,zr,Ii),ii.name="DFG_LUT",ii.minFilter=tn,ii.magFilter=tn,ii.wrapS=bi,ii.wrapT=bi,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class U2{constructor(e={}){const{canvas:n=K1(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=wn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const E=p,m=new Set([lh,oh,ah]),u=new Set([wn,hi,Ha,Ga,rh,sh]),x=new Uint32Array(4),M=new Int32Array(4),S=new B;let T=null,b=null;const R=[],v=[];let A=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,U=null,j=null,Z=null,O=null;this._outputColorSpace=Ln;let Y=0,H=0,F=null,X=-1,J=null;const ne=new _t,ae=new _t;let ze=null;const Je=new je(0);let We=0,K=n.width,se=n.height,ie=1,Le=null,De=null;const Pe=new _t(0,0,K,se),gt=new _t(0,0,K,se);let He=!1;const nt=new fh;let Ke=!1,Ae=!1;const Ze=new St,ct=new B,Nt=new _t,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Et=!1;function It(){return F===null?ie:1}let I=i;function dn(w,D){return n.getContext(w,D)}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${nh}`),n.addEventListener("webglcontextlost",wt,!1),n.addEventListener("webglcontextrestored",ut,!1),n.addEventListener("webglcontextcreationerror",Jn,!1),I===null){const D="webgl2";if(I=dn(D,w),I===null)throw dn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(w){throw et("WebGLRenderer: "+w.message),w}let it,C,y,k,G,q,oe,ce,$,ee,ue,we,he,de,Re,Ne,Fe,L,le,Q,fe,xe,te;function Ee(){it=new Dw(I),it.init(),fe=new b2(I,it),C=new Tw(I,it,e,fe),y=new E2(I,it),C.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),j=I.createFramebuffer(),Z=I.createFramebuffer(),O=I.createFramebuffer(),k=new kw(I),G=new c2,q=new w2(I,it,y,G,C,fe,k),oe=new Iw(P),ce=new VS(I),xe=new ww(I,ce),$=new Uw(I,ce,k,xe),ee=new Bw(I,$,ce,xe,k),L=new Ow(I,C,q),Re=new Aw(G),ue=new l2(P,oe,it,C,xe,Re),we=new N2(P,G),he=new d2,de=new x2(it),Fe=new Ew(P,oe,y,ee,_,l),Ne=new M2(P,ee,C),te=new L2(I,k,C,y),le=new bw(I,it,k),Q=new Fw(I,it,k),k.programs=ue.programs,P.capabilities=C,P.extensions=it,P.properties=G,P.renderLists=he,P.shadowMap=Ne,P.state=y,P.info=k}Ee(),E!==wn&&(A=new Vw(E,n.width,n.height,o,r,s));const Se=new C2(P,I);this.xr=Se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=it.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=it.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(w){w!==void 0&&(ie=w,this.setSize(K,se,!1))},this.getSize=function(w){return w.set(K,se)},this.setSize=function(w,D,W=!0){if(Se.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}K=w,se=D,n.width=Math.floor(w*ie),n.height=Math.floor(D*ie),W===!0&&(n.style.width=w+"px",n.style.height=D+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(K*ie,se*ie).floor()},this.setDrawingBufferSize=function(w,D,W){K=w,se=D,ie=W,n.width=Math.floor(w*W),n.height=Math.floor(D*W),this.setViewport(0,0,w,D)},this.setEffects=function(w){if(E===wn){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let D=0;D<w.length;D++)if(w[D].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ne)},this.getViewport=function(w){return w.copy(Pe)},this.setViewport=function(w,D,W,z){w.isVector4?Pe.set(w.x,w.y,w.z,w.w):Pe.set(w,D,W,z),y.viewport(ne.copy(Pe).multiplyScalar(ie).round())},this.getScissor=function(w){return w.copy(gt)},this.setScissor=function(w,D,W,z){w.isVector4?gt.set(w.x,w.y,w.z,w.w):gt.set(w,D,W,z),y.scissor(ae.copy(gt).multiplyScalar(ie).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(w){y.setScissorTest(He=w)},this.setOpaqueSort=function(w){Le=w},this.setTransparentSort=function(w){De=w},this.getClearColor=function(w){return w.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(w=!0,D=!0,W=!0){let z=0;if(w){let V=!1;if(F!==null){const ge=F.texture.format;V=m.has(ge)}if(V){const ge=F.texture.type,_e=u.has(ge),me=Fe.getClearColor(),Me=Fe.getClearAlpha(),be=me.r,ke=me.g,Ge=me.b;_e?(x[0]=be,x[1]=ke,x[2]=Ge,x[3]=Me,I.clearBufferuiv(I.COLOR,0,x)):(M[0]=be,M[1]=ke,M[2]=Ge,M[3]=Me,I.clearBufferiv(I.COLOR,0,M))}else z|=I.COLOR_BUFFER_BIT}D&&(z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),U=w},this.dispose=function(){n.removeEventListener("webglcontextlost",wt,!1),n.removeEventListener("webglcontextrestored",ut,!1),n.removeEventListener("webglcontextcreationerror",Jn,!1),Fe.dispose(),he.dispose(),de.dispose(),G.dispose(),oe.dispose(),ee.dispose(),xe.dispose(),te.dispose(),ue.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Mh),Se.removeEventListener("sessionend",Eh),xr.stop()};function wt(w){w.preventDefault(),Kp("WebGLRenderer: Context Lost."),N=!0}function ut(){Kp("WebGLRenderer: Context Restored."),N=!1;const w=k.autoReset,D=Ne.enabled,W=Ne.autoUpdate,z=Ne.needsUpdate,V=Ne.type;Ee(),k.autoReset=w,Ne.enabled=D,Ne.autoUpdate=W,Ne.needsUpdate=z,Ne.type=V}function Jn(w){et("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Qn(w){const D=w.target;D.removeEventListener("dispose",Qn),Zx(D)}function Zx(w){Jx(w),G.remove(w)}function Jx(w){const D=G.get(w).programs;D!==void 0&&(D.forEach(function(W){ue.releaseProgram(W)}),w.isShaderMaterial&&ue.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,W,z,V,ge){D===null&&(D=Lt);const _e=V.isMesh&&V.matrixWorld.determinantAffine()<0,me=tv(w,D,W,z,V);y.setMaterial(z,_e);let Me=W.index,be=1;if(z.wireframe===!0){if(Me=$.getWireframeAttribute(W),Me===void 0)return;be=2}const ke=W.drawRange,Ge=W.attributes.position;let Te=ke.start*be,at=(ke.start+ke.count)*be;ge!==null&&(Te=Math.max(Te,ge.start*be),at=Math.min(at,(ge.start+ge.count)*be)),Me!==null?(Te=Math.max(Te,0),at=Math.min(at,Me.count)):Ge!=null&&(Te=Math.max(Te,0),at=Math.min(at,Ge.count));const At=at-Te;if(At<0||At===1/0)return;xe.setup(V,z,me,W,Me);let bt,ot=le;if(Me!==null&&(bt=ce.get(Me),ot=Q,ot.setIndex(bt)),V.isMesh)z.wireframe===!0?(y.setLineWidth(z.wireframeLinewidth*It()),ot.setMode(I.LINES)):ot.setMode(I.TRIANGLES);else if(V.isLine){let $t=z.linewidth;$t===void 0&&($t=1),y.setLineWidth($t*It()),V.isLineSegments?ot.setMode(I.LINES):V.isLineLoop?ot.setMode(I.LINE_LOOP):ot.setMode(I.LINE_STRIP)}else V.isPoints?ot.setMode(I.POINTS):V.isSprite&&ot.setMode(I.TRIANGLES);if(V.isBatchedMesh)if(it.get("WEBGL_multi_draw"))ot.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const $t=V._multiDrawStarts,ve=V._multiDrawCounts,_n=V._multiDrawCount,Qe=Me?ce.get(Me).bytesPerElement:1,Pn=G.get(z).currentProgram.getUniforms();for(let ei=0;ei<_n;ei++)Pn.setValue(I,"_gl_DrawID",ei),ot.render($t[ei]/Qe,ve[ei])}else if(V.isInstancedMesh)ot.renderInstances(Te,At,V.count);else if(W.isInstancedBufferGeometry){const $t=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ve=Math.min(W.instanceCount,$t);ot.renderInstances(Te,At,ve)}else ot.render(Te,At)};function Sh(w,D,W){w.transparent===!0&&w.side===Mi&&w.forceSinglePass===!1?(w.side=vn,w.needsUpdate=!0,eo(w,D,W),w.side=fr,w.needsUpdate=!0,eo(w,D,W),w.side=Mi):eo(w,D,W)}this.compile=function(w,D,W=null){W===null&&(W=w),b=de.get(W),b.init(D),v.push(b),W.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),w!==W&&w.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),b.setupLights();const z=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ge=V.material;if(ge)if(Array.isArray(ge))for(let _e=0;_e<ge.length;_e++){const me=ge[_e];Sh(me,W,V),z.add(me)}else Sh(ge,W,V),z.add(ge)}),b=v.pop(),z},this.compileAsync=function(w,D,W=null){const z=this.compile(w,D,W);return new Promise(V=>{function ge(){if(z.forEach(function(_e){G.get(_e).currentProgram.isReady()&&z.delete(_e)}),z.size===0){V(w);return}setTimeout(ge,10)}it.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let cc=null;function Qx(w){cc&&cc(w)}function Mh(){xr.stop()}function Eh(){xr.start()}const xr=new Gx;xr.setAnimationLoop(Qx),typeof self<"u"&&xr.setContext(self),this.setAnimationLoop=function(w){cc=w,Se.setAnimationLoop(w),w===null?xr.stop():xr.start()},Se.addEventListener("sessionstart",Mh),Se.addEventListener("sessionend",Eh),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;U!==null&&U.renderStart(w,D);const W=Se.enabled===!0&&Se.isPresenting===!0,z=A!==null&&(F===null||W)&&A.begin(P,F);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(D),D=Se.getCamera()),w.isScene===!0&&w.onBeforeRender(P,w,D,F),b=de.get(w,v.length),b.init(D),b.state.textureUnits=q.getTextureUnits(),v.push(b),Ze.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),nt.setFromProjectionMatrix(Ze,li,D.reversedDepth),Ae=this.localClippingEnabled,Ke=Re.init(this.clippingPlanes,Ae),T=he.get(w,R.length),T.init(),R.push(T),Se.enabled===!0&&Se.isPresenting===!0){const _e=P.xr.getDepthSensingMesh();_e!==null&&uc(_e,D,-1/0,P.sortObjects)}uc(w,D,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(Le,De,D.reversedDepth),Et=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,Et&&Fe.addToRenderList(T,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Re.beginShadows();const V=b.state.shadowsArray;if(Ne.render(V,w,D),Ke===!0&&Re.endShadows(),(z&&A.hasRenderPass())===!1){const _e=T.opaque,me=T.transmissive;if(b.setupLights(),D.isArrayCamera){const Me=D.cameras;if(me.length>0)for(let be=0,ke=Me.length;be<ke;be++){const Ge=Me[be];bh(_e,me,w,Ge)}Et&&Fe.render(w);for(let be=0,ke=Me.length;be<ke;be++){const Ge=Me[be];wh(T,w,Ge,Ge.viewport)}}else me.length>0&&bh(_e,me,w,D),Et&&Fe.render(w),wh(T,w,D)}F!==null&&H===0&&(q.updateMultisampleRenderTarget(F),q.updateRenderTargetMipmap(F)),z&&A.end(P),w.isScene===!0&&w.onAfterRender(P,w,D),xe.resetDefaultState(),X=-1,J=null,v.pop(),v.length>0?(b=v[v.length-1],q.setTextureUnits(b.state.textureUnits),Ke===!0&&Re.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,U!==null&&U.renderEnd()};function uc(w,D,W,z){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||nt.intersectsSprite(w)){z&&Nt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ze);const _e=ee.update(w),me=w.material;me.visible&&T.push(w,_e,me,W,Nt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||nt.intersectsObject(w))){const _e=ee.update(w),me=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Nt.copy(w.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Nt.copy(_e.boundingSphere.center)),Nt.applyMatrix4(w.matrixWorld).applyMatrix4(Ze)),Array.isArray(me)){const Me=_e.groups;for(let be=0,ke=Me.length;be<ke;be++){const Ge=Me[be],Te=me[Ge.materialIndex];Te&&Te.visible&&T.push(w,_e,Te,W,Nt.z,Ge)}}else me.visible&&T.push(w,_e,me,W,Nt.z,null)}}const ge=w.children;for(let _e=0,me=ge.length;_e<me;_e++)uc(ge[_e],D,W,z)}function wh(w,D,W,z){const{opaque:V,transmissive:ge,transparent:_e}=w;b.setupLightsView(W),Ke===!0&&Re.setGlobalState(P.clippingPlanes,W),z&&y.viewport(ne.copy(z)),V.length>0&&Qa(V,D,W),ge.length>0&&Qa(ge,D,W),_e.length>0&&Qa(_e,D,W),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function bh(w,D,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[z.id]===void 0){const Te=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[z.id]=new fi(1,1,{generateMipmaps:!0,type:Te?Ii:wn,minFilter:Pr,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const ge=b.state.transmissionRenderTarget[z.id],_e=z.viewport||ne;ge.setSize(_e.z*P.transmissionResolutionScale,_e.w*P.transmissionResolutionScale);const me=P.getRenderTarget(),Me=P.getActiveCubeFace(),be=P.getActiveMipmapLevel();P.setRenderTarget(ge),P.getClearColor(Je),We=P.getClearAlpha(),We<1&&P.setClearColor(16777215,.5),P.clear(),Et&&Fe.render(W);const ke=P.toneMapping;P.toneMapping=di;const Ge=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),b.setupLightsView(z),Ke===!0&&Re.setGlobalState(P.clippingPlanes,z),Qa(w,W,z),q.updateMultisampleRenderTarget(ge),q.updateRenderTargetMipmap(ge),it.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let at=0,At=D.length;at<At;at++){const bt=D[at],{object:ot,geometry:$t,material:ve,group:_n}=bt;if(ve.side===Mi&&ot.layers.test(z.layers)){const Qe=ve.side;ve.side=vn,ve.needsUpdate=!0,Th(ot,W,z,$t,ve,_n),ve.side=Qe,ve.needsUpdate=!0,Te=!0}}Te===!0&&(q.updateMultisampleRenderTarget(ge),q.updateRenderTargetMipmap(ge))}P.setRenderTarget(me,Me,be),P.setClearColor(Je,We),Ge!==void 0&&(z.viewport=Ge),P.toneMapping=ke}function Qa(w,D,W){const z=D.isScene===!0?D.overrideMaterial:null;for(let V=0,ge=w.length;V<ge;V++){const _e=w[V],{object:me,geometry:Me,group:be}=_e;let ke=_e.material;ke.allowOverride===!0&&z!==null&&(ke=z),me.layers.test(W.layers)&&Th(me,D,W,Me,ke,be)}}function Th(w,D,W,z,V,ge){w.onBeforeRender(P,D,W,z,V,ge),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(P,D,W,z,w,ge),V.transparent===!0&&V.side===Mi&&V.forceSinglePass===!1?(V.side=vn,V.needsUpdate=!0,P.renderBufferDirect(W,D,z,V,w,ge),V.side=fr,V.needsUpdate=!0,P.renderBufferDirect(W,D,z,V,w,ge),V.side=Mi):P.renderBufferDirect(W,D,z,V,w,ge),w.onAfterRender(P,D,W,z,V,ge)}function eo(w,D,W){D.isScene!==!0&&(D=Lt);const z=G.get(w),V=b.state.lights,ge=b.state.shadowsArray,_e=V.state.version,me=ue.getParameters(w,V.state,ge,D,W,b.state.lightProbeGridArray),Me=ue.getProgramCacheKey(me);let be=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,z.fog=D.fog;const ke=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=oe.get(w.envMap||z.environment,ke),z.envMapRotation=z.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,be===void 0&&(w.addEventListener("dispose",Qn),be=new Map,z.programs=be);let Ge=be.get(Me);if(Ge!==void 0){if(z.currentProgram===Ge&&z.lightsStateVersion===_e)return Rh(w,me),Ge}else me.uniforms=ue.getUniforms(w),U!==null&&w.isNodeMaterial&&U.build(w,W,me),w.onBeforeCompile(me,P),Ge=ue.acquireProgram(me,Me),be.set(Me,Ge),z.uniforms=me.uniforms;const Te=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Te.clippingPlanes=Re.uniform),Rh(w,me),z.needsLights=iv(w),z.lightsStateVersion=_e,z.needsLights&&(Te.ambientLightColor.value=V.state.ambient,Te.lightProbe.value=V.state.probe,Te.directionalLights.value=V.state.directional,Te.directionalLightShadows.value=V.state.directionalShadow,Te.spotLights.value=V.state.spot,Te.spotLightShadows.value=V.state.spotShadow,Te.rectAreaLights.value=V.state.rectArea,Te.ltc_1.value=V.state.rectAreaLTC1,Te.ltc_2.value=V.state.rectAreaLTC2,Te.pointLights.value=V.state.point,Te.pointLightShadows.value=V.state.pointShadow,Te.hemisphereLights.value=V.state.hemi,Te.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Te.spotLightMatrix.value=V.state.spotLightMatrix,Te.spotLightMap.value=V.state.spotLightMap,Te.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=b.state.lightProbeGridArray.length>0,z.currentProgram=Ge,z.uniformsList=null,Ge}function Ah(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=al.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function Rh(w,D){const W=G.get(w);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function ev(w,D){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let W=0,z=w.length;W<z;W++){const V=w[W];if(V.texture!==null&&V.boundingBox.containsPoint(S))return V}return null}function tv(w,D,W,z,V){D.isScene!==!0&&(D=Lt),q.resetTextureUnits();const ge=D.fog,_e=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?D.environment:null,me=F===null?P.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:$e.workingColorSpace,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,be=oe.get(z.envMap||_e,Me),ke=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ge=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Te=!!W.morphAttributes.position,at=!!W.morphAttributes.normal,At=!!W.morphAttributes.color;let bt=di;z.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(bt=P.toneMapping);const ot=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,$t=ot!==void 0?ot.length:0,ve=G.get(z),_n=b.state.lights;if(Ke===!0&&(Ae===!0||w!==J)){const dt=w===J&&z.id===X;Re.setState(z,w,dt)}let Qe=!1;z.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==_n.state.version||ve.outputColorSpace!==me||V.isBatchedMesh&&ve.batching===!1||!V.isBatchedMesh&&ve.batching===!0||V.isBatchedMesh&&ve.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ve.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ve.instancing===!1||!V.isInstancedMesh&&ve.instancing===!0||V.isSkinnedMesh&&ve.skinning===!1||!V.isSkinnedMesh&&ve.skinning===!0||V.isInstancedMesh&&ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ve.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ve.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ve.instancingMorph===!1&&V.morphTexture!==null||ve.envMap!==be||z.fog===!0&&ve.fog!==ge||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Re.numPlanes||ve.numIntersection!==Re.numIntersection)||ve.vertexAlphas!==ke||ve.vertexTangents!==Ge||ve.morphTargets!==Te||ve.morphNormals!==at||ve.morphColors!==At||ve.toneMapping!==bt||ve.morphTargetsCount!==$t||!!ve.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,ve.__version=z.version);let Pn=ve.currentProgram;Qe===!0&&(Pn=eo(z,D,V),U&&z.isNodeMaterial&&U.onUpdateProgram(z,Pn,ve));let ei=!1,ki=!1,Wr=!1;const lt=Pn.getUniforms(),Rt=ve.uniforms;if(y.useProgram(Pn.program)&&(ei=!0,ki=!0,Wr=!0),z.id!==X&&(X=z.id,ki=!0),ve.needsLights){const dt=ev(b.state.lightProbeGridArray,V);ve.lightProbeGrid!==dt&&(ve.lightProbeGrid=dt,ki=!0)}if(ei||J!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),lt.setValue(I,"projectionMatrix",w.projectionMatrix),lt.setValue(I,"viewMatrix",w.matrixWorldInverse);const Bi=lt.map.cameraPosition;Bi!==void 0&&Bi.setValue(I,ct.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&lt.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),J!==w&&(J=w,ki=!0,Wr=!0)}if(ve.needsLights&&(_n.state.directionalShadowMap.length>0&&lt.setValue(I,"directionalShadowMap",_n.state.directionalShadowMap,q),_n.state.spotShadowMap.length>0&&lt.setValue(I,"spotShadowMap",_n.state.spotShadowMap,q),_n.state.pointShadowMap.length>0&&lt.setValue(I,"pointShadowMap",_n.state.pointShadowMap,q)),V.isSkinnedMesh){lt.setOptional(I,V,"bindMatrix"),lt.setOptional(I,V,"bindMatrixInverse");const dt=V.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),lt.setValue(I,"boneTexture",dt.boneTexture,q))}V.isBatchedMesh&&(lt.setOptional(I,V,"batchingTexture"),lt.setValue(I,"batchingTexture",V._matricesTexture,q),lt.setOptional(I,V,"batchingIdTexture"),lt.setValue(I,"batchingIdTexture",V._indirectTexture,q),lt.setOptional(I,V,"batchingColorTexture"),V._colorsTexture!==null&&lt.setValue(I,"batchingColorTexture",V._colorsTexture,q));const Oi=W.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&L.update(V,W,Pn),(ki||ve.receiveShadow!==V.receiveShadow)&&(ve.receiveShadow=V.receiveShadow,lt.setValue(I,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&D.environment!==null&&(Rt.envMapIntensity.value=D.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=D2()),ki){if(lt.setValue(I,"toneMappingExposure",P.toneMappingExposure),ve.needsLights&&nv(Rt,Wr),ge&&z.fog===!0&&we.refreshFogUniforms(Rt,ge),we.refreshMaterialUniforms(Rt,z,ie,se,b.state.transmissionRenderTarget[w.id]),ve.needsLights&&ve.lightProbeGrid){const dt=ve.lightProbeGrid;Rt.probesSH.value=dt.texture,Rt.probesMin.value.copy(dt.boundingBox.min),Rt.probesMax.value.copy(dt.boundingBox.max),Rt.probesResolution.value.copy(dt.resolution)}al.upload(I,Ah(ve),Rt,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(al.upload(I,Ah(ve),Rt,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(I,"center",V.center),lt.setValue(I,"modelViewMatrix",V.modelViewMatrix),lt.setValue(I,"normalMatrix",V.normalMatrix),lt.setValue(I,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){const dt=z.uniformsGroups;for(let Bi=0,jr=dt.length;Bi<jr;Bi++){const Ch=dt[Bi];te.update(Ch,Pn),te.bind(Ch,Pn)}}return Pn}function nv(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function iv(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(w,D,W){const z=G.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),G.get(w.texture).__webglTexture=D,G.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,D){const W=G.get(w);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,W=0){F=w,Y=D,H=W;let z=null,V=!1,ge=!1;if(w){const me=G.get(w);if(me.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),ne.copy(w.viewport),ae.copy(w.scissor),ze=w.scissorTest,y.viewport(ne),y.scissor(ae),y.setScissorTest(ze),X=-1;return}else if(me.__webglFramebuffer===void 0)q.setupRenderTarget(w);else if(me.__hasExternalTextures)q.rebindTextures(w,G.get(w.texture).__webglTexture,G.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ke=w.depthTexture;if(me.__boundDepthTexture!==ke){if(ke!==null&&G.has(ke)&&(w.width!==ke.image.width||w.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(w)}}const Me=w.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(ge=!0);const be=G.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(be[D])?z=be[D][W]:z=be[D],V=!0):w.samples>0&&q.useMultisampledRTT(w)===!1?z=G.get(w).__webglMultisampledFramebuffer:Array.isArray(be)?z=be[W]:z=be,ne.copy(w.viewport),ae.copy(w.scissor),ze=w.scissorTest}else ne.copy(Pe).multiplyScalar(ie).floor(),ae.copy(gt).multiplyScalar(ie).floor(),ze=He;if(W!==0&&(z=j),y.bindFramebuffer(I.FRAMEBUFFER,z)&&y.drawBuffers(w,z),y.viewport(ne),y.scissor(ae),y.setScissorTest(ze),V){const me=G.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,me.__webglTexture,W)}else if(ge){const me=D;for(let Me=0;Me<w.textures.length;Me++){const be=G.get(w.textures[Me]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Me,be.__webglTexture,W,me)}}else if(w!==null&&W!==0){const me=G.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,W)}X=-1},this.readRenderTargetPixels=function(w,D,W,z,V,ge,_e,me=0){if(!(w&&w.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me){y.bindFramebuffer(I.FRAMEBUFFER,Me);try{const be=w.textures[me],ke=be.format,Ge=be.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(ke)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Ge)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-z&&W>=0&&W<=w.height-V&&I.readPixels(D,W,z,V,fe.convert(ke),fe.convert(Ge),ge)}finally{const be=F!==null?G.get(F).__webglFramebuffer:null;y.bindFramebuffer(I.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(w,D,W,z,V,ge,_e,me=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me)if(D>=0&&D<=w.width-z&&W>=0&&W<=w.height-V){y.bindFramebuffer(I.FRAMEBUFFER,Me);const be=w.textures[me],ke=be.format,Ge=be.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,ge.byteLength,I.STREAM_READ),I.readPixels(D,W,z,V,fe.convert(ke),fe.convert(Ge),0);const at=F!==null?G.get(F).__webglFramebuffer:null;y.bindFramebuffer(I.FRAMEBUFFER,at);const At=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Z1(I,At,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ge),I.deleteBuffer(Te),I.deleteSync(At),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,D=null,W=0){const z=Math.pow(2,-W),V=Math.floor(w.image.width*z),ge=Math.floor(w.image.height*z),_e=D!==null?D.x:0,me=D!==null?D.y:0;q.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,_e,me,V,ge),y.unbindTexture()},this.copyTextureToTexture=function(w,D,W=null,z=null,V=0,ge=0){let _e,me,Me,be,ke,Ge,Te,at,At;const bt=w.isCompressedTexture?w.mipmaps[ge]:w.image;if(W!==null)_e=W.max.x-W.min.x,me=W.max.y-W.min.y,Me=W.isBox3?W.max.z-W.min.z:1,be=W.min.x,ke=W.min.y,Ge=W.isBox3?W.min.z:0;else{const Rt=Math.pow(2,-V);_e=Math.floor(bt.width*Rt),me=Math.floor(bt.height*Rt),w.isDataArrayTexture?Me=bt.depth:w.isData3DTexture?Me=Math.floor(bt.depth*Rt):Me=1,be=0,ke=0,Ge=0}z!==null?(Te=z.x,at=z.y,At=z.z):(Te=0,at=0,At=0);const ot=fe.convert(D.format),$t=fe.convert(D.type);let ve;D.isData3DTexture?(q.setTexture3D(D,0),ve=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(q.setTexture2DArray(D,0),ve=I.TEXTURE_2D_ARRAY):(q.setTexture2D(D,0),ve=I.TEXTURE_2D),y.activeTexture(I.TEXTURE0),y.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),y.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),y.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);const _n=y.getParameter(I.UNPACK_ROW_LENGTH),Qe=y.getParameter(I.UNPACK_IMAGE_HEIGHT),Pn=y.getParameter(I.UNPACK_SKIP_PIXELS),ei=y.getParameter(I.UNPACK_SKIP_ROWS),ki=y.getParameter(I.UNPACK_SKIP_IMAGES);y.pixelStorei(I.UNPACK_ROW_LENGTH,bt.width),y.pixelStorei(I.UNPACK_IMAGE_HEIGHT,bt.height),y.pixelStorei(I.UNPACK_SKIP_PIXELS,be),y.pixelStorei(I.UNPACK_SKIP_ROWS,ke),y.pixelStorei(I.UNPACK_SKIP_IMAGES,Ge);const Wr=w.isDataArrayTexture||w.isData3DTexture,lt=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){const Rt=G.get(w),Oi=G.get(D),dt=G.get(Rt.__renderTarget),Bi=G.get(Oi.__renderTarget);y.bindFramebuffer(I.READ_FRAMEBUFFER,dt.__webglFramebuffer),y.bindFramebuffer(I.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let jr=0;jr<Me;jr++)Wr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(w).__webglTexture,V,Ge+jr),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(D).__webglTexture,ge,At+jr)),I.blitFramebuffer(be,ke,_e,me,Te,at,_e,me,I.DEPTH_BUFFER_BIT,I.NEAREST);y.bindFramebuffer(I.READ_FRAMEBUFFER,null),y.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(V!==0||w.isRenderTargetTexture||G.has(w)){const Rt=G.get(w),Oi=G.get(D);y.bindFramebuffer(I.READ_FRAMEBUFFER,Z),y.bindFramebuffer(I.DRAW_FRAMEBUFFER,O);for(let dt=0;dt<Me;dt++)Wr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.__webglTexture,V,Ge+dt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rt.__webglTexture,V),lt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Oi.__webglTexture,ge,At+dt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Oi.__webglTexture,ge),V!==0?I.blitFramebuffer(be,ke,_e,me,Te,at,_e,me,I.COLOR_BUFFER_BIT,I.NEAREST):lt?I.copyTexSubImage3D(ve,ge,Te,at,At+dt,be,ke,_e,me):I.copyTexSubImage2D(ve,ge,Te,at,be,ke,_e,me);y.bindFramebuffer(I.READ_FRAMEBUFFER,null),y.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else lt?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(ve,ge,Te,at,At,_e,me,Me,ot,$t,bt.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(ve,ge,Te,at,At,_e,me,Me,ot,bt.data):I.texSubImage3D(ve,ge,Te,at,At,_e,me,Me,ot,$t,bt):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ge,Te,at,_e,me,ot,$t,bt.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ge,Te,at,bt.width,bt.height,ot,bt.data):I.texSubImage2D(I.TEXTURE_2D,ge,Te,at,_e,me,ot,$t,bt);y.pixelStorei(I.UNPACK_ROW_LENGTH,_n),y.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Qe),y.pixelStorei(I.UNPACK_SKIP_PIXELS,Pn),y.pixelStorei(I.UNPACK_SKIP_ROWS,ei),y.pixelStorei(I.UNPACK_SKIP_IMAGES,ki),ge===0&&D.generateMipmaps&&I.generateMipmap(ve),y.unbindTexture()},this.initRenderTarget=function(w){G.get(w).__webglFramebuffer===void 0&&q.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?q.setTextureCube(w,0):w.isData3DTexture?q.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?q.setTexture2DArray(w,0):q.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){Y=0,H=0,F=null,y.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),n.unpackColorSpace=$e._getUnpackColorSpace()}}const F2=({onInteraction:t})=>{const e=Be.useRef(null),n=Be.useRef(null),[i,r]=Be.useState(null),[s,a]=Be.useState(!1),o=Be.useRef({x:0,y:0,targetX:0,targetY:0});return Be.useEffect(()=>{if(!n.current||!e.current)return;const l=e.current.clientWidth,c=e.current.clientHeight,f=new hS,h=new En(45,l/c,.1,1e3);h.position.set(0,.4,3.2);const d=new U2({canvas:n.current,alpha:!0,antialias:!0,powerPreference:"high-performance"});d.setSize(l,c),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),d.shadowMap.enabled=!0,d.shadowMap.type=fx;const p=new FS(2759502,1.8);f.add(p);const _=new vm(16774634,2.2);_.position.set(2,3,3),f.add(_);const E=new vm(11032055,3.8);E.position.set(-3,2,-2),f.add(E);const m=new DS(8141549,2.5,6);m.position.set(0,-1.2,1),f.add(m);const u=new er;f.add(u);const x=new ha({color:15251606,roughness:.5,metalness:.05}),M=new ha({color:1446685,roughness:.85,metalness:.1}),S=new ha({color:1840930,roughness:.6,metalness:.2}),T=new ha({color:1118481,roughness:.2,metalness:.8}),b=new PS({color:9647082,transparent:!0,opacity:.25,roughness:.1,metalness:.1,transmission:.9,reflectivity:.8}),R=new Rs(.7,.85,1.1,32),v=new Ut(R,M);v.position.set(0,-.65,0),u.add(v);const A=new wa(.38,.14,16,32),P=new Ut(A,M);P.rotation.x=Math.PI/2,P.position.set(0,-.1,0),u.add(P);const N=new Rs(.18,.22,.35,24),U=new Ut(N,x);U.position.set(0,.05,0),u.add(U);const j=new er;j.position.set(0,.35,0),u.add(j);const Z=new Bl(.42,32,32);Z.scale(.95,1.15,.95);const O=new Ut(Z,x);j.add(O);const Y=new er;j.add(Y);const H=new Bl(.44,24,24);H.scale(1.02,1.12,1.05);const F=new Ut(H,S);F.position.set(0,.08,-.04),Y.add(F);const X=new hh(.14,.32,8);for(let Ae=0;Ae<7;Ae++){const Ze=new Ut(X,S),ct=Ae/7*Math.PI*.9-Math.PI*.45;Ze.position.set(Math.sin(ct)*.38,.45+Math.cos(ct)*.1,Math.cos(ct)*.22),Ze.rotation.z=-ct*.7,Ze.rotation.x=-.3,Y.add(Ze)}const J=new er;J.position.set(0,.02,.4),j.add(J);const ne=new Ut(new wa(.12,.016,16,32),T);ne.position.set(-.16,0,0),J.add(ne);const ae=new Ut(new wa(.12,.016,16,32),T);ae.position.set(.16,0,0),J.add(ae);const ze=new Ut(new Rs(.012,.012,.1,8),T);ze.rotation.z=Math.PI/2,ze.position.set(0,.04,0),J.add(ze);const Je=new Ut(new Ol(.11,24),b);Je.position.set(-.16,0,.005),J.add(Je);const We=new Ut(new Ol(.11,24),b);We.position.set(.16,0,.005),J.add(We);const K=60,se=new un,ie=new Float32Array(K*3);for(let Ae=0;Ae<K*3;Ae+=3)ie[Ae]=(Math.random()-.5)*4,ie[Ae+1]=(Math.random()-.5)*4,ie[Ae+2]=(Math.random()-.5)*2;se.setAttribute("position",new Kn(ie,3));const Le=new kx({color:12616956,size:.03,transparent:!0,opacity:.6}),De=new ES(se,Le);f.add(De);const Pe=Ae=>{var Lt;const Ze=(Lt=e.current)==null?void 0:Lt.getBoundingClientRect();if(!Ze)return;const ct=(Ae.clientX-Ze.left)/Ze.width*2-1,Nt=-((Ae.clientY-Ze.top)/Ze.height*2-1);o.current.targetX=ct,o.current.targetY=Nt};window.addEventListener("mousemove",Pe);const gt=()=>{if(!e.current||!d||!h)return;const Ae=e.current.clientWidth,Ze=e.current.clientHeight;h.aspect=Ae/Ze,h.updateProjectionMatrix(),d.setSize(Ae,Ze)};window.addEventListener("resize",gt);let He,nt=new BS;const Ke=()=>{He=requestAnimationFrame(Ke);const Ae=nt.getElapsedTime();o.current.x+=(o.current.targetX-o.current.x)*.06,o.current.y+=(o.current.targetY-o.current.y)*.06,j.rotation.y=o.current.x*.45,j.rotation.x=-o.current.y*.3,u.position.y=Math.sin(Ae*1.5)*.03,v.scale.x=1+Math.sin(Ae*1.5)*.015,v.scale.z=1+Math.sin(Ae*1.5)*.015,De.rotation.y=Ae*.03,De.rotation.x=Ae*.01,d.render(f,h)};return Ke(),()=>{cancelAnimationFrame(He),window.removeEventListener("mousemove",Pe),window.removeEventListener("resize",gt),d.dispose()}},[]),g.jsxs("div",{ref:e,className:"relative w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center select-none",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),onClick:t,children:[g.jsxs("div",{className:"absolute inset-4 md:inset-8 rounded-full bg-gradient-to-tr from-purple-950/60 via-slate-900/80 to-purple-900/40 border border-purple-500/20 shadow-[0_0_80px_rgba(168,85,247,0.15)] flex items-center justify-center overflow-hidden",children:[g.jsx("div",{className:"absolute w-[85%] h-[85%] rounded-full bg-radial from-purple-600/15 via-transparent to-transparent blur-xl"}),g.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.12),transparent_70%)]"})]}),g.jsx("canvas",{ref:n,className:"relative z-10 w-full h-full block cursor-grab active:cursor-grabbing"}),g.jsx("div",{className:`absolute top-8 right-6 md:top-12 md:right-10 z-20 transition-all duration-500 transform ${s?"scale-105 -translate-y-1":""}`,children:g.jsxs("div",{onClick:()=>r("code"),className:"group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95",children:[g.jsx("span",{className:"font-mono text-lg md:text-xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:text-purple-300",children:"</>"}),g.jsx("div",{className:"absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none",children:"Full-Stack DSP"})]})}),g.jsx("div",{className:`absolute top-1/2 -translate-y-1/2 right-2 md:right-6 z-20 transition-all duration-500 delay-75 transform ${s?"scale-105 translate-x-1":""}`,children:g.jsxs("div",{onClick:()=>r("js"),className:"group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95",children:[g.jsx("span",{className:"font-sans text-base md:text-lg font-extrabold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:text-purple-300",children:"JS"}),g.jsx("div",{className:"absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none",children:"TypeScript / React"})]})}),g.jsx("div",{className:`absolute bottom-8 right-6 md:bottom-12 md:right-10 z-20 transition-all duration-500 delay-150 transform ${s?"scale-105 translate-y-1":""}`,children:g.jsxs("div",{onClick:()=>r("dsp"),className:"group relative flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95 gap-1.5",children:[g.jsx("div",{className:"w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative",children:g.jsx("div",{className:"w-4 h-full bg-purple-400 rounded-full drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]"})}),g.jsx("div",{className:"w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative",children:g.jsx("div",{className:"w-5 h-full bg-purple-400 rounded-full ml-auto drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]"})}),g.jsx("div",{className:"w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative",children:g.jsx("div",{className:"w-3 h-full bg-purple-400 rounded-full drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]"})}),g.jsx("div",{className:"absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none",children:"RF & DSP Controls"})]})}),g.jsxs("div",{className:"absolute bottom-4 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/20 backdrop-blur-md text-[11px] text-purple-300 font-mono",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-ping"}),g.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-500 -ml-4"}),g.jsx("span",{children:"3D Engine Active"})]})]})},k2=({onNavigate:t,onOpenProjects:e})=>g.jsxs("section",{id:"home",className:"relative w-full pt-4 pb-8 flex flex-col gap-8",children:[g.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-center",children:[g.jsxs("div",{className:"lg:col-span-7 flex flex-col items-start gap-5",children:[g.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e152d]/90 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-medium shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md",children:[g.jsx("span",{children:"Hello, I'm"}),g.jsx("span",{className:"text-base",children:"👋"})]}),g.jsx("div",{className:"relative",children:g.jsxs("h1",{className:"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08] select-none",children:[g.jsx("span",{className:"block drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-slate-100",children:"Ratnesh"}),g.jsx("span",{className:"block bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(168,85,247,0.4)]",children:"Kumar Singh"})]})}),g.jsx("div",{className:"flex items-center gap-3",children:g.jsx("h2",{className:"text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent",children:pt.role})}),g.jsx("p",{className:"text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed",children:pt.tagline}),g.jsxs("div",{className:"flex flex-wrap items-center gap-4 pt-2",children:[g.jsx("div",{className:"cursor-pointer",onClick:e,children:g.jsx(x1,{label:"View My Work"})}),g.jsxs("a",{href:"./CV.pdf",download:"Ratnesh_Kumar_Singh_CV.pdf",target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#181224]/80 hover:bg-[#231a33] text-slate-200 hover:text-white border border-purple-500/25 hover:border-purple-400/50 shadow-[0_4px_14px_rgba(0,0,0,0.4)] transition-all duration-300 text-sm font-semibold active:scale-95 group",children:[g.jsx("span",{children:"Download CV"}),g.jsx(Wy,{size:16,className:"text-purple-400 group-hover:translate-y-0.5 transition-transform"})]}),g.jsxs("button",{onClick:()=>t("about"),className:"inline-flex items-center gap-2 px-4 py-3 rounded-full text-purple-300/80 hover:text-purple-200 text-sm font-medium hover:bg-purple-950/30 transition-colors",children:[g.jsx("span",{children:"About Me"}),g.jsx(ky,{size:14})]})]})]}),g.jsx("div",{className:"lg:col-span-5 w-full flex justify-center",children:g.jsx(F2,{onInteraction:e})})]}),g.jsxs("div",{className:"w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-gradient-to-r from-[#171026]/90 via-[#130d20]/80 to-[#171026]/90 border border-purple-500/20 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl",children:[g.jsxs("div",{className:"flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all",children:[g.jsx("div",{className:"w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]",children:g.jsx(eh,{size:20})}),g.jsxs("div",{children:[g.jsx("div",{className:"text-lg md:text-xl font-bold text-white font-mono leading-tight",children:"2026 Grad"}),g.jsx("div",{className:"text-[11px] text-slate-400 font-medium",children:"B.Tech ECE (MAKAUT)"})]})]}),g.jsxs("div",{className:"flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all",children:[g.jsx("div",{className:"w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]",children:g.jsx(ax,{size:20})}),g.jsxs("div",{children:[g.jsx("div",{className:"text-lg md:text-xl font-bold text-white font-mono leading-tight",children:"10+ Built"}),g.jsx("div",{className:"text-[11px] text-slate-400 font-medium",children:"Full-Stack & Mobile"})]})]}),g.jsxs("div",{className:"flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all",children:[g.jsx("div",{className:"w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]",children:g.jsx(th,{size:20})}),g.jsxs("div",{children:[g.jsx("div",{className:"text-lg md:text-xl font-bold text-white font-mono leading-tight",children:"±5ms Sync"}),g.jsx("div",{className:"text-[11px] text-slate-400 font-medium",children:"Real-Time DSP Engine"})]})]}),g.jsxs("div",{className:"flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all",children:[g.jsx("div",{className:"w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]",children:g.jsx(ix,{size:20})}),g.jsxs("div",{children:[g.jsx("div",{className:"text-lg md:text-xl font-bold text-white font-mono leading-tight",children:"4+ Verified"}),g.jsx("div",{className:"text-[11px] text-slate-400 font-medium",children:"Udemy & Industry"})]})]})]})]}),O2=({onSelectProject:t})=>{const[e,n]=Be.useState("All"),i=["All","Full-Stack","Android","AI & Automation","3D Graphics","Hardware & IoT"],r=e==="All"?pt.projects:pt.projects.filter(s=>s.category===e);return g.jsxs("section",{id:"projects",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"Featured Engineering Work"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight",children:"Featured Projects"})]}),g.jsx("div",{className:"flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none",children:i.map(s=>g.jsx("button",{onClick:()=>n(s),className:`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${e===s?"bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]":"bg-[#181126] text-slate-400 hover:text-slate-200 border border-purple-500/15 hover:border-purple-500/30"}`,children:s},s))})]}),g.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",children:r.map(s=>g.jsxs("div",{onClick:()=>t(s),className:"group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-500/50 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.2)] transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1",children:[g.jsx("div",{className:"absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl pointer-events-none",style:{backgroundColor:s.accent}}),g.jsxs("div",{children:[g.jsxs("div",{className:"w-full h-32 md:h-36 rounded-xl bg-gradient-to-tr from-[#120c1e] via-[#1a112c] to-[#25173f] border border-purple-500/15 p-3 flex flex-col justify-between relative overflow-hidden mb-3.5",children:[g.jsxs("div",{className:"flex items-center justify-between z-10",children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-red-500/60"}),g.jsx("span",{className:"w-2 h-2 rounded-full bg-yellow-500/60"}),g.jsx("span",{className:"w-2 h-2 rounded-full bg-green-500/60"})]}),g.jsx("span",{className:"text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300",children:s.badge})]}),g.jsx("div",{className:"flex items-center justify-center my-auto z-10",children:g.jsxs("div",{className:"flex flex-col items-center gap-1 text-center",children:[g.jsx("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110",style:{backgroundColor:`${s.accent}20`,borderColor:`${s.accent}40`,color:s.accent},children:s.category==="Android"?g.jsx(Qf,{size:20}):g.jsx(Jf,{size:20})}),g.jsx("span",{className:"text-xs font-bold text-slate-200 mt-1",children:s.title})]})}),g.jsxs("div",{className:"flex items-center justify-between text-[10px] text-slate-400 font-mono z-10",children:[g.jsx("span",{children:s.category}),g.jsxs("span",{className:"text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform",children:["Inspect ",g.jsx(Vy,{size:12})]})]}),g.jsx("div",{className:"absolute inset-0 opacity-15 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px]"})]}),g.jsxs("div",{className:"mb-2",children:[g.jsxs("h3",{className:"text-base md:text-lg font-bold text-white group-hover:text-purple-200 transition-colors flex items-center justify-between",children:[g.jsx("span",{children:s.title}),g.jsx(Oy,{size:16,className:"text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"})]}),g.jsx("p",{className:"text-xs text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed",children:s.tagline})]})]}),g.jsxs("div",{className:"pt-3 border-t border-purple-500/10 flex items-center justify-between gap-2 mt-2",children:[g.jsx("span",{className:"text-[11px] font-mono text-purple-300/80 truncate",children:s.techStack}),g.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[s.githubUrl&&g.jsx("a",{href:s.githubUrl,target:"_blank",rel:"noreferrer",onClick:a=>a.stopPropagation(),className:"p-1.5 rounded-lg bg-white/[0.04] hover:bg-purple-900/40 text-slate-300 hover:text-white border border-purple-500/15 transition-all",title:"View GitHub Repository",children:g.jsx(ic,{size:14})}),s.liveUrl&&g.jsx("a",{href:s.liveUrl,target:"_blank",rel:"noreferrer",onClick:a=>a.stopPropagation(),className:"p-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white border border-purple-500/30 transition-all",title:"Open Live Deployment",children:g.jsx(Ll,{size:14})})]})]})]},s.id))})]})},B2=()=>g.jsxs("section",{id:"about",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"About The Creator"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight -mt-4",children:"Engineering Philosophy & Background"}),g.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[g.jsxs("div",{className:"lg:col-span-7 flex flex-col gap-4",children:[g.jsxs("div",{className:"p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0f0a18] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]",children:[g.jsxs("h3",{className:"text-lg font-bold text-white mb-3 flex items-center gap-2",children:[g.jsx(t1,{size:18,className:"text-purple-400"}),g.jsx("span",{children:"Who I Am"})]}),g.jsxs("p",{className:"text-slate-300 text-sm md:text-base leading-relaxed mb-4",children:["I am a final-year ",g.jsx("span",{className:"text-purple-300 font-semibold",children:"Electronics and Communication Engineering"})," student at MAKAUT (Swami Vivekananda Institute of Science & Technology), graduating in 2026."]}),g.jsxs("p",{className:"text-slate-300 text-sm md:text-base leading-relaxed mb-4",children:["My engineering focus lies at the intersection of ",g.jsx("span",{className:"text-purple-300 font-semibold",children:"Real-Time Web Systems"}),", ",g.jsx("span",{className:"text-purple-300 font-semibold",children:"Native Android Media Pipelines"}),", ",g.jsx("span",{className:"text-purple-300 font-semibold",children:"Autonomous AI Workflows"}),", and ",g.jsx("span",{className:"text-purple-300 font-semibold",children:"RF Antenna Simulation"}),"."]}),g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",children:[g.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20",children:[g.jsx(da,{size:16,className:"text-purple-400 shrink-0"}),g.jsx("span",{children:"Logic-driven problem solver"})]}),g.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20",children:[g.jsx(da,{size:16,className:"text-purple-400 shrink-0"}),g.jsx("span",{children:"Sub-millisecond DSP synchronization"})]}),g.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20",children:[g.jsx(da,{size:16,className:"text-purple-400 shrink-0"}),g.jsx("span",{children:"Native Android MediaCodec low latency"})]}),g.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20",children:[g.jsx(da,{size:16,className:"text-purple-400 shrink-0"}),g.jsx("span",{children:"Ansys HFSS RF antenna optimization"})]})]})]}),g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[g.jsxs("div",{className:"p-4 rounded-2xl bg-[#160f24] border border-purple-500/20 shadow-md",children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-sm font-bold mb-2",children:[g.jsx(e1,{size:16}),g.jsx("span",{children:"Work Philosophy"})]}),g.jsx("p",{className:"text-xs text-slate-300 leading-relaxed",children:'"Keep improving yourself" — I break complex engineering challenges into atomic first-principles components and build resilient, testable solutions.'})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-[#160f24] border border-purple-500/20 shadow-md",children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-sm font-bold mb-2",children:[g.jsx(jy,{size:16}),g.jsx("span",{children:"Core Values"})]}),g.jsx("p",{className:"text-xs text-slate-300 leading-relaxed",children:"Truth, honesty, kindness, and staying true to one's commitments. Committed to creating software and hardware that makes a genuine human impact."})]})]})]}),g.jsxs("div",{className:"lg:col-span-5 flex flex-col gap-4",children:[g.jsxs("div",{className:"p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3.5",children:[g.jsx("h4",{className:"text-xs font-mono uppercase text-purple-400 font-bold tracking-wider",children:"Profile Summary"}),g.jsxs("div",{className:"flex items-center justify-between py-2 border-b border-purple-500/10 text-xs",children:[g.jsxs("span",{className:"text-slate-400 flex items-center gap-2",children:[g.jsx(lx,{size:14,className:"text-purple-400"})," Location"]}),g.jsx("span",{className:"text-white font-medium",children:pt.location})]}),g.jsxs("div",{className:"flex items-center justify-between py-2 border-b border-purple-500/10 text-xs",children:[g.jsxs("span",{className:"text-slate-400 flex items-center gap-2",children:[g.jsx(eh,{size:14,className:"text-purple-400"})," Degree"]}),g.jsx("span",{className:"text-white font-medium",children:"B.Tech ECE (2022-2026)"})]}),g.jsxs("div",{className:"flex items-center justify-between py-2 border-b border-purple-500/10 text-xs",children:[g.jsxs("span",{className:"text-slate-400 flex items-center gap-2",children:[g.jsx(Yy,{size:14,className:"text-purple-400"})," Languages"]}),g.jsx("span",{className:"text-white font-medium",children:"English, Hindi, Bengali"})]}),g.jsxs("div",{className:"flex items-center justify-between py-2 text-xs",children:[g.jsxs("span",{className:"text-slate-400 flex items-center gap-2",children:[g.jsx(qy,{size:14,className:"text-purple-400"})," Interests"]}),g.jsx("span",{className:"text-purple-300 font-medium",children:"AI, 3D WebGL, Audio DSP, Art"})]})]}),g.jsxs("div",{className:"p-5 rounded-2xl bg-[#140e21] border border-purple-500/20 shadow-md",children:[g.jsx("h4",{className:"text-xs font-mono uppercase text-purple-400 font-bold tracking-wider mb-3",children:"Academic Milestones"}),g.jsxs("div",{className:"space-y-3",children:[g.jsxs("div",{className:"relative pl-4 border-l-2 border-purple-500/50",children:[g.jsx("div",{className:"text-xs font-bold text-white",children:"B.Tech in ECE • 2022 - 2026"}),g.jsx("div",{className:"text-[11px] text-slate-400",children:"Swami Vivekananda Institute (MAKAUT)"})]}),g.jsxs("div",{className:"relative pl-4 border-l-2 border-purple-500/30",children:[g.jsx("div",{className:"text-xs font-bold text-slate-200",children:"Higher Secondary (12th) • 2020"}),g.jsx("div",{className:"text-[11px] text-slate-400",children:"P.B.S College (Physics, Chemistry, Math)"})]}),g.jsxs("div",{className:"relative pl-4 border-l-2 border-purple-500/20",children:[g.jsx("div",{className:"text-xs font-bold text-slate-300",children:"Secondary (10th) • 2018"}),g.jsx("div",{className:"text-[11px] text-slate-400",children:"Vidyanjali High School (I.G.C.S.E)"})]})]})]})]})]})]}),z2=()=>{const[t,e]=Be.useState(0),n=i=>{switch(i){case 0:return g.jsx(Jf,{size:20});case 1:return g.jsx(Qy,{size:20});case 2:return g.jsx(Qf,{size:20});case 3:return g.jsx(th,{size:20});case 4:return g.jsx(Ky,{size:20});default:return g.jsx(Bp,{size:20})}};return g.jsxs("section",{id:"skills",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"Technical Expertise Matrix"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight",children:"5 Core Engineering Pillars"})]}),g.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5",children:pt.skillCategories.map((i,r)=>{const s=t===r;return g.jsxs("button",{onClick:()=>e(r),className:`p-3 rounded-2xl flex flex-col items-start gap-2 text-left transition-all duration-300 ${s?"bg-gradient-to-b from-purple-900/60 to-purple-950/40 border border-purple-400/50 shadow-[0_4px_20px_rgba(168,85,247,0.3)] text-white":"bg-[#150f22] border border-purple-500/15 hover:border-purple-500/35 text-slate-400 hover:text-slate-200"}`,children:[g.jsx("div",{className:`p-2 rounded-xl border ${s?"bg-purple-600 text-white border-purple-400":"bg-purple-950/40 text-purple-400 border-purple-500/20"}`,children:n(r)}),g.jsx("span",{className:"text-xs font-bold leading-snug line-clamp-2",children:i.title})]},i.title)})}),g.jsxs("div",{className:"p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",children:[g.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-purple-500/15",children:[g.jsxs("div",{children:[g.jsxs("h3",{className:"text-lg md:text-xl font-bold text-white flex items-center gap-2",children:[g.jsx("span",{className:"text-purple-400",children:n(t)}),g.jsx("span",{children:pt.skillCategories[t].title})]}),g.jsx("p",{className:"text-xs md:text-sm text-slate-400 mt-1",children:pt.skillCategories[t].description})]}),g.jsxs("span",{className:"text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 self-start md:self-auto",children:["Pillar ",t+1," of 5"]})]}),g.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:pt.skillCategories[t].skills.map(i=>g.jsxs("div",{className:`p-3.5 rounded-xl border transition-all ${i.highlight?"bg-[#1e1333]/90 border-purple-500/40 shadow-[0_4px_16px_rgba(168,85,247,0.15)]":"bg-[#130d20] border-purple-500/15"}`,children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-semibold text-white mb-2",children:[g.jsxs("span",{className:"flex items-center gap-2",children:[i.highlight&&g.jsx(Bp,{size:13,className:"text-purple-400 fill-purple-400"}),i.name]}),g.jsxs("span",{className:"font-mono text-purple-300",children:[i.level,"%"]})]}),g.jsx("div",{className:"w-full h-2 rounded-full bg-slate-900 overflow-hidden relative",children:g.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all duration-700 ease-out",style:{width:`${i.level}%`}})})]},i.name))})]})]})},V2=()=>{const t=e=>{switch(e){case"Education":return g.jsx(eh,{size:16,className:"text-purple-400"});case"Industrial Visit":return g.jsx(By,{size:16,className:"text-sky-400"});case"Workshop":return g.jsx(th,{size:16,className:"text-amber-400"});case"Training":return g.jsx(Qf,{size:16,className:"text-emerald-400"});default:return g.jsx(rx,{size:16,className:"text-purple-400"})}};return g.jsxs("section",{id:"experience",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"Academic & Industry Journey"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight",children:"Experience & Training"})]}),g.jsx("div",{className:"relative pl-6 border-l border-purple-500/20 space-y-6",children:pt.experiences.map((e,n)=>g.jsxs("div",{className:"relative group",children:[g.jsx("div",{className:"absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#1e1430] border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform"}),g.jsxs("div",{className:"p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all",children:[g.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 mb-2",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("div",{className:"p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30",children:t(e.type)}),g.jsx("span",{className:"text-sm md:text-base font-bold text-white",children:e.title})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300",children:e.badge}),g.jsxs("span",{className:"text-xs text-slate-400 font-mono flex items-center gap-1",children:[g.jsx(sx,{size:12}),e.period]})]})]}),g.jsx("div",{className:"text-xs font-medium text-purple-300/90 mb-2",children:e.institution}),g.jsx("p",{className:"text-xs md:text-sm text-slate-300 leading-relaxed font-normal",children:e.description})]})]},n))})]})},H2=({onSelectCert:t})=>g.jsxs("section",{id:"certifications",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"Verified Credentials"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight",children:"Licenses & Certifications"})]}),g.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:pt.certifications.map(e=>g.jsxs("div",{onClick:()=>t==null?void 0:t(e),className:"group p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-400/50 shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between cursor-pointer",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-start justify-between gap-3 mb-3",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx("div",{className:"w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]",children:g.jsx(ix,{size:18})}),g.jsxs("div",{children:[g.jsx("span",{className:"text-[11px] font-mono text-purple-400 font-semibold uppercase",children:e.category}),g.jsx("h3",{className:"text-sm md:text-base font-bold text-white group-hover:text-purple-200 transition-colors leading-snug",children:e.title})]})]}),g.jsx("a",{href:e.verifyUrl,target:"_blank",rel:"noreferrer",onClick:n=>n.stopPropagation(),className:"p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-800/60 text-purple-300 hover:text-white border border-purple-500/30 transition-all shrink-0",title:"Verify on Udemy",children:g.jsx(Ll,{size:14})})]}),g.jsxs("div",{className:"flex items-center justify-between text-xs text-slate-400 mb-3 font-mono",children:[g.jsx("span",{children:e.issuer}),g.jsxs("span",{className:"flex items-center gap-1",children:[g.jsx(sx,{size:11})," ",e.date]})]}),g.jsx("div",{className:"flex flex-wrap gap-1.5 mb-3",children:e.skills.map((n,i)=>g.jsx("span",{className:"text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#201533] text-purple-200 border border-purple-500/20",children:n},i))})]}),g.jsxs("div",{className:"pt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono",children:[g.jsxs("span",{className:"text-slate-400 truncate max-w-[200px]",children:["ID: ",e.certId]}),g.jsxs("span",{className:"text-emerald-400 flex items-center gap-1",children:[g.jsx(Jy,{size:13})," Verified"]})]})]},e.id))})]}),G2=()=>{const[t,e]=Be.useState(!1),[n,i]=Be.useState(!1),[r,s]=Be.useState({name:"",email:"",subject:"",message:""}),a=()=>{navigator.clipboard.writeText(pt.email),e(!0),setTimeout(()=>e(!1),2e3)},o=l=>{l.preventDefault(),!(!r.name||!r.email||!r.message)&&(window.location.href=`mailto:${pt.email}?subject=${encodeURIComponent(r.subject||"Portfolio Inquiry")}&body=${encodeURIComponent(`From: ${r.name} (${r.email})

${r.message}`)}`,i(!0),setTimeout(()=>i(!1),4e3))};return g.jsxs("section",{id:"contact",className:"w-full py-8 flex flex-col gap-6",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1",children:[g.jsx(Fi,{size:14}),g.jsx("span",{children:"Get In Touch"})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white tracking-tight",children:"Let's Build Something Exceptional"})]}),g.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[g.jsxs("div",{className:"lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]",children:[g.jsxs("div",{className:"space-y-4",children:[g.jsxs("h3",{className:"text-lg font-bold text-white flex items-center gap-2",children:[g.jsx(ud,{size:18,className:"text-purple-400"}),g.jsx("span",{children:"Contact Coordinates"})]}),g.jsx("p",{className:"text-xs md:text-sm text-slate-300 leading-relaxed",children:"Available for full-time engineering opportunities, real-time web consulting, Android MediaCodec projects, and AI automation workflows."}),g.jsxs("div",{className:"p-3.5 rounded-xl bg-[#140e21] border border-purple-500/20 flex items-center justify-between gap-3",children:[g.jsxs("div",{className:"truncate",children:[g.jsx("div",{className:"text-[10px] font-mono text-purple-400 uppercase",children:"Direct Email"}),g.jsx("div",{className:"text-xs md:text-sm font-bold text-white font-mono truncate",children:pt.email})]}),g.jsx("button",{onClick:a,className:"p-2 rounded-lg bg-purple-950/60 hover:bg-purple-850 text-purple-300 hover:text-white border border-purple-500/30 transition-all shrink-0 active:scale-95",title:"Copy Email to Clipboard",children:t?g.jsx(zy,{size:16,className:"text-emerald-400"}):g.jsx(Gy,{size:16})})]}),g.jsxs("div",{className:"flex items-center gap-2.5 text-xs text-slate-300 p-3 rounded-xl bg-[#140e21] border border-purple-500/20",children:[g.jsx(lx,{size:16,className:"text-purple-400 shrink-0"}),g.jsxs("span",{children:[pt.location," (Open to Relocation & Remote)"]})]})]}),g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono uppercase text-purple-400 mb-3",children:"Connect Online"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("a",{href:pt.github,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all",children:[g.jsx(ic,{size:15})," GitHub"]}),g.jsxs("a",{href:pt.linkedin,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all",children:[g.jsx(ox,{size:15})," LinkedIn"]}),g.jsxs("a",{href:pt.twitter,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all",children:[g.jsx(ux,{size:15})," Twitter"]})]})]})]}),g.jsx("div",{className:"lg:col-span-7 p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]",children:g.jsxs("form",{onSubmit:o,className:"flex flex-col gap-4",children:[g.jsxs("h3",{className:"text-lg font-bold text-white flex items-center gap-2 mb-1",children:[g.jsx($y,{size:18,className:"text-purple-400"}),g.jsx("span",{children:"Send a Direct Message"})]}),g.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-mono text-slate-400 mb-1.5",children:"Your Name"}),g.jsx("input",{type:"text",required:!0,placeholder:"Jane Doe",value:r.name,onChange:l=>s({...r,name:l.target.value}),className:"w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-mono text-slate-400 mb-1.5",children:"Your Email"}),g.jsx("input",{type:"email",required:!0,placeholder:"jane@company.com",value:r.email,onChange:l=>s({...r,email:l.target.value}),className:"w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-mono text-slate-400 mb-1.5",children:"Subject"}),g.jsx("input",{type:"text",placeholder:"Full-Time Opportunity / Engineering Project",value:r.subject,onChange:l=>s({...r,subject:l.target.value}),className:"w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-mono text-slate-400 mb-1.5",children:"Message"}),g.jsx("textarea",{required:!0,rows:4,placeholder:"Hi Ratnesh, let's discuss...",value:r.message,onChange:l=>s({...r,message:l.target.value}),className:"w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"})]}),g.jsxs("button",{type:"submit",className:"mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_16px_rgba(147,51,234,0.4)] transition-all active:scale-98",children:[g.jsx("span",{children:n?"Message Dispatched!":"Send Message"}),g.jsx(cx,{size:16})]})]})})]})]})},W2=({isOpen:t,onClose:e})=>{const[n,i]=Be.useState([{id:"welcome",sender:"raya",text:"Hello! I'm Raya, Ratnesh's AI companion. I know everything about his engineering projects, ECE background, AI workflows, and skills. What would you like to explore?",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]),[r,s]=Be.useState(""),[a,o]=Be.useState(!1),[l,c]=Be.useState(!1),f=Be.useRef(null),h=["Tell me about his ECE background","Explain SyncPulse DSP engine","What is PAK Video Converter?","What verified certifications does he hold?","What are his core work values?"];Be.useEffect(()=>{var E;(E=f.current)==null||E.scrollIntoView({behavior:"smooth"})},[n]);const d=E=>{if(!l||!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const m=new SpeechSynthesisUtterance(E);m.rate=1.05,m.pitch=1.1,window.speechSynthesis.speak(m)},p=E=>{const m=E.toLowerCase();return m.includes("ece")||m.includes("education")||m.includes("college")||m.includes("makaut")?"Ratnesh is a final-year B.Tech student in Electronics and Communication Engineering (ECE) at MAKAUT (Swami Vivekananda Institute of Science & Technology), graduating in 2026. He excels at hardware-software convergence, RF simulation in Ansys HFSS, and real-time computing.":m.includes("syncpulse")||m.includes("audio")||m.includes("dsp")||m.includes("sound")?"SyncPulse is Ratnesh's real-time spatial audio network. It implements Cristian's NTP clock sync algorithm over WebSockets to achieve sub-millisecond (±5ms) sync across multiple client devices, coupled with an 8D binaural 360° soundstage and an interactive Three.js 3D visualizer.":m.includes("pak")||m.includes("android")||m.includes("video")||m.includes("mediacodec")?"PAK Video Converter is a native Android application built by Ratnesh in Kotlin and Jetpack Compose. It uses Android's low-latency hardware MediaCodec and MediaMuxer pipelines to extract, transcode, and stream raw video payloads and game assets with zero frame drops.":m.includes("mediflow")||m.includes("hospital")||m.includes("healthcare")?"MediFlow is an outpatient hospital queue management system built with FastAPI, React 18, and PostgreSQL. It uses a Scikit-Learn Random Forest ML regression model to forecast patient wait times dynamically with real-time WebSocket token broadcasts.":m.includes("jobpilot")||m.includes("n8n")||m.includes("gemini")||m.includes("ai agent")?"JobPilot AI is an autonomous job search & resume tailoring workflow created on n8n Cloud powered by Google Gemini API. It scans job feeds, evaluates candidate semantic fit, tailors applications, and triggers webhook dispatches.":m.includes("cert")||m.includes("udemy")||m.includes("license")?`Ratnesh holds 4+ verified technical certifications on Udemy:
1. Internet of Things (IoT) Online Course (ID: UC-45f867df-23bf-440a-b362-0508bfb8d29f)
2. Prompt Engineering for Everyone (ID: UC-58952f65-94dc-45c4-abd9-aa490de18afc)
3. Master Java, Python, C & C++: All-in-One Programming (ID: UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b)
4. The Complete Introduction to C++ Programming (ID: UC-c57ec369-5a17-48e6-a9be-bcf9c0855867)`:m.includes("values")||m.includes("philosophy")||m.includes("personality")?'Ratnesh values absolute truth, honesty, loyalty, and kindness. His core work rule is "Always keep learning and improving yourself." He is a balanced, logical thinker who breaks large challenges into small, solvable components.':m.includes("contact")||m.includes("email")||m.includes("hire")?`You can reach Ratnesh directly via email at ${pt.email} or on LinkedIn at ${pt.linkedin}. He is actively open to full-time opportunities and engineering collaborations!`:"Ratnesh is a multi-disciplinary engineer specializing in Full-Stack Real-Time Web (React, Node.js, WebSockets), Native Android (Kotlin, MediaCodec), AI Agent Workflows (n8n, Gemini API), and RF Antennas (Ansys HFSS). Feel free to ask about any specific project or skill!"},_=async E=>{const m=E||r;if(!m.trim()||a)return;const u={id:`usr_${Date.now()}`,sender:"user",text:m,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};i(x=>[...x,u]),s(""),o(!0);try{const x=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:m})});let M="";if(x.ok){const T=await x.json();M=T.reply||T.message||p(m)}else M=p(m);const S={id:`raya_${Date.now()}`,sender:"raya",text:M,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};i(T=>[...T,S]),d(M)}catch{const x=p(m),M={id:`raya_${Date.now()}`,sender:"raya",text:x,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};i(S=>[...S,M]),d(x)}finally{o(!1)}};return t?g.jsxs("div",{className:"fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[600px] z-50 flex flex-col bg-[#110b1d]/95 border border-purple-500/30 rounded-none sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none",children:[g.jsxs("div",{className:"p-4 bg-gradient-to-r from-purple-950/80 via-slate-900/80 to-purple-950/80 border-b border-purple-500/20 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("div",{className:"relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]",children:[g.jsx("div",{className:"w-full h-full rounded-[14px] bg-[#1a0f2e] flex items-center justify-center",children:g.jsx(Nl,{size:20,className:"text-purple-300 animate-pulse"})}),g.jsx("span",{className:"absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#110b1d]"})]}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("h3",{className:"text-sm font-bold text-white",children:"Raya AI"}),g.jsx("span",{className:"text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30",children:"v2.5"})]}),g.jsx("p",{className:"text-[11px] text-purple-300/80 font-mono",children:"Portfolio Companion"})]})]}),g.jsxs("div",{className:"flex items-center gap-1 text-slate-400",children:[g.jsx("button",{onClick:()=>c(!l),className:`p-2 rounded-xl transition-all ${l?"text-purple-300 bg-purple-900/50":"hover:text-white hover:bg-white/[0.05]"}`,title:l?"Mute Voice":"Enable Voice",children:l?g.jsx(i1,{size:16}):g.jsx(r1,{size:16})}),g.jsx("button",{onClick:()=>i([n[0]]),className:"p-2 rounded-xl hover:text-white hover:bg-white/[0.05] transition-all",title:"Reset Conversation",children:g.jsx(Zy,{size:16})}),g.jsx("button",{onClick:e,className:"p-2 rounded-xl hover:text-white hover:bg-white/[0.05] transition-all",title:"Close Chat",children:g.jsx(dx,{size:18})})]})]}),g.jsxs("div",{className:"flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-purple-900/40",children:[n.map(E=>g.jsxs("div",{className:`flex flex-col ${E.sender==="user"?"items-end":"items-start"}`,children:[g.jsx("div",{className:`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${E.sender==="user"?"bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs shadow-[0_4px_16px_rgba(147,51,234,0.3)]":"bg-[#1a1228] text-slate-200 border border-purple-500/25 rounded-bl-xs shadow-[0_4px_12px_rgba(0,0,0,0.4)]"}`,children:g.jsx("p",{className:"whitespace-pre-line",children:E.text})}),g.jsx("span",{className:"text-[10px] text-slate-400 font-mono mt-1 px-1",children:E.timestamp})]},E.id)),a&&g.jsxs("div",{className:"flex items-center gap-2 p-3 rounded-2xl bg-[#1a1228] border border-purple-500/20 text-purple-300 text-xs w-28",children:[g.jsx(Fi,{size:14,className:"animate-spin text-purple-400"}),g.jsx("span",{children:"Thinking..."})]}),g.jsx("div",{ref:f})]}),g.jsx("div",{className:"px-3 py-2 bg-[#0e0817] border-t border-purple-500/15 overflow-x-auto flex gap-1.5 scrollbar-none",children:h.map((E,m)=>g.jsx("button",{onClick:()=>_(E),className:"px-2.5 py-1 rounded-full bg-purple-950/60 hover:bg-purple-900/80 text-[11px] text-purple-300 hover:text-white border border-purple-500/20 whitespace-nowrap transition-all shrink-0",children:E},m))}),g.jsx("div",{className:"p-3 bg-[#0d0716] border-t border-purple-500/20",children:g.jsxs("form",{onSubmit:E=>{E.preventDefault(),_()},className:"flex items-center gap-2",children:[g.jsx("input",{type:"text",placeholder:"Ask Raya about Ratnesh's work...",value:r,onChange:E=>s(E.target.value),className:"flex-1 px-3.5 py-2.5 rounded-xl bg-[#170f24] border border-purple-500/25 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"}),g.jsx("button",{type:"submit",disabled:!r.trim()||a,className:"p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.4)]",children:g.jsx(cx,{size:16})})]})})]}):null},j2=({isOpen:t,onClose:e,project:n,certificate:i})=>(Be.useEffect(()=>{const r=s=>{s.key==="Escape"&&e()};return t&&(document.body.style.overflow="hidden",window.addEventListener("keydown",r)),()=>{document.body.style.overflow="unset",window.removeEventListener("keydown",r)}},[t,e]),!t||!n&&!i?null:g.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200",children:[g.jsx("div",{onClick:e,className:"absolute inset-0 bg-black/80 backdrop-blur-md"}),g.jsxs("div",{className:"relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1c132e] to-[#0f091a] border border-purple-500/30 p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.2)] z-10 scrollbar-thin",children:[g.jsx("button",{onClick:e,className:"absolute top-5 right-5 p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-500/25 transition-all",children:g.jsx(dx,{size:18})}),n&&g.jsxs("div",{className:"flex flex-col gap-5",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-2",children:[g.jsx(Fi,{size:13}),g.jsx("span",{children:n.badge})]}),g.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white",children:n.title}),g.jsx("p",{className:"text-sm font-semibold text-purple-300 mt-1",children:n.subtitle})]}),g.jsx("p",{className:"text-sm text-slate-300 leading-relaxed",children:n.desc}),n.highlights&&n.highlights.length>0&&g.jsxs("div",{className:"p-4 rounded-2xl bg-[#130b20] border border-purple-500/20",children:[g.jsx("h4",{className:"text-xs font-mono uppercase text-purple-400 font-bold mb-2.5",children:"Key Technical Achievements"}),g.jsx("div",{className:"space-y-2",children:n.highlights.map((r,s)=>g.jsxs("div",{className:"flex items-start gap-2 text-xs text-slate-300",children:[g.jsx(da,{size:14,className:"text-purple-400 shrink-0 mt-0.5"}),g.jsx("span",{children:r})]},s))})]}),g.jsxs("div",{children:[g.jsx("h4",{className:"text-xs font-mono uppercase text-slate-400 mb-2",children:"Technologies Used"}),g.jsx("div",{className:"flex flex-wrap gap-2",children:n.tags.map((r,s)=>g.jsx("span",{className:"px-3 py-1 rounded-lg bg-[#201435] text-purple-200 border border-purple-500/25 text-xs font-mono font-medium",children:r},s))})]}),g.jsxs("div",{className:"pt-4 border-t border-purple-500/15 flex flex-wrap gap-3",children:[n.liveUrl&&g.jsxs("a",{href:n.liveUrl,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition-all",children:[g.jsx("span",{children:"Launch Live Demo"}),g.jsx(Ll,{size:14})]}),n.githubUrl&&g.jsxs("a",{href:n.githubUrl,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#180e29] hover:bg-[#251540] text-slate-200 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all",children:[g.jsx(ic,{size:14}),g.jsx("span",{children:"GitHub Repository"})]})]})]}),i&&g.jsxs("div",{className:"flex flex-col gap-5",children:[g.jsxs("div",{children:[g.jsx("span",{className:"text-[11px] font-mono text-purple-400 uppercase font-semibold",children:i.category}),g.jsx("h2",{className:"text-xl md:text-2xl font-extrabold text-white mt-1",children:i.title}),g.jsxs("div",{className:"text-xs text-slate-400 font-mono mt-1",children:["Issued by ",i.issuer," • ",i.date]})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-[#130b20] border border-purple-500/20 font-mono text-xs text-slate-300",children:[g.jsx("div",{className:"text-slate-400 mb-1",children:"Credential ID:"}),g.jsx("div",{className:"text-purple-300 font-bold break-all",children:i.certId})]}),g.jsxs("div",{children:[g.jsx("h4",{className:"text-xs font-mono uppercase text-slate-400 mb-2",children:"Verified Competencies"}),g.jsx("div",{className:"flex flex-wrap gap-2",children:i.skills.map((r,s)=>g.jsx("span",{className:"px-3 py-1 rounded-lg bg-[#201435] text-purple-200 border border-purple-500/25 text-xs font-mono font-medium",children:r},s))})]}),g.jsx("div",{className:"pt-4 border-t border-purple-500/15",children:g.jsxs("a",{href:i.verifyUrl,target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition-all",children:[g.jsx("span",{children:"Verify Credential on Udemy"}),g.jsx(Ll,{size:14})]})})]})]})]})),X2=()=>{const[t,e]=Be.useState("home"),[n,i]=Be.useState(!1),[r,s]=Be.useState(null),[a,o]=Be.useState(null),[l,c]=Be.useState(!1),f=h=>{e(h);const d=document.getElementById(h);d&&d.scrollIntoView({behavior:"smooth"})};return Be.useEffect(()=>{const h=()=>{const d=window.scrollY;c(d>400);const p=["home","projects","about","skills","experience","certifications","contact"];for(const _ of p){const E=document.getElementById(_);if(E){const m=E.getBoundingClientRect();if(m.top<=200&&m.bottom>=200){e(_);break}}}};return window.addEventListener("scroll",h),()=>window.removeEventListener("scroll",h)},[]),g.jsxs("div",{className:"min-h-screen bg-[#07050d] text-slate-100 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 font-sans antialiased selection:bg-purple-600 selection:text-white",children:[g.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[g.jsx("div",{className:"absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]"}),g.jsx("div",{className:"absolute top-1/2 -right-40 w-96 h-96 bg-indigo-900/15 rounded-full blur-[140px]"}),g.jsx("div",{className:"absolute -bottom-40 left-1/3 w-96 h-96 bg-fuchsia-900/15 rounded-full blur-[130px]"}),g.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(#a855f7_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-10"})]}),g.jsxs("div",{className:"relative z-10 w-full max-w-7xl rounded-3xl md:rounded-[36px] bg-[#0c0816]/95 border border-purple-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(147,51,234,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col lg:flex-row",children:[g.jsx(s1,{activeSection:t,onNavigate:f,onToggleRaya:()=>i(!n)}),g.jsxs("main",{className:"flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-950/60 scrollbar-track-transparent",children:[g.jsx(k2,{onNavigate:f,onOpenProjects:()=>f("projects")}),g.jsx(O2,{onSelectProject:h=>s(h)}),g.jsx(B2,{}),g.jsx(z2,{}),g.jsx(V2,{}),g.jsx(H2,{onSelectCert:h=>o(h)}),g.jsx(G2,{}),g.jsxs("footer",{className:"w-full py-8 mt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]"}),g.jsxs("span",{children:["© ",new Date().getFullYear()," ",pt.name," • Designed & Built with Next-Gen 3D & AI"]})]}),g.jsx("div",{children:g.jsx("span",{children:"Kolkata, India • All Rights Reserved"})})]})]})]}),g.jsxs("button",{onClick:()=>i(!0),className:"fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs md:text-sm shadow-[0_8px_30px_rgba(147,51,234,0.5),0_0_15px_rgba(168,85,247,0.3)] border border-purple-300/40 transition-all duration-300 transform hover:scale-105 active:scale-95 select-none",children:[g.jsxs("div",{className:"relative",children:[g.jsx(Nl,{size:18,className:"animate-pulse"}),g.jsx("span",{className:"absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"})]}),g.jsx("span",{className:"hidden sm:inline",children:"Ask Raya AI"})]}),l&&g.jsx("button",{onClick:()=>f("home"),className:"fixed bottom-20 right-6 z-40 p-2.5 rounded-full bg-[#170f26]/90 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-500/30 shadow-lg backdrop-blur-md transition-all active:scale-95",title:"Scroll to Top",children:g.jsx(Hy,{size:18})}),g.jsx(W2,{isOpen:n,onClose:()=>i(!1)}),g.jsx(j2,{isOpen:!!r||!!a,onClose:()=>{s(null),o(null)},project:r,certificate:a})]})};xu.createRoot(document.getElementById("root")).render(g.jsx(Mv.StrictMode,{children:g.jsx(X2,{})}));
