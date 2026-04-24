import { useState, useEffect } from “react”;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
{ id:1, icon:“🦷”, name:“Limpieza Dental”, duration:45, price:8500,  desc:“Eliminación de sarro y placa bacteriana. Pulido y fluorización incluidos.”, detail:“Recomendada cada 6 meses. Incluye diagnóstico visual completo, detartraje supragingival y pulido coronal.” },
{ id:2, icon:“✨”, name:“Blanqueamiento”, duration:60, price:28000, desc:“Blanqueamiento LED profesional. Hasta 8 tonos más blanco en una sola sesión.”, detail:“Usamos gel de peróxido de hidrógeno al 35% activado con lámpara LED de última generación. Resultado inmediato y duradero.” },
{ id:3, icon:“🔬”, name:“Ortodoncia”,      duration:30, price:15000, desc:“Consulta inicial + plan de tratamiento. Brackets metálicos, cerámicos o Invisalign.”, detail:“Primera consulta incluye radiografía panorámica digital, fotografías y plan de tratamiento personalizado.” },
{ id:4, icon:“🛡️”, name:“Endodoncia”,      duration:90, price:35000, desc:“Tratamiento de conducto con anestesia. Sin dolor, con tecnología rotacional.”, detail:“Instrumentación rotatoria Ni-Ti, obturación con gutapercha termoplastificada. Máximo 2 sesiones.” },
{ id:5, icon:“💎”, name:“Carillas”,         duration:120,price:55000, desc:“Carillas de porcelana o composite. Sonrisa perfecta en 2 sesiones.”, detail:“Diseño de sonrisa digital previo. Carillas ultrafinas E.max de 0.3mm. Sin desgaste dentario.” },
{ id:6, icon:“🦴”, name:“Implantes”,        duration:60, price:95000, desc:“Implantes de titanio con garantía de por vida. Marca Nobel Biocare.”, detail:“Implante + corona de zirconio. Tiempo de oseointegración 3-6 meses. Tomografía incluida en el precio.” },
{ id:7, icon:“👶”, name:“Odontopediatría”, duration:30, price:6500,  desc:“Atención especializada para niños. Ambiente amigable y sin miedo.”, detail:“Primera visita gratuita para menores de 3 años. Selladores, fluoruros y educación en higiene bucal.” },
{ id:8, icon:“😴”, name:“Sedación”,         duration:60, price:22000, desc:“Tratamiento bajo sedación consciente. Para pacientes con fobia dental.”, detail:“Sedación con óxido nitroso. Totalmente seguro, reversible al instante. Ideal para niños y adultos ansiosos.” },
];

const DOCTORS = [
{ name:“Dra. Valentina Ruiz”, title:“Odontóloga General · Directora”, img:“👩‍⚕️”, exp:“12 años de experiencia”, uni:“UBA · Especialización en Estética Dental · Harvard Online”, desc:“Especialista en diseño de sonrisa y odontología estética. Docente universitaria y speaker internacional.” },
{ name:“Dr. Matías Soria”,    title:“Especialista en Implantes”,       img:“👨‍⚕️”, exp:“8 años de experiencia”,  uni:“UNC · Fellowship en Implantología · NYU”,             desc:“Más de 2.000 implantes colocados. Experto en cirugía guiada por computadora y regeneración ósea.” },
{ name:“Dra. Lucía Fernández”,title:“Ortodoncista”,                    img:“👩‍⚕️”, exp:“6 años de experiencia”,  uni:“UNR · Especialización en Ortodoncia · Invisalign Certified”,desc:“Especialista certificada en Invisalign. Tratamientos de ortodoncia en adultos y niños con enfoque estético.” },
];

const TESTIMONIALS = [
{ name:“María González”,  rating:5, text:“Llegué con mucho miedo y la Dra. Valentina me hizo sentir en casa desde el primer minuto. Me hice las carillas y quedé enamorada de mi sonrisa. 100% recomendable.”, service:“Carillas de porcelana”, avatar:“👩” },
{ name:“Carlos Mendoza”,  rating:5, text:“Vine para implantes y el Dr. Matías explicó todo el proceso con lujo de detalles. Sin dolor, sin molestias y el resultado es increíble. Como tener dientes naturales.”, service:“Implantes dentales”, avatar:“👨” },
{ name:“Sofia Ramírez”,   rating:5, text:“Llevé a mi hijo de 6 años que le tenía terror al dentista. La Dra. Lucía fue una genia, lo hizo reír todo el tiempo. Salió contento y con ganas de volver.”, service:“Odontopediatría”, avatar:“👧” },
{ name:“Roberto Álvarez”, rating:5, text:“El blanqueamiento superó mis expectativas. Quedé 9 tonos más blanco y sin sensibilidad. El consultorio es hermoso y el equipo muy profesional.”, service:“Blanqueamiento LED”, avatar:“👴” },
{ name:“Camila Torres”,   rating:5, text:“Terminé mi ortodoncia con Invisalign en 14 meses. La atención fue impecable durante todo el tratamiento. Ahora sonrío en todas las fotos.”, service:“Invisalign”, avatar:“👩” },
];

const BLOG_POSTS = [
{ id:1, title:“5 hábitos que arruinan tu esmalte dental”, date:“15 Abr 2026”, category:“Consejos”, emoji:“⚠️”, read:“4 min”, excerpt:“El esmalte dental es la capa más dura del cuerpo humano, pero ciertos hábitos cotidianos pueden erosionarlo sin que te des cuenta. Descubrí cuáles son y cómo evitarlos.” },
{ id:2, title:”¿Invisalign o brackets? Guía completa 2026”, date:“8 Abr 2026”,  category:“Ortodoncia”, emoji:“🦷”, read:“7 min”, excerpt:“La ortodoncia evolucionó enormemente en los últimos años. Te explicamos en detalle las diferencias, ventajas y cuál es la mejor opción según tu caso.” },
{ id:3, title:“Cómo cuidar tus implantes para que duren toda la vida”, date:“1 Abr 2026”,  category:“Implantes”, emoji:“🔩”, read:“5 min”, excerpt:“Los implantes dentales pueden durar décadas si los cuidás correctamente. Aquí encontrás la guía definitiva de mantenimiento post-implante.” },
{ id:4, title:“Blanqueamiento dental: mitos y realidades”, date:“22 Mar 2026”, category:“Estética”, emoji:“✨”, read:“3 min”, excerpt:“Hay mucha información errónea sobre el blanqueamiento dental. Separamos los mitos de la realidad con evidencia científica actualizada.” },
];

const GALLERY = [
{ before:“😬”, after:“😁”, label:“Carillas de porcelana”, desc:“8 carillas E.max · 2 sesiones” },
{ before:“😬”, after:“😁”, label:“Blanqueamiento LED”, desc:“9 tonos más blanco · 1 sesión” },
{ before:“😐”, after:“😁”, label:“Implante unitario”, desc:“Implante + corona zirconio” },
{ before:“😑”, after:“😄”, label:“Ortodoncia Invisalign”, desc:“14 meses de tratamiento” },
];

const HOURS = { “Lunes”:“9:00 - 20:00”, “Martes”:“9:00 - 20:00”, “Miércoles”:“9:00 - 20:00”, “Jueves”:“9:00 - 20:00”, “Viernes”:“9:00 - 18:00”, “Sábado”:“9:00 - 14:00”, “Domingo”:“Cerrado” };

const TIMES = [“09:00”,“09:30”,“10:00”,“10:30”,“11:00”,“11:30”,“14:00”,“14:30”,“15:00”,“15:30”,“16:00”,“16:30”,“17:00”,“17:30”];

const BOOKED = { “2026-05-05”:[“09:00”,“10:00”,“14:00”], “2026-05-06”:[“09:30”,“11:00”,“15:00”,“16:00”], “2026-05-08”:[“09:00”,“09:30”,“10:00”,“10:30”] };

