import{j as i,a as n,b as $,I as K,r as D,aj as G,ak as L,X as N,S as q,B as x}from"./index-c3da158f.js";import{s as a,r}from"./vendor-3ba6fd3e.js";import{C as z}from"./Card-66c37868.js";import{B as b}from"./Button-d4df2000.js";import{I as Y}from"./Input-bfc5420b.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const V=a.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,Z=a(z)`
  position: relative;
  padding: ${e=>e.theme.spacing(3)};
`,_=a.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${e=>e.theme.colors.primary.main};
    margin-right: ${e=>e.theme.spacing(1)};
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;a(z)`
  margin-top: ${e=>e.theme.spacing(3)};
  border-left: 4px solid
    ${e=>e.status==="success"?e.theme.colors.status.success:e.status==="warning"?e.theme.colors.status.warning:e.theme.colors.status.info};
`;const J=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,Q=a.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  input {
    accent-color: ${e=>e.theme.colors.primary.main};
  }
`,W=a(b)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing(1)};
  position: absolute;
  top: ${e=>e.theme.spacing(1)};
  right: ${e=>e.theme.spacing(1)};
  padding: ${e=>`${e.theme.spacing(.75)} ${e.theme.spacing(1.5)}`};
  font-size: 0.85rem;
`,X=a.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,O=a.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(2)};
  max-height: 400px;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing(1)};
`,ee=a.div`
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  max-width: 80%;
  word-break: break-word;
  white-space: pre-line;

  ${e=>e.isUser?`
    align-self: flex-end;
    background-color: ${e.theme.colors.primary.main};
    color: white;
  `:`
    align-self: flex-start;
    background-color: ${e.theme.colors.background.card};
    border-left: 3px solid ${e.theme.colors.primary.main};
  `}

  p {
    margin: ${e=>e.theme.spacing(.5)} 0;
  }

  ul,
  ol {
    margin: ${e=>e.theme.spacing(.5)} 0;
    padding-left: ${e=>e.theme.spacing(2)};
  }

  strong,
  b {
    font-weight: 600;
  }
`,te=a.div`
  display: flex;
  margin-top: auto;
  gap: ${e=>e.theme.spacing(1)};
`,se=a(Y)`
  flex: 1;
`,ne=a(b)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
`,ae=a.div`
  font-size: 12px;
  margin-top: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.theme.colors.text.secondary};
`,ie=a.div`
  background-color: ${e=>e.success?e.theme.colors.status.success+"20":e.theme.colors.status.warning+"20"};
  border-left: 3px solid
    ${e=>e.success?e.theme.colors.status.success:e.theme.colors.status.warning};
  padding: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  display: ${e=>e.visible?"flex":"none"};
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    color: ${e=>e.success?e.theme.colors.status.success:e.theme.colors.status.warning};
    font-size: 18px;
  }
`,C=a(q)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,ue=()=>{const[e,h]=r.useState([]),[k,S]=r.useState(!1),[oe,M]=r.useState(null),[g,I]=r.useState(!1),[u,c]=r.useState([{isUser:!1,text:"Hello! I'm your medical assistant. How can I help you today? You can ask me about symptoms, general health questions, or medical information. You can also click the symptom selector button to analyze specific symptoms.",source:"AI Medical Assistant"}]),[l,A]=r.useState(""),[p,v]=r.useState(!1),[m,d]=r.useState({checked:!1,working:!1,message:""}),f=r.useRef(null),P=["Fever","Cough","Headache","Fatigue","Nausea","Dizziness","Shortness of breath","Chest pain","Abdominal pain","Joint pain","Rash","Sore throat"];r.useEffect(()=>{(async()=>{try{const s="AIzaSyDhRb7fLT6gV0zNUcQaZGDtwmnmYRjmZU0";if(console.log("Environment API key check:",s?"Found key":"No key found"),!s.startsWith("AIza")){d({checked:!0,working:!1,message:"Invalid Gemini API key format. Keys should start with 'AIza'"});return}console.log("Testing Gemini API connection with key:",s.substring(0,5)+"..."+s.substring(s.length-5));const o=await x.getMedicalChatResponse("Hello, this is a test message to verify the API connection is working correctly.",[]);o&&!o.error?(console.log("API test successful"),d({checked:!0,working:!0,message:"Gemini API connection successful"})):(console.log("API test failed with error"),d({checked:!0,working:!1,message:"Gemini API returned an error. Check console for details"}))}catch(s){console.error("API key validation error:",s),d({checked:!0,working:!1,message:`Gemini API key issue: ${s.message}`})}})()},[]),r.useEffect(()=>{f.current&&f.current.scrollIntoView({behavior:"smooth"})},[u]);const R=t=>{e.includes(t)?h(e.filter(s=>s!==t)):h([...e,t])},U=async()=>{if(e.length!==0){S(!0);try{const t=e.join(", "),s={isUser:!0,text:`I'm experiencing these symptoms: ${t}`};c(y=>[...y,s]);const o=await x.analyzeSymptomsAI(e);M(o);const H=o.details.join(`
• `),B=o.recommendations.join(`
• `),E={isUser:!1,text:`Based on the symptoms you reported (${t}), here's my analysis:

