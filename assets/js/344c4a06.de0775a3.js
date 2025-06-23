"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3410],{15452:(e,t,r)=>{r.d(t,{Y:()=>i});r(96540);var o=r(72155),a=r(74848);const n=o.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`,s=o.A.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;

  img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    img {
      filter: grayscale(100%) brightness(1.2);
      opacity: 0.6;

      &:hover {
        filter: grayscale(0%) brightness(1.2);
        opacity: 0.9;
      }
    }
  }
`,i=({logos:e})=>(0,a.jsx)(n,{children:e.map(((e,t)=>(0,a.jsx)(s,{children:(0,a.jsx)("img",{src:e.src,alt:e.alt})},t)))})},35632:(e,t,r)=>{r.d(t,{c:()=>h});r(96540);var o=r(72155),a=r(74848);const n=o.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`,s=o.A.div`
  background: var(--card-bg, white);
  padding: 2rem;
  border-radius: 12px;
`,i=o.A.blockquote`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color, #333);
  margin: 0 0 1.5rem 0;
  font-style: italic;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 2rem;
    color: var(--secondary-text-color, #666);
  }
`,l=o.A.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,d=o.A.strong`
  font-size: 1rem;
  color: var(--text-color, #222);
`,c=o.A.span`
  font-size: 0.9rem;
  color: var(--secondary-text-color, #666);
`,h=({testimonials:e})=>(0,a.jsx)(n,{children:e.map(((e,t)=>(0,a.jsxs)(s,{children:[(0,a.jsx)(i,{children:e.quote}),(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:e.author}),(0,a.jsx)(c,{children:e.title})]})]},t)))})},96312:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>x,default:()=>v,frontMatter:()=>m,metadata:()=>o,toc:()=>f});const o=JSON.parse('{"type":"mdx","permalink":"/experts/","source":"@site/src/pages/experts/index.mdx","title":"We bring tailor-made solutions to your software challenges.","description":"Stop worrying about your technical and software challenges: our on-demand IT service is here to take care of you.","frontMatter":{},"unlisted":false}');var a=r(74848),n=r(28453),s=r(15452),i=r(35632),l=(r(96540),r(72155));const d=l.A.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 260px;
  flex: 1 1 260px;
  max-width: 340px;
`,c=l.A.div`
  background: ${({variant:e})=>`var(--stat-card-bg-${e})`};
  border-radius: 12px;
  padding: 1.3rem 1.5rem 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: background-color 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: var(--stat-card-bg-dark);
    border: 1px solid var(--ifm-color-emphasis-200);
  }
`,h=l.A.div`
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--ifm-color-emphasis-900);
  margin-bottom: 0.2em;
`,p=l.A.div`
  font-size: 1.08rem;
  color: var(--ifm-color-emphasis-700);
