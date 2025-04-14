"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6544],{3379:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"index","title":"LTF Engine","description":"LTF Engine is a web app generator that allows you to create web apps with a simple and intuitive schema.","source":"@site/version/latest/index.md","sourceDirName":".","slug":"/","permalink":"/","draft":false,"unlisted":false,"editUrl":"https://github.com/latechforce/engine/tree/main/website/version/latest/index.md","tags":[],"version":"current","frontMatter":{"hide_table_of_contents":true}}');var a=t(4848),s=t(8453);const o={hide_table_of_contents:!0},r="LTF Engine",l={},c=[{value:"Get started | Schema API | FAQ | Contributing",id:"get-started--schema-api--faq--contributing",level:2},{value:"Installation",id:"installation",level:2},{value:"Example",id:"example",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"ltf-engine",children:"LTF Engine"})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"LTF Engine is a web app generator that allows you to create web apps with a simple and intuitive schema.\nIt is built with TypeScript and Bun.\nIt is designed to be used by non-technical users to create web apps."}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"get-started--schema-api--faq--contributing",children:[(0,a.jsx)(n.a,{href:"/docs/intro",children:"Get started"})," | ",(0,a.jsx)(n.a,{href:"/api/config",children:"Schema API"})," | ",(0,a.jsx)(n.a,{href:"https://github.com/latechforce/engine/discussions/categories/q-a",children:"FAQ"})," | ",(0,a.jsx)(n.a,{href:"https://github.com/latechforce/engine/blob/main/CONTRIBUTING.md",children:"Contributing"})]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"bun init\nbun add @latechforce/engine\n"})}),"\n",(0,a.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { type Config } from '@latechforce/engine'\nimport App from '@latechforce/engine/bun'\n\nconst app = new App()\n\nconst config: Config = {\n  name: 'My App',\n  version: '1.0.0',\n  engine: 'latest',\n  forms: [\n    {\n      name: 'email_form',\n      path: '/email',\n      table: 'mailing_list',\n      title: 'Email Form',\n      inputs: [{ field: 'email', label: 'Email' }],\n    },\n  ],\n  tables: [\n    {\n      name: 'mailing_list',\n      fields: [{ name: 'email', type: 'Email' }],\n    },\n  ],\n}\n\nconst { url } = await app.start(config)\nconsole.log(`Form is available at ${url}/form/email`)\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>r});var i=t(6540);const a={},s=i.createContext(a);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);