**${o.title}** (confidence: ${o.confidence}%)

**Analysis:**
• ${H}

**Recommendations:**
• ${B}

This is an automated analysis and not a medical diagnosis. Please consult a healthcare professional for proper evaluation.`,source:"AI Medical Assistant"};c(y=>[...y,E]),I(!1),h([])}catch(t){console.error("Error analyzing symptoms:",t),c(s=>[...s,{isUser:!1,text:"I'm sorry, I encountered an error analyzing your symptoms. Please try again later.",source:"AI Medical Assistant",error:!0}])}finally{S(!1)}}},F=()=>{I(!g)},j=t=>{let s=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^•\s(.+)$/gm,"<li>$1</li>").replace(/^\d+\.\s(.+)$/gm,"<li>$1</li>");return s.includes("<li>")&&(s=s.replace(/(<li>.*?<\/li>)\s*(<li>.*?<\/li>)/gs,"<ul>$1$2</ul>")),s=s.replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>"),s},T=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),w())},w=async()=>{if(!l.trim())return;const t={isUser:!0,text:l};c(s=>[...s,t]),A(""),v(!0);try{const s=await x.getMedicalChatResponse(l,u);c(o=>[...o,s])}catch(s){console.error("Chat error:",s),c(o=>[...o,{isUser:!1,text:"I'm sorry, I encountered an error processing your request. Please try again later.",source:"AI Medical Assistant",error:!0}])}finally{v(!1)}};return i(V,{children:[n("h2",{children:"AI Medical Assistant"}),n("p",{children:"Chat with our AI assistant about health concerns and receive personalized insights."}),m.checked&&n(ie,{visible:!0,success:m.working,children:m.working?i($,{children:[n(K,{})," ",m.message]}):i($,{children:[n(D,{})," ",m.message," Falling back to mock responses."]})}),i(Z,{children:[i(W,{variant:"outlined",onClick:F,children:[n(G,{})," ",g?"Hide Symptom Selector":"Show Symptom Selector"]}),i(_,{children:[n(L,{}),n("h3",{children:"Medical Chat Assistant"})]}),g&&i("div",{children:[n("p",{children:"Select symptoms for analysis:"}),n(J,{children:P.map(t=>i(Q,{children:[n("input",{type:"checkbox",id:t,checked:e.includes(t),onChange:()=>R(t)}),n("label",{htmlFor:t,children:t})]},t))}),n(b,{variant:"primary",onClick:U,disabled:e.length===0||k,children:k?i($,{children:[n(C,{})," Analyzing..."]}):"Analyze Symptoms"})]}),i(X,{children:[i(O,{children:[u.map((t,s)=>i(ee,{isUser:t.isUser,children:[t.isUser?t.text:n("div",{dangerouslySetInnerHTML:{__html:j(t.text)}}),!t.isUser&&t.source&&n(ae,{children:t.source})]},s)),n("div",{ref:f})]}),i(te,{children:[n(se,{type:"text",value:l,onChange:t=>A(t.target.value),onKeyPress:T,placeholder:"Type your health question...",disabled:p}),n(ne,{variant:"primary",onClick:w,disabled:p||!l.trim(),children:p?n(C,{}):n(N,{})})]}),n("p",{style:{fontStyle:"italic",fontSize:"12px",marginTop:"16px"},children:"Note: This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment."})]})]})]})};export{ue as default};
//# sourceMappingURL=AIDiagnostics-b5c1cb7c.js.map