`,u=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:"\n  :root {\n    --stat-card-bg-pink: #faebeb;\n    --stat-card-bg-blue: #eaf3f7;\n    --stat-card-bg-green: #eef6ef;\n    --stat-card-bg-dark: #232323;\n  }\n  [data-theme='dark'] {\n    --stat-card-bg-pink: var(--stat-card-bg-dark);\n    --stat-card-bg-blue: var(--stat-card-bg-dark);\n    --stat-card-bg-green: var(--stat-card-bg-dark);\n  }\n"}),(0,a.jsxs)(d,{children:[(0,a.jsxs)(c,{variant:"pink",children:[(0,a.jsx)(h,{children:"50+"}),(0,a.jsx)(p,{children:"Clients servis avec succ\xe8s"})]}),(0,a.jsxs)(c,{variant:"blue",children:[(0,a.jsx)(h,{children:"200+"}),(0,a.jsx)(p,{children:"Outils internes innovants d\xe9velopp\xe9s"})]}),(0,a.jsxs)(c,{variant:"green",children:[(0,a.jsx)(h,{children:"10 000+"}),(0,a.jsx)(p,{children:"Heures de travail mensuel \xe9conomis\xe9es"})]})]})]});var g=r(56289);const m={},x="We bring tailor-made solutions to your software challenges.",b={},f=[{value:"They trust us.",id:"they-trust-us",level:2},{value:"We have 10 years of experience in No Code, Low Code, and code.",id:"we-have-10-years-of-experience-in-no-code-low-code-and-code",level:2},{value:"They speak better than we do.",id:"they-speak-better-than-we-do",level:2},{value:"Supercharge your team.",id:"supercharge-your-team",level:2}];function y(e){const t={h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"we-bring-tailor-made-solutions-to-your-software-challenges",children:"We bring tailor-made solutions to your software challenges."})}),"\n",(0,a.jsx)(t.p,{children:"Stop worrying about your technical and software challenges: our on-demand IT service is here to take care of you."}),"\n",(0,a.jsxs)("div",{style:{marginBottom:"36px",display:"flex",gap:"16px"},children:[(0,a.jsx)(g.A,{to:"/experts/methodology",children:(0,a.jsx)("button",{className:"button button--primary button--lg",children:"Our methodology"})}),(0,a.jsx)(g.A,{to:"/experts/work-with-us",children:(0,a.jsx)("button",{className:"button button--secondary button--lg",children:"Work with us"})})]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"they-trust-us",children:"They trust us."}),"\n",(0,a.jsx)(s.Y,{logos:[{src:"/logo/a0fb8ad4-c9f7-4555-819e-41e6d99795c3.png",alt:"ESCP"},{src:"/logo/5f836d89c4982b65192c4b75_th1.jpeg",alt:"TH1"},{src:"/logo/58bea2fc-586b-455a-8e20-9f6c1f460256.png",alt:"Agora Store"},{src:"/logo/logo-la-table-de-cana-association-nationale.png",alt:"La Table de Cana"},{src:"/logo/8633e3624640c3310cd65e678c5749f4.128x128_(1).png",alt:"Logo 1"},{src:"/logo/logo_capitalpv-com-web.svg",alt:"Capital PV"},{src:"/logo/5f836d88deb0c1291d8a521d_EDL_Logo_institutionnel2-p-500.png",alt:"EDL"},{src:"/logo/a588bf3c-2ffe-4324-b53d-6e6a48443003.png",alt:"Logo 2"},{src:"/logo/c699dd03-707b-462d-9ab3-81e4b5bfc74d.png",alt:"Logo 3"},{src:"/logo/le-beau-sourire.png",alt:"Le Beau Sourire"}]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",gap:"2.5rem",alignItems:"flex-start",justifyContent:"space-between",padding:"2rem 0 2.5rem 0"},children:[(0,a.jsxs)("div",{style:{flex:"1 1 340px",minWidth:"320px",maxWidth:"480px"},children:[(0,a.jsx)("div",{style:{fontSize:"2.3rem",fontWeight:700,color:"var(--ifm-color-emphasis-900)",lineHeight:1.1,marginBottom:"1.5rem"},children:(0,a.jsxs)(t.p,{children:["We listen to you.",(0,a.jsx)("br",{}),"\nWe advise you.",(0,a.jsx)("br",{}),"\nWe develop.",(0,a.jsx)("br",{}),"\nWe adjust.",(0,a.jsx)("br",{}),"\nWe maintain.",(0,a.jsx)("br",{}),"\n",(0,a.jsx)("span",{style:{color:"var(--ifm-color-primary)",fontWeight:800},children:"You are satisfied."})]})}),(0,a.jsx)("p",{style:{fontSize:"1.1rem",color:"var(--ifm-color-emphasis-700)",marginBottom:"1.2rem"},children:(0,a.jsx)(t.p,{children:"We put our product and technical expertise at your disposal to design together the information system most adapted to your business."})}),(0,a.jsx)(g.A,{to:"/experts/methodology",children:(0,a.jsx)("button",{className:"button button--primary button--lg",children:"Discover our methodology"})})]}),(0,a.jsx)(u,{})]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"we-have-10-years-of-experience-in-no-code-low-code-and-code",children:"We have 10 years of experience in No Code, Low Code, and code."}),"\n",(0,a.jsx)(t.p,{children:"We master a set of technologies that have allowed us to meet all our clients' demands while respecting their constraints."}),"\n",(0,a.jsx)(t.p,{children:"We implement complex, customized, flexible, and cost-effective systems:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"\ud83e\uddfe Invoice and credit note generation and tracking"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udd04 Business tool to No Code tool synchronization"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udcd1 Automatic business document generation"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udcc8 Activity report generation"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udcca Activity tracking dashboards"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udc65 Lead centralization and enrichment"}),"\n",(0,a.jsx)(t.li,{children:"\ud83e\udd16 API creation for software without one (RPA)"}),"\n",(0,a.jsx)(t.li,{children:"\ud83d\udd17 Connection between business APIs and external tools"}),"\n"]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"they-speak-better-than-we-do",children:"They speak better than we do."}),"\n",(0,a.jsx)(i.c,{testimonials:[{quote:"Very satisfying work, it's a very positive and enriching experience. The La Tech Force team helped us quickly gain expertise not only through their know-how but also through their ability to share it.",author:"Marco PERONE",title:"Co-founder at CAPITAL PV"},{quote:"Excellent support, great responsiveness and availability of the team, high quality deliverables, proactive suggestions and very strong adaptability to client constraints. True business experts!",author:"Simon SALLANDRE",title:"Operations Director at AGORASTORE"},{quote:"Competent team & effective work. I learned a lot and developed a better understanding of the logic needed when automating my processes.",author:"Mbemba DANSOKO",title:"Co-founder at ACTIVPRENEUR"},{quote:"A great collaboration, we were able to make a giant leap and the support could be provided across multiple business areas and tools. It's positive in the long term!",author:"Meryem BENMOUAZ",title:"Co-founder at LINTENDANCE"}]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsx)(t.h2,{id:"supercharge-your-team",children:"Supercharge your team."}),"\n",(0,a.jsx)(t.p,{children:"We bring tailor-made solutions to your software challenges."}),"\n",(0,a.jsx)("div",{style:{marginBottom:"36px",display:"flex",gap:"16px"},children:(0,a.jsx)(g.A,{to:"/experts/work-with-us",children:(0,a.jsx)("button",{className:"button button--primary button--lg",children:"Work with us"})})})]})}function v(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(y,{...e})}):y(e)}}}]);