const getDaysInMonth = (y,m) => new Date(y,m+1,0).getDate();
const getFirstDay   = (y,m) => new Date(y,m,1).getDay();
const fmtDate = (y,m,d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

let _tid=0;
const fmt = n => “$”+n.toLocaleString(“es-AR”);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
const [page, setPage]         = useState(“home”);
const [toasts, setToasts]     = useState([]);
const [menuOpen, setMenuOpen] = useState(false);

// Appointment
const [apptStep, setApptStep]     = useState(1);
const [selService, setSelService] = useState(null);
const [selDoctor, setSelDoctor]   = useState(null);
const [calYear, setCalYear]       = useState(2026);
const [calMonth, setCalMonth]     = useState(4);
const [selDate, setSelDate]       = useState(null);
const [selTime, setSelTime]       = useState(null);
const [apptForm, setApptForm]     = useState({name:””,email:””,phone:””,dni:””,notes:””});
const [payMethod, setPayMethod]   = useState(“mp”);
const [apptDone, setApptDone]     = useState(false);
const [apptCode, setApptCode]     = useState(””);
const [myAppts, setMyAppts]       = useState([]);

// Gallery
const [galIdx, setGalIdx] = useState(0);
const [showAfter, setShowAfter] = useState(false);

// Blog
const [selPost, setSelPost] = useState(null);

// Contact form
const [contactForm, setContactForm] = useState({name:””,email:””,phone:””,msg:””});
const [contactSent, setContactSent] = useState(false);

const toast = (msg,type=“ok”) => {
const id=++_tid;
setToasts(t=>[…t,{id,msg,type}]);
setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200);
};

const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0,0); };

const bookedTimes = selDate ? (BOOKED[selDate]||[]) : [];
const availTimes  = TIMES.filter(t=>!bookedTimes.includes(t));

const submitAppt = () => {
const code = “ODO-”+Math.floor(Math.random()*90000+10000);
setApptCode(code);
setMyAppts(a=>[…a,{code,service:selService,doctor:selDoctor,date:selDate,time:selTime,patient:apptForm.name,pay:payMethod,status:“Confirmado”}]);
setApptDone(true);
toast(”¡Turno confirmado! “+code);
};

const resetAppt = () => {
setApptStep(1); setSelService(null); setSelDoctor(null); setSelDate(null); setSelTime(null);
setApptForm({name:””,email:””,phone:””,dni:””,notes:””}); setApptDone(false); setApptCode(””);
};

const submitContact = () => {
if(!contactForm.name||!contactForm.email||!contactForm.msg){ toast(“Completá todos los campos”,“err”); return; }
setContactSent(true); toast(”¡Mensaje enviado! Te contactamos pronto.”);
};

const today = new Date();
const todayStr = fmtDate(today.getFullYear(),today.getMonth(),today.getDate());

// Calendar
const daysInMonth = getDaysInMonth(calYear,calMonth);
const firstDay    = getFirstDay(calYear,calMonth);
const monthNames  = [“Enero”,“Febrero”,“Marzo”,“Abril”,“Mayo”,“Junio”,“Julio”,“Agosto”,“Septiembre”,“Octubre”,“Noviembre”,“Diciembre”];
const dayNames    = [“Dom”,“Lun”,“Mar”,“Mié”,“Jue”,“Vie”,“Sáb”];

