if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let c={};const f=e=>s(e,t),r={module:{uri:t},exports:c,require:f};n[t]=Promise.all(i.map((e=>r[e]||f(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"a2bc77bbe4cb149233fadb51540851c7"},{url:"/_next/static/Xn8itZnYYf3f2l-Fg6jeK/_buildManifest.js",revision:"40192090faea8201cc9aa97f0672e267"},{url:"/_next/static/Xn8itZnYYf3f2l-Fg6jeK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/100-79c07895fe66b857.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/108-9afce290f140b807.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/221-edb5133d7f678035.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/24-4c79605a3be35f4d.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/247-3e67aeb18c574d29.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/414-7957b7eaedb74bcb.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/4bd1b696-d5ca6bfc8d98550e.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/558-83ed1fbcfad76950.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/566-456cfa6a54f6edee.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/684-e06131241a3e3965.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/750-65a7ecc3c13874c8.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/782-fe46d9dca88c00aa.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/838-8a6927fe0c25e698.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/867-e8c5fec9baffa38e.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/939-c00c8054d24839e7.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/993-9fa692b3a477fac5.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/aaea2bcf-06f925b5047c327f.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/_not-found/page-c78c2a884f0dcd2a.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/admin/bank-sampah/page-12ec3e9703d457de.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/admin/family/page-a28813848c9d9aa7.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/admin/layout-071e06ca0d9cc9f8.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/admin/page-1ba1c5698a0889e6.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/admin/users/page-e3e746f643d1f1c5.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-ed7a3c05b59aaf6e.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/home/page-a52e286d6a6936b5.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/layout-2a51328c27f51fa8.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/login/page-05eb5ac4a23b501e.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/me/layout-a57f10c4f3006bf5.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/me/page-be374219eaac8ef7.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/me/profile/page-586d1309b3621760.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/me/transaksi/page-52f3c8a6130b24ae.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/no-access/page-c74597455a05710c.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/app/page-5db92483af9a37c9.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/framework-66dcb5289ae9d888.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/main-2bb70a788a9d2462.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/main-app-53c28d3496e0d672.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/pages/_app-8e94039938385921.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/pages/_error-7b2d139042a6a5ab.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-df70cda71feca323.js",revision:"Xn8itZnYYf3f2l-Fg6jeK"},{url:"/_next/static/css/a63c20d2c20b8483.css",revision:"a63c20d2c20b8483"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/images/recycle.png",revision:"3d9f8f982bbb6908b6eaf810ab6a9e32"},{url:"/images/recycle2.png",revision:"4bf6778c709dd40a3f72de25d99a46a8"},{url:"/manifest.json",revision:"12fc730afa0c794808260e70895746f8"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:i})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
