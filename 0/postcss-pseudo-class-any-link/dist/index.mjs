import e from"postcss-selector-parser";function t(t){if(!t||!t.nodes)return;let s=[];const o=[...t.nodes];for(let t=0;t<o.length+1;t++){const r=o[t];if(r&&"combinator"!==r.type)s.push(r);else{if(s.length>1){const t=e.selector({value:""});s[0].replaceWith(t),s.slice(1).forEach((e=>{e.remove()})),s.forEach((e=>{t.append(e)})),n(t),t.replaceWith(...t.nodes)}s=[]}}}function n(e){e&&e.nodes&&e.nodes.sort(((e,t)=>"selector"===e.type&&"selector"===t.type&&e.nodes.length&&t.nodes.length?s(e.nodes[0],e.nodes[0].type)-s(t.nodes[0],t.nodes[0].type):"selector"===e.type&&e.nodes.length?s(e.nodes[0],e.nodes[0].type)-s(t,t.type):"selector"===t.type&&t.nodes.length?s(e,e.type)-s(t.nodes[0],t.nodes[0].type):s(e,e.type)-s(t,t.type)))}function s(t,n){return e.isPseudoElement(t)?o.pseudoElement:o[n]}const o={universal:0,tag:1,id:2,class:3,attribute:4,selector:5,pseudo:6,pseudoElement:7,string:8,root:9,comment:10},r=e().astSync(":link").nodes[0],l=e().astSync(":visited").nodes[0],c=e().astSync("area[href]").nodes[0],a=e().astSync("[href]").nodes[0];function u(n,s){let o=[];return e((e=>{let n=[];e.walkPseudos((e=>{if(":any-link"!==e.value||e.nodes&&e.nodes.length)return;if(!s)return void n.push([r.clone(),l.clone()]);const t=function(e){let t=[],n=e.prev();for(;n&&"combinator"!==n.type;)"tag"===n.type&&t.push(n.value),n=n.prev();let s=e.next();for(;s&&"combinator"!==s.type;)"tag"===s.type&&t.push(s.value),s=s.next();return t}(e);t.includes("area")?n.push([r.clone(),l.clone(),a.clone()]):t.length?n.push([r.clone(),l.clone()]):n.push([r.clone(),l.clone(),c.clone()])})),n.length&&function(...e){const t=[],n=e.length-1;function s(o,r){for(let l=0,c=e[r].length;l<c;l++){const c=o.slice(0);c.push(e[r][l]),r==n?t.push(c):s(c,r+1)}}return s([],0),t}(...n).forEach((n=>{const s=e.clone();s.walkPseudos((e=>{":any-link"!==e.value||e.nodes&&e.nodes.length||e.replaceWith(...n.shift().nodes)})),s.walk((e=>{"nodes"in e&&(e.nodes.forEach((e=>{t(e)})),t(e))})),o.push(s.toString())}))})).processSync(n),o}const p=/:any-link/;function i(e){const t={preserve:!0,...e},n={areaHrefNeedsFixing:!1,...Object(t.subFeatures)};return{postcssPlugin:"postcss-pseudo-class-any-link",Rule(e,{result:s}){if(!p.test(e.selector))return;const o=e.raws.selector&&e.raws.selector.raw||e.selector;":"!==o[o.length-1]&&function(e,t,n,s){let o=[],r=[];try{for(let t=0;t<e.selectors.length;t++){const n=e.selectors[t],l=u(n,s);l.length?o.push(...l):r.push(n)}}catch(n){return void e.warn(t,`Failed to parse selector : ${e.selector}`)}o.length&&(e.cloneBefore({selectors:o}),n?r.length&&e.cloneBefore({selectors:r}):r.length?e.selectors=r:e.remove())}(e,s,t.preserve,n.areaHrefNeedsFixing)}}}i.postcss=!0;export{i as default};