return (
<div style={S.root}>
<style>{CSS}</style>

```
  {/* TOASTS */}
  <div style={S.toastStack}>
    {toasts.map(t=>(
      <div key={t.id} className="toast" style={{...S.toast,background:t.type==="err"?"#C84040":"#1A5C3A"}}>
        {t.type==="err"?"⚠":"✓"} {t.msg}
      </div>
    ))}
  </div>

  {/* HEADER */}
  <header style={S.header}>
    <div style={S.headerInner}>
      <button style={S.logo} onClick={()=>go("home")}>
        <div style={S.logoIcon}>🦷</div>
        <div>
          <div style={S.logoName}>DentalCare</div>
          <div style={S.logoSub}>Dra. Valentina Ruiz</div>
        </div>
      </button>

      <nav style={S.nav}>
        {[["Inicio","home"],["Servicios","services"],["Nosotros","about"],["Galería","gallery"],["Blog","blog"],["Contacto","contact"]].map(([l,p])=>(
          <button key={p} className={`navBtn${page===p?" navBtnOn":""}`} onClick={()=>go(p)}>{l}</button>
        ))}
      </nav>

      <div style={S.headerRight}>
        <a href="tel:+5491112345678" style={S.phoneBtn}>📞 (011) 1234-5678</a>
        <button className="btnPrimary" onClick={()=>go("turnos")}>Reservar turno</button>
        <button style={S.burger} onClick={()=>setMenuOpen(o=>!o)}>☰</button>
      </div>
    </div>

    {/* Mobile menu */}
    {menuOpen&&(
      <div style={S.mobileMenu}>
        {[["Inicio","home"],["Servicios","services"],["Nosotros","about"],["Galería","gallery"],["Blog","blog"],["Contacto","contact"],["Reservar turno","turnos"]].map(([l,p])=>(
          <button key={p} className="mobileNavBtn" onClick={()=>go(p)}>{l}</button>
        ))}
      </div>
    )}

    {/* Top bar */}
    <div style={S.topBar}>
      <span>📍 Av. Corrientes 1234, CABA</span>
      <span>⏰ Lun–Vie 9:00–20:00 · Sáb 9:00–14:00</span>
      <span>✉️ hola@dentalcare.ar</span>
    </div>
  </header>

  <main style={S.main}>

    {/* ══ HOME ══════════════════════════════════════════════ */}
    {page==="home"&&(
      <>
        {/* HERO */}
        <section style={S.hero}>
          <div style={S.heroLeft}>
            <div style={S.heroPill}>🏆 +15 años de experiencia · +8.000 pacientes</div>
            <h1 style={S.heroH}>
              Tu sonrisa<br/>
              <span style={S.heroAccent}>perfecta</span><br/>
              comienza aquí
            </h1>
            <p style={S.heroP}>Odontología estética y de alta complejidad en el corazón de Buenos Aires. Tecnología de punta, equipo certificado y el cuidado que merecés.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:32}}>
              <button className="btnPrimary heroCTA" onClick={()=>go("turnos")}>Reservar turno online →</button>
              <button className="btnOutline heroCTA" onClick={()=>go("services")}>Ver servicios</button>
            </div>
            <div style={S.heroStats}>
              {[["8.000+","Pacientes"],["15+","Años"],["98%","Satisfacción"],["3","Especialistas"]].map(([n,l])=>(
                <div key={l} style={S.heroStat}>
                  <div style={S.heroStatN}>{n}</div>
                  <div style={S.heroStatL}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={S.heroRight}>
            <div style={S.heroCard}>
              <div style={{fontSize:120,marginBottom:16}}>🦷</div>
              <div style={S.heroCardBadge}>✓ Atención sin dolor garantizada</div>
              <div style={{...S.heroCardBadge,marginTop:8,background:"#E8F4FD",color:"#1A6BA0"}}>💳 Mercado Pago · Cuotas sin interés</div>
              <div style={{...S.heroCardBadge,marginTop:8,background:"#FFF8E8",color:"#8B6914"}}>⭐ 5/5 en Google · 847 reseñas</div>
            </div>
            {/* Floating elements */}
            <div style={S.float1}>📅<br/><span style={{fontSize:10,fontFamily:"sans-serif"}}>Turnos online</span></div>
            <div style={S.float2}>🚨<br/><span style={{fontSize:10,fontFamily:"sans-serif"}}>Urgencias</span></div>
          </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section style={S.section}>
          <div style={S.secHead}>
            <div style={S.secEye}>NUESTROS SERVICIOS</div>
            <h2 style={S.secH}>Todo lo que tu sonrisa necesita</h2>
            <p style={S.secP}>Ofrecemos una gama completa de tratamientos odontológicos con tecnología de última generación.</p>
          </div>
          <div style={S.servGrid}>
            {SERVICES.map(s=>(
              <div key={s.id} className="servCard" style={S.servCard} onClick={()=>go("services")}>
                <div style={S.servIcon}>{s.icon}</div>
                <div style={S.servName}>{s.name}</div>
                <div style={S.servDesc}>{s.desc}</div>
                <div style={S.servPrice}>{fmt(s.price)}</div>
                <div style={S.servDur}>⏱ {s.duration} min</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <button className="btnPrimary" onClick={()=>go("turnos")}>Reservar mi turno →</button>
          </div>
        </section>

        {/* WHY US */}
        <section style={S.whySection}>
          <div style={S.secHead}>
            <div style={S.secEye}>¿POR QUÉ ELEGIRNOS?</div>
            <h2 style={{...S.secH,color:"#fff"}}>La diferencia que se siente</h2>
          </div>
          <div style={S.whyGrid}>
            {[
              {e:"🏥",t:"Tecnología de punta",d:"Tomógrafo 3D, láser dental, scanner intraoral y blanqueamiento LED de última generación."},
              {e:"😴",t:"Sin dolor garantizado",d:"Anestesia computarizada, sedación consciente y técnicas atraumáticas para una experiencia sin estrés."},
              {e:"💳",t:"Financiación flexible",d:"Hasta 18 cuotas sin interés con todas las tarjetas. Mercado Pago, transferencia y efectivo."},
              {e:"🕐",t:"Turnos online 24/7",d:"Reservá tu turno cuando quieras desde el celular. Recordatorio automático por WhatsApp y email."},
              {e:"🏆",t:"Equipo certificado",d:"Especialistas con posgrados en universidades nacionales e internacionales. Formación continua."},
              {e:"🔒",t:"Higiene y esterilización",d:"Protocolo de esterilización clase B. Materiales descartables en cada consulta. Tu seguridad primero."},
            ].map(w=>(
              <div key={w.t} style={S.whyCard}>
                <div style={S.whyIcon}>{w.e}</div>
                <div style={S.whyTitle}>{w.t}</div>
                <div style={S.whyDesc}>{w.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={S.section}>
          <div style={S.secHead}>
            <div style={S.secEye}>TESTIMONIOS</div>
            <h2 style={S.secH}>Lo que dicen nuestros pacientes</h2>
          </div>
          <div style={S.testiGrid}>
            {TESTIMONIALS.slice(0,3).map((t,i)=>(
              <div key={i} style={S.testiCard}>
                <div style={S.testiStars}>{"★".repeat(t.rating)}</div>
                <p style={S.testiText}>"{t.text}"</p>
                <div style={S.testiAuthor}>
                  <div style={S.testiAvatar}>{t.avatar}</div>
                  <div><div style={S.testiName}>{t.name}</div><div style={S.testiService}>{t.service}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:24}}>
            <button className="btnOutline" onClick={()=>go("about")}>Ver todos los testimonios →</button>
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={S.ctaBanner}>
          <div style={S.ctaLeft}>
            <div style={S.secEye}>PRIMERA CONSULTA</div>
            <h3 style={S.ctaH}>Diagnóstico inicial <span style={{color:"#2BA86A"}}>sin cargo</span></h3>
            <p style={S.ctaP}>Radiografía panorámica + diagnóstico completo + plan de tratamiento. Sin compromiso.</p>
            <button className="btnPrimary heroCTA" onClick={()=>go("turnos")}>Reservar consulta gratuita →</button>
          </div>
          <div style={S.ctaRight}>
            {["✓ Sin dolor garantizado","✓ Tecnología de punta","✓ Cuotas sin interés","✓ Turno en menos de 48hs"].map(i=>(
              <div key={i} style={S.ctaItem}>{i}</div>
            ))}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section style={S.section}>
          <div style={S.secHead}>
            <div style={S.secEye}>BLOG</div>
            <h2 style={S.secH}>Consejos para tu salud bucal</h2>
          </div>
          <div style={S.blogGrid}>
            {BLOG_POSTS.slice(0,3).map(p=>(
              <div key={p.id} className="blogCard" style={S.blogCard} onClick={()=>{setSelPost(p);go("blog");}}>
                <div style={S.blogEmoji}>{p.emoji}</div>
                <div style={S.blogCat}>{p.category}</div>
                <div style={S.blogTitle}>{p.title}</div>
                <div style={S.blogExcerpt}>{p.excerpt.slice(0,100)}...</div>
                <div style={S.blogMeta}>{p.date} · {p.read} de lectura</div>
              </div>
            ))}
          </div>
        </section>
      </>
    )}

    {/* ══ SERVICES ══════════════════════════════════════════ */}
    {page==="services"&&(
      <div style={S.pageWrap}>
        <div style={S.pageHead}>
          <div style={S.secEye}>SERVICIOS</div>
          <h1 style={S.pageH}>Tratamientos que transforman</h1>
          <p style={S.pageP}>Tecnología de última generación al servicio de tu salud bucal y tu sonrisa.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {SERVICES.map(s=>(
            <div key={s.id} className="servRow" style={S.servRow}>
              <div style={S.servRowIcon}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:8}}>
                  <div style={S.servRowName}>{s.name}</div>
                  <div style={{display:"flex",gap:16,alignItems:"center"}}>
                    <span style={S.servRowDur}>⏱ {s.duration} min</span>
                    <span style={S.servRowPrice}>{fmt(s.price)}</span>
                  </div>
                </div>
                <div style={S.servRowDesc}>{s.desc}</div>
                <div style={{...S.servRowDesc,color:"#888",marginTop:4,fontSize:13}}>{s.detail}</div>
              </div>
              <button className="btnPrimary" style={{flexShrink:0,padding:"10px 20px",fontSize:12}} onClick={()=>{setSelService(s);go("turnos");}}>Reservar →</button>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ══ ABOUT ═════════════════════════════════════════════ */}
    {page==="about"&&(
      <div style={S.pageWrap}>
        <div style={S.pageHead}>
          <div style={S.secEye}>NOSOTROS</div>
          <h1 style={S.pageH}>Nuestro equipo</h1>
          <p style={S.pageP}>Profesionales apasionados por la odontología y el bienestar de cada paciente.</p>
        </div>
        <div style={S.doctorsGrid}>
          {DOCTORS.map(d=>(
            <div key={d.name} style={S.doctorCard}>
              <div style={S.doctorAvatar}>{d.img}</div>
              <div style={S.doctorName}>{d.name}</div>
              <div style={S.doctorTitle}>{d.title}</div>
              <div style={S.doctorExp}>🏆 {d.exp}</div>
              <div style={S.doctorUni}>🎓 {d.uni}</div>
              <p style={S.doctorDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        <div style={{...S.whySection,margin:"48px -24px",borderRadius:20}}>
          <div style={S.secHead}>
            <div style={{...S.secEye,color:"#7BC8A4"}}>TODOS DICEN</div>
            <h2 style={{...S.secH,color:"#fff"}}>Lo que opinan nuestros pacientes</h2>
          </div>
          <div style={S.testiGrid}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} style={{...S.testiCard,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)"}}>
                <div style={{...S.testiStars,color:"#F0C040"}}>{"★".repeat(t.rating)}</div>
                <p style={{...S.testiText,color:"#CCC"}}>"{t.text}"</p>
                <div style={S.testiAuthor}>
                  <div style={S.testiAvatar}>{t.avatar}</div>
                  <div><div style={{...S.testiName,color:"#fff"}}>{t.name}</div><div style={{...S.testiService,color:"#7BC8A4"}}>{t.service}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ══ GALLERY ═══════════════════════════════════════════ */}
    {page==="gallery"&&(
      <div style={S.pageWrap}>
        <div style={S.pageHead}>
          <div style={S.secEye}>GALERÍA</div>
          <h1 style={S.pageH}>Resultados que hablan</h1>
          <p style={S.pageP}>Antes y después de tratamientos reales. Resultados con consentimiento de nuestros pacientes.</p>
        </div>

        {/* Featured */}
        <div style={S.galFeatured}>
          <div style={S.galMain}>
            <div style={S.galCompare}>
              <div style={S.galHalf}>
                <div style={S.galLabel}>ANTES</div>
                <div style={S.galFace}>{GALLERY[galIdx].before}</div>
              </div>
              <div style={{width:2,background:"#eee",alignSelf:"stretch"}}/>
              <div style={S.galHalf}>
                <div style={{...S.galLabel,background:"#1A5C3A",color:"#fff"}}>DESPUÉS</div>
                <div style={S.galFace}>{GALLERY[galIdx].after}</div>
              </div>
            </div>
            <div style={S.galInfo}>
              <div style={S.galTreatment}>{GALLERY[galIdx].label}</div>
              <div style={S.galDetail}>{GALLERY[galIdx].desc}</div>
            </div>
          </div>
          <div style={S.galThumbs}>
            {GALLERY.map((g,i)=>(
              <div key={i} className="galThumb" style={{...S.galThumb,border:`2px solid ${galIdx===i?"#1A5C3A":"transparent"}`}} onClick={()=>{setGalIdx(i);setShowAfter(false);}}>
                <div style={{fontSize:32}}>{g.before}</div>
                <div style={{fontSize:11,fontFamily:"sans-serif",color:"#888",marginTop:4}}>{g.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center",marginTop:40}}>
          <p style={{color:"#888",fontFamily:"sans-serif",fontSize:14,marginBottom:20}}>¿Querés ver resultados similares para vos?</p>
          <button className="btnPrimary heroCTA" onClick={()=>go("turnos")}>Reservar consulta →</button>
        </div>
      </div>
    )}

    {/* ══ BLOG ══════════════════════════════════════════════ */}
    {page==="blog"&&(
      <div style={S.pageWrap}>
        {selPost?(
          <>
            <button className="backBtn" onClick={()=>setSelPost(null)}>← Volver al blog</button>
            <div style={S.postWrap}>
              <div style={S.postEmoji}>{selPost.emoji}</div>
              <div style={S.postCat}>{selPost.category}</div>
              <h1 style={S.postTitle}>{selPost.title}</h1>
              <div style={S.postMeta}>{selPost.date} · {selPost.read} de lectura</div>
              <div style={S.postBody}>
                <p>{selPost.excerpt}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h3>¿Por qué es importante?</h3>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <h3>Recomendaciones</h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
              </div>
              <div style={S.postCTA}>
                <h3 style={{marginBottom:8}}>¿Tenés alguna consulta?</h3>
                <p style={{color:"#888",fontFamily:"sans-serif",fontSize:14,marginBottom:16}}>Reservá tu turno y te atendemos personalmente.</p>
                <button className="btnPrimary" onClick={()=>go("turnos")}>Reservar turno →</button>
              </div>
            </div>
          </>
        ):(
          <>
            <div style={S.pageHead}>
              <div style={S.secEye}>BLOG</div>
              <h1 style={S.pageH}>Salud bucal y bienestar</h1>
              <p style={S.pageP}>Artículos escritos por nuestros especialistas para cuidar tu sonrisa.</p>
            </div>
            <div style={S.blogGrid}>
              {BLOG_POSTS.map(p=>(
                <div key={p.id} className="blogCard" style={S.blogCard} onClick={()=>setSelPost(p)}>
                  <div style={S.blogEmoji}>{p.emoji}</div>
                  <div style={S.blogCat}>{p.category}</div>
                  <div style={S.blogTitle}>{p.title}</div>
                  <div style={S.blogExcerpt}>{p.excerpt}</div>
                  <div style={S.blogMeta}>{p.date} · {p.read} de lectura</div>
                  <div style={S.blogReadMore}>Leer más →</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )}

    {/* ══ CONTACT ═══════════════════════════════════════════ */}
    {page==="contact"&&(
      <div style={S.pageWrap}>
        <div style={S.pageHead}>
          <div style={S.secEye}>CONTACTO</div>
          <h1 style={S.pageH}>Estamos para ayudarte</h1>
          <p style={S.pageP}>Escribinos, llamanos o visitanos. Respondemos en menos de 2 horas.</p>
        </div>
        <div style={S.contactGrid}>
          <div>
            <div style={S.contactInfo}>
              {[["📍","Dirección","Av. Corrientes 1234, Piso 3 Ofic. B, CABA"],["📞","Teléfono","(011) 1234-5678"],["✉️","Email","hola@dentalcare.ar"],["💬","WhatsApp","+54 9 11 1234-5678"],["🕐","Horarios","Lun–Vie 9:00–20:00 · Sáb 9:00–14:00"]].map(([e,l,v])=>(
                <div key={l} style={S.contactItem}>
                  <div style={S.contactItemIcon}>{e}</div>
                  <div><div style={S.contactItemLabel}>{l}</div><div style={S.contactItemValue}>{v}</div></div>
                </div>
              ))}
            </div>
            <div style={S.hoursCard}>
              <div style={S.hoursTitle}>Horarios de atención</div>
              {Object.entries(HOURS).map(([d,h])=>(
                <div key={d} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f5f5f5",fontFamily:"sans-serif",fontSize:13}}>
                  <span style={{color:"#555"}}>{d}</span>
                  <span style={{color:h==="Cerrado"?"#C84040":"#1A5C3A",fontWeight:600}}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={S.contactForm}>
            {contactSent?(
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontSize:48,marginBottom:16}}>✅</div>
                <h3 style={{marginBottom:8}}>¡Mensaje enviado!</h3>
                <p style={{color:"#888",fontFamily:"sans-serif"}}>Te contactamos en menos de 2 horas en horario de atención.</p>
                <button className="btnPrimary" style={{marginTop:20}} onClick={()=>{setContactSent(false);setContactForm({name:"",email:"",phone:"",msg:""});}}>Enviar otro mensaje</button>
              </div>
            ):(
              <>
                <h3 style={{fontSize:20,marginBottom:20}}>Envianos un mensaje</h3>
                {[["Nombre completo","name","text"],["Email","email","email"],["Teléfono","phone","tel"]].map(([l,k,t])=>(
                  <div key={k} style={{marginBottom:14}}>
                    <label style={S.fl}>{l}</label>
                    <input className="inp" type={t} placeholder={l} value={contactForm[k]} onChange={e=>setContactForm(f=>({...f,[k]:e.target.value}))} />
                  </div>
                ))}
                <div style={{marginBottom:20}}>
                  <label style={S.fl}>Mensaje</label>
                  <textarea className="inp" rows={5} placeholder="¿En qué podemos ayudarte?" value={contactForm.msg} onChange={e=>setContactForm(f=>({...f,msg:e.target.value}))} style={{resize:"vertical"}} />
                </div>
                <button className="btnPrimary" style={{width:"100%"}} onClick={submitContact}>ENVIAR MENSAJE →</button>
              </>
            )}
          </div>
        </div>
      </div>
    )}

    {/* ══ TURNOS ════════════════════════════════════════════ */}
    {page==="turnos"&&(
      <div style={S.pageWrap}>
        <div style={S.pageHead}>
          <div style={S.secEye}>TURNOS ONLINE</div>
          <h1 style={S.pageH}>Reservá tu turno</h1>
          <p style={S.pageP}>Elegí el servicio, el profesional y el horario que más te convenga.</p>
        </div>

        {apptDone?(
          <div style={S.apptDone}>
            <div style={S.apptDoneIcon}>✓</div>
            <h2 style={{fontSize:28,marginBottom:8}}>¡Turno confirmado!</h2>
            <div style={S.apptDoneCode}>Código: {apptCode}</div>
            <div style={S.apptDoneDetails}>
              <div>🦷 {selService&&selService.name}</div>
              <div>👩‍⚕️ {selDoctor&&selDoctor.name}</div>
              <div>📅 {selDate} a las {selTime}hs</div>
              <div>💳 {payMethod==="mp"?"Mercado Pago":payMethod==="card"?"Tarjeta":"Efectivo en consultorio"}</div>
            </div>
            <p style={{color:"#888",fontFamily:"sans-serif",fontSize:14,marginBottom:24,textAlign:"center"}}>Te enviamos la confirmación por email y WhatsApp. Recordá traer tu DNI.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
              <button className="btnPrimary" onClick={resetAppt}>Reservar otro turno</button>
              <button className="btnOutline" onClick={()=>go("home")}>Volver al inicio</button>
            </div>
          </div>
        ):(
          <>
            {/* Steps */}
            <div style={S.steps}>
              {[["1","Servicio"],["2","Profesional"],["3","Fecha y hora"],["4","Datos"],["5","Pago"]].map(([n,l],i)=>(
                <div key={n} style={S.step}>
                  <div style={{...S.stepNum,background:apptStep>i+1?"#1A5C3A":apptStep===i+1?"#2BA86A":"#eee",color:apptStep>=i+1?"#fff":"#aaa"}}>{apptStep>i+1?"✓":n}</div>
                  <div style={{...S.stepLabel2,color:apptStep===i+1?"#1A5C3A":"#aaa"}}>{l}</div>
                  {i<4&&<div style={{...S.stepLine,background:apptStep>i+1?"#1A5C3A":"#eee"}}/>}
                </div>
              ))}
            </div>

            {/* STEP 1: SERVICE */}
            {apptStep===1&&(
              <div>
                <h3 style={S.stepTitle}>¿Qué tratamiento necesitás?</h3>
                <div style={S.servGrid}>
                  {SERVICES.map(s=>(
                    <div key={s.id} className="servCard" style={{...S.servCard,border:`2px solid ${selService&&selService.id===s.id?"#2BA86A":"transparent"}`,background:selService&&selService.id===s.id?"#F0FFF8":"#fff"}} onClick={()=>setSelService(s)}>
                      <div style={S.servIcon}>{s.icon}</div>
                      <div style={S.servName}>{s.name}</div>
                      <div style={S.servDesc}>{s.desc}</div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                        <span style={S.servPrice}>{fmt(s.price)}</span>
                        <span style={S.servDur}>⏱ {s.duration}min</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{textAlign:"right",marginTop:20}}>
                  <button className="btnPrimary" style={{opacity:selService?1:.4}} onClick={()=>selService&&setApptStep(2)}>Siguiente →</button>
                </div>
              </div>
            )}

            {/* STEP 2: DOCTOR */}
            {apptStep===2&&(
              <div>
                <h3 style={S.stepTitle}>Elegí tu profesional</h3>
                <div style={S.doctorsGrid}>
                  {DOCTORS.map(d=>(
                    <div key={d.name} className="servCard" style={{...S.doctorCard,cursor:"pointer",border:`2px solid ${selDoctor&&selDoctor.name===d.name?"#2BA86A":"transparent"}`,background:selDoctor&&selDoctor.name===d.name?"#F0FFF8":"#fff"}} onClick={()=>setSelDoctor(d)}>
                      <div style={S.doctorAvatar}>{d.img}</div>
                      <div style={S.doctorName}>{d.name}</div>
                      <div style={S.doctorTitle}>{d.title}</div>
                      <div style={S.doctorExp}>🏆 {d.exp}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                  <button className="btnOutline" onClick={()=>setApptStep(1)}>← Atrás</button>
                  <button className="btnPrimary" style={{opacity:selDoctor?1:.4}} onClick={()=>selDoctor&&setApptStep(3)}>Siguiente →</button>
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME */}
            {apptStep===3&&(
              <div>
                <h3 style={S.stepTitle}>Elegí fecha y horario</h3>
                <div style={S.calGrid}>
                  {/* Calendar */}
                  <div style={S.calWrap}>
                    <div style={S.calHeader}>
                      <button style={S.calNav} onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
                      <span style={{fontWeight:700,fontSize:16}}>{monthNames[calMonth]} {calYear}</span>
                      <button style={S.calNav} onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
                    </div>
                    <div style={S.calDayNames}>
                      {dayNames.map(d=><div key={d} style={S.calDayName}>{d}</div>)}
                    </div>
                    <div style={S.calDays}>
                      {Array(firstDay).fill(null).map((_,i)=><div key={"e"+i}/>)}
                      {Array(daysInMonth).fill(null).map((_,i)=>{
                        const d=i+1;
                        const dateStr=fmtDate(calYear,calMonth,d);
                        const isPast=dateStr<todayStr;
                        const isSunday=new Date(calYear,calMonth,d).getDay()===6;
                        const isSelected=selDate===dateStr;
                        const hasSlots=!isPast&&!isSunday;
                        return(
                          <button key={d} style={{...S.calDay,background:isSelected?"#1A5C3A":hasSlots?"#F0FFF8":"transparent",color:isSelected?"#fff":isPast||isSunday?"#ddd":"#111",border:isSelected?"2px solid #1A5C3A":"2px solid transparent",cursor:hasSlots?"pointer":"default"}}
                            onClick={()=>{if(hasSlots){setSelDate(dateStr);setSelTime(null);}}}>
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Times */}
                  <div style={S.timesWrap}>
                    <div style={{fontWeight:700,marginBottom:16,fontSize:15}}>{selDate?"Horarios disponibles":"Seleccioná una fecha"}</div>
                    {selDate&&(
                      availTimes.length===0?(
                        <div style={{color:"#C84040",fontFamily:"sans-serif",fontSize:13}}>No hay turnos disponibles para este día. Probá otra fecha.</div>
                      ):(
                        <div style={S.timesGrid}>
                          {availTimes.map(t=>(
                            <button key={t} className="timeBtn" style={{...S.timeBtn,background:selTime===t?"#1A5C3A":"#fff",color:selTime===t?"#fff":"#333",border:`1px solid ${selTime===t?"#1A5C3A":"#e0e0e0"}`}} onClick={()=>setSelTime(t)}>{t}</button>
                          ))}
                        </div>
                      )
                    )}
                    {selDate&&bookedTimes.length>0&&(
                      <div style={{marginTop:16,fontSize:12,color:"#888",fontFamily:"sans-serif"}}>⚫ {bookedTimes.length} horario(s) ya ocupado(s) este día</div>
                    )}
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                  <button className="btnOutline" onClick={()=>setApptStep(2)}>← Atrás</button>
                  <button className="btnPrimary" style={{opacity:selDate&&selTime?1:.4}} onClick={()=>selDate&&selTime&&setApptStep(4)}>Siguiente →</button>
                </div>
              </div>
            )}

            {/* STEP 4: PATIENT DATA */}
            {apptStep===4&&(
              <div style={{maxWidth:520}}>
                <h3 style={S.stepTitle}>Tus datos</h3>
                {[["Nombre completo *","name","text"],["Email *","email","email"],["Teléfono / WhatsApp *","phone","tel"],["DNI","dni","text"]].map(([l,k,t])=>(
                  <div key={k} style={{marginBottom:14}}>
                    <label style={S.fl}>{l}</label>
                    <input className="inp" type={t} placeholder={l.replace(" *","")} value={apptForm[k]} onChange={e=>setApptForm(f=>({...f,[k]:e.target.value}))} />
                  </div>
                ))}
                <div style={{marginBottom:20}}>
                  <label style={S.fl}>Notas adicionales (opcional)</label>
                  <textarea className="inp" rows={3} placeholder="Ej: soy alérgico a la penicilina, es mi primera vez..." value={apptForm.notes} onChange={e=>setApptForm(f=>({...f,notes:e.target.value}))} style={{resize:"vertical"}} />
                </div>
                <div style={S.apptSummary}>
                  <div style={S.apptSummaryTitle}>RESUMEN DE TU TURNO</div>
                  <div style={S.apptSummaryRow}><span>Servicio</span><span>{selService&&selService.name}</span></div>
                  <div style={S.apptSummaryRow}><span>Profesional</span><span>{selDoctor&&selDoctor.name}</span></div>
                  <div style={S.apptSummaryRow}><span>Fecha</span><span>{selDate}</span></div>
                  <div style={S.apptSummaryRow}><span>Horario</span><span>{selTime}hs</span></div>
                  <div style={{...S.apptSummaryRow,fontWeight:700,fontSize:16,borderTop:"1px solid #e0e0e0",paddingTop:10,marginTop:4}}><span>Total</span><span style={{color:"#1A5C3A"}}>{selService&&fmt(selService.price)}</span></div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                  <button className="btnOutline" onClick={()=>setApptStep(3)}>← Atrás</button>
                  <button className="btnPrimary" style={{opacity:apptForm.name&&apptForm.email&&apptForm.phone?1:.4}} onClick={()=>apptForm.name&&apptForm.email&&apptForm.phone&&setApptStep(5)}>Ir al pago →</button>
                </div>
              </div>
            )}

            {/* STEP 5: PAYMENT */}
            {apptStep===5&&(
              <div style={{maxWidth:520}}>
                <h3 style={S.stepTitle}>Método de pago</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
                  {[["mp","💚","Mercado Pago","Tarjetas, débito, dinero en cuenta. Hasta 12 cuotas sin interés."],["card","💳","Tarjeta de crédito/débito","Visa, Mastercard, AMEX. Cuotas disponibles."],["cash","🏥","Efectivo en consultorio","Pagás el día del turno al llegar."]].map(([val,e,name,desc])=>(
                    <div key={val} className="payOpt" style={{...S.payOpt,border:`2px solid ${payMethod===val?"#2BA86A":"#e0e0e0"}`,background:payMethod===val?"#F0FFF8":"#fff"}} onClick={()=>setPayMethod(val)}>
                      <span style={{fontSize:24}}>{e}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>{name}</div>
                        <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif"}}>{desc}</div>
                      </div>
                      <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${payMethod===val?"#2BA86A":"#ccc"}`,background:payMethod===val?"#2BA86A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {payMethod===val&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
                {payMethod==="mp"&&(
                  <div style={S.mpBox}>
                    <div style={{fontSize:28,marginBottom:8}}>💚</div>
                    <div style={{fontWeight:700,marginBottom:4}}>Mercado Pago</div>
                    <div style={{fontSize:13,color:"#555",fontFamily:"sans-serif"}}>Al confirmar, serás redirigido a Mercado Pago para completar el pago de forma segura. Aceptamos todas las tarjetas, débito y saldo en cuenta.</div>
                  </div>
                )}
                <div style={S.apptSummary}>
                  <div style={S.apptSummaryTitle}>TOTAL A PAGAR</div>
                  <div style={{...S.apptSummaryRow,fontWeight:700,fontSize:22}}><span>{selService&&selService.name}</span><span style={{color:"#1A5C3A"}}>{selService&&fmt(selService.price)}</span></div>
                  <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif",marginTop:8}}>🔒 Pago 100% seguro · SSL encriptado</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                  <button className="btnOutline" onClick={()=>setApptStep(4)}>← Atrás</button>
                  <button className="btnPrimary" style={{padding:"14px 32px"}} onClick={submitAppt}>CONFIRMAR Y PAGAR →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )}

  </main>

  {/* WHATSAPP BUTTON */}
  <a href="https://wa.me/5491112345678" target="_blank" rel="noreferrer" style={S.waBtn} title="Escribinos por WhatsApp">
    💬
  </a>

  {/* FOOTER */}
  <footer style={S.footer}>
    <div style={S.footerGrid}>
      <div>
        <div style={S.footerLogo}>🦷 DentalCare</div>
        <p style={S.footerDesc}>Odontología de alta complejidad en Buenos Aires. Más de 15 años cuidando sonrisas.</p>
        <div style={{fontSize:13,color:"#888",fontFamily:"sans-serif",lineHeight:2,marginTop:12}}>
          <div>📍 Av. Corrientes 1234, CABA</div>
          <div>📞 (011) 1234-5678</div>
          <div>✉️ hola@dentalcare.ar</div>
        </div>
      </div>
      {[["SERVICIOS",SERVICES.map(s=>s.name)],["NOSOTROS",["El equipo","Tecnología","Instalaciones","Testimonios","Blog"]],["AYUDA",["Cómo llegar","Obras sociales","Financiación","Urgencias","FAQ"]]].map(([t,ls])=>(
        <div key={t}>
          <div style={S.footerSecTitle}>{t}</div>
          {ls.slice(0,6).map(l=><div key={l} style={S.footerLink}>{l}</div>)}
        </div>
      ))}
    </div>
    <div style={S.footerBottom}>
      <span>© 2026 DentalCare · Dra. Valentina Ruiz. Todos los derechos reservados.</span>
      <span>🔒 MP · Visa · Mastercard · AMEX · Obra social</span>
    </div>
  </footer>
