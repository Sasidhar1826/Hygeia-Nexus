import{u as te,a as e,j as i,d as xe,w as ye,p as Ge,h as Ae,F as y,x as He,y as Ne,z as ve,A as be,B as v,n as re,g as Ye,C as Qe,D as Xe,E as Je,G as Ke,H as We,I as Ze}from"./index-c3da158f.js";import{s as n,m as ne,e as m,r as x}from"./vendor-3ba6fd3e.js";import{C as g}from"./Card-66c37868.js";import{C as et,a as tt,L as nt,P as it,b as rt,p as ot,c as at,d as st,A as ct,D as dt}from"./Dashboard-ef516aac.js";import{A as ie}from"./AnimationContainer-978f4c1f.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const lt=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`,z=n(ne.div)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`,P=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${t=>t.color||"#4A90E2"};
  color: white;
  font-size: 24px;
  margin-right: 15px;
`,S=n.div`
  display: flex;
  flex-direction: column;
`,L=n.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`,T=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,U=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 15px;
`,O=n.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,_=n(m)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;

  svg {
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`,$e=n.div`
  display: flex;
  flex-direction: column;
`,Fe=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,Ce=n.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
`,De=n.div`
  font-weight: 600;
  color: #333;
`,Re=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,ke=n.div`
  flex: 1;
  margin: 0 15px;
`,Ee=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,ze=n.div`
  font-size: 14px;
  color: #666;
`,Pe=n.div`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${t=>{switch(t.status){case"confirmed":return"#E3F2FD";case"pending":return"#FFF9C4";case"cancelled":return"#FFEBEE";case"completed":return"#E8F5E9";default:return"#F5F5F5"}}};
  color: ${t=>{switch(t.status){case"confirmed":return"#1565C0";case"pending":return"#F57F17";case"cancelled":return"#C62828";case"completed":return"#2E7D32";default:return"#616161"}}};
`,pt=n.div`
  display: flex;
  flex-direction: column;
`,ht=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,mt=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  font-size: 20px;
  margin-right: 15px;
`,gt=n.div`
  flex: 1;
`,ut=n.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,ft=n.div`
  font-size: 14px;
  color: #666;
`,xt=n.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${t=>t.color||"#E3F2FD"};
  color: ${t=>t.textColor||"#1565C0"};
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`,yt=n.div`
  display: flex;
  flex-direction: column;
