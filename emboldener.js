
/**
 * findAndReplaceDOMText v 0.4.6
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
!function(e,t){"object"==typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):e.findAndReplaceDOMText=t()}(this,function e(){var t="first",n=document,r={}.hasOwnProperty;function i(){return o.apply(null,arguments)||a.apply(null,arguments)}function o(e,t,n,r,o){if(t&&!t.nodeType&&arguments.length<=2)return!1;var d,s="function"==typeof n;s&&(n=(d=n,function(e,t){return d(e.text,t.startIndex)}));var p=a(t,{find:e,wrap:s?null:n,replace:s?n:"$"+(r||"&"),prepMatch:function(e,t){if(!e[0])throw"findAndReplaceDOMText cannot handle zero-length matches";if(r>0){var n=e[r];e.index+=e[0].indexOf(n),e[0]=n}return e.endIndex=e.index+e[0].length,e.startIndex=e.index,e.index=t,e},filterElements:o});return i.revert=function(){return p.revert()},!0}function a(e,t){return new d(e,t)}function d(e,t){var n=t.preset&&i.PRESETS[t.preset];if(t.portionMode=t.portionMode||"retain",n)for(var o in n)r.call(n,o)&&!r.call(t,o)&&(t[o]=n[o]);this.node=e,this.options=t,this.prepMatch=t.prepMatch||this.prepMatch,this.reverts=[],this.matches=this.search(),this.matches.length&&this.processMatches()}return i.NON_PROSE_ELEMENTS={br:1,hr:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1},i.NON_CONTIGUOUS_PROSE_ELEMENTS={address:1,article:1,aside:1,blockquote:1,dd:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,nav:1,noscript:1,ol:1,output:1,p:1,pre:1,section:1,ul:1,br:1,li:1,summary:1,dt:1,details:1,rp:1,rt:1,rtc:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1,table:1,tbody:1,thead:1,th:1,tr:1,td:1,caption:1,col:1,tfoot:1,colgroup:1},i.NON_INLINE_PROSE=function(e){return r.call(i.NON_CONTIGUOUS_PROSE_ELEMENTS,e.nodeName.toLowerCase())},i.PRESETS={prose:{forceContext:i.NON_INLINE_PROSE,filterElements:function(e){return!r.call(i.NON_PROSE_ELEMENTS,e.nodeName.toLowerCase())}}},i.Finder=d,d.prototype={search:function(){var e,t,n=0,r=0,i=this.options.find,o=this.getAggregateText(),a=[],d=this;return i="string"==typeof i?RegExp(String(t=i).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"):i,function t(o){for(var s=0,p=o.length;s<p;++s){var h=o[s];if("string"!=typeof h){t(h);continue}if(i.global)for(;e=i.exec(h);)a.push(d.prepMatch(e,n++,r));else(e=h.match(i))&&a.push(d.prepMatch(e,0,r));r+=h.length}}(o),a},prepMatch:function(e,t,n){if(!e[0])throw Error("findAndReplaceDOMText cannot handle zero-length matches");return e.endIndex=n+e.index+e[0].length,e.startIndex=n+e.index,e.index=t,e},getAggregateText:function(){var e=this.options.filterElements,t=this.options.forceContext;return function n(r){if(r.nodeType===Node.TEXT_NODE)return[r.data];if(e&&!e(r))return[];var i=[""],o=0;if(r=r.firstChild)do{if(r.nodeType===Node.TEXT_NODE){i[o]+=r.data;continue}var a=n(r);t&&r.nodeType===Node.ELEMENT_NODE&&(!0===t||t(r))?(i[++o]=a,i[++o]=""):("string"==typeof a[0]&&(i[o]+=a.shift()),a.length&&(i[++o]=a,i[++o]=""))}while(r=r.nextSibling);return i}(this.node)},processMatches:function(){var e,t,n,r=this.matches,i=this.node,o=this.options.filterElements,a=[],d=i,s=r.shift(),p=0,h=0,c=0,l=[i];out:for(;;){if(d.nodeType===Node.TEXT_NODE&&(!t&&d.length+p>=s.endIndex?t={node:d,index:c++,text:d.data.substring(s.startIndex-p,s.endIndex-p),indexInMatch:0===p?0:p-s.startIndex,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,isEnd:!0}:e&&a.push({node:d,index:c++,text:d.data,indexInMatch:p-s.startIndex,indexInNode:0}),!e&&d.length+p>s.startIndex&&(e={node:d,index:c++,indexInMatch:0,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,text:d.data.substring(s.startIndex-p,s.endIndex-p)}),p+=d.data.length),n=d.nodeType===Node.ELEMENT_NODE&&o&&!o(d),e&&t){if(d=this.replaceMatch(s,e,a,t),p-=t.node.data.length-t.endIndexInNode,e=null,t=null,a=[],s=r.shift(),c=0,h++,!s)break}else if(!n&&(d.firstChild||d.nextSibling)){d.firstChild?(l.push(d),d=d.firstChild):d=d.nextSibling;continue}for(;;){if(d.nextSibling){d=d.nextSibling;break}if((d=l.pop())===i)break out}}},revert:function(){for(var e=this.reverts.length;e--;)this.reverts[e]();this.reverts=[]},prepareReplacementString:function(e,n,r){var i=this.options.portionMode;return i===t&&n.indexInMatch>0?"":(e=e.replace(/\$(\d+|&|`|')/g,function(e,t){var n;switch(t){case"&":n=r[0];break;case"`":n=r.input.substring(0,r.startIndex);break;case"'":n=r.input.substring(r.endIndex);break;default:n=r[+t]||""}return n}),i===t)?e:n.isEnd?e.substring(n.indexInMatch):e.substring(n.indexInMatch,n.indexInMatch+n.text.length)},getPortionReplacementNode:function(e,t){var r=this.options.replace||"$&",i=this.options.wrap,o=this.options.wrapClass;if(i&&i.nodeType){var a=n.createElement("div");a.innerHTML=i.outerHTML||new XMLSerializer().serializeToString(i),i=a.firstChild}if("function"==typeof r)return(r=r(e,t))&&r.nodeType?r:n.createTextNode(String(r));var d="string"==typeof i?n.createElement(i):i;return(d&&o&&(d.className=o),(r=n.createTextNode(this.prepareReplacementString(r,e,t))).data&&d)?(d.appendChild(r),d):r},replaceMatch:function(e,t,r,i){var o,a,d=t.node,s=i.node;if(d===s){var p=d;t.indexInNode>0&&(o=n.createTextNode(p.data.substring(0,t.indexInNode)),p.parentNode.insertBefore(o,p));var h=this.getPortionReplacementNode(i,e);return p.parentNode.insertBefore(h,p),i.endIndexInNode<p.length&&(a=n.createTextNode(p.data.substring(i.endIndexInNode)),p.parentNode.insertBefore(a,p)),p.parentNode.removeChild(p),this.reverts.push(function(){o===h.previousSibling&&o.parentNode.removeChild(o),a===h.nextSibling&&a.parentNode.removeChild(a),h.parentNode.replaceChild(p,h)}),h}o=n.createTextNode(d.data.substring(0,t.indexInNode)),a=n.createTextNode(s.data.substring(i.endIndexInNode));for(var c=this.getPortionReplacementNode(t,e),l=[],u=0,f=r.length;u<f;++u){var _=r[u],x=this.getPortionReplacementNode(_,e);_.node.parentNode.replaceChild(x,_.node),this.reverts.push(function(e,t){return function(){t.parentNode.replaceChild(e.node,t)}}(_,x)),l.push(x)}var N=this.getPortionReplacementNode(i,e);return d.parentNode.insertBefore(o,d),d.parentNode.insertBefore(c,d),d.parentNode.removeChild(d),s.parentNode.insertBefore(N,s),s.parentNode.insertBefore(a,s),s.parentNode.removeChild(s),this.reverts.push(function(){o.parentNode.removeChild(o),c.parentNode.replaceChild(d,c),a.parentNode.removeChild(a),N.parentNode.replaceChild(s,N)}),N}},i});

const reggie = new RegExp(/([^\s-—/]+)/, 'g');

function embolden({text}) {
    const abbr = document.createElement('abbr');
    halfLength = text.length / 2;
    let rounded;
    let firstHalf;

    if (halfLength === 0.5)
    {
        abbr.title = text;
        abbr.innerHTML =  "<b>" + text + "</b>";
        return abbr;
    }
    else if (halfLength % 1 != 0)
    {
        rounded = Math.ceil(halfLength);
        firstHalf = text.substr(0, rounded);    
    }
    else 
    {
        firstHalf = text.substr(0, halfLength);    
    }
    
    emboldenedFirstHalf = "<b>" + firstHalf + "</b>";
    secondHalf = text.substr(-halfLength);
    passText = emboldenedFirstHalf.concat(secondHalf);

    abbr.title = text;
    abbr.innerHTML = passText;

    return abbr;
}

!function editDom() 
{   
    "use strict";var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};

    findAndReplaceDOMText(document.body, {
        find: reggie,
        replace: embolden,
    });
}();