</div>
```

);
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
root:{background:”#FAFFFE”,color:”#111”,minHeight:“100vh”,fontFamily:”‘Georgia’,serif”},
toastStack:{position:“fixed”,bottom:24,left:“50%”,transform:“translateX(-50%)”,zIndex:9999,display:“flex”,flexDirection:“column”,gap:8,alignItems:“center”},
toast:{color:”#fff”,padding:“12px 28px”,borderRadius:100,fontSize:13,fontFamily:“sans-serif”,boxShadow:“0 4px 24px rgba(0,0,0,.15)”,whiteSpace:“nowrap”},
header:{position:“sticky”,top:0,zIndex:100,background:“rgba(250,255,254,0.97)”,backdropFilter:“blur(16px)”,borderBottom:“1px solid #E0F0EA”,boxShadow:“0 2px 20px rgba(26,92,58,.06)”},
topBar:{background:”#1A5C3A”,color:”#fff”,display:“flex”,justifyContent:“center”,gap:32,padding:“7px 24px”,fontSize:11,fontFamily:“sans-serif”,flexWrap:“wrap”},
headerInner:{maxWidth:1280,margin:“0 auto”,padding:“0 24px”,height:68,display:“flex”,alignItems:“center”,gap:24},
logo:{background:“none”,border:“none”,cursor:“pointer”,display:“flex”,alignItems:“center”,gap:12,padding:0},
logoIcon:{fontSize:32,background:”#F0FFF8”,width:48,height:48,borderRadius:12,display:“flex”,alignItems:“center”,justifyContent:“center”},
logoName:{fontSize:20,fontWeight:700,letterSpacing:.5,color:”#1A5C3A”},
logoSub:{fontSize:11,color:”#888”,fontFamily:“sans-serif”},
nav:{flex:1,display:“flex”,gap:2},
headerRight:{display:“flex”,gap:10,alignItems:“center”},
phoneBtn:{fontSize:13,color:”#1A5C3A”,fontFamily:“sans-serif”,fontWeight:600,textDecoration:“none”,padding:“8px 12px”,borderRadius:8,background:”#F0FFF8”,border:“1px solid #C8E6D8”},
burger:{background:“none”,border:“none”,fontSize:22,cursor:“pointer”,padding:“8px”,display:“none”},
mobileMenu:{background:”#fff”,borderTop:“1px solid #eee”,padding:“16px 24px”,display:“flex”,flexDirection:“column”,gap:4},
main:{maxWidth:1280,margin:“0 auto”,padding:“0 24px”},
hero:{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:60,alignItems:“center”,padding:“72px 0 60px”},
heroLeft:{},
heroPill:{display:“inline-block”,background:”#F0FFF8”,color:”#1A5C3A”,fontSize:12,fontFamily:“sans-serif”,padding:“6px 16px”,borderRadius:100,border:“1px solid #C8E6D8”,marginBottom:20,fontWeight:600},
heroH:{fontSize:“clamp(40px,5vw,68px)”,fontWeight:900,lineHeight:1.05,letterSpacing:-1.5,margin:“0 0 20px”},
heroAccent:{color:”#2BA86A”,fontStyle:“italic”},
heroP:{fontSize:16,color:”#555”,lineHeight:1.8,marginBottom:32,fontFamily:“sans-serif”,maxWidth:480},
heroStats:{display:“grid”,gridTemplateColumns:“repeat(4,1fr)”,gap:16,marginTop:24,paddingTop:24,borderTop:“1px solid #E0F0EA”},
heroStat:{textAlign:“center”},
heroStatN:{fontSize:22,fontWeight:700,color:”#1A5C3A”},
heroStatL:{fontSize:11,color:”#888”,fontFamily:“sans-serif”},
heroRight:{position:“relative”,display:“flex”,justifyContent:“center”},
heroCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:24,padding:“40px 36px”,textAlign:“center”,boxShadow:“0 20px 60px rgba(26,92,58,.1)”},
heroCardBadge:{background:”#F0FFF8”,color:”#1A5C3A”,fontSize:13,fontFamily:“sans-serif”,padding:“8px 14px”,borderRadius:8,display:“inline-block”},
float1:{position:“absolute”,top:0,right:0,background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:12,padding:“12px 16px”,fontSize:20,textAlign:“center”,boxShadow:“0 8px 24px rgba(0,0,0,.08)”,fontFamily:“sans-serif”},
float2:{position:“absolute”,bottom:20,left:-20,background:”#FFF8F0”,border:“1px solid #FFE0CC”,borderRadius:12,padding:“12px 16px”,fontSize:20,textAlign:“center”,boxShadow:“0 8px 24px rgba(0,0,0,.08)”,fontFamily:“sans-serif”},
section:{padding:“60px 0”},
secHead:{textAlign:“center”,maxWidth:620,margin:“0 auto 40px”},
secEye:{fontSize:11,letterSpacing:4,color:”#2BA86A”,fontFamily:“sans-serif”,fontWeight:700,marginBottom:12},
secH:{fontSize:“clamp(28px,3.5vw,42px)”,fontWeight:900,letterSpacing:-.5,margin:“0 0 12px”},
secP:{fontSize:15,color:”#888”,fontFamily:“sans-serif”,lineHeight:1.7},
servGrid:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(220px,1fr))”,gap:16},
servCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“24px 20px”,cursor:“pointer”,transition:“all .25s”},
servIcon:{fontSize:36,marginBottom:12},
servName:{fontSize:16,fontWeight:700,marginBottom:6},
servDesc:{fontSize:13,color:”#888”,fontFamily:“sans-serif”,lineHeight:1.6,marginBottom:10},
servPrice:{fontSize:18,fontWeight:700,color:”#1A5C3A”},
servDur:{fontSize:12,color:”#aaa”,fontFamily:“sans-serif”},
servRow:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“20px 24px”,display:“flex”,gap:20,alignItems:“flex-start”,transition:“all .25s”},
servRowIcon:{fontSize:36,flexShrink:0,width:56,textAlign:“center”},
servRowName:{fontSize:18,fontWeight:700},
servRowDesc:{fontSize:14,color:”#555”,fontFamily:“sans-serif”,lineHeight:1.6,marginTop:4},
servRowPrice:{fontSize:18,fontWeight:700,color:”#1A5C3A”},
servRowDur:{fontSize:13,color:”#aaa”,fontFamily:“sans-serif”},
whySection:{background:“linear-gradient(135deg,#1A5C3A,#0D3D24)”,margin:“0 -24px”,padding:“64px 24px”,borderRadius:0},
whyGrid:{maxWidth:1280,margin:“0 auto”,display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(280px,1fr))”,gap:20,marginTop:8},
whyCard:{background:“rgba(255,255,255,.06)”,border:“1px solid rgba(255,255,255,.1)”,borderRadius:16,padding:“28px 24px”},
whyIcon:{fontSize:36,marginBottom:12},
whyTitle:{fontSize:17,fontWeight:700,color:”#fff”,marginBottom:8},
whyDesc:{fontSize:13,color:”#A8D5BC”,fontFamily:“sans-serif”,lineHeight:1.7},
testiGrid:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(280px,1fr))”,gap:20},
testiCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“24px”},
testiStars:{color:”#F0C040”,fontSize:16,marginBottom:12},
testiText:{fontSize:14,color:”#444”,fontFamily:“sans-serif”,lineHeight:1.7,marginBottom:16,fontStyle:“italic”},
testiAuthor:{display:“flex”,alignItems:“center”,gap:12},
testiAvatar:{width:44,height:44,borderRadius:“50%”,background:”#F0FFF8”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:24,flexShrink:0},
testiName:{fontWeight:700,fontSize:14},
testiService:{fontSize:12,color:”#2BA86A”,fontFamily:“sans-serif”},
ctaBanner:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:24,padding:“52px 52px”,display:“grid”,gridTemplateColumns:“1fr auto”,gap:40,alignItems:“center”,marginBottom:0},
ctaLeft:{},
ctaH:{fontSize:36,fontWeight:900,marginBottom:10,letterSpacing:-.5},
ctaP:{color:”#555”,fontSize:15,fontFamily:“sans-serif”,lineHeight:1.7,marginBottom:24},
ctaRight:{display:“flex”,flexDirection:“column”,gap:14},
ctaItem:{fontSize:15,color:”#1A5C3A”,fontFamily:“sans-serif”,fontWeight:600},
blogGrid:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(260px,1fr))”,gap:20},
blogCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“24px”,cursor:“pointer”,transition:“all .25s”},
blogEmoji:{fontSize:40,marginBottom:12},
blogCat:{fontSize:10,letterSpacing:3,color:”#2BA86A”,fontFamily:“sans-serif”,fontWeight:700,marginBottom:8},
blogTitle:{fontSize:17,fontWeight:700,marginBottom:10,lineHeight:1.4},
blogExcerpt:{fontSize:13,color:”#888”,fontFamily:“sans-serif”,lineHeight:1.6,marginBottom:12},
blogMeta:{fontSize:11,color:”#bbb”,fontFamily:“sans-serif”},
blogReadMore:{fontSize:13,color:”#2BA86A”,fontFamily:“sans-serif”,fontWeight:600,marginTop:12},
pageWrap:{padding:“40px 0 80px”},
pageHead:{textAlign:“center”,maxWidth:620,margin:“0 auto 48px”},
pageH:{fontSize:“clamp(32px,4vw,52px)”,fontWeight:900,letterSpacing:-.5,margin:“8px 0 12px”},
pageP:{fontSize:15,color:”#888”,fontFamily:“sans-serif”,lineHeight:1.7},
doctorsGrid:{display:“grid”,gridTemplateColumns:“repeat(auto-fill,minmax(280px,1fr))”,gap:24},
doctorCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:20,padding:“32px 24px”,textAlign:“center”},
doctorAvatar:{fontSize:56,width:88,height:88,background:”#F0FFF8”,borderRadius:“50%”,display:“flex”,alignItems:“center”,justifyContent:“center”,margin:“0 auto 16px”},
doctorName:{fontSize:18,fontWeight:700,marginBottom:4},
doctorTitle:{fontSize:13,color:”#2BA86A”,fontFamily:“sans-serif”,marginBottom:10},
doctorExp:{fontSize:12,color:”#888”,fontFamily:“sans-serif”,marginBottom:4},
doctorUni:{fontSize:12,color:”#888”,fontFamily:“sans-serif”,marginBottom:12},
doctorDesc:{fontSize:13,color:”#555”,fontFamily:“sans-serif”,lineHeight:1.6},
galFeatured:{display:“grid”,gridTemplateColumns:“1fr auto”,gap:24},
galMain:{},
galCompare:{display:“flex”,border:“1px solid #E0F0EA”,borderRadius:20,overflow:“hidden”,marginBottom:16,background:”#fff”},
galHalf:{flex:1,padding:“32px”,textAlign:“center”},
galLabel:{display:“inline-block”,fontSize:10,letterSpacing:3,fontFamily:“sans-serif”,fontWeight:700,padding:“4px 12px”,borderRadius:100,background:”#f5f5f5”,color:”#888”,marginBottom:16},
galFace:{fontSize:120},
galInfo:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:12,padding:“16px 20px”},
galTreatment:{fontSize:18,fontWeight:700,color:”#1A5C3A”,marginBottom:4},
galDetail:{fontSize:13,color:”#555”,fontFamily:“sans-serif”},
galThumbs:{display:“flex”,flexDirection:“column”,gap:12,width:140},
galThumb:{background:”#fff”,borderRadius:12,padding:“12px”,cursor:“pointer”,textAlign:“center”,transition:“all .2s”},
postWrap:{maxWidth:680,margin:“0 auto”},
postEmoji:{fontSize:56,marginBottom:16},
postCat:{fontSize:10,letterSpacing:3,color:”#2BA86A”,fontFamily:“sans-serif”,fontWeight:700,marginBottom:12},
postTitle:{fontSize:“clamp(24px,3vw,40px)”,fontWeight:900,letterSpacing:-.5,marginBottom:12,lineHeight:1.2},
postMeta:{fontSize:13,color:”#aaa”,fontFamily:“sans-serif”,marginBottom:28,paddingBottom:24,borderBottom:“1px solid #eee”},
postBody:{fontSize:15,color:”#444”,lineHeight:1.9,fontFamily:“sans-serif”},
postCTA:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:16,padding:“28px”,marginTop:40},
contactGrid:{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:40},
contactInfo:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:20,padding:“24px”,marginBottom:16},
contactItem:{display:“flex”,gap:16,padding:“14px 0”,borderBottom:“1px solid #f5f5f5”,alignItems:“center”},
contactItemIcon:{fontSize:24,width:40,textAlign:“center”,flexShrink:0},
contactItemLabel:{fontSize:10,color:”#aaa”,fontFamily:“sans-serif”,letterSpacing:2,fontWeight:700},
contactItemValue:{fontSize:14,fontFamily:“sans-serif”,color:”#333”,marginTop:2},
hoursCard:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:20,padding:“24px”},
hoursTitle:{fontSize:12,letterSpacing:3,fontFamily:“sans-serif”,fontWeight:700,marginBottom:14,color:”#555”},
contactForm:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:20,padding:“32px”},
steps:{display:“flex”,alignItems:“center”,justifyContent:“center”,gap:0,marginBottom:40,flexWrap:“wrap”,gap:8},
step:{display:“flex”,alignItems:“center”,gap:8},
stepNum:{width:32,height:32,borderRadius:“50%”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:13,fontWeight:700,fontFamily:“sans-serif”,flexShrink:0},
stepLabel2:{fontSize:11,fontFamily:“sans-serif”,fontWeight:600,letterSpacing:1},
stepLine:{height:2,width:32,background:”#eee”},
stepTitle:{fontSize:22,fontWeight:700,marginBottom:24,letterSpacing:-.3},
calGrid:{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:24,marginBottom:8},
calWrap:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“20px”},
calHeader:{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:16,fontFamily:“sans-serif”},
calNav:{background:“none”,border:“1px solid #eee”,cursor:“pointer”,width:32,height:32,borderRadius:8,fontSize:18,display:“flex”,alignItems:“center”,justifyContent:“center”},
calDayNames:{display:“grid”,gridTemplateColumns:“repeat(7,1fr)”,marginBottom:8},
calDayName:{textAlign:“center”,fontSize:11,color:”#aaa”,fontFamily:“sans-serif”,fontWeight:700,padding:“4px 0”},
calDays:{display:“grid”,gridTemplateColumns:“repeat(7,1fr)”,gap:4},
calDay:{aspectRatio:“1”,borderRadius:8,fontSize:13,fontFamily:“sans-serif”,fontWeight:600,display:“flex”,alignItems:“center”,justifyContent:“center”,transition:“all .15s”},
timesWrap:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:16,padding:“20px”},
timesGrid:{display:“grid”,gridTemplateColumns:“repeat(3,1fr)”,gap:8},
timeBtn:{padding:“10px 0”,borderRadius:8,fontSize:13,fontFamily:“sans-serif”,fontWeight:600,cursor:“pointer”,transition:“all .15s”},
apptSummary:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:12,padding:“20px”,marginTop:24},
apptSummaryTitle:{fontSize:10,letterSpacing:3,color:”#2BA86A”,fontFamily:“sans-serif”,fontWeight:700,marginBottom:12},
apptSummaryRow:{display:“flex”,justifyContent:“space-between”,fontSize:14,fontFamily:“sans-serif”,padding:“5px 0”,color:”#444”},
payOpt:{display:“flex”,alignItems:“center”,gap:14,padding:“16px 18px”,borderRadius:12,cursor:“pointer”,transition:“all .2s”},
mpBox:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:12,padding:“20px”,textAlign:“center”,marginBottom:20},
apptDone:{background:”#fff”,border:“1px solid #E0F0EA”,borderRadius:24,padding:“60px 40px”,textAlign:“center”,maxWidth:520,margin:“0 auto”},
apptDoneIcon:{width:80,height:80,borderRadius:“50%”,background:”#1A5C3A”,color:”#fff”,fontSize:36,display:“flex”,alignItems:“center”,justifyContent:“center”,margin:“0 auto 20px”},
apptDoneCode:{background:”#F0FFF8”,border:“1px solid #C8E6D8”,borderRadius:8,padding:“10px 20px”,fontSize:18,fontWeight:700,color:”#1A5C3A”,fontFamily:“sans-serif”,display:“inline-block”,marginBottom:20},
apptDoneDetails:{background:”#f9f9f9”,borderRadius:12,padding:“16px 20px”,textAlign:“left”,fontSize:14,fontFamily:“sans-serif”,color:”#444”,lineHeight:2.2,marginBottom:20},
waBtn:{position:“fixed”,bottom:28,right:28,width:56,height:56,background:”#25D366”,borderRadius:“50%”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:28,boxShadow:“0 4px 20px rgba(37,211,102,.4)”,zIndex:150,textDecoration:“none”,transition:“transform .2s”},
footer:{background:”#0D3D24”,color:”#fff”,padding:“56px 0 0”,marginTop:80},
footerGrid:{maxWidth:1280,margin:“0 auto”,padding:“0 24px 48px”,display:“grid”,gridTemplateColumns:“2fr 1fr 1fr 1fr”,gap:40},
footerLogo:{fontSize:22,fontWeight:700,marginBottom:12},
footerDesc:{color:”#7BC8A4”,fontSize:13,fontFamily:“sans-serif”,lineHeight:1.7},
footerSecTitle:{fontSize:10,letterSpacing:3,color:”#7BC8A4”,fontFamily:“sans-serif”,fontWeight:700,marginBottom:14},
footerLink:{color:”#4A8A6A”,fontSize:13,fontFamily:“sans-serif”,marginBottom:10,cursor:“pointer”},
footerBottom:{borderTop:“1px solid #1A5C3A”,maxWidth:1280,margin:“0 auto”,padding:“20px 24px”,display:“flex”,justifyContent:“space-between”,fontSize:11,color:”#4A6A5A”,fontFamily:“sans-serif”,flexWrap:“wrap”,gap:8},
fl:{fontSize:10,letterSpacing:2,fontFamily:“sans-serif”,color:”#888”,display:“block”,marginBottom:6},
};

const CSS=`
*{box-sizing:border-box;margin:0;padding:0;}

