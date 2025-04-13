"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[896],{3275:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>d,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"automation/action/integration/gocardless/createpayment","title":"Create Payment","description":"Creates a new payment in GoCardless with the specified details","source":"@site/docs/automation/action/integration/gocardless/createpayment.md","sourceDirName":"automation/action/integration/gocardless","slug":"/automation/action/integration/gocardless/createpayment","permalink":"/docs/automation/action/integration/gocardless/createpayment","draft":false,"unlisted":false,"editUrl":"https://github.com/latechforce/engine/tree/main/website/docs/automation/action/integration/gocardless/createpayment.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"GoCardless","permalink":"/docs/automation/action/integration/gocardless/"},"next":{"title":"List Payments","permalink":"/docs/automation/action/integration/gocardless/listpayments"}}');var s=n(4848),i=n(8453);const a={},d="Create Payment",o={},c=[{value:"Properties",id:"properties",level:2},{value:"Examples",id:"examples",level:2}];function l(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"create-payment",children:"Create Payment"})}),"\n",(0,s.jsx)(t.p,{children:"Creates a new payment in GoCardless with the specified details"}),"\n",(0,s.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Required"}),(0,s.jsx)(t.th,{children:"Const"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"name"}),(0,s.jsx)(t.td,{children:"string"}),(0,s.jsx)(t.td,{children:"Yes"}),(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"account"}),(0,s.jsx)(t.td,{children:"string"}),(0,s.jsx)(t.td,{children:"Yes"}),(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"payment"}),(0,s.jsx)(t.td,{children:"object"}),(0,s.jsx)(t.td,{children:"Yes"}),(0,s.jsx)(t.td,{}),(0,s.jsx)(t.td,{})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"integration"}),(0,s.jsx)(t.td,{children:"string"}),(0,s.jsx)(t.td,{children:"Yes"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:'"GoCardless"'})}),(0,s.jsx)(t.td,{})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"action"}),(0,s.jsx)(t.td,{children:"string"}),(0,s.jsx)(t.td,{children:"Yes"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:'"CreatePayment"'})}),(0,s.jsx)(t.td,{})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(t.p,{children:"Example 1:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "integration": "GoCardless",\n  "action": "CreatePayment",\n  "payment": {\n    "amount": 1000,\n    "currency": "EUR",\n    "description": "Monthly subscription",\n    "mandate": "{{trigger.payload.mandateId}}",\n    "metadata": {\n      "orderId": "{{trigger.payload.orderId}}",\n      "customerId": "{{trigger.payload.customerId}}"\n    }\n  }\n}\n'})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>d});var r=n(6540);const s={},i=r.createContext(s);function a(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);