`,bt=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,vt=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  font-size: 20px;
  margin-right: 15px;
`,wt=n.div`
  flex: 1;
`,At=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,$t=n.div`
  font-size: 14px;
  color: #666;
`,Ft=()=>{var l,A,$,F,C,w,D,c;const[t,h]=x.useState(!0),[r,b]=x.useState({upcomingAppointments:[],labReports:[],medications:[],recentRecords:[]}),[p,u]=x.useState({}),{user:s}=te();x.useEffect(()=>{const o=async()=>{try{h(!0),u({});const f=await v.getAppointments({patient:s._id,status:["pending","confirmed"]}),Be=[...Array.isArray(f)?f:f&&f.data?f.data:[]].sort((d,E)=>new Date(d.appointmentDate)-new Date(E.appointmentDate)).map(d=>{var E;return{id:d._id,doctorName:d.doctor?d.doctor.name||(d.doctor.user?d.doctor.user.name:"Unknown Doctor"):"Unknown Doctor",date:d.appointmentDate,time:d.startTime,purpose:d.reason||"Consultation",department:((E=d.department)==null?void 0:E.name)||"General",status:d.status}});let R=[],k=null;try{const d=await v.getLabReports({patient:s._id});Array.isArray(d)?R=d:d&&Array.isArray(d.data)?R=d.data:d&&d.message?(console.warn("Lab reports message:",d.message),k=d.message):(console.warn("Unexpected lab reports response format:",d),R=[])}catch(d){console.error("Error fetching lab reports:",d),k=d.message||"Failed to load lab reports"}k&&u(d=>({...d,labReports:k})),b({upcomingAppointments:Be,labReports:R,medications:[{id:"1",name:"Lisinopril",dosage:"10mg",frequency:"Once daily",remaining:15,nextRefill:"2024-04-20"},{id:"2",name:"Metformin",dosage:"500mg",frequency:"Twice daily",remaining:8,nextRefill:"2024-04-05"},{id:"3",name:"Atorvastatin",dosage:"20mg",frequency:"Once daily at bedtime",remaining:22,nextRefill:"2024-05-10"}],recentRecords:[{id:"1",date:"2024-03-15",type:"Consultation Notes",doctor:"Dr. Sarah Johnson",department:"Cardiology"},{id:"2",date:"2024-03-01",type:"ECG Results",doctor:"Dr. Michael Chen",department:"Cardiology"}]}),h(!1)}catch(f){console.error("Error fetching patient data:",f),h(!1)}};s&&s._id?o():h(!1)},[s]);const a=o=>new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return t?e(ie,{type:"loading",height:"400px"}):i("div",{children:[i(lt,{children:[i(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e(P,{color:"#4A90E2",children:e(xe,{})}),i(S,{children:[e(L,{children:((l=r==null?void 0:r.upcomingAppointments)==null?void 0:l.length)||0}),e(T,{children:"Upcoming Appointments"})]})]}),i(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},children:[e(P,{color:"#50C878",children:e(ye,{})}),i(S,{children:[e(L,{children:((A=r==null?void 0:r.recentRecords)==null?void 0:A.length)||0}),e(T,{children:"Recent Medical Records"})]})]}),i(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},children:[e(P,{color:"#F5A623",children:e(Ge,{})}),i(S,{children:[e(L,{children:(($=r==null?void 0:r.labReports)==null?void 0:$.filter(o=>o.status==="pending").length)||0}),e(T,{children:"Pending Lab Reports"})]})]}),i(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.3},children:[e(P,{color:"#E74C3C",children:e(Ae,{})}),i(S,{children:[e(L,{children:((F=r==null?void 0:r.medications)==null?void 0:F.length)||0}),e(T,{children:"Active Medications"})]})]})]}),i(U,{children:[e(O,{children:"Upcoming Appointments"}),i(_,{to:"/dashboard/appointments",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i($e,{children:[(C=r==null?void 0:r.upcomingAppointments)==null?void 0:C.map(o=>i(Fe,{children:[i(Ce,{children:[e(De,{children:a(o.date)}),e(Re,{children:o.time})]}),i(ke,{children:[e(Ee,{children:o.purpose}),i(ze,{children:["Doctor: ",o.doctorName," | ",o.department]})]}),e(Pe,{status:o.status,children:o.status.charAt(0).toUpperCase()+o.status.slice(1)})]},o.id)),(!(r!=null&&r.upcomingAppointments)||r.upcomingAppointments.length===0)&&i("div",{style:{padding:"1rem",textAlign:"center",color:"#666"},children:["No upcoming appointments."," ",e(m,{to:"/dashboard/doctors",style:{color:"#3182ce"},children:"Schedule one now"})]})]})}),i(U,{children:[e(O,{children:"My Medications"}),i(_,{to:"/dashboard/prescriptions",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i(pt,{children:[(w=r==null?void 0:r.medications)==null?void 0:w.map(o=>i(ht,{children:[e(mt,{children:e(Ae,{})}),i(gt,{children:[i(ut,{children:[o.name," ",o.dosage,o.remaining<=10&&i(xt,{color:"#FFECB3",textColor:"#E65100",children:[e(He,{style:{marginRight:"4px"}})," Refill soon"]})]}),i(ft,{children:[o.frequency," | ",o.remaining," days remaining"]})]})]},o.id)),(!(r!=null&&r.medications)||r.medications.length===0)&&e("div",{style:{padding:"1rem",textAlign:"center",color:"#666"},children:"No active medications."})]})}),i(U,{children:[e(O,{children:"Recent Lab Reports"}),i(_,{to:"/dashboard/lab-reports",children:["View All ",e(y,{size:12})]})]}),i(g,{children:[p.labReports&&e("div",{style:{padding:"1rem",textAlign:"center",color:"#e74c3c"},children:p.labReports}),i($e,{children:[(D=r==null?void 0:r.labReports)==null?void 0:D.map(o=>i(Fe,{children:[i(Ce,{children:[e(De,{children:a(o.requestedDate||o.date)}),e(Re,{children:o.status==="completed"?e(Ne,{}):e(ve,{})})]}),i(ke,{children:[e(Ee,{children:o.type||o.testType}),i(ze,{children:["Technician:"," ",o.technician?typeof o.technician=="object"?o.technician.name:o.technician:"Not assigned"]})]}),e(Pe,{status:o.status==="completed"?"completed":"pending",children:o.status?o.status.charAt(0).toUpperCase()+o.status.slice(1):"Pending"})]},o._id||o.id)),(!(r!=null&&r.labReports)||r.labReports.length===0)&&!p.labReports&&e("div",{style:{padding:"1rem",textAlign:"center",color:"#666"},children:"No lab reports found."})]})]}),i(U,{children:[e(O,{children:"Recent Medical Records"}),i(_,{to:"/dashboard/medical-records",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i(yt,{children:[(c=r==null?void 0:r.recentRecords)==null?void 0:c.map(o=>i(bt,{children:[e(vt,{children:e(ye,{})}),i(wt,{children:[e(At,{children:o.type}),i($t,{children:[a(o.date)," | ",o.doctor," |"," ",o.department]})]}),e(m,{to:`/dashboard/medical-records/${o.id}`,children:e(be,{style:{color:"#4A90E2"}})})]},o.id)),(!(r!=null&&r.recentRecords)||r.recentRecords.length===0)&&e("div",{style:{padding:"1rem",textAlign:"center",color:"#666"},children:"No recent medical records found."})]})})]})},Ct=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`,I=n(ne.div)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`,M=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${t=>t.color||"#4A90E2"};
  color: white;
  font-size: 24px;
  margin-right: 15px;
`,j=n.div`
  display: flex;
  flex-direction: column;
`,V=n.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`,N=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,oe=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 15px;
`,ae=n.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,se=n(m)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;

  svg {
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`,Se=n.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,Le=n.div`
  display: flex;
  flex-direction: column;
`,Te=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,Ue=n.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
`,Oe=n.div`
  font-weight: 600;
  color: #333;
`,_e=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,Ie=n.div`
  flex: 1;
  margin: 0 15px;
`,Me=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,je=n.div`
  font-size: 14px;
  color: #666;
`,Ve=n.div`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${t=>{switch(t.status){case"confirmed":return"#E3F2FD";case"pending":return"#FFF9C4";case"cancelled":return"#FFEBEE";case"completed":return"#E8F5E9";default:return"#F5F5F5"}}};
  color: ${t=>{switch(t.status){case"confirmed":return"#1565C0";case"pending":return"#F57F17";case"cancelled":return"#C62828";case"completed":return"#2E7D32";default:return"#616161"}}};
`,Dt=n(g)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
`,Rt=n.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e1f5fe;
  color: #03a9f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
`,kt=n.div`
  flex: 1;
`,Et=n.div`
  font-weight: 600;
  color: #333;
`,zt=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,Pt=n(m)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #f0f8ff;
  color: #4a90e2;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e1f5fe;
  }
`,St=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`,q=n(g)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`,B=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${t=>t.color||"#4A90E2"}20;
  color: ${t=>t.color||"#4A90E2"};
  font-size: 24px;
  margin-bottom: 10px;
`,G=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,H=n.div`
  font-size: 14px;
  color: #666;
`,Lt=()=>{const[t,h]=x.useState(!0),[r,b]=x.useState({todayAppointments:[],pendingAppointments:[],recentPatients:[],stats:{totalPatients:0,todayAppointments:0,pendingAppointments:0,completedAppointments:0}}),{user:p}=te();x.useEffect(()=>{const a=async()=>{try{h(!0);const l=await v.getUserById(p._id),A=await v.getAppointments({doctor:p._id,status:"upcoming",limit:5}),$=await v.getRecentPatients(p._id);b(l),h(!1)}catch(l){console.error("Error fetching doctor data:",l),h(!1)}};p&&p._id&&a()},[p]);const u=a=>{const l={weekday:"short",month:"short",day:"numeric"};return new Date(a).toLocaleDateString("en-US",l)},s=a=>a;return t?e(ie,{type:"loading",height:"400px"}):i("div",{children:[e("h1",{children:"Doctor Dashboard"}),i(Ct,{children:[i(I,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e(M,{color:"#4A90E2",children:e(re,{})}),i(j,{children:[e(V,{children:r.stats.totalPatients}),e(N,{children:"Total Patients"})]})]}),i(I,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},children:[e(M,{color:"#50C878",children:e(xe,{})}),i(j,{children:[e(V,{children:r.stats.todayAppointments}),e(N,{children:"Today's Appointments"})]})]}),i(I,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},children:[e(M,{color:"#F5A623",children:e(ve,{})}),i(j,{children:[e(V,{children:r.stats.pendingAppointments}),e(N,{children:"Pending Appointments"})]})]}),i(I,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.3},children:[e(M,{color:"#4CAF50",children:e(Ne,{})}),i(j,{children:[e(V,{children:r.stats.completedAppointments}),e(N,{children:"Completed Appointments"})]})]})]}),i(Se,{children:[i(g,{children:[i(oe,{children:[e(ae,{children:"Today's Appointments"}),i(se,{to:"/dashboard/appointments",children:["View All ",e(y,{})]})]}),e(Le,{children:r.todayAppointments.length>0?r.todayAppointments.map(a=>{var l;return i(Te,{children:[i(Ue,{children:[e(Oe,{children:u(a.appointmentDate)}),e(_e,{children:s(a.startTime)})]}),i(Ie,{children:[e(Me,{children:a.reason||"Consultation"}),e(je,{children:((l=a.patient)==null?void 0:l.name)||"Unknown Patient"})]}),e(Ve,{status:a.status,children:a.status.charAt(0).toUpperCase()+a.status.slice(1)})]},a._id)}):e("p",{children:"No appointments scheduled for today."})})]}),e("div",{children:i(St,{children:[e(m,{to:"/dashboard/appointments",style:{textDecoration:"none"},children:i(q,{children:[e(B,{color:"#4A90E2",children:e(xe,{})}),e(G,{children:"Appointments"}),e(H,{children:"Manage your appointments"})]})}),e(m,{to:"/dashboard/patients",style:{textDecoration:"none"},children:i(q,{children:[e(B,{color:"#50C878",children:e(re,{})}),e(G,{children:"Patients"}),e(H,{children:"View patient records"})]})}),e(m,{to:"/dashboard/medical-records",style:{textDecoration:"none"},children:i(q,{children:[e(B,{color:"#F5A623",children:e(ye,{})}),e(G,{children:"Medical Records"}),e(H,{children:"Access medical files"})]})}),e(m,{to:"/dashboard/doctor-telemedicine",style:{textDecoration:"none"},children:i(q,{children:[e(B,{color:"#9C27B0",children:e(Ye,{})}),e(G,{children:"Telemedicine"}),e(H,{children:"Virtual consultations"})]})})]})})]}),i(Se,{children:[i(g,{children:[i(oe,{children:[e(ae,{children:"Pending Appointments"}),i(se,{to:"/dashboard/appointments",children:["View All ",e(y,{})]})]}),e(Le,{children:r.pendingAppointments.length>0?r.pendingAppointments.slice(0,5).map(a=>{var l;return i(Te,{children:[i(Ue,{children:[e(Oe,{children:u(a.appointmentDate)}),e(_e,{children:s(a.startTime)})]}),i(Ie,{children:[e(Me,{children:a.reason||"Consultation"}),e(je,{children:((l=a.patient)==null?void 0:l.name)||"Unknown Patient"})]}),e(Ve,{status:a.status,children:a.status.charAt(0).toUpperCase()+a.status.slice(1)})]},a._id)}):e("p",{children:"No pending appointments."})})]}),i(g,{children:[i(oe,{children:[e(ae,{children:"Recent Patients"}),i(se,{to:"/dashboard/patients",children:["View All ",e(y,{})]})]}),r.recentPatients.length>0?r.recentPatients.map(a=>i(Dt,{children:[e(Rt,{children:e(re,{})}),i(kt,{children:[e(Et,{children:a.name}),i(zt,{children:[a.gender,","," ",a.dateOfBirth&&new Date().getFullYear()-new Date(a.dateOfBirth).getFullYear()," ","years"]})]}),e(Pt,{to:`/dashboard/patients/${a._id}`,children:e(y,{})})]},a._id)):e("p",{children:"No recent patients."})]})]})]})},Tt=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`,Y=n(ne.div)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`,Q=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${t=>t.color||"#4A90E2"};
  color: white;
  font-size: 24px;
  margin-right: 15px;
`,X=n.div`
  display: flex;
  flex-direction: column;
`,J=n.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`,K=n.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`,W=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 15px;
`,Z=n.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,ce=n(m)`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;

  svg {
    margin-left: 5px;
    transition: transform 0.2s ease;
  }

  &:hover {
    text-decoration: underline;

    svg {
      transform: translateX(3px);
    }
  }
`,de=n.div`
  display: flex;
  flex-direction: column;
`,le=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,pe=n.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;
`,he=n.div`
  font-weight: 600;
  color: #333;
`,me=n.div`
  font-size: 14px;
  color: ${t=>t.urgent?"#E53E3E":"#666"};
  margin-top: 5px;
  font-weight: ${t=>t.urgent?"bold":"normal"};
`,ge=n.div`
  flex: 1;
  margin: 0 15px;
`,ue=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,fe=n.div`
  font-size: 14px;
  color: #666;
`,Ut=n.div`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${t=>{switch(t.status){case"completed":return"#E8F5E9";case"in_progress":return"#FFF9C4";case"pending":return"#E3F2FD";default:return"#F5F5F5"}}};
  color: ${t=>{switch(t.status){case"completed":return"#2E7D32";case"in_progress":return"#F57F17";case"pending":return"#1565C0";default:return"#616161"}}};
`,Ot=n.div`
  display: flex;
  flex-direction: column;
`,_t=n.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`,It=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${t=>t.color||"#f0f8ff"};
  color: ${t=>t.iconColor||"#4a90e2"};
  font-size: 20px;
  margin-right: 15px;
`,Mt=n.div`
  flex: 1;
`,jt=n.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`,Vt=n.div`
  font-size: 14px;
  color: #666;
`,ee=n.div`
  padding: 1rem;
  text-align: center;
  color: #666;
`,Nt=()=>{const[t,h]=x.useState(!0),[r,b]=x.useState({pendingOrders:[],inProgressOrders:[],completedReports:[],alerts:[]}),{user:p}=te();x.useEffect(()=>{const s=async()=>{try{h(!0);const a=await v.getLabOrders({technician:p._id}),l=await v.getLabReports({technician:p._id}),A=a.filter(c=>c.status==="pending"),$=a.filter(c=>c.status==="in_progress"&&c.technician&&c.technician._id===p._id),F=A.sort((c,o)=>c.urgency==="Urgent"&&o.urgency!=="Urgent"?-1:c.urgency!=="Urgent"&&o.urgency==="Urgent"?1:new Date(c.requestedDate)-new Date(o.requestedDate)),C=l.filter(c=>c.status==="completed"),w=[];F.filter(c=>c.urgency==="Urgent").forEach(c=>{var o,f;w.push({id:`urgent-${c._id}`,type:"urgent",title:`Urgent ${c.testType} needed`,details:`Patient: ${((o=c.patient)==null?void 0:o.name)||"Unknown"} | Requested by: ${((f=c.doctor)==null?void 0:f.name)||"Unknown"}`,date:c.requestedDate})}),a.filter(c=>{const o=new Date(c.requestedDate),we=Math.abs(new Date-o);return Math.ceil(we/(1e3*60*60*24))>2&&c.status!=="completed"}).forEach(c=>{var o;w.push({id:`overdue-${c._id}`,type:"overdue",title:`Overdue: ${c.testType}`,details:`Patient: ${((o=c.patient)==null?void 0:o.name)||"Unknown"} | Requested: ${u(c.requestedDate)}`,date:c.requestedDate})});const D=w.sort((c,o)=>new Date(o.date)-new Date(c.date));b({pendingOrders:F,inProgressOrders:$,completedReports:C,alerts:D}),h(!1)}catch(a){console.error("Error fetching lab technician data:",a),h(!1)}};p&&p._id?s():h(!1)},[p]);const u=s=>new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return t?e(ie,{type:"loading",height:"400px"}):i("div",{children:[i(Tt,{children:[i(Y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[e(Q,{color:"#4A90E2",children:e(Qe,{})}),i(X,{children:[e(J,{children:r.pendingOrders.length||0}),e(K,{children:"Pending Lab Orders"})]})]}),i(Y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},children:[e(Q,{color:"#F5A623",children:e(Xe,{})}),i(X,{children:[e(J,{children:r.inProgressOrders.length||0}),e(K,{children:"Tests In Progress"})]})]}),i(Y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},children:[e(Q,{color:"#50C878",children:e(Je,{})}),i(X,{children:[e(J,{children:r.completedReports.length||0}),e(K,{children:"Completed Reports"})]})]}),i(Y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.3},children:[e(Q,{color:"#E74C3C",children:e(Ke,{})}),i(X,{children:[e(J,{children:r.alerts.length||0}),e(K,{children:"Alerts"})]})]})]}),i(W,{children:[e(Z,{children:"Pending Lab Orders"}),i(ce,{to:"/dashboard/lab/view-lab-orders",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i(de,{children:[r.pendingOrders.slice(0,5).map(s=>{var a,l;return i(le,{children:[i(pe,{children:[e(he,{children:u(s.requestedDate)}),e(me,{urgent:s.urgency==="Urgent",children:s.urgency})]}),i(ge,{children:[e(ue,{children:s.testType}),i(fe,{children:["Patient: ",((a=s.patient)==null?void 0:a.name)||"Unknown"," | Doctor:"," ",((l=s.doctor)==null?void 0:l.name)||"Unknown"]})]}),e(Ut,{status:s.status,children:s.status.charAt(0).toUpperCase()+s.status.slice(1)})]},s._id)}),(!r.pendingOrders||r.pendingOrders.length===0)&&e(ee,{children:"No pending lab orders found."})]})}),i(W,{children:[e(Z,{children:"Tests In Progress"}),i(ce,{to:"/dashboard/lab/view-lab-orders",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i(de,{children:[r.inProgressOrders.slice(0,5).map(s=>{var a,l;return i(le,{children:[i(pe,{children:[e(he,{children:u(s.requestedDate)}),e(me,{urgent:s.urgency==="Urgent",children:s.urgency})]}),i(ge,{children:[e(ue,{children:s.testType}),i(fe,{children:["Patient: ",((a=s.patient)==null?void 0:a.name)||"Unknown"," | Doctor:"," ",((l=s.doctor)==null?void 0:l.name)||"Unknown"]})]}),e(m,{to:`/dashboard/lab/upload-results/${s._id}`,children:e(be,{style:{color:"#4A90E2"}})})]},s._id)}),(!r.inProgressOrders||r.inProgressOrders.length===0)&&e(ee,{children:"No tests currently in progress."})]})}),e(W,{children:e(Z,{children:"Alerts"})}),e(g,{children:i(Ot,{children:[r.alerts.slice(0,5).map(s=>i(_t,{children:[e(It,{color:s.type==="urgent"?"#FFF5F5":"#FFF9C4",iconColor:s.type==="urgent"?"#E53E3E":"#F57F17",children:s.type==="urgent"?e(We,{}):e(ve,{})}),i(Mt,{children:[e(jt,{children:s.title}),e(Vt,{children:s.details})]})]},s.id)),(!r.alerts||r.alerts.length===0)&&e(ee,{children:"No alerts at this time."})]})}),i(W,{children:[e(Z,{children:"Recently Completed Reports"}),i(ce,{to:"/dashboard/lab/lab-reports",children:["View All ",e(y,{size:12})]})]}),e(g,{children:i(de,{children:[r.completedReports.slice(0,5).map(s=>{var a;return i(le,{children:[i(pe,{children:[e(he,{children:u(s.date)}),e(me,{children:e(Ze,{style:{color:"#50C878"}})})]}),i(ge,{children:[e(ue,{children:s.reportType}),i(fe,{children:["Patient: ",((a=s.patient)==null?void 0:a.name)||"Unknown"]})]}),e(m,{to:`/dashboard/lab/lab-reports/${s._id}`,children:e(be,{style:{color:"#4A90E2"}})})]},s._id)}),(!r.completedReports||r.completedReports.length===0)&&e(ee,{children:"No completed reports found."})]})})]})};et.register(tt,nt,it,rt,ot,at,st,ct);n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${t=>t.theme.spacing(3)};
`;n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${t=>t.theme.spacing(3)};
  margin-bottom: ${t=>t.theme.spacing(4)};
`;n(ne.div)`
  background-color: ${t=>t.theme.colors.background.paper};
  border-radius: ${t=>t.theme.borderRadius.medium};
  padding: ${t=>t.theme.spacing(3)};
  box-shadow: ${t=>t.theme.shadows.small};
  display: flex;
  align-items: center;
`;n.div`
  width: 50px;
  height: 50px;
  border-radius: ${t=>t.theme.borderRadius.medium};
  background-color: ${t=>t.color||t.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${t=>t.theme.spacing(2)};

  svg {
    color: white;
    font-size: 1.5rem;
  }
`;n.div`
  flex: 1;
`;n.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${t=>t.theme.colors.text.primary};
`;n.div`
  font-size: 0.875rem;
  color: ${t=>t.theme.colors.text.secondary};
`;n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${t=>t.theme.spacing(4)};
  margin-bottom: ${t=>t.theme.spacing(2)};
`;n.h2`
  font-size: 1.25rem;
  color: ${t=>t.theme.colors.text.primary};
  margin: 0;
`;n(m)`
  display: flex;
  align-items: center;
  color: ${t=>t.theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.875rem;
  gap: ${t=>t.theme.spacing(.5)};
  transition: color 0.2s;

  &:hover {
    color: ${t=>t.theme.colors.primary.dark};
  }
`;n.div`
  display: flex;
  flex-direction: column;
`;n.div`
  display: flex;
  align-items: center;
  padding: ${t=>t.theme.spacing(2)};
  border-bottom: 1px solid ${t=>t.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;n.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${t=>t.theme.colors.background.default};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${t=>t.theme.spacing(2)};
  color: ${t=>t.theme.colors.text.secondary};
`;n.div`
  flex: 1;
`;n.div`
  font-weight: 500;
  color: ${t=>t.theme.colors.text.primary};
`;n.div`
  font-size: 0.75rem;
  color: ${t=>t.theme.colors.text.secondary};
`;n.div`
  display: flex;
  gap: ${t=>t.theme.spacing(1)};
`;n(m)`
  padding: ${t=>t.theme.spacing(.5)}
    ${t=>t.theme.spacing(1)};
  background: none;
  border: none;
  border-radius: ${t=>t.theme.borderRadius.small};
  color: ${t=>t.theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    background-color: ${t=>t.theme.colors.background.default};
  }
`;n.div`
  display: flex;
  flex-direction: column;
`;n.div`
  display: flex;
  align-items: center;
  padding: ${t=>t.theme.spacing(2)};
  border-bottom: 1px solid ${t=>t.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;n.div`
  min-width: 100px;
  margin-right: ${t=>t.theme.spacing(2)};
`;n.div`
  font-weight: 500;
  color: ${t=>t.theme.colors.text.primary};
  font-size: 0.875rem;
`;n.div`
  font-size: 0.75rem;
  color: ${t=>t.theme.colors.text.secondary};
`;n.div`
  flex: 1;
`;n.div`
  font-weight: 500;
  color: ${t=>t.theme.colors.text.primary};
`;n.div`
  font-size: 0.75rem;
  color: ${t=>t.theme.colors.text.secondary};
`;n.div`
  padding: ${t=>t.theme.spacing(.5)}
    ${t=>t.theme.spacing(1)};
  border-radius: ${t=>t.theme.borderRadius.small};
  font-size: 0.75rem;
  background-color: ${t=>{switch(t.status){case"confirmed":return t.theme.colors.status.successLight;case"pending":return t.theme.colors.status.warningLight;case"cancelled":return t.theme.colors.status.errorLight;default:return t.theme.colors.background.default}}};
  color: ${t=>{switch(t.status){case"confirmed":return t.theme.colors.status.success;case"pending":return t.theme.colors.status.warning;case"cancelled":return t.theme.colors.status.error;default:return t.theme.colors.text.secondary}}};
`;n.div`
  display: flex;
  flex-direction: column;
`;n.div`
  display: flex;
  align-items: center;
  padding: ${t=>t.theme.spacing(2)};
  border-bottom: 1px solid ${t=>t.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`;n.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${t=>t.theme.spacing(2)};
  color: #3182ce;
`;n.div`
  flex: 1;
`;n.div`
  font-weight: 500;
  color: ${t=>t.theme.colors.text.primary};
`;n.div`
  font-size: 0.75rem;
  color: ${t=>t.theme.colors.text.secondary};
`;n.span`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: ${t=>t.color||t.theme.colors.primary.main+"20"};
  color: ${t=>t.textColor||t.theme.colors.primary.main};
  margin-left: 0.5rem;
`;const Wt=()=>{const[t,h]=x.useState(!0),{user:r,isPatient:b,isDoctor:p,isAdmin:u,isLabTechnician:s}=te();if(x.useEffect(()=>{const a=setTimeout(()=>{h(!1)},1e3);return()=>clearTimeout(a)},[]),t)return e(ie,{type:"loading",height:"400px"});if(b())return e(Ft,{});if(u())return e(dt,{});if(p())return e(Lt,{});if(s())try{return e(Nt,{})}catch(a){return console.error("Error loading Lab Technician Dashboard:",a),e("div",{children:"Lab Technician Dashboard is under development"})}return e("div",{children:"Please select a role to continue"})};export{Wt as default};
//# sourceMappingURL=Dashboard-09645f56.js.map