.navBtn{background:none;border:none;cursor:pointer;font-size:13px;color:#555;padding:8px 12px;border-radius:8px;font-family:sans-serif;transition:all .2s;letter-spacing:.3px;}
.navBtn:hover,.navBtnOn{color:#1A5C3A!important;background:#F0FFF8!important;}

.btnPrimary{background:#1A5C3A;color:#fff;border:none;cursor:pointer;border-radius:10px;padding:12px 24px;font-size:12px;font-family:sans-serif;letter-spacing:2px;font-weight:700;transition:all .2s;}
.btnPrimary:hover{background:#2BA86A;transform:translateY(-1px);box-shadow:0 8px 24px rgba(26,92,58,.25);}

.btnOutline{background:transparent;color:#1A5C3A;border:2px solid #1A5C3A;cursor:pointer;border-radius:10px;padding:12px 24px;font-size:12px;font-family:sans-serif;letter-spacing:2px;font-weight:700;transition:all .2s;}
.btnOutline:hover{background:#F0FFF8;}

.heroCTA{padding:15px 36px;font-size:12px;}

.servCard:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(26,92,58,.12);border-color:#2BA86A!important;}
.servRow:hover{box-shadow:0 8px 24px rgba(26,92,58,.08);border-color:#C8E6D8;}

.blogCard:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.08);}

.galThumb:hover{border-color:#2BA86A!important;transform:scale(1.02);}

.inp{width:100%;padding:11px 14px;border:1px solid #E0E0E0;border-radius:10px;font-size:14px;font-family:sans-serif;background:#fff;outline:none;color:#111;transition:border .2s;}
.inp:focus{border-color:#2BA86A;box-shadow:0 0 0 3px rgba(43,168,106,.1);}
.inp::placeholder{color:#bbb;}

.timeBtn{cursor:pointer;transition:all .15s;}
.timeBtn:hover{background:#F0FFF8!important;border-color:#2BA86A!important;}

.payOpt{cursor:pointer;}
.payOpt:hover{border-color:#2BA86A!important;}

.waBtn:hover{transform:scale(1.1);}

.backBtn{background:none;border:none;cursor:pointer;font-size:12px;letter-spacing:2px;color:#888;padding:8px 0;margin-bottom:32px;font-family:sans-serif;display:block;transition:color .2s;}
.backBtn:hover{color:#1A5C3A;}

.mobileNavBtn{background:none;border:none;cursor:pointer;font-size:14px;color:#333;padding:12px 0;text-align:left;font-family:sans-serif;border-bottom:1px solid #f0f0f0;transition:color .2s;}
.mobileNavBtn:hover{color:#1A5C3A;}

.toast{animation:tIn .3s ease;}
@keyframes tIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

.postBody h3{font-size:20px;margin:28px 0 12px;color:#111;}
.postBody p{margin-bottom:16px;}

@media(max-width:900px){
.hero,.contactGrid,.calGrid,.ctaBanner{grid-template-columns:1fr!important;}
.float1,.float2{display:none!important;}
.heroRight{margin-top:32px;}
.footerGrid{grid-template-columns:1fr 1fr!important;}
.nav{display:none!important;}
.burger{display:flex!important;}
.phoneBtn{display:none!important;}
.galFeatured{grid-template-columns:1fr!important;}
.galThumbs{flex-direction:row!important;width:100%!important;}
.ctaRight{display:none!important;}
}
`;