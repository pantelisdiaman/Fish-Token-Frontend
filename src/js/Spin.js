import React, { useState, useEffect } from "react";
import '../css/AllPages.css';
import { Link } from "react-router-dom";

const HomeComponent = () => {

  const [remainingSpins, setRemainingSpins] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // Fetch spins left from the backend
  const fetchSpinsLeft = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://flask-backend-815i.onrender.com/api/get_spins_left', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setRemainingSpins(data.spinsLeft);
      } else {
        console.error('Error fetching spins left:', data.error);
      }
    } catch (error) {
      console.error('Error fetching spins left:', error);
    }
  };

  // Update spin result on the backend
  const updateSpinResult = async (tokensWon) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://flask-backend-815i.onrender.com/api/update_spin_result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ tokensWon }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error updating spin result:', data.error);
      }
    } catch (error) {
      console.error('Error updating spin result:', error);
    }
  };

  useEffect(() => {
    fetchSpinsLeft();
  }, []);

  const spinPointer = () => {
    if (remainingSpins > 0 && !spinning) {
      setSpinning(true);

      const group = document.getElementById("rotating-group");

      // Θέση περιστροφής: το σημείο της γραμμής (x:540, y:800)
      const rotationPoint = { x: 540, y: 950 };

      // Συνολική γωνία περιστροφής: 10 πλήρεις κύκλοι + τυχαία γωνία
      const randomAngle = Math.random() * 360; // Τυχαία γωνία
      const totalAngle = 360 * 10 + randomAngle; // 10 πλήρεις κύκλοι + τυχαία γωνία

      // Ρυθμίσεις περιστροφής για όλα τα στοιχεία
      const transformString = `rotate(${totalAngle}, ${rotationPoint.x}, ${rotationPoint.y})`;

      // Ρυθμίσεις περιστροφής για το group
      group.style.transition = "transform 5s ease-out"; // 5 δευτερόλεπτα animation
      group.setAttribute("transform", transformString);

      // Σταμάτημα στη σωστή τελική θέση
      setTimeout(() => {
        group.style.transition = ""; // Αφαίρεση transition για μελλοντική περιστροφή
        group.setAttribute("transform", `rotate(${randomAngle}, ${rotationPoint.x}, ${rotationPoint.y})`);
      }, 5000); // Ίδιος χρόνος με το transition

      // Update spin result and inform the user
      setTimeout(async () => {
        const prize = calculatePrize(randomAngle);

        if (prize === 0) {
          alert(`Sorry, you did not win!`);
        } else {
          alert(`Congrats! You won ${prize} $LFISH tokens!`);
        }

        group.setAttribute("transform", "");
        setRemainingSpins((prev) => prev - 1);
        await updateSpinResult(prize); // Update the backend
        setSpinning(false);
      }, 6000);
    } else if (spinning) {
      return;
    } else {
      alert("No spins left for today! Come back tomorrow.");
    }
  };

  // Συνάρτηση για τον υπολογισμό του επάθλου
  const calculatePrize = (angle) => {
    // Κανονικοποίηση της γωνίας μεταξύ 0 και 360
    const normalizedAngle = angle % 360;

    // Ορισμός των τμημάτων του τροχού
    if (normalizedAngle <= 15 || normalizedAngle > 345) return 100;
    if (normalizedAngle > 15 && normalizedAngle <= 45) return 200;
    if (normalizedAngle > 45 && normalizedAngle <= 75) return 300;
    if (normalizedAngle > 75 && normalizedAngle <= 105) return 400;
    if (normalizedAngle > 105 && normalizedAngle <= 135) return 200;
    if (normalizedAngle > 135 && normalizedAngle <= 165) return 200;
    if (normalizedAngle > 165 && normalizedAngle <= 195) return 100;
    if (normalizedAngle > 195 && normalizedAngle <= 225) return 0; // FAIL
    if (normalizedAngle > 225 && normalizedAngle <= 255) return 150;
    if (normalizedAngle > 255 && normalizedAngle <= 285) return 100;
    if (normalizedAngle > 285 && normalizedAngle <= 315) return 120;
    if (normalizedAngle > 315 && normalizedAngle <= 345) return 150;

    return 0; // Default fallback
  };

  return (
  <div className="svg-container">
  <svg className="responsive-svg" preserveAspectRatio="none" width={1080} height={2212} viewBox="0 0 1080 2212">
    <defs>
      <style>
        {
          ".a,.b{fill:#013993;}.b,.d{clip-rule:evenodd;}.c,.d,.g,.nt,.nx,.oa,.oc,.oe,.pj{fill:none;}.e{fill:url(#a);}.dp,.f{fill:#42bef4;}.g,.i{stroke:#707070;}.h{fill:#50dbff;}.by,.dn,.i,.oi,.ou,.pk,.qy,.ra,.rb{fill:#fff;}.j{clip-path:url(#qg);}.k{fill:url(#c);}.l{opacity:0.58;}.m{clip-path:url(#d);}.n{clip-path:url(#e);}.bh,.o{opacity:0.76;}.dc,.dk,.dy,.et,.jl,.jq,.o,.qf,.u{mix-blend-mode:multiply;}.ae,.bh,.cv,.cy,.dc,.dh,.dk,.dy,.ef,.em,.et,.jl,.jq,.ma,.me,.o,.qf,.ri,.u{isolation:isolate;}.p{clip-path:url(#g);}.q{fill:#00004d;}.r{clip-path:url(#h);}.s{clip-path:url(#i);}.t{fill:url(#j);}.em,.ex,.me,.u{opacity:0.5;}.v{clip-path:url(#l);}.w,.z{fill:#9f1010;}.ax,.by,.dn,.dp,.ee,.nt,.of,.w{fill-rule:evenodd;}.x{clip-path:url(#m);}.y{clip-path:url(#n);}.aa{clip-path:url(#o);}.ab{clip-path:url(#p);}.ac{clip-path:url(#q);}.ad,.ax{fill:#7a369e;}.ae,.me{mix-blend-mode:color-dodge;}.af{clip-path:url(#r);}.ag{fill:#c9bc57;}.ah{clip-path:url(#s);}.ai{clip-path:url(#t);}.aj{clip-path:url(#u);}.ak{clip-path:url(#v);}.al{clip-path:url(#w);}.am{clip-path:url(#x);}.an{clip-path:url(#y);}.ao{clip-path:url(#z);}.ap{clip-path:url(#aa);}.aq{clip-path:url(#ab);}.ar{clip-path:url(#ac);}.as{clip-path:url(#ad);}.at{clip-path:url(#ae);}.au{clip-path:url(#af);}.av{clip-path:url(#ag);}.aw{clip-path:url(#ah);}.ay{clip-path:url(#ai);}.az{clip-path:url(#aj);}.ba{clip-path:url(#ak);}.bb{clip-path:url(#al);}.bc{clip-path:url(#am);}.bd{clip-path:url(#an);}.be{clip-path:url(#ao);}.bf{clip-path:url(#ap);}.bg{clip-path:url(#aq);}.bh,.ef,.em,.ma{mix-blend-mode:screen;}.bi{clip-path:url(#ar);}.bj{clip-path:url(#as);}.bk{fill:url(#at);}.bl{clip-path:url(#au);}.bm{clip-path:url(#av);}.bn{fill:url(#aw);}.bo{clip-path:url(#ax);}.bp{clip-path:url(#ay);}.bq{fill:url(#az);}.br{clip-path:url(#ba);}.bs{clip-path:url(#bb);}.bt{clip-path:url(#bc);}.bu{fill:url(#bd);}.bv{clip-path:url(#be);}.bw{clip-path:url(#bf);}.bx{fill:url(#bg);}.bz{clip-path:url(#bh);}.ca{clip-path:url(#bi);}.cb{clip-path:url(#bj);}.cc{fill:#80001b;}.cd{clip-path:url(#bk);}.ce{clip-path:url(#bl);}.cf{fill:url(#bm);}.cg{clip-path:url(#bo);}.ch{clip-path:url(#bp);}.ci{fill:url(#bq);}.cj{clip-path:url(#bs);}.ck{clip-path:url(#bt);}.cl{fill:url(#bu);}.cm{clip-path:url(#bw);}.cn{clip-path:url(#bx);}.co{fill:url(#by);}.cp{clip-path:url(#ca);}.cq{clip-path:url(#cb);}.cr{fill:url(#cc);}.cs{clip-path:url(#ce);}.ct{clip-path:url(#cf);}.cu{fill:url(#cg);}.cv{opacity:0.89;mix-blend-mode:overlay;}.cw{clip-path:url(#cj);}.cx{fill:url(#ck);}.cy,.dc{opacity:0.77;}.cy{mix-blend-mode:hue;}.cz{clip-path:url(#cl);}.da{clip-path:url(#cm);}.db{fill:url(#cn);}.dd{clip-path:url(#cr);}.de{clip-path:url(#cs);}.df{fill:url(#ct);}.dg{clip-path:url(#cu);}.dh{mix-blend-mode:soft-light;}.di{clip-path:url(#cv);}.dj{clip-path:url(#cw);}.dl{clip-path:url(#cx);}.dm{clip-path:url(#cy);}.dn{opacity:0.25;}.do{clip-path:url(#cz);}.dp{opacity:0.61;}.dq{clip-path:url(#da);}.dr{clip-path:url(#db);}.ds{fill:url(#dc);}.dt{clip-path:url(#dd);}.du{fill:url(#de);}.dv{clip-path:url(#dg);}.dw{clip-path:url(#dh);}.dx{fill:url(#di);}.dy{opacity:0.7;}.dz{clip-path:url(#dj);}.ea{clip-path:url(#dk);}.eb{fill:url(#dl);}.ec,.et{opacity:0.2;}.ed{clip-path:url(#dm);}.ee{fill:#86feff;}.ef{opacity:0.3;}.eg{clip-path:url(#dn);}.eh{clip-path:url(#do);}.ei{fill:url(#dp);}.ej{clip-path:url(#dq);}.ek{clip-path:url(#dr);}.el{fill:url(#ds);}.en{clip-path:url(#dt);}.eo{clip-path:url(#du);}.ep{fill:url(#dv);}.eq{clip-path:url(#dw);}.er{clip-path:url(#dx);}.es{fill:url(#dy);}.eu{clip-path:url(#dz);}.ev{clip-path:url(#ea);}.ew{fill:url(#eb);}.ey{clip-path:url(#ec);}.ez{clip-path:url(#ed);}.fa{fill:url(#ee);}.fb{clip-path:url(#ef);}.fc{clip-path:url(#eg);}.fd{fill:url(#eh);}.fe{clip-path:url(#ei);}.ff{clip-path:url(#ej);}.fg{fill:url(#ek);}.fh{clip-path:url(#el);}.fi{clip-path:url(#em);}.fj{fill:url(#en);}.fk{clip-path:url(#eo);}.fl{clip-path:url(#ep);}.fm{fill:url(#eq);}.fn{clip-path:url(#er);}.fo{clip-path:url(#es);}.fp{fill:url(#et);}.fq{clip-path:url(#eu);}.fr{fill:url(#ev);}.fs{clip-path:url(#ew);}.ft{fill:url(#ex);}.fu{clip-path:url(#ey);}.fv{fill:url(#ez);}.fw{clip-path:url(#fb);}.fx{clip-path:url(#fc);}.fy{fill:url(#fd);}.fz{clip-path:url(#fe);}.ga{clip-path:url(#ff);}.gb{fill:url(#fg);}.gc{clip-path:url(#fh);}.gd{clip-path:url(#fi);}.ge{fill:url(#fj);}.gf{clip-path:url(#fk);}.gg{clip-path:url(#fl);}.gh{fill:url(#fm);}.gi{clip-path:url(#fn);}.gj{clip-path:url(#fo);}.gk{fill:url(#fp);}.gl{clip-path:url(#fq);}.gm{clip-path:url(#fr);}.gn{clip-path:url(#fs);}.go{fill:url(#ft);}.gp{clip-path:url(#fu);}.gq{clip-path:url(#fv);}.gr{fill:url(#fw);}.gs{clip-path:url(#fx);}.gt{clip-path:url(#fy);}.gu{fill:url(#fz);}.gv{opacity:0.58;}.gw{clip-path:url(#ga);}.gx{clip-path:url(#gb);}.gy{fill:url(#gc);}.gz{clip-path:url(#gd);}.ha{fill:url(#ge);}.hb{clip-path:url(#gf);}.hc{fill:url(#gg);}.hd{clip-path:url(#gi);}.he{clip-path:url(#gj);}.hf{fill:url(#gk);}.hg{clip-path:url(#gl);}.hh{clip-path:url(#gm);}.hi{fill:url(#gn);}.hj{clip-path:url(#go);}.hk{fill:url(#gp);}.hl{clip-path:url(#gq);}.hm{fill:url(#gr);}.hn{clip-path:url(#gs);}.ho{fill:url(#gt);}.hp{clip-path:url(#gu);}.hq{fill:url(#gv);}.hr{clip-path:url(#gx);}.hs{clip-path:url(#gy);}.ht{fill:url(#gz);}.hu{clip-path:url(#ha);}.hv{clip-path:url(#hb);}.hw{fill:url(#hc);}.hx{clip-path:url(#hd);}.hy{clip-path:url(#he);}.hz{fill:url(#hf);}.ia{clip-path:url(#hg);}.ib{clip-path:url(#hh);}.ic{clip-path:url(#hi);}.id{fill:url(#hj);}.ie{clip-path:url(#hk);}.if{clip-path:url(#hl);}.ig{fill:url(#hm);}.ih{clip-path:url(#hn);}.ii{clip-path:url(#ho);}.ij{fill:url(#hp);}.ik{clip-path:url(#hq);}.il{clip-path:url(#hr);}.im{fill:url(#hs);}.in{clip-path:url(#ht);}.io{clip-path:url(#hu);}.ip{fill:url(#hv);}.iq{clip-path:url(#hw);}.ir{clip-path:url(#hx);}.is{fill:url(#hy);}.it{clip-path:url(#hz);}.iu{clip-path:url(#ia);}.iv{fill:url(#ib);}.iw{clip-path:url(#ic);}.ix{fill:url(#id);}.iy{clip-path:url(#ie);}.iz{fill:url(#if);}.ja{clip-path:url(#ig);}.jb{fill:url(#ih);}.jc{clip-path:url(#ii);}.jd{clip-path:url(#ij);}.je{fill:url(#ik);}.jf{clip-path:url(#il);}.jg{fill:url(#im);}.jh{clip-path:url(#in);}.ji{fill:url(#io);}.jj{clip-path:url(#ip);}.jk{fill:url(#iq);}.jl{opacity:0.4;}.jm{clip-path:url(#is);}.jn{fill:#7a7772;}.jo{clip-path:url(#it);}.jp{fill:url(#iu);}.jq{opacity:0.8;}.jr{clip-path:url(#iw);}.js{fill:#988aa1;}.jt{clip-path:url(#ix);}.ju{fill:url(#iy);}.jv{clip-path:url(#ja);}.jw{clip-path:url(#jb);}.jx{fill:url(#jc);}.jy{clip-path:url(#jd);}.jz{fill:url(#je);}.ka{clip-path:url(#jf);}.kb{fill:url(#jg);}.kc{clip-path:url(#ji);}.kd{clip-path:url(#jj);}.ke{clip-path:url(#jk);}.kf{fill:url(#jl);}.kg{clip-path:url(#jn);}.kh{clip-path:url(#jo);}.ki{clip-path:url(#jp);}.kj{clip-path:url(#jq);}.kk{clip-path:url(#jr);}.kl{clip-path:url(#js);}.km{clip-path:url(#jt);}.kn{clip-path:url(#ju);}.ko{fill:#9aa45b;}.kp{clip-path:url(#jv);}.kq{fill:#91bf53;}.kr{clip-path:url(#jw);}.ks{clip-path:url(#jx);}.kt{fill:url(#jy);}.ku{clip-path:url(#jz);}.kv{fill:url(#ka);}.kw{clip-path:url(#kc);}.kx{clip-path:url(#kd);}.ky{fill:url(#ke);}.kz{clip-path:url(#kf);}.la{clip-path:url(#kg);}.lb{fill:url(#kh);}.lc{fill:#c570ff;}.ld{clip-path:url(#ki);}.le{fill:url(#kj);}.lf{clip-path:url(#kl);}.lg{clip-path:url(#km);}.lh{fill:url(#kn);}.li{clip-path:url(#ko);}.lj{clip-path:url(#kp);}.lk{fill:url(#kq);}.ll{clip-path:url(#kr);}.lm{fill:url(#ks);}.ln{clip-path:url(#ku);}.lo{clip-path:url(#kv);}.lp{fill:url(#kw);}.lq{clip-path:url(#kx);}.lr{clip-path:url(#ky);}.ls{fill:url(#kz);}.lt{clip-path:url(#la);}.lu{fill:url(#lb);}.lv{clip-path:url(#ld);}.lw{clip-path:url(#le);}.lx{fill:url(#lf);}.ly{clip-path:url(#lg);}.lz{clip-path:url(#lh);}.mb{clip-path:url(#li);}.mc{clip-path:url(#lj);}.md{fill:url(#lk);}.mf{clip-path:url(#ll);}.mg{clip-path:url(#lm);}.mh{fill:url(#ln);}.mi{clip-path:url(#lo);}.mj{clip-path:url(#lp);}.mk{fill:url(#lq);}.ml{clip-path:url(#lr);}.mm{clip-path:url(#ls);}.mn{fill:url(#lt);}.mo{clip-path:url(#lu);}.mp{clip-path:url(#lv);}.mq{fill:url(#lw);}.mr{clip-path:url(#lx);}.ms{clip-path:url(#ly);}.mt{fill:url(#lz);}.mu{clip-path:url(#ma);}.mv{clip-path:url(#mb);}.mw{fill:url(#mc);}.mx{clip-path:url(#md);}.my{clip-path:url(#me);}.mz{fill:url(#mf);}.na{clip-path:url(#mg);}.nb{clip-path:url(#mh);}.nc{fill:url(#mi);}.nd{clip-path:url(#mj);}.ne{clip-path:url(#mk);}.nf{fill:url(#ml);}.ng{clip-path:url(#mm);}.nh{clip-path:url(#mn);}.ni{fill:url(#mo);}.nj{clip-path:url(#mp);}.nk{clip-path:url(#mq);}.nl{fill:url(#mr);}.nm{clip-path:url(#ms);}.nn{clip-path:url(#mt);}.no{fill:url(#mu);}.np{clip-path:url(#mv);}.nq{clip-path:url(#mw);}.nr{fill:url(#mx);}.ns{fill:url(#my);}.nu,.ql{opacity:0.59;}.nu{fill:url(#mz);}.nv{fill:url(#na);}.nw{fill:url(#nb);}.nx,.po{stroke:#04105b;}.nx{stroke-width:15px;}.ny{fill:#888;}.nz{fill:#3bb54a;}.oa{stroke:#004d18;}.oa,.oc{stroke-width:3px;}.ob{fill:#aed477;}.oc{stroke:#008529;}.od{fill:url(#ne);}.oe{stroke:#68402a;stroke-width:4px;stroke-dasharray:8 8;}.oe,.pa{stroke-linecap:round;stroke-linejoin:round;}.of{fill:url(#nf);}.og{fill:url(#ng);}.oh{opacity:0.44;fill:url(#nh);}.oi{font-size:40px;}.oi,.pk,.pq,.qo,.qy,.ra,.rb,.rh{font-family:MADETOMMY-ExtraBold, MADE TOMMY;}.oj,.ph,.rh{fill:#04105b;}.ok{fill:#89c763;}.ol{fill:#025e2d;}.om{fill:#f5b445;}.on{fill:#ffcb5b;}.oo{fill:#ab6c00;}.op{fill:#f6b545;}.oq{fill:#ffe27a;}.or{fill:#b0c4d9;}.os{fill:#d5e3ef;}.ot{fill:#485f77;}.ov{fill:#c9d5e3;}.ow{fill:#0b3a5b;}.ox{fill:#ffbe1b;}.oy{fill:#613d00;}.oz{fill:#fff347;}.pa,.pb{fill:#3173e7;}.pc{fill:#e7f5fd;}.pd{fill:#5eadef;}.pe{fill:#76b9f1;}.pf{fill:#a0cef6;}.pg{opacity:0.55;}.pg,.pp{fill:url(#nt);}.pi{fill:url(#nw);}.pj{stroke:#fff;stroke-width:7px;}.pk{font-size:52px;}.pl{opacity:0.6;}.pm{fill:url(#oe);}.pn{fill:url(#og);}.po{stroke-width:10px;fill:url(#ou);}.pq{fill:#153d77;}.pq,.ra{font-size:80px;}.pr{clip-path:url(#oy);}.ps{clip-path:url(#oz);}.pt{fill:url(#pa);}.pu{clip-path:url(#pb);}.pv{fill:url(#pc);}.pw{clip-path:url(#pd);}.px{fill:url(#pe);}.py{clip-path:url(#pf);}.pz{clip-path:url(#pg);}.qa{clip-path:url(#ph);}.qb{clip-path:url(#pi);}.qc{clip-path:url(#pj);}.qd{clip-path:url(#pk);}.qe{clip-path:url(#pl);}.qf{opacity:0.23;}.qg{clip-path:url(#pm);}.qh{clip-path:url(#pn);}.qi{fill:url(#po);}.qj{clip-path:url(#pp);}.qk{fill:url(#pq);}.ql{clip-path:url(#pr);}.qm{fill:#10249f;}.qn{fill:#ff8ef7;}.qo,.qy{font-size:37px;}.qp{fill:#8efff3;}.qq{fill:#ffff8e;}.qr{fill:#ff8e8e;}.qs{fill:#92ff8e;}.qt{fill:#efefef;}.qu{fill:#b38eff;}.qv{fill:#8ec3ff;}.qw{fill:#ffb055;}.qx{fill:#ff6060;}.qz{fill:url(#pu);}.rb{font-size:47px;}.rc{fill:#7af1ff;}.rd{fill:#5bcdff;}.re{fill:#5bd8ff;}.rf{fill:#0153e1;}.rg{fill:#459ef6;}.rh{font-size:70px;}.ri{clip-path:url(#qe);}.rj,.rk{stroke:none;}.rk{fill:#04105b;}.rl{fill:url(#b);}.rm{filter:url(#qc);}.rn{filter:url(#qa);}.ro{filter:url(#py);}.rp{filter:url(#pv);}.rq{filter:url(#ow);}.rr{filter:url(#oc);}.rs{filter:url(#oa);}.rt{filter:url(#nx);}.ru{filter:url(#nr);}.rv{filter:url(#np);}.rw{filter:url(#nn);}.rx{filter:url(#nl);}.ry{filter:url(#nc);}"
        }
      </style>
      <linearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#013fa4" />
        <stop offset={1} stopColor="#60cfff" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#5aebfe" />
        <stop offset={0.531} stopColor="#00348f" />
        <stop offset={1} stopColor="#03227c" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#54d6ed" stopOpacity={0} />
        <stop offset={1} stopColor="#81ecfb" />
      </linearGradient>
      <clipPath id="d">
        <rect className="a" width={1452.817} height={814.57} />
      </clipPath>
      <clipPath id="e">
        <rect className="a" width={1452.817} height={882.493} />
      </clipPath>
      <clipPath id="g">
        <path
          className="b"
          d="M26.014,253.263C251.55,160.69,378.629,358.179,352.3,358.179s-40.071,27.155-40.071,27.155l-6.867,27.155s29.765,27.155,51.517,22.219,20.608,12.342,20.608,12.342l-5.724,11.109s6.143,20.9,64.11,23.452,95.023-27.155,97.314-12.345,92.731,25.922,146.539-1.233,23.7-100.444,4.41-108.235,10.475-83.084,127.249-79.381S937.316,340.9,933.881,344.6s-33.2,11.109-33.2,34.561,25.189,43.2,59.534,7.406,28.621-109.854-5.726-156.757-61.821-39.5-53.808-54.309,37.782-56.78,111.051-50.609,82.43,33.328,89.3,29.625-14.882-82.7-41.215-104.918,178.6-69.12,203.784-40.732,10.3,154.289,18.317,154.289,26.332-13.577,38.926-14.81-18.317,45.668-18.317,45.668,72.125-19.748,82.427-12.342,5.726,32.091,5.726,32.091-74.417,92.574-70.982,93.809,29.767-6.171,32.056-2.468,3.435,40.732,3.435,40.732l93.877-13.577,3.753,300.017s73.524,169.711-150.292,234.748c-189.01,54.923-670.457,6.582-769.341,9.967-87.2,2.985-347.7,22.011-440.544-59.8C-44.077,696.712,0,458.507,0,458.507Z"
          transform="translate(6.774 0)"
        />
      </clipPath>
      <clipPath id="h">
        <rect className="c" width={472.912} height={286.986} />
      </clipPath>
      <clipPath id="i">
        <path
          className="c"
          d="M195.62,214.545s15.7-20.941,25.695-23.792l8.093,6.179a11.667,11.667,0,0,1,.587,1.481c1.075,3.286,2.7,11.756-3.929,22.785,0,0-15.7-3.326-27.119.476a19.454,19.454,0,0,0-3.327-7.129m-42.078-103.1c1.007-.753,1.622-1.116,1.622-1.116,5.718,2.849,13.324,2.375,13.324,2.375s-4.754,17.125.948,22.367a39.882,39.882,0,0,1,3.86,4.067c5.591,6.7,11.854,18.273,8.037,33.525-4.752,19.04-27.6,20.941-27.6,20.941a12.183,12.183,0,0,1-3.648-1.272c-6.85-3.509-12.051-12.525-12.051-12.525s9.982-3.817,16.175-4.292,6.669-10.945,8.093-17.125-12.845-19.99-15.712-19.99c-2.851,0-10.947,3.8-10.947,3.8a46.045,46.045,0,0,1,17.894-30.755m35.41-32.529v-.027c.029-.252.308-2.141,4.292-5.689,3.718-3.316,5.285-17.461,5.634-21.056.041-.531.07-.837.07-.837l11.421.476s2.853,1.425,2.377,10.945S201.084,83.669,196.57,83.669c-5.242,0-7.619-4.752-7.619-4.752M115.2,3.722c-.474,6.192-1.915,17.139-4.768,18.087s-6.179-6.667-10.946-9.044c-4.752-2.375-11.895-1.427-19.99,3.8-8.08,5.24-9.03,26.169-8.556,32.361s22.369,15.7,34.738,25.22,8.556,29.984,8.556,29.984c-4.752,16.649-15.222,21.893-17.123,21.893s-14.631-12.3-22.843-15.706c-9.165-3.8-9.945-13.314-10.946-17.607C59.986,78.437,60.942,70.347,51.9,68.446s-30.46,9.044-30.46,14.748,9.52,13.322,7.619,15.224c-.041.041-.1.082-.168.139C26.106,100.57,4.34,105.435.62,114.719c-3.8,9.52,10.708,25.581,20.7,23.206,9.98-2.377,19.151-3.8,23.905-1.9s-5.7,15.224-8.082,24.744,14.274,14.274,19.5,13.8,17.613-19.99,20.941-20.466,10.946,1.44,11.9,13.811,26.657,37.115,27.133,42.344-10.47,11.421-12.845,11.421c-2.391,0-3.341-13.322-1.44-21.4s-22.843-7.143-29.022-7.143-6.667,17.123-6.667,17.123-11.9-18.55-23.32-19.977S21.436,202.65,20.012,208.828s13.322,20.466,14.746,21.417-6.653,4.29-11.9,9.518c-5.226,5.244,2.391,15.714,8.569,18.565,6.194,2.851,19.516-.95,23.32-2.851,3.8-1.916,14.748,1.9,23.316,2.851s19.992,5.7,34.74-5.718,38.554-14.748,39.5-12.847c.365.742-1.479,1.189-4.319,2.127a35.578,35.578,0,0,0-10.4,5.144,24.561,24.561,0,0,0-5.745,6.052c-7.619,11.421,31.411,29.036,35.215,29.036s12.845-10,23.792-11.423,11.9,9.52,15.24,11.9c2.094,1.5,15.306,4.18,26.378,4.375,6.471.127,12.2-.615,14.537-2.949a12.818,12.818,0,0,0,1.608-2c4.221-6.36,4.74-17.434,6.011-20.845,1.427-3.8,16.663-7.143,29.036,0s35.689,6.671,40.917,1.427c5.242-5.228,7.621-23.792,6.669-28.072s-18.564-5.716-18.564-5.716.95-5.23,6.192-11.9,3.8-10.47,1.425-15.7c-2.375-5.244-19.04-8.569-23.792-7.143-3.214.964-8.794,5.591-12.092,8.513-1.606,1.411-2.672,2.432-2.672,2.432s-3.8-.476,2.867-10.945a20.073,20.073,0,0,1,4.487-4.908c7.592-6.068,18.761-7.479,22.635-11.743a12.422,12.422,0,0,1,5.256-3.285,28.193,28.193,0,0,1,12.358-1.007c2.853.476,3.8,6.669,3.8,11.9s13.8,16.188,18.564,23.794c4.752,7.617,17.125,32.836,19.977,36.653s10.47,11.9,29.036,6.179c18.564-5.7,19.99-17.6,19.99-17.6l-6.669-13.335s7.143-7.607,10-11.423-6.655-17.123-10.947-19.977-26.169.476-26.169.476c-7.619-5.718-4.292-15.712-4.292-15.712,6.192,1.425,27.609-9.52,34.278-12.849,6.653-3.327,16.649-19.514,16.649-19.514a31.554,31.554,0,0,0,4.18,4.026l.041.043c6.639,5.519,17.572,11.825,24.338,10.693,8.556-1.427,11.895-23.318,10.47-28.083s-13.811-14.75-18.089-15.7-9.994-11.421-9.994-13.8,6.807-8.583,8.569-16.187c1.425-6.181-9.046-18.091-14.288-19.516-2.978-.812-9.506.529-15.279,2.461-4.364,1.452-8.3,3.242-9.939,4.682-3.817,3.327-4.756,19.977-4.756,23.318s-.012,14.567-4.764,22.367c-6.655,10.946-11.9,11.9-22.369,13.8-9.379,1.7-23.316.95-30.445-.95-7.145-1.9-11.423-27.119-10.472-30.937s20.466-12.373,31.411-19.026S405,47.5,403.578,40.837s-17.125-26.645-22.367-27.121-14.748,7.145-14.748,11.423-10,13.32-15.7,13.32c-.8,0-1.663-.654-2.559-1.815-2.418-3.089-.347-7.484-2.681-14.362-3.033-8.932-1.2-7.7-1.9-10.468-1.427-5.72-24.82-10.73-31.885,4.044-2.619,5.474,9.824,34.906,9.348,38.107v.014A33.041,33.041,0,0,1,316.5,66.069c-2.391,3.327-4.292-.964-6.192-4.766s-8.093-11.9-17.139-10.946A15.054,15.054,0,0,0,286.6,53c-7.073,4.668-13.63,14.286-14.358,19.725-.95,7.143,9.032,19.99,14.276,26.659,5.226,6.653,13.8,11.421,15.222,18.55a17.29,17.29,0,0,1,.349,2.74v.014c.279,5.228-2.627,8.039-10.82,12.959-9.522,5.7-22.367,16.649-28.072,23.32-5.716,6.653-8.093.474-8.093-5.244,0-5.7-23.792-8.569-28.072-9.994s-.964-12.847-.964-15.7,18.089-1.9,25.234-2.853c7.129-.95,16.649-23.318,15.222-30.935-1.4-7.494-16.147-12.666-18.005-12.847h-.082c-1.429,0,12.859-20.466,15.71-30.462s1.427-32.838-6.192-41.881c-4.99-5.943-18.606-5.929-28.573-4.809-5.228.585-4.221,1.468-5.689,1.955-4.208,1.4-5.41,12.834-5.244,13.31l.014.014C207.991,18,196.1,8.476,196.1,8.476c-3.817-3.8-14.274-3.8-19.516,3.813-4.432,6.446-1.692,20.745-.755,24.969.168.769.281,1.2.281,1.2a31,31,0,0,0-8.585.868.439.439,0,0,0-.141.027,33.879,33.879,0,0,0-4.262,1.259l-.084.041c-1.579.644-2.627,1.37-2.627,2.084,0,2.153-.771,14.664-4.727,20.285,0,.012-.014.012-.014.012a8,8,0,0,1-1.454,1.594,2.554,2.554,0,0,1-2.348.476c-4.922-1.075-12.344-12.611-14.873-17.795a1.911,1.911,0,0,1-.113-.254,8.409,8.409,0,0,1-.755-1.928c-.476-2.865,8.093-10.47,10.947-15.238,2.867-4.752,2.867-20.451-.476-25.219C144.687,1.948,134.8,0,126.629,0,120.542,0,115.4,1.079,115.2,3.722"
          transform="translate(0)"
        />
      </clipPath>
      <linearGradient
        id="j"
        x1={0.007}
        y1={1}
        x2={0.011}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#d80068" />
        <stop offset={0.035} stopColor="#da0266" />
        <stop offset={0.358} stopColor="#ee165d" />
        <stop offset={0.681} stopColor="#fa2257" />
        <stop offset={1} stopColor="#ff2756" />
      </linearGradient>
      <clipPath id="l">
        <rect className="c" width={83.316} height={113.546} />
      </clipPath>
      <clipPath id="m">
        <rect className="c" width={117.236} height={173.465} />
      </clipPath>
      <clipPath id="n">
        <rect className="c" width={89.488} height={76.038} />
      </clipPath>
      <clipPath id="o">
        <rect className="c" width={246.873} height={219.062} />
      </clipPath>
      <clipPath id="p">
        <rect className="c" width={36.788} height={77.73} />
      </clipPath>
      <clipPath id="q">
        <rect className="c" width={36.806} height={30.607} />
      </clipPath>
      <clipPath id="r">
        <rect className="c" width={41.938} height={42.241} />
      </clipPath>
      <clipPath id="s">
        <rect className="c" width={46.807} height={33.015} />
      </clipPath>
      <clipPath id="t">
        <rect className="c" width={27.603} height={28.049} />
      </clipPath>
      <clipPath id="u">
        <rect className="c" width={30.047} height={19.928} />
      </clipPath>
      <clipPath id="v">
        <rect className="c" width={28.635} height={10.119} />
      </clipPath>
      <clipPath id="w">
        <rect className="c" width={39.957} height={36.752} />
      </clipPath>
      <clipPath id="x">
        <rect className="c" width={29.295} height={26.423} />
      </clipPath>
      <clipPath id="y">
        <rect className="c" width={31.103} height={19.976} />
      </clipPath>
      <clipPath id="z">
        <rect className="c" width={29.231} height={26.873} />
      </clipPath>
      <clipPath id="aa">
        <rect className="c" width={21.442} height={33.121} />
      </clipPath>
      <clipPath id="ab">
        <rect className="c" width={22.701} height={26.941} />
      </clipPath>
      <clipPath id="ac">
        <rect className="c" width={32.476} height={16.106} />
      </clipPath>
      <clipPath id="ad">
        <rect className="c" width={38.778} height={69.264} />
      </clipPath>
      <clipPath id="ae">
        <rect className="c" width={40.06} height={57.715} />
      </clipPath>
      <clipPath id="af">
        <rect className="c" width={74.176} height={20.471} />
      </clipPath>
      <clipPath id="ag">
        <rect className="c" width={26.071} height={49.613} />
      </clipPath>
      <clipPath id="ah">
        <rect className="c" width={44.909} height={39.988} />
      </clipPath>
      <clipPath id="ai">
        <rect className="c" width={32.098} height={11.618} />
      </clipPath>
      <clipPath id="aj">
        <rect className="c" width={67.109} height={25.681} />
      </clipPath>
      <clipPath id="ak">
        <rect className="c" width={32.717} height={24.153} />
      </clipPath>
      <clipPath id="al">
        <rect className="c" width={21.99} height={29.607} />
      </clipPath>
      <clipPath id="am">
        <rect className="c" width={29.174} height={44.19} />
      </clipPath>
      <clipPath id="an">
        <rect className="c" width={42.966} height={12.644} />
      </clipPath>
      <clipPath id="ao">
        <rect className="c" width={33.434} height={42.918} />
      </clipPath>
      <clipPath id="ap">
        <rect className="c" width={38.458} height={20.363} />
      </clipPath>
      <clipPath id="aq">
        <rect className="c" width={60.123} height={64.125} />
      </clipPath>
      <clipPath id="ar">
        <rect className="c" width={48.399} height={83.704} />
      </clipPath>
      <clipPath id="as">
        <path
          className="c"
          d="M43.429,13.132c-7,19.736,8.208,20.7,19.631,33.552S80.906,79.522,82.69,91.657,95.539,78.45,86.616,58.819,47.354,2.069,43.429,13.132"
          transform="translate(-41.655 -11.114)"
        />
      </clipPath>
      <linearGradient
        id="at"
        x1={-1.287}
        y1={2.697}
        x2={-1.254}
        y2={2.697}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.047} stopColor="#0f0402" />
        <stop offset={0.319} stopColor="#621b10" />
        <stop offset={0.56} stopColor="#a42e1b" />
        <stop offset={0.76} stopColor="#d33b24" />
        <stop offset={0.913} stopColor="#f14329" />
        <stop offset={1} stopColor="#fc472b" />
      </linearGradient>
      <clipPath id="au">
        <rect className="c" width={28.421} height={25.292} />
      </clipPath>
      <clipPath id="av">
        <path
          className="d"
          d="M49.23,85.146C59.05,92.626,73.912,79,76.22,69.119s-8.882-7.834-13.7-3.614S44.15,81.278,49.23,85.146"
          transform="translate(-48.108 -62.008)"
        />
      </clipPath>
      <linearGradient
        id="aw"
        x1={-1.851}
        y1={3.874}
        x2={-1.808}
        y2={3.874}
        xlinkHref="#at"
      />
      <clipPath id="ax">
        <rect className="c" width={40.696} height={53.054} />
      </clipPath>
      <clipPath id="ay">
        <path
          className="d"
          d="M22.959,100.872C8.839,104.906,16.534,117.648,20.1,123s16.776,20.343,24.627,28.2,13.564-3.212,9.282-11.778S27.957,99.443,22.959,100.872"
          transform="translate(-14.781 -100.825)"
        />
      </clipPath>
      <linearGradient
        id="az"
        x1={-0.463}
        y1={1.538}
        x2={-0.424}
        y2={1.538}
        xlinkHref="#at"
      />
      <clipPath id="ba">
        <rect className="c" width={59.816} height={50.888} />
      </clipPath>
      <clipPath id="bb">
        <rect className="c" width={76.988} height={53.996} />
      </clipPath>
      <clipPath id="bc">
        <path
          className="d"
          d="M169.407,52.714c-18.232,8.2-11.421,40.927-5.71,46.161s65.673,10.947,70.433,1.9S202.719,87.931,192.251,86.5s-3.808-42.354-22.843-33.788"
          transform="translate(-157.569 -51.537)"
        />
      </clipPath>
      <linearGradient
        id="bd"
        x1={-3.326}
        y1={2.834}
        x2={-3.305}
        y2={2.834}
        xlinkHref="#at"
      />
      <clipPath id="be">
        <rect className="c" width={31.974} height={39.515} />
      </clipPath>
      <clipPath id="bf">
        <path
          className="d"
          d="M88.538,82.472c3.7,16.653,31.883-19.512,30.933-30.459S80.923,48.208,88.538,82.472"
          transform="translate(-87.521 -47.271)"
        />
      </clipPath>
      <linearGradient
        id="bg"
        x1={-3.08}
        y1={3.132}
        x2={-3.042}
        y2={3.132}
        xlinkHref="#at"
      />
      <clipPath id="bh">
        <rect className="c" width={28.558} height={52.174} />
      </clipPath>
      <clipPath id="bi">
        <rect className="c" width={33.096} height={38.869} />
      </clipPath>
      <clipPath id="bj">
        <rect className="c" width={71.658} height={39.637} />
      </clipPath>
      <clipPath id="bk">
        <rect className="c" width={7.919} height={9.977} />
      </clipPath>
      <clipPath id="bl">
        <path
          className="c"
          d="M56.6,87.822c-.537,1.694-1.339,1.308-3.749,1.4S49.2,90.291,50,91.006c3.4,3.025,5.355,2.884,6.6,1.19,1.052-1.429.712-4.758.258-4.758-.084,0-.174.117-.258.384"
          transform="translate(-49.755 -87.438)"
        />
      </clipPath>
      <linearGradient
        id="bm"
        x1={-11.414}
        y1={17.635}
        x2={-11.183}
        y2={17.635}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#f57bde" />
        <stop offset={0.363} stopColor="#f779d7" />
        <stop offset={0.887} stopColor="#fd73c4" />
        <stop offset={1} stopColor="#ff72bf" />
      </linearGradient>
      <clipPath id="bo">
        <rect className="c" width={5.841} height={7.853} />
      </clipPath>
      <clipPath id="bp">
        <path
          className="c"
          d="M95.414,103.6c-1.553,3.5-1.362,5.437-.316,6.632s3.525.338,2.52-.142-.829-1.294-1.017-3.7c-.144-1.9-.57-3.05-.925-3.05-.094,0-.183.082-.262.258"
          transform="translate(-94.28 -103.342)"
        />
      </clipPath>
      <linearGradient
        id="bq"
        x1={-35.224}
        y1={10.259}
        x2={-34.849}
        y2={10.259}
        xlinkHref="#bm"
      />
      <clipPath id="bs">
        <rect className="c" width={3.673} height={3.064} />
      </clipPath>
      <clipPath id="bt">
        <path
          className="c"
          d="M124.629,36.5c.777,1.725,1.555,2.293,2.338,2.3a1.056,1.056,0,0,0,.833-.5c.2-.295.219-.589-.053-.476-.509.213-.751-.121-1.7-.845a3.046,3.046,0,0,0-1.321-.7c-.123,0-.164.072-.1.219"
          transform="translate(-124.599 -36.286)"
        />
      </clipPath>
      <linearGradient
        id="bu"
        x1={-58.8}
        y1={50.776}
        x2={-58.328}
        y2={50.776}
        xlinkHref="#bm"
      />
      <clipPath id="bw">
        <rect className="c" width={5.841} height={7.851} />
      </clipPath>
      <clipPath id="bx">
        <path
          className="c"
          d="M180.274,40.686c-1.555,3.5-1.364,5.439-.318,6.632s3.527.34,2.52-.141-.827-1.294-1.015-3.7c-.146-1.893-.572-3.05-.925-3.05-.1,0-.183.084-.262.258"
          transform="translate(-179.139 -40.428)"
        />
      </clipPath>
      <linearGradient
        id="by"
        x1={-67.013}
        y1={24.99}
        x2={-66.638}
        y2={24.99}
        xlinkHref="#bm"
      />
      <clipPath id="ca">
        <rect className="c" width={9.994} height={13.481} />
      </clipPath>
      <clipPath id="cb">
        <path
          className="c"
          d="M212.686,62.123c-4.779,8.837-7.767,11.542,4.2,11.954-.08-2.4-2.553-4.879-2.028-7.065-.4-3.24-1.2-5.285-1.782-5.285-.146,0-.279.129-.39.4"
          transform="translate(-208.498 -61.727)"
        />
      </clipPath>
      <linearGradient
        id="cc"
        x1={-31.888}
        y1={12.818}
        x2={-31.733}
        y2={12.818}
        xlinkHref="#bm"
      />
      <clipPath id="ce">
        <rect className="c" width={7.775} height={5.176} />
      </clipPath>
      <clipPath id="cf">
        <path
          className="c"
          d="M84.39,27.919c3.484,4.471,4.206,6.628,7.129.537a4.914,4.914,0,0,0-1.93-.181,3.444,3.444,0,0,1-2.182-.369,9.436,9.436,0,0,0-2.482-.463c-.6,0-.829.17-.535.476"
          transform="translate(-84.263 -27.443)"
        />
      </clipPath>
      <linearGradient
        id="cg"
        x1={-17.657}
        y1={24.812}
        x2={-17.447}
        y2={24.812}
        xlinkHref="#bm"
      />
      <clipPath id="cj">
        <path
          className="c"
          d="M472.594,128.4c-1.44-4.752-13.811-14.748-18.089-15.7-4.132-.917-9.59-10.693-9.959-13.5-.021-.2-.037-.295-.037-.295,0-2.391,6.809-8.583,8.569-16.188,1.427-6.179-9.044-18.087-14.286-19.514-2.978-.812-9.506.531-15.281,2.459-4.362,1.454-8.3,3.244-9.937,4.684-3.817,3.327-4.754,19.977-4.754,23.318s-.014,14.567-4.768,22.367c-6.653,10.946-11.9,11.9-22.365,13.8-9.381,1.706-23.32.95-30.449-.95s-11.421-27.119-10.47-30.937c.25-1,1.776-2.318,4.081-3.847,4.953-1.706,13.774-6.793,27.33-15.179a54.205,54.205,0,0,0,7.162-5.488A122.177,122.177,0,0,0,396,55.588c4.858-6.29,8.164-12.028,7.582-14.75-1.427-6.655-17.125-26.645-22.367-27.119s-14.748,7.143-14.748,11.421c0,1.92-2.024,4.8-4.76,7.395a33.781,33.781,0,0,0-6.477,4.637,10.567,10.567,0,0,1-4.461,1.29c-.8,0-1.665-.656-2.559-1.817-2.418-3.089-.347-7.484-2.681-14.362-3.035-8.932-1.206-7.7-1.9-10.47C342.192,6.1,318.8,1.085,311.736,15.857c-2.619,5.472,9.824,34.906,9.35,38.107v.014A33.073,33.073,0,0,1,316.5,66.07c-2.391,3.327-4.292-.964-6.192-4.766s-8.1-11.9-17.139-10.946a13.652,13.652,0,0,0-5.174,1.8,6.215,6.215,0,0,0-1.4.841c-7.073,4.668-13.63,14.286-14.356,19.725-.95,7.143,9.03,19.99,14.272,26.659s13.8,11.421,15.224,18.55a17.29,17.29,0,0,1,.349,2.74v.014c.279,5.228-2.629,8.039-10.82,12.961-9.52,5.7-22.367,16.649-28.072,23.318-5.718,6.653-8.093.474-8.093-5.244,0-5.7-23.794-8.569-28.072-9.994s-.964-12.847-.964-15.7,18.089-1.9,25.234-2.853c7.129-.95,16.649-23.318,15.222-30.935-1.4-7.494-16.146-12.666-18.005-12.847h-.084c-1.427,0,12.861-20.466,15.712-30.462s1.427-32.838-6.192-41.881c-4.99-5.943-18.606-5.927-28.573-4.809-5.228.587-4.223,1.468-5.691,1.957-4.206,1.4-5.41,12.832-5.242,13.308l.014.014c-10.47.474-22.367-9.046-22.367-9.046-3.815-3.8-14.272-3.8-19.514,3.817-4.432,6.444-1.692,20.745-.755,24.967.168.769.279,1.2.279,1.2a30.913,30.913,0,0,0-8.583.867.382.382,0,0,0-.141.029,16.1,16.1,0,0,0-4.262,1.257c-.029.014-.057.027-.084.043-1.581.642-2.629,1.37-2.629,2.082,0,2.153-.769,14.664-4.725,20.285a.013.013,0,0,1-.014.014,5.105,5.105,0,0,1-3.8,2.069c-4.922-1.077-12.344-12.609-14.875-17.8a2.02,2.02,0,0,1-.111-.252c-.322-.8-.574-1.452-.755-1.928-.18-1.083.935-2.845,2.545-4.875a27.618,27.618,0,0,0,5.283-6.212,34.647,34.647,0,0,0,3.119-4.151c2.865-4.752,2.865-20.453-.476-25.219-1.06-1.514-4.586-2.787-8.911-3.62-.381-.08-.759-.152-1.128-.207C127.419-.706,115.507-.33,115.2,3.722c-.476,6.192-1.916,17.139-4.768,18.089s-6.179-6.669-10.946-9.046c-4.752-2.375-11.895-1.425-19.99,3.8-8.08,5.242-9.03,26.169-8.556,32.361s22.367,15.7,34.74,25.22,8.556,29.984,8.556,29.984c-4.754,16.651-15.224,21.893-17.125,21.893s-14.629-12.3-22.845-15.706c-9.165-3.8-9.941-13.314-10.945-17.607C59.986,78.437,60.942,70.347,51.9,68.447s-30.46,9.044-30.46,14.748c0,4.6,6.157,10.42,7.572,13.509a4.41,4.41,0,0,1-.121,1.854C26.106,100.572,4.338,105.437.62,114.719c-3.8,9.52,10.708,25.581,20.7,23.2,9.98-2.375,19.151-3.8,23.9-1.9,4.768,1.9-5.7,15.224-8.08,24.744s14.274,14.272,19.5,13.8,17.613-19.99,20.941-20.466c3.074-.439,9.8,1.183,11.557,11.187.121.851.236,1.715.34,2.625.95,12.373,26.659,37.115,27.133,42.344s-10.47,11.421-12.847,11.421-3.339-13.322-1.438-21.4c1.189-5.025-7.9-6.563-16.448-7.008a42.251,42.251,0,0,0-10.381-.152c-.87.008-1.614.016-2.194.016-6.192,0-6.667,17.125-6.667,17.125s-11.9-18.55-23.32-19.977S21.436,202.648,20.01,208.829s13.324,20.464,14.748,21.415-6.653,4.294-11.895,9.522,2.389,15.712,8.568,18.564c6.194,2.851,19.516-.95,23.32-2.851,3.8-1.916,14.748,1.9,23.318,2.851s19.99,5.7,34.738-5.718,38.554-14.748,39.506-12.845l-4.321,2.123a35.627,35.627,0,0,0-10.4,5.144,24.641,24.641,0,0,0-5.745,6.054c-7.619,11.421,31.411,29.036,35.215,29.036s12.845-10,23.792-11.423,11.9,9.52,15.238,11.9c2.1,1.5,15.308,4.18,26.38,4.375,6.009.117,11.374-.515,13.979-2.475a2.859,2.859,0,0,0,.558-.474,12.821,12.821,0,0,0,1.608-2c4.221-6.362,4.738-17.434,6.011-20.845,1.427-3.8,16.665-7.143,29.036,0s35.689,6.669,40.917,1.427,7.619-23.794,6.669-28.07c-.95-4.294-18.564-5.718-18.564-5.718s.95-5.228,6.192-11.9,3.8-10.47,1.425-15.7-19.04-8.569-23.792-7.143c-3.216.964-8.794,5.591-12.092,8.513-1.608,1.411-2.67,2.432-2.67,2.432s-3.8-.474,2.865-10.945a20.04,20.04,0,0,1,4.489-4.908c7.59-6.068,18.759-7.479,22.633-11.743a12.423,12.423,0,0,1,5.256-3.285,28.193,28.193,0,0,1,12.358-1.007c2.851.476,3.8,6.669,3.8,11.9s13.8,16.188,18.565,23.794c4.752,7.617,17.125,32.838,19.977,36.653s10.47,11.9,29.036,6.179c18.564-5.7,19.99-17.6,19.99-17.6l-6.669-13.337s7.143-7.6,10-11.421c2.851-3.8-6.655-17.125-10.947-19.977s-26.169.476-26.169.476c-.246-.185-.449-.384-.671-.576-.244-.211-.5-.418-.714-.636-.185-.185-.343-.381-.511-.572s-.371-.406-.533-.617-.3-.435-.443-.656c-.133-.2-.275-.392-.39-.591-.139-.24-.252-.482-.369-.724-.092-.187-.2-.373-.277-.562-.111-.256-.2-.515-.289-.773-.062-.178-.135-.353-.189-.529-.082-.271-.142-.541-.207-.81-.039-.162-.088-.326-.119-.488-.057-.277-.094-.55-.131-.824-.021-.15-.053-.3-.07-.449-.029-.275-.045-.543-.06-.81-.008-.139-.023-.283-.029-.42-.01-.267-.006-.523,0-.781,0-.125,0-.258,0-.381.008-.252.025-.486.043-.724.008-.115.012-.24.023-.351.02-.23.047-.439.074-.652.014-.1.021-.215.037-.314.029-.209.062-.394.1-.582.014-.082.027-.176.043-.254.033-.182.068-.336.1-.49.014-.064.027-.141.041-.2.035-.156.068-.281.1-.4l.008-.037c.422-.111.894-.244,1.4-.392,7.418.035,26.752-9.84,33.027-12.97,6.655-3.327,16.651-19.516,16.651-19.516a31.555,31.555,0,0,0,4.18,4.026l.041.041c6.639,5.523,17.572,11.827,24.338,10.695,8.554-1.427,11.9-23.318,10.47-28.085m-291.262,44.26c-4.752,19.04-27.6,20.941-27.6,20.941a12.236,12.236,0,0,1-3.648-1.272c-6.85-3.509-12.051-12.525-12.051-12.525s9.982-3.815,16.175-4.292,6.669-10.947,8.093-17.125-12.847-19.99-15.712-19.99-10.947,3.8-10.947,3.8a46.034,46.034,0,0,1,17.894-30.753c.061-.047.105-.078.164-.121a11.39,11.39,0,0,1,2.155-.681c5.619,2.488,12.625,2.059,12.625,2.059s-4.752,17.125.95,22.367a39.932,39.932,0,0,1,3.86,4.069c5.591,6.7,11.854,18.271,8.037,33.523M226.067,221.2s-15.7-3.327-27.119.474a19.454,19.454,0,0,0-3.327-7.129s15.7-20.941,25.695-23.792l8.093,6.179a11.667,11.667,0,0,1,.587,1.481.849.849,0,0,0-.111-.057,26.984,26.984,0,0,1,.146,13.683,35.51,35.51,0,0,1-3.964,9.161m-32.824-148c1.987-1.77,3.355-6.632,4.254-11.325.841-2.016,1.378-5.394,1.45-10.566l11.421.476s2.851,1.425,2.377,10.945S201.086,83.671,196.57,83.671c-5.242,0-7.619-4.754-7.619-4.754V78.89c.027-.252.308-2.139,4.292-5.691"
          transform="translate(0 0)"
        />
      </clipPath>
      <radialGradient
        id="ck"
        cx={0.502}
        cy={0.501}
        r={0.68}
        gradientTransform="matrix(0.603, 0, 0, -1, 0.003, 1.999)"
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#e8731a" />
        <stop offset={1} stopColor="#422259" />
      </radialGradient>
      <clipPath id="cl">
        <rect className="c" width={472.912} height={286.985} />
      </clipPath>
      <clipPath id="cm">
        <path
          className="c"
          d="M471.874,140.491c.041-.2.08-.4.119-.593.2-1.009.365-2,.5-2.963l.047-.347c.478-3.62.494-6.715.055-8.185-1.079-3.564-8.31-10.078-13.661-13.513-.445-.285-.878-.55-1.294-.79a12.336,12.336,0,0,0-3.134-1.4,3.971,3.971,0,0,1-.806-.281c-.08-.037-.162-.094-.242-.137a6.673,6.673,0,0,1-.585-.336c-.1-.064-.2-.148-.293-.221-.181-.133-.365-.265-.548-.42-.1-.088-.207-.191-.308-.283-.18-.162-.357-.322-.535-.5-.107-.107-.215-.228-.322-.342-.172-.181-.343-.361-.513-.556-.111-.129-.223-.267-.334-.4-.16-.191-.322-.383-.478-.584-.119-.154-.236-.312-.355-.47-.142-.191-.287-.381-.425-.576s-.254-.365-.379-.548-.244-.355-.361-.537c-.137-.207-.267-.416-.4-.625-.1-.156-.2-.31-.291-.466-.142-.238-.281-.474-.418-.71-.07-.123-.142-.246-.211-.369q-.222-.4-.427-.786l-.135-.254q-.223-.433-.42-.845l-.07-.146c-.141-.3-.271-.587-.386-.863l-.027-.061c-.121-.293-.23-.572-.324-.829l0-.014a6.711,6.711,0,0,1-.363-1.341l0-.006c-.02-.191-.035-.291-.035-.291a1.83,1.83,0,0,1,.078-.492c.6-2.143,4.619-6.339,7.047-11.583a21.205,21.205,0,0,0,1.444-4.114c1.427-6.179-9.044-18.087-14.286-19.514a11.3,11.3,0,0,0-3.649-.182,52.91,52.91,0,0,0-11.63,2.641c-4.364,1.456-8.306,3.244-9.939,4.684-3.817,3.327-4.754,19.977-4.754,23.318s-.014,14.567-4.766,22.367c-6.655,10.946-11.9,11.9-22.369,13.8-9.379,1.706-23.318.95-30.447-.95s-11.421-27.119-10.47-30.937a1.808,1.808,0,0,1,.15-.381c.018-.035.045-.07.064-.105a3.462,3.462,0,0,1,.2-.306c.029-.039.066-.08.1-.117a3.915,3.915,0,0,1,.271-.324c.033-.037.074-.074.109-.111.113-.117.23-.236.363-.359.033-.031.07-.064.105-.1.146-.133.3-.265.466-.4.027-.023.059-.047.088-.07.182-.148.373-.3.578-.453l.066-.049c.217-.164.447-.33.687-.5l.041-.027c.252-.176.515-.357.792-.539l.006-.006a46.8,46.8,0,0,0,5.728-2.549l.178-.092c1.366-.7,2.865-1.509,4.512-2.432l.025-.014c.449-.254.915-.517,1.386-.786.213-.121.425-.242.642-.367.435-.25.876-.505,1.329-.767.285-.166.58-.34.872-.511.425-.248.845-.494,1.286-.755q1.033-.609,2.125-1.263c.347-.211.714-.431,1.071-.646.5-.3,1-.6,1.516-.915l1.085-.66c.584-.355,1.181-.72,1.786-1.091l.933-.572c.929-.572,1.877-1.155,2.855-1.76.308-.187.628-.394.952-.609.1-.066.2-.139.306-.207q.351-.24.712-.5l.345-.246c.277-.2.56-.414.845-.63l.213-.16c.34-.262.685-.535,1.034-.816.148-.119.3-.24.447-.363q.331-.272.667-.552c.166-.139.33-.275.5-.418.236-.2.476-.408.716-.617l.427-.373c.683-.6,1.376-1.222,2.075-1.864l.273-.252q1.03-.957,2.069-1.961c.055-.053.109-.107.164-.162.689-.669,1.378-1.352,2.059-2.047.037-.035.072-.07.107-.107.687-.7,1.364-1.409,2.035-2.123.094-.1.185-.2.279-.3q1-1.077,1.973-2.158l.08-.092q.96-1.077,1.864-2.149l.148-.172q.9-1.063,1.721-2.1c.076-.094.15-.189.226-.285.552-.7,1.085-1.393,1.581-2.069.154-.2.3-.4.451-.593.183-.24.365-.48.545-.716.156-.211.308-.418.459-.626.166-.222.328-.447.488-.667s.295-.412.437-.615c.162-.228.318-.455.474-.681.129-.189.262-.379.386-.564.191-.283.373-.56.552-.835.119-.181.236-.363.349-.541.207-.326.408-.648.6-.964.092-.15.176-.295.262-.443.141-.238.277-.472.408-.7.086-.152.168-.3.25-.453.121-.224.238-.445.349-.662.072-.139.144-.277.211-.414.123-.246.232-.484.34-.72.045-.1.094-.2.135-.293q.214-.486.381-.941c.027-.076.047-.144.072-.219.08-.228.152-.451.213-.665.029-.1.051-.2.076-.291.045-.183.084-.361.115-.533.016-.094.031-.185.043-.275.023-.172.035-.336.041-.5,0-.072.01-.148.008-.217a3.294,3.294,0,0,0-.06-.625c-1.427-6.655-17.125-26.645-22.367-27.121s-14.748,7.145-14.748,11.423a3.529,3.529,0,0,1-.109.812c-.023.1-.068.217-.1.324-.057.185-.115.371-.2.566-.06.142-.137.289-.207.435-.082.168-.164.336-.262.509s-.2.347-.314.525c-.094.15-.189.3-.293.453-.137.2-.281.4-.433.6-.1.129-.2.258-.3.386-.178.228-.361.455-.556.683-.086.1-.176.2-.263.3-.223.254-.451.507-.693.761-.06.062-.125.125-.185.187-.275.283-.556.568-.851.845v0a33.781,33.781,0,0,0-6.477,4.637l-.006,0c-.394.193-.785.371-1.169.527-.021.008-.043.016-.064.025-.361.144-.716.271-1.066.375-.113.033-.221.053-.332.082-.26.068-.517.139-.767.18a6.522,6.522,0,0,1-1.058.1c-.8,0-1.665-.656-2.559-1.817a6.338,6.338,0,0,1-1.224-3.314c-.332-2.765.146-6.319-1.458-11.048-3.035-8.932-1.206-7.7-1.9-10.47-.671-2.693-6.224-5.23-12.644-5.613a25.2,25.2,0,0,0-9,1.023c-.6.191-1.2.42-1.782.667a17.988,17.988,0,0,0-2.57,1.345,15.763,15.763,0,0,0-5.888,6.624c-1.39,2.908,1.47,12.576,4.385,21.483,2.572,7.859,5.189,15.123,4.965,16.624v.014A33.041,33.041,0,0,1,316.5,66.069c-2.391,3.327-4.292-.964-6.192-4.766s-8.1-11.9-17.139-10.946a10.456,10.456,0,0,0-1.173.2l-.185.041a15.307,15.307,0,0,0-3.934,1.62,6.251,6.251,0,0,0-.613.318A5.533,5.533,0,0,0,286.6,53c-7.073,4.668-13.63,14.286-14.356,19.725-.95,7.143,9.03,19.99,14.272,26.659s13.8,11.421,15.224,18.55a17.29,17.29,0,0,1,.349,2.74v.014c.279,5.228-2.629,8.039-10.82,12.961-9.522,5.7-22.367,16.649-28.072,23.318-5.716,6.653-8.093.474-8.093-5.244,0-5.7-23.794-8.569-28.072-9.994s-.964-12.847-.964-15.7,18.089-1.9,25.232-2.851,16.651-23.32,15.224-30.937c-1.4-7.494-16.146-12.666-18.005-12.849h-.084c-1.427,0,12.861-20.464,15.712-30.46s1.427-32.838-6.192-41.881c-4.99-5.941-18.606-5.929-28.573-4.809-5.228.587-4.223,1.468-5.691,1.957-4.208,1.4-5.41,12.832-5.242,13.308l.014.014c-10.47.474-22.367-9.046-22.367-9.046-3.815-3.8-14.272-3.8-19.514,3.817-4.432,6.444-1.692,20.745-.755,24.967.168.769.279,1.2.279,1.2a30.913,30.913,0,0,0-8.583.867.382.382,0,0,0-.141.029,19.669,19.669,0,0,0-2.949.732,11.006,11.006,0,0,0-1.189.472c-.039.018-.086.035-.125.053s-.057.027-.084.043c-1.581.642-2.629,1.37-2.629,2.082,0,2.153-.769,14.66-4.723,20.281l0,0c0,.012-.008.01-.012.012l0,0a5.105,5.105,0,0,1-3.8,2.069C146.943,64.028,139.521,52.5,136.99,47.31v0a2.02,2.02,0,0,1-.111-.252c-.191-.474-.355-.89-.5-1.257-.1-.25-.183-.48-.258-.671a1.712,1.712,0,0,1,.012-.535c.008-.057.025-.121.037-.181a3.932,3.932,0,0,1,.133-.449c.025-.068.049-.137.078-.209.082-.2.178-.4.291-.607.018-.033.029-.064.049-.1.133-.242.289-.5.457-.753.062-.1.129-.2.2-.293.119-.176.246-.357.377-.541.08-.111.16-.221.244-.334.146-.2.3-.4.461-.6.072-.092.139-.181.213-.273l0,0c.488-.414.958-.855,1.417-1.319l.131-.133q.656-.673,1.269-1.4c.021-.027.043-.051.064-.076a31.5,31.5,0,0,0,2.4-3.281l0,0,.01-.012c.263-.312.515-.619.765-.925.051-.06.1-.123.152-.185.23-.283.445-.56.658-.835.059-.076.123-.156.18-.23.2-.269.392-.531.576-.788.051-.074.111-.152.162-.226.226-.326.433-.642.617-.948,2.865-4.752,2.865-20.453-.476-25.219a3.25,3.25,0,0,0-.464-.507c-.057-.051-.121-.1-.181-.148a5.241,5.241,0,0,0-.474-.349c-.076-.051-.152-.1-.234-.15-.2-.125-.425-.246-.662-.365-.061-.031-.117-.062-.18-.094q-.477-.231-1.025-.447l-.068-.025c-.343-.135-.71-.263-1.091-.388-.08-.027-.162-.053-.244-.078q-.53-.17-1.1-.326l-.207-.059c-.931-.252-1.93-.48-2.98-.683h-.006c-.381-.08-.757-.152-1.126-.207q-.512-.085-1.034-.164l-.447-.064c-.277-.041-.556-.078-.837-.115-.154-.02-.306-.039-.463-.057-.316-.039-.634-.074-.952-.107-.154-.018-.308-.033-.463-.049-.314-.029-.626-.059-.941-.084-.142-.012-.281-.023-.422-.033-.314-.023-.628-.045-.941-.064-.144-.008-.289-.018-.433-.023-.369-.021-.734-.039-1.1-.051l-.291-.008c-.308-.01-.617-.016-.923-.02-.129,0-.258,0-.384,0-.371,0-.738,0-1.1,0l-.258.006c-.306.008-.609.018-.909.029l-.32.014c-.357.018-.71.039-1.054.066l-.234.02c-.295.025-.582.053-.867.084l-.254.027c-.332.041-.654.084-.968.133l-.211.035c-.267.045-.531.094-.785.144L119.777.6c-.291.062-.572.131-.841.2-.062.016-.121.033-.18.051-.234.066-.461.137-.675.213-.041.016-.088.029-.129.045-.24.088-.464.181-.677.281-.051.021-.1.047-.144.07a5.8,5.8,0,0,0-.527.289c-.023.016-.051.029-.074.045a4,4,0,0,0-.476.361c-.033.029-.066.06-.1.092a2.829,2.829,0,0,0-.343.381l-.025.031a2.156,2.156,0,0,0-.24.447c-.016.037-.029.076-.041.113a2.007,2.007,0,0,0-.109.5c-.476,6.192-1.916,17.139-4.768,18.089s-6.179-6.669-10.946-9.046c-4.752-2.375-11.895-1.425-19.99,3.8-8.08,5.242-9.03,26.169-8.554,32.361s22.365,15.7,34.738,25.22,8.556,29.984,8.556,29.984c-4.754,16.651-15.224,21.893-17.125,21.893-.6,0-2.246-1.2-4.487-2.957q-.673-.527-1.411-1.114l-1.53-1.218c-1.47-1.167-3.064-2.424-4.7-3.663-.347-.262-.695-.523-1.042-.781a65.832,65.832,0,0,0-7.258-4.8c-.558-.3-1.1-.584-1.635-.829-.263-.123-.525-.238-.783-.345a16.864,16.864,0,0,1-1.622-.777c-7.64-4.192-8.382-12.8-9.323-16.831-1.146-4.908-1.784-9.085-2.5-12.531-.129-.625-.262-1.228-.4-1.805A19.27,19.27,0,0,0,58.259,72.6a8.565,8.565,0,0,0-2.235-2.434,8.673,8.673,0,0,0-1.177-.718,11.539,11.539,0,0,0-2.586-.915,1.667,1.667,0,0,0-.365-.088c-9.044-1.9-30.46,9.046-30.46,14.748a5.687,5.687,0,0,0,.062.785c.008.057.014.113.023.17a7.691,7.691,0,0,0,.172.775c.014.051.031.1.045.152.07.234.15.472.24.71.02.049.035.1.055.146.1.26.219.519.343.781l.111.23c.123.246.25.492.386.738.039.07.08.141.121.213.117.2.238.412.365.617.062.1.123.2.185.3.141.224.285.449.433.671.09.135.181.267.273.4l.219.316c1.772,2.537,3.8,4.893,4.539,6.5.012.1.018.207.025.31a5.078,5.078,0,0,1,.01.644c0,.049-.012.1-.018.144a3.817,3.817,0,0,1-.141.755C26.1,100.571,4.338,105.436.62,114.718c-3.8,9.52,10.708,25.582,20.7,23.206,9.98-2.377,19.151-3.8,23.9-1.9,4.768,1.9-5.7,15.224-8.08,24.744s14.274,14.272,19.5,13.8,17.613-19.99,20.941-20.466c.183-.025.381-.043.585-.055l.047,0c.2-.008.42-.008.642,0l.053,0c.23.012.47.033.716.066l.027,0c3.363.457,8.062,3.054,9.487,11.173.121.851.236,1.715.34,2.625.95,12.373,26.659,37.115,27.133,42.344s-10.47,11.421-12.847,11.421-3.339-13.322-1.438-21.4a4,4,0,0,0,.092-.658c0-.043.006-.088.006-.131a2.964,2.964,0,0,0-.039-.593c-.006-.033-.014-.064-.021-.1a3,3,0,0,0-.148-.509c-.01-.027-.018-.055-.029-.082a3.391,3.391,0,0,0-.275-.509c-.025-.037-.051-.072-.074-.107a3.987,3.987,0,0,0-.388-.476l-.033-.031a4.839,4.839,0,0,0-.466-.416c-.037-.029-.072-.06-.111-.09a6.733,6.733,0,0,0-.568-.39l-.131-.076c-.191-.113-.394-.224-.605-.33l-.092-.047c-.234-.113-.48-.221-.736-.324l-.189-.076c-.258-.1-.523-.2-.8-.289-.043-.016-.088-.027-.131-.043-.252-.08-.509-.158-.775-.232-.07-.021-.142-.041-.215-.06-.289-.08-.585-.154-.89-.226l-.26-.059c-.271-.061-.546-.121-.829-.176-.059-.012-.115-.025-.176-.037-.316-.061-.64-.117-.966-.172l-.324-.055c-.32-.051-.642-.1-.97-.144-.105-.016-.211-.029-.316-.043q-.392-.053-.79-.1l-.351-.041c-.322-.037-.646-.07-.972-.1-.144-.014-.287-.027-.433-.039-.246-.023-.494-.045-.742-.066l-.619-.049-.681-.047c-.172-.012-.343-.023-.517-.033-.295-.018-.589-.035-.884-.051h0c-.464-.055-.925-.105-1.39-.15a39.425,39.425,0,0,0-8.989,0c-.269,0-.523,0-.767.008h-.107l-.531.006h-.217c-.2,0-.4,0-.572,0-6.192,0-6.669,17.125-6.669,17.125S54.75,191.7,43.327,190.276s-21.891,12.371-23.318,18.55c-1.427,6.194,13.324,20.466,14.748,21.417s-6.653,4.294-11.9,9.522c-5.226,5.242,2.391,15.712,8.569,18.564,6.194,2.851,19.516-.95,23.32-2.851s14.748,1.9,23.318,2.851,19.99,5.7,34.738-5.718,38.554-14.748,39.506-12.845l-4.321,2.123a35.6,35.6,0,0,0-10.4,5.144h0a25.737,25.737,0,0,0-2.274,1.952q-.7.667-1.364,1.415a24.114,24.114,0,0,0-2.108,2.687c-3.066,4.6,1.427,10.2,8.136,15.248,9.959,7.5,24.807,13.788,27.078,13.788,1.526,0,3.9-1.608,6.885-3.618,4.475-3.015,10.342-6.948,16.907-7.8,10.947-1.425,11.9,9.522,15.238,11.9.786.56,3.136,1.29,6.349,1.991.269.059.543.117.822.176.558.115,1.14.23,1.739.342.3.057.607.113.915.168a109.952,109.952,0,0,0,16.555,1.7c.39.008.777.012,1.161.014l.388,0c.252,0,.5,0,.749-.006.164,0,.324-.006.486-.01.209-.006.418-.01.625-.018.182-.008.359-.014.539-.023s.361-.016.541-.025.381-.023.57-.037c.16-.01.32-.021.478-.033.2-.016.388-.033.582-.053.144-.012.289-.025.431-.041.2-.021.394-.043.587-.068.131-.016.258-.031.386-.049.2-.027.4-.057.593-.086.113-.018.222-.035.334-.055.2-.033.4-.068.6-.105.094-.018.185-.039.279-.059.2-.041.408-.084.6-.131l.217-.053c.209-.053.418-.105.617-.162.045-.012.088-.027.133-.041a9.757,9.757,0,0,0,3.074-1.427,3.061,3.061,0,0,0,.271-.2,2.146,2.146,0,0,0,.281-.263l.014-.014,0,0a12.765,12.765,0,0,0,1.6-1.995c4.221-6.362,4.738-17.434,6.011-20.845a5.076,5.076,0,0,1,2.744-2.322c.049-.023.1-.045.152-.066a15.367,15.367,0,0,1,1.462-.568,22.337,22.337,0,0,1,2.922-.742l.332-.059a32.906,32.906,0,0,1,21.425,3.757c5.761,3.327,13.893,5,21.468,5.31,1.069.043,2.125.062,3.164.053.564-.006,1.118-.021,1.669-.041,6.21-.232,11.532-1.432,14.077-3.417a5.96,5.96,0,0,0,.541-.478,8.545,8.545,0,0,0,.8-.935c.053-.07.107-.135.16-.209a15.788,15.788,0,0,0,1.267-2.139l.021-.039c.156-.312.3-.64.453-.974,3.333-7.539,4.738-20.32,3.97-23.774-.457-2.069-4.779-3.468-9.137-4.366a88.884,88.884,0,0,0-9.426-1.352,23.887,23.887,0,0,1,2.5-6.3c.529-.98,1.161-2.041,1.922-3.169.527-.781,1.116-1.593,1.772-2.426q.489-.626.9-1.218c1.932-2.767,2.662-5.039,2.66-7.172,0-2.438-.95-4.7-2.139-7.309-1.495-3.3-8.65-5.839-14.934-6.915-.853-.144-1.692-.265-2.5-.355l-.2-.021a30.088,30.088,0,0,0-3.15-.183h-.012a10.987,10.987,0,0,0-3,.332,23.772,23.772,0,0,0-6.237,3.69q-.577.433-1.148.88c-.435.342-.867.687-1.288,1.03-.929.757-1.811,1.507-2.6,2.2l-.505.443c-.1.09-.211.185-.31.273l-.09.078c-1.555,1.37-2.582,2.354-2.582,2.354a1.129,1.129,0,0,1-.642-.39c-.7-.8-1.151-3.236,3.509-10.554a19.629,19.629,0,0,1,3.591-4.141c.3-.26.589-.521.9-.767,4.742-3.792,10.886-5.765,15.771-7.752,2.931-1.194,5.408-2.391,6.86-3.991a10.5,10.5,0,0,1,1.663-1.44,13.707,13.707,0,0,1,3.595-1.844,27.459,27.459,0,0,1,10.178-1.23,21.668,21.668,0,0,1,2.18.222c2.851.476,3.8,6.669,3.8,11.9,0,4.586,10.564,13.54,16.4,20.8.624.779,1.2,1.536,1.694,2.268.166.244.322.486.472.722,2.377,3.811,6.657,12.02,10.7,19.754q.509.975,1.013,1.934c1.073,2.051,2.116,4.036,3.087,5.865.156.3.312.585.464.872a91.685,91.685,0,0,0,4.711,8.23,20.593,20.593,0,0,0,4.126,4.165c.443.33.915.656,1.425.97.457.279.941.548,1.454.8a22.383,22.383,0,0,0,10.033,2.221l.031,0a40.262,40.262,0,0,0,11.967-1.983c8.246-2.533,13.1-6.288,15.966-9.68.295-.349.566-.695.822-1.034.086-.117.172-.232.254-.345a15.767,15.767,0,0,0,2.949-6.54l-6.669-13.337s7.143-7.6,10-11.421c2.851-3.8-6.655-17.125-10.947-19.977s-26.169.476-26.169.476c-.246-.185-.449-.384-.671-.576-.244-.211-.5-.418-.714-.636-.185-.185-.343-.381-.509-.572-.182-.2-.373-.406-.535-.617s-.3-.435-.443-.656c-.133-.2-.275-.392-.392-.591-.137-.24-.25-.482-.367-.724-.092-.187-.2-.373-.277-.56-.111-.258-.2-.517-.289-.775-.062-.176-.135-.353-.189-.529-.082-.271-.142-.539-.207-.81-.039-.162-.088-.326-.119-.488-.057-.277-.094-.55-.133-.824-.02-.15-.051-.3-.066-.449-.031-.275-.047-.543-.062-.81-.008-.139-.023-.283-.029-.42-.01-.267-.006-.523,0-.781,0-.125,0-.258,0-.381.008-.252.025-.486.043-.724.008-.115.012-.238.023-.351.02-.228.047-.439.074-.652.012-.1.021-.215.037-.314.029-.209.062-.394.1-.582.014-.082.027-.176.041-.254.035-.182.07-.336.1-.49.014-.062.027-.139.041-.2l0-.006c.035-.152.066-.275.1-.394l.008-.035c.42-.113.89-.244,1.392-.392l.006,0c.2,0,.42-.008.64-.021.037,0,.07,0,.107-.006.209-.014.425-.039.648-.064.057-.008.111-.012.17-.02.215-.029.441-.064.667-.1l.211-.035c.226-.041.461-.088.7-.139l.238-.051.055-.012c.219-.049.443-.1.669-.158.088-.023.176-.045.265-.066.248-.064.5-.131.757-.2l.273-.076c.262-.076.527-.152.8-.234.088-.027.178-.057.269-.084.275-.086.554-.174.839-.265l.265-.088c.291-.1.584-.2.88-.3.082-.027.164-.059.246-.086.308-.109.617-.219.931-.332l.211-.078c.129-.047.258-.094.386-.142.2-.074.4-.148.6-.226l.152-.059.066-.025c2.7-1.032,5.548-2.248,8.3-3.5l.045-.02,1.017-.463c.08-.037.16-.072.238-.109.316-.144.626-.289.937-.433l.271-.127c.3-.137.587-.273.878-.41l.33-.156c.275-.129.546-.258.818-.388.117-.055.232-.109.347-.166l.788-.377.342-.164.742-.359c.127-.061.254-.123.381-.185.226-.109.451-.219.671-.328.123-.059.244-.119.365-.178l.683-.336.279-.139.667-.33c.121-.059.234-.115.351-.174.185-.092.371-.183.548-.273l.455-.224.357-.18.464-.232,1.706-.855a23.45,23.45,0,0,0,6.054-5.15q.43-.471.857-.964c.39-.453.781-.915,1.167-1.382l.246-.3a126.267,126.267,0,0,0,8.326-11.717c.078.094.176.193.258.289a32.788,32.788,0,0,0,3.925,3.737l.014.014.027.027a58.255,58.255,0,0,0,15.414,9.264c3.263,1.233,6.388,1.856,8.925,1.431a6.554,6.554,0,0,0,3.327-1.751c2.863-2.619,4.883-7.7,6.093-12.773q.176-.738.33-1.473M153.737,193.6a11.441,11.441,0,0,1-2.459-.724c-.4-.166-.8-.343-1.189-.548-6.85-3.509-12.051-12.525-12.051-12.525s9.982-3.815,16.175-4.292,6.669-10.946,8.093-17.125-12.847-19.99-15.712-19.99-10.943,3.8-10.947,3.8a46.034,46.034,0,0,1,17.894-30.753c.061-.047.105-.078.164-.119l0,0c.357-.148.714-.283,1.071-.4l.025-.008a9.327,9.327,0,0,1,1.048-.273l.006,0h0c5.619,2.488,12.623,2.059,12.623,2.059s-4.752,17.125.95,22.367a39.932,39.932,0,0,1,3.86,4.069,41.872,41.872,0,0,1,5.566,8.583c.01.021.02.045.031.066q.4.837.773,1.717c.045.107.09.217.135.326q.5,1.218.925,2.512.155.474.3.958c.084.283.164.568.242.857q.354,1.3.617,2.676c.033.17.064.34.094.511q.167.96.285,1.956l.035.3c.076.714.133,1.44.166,2.182q.032.7.039,1.407a37.954,37.954,0,0,1-1.171,9.469,24.284,24.284,0,0,1-3.778,8.259c-8.062,11.36-23.817,12.681-23.817,12.681M188.951,78.889c.027-.252.308-2.139,4.292-5.691a4.688,4.688,0,0,0,.355-.355c.037-.043.074-.092.111-.137.078-.092.154-.183.23-.285.041-.055.082-.117.123-.176.068-.1.139-.2.207-.306.039-.064.078-.133.117-.2.068-.113.135-.224.2-.343.037-.068.072-.137.107-.2.068-.129.135-.258.2-.394.033-.064.062-.131.094-.2.07-.15.139-.3.2-.457.025-.057.051-.115.074-.176.074-.174.144-.351.217-.535.016-.043.033-.088.051-.133.078-.207.156-.42.232-.636a.6.6,0,0,1,.021-.062,50.155,50.155,0,0,0,1.717-6.749c.1-.248.2-.513.293-.8l0,0a20.049,20.049,0,0,0,.7-3.226c.01-.068.018-.141.027-.209.047-.34.09-.693.129-1.064.014-.131.027-.265.041-.4.031-.328.059-.665.084-1.015.014-.164.025-.326.037-.5.021-.357.041-.732.059-1.112.008-.166.018-.326.023-.5.02-.554.035-1.126.045-1.727l11.421.476s2.851,1.425,2.377,10.945S201.086,83.668,196.57,83.668c-5.242,0-7.619-4.752-7.619-4.752Zm40.933,119.469h0l.027.084a27.194,27.194,0,0,1,.121,13.595c-.094.355-.2.712-.306,1.077-.08.262-.17.527-.258.792q-.149.445-.316.9-.152.419-.32.843-.24.606-.515,1.226c-.074.168-.146.338-.224.507-.248.535-.511,1.075-.8,1.626-.064.125-.135.254-.2.379-.32.6-.654,1.2-1.021,1.811l0,.006c-.006,0-15.7-3.327-27.119.474,0,0-.016-.066-.047-.189s-.07-.273-.125-.47c-.01-.031-.018-.062-.027-.1a18.48,18.48,0,0,0-3.128-6.372s15.7-20.941,25.693-23.792l8.1,6.179a11.667,11.667,0,0,1,.587,1.481.636.636,0,0,0-.113-.055Z"
          transform="translate(0 0)"
        />
      </clipPath>
      <linearGradient
        id="cn"
        x1={0.009}
        y1={0.992}
        x2={0.013}
        y2={0.992}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#d6dbff" />
        <stop offset={1} stopColor="#3a6191" />
      </linearGradient>
      <clipPath id="cr">
        <rect className="e" width={2602.444} height={521.264} />
      </clipPath>
      <clipPath id="cs">
        <path
          className="f"
          d="M2487.491,0s-158.131,17.621-316.581,90.75c-180.4,83.26-237.286,211.249-657.086,97.688-186.369-50.417-403.018,10.132-564.782,25.32s-356.193,15.189-573.3-91.16S27.14,22.786,14.2,15.19v433H2487.491Z"
          transform="translate(-14.2 -0.001)"
        />
      </clipPath>
      <linearGradient
        id="ct"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#0066e4" />
        <stop offset={1} stopColor="#49beef" />
      </linearGradient>
      <clipPath id="cu">
        <rect className="f" width={2602.444} height={521.264} />
      </clipPath>
      <clipPath id="cv">
        <rect className="f" width={1310.076} height={348.3} />
      </clipPath>
      <clipPath id="cw">
        <rect className="f" width={941.563} height={372.793} />
      </clipPath>
      <clipPath id="cx">
        <rect className="f" width={325.834} height={50.396} />
      </clipPath>
      <clipPath id="cy">
        <path
          className="f"
          d="M727.913,91.305c-99.1,13.332-193.634-17.3-210.122-7.282S563.959,128.561,645.3,121.88,854.161,103.388,839.872,80.9,761.3,86.812,727.913,91.305"
          transform="translate(-515.142 -72.336)"
        />
      </clipPath>
      <clipPath id="cz">
        <path
          className="g"
          d="M0-599.381s168.8,75.8,193.8,84.4c10.728,3.688,63.225,19.888,112.17,30.477,64.875,14.036,128.52,22.663,128.52,22.663s-243.035-3.907-279.763,0S65.643-444.652,30.477-450.9s-101.59-.781-107.06-10.94S0-599.381,0-599.381Z"
          transform="translate(0 2446)"
        />
      </clipPath>
      <clipPath id="da">
        <rect className="c" width={353.279} height={765.3} />
      </clipPath>
      <clipPath id="db">
        <path
          className="c"
          d="M104.471,116.689a3.439,3.439,0,0,0-.362,1.117c-.612,3.882-10.837,75.479-16.148,82.845a16.35,16.35,0,0,1-6.154,5.406c-5.816,2.885-15.452,3.258-35.172.722C18,203.1.828,225.6.01,239.1c0,.1-.008.194-.01.3v.146C.156,253.728,45.786,306.623,81,347.1l.025.023.071.071c35.5,40.9,38.767,106.264,38.767,114.038S111.681,478.4,106.778,478.4s-10.634,20.873-13.505,26.593S63,551.63,64.636,589.268s41.734,99.809,41.734,99.809l9-3.268c-3.281-19.227,11.452-36.412,15.537-47.454s4.1-24.959-4.085-25.776-9.819-13.9-6.958-21.678,10.634-8.184,13.085-7.774,22.1-25.763,30.69-52.357,13.9-69.948,6.944-95.724-22.495-63.821-30.677-72.82-10.634,4.1-14.722,4.5S97.371,350.978,76.5,322.138s-16.559-77.316-15.947-84.682,17.8-9.816,46.636-30.677a31.742,31.742,0,0,0,2.848-2.3c24.934-22.314,10.564-73.4,8.2-79.309-1.8-4.515-8.061-9.64-11.635-9.64a2.243,2.243,0,0,0-2.124,1.155"
          transform="translate(0 -115.534)"
        />
      </clipPath>
      <linearGradient
        id="dc"
        y1={1}
        x2={0.009}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#052466" />
        <stop offset={0.256} stopColor="#1b4953" />
        <stop offset={0.588} stopColor="#33743f" />
        <stop offset={0.847} stopColor="#438f32" />
        <stop offset={1} stopColor="#49992e" />
      </linearGradient>
      <clipPath id="dd">
        <path
          className="c"
          d="M104.471,116.689c19.851,39.4,5.432,82.914-22.664,89.368-5.816,2.885-15.452,3.258-35.172.722C18,203.1.828,225.6.01,239.1c0,.1-.008.194-.01.3v.146C.156,253.728,45.786,306.623,81,347.1l.025.023.071.071c2,1.864,34.284,32.085,41.422,34.465,2.7.9,4.573-.337,6.256-1.578,2.913-2.146,5.256-4.292,10.315,4.654,7.977,14.108,34.979,52.153,18.408,117.2s-38.045,72.4-42.959,75.477-12.883,27-1.225,36.818,12.893,14.719,3.688,28.84-13.3,32.516-10.634,46.011l9-3.268c-3.281-19.227,11.452-36.412,15.537-47.454s4.1-24.959-4.085-25.776-9.819-13.9-6.958-21.678,10.634-8.184,13.085-7.774,22.1-25.763,30.69-52.357,13.9-69.948,6.944-95.724-22.495-63.821-30.677-72.82-10.634,4.1-14.722,4.5S97.371,350.978,76.5,322.138c0,0-75.465-66.272-57.056-88.358,18.372-22.05,45.927,2.367,90.592-29.3,24.934-22.314,10.564-73.4,8.2-79.309-1.8-4.515-8.061-9.64-11.635-9.64a2.243,2.243,0,0,0-2.124,1.155"
          transform="translate(0 -115.534)"
        />
      </clipPath>
      <linearGradient
        id="de"
        y1={1}
        x2={0.009}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#104469" />
        <stop offset={0.043} stopColor="#114966" />
        <stop offset={0.282} stopColor="#1a655b" />
        <stop offset={0.522} stopColor="#207953" />
        <stop offset={0.761} stopColor="#23854e" />
        <stop offset={1} stopColor="#258a4d" />
      </linearGradient>
      <clipPath id="dg">
        <rect className="c" width={55.003} height={299.443} />
      </clipPath>
      <clipPath id="dh">
        <path
          className="d"
          d="M78.009,271.809c32.521,51.544,29.862,103.7,4.091,144.813C52.4,464,39.146,487.186,64.3,571.253c0,0-18.357-80.616.614-117.814,20.863-40.908,34.772-56.453,38.861-81,7.427-44.556-5.318-68.725-11.044-80.179a89.413,89.413,0,0,0-14.727-20.453"
          transform="translate(-51.04 -271.809)"
        />
      </clipPath>
      <linearGradient
        id="di"
        x1={-1.011}
        y1={1.049}
        x2={-0.987}
        y2={1.049}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#2b9da1" />
        <stop offset={0.117} stopColor="#2b9da1" />
        <stop offset={1} stopColor="#b531ef" />
      </linearGradient>
      <clipPath id="dj">
        <rect className="c" width={25.14} height={32.608} />
      </clipPath>
      <clipPath id="dk">
        <path
          className="d"
          d="M89.673,397.874c-6.866-6.007-16.261-4.3-18.408-2.455s-10.3,18.29-4.6,29.147c2.148,4.09,8.129.614,9.051-6.75s-.46-11.658,5.676-16.875c2.465-2.1,9.51-1.993,8.284-3.067"
          transform="translate(-64.675 -393.697)"
        />
      </clipPath>
      <linearGradient
        id="dl"
        x1={-3.462}
        y1={3.089}
        x2={-3.406}
        y2={3.089}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#d180f5" />
        <stop offset={0.964} stopColor="#b633ef" />
        <stop offset={1} stopColor="#b531ef" />
      </linearGradient>
      <clipPath id="dm">
        <rect className="c" width={16.402} height={6.75} />
      </clipPath>
      <clipPath id="dn">
        <rect className="c" width={21.189} height={19.421} />
      </clipPath>
      <clipPath id="do">
        <path
          className="d"
          d="M73.48,397.491c3.348,3.348,10.432,6.443,11.658,6.443s7.363-7.364,9.2-12.119-6.9-8.284-8.9-7.057-13.039,11.66-11.965,12.734"
          transform="translate(-73.407 -384.512)"
        />
      </clipPath>
      <linearGradient
        id="dp"
        x1={-5.082}
        y1={6.279}
        x2={-5.012}
        y2={6.279}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.067} stopColor="#021513" />
        <stop offset={0.332} stopColor="#0c675b" />
        <stop offset={0.568} stopColor="#14a894" />
        <stop offset={0.764} stopColor="#1ad7be" />
        <stop offset={0.914} stopColor="#1df4d7" />
        <stop offset={1} stopColor="#1fffe1" />
      </linearGradient>
      <clipPath id="dq">
        <rect className="c" width={18.474} height={36.085} />
      </clipPath>
      <clipPath id="dr">
        <path
          className="d"
          d="M74.325,420.192c3.957-2.373,8.591-5.829,11.046-3.529S89.359,434,83.683,441.976s-14.88,11.812-14.573,9.2,8.284-13.039,9.051-20.1-5.369-9.97-3.836-10.891"
          transform="translate(-69.102 -415.906)"
        />
      </clipPath>
      <linearGradient
        id="ds"
        x1={-5.565}
        y1={1.941}
        x2={-5.484}
        y2={1.941}
        xlinkHref="#di"
      />
      <clipPath id="dt">
        <rect className="c" width={88.926} height={117.454} />
      </clipPath>
      <clipPath id="du">
        <path
          className="d"
          d="M75.2,348.8c-14.221,37.922-37.635,62.589-30.272,76.09s23.728,18.817,52.772,2.453,37.635-102.677,33.953-106.768S98.921,337.345,89.1,342.662,76.422,345.527,75.2,348.8"
          transform="translate(-43.524 -320.045)"
        />
      </clipPath>
      <linearGradient
        id="dv"
        x1={-0.678}
        y1={1.868}
        x2={-0.661}
        y2={1.868}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.165} stopColor="#000d16" />
        <stop offset={0.736} stopColor="#003b62" />
        <stop offset={1} stopColor="#004d80" />
      </linearGradient>
      <clipPath id="dw">
        <rect className="c" width={47.899} height={102.997} />
      </clipPath>
      <clipPath id="dx">
        <path
          className="d"
          d="M82.225,396.417c-31.386,3.137-35.182-14.319-42.134,1.227s23.5,85.275,34.362,96.133c2.863,2.863,6.954-13.909,11.046-27.817s-1.228-27-5.319-36.407,6.138-33.545,2.046-33.135"
          transform="translate(-39.07 -391.101)"
        />
      </clipPath>
      <linearGradient
        id="dy"
        x1={-1.044}
        y1={1.093}
        x2={-1.014}
        y2={1.093}
        xlinkHref="#di"
      />
      <clipPath id="dz">
        <rect className="c" width={66.705} height={97.716} />
      </clipPath>
      <clipPath id="ea">
        <path
          className="d"
          d="M96.172,281.991c-10.42,7.5-43.363-24.136-40.908-18s22.908,36.817,27.817,71.588,35.59,27.409,38.453,15.135S106.4,274.628,96.172,281.991"
          transform="translate(-55.134 -263.196)"
        />
      </clipPath>
      <linearGradient
        id="eb"
        x1={-1.246}
        y1={2.967}
        x2={-1.223}
        y2={2.967}
        xlinkHref="#di"
      />
      <clipPath id="ec">
        <rect className="c" width={23.844} height={22.473} />
      </clipPath>
      <clipPath id="ed">
        <path
          className="d"
          d="M2.658,192.832c.606,17.28,26.385-12.272,23.623-15.648S2.044,175.343,2.658,192.832"
          transform="translate(-2.645 -175.741)"
        />
      </clipPath>
      <linearGradient
        id="ee"
        x1={-0.14}
        y1={13.101}
        x2={-0.079}
        y2={13.101}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#2bd6c6" />
        <stop offset={1} stopColor="#2dc7a9" />
      </linearGradient>
      <clipPath id="ef">
        <rect className="c" width={16.647} height={8.456} />
      </clipPath>
      <clipPath id="eg">
        <path
          className="d"
          d="M20.725,178.271c-4.124,4.757,2.148,5.829,11.965,4.91s-3.988-14.113-11.965-4.91"
          transform="translate(-19.439 -175.024)"
        />
      </clipPath>
      <linearGradient
        id="eh"
        x1={-1.136}
        y1={31.998}
        x2={-1.072}
        y2={31.998}
        xlinkHref="#ee"
      />
      <clipPath id="ei">
        <rect className="c" width={18.262} height={15.28} />
      </clipPath>
      <clipPath id="ej">
        <path
          className="d"
          d="M83.94,265.369c-4.267,7.68-13.807,7.056-8.591,11.658s18.408-.921,16.568-7.977-6.443-6.443-7.977-3.681"
          transform="translate(-73.829 -263.435)"
        />
      </clipPath>
      <linearGradient
        id="ek"
        x1={-5.03}
        y1={16.776}
        x2={-4.96}
        y2={16.776}
        xlinkHref="#ee"
      />
      <clipPath id="el">
        <rect className="c" width={41.75} height={62.3} />
      </clipPath>
      <clipPath id="em">
        <path
          className="d"
          d="M50.978,186.223c-34,0-40.192.305-40.192,11.044S36.252,247.891,46.069,248.5s2.762-13.806,4.3-32.521,3.681-29.759.614-29.759"
          transform="translate(-10.786 -186.223)"
        />
      </clipPath>
      <linearGradient
        id="en"
        x1={-0.397}
        y1={7.254}
        x2={-0.36}
        y2={7.254}
        xlinkHref="#di"
      />
      <clipPath id="eo">
        <rect className="c" width={15.515} height={24.186} />
      </clipPath>
      <clipPath id="ep">
        <path
          className="d"
          d="M63.03,344.613C50.477,378.086,75.3,352.9,74.995,343.078s-9.2-5.829-11.965,1.535"
          transform="translate(-59.483 -337.241)"
        />
      </clipPath>
      <linearGradient
        id="eq"
        x1={-3.614}
        y1={4.67}
        x2={-3.547}
        y2={4.67}
        xlinkHref="#ee"
      />
      <clipPath id="er">
        <rect className="c" width={8.193} height={9.007} />
      </clipPath>
      <clipPath id="es">
        <path
          className="d"
          d="M63.787,358.167c1.578,4.737,11.044-3.069,6.749-6.443s-8.284,1.841-6.749,6.443"
          transform="translate(-63.452 -350.645)"
        />
      </clipPath>
      <linearGradient
        id="et"
        x1={-8.277}
        y1={12.761}
        x2={-8.145}
        y2={12.761}
        xlinkHref="#ee"
      />
      <clipPath id="eu">
        <path
          className="c"
          d="M177.527.131a20.126,20.126,0,0,0-4.493,1.887c-16.438,8.7-59.409,44.269-70.982,77.879-12.88,37.432-8.579,80.378,17.185,103.7,19.454,17.6,28.071,21.557,34.823,27.985,0,.012,0,.012.013.012a42.941,42.941,0,0,1,6.284,7.6c8.581,12.883,28.443,50.591-2.463,96.951-3.295,4.948-4.465,1.027-5.985-2.893-1.31-3.373-2.88-6.745-6.285-4.473-7.366,4.9-10.428,23.311-14.732,24.538S117.3,345.981,113.107,364c-4.3,18.41-1.851,53.992-1.236,65.648S149.176,527.842,149.3,566.5c.31,97.255-59.663,163.3-70.2,185.645-.961,2.032-1.514,3.185-1.575,3.329.3-.144,5.072-2.656,10.853-4.9h.012c6.332-2.475,13.854-4.637,17.963-3.051,7.978,3.062,11.656,4.9,11.656,4.9s54.616-76.7,69.334-144.2-31.29-140.523-31.9-158.933,14.108-34.969,20.247-35.582,44.186-3.69,60.743-32.528,19.636-44.787,29.452-53.379,12.895-27,7.366-29.452c-2.586-1.149-5.308-.277-7.786.593-2.81.988-5.306,1.975-6.933.022-3.076-3.69-23.324-62.6-36.82-69.336-12.46-6.226-59.855-27.074-68.109-39.9l-.012-.012a7.1,7.1,0,0,1-1.213-3.051c-1.227-12.269.612-33.744,11.042-51.54s14.106-28.227,7.98-31.917-15.958-15.331-11.67-26.988S182.443,51.671,180.6,33.874C178.843,16.931,184.879,0,178.577,0a4.727,4.727,0,0,0-1.051.131"
          transform="translate(-77.525)"
        />
      </clipPath>
      <linearGradient
        id="ev"
        x1={-0.639}
        y1={1.013}
        x2={-0.631}
        y2={1.013}
        xlinkHref="#de"
      />
      <clipPath id="ew">
        <path
          className="c"
          d="M159.73,135.083c8.581,12.883,28.443,50.591-2.463,96.951-3.295,4.948-4.465,1.027-5.985-2.893-1.31-3.373-2.88-6.745-6.285-4.473-7.366,4.9-10.428,23.311-14.732,24.538s-13.592,12.666-17.784,30.689c-4.3,18.41-1.851,53.992-1.236,65.648s39.155,98.226,37.431,136.845c-4.9,109.834-59.663,163.3-70.2,185.645l9.278-1.575h.012l17.963-3.051S176.29,554.787,176.9,525.949,141.32,392.18,134.569,373.77s5.514-42.335,20.247-49.7S199,311.187,216.172,297.68s36.82-57.68,36.82-67.5-7.98-3.064-12.883-9.2-12.43-42.647-17.388-50.31c-15.743-24.337-45.406-36-69.275-43.18a42.941,42.941,0,0,1,6.284,7.6"
          transform="translate(-78.474 -127.488)"
        />
      </clipPath>
      <linearGradient
        id="ex"
        x1={0.09}
        y1={1.097}
        x2={0.093}
        y2={1.097}
        xlinkHref="#dc"
      />
      <clipPath id="ey">
        <path
          className="c"
          d="M166.852.131a20.126,20.126,0,0,0-4.493,1.887C156.411,6.873,119.136,38.6,99.97,84.812c-20.86,50.3,14.72,81.593,42.948,104.9a7.1,7.1,0,0,1-1.213-3.051c-1.227-12.269.612-33.744,11.042-51.54s14.106-28.227,7.98-31.917-15.958-15.331-11.67-26.988,22.712-24.549,20.873-42.347C168.169,16.931,174.205,0,167.9,0a4.727,4.727,0,0,0-1.051.131"
          transform="translate(-93.704)"
        />
      </clipPath>
      <linearGradient
        id="ez"
        x1={-1.322}
        y1={3.96}
        x2={-1.306}
        y2={3.96}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#052466" />
        <stop offset={0.221} stopColor="#0c3868" />
        <stop offset={0.674} stopColor="#1f6e6d" />
        <stop offset={1} stopColor="#2e9972" />
      </linearGradient>
      <clipPath id="fb">
        <rect className="c" width={108.38} height={248.514} />
      </clipPath>
      <clipPath id="fc">
        <path
          className="d"
          d="M161.783,133.17c47.861,61.668,49.7,85.6,23.93,106.77s-75.474,48.782-83.758,77.314,7.363,64.43,7.363,64.43-18.408-51.543,6.443-72.714,89.281-57.065,92.041-90.2-46.02-85.6-46.02-85.6"
          transform="translate(-99.536 -133.17)"
        />
      </clipPath>
      <linearGradient
        id="fd"
        x1={-1.299}
        y1={2.19}
        x2={-1.285}
        y2={2.19}
        xlinkHref="#di"
      />
      <clipPath id="fe">
        <rect className="c" width={51.285} height={183.115} />
      </clipPath>
      <clipPath id="ff">
        <path
          className="d"
          d="M155.455,1.216C65.764,84,120.988,176.047,120.988,176.047l9.2,8.284s-38.657-54.305-16.568-106.77S155.455,1.216,155.455,1.216"
          transform="translate(-104.17 -1.216)"
        />
      </clipPath>
      <linearGradient
        id="fg"
        x1={-1.499}
        y1={4.168}
        x2={-1.481}
        y2={4.168}
        xlinkHref="#di"
      />
      <clipPath id="fh">
        <rect className="c" width={119.766} height={104.938} />
      </clipPath>
      <clipPath id="fi">
        <path
          className="d"
          d="M101.366,234.442c-2.251,10.022,19.431,51.952,39.68,50.725s71.18-26.591,79.157-60.339-48.368-59.953-68.929-34.158c-22.5,28.226-46.657,29.29-49.907,43.771"
          transform="translate(-101.205 -180.256)"
        />
      </clipPath>
      <linearGradient
        id="fj"
        x1={-1.285}
        y1={3.963}
        x2={-1.272}
        y2={3.963}
        xlinkHref="#dv"
      />
      <clipPath id="fk">
        <rect className="c" width={36.447} height={102.186} />
      </clipPath>
      <clipPath id="fl">
        <path
          className="d"
          d="M133.4,262.108c-33.925-24.231-27.409-51.543-31.5-45.407s-4.5,83.86,4.908,98.179,12.682-24.544,19.227-34.363,13.09-14.317,7.364-18.408"
          transform="translate(-99.151 -215.826)"
        />
      </clipPath>
      <linearGradient
        id="fm"
        x1={-3.902}
        y1={3.476}
        x2={-3.862}
        y2={3.476}
        xlinkHref="#di"
      />
      <clipPath id="fn">
        <rect className="c" width={38.317} height={67.358} />
      </clipPath>
      <clipPath id="fo">
        <path
          className="d"
          d="M149.386,248.815c-11.842-9.21-29.044.818-34.362,15.545s-4.91,32.317,3.273,44.589,10.636-8.591,12.272-26.181,22.5-31.089,18.817-33.953"
          transform="translate(-111.504 -245.275)"
        />
      </clipPath>
      <linearGradient
        id="fp"
        x1={-4.226}
        y1={4.459}
        x2={-4.188}
        y2={4.459}
        xlinkHref="#dl"
      />
      <clipPath id="fq">
        <rect className="c" width={30.787} height={10.358} />
      </clipPath>
      <clipPath id="fr">
        <rect className="c" width={25.442} height={33.789} />
      </clipPath>
      <clipPath id="fs">
        <path
          className="d"
          d="M205.134,182.5c-14.186,11.032-20.045,3.681-20.045,8.181s-3.273,18-3.681,23.318,11.044-1.228,18-11.046,9.408-23.316,5.726-20.453"
          transform="translate(-181.398 -182.106)"
        />
      </clipPath>
      <linearGradient
        id="ft"
        x1={-10.809}
        y1={11.731}
        x2={-10.749}
        y2={11.731}
        xlinkHref="#dl"
      />
      <clipPath id="fu">
        <rect className="c" width={76.665} height={97.552} />
      </clipPath>
      <clipPath id="fv">
        <path
          className="d"
          d="M137.644,131.138c22.612,8.224,47.861,23.726,53.178,38.863s31.09,77.724-11.044,48.27c-28.671-20.041-34.05-31.241-38.863-52.362-7.363-32.317-25.771-42.953-3.271-34.772"
          transform="translate(-126.824 -128.499)"
        />
      </clipPath>
      <linearGradient
        id="fw"
        x1={-1.862}
        y1={4.468}
        x2={-1.847}
        y2={4.468}
        xlinkHref="#di"
      />
      <clipPath id="fx">
        <rect className="c" width={61.155} height={94.87} />
      </clipPath>
      <clipPath id="fy">
        <path
          className="d"
          d="M155.868,79.613C120.976,40.844,98.8,34.819,95.733,71.022s22.7,66.27,31.295,70.566,34.362-55.839,28.84-61.975"
          transform="translate(-95.481 -46.937)"
        />
      </clipPath>
      <linearGradient
        id="fz"
        x1={-2.265}
        y1={6.298}
        x2={-2.241}
        y2={6.298}
        xlinkHref="#dv"
      />
      <clipPath id="ga">
        <rect className="c" width={57.358} height={131.699} />
      </clipPath>
      <clipPath id="gb">
        <path
          className="d"
          d="M107.956,448.082c21.681,55.633,55.635-38.045,57.271-51.543s-20.455-80.589-29.862-58.09-6.954,51.543-17.182,80.587Z"
          transform="translate(-107.956 -333.873)"
        />
      </clipPath>
      <linearGradient
        id="gc"
        x1={-0.94}
        y1={1.204}
        x2={-0.928}
        y2={1.204}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#043352" />
        <stop offset={0.411} stopColor="#09394b" />
        <stop offset={1} stopColor="#174d39" />
      </linearGradient>
      <clipPath id="gd">
        <path
          className="c"
          d="M149.245,242.675c-.709,8.845,30.27-3.273,23.522-13.089a6.152,6.152,0,0,0-5.286-2.906c-7.632,0-17.912,11.955-18.236,16"
          transform="translate(-149.233 -226.68)"
        />
      </clipPath>
      <linearGradient
        id="ge"
        x1={-7.973}
        y1={15.671}
        x2={-7.919}
        y2={15.671}
        xlinkHref="#gc"
      />
      <clipPath id="gf">
        <path
          className="c"
          d="M94.819,77.189c-4.516,8.05,4.294,35.59,15.646,31.909,9.844-3.193-3.847-34.3-12.259-34.307-1.288,0-2.45.727-3.388,2.4"
          transform="translate(-93.612 -74.791)"
        />
      </clipPath>
      <linearGradient
        id="gg"
        x1={-5.068}
        y1={16.879}
        x2={-5.012}
        y2={16.879}
        xlinkHref="#gc"
      />
      <clipPath id="gi">
        <rect className="c" width={16.646} height={13.232} />
      </clipPath>
      <clipPath id="gj">
        <path
          className="d"
          d="M154.286,234.068c-4.493,11.681,17.59,3.273,15.953-2.453s-11.862-8.183-15.953,2.453"
          transform="translate(-153.682 -226.705)"
        />
      </clipPath>
      <linearGradient
        id="gk"
        x1={-11.375}
        y1={17.572}
        x2={-11.299}
        y2={17.572}
        xlinkHref="#dl"
      />
      <clipPath id="gl">
        <rect className="c" width={15.181} height={22.178} />
      </clipPath>
      <clipPath id="gm">
        <path
          className="d"
          d="M94.047,85.727c8.129,23.708,16.772,7.363,13.5-2.046s-18.41-12.272-13.5,2.046"
          transform="translate(-93.076 -75.803)"
        />
      </clipPath>
      <linearGradient
        id="gn"
        x1={-6.944}
        y1={16.931}
        x2={-6.867}
        y2={16.931}
        xlinkHref="#dl"
      />
      <clipPath id="go">
        <path
          className="c"
          d="M161.009,240.354s-8.591,2.249-9.407-.614,1.225-6.75,1.225-6.75c-12.068,9.819-1.022,10.431,8.183,7.364"
          transform="translate(-147.522 -232.99)"
        />
      </clipPath>
      <linearGradient
        id="gp"
        x1={-11.757}
        y1={36.234}
        x2={-11.675}
        y2={36.234}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#2a8e71" />
        <stop offset={0.397} stopColor="#2c9571" />
        <stop offset={1} stopColor="#2e9972" />
      </linearGradient>
      <clipPath id="gq">
        <path
          className="c"
          d="M107.343,99.608c-4.7,1.431-9-3.069-9-3.069s6.546,7.977,11.864,6.136,0-13.5,0-13.5,1.841,9-2.865,10.433"
          transform="translate(-98.344 -89.175)"
        />
      </clipPath>
      <linearGradient
        id="gr"
        x1={-9.5}
        y1={40.249}
        x2={-9.403}
        y2={40.249}
        xlinkHref="#gp"
      />
      <clipPath id="gs">
        <path
          className="c"
          d="M137.215,269.1c-6.958.408-34.367,22.916-33.14,27.819s18.408,42.959,12.267,48.679-18,3.69-18,9,1.407,45.555,36,74.046c3.13,2.573,5.1,2.166,7.363,1.761,2.768-.5,5.972-.992,12.274,3.958,11.452,9,18.408,21.691,22.506,48.271s-6.956,49.917-20.873,64.637S118.8,577.54,118.8,577.54l13.856,2.367,24.393,4.181S192.046,560.2,205.48,529.87c.7-1.55,1.321-3.114,1.887-4.687,0,0,35.593-73.026,29.452-93.885s-25.163-12.883-35.592-27.615,1.837-46.023,9.2-49.087a.235.235,0,0,0,.06.046c.252.193,1.2.939,2.729,2.008a.057.057,0,0,1,.035.023,102.461,102.461,0,0,0,17,9.648,67.129,67.129,0,0,0,18.832,5.457c20.247,2.451,36.612-1.635,37.431-3.678s3.268-10.237.817-12.281-22.495-.817-29.451-20.86-26.594-33.947-38.863-34.777c-6.134-.408-14.521.617-21.934,1.642s-13.859,2.048-16.111,1.638c-4.468-.812-36.435-34.373-43.638-34.37-.042,0-.085,0-.126,0"
          transform="translate(-98.34 -269.094)"
        />
      </clipPath>
      <linearGradient
        id="gt"
        x1={-0.769}
        y1={1}
        x2={-0.761}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#052466" />
        <stop offset={0.149} stopColor="#092b62" />
        <stop offset={0.379} stopColor="#164157" />
        <stop offset={0.662} stopColor="#2a6546" />
        <stop offset={0.984} stopColor="#47962f" />
        <stop offset={1} stopColor="#49992e" />
      </linearGradient>
      <clipPath id="gu">
        <path
          className="c"
          d="M137.215,269.1c-6.958.408-34.367,22.916-33.14,27.819s18.408,42.959,12.267,48.679-18,3.69-18,9,1.407,45.555,36,74.046c3.13,2.573,5.1,2.166,7.363,1.761,2.768-.5,5.972-.992,12.274,3.958,11.452,9,18.408,21.691,22.506,48.271s-6.956,49.917-20.873,64.637S118.8,577.54,118.8,577.54l13.856,2.367,1.681.1s46.227-33.143,47.864-82.231-24.538-67.5-45.821-83.862-22.9-51.13-21.676-53.175,30.677-7.774,19.633-33.958-16.354-27-10.634-34.355,20.043-13.915,42.959,13.494,39.68,44.186,43.764,48.68a.235.235,0,0,0,.06.046,17.119,17.119,0,0,0,2.729,2.008.057.057,0,0,1,.035.023c3.509,2.247,9.759,5.744,17,9.648a67.129,67.129,0,0,0,18.832,5.457c20.247,2.451,36.612-1.635,37.431-3.678s3.268-10.237.817-12.281c-38.453,6.139-76.5-18.818-106.358-52.357-4.468-.812-36.435-34.373-43.638-34.37-.042,0-.085,0-.126,0"
          transform="translate(-98.34 -269.094)"
        />
      </clipPath>
      <linearGradient
        id="gv"
        x1={-0.221}
        y1={1.061}
        x2={-0.216}
        y2={1.061}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#0a6944" />
        <stop offset={0.274} stopColor="#0d6b42" />
        <stop offset={0.513} stopColor="#18733f" />
        <stop offset={0.74} stopColor="#2a8138" />
        <stop offset={0.958} stopColor="#439430" />
        <stop offset={1} stopColor="#49992e" />
      </linearGradient>
      <clipPath id="gx">
        <rect className="c" width={61.557} height={209.016} />
      </clipPath>
      <clipPath id="gy">
        <path
          className="d"
          d="M184.267,504.609q-.846,2.36-1.887,4.685c10.372-30.558,9.409-76.821,3.114-89.98-6.754-14.106-9.2-6.754-40.5-34.367s10.43-84.669,10.43-84.669,4.113,3.905,4.088,3.881c-7.366,3.065-35.588,30.68-16.362,74.453,7.26,16.526,43.361,26.181,50.315,49.907,6.118,20.868-9.2,76.089-9.2,76.089"
          transform="translate(-133.354 -300.279)"
        />
      </clipPath>
      <linearGradient
        id="gz"
        x1={-1.839}
        y1={1.252}
        x2={-1.823}
        y2={1.252}
        xlinkHref="#di"
      />
      <clipPath id="ha">
        <rect className="c" width={60.211} height={36.373} />
      </clipPath>
      <clipPath id="hb">
        <path
          className="d"
          d="M153.81,294.757c16.568,29.454,64.43,40.5,59.52,23.93s-30.066-27.612-36.2-28.226-26.514-1.389-23.318,4.3"
          transform="translate(-153.472 -290.039)"
        />
      </clipPath>
      <linearGradient
        id="hc"
        x1={-3.614}
        y1={5.856}
        x2={-3.59}
        y2={5.856}
        xlinkHref="#di"
      />
      <clipPath id="hd">
        <rect className="c" width={31.042} height={52.817} />
      </clipPath>
      <clipPath id="he">
        <path
          className="d"
          d="M118.079,289.372c-6.546-6.546-15.545-4.91-15.545-1.637s12.216,31.524,13.09,43.771c.2,2.863,13.527,8.292,15.341,5.318,10.226-16.772-12.886-47.452-12.886-47.452"
          transform="translate(-102.534 -284.872)"
        />
      </clipPath>
      <linearGradient
        id="hf"
        x1={-4.402}
        y1={5.167}
        x2={-4.359}
        y2={5.167}
        xlinkHref="#dl"
      />
      <clipPath id="hg">
        <rect className="c" width={31.234} height={13.841} />
      </clipPath>
      <clipPath id="hh">
        <rect className="c" width={56.656} height={80.179} />
      </clipPath>
      <clipPath id="hi">
        <path
          className="d"
          d="M131.74,283.516c17.8,45.612-24.134,62.179,45.817,80.179,0,0,4.7-17.8,10.838-18.614,0,0-20.241-19.159-35.587-40.7-10.637-14.931-21.069-20.863-21.069-20.863"
          transform="translate(-131.74 -283.516)"
        />
      </clipPath>
      <linearGradient
        id="hj"
        x1={-2.408}
        y1={3.68}
        x2={-2.387}
        y2={3.68}
        xlinkHref="#di"
      />
      <clipPath id="hk">
        <rect className="c" width={70.048} height={104.823} />
      </clipPath>
      <clipPath id="hl">
        <path
          className="d"
          d="M205.964,364.082C157.691,387.4,137.238,373.7,140.1,378.605c5.2,8.915,14.523,22.294,15.545,62.383,1.129,44.236,16.933,29.87,34.772-4.091,21.271-40.5,22.8-76.32,15.545-72.815"
          transform="translate(-139.839 -363.845)"
        />
      </clipPath>
      <linearGradient
        id="hm"
        x1={-3.02}
        y1={1.321}
        x2={-2.999}
        y2={1.321}
        xlinkHref="#di"
      />
      <clipPath id="hn">
        <rect className="c" width={30.747} height={17.644} />
      </clipPath>
      <clipPath id="ho">
        <path
          className="d"
          d="M139.414,366.745c-14.113-8.591-23.011,1.227-17.182,1.227s10.739-1.534,16.261,3.067,14.42,13.5,12.375,8.183a23.8,23.8,0,0,0-11.454-12.476"
          transform="translate(-120.42 -363.221)"
        />
      </clipPath>
      <linearGradient
        id="hp"
        x1={-5.364}
        y1={6.354}
        x2={-5.319}
        y2={6.354}
        xlinkHref="#dl"
      />
      <clipPath id="hq">
        <rect className="c" width={71.686} height={30.374} />
      </clipPath>
      <clipPath id="hr">
        <path
          className="d"
          d="M117.007,459.293c15.339,1.841,35.9-23.011,31.6-13.5s-11.044,28.227,4.91,19.329,28.84-24.544,28.84-24.544-20.239,23.318-33.437,30.373L110.67,464.4Z"
          transform="translate(-110.67 -440.578)"
        />
      </clipPath>
      <linearGradient
        id="hs"
        x1={-2.562}
        y1={1.016}
        x2={-2.539}
        y2={1.016}
        xlinkHref="#di"
      />
      <clipPath id="ht">
        <rect className="c" width={85.436} height={28.11} />
      </clipPath>
      <clipPath id="hu">
        <path
          className="d"
          d="M123.272,358.122C156.155,387.352,178.8,380.214,191.69,375s18.408-8.591,14.727-11.044-13.193-5.524-18.408-8.9-75.782-6.75-64.737,3.067"
          transform="translate(-122.1 -351.641)"
        />
      </clipPath>
      <linearGradient
        id="hv"
        x1={-1.97}
        y1={4.739}
        x2={-1.953}
        y2={4.739}
        xlinkHref="#dp"
      />
      <clipPath id="hw">
        <rect className="c" width={68.407} height={28.088} />
      </clipPath>
      <clipPath id="hx">
        <path
          className="d"
          d="M237.79,327.766c-22.573-2.508-41.112-3.374-57.065-11.965s-12.274,15.034,8.284,22.4,46.634,2.455,48.168-.92,3.376-9.2.614-9.512"
          transform="translate(-170.808 -313.946)"
        />
      </clipPath>
      <linearGradient
        id="hy"
        x1={-3.661}
        y1={6.545}
        x2={-3.639}
        y2={6.545}
        xlinkHref="#di"
      />
      <clipPath id="hz">
        <rect className="c" width={65.331} height={129.48} />
      </clipPath>
      <clipPath id="ia">
        <path
          className="d"
          d="M188.7,380.309c-29.135,84.76-59.316,119.041-54.407,124.358s40.908-22.5,57.27-72.407,1.637-65.042-2.863-51.952"
          transform="translate(-133.764 -375.834)"
        />
      </clipPath>
      <linearGradient
        id="ib"
        x1={-2.771}
        y1={1.052}
        x2={-2.75}
        y2={1.052}
        xlinkHref="#dv"
      />
      <clipPath id="ic">
        <path
          className="c"
          d="M111.312,332.766c-2.058,16.465,4.908,14.113,5.522,5.52.39-5.464-1.7-8.2-3.437-8.2-.991,0-1.862.893-2.085,2.679"
          transform="translate(-110.933 -330.087)"
        />
      </clipPath>
      <linearGradient
        id="id"
        x1={-22.891}
        y1={11.354}
        x2={-22.682}
        y2={11.354}
        xlinkHref="#gp"
      />
      <clipPath id="ie">
        <path
          className="c"
          d="M115.264,330.382c.742,4.7,7.057,5.215,6.136.614-.513-2.564-2.646-4.272-4.274-4.272-1.295,0-2.269,1.077-1.862,3.658"
          transform="translate(-115.171 -326.724)"
        />
      </clipPath>
      <linearGradient
        id="if"
        x1={-25.569}
        y1={25.141}
        x2={-25.346}
        y2={25.141}
        xlinkHref="#gp"
      />
      <clipPath id="ig">
        <path
          className="c"
          d="M154.069,386.492c-.735,12.493,5.831,15.646,8.591,3.681,1.559-6.755-1.185-10.382-3.98-10.382-2.158,0-4.344,2.158-4.611,6.7"
          transform="translate(-154.012 -379.792)"
        />
      </clipPath>
      <linearGradient
        id="ih"
        x1={-23.422}
        y1={6.039}
        x2={-23.27}
        y2={6.039}
        xlinkHref="#gp"
      />
      <clipPath id="ii">
        <rect className="c" width={180.289} height={731.061} />
      </clipPath>
      <clipPath id="ij">
        <path
          className="c"
          d="M99.344,88.206c-2.256,4.2-4.456,8.646-6.694,12.931-4.256,8.171-8.618,15.751-13.722,19.893-1.857,1.513-5.532,5.512-10.179,10.979C53.97,149.417,29.42,181.725,22.765,196.151,14.014,215.12,8.9,278.578,2.339,288.786.643,291.425.019,296.791,0,303.517v.637c.053,19.316,4.865,49.2,3.8,58.3C2.339,374.85,8.9,379.23,16.2,379.23s18.969,14.589,31.366,10.942,55.669-36.879,65.887-31.041.483,20.1,7.778,24.47a.072.072,0,0,0,.039.02c2.865,1.837,6.818,17.654,10.244,37.231a.078.078,0,0,0,.01.047c5.305,30.443,9.294,69.954,5.752,80.132-5.838,16.778-5.105,3.646-8.751,18.236-.124.5-.257.97-.381,1.39h-.009c-.592,1.932-1.247,3.056-1.972,3.5-3.695,2.3-9.084-12.808-17.331-24.587-6.78-9.694-19.044-24.538-29.509-33.624C74.043,461.361,69.225,458.238,65.8,458c-10.209-.723-20.426,21.883-30.633,30.633S21.308,520.724,16.2,537.5s12.4,42.308,10.217,48.868-13.865,23.341-1.467,28.444,37.929,35.014,35.014,74.4l13.856,5.1a263.5,263.5,0,0,0,.837-28.939c-.381-12.988-2-27.3-6.665-35.976-10.219-18.959-8.028-39.385-3.648-49.592s-2.923-16.778-5.114-23.339c-.543-1.639,2.247-5.767.943-10.932-2.4-9.5-10.6-42.5-2.4-43.047,10.942-.723,56.894,39.389,66.377,42.3S157.7,532.4,157.7,526.561c0-5.3,0-12.369,4.885-17.456l.009-.009a16.079,16.079,0,0,1,1.666-1.5c4.744-3.683,4.542-23.339,1.039-40.851v-.009a90.857,90.857,0,0,0-5.409-18.227c-8.027-18.226-5.1-51.782-19.692-76.579s-25.673-44.708-36.471-47.413c-8.751-2.189-15.322-2.913-12.4,2.925,2.352,4.7-1.467,10.35-7.237,13.512l-.011.009a20.347,20.347,0,0,1-4.426,1.79,35.4,35.4,0,0,1-12.971.334h-.009c-3.238-.441-8.614.662-14.1,1.763-8.736,1.753-17.753,3.506-18.869-.962-2.913-11.673,4.539-4.535,4.539-10.373,0-4.456-6.907-47.144-5.469-66.094a71.121,71.121,0,0,1,1.592-10.846v-.019a40.935,40.935,0,0,1,1.523-4.971c7.294-18.969,51.059-65.647,53.248-83.15s6.562-29.91,13.132-50.325c5.364-16.7,3.415-32.422-.263-32.424-.822,0-1.729.782-2.66,2.513"
          transform="translate(0 -85.693)"
        />
      </clipPath>
      <linearGradient
        id="ik"
        y1={1}
        x2={0.008}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#362f14" />
        <stop offset={0.199} stopColor="#40431a" />
        <stop offset={0.465} stopColor="#4a5720" />
        <stop offset={0.733} stopColor="#506324" />
        <stop offset={1} stopColor="#536726" />
      </linearGradient>
      <clipPath id="il">
        <path
          className="c"
          d="M36.133,412.4c-3.409,32.091,2.673,26.258,9.967,41.818S29.323,475.61,41,504.787c10.437,26.1,15.817,21.855,18.579,48.859-.381-12.988-2-27.3-6.665-35.976-10.219-18.959-8.028-39.385-3.648-49.592S46.34,451.3,44.15,444.739c-.543-1.639,2.319-3.465,1.706-8.756-1.279-11.052-7.3-29.992-7.3-44.008,0-15.912,2.4-50,25.683-37.757-5.277-4.589-10.094-7.713-13.522-7.951-20.912,7.78-11.19,34.042-14.588,66.133"
          transform="translate(-35.16 -346.267)"
        />
      </clipPath>
      <linearGradient
        id="im"
        x1={-1.271}
        y1={1.137}
        x2={-1.231}
        y2={1.137}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#5d7f2f" />
        <stop offset={0.345} stopColor="#648631" />
        <stop offset={1} stopColor="#6f9136" />
      </linearGradient>
      <clipPath id="in">
        <path
          className="c"
          d="M127.556,379.237c-1.952,10.209-11.935.02-15.075,15.074-7.944,38.087-27.394,35.17-27.394,35.17-.59,1.935,4.938,1.823,4.215,2.27,18,.694,22.312-32.612,32.9-35.5,1.343-.363,2.648-.657,3.915-.924l.009-.009a16.079,16.079,0,0,1,1.666-1.5c4.744-3.683,4.542-23.339,1.039-40.851v-.009c-.792-1.23-1.276-1.933-1.276-1.933s1.942,17.987,0,28.2"
          transform="translate(-85.042 -351.033)"
        />
      </clipPath>
      <linearGradient
        id="io"
        x1={-2.518}
        y1={2.819}
        x2={-2.488}
        y2={2.819}
        xlinkHref="#im"
      />
      <clipPath id="ip">
        <path
          className="c"
          d="M71.207,284.775c-3.563,4.4-38.686,29.546-43.762,28.852,14.912,10.049,58.218-41.834,65.969-45.71,8.75-4.371,14.1,5.352,15.56,33.558.114,2.123.284,4.408.524,6.818,2.865,1.837,6.818,17.654,10.244,37.231-1.552-17.721-2.989-36.633-2.989-46,0-13.376-1.795-38.154-15.217-38.156-6.751,0-16.443,6.268-30.329,23.408"
          transform="translate(-27.445 -261.367)"
        />
      </clipPath>
      <linearGradient
        id="iq"
        x1={-0.425}
        y1={4.249}
        x2={-0.409}
        y2={4.249}
        xlinkHref="#im"
      />
      <clipPath id="is">
        <rect className="c" width={71.996} height={163.227} />
      </clipPath>
      <clipPath id="it">
        <path
          className="c"
          d="M71.1,116.4c-1.857,1.513-5.532,5.512-10.179,10.979-3.076,8.876-5.247,17.78-5.381,25.492-.494,28.194-29.176,52.031-35.014,60.781s.972,17.987,4.381,49.106l.037.039a71.121,71.121,0,0,1,1.592-10.846v-.019c-.743-3.113-1.486-6.4-2.125-9.589-2.428-12.16,2.438-19.94,16.055-36.471s10.695-34.042,24.311-57.382,17.015-33.062,19.444-47.65c.257-1.543.457-2.99.6-4.334-4.256,8.171-8.618,15.751-13.722,19.893"
          transform="translate(-18.249 -96.502)"
        />
      </clipPath>
      <linearGradient
        id="iu"
        x1={-0.321}
        y1={3.567}
        x2={-0.301}
        y2={3.567}
        xlinkHref="#im"
      />
      <clipPath id="iw">
        <rect className="c" width={77.8} height={76.23} />
      </clipPath>
      <clipPath id="ix">
        <path
          className="c"
          d="M94.043.159a3.9,3.9,0,0,0-.81.553c-3.189,2.695-7.455,7.818-12.34,14.512C72.969,26.1,63.418,41.153,54.276,56.789c-3.646,6.247-7.228,12.579-10.617,18.779-9.742,17.817,11.772,42.318,8.24,52.545-9.723,28.2-49.11,57.38-42.3,62.238,5.647,4.028-5.334,41.128-2.92,45.71,6.952,13.195,34.04,21.393,27.23,28.2s3.895,22.368,15.56,21.4,28.206,7.78,49.6,35.005,29.167,69.046,29.167,75.855,0,49.6-13.608,52.517c-.316.067-.629.143-.924.237-12.646,3.666-11.77,24.188-13.665,28.939-.181.447-.543,1.286-1.076,2.466C93.7,492.5,72.806,538.87,72.806,571.571c0,35.984,7.78,62.238,16.531,66.133s7.78,29.176,3.895,42.792-11.913,5.344-15.56,46.194c0,0,14.588-10.217,24.064-10.217,0,0,6.361-9.657,12.8-21.206,4.884-8.781,9.807-18.646,12.008-26.2,5.1-17.511-1.466-31.366-6.571-41.575s-8.017-39.395-14.588-40.118c-2.875-.314-5.189-.353-6.941-1.039-2.257-.866-3.591-2.79-4-7.713-.724-8.75,10.94-62.733,21.882-71.485s48.145-45.946,57.619-51.049c2.878-1.552,3.8-7.9,3.611-16.331v-.029c-.457-19.387-6.894-49.688-9.439-57.315-3.646-10.932-31.365-59.8-35.013-66.372s-11.666-36.471-16.045-37.929c-1.75-.58-4.083-.229-6.4.123s-4.588.7-6.241.126h-.01c-7.291,1.619-7.505-8.713-24.309-10.7-53.488-6.321-31.9-64.547-28.2-70.021,12.158-17.99,18.964-10,16.651-32.464v-.02c-.039-.351-.076-.7-.114-1.066-2.247-21.473.876-44.6-1.276-53.458a8.883,8.883,0,0,0-.676-1.972c-3.4-6.808,1.457-30.147,14.1-40.365S101.5,35.24,96.632,28.432C92.217,22.245,98.236,0,94.633,0a1.365,1.365,0,0,0-.59.159"
          transform="translate(-6.325)"
        />
      </clipPath>
      <linearGradient
        id="iy"
        x1={-0.031}
        y1={1.006}
        x2={-0.023}
        y2={1.006}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#1f4519" />
        <stop offset={0.152} stopColor="#38551f" />
        <stop offset={0.363} stopColor="#536626" />
        <stop offset={0.576} stopColor="#67732b" />
        <stop offset={0.788} stopColor="#747b2e" />
        <stop offset={1} stopColor="#787e2f" />
      </linearGradient>
      <clipPath id="ja">
        <rect className="c" width={32.731} height={136.75} />
      </clipPath>
      <clipPath id="jb">
        <path
          className="c"
          d="M75.989,343.382c-.181.447-.543,1.286-1.076,2.466-.724,5.019-2.247,14.789-5.247,31.578C64.8,404.648,59.944,438.2,63.83,449.387s11.673,9.236,17.015,9.236,0,19.94-.972,27.72S86.2,503.358,93.492,509.2c7.075,5.667,6.371,21.855-3.009,51.241,4.884-8.781,9.807-18.646,12.008-26.2,5.1-17.511-1.466-31.366-6.571-41.575S87.9,453.27,81.331,452.547c-2.875-.314-5.189-.353-6.941-1.039a8.233,8.233,0,0,1-5.209-2.609c-5.837-6.322-6.33-26.094-3.892-39.712s18.48-38.086,20.423-48.3-2.913-23.339-1.456-35a18.513,18.513,0,0,1,5.4-11.437c-12.646,3.666-11.77,24.188-13.665,28.939"
          transform="translate(-62.418 -314.443)"
        />
      </clipPath>
      <linearGradient
        id="jc"
        x1={-1.82}
        y1={1.146}
        x2={-1.79}
        y2={1.146}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#5d7f2f" />
        <stop offset={0.18} stopColor="#648631" />
        <stop offset={0.522} stopColor="#6f9136" />
        <stop offset={0.626} stopColor="#749b39" />
        <stop offset={0.813} stopColor="#7aa73d" />
        <stop offset={1} stopColor="#7cab3f" />
      </linearGradient>
      <clipPath id="jd">
        <path
          className="c"
          d="M27.927,199.559c7.263,6.227,15.034,2.535,24.025-1.157,7.863-3.229,16.66-6.458,26.868-3.056,39.492,13.165,15.882,8.6,21.719,22.692s44.087,39.548,51.385,80.718c1.445,8.147,14.835,35.614,17.7,61.685-.457-19.387-6.894-49.688-9.439-57.315-3.646-10.932-31.365-59.8-35.013-66.372s-11.666-36.471-16.045-37.929c-1.75-.58-4.083-.229-6.4.123s-4.588.7-6.241.126h-.01c-3.446.534-5.332-.647-10.693-6.322-3.718-3.935-11.445-3.058-20.955-2.18-11.638,1.072-25.95,2.146-38.856-5.6a.347.347,0,0,0-.18-.056c-1.466,0-1.706,11.359,2.126,14.642"
          transform="translate(-24.812 -184.917)"
        />
      </clipPath>
      <linearGradient
        id="je"
        x1={-0.239}
        y1={2.66}
        x2={-0.229}
        y2={2.66}
        xlinkHref="#jc"
      />
      <clipPath id="jf">
        <path
          className="c"
          d="M82.053.664C78.864,3.359,74.6,8.482,69.713,15.176a26.476,26.476,0,0,0,1.637,7.371c5.352,13.616.486,18.481-13.608,27.719-5.371,3.523-10.456,4.714-14.645,6.475-5.875,2.468-9.98,6.067-10.617,18.779-.1,2.027-.114,4.3-.03,6.837.886,27.148,18.884,55.107,24.921,82.758-.039-.351-.076-.7-.114-1.066-2.247-21.473.876-44.6-1.276-53.458-13.959-15.968-16.6-43.019-12.343-49.629,4.371-6.807,29.179-10.21,35.493-21.4S71.836,15.253,80.6,4.073A14.038,14.038,0,0,0,82.864.111a3.9,3.9,0,0,0-.81.553"
          transform="translate(-32.396 -0.111)"
        />
      </clipPath>
      <linearGradient
        id="jg"
        x1={-0.871}
        y1={4.43}
        x2={-0.844}
        y2={4.43}
        xlinkHref="#jc"
      />
      <clipPath id="ji">
        <rect className="c" width={51.007} height={82.832} />
      </clipPath>
      <clipPath id="jj">
        <rect className="c" width={44.586} height={40.236} />
      </clipPath>
      <clipPath id="jk">
        <path
          className="c"
          d="M24.83,263.378c-8.266,1.459-15.56-.487-22.126,28.93a13.589,13.589,0,0,0,3.163,10.943c4.376,4.862,8.266,3.4,8.266,3.4-14.588-16.531-2.432-28.2,3.889-36.954,3.871-5.357,8.653-5.249,12.708-5.139,2.569.069,4.846.139,6.42-1.182,4.052-3.4-1.136-14.1-1.136-14.1s-2.918,12.643-11.183,14.1"
          transform="translate(-2.549 -249.276)"
        />
      </clipPath>
      <linearGradient
        id="jl"
        x1={-0.015}
        y1={6.372}
        x2={0.019}
        y2={6.372}
        xlinkHref="#im"
      />
      <clipPath id="jn">
        <rect className="c" width={27.54} height={55.256} />
      </clipPath>
      <clipPath id="jo">
        <rect className="c" width={54.826} height={67.955} />
      </clipPath>
      <clipPath id="jp">
        <rect className="c" width={65.29} height={38.137} />
      </clipPath>
      <clipPath id="jq">
        <rect className="c" width={40.649} height={42.029} />
      </clipPath>
      <clipPath id="jr">
        <rect className="c" width={33.569} height={20.23} />
      </clipPath>
      <clipPath id="js">
        <rect className="c" width={114.961} height={177.906} />
      </clipPath>
      <clipPath id="jt">
        <rect className="c" width={55.1} height={39.638} />
      </clipPath>
      <clipPath id="ju">
        <rect className="c" width={70.81} height={118.248} />
      </clipPath>
      <clipPath id="jv">
        <rect className="c" width={92.63} height={52.098} />
      </clipPath>
      <clipPath id="jw">
        <rect className="c" width={90.976} height={128.423} />
      </clipPath>
      <clipPath id="jx">
        <path
          className="c"
          d="M21.35,34.512C21.239,50.3,52.582,51.193,62.256,73.739c9.39,21.853,12.371,51.662,12.555,53.5a.126.126,0,0,1-.006.07l.011.023S79.834,107.87,79.851,88.3V88.1C79.835,71.059,76,53.988,61.747,49.649,22.654,37.745,29.182,1.653,29.5,0c-.481,1.133-8.036,19.217-8.15,34.512"
          transform="translate(-21.35)"
        />
      </clipPath>
      <linearGradient
        id="jy"
        x1={0.058}
        y1={1.158}
        x2={0.069}
        y2={1.158}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#006d61" />
        <stop offset={0.103} stopColor="#18814c" />
        <stop offset={0.27} stopColor="#399d31" />
        <stop offset={0.441} stopColor="#53b31b" />
        <stop offset={0.617} stopColor="#66c20c" />
        <stop offset={0.8} stopColor="#71cb02" />
        <stop offset={1} stopColor="#75cf00" />
      </linearGradient>
      <clipPath id="jz">
        <path
          className="c"
          d="M.021,43.662,0,43.673s37.107-.627,76.026,62.766l.009.023,4.311.669s-.9-40.7-23.519-56.622C44.26,41.676,31.447,38.325,20.693,38.325c-8.6,0-15.883,2.142-20.671,5.337"
          transform="translate(0 -38.325)"
        />
      </clipPath>
      <linearGradient
        id="ka"
        x1={0.063}
        y1={0.861}
        x2={0.08}
        y2={0.861}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#006d61" />
        <stop offset={0.022} stopColor="#036f5c" />
        <stop offset={0.204} stopColor="#1a823b" />
        <stop offset={0.391} stopColor="#2c9121" />
        <stop offset={0.582} stopColor="#389b0e" />
        <stop offset={0.781} stopColor="#40a103" />
        <stop offset={1} stopColor="#43a400" />
      </linearGradient>
      <clipPath id="kc">
        <rect className="c" width={76.025} height={63.056} />
      </clipPath>
      <clipPath id="kd">
        <path
          className="c"
          d="M0,41.941s37.107-.627,76.025,62.766C75.54,103.5,56.532,64.993,32.385,52.12,8.445,39.338.535,41.783.023,41.93Z"
          transform="translate(0 -41.65)"
        />
      </clipPath>
      <linearGradient
        id="ke"
        x1={0.064}
        y1={0.87}
        x2={0.082}
        y2={0.87}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#ecd1de" />
        <stop offset={0.137} stopColor="#e8c5e0" />
        <stop offset={0.38} stopColor="#dda7e6" />
        <stop offset={0.7} stopColor="#cc76ef" />
        <stop offset={1} stopColor="#ba42fa" />
      </linearGradient>
      <clipPath id="kf">
        <rect className="c" width={53.525} height={127.237} />
      </clipPath>
      <clipPath id="kg">
        <path
          className="c"
          d="M21.35,34.512C21.239,50.3,52.582,51.193,62.256,73.739c9.388,21.853,12.371,51.662,12.556,53.5.824-10-6.7-56.312-16.528-65.917-11.648-11.384-22.67-8.313-31.06-19.853C19.064,30.21,29.013,1.352,29.5,0c-.484,1.133-8.037,19.217-8.151,34.512"
          transform="translate(-21.35)"
        />
      </clipPath>
      <linearGradient
        id="kh"
        x1={0.079}
        y1={1.172}
        x2={0.09}
        y2={1.172}
        xlinkHref="#ke"
      />
      <clipPath id="ki">
        <path
          className="c"
          d="M5.341,78.737h.023c1.057-.2,21.319-3.949,38.792.126C60.413,82.673,66.175,92.329,67.116,94.1c.091.184.138.287.138.287l.665-.7c-2.467-6.233-1.6-22.317-21.284-27.425a29.871,29.871,0,0,0-7.546-.934C22.155,65.326,6,78.2,5.341,78.737"
          transform="translate(-5.341 -65.324)"
        />
      </clipPath>
      <linearGradient
        id="kj"
        x1={-0.13}
        y1={1}
        x2={-0.106}
        y2={1}
        xlinkHref="#ka"
      />
      <clipPath id="kl">
        <rect className="c" width={61.753} height={18.862} />
      </clipPath>
      <clipPath id="km">
        <path
          className="c"
          d="M67.109,90.7c-.942-1.767-6.7-11.423-22.961-15.234-17.473-4.076-37.736-.322-38.792-.126a75.434,75.434,0,0,1,36.509-2.195c17.76,3.57,24.257,15.477,25.244,17.555"
          transform="translate(-5.356 -71.84)"
        />
      </clipPath>
      <linearGradient
        id="kn"
        x1={-0.132}
        y1={1.013}
        x2={-0.107}
        y2={1.013}
        xlinkHref="#ke"
      />
      <clipPath id="ko">
        <rect className="c" width={81.098} height={82.711} />
      </clipPath>
      <clipPath id="kp">
        <path
          className="c"
          d="M37.29,33.915C27.025,52.119,17.9,62.706,13.332,67.437c-1.792,1.845-2.869,2.8-3.083,3,8.069-4.863,37.69-5.86,48.167-27.123,6.04-12.232,7.356-22.317,7.383-28.679v-.426a31.552,31.552,0,0,0-.658-6.937c-6.087,9.071-13.1.543-27.851,26.647"
          transform="translate(-10.249 -7.268)"
        />
      </clipPath>
      <linearGradient
        id="kq"
        x1={-0.46}
        y1={1.023}
        x2={-0.415}
        y2={1.023}
        xlinkHref="#jy"
      />
      <clipPath id="kr">
        <path
          className="c"
          d="M24,0S10.213,7.638,6.689,28.469s13.847,35.606,5.317,52.422c.017,0,.017,0,.037-.022.287-.174,1.366-.89,2.946-2.061.037-.042.077-.065.117-.107,7.3-5.424,24.439-20.333,18.66-36.3C26.468,22.307,24,0,24,0Z"
          transform="translate(-6.21)"
        />
      </clipPath>
      <linearGradient
        id="ks"
        x1={-0.342}
        y1={1.022}
        x2={-0.273}
        y2={1.022}
        xlinkHref="#jy"
      />
      <clipPath id="ku">
        <rect className="c" width={17.792} height={80.89} />
      </clipPath>
      <clipPath id="kv">
        <path
          className="c"
          d="M8.267,32.64c.4,18.573,9.288,23.738,10,34.153.441,6.336-.543,9.584-3.163,11.905-.037.045-.077.067-.115.11a15.309,15.309,0,0,1-2.946,2.061c-.02.022-.02.022-.04.022C20.536,64.075,3.164,49.3,6.689,28.467S24,0,24,0,7.86,14.044,8.267,32.64"
          transform="translate(-6.21)"
        />
      </clipPath>
      <linearGradient
        id="kw"
        x1={-0.597}
        y1={1.023}
        x2={-0.477}
        y2={1.023}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#faf4fa" />
        <stop offset={0.293} stopColor="#e1c1c7" />
        <stop offset={0.616} stopColor="#c89096" />
        <stop offset={0.862} stopColor="#b97177" />
        <stop offset={1} stopColor="#b4666c" />
      </linearGradient>
      <clipPath id="kx">
        <rect className="c" width={55.549} height={63.163} />
      </clipPath>
      <clipPath id="ky">
        <path
          className="c"
          d="M58.417,43.31C47.94,64.573,18.319,65.573,10.25,70.431c.212-.194,1.289-1.149,3.081-2.994.788-.087,22.5-2.278,37.62-18.334C66.416,32.7,65.137,7.268,65.137,7.268s3.774,14.777-6.72,36.042"
          transform="translate(-10.25 -7.268)"
        />
      </clipPath>
      <linearGradient
        id="kz"
        x1={-0.436}
        y1={1.022}
        x2={-0.393}
        y2={1.022}
        xlinkHref="#kw"
      />
      <clipPath id="la">
        <path
          className="c"
          d="M0,35.036v.279a31.265,31.265,0,0,0,.2,3.315c2.2,19.59,17.24,22.891,17.045,29.269l.04-.042c.633-.456,8.415-6.663,2.1-20.547C12.813,32.835,15.086,9.922,15.086,9.922S.08,17.919,0,35.036"
          transform="translate(0 -9.922)"
        />
      </clipPath>
      <linearGradient
        id="lb"
        x1={0}
        y1={0.999}
        x2={0.097}
        y2={0.999}
        xlinkHref="#jy"
      />
      <clipPath id="ld">
        <rect className="c" width={20.482} height={57.977} />
      </clipPath>
      <clipPath id="le">
        <path
          className="c"
          d="M20.478,58.287a17.754,17.754,0,0,1-3.2,9.567l-.04.045C17.435,61.52,2.393,58.222.2,38.629-2.016,19.034,15.086,9.923,15.086,9.923s-4.258,18.92-1.927,29.444c2.331,10.5,7.493,13.169,7.319,18.92"
          transform="translate(0 -9.923)"
        />
      </clipPath>
      <linearGradient
        id="lf"
        x1={0.089}
        y1={1.001}
        x2={0.199}
        y2={1.001}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#c9ad95" />
        <stop offset={0.181} stopColor="#ceb5a0" />
        <stop offset={0.507} stopColor="#ddcbbf" />
        <stop offset={0.936} stopColor="#f6eef1" />
        <stop offset={1} stopColor="#faf4fa" />
      </linearGradient>
      <clipPath id="lg">
        <rect className="c" width={332.232} height={310.99} />
      </clipPath>
      <clipPath id="lh">
        <rect className="c" width={332.231} height={310.988} />
      </clipPath>
      <clipPath id="li">
        <rect className="c" width={21.147} height={21.145} />
      </clipPath>
      <clipPath id="lj">
        <path
          className="d"
          d="M61.86,38.694a10.525,10.525,0,0,1-.782,4.4,1.7,1.7,0,0,1-.069.156,10.489,10.489,0,0,1-3.1,4.069,3.259,3.259,0,0,1-.282.217,10.462,10.462,0,0,1-5.953,2.106A10.574,10.574,0,1,1,61.86,38.694"
          transform="translate(-40.722 -28.499)"
        />
      </clipPath>
      <radialGradient
        id="lk"
        cx={0.464}
        cy={0.465}
        r={0.507}
        gradientTransform="matrix(1.007, 0, 0, -1, 0.054, 16.834)"
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.193} />
        <stop offset={0.284} stopColor="#050500" />
        <stop offset={0.404} stopColor="#161600" />
        <stop offset={0.54} stopColor="#313100" />
        <stop offset={0.688} stopColor="#575700" />
        <stop offset={0.844} stopColor="#880" />
        <stop offset={0.875} stopColor="#939300" />
        <stop offset={0.983} stopColor="#caf900" />
        <stop offset={1} stopColor="#caf900" />
      </radialGradient>
      <clipPath id="ll">
        <rect className="c" width={15.362} height={18.888} />
      </clipPath>
      <clipPath id="lm">
        <path
          className="d"
          d="M47.372,28.879c13.722,3.47-5.706,11.8-5.346,15.6S52.6,49.9,56.244,42.2c4.516-9.549-5.628-14.248-8.872-13.318"
          transform="translate(-42.022 -28.763)"
        />
      </clipPath>
      <linearGradient
        id="ln"
        x1={-6.486}
        y1={6.69}
        x2={-6.327}
        y2={6.69}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.193} />
        <stop offset={0.268} stopColor="#000305" />
        <stop offset={0.366} stopColor="#000d16" />
        <stop offset={0.478} stopColor="#001d32" />
        <stop offset={0.6} stopColor="#003458" />
        <stop offset={0.73} stopColor="#005189" />
        <stop offset={0.864} stopColor="#0074c4" />
        <stop offset={0.983} stopColor="#0097ff" />
        <stop offset={1} stopColor="#0097ff" />
      </linearGradient>
      <clipPath id="lo">
        <rect className="c" width={6.882} height={6.881} />
      </clipPath>
      <clipPath id="lp">
        <path
          className="d"
          d="M62.445,53.514a3.432,3.432,0,0,1-.256,1.433l-.022.048a3.373,3.373,0,0,1-1.007,1.324l-.091.074a3.4,3.4,0,0,1-1.937.682,3.439,3.439,0,1,1,3.313-3.561"
          transform="translate(-55.565 -50.198)"
        />
      </clipPath>
      <radialGradient
        id="lq"
        cx={0.464}
        cy={0.465}
        r={0.507}
        gradientTransform="matrix(1.007, 0, 0, -1, 0.233, 25.676)"
        xlinkHref="#lk"
      />
      <clipPath id="lr">
        <rect className="c" width={4.999} height={6.147} />
      </clipPath>
      <clipPath id="ls">
        <path
          className="d"
          d="M57.731,50.322c4.464,1.129-1.859,3.839-1.741,5.076s3.444,1.763,4.629-.743a2.965,2.965,0,0,0-2.888-4.334"
          transform="translate(-55.988 -50.284)"
        />
      </clipPath>
      <linearGradient
        id="lt"
        x1={-27.043}
        y1={10.183}
        x2={-26.557}
        y2={10.183}
        xlinkHref="#ln"
      />
      <clipPath id="lu">
        <rect className="c" width={69.148} height={69.145} />
      </clipPath>
      <clipPath id="lv">
        <path
          className="d"
          d="M114.617,88.167a34.377,34.377,0,0,1-2.215,14.443c-.065.174-.135.352-.2.525a34.538,34.538,0,0,1-9.805,13.553c-.291.248-.595.5-.895.734a34.568,34.568,0,1,1,13.118-29.255"
          transform="translate(-45.533 -55.694)"
        />
      </clipPath>
      <radialGradient
        id="lw"
        cx={0.467}
        cy={0.466}
        r={0.49}
        gradientTransform="matrix(1.011, 0, 0, -1, 0.028, 1.916)"
        xlinkHref="#lk"
      />
      <clipPath id="lx">
        <rect className="c" width={49.682} height={61.811} />
      </clipPath>
      <clipPath id="ly">
        <path
          className="d"
          d="M66.142,56.988c45.14,10.235-17.7,39.034-16.219,51.419s35.017,16.866,46.295-8.6C110.209,68.227,76.672,53.7,66.142,56.988"
          transform="translate(-49.897 -56.532)"
        />
      </clipPath>
      <linearGradient
        id="lz"
        x1={-2.244}
        y1={0.854}
        x2={-2.195}
        y2={0.854}
        xlinkHref="#ln"
      />
      <clipPath id="ma">
        <rect className="c" width={19.041} height={19.039} />
      </clipPath>
      <clipPath id="mb">
        <path
          className="d"
          d="M35.2,52.82a9.423,9.423,0,0,1-.608,3.978l-.056.143a9.5,9.5,0,0,1-2.7,3.734c-.078.065-.161.135-.243.2A9.52,9.52,0,1,1,35.2,52.82"
          transform="translate(-16.181 -43.879)"
        />
      </clipPath>
      <radialGradient
        id="mc"
        cx={0.467}
        cy={0.466}
        r={0.49}
        gradientTransform="matrix(1.01, 0, 0, -1, 0.035, 11.675)"
        xlinkHref="#lk"
      />
      <clipPath id="md">
        <rect className="c" width={13.68} height={17.02} />
      </clipPath>
      <clipPath id="me">
        <path
          className="d"
          d="M21.853,44.236c12.432,2.818-4.868,10.748-4.464,14.156s9.645,4.646,12.749-2.367c3.852-8.7-5.385-12.7-8.285-11.79"
          transform="translate(-17.382 -44.11)"
        />
      </clipPath>
      <linearGradient
        id="mf"
        x1={-2.883}
        y1={4.819}
        x2={-2.707}
        y2={4.819}
        xlinkHref="#ln"
      />
      <clipPath id="mg">
        <rect className="c" width={41.441} height={41.439} />
      </clipPath>
      <clipPath id="mh">
        <path
          className="d"
          d="M41.4,19.461a20.556,20.556,0,0,1-1.324,8.659c-.039.109-.083.208-.122.317a20.751,20.751,0,0,1-5.875,8.116c-.178.152-.356.3-.538.447A20.723,20.723,0,1,1,41.4,19.461"
          transform="translate(0 0.001)"
        />
      </clipPath>
      <radialGradient
        id="mi"
        cx={0.467}
        cy={0.466}
        r={0.49}
        gradientTransform="matrix(1.011, 0, 0, -1, 0, 13.835)"
        xlinkHref="#lk"
      />
      <clipPath id="mj">
        <rect className="c" width={29.775} height={37.044} />
      </clipPath>
      <clipPath id="mk">
        <path
          className="d"
          d="M12.349.775C39.4,6.915,1.749,24.167,2.631,31.588S23.618,41.7,30.375,26.438C38.76,7.514,18.663-1.193,12.349.775"
          transform="translate(-2.615 -0.502)"
        />
      </clipPath>
      <linearGradient
        id="ml"
        x1={-0.044}
        y1={5.683}
        x2={0.036}
        y2={5.683}
        xlinkHref="#ln"
      />
      <clipPath id="mm">
        <rect className="c" width={41.441} height={41.438} />
      </clipPath>
      <clipPath id="mn">
        <path
          className="d"
          d="M108.366,62.776a20.536,20.536,0,0,1-1.324,8.654c-.039.1-.078.213-.122.313a20.78,20.78,0,0,1-5.875,8.125c-.178.148-.356.3-.538.439a20.717,20.717,0,1,1,7.86-17.53"
          transform="translate(-66.965 -43.313)"
        />
      </clipPath>
      <radialGradient
        id="mo"
        cx={0.467}
        cy={0.466}
        r={0.49}
        gradientTransform="matrix(1.011, 0, 0, -1, 0.069, 5.518)"
        xlinkHref="#lk"
      />
      <clipPath id="mp">
        <rect className="c" width={29.774} height={37.044} />
      </clipPath>
      <clipPath id="mq">
        <path
          className="d"
          d="M79.314,44.088c27.058,6.136-10.6,23.4-9.718,30.818s20.987,10.1,27.748-5.154c8.381-18.924-11.716-27.635-18.03-25.664"
          transform="translate(-69.58 -43.815)"
        />
      </clipPath>
      <linearGradient
        id="mr"
        x1={-5.442}
        y1={2.316}
        x2={-5.361}
        y2={2.316}
        xlinkHref="#ln"
      />
      <clipPath id="ms">
        <rect className="c" width={14.417} height={14.415} />
      </clipPath>
      <clipPath id="mt">
        <path
          className="d"
          d="M73.3,62.147a7.164,7.164,0,0,1-.46,3.009l-.043.113a7.163,7.163,0,0,1-2.045,2.823c-.061.052-.122.1-.187.156a7.208,7.208,0,1,1,2.736-6.1"
          transform="translate(-58.893 -55.377)"
        />
      </clipPath>
      <radialGradient
        id="mu"
        cx={0.467}
        cy={0.466}
        r={0.49}
        gradientTransform="matrix(1.011, 0, 0, -1, 0.176, 9.046)"
        xlinkHref="#lk"
      />
      <clipPath id="mv">
        <rect className="c" width={10.358} height={12.887} />
      </clipPath>
      <clipPath id="mw">
        <path
          className="d"
          d="M63.191,55.645c9.41,2.136-3.687,8.142-3.383,10.721s7.3,3.517,9.653-1.793c2.918-6.583-4.073-9.61-6.27-8.928"
          transform="translate(-59.803 -55.551)"
        />
      </clipPath>
      <linearGradient
        id="mx"
        x1={-13.692}
        y1={3.761}
        x2={-13.46}
        y2={3.761}
        xlinkHref="#ln"
      />
      <linearGradient
        id="my"
        x1={-4764.717}
        y1={861.415}
        x2={-4751.018}
        y2={861.415}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} />
        <stop offset={0.213} stopColor="#000003" />
        <stop offset={0.41} stopColor="#02030e" />
        <stop offset={0.6} stopColor="#060721" />
        <stop offset={0.787} stopColor="#0b0d3c" />
        <stop offset={0.97} stopColor="#11145d" />
        <stop offset={1} stopColor="#131664" />
      </linearGradient>
      <linearGradient
        id="mz"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopOpacity={0} />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="na"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#24a0e1" />
        <stop offset={1} stopColor="#28a2e2" />
      </linearGradient>
      <linearGradient
        id="nb"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#6bf2fd" />
        <stop offset={1} stopColor="#00cbeb" />
      </linearGradient>
      <filter
        id="nc"
        x={-30}
        y={1886}
        width={1140}
        height={77}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={10} result="nd" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="nd" />
        <feComposite in="SourceGraphic" />
      </filter>
      <linearGradient
        id="ne"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#cb997e" />
        <stop offset={1} stopColor="#c28562" />
      </linearGradient>
      <linearGradient
        id="nf"
        x1={0.264}
        y1={0.5}
        x2={1}
        y2={0.5}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#ffe6b5" />
        <stop offset={1} stopColor="#e6c994" />
      </linearGradient>
      <linearGradient
        id="ng"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#e8ae90" />
        <stop offset={1} stopColor="#b77d5e" />
      </linearGradient>
      <linearGradient
        id="nh"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#65efff" />
        <stop offset={1} stopColor="#d2f1ff" stopOpacity={0} />
      </linearGradient>
      <filter
        id="nl"
        x={887}
        y={2112.788}
        width={140}
        height={67}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="nm" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="nm" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="nn"
        x={618}
        y={2112.788}
        width={126}
        height={67}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="no" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="no" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="np"
        x={73.897}
        y={2112.788}
        width={104}
        height={67}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="nq" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="nq" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="nr"
        x={340}
        y={2112.788}
        width={128}
        height={67}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="ns" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="ns" />
        <feComposite in="SourceGraphic" />
      </filter>
      <linearGradient
        id="nt"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#00cbeb" />
        <stop offset={1} stopColor="#74f6ff" />
      </linearGradient>
      <linearGradient
        id="nw"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#1c9dde" />
        <stop offset={1} stopColor="#72f5ff" />
      </linearGradient>
      <filter id="nx">
        <feOffset dy={6} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="ny" />
        <feFlood floodOpacity={0.161} result="nz" />
        <feComposite operator="out" in="SourceGraphic" in2="ny" />
        <feComposite operator="in" in="nz" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      <filter
        id="oa"
        x={83}
        y={85}
        width={100}
        height={99}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={5} result="ob" />
        <feFlood floodOpacity={0.439} />
        <feComposite operator="in" in2="ob" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="oc"
        x={116}
        y={92}
        width={34}
        height={82}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="od" />
        <feFlood floodOpacity={0.439} />
        <feComposite operator="in" in2="od" />
        <feComposite in="SourceGraphic" />
      </filter>
      <linearGradient
        id="oe"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#fff" stopOpacity={0} />
        <stop offset={1} stopColor="#fff" />
      </linearGradient>
      <linearGradient id="og" y1={1} y2={0} xlinkHref="#oe" />
      <linearGradient
        id="ou"
        x1={0.5}
        y1={0.127}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#81feff" />
        <stop offset={1} stopColor="#1799df" />
      </linearGradient>
      <filter
        id="ow"
        x={302}
        y={1637}
        width={477}
        height={182}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="ox" />
        <feFlood floodColor="#0d8cc1" />
        <feComposite operator="in" in2="ox" />
        <feComposite in="SourceGraphic" />
      </filter>
      <clipPath id="oy">
        <rect
          className="c"
          width={1003.592}
          height={1007.711}
          transform="translate(-37 -28)"
        />
      </clipPath>
      <clipPath id="oz">
        <path
          className="c"
          d="M483.473,0C216.457,0,0,216.023,0,482.5S216.457,965,483.473,965,966.938,748.977,966.938,482.5,750.481,0,483.473,0Z"
        />
      </clipPath>
      <linearGradient
        id="pa"
        x1={0.146}
        y1={0.854}
        x2={0.15}
        y2={0.854}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#0e5df8" />
        <stop offset={0.308} stopColor="#0e4de0" />
        <stop offset={0.956} stopColor="#0f26a3" />
        <stop offset={1} stopColor="#10249f" />
      </linearGradient>
      <clipPath id="pb">
        <path
          className="c"
          d="M10.569,432.547c0,233.059,189.307,421.987,422.834,421.987S856.229,665.606,856.229,432.547,666.926,10.569,433.4,10.569,10.569,199.493,10.569,432.547"
          transform="translate(-10.569 -10.569)"
        />
      </clipPath>
      <linearGradient
        id="pc"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#ffe27a" />
        <stop offset={1} stopColor="#ffcb5b" />
      </linearGradient>
      <clipPath id="pd">
        <path
          className="c"
          d="M12.658,425.47c0,227.991,185.2,412.817,413.65,412.817,228.436,0,413.641-184.826,413.641-412.817S654.744,12.658,426.308,12.658c-228.453,0-413.65,184.825-413.65,412.812"
          transform="translate(-12.658 -12.658)"
        />
      </clipPath>
      <radialGradient
        id="pe"
        cx={0.5}
        cy={0.5}
        r={0.533}
        gradientTransform="matrix(1, 0, 0, -1, 0, 2.135)"
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#fdfdfd" />
        <stop offset={0.374} stopColor="#fdfdfd" />
        <stop offset={0.648} stopColor="#fafafa" />
        <stop offset={0.81} stopColor="#f2f2f2" />
        <stop offset={0.941} stopColor="#e4e4e4" />
        <stop offset={1} stopColor="#dbdbdb" />
      </radialGradient>
      <clipPath id="pf">
        <path
          className="h"
          d="M16.608,225.372a412.156,412.156,0,0,0,95.276,164.5L412.892,106.743Z"
          transform="translate(-16.608 -106.743)"
        />
      </clipPath>
      <clipPath id="pg">
        <path
          className="h"
          d="M85.09,508.551a417.146,417.146,0,0,0,190.4,0L180.3,106.743Z"
          transform="translate(-85.09 -106.743)"
        />
      </clipPath>
      <clipPath id="ph">
        <path
          className="h"
          d="M407.745,389.869a412.141,412.141,0,0,0,95.276-164.5L106.745,106.743Z"
          transform="translate(-106.745 -106.743)"
        />
      </clipPath>
      <clipPath id="pi">
        <path
          className="h"
          d="M106.745,325.338,503.02,206.718a412.089,412.089,0,0,0-95.276-164.5Z"
          transform="translate(-106.745 -42.216)"
        />
      </clipPath>
      <clipPath id="pj">
        <path
          className="h"
          d="M16.608,206.718l396.284,118.62L111.884,42.216a412.142,412.142,0,0,0-95.276,164.5"
          transform="translate(-16.608 -42.216)"
        />
      </clipPath>
      <clipPath id="pk">
        <path
          className="h"
          d="M85.09,23.671,180.3,425.47l95.2-401.8a417.066,417.066,0,0,0-190.4,0"
          transform="translate(-85.09 -12.658)"
        />
      </clipPath>
      <clipPath id="pl">
        <rect className="c" width={938.592} height={936.711} />
      </clipPath>
      <clipPath id="pm">
        <rect className="c" width={92.055} height={91.872} />
      </clipPath>
      <clipPath id="pn">
        <path
          className="c"
          d="M187.041,144.351a46.027,46.027,0,1,1-46.027-45.939,45.983,45.983,0,0,1,46.027,45.939"
          transform="translate(-94.988 -98.412)"
        />
      </clipPath>
      <radialGradient
        id="po"
        cx={0.5}
        cy={0.5}
        r={0.5}
        gradientTransform="matrix(1, 0, 0, -1, 0, 10.992)"
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#400500" />
        <stop offset={0.338} stopColor="#400500" />
        <stop offset={0.368} stopColor="#4e1813" />
        <stop offset={0.47} stopColor="#7c5451" />
        <stop offset={0.57} stopColor="#a48886" />
        <stop offset={0.668} stopColor="#c4b3b1" />
        <stop offset={0.761} stopColor="#ded4d3" />
        <stop offset={0.85} stopColor="#f0ebeb" />
        <stop offset={0.932} stopColor="#fbfaf9" />
        <stop offset={1} stopColor="#fff" />
      </radialGradient>
      <clipPath id="pp">
        <path
          className="c"
          d="M100.4,128.241A27.9,27.9,0,1,0,128.306,100.4,27.88,27.88,0,0,0,100.4,128.241"
          transform="translate(-100.397 -100.397)"
        />
      </clipPath>
      <linearGradient
        id="pq"
        x1={-5.446}
        y1={6.446}
        x2={-5.39}
        y2={6.446}
        xlinkHref="#pa"
      />
      <clipPath id="pr">
        <ellipse
          className="i"
          cx={413.5}
          cy={414}
          rx={413.5}
          ry={414}
          transform="translate(127 539)"
        />
      </clipPath>
      <linearGradient
        id="pu"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#fec11b" />
        <stop offset={1} stopColor="#fff700" />
      </linearGradient>
      <filter id="pv">
        <feOffset dy={6} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="pw" />
        <feFlood floodColor="#f70" floodOpacity={0.161} result="px" />
        <feComposite operator="out" in="SourceGraphic" in2="pw" />
        <feComposite operator="in" in="px" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      <filter
        id="py"
        x={81.805}
        y={85}
        width={100}
        height={99}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={5} result="pz" />
        <feFlood floodColor="#ff3400" floodOpacity={0.439} />
        <feComposite operator="in" in2="pz" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="qa"
        x={114.805}
        y={92}
        width={34}
        height={82}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="qb" />
        <feFlood floodColor="#ff3400" floodOpacity={0.439} />
        <feComposite operator="in" in2="qb" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="qc"
        x={146.5}
        y={1477.5}
        width={666}
        height={103}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={7.5} result="qd" />
        <feFlood floodOpacity={0.42} />
        <feComposite operator="in" in2="qd" />
        <feComposite in="SourceGraphic" />
      </filter>
      <clipPath id="qe">
        <path
          d="M100.4,224.3c0,68.454,5.254,123.944,11.736,123.944s11.732-55.49,11.732-123.944c0-68.435-5.254-123.9-11.732-123.9S100.4,155.867,100.4,224.3"
          transform="translate(-100.397 -100.397)"
        />
      </clipPath>
      <clipPath id="qg">
        <rect width={1080} height={2212} />
      </clipPath>
    </defs>
    <g id="qf" className="j">
      <rect className="rl" width={1080} height={2212} />
      <rect
        className="k"
        width={1388}
        height={1154}
        transform="translate(-187 759)"
      />
      <g className="l" transform="translate(-186.409 1223.158)">
        <g className="m">
          <g className="n">
            <g className="o">
              <g className="n">
                <g transform="translate(-6.774 0)">
                  <g className="p">
                    <path
                      className="a"
                      d="M0,0,1188.821-28.879l-41.127,1600.452L-41.127,1600.452Z"
                      transform="matrix(0.355, -0.935, 0.935, 0.355, -205.215, 581.822)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <path
        className="q"
        d="M1569.065,63.792a24.81,24.81,0,0,0-7.607.944c-5.474,1.859-7.111,6.358-7.015,11.757a31.868,31.868,0,0,1-2.268,13.127,11.014,11.014,0,0,0-1.06-4.6.454.454,0,0,0-.693-.152c-3.354,2.791-5.153,6.947-7.15,10.9,1.221-3.718,2.028-7.523,1.483-11.232a.741.741,0,0,0-1.192-.429c-5.787,4.691-8.159,13.329-10.829,20.026-.747,1.869-1.681,3.848-2.485,5.873-.332-.45-.653-.877-.939-1.257.132-.7.234-1.409.318-2.112.154-.511.313-1.016.494-1.505,2.37-6.42,7.583-12.944,7.475-19.9,0-.219-.2-.486-.455-.407a14.589,14.589,0,0,0-7.518,5.777c-.06-.431-.106-.867-.176-1.3-.472-2.827-2.466-6.177-2.5-8.937,0-.14-.1-.311-.262-.3-5.023.164-3.121,9.568-3.191,12.551-.041,1.775-.145,3.547-.284,5.317a56.022,56.022,0,0,0-5.628-9.254.392.392,0,0,0-.682.219,21.3,21.3,0,0,0,.214,8.559A15.376,15.376,0,0,0,1515,95.053c-.549-.5-1.678-.39-1.688.539-.026,2.553.178,5.084.364,7.612-.33.25-.65.513-.961.792a11.639,11.639,0,0,0-4.4-6.435.965.965,0,0,0-1.447.47c-.862,3.9,1.166,7.781.978,11.716-.113.147-.229.306-.344.455-.3.142-.595.272-.9.407-.482-5.259-3.451-9.979-7.3-13.454-.144-.132-.33.051-.315.2.328,3.781,1.563,7.87,1.712,11.819-2.312-6-4.98-11.152-6.536-13.17-.258-.335-.7-.034-.677.315.089,1.267.231,2.517.371,3.769a16.306,16.306,0,0,0-1.4-1.691,1.943,1.943,0,0,0-1.837-.662c-.4.12-.922.142-1.125.547-.9,1.8.1,2.892.742,4.737a21.716,21.716,0,0,1,.819,3.215,13.351,13.351,0,0,0-7.049-4.067.226.226,0,0,0-.246.354,32.382,32.382,0,0,1,6.574,14.93c.046.3.065.607.1.913l0,.017c-1.394-4.474-3.819-8.773-7.6-10.894-1.194-.669-3.318.157-2.813,1.809.958,3.145,2.3,5.977,3.383,8.92-2.666-3.7-4.881-7.81-7.292-11.6-.176-.272-.643-.183-.578.183a65.743,65.743,0,0,0,1.452,6.423,21.509,21.509,0,0,0-2.466-1.821,2.191,2.191,0,0,0-3.366,1.893c-.595-1.1-1.187-2.2-1.806-3.292a.471.471,0,0,0-.886.279,50.713,50.713,0,0,0,2.531,9.688c-1.507-2.569-2.89-5.216-4.491-7.766a.926.926,0,0,0-1.743.318c-.93,4.551.231,9.04,2.326,13.1-2.343-2.943-4.722-5.854-7.186-8.734-.342-.4-1.178-.1-1,.465.917,2.933,2.061,6.213,3.441,9.543-3.658-2.68-7.793-4.376-11.376-4.347-1.97.017-3.648,2.952-1.457,4.1a56.933,56.933,0,0,1,7.121,4.207,12.828,12.828,0,0,0-10.516.128,1.128,1.128,0,0,0,.1,2.064c1.837.812,3.653,1.541,5.4,2.348a16.393,16.393,0,0,0-6.333.229c-.436.1-.58.816-.075.939,6.555,1.585,11.424,7.672,13.551,13.791-3.528-1.816-7.217-3.547-10.242-6.579a1.048,1.048,0,0,0-1.818.85c.836,6.292,6.846,8.624,11.484,11.983a16.415,16.415,0,0,1,2.384,2.148c.065.3.132.6.21.891-2.032,1.835-3.86,3.569-7.241,3.14-4.2-.535-5.454-3.911-8.058-6.466a.56.56,0,0,0-.942.171,6.682,6.682,0,0,0-.115,5.729,9.978,9.978,0,0,0-6.762-.445,9.207,9.207,0,0,0-6.483,7.251,11.558,11.558,0,0,0-9.8,5.043c-2.827,4.125-2.562,8.994-.946,13.421-5.31.559-10.076,3.492-12.079,9.115a15.12,15.12,0,0,0,.46,11.082c1.057,2.418,3.34,4.583,5.2,6.89a12.624,12.624,0,0,0-13.163,4.5c-4.106,5.44-2.591,12.238,1.6,16.686-6.266,3.9-10.531,11.583-7.7,18.9a9.369,9.369,0,0,0,6.266,5.852,14.625,14.625,0,0,0-.6,2.29c-.73,4.378,2.03,7,5.4,9.165-4.65,3.321-7.586,8.92-4.942,14.731a10.639,10.639,0,0,0,12.994,5.741,5.9,5.9,0,0,0,4.544,4.792c5.515,1.447,9.531-3.759,12.809-7.521a25.662,25.662,0,0,1,2.659,3.752q3.157,4.447-.737,9.666c-1.055-1.04-3.473-.763-3.417,1.093.063,2.052-.318,10.059-3.473,7.781-.672-.482-.85-2.736-1.373-3.489-1.091-1.57-1.934-2.582-4.022-2.873-5.12-.713-7.032,5.021-8.012,8.761a1.459,1.459,0,0,0,.537,1.642c.667.385,1.317.79,1.958,1.216-3.54,5.062-9.057,12.412-1.178,16.277.918.448,2.107-.07,3.02.183,7.282,2.028,5.149,3.619,8.149,8.06a11.462,11.462,0,0,0,1.308,1.63,2.846,2.846,0,0,0-1.089,2.635,5.26,5.26,0,0,0,.458,1.929,10.276,10.276,0,0,1-2.6,4.946,11.185,11.185,0,0,0-6.834-4.778,1.83,1.83,0,0,0-2.3,1.105,20.377,20.377,0,0,1-2.8,7.094,1.979,1.979,0,0,0-1.753-1.173,10.22,10.22,0,0,0-7.749,2.584,2.154,2.154,0,0,0-.267,3q-3.027,3.9-6.615,1.582a26.137,26.137,0,0,0-4.872-1.517,1.342,1.342,0,0,0-1.746,1.486,39.682,39.682,0,0,0,1.64,6.018,16.635,16.635,0,0,0-4.934,2.081c-6.02,3.47-12.188,4.645-17.112-.438a19.431,19.431,0,0,0,1.748-5.218,1.315,1.315,0,0,0-2.136-1.093c-2.861,2.683-4.689,6.232-6.755,9.548-.2-.508-.412-1.011-.662-1.507.4-.739.766-1.474,1.105-2.182,2.769-5.739,2.976-10.738,2.468-16.924-.024-.277-.4-.2-.445.022a56.418,56.418,0,0,1-5.37,14.454,58.445,58.445,0,0,0-2.086-18.047c-.455-1.69-3.073-1.271-2.724.5a50.939,50.939,0,0,1,.937,13.647c-.034-.046-.075-.094-.108-.142-.373-.506-.751-1.016-1.125-1.524.568-7.022-2.348-14.586-5.553-20.433a.529.529,0,0,0-.958.448,34.224,34.224,0,0,1,1.534,7.629l0-.01a.184.184,0,0,0-.347.111c.25,1.1.431,2.175.566,3.244.031.958.022,1.919.024,2.88-1.435-1.635-5.394-4.811-5.016-7.273.036-.234-.318-.291-.395-.084-1.271,3.338.426,6.952,2.312,10.136-.344-.224-.7-.433-1.035-.667-.159-.108-.308-.226-.465-.335a37.985,37.985,0,0,0-8.612-15.2c-.368-.378-1.079,0-.819.52a56.931,56.931,0,0,1,4.241,10.839c-2.271-1.722-4.547-3.436-6.938-4.973a.878.878,0,0,0-1.168,1.279,53.43,53.43,0,0,0,9.2,9.861c.169,2.29.087,4.58.077,6.861-1.411-8.985-10.861-16.845-18.345-20.4-.807-.385-1.305.831-.677,1.324a46.928,46.928,0,0,1,11.14,12.493c.4.665.766,1.349,1.117,2.04a26.342,26.342,0,0,0-2.4-1.209c-1.021-.679-2.049-1.3-3-1.876a36.621,36.621,0,0,0-11.877-4.889c-.886-.178-1.113,1.055-.539,1.512,3.412,2.721,7.1,5.023,10.593,7.646,1.286.968,2.536,2.107,3.831,3.172a11.083,11.083,0,0,0-2.283.38c-4.289-2.986-10.449-3.451-15.073-5.681-.376-.181-.669.424-.33.645,2.314,1.515,5.392,2.83,8.2,4.383a3,3,0,0,0-.713.352,20.422,20.422,0,0,0-2.591,2.107,29.325,29.325,0,0,0-7.335-6.74c-.518-.328-1.276.214-.961.809.624,1.178,1.329,2.3,2.059,3.408.292.927.527,1.871.732,2.825-.128-.01-.26-.01-.39-.019a.51.51,0,0,0-.207.985c.282.12.561.2.843.308a29.917,29.917,0,0,1,.445,5.2c-.019.038-.036.077-.053.116a46.639,46.639,0,0,1-5.038-6.55,13.562,13.562,0,0,0-2.8-5.228c-.352-.785-.689-1.582-1-2.406-.065-.176-.342-.082-.308.1.079.414.2.809.287,1.216a14.236,14.236,0,0,0-1.536-1.286c-.2-.144-.467.137-.3.325a13.854,13.854,0,0,1,2.748,4.39c.075.236.159.467.238.7a12.891,12.891,0,0,1-.576,8.356,39.027,39.027,0,0,1-5.9-9.185l-.017-.024a33.1,33.1,0,0,0-.865-13.818,1.257,1.257,0,0,0-2.1-.489c-4.053,5.069-5.811,11.2-6.981,17.587a21.082,21.082,0,0,0-3.2-5.433.41.41,0,0,0-.713.332c.347,2.35.756,4.655,1.1,6.96-1.775-4.286-6.054-7.037-10.846-5.423-.441.147-.178.773.231.727,4.325-.477,7.607,3.538,8.13,7.4a12.158,12.158,0,0,1,.1,1.416c-4.224-3.184-8.416-6.408-12.664-9.556-.154-.113-.328.094-.219.236a90.078,90.078,0,0,0,12.441,13.257c-.342,1.575-.833,3.126-1.31,4.624a32.834,32.834,0,0,1-3.612-6.827,14.028,14.028,0,0,0-6.68-7.617.243.243,0,0,0-.277.4c2.972,2.423,4.2,8.4,6.225,13.242-.221-.048-.441-.087-.662-.128-.07-.145-.149-.287-.221-.429a19.4,19.4,0,0,0-2.322-7.005,1,1,0,0,0-1.553-.147,14.337,14.337,0,0,0-1.39,1.64,15.613,15.613,0,0,0-4.732-1.8c.01-.342.034-.684.029-1.028-.056-3.61-4.778-4.4-6.536-1.561a35.3,35.3,0,0,0-3.116,6.577c-1.262.39-2.509.833-3.721,1.276-.267.1-.116.5.149.46,1.06-.152,2.093-.275,3.1-.354q-.4,1.21-.759,2.447a32.571,32.571,0,0,0-4.78,1.2c-.116-.983-.248-1.963-.41-2.936-.361-2.187-1.731-11.292-4.409-12.238l-1.055-.376c-1.491-.527-2.822.744-3.282,2a13.554,13.554,0,0,0-.778,4.426,66.037,66.037,0,0,0-4.183-10.239c-.624-1.2-2.437-.72-2.745.448-3.8,14.288,4.14,28.5.616,43.556a44.432,44.432,0,0,1-1.768,5.645c.07-8.484-.373-19.494-4.588-25.8a1.709,1.709,0,0,0-2.9.1c-4.778,6.721-2.673,16.248-2.442,24.057-.855-2.483-1.669-4.905-2.232-7.138-6.4-25.351,11.053-41.839,16.366-64.644.224-.961-.956-1.989-1.84-1.317-11.814,8.973-20.151,23.91-23.881,38.66.819-3.542,1.676-7.114,2.189-10.921a1.458,1.458,0,0,0-2.162-1.551c-8.556,4.592-11.393,14.393-11.759,24.226-.53-3.044-.894-6.126-1.288-9.276a38.086,38.086,0,0,1,3.22-7.8c4.544-8.477,13.779-19.13,12.265-29.23a.414.414,0,0,0-.525-.38c-10.239,3.7-18.278,20.806-22.769,29.89a33.893,33.893,0,0,0-1.849,4.65c-2.064-4.385-4.007-8.833-5.681-13.433-5.476-15.049-7.311-31.07-12.643-46.039-.742-2.078-4.443-2.476-4.766.13-2.6,21.035,5.235,44.5,13.7,63.927a88.4,88.4,0,0,1-9.933-22.256c-2.806-9.127-5.18-17.447-11.7-24.59-2.208-2.418-6.5.361-5.423,3.357,6.283,17.481,9.144,37.608,20.354,52.811a137.2,137.2,0,0,0,10.933,12.505c-2.037-.937-4.084-1.862-6.124-2.827-8.778-4.164-14.719-9.9-21.368-16.705a1.162,1.162,0,0,0-1.9.571c-2.386,10.194,5.8,17.507,13.929,22.492.142,1.51.39,3,.679,4.491a35.229,35.229,0,0,0-7.778-6.261,1.545,1.545,0,0,0-2.261,1.38c.879,6.793,4.754,10.755,7.164,16.915a26.474,26.474,0,0,1,1.888,7.7c-.641.5-1.281,1.011-1.917,1.544,1.026-9.736-5.8-20.5-11.559-27.491-1.045-1.271-3.66-1.226-4.007.489a10.009,10.009,0,0,1-.978-1.3c-.486-.742-.489-1.866-.975-2.649-2.235-3.588-6.955-3.733-10.49-2.054-2.42,1.151-4.173,3.208-6.146,4.946-3.4,3-7.032,3.908-10.952,5.811-5.717,2.774-9.319,10.608-15.631,11.85a13.327,13.327,0,0,1,.325-2.358.774.774,0,0,0,.708-.51,3.705,3.705,0,0,0,.219-2.069c3.359-6.374,12.611-7.427,19.243-10.268,3.648-1.565,6.509-5.5,2.936-8.85-3.7-3.468-8.85-.966-12.867,1.828.1-.337.2-.677.289-1.055.474-2.151.106-3.824,1-6.042.361-.9,1.276-1.674,1.457-2.663.886-4.855-5.739-5.4-8.86-3.841a9.064,9.064,0,0,0-4.7,6c-.99,3.684,1.416,8.585-.751,11.651a7.685,7.685,0,0,0-8.2-5.707,7.784,7.784,0,0,0-5.6,4.014c-1.794,3.417.026,5.934,1.233,9.173,1.751,4.7,2.68,12.383.773,17.637a71.005,71.005,0,0,1-6.047-5.091c-1-.951-1.84-1.847-2.622-2.649-.465-.689-.934-1.377-1.409-2.073-1.931-2.827-2.242-5.038-3.294-8.123-1.71-5.009-6.695-6.495-10.948-4.814,1.117-3.444,2.6-7.186.6-10.355-1.707-2.709-4.558-2.9-7.321-2.37,2.312-4.927,3.86-11.672-2.167-14.336-5.185-2.295-8.893,2.774-9.425,7.386-5.2.034-9.965,4.26-4.342,8.5.807.607,2.254,1.081,2.926,1.825,1.63,1.8,1.5,3.932,1.958,6.018a18.838,18.838,0,0,0,2.235,5.105c1.556,3.017,1.091,4.951-.145,7.658-.816,1.787-.441,3.321.2,5.081,1.187,3.287,4.378,6.3,2.468,10.088q-.155,4.089-5.026,1.6-.726-.592-1.454-1.185c-.715-.474-4.024-2.784-4.366-3.554-.628-1.428.291-2.29.494-3.973a9.053,9.053,0,0,0-.958-5.233c-3.034-5.751-11.328-4.66-13.423.958-3.4-.821-8.18-.812-8.258,3.745-.091,5.324,9,8.583,13.312,10.644-.026.094-.038.188-.063.282a5.065,5.065,0,0,0-.409-.46.173.173,0,0,0-.236.041c-1.866,2.148-1.936,5.1-1.727,8.161a9.112,9.112,0,0,0-2.16-2.659c-1.741-1.416-4.325-1.238-6.784-.778a19.087,19.087,0,0,0-2.586-5c-1.457-2.249-2.047-5.194-3.725-7.186a3.7,3.7,0,0,0,1.3-.58c.995-.84,1.223-2.49,1.418-3.668.573-3.47.616-6.073,2.117-9.351,1.784-3.908,3.92-7.386,4.414-11.747.079-.689.132-1.365.173-2.04.053-.029.1-.048.156-.082,1.524-.893,1.6-1.64,2.36-3.111,2.753-5.351,9.478-8.376,11-14.367,1.857-7.289-4.975-12.036-11.545-12.086.552-3.692.055-7.793.026-11.35-.017-2.261-.07-4.506-.164-6.748a10.525,10.525,0,0,0,4.1-4.226,17.938,17.938,0,0,0,1.045-4.98c.465-2.976,2.011-4.963,3.01-7.675a9.347,9.347,0,0,0-1.151-8.431,9.607,9.607,0,0,0-9.972-3.978c.012-.053.026-.1.039-.152.537-2.533.1-5.755.07-8.335-.017-1.821.212-4.12-.616-5.83-1.373-2.825-4.262-2.584-7.058-2.687-3.282-.123-7.692-.366-9.57,3.008-1.483,2.663-.222,3.877,1.089,6.054,1.175,1.948,2.011,1.823-.3,2.781-1.529.633-3.4.236-5,.289-1.471.051-2.582-.031-3.68,1.052-5.235,5.158,2.769,16.038,6.639,20.349a9.82,9.82,0,0,0-6.174,2.025c-4.219,3.357-4.038,8.108-3.02,12.9q2.557,12.032,6.064,23.812c.491,1.64,1,3.28,1.483,4.922-.012.178-.029.356-.041.532-.135,1.023-.222,2.052-.27,3.085-.325,3.09-.787,6.17-1.2,9.257a35.457,35.457,0,0,1-4.718-10.54c-1-4.39-.725-8.378-.231-12.768.552-4.891.831-11.34-4.756-13.486-5.255-2.018-12.325,2.189-14.131,7.2a7.934,7.934,0,0,0,.445,6.112c1.965,4.657,5.134,8.645,6.921,13.449a32.995,32.995,0,0,1,2.1,14.839c-.412,4.2-1.5,8.233-1.24,12.484a34.533,34.533,0,0,0,1,6.143c-1.129,2.343-2,4.879-3.6,6.923q-.166-.679-.332-1.361a7.746,7.746,0,0,0,.5-1.421.434.434,0,0,0-.39-.472c-.183,0-.366.012-.549.019a41.27,41.27,0,0,1-1.141-7.441c.961-3.056,1.859-6.17,1.284-9.32l-.012-.022c1.168-5.218,2.353-10.873-.171-14.774-2.4-3.713-6.95-4.2-10.757-2.779-1.878.7-3.1,1.565-5.312,1.144-.8-.152-1.447-.795-2.3-.889a5.735,5.735,0,0,0-1.727.108c-2.085.3-2.9.905-5.057.075-4.188-1.609-9.64-3.843-12.1,1.874-.937,2.177-.318,3.465.506,5.433.628,1.505,1,.364.862,2.514-.087,1.312-.306,1.4-.621,1.671a7.4,7.4,0,0,0,.376-2.466.182.182,0,0,0-.21-.2c-4.681,1.079-9.112,8.144-11.564,11.884a14.837,14.837,0,0,0-1.057,1.939c-.669-2.03-1.284-4.079-1.772-6.184-1.6-6.88-1.546-13.991-3.082-20.828-.212-.949-1.813-1.32-2.093-.2-2.259,9.074-.08,19.766,2.589,28.717a38.949,38.949,0,0,1-3.162-10.271c-.742-4.144-1.339-7.913-3.812-11.386a1.47,1.47,0,0,0-2.555,1.182c1.821,7.988,2,16.953,6.1,24.2a60.376,60.376,0,0,0,4.12,6.056c-.843-.518-1.688-1.033-2.531-1.563-3.622-2.288-5.917-5.11-8.465-8.445a.514.514,0,0,0-.864.149c-1.589,4.337,1.609,7.973,4.9,10.586a19.858,19.858,0,0,0,.058,2,15.459,15.459,0,0,0-3.073-3.155.68.68,0,0,0-1.062.484c.022,3.022,1.508,4.961,2.235,7.788a11.608,11.608,0,0,1,.414,3.473c-.308.185-.614.376-.92.576.968-4.209-1.447-9.283-3.6-12.652-.438-.686-1.837-.754-1.828.316.046,4.982,2.406,9.016-.019,13.82-.308.609-.619,1.158-.922,1.691a9.107,9.107,0,0,0,.234-2.037,31.97,31.97,0,0,0-3.41-13.4c.665-.963,1.315-1.934,1.941-2.919,3.237-5.093,7.908-12.154,7.121-18.42a1.853,1.853,0,0,0-2.447-1.539c-6.061,1.833-10.206,8.746-13.832,13.531-4.137,5.462-8.455,10.461-14.906,13.218-.142.06-.279.108-.421.166a38.794,38.794,0,0,0,9.833-12.2,45.583,45.583,0,0,0,5.1-19.157c.25-5.3.732-13.283-3.092-17.539a1.212,1.212,0,0,0-1.878-.055c-3.851,3.771-4.094,10.94-5.221,15.918-1.447,6.394-3.121,12.9-6.938,18.357-3.988,5.7-9.2,7.848-15.3,10.516-.039-.224-.077-.448-.125-.662a17.152,17.152,0,0,0-.7-2.216,45.7,45.7,0,0,0,5.541-9.286,43.327,43.327,0,0,0,3.046-17.23c0-1.288-.041-2.577-.106-3.863a4.488,4.488,0,0,0,1.105-.209c5.647-1.881,10.825-8.686,11.872-14.413,1.052-5.743-.472-12.985-4.592-17.2-1.676-1.715-5.021-.682-5.825,1.392-1.8,4.619.891,9.454-.725,13.864a11.765,11.765,0,0,1-2.919,3.93c-.019-.19-.039-.378-.055-.568a73.89,73.89,0,0,1-.419-8.19c.067-3.037.857-6.182-.421-9.055-1.091-2.454-4.5-4.12-6.875-2.1-4.677,3.964-4.313,11.253-4.207,16.9.106,5.529.951,11,1.286,16.515.347,5.741.08,11.456-2.418,16.732a32.258,32.258,0,0,1-2.037,3.615c-.315-.164-.636-.318-.963-.45-1.888-.773-4.137,1.158-4.063,3.041a8.741,8.741,0,0,0,.785,3.159q-.972,1.192-1.958,2.37a11.251,11.251,0,0,0-1.647-3.237,88.48,88.48,0,0,0,3.824-10.456c3.181-11.015,2.675-22.413,1.91-33.721-.436-6.43-10.143-5.421-9.931.92.373,11.21.78,22.661-3.133,33.362-1.447,3.964-3.167,7.846-5.014,11.679a60.525,60.525,0,0,1-.556-6.654c-.094-6.008,7.554-15.6.79-20.455a1.884,1.884,0,0,0-2.23-.065c1.023-.869-.407.34-.433.371a15.173,15.173,0,0,0-1.5,1.84,43.19,43.19,0,0,0-2.976,4.884c-1.883,3.663-3.8,7.7-4.3,11.829-.607,4.987.327,10.3.571,15.294.2,4.156-.2,8.628.364,12.85-.07.132-.137.265-.207.4a59.262,59.262,0,0,0-2.627-9.086c-.383-1.045-.783-2.1-1.178-3.155.229-.8.445-1.6.638-2.411,2.512-10.471,1.038-20.255-1.036-30.487a4.768,4.768,0,0,0,3.022-.819c9.871-6.437,12.214-18.41,12.862-29.343.328-5.5.376-11.268,2.136-16.546,1.963-5.9,6.3-10.492,10.632-14.784,1.471-1.459,1.226-4.087.164-5.662a3.267,3.267,0,0,0-.713-.8c-.051-.039-.1-.075-.149-.111-2.24-1.652-4.681-1.11-6.6.7-4.3,4.048-8.344,8.349-10.947,13.7a31.45,31.45,0,0,0-1.719,4.407c-2.028-2-4.3-3.945-5.062-6.728-1.291-4.691,2.018-7.74,2.733-12.017.311-1.859-1.4-4.128-3.47-3.711-6.736,1.356-9.132,9.871-8.075,15.908a20.439,20.439,0,0,0,5.37,10.237c1.893,2.059,4.046,4.561,6.707,5.416q-.1.979-.185,1.953c-.785,9.623.154,22.369-8.392,28.85a44.813,44.813,0,0,1-.063-11.429c.636-4.787,3.884-10.887,2.3-15.564a2.936,2.936,0,0,0-3.708-1.7c-4.535,1.563-6.314,7.619-7.42,11.8a46.618,46.618,0,0,0-1.433,15.005c.462,6.96,2.464,13.678,3.62,20.5a34.266,34.266,0,0,0-2.271,10.343,26.8,26.8,0,0,0,.159,4.007c-.674-.26-1.361-.511-2.035-.785-2.538-5.7-5.3-11.641-4.185-17.854,1.173-6.545-8.744-8.087-10.165-1.674-1.871,8.462,1.305,16.313,4.445,24.033,2.909,7.155,4.156,13.719,3.159,21.038-.889,1-1.83,1.965-2.8,2.9a21.953,21.953,0,0,0-3.737-5.3,36.09,36.09,0,0,0,.922-9.828c-.467-10.319-4.876-19.947-7.923-29.673a3.4,3.4,0,0,0,.063-.592c.067-5.081,4.852-7.836,8.229-11.015a23.705,23.705,0,0,0,6.541-10.55,25.99,25.99,0,0,0-3.6-22.658c-3.364-4.828-10.555.388-7.412,5.291a17.792,17.792,0,0,1-.843,20.159c-1.7,2.235-3.8,4.443-5.609,6.777a29.815,29.815,0,0,1-.043-3.042c.226-5.137,2.625-10.259.954-15.386-1.2-3.67-4.154-5.84-7.164-8,.761-1.751.92-3.986,1.8-5.476,1.828-3.106,3.913-5.481,4.92-9.038a22.363,22.363,0,0,0-3.172-18.5c-3.415-5.252-10.943.34-7.846,5.6a14.037,14.037,0,0,1,1.693,8.953c-.477,3.586-2.786,6.162-4.25,9.346-.236.515-.465,1.067-.672,1.645a28.587,28.587,0,0,1-2.837-5.674c-1.1-3.049-1.144-6.3-2.642-9.214-.609-1.187-2.439-1.931-3.376-.556-5.7,8.366,1.756,21.387,8.195,27.142,1.951,1.741,4.929,2.919,6.586,4.925,1.91,2.3.648,5.65.137,8.274a40.6,40.6,0,0,0,.015,15.316c1.924,10.266,6.709,19.7,8.826,29.9a33.054,33.054,0,0,1,.33,12.019,4.076,4.076,0,0,0-1.428,5.7,43.094,43.094,0,0,1-3.35,7.342,15.537,15.537,0,0,0-2.459-.905c.275-1.688.5-3.391.638-5.117.992-12.31-1.777-23.9-6.184-35.332-1.064-2.765-2.126-5.539-3.212-8.306.072-.135.149-.267.219-.4,4.6-8.932,6.134-24.072-3.256-30.75-2.871-2.042-7.641-.14-7.09,3.781.409,2.9,1.192,5.553,1.678,8.231-1.491-2.868-3.09-5.681-4.843-8.407-.747-1.163-1.539-2.281-2.35-3.376-.265-5.594.479-11.128-.838-16.729a69.591,69.591,0,0,0-7.728-18.336c-1.977-3.47-7.545-.364-6.148,3.244,2.557,6.608,5.678,13.062,6.254,20.221a19.331,19.331,0,0,1,.027,2.16q-1.774-1.691-3.641-3.314a39.209,39.209,0,0,1-7.949-8.71c-2.114-3.316-3.973-6.774-6.2-10.023-3.542-5.18-11.179.395-7.891,5.633,3.612,5.76,6.17,11.935,11.034,16.833,5.115,5.146,11.313,8.578,15.86,14.367,4.893,6.227,8.556,13.572,11.634,21.129-1.508,2.663-3.321,5.18-5,7.687-.031.048-.063.1-.094.142a53.179,53.179,0,0,1-3.374-7.08c-5.04-11.7-14.143-21.165-24.744-28.146-4.939-3.253-10.215,3.058-5.823,7.171,4.128,3.863,8.636,7.282,12.518,11.391a15.971,15.971,0,0,0-3.766.3c-2.529.508-4.8,1.63-7.263,2.329-2.931.833-4.385-.458-6.41-2.452a51.2,51.2,0,0,1-7.066-8.932c-1.847-2.9-2.793-5.606-6.555-6.227a3.711,3.711,0,0,0-3.882,2.081c-2.955,5.664,4.45,13.565,8.009,17.623,3.66,4.173,7.759,8.412,13.729,8.39,5.163-.019,10.044-4.465,15.109-2.921,1.611.491,4.2,2.211,6.712,3.282.8,1.7,1.6,3.424,2.466,5.173a33.606,33.606,0,0,0,4.98,7.342,28.153,28.153,0,0,0-2.529,8.773q-.845-.585-1.724-1.129c-10.777-6.649-24.279-8.149-36.035-12.595-5.777-2.187-11.708-4.547-16.7-8.241a29.361,29.361,0,0,1-6.945-7.044c-1.929-2.832-2.418-5.982-3.822-9.006-1.789-3.858-7.636-3.723-8.465.8-1.105,6.059,2.661,13.062,6.487,17.572a39.458,39.458,0,0,0,4.149,4.171c-.116.039-.234.075-.349.113-4.279,1.512-8.368,4.722-13.03,3-5.471-2.023-8.443-7.867-11.152-12.611-2.56-4.486-10.28-.429-8.1,4.274,4.79,10.338,12.433,22.184,25.712,19.506,5.351-1.079,9.97-4.809,15.576-4.532,4.631.229,8.992,2.582,13.606,2.483.32.118.643.224.963.34a5.757,5.757,0,0,1-.241.79c-.812,2.085-3.535,3.135-5.387,3.937a135.216,135.216,0,0,0-16.055,7.908,66.377,66.377,0,0,1-16.036,7.381c-2.62.742-10.365.79-9.671,5.226.966,6.175,8.8,5.939,13.548,5.035a41.418,41.418,0,0,0,7.162-2.088,14.74,14.74,0,0,1-.482,3.1c-.749,2.553-2.271,4.756-2.854,7.371-.7,3.15,2.7,5.426,5.491,4.522,6.488-2.1,11.441-13.683,7.887-19.884q1.275-.719,2.543-1.454c8.188-4.744,22.769-8.323,24.51-18.425,4.968,1.539,9.96,3.042,14.882,4.843a32.394,32.394,0,0,1,19.436,18.815,68.3,68.3,0,0,0-9.5-8.373c-2.716-2.032-5.992,2.256-3.682,4.595,4.231,4.282,8.848,8.25,11.725,13.628a15.653,15.653,0,0,1,.754,1.671q-1.954-.719-3.957-1.351c-1.558-.491-3.013-.992-4.421-1.582a35.972,35.972,0,0,0-2.006-4.356c-4.9-8.922-14.109-13.738-23.308-17.238-6.148-2.338-10.369,6.8-4.2,9.368a55.162,55.162,0,0,1,10.95,5.729,4.45,4.45,0,0,0-.414,2.4c-1.775.118-3.554.161-5.332.188-2.594.039-9.837-.45-10.167,3.646-.686,8.508,16.416,8.272,24.573,5.953,1.144,3.591,1.96,7.3,3.131,10.875a3.873,3.873,0,0,0,.1,7.386c.783.282,1.575.535,2.367.792a6.123,6.123,0,0,0-2.386,1.214.116.116,0,0,0,.084.207c2.856-.3,5.163,1.192,7.431,2.685a21.952,21.952,0,0,0,2.567,1.845c-1.452,1.151-2.714,2.488-4.149,3.663-2,1.633-3.569,1.12-5.82.248a43.552,43.552,0,0,1-8.527-4.571c-2.423-1.635-4.077-3.422-7.212-2.639a3.143,3.143,0,0,0-2.317,2.926c-.376,5.4,8.065,9.055,12.212,11.015,4.265,2.016,8.891,3.935,13.529,1.91,2.114-.925,3.754-2.774,5.483-4.395.017,3.757,1.642,8.342,3.042,12.583-4.831.674-9.659,1.464-14.413,1.686-5.235.246-10.654.4-15.79-.79a25.072,25.072,0,0,1-7.8-3.143c-2.461-1.556-3.911-3.841-6.03-5.722-2.7-2.4-7.2-.328-6.312,3.47,1.192,5.084,6.5,9.264,11.008,11.487a33.582,33.582,0,0,0,4.643,1.849c-.077.067-.157.135-.231.2-2.82,2.618-4.91,6.492-9.122,6.719-4.944.267-9.24-3.28-12.956-6.061-3.516-2.63-8.144,3.126-4.852,6.054,7.232,6.43,17.2,13.074,26.622,6.524.424-.3.826-.621,1.219-.954-2.856,5.091-4.59,10.687-8.294,15.277-9.17,11.364-19.27-2.538-29.851-.739-13.789,2.346-19.178,15.275-21.839,27.638-5.515-7.314-11.229-14.227-10.695-25.023.039-.754-1.045-1.428-1.536-.638a14.873,14.873,0,0,0-1.327,2.707,28.373,28.373,0,0,0-1.274-4.226c4.436-1.141,8.879-2.29,12.64-4.3,12.961-6.9,23.287-24.195,12.373-37.384-.26-.313-.836-.031-.645.366a21.924,21.924,0,0,1-1.664,22.637,36.214,36.214,0,0,0-1.394-14.873.77.77,0,0,0-1.464.193c-.576,10.107.275,21.9-12.115,24.826-3.94.93-7.894.92-11.788,1.524-.063-.106-.149-.2-.207-.311a13.45,13.45,0,0,1-1.522-5.69,26.527,26.527,0,0,0,1.64-3.111c5.659.489,11.492.262,14.567-3.16,3.143-3.5,2.805-9.558,3.316-13.878.852-7.186,2.1-14.509,1.532-21.746a.435.435,0,0,0-.826-.108c-2.028,5.17-2.871,10.545-3.875,15.995-.515,2.8-.573,6.23-1.609,8.893q.5,4.786-4.366,6.206a6.064,6.064,0,0,1-7.193,2.418c-.258.014-.518.014-.775.022a6.369,6.369,0,0,0-.744-1.864c1.023-3.721,2.264-7.374,3.405-11.061,2.719-.881,5.269-2.054,6.834-3.969,2.622-3.205,2.454-8.373,1.313-13.536a14.735,14.735,0,0,0,.973-1.582c4.4-8.506-3.993-16.91-6.384-24.7-.1-.318-.539-.255-.665,0-3.044,6.24,4.2,13.974,4.231,19.853-.9-2.639-1.862-5.031-2.584-6.837-.742-1.845-4-1.105-3.477.927a95.629,95.629,0,0,1,2.7,11.232,22.036,22.036,0,0,1-6.964,2.312,40.88,40.88,0,0,1-8.183.554c5.984-10.165,3.1-21.671-3.988-33.661-.318-.537-1.125-.022-.92.52,4.554,12.07,8.128,23.289.549,33.049a47.138,47.138,0,0,0-6.671.229c8.395-6.832,5.589-20.816,1.414-29.745a.941.941,0,0,0-1.794.479c1.274,8.036,4.522,20.659-4,25.969a10.126,10.126,0,0,1-1.84.893,18.634,18.634,0,0,0,2.577-9c.308-8.968-4.236-18.454-9.9-25.423a48.9,48.9,0,0,0,9.416-15.776.536.536,0,0,0-.913-.532c-6.834,8.578-13.389,16.852-22.634,23.056-9,6.042-18.93,8.944-29.211,11.976a90.843,90.843,0,0,0-13.82,5.351q1.607-3.078,3.432-6.044c4.917-4.7,9.941-8.327,17.531-9.536,7.261-1.158,13.129-2.247,19.073-6.931,14.307-11.28,20.342-30.03,34.422-41.945a.359.359,0,0,0-.433-.571,86.64,86.64,0,0,0-20.871,19.793c-6.521,8.785-12.592,19.3-23.634,22.911-.368.12-.737.181-1.105.287,1.556-2.107,2.875-4.482,4.1-6.235a107.34,107.34,0,0,0,9.425-15.624c.058-.125-.113-.265-.219-.171a104.878,104.878,0,0,0-10.673,11.6c-2.842,3.441-5.84,9.931-10.025,11.708-.193.082-.275.248-.388.393a50.377,50.377,0,0,0-8.766,2.042c6.069-8.19,12.416-16.216,17.076-25.09,6.656-5.768,16.958-6.485,21.2-15.2,4.183-8.6,1.072-18.095-2.365-26.345-.1-.234-.5-.144-.441.118,1.105,4.946,2.471,9.987,2.235,15.089-.462,9.9-5.623,14.256-14.027,17.982-1.192.527-2.362,1.06-3.5,1.616.212-.542.445-1.069.643-1.618,6.2-17.124,3.063-35.445-2.1-52.334-.113-.378-.657-.185-.633.169,1.173,18.2,4.756,37.854-3.9,54.843-4.515,8.864-10.711,16.664-16.833,24.534-3.229-4.862-2.488-9.953-.609-15.1,13.486-6.769,14.858-27.039,10.769-39.467-.072-.219-.417-.118-.388.1a46.461,46.461,0,0,1-2.654,22.193,30.055,30.055,0,0,1-2.656,5.259,26.542,26.542,0,0,0,1.818-6.95,17.951,17.951,0,0,0-1.811-9.539,36.626,36.626,0,0,0,1.163-12.65c-.075-.795-.207-1.587-.315-2.382a.858.858,0,0,0,.732-.85c.118-8.214,6.1-15.4,4.067-23.585-2.122-8.53-8.361-16.823-11.8-24.98-.036-.087-.19-.053-.166.046,2.377,9.488,11.444,21.97,8.7,31.694-.768,2.719-2.452,5.406-3.554,8.082a101.481,101.481,0,0,0-7.559-18.49c7.417-12.356-5.727-27.792-11.513-37.984-.053-.094-.2-.041-.159.065,2.839,6.475,5.556,13.05,8.243,19.59a20.793,20.793,0,0,1,1.58,11.359c-.13.886-.32,1.717-.515,2.536-6.059-10.808-13.445-20.994-20.221-30-.055-.075-.169.012-.116.087a191.067,191.067,0,0,1,19.576,35.246l.031.07c0,.036,0,.067,0,.1a.958.958,0,0,0,.325.648c4.693,10.911,10.6,23.932,8.9,35.908-.043.308-.125.619-.178.925a79.388,79.388,0,0,0-7.159-8.221c-.147-.154-.446-.029-.347.2,1.811,4.079,4.665,8.214,6.439,12.566-2.213,7.535-6.485,15.154-10.579,22.246a23.553,23.553,0,0,0-.672-3.369c-.855-3.1-2.478-5.881-3.7-8.84-2.714-6.574-1.481-11,.417-17.589,1.674-5.806,2.36-11.388.641-17.317-2.394-8.253-8.86-13.466-13.763-20.171a.188.188,0,0,0-.323.183c2.779,6.413,7.571,12.021,9.828,18.579,2.808,8.159.048,14.109-2.049,21.5a10.26,10.26,0,0,1-2.177-5.129c-.349-3.641,1.031-7.14.219-10.788-1.264-5.681-6.4-10.066-9.353-14.928a.335.335,0,0,0-.592.159c-.2,2.873.833,5.055,2.249,7.549,1.149,2.02,2.62,3.889,3.374,6.117,1.014,2.993.2,5.693-.084,8.693a19.657,19.657,0,0,0,.036,3.634,46.7,46.7,0,0,1-4.917-.78,71.184,71.184,0,0,0-.742-9.606c-3.839-26.08-19.084-48.895-37.271-67.32-.034-.034-.094.024-.06.06,18.162,19.968,32.854,43.062,33.88,70.677.063,1.717.039,3.381-.031,5.016a36.647,36.647,0,0,1-9.062-4.85.275.275,0,0,0-.421.318,15.865,15.865,0,0,0,9.175,8.351c-1.137,10.984-4.925,20.587-8.775,31.52-3.318,9.421-1.115,16.773,1.433,25.989,2.266,8.2.706,14.22-3.451,21.394-1.493-7.434-5.517-15.887-6.89-18.718a.289.289,0,0,0-.551.147,95.206,95.206,0,0,0,2.1,15.67,22.805,22.805,0,0,1-.925,14.126,1.074,1.074,0,0,0,.337,1.2,20.6,20.6,0,0,0-.45,3.138,71.749,71.749,0,0,0-7.566-2.143,36.643,36.643,0,0,1,8.026-10.16c.262-.238.135-.756-.277-.694-4.274.655-7.261,2.037-10.126,5.433a20.254,20.254,0,0,0-1.83,2.569c-.4-7.4,1.067-15.024,3.2-21.962,6.083-19.817,14.8-37.656,12.207-58.294a.618.618,0,0,0,.234-.323c1.447-4.951.183-10.155,1-15.289.747-4.7,2.989-9.353,3.073-14.136.14-8.043-5.917-13.7-12.074-17.938-.2-.14-.513.116-.328.318,3.181,3.5,6.993,7.046,8.414,11.665,1.635,5.308-.511,9.529-1.828,14.627a67.107,67.107,0,0,0-1.633,7.867,74.912,74.912,0,0,0-27.46-36.3.1.1,0,0,0-.125.159,72.5,72.5,0,0,1,25.955,51.968,57.29,57.29,0,0,1-.125,8.046,13.062,13.062,0,0,1-2.288-3.771c-.881-2.312-1.1-4.877-1.941-7.208a30.152,30.152,0,0,0-7.819-11.711c-9.137-8.638-21.122-11.022-33.112-12.965-.2-.034-.3.289-.094.356,14.283,4.734,31.376,10,36.6,25.7,1.69,5.088,2.69,13.124,7.812,15.781-2.011,11.205-6.553,21.743-10.362,32.573-.559-10.4,3.027-21.079-2.769-30.986-.067-.113-.248,0-.2.113,5.317,12.864-4.265,26.86-.012,40.2-.472,1.676-.927,3.357-1.31,5.062a60.3,60.3,0,0,0-1.423,17.288c-2.4-.407-4.836-.848-7.268-1.353a41.331,41.331,0,0,0,3.131-21.416c-.041-.347-.6-.479-.715-.108a155.342,155.342,0,0,1-6.439,17.158c-1.276-10.447,1.7-21.218,4.193-31.26,4.159-16.713,7.434-35.655-2.553-50.968-.082-.128-.258.012-.183.137,11.877,20.491-1.315,42.81-5.755,63.447a79.825,79.825,0,0,0-1.57,10.343c-3.35-3.747-3.037-9.488-3.754-14.35a47.129,47.129,0,0,0-2.054-8.636c3.049-9.95,3.253-21.572-7.2-27.272-.335-.183-.655.291-.443.568,4,5.173,6.856,10.9,5.992,17.623a18.37,18.37,0,0,1-.9,3.542c-4.019-6.69-10.107-10.938-18.056-11.008a.158.158,0,0,0-.041.313c9.242,2.285,13.871,8.982,16.274,16.869a10.507,10.507,0,0,0-.046,1.457c-2.406-.648-4.626-.561-7.523-.78a71.541,71.541,0,0,1-7.294-.963,1.56,1.56,0,0,0-2.1-.905c-.234.106-.453.238-.686.347-.455-.1-.9-.226-1.358-.335-.867-2.709-2.288-5.122-4.318-6.374a.441.441,0,0,0-.694.275,10.537,10.537,0,0,0,.118,4.746c-.294-.094-.595-.169-.886-.267-1.127-.378-2.24-.795-3.34-1.238a13.356,13.356,0,0,1-.267-2.772,33.276,33.276,0,0,0-.258-6.384,17.4,17.4,0,0,0-5.717-10.394c-.13-.118-.279.072-.2.2A25.2,25.2,0,0,1,436.914,448c-.058.549-.116,1.129-.164,1.719-6.574-2.979-12.855-6.63-19.711-8.893-.108-.036-.25.1-.154.2a64.254,64.254,0,0,0,20.541,13.77,4.225,4.225,0,0,0,1.724,1.71,1.032,1.032,0,0,0,1.373-.448q1.976.748,3.966,1.375c-2.529,1.423-5.016,2.926-7.511,4.417a33.177,33.177,0,0,0-14.528-13.334,1.36,1.36,0,0,0-1.616,2.052c3.646,4.46,8.621,8.915,11.224,14.148-.756.426-1.508.862-2.271,1.274-1.671-.072-3.367.725-5.187.467-2.006-.284-3.937-.778-5.9-1.245a12.2,12.2,0,0,0-5.635-.277,22.588,22.588,0,0,0-2.085-1.5c-.436-.275-.913-.527-1.385-.785-.039-10.646-2.153-21.341-9.279-28.416a.45.45,0,0,0-.718.4,156.811,156.811,0,0,1,4.087,25.8,11.856,11.856,0,0,0-8.12.787c-1.394-2.955-2.594-6.032-3.793-9.064-3.268-8.265-5.238-16.643-7.029-25.322a.479.479,0,0,0-.944-.022c-2.268,8.994,5.459,50.244,19.788,48.861a58.408,58.408,0,0,1-3.285,15.87c-2.471,2.035-4.73,4.337-7.492,5.989-3.911,2.338-7.747.3-10.979-2.179q.2-.986.409-1.972a31.1,31.1,0,0,0,5.926,1.6c3.9.578,7.417-.3,9.9-3.412a1.371,1.371,0,0,0,.029-1.43c-.082-.13-.2-.443-.4-.513a1.552,1.552,0,0,0-1.368-.012c3.092-4.123,3.3-10.386,1.154-14.892a.731.731,0,0,0-1.327.152c-1.264,5.818.559,15.985-8.778,14.9-.149-.017-.3-.036-.445-.055.3-.137.6-.262.889-.419,3.634-1.977,6.933-6.107,6.29-10.4-.108-.73-1.122-.749-1.474-.219-1.823,2.731-3.261,5.423-5.669,7.1,2.979-3.458,5.794-9.861,4.472-13.153a.128.128,0,0,0-.171-.051c-3.776,1.625-4.01,7.448-6.447,10.5a5.882,5.882,0,0,1-.436.477c.113-.53.229-1.064.337-1.594.159-.725.3-1.438.417-2.163.26-1.38.5-2.76.7-4.135,1.678-11.583,1.967-27.547-9.4-34.441-.287-.173-.7.055-.556.414,4.838,12.021,5.984,22.364,4.258,34.21a6.724,6.724,0,0,0-1.291,1.676c-.9,1.558-.9,4.286-2.786,4.619a20.643,20.643,0,0,0,3.908-13.38.778.778,0,0,0-1.428-.407c-2.671,4.226-2.432,10.251-6.685,13.247-.149-.029-.3-.055-.445-.082,2.2-2.565,3.22-6.167,3.485-9.729a10.57,10.57,0,0,0,.58-1.11c.063-.142,0-.376-.2-.356-.108.01-.2.034-.311.048a27.454,27.454,0,0,0-.313-4.773c-.2-1.305-2-1.06-2.377-.031a30.022,30.022,0,0,0-1.1,6.259c-.778.47-1.548,1-2.386,1.517-.079.051-.161.094-.241.142-.747-5.681-8.86-4.306-12.845-4.713a23.574,23.574,0,0,1-3.145-.547c3.08-1.57,4.908-4.055,6.5-6.972,3.5.315,7.116.1,9.507-1.893a.454.454,0,0,0-.077-.715c-2.767-1.409-6.326-1.363-9.792-1.394.544-.539,1.084-1.081,1.609-1.638,4.79-.889,7.653-5.575,11.417-8.25.657-.467.551-1.686-.421-1.657-4.869.147-6.935,5.308-11.443,6.256a10.028,10.028,0,0,1-2.837.159,7.876,7.876,0,0,0,5.584-2.584.322.322,0,0,0-.108-.441,8.144,8.144,0,0,0-3.085-.792c1.021-.987,1.951-2.085,2.885-3.128,2.032-2.271,4.525-4.417,5.351-7.41a.411.411,0,0,0-.494-.506c-5.361,1.818-7.578,8.556-12.84,10.42a7.419,7.419,0,0,1-2.394.38c-.084-.014-.166-.036-.25-.053a17.913,17.913,0,0,0,4.267-1.573c3.786-2.2,3.557-6.461.2-8.956a8.409,8.409,0,0,0-2.673-1.31,10.959,10.959,0,0,1,2.11-3.583,20.622,20.622,0,0,1,6.456-4.978c1.363-.648,2.842-1.125,3.692-2.473a3.346,3.346,0,0,0,.479-2.707c-.359-1.428-1.074-1.031-.373-3.056.221-.636.715-1.149.889-1.811.566-2.182-1.158-2.863-2.931-2.668a11.3,11.3,0,0,0-.159-1.65c.5-.094,1.009-.2,1.517-.33,1.806-.474,4.563-1.719,4.72-3.918.084-1.17-.506-1.38-1.344-1.9-.992-.617-.828.443-2.1-1.1-.3-.359-.364-.949-.662-1.329-1.375-1.751-3.855-1.558-5.609-.477a14.742,14.742,0,0,0-2.931,2.94c-1.606,1.763-3.458,2.447-5.4,3.668-2.832,1.78-4.267,6.085-7.5,7.1a7.111,7.111,0,0,1,.034-1.252.407.407,0,0,0,.342-.308,1.939,1.939,0,0,0,0-1.1c1.392-3.528,6.172-4.607,9.481-6.475,1.818-1.026,3.09-3.249,1.028-4.8-2.136-1.6-4.689,0-6.63,1.693.034-.183.067-.366.089-.568a16.287,16.287,0,0,1,.176-3.22c.137-.489.571-.949.609-1.479.185-2.591-3.316-2.5-4.86-1.5a4.774,4.774,0,0,0-2.112,3.408c-.306,1.987,1.235,4.414.279,6.141a4.039,4.039,0,0,0-4.277-2.531c.031-.662-.8-1.3-1.322-.674a32.13,32.13,0,0,0-5.676,11.511c-.13-.2-.231-.4-.34-.607a16.888,16.888,0,0,0,.795-7.593,1.092,1.092,0,0,0-2.09-.029c-.279,1.2-.619,2.408-.975,3.619a4.333,4.333,0,0,0-4.881-.393c.385-1.866.946-3.911-.282-5.454-1.048-1.32-2.553-1.259-3.969-.821.927-2.712,1.349-6.331-1.96-7.381-2.846-.9-4.494,1.96-4.508,4.4-2.721.315-4.968,2.8-1.782,4.7a11.261,11.261,0,0,1,1.635.787c.958.853,1.011,1.975,1.373,3.039a9.916,9.916,0,0,0,1.464,2.545,3.962,3.962,0,0,1,.366,4.017,3.267,3.267,0,0,0,.395,2.647c.812,1.654,2.654,3.046,1.874,5.139.053.751-.169,1.194-.636,1.365a.559.559,0,0,0-.561.055,4.085,4.085,0,0,1-1.341-.294c-.277-.181-.554-.359-.831-.537-.147-.077-.511-.277-.9-.5a15.458,15.458,0,0,0-.113-1.739.6.6,0,0,0-1.086-.164c-.164.253-.258.52-.395.778-.395-.7.026-1.206.036-2.093a4.768,4.768,0,0,0-.8-2.683,3.913,3.913,0,0,0-6.972,1.267c-1.828-.234-4.327.046-4.106,2.435.26,2.791,5.206,3.978,7.583,4.809a3.122,3.122,0,0,0,.157,1.688.846.846,0,0,0-1.508-.166c-.27.45-.549.968-.828,1.515a4.5,4.5,0,0,0-3.513.014,10,10,0,0,0-1.642-2.471c-.891-1.093-1.37-2.6-2.365-3.547a1.931,1.931,0,0,0,.648-.378,3.225,3.225,0,0,0,.532-2,17.059,17.059,0,0,1,.568-5.016c.708-2.148,1.625-4.089,1.633-6.4,0-.364-.01-.722-.026-1.076.026-.019.051-.031.077-.053.747-.554.744-.949,1.055-1.763,1.134-2.957,4.479-4.927,4.932-8.149.554-3.92-3.3-6.016-6.738-5.666a39.273,39.273,0,0,0-.641-5.941c-.14-1.185-.3-2.355-.474-3.523a5.538,5.538,0,0,0,1.9-2.449,9.428,9.428,0,0,0,.26-2.663c.072-1.585.766-2.714,1.132-4.19a4.916,4.916,0,0,0-1.086-4.347,5.057,5.057,0,0,0-5.45-1.512c0-.029.007-.053.012-.082a21.808,21.808,0,0,0-.443-4.368,7.48,7.48,0,0,0-.66-3.015c-.881-1.4-2.379-1.108-3.851-1-1.724.123-4.046.248-4.836,2.122-.624,1.481.108,2.042.92,3.107.727.954,1.156.84,0,1.474a7.624,7.624,0,0,1-2.6.438,2.451,2.451,0,0,0-1.866.761c-2.442,3,2.374,8.236,4.648,10.271a5.174,5.174,0,0,0-3.114,1.414c-2.016,2-1.647,4.474-.838,6.926q2.03,6.152,4.547,12.115c.352.831.71,1.659,1.06,2.492,0,.094,0,.188.01.282-.012.542,0,1.086.036,1.628.01,1.638-.055,3.275-.1,4.915a18.727,18.727,0,0,1-3.078-5.247,19.248,19.248,0,0,1-.855-6.671c0-2.591-.219-5.982-3.268-6.786-2.866-.756-6.326,1.849-6.981,4.575a4.177,4.177,0,0,0,.585,3.174c1.3,2.326,3.186,4.231,4.4,6.644a17.374,17.374,0,0,1,1.955,7.646c.024,2.223-.313,4.4.07,6.606.826,4.763,3.969,8.727,4.91,13.459.845,4.253.335,8.744,2.733,12.58a22.673,22.673,0,0,0,2.367,3.044q.419,2.6.91,5.187a14.492,14.492,0,0,0-3.776-3.552,13.9,13.9,0,0,0-1.269-3.082c-1.151-2.037-2.473-3.981-3.648-6-1.628-2.8-1.17-5.125-1.257-8.154-.132-4.523-2.948-8.419-3.309-12.9-.27-3.323,1.657-8.857-.7-11.754-1.469-1.806-3.88-1.8-5.789-.838a4.576,4.576,0,0,1-2.716.9c-.426-.034-.8-.335-1.257-.335a3,3,0,0,0-.9.157c-1.072.277-1.462.638-2.642.327-1.585-.419-3.492-.93-4.84-.173-.019-2.018-.106-4.12-.207-6.382-.436-9.919,1.093-20.053-.337-29.851a.96.96,0,0,0-1.517-.653c-8.308,6.509-10.379,15.513-11.186,24.977a33.95,33.95,0,0,0-4.556-5.621c-2.194-2.044-5.609-.6-6.769,1.722-3.429,6.851,2.088,16.159,8.046,19.841a7.937,7.937,0,0,0,1.835.816A33.378,33.378,0,0,1,241,425.462c-.592-1.2-1.187-2.447-1.758-3.612-7.947-16.267-7.046-25.432-.12-41.032a34.851,34.851,0,0,0,5.893-5.763c2.909-3.492,7.02-8.306,5.842-13.209a2.53,2.53,0,0,0-2.668-2.134,8.323,8.323,0,0,0-3.5.756,29.657,29.657,0,0,0-.467-3.711c-1.426-7.381-14.047-8.994-14.312-.3-.33,10.774-7.655,17.806-11.494,27.337a38.845,38.845,0,0,0-2.353,9.389,9.691,9.691,0,0,1-.826-.617,8.265,8.265,0,0,1-.833-.927,5.636,5.636,0,0,0-1.365-2.654c-.547-2.244.051-4.616.1-7.342.077-4.335-.258-8.554-3.412-11.752a2.778,2.778,0,0,0-4.672.561c-3.005,5.666-5.881,13.009-5.483,19.8a27.553,27.553,0,0,1-2.666.985c-2.632.8-5.464,1.406-7.7,3.082a.682.682,0,0,0-.27.624c.643,4.178,5.414,6.345,9.185,6.846a18.266,18.266,0,0,0,6.56-.4c3.477,3.251,8.091,5.312,11.942,8.2,1.712,8.542,5.57,16.159,9.235,23.843a51.9,51.9,0,0,1-10.736,1.081c1.127-8.648-5.339-18.066-15.1-16.424a13.793,13.793,0,0,0-6.829,3.4c.32-5.975-.954-11.838-4.662-15.942a.75.75,0,0,0-1.028-.144c-4.417,3.574-5.683,8.465-7.1,13.755-1.442,5.382-3.241,9.218-6.1,12.433a11.536,11.536,0,0,0-.224-5.958c-.414-1.223-1.727-4.383-3.6-3.925a12.328,12.328,0,0,0-4.684,2.459l-.226-.744a11.738,11.738,0,0,0,5.245-4.889,4.2,4.2,0,0,0-.91-5.233l4.97-.91a2.206,2.206,0,0,0,1.794-2.972,25.405,25.405,0,0,1-2.052-8.99,10.853,10.853,0,0,0,1.929-.624c4.294-1.939,4.725-6.969,1.45-10.052a10.306,10.306,0,0,0-2.247-1.563c.53-2.661,1.146-5.322,1.7-7.981.234-.47.445-.91.607-1.235a4.074,4.074,0,0,0,1.252.491c.094.506.164,1.026.246,1.556a1.646,1.646,0,0,0,2.96.537,5.032,5.032,0,0,0,.73-2.82,8.121,8.121,0,0,0,.884.84c1.414,1.125,3.745,2.061,4.946.2a.79.79,0,0,0-.07-.925,15.076,15.076,0,0,0-1.818-1.654,16.521,16.521,0,0,1-1.657-2.081,23.08,23.08,0,0,0,3.8,1.611,1.283,1.283,0,0,0,1.623-1.476,4.573,4.573,0,0,0-1.65-2.464,5.387,5.387,0,0,0,2.668-.2.876.876,0,0,0,.491-.763,2.719,2.719,0,0,0-.874-1.922,13.252,13.252,0,0,1,1.476.537c1.63.7,2.772-1.565,1.777-2.743a5.753,5.753,0,0,0-1.529-1.257,4.754,4.754,0,0,0,.128-3.682,1.931,1.931,0,0,0-2.136-1.038,1.993,1.993,0,0,0-1.317-2.329c-1.881-.679-3.321-.224-5.144.388-3.521,1.182-6.988.975-7.9-3.379a1.071,1.071,0,0,0-.472-.65c.908-.313,1.849-.544,2.789-.8.985-.27,1.5-1.8.433-2.355a6.775,6.775,0,0,0-3.277-.694,6.209,6.209,0,0,0,.25-1.072,12.341,12.341,0,0,0-.828-3.249,19.58,19.58,0,0,1,4.176,0c3.877.361,4.645,1.24,5.076,4.448.289,2.15-.1,2.394,1.166,4.214.937,1.346,2.805.472,3.314-.713.188-.26.376-.523.563-.785,1.351,1.281,3.422,1.144,6.04.877,2.2-.224,4.075-.438,5.17-2.68,1.163-2.377-.694-3.53-.595-5.288.014-.282.778-2.519.9-3.268a1.414,1.414,0,0,0,.012-.219,8.978,8.978,0,0,0,1.149.082c2.76.043,3.713-1.864,3.422-3.807a11.872,11.872,0,0,0,6.406-1.175,1.812,1.812,0,0,0-1.2-3.374,14.848,14.848,0,0,1-6.466-.111,3.255,3.255,0,0,1,2.981-1.411c2.271.34,2.384-2.839.641-3.627-2.521-1.141-5.069.2-6.82,2.047a12.05,12.05,0,0,0-1.081,1.353,11.68,11.68,0,0,0-3.653-.92,8.482,8.482,0,0,0-2.4.21.9.9,0,0,0-.506-.13,16.144,16.144,0,0,1-2.721-.094c.176-.132.347-.267.532-.4,2.832-2.025,3.147-1.618,6.215-1.24,3.309.409,6.827-.6,7.759-3.961a.666.666,0,0,0,0-.207,9.275,9.275,0,0,0,1.1-.547,1.9,1.9,0,0,0,.958-2l-.12-.905a.529.529,0,0,0-.486-.409,29.156,29.156,0,0,0-4.327.007,13.267,13.267,0,0,0,2.387-3.347c1.134-2.278-2.025-4.484-3.424-2.2a11.213,11.213,0,0,1-5.016,4.419,6.812,6.812,0,0,1,2.517-4.881c1.659-1.3,3.639-1.678,5.531-2.485a.993.993,0,0,0,.089-1.712,6.487,6.487,0,0,0-3.916-.985q.4-.47.78-.949c1.373-1.715-1.308-3.841-2.885-2.456a32.856,32.856,0,0,0-3.453,3.511c.33-2.786.992-5.387,3.754-7.058,1.546-.934.845-3.617-1.113-3.126a7.512,7.512,0,0,0-2.844,1.4c.561-2.03.532-4.286-2.288-4.241a1.567,1.567,0,0,0-1.5,1.045,1.1,1.1,0,0,0,.111,1.182c.443.578-1.052,2.856-1.558,3.8a8.511,8.511,0,0,0-1.866-5.255c-1.064-1.322-3.6-.142-3.049,1.544a11.68,11.68,0,0,1,.491,2.278,4.558,4.558,0,0,0-1.442-.573c-.691-.137-1.454.055-2.119-.108-2.567-.629-2.126-2.772-.816-4.185,1.228.1,2.437-1.252,1.373-2.346-.214-.222-.431-.441-.645-.662a1.751,1.751,0,0,0-1.577-.532c-2.6-2.461-5.941-2.309-8.171.983-.53.785.026,1.765-.361,2.529a8.333,8.333,0,0,1-2.967,2.96,37.12,37.12,0,0,1-.759-6.3,5.928,5.928,0,0,1,2.16-4.645c4.5,1.361,9.5,1.768,14.213,2.372,2.3,2.444,5.144,4.612,7.8,5.373a1.424,1.424,0,0,0,1.8-1.638,9.582,9.582,0,0,0-1.161-2.938c1.7.951,3.754,1.941,4.51,1.512l.106-.063a1.266,1.266,0,0,0,.66-1.375,8.061,8.061,0,0,0-1.678-2.8,2.408,2.408,0,0,0,1.11-1.168c2.187,2.1,4.679,3.858,7.759,3.316a1.506,1.506,0,0,0,1.154-1.78c-.7-2.259-2.485-4.373-4.479-6.348a11.521,11.521,0,0,0,5.912-.766,1.339,1.339,0,0,0,.12-2.307,30.737,30.737,0,0,0-7.646-3,3.663,3.663,0,0,0,1.469-1.327,1.094,1.094,0,0,0,.058-1.11,5.717,5.717,0,0,0-4.041-2.143c1.748-.294,4.144-.544,4.318-2.182a2.928,2.928,0,0,0-.161-1.368,7.1,7.1,0,0,0,3.554-.547,1.531,1.531,0,0,0,.672-2.035c-.041-.075-.092-.14-.135-.212a6.631,6.631,0,0,0,4.754-1.334c4.426-3.244-1.209-11.073-2.981-14.023-1.712-2.846-3.4-5.724-4.833-8.72-.166-.347-.323-.694-.477-1.043,6.62,1.8,12.708,5.748,18.413,9.8,7.249,5.151,14.673-6.013,7.706-11.306-10.425-7.923-22.357-14.938-35.934-14.206-.619.034-1.233.089-1.842.147a4.649,4.649,0,0,0-.448-4.491,1.954,1.954,0,0,0-2.919-.58,16,16,0,0,0-.674-6.895,21.607,21.607,0,0,1,4.241-3.887,43.5,43.5,0,0,1,33.7,8.973c5.5,4.289,10.707,8.862,15.937,13.389-10.266,9.043-4.113,27.995-3.766,40.553q.051,1.947.128,3.889c-9.541.337-19.236,14.039-17.079,22.829.927,3.783,5.9,6.023,8.99,3.022,2.565-2.488,4-5.748,6.379-8.383a19.846,19.846,0,0,1,3.184-2.714,54.568,54.568,0,0,0,2.647,9.539c2.3,5.984,7.525,14.988,15.219,11.752,5.534-2.329.157-11.094-.836-14.572-2.2-7.7-2.733-15.3-2.846-23.258a179.116,179.116,0,0,0-2.261-23.648c-.39-2.649-1.1-6.459.7-8.835a7.683,7.683,0,0,1,.73-.824c.354.279.7.568,1.06.848,3.123,5.271,8.855,8.542,12.361,13.6,4.246,6.129,3.239,13.953,5.763,20.741,6.266,16.855,25.09,17.17,40.2,15.325,6.878-.838,6.081-12.39-.816-12.132-7.294.272-16.021,1.016-22.157-3.735-5.228-4.051-4.443-10.911-5.724-16.8-.034-.157-.077-.315-.113-.472a52.461,52.461,0,0,0,7.648,1.756c7.812,1.154,18.413.494,24.525-5,4.561-4.1.616-10.791-5.023-10.1-4.424.537-8.349,2.194-12.92,2a39.373,39.373,0,0,1-12.876-2.9c-7.7-3.044-14.543-8.077-21.076-13.062-13.3-10.141-24.464-24.317-39.578-31.809q-1.232-.61-2.492-1.156a37.692,37.692,0,0,0,8.2-9,45.3,45.3,0,0,0,11.838.47c2.6-.248,5.117-.561,7.61-.848,2.976,2.078,6.748,3.8,8.436,5.269,5.305,4.631,3.672,13.25,7.268,19.087,4.159,6.748,11.853,8.4,19.164,9.6,7.109,1.17,21.281,3.983,25.649-3.318a4.907,4.907,0,0,0-.356-5.837c-3.342-3.8-7.082-2.976-11.675-3.027A68.548,68.548,0,0,1,282,211.6c-3.687-.884-6.174-1.623-7.28-5.512-.93-3.263-1.25-6.613-2.444-9.823a21.106,21.106,0,0,0-2.3-4.455c7.391,1.5,14.439,4.188,21.724,6.134,7.754,2.071,11.234-8.3,4.072-11.593-15.369-7.061-32.512-10.692-49.345-8.176a71.711,71.711,0,0,1-10.415,1.156c.034-.07.065-.137.1-.207,1.676-3.651,3.265-7.46,5.233-11.027,10.75-1.825,21.671-2.844,32.18-1.691,9.767,1.072,18.013,5.654,27.45,7.817,8.978,2.054,17.791.609,26.872.648,8.26.034,9.242-12.484.872-12.85-5.25-.229-10.488.1-15.737.036A52.594,52.594,0,0,1,297.5,159.2q-3.153-.975-6.317-1.787a25.1,25.1,0,0,1,2.473-1.481c8.544-4.371,18.068-5.373,27.376-7.121,5.079-.954,4.708-9.411-.621-9.209-8.876.337-17.806,1.305-26.266,4.137-7.289,2.442-13.059,7.157-19.607,10.781-1.816-.149-3.641-.26-5.486-.287-4.33-.065-8.648.1-12.953.433,3.386-1.329,6.947-2.3,10.536-3.877,4.843-2.126,3.663-8.84-.669-10.646-14.174-5.907-30.314,6.432-37.242,17.883-.106.173-.2.352-.306.527-2.372.433-4.732.886-7.1,1.334.318-1.476.638-2.919.98-4.291.2-.814-1.064-.978-1.281-.193-.438,1.585-.855,3.179-1.267,4.778-1.009.193-2.023.381-3.029.571-.626.118-1.245.246-1.866.368a26.873,26.873,0,0,0,.585-9.751,111.774,111.774,0,0,0,14.215-4.248,54.531,54.531,0,0,0,17.421-10.716c2.627-2.418,5.546-6.184,9.5-5.65,3.441.467,6.868,3,10.215,3.978,11.058,3.229,31.087,2.512,36.6-9.779.908-2.023-1.221-3.564-3-3.42-4.356.349-8.087,2.586-12.327,3.477a38.314,38.314,0,0,1-8.438.778c.513-.638.98-1.284,1.4-1.912,2.6-3.88,3.9-8.291,7.648-11.342a18.863,18.863,0,0,1,11.366-4.366c8.149-.193,9.23-12.6.867-12.773-8.85-.181-17.2,2.82-23.255,9.392-3.34,3.624-4.578,7.643-6.827,11.882-1.081,2.035-3.513,3.778-4.968,5.861-4.566-1.876-9.105-3.694-14.119-2.471-7,1.71-11.142,8-16.823,11.858A39,39,0,0,1,231.435,134c1.385-3.68,2.423-7.593,3.774-11.073a23.87,23.87,0,0,1,22.331-15.08c7.773.106,8.667-11.658.819-12.07A34.939,34.939,0,0,0,230.072,107.6a31.529,31.529,0,0,0-7.41,14.769c-1.247,6.037-1.026,13.363-6.757,17a4.351,4.351,0,0,0-.629.484c-10.076,2.584-20.645,4.236-30.449,7.86a10.3,10.3,0,0,0,.354-5.1c10.687-1.828,21.461-3.858,29.546-11.68,6.3-6.1-2.406-16.2-9.026-10.29-7.8,6.969-19.316,6.9-29.114,8.7-1.782.327-3.521.747-5.243,1.206a64.332,64.332,0,0,1,9.433-8.626c11.995-8.949,27.036-11.07,40.055-17.96a62.662,62.662,0,0,0,16.057-12.13c3.981-4.183,9.621-10.432,8.219-16.645a3.9,3.9,0,0,0-4.537-2.984c-6.43,1.488-11.087,9.428-16.082,13.5a60.382,60.382,0,0,1-13.04,7.94c1.377-14.182,16.529-22.056,26.916-29.688q1.055-.773,2.093-1.577c2.839,2.4,7.191,3.075,10.858,3.766a27.452,27.452,0,0,0,15.4-1.117c7.6-3.039,15.607-11.711,12.426-20.257-.975-2.625-4.756-2.964-6.649-1.312-4.364,3.8-5.51,9.674-11.747,11.506-3.7,1.088-7.506-.106-11.2-.992a42.067,42.067,0,0,0,3.8-5.028c4.267-6.69,6.319-14.266,7.911-21.953.708-3.427-.388-6.562-3.836-7.93-.077-.029-.152-.06-.229-.089a4.383,4.383,0,0,0-1.414-.243c-2.533-.094-5.693,1.471-6.319,4.154-1.849,7.889-4.031,16.007-9.356,22.352-4.771,5.683-11.3,9.784-17.319,14.006-11.973,8.395-23.944,19.429-24.346,35.072a6.28,6.28,0,0,0,1.19,3.983c-13.088,4.833-25.245,10.028-35.39,20.2l-.024.026a1.355,1.355,0,0,0-1.2-1.081c-3.181-.14-5.214,3.427-5.416,6.259a8.205,8.205,0,0,0,.166,2.189,75.375,75.375,0,0,0-9.664,16.426c-.234.188-.477.356-.71.549-1.426,1.173-2.781,2.4-4.091,3.672a2.31,2.31,0,0,0-2.1,1.341,11.254,11.254,0,0,0-.564,1.358q-1.134,1.21-2.218,2.464c-.094-1.021-.183-2.04-.243-3.054a1.512,1.512,0,0,0,.094-.26c.6-2.278,3.061-2.984,4.937-4.041a11,11,0,0,0,4.128-4.017,12.046,12.046,0,0,0,.92-10.6c-.97-2.545-4.792-1-3.928,1.556a8.257,8.257,0,0,1-2.642,8.978c-1.014.816-2.206,1.575-3.282,2.423a13.666,13.666,0,0,1,.323-1.373c.677-2.285,2.331-4.323,2.153-6.815a4.88,4.88,0,0,0-.258-1.252c1.175-2.182,2.485-4.349,3.87-6.613.395-.648.783-1.305,1.175-1.955,5.194-2.326,10-5.912,14.865-8.6,5.845-3.225,12.542-5.9,17.787-10.076,4.337-3.456,7.588-8.45,10.432-13.144a57.245,57.245,0,0,0,3.468-6.781,20.726,20.726,0,0,0,1.04-2.981c.014-.053.385-2.514.116-.749a2.493,2.493,0,0,0-1.638-2.471c-10.254-4.229-15.807,11.123-22.7,15.229a81.531,81.531,0,0,1-7.954,4.034c3.066-4.768,6.271-9.428,9.763-13.84,9.428-11.915,22.73-19.479,35.737-26.916,7.357-4.2,1.7-15.86-5.914-11.843-13.394,7.061-26.706,14.478-37,25.786-9.712,10.668-16.9,23.46-24.349,35.78a169.239,169.239,0,0,0,7.8-16.59c3.143-8.231,5.206-17.189,10.076-24.652,4.25-6.516,10.56-10.82,17.329-14.451,6.5-3.492,13.317-6.37,19.677-10.129,6.5-3.836,15.039-8.534,16.267-16.59.626-4.1-3.656-6.767-7.21-6.278-4.161.571-7.183,3.665-10.589,5.871a98.491,98.491,0,0,1-9.606,5.267c-.229.113-.458.224-.684.337a15.653,15.653,0,0,1,2.42-6.047c3.882-4.913,11.265-5.269,15.256-10.533,1.792-2.362.624-6.858-2.5-7.547-7.677-1.691-16.98,1.664-22.771,6.875s-9.885,15.807-8.065,23.491a5.92,5.92,0,0,0,.537,1.394c-1.507.831-3,1.686-4.467,2.589-6.721,4.14-12.862,9.033-17.454,15.513-4.624,6.519-7.335,14.119-9.9,21.632a56.091,56.091,0,0,0-.527-7.14c-1.269-9.028-2.63-16.566,1.144-25.266,3.528-8.132,9.753-14.579,16.007-20.693,4.869-4.758,12.85-10.059,14.439-17.045a1.6,1.6,0,0,0-1.38-2.078c-7.518-1.332-16.257,4.809-22.107,8.807a60.979,60.979,0,0,0-18.208,19.171,51.517,51.517,0,0,0-6.986,19.643c-.034-.2-.075-.388-.1-.59-1.392-9.209,1.269-17.584,4.578-26.075,2.9-7.444,7.855-16.965,5.69-25.083A2.471,2.471,0,0,0,124.523.239c-7.677,3.506-12.428,13.722-15.952,20.944-3.983,8.161-7.251,16.859-7.773,26.008a48.388,48.388,0,0,0,5.765,25.456c3.468,6.427,9.259,11.212,12.7,17.531-2.716,14.353-9.96,27.59-13.2,41.9a27.13,27.13,0,0,1-1.028-2.615c-.506-1.512-.629-2.834-2.252-3.533a1.727,1.727,0,0,0-1.979.506c-1.965,2.218.482,6.6,1.628,8.819a14.684,14.684,0,0,0,2.444,3.668q-.34,2.8-.479,5.6c-.881-.52-1.748-1.052-2.577-1.626a31.555,31.555,0,0,1-6.591-5.565A13.61,13.61,0,0,1,92.9,133.39c-.549-1.488-.417-2.96-.708-4.477a2.056,2.056,0,0,0-3.9-.583c-1.178,2.6-.27,6.17.946,8.626a18.081,18.081,0,0,0,1.4,2.338l-.171.012c-2.1.2-4.294,1.194-6.2-.1-2.235-1.517-2.914-4.477-3.6-6.914-.648-2.3-4.575-1.337-4.123,1.021.995,5.185,3.1,11.364,9.38,11.636,2.529.111,5.023-1.055,7.516-.306,2.057.619,3.754,2.163,5.842,2.632.13.089.265.173.395.26a2.365,2.365,0,0,1-.2.328c-.6.848-1.941,1.019-2.866,1.173a63.21,63.21,0,0,0-8.108,1.77,30.728,30.728,0,0,1-8.043,1.536c-1.127.039-4.019-.614-4.756.727-.036-.053-.07-.1-.108-.157-1.512-14.29.821-31.667,2.358-44.262a.173.173,0,0,0-.342-.051c-2.805,13.24-5.014,26.073-5.394,39.39-1.247-1.881-2.442-3.764-3.526-5.647-5.255-9.115-2.728-18.133-8.775-26.47-.169-.231-.583-.014-.448.25,4.578,9.093-.075,19.287,4.135,28.455a35.128,35.128,0,0,0,4.824,7.09,55.214,55.214,0,0,1,3.8,5.551c.2,5.7.072,12.951,3.648,17.893,2.839,3.928,5.688,5.76,8.426,7.826-3.415,7.651-7.59,14.324-8.715,21.606-2.1-1.924-3.2-6.254-2.594-14.656.3-4.234,2.557-6.7,1.963-11.342-1.493-11.634-10.863-23.084-17.464-32.2-.1-.137-.291.017-.207.157,4.171,6.878,9.351,15.191,11.831,23,2.6,8.2-.884,15.985-1,23.643-.108,6.9,1.084,11.061,4.077,17.56a2.138,2.138,0,0,0,2.131,1.276c.426-.022.843-.06,1.267-.087a25.278,25.278,0,0,0,1.428,5.17c2.191,5.623,7.463,8.573,5.8,15.27-3.658-2.22-7.241-4.679-10.047-8.373a27.7,27.7,0,0,1-3.624-6.382c-.079-1.977-.226-4.164-.241-6.842a70.432,70.432,0,0,0-1.789-14.774c.465-6.856,1.088-13.847-.448-20.821a41.177,41.177,0,0,0-12.2-21.127c-1.9-8.77-2.492-17.765-.135-27.292.14-.566-.807-.84-.99-.282a54.2,54.2,0,0,0-2.02,24.777c-.932-.771-1.883-1.524-2.875-2.249-.412-.3-1.064.258-.672.657A53.537,53.537,0,0,1,51.8,154.2c1.756,9.811,5.409,19.458,8.9,29.618.226.66.421,1.293.631,1.941q-.083,2.911-.388,5.96c-.176,1.777-.393,3.511-.607,5.228-1.642-1.8-4.462-4.156-3.535-2.5-3.841-6.851-2.991-13.7-3.959-20.7-.722-5.209-.917-9.163-3.675-13.594-.922-8.583-5.739-15.48-9.647-22.429,2.553-7.932,4.32-16.1,7.251-23.947,2.875-7.692,7.5-14.991,9.44-22.952.058-.234-.25-.3-.383-.164-5.991,6.15-9.163,15.3-12.241,23.169a124.9,124.9,0,0,0-6.317,19.59c-3.8-8.019-5.139-16.568,3.08-28.211a.215.215,0,0,0-.34-.265c-5.941,6.023-12.934,14.41-10.822,23.67.857,3.757,2.543,5.281,4.655,8.152,4.378,5.941,7.475,11.21,9.117,16.628-7-5.368-16.334-7.167-25.187-6.916a1.444,1.444,0,0,0-1,2.35,71.467,71.467,0,0,1-8.539-2.177A29.09,29.09,0,0,1,0,141.9v7.381c11.732,6.777,21.919,9.476,22.2,26.193.063,3.788-.311,7.643.173,11.109a58.332,58.332,0,0,0-5.553,2.786,23.258,23.258,0,0,0,.039-10.861,1.771,1.771,0,0,0-1.914-1.529c-.176.026-.332.072-.506.1a2.362,2.362,0,0,1-.079-.393,1.688,1.688,0,0,0-.559-.4.837.837,0,0,0,.564-.513c-.007-.448.364-.665.258-1.178-.467-2.3-5.218-2.37-4.058-5.45a1.133,1.133,0,0,0-.9-1.544l-1.154-.14a1.132,1.132,0,0,0-1.252.966c.169-1.765-3.167-1.623-4.395-1.635a2.381,2.381,0,0,0-.058-.787c.246-.176.506-.347.766-.525a.96.96,0,0,0-.465-1.7,3,3,0,0,0-1.688.33,4.576,4.576,0,0,0,.224-.679c.238-1.031.144-2.5-1.154-2.661a.47.47,0,0,0-.474.272L0,161.089V709.368H1569.065ZM755.83,467.378a36.574,36.574,0,0,1-1.84-5.322c.79.217,1.582.431,2.37.648a5.713,5.713,0,0,0-.53,4.674M218.479,172.826c.229-.053.455-.113.686-.166l2.6-.583q-.795,1.774-1.609,3.535c-.727-.253-1.459-.523-2.2-.792q.267-1,.515-1.994m-2.43.58c-.067.207-.132.414-.2.621-.308-.118-.614-.231-.927-.349.376-.094.756-.181,1.132-.272M56.442,161.64a43.839,43.839,0,0,1,4.226,13c-1.493-4.323-2.952-8.645-4.226-13M43.561,185.406c.219-.132.39-.3.619-.431a1.476,1.476,0,0,0,.217-.178,16.6,16.6,0,0,0,1.647,6.365c3.839,7.639,11.357,10.495,5.069,18.67a13.246,13.246,0,0,0-.65-6.384c-2.389-6.873-7.7-9.707-6.9-18.042M24.792,152.814c8.409,3.86,15.932,7.93,18.572,17.625A58,58,0,0,1,41.134,178c-.583,1.585-1.055,2.9-1.476,4.106a56.892,56.892,0,0,0-11.588,2.346c-1.356-9.45,2.878-24.789-3.277-31.633m10.288,65.123a30.982,30.982,0,0,1-1.137-3.333c-2.37-8.667-1.442-17.8,3.923-24.344a37.245,37.245,0,0,0,1.088,7.747c.313,1.474,3.668,1.777,4.07,3.143,2.651,8.982-2.215,13.652-7.944,16.787m17.955,18.824a34.369,34.369,0,0,1-6.319-3.554c-1.753-5.238,3.338-9.12,5.792-12.366,2.726-3.607,5.3-6.254,7.123-8.951a31.671,31.671,0,0,0,1.329,6.454,34.677,34.677,0,0,0,2.025,4.939c-1.618,5.25-4.3,8.578-9.95,13.478m26.015,2.753a53.515,53.515,0,0,1-19.662-.633c-.3-.07-.58-.173-.877-.25a53.33,53.33,0,0,0,6.981-7.908c.436-.612.759-1.17,1.1-1.741a34.948,34.948,0,0,0,8.506,7.653c1.743,1.127,3.07,1.9,4.173,2.579-.077.1-.144.2-.224.3M81.834,161.6c-1.105-1.532-2.206-3.073-3.335-4.633a11.8,11.8,0,0,0,2.555.424,19.45,19.45,0,0,0,3.458-.142,6.9,6.9,0,0,1-.564,1.339c-.626,1.064-1.558,1.888-2.112,3l0,.014m2.379,3.316c-.161-.231-.34-.47-.506-.7.034,0,.06.019.092.017,3.155-.222,6.683-4.881,5.78-8.067.436-.12.872-.246,1.308-.371,4.214-1.223,11.176-1.211,13.093-5.563.092.058.185.113.279.171-.012,1.9,0,3.807,0,5.712-.5-.378-1-.747-1.515-1.1-2.5-1.736-5.426,1.9-2.94,3.747a24.546,24.546,0,0,1,4.417,3.983c0,.311-.01.621-.019.932-1-.157-2-.366-2.989-.595-1.17-.272-4.376-1.3-4.982.508-1.016,3.02,3.776,4.768,7.735,5.267-.111,1.756-.26,3.511-.482,5.252a35.9,35.9,0,0,1-2.743,4.792c-4.547-.265-5.647,1.505-16.532-13.984m5.917,23.925a35.313,35.313,0,0,1-3.362,1.768,17.94,17.94,0,0,0,1.038-4.643,21.957,21.957,0,0,1,2.324,2.875m-8.571,12.929a20.161,20.161,0,0,1,2.379-5.356,75.346,75.346,0,0,1,10.444,1.693c.1.349.144.679.234,1.026-.063.031-.132.067-.193.1-4.638,2.4-9.63,5.592-13.647,6.406.2-1.141.443-2.386.783-3.87M93.992,220.3q-1.12,2.044-2.242,4.087a1.634,1.634,0,0,0,.973,2.24c-.169.881-.344,1.739-.5,2.659a51.474,51.474,0,0,0-1.108,7.557c-.219.065-.431.145-.65.21-.472-.328-.961-.636-1.447-.949,2.709-5.6,1.917-10.131-1.9-16.416-3.013-4.961-6.158-4.238-6.728-8.207A59.274,59.274,0,0,0,90.31,209.6c.477-.137,2.613-1.086,5.375-2.17A65.11,65.11,0,0,1,93.992,220.3m25.774.183c-.7,4.506-6.656,7.848-12.238,10.256a14.682,14.682,0,0,0-4.9-1.19,4.77,4.77,0,0,0-3.733,1.5c.258-2.548,1.117-5.373,1.888-8.939.749-.455,1.536-.92,2.348-1.382a8.5,8.5,0,0,0,10.752.4,6.481,6.481,0,0,1,5.922-.987c-.014.113-.022.219-.039.337m14.6-63.811c.137-.653.262-1.305.383-1.96q.051.686.082,1.373c-.154.2-.311.39-.465.588m6.849,20.476q.816-1.185,1.541-2.427c.046.515.07,1.033.125,1.546-.564.282-1.122.571-1.666.881m46.53,149.717c1.1.067,2.244.135,3.379.2a4.395,4.395,0,0,0,.771.342c-2.989,1.332-2.389,2.5-6.208,3.193a30.867,30.867,0,0,1-2.126-2.565,7.668,7.668,0,0,1,4.185-1.173m-11.371,9.158a15.544,15.544,0,0,1,7.205-.419,10.8,10.8,0,0,0,2.938.087,9.635,9.635,0,0,0,3.215.754c-1.247.253-2.495.52-3.759.737-3.222.554-5.418.932-8.645-.467a13.18,13.18,0,0,1-1.228-.619l.275-.072m-6.309-15.894a1.349,1.349,0,0,0,.051-.217c1.524-.992,2.769-2.256,4.513-3,1.963-.833,1.652,1.334.7,2.319a24.4,24.4,0,0,1-2.389,1.975,22.992,22.992,0,0,1-2.2,1.741c-.2.12-.376.234-.537.328l-.383-2.579c.084-.2.159-.352.243-.568m17.847-73.863.036-.029a54.942,54.942,0,0,0,2.382,5.575c-2.952.932-5.919.727-8.65,1.7a15.735,15.735,0,0,0,3.172-3.458,2.208,2.208,0,0,0,.2-.616,17.724,17.724,0,0,1,1.635-.886,2.171,2.171,0,0,0,1.221-2.288m21.358-58.884a33.784,33.784,0,0,1-2.584,3.212c-6.644.737-14.3-.983-21.144-1.951.352-.164.7-.328,1.074-.465,5.267-1.963,9.146-2.471,13.288-5.161a94.481,94.481,0,0,0,9.958,3.48c-.2.294-.385.592-.592.884m-26.227-20.142a21.167,21.167,0,0,0,4.441-8.05c.029-.1.063-.21.094-.313.626-.258,1.25-.515,1.9-.751,8.031-2.926,16.44-4.515,24.751-6.468a28.407,28.407,0,0,1-2.473,10.109,126.512,126.512,0,0,0-19.157,5.7,7.967,7.967,0,0,0,1.717-3.725.855.855,0,0,0-.927-.963c-2.933.149-5.572,2.8-7.742,4.549-2.473,2-4.975,3.766-8.188,4.286-.072.012-.14.019-.21.029a18.013,18.013,0,0,0,5.794-4.4m-5.052-19.6a34.414,34.414,0,0,1,.727-3.728q.928-.228,1.878-.433a6.819,6.819,0,0,1-.891,2.979,5.462,5.462,0,0,1-1.756,1.442c.014-.087.026-.173.041-.26m1.423,15.6a14.682,14.682,0,0,1-1.507,1.541,10.214,10.214,0,0,1-2.644,1.666,42.567,42.567,0,0,1,4.152-3.208m-7.191,15.292a87.947,87.947,0,0,0-7.578,6.278,10.38,10.38,0,0,1-2.266-.812,66.889,66.889,0,0,1,4.787-8.313,31.253,31.253,0,0,0,4.968,1.683c.484.087.973.147,1.464.2-.46.323-.922.636-1.375.968M166.152,158.5a38.179,38.179,0,0,0,4.041-11.8c.855-.359,1.727-.689,2.608-1-.5,2.348-.742,4.737-1.18,7.1-.125.674-.27,1.341-.441,2a49.512,49.512,0,0,0-5.755,4.893c.248-.39.494-.785.727-1.185m-8.152.653c.525-2.261,3.735-5.043,3.352-7.6,1.074-.747,2.167-1.438,3.28-2.083a28.077,28.077,0,0,1-3.564,8.046c-1.1,1.623-2.3,3.176-3.564,4.7a28.012,28.012,0,0,1,.5-3.056m2.844,185.432a28.017,28.017,0,0,1,5.24-4.956,16.992,16.992,0,0,1,3.814-.588,9.7,9.7,0,0,1,4,.934c-3.935,1.081-7.489,2.7-9.941,5.267a12.839,12.839,0,0,0-3.116-.657M264.6,429.647a3.207,3.207,0,0,0,.426,1.341,29.78,29.78,0,0,0-3.668-1.274,31.383,31.383,0,0,0-4.937-.922c.359-.619.72-1.238,1.05-1.842a32.715,32.715,0,0,0,3.355-8.905,4.868,4.868,0,0,0,1.575,2.143c2.536,2.028,5.476,2.871,5.332,6.521a2.778,2.778,0,0,0-3.133,2.938m9.991,26.591c.494-3.817,1.25-8.077,1.028-11.93.648.877,1.276,1.765,1.842,2.678,1.231,1.989,1.6,4.214,3,6.121a9.848,9.848,0,0,1,1.4,2.748,41.159,41.159,0,0,0-7.27.383M310.4,431.812a10.641,10.641,0,0,1-1.618,3.058,8.806,8.806,0,0,0-.412-1.127,18.68,18.68,0,0,0,.354-3.706c0-.065-.046-.106-.06-.164a3.533,3.533,0,0,0,1.168,1.423,3.639,3.639,0,0,0,.626.3c-.022.072-.036.142-.058.214m2.264,4.431c-.4.306-.787.576-1.166.833a6.58,6.58,0,0,0,.819-1.288,21.736,21.736,0,0,0,1.293-3.839,15.1,15.1,0,0,0,1.748-.4c.055.111.128.193.188.3a8.372,8.372,0,0,1-2.883,4.4m13.531-5.267c-.048-.157-.091-.291-.152-.5a4.667,4.667,0,0,0-.166-.862,12.114,12.114,0,0,1-1.563-4.123,10.121,10.121,0,0,0-1.074-3.256c-.267-.53-1.168-1.96-.961-2.42l2.09-.289c.06.265.123.53.188.792a20.323,20.323,0,0,0,1.226,1.84c.145.142.315.248.47.378a21.437,21.437,0,0,0-.181,4.12,44.877,44.877,0,0,0,.795,5.373c-.224-.349-.448-.7-.672-1.055m32.669,41.35,1.724-.055a8.878,8.878,0,0,1,5.445,1.589,6.4,6.4,0,0,0,1.38.236c-3.728,1.854-7.2,1.678-11.275.156a63.408,63.408,0,0,1-7.258-3.47c.631.185,1.264.373,1.876.547a30.275,30.275,0,0,0,8.108,1m-15.988-46.463a7.035,7.035,0,0,1,2.984-2.283c1.031-.426,1.948-.513,2.61-1.52.313-.474.212-1.1.474-1.558.954-1.676,1.97-1.276,3.232-1.794a8.153,8.153,0,0,0,2.661-2.28,8.172,8.172,0,0,1,3.167-2.042c-.166.178-.34.344-.5.535a6.892,6.892,0,0,1-3.22,2.642,5.065,5.065,0,0,0-2.873,2.808,30.044,30.044,0,0,0-1.491,3.448,23.587,23.587,0,0,0-8.089,3.781c.328-.59.66-1.178,1.04-1.736m-1.565,12.751a10.814,10.814,0,0,0,1.659-1.363,4.349,4.349,0,0,0,1.264-4.169.706.706,0,0,0-.951-.571,7.3,7.3,0,0,1-1.057-.852c2.02-1.609,4.291-2.938,6.512-4.421-.354,1.04-.749,2.069-1.17,3.09-1.808,1.743-2.789,4.014-3.824,6.292a7.368,7.368,0,0,0-1.392,2.683c-.01.039,0,.077-.01.116a12.883,12.883,0,0,1-2.16,2.837,14.112,14.112,0,0,1-1.272,1.064c-.024-.029-.026-.063-.048-.091a26.166,26.166,0,0,0,2.449-4.614m-6.514-17.64c-.231-.34-.486-.653-.732-.975.636-2.48,1.479-4.893,2.336-7.3.065.123.135.236.2.364,1.243,2.471,2.187,6.687,1.3,9.565-.585.313-1.139.624-1.669.934a24.224,24.224,0,0,0-1.43-2.589m39.7,84.333c-12.477-6.849-25.187-13.37-37.721-20.147a28.465,28.465,0,0,0,2.738.845c8.857,2.216,17.033,2.447,25.086,7.277a102.746,102.746,0,0,0,10.683,6.122c-.328,1.963-.612,3.93-.785,5.9m129.934-7.518c1.888.419,3.7.874,5.428,1.38a17.959,17.959,0,0,1-5.7-.34c.082-.349.176-.7.277-1.04m-22.08,3.005a62.555,62.555,0,0,0,5.158,8.282,45.663,45.663,0,0,1-6.748-.178c-.12-.019-.236-.046-.354-.065a31.059,31.059,0,0,0,2.461-2,.792.792,0,0,0-.771-1.361c-1.474.39-2.938.84-4.39,1.276a75.223,75.223,0,0,0,4.643-5.951m-.027,17.132A6.02,6.02,0,0,1,484.815,519c-2.223.66-4.561,1.3-6.875,2.037a15.781,15.781,0,0,0-7.61-3.073.362.362,0,0,0-.27.638c1.551,1.2,3.106,2.353,4.578,3.588a30.547,30.547,0,0,0-5.519,2.692,13.284,13.284,0,0,0-1.3.951q-2.348-2.525-4.889-4.84c2.991-2.5,5.948-5.108,8.761-7.851a23.159,23.159,0,0,0,2.326-.778c5.459,2.516,11.653,3.533,16.118.241q1.076,1.409,2.165,2.815c.3.388.59.775.884,1.163-1.691.424-3.381.9-5.093,1.418-1.312-1.618-3.273-2.4-5.924-1.288a.636.636,0,0,0,.159,1.211m-30.937-8.686a14.123,14.123,0,0,0-1.712,1.428c-.063.063-.111.149-.173.212a90.89,90.89,0,0,0-9.1-4.92l-.419-.2.058-.4c3.733.282,7.453,2.182,11.347,3.872m-6.264-6.928.6-.166a15.294,15.294,0,0,1,3.1,1.462,35.809,35.809,0,0,0-3.7-1.3m8.378,9.31a6.958,6.958,0,0,1,2.1-.773,22.936,22.936,0,0,0,2.755.718c.27.051.547.094.831.135a14.075,14.075,0,0,0,4.077,1.7c.169.038.337.041.506.072-.19.166-.349.34-.542.506q-2.124,1.813-4.311,3.554c-2.15-1.741-4.38-3.388-6.69-4.922a7.95,7.95,0,0,1,1.274-.992m-.486-11.841a36.7,36.7,0,0,0,5.12-2.454,40.628,40.628,0,0,0,6.907,9.112c.173.164.4.33.588.5-1.31.034-2.6.147-3.9.2a14.5,14.5,0,0,1-3.046-2.2,54.038,54.038,0,0,0-5.669-5.149m7.379,24.963c-.578-.118-1.151-.2-1.722-.287.246-.2.494-.393.739-.59.325.294.66.578.983.877m-5.086-4.383q-2.6,2.008-5.235,3.983a44.013,44.013,0,0,0-7.157,1.452c2.548-2.984,4.3-6.524,6.521-9.748,2.03,1.356,3.981,2.8,5.871,4.313m-8.527-6.073a37.688,37.688,0,0,0-5.064,11.894l-.019.007c-2.639-2.808-2.9-9.047-2.281-15.713a78.3,78.3,0,0,1,7.364,3.812m-6.466,17.459a158.683,158.683,0,0,0-12.26,10.4c-.185-1.736-.474-3.465-.814-5.187,4.395-1.6,8.689-3.622,13.074-5.214M428.1,549.768c6.516-6.943,14.292-12.893,21.712-18.487q1.376-1.037,2.786-2.107a25.638,25.638,0,0,1,3.957.219,30.677,30.677,0,0,1,7.277,1.931,6.975,6.975,0,0,0-.388,2.683,28.213,28.213,0,0,0-3.651.14,37.773,37.773,0,0,0-10.03,2.622,5.191,5.191,0,0,0-1.582.231,7.615,7.615,0,0,0-3.135,2.03,58.023,58.023,0,0,0-8.746,5.951c-2.868,2.343-5.775,4.838-8.631,7.434.173-.874.325-1.756.431-2.647m51.476-56.09c.063.236.142.462.21.694a75.058,75.058,0,0,1-7.9,10.991,30.227,30.227,0,0,1-6.42-5.864,39,39,0,0,1-3.415-4.927,18.459,18.459,0,0,0,5.462-7.68,42.906,42.906,0,0,0,11.79,5.416c.1.455.149.918.27,1.37m-29.6-30.08a18.19,18.19,0,0,0,.173-4.527c6.117,1.609,13.079,2.716,18.593.549a1.1,1.1,0,0,0,.648.482,75.357,75.357,0,0,1,1.028,7.477c.549,6.09,1.488,11.968,6.979,15.477a2.46,2.46,0,0,0,.778.3c.031,1.423.164,2.839.32,4.253a42.185,42.185,0,0,1-9.9-4.746c.951-5.423.368-11.376,1.216-17.671a1.751,1.751,0,0,0-3.323-.949c-2.29,4.9-2.312,9.828-2.9,14.4a26.354,26.354,0,0,1-5.5-8.951.318.318,0,0,0-.607.161,23,23,0,0,0,5.341,12.831,14.735,14.735,0,0,1-3.706,6.613,71.668,71.668,0,0,0-4.2-7.109,23.464,23.464,0,0,0-11.932-9.356,12.875,12.875,0,0,0,7.005-9.24m-4.884-1.505a8.61,8.61,0,0,1-5.645,6.582,21.336,21.336,0,0,0-.71-2.784c2.153-1.19,4.27-2.464,6.355-3.8m-5.95,14.817a16.85,16.85,0,0,0,.4-2.158c7.872,2.733,11.72,9.982,15.761,17.486-.3.178-.607.359-.929.532-4.058,2.179-8.489,3.29-12.915,4.438.807-4.116,1.548-7.412,1.7-8.821a1.042,1.042,0,0,0-1.977-.563,51.613,51.613,0,0,0-4.655,10.762c-2.148.66-4.241,1.457-6.317,2.288a40.329,40.329,0,0,1-4.6-3.121c4.315-7.013,11.347-12.462,13.534-20.843m-5.681-8.323a14.054,14.054,0,0,1,.325,3.774,22.021,22.021,0,0,0-3.3.908c-.226.082-.116.395.1.383a28.455,28.455,0,0,1,3.078,0,15.117,15.117,0,0,1-.407,1.943c-1.105,3.983-3.75,7.205-6.519,10.329a2.618,2.618,0,0,0-2.093-.65c-2.182.214-3.942-8.1-5.218-11.973a61.045,61.045,0,0,0,14.03-4.718m-8.1,34.244c-.836.337-1.669.677-2.512,1a21.179,21.179,0,0,1,.836-2.358q.813.7,1.676,1.356m-3.432-33.362c-1.264.412-2.543.761-3.829,1.079a22.6,22.6,0,0,0-2.223-2.931c1.926.544,4.024,1.267,6.052,1.852m-12.532-.778a14.65,14.65,0,0,1,3.155,3.027c-1.141.207-2.288.4-3.439.592.111-1.192.21-2.4.284-3.619m-.477,5.447a44.545,44.545,0,0,0,5.079-.1,17.255,17.255,0,0,1,1.293,3.441c1.375,5.283,1.438,12.265,7.263,13.3-.383.484-.771.968-1.122,1.467-.226.323-.431.648-.643.973-4.515-4.811-8.4-10.338-12.289-15.6q.228-1.709.419-3.482m-10.519,49.634a16.15,16.15,0,0,0,8.763,3.855c5.426.845,9.064.665,12.522,4.491q.21.91.4,1.816a31.494,31.494,0,0,1-18.832-1.775c-6.976-2.815-13.548-7.2-19.658-11.742-.154-.539-.306-1.079-.436-1.621a24.93,24.93,0,0,1,1.686-3.5,30.1,30.1,0,0,0,9.649-4.758c-.592,4.973,2.16,9.849,5.9,13.233m-1.568-60.1c2.418.72,4.826,1.406,7.085,2.247.031,1.438-.019,2.871-.051,4.306a18.472,18.472,0,0,1-7.034-6.553m11.044,18.283c.176-1.108.344-2.256.508-3.429,2.849,6.5,6.054,12.78,10.5,18.083-3.4,7.116-3.538,14.841-2.052,22.865.262,1.414.563,2.822.879,4.226a13.656,13.656,0,0,0-1.3-.441c-4.426-1.161-9.007-.238-13.283-2.211-5.373-2.48-6.926-7.1-8.436-12.291,7.371-6.582,11.552-16.5,13.189-26.8m-27.068,19.2a18.633,18.633,0,0,0,3.16.311,1.479,1.479,0,0,0,.869-.277c4.01,1.447,7.858.4,11.28-1.763a27.021,27.021,0,0,1-13.8,10.227c-.718-.4-1.44-.795-2.155-1.2a63.041,63.041,0,0,1,.65-7.3m7.388,46.477a27.871,27.871,0,0,1-8.52-17.736c3.86,6.444,9.329,12.628,14.384,18.836a14.728,14.728,0,0,1-5.864-1.1m20.59-7.34q-3.388,3.435-6.779,6.868c-.5.12-1,.236-1.508.356-5.736-6.622-12.125-12.867-16.241-20.5a32.3,32.3,0,0,1-1.955-4.407c8.13,8.038,17.1,15.46,28.934,16.838l-.019.017a2.61,2.61,0,0,0-2.432.826m12.8,8.612a68.344,68.344,0,0,0-6.62,9.235c-3.162-3.35-4.826-7.995-3.292-12.491a31.1,31.1,0,0,1,9.394-6.449,44.865,44.865,0,0,1,.518,9.7m8.424-41.271a5.9,5.9,0,0,0-.234,1.276.422.422,0,0,0,.742.311,16.249,16.249,0,0,1,2.273-1.871q.852.426,1.715.838a43.31,43.31,0,0,0,.094,11.783,24.764,24.764,0,0,0,2.577,7.788c-2.485.934-4.985,1.97-7.525,3.066q-1.759.755-3.477,1.377c-1.835-7.494-4.173-14.926-4.043-22.586a35.071,35.071,0,0,0,7.879-1.982m7.807,48.507c-2.163,1.7-4.231,3.576-6.331,4.953a11.192,11.192,0,0,1-7.116,1.784q.495-1.239.956-2.488c4.848-4.135,9.582-8.469,14.675-12.149a57.06,57.06,0,0,0-2.184,7.9m7.025-3.981a12.532,12.532,0,0,0-1.78.636,58.56,58.56,0,0,1,2.533-6.659,7.561,7.561,0,0,1,1.688-2.372c.966-.506,1.907-1.057,2.909-1.5.467-.2.954-.371,1.43-.556.535-.12,1.072-.241,1.606-.378a40.224,40.224,0,0,0-5.64,6.687c-.944,1.387-1.854,2.767-2.748,4.137m3.778,38.3a24.748,24.748,0,0,1,1.845-6.572,13.692,13.692,0,0,0,2.073,2.223q-1.98,2.146-3.918,4.349m10.914-33.825a3.41,3.41,0,0,0-3.8-1.577,12.52,12.52,0,0,0-4.773-2.659,48.015,48.015,0,0,1,3.48-4.869,2.332,2.332,0,0,0,.335.152c3.607.9,5.141,6.09,6.892,10.244a7.355,7.355,0,0,0,.152,1.876,33.075,33.075,0,0,1-2.281-3.167m16.551-7.716a3.2,3.2,0,0,0-5.418.763,11.308,11.308,0,0,0-.077,7.374,14.712,14.712,0,0,0-5.043-3.116c-1.809-4.323-2.851-9.016-6.94-10.514a17.206,17.206,0,0,1,8.031-3.562,15.455,15.455,0,0,1,2.213-.159,24.379,24.379,0,0,1,5.1,1.476,20.242,20.242,0,0,1,5.83,3.723c0,.036-.024.065-.022.1.055,2.1,1.014,3.88,1.4,5.941a41.284,41.284,0,0,1,.479,6.6,56.681,56.681,0,0,0-5.553-8.626m6.3-10.557c.007.053.036.1.046.156a52.159,52.159,0,0,0-10.044-8.763,19.942,19.942,0,0,1,6.3-3.465c.1.123.2.236.291.359,1.3,1.727,2.167,4.669,3.733,6.454a12.927,12.927,0,0,0-.328,5.259m2.136-10.2a23.075,23.075,0,0,0-2.266-3.073c1.24-.4,2.5-.8,3.764-1.245a23.282,23.282,0,0,1-1.5,4.318m5.878,20.238c-.039-.053-.079-.1-.118-.156.019-.1.026-.209.039-.313a31.818,31.818,0,0,1,1.939,3.025c-.617-.855-1.233-1.71-1.859-2.555m10.066-2.362c-.308.79-.645,1.563-.978,2.338a3.658,3.658,0,0,0-2.567.128,11.8,11.8,0,0,0-2.777,1.758,19.307,19.307,0,0,0-3.786-3,7.673,7.673,0,0,0-.048-.809,34.424,34.424,0,0,0,4.4,1.293c.759.159.973-.91.354-1.233-1.881-.978-3.716-2.109-5.543-3.275-.783-2.292-2.049-4.385-2.107-6.87-.077-3.306,1.748-6.206,2.461-9.382a12.1,12.1,0,0,0,.039-4.59c1.946-.751,3.863-1.534,5.739-2.391,5.45,7.875,8.756,15.879,4.811,26.034m8.359-13.984c-1.074-5.553-3.911-10.521-7.21-15.142.86-.5,1.715-1.026,2.557-1.585.26-.173.065-.561-.214-.539-1.23.089-2.427.229-3.612.393-.2-.27-.4-.544-.607-.812-4.852-6.365-9.948-12.224-12.99-19.33a28.871,28.871,0,0,0,10.767,7.131,35.8,35.8,0,0,0,7.925,13.519c1.416,1.508,2.789,2.945,4.12,4.366a62.642,62.642,0,0,0,.091,8.272q-.484,1.839-.828,3.728m1.84-20.356a32.983,32.983,0,0,1-5.035-6.786c-.123-.229-.226-.465-.34-.7a22.437,22.437,0,0,0,7.538-.446,65.4,65.4,0,0,0-2.163,7.928m133.161,1.548c-2-.908-4.342-1.459-6.1-2.17q-1.437-.578-2.873-1.158c2.447-1.019,5.592-1.548,7.8-2.3,1.4-.477,3.1-.891,4.85-1.346-1.291,2.254-2.55,4.6-3.68,6.972M635.271,494.2c6.4-.014,13.707.645,19.15-2.235a6.86,6.86,0,0,1-1.5,3.735q-.285,4.486-4.59,4.65a42.273,42.273,0,0,1-6.1,2.03c-4.2,1.394-9.575,2.449-13.486,5.079q-3.117-1.261-6.24-2.514c2.709-2.2,5.457-4.368,8.231-6.543a36.842,36.842,0,0,0,4.532-4.2m-6.158.421c-3.7,2.916-7.448,5.674-11.123,8.508l-1.361-.535c1.512-3.932,5.175-6.863,12.484-7.973m-15.133-34.155c3.663,7.017,7.065,14.478,4.465,22.184a17.856,17.856,0,0,1-2.488,4.734,15.19,15.19,0,0,1-1.989-.78,46.991,46.991,0,0,0,.012-26.138m-2.452-4.766c.426.836.814,1.652,1.259,2.5a1.109,1.109,0,0,0-1.2,1.067c.084,8.92.046,17.1-1.9,24.977q-.643-.376-1.286-.732a28.151,28.151,0,0,0-13.625-15.573A69.179,69.179,0,0,0,611.529,455.7m-80.625-31a73.936,73.936,0,0,0,4.455-22.427,14.99,14.99,0,0,0,5.346-.486c.7,3.347,2.2,6.678,4.826,8.1a21.7,21.7,0,0,0,1.544,9.572c2.731,7.282,5.211,12.371,3.737,20.409a.873.873,0,0,0,.118.626,308.158,308.158,0,0,1-19.8,30.75,19.226,19.226,0,0,0,.45-5.618,37.332,37.332,0,0,0-1.83-8.436,30.478,30.478,0,0,0,5.322-9.218c2.379-.819,4.431-3.066,6.114-4.744a28.353,28.353,0,0,0,6.413-9.813c.092-.226-.19-.352-.344-.2-2.805,2.748-5.645,5.476-8.583,8.077-.556.491-1.187.958-1.835,1.428a87.929,87.929,0,0,0,2.738-16.871c.043-.6-.84-.9-1.074-.287-2.158,5.681-4.3,11.376-6.594,17-1.182,2.9-2.784,5.775-4.029,8.725-.19-.631-.4-1.257-.571-1.9-2.4-9.016.52-16.274,3.6-24.691m-2.413,67.633c-1.43.549-2.834,1.173-4.224,1.811,6.427-11.636,15.068-21.892,22.218-33.071a228.865,228.865,0,0,0,17.941-35.306c1.356-3.246,2.752-6.475,3.983-9.741,0,.188.039.371.031.559-.272,6.887-4.99,12.958-7.35,19.176-2.731,7.2-2.916,14.557,2.232,20.358a125.87,125.87,0,0,0-11.569,17.421c-1.5,2.83-2.83,5.724-4.094,8.645A111.147,111.147,0,0,0,525.2,501.492c-1-.682-2.011-1.349-3.051-1.953a34.28,34.28,0,0,0,6.921-6.435.506.506,0,0,0-.583-.775m-10.459,49.81c-.055-1.329-.152-2.666-.3-4.017-.318-2.955-.554-5.782-.722-8.556A21.6,21.6,0,0,1,520,541.32c-.66.262-1.308.551-1.965.819m8.385-5.975a26.214,26.214,0,0,0-8.2-16.77q.91-1.691,1.936-3.323c.029.048.053.1.082.152,3.591,6.138,6.5,12.188,8.046,18.552a18.364,18.364,0,0,0-1.864,1.389m9.093-2.644c-2.093-8.843-7.183-15.7-11.073-23.523.489-.621,1-1.228,1.5-1.837q1.755,1.589,3.374,3.357a5.718,5.718,0,0,0,1.768,2.018,65.509,65.509,0,0,1,5.955,8.46c-.472,3.86-.881,7.73-1.527,11.525m3.174-21.931a23.54,23.54,0,0,1-3.578-.913c-.108-.137-.207-.284-.318-.419a46.023,46.023,0,0,0-3.318-3.677,4.369,4.369,0,0,1,.612-1.481.345.345,0,0,0-.544-.424c-.349.376-.65.739-.925,1.1-.486-.46-1.011-.824-1.51-1.255,1.011-1.11,2.035-2.2,3.068-3.268q2.315-2.38,4.746-4.677a18.611,18.611,0,0,0,2.459,11.554c-.246,1.151-.472,2.307-.691,3.463m.125-16.787c1.888-1.722,3.824-3.388,5.828-4.966-1.365,3.8-2.606,7.641-3.639,11.542a36.255,36.255,0,0,1-2.189-6.577m8.231,35.176c-.116.137-.2.284-.308.426a75.657,75.657,0,0,0-3.335-7.164c.224-1.948.438-3.9.706-5.837,1.97.214,3.716.3,4.9.311.744.958,1.219,2.283,1.462,4.8.617,6.411-.313,3.855-3.427,7.463m14.3-2.172c-1.481.407-2.96.821-4.441,1.228,2.618-2.943,4.255-5.459,1.476-10.456a10.321,10.321,0,0,0-1.141-1.621,36.4,36.4,0,0,0,8.934-2.9c-1.83,4.66-3.9,9.016-4.828,13.75m18.107-11.162c-4.824,2.336-9.175,5.175-11.817,9.447-.214.058-.431.111-.645.166,1.5-5.377,4.313-10.42,5.741-15.99,1.214-.766,2.413-1.5,3.586-2.191a40.691,40.691,0,0,1,4.243,5.175,8.3,8.3,0,0,0-1.108,3.393m4.07-8.185a36.3,36.3,0,0,0-2.4-2.977,34.439,34.439,0,0,1,4.648-1.782,22.984,22.984,0,0,1-2.249,4.759m-7.181-7.118a27.09,27.09,0,0,0-3.217-1.758A22.492,22.492,0,0,0,559.7,482.54a.562.562,0,0,0-.563.956,26.349,26.349,0,0,1,8.874,14.3,24.122,24.122,0,0,0-19.819,4.323.216.216,0,0,0,.212.371c8.091-3.037,14.654-2.675,20.106-.145a27.415,27.415,0,0,1-.282,4.176c-4.436,2.89-8.833,5.149-14.389,5.8-.34.041-1.291.087-2.56.111-.677-.412-1.351-.828-2.008-1.279a25.11,25.11,0,0,1-3.451-2.858,136.85,136.85,0,0,1,8.1-24.775c1.768-1.021,3.566-1.994,5.435-2.844a124.212,124.212,0,0,1,17.057-5.77c0,.017-.014.022-.01.039a40.5,40.5,0,0,0,3.538,7.333,121.467,121.467,0,0,1-13.411-1.917c-.739-.142-.884.872-.318,1.182a42.788,42.788,0,0,0,16.149,4.917,28.048,28.048,0,0,1,3.913,10.425c.022.178.024.337.041.51a35.788,35.788,0,0,0-9.982,3.94m22.162,3.735q-1.947,2.323-4,4.559a30.974,30.974,0,0,1-4.718,2.5c-1.028.448-2.078.891-3.131,1.334-.029-.053-.053-.106-.079-.159a15.609,15.609,0,0,0,1.76-2.495c.939-2.418,2.218-4.388,2.673-7,.07-.407.1-.821.152-1.233a28.937,28.937,0,0,1,7.863.421,8.953,8.953,0,0,1-.525,2.069m-10.533-18.295c.691,0,1.382-.043,2.073-.07a27.954,27.954,0,0,0,5.409,6.5c.855.819,1.691,1.508,2.454,2.162.063.173.149.34.2.515.152.472.231.881.347,1.324a41.676,41.676,0,0,0-5.649-.482c-.576,0-1.122.048-1.683.075a30.292,30.292,0,0,0-3.155-10.023m5.2-4.607a16.715,16.715,0,0,1-2.615-9.527c0-.3-.373-.532-.588-.246a11.308,11.308,0,0,0-1.645,10.071c-1,.026-2.006.058-3.01.043a29.089,29.089,0,0,0-8.25-7.793c3.562-1.038,7.111-2.107,10.56-3.47,1.377-.547,2.745-1.156,4.108-1.794a32.716,32.716,0,0,1,10.413,11.118,58.015,58.015,0,0,1-8.973,1.6m9.5,10.107a4.274,4.274,0,0,1,.075-3.032,1,1,0,0,0,1.373-.38c.137-.243.248-.462.373-.694.2,2.167.159,4.306.166,6.451-.641-.833-1.308-1.609-1.987-2.346m2.692,22.191a25.359,25.359,0,0,1,1.8-9.276,16.164,16.164,0,0,0,3.017,3.01c-.01.458.01.922.026,1.382-1.218,1.113-2.439,2.218-3.583,3.451-.421.453-.84.949-1.262,1.433m7.9,9.148a13.6,13.6,0,0,0-4.8-3.492c1.281.041,2.57.144,3.855.219.344,1.149.708,2.3,1.076,3.456-.048-.058-.08-.128-.13-.183m-1.346-22.913a15.553,15.553,0,0,1-.643-2c.484-.544.98-1.086,1.539-1.613,1.484-1.406,2.916-2.75,4.234-4.113a13.851,13.851,0,0,0,1.573.075c-.474.335-.951.657-1.418,1.055a20.15,20.15,0,0,0-5.283,6.593m4.255,11.658a62.34,62.34,0,0,1,6.1,4.352c-1.772-.181-3.5-.3-5.25-.458-.337-1.317-.626-2.618-.845-3.894m2.131,8.39c1.854.154,3.711.311,5.556.486.077,1.031.142,2.054.12,3.051a23.051,23.051,0,0,1-1.924,8.8c-.889-3.781-2.418-8.048-3.752-12.337m8.407,26.208c-1.247-1.618-2.4-3.3-3.509-5.021a26.757,26.757,0,0,0,5.994-14.574c.01.051.031.094.043.144,1.44,6.615-.2,13.067-2.529,19.451m2.442-30.73a7.3,7.3,0,0,1,.886-2.213c2.871,1,8.084,2.331,10.656,4.188-3.489-.12-7.008-.361-10.538-.7-.337-.421-.653-.872-1-1.279m10.882,9.962c-1.818,3.292-4.193,6.781-4.826,8.419a11.936,11.936,0,0,0-.609,2.2,25.037,25.037,0,0,0-1.681-14.772c1.182.092,2.367.188,3.53.255,1.146.067,2.516.236,4.01.433a24.278,24.278,0,0,0-.426,2.4,10.357,10.357,0,0,0,0,1.06m-7.759,27.2c-.248-.253-.477-.518-.715-.778.756-1.652,1.522-3.3,2.43-4.874a16.839,16.839,0,0,1,2.256-1.97c.886,1.96,1.941,3.937,2.832,6.047a55.185,55.185,0,0,1,3.342,10.064,69.713,69.713,0,0,1-10.145-8.489m15.024,4.758c-.409-1.5-.864-3-1.4-4.469-1.288-3.557-3.477-7.061-4.612-10.726a47.069,47.069,0,0,1,5.158-1.849,16.993,16.993,0,0,1,1.758,5.144,23.791,23.791,0,0,1-.905,11.9m1.5,7.689a25.376,25.376,0,0,0,4.366-10.362,37.415,37.415,0,0,0,3.969,7.978c1.859,2.914,4.091,5.618,6.2,8.4a74.017,74.017,0,0,1-14.533-6.018M757.956,463.161q1.492.434,2.96.954a44.556,44.556,0,0,0-.019,6.1c-1.662-2.338-2.936-4.756-2.94-7.058m4.149,50.6c-1.375,3.591-2.753,2.442-4.489,1a9.688,9.688,0,0,0-.229-1.438q2.474-.267,4.954-.527a4.721,4.721,0,0,1-.236.961M773.2,407.281l.655,1.886c.356,1.036.7,2.069,1.026,3.1-1.134-.862-2.244-1.712-3.311-2.569q.805-1.214,1.63-2.42m2.536,48.278a3.428,3.428,0,0,0-1.488,4.243q-.448,1.192-.913,2.374c-.142-.1-.282-.2-.426-.3a72.734,72.734,0,0,0,.294-10.955c.963,1.187,1.941,2.389,2.88,3.622-.108.34-.236.674-.347,1.014m1.39-18.408c-3.415-4.113-7.771-8.465-9.943-13.173a7.73,7.73,0,0,1-.392-5.067c1.305,1.146,2.632,2.326,3.99,3.47a4.111,4.111,0,0,0,1.772,3.516,11.956,11.956,0,0,1,4.356,6.4,12.41,12.41,0,0,1,.217,4.855M795.5,473.6a13.341,13.341,0,0,1-1.04-2.952c.231.368.465.737.71,1.1.407.6.845,1.178,1.279,1.758-.315.034-.633.065-.949.1m3.523-9.363a24.563,24.563,0,0,1-1.064-2.35c-.132-.342-.248-.689-.359-1.038.421-.159.831-.32,1.219-.477.515-.212,1.023-.453,1.536-.682-.453,1.5-.942,3.02-1.332,4.547m-.308-14.039q.759-1.4,1.433-2.83c.212.47.4.951.561,1.438-.662.472-1.317.951-1.994,1.392m25.483.157a41.16,41.16,0,0,1-3.056-6.285c.055-.347.116-.694.164-1.043.031-.224.043-.445.07-.667a56.242,56.242,0,0,0,3.574-5.784c1.274,4.713,1.659,9.493-.751,13.779m24.4,17.868-1.772.181c-.342-.648-.684-1.3-.978-1.943a9.135,9.135,0,0,1-.614-2.09c1.122-1.132,2.2-2.3,3.249-3.506.142,2.444.154,4.9.116,7.359m-.352-36.211-.108-.214q1.268-2.438,2.533-4.886c.108.248.217.5.327.742q-1.412,2.157-2.752,4.359m11.9,35.043q-1.329.134-2.659.27a77.489,77.489,0,0,0-.525-10.839,48.7,48.7,0,0,0-.927-4.975c1.423-1.806,2.861-3.6,4.352-5.336a24.232,24.232,0,0,1,1.955,9.8,44.875,44.875,0,0,1-2.2,11.085m12.773-1.293-2.293.231a50.772,50.772,0,0,0,1.471-7.769q2.565,1.3,5.127,2.591c-1.272,1.674-2.74,3.263-4.306,4.946m8.152-13.136a18.417,18.417,0,0,1-.93,3.08c-2.582-.159-5.161-.34-7.725-.525-.06,0-.091.039-.149.041,0-.106.017-.21.017-.318a36.775,36.775,0,0,0-3.477-14.432c-.055-.128-.12-.25-.176-.378,4.152.173,8.289,1.185,12.5,1.173a33.749,33.749,0,0,1-.055,11.359m15.884-12.363a5.194,5.194,0,0,0-2.42.07,1.324,1.324,0,0,0-.963,1.845,4.672,4.672,0,0,0,2.35,2.129c-.091.414-.183.826-.272,1.231a13.248,13.248,0,0,1-1.476-.356,13.837,13.837,0,0,1-3.09-1.524c-.147-1.279-.371-2.548-.633-3.807a37.167,37.167,0,0,0,4.2-1.471c.756.59,1.532,1.194,2.331,1.8l-.024.084m11.976,14.393c-1.057.2-2.119.352-3.179.508-.626-.768-1.279-1.488-1.9-2.252.168-.838.327-1.676.467-2.519.166-.012.325-.019.494-.034a17.015,17.015,0,0,1,2.372-.017q1.163.73,2.36,1.363a19.715,19.715,0,0,0,1.464,2.459c-.694.161-1.368.354-2.078.491m1.982-15.867a31.181,31.181,0,0,0-2.516-7.723,1.185,1.185,0,0,0-2.23.383,43.407,43.407,0,0,0,.265,9.11c-.332-.231-.689-.443-1.031-.669a14.236,14.236,0,0,0-1.654-6.962,1.212,1.212,0,0,0-.077-.106,46.625,46.625,0,0,0,6.529-6.834c.39,2.061.968,4.1,1.274,6.256a17.016,17.016,0,0,1-.559,6.545M945.158,413c.549-1.51,1.115-3.027,1.541-4.669a.643.643,0,0,0-.864-.792c-3.993,1.558-5.756,5.7-6.442,9.987-.07-1.361-.063-2.728-.067-4.13a16.769,16.769,0,0,1,1.825-3.249c1.418-2.016,3.564-4.272,5.093-6.687-.014.06-.034.118-.043.183a7.065,7.065,0,0,0,1.125,4.761,36.061,36.061,0,0,0-2.167,4.6m9.418,10.984a5.327,5.327,0,0,0-1.5.768,14.088,14.088,0,0,0-1.052-6.353.751.751,0,0,0-1.274-.111c-2.452,2.69-2.037,6.972-2.353,10.4-.243-1.132-.47-2.235-.6-3.244-.669-5.283.8-9.469,2.909-13.4,1.4,1.209,2.8,2.307,3.978,3.487a66.066,66.066,0,0,1-.111,8.45m36.076,1.874c.657,1.965,1.322,3.93,1.9,5.914a47.913,47.913,0,0,0-5.963,2.427c-.079-.8-.193-1.606-.328-2.4a15.518,15.518,0,0,0,4.39-5.938m-4.732,22.694a24.465,24.465,0,0,0,1.854-8.956,29.044,29.044,0,0,0,5.948-2.936c.164.922.3,1.852.383,2.8.243,2.822.181,5.664.144,8.494-2.268.98-4.424,2.107-6.131,2.721-.6.217-1.207.4-1.813.58a16.512,16.512,0,0,1-.385-2.7m6.5,8.431-4.438-1.257c-.022-.051-.046-.1-.07-.152a53.112,53.112,0,0,0,6.141-2.427l.234-.123c.051,1.221.147,2.435.311,3.639-.7.13-1.426.241-2.177.32m45.678-11.063c-.383-.171-.771-.332-1.175-.47a29.063,29.063,0,0,0-.291-3.9,7.451,7.451,0,0,0,1.9,1.052c-.145,1.127-.284,2.24-.438,3.321m6.854,5.938a1.2,1.2,0,0,0-.33.207c-.751-.934-1.534-1.929-2.358-2.863a13.078,13.078,0,0,0-.371-6.016,16.513,16.513,0,0,0,1.854-.07c1.06,3.068,1.816,6.124,1.2,8.742m6.341-.855a2.781,2.781,0,0,0-.576.087,1.2,1.2,0,0,0-.946,1.043c-.048.051-.1.094-.144.149a16.663,16.663,0,0,0,.092-5.577,8,8,0,0,0,1.934.8,7.093,7.093,0,0,0-.359,3.5m23.92-10.225a19.017,19.017,0,0,0-.824,9.127c-.065.183-.135.361-.185.554a10.235,10.235,0,0,0-.958-1.565,1.259,1.259,0,0,0-2.15.354c-.617-.58-1.286-1.115-1.891-1.691-1.816-1.734-1.859-1.934-2.317-4.648a8.639,8.639,0,0,0-.137-1.662c-1.079-2.82-1.979-4.932-2.093-8.1a19.259,19.259,0,0,0-1.349-6.367c-.395-1.06-1.8-3.942-1.31-4.771l4-.111q.09.766.193,1.532c.766,1.175.987,2.548,1.931,3.725,1.6,1.989,3.774,3.34,5.192,5.486,1.387,2.1,1.934,4.595,3.518,6.584.026.031.048.06.075.094a2.293,2.293,0,0,0-1.7,1.462m15.015,28.568c-.164.079-.328.157-.491.234a1.028,1.028,0,0,0-.595.775.179.179,0,0,0-.036.022,2.364,2.364,0,0,1-.973-1.452c.116-.238.231-.474.347-.71q.914.571,1.854,1.1a.9.9,0,0,0-.106.031m1.069,1.144a1.03,1.03,0,0,0,.007-.643c.3.159.595.313.893.465-.3.063-.6.123-.9.178m49.22-27.53c-.072.8-.149,1.592-.238,2.387-.224-.645-.453-1.286-.684-1.927.315-.142.621-.294.922-.46m-9.84,7.59q-1.589-.845-3.229-1.645c.807-.542,1.628-1.057,2.476-1.532.234,1.05.482,2.109.754,3.176M1103.3,453.57a3.71,3.71,0,0,0-1.406,1.625c-1.755,1.866-3.754,3.619-5.091,5.784a.81.81,0,0,0-.5.441c-.4-.212-.814-.417-1.2-.643a14.278,14.278,0,0,0,2.326-1.594c2.355-2.071,3.668-4.479,3.253-7.607-.1-.771-.773-1.6-1.674-1.272q-4.038-3.3-3.533-6.3c.337.2.665.39.973.573,2.892,1.7,6.03,3.622,9.315,5.589a38.5,38.5,0,0,1-2.464,3.405m13.582-24.51a89.83,89.83,0,0,0-6.377,12.183c-1.994-.927-3.925-1.869-5.748-2.856-1.24-.672-2.456-1.358-3.658-2.052a13.336,13.336,0,0,1,4.628-2.362c2.035-.59,3.786-.564,5.242-2.329.689-.831.629-2.035,1.219-2.844,2.15-2.967,3.988-2.006,6.475-2.721,2.28-.657,3.745-2.293,5.5-3.757a15.5,15.5,0,0,1,6.4-3.2c-.349.3-.715.58-1.045.905-2.288,2.247-3.342,3.371-6.63,4.323-2.854.826-4.243,2.071-6.006,4.71m13.192,83.823a23.391,23.391,0,0,0,1.972-1.481,31.453,31.453,0,0,0,2.87,3.049c-1.63-.535-3.239-1.074-4.843-1.568m9.139-23.684c-.845-.7-1.671-1.428-2.492-2.167a.962.962,0,0,0,.821-1.539,2.992,2.992,0,0,0-1.44-.939,4.554,4.554,0,0,0,.636-.33c.9-.571,1.859-1.686,1.043-2.707a.47.47,0,0,0-.53-.135,9.03,9.03,0,0,0-1.267.7,10.049,10.049,0,0,1-1.476.527,13.411,13.411,0,0,0,1.618-1.806.752.752,0,0,0-.518-1.178,2.709,2.709,0,0,0-1.691.45,3.122,3.122,0,0,0,.39-1.517.517.517,0,0,0-.332-.419,1.622,1.622,0,0,0-1.24.123,8.062,8.062,0,0,1,.58-.718c.7-.771-.352-1.83-1.2-1.5a3.378,3.378,0,0,0-.992.612,2.812,2.812,0,0,0-2.035-.766,1.13,1.13,0,0,0-.983.987,1.181,1.181,0,0,0-1.551.291c-.029.036-.048.07-.074.106q-.9-.842-1.813-1.654a3.825,3.825,0,0,0,.549-1.086c.113-.219.231-.441.323-.667,1.375-.26,2.76-.532,4.176-.819a39.088,39.088,0,0,1,5.334-.686q2.814,1.329,5.686,2.427a38.571,38.571,0,0,0,8.017,9.071c.279,1.045.523,2.078.718,3.1-3.321.571-6.692,1.324-10.259,2.247m13.673-51.072c-.525,1.455-1.074,2.777-1.613,4.06a20.493,20.493,0,0,0-.031-4.653,71.633,71.633,0,0,0-6.037-19.886,16.838,16.838,0,0,0,5.859-2.208c2.206,7.458,4.869,14.254,1.823,22.687m97.294-44.1c.038-.9.043-1.8.043-2.707.474-.328.963-.629,1.464-.91-.51,1.2-1.016,2.4-1.507,3.617m3.5-8.135c-.258.561-.5,1.132-.754,1.7a17.771,17.771,0,0,0-2.731,2.158q-.043-1.763-.183-3.514a36.1,36.1,0,0,1,3.843-1.011c-.058.224-.118.448-.176.672m7.742,7.352c.376.024.751.041,1.127.067-.21.214-.409.438-.631.638-.286.258-.58.5-.874.749q.2-.726.378-1.454m-2.767,9.531c.4-1.24.764-2.492,1.113-3.749a24.653,24.653,0,0,0,3.672-2.384,21.539,21.539,0,0,1-4.785,6.134m7.34-13.743c-.034.046-.067.092-.1.137a25.645,25.645,0,0,0-3.574.277c.118-.414.234-.828.354-1.243,1.13.181,2.24.458,3.352.689l-.029.14m-1.688-6.731c.077-.323.147-.645.219-.97a11.271,11.271,0,0,1,2.151,1.3c-.783-.142-1.575-.246-2.37-.332m4.349-3.162a11.154,11.154,0,0,0-3.475-1.329c.075-.542.13-1.084.173-1.628a15.047,15.047,0,0,1,3.651,2.254c-.123.234-.238.467-.349.7m1.621,26.061a25.7,25.7,0,0,0,1.71-2.938c.219.01.441.014.662.029.149.633.318,1.243.494,1.842q-1.412.567-2.866,1.067m6.114-6.572a22.922,22.922,0,0,0-2.786-.2c.284-.8.535-1.635.763-2.476a9.435,9.435,0,0,0,2.295,2.367,1.421,1.421,0,0,0-.272.3m2.793-10.68c-.73-.542-1.476-1.062-2.261-1.532-.1-.462-.217-.913-.342-1.358.5.306.985.638,1.459.978a10.649,10.649,0,0,0,1.24,1.592c-.034.108-.065.214-.1.32m6.22-5.531c-.27,1.442-.571,2.871-.922,4.272a10.2,10.2,0,0,0-.783-.725c.159-.629.316-1.259.5-1.886.267-.9.527-1.811.751-2.731.168.137.344.262.515.4-.015.224-.046.448-.065.672m9.153,1.2c.2-1.337.409-2.668.619-3.986.091-.564.185-1.127.286-1.693.308,1.987.474,4.128.9,6.112a7.317,7.317,0,0,1-1.8-.433m60.346,36.859c.349-.092.7-.159,1.05-.241.472,1.271,1.009,2.567,1.6,3.887a35.316,35.316,0,0,0-2.008,3.111.509.509,0,0,0,.838.578,27.408,27.408,0,0,1,1.849-2.208c.113.246.221.486.337.732a48.852,48.852,0,0,0-6.177,11.619,12.4,12.4,0,0,0-1.348-.438,32.883,32.883,0,0,0,3.863-17.04m-14.278,28.874c.653-.275,1.312-.525,1.977-.747a17.479,17.479,0,0,1-2.8,4.857,20.287,20.287,0,0,0,.826-4.111m-15.475-7.7a34.589,34.589,0,0,1,.973,4.173c-1.2.749-2.37,1.483-3.5,2.182a24.188,24.188,0,0,0,2.526-6.355m-11.634-70.966c.147.248.274.506.414.754q-.292.419-.566.845c-.1-.59-.219-1.178-.354-1.758.169.053.337.111.506.159m1.825,76.661c.619-.219,1.243-.445,1.869-.7a19.542,19.542,0,0,1-2.755,4.944c-.361.462-.739.9-1.13,1.315-1.141.486-2.292.939-3.456,1.368a18.509,18.509,0,0,0,5.471-6.931m-8.094-73.882c.265.441.493.893.78,1.327a36.865,36.865,0,0,0,2.495,3.261c-.407,1.06-.778,2.141-1.132,3.232-.963-.99-1.931-1.975-2.878-2.988a20.27,20.27,0,0,0,.734-4.831m-5.378,4.886q-.412.791-.85,1.58a44.923,44.923,0,0,0-1.445-5.4c-.188-.585-.393-1.178-.609-1.772a35.806,35.806,0,0,0,2.9,5.594m-4.744-9.739c.036-.226.072-.455.106-.684.325,1.035.665,2.061,1.04,3.066-.342-.809-.73-1.6-1.146-2.382m1.363,80.639a59.659,59.659,0,0,0,2.661-9.194,20.975,20.975,0,0,0,2.374-3.374,44,44,0,0,1-3.429,11c-.506.537-1.045,1.057-1.606,1.568m24.727,16.019c-6.521,1.091-13.315,1.642-20.142,2.2,1.936-.556,3.868-1.115,5.726-1.674a80.539,80.539,0,0,0,17.006-7.485,27.359,27.359,0,0,1-2.524,6.692.6.6,0,0,0-.067.27m4.253-.795c-.828.176-1.664.335-2.5.489a26.113,26.113,0,0,0,5.182-9.221c.38-.231.758-.455,1.141-.691l4.335-2.974q.986-.672,2-1.252a21.094,21.094,0,0,1-.431,5.322.734.734,0,0,0,1.385.482c.349-.727.65-1.455.915-2.179a.322.322,0,0,0,.332.053,14.445,14.445,0,0,0,6.76-6.885q1.311-.217,2.654-.313c-.655,2.213-1.243,4.344-1.782,6.288-.231.84.918,1.541,1.44.73,1.544-2.391,2.911-4.869,4.221-7.383a18.887,18.887,0,0,0,3.066-1.363c-6.509,10.878-15.732,16.13-28.715,18.9m32.245-28.421c-.238.116-.482.231-.713.352a.54.54,0,0,0,.27,1.023,9.008,9.008,0,0,0-.171,2.538c-.214.465-.429.93-.653,1.4-.125.262-.26.5-.388.761a16.06,16.06,0,0,0-1.654-1.678c.814-1.616,1.64-3.224,2.5-4.816.4-.742.811-1.507,1.238-2.273a.869.869,0,0,0,1.409-.3c.036-.12.06-.241.1-.364.046.094.092.188.135.282a9.9,9.9,0,0,0-2.073,3.073m11.865-8.708c-.036-.978-.123-1.951-.243-2.921,1.678-.219,3.422-.272,5.221-.479a1.323,1.323,0,0,0,.32-.092q.209.856.429,1.71a45.014,45.014,0,0,0-5.645,1.751l-.082.031m3.533,7.472c.8.012,1.6.039,2.4.092-.6.5-1.189,1.014-1.768,1.539-.2-.547-.409-1.091-.628-1.63m1.392,3.8q1.81-1.253,3.646-2.425c.349,1.414.662,2.825.923,4.231q-1.817.686-3.608,1.455c-.289-1.091-.6-2.179-.961-3.261m3.841,17.984c-.5.072-1,.169-1.5.267.048-.467.084-.937.113-1.409a14.476,14.476,0,0,1,1.825-.207q-.2.675-.441,1.349m1.026-3.8a14.94,14.94,0,0,0-2.346.669,41.2,41.2,0,0,0-.486-6.456c1.067.4,2.177.751,3.277,1.125a27.17,27.17,0,0,1-.445,4.662m9.8-19.321c-.419-.161-.845-.311-1.274-.448-.116-.431-.248-.857-.371-1.288.371.06.742.113,1.12.147a1.468,1.468,0,0,0,.6-.084c-.048.549-.07,1.108-.077,1.674m83.365-313.856a40.133,40.133,0,0,1,3.817,6.673q-1.994-3.291-3.817-6.673m46.094-9.127a27.907,27.907,0,0,0-.147-3.48c.2.426.4.86.614,1.271l.128.258c-.214.643-.409,1.3-.595,1.951"
        transform="translate(-187 1328.361)"
      />
      <g transform="translate(705.088 1725.304)">
        <g className="r">
          <g transform="translate(0)">
            <g className="s">
              <rect
                className="t"
                width={477.2}
                height={287.099}
                transform="translate(-3.181)"
              />
            </g>
          </g>
          <g className="r">
            <g className="u" transform="translate(115.562 38.444)">
              <g className="v">
                <path
                  className="w"
                  d="M142.53,33.4c-.349,3.593-1.916,17.74-5.634,21.054-3.983,3.55-4.264,5.437-4.292,5.689-3.956-2.1-10.96-6.739-18.564-7.116-9.508-.476-20.453,19.04-19.5,30.937.392,4.865,1.5,7.422,2.656,8.737A46.034,46.034,0,0,0,79.3,123.458a49.812,49.812,0,0,1-9.506,4.766c-5.242,1.9-9.11,9.707-10.47.95-1.552-9.994,13.6-38.2,24.74-51.873C94.534,64.451,85.495,46.36,79.3,37.8c-6.179-8.569-.95-15.236.476-11.421.182.476.433,1.132.755,1.93a2.023,2.023,0,0,0,.111.252c2.293,5.675,7.8,17.389,14.37,17.795a3.1,3.1,0,0,0,.5,0,5.106,5.106,0,0,0,3.8-2.069.013.013,0,0,0,.014-.014c3.872-4.614,4.725-15.546,4.725-18.845,0-1.594.964-2.713,2.629-3.523l.084-.043a16.1,16.1,0,0,1,4.262-1.257.427.427,0,0,1,.141-.029,74.66,74.66,0,0,1,8.583-.867c8.569-.474,18.566,9.52,20.941,12.373,1.161,1.4,1.635,1.538,1.833,1.313"
                  transform="translate(-59.214 -19.699)"
                />
              </g>
            </g>
            <g className="u" transform="translate(130.862 113.508)">
              <g className="x">
                <path
                  className="w"
                  d="M161.308,85.9c-7.129,0-11.421,8.093-14.748,16.663s-2.377,14.274.476,18.552,10.47,14.286,10.47,14.286c-10,2.853-25.695,23.794-25.695,23.794a19.439,19.439,0,0,1,3.327,7.129S122.768,173,122.768,177.762s6.667,21.879,9.994,28.548,9.52,15.7,11.421,19.514,24.744,5.7,24.744,5.7l-.265.1c-11.071-.2-24.282-2.881-26.38-4.375-3.341-2.377-4.292-13.324-15.238-11.9s-19.977,11.421-23.792,11.421-42.834-17.613-35.215-29.034a24.641,24.641,0,0,1,5.745-6.054l10.4-5.144,4.321-2.125s8.566-.006,9.992-6.661c1.341-6.249-3.45-33.628-12.215-40.771a12.254,12.254,0,0,0,3.648,1.272s22.843-1.9,27.6-20.941c3.817-15.252-2.445-26.827-8.037-33.525,3.677,3.048,10.219,6.809,20.423,7.354,17.6.95,11.421-24.744,11.421-24.744s.474-9.522,15.7-8.1c10.974,1.034,26.407,8.46,27.26,8.544-2.334-.113-16.313-.742-21.542,1.216-5.718,2.139-1.44,17.838-1.44,17.838"
                  transform="translate(-67.054 -58.162)"
                />
              </g>
            </g>
            <g className="u" transform="translate(0 98.558)">
              <g className="y">
                <path
                  className="z"
                  d="M89.488,119.853c-.95-12.371-8.569-14.288-11.9-13.811s-15.7,19.99-20.941,20.466-21.893-4.278-19.5-13.8S50,89.867,45.228,87.966c-4.752-1.9-13.923-.476-23.9,1.9C11.329,92.244-3.181,76.18.62,66.66,4.338,57.378,26.106,52.513,28.887,50.5c3.452,6.975-5.451,23.661,15.275,32.941,23.915,10.708,41.4,1.429,45.326,36.411"
                  transform="translate(0 -50.501)"
                />
              </g>
            </g>
            <g className="u" transform="translate(226.04 62.962)">
              <g className="aa">
                <path
                  className="w"
                  d="M351.908,125.788c-6.766,1.132-17.7-5.172-24.338-10.695l-.041-.041a31.558,31.558,0,0,1-4.18-4.026s-10,16.188-16.651,19.516-28.083,14.272-34.276,12.845c0,0-3.273,9.828,4.094,15.56l-2.069,1.1c-18.913.349-16.774,13.2-13.923,18.913s9.645,14.274,21.415,14.986c6.934.42,14.986-1.257,21.907-3.886L310.5,203.36s-1.427,11.9-19.99,17.6c-18.565,5.718-26.171-2.377-29.036-6.179s-15.224-29.036-19.977-36.653c-4.768-7.605-18.565-18.552-18.565-23.794s-.95-11.421-3.8-11.9a28.193,28.193,0,0,0-12.357,1.007,12.422,12.422,0,0,0-5.256,3.285c-3.874,4.264-15.043,5.675-22.633,11.743a20.078,20.078,0,0,0-4.489,4.908c-6.669,10.47-2.865,10.945-2.865,10.945s1.062-1.021,2.67-2.432c3.3-2.922,8.878-7.549,12.092-8.513,4.752-1.427,21.417,1.9,23.792,7.143s3.8,9.03-1.425,15.7-6.192,11.9-6.192,11.9,17.613,1.425,18.564,5.718c.95,4.276-1.427,22.841-6.669,28.07s-28.546,5.718-40.917-1.427-27.609-3.8-29.036,0c-1.272,3.411-1.79,14.483-6.011,20.843a4.914,4.914,0,0,1,.308-2.754c5.228-13.335,4.278-18.089-1.916-33.788-6.179-15.712-21.723-23.08-20.941-24.282a27.974,27.974,0,0,0,3.817-22.843.848.848,0,0,1,.111.057c1.678.7,5.507,35.537,14.637,22.311,4.893-7.1,1.887-28.784,34.028-38.542,19.988-6.068,14.032-20.939,74.481-21.415,20.031-.154,47.348,0,61.382-6.669,31.134-14.762,21.557-85.554,8.989-88.435,5.775-1.928,12.3-3.271,15.281-2.459,5.242,1.427,15.712,13.335,14.286,19.514-1.76,7.605-8.569,13.8-8.569,16.188s5.718,12.847,10,13.8,16.649,10.946,18.089,15.7c1.427,4.768-1.916,26.659-10.47,28.085"
                  transform="translate(-115.824 -32.262)"
                />
              </g>
            </g>
            <g className="u" transform="translate(228.721 1.663)">
              <g className="ab">
                <path
                  className="z"
                  d="M152.623,48.12c-2.851,10-17.139,30.46-15.712,30.46-3.817-.349-12.246-2.139-17.964-1.075-5.7,1.075,3.938-21.887,8.929-26.53,8-7.408,13.2-48.064-9.99-49.49l-.029-.057C127.824.31,141.438.3,146.43,6.239c7.619,9.044,9.044,31.885,6.192,41.881"
                  transform="translate(-117.197 -0.853)"
                />
              </g>
            </g>
            <g className="u" transform="translate(181.8 33.7)">
              <g className="ac">
                <path
                  className="ad"
                  d="M126.477,34.764c-9.98.712-16.159-1.077-16.175.111-.478,34.744-21.891-10.941-16.179-12.845a41.2,41.2,0,0,1,17.607-4.758c11.175-.273,24.74,16.78,14.746,17.492"
                  transform="translate(-93.154 -17.268)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(222.029 78.187)">
              <g className="af">
                <path
                  className="ag"
                  d="M120.073,41.622C108.895,52.8,114.72,69.1,121.145,72.674s19.631,12.135,24.27,8.923,14.99-27.482,7.851-32.123-28.2-12.849-33.193-7.851"
                  transform="translate(-113.768 -40.063)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(190.464 221.887)">
              <g className="ah">
                <path
                  className="ag"
                  d="M107.981,146.089c7.045,2.35,36.05-2.141,36.405-10.351s-6.423-18.56-16.417-21.415-29.982,4.641-30.339,10.351,1.786,18.56,10.351,21.415"
                  transform="translate(-97.595 -113.695)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(132.59 140.712)">
              <g className="ai">
                <path
                  className="ag"
                  d="M68.028,78.236c-.783,5.486,3.689,16.3,10.113,17.726s14.752,7.02,16.181,2.381,1.9-4.76-.238-13.325S81.235,71.455,78.38,72.169s-9.994,3.569-10.351,6.068"
                  transform="translate(-67.939 -72.101)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(23.115 68.405)">
              <g className="aj">
                <path
                  className="ag"
                  d="M12.548,51.744C26.094,64.389,47.29,35.927,40.625,35.091S7.195,46.746,12.548,51.744"
                  transform="translate(-11.844 -35.05)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(70.571 192.853)">
              <g className="ak">
                <path
                  className="ag"
                  d="M36.165,102.424c.65,12.352,30.339,3.927,28.554.714s-28.911-7.5-28.554-.714"
                  transform="translate(-36.16 -98.818)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(211.075 146.306)">
              <g className="al">
                <path
                  className="ag"
                  d="M109.354,100.85c10.1,13.472,23.32,12.373,30.933,7.613s9.994-25.7,5.712-27.6-24.748-9.518-30.935-3.808-8.566,19.988-5.71,23.8"
                  transform="translate(-108.155 -74.967)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(292.866 194.068)">
              <g className="am">
                <path
                  className="ag"
                  d="M150.85,102.784c-4.139,4.6,9.28,23.081,12.611,23.081s12.545-4.754,15.228-9.994c5-9.756-19.274-22.605-27.839-13.087"
                  transform="translate(-150.065 -99.44)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(390.565 188.875)">
              <g className="an">
                <path
                  className="ag"
                  d="M200.294,101.033c4.122,10.306,13.8,15.7,19.988,15.7s10.945.476,10.945-3.331-4.758-12.849-11.421-15.228-21.415-1.9-19.512,2.855"
                  transform="translate(-200.126 -96.78)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(370.155 16.493)">
              <g className="ao">
                <path
                  className="ag"
                  d="M189.783,15.192c0,13.409,16.181,19.512,19.512,19.988s10.47,0,9.518-4.76S208.932,7.1,198.468,8.529s-8.685,4.284-8.685,6.663"
                  transform="translate(-189.668 -8.451)"
                />
              </g>
            </g>
            <g className="ae" transform="translate(175.447 6.653)">
              <g className="ap">
                <path
                  className="ag"
                  d="M93.412,36.17c7.8,3.544,23.794-19.988,15.7-29.03s-17.133.476-18.083,6.187S88.178,33.791,93.412,36.17"
                  transform="translate(-89.899 -3.409)"
                />
              </g>
            </g>
            <g className="u" transform="translate(295.491 215.552)">
              <g className="aq">
                <path
                  className="ad"
                  d="M154.091,137.281c6.044-1.323,12.135-10.947,12.849-13.8s6.425-10.706,7.139-12.611-10.708,3.093-13.8,6.663-13.8,21.415-6.187,19.75"
                  transform="translate(-151.41 -110.449)"
                />
              </g>
            </g>
            <g className="u" transform="translate(389.318 209.483)">
              <g className="ar">
                <path
                  className="ad"
                  d="M209.469,108.592c-9.594,3.95-11.421,10.232-9.042,13.325s12.135.952,18.322-1.667,15.7-12.849,12.611-12.849-17.845-.474-21.891,1.19"
                  transform="translate(-199.487 -107.34)"
                />
              </g>
            </g>
            <g className="u" transform="translate(272.177 51.409)">
              <g className="as">
                <path
                  className="ad"
                  d="M169.5,95a4.129,4.129,0,0,1-.127.6,17.29,17.29,0,0,0-.349-2.74c-1.427-7.129-9.994-11.9-15.222-18.552-5.244-6.667-15.224-19.514-14.274-26.657.728-5.439,7.283-15.057,14.358-19.725,7.051-5.734,29.893,4.26,23.113,26.389-5.986,19.537-6.423,33.554-7.5,40.683"
                  transform="translate(-139.463 -26.342)"
                />
              </g>
            </g>
            <g className="u" transform="translate(432.852 98.907)">
              <g className="at">
                <path
                  className="ad"
                  d="M251.066,108.262c-6.766,1.132-17.7-5.172-24.338-10.695l-.041-.041L221.794,92.2a41.851,41.851,0,0,0,9.278-18.683c3.409-16.366,2.379-22.838,2.379-22.838,0,2.377,5.718,12.847,10,13.8s16.649,10.947,18.089,15.7c1.427,4.768-1.917,26.659-10.47,28.085"
                  transform="translate(-221.794 -50.68)"
                />
              </g>
            </g>
            <g className="u" transform="translate(316.5 164.564)">
              <g className="au">
                <path
                  className="ad"
                  d="M226.415,94.8c-6.542,9.393-43.427-7.861-47.592,9.99,0-5.228-.95-11.421-3.8-11.895A28.216,28.216,0,0,0,162.664,93.9l-.488-.88s1.989-9.044,22.359-8.69c82.328,1.429,41.879,10.47,41.879,10.47"
                  transform="translate(-162.174 -84.323)"
                />
              </g>
            </g>
            <g className="u" transform="translate(263.03 188.963)">
              <g className="av">
                <path
                  className="ad"
                  d="M156.36,101.942c-6.669,10.47-2.867,10.947-2.867,10.947s1.064-1.021,2.672-2.434c-3.1,4.6-6.11,10.261-6.11,14.93,0,9.633,6.417,21.054,6.417,21.054s-6.068-.363-15.349-8.919S128.639,118.6,160.762,96.825l.084.211a20.063,20.063,0,0,0-4.487,4.906"
                  transform="translate(-134.777 -96.825)"
                />
              </g>
            </g>
            <g className="u" transform="translate(143.148 75.156)">
              <g className="aw">
                <path
                  className="ax"
                  d="M113.207,43.933c-7.375-5.613-13.325-6.187-19.036-4.76S70.613,54.165,73.706,76.294c.941,6.725,9.518-4.284,15.23-2.143a30.962,30.962,0,0,0,11.421,1.786s1.071-6.068,9.637-15.347,8.208-8.8,8.208-8.8.95-3.329-5-7.853"
                  transform="translate(-73.35 -38.509)"
                />
              </g>
            </g>
            <g className="u" transform="translate(124.666 166.584)">
              <g className="ay">
                <path
                  className="ax"
                  d="M94.854,89.535c-12.219-9.258-32-.6-30.933,1.9s3.331,3.093,7.613,4.522,4.522,1.427,12.375-.476,14.871-2.974,10.945-5.948"
                  transform="translate(-63.879 -85.358)"
                />
              </g>
            </g>
            <g className="u" transform="translate(131.601 254.794)">
              <g className="az">
                <path
                  className="ax"
                  d="M125.975,130.757c-11.788,7.859-59.248.238-58.534,3.808s25.935,22.367,33.55,21.653,19.036-11.185,22.605-11.185,10.945,1.667,10.945.476-5.353-16.893-8.566-14.752"
                  transform="translate(-67.432 -130.557)"
                />
              </g>
            </g>
            <g className="u" transform="translate(22.772 234.716)">
              <g className="ba">
                <path
                  className="ax"
                  d="M24.612,121.036c4.844,14.475,20.466,17.6,19.75,18.8s-14.04,7.139-21.653,3.331S10.336,133.409,12,128.651s11.655-10.474,12.611-7.615"
                  transform="translate(-11.668 -120.268)"
                />
              </g>
            </g>
            <g className="u" transform="translate(79.214 201.115)">
              <g className="bb">
                <path
                  className="ax"
                  d="M43.253,107.2c-2.992,16.952-3.569,22.129-1.19,24.746s21.653-2.379,20.464-8.327-.714-14.278-.238-18.322-18.322-2.143-19.036,1.9"
                  transform="translate(-40.59 -103.052)"
                />
              </g>
            </g>
            <g className="u" transform="translate(233.694 153.244)">
              <g className="bc">
                <path
                  className="ax"
                  d="M138.537,80.1c-1.665,21.653-9.756,27.84-12.849,29.03s-7.377,13.087-5.472,13.564,22.367-6.425,26.887-20.941-.476-11.183-3.331-14.514-4.836-12.32-5.234-7.139"
                  transform="translate(-119.745 -78.523)"
                />
              </g>
            </g>
            <g className="u" transform="translate(205.708 112.163)">
              <g className="bd">
                <path
                  className="ax"
                  d="M114.825,57.535c-12.642,1.405-9.994,9.042-6.663,11.421s13.8.476,18.083-.238,24.51-.476,21.893-1.189-24.748-10.946-33.314-9.994"
                  transform="translate(-105.405 -57.472)"
                />
              </g>
            </g>
            <g className="u" transform="translate(115.19 0.644)">
              <g className="be">
                <path
                  className="ax"
                  d="M88.648,3.407C65.787-8.695,59.023,18.036,59.023,29.463c0,4.639,10.232,15.466,17.847,13.562S90.524,30.474,91.5,25.179c1.786-9.637,1.19-19.631-2.855-21.772"
                  transform="translate(-59.024 -0.329)"
                />
              </g>
            </g>
            <g className="u" transform="translate(38.203 152.594)">
              <g className="bf">
                <path
                  className="ax"
                  d="M57.539,78.272c-12.373,5.234-28.554-.238-33.074,1.667s-6.189,6.423-3.808,10.706S31.364,100.64,38.5,97.784,60.97,76.82,57.539,78.272"
                  transform="translate(-19.575 -78.189)"
                />
              </g>
            </g>
            <g className="u" transform="translate(340.395 30.628)">
              <g className="bg">
                <path
                  className="ad"
                  d="M232.967,29.833c-5.886-1.069-21.772-5-26.413-11.778s-16.774,2.736-20.343,7.375,7.851,12.611-.357,30.1S171.933,79.445,175.5,79.8s13.206-5,30.7-15.82c11.126-6.883,34.613-32.72,26.762-34.149"
                  transform="translate(-174.419 -15.694)"
                />
              </g>
            </g>
            <g className="bh" transform="translate(81.292 21.69)">
              <g className="bi">
                <g transform="translate(0.001 -0.001)">
                  <g className="bj">
                    <rect
                      className="bk"
                      width={59.112}
                      height={101.723}
                      transform="translate(-5.228 -9.045)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="bh" transform="translate(93.888 121.015)">
              <g className="bl">
                <g transform="translate(0 0)">
                  <g className="bm">
                    <rect
                      className="bn"
                      width={45.57}
                      height={45.116}
                      transform="translate(-17.161 3.709) rotate(-26.135)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="bh" transform="translate(28.846 196.769)">
              <g className="bo">
                <g transform="translate(0 0)">
                  <g className="bp">
                    <rect
                      className="bq"
                      width={49.455}
                      height={59.606}
                      transform="translate(-5.942 -1.381)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(192.822 235.685)">
              <g className="br">
                <path
                  className="ax"
                  d="M146.807,121.514c2.358,28.3-16.776,27.482-31.052,23.913s-17.845-12.135-16.776-5.71,7.5,23.2,16.062,27.839,34.492,5.591,37.947,1.546,5.954-14.038,5.6-25.459-12.135-26.413-11.778-22.129"
                  transform="translate(-98.802 -120.766)"
                />
              </g>
            </g>
            <g className="bh" transform="translate(307.511 100.578)">
              <g className="bs">
                <g transform="translate(0 0)">
                  <g className="bt">
                    <rect
                      className="bu"
                      width={90.157}
                      height={68.975}
                      transform="translate(-8.9 -7.292) rotate(-2.189)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="bh" transform="translate(170.804 92.254)">
              <g className="bv">
                <g transform="translate(0 0)">
                  <g className="bw">
                    <rect
                      className="bx"
                      width={51.383}
                      height={65.366}
                      transform="translate(-19.144 -3.351) rotate(-12.804)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <path
              className="by"
              d="M44.706,14.189c-7.615,5.71,7.615,5.71,6.187,2.855s-2.379-5.71-6.187-2.855"
              transform="translate(40.502 12.376)"
            />
            <path
              className="by"
              d="M162.94,58.84c-1.007,7.039,8.564,3.212,8.206,0s-7.492-5-8.206,0"
              transform="translate(154.982 53.029)"
            />
            <path
              className="by"
              d="M97.541,56.057c1.561,1.952,8.923-4.284,5-5.71s-7.851,2.141-5,5.71"
              transform="translate(91.889 47.602)"
            />
            <path
              className="by"
              d="M55.3,67.814c-2.131,5.861,10.706-1.069,7.5-3.568s-6.068-.357-7.5,3.568"
              transform="translate(52.395 60.115)"
            />
            <path
              className="by"
              d="M20.213,106.944c2.52.148,3.927-5.353.714-6.068s-6.782,5.71-.714,6.068"
              transform="translate(16.099 95.94)"
            />
            <path
              className="by"
              d="M96.458,9.291c5.558,5.558,8.923-.357,3.569-3.212s-6.068.714-3.569,3.212"
              transform="translate(90.473 4.78)"
            />
            <g className="u" transform="translate(191.805 146.49)">
              <g className="bz">
                <path
                  className="ax"
                  d="M122.319,75.062c-14.99,8.566-28.554,34.5-22.605,47.352s27.127-4.046,27.127-4.046a60.449,60.449,0,0,1-10.47-14.276c-4.284-8.329-1.19-14.754.952-19.512a105.951,105.951,0,0,1,5-9.518"
                  transform="translate(-98.281 -75.061)"
                />
              </g>
            </g>
            <g className="u" transform="translate(25.14 82.002)">
              <g className="ca">
                <path
                  className="ax"
                  d="M13.464,48.447c10.47,1.9,20.939-6.663,24.032-6.425s10.708,13.564,7.853,25.7S22.982,85.09,16.319,77s-1.044-14.01.31-18.427-5.783-10.6-3.165-10.127"
                  transform="translate(-12.882 -42.018)"
                />
              </g>
            </g>
            <g className="u" transform="translate(102.094 217.003)">
              <g className="cb">
                <path
                  className="ax"
                  d="M97.889,112.421c-25.706-9.18-40.332,36.05-44.973,38.191s18.56-12.135,31.766-14.99,11.066-3.212,19.274-2.143,23.558,4.641,19.274-7.137S102.885,114.2,97.889,112.421"
                  transform="translate(-52.314 -111.192)"
                />
              </g>
            </g>
            <path
              className="cc"
              d="M48.229,89.91c1.591,9.938,14.04,11.423,9.042-1.429s-9.994-4.52-9.042,1.429"
              transform="translate(45.783 77.758)"
            />
            <g className="u" transform="translate(93.969 159.824)">
              <g className="cd">
                <path
                  className="ad"
                  d="M48.193,89.737c1.04,5.2,8.327-.476,7.853-2.617-.987-4.438-3.331-5.829-5.355-5s-2.736,6.425-2.5,7.615"
                  transform="translate(-48.15 -81.894)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(97.101 170.644)">
            <g className="ce">
              <rect
                className="cf"
                width={8.458}
                height={6.592}
                transform="translate(-0.56)"
              />
            </g>
          </g>
          <g className="r">
            <path
              className="cc"
              d="M98.713,101.745c-5.636,1.907-5.8,14.385,1.327,8.981s2.047-10.123-1.327-8.981"
              transform="translate(90.003 96.656)"
            />
            <g className="u" transform="translate(187.602 198.334)">
              <g className="cg">
                <path
                  className="ad"
                  d="M97.241,101.694c-2.939,1.206.738,8.3,1.946,7.756a4.47,4.47,0,0,0,2.58-5.505c-.591-1.993-3.854-2.525-4.526-2.25"
                  transform="translate(-96.127 -101.627)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(183.997 201.682)">
            <g className="ch">
              <rect
                className="ci"
                width={5.205}
                height={8.335}
                transform="translate(-0.87 0.025) rotate(-3.199)"
              />
            </g>
          </g>
          <g className="r">
            <path
              className="cc"
              d="M124.643,35.659c-1.155,2.707,3.388,6.879,3.747,2.473s-3.056-4.092-3.747-2.473"
              transform="translate(118.432 32.887)"
            />
            <g className="u" transform="translate(243.024 67.513)">
              <g className="cj">
                <path
                  className="ad"
                  d="M124.576,35.627c-.525,1.481,3.3,2.463,3.5,1.84A2.211,2.211,0,0,0,126.9,34.7c-.929-.437-2.2.587-2.32.927"
                  transform="translate(-124.525 -34.595)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(243.166 70.816)">
            <g className="ck">
              <rect
                className="cl"
                width={4.129}
                height={4.275}
                transform="translate(-1.266 1.541) rotate(-51.378)"
              />
            </g>
          </g>
          <g className="r">
            <path
              className="cc"
              d="M183.572,38.832c-5.638,1.907-5.8,14.385,1.327,8.981s2.047-10.123-1.327-8.981"
              transform="translate(170.754 36.789)"
            />
            <g className="u" transform="translate(353.213 75.554)">
              <g className="cm">
                <path
                  className="ad"
                  d="M182.1,38.781c-2.939,1.206.738,8.3,1.946,7.756a4.471,4.471,0,0,0,2.58-5.507c-.593-1.991-3.854-2.523-4.526-2.248"
                  transform="translate(-180.987 -38.715)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(349.607 78.899)">
            <g className="cn">
              <rect
                className="co"
                width={5.207}
                height={8.335}
                transform="matrix(0.998, -0.056, 0.056, 0.998, -0.871, 0.025)"
              />
            </g>
          </g>
          <g className="r">
            <path
              className="cc"
              d="M216.79,59.057c-9.374,2.635-8.472,23.259,3.1,14.98s2.512-16.557-3.1-14.98"
              transform="translate(200.229 56.013)"
            />
            <g className="u" transform="translate(415.176 115.136)">
              <g className="cp">
                <path
                  className="ad"
                  d="M214.486,59.07c-4.877,1.739,1.78,14.188,3.8,13.37,4.176-1.7,5.141-5.664,4.016-9.12s-6.7-4.649-7.812-4.251"
                  transform="translate(-212.737 -58.996)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(406.903 120.466)">
            <g className="cq">
              <rect
                className="cr"
                width={12.638}
                height={12.998}
                transform="matrix(0.998, -0.056, 0.056, 0.998, -4.267, 0.038)"
              />
            </g>
          </g>
          <g className="r">
            <path
              className="cc"
              d="M83.5,27.044c-.763,5.441,10.1,9.649,8.445,1.794s-7.988-5.051-8.445-1.794"
              transform="translate(79.423 22.615)"
            />
            <g className="u" transform="translate(162.971 46.653)">
              <g className="cs">
                <path
                  className="ad"
                  d="M83.511,26.99c-.207,2.914,7.736,2.3,7.769,1.068a3.942,3.942,0,0,0-3.8-4.141c-2.041-.2-3.921,2.406-3.968,3.074"
                  transform="translate(-83.507 -23.905)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(164.446 53.558)">
            <g className="ct">
              <rect
                className="cu"
                width={9.252}
                height={9.44}
                transform="translate(-2.495 6.235) rotate(-69.524)"
              />
            </g>
          </g>
          <g className="r">
            <g className="cv" transform="translate(0)">
              <g className="r">
                <g transform="translate(0 -0.001)">
                  <g className="cw">
                    <rect
                      className="cx"
                      width={477.202}
                      height={287.796}
                      transform="translate(-3.181 -0.706)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="cy">
              <g className="cz">
                <g transform="translate(0 0.001)">
                  <g className="da">
                    <rect
                      className="db"
                      width={478.876}
                      height={291.424}
                      transform="translate(-5.863 0.024) rotate(-0.535)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dc">
              <g className="cz">
                <g transform="translate(0 0.001)">
                  <g className="da">
                    <rect
                      className="db"
                      width={478.876}
                      height={291.424}
                      transform="translate(-5.863 0.024) rotate(-0.535)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(-307.579 1768.288)">
        <g className="dd">
          <g transform="translate(46.828 0.003)">
            <g className="de">
              <path
                className="df"
                d="M0,0H2473.291V448.192H0Z"
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g className="dg">
            <g className="dh" transform="translate(539.752 172.964)">
              <g className="di">
                <path
                  className="f"
                  d="M907.394,52.443S732.607,73.688,734.806,102.913,870.053,96.857,857.921,121c-31.329,62.356-340.766,76.83-415.516,79.058S381.4,225.928,493.52,225.928c92.337,0-2.747,88.261-290.2,72.674-107.929-5.852,25.831,82.4,146.75,73.49s639.763,24.048,718.909,27.889S829.339,292.476,893.1,256.847s175.823,68.279,289.651,35.075c56.062-16.355-98.382-29.436-122.567-65.66s315.116,91.044,402.325,12.767c43.421-38.969-47.267-32.289-129.711-48.991-109-22.084-261.62-46.766-204.46-71.265s-43.969-22.8-103.328-28.1S996.44,46.239,907.394,52.443"
                  transform="translate(-163.673 -51.781)"
                />
              </g>
            </g>
            <g className="dh" transform="translate(1660.881 41.983)">
              <g className="dj">
                <path
                  className="f"
                  d="M1417.844,16.8S1200.3-6.285,1059.541,55.366,870.418,210.546,758.295,221.68s-290.2-33.4-248.429,13.362,197.865,57.9,309.988,31.18,281.407-45,200.061,14.247-340.766,15.8-288,77.057,353.957,15.59,448.494-80.17,175.879-42.313,237.438-69.037,0-191.517,0-191.517"
                  transform="translate(-503.639 -12.569)"
                />
              </g>
            </g>
            <g className="dk" transform="translate(1698.808 241.635)">
              <g className="dl">
                <g transform="translate(-0.001 0)">
                  <g className="dm">
                    <image
                      width={356.157}
                      height={72.55}
                      transform="translate(-16.956 -14.329)"
                      xlinkHref="ComponentTMP_0-image.png"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <path
        className="dn"
        d="M1227.458,957.956a474.022,474.022,0,0,1-59.676-4.056,242.61,242.61,0,0,1-29.488-5.755c-8.017-2.112-15.477-4.433-21.844-8.5-8.111-5.2-16.662-11.686-11.9-19.783,4.347-7.329,18.846-10.514,28.768-12.74,8.809-2,18.219-3.2,27.282-4.47,6.832-.94,13.85-1.67,20.8-2.053,15.33-.833,30.7-1.834,46.058-2.352v-1.914c-1.889.106-3.713.291-5.739.467-1.557.115-5.276.479-6.555-.538-1.185-.978-.162-2.11.209-3.185.162-.479-.021-1.265.3-1.707.534-.729,3.275-1.8,4.112-2.284a32.238,32.238,0,0,1,7.669-2.949V872.3c-.348.186-.712.358-1.046.553-6.32,3.741-10.573,8.883-16.916,12.683-3.138,1.881-7.6,2.916-11.271,4.2-4.345,1.516-8.831,2.8-13.408,3.952-5.9,1.478-11.69,3.07-17.638,4.433a160.187,160.187,0,0,1-26.445,3.223c-7.761.366-15.219-.44-22.935-1-6.832-.5-13.5-1.036-20.264-1.938-5.669-.766-11.062-2.188-16.684-3.07-6.367-1.017-12.921-1.862-19.171-3.166-8.412-1.746-18.313-2.974-24.331-7.906-3.856-3.127-3.555-7.847-.3-11.224,2.485-2.591,8.434-3.07,12.247-4.335,5.53-1.842,11.036-3.743,16.8-5.221a353.779,353.779,0,0,1,39.691-8.191c9.017-1.267,18.15-2.073,27.259-2.859,3.346-.289,6.646-.307,9.945-.9,3.113-.555,5.81-1.093,9.017-1.38,7.923-.71,16.173-.268,24.191-.287a97.723,97.723,0,0,1,10.876.459c3.508.366,7.063-.037,10.6.192,9.016.577,17.939,1.017,27.026,1.115.931.012,1.85.059,2.765.114v-2.978c-2.855-.08-5.714-.135-8.575-.129-10.5.02-21.821.806-32.163-.557-4.042-.518-8.062-1.169-12.059-1.842-4.648-.786-10.528-1.555-14.316-3.645-3.021-1.689-4.646-4.03-2.253-6.332a22.416,22.416,0,0,1,8.412-5.506c3.95-1.42,7.11-3.416,11.269-4.568s7.646-3.011,12.037-3.876c7.3-1.42,15.174-1.784,22.681-2.321,5-.36,9.988-.647,14.965-.974V814.8c-.675.051-1.345.111-2.022.162-5.647.422-11.271,1.036-16.94,1.42-4.973.326-9.945-.057-14.92.25-4.9.307-9.76.786-14.685.326a57.673,57.673,0,0,0-6.042-.461,13.735,13.735,0,0,1-1.07-2.436c-.837,2.5-3.068,1.036-5.786-.288-1.952-.96-4.369-1.363-6.529-2.129-3.3-1.152-6.6-2.284-9.877-3.512-3.835-1.42-8.481-2.092-12.663-2.859a115.946,115.946,0,0,1-14.245-3.492c-7.2-2.188-16.429-5.678-20.38-10.649-7.368-9.23,23.074-9.633,29.558-9.881q22.761-.892,45.569-1.918c9.249-.4,18.52-.845,27.792-1.075,7.462-.159,14.816-.07,22.239-.014v-28.2a136.44,136.44,0,0,0-18.893-1.4c-18.264.172-36.066-.194-54.214,1.859-18.078,2.036-36.111,3.608-54.167,5.815-18.846,2.282-37.437,4.892-56.351,6.58-15.8,1.4-32.278.327-48.149.327-6.555,0-10.643-.518-16.081-2.552-4.114-1.535-7.878-3.109-11.875-5.047-23.539-11.359-53.283-8.4-79.66-8.4-25.329,0-50.681-.823-75.429,4.01a73.49,73.49,0,0,0-15.407,4.357c-4.439,1.918-4.787,3.031-7.321,6.5-4.136,5.642-10.434,12.126-17.173,15.7-11.643,6.158-31.162,5.735-43.665,2.763-1.951-.462-3.508-1.555-5.438-2.112-2.253-.651-4.089-.4-6.39-.633-4.669-.479-8.923-1.5-13.686-1.535-8.2-.037-16.453-.057-24.679.039-3.346.039-4.089-.768-6.924-1.5a70.882,70.882,0,0,0-11.991-1.422c-11.318-.651-22.5-3.031-33.952-2.935-7.853.059-15.174-.02-22.865,1.171-5.415.825-10.69.076-16.058,1.054-4.484.807-8.969,1.075-13.455,1.842-3.973.692-7.923-.113-11.9.461-8.344,1.189-16.756,1.228-25.051,2.456-4.81.71-9.574.02-14.431.25-4.949.229-9.574,1.5-14.57,1.553-11.038.135-22.1-.152-33.16-.037-5.16.057-7.831-2.016-12.247-3.991-11.107-4.951-24.028-7.137-36.066-9.844-10.667-2.417-21.983-3.09-32.695-5.45a125.7,125.7,0,0,0-26.864-2.513c-20.845.057-41.69,0-62.535,0A535.938,535.938,0,0,0,229.6,763.1c-3.183.461-6.367-.152-9.55.25-2.556.327-4.881,1.074-7.46,1.381-3.835.442-7.669.98-11.525,1.459-5.346.653-10.11,1.208-14.9,3.225-9.621,4.028-21.494,5.929-32.137,8.039a84.824,84.824,0,0,1-17.614,1.785,51.619,51.619,0,0,1-13.129-1.5c-4.951-1.169-10.366-1.476-15.014-2.839-6.9-2-13.942-3.971-21.076-5.487-7.2-1.517-14.036-1.5-21.24-2.534-5.252-.747-10.876-2.034-16.2-2.225-10.876-.438-21.234-1.351-31.848-1.085v15.851c.145-.006.285,0,.43-.01,8.551-.383,16.94-1.343,25.422-2.188a155.069,155.069,0,0,1,38.878.845c5.483.806,10.759,2.264,16.2,3.262,6.25,1.132,12.734,1.977,18.868,3.4,6.369,1.459,12.294,3.684,18.684,5.2a50.221,50.221,0,0,1,11.154,3.569c5.276,2.667,13.34,7.444,14.8,12.108.907,2.974-1.324,4.507-4.857,5.966a81.6,81.6,0,0,1-18.054,5.027,165.275,165.275,0,0,1-19.333,2.38c-6.693.383-13.363-.076-20.055.364-25.864,1.67-50.427,8.136-76.361,9.249q-2.892.126-5.774.256v1.9c6.527-.974,12.929-1.443,19.6-1.826,8.553-.538,17.01-1.518,25.585-1.957,25-1.228,50.1-1.248,75.129-.538,10.387.307,20.728.825,31.091,1.267,11.295.5,22.589.5,33.858,1.113.442.018.884.037,1.3.057,14.476.786,28.884,1.938,43.315,3.033,11.922.9,24.586,1,35.647,4.527,1.441.461,2.859.941,4.23,1.439.628-.364,1.3-.729,2-1.054,8.923-4.185,21.123-3.416,30.861-1.23,2.81.616,5.46,1.383,8.18,2.131,6.019,1.65-4,4.7-6.461,4.988a78.943,78.943,0,0,1-17.149-.076c-6.553-.692-11.828-2.763-17.429-4.759a64.129,64.129,0,0,1-5.577,3.185,30.949,30.949,0,0,1-5.647,1.9c-9.016,2.112-18.172,3.185-26.422,6.717-2.741,1.189-5.53,2.264-7.693,3.952-1.486,1.152-1.952,2.628-3.275,3.819-2.37,2.149-6.089,2.09-9.458,2.687a46.655,46.655,0,0,1-8.086.459c-4.533.02-8.831,1.036-13.316,1.248-7.436.364-14.687.518-21.774,2.245-10.11,2.493-17.126,9.421-28.119,9.861-2.671.1-5.227.577-7.923.634-2.974.039-5.948-.152-8.923-.057-2.092.076-4.044.536-6.113.671-2.022.115-4.136-.037-6.181-.02a35.2,35.2,0,0,1-11.363-1.746c-2.393-.825-4.531-2.378-6.646-3.473-5.182-2.7-9.644-6.138-15.43-8.135a71.354,71.354,0,0,0-20.194-3.608c-4.855-.268-9.666-1.093-14.57-1.265-4.879-.135-9.574-.577-14.523-.577-5.9-.037-11.643.595-17.568.577-3.692,0-7.329.043-10.958-.029v5.6c5.549-.092,11.1-.11,16.674-.1,6.832.02,13.477-.536,20.264-.634,4.926-.076,9.642.346,14.5.634,3.277.211,6.39.422,9.644.577a46.028,46.028,0,0,1,8.18,1.208,31.379,31.379,0,0,1,13.874,6.85c3.043,2.7,4.136,5.87,3.322,9.247a48.341,48.341,0,0,1-2.255,5.8c-.626,1.611-1.115,3.05-2.835,4.259-3.391,2.4-9.341,2.417-13.9,2.417-9.155,0-18.358-1.381-27.468-1.975-9.456-.634-18.753-1.709-28.258-1.689-3.907.018-7.835,0-11.746,0v3.7c7.609.082,15.186.223,22.808.46,9.226.326,18.545,1.363,27.769,1.326,6.623-.059,14.781-.94,21.031.575,2.184.518,6.066,1.324,4.625,3.011-1.138,1.363-5.53,1.92-7.436,2.456-3.136.864-6.3,1.594-9.456,2.4-3.51.862-6.369,2.4-9.691,3.529-2.695.941-5.506,1.594-8.156,2.554-3.717,1.341-7.366,2.685-11.2,3.8-3.23.921-6.461,1.459-9.668,2.264H38.51c-6.725-1.774-13.651-3.228-20.6-4.636v1.289c.332.11.692.192,1.011.317,5.438,2.129,11.132,3.876,15.9,6.7,3.741,2.227,7.6,4.664,9.621,7.83a6.59,6.59,0,0,1,1.091,3.664c.047,1.017-1.208,2.245-1.742,1.228a28.905,28.905,0,0,1-9.435,1.208,85.147,85.147,0,0,0-8.6.154c-2.61.258-5.225.37-7.843.415v64.746c38.692,2.536,77.456,4.547,116.225,6.561,46.267,2.4,92.488,5.123,138.732,7.522,46.545,2.417,93.508,2.974,140.147,4.048,43.2.978,86.375,1.363,129.621,1.439,47.708.1,95.37,1.3,143.1,1.267,88.559-.078,177.283,1.169,265.8-.29,83.982-1.38,168.29.634,252.133-3.3q11.9-.56,23.8-1.1ZM1044.11,897.662c13.641-2.282,26.074,1.785,39.367,2.438,4.973.248,10.246.516,15.035,1.823,3.9,1.073,13.406,3.856,13.152,7.5L1103.251,911c-8.621,3.127-10.97,4.529-19.149,4.758a193.7,193.7,0,0,1-23.4-.4c-6.273-.632-15.591-1.5-20.866-4.279-2.953-1.572-8.946-4.969-8.459-7.906.628-3.932,8.551-4.816,12.734-5.507m6.555-36.263c-1.117.805-4,1.324-5.438,1.67-6.508,1.535-13.664,1.5-20.473,1.381-2.161-.057-4.067-.671-6.228-.671-.6,0-1.463.152-2.043.115-1.907-.135-3.416-1.152-4.975-1.9,1.6,1.287-.649.307-3.3-1.381-1.952-1.228-2.556-1.9-.256-3.185,2.835-1.555,7.088-1.65,10.573-1.535,6.764.231,13.526,1.631,20.311,1.881a82.322,82.322,0,0,1,9.76.575c.813.133,3.115.422,3.416.958.186.327-.976,1.842-1.347,2.092M1022.5,902.247c-3.647,2.245-8.805,3.743-13.105,5.278-12.92,4.586-27.792,6.216-41.9,8.1-24.306,3.184-49.357,4.259-73.966,5.755a455.391,455.391,0,0,1-86.979-3.318,239.415,239.415,0,0,1-29.513-5.776c-8.015-2.071-15.475-4.413-21.821-8.481-8.133-5.2-16.684-11.684-11.9-19.781,4.345-7.349,18.823-10.514,28.745-12.761,8.807-1.975,18.242-3.183,27.282-4.451,6.856-.96,13.874-1.67,20.821-2.053,15.87-.882,31.813-1.918,47.73-2.417,16.453-.518,33.3-.5,49.707.479,5.02.287,9.992.768,14.988,1.093,5.857.366,11.852.115,17.706.135,9.11.02,18.1-1.017,27.235-.557,6.926.309,14.106.577,20.751,2.036,4.9,1.074,8.621,2.763,12.922,4.566a46.945,46.945,0,0,0,5.972,2.284,19.93,19.93,0,0,1,4.787,1.648c1.789,1.036,4.02,3.013,4.718,4.568.72,1.572.812,3.242,1.7,4.816a8.18,8.18,0,0,1,1.115,3.645c.164,1.727,1.255,3.129.745,4.892a26.9,26.9,0,0,1-1.488,3.665,17.055,17.055,0,0,1-2.765,3.608c2.579-.172-1.789,2-3.487,3.031m46.267-68.766c-.952.422-1.975,1.842-3.322,3.78-1.418,2.073-3.369,2.591-6.322,1.67-2.951-.9-4.693-2.341-7.086-3.647-3.092-1.688-6.738-1.535-10.364-2.532-4.672-1.265-9.365-3.817-14.478-4.143-7.39-.442-14.455-1.823-21.913-1.805-6.484.039-12.99-.017-19.474.02-4.183.039-8.18-.671-12.362-.614-4.37.039-8.622-.518-13.013-.594-7.622-.155-17.685-1.248-22.959-5.469-2.045-1.631-1.441-2.761-.837-4.681.767-2.456,2.09-3.7,5.065-5.2,4.323-2.188,8.925-3.089,14.222-3.625,6.322-.614,12.479-1.383,18.846-1.65,6.158-.289,12.13-.634,18.313-.614,5.577,0,10.944-.02,16.474-.481,3.092-.248,6.089-.037,9.179-.1,3.487-.057,6.926-.518,10.387-.634,5.3-.209,10.573-.69,15.825-1.208,11.177-1.093,22.519-3.127,33.858-3.09,8.622.039,15.036,1.594,19.265,6.889,2.067,2.552,2.067,5.3-.419,7.732-1.208,1.23-4.159,2.208-6,2.994-1.766.768-3.51,1.017-5.346,1.67a49.365,49.365,0,0,1-5.227,1.823,61.418,61.418,0,0,0-6.856,2.014c-2.951,1.056-6.531,1.535-7.274,4.222a7.969,7.969,0,0,0,1.813,7.272m-125.507-1.056c11.013-.518,22.028-.766,33.045-1.246,9.713-.422,18.821.632,28.3,1.553,7.18.712,14.873.366,21.844,1.5a92.192,92.192,0,0,1,10.061,2.282c4.067,1.132,11.224,2.036,13.5,4.376,1.742,1.783-4.462,5.026-6.948,5.966-2.464.96-4.787,1.881-7.227,2.878-1.65.71-3.557,1.574-2.325.729a45.835,45.835,0,0,1-10.968,1.208c-3.416-.02-6.832,0-10.272,0a90.6,90.6,0,0,0-14.546.749c-6.506,1-13.013,1.611-19.265,3.07-1.672.383-3.391,1.208-4.949,1.535-2.09.422-4.6.614-6.877.862-12.294,1.363-24.7,1.076-37.3,1.076H917.347c-5.6,0-10.921.538-16.5.633-11.783.209-23.68-.039-35.485-.039h-38.2c-10.992,0-22.54.557-32.65-2.169-4.554-1.228-9.713-3.262-8.086-6.177.835-1.478,2.9-2.783,4.808-3.915,3.254-1.918,6.207-3.954,9.621-5.794,2.743-1.478,4.765-2.974,8.273-3.934a74.1,74.1,0,0,1,14.036-2.11c18.915-1.613,38.831-2,58-1.977,20.659.02,41.5-.076,62.093-1.056M1098.7,849.253a3.306,3.306,0,0,1,2.229,2.071c-2.393,1.132-5.833,1.132-8.6,1.422q-6.726.66-13.477,1.208c-7.135.575-14.408,1.4-21.564,1.361-3.115-.018-5.741.289-8.807.557-1.58.115-5.3.5-6.554-.518-1.208-.978-.162-2.11.209-3.2.162-.479-.047-1.265.28-1.688.557-.749,3.277-1.823,4.112-2.3,5.09-2.861,11.341-3.878,17.638-4.836,7.18-1.056,14.107-.5,21.379-.174,4.625.211,8.924.845,12.712,2.687,1.557.769,6.553,3.281.442,3.416m20.217-42.175c5.692-.9,10.874.69,16.427.941a32.213,32.213,0,0,1,6.275.71c1.65.422,5.624,1.5,5.506,2.917l-3.508.594c-3.6,1.228-4.578,1.783-7.994,1.86a82.858,82.858,0,0,1-9.783-.153c-2.626-.25-6.508-.575-8.715-1.67-1.23-.614-3.741-1.918-3.531-3.05.256-1.535,3.578-1.879,5.323-2.149M1110.5,818.61c14.267-1.15,28.047-1.265,41.735,2.36,3.23.864,7.063,2.571,8.5,4.875,1.161,1.879.327,2.935-1.719,4.3-3.113,2.071-5.972,4.777-5.739,7.886.115,1.457,1.161,2.436,1.7,3.7.325.825,2.092,3.32,1.836,3.876-12.456,1.383-25.237.135-37.622-1.034-7.622-.749-15.1-1.729-22.493-3.185a37.16,37.16,0,0,1-9.644-3.185c-2.186-1.056-4.347-2.13-6.623-3.09-2.579-1.056-5.53-1.65-8.064-2.7-1.465-.577-1.672-.634-1.9-1.824-.372-1.783.976-3.107,2.648-4.355,9.343-6.965,24.8-6.582,37.392-7.618M788.168,777.051c7.042-4.777,17.73-7.81,27.141-9.574a249.224,249.224,0,0,1,32.7-4.261,283.023,283.023,0,0,1,35.857.864c6.948.555,13.848,1.439,20.7,2.36,5.229.71,10.2,1.975,15.36,2.839a109.882,109.882,0,0,0,13.989,1.093c7.483.192,15.2,1.515,22.519,2.456a75.029,75.029,0,0,1,9.388,1.823c1.766.442,4.136,1.881,6.064,1.8l5.462,3.7c1.813-.209,3.625-.383,5.415-.69a86.49,86.49,0,0,0,9.063-2.321c12.781-3.627,26.375-5.526,39.875-7.349,18.313-2.495,36.879-3.8,55.378-5.315,7.11-.575,14.222-1.056,21.355-1.363,5.948-.248,11.711-.96,17.73-.479,15.012,1.228,30.162,1.8,45.245,2.3,11.386.385,22.006,2.149,32.951,4.087,2.581.461,5.6.538,7.972,1.383,1.183.4,3.438,1.056,4.018,1.957-.186.133-.348.287-3.184.459a45.252,45.252,0,0,1-11.386,1.208c-3.88.02-7.9-.729-11.688-.518-11.271.71-22.634.768-33.905,1.574-5.461.4-10.991.442-16.43.921-4.9.422-9.945.921-14.894,1.076-4.114.113-8.179.632-12.317.594-4.926-.02-9.433.248-14.314.594-3.348.248-6.832.383-10.131.749-1.349.133-5.137.364-6.019,1.208-.7.634-.117,2.724-.117,3.51,0,1.306.209,2.438-1.115,3.512-2.464,2.053-7.646,2.763-11.177,3.3-10.18,1.592-20.567,2.763-30.884,3.819-7.738.767-15.5.882-23.144,1.955-8.135,1.132-16.361,1.709-24.586,2.436-6.623.6-13.688.155-20.078,1.21-3.416.575-8.621.575-11.433-1.056-4.763-2.743-1.557-5.794,1.512-8.481,4.507-3.971,11.036-6.869,17.822-9.249l-1.533-1.036a44.009,44.009,0,0,0-5.02.845,99.005,99.005,0,0,0-28.954,12.2c-2.464,1.572-5.02,2.955-7.575,4.49-2.742,1.651-5.739,2.034-9.11,2.8-10.387,2.358-21.819,3.146-32.695,3.817-17.591,1.056-35.344-.825-52.82-1.9-7.321-.442-14.408-1.67-21.658-2.532-6.158-.729-12.292-1.267-18.2-2.8-6.343-1.67-17.568-4.451-19.566-9.689-1.394-3.608,2.88-7.962,6.414-10.342m-15.71,38.2c16.5-.71,32.906-.268,49.359-.882,15.778-.594,31.789-.307,47.615-.307,9.5,0,18.729-.211,28.047.614,6.136.538,11.085,1.42,16.733,2.417a60.513,60.513,0,0,1,10.131,3.05,29.838,29.838,0,0,1,3.277,1.459,9.7,9.7,0,0,1,2.161,1.248,19.428,19.428,0,0,1,2.3,2.744,15.044,15.044,0,0,0,3.719,1.862c-18.127,2.225-37.9,3.011-56.793,3.608-9.574.287-18.753.747-28.4.631-5.532-.057-10.9-.614-16.429-.671-6.181-.076-12.317.135-18.5-.1-21.774-.845-45.174-.268-65.344-4.087-5.368-1.017-7.018-3.32-5.485-5.45,3.324-4.642,17.01-5.679,27.607-6.14m-301.929-8.614c.487-1.94,3.021-2.994,4.763-4.472,4.275-3.645,11.316-6.293,17.847-7.771,3.485-.786,6.111-2.341,9.527-3.223,3.741-1,7.855-1.535,11.734-2.168,8.088-1.285,15.988-3.338,24.122-4.433a216.472,216.472,0,0,1,39.435-1.15,225.256,225.256,0,0,0,23.027.5c8.553-.4,16.942-1.363,25.4-2.208a156.164,156.164,0,0,1,38.9.825c5.485.825,10.759,2.284,16.2,3.262,6.228,1.132,12.736,2,18.846,3.4,6.39,1.478,12.294,3.723,18.708,5.2a51.458,51.458,0,0,1,11.154,3.569c5.274,2.687,13.338,7.464,14.779,12.128.929,2.974-1.326,4.509-4.834,5.966a81.6,81.6,0,0,1-18.056,5.027,169.484,169.484,0,0,1-19.333,2.36c-6.693.383-13.385-.057-20.055.366-25.888,1.688-50.427,8.135-76.383,9.267-12.99.575-25.888,1.248-38.97.9a224.471,224.471,0,0,1-27.167-2.82c-8.852-1.287-17.544-4.011-26.142-5.988a136.018,136.018,0,0,1-18.451-5.833c-5.088-.1-16.242-2.282-22.47-8.174-1.465-1.419-3.092-2.648-2.579-4.527m3.137,25.575c18.52,1.515,37.087,2.822,55.4,5.315,13.479,1.824,27.1,3.723,39.877,7.35A80.9,80.9,0,0,0,578,847.2c1.789.307,3.6.5,5.413.71l5.461-3.7c1.907.076,4.3-1.363,6.042-1.822a76.128,76.128,0,0,1,9.411-1.823c7.319-.921,15.035-2.245,22.517-2.456a107.039,107.039,0,0,0,13.989-1.093c5.158-.845,10.133-2.131,15.36-2.841,6.856-.921,13.758-1.8,20.682-2.341a276.306,276.306,0,0,1,35.88-.862,245.577,245.577,0,0,1,32.695,4.24c9.39,1.766,20.1,4.816,27.143,9.576,3.531,2.4,7.785,6.735,6.414,10.36-2,5.219-13.223,8-19.589,9.672-5.88,1.533-12.014,2.071-18.2,2.82-7.225.864-14.314,2.073-21.656,2.513-17.452,1.075-35.206,2.994-52.8,1.9-10.876-.653-22.309-1.459-32.7-3.819-3.369-.767-6.367-1.152-9.132-2.8-2.532-1.535-5.09-2.9-7.552-4.492a99.451,99.451,0,0,0-28.979-12.2,42.692,42.692,0,0,0-5-.825l-1.533,1.036c6.785,2.378,13.315,5.276,17.824,9.247,3.068,2.687,6.275,5.718,1.51,8.481-2.81,1.631-8.017,1.631-11.455,1.056-6.369-1.056-13.455-.633-20.055-1.228-8.227-.729-16.476-1.285-24.609-2.436-7.646-1.056-15.407-1.152-23.123-1.957-10.317-1.036-20.727-2.225-30.882-3.8-3.531-.536-8.715-1.248-11.2-3.3-1.3-1.073-1.117-2.225-1.093-3.529,0-.786.557-2.878-.115-3.512-.884-.843-4.672-1.054-6.019-1.189-3.322-.364-6.785-.518-10.131-.749-4.9-.364-9.39-.632-14.316-.594-4.136.02-8.2-.479-12.339-.594-4.928-.154-9.969-.653-14.873-1.093-5.438-.481-10.968-.518-16.43-.9-11.269-.806-22.632-.862-33.927-1.553-3.788-.25-7.808.5-11.666.479a43.616,43.616,0,0,1-11.386-1.208c-2.835-.154-3-.307-3.183-.461.581-.882,2.835-1.553,4.02-1.957,2.37-.825,5.391-.9,7.97-1.381,10.945-1.938,21.564-3.684,32.951-4.067,15.082-.518,30.233-1.1,45.245-2.3,6.019-.5,11.783.211,17.732.481,7.133.288,14.243.786,21.332,1.341m47.452,85.251c-1.789-1-3.51-1.92-5.344-2.878-1.813-.941-6.392-4.163-5.09-5.968,1.672-2.341,6.924-3.222,9.945-4.374a53.041,53.041,0,0,1,7.413-2.284c5.135-1.113,10.806-.786,16.1-1.5,6.971-.921,13.686-1.977,20.843-1.535,8.135.479,16.244.71,24.378,1.248,15.151.978,30.511,1.074,45.732,1.054a369.276,369.276,0,0,1,42.757,1.957A42.437,42.437,0,0,1,688.2,905.3c2.6.958,4.089,2.456,6.111,3.952,2.511,1.842,4.7,3.856,7.088,5.794a11.248,11.248,0,0,1,3.531,3.9c1.208,2.937-2.6,4.971-5.948,6.179-7.436,2.724-15.966,2.186-24.075,2.186H646.765c-8.715,0-17.476.231-26.166.02-4.114-.1-8.017-.634-12.155-.634-2.951.02-5.878,0-8.831,0-9.271,0-18.428.289-27.489-1.054a50.54,50.54,0,0,1-5.066-.884c-1.138-.325-2.417-1.132-3.649-1.535-4.625-1.439-9.411-2.053-14.2-3.051a48.473,48.473,0,0,0-10.735-.749c-2.511,0-5.043-.037-7.575,0a26.294,26.294,0,0,1-8.064-1.208c.907.825-.487-.037-1.719-.747m-58.629-3.876c3.811-1.842,8.109-2.5,12.734-2.687,7.274-.346,14.2-.884,21.379.192,6.3.921,12.55,1.938,17.638,4.816.837.479,3.555,1.555,4.091,2.282.325.422.139,1.21.3,1.689.372,1.093,1.418,2.225.209,3.205-1.253,1.036-4.973.651-6.553.518-3.068-.25-5.692-.557-8.807-.538-7.157.02-14.431-.786-21.564-1.363-4.509-.383-8.993-.767-13.479-1.228-2.765-.287-6.2-.287-8.6-1.4a3.193,3.193,0,0,1,2.231-2.092c-6.111-.113-1.138-2.648.418-3.395m-60.743-15.716c-2.045-1.341-2.882-2.417-1.721-4.278,1.418-2.3,5.276-4.03,8.506-4.893,13.686-3.608,27.466-3.492,41.735-2.341,12.595,1.017,28.025.634,37.366,7.6,1.674,1.246,3.045,2.571,2.673,4.392-.233,1.171-.465,1.21-1.907,1.8-2.532,1.036-5.483,1.65-8.062,2.7-2.278.94-4.439,2.016-6.623,3.07a35.979,35.979,0,0,1-9.644,3.185,222.4,222.4,0,0,1-22.5,3.185c-12.384,1.191-25.19,2.437-37.62,1.056-.256-.577,1.51-3.07,1.834-3.9.536-1.267,1.58-2.245,1.7-3.684.233-3.127-2.65-5.813-5.739-7.906m-1.326,12.452c-3.811,2.112-9.666,2.878-14.314,3.667-4,.671-8.017,1.3-12.061,1.822-10.34,1.363-21.658.594-32.161.575-11.2-.02-22.356.864-33.534.634-8.621-.172-17.264-.978-25.886-1.3-4.323-.192-8.459-.577-12.8-.557-3.068.02-6.136.076-9.2.039-6.576-.1-13.152-.96-19.636-1.689a180.16,180.16,0,0,1-22.726-4.1,29.093,29.093,0,0,1-6.042-1.825c-1.347-.671-1.627-1.247-1.744-2.129a3.008,3.008,0,0,1-1.952-1.727,6.965,6.965,0,0,1-.813-3.281c0-2.935,2.464-4.892,5.276-6.965a39.585,39.585,0,0,1,16.707-6.523c10.086-1.707,20.379-2.743,30.7-3.492,5.113-.364,10.225-.958,15.36-1.093a107.715,107.715,0,0,1,14.292.882c9.574,1.017,19.31,1.324,28.907,2.341,9.783,1,19.613,1.42,29.49,2.129,7.5.538,15.383.921,22.658,2.323,4.413.862,7.9,2.724,12.059,3.876s7.321,3.166,11.271,4.566a22.655,22.655,0,0,1,8.412,5.526c2.393,2.284.767,4.644-2.255,6.312m13.223-30.948c-.115-1.4,3.858-2.493,5.485-2.916a32.661,32.661,0,0,1,6.3-.71c5.555-.25,10.737-1.824,16.429-.941,1.742.268,5.066.614,5.323,2.149.207,1.132-2.3,2.456-3.533,3.05-2.208,1.093-6.089,1.439-8.713,1.67a79.246,79.246,0,0,1-9.783.153c-3.416-.076-4.392-.614-7.994-1.842Zm80.171,14.564c-.743-2.667-4.345-3.148-7.3-4.222a60.949,60.949,0,0,0-6.832-2,49.4,49.4,0,0,1-5.229-1.822c-1.836-.671-3.6-.9-5.344-1.668-1.836-.806-4.787-1.785-6.019-2.994-2.464-2.456-2.464-5.2-.395-7.751,4.23-5.3,10.643-6.85,19.241-6.889,11.363-.02,22.7,2.014,33.88,3.09,5.252.518,10.526,1,15.8,1.208,3.487.135,6.926.575,10.411.634,3.091.076,6.066-.155,9.179.1,5.53.46,10.9.479,16.453.479,6.2-.019,12.176.346,18.334.614,6.369.27,12.527,1.036,18.823,1.67,5.323.518,9.924,1.439,14.245,3.625,2.974,1.5,4.3,2.726,5.067,5.182.6,1.918,1.185,3.051-.837,4.681-5.276,4.222-15.336,5.334-22.959,5.469-4.392.076-8.645.651-13.037.594-4.159-.039-8.156.651-12.339.633-6.508-.059-12.99,0-19.474-.02-7.482-.039-14.523,1.361-21.913,1.8-5.113.307-9.806,2.859-14.478,4.126-3.625,1-7.274.862-10.364,2.532-2.417,1.324-4.138,2.763-7.088,3.664s-4.9.383-6.343-1.67c-1.347-1.938-2.346-3.375-3.3-3.78a8,8,0,0,0,1.813-7.29m197.244,4.72c-3.485.229-6.948.017-10.434.1-3.113.076-6.134.614-9.247.671-5.461.115-10.62-.326-16.011-.633-10.667-.594-21.8-1.361-32.022-3.625a7.674,7.674,0,0,0,2.09-1.842,18.445,18.445,0,0,1,1.3-2.706,5.3,5.3,0,0,1,1.208-1.285,17.479,17.479,0,0,1,1.836-1.459,24.34,24.34,0,0,1,5.716-3.031,61.81,61.81,0,0,1,9.435-2.437c5.252-.825,10.458-.6,15.825-.6,8.923,0,17.939-.287,26.838.307,9.273.595,18.522.155,27.818.884,5.972.46,13.686,1.476,15.569,6.121.882,2.129-.07,4.431-3.092,5.45-11.363,3.817-24.562,3.262-36.832,4.087m-370.319-71.7a455.508,455.508,0,0,1-86.981-3.32,239.353,239.353,0,0,1-29.511-5.755c-8.017-2.092-15.477-4.413-21.844-8.483-8.109-5.2-16.66-11.7-11.875-19.8,4.323-7.329,18.823-10.514,28.747-12.739,8.807-1.977,18.219-3.205,27.28-4.472,6.832-.939,13.874-1.668,20.821-2.051,15.872-.864,31.813-1.92,47.732-2.419,16.451-.518,33.3-.5,49.7.481,5.02.307,9.992.786,14.988,1.093,5.833.364,11.852.115,17.708.153,9.108.02,18.078-1.017,27.235-.575,6.924.327,14.1.594,20.751,2.034,4.9,1.075,8.621,2.783,12.919,4.586a50.239,50.239,0,0,0,5.974,2.284,19.477,19.477,0,0,1,4.787,1.65c1.789,1.017,4.018,2.994,4.716,4.546.72,1.574.813,3.262,1.7,4.816a7.925,7.925,0,0,1,1.091,3.647c.186,1.746,1.277,3.146.767,4.91a31.335,31.335,0,0,1-1.486,3.647,16.63,16.63,0,0,1-2.767,3.608c2.558-.174-1.789,1.994-3.485,3.031-3.649,2.264-8.807,3.76-13.107,5.276-12.919,4.585-27.792,6.236-41.9,8.1-24.308,3.205-49.357,4.259-73.966,5.757m-64.648,23.888c3.88-1.248,8.457-1.476,12.618-1.938,5.739-.634,11.34-1.324,17.149-1.535,14.222-.5,28.444-1.248,42.665-1.343,9.04-.057,17.963-.229,27.026,0,9.271.192,18.52.634,27.792,1.056,15.174.69,30.4,1.3,45.569,1.9,6.459.25,36.924.653,29.558,9.9-3.95,4.969-13.176,8.442-20.379,10.647a121.9,121.9,0,0,1-14.245,3.492c-4.183.749-8.831,1.42-12.663,2.859-3.277,1.228-6.578,2.341-9.9,3.512-2.137.749-4.554,1.171-6.508,2.11-2.718,1.324-4.949,2.783-5.786.307a15.2,15.2,0,0,1-1.068,2.438,53.25,53.25,0,0,0-6.042.459c-4.949.46-9.783-.039-14.687-.346-4.973-.307-9.969.078-14.918-.248-5.671-.366-11.295-.98-16.94-1.4-16.361-1.246-32.511-2.744-48.545-5.315-6.576-1.034-10.782-3.664-15.755-6.484-3.346-1.918-7.436-3.013-10.829-4.836a70.241,70.241,0,0,1-8.97-5.833c-1.255-.921-3.16-2.245-3.207-3.588-.115-2.82,4.9-4.816,8.064-5.813m-71.666,20.012c2.765-2.9,7.366-3.011,12.014-2.992,4.949.02,9.875-.02,14.826,0,4.578.037,8.97-.557,13.5-.634,9.134-.155,18.614.845,27.654,1.822,2.022.231,16.126,1.017,15.825,3.645-.162,1.363-5.532,2.092-6.856,2.419-5.46,1.324-11.083,2.264-16.754,3.07-13.827,1.975-29.234,2.839-43.223,1.189,2.255-1.8-23.053-2.169-16.987-8.52m-91.79,31.584a16.12,16.12,0,0,1,3.322-3.492,37.864,37.864,0,0,0,3.322-2.323A16.143,16.143,0,0,0,101.7,892.6c.929-1.881,3.252-3.416,5.088-5.008,5.066-4.413,11.9-6.621,19.8-7.483,13.524-1.459,27.515-.729,41.177-.729,8.2,0,16.081.673,24.331.614a21.662,21.662,0,0,1,4.228.479c1.535.231,2.859.02,4.206.4,2.44.692,4.114,2.245.884,3.379,2.137,1.631,4.926,3.146,4.462,5.583-.722,3.8-8.715,5.065-13.131,5.487-5.321.5-10.6,1.056-15.917,1.5a50.412,50.412,0,0,0-8.715,1.21c-1.416.383-2.579,1-4.02,1.324-1.811.4-3.764.479-5.6.786-2.579.422-5.088,1.171-7.644,1.707-4.114.845-8.575.96-12.851,1.363-4.138.364-8.111.461-12.294.442-3.623-.02-6.645.307-10.155.614-6.9.614-13.686.5-20.681.594-1.326.02-2.139.268-2.7-.557-.395-.575.162-1.381.465-1.86M157.42,961.73c-8.2.71-16.244,1.42-24.517,1.361-6.668-.057-13.385.326-20.008.749a206.52,206.52,0,0,1-21.541.422c-2.859-.135-5.669-.557-8.528-.594a49.851,49.851,0,0,1-6.089-.115c-4.392-.594-9.085-1.631-13.571-1.689-2.417,0-6.414.422-7.065-1.209a11.408,11.408,0,0,1,1.93-3.473c1-.958,2.695-1.42,3.835-2.264,2.02-1.516,4.321-3.473,5.3-5.487.767-1.631.952-3.2,1.952-4.681a10.663,10.663,0,0,1,3.9-3.34c4.183-2.245,10.921-1.535,15.684-.747,2.65.44,5.276.634,7.925,1.228,2.485.536,5.088.536,7.667,1.169,2.581.653,5.205,1.095,7.622,1.92,2.835.939,5.9,1.15,8.925,1.668,2.462.442,4.973.594,7.481,1.287a41.237,41.237,0,0,0,4.787.575,15.385,15.385,0,0,1,1.512.5c1.162.211,2.276-.057,3.416.1,2.835.346,5.229.941,7.9,1.383,3.416.575,6.926,1.228,10.458,1.8,3.882.634,7.785,1.381,11.619,2.149,1.766.366,4.672.575,5.972,1.515,6.134,4.374-14.361,5.585-16.568,5.776m155.857-20.78c-.28,1.3-1.371,1.842-2.626,2.859-5.067,4.163-11.944,5.565-19.333,6.869-12.2,2.149-25.7,1.727-38.182,2.245-9.365.383-18.567.442-27.955.479-7.11.039-14.222-.518-21.355-.614-6.066-.057-12.223-.479-18.289-.767-6.785-.327-13.663-.518-20.4-1.208-7.366-.729-14.453-1.69-21.656-2.917-5.579-.941-11.085-1.555-16.476-3.013-9.969-2.7-20.774-3.682-30.814-6.177-9.945-2.515-20.868-4.146-30.186-7.636a91.272,91.272,0,0,0-9.969-2.571,98.443,98.443,0,0,1-11.365-3.608c4.161-.057,3.928-.1,3.7-.115-.395-1.651-4.206-4.106-2.208-5.546,1-.71,3.207-.806,4.486-1.189a27.9,27.9,0,0,0,3.88-1.65c2.045-.862,4.253-2.014,6.414-2.687,4.323-1.324,10.039-1.476,14.64-1.65,13.641-.479,27.515-1.38,40.992-2.953,7.157-.825,14.57-1.306,21.844-1.67,6.924-.366,14.222-.98,21.123-.729a272.639,272.639,0,0,1,38.9,4.586c13.686,2.532,27.489,4.566,41.48,6.312,12.64,1.574,25.561,2.552,37.97,4.855,7.5,1.381,14.593,3.107,20.866,6.312,1.373.69,2.906,1.152,4.37,1.727a31.879,31.879,0,0,1,4.67,1.766c2.487,1.515,4.648,4.028,5.252,6.1a5.469,5.469,0,0,1,.233,2.591m210.14,11.072c-6.04,4.932-15.917,6.14-24.353,7.9-6.252,1.287-12.781,2.132-19.148,3.148-5.624.9-11.015,2.3-16.686,3.07-6.762.921-13.455,1.457-20.286,1.938-7.693.555-15.153,1.361-22.914,1a156.147,156.147,0,0,1-26.445-3.225c-5.948-1.361-11.734-2.955-17.638-4.431-4.578-1.152-9.061-2.436-13.406-3.952-3.672-1.287-8.158-2.323-11.271-4.2-6.345-3.8-10.6-8.942-16.918-12.665-3-1.783-6.691-2.992-9.456-4.816a54.973,54.973,0,0,0-12.317-5.428c-2.951-.98-4.879-2.4-7.3-3.858a64.926,64.926,0,0,0-6.322-3.107,6.5,6.5,0,0,1,3.672-2.169c3.788-1.152,8.3-.479,12.362-.575,2.929-.078,5.624-.673,8.6-.653,4.23.076,8.273-.577,12.48-.614,9.085-.1,18.009-.538,27.026-1.132,3.531-.211,7.086.192,10.6-.191a98.161,98.161,0,0,1,10.874-.461c8.017.02,16.244-.42,24.191.289,3.207.287,5.9.823,9.018,1.4,3.275.594,6.6.594,9.945.882,9.108.786,18.24,1.631,27.257,2.859a353.24,353.24,0,0,1,39.691,8.213c5.763,1.476,11.271,3.377,16.8,5.2,3.811,1.287,9.759,1.746,12.247,4.337,3.23,3.377,3.555,8.1-.3,11.244M805.55,971.534c-6.343,4.067-13.8,6.408-21.821,8.481a235.768,235.768,0,0,1-29.511,5.794,455.26,455.26,0,0,1-86.981,3.3c-24.609-1.478-49.658-2.552-73.966-5.757-14.1-1.862-29-3.51-41.9-8.078-4.322-1.535-9.48-3.051-13.129-5.3-1.672-1.036-6.042-3.185-3.461-3.031a17.035,17.035,0,0,1-2.765-3.608,25.772,25.772,0,0,1-1.488-3.664c-.512-1.766.581-3.146.743-4.873a7.831,7.831,0,0,1,1.115-3.647c.884-1.574.976-3.262,1.674-4.836a12.915,12.915,0,0,1,4.74-4.546,18.1,18.1,0,0,1,4.787-1.65,45.237,45.237,0,0,0,5.95-2.3,71.222,71.222,0,0,1,12.943-4.548c6.646-1.459,13.827-1.727,20.751-2.053,9.134-.442,18.127.614,27.235.557,5.857-.02,11.852.248,17.708-.135,5-.307,9.969-.786,14.965-1.093,16.43-.98,33.275-1,49.728-.481,15.919.518,31.836,1.574,47.732,2.438,6.948.383,13.966,1.073,20.8,2.034,9.061,1.265,18.5,2.493,27.28,4.451,9.947,2.245,24.423,5.411,28.768,12.759,4.787,8.1-3.764,14.584-11.9,19.783m280.087-31.545a87.471,87.471,0,0,0-9.969,2.571c-9.319,3.492-20.24,5.123-30.188,7.618-10.037,2.513-20.843,3.49-30.812,6.2-5.391,1.459-10.9,2.073-16.477,3.013-7.227,1.228-14.292,2.167-21.658,2.916-6.738.69-13.618.884-20.4,1.208-6.066.287-12.223.692-18.311.768-7.112.076-14.222.634-21.334.614-9.388-.039-18.612-.115-27.955-.479-12.48-.518-25.98-.1-38.18-2.264-7.413-1.306-14.267-2.706-19.333-6.85-1.255-1.036-2.348-1.555-2.65-2.878a5.793,5.793,0,0,1,.256-2.591c.6-2.053,2.765-4.566,5.25-6.1a34.212,34.212,0,0,1,4.672-1.746c1.465-.577,2.974-1.036,4.368-1.746,6.275-3.185,13.361-4.912,20.868-6.294,12.409-2.321,25.329-3.279,37.97-4.873,13.989-1.727,27.769-3.76,41.48-6.293a269.455,269.455,0,0,1,38.9-4.587c6.9-.248,14.2.366,21.125.712,7.249.364,14.662.862,21.842,1.688,13.479,1.574,27.353,2.475,40.992,2.955,4.6.174,10.319.307,14.64,1.65a66.484,66.484,0,0,1,6.414,2.687,31.527,31.527,0,0,0,3.858,1.65c1.3.383,3.508.479,4.486,1.189,2,1.42-1.789,3.876-2.186,5.546-.231.017-.464.057,3.7.1a97.932,97.932,0,0,1-11.363,3.625"
        transform="translate(-94.17 1224.113)"
      />
      <g className="do">
        <path
          className="dp"
          d="M1227.458,957.956a474.022,474.022,0,0,1-59.676-4.056,242.61,242.61,0,0,1-29.488-5.755c-8.017-2.112-15.477-4.433-21.844-8.5-8.111-5.2-16.662-11.686-11.9-19.783,4.347-7.329,18.846-10.514,28.768-12.74,8.809-2,18.219-3.2,27.282-4.47,6.832-.94,13.85-1.67,20.8-2.053,15.33-.833,30.7-1.834,46.058-2.352v-1.914c-1.889.106-3.713.291-5.739.467-1.557.115-5.276.479-6.555-.538-1.185-.978-.162-2.11.209-3.185.162-.479-.021-1.265.3-1.707.534-.729,3.275-1.8,4.112-2.284a32.238,32.238,0,0,1,7.669-2.949V872.3c-.348.186-.712.358-1.046.553-6.32,3.741-10.573,8.883-16.916,12.683-3.138,1.881-7.6,2.916-11.271,4.2-4.345,1.516-8.831,2.8-13.408,3.952-5.9,1.478-11.69,3.07-17.638,4.433a160.187,160.187,0,0,1-26.445,3.223c-7.761.366-15.219-.44-22.935-1-6.832-.5-13.5-1.036-20.264-1.938-5.669-.766-11.062-2.188-16.684-3.07-6.367-1.017-12.921-1.862-19.171-3.166-8.412-1.746-18.313-2.974-24.331-7.906-3.856-3.127-3.555-7.847-.3-11.224,2.485-2.591,8.434-3.07,12.247-4.335,5.53-1.842,11.036-3.743,16.8-5.221a353.779,353.779,0,0,1,39.691-8.191c9.017-1.267,18.15-2.073,27.259-2.859,3.346-.289,6.646-.307,9.945-.9,3.113-.555,5.81-1.093,9.017-1.38,7.923-.71,16.173-.268,24.191-.287a97.723,97.723,0,0,1,10.876.459c3.508.366,7.063-.037,10.6.192,9.016.577,17.939,1.017,27.026,1.115.931.012,1.85.059,2.765.114v-2.978c-2.855-.08-5.714-.135-8.575-.129-10.5.02-21.821.806-32.163-.557-4.042-.518-8.062-1.169-12.059-1.842-4.648-.786-10.528-1.555-14.316-3.645-3.021-1.689-4.646-4.03-2.253-6.332a22.416,22.416,0,0,1,8.412-5.506c3.95-1.42,7.11-3.416,11.269-4.568s7.646-3.011,12.037-3.876c7.3-1.42,15.174-1.784,22.681-2.321,5-.36,9.988-.647,14.965-.974V814.8c-.675.051-1.345.111-2.022.162-5.647.422-11.271,1.036-16.94,1.42-4.973.326-9.945-.057-14.92.25-4.9.307-9.76.786-14.685.326a57.673,57.673,0,0,0-6.042-.461,13.735,13.735,0,0,1-1.07-2.436c-.837,2.5-3.068,1.036-5.786-.288-1.952-.96-4.369-1.363-6.529-2.129-3.3-1.152-6.6-2.284-9.877-3.512-3.835-1.42-8.481-2.092-12.663-2.859a115.946,115.946,0,0,1-14.245-3.492c-7.2-2.188-16.429-5.678-20.38-10.649-7.368-9.23,23.074-9.633,29.558-9.881q22.761-.892,45.569-1.918c9.249-.4,18.52-.845,27.792-1.075,7.462-.159,14.816-.07,22.239-.014v-28.2a136.44,136.44,0,0,0-18.893-1.4c-18.264.172-36.066-.194-54.214,1.859-18.078,2.036-36.111,3.608-54.167,5.815-18.846,2.282-37.437,4.892-56.351,6.58-15.8,1.4-32.278.327-48.149.327-6.555,0-10.643-.518-16.081-2.552-4.114-1.535-7.878-3.109-11.875-5.047-23.539-11.359-53.283-8.4-79.66-8.4-25.329,0-50.681-.823-75.429,4.01a73.49,73.49,0,0,0-15.407,4.357c-4.439,1.918-4.787,3.031-7.321,6.5-4.136,5.642-10.434,12.126-17.173,15.7-11.643,6.158-31.162,5.735-43.665,2.763-1.951-.462-3.508-1.555-5.438-2.112-2.253-.651-4.089-.4-6.39-.633-4.669-.479-8.923-1.5-13.686-1.535-8.2-.037-16.453-.057-24.679.039-3.346.039-4.089-.768-6.924-1.5a70.882,70.882,0,0,0-11.991-1.422c-11.318-.651-22.5-3.031-33.952-2.935-7.853.059-15.174-.02-22.865,1.171-5.415.825-10.69.076-16.058,1.054-4.484.807-8.969,1.075-13.455,1.842-3.973.692-7.923-.113-11.9.461-8.344,1.189-16.756,1.228-25.051,2.456-4.81.71-9.574.02-14.431.25-4.949.229-9.574,1.5-14.57,1.553-11.038.135-22.1-.152-33.16-.037-5.16.057-7.831-2.016-12.247-3.991-11.107-4.951-24.028-7.137-36.066-9.844-10.667-2.417-21.983-3.09-32.695-5.45a125.7,125.7,0,0,0-26.864-2.513c-20.845.057-41.69,0-62.535,0A535.938,535.938,0,0,0,229.6,763.1c-3.183.461-6.367-.152-9.55.25-2.556.327-4.881,1.074-7.46,1.381-3.835.442-7.669.98-11.525,1.459-5.346.653-10.11,1.208-14.9,3.225-9.621,4.028-21.494,5.929-32.137,8.039a84.824,84.824,0,0,1-17.614,1.785,51.619,51.619,0,0,1-13.129-1.5c-4.951-1.169-10.366-1.476-15.014-2.839-6.9-2-13.942-3.971-21.076-5.487-7.2-1.517-14.036-1.5-21.24-2.534-5.252-.747-10.876-2.034-16.2-2.225-10.876-.438-21.234-1.351-31.848-1.085v15.851c.145-.006.285,0,.43-.01,8.551-.383,16.94-1.343,25.422-2.188a155.069,155.069,0,0,1,38.878.845c5.483.806,10.759,2.264,16.2,3.262,6.25,1.132,12.734,1.977,18.868,3.4,6.369,1.459,12.294,3.684,18.684,5.2a50.221,50.221,0,0,1,11.154,3.569c5.276,2.667,13.34,7.444,14.8,12.108.907,2.974-1.324,4.507-4.857,5.966a81.6,81.6,0,0,1-18.054,5.027,165.275,165.275,0,0,1-19.333,2.38c-6.693.383-13.363-.076-20.055.364-25.864,1.67-50.427,8.136-76.361,9.249q-2.892.126-5.774.256v1.9c6.527-.974,12.929-1.443,19.6-1.826,8.553-.538,17.01-1.518,25.585-1.957,25-1.228,50.1-1.248,75.129-.538,10.387.307,20.728.825,31.091,1.267,11.295.5,22.589.5,33.858,1.113.442.018.884.037,1.3.057,14.476.786,28.884,1.938,43.315,3.033,11.922.9,24.586,1,35.647,4.527,1.441.461,2.859.941,4.23,1.439.628-.364,1.3-.729,2-1.054,8.923-4.185,21.123-3.416,30.861-1.23,2.81.616,5.46,1.383,8.18,2.131,6.019,1.65-4,4.7-6.461,4.988a78.943,78.943,0,0,1-17.149-.076c-6.553-.692-11.828-2.763-17.429-4.759a64.129,64.129,0,0,1-5.577,3.185,30.949,30.949,0,0,1-5.647,1.9c-9.016,2.112-18.172,3.185-26.422,6.717-2.741,1.189-5.53,2.264-7.693,3.952-1.486,1.152-1.952,2.628-3.275,3.819-2.37,2.149-6.089,2.09-9.458,2.687a46.655,46.655,0,0,1-8.086.459c-4.533.02-8.831,1.036-13.316,1.248-7.436.364-14.687.518-21.774,2.245-10.11,2.493-17.126,9.421-28.119,9.861-2.671.1-5.227.577-7.923.634-2.974.039-5.948-.152-8.923-.057-2.092.076-4.044.536-6.113.671-2.022.115-4.136-.037-6.181-.02a35.2,35.2,0,0,1-11.363-1.746c-2.393-.825-4.531-2.378-6.646-3.473-5.182-2.7-9.644-6.138-15.43-8.135a71.354,71.354,0,0,0-20.194-3.608c-4.855-.268-9.666-1.093-14.57-1.265-4.879-.135-9.574-.577-14.523-.577-5.9-.037-11.643.595-17.568.577-3.692,0-7.329.043-10.958-.029v5.6c5.549-.092,11.1-.11,16.674-.1,6.832.02,13.477-.536,20.264-.634,4.926-.076,9.642.346,14.5.634,3.277.211,6.39.422,9.644.577a46.028,46.028,0,0,1,8.18,1.208,31.379,31.379,0,0,1,13.874,6.85c3.043,2.7,4.136,5.87,3.322,9.247a48.341,48.341,0,0,1-2.255,5.8c-.626,1.611-1.115,3.05-2.835,4.259-3.391,2.4-9.341,2.417-13.9,2.417-9.155,0-18.358-1.381-27.468-1.975-9.456-.634-18.753-1.709-28.258-1.689-3.907.018-7.835,0-11.746,0v3.7c7.609.082,15.186.223,22.808.46,9.226.326,18.545,1.363,27.769,1.326,6.623-.059,14.781-.94,21.031.575,2.184.518,6.066,1.324,4.625,3.011-1.138,1.363-5.53,1.92-7.436,2.456-3.136.864-6.3,1.594-9.456,2.4-3.51.862-6.369,2.4-9.691,3.529-2.695.941-5.506,1.594-8.156,2.554-3.717,1.341-7.366,2.685-11.2,3.8-3.23.921-6.461,1.459-9.668,2.264H38.51c-6.725-1.774-13.651-3.228-20.6-4.636v1.289c.332.11.692.192,1.011.317,5.438,2.129,11.132,3.876,15.9,6.7,3.741,2.227,7.6,4.664,9.621,7.83a6.59,6.59,0,0,1,1.091,3.664c.047,1.017-1.208,2.245-1.742,1.228a28.905,28.905,0,0,1-9.435,1.208,85.147,85.147,0,0,0-8.6.154c-2.61.258-5.225.37-7.843.415v64.746c38.692,2.536,77.456,4.547,116.225,6.561,46.267,2.4,92.488,5.123,138.732,7.522,46.545,2.417,93.508,2.974,140.147,4.048,43.2.978,86.375,1.363,129.621,1.439,47.708.1,95.37,1.3,143.1,1.267,88.559-.078,177.283,1.169,265.8-.29,83.982-1.38,168.29.634,252.133-3.3q11.9-.56,23.8-1.1ZM1044.11,897.662c13.641-2.282,26.074,1.785,39.367,2.438,4.973.248,10.246.516,15.035,1.823,3.9,1.073,13.406,3.856,13.152,7.5L1103.251,911c-8.621,3.127-10.97,4.529-19.149,4.758a193.7,193.7,0,0,1-23.4-.4c-6.273-.632-15.591-1.5-20.866-4.279-2.953-1.572-8.946-4.969-8.459-7.906.628-3.932,8.551-4.816,12.734-5.507m6.555-36.263c-1.117.805-4,1.324-5.438,1.67-6.508,1.535-13.664,1.5-20.473,1.381-2.161-.057-4.067-.671-6.228-.671-.6,0-1.463.152-2.043.115-1.907-.135-3.416-1.152-4.975-1.9,1.6,1.287-.649.307-3.3-1.381-1.952-1.228-2.556-1.9-.256-3.185,2.835-1.555,7.088-1.65,10.573-1.535,6.764.231,13.526,1.631,20.311,1.881a82.322,82.322,0,0,1,9.76.575c.813.133,3.115.422,3.416.958.186.327-.976,1.842-1.347,2.092M1022.5,902.247c-3.647,2.245-8.805,3.743-13.105,5.278-12.92,4.586-27.792,6.216-41.9,8.1-24.306,3.184-49.357,4.259-73.966,5.755a455.391,455.391,0,0,1-86.979-3.318,239.415,239.415,0,0,1-29.513-5.776c-8.015-2.071-15.475-4.413-21.821-8.481-8.133-5.2-16.684-11.684-11.9-19.781,4.345-7.349,18.823-10.514,28.745-12.761,8.807-1.975,18.242-3.183,27.282-4.451,6.856-.96,13.874-1.67,20.821-2.053,15.87-.882,31.813-1.918,47.73-2.417,16.453-.518,33.3-.5,49.707.479,5.02.287,9.992.768,14.988,1.093,5.857.366,11.852.115,17.706.135,9.11.02,18.1-1.017,27.235-.557,6.926.309,14.106.577,20.751,2.036,4.9,1.074,8.621,2.763,12.922,4.566a46.945,46.945,0,0,0,5.972,2.284,19.93,19.93,0,0,1,4.787,1.648c1.789,1.036,4.02,3.013,4.718,4.568.72,1.572.812,3.242,1.7,4.816a8.18,8.18,0,0,1,1.115,3.645c.164,1.727,1.255,3.129.745,4.892a26.9,26.9,0,0,1-1.488,3.665,17.055,17.055,0,0,1-2.765,3.608c2.579-.172-1.789,2-3.487,3.031m46.267-68.766c-.952.422-1.975,1.842-3.322,3.78-1.418,2.073-3.369,2.591-6.322,1.67-2.951-.9-4.693-2.341-7.086-3.647-3.092-1.688-6.738-1.535-10.364-2.532-4.672-1.265-9.365-3.817-14.478-4.143-7.39-.442-14.455-1.823-21.913-1.805-6.484.039-12.99-.017-19.474.02-4.183.039-8.18-.671-12.362-.614-4.37.039-8.622-.518-13.013-.594-7.622-.155-17.685-1.248-22.959-5.469-2.045-1.631-1.441-2.761-.837-4.681.767-2.456,2.09-3.7,5.065-5.2,4.323-2.188,8.925-3.089,14.222-3.625,6.322-.614,12.479-1.383,18.846-1.65,6.158-.289,12.13-.634,18.313-.614,5.577,0,10.944-.02,16.474-.481,3.092-.248,6.089-.037,9.179-.1,3.487-.057,6.926-.518,10.387-.634,5.3-.209,10.573-.69,15.825-1.208,11.177-1.093,22.519-3.127,33.858-3.09,8.622.039,15.036,1.594,19.265,6.889,2.067,2.552,2.067,5.3-.419,7.732-1.208,1.23-4.159,2.208-6,2.994-1.766.768-3.51,1.017-5.346,1.67a49.365,49.365,0,0,1-5.227,1.823,61.418,61.418,0,0,0-6.856,2.014c-2.951,1.056-6.531,1.535-7.274,4.222a7.969,7.969,0,0,0,1.813,7.272m-125.507-1.056c11.013-.518,22.028-.766,33.045-1.246,9.713-.422,18.821.632,28.3,1.553,7.18.712,14.873.366,21.844,1.5a92.192,92.192,0,0,1,10.061,2.282c4.067,1.132,11.224,2.036,13.5,4.376,1.742,1.783-4.462,5.026-6.948,5.966-2.464.96-4.787,1.881-7.227,2.878-1.65.71-3.557,1.574-2.325.729a45.835,45.835,0,0,1-10.968,1.208c-3.416-.02-6.832,0-10.272,0a90.6,90.6,0,0,0-14.546.749c-6.506,1-13.013,1.611-19.265,3.07-1.672.383-3.391,1.208-4.949,1.535-2.09.422-4.6.614-6.877.862-12.294,1.363-24.7,1.076-37.3,1.076H917.347c-5.6,0-10.921.538-16.5.633-11.783.209-23.68-.039-35.485-.039h-38.2c-10.992,0-22.54.557-32.65-2.169-4.554-1.228-9.713-3.262-8.086-6.177.835-1.478,2.9-2.783,4.808-3.915,3.254-1.918,6.207-3.954,9.621-5.794,2.743-1.478,4.765-2.974,8.273-3.934a74.1,74.1,0,0,1,14.036-2.11c18.915-1.613,38.831-2,58-1.977,20.659.02,41.5-.076,62.093-1.056M1098.7,849.253a3.306,3.306,0,0,1,2.229,2.071c-2.393,1.132-5.833,1.132-8.6,1.422q-6.726.66-13.477,1.208c-7.135.575-14.408,1.4-21.564,1.361-3.115-.018-5.741.289-8.807.557-1.58.115-5.3.5-6.554-.518-1.208-.978-.162-2.11.209-3.2.162-.479-.047-1.265.28-1.688.557-.749,3.277-1.823,4.112-2.3,5.09-2.861,11.341-3.878,17.638-4.836,7.18-1.056,14.107-.5,21.379-.174,4.625.211,8.924.845,12.712,2.687,1.557.769,6.553,3.281.442,3.416m20.217-42.175c5.692-.9,10.874.69,16.427.941a32.213,32.213,0,0,1,6.275.71c1.65.422,5.624,1.5,5.506,2.917l-3.508.594c-3.6,1.228-4.578,1.783-7.994,1.86a82.858,82.858,0,0,1-9.783-.153c-2.626-.25-6.508-.575-8.715-1.67-1.23-.614-3.741-1.918-3.531-3.05.256-1.535,3.578-1.879,5.323-2.149M1110.5,818.61c14.267-1.15,28.047-1.265,41.735,2.36,3.23.864,7.063,2.571,8.5,4.875,1.161,1.879.327,2.935-1.719,4.3-3.113,2.071-5.972,4.777-5.739,7.886.115,1.457,1.161,2.436,1.7,3.7.325.825,2.092,3.32,1.836,3.876-12.456,1.383-25.237.135-37.622-1.034-7.622-.749-15.1-1.729-22.493-3.185a37.16,37.16,0,0,1-9.644-3.185c-2.186-1.056-4.347-2.13-6.623-3.09-2.579-1.056-5.53-1.65-8.064-2.7-1.465-.577-1.672-.634-1.9-1.824-.372-1.783.976-3.107,2.648-4.355,9.343-6.965,24.8-6.582,37.392-7.618M788.168,777.051c7.042-4.777,17.73-7.81,27.141-9.574a249.224,249.224,0,0,1,32.7-4.261,283.023,283.023,0,0,1,35.857.864c6.948.555,13.848,1.439,20.7,2.36,5.229.71,10.2,1.975,15.36,2.839a109.882,109.882,0,0,0,13.989,1.093c7.483.192,15.2,1.515,22.519,2.456a75.029,75.029,0,0,1,9.388,1.823c1.766.442,4.136,1.881,6.064,1.8l5.462,3.7c1.813-.209,3.625-.383,5.415-.69a86.49,86.49,0,0,0,9.063-2.321c12.781-3.627,26.375-5.526,39.875-7.349,18.313-2.495,36.879-3.8,55.378-5.315,7.11-.575,14.222-1.056,21.355-1.363,5.948-.248,11.711-.96,17.73-.479,15.012,1.228,30.162,1.8,45.245,2.3,11.386.385,22.006,2.149,32.951,4.087,2.581.461,5.6.538,7.972,1.383,1.183.4,3.438,1.056,4.018,1.957-.186.133-.348.287-3.184.459a45.252,45.252,0,0,1-11.386,1.208c-3.88.02-7.9-.729-11.688-.518-11.271.71-22.634.768-33.905,1.574-5.461.4-10.991.442-16.43.921-4.9.422-9.945.921-14.894,1.076-4.114.113-8.179.632-12.317.594-4.926-.02-9.433.248-14.314.594-3.348.248-6.832.383-10.131.749-1.349.133-5.137.364-6.019,1.208-.7.634-.117,2.724-.117,3.51,0,1.306.209,2.438-1.115,3.512-2.464,2.053-7.646,2.763-11.177,3.3-10.18,1.592-20.567,2.763-30.884,3.819-7.738.767-15.5.882-23.144,1.955-8.135,1.132-16.361,1.709-24.586,2.436-6.623.6-13.688.155-20.078,1.21-3.416.575-8.621.575-11.433-1.056-4.763-2.743-1.557-5.794,1.512-8.481,4.507-3.971,11.036-6.869,17.822-9.249l-1.533-1.036a44.009,44.009,0,0,0-5.02.845,99.005,99.005,0,0,0-28.954,12.2c-2.464,1.572-5.02,2.955-7.575,4.49-2.742,1.651-5.739,2.034-9.11,2.8-10.387,2.358-21.819,3.146-32.695,3.817-17.591,1.056-35.344-.825-52.82-1.9-7.321-.442-14.408-1.67-21.658-2.532-6.158-.729-12.292-1.267-18.2-2.8-6.343-1.67-17.568-4.451-19.566-9.689-1.394-3.608,2.88-7.962,6.414-10.342m-15.71,38.2c16.5-.71,32.906-.268,49.359-.882,15.778-.594,31.789-.307,47.615-.307,9.5,0,18.729-.211,28.047.614,6.136.538,11.085,1.42,16.733,2.417a60.513,60.513,0,0,1,10.131,3.05,29.838,29.838,0,0,1,3.277,1.459,9.7,9.7,0,0,1,2.161,1.248,19.428,19.428,0,0,1,2.3,2.744,15.044,15.044,0,0,0,3.719,1.862c-18.127,2.225-37.9,3.011-56.793,3.608-9.574.287-18.753.747-28.4.631-5.532-.057-10.9-.614-16.429-.671-6.181-.076-12.317.135-18.5-.1-21.774-.845-45.174-.268-65.344-4.087-5.368-1.017-7.018-3.32-5.485-5.45,3.324-4.642,17.01-5.679,27.607-6.14m-301.929-8.614c.487-1.94,3.021-2.994,4.763-4.472,4.275-3.645,11.316-6.293,17.847-7.771,3.485-.786,6.111-2.341,9.527-3.223,3.741-1,7.855-1.535,11.734-2.168,8.088-1.285,15.988-3.338,24.122-4.433a216.472,216.472,0,0,1,39.435-1.15,225.256,225.256,0,0,0,23.027.5c8.553-.4,16.942-1.363,25.4-2.208a156.164,156.164,0,0,1,38.9.825c5.485.825,10.759,2.284,16.2,3.262,6.228,1.132,12.736,2,18.846,3.4,6.39,1.478,12.294,3.723,18.708,5.2a51.458,51.458,0,0,1,11.154,3.569c5.274,2.687,13.338,7.464,14.779,12.128.929,2.974-1.326,4.509-4.834,5.966a81.6,81.6,0,0,1-18.056,5.027,169.484,169.484,0,0,1-19.333,2.36c-6.693.383-13.385-.057-20.055.366-25.888,1.688-50.427,8.135-76.383,9.267-12.99.575-25.888,1.248-38.97.9a224.471,224.471,0,0,1-27.167-2.82c-8.852-1.287-17.544-4.011-26.142-5.988a136.018,136.018,0,0,1-18.451-5.833c-5.088-.1-16.242-2.282-22.47-8.174-1.465-1.419-3.092-2.648-2.579-4.527m3.137,25.575c18.52,1.515,37.087,2.822,55.4,5.315,13.479,1.824,27.1,3.723,39.877,7.35A80.9,80.9,0,0,0,578,847.2c1.789.307,3.6.5,5.413.71l5.461-3.7c1.907.076,4.3-1.363,6.042-1.822a76.128,76.128,0,0,1,9.411-1.823c7.319-.921,15.035-2.245,22.517-2.456a107.039,107.039,0,0,0,13.989-1.093c5.158-.845,10.133-2.131,15.36-2.841,6.856-.921,13.758-1.8,20.682-2.341a276.306,276.306,0,0,1,35.88-.862,245.577,245.577,0,0,1,32.695,4.24c9.39,1.766,20.1,4.816,27.143,9.576,3.531,2.4,7.785,6.735,6.414,10.36-2,5.219-13.223,8-19.589,9.672-5.88,1.533-12.014,2.071-18.2,2.82-7.225.864-14.314,2.073-21.656,2.513-17.452,1.075-35.206,2.994-52.8,1.9-10.876-.653-22.309-1.459-32.7-3.819-3.369-.767-6.367-1.152-9.132-2.8-2.532-1.535-5.09-2.9-7.552-4.492a99.451,99.451,0,0,0-28.979-12.2,42.692,42.692,0,0,0-5-.825l-1.533,1.036c6.785,2.378,13.315,5.276,17.824,9.247,3.068,2.687,6.275,5.718,1.51,8.481-2.81,1.631-8.017,1.631-11.455,1.056-6.369-1.056-13.455-.633-20.055-1.228-8.227-.729-16.476-1.285-24.609-2.436-7.646-1.056-15.407-1.152-23.123-1.957-10.317-1.036-20.727-2.225-30.882-3.8-3.531-.536-8.715-1.248-11.2-3.3-1.3-1.073-1.117-2.225-1.093-3.529,0-.786.557-2.878-.115-3.512-.884-.843-4.672-1.054-6.019-1.189-3.322-.364-6.785-.518-10.131-.749-4.9-.364-9.39-.632-14.316-.594-4.136.02-8.2-.479-12.339-.594-4.928-.154-9.969-.653-14.873-1.093-5.438-.481-10.968-.518-16.43-.9-11.269-.806-22.632-.862-33.927-1.553-3.788-.25-7.808.5-11.666.479a43.616,43.616,0,0,1-11.386-1.208c-2.835-.154-3-.307-3.183-.461.581-.882,2.835-1.553,4.02-1.957,2.37-.825,5.391-.9,7.97-1.381,10.945-1.938,21.564-3.684,32.951-4.067,15.082-.518,30.233-1.1,45.245-2.3,6.019-.5,11.783.211,17.732.481,7.133.288,14.243.786,21.332,1.341m47.452,85.251c-1.789-1-3.51-1.92-5.344-2.878-1.813-.941-6.392-4.163-5.09-5.968,1.672-2.341,6.924-3.222,9.945-4.374a53.041,53.041,0,0,1,7.413-2.284c5.135-1.113,10.806-.786,16.1-1.5,6.971-.921,13.686-1.977,20.843-1.535,8.135.479,16.244.71,24.378,1.248,15.151.978,30.511,1.074,45.732,1.054a369.276,369.276,0,0,1,42.757,1.957A42.437,42.437,0,0,1,688.2,905.3c2.6.958,4.089,2.456,6.111,3.952,2.511,1.842,4.7,3.856,7.088,5.794a11.248,11.248,0,0,1,3.531,3.9c1.208,2.937-2.6,4.971-5.948,6.179-7.436,2.724-15.966,2.186-24.075,2.186H646.765c-8.715,0-17.476.231-26.166.02-4.114-.1-8.017-.634-12.155-.634-2.951.02-5.878,0-8.831,0-9.271,0-18.428.289-27.489-1.054a50.54,50.54,0,0,1-5.066-.884c-1.138-.325-2.417-1.132-3.649-1.535-4.625-1.439-9.411-2.053-14.2-3.051a48.473,48.473,0,0,0-10.735-.749c-2.511,0-5.043-.037-7.575,0a26.294,26.294,0,0,1-8.064-1.208c.907.825-.487-.037-1.719-.747m-58.629-3.876c3.811-1.842,8.109-2.5,12.734-2.687,7.274-.346,14.2-.884,21.379.192,6.3.921,12.55,1.938,17.638,4.816.837.479,3.555,1.555,4.091,2.282.325.422.139,1.21.3,1.689.372,1.093,1.418,2.225.209,3.205-1.253,1.036-4.973.651-6.553.518-3.068-.25-5.692-.557-8.807-.538-7.157.02-14.431-.786-21.564-1.363-4.509-.383-8.993-.767-13.479-1.228-2.765-.287-6.2-.287-8.6-1.4a3.193,3.193,0,0,1,2.231-2.092c-6.111-.113-1.138-2.648.418-3.395m-60.743-15.716c-2.045-1.341-2.882-2.417-1.721-4.278,1.418-2.3,5.276-4.03,8.506-4.893,13.686-3.608,27.466-3.492,41.735-2.341,12.595,1.017,28.025.634,37.366,7.6,1.674,1.246,3.045,2.571,2.673,4.392-.233,1.171-.465,1.21-1.907,1.8-2.532,1.036-5.483,1.65-8.062,2.7-2.278.94-4.439,2.016-6.623,3.07a35.979,35.979,0,0,1-9.644,3.185,222.4,222.4,0,0,1-22.5,3.185c-12.384,1.191-25.19,2.437-37.62,1.056-.256-.577,1.51-3.07,1.834-3.9.536-1.267,1.58-2.245,1.7-3.684.233-3.127-2.65-5.813-5.739-7.906m-1.326,12.452c-3.811,2.112-9.666,2.878-14.314,3.667-4,.671-8.017,1.3-12.061,1.822-10.34,1.363-21.658.594-32.161.575-11.2-.02-22.356.864-33.534.634-8.621-.172-17.264-.978-25.886-1.3-4.323-.192-8.459-.577-12.8-.557-3.068.02-6.136.076-9.2.039-6.576-.1-13.152-.96-19.636-1.689a180.16,180.16,0,0,1-22.726-4.1,29.093,29.093,0,0,1-6.042-1.825c-1.347-.671-1.627-1.247-1.744-2.129a3.008,3.008,0,0,1-1.952-1.727,6.965,6.965,0,0,1-.813-3.281c0-2.935,2.464-4.892,5.276-6.965a39.585,39.585,0,0,1,16.707-6.523c10.086-1.707,20.379-2.743,30.7-3.492,5.113-.364,10.225-.958,15.36-1.093a107.715,107.715,0,0,1,14.292.882c9.574,1.017,19.31,1.324,28.907,2.341,9.783,1,19.613,1.42,29.49,2.129,7.5.538,15.383.921,22.658,2.323,4.413.862,7.9,2.724,12.059,3.876s7.321,3.166,11.271,4.566a22.655,22.655,0,0,1,8.412,5.526c2.393,2.284.767,4.644-2.255,6.312m13.223-30.948c-.115-1.4,3.858-2.493,5.485-2.916a32.661,32.661,0,0,1,6.3-.71c5.555-.25,10.737-1.824,16.429-.941,1.742.268,5.066.614,5.323,2.149.207,1.132-2.3,2.456-3.533,3.05-2.208,1.093-6.089,1.439-8.713,1.67a79.246,79.246,0,0,1-9.783.153c-3.416-.076-4.392-.614-7.994-1.842Zm80.171,14.564c-.743-2.667-4.345-3.148-7.3-4.222a60.949,60.949,0,0,0-6.832-2,49.4,49.4,0,0,1-5.229-1.822c-1.836-.671-3.6-.9-5.344-1.668-1.836-.806-4.787-1.785-6.019-2.994-2.464-2.456-2.464-5.2-.395-7.751,4.23-5.3,10.643-6.85,19.241-6.889,11.363-.02,22.7,2.014,33.88,3.09,5.252.518,10.526,1,15.8,1.208,3.487.135,6.926.575,10.411.634,3.091.076,6.066-.155,9.179.1,5.53.46,10.9.479,16.453.479,6.2-.019,12.176.346,18.334.614,6.369.27,12.527,1.036,18.823,1.67,5.323.518,9.924,1.439,14.245,3.625,2.974,1.5,4.3,2.726,5.067,5.182.6,1.918,1.185,3.051-.837,4.681-5.276,4.222-15.336,5.334-22.959,5.469-4.392.076-8.645.651-13.037.594-4.159-.039-8.156.651-12.339.633-6.508-.059-12.99,0-19.474-.02-7.482-.039-14.523,1.361-21.913,1.8-5.113.307-9.806,2.859-14.478,4.126-3.625,1-7.274.862-10.364,2.532-2.417,1.324-4.138,2.763-7.088,3.664s-4.9.383-6.343-1.67c-1.347-1.938-2.346-3.375-3.3-3.78a8,8,0,0,0,1.813-7.29m197.244,4.72c-3.485.229-6.948.017-10.434.1-3.113.076-6.134.614-9.247.671-5.461.115-10.62-.326-16.011-.633-10.667-.594-21.8-1.361-32.022-3.625a7.674,7.674,0,0,0,2.09-1.842,18.445,18.445,0,0,1,1.3-2.706,5.3,5.3,0,0,1,1.208-1.285,17.479,17.479,0,0,1,1.836-1.459,24.34,24.34,0,0,1,5.716-3.031,61.81,61.81,0,0,1,9.435-2.437c5.252-.825,10.458-.6,15.825-.6,8.923,0,17.939-.287,26.838.307,9.273.595,18.522.155,27.818.884,5.972.46,13.686,1.476,15.569,6.121.882,2.129-.07,4.431-3.092,5.45-11.363,3.817-24.562,3.262-36.832,4.087m-370.319-71.7a455.508,455.508,0,0,1-86.981-3.32,239.353,239.353,0,0,1-29.511-5.755c-8.017-2.092-15.477-4.413-21.844-8.483-8.109-5.2-16.66-11.7-11.875-19.8,4.323-7.329,18.823-10.514,28.747-12.739,8.807-1.977,18.219-3.205,27.28-4.472,6.832-.939,13.874-1.668,20.821-2.051,15.872-.864,31.813-1.92,47.732-2.419,16.451-.518,33.3-.5,49.7.481,5.02.307,9.992.786,14.988,1.093,5.833.364,11.852.115,17.708.153,9.108.02,18.078-1.017,27.235-.575,6.924.327,14.1.594,20.751,2.034,4.9,1.075,8.621,2.783,12.919,4.586a50.239,50.239,0,0,0,5.974,2.284,19.477,19.477,0,0,1,4.787,1.65c1.789,1.017,4.018,2.994,4.716,4.546.72,1.574.813,3.262,1.7,4.816a7.925,7.925,0,0,1,1.091,3.647c.186,1.746,1.277,3.146.767,4.91a31.335,31.335,0,0,1-1.486,3.647,16.63,16.63,0,0,1-2.767,3.608c2.558-.174-1.789,1.994-3.485,3.031-3.649,2.264-8.807,3.76-13.107,5.276-12.919,4.585-27.792,6.236-41.9,8.1-24.308,3.205-49.357,4.259-73.966,5.757m-64.648,23.888c3.88-1.248,8.457-1.476,12.618-1.938,5.739-.634,11.34-1.324,17.149-1.535,14.222-.5,28.444-1.248,42.665-1.343,9.04-.057,17.963-.229,27.026,0,9.271.192,18.52.634,27.792,1.056,15.174.69,30.4,1.3,45.569,1.9,6.459.25,36.924.653,29.558,9.9-3.95,4.969-13.176,8.442-20.379,10.647a121.9,121.9,0,0,1-14.245,3.492c-4.183.749-8.831,1.42-12.663,2.859-3.277,1.228-6.578,2.341-9.9,3.512-2.137.749-4.554,1.171-6.508,2.11-2.718,1.324-4.949,2.783-5.786.307a15.2,15.2,0,0,1-1.068,2.438,53.25,53.25,0,0,0-6.042.459c-4.949.46-9.783-.039-14.687-.346-4.973-.307-9.969.078-14.918-.248-5.671-.366-11.295-.98-16.94-1.4-16.361-1.246-32.511-2.744-48.545-5.315-6.576-1.034-10.782-3.664-15.755-6.484-3.346-1.918-7.436-3.013-10.829-4.836a70.241,70.241,0,0,1-8.97-5.833c-1.255-.921-3.16-2.245-3.207-3.588-.115-2.82,4.9-4.816,8.064-5.813m-71.666,20.012c2.765-2.9,7.366-3.011,12.014-2.992,4.949.02,9.875-.02,14.826,0,4.578.037,8.97-.557,13.5-.634,9.134-.155,18.614.845,27.654,1.822,2.022.231,16.126,1.017,15.825,3.645-.162,1.363-5.532,2.092-6.856,2.419-5.46,1.324-11.083,2.264-16.754,3.07-13.827,1.975-29.234,2.839-43.223,1.189,2.255-1.8-23.053-2.169-16.987-8.52m-91.79,31.584a16.12,16.12,0,0,1,3.322-3.492,37.864,37.864,0,0,0,3.322-2.323A16.143,16.143,0,0,0,101.7,892.6c.929-1.881,3.252-3.416,5.088-5.008,5.066-4.413,11.9-6.621,19.8-7.483,13.524-1.459,27.515-.729,41.177-.729,8.2,0,16.081.673,24.331.614a21.662,21.662,0,0,1,4.228.479c1.535.231,2.859.02,4.206.4,2.44.692,4.114,2.245.884,3.379,2.137,1.631,4.926,3.146,4.462,5.583-.722,3.8-8.715,5.065-13.131,5.487-5.321.5-10.6,1.056-15.917,1.5a50.412,50.412,0,0,0-8.715,1.21c-1.416.383-2.579,1-4.02,1.324-1.811.4-3.764.479-5.6.786-2.579.422-5.088,1.171-7.644,1.707-4.114.845-8.575.96-12.851,1.363-4.138.364-8.111.461-12.294.442-3.623-.02-6.645.307-10.155.614-6.9.614-13.686.5-20.681.594-1.326.02-2.139.268-2.7-.557-.395-.575.162-1.381.465-1.86M157.42,961.73c-8.2.71-16.244,1.42-24.517,1.361-6.668-.057-13.385.326-20.008.749a206.52,206.52,0,0,1-21.541.422c-2.859-.135-5.669-.557-8.528-.594a49.851,49.851,0,0,1-6.089-.115c-4.392-.594-9.085-1.631-13.571-1.689-2.417,0-6.414.422-7.065-1.209a11.408,11.408,0,0,1,1.93-3.473c1-.958,2.695-1.42,3.835-2.264,2.02-1.516,4.321-3.473,5.3-5.487.767-1.631.952-3.2,1.952-4.681a10.663,10.663,0,0,1,3.9-3.34c4.183-2.245,10.921-1.535,15.684-.747,2.65.44,5.276.634,7.925,1.228,2.485.536,5.088.536,7.667,1.169,2.581.653,5.205,1.095,7.622,1.92,2.835.939,5.9,1.15,8.925,1.668,2.462.442,4.973.594,7.481,1.287a41.237,41.237,0,0,0,4.787.575,15.385,15.385,0,0,1,1.512.5c1.162.211,2.276-.057,3.416.1,2.835.346,5.229.941,7.9,1.383,3.416.575,6.926,1.228,10.458,1.8,3.882.634,7.785,1.381,11.619,2.149,1.766.366,4.672.575,5.972,1.515,6.134,4.374-14.361,5.585-16.568,5.776m155.857-20.78c-.28,1.3-1.371,1.842-2.626,2.859-5.067,4.163-11.944,5.565-19.333,6.869-12.2,2.149-25.7,1.727-38.182,2.245-9.365.383-18.567.442-27.955.479-7.11.039-14.222-.518-21.355-.614-6.066-.057-12.223-.479-18.289-.767-6.785-.327-13.663-.518-20.4-1.208-7.366-.729-14.453-1.69-21.656-2.917-5.579-.941-11.085-1.555-16.476-3.013-9.969-2.7-20.774-3.682-30.814-6.177-9.945-2.515-20.868-4.146-30.186-7.636a91.272,91.272,0,0,0-9.969-2.571,98.443,98.443,0,0,1-11.365-3.608c4.161-.057,3.928-.1,3.7-.115-.395-1.651-4.206-4.106-2.208-5.546,1-.71,3.207-.806,4.486-1.189a27.9,27.9,0,0,0,3.88-1.65c2.045-.862,4.253-2.014,6.414-2.687,4.323-1.324,10.039-1.476,14.64-1.65,13.641-.479,27.515-1.38,40.992-2.953,7.157-.825,14.57-1.306,21.844-1.67,6.924-.366,14.222-.98,21.123-.729a272.639,272.639,0,0,1,38.9,4.586c13.686,2.532,27.489,4.566,41.48,6.312,12.64,1.574,25.561,2.552,37.97,4.855,7.5,1.381,14.593,3.107,20.866,6.312,1.373.69,2.906,1.152,4.37,1.727a31.879,31.879,0,0,1,4.67,1.766c2.487,1.515,4.648,4.028,5.252,6.1a5.469,5.469,0,0,1,.233,2.591m210.14,11.072c-6.04,4.932-15.917,6.14-24.353,7.9-6.252,1.287-12.781,2.132-19.148,3.148-5.624.9-11.015,2.3-16.686,3.07-6.762.921-13.455,1.457-20.286,1.938-7.693.555-15.153,1.361-22.914,1a156.147,156.147,0,0,1-26.445-3.225c-5.948-1.361-11.734-2.955-17.638-4.431-4.578-1.152-9.061-2.436-13.406-3.952-3.672-1.287-8.158-2.323-11.271-4.2-6.345-3.8-10.6-8.942-16.918-12.665-3-1.783-6.691-2.992-9.456-4.816a54.973,54.973,0,0,0-12.317-5.428c-2.951-.98-4.879-2.4-7.3-3.858a64.926,64.926,0,0,0-6.322-3.107,6.5,6.5,0,0,1,3.672-2.169c3.788-1.152,8.3-.479,12.362-.575,2.929-.078,5.624-.673,8.6-.653,4.23.076,8.273-.577,12.48-.614,9.085-.1,18.009-.538,27.026-1.132,3.531-.211,7.086.192,10.6-.191a98.161,98.161,0,0,1,10.874-.461c8.017.02,16.244-.42,24.191.289,3.207.287,5.9.823,9.018,1.4,3.275.594,6.6.594,9.945.882,9.108.786,18.24,1.631,27.257,2.859a353.24,353.24,0,0,1,39.691,8.213c5.763,1.476,11.271,3.377,16.8,5.2,3.811,1.287,9.759,1.746,12.247,4.337,3.23,3.377,3.555,8.1-.3,11.244M805.55,971.534c-6.343,4.067-13.8,6.408-21.821,8.481a235.768,235.768,0,0,1-29.511,5.794,455.26,455.26,0,0,1-86.981,3.3c-24.609-1.478-49.658-2.552-73.966-5.757-14.1-1.862-29-3.51-41.9-8.078-4.322-1.535-9.48-3.051-13.129-5.3-1.672-1.036-6.042-3.185-3.461-3.031a17.035,17.035,0,0,1-2.765-3.608,25.772,25.772,0,0,1-1.488-3.664c-.512-1.766.581-3.146.743-4.873a7.831,7.831,0,0,1,1.115-3.647c.884-1.574.976-3.262,1.674-4.836a12.915,12.915,0,0,1,4.74-4.546,18.1,18.1,0,0,1,4.787-1.65,45.237,45.237,0,0,0,5.95-2.3,71.222,71.222,0,0,1,12.943-4.548c6.646-1.459,13.827-1.727,20.751-2.053,9.134-.442,18.127.614,27.235.557,5.857-.02,11.852.248,17.708-.135,5-.307,9.969-.786,14.965-1.093,16.43-.98,33.275-1,49.728-.481,15.919.518,31.836,1.574,47.732,2.438,6.948.383,13.966,1.073,20.8,2.034,9.061,1.265,18.5,2.493,27.28,4.451,9.947,2.245,24.423,5.411,28.768,12.759,4.787,8.1-3.764,14.584-11.9,19.783m280.087-31.545a87.471,87.471,0,0,0-9.969,2.571c-9.319,3.492-20.24,5.123-30.188,7.618-10.037,2.513-20.843,3.49-30.812,6.2-5.391,1.459-10.9,2.073-16.477,3.013-7.227,1.228-14.292,2.167-21.658,2.916-6.738.69-13.618.884-20.4,1.208-6.066.287-12.223.692-18.311.768-7.112.076-14.222.634-21.334.614-9.388-.039-18.612-.115-27.955-.479-12.48-.518-25.98-.1-38.18-2.264-7.413-1.306-14.267-2.706-19.333-6.85-1.255-1.036-2.348-1.555-2.65-2.878a5.793,5.793,0,0,1,.256-2.591c.6-2.053,2.765-4.566,5.25-6.1a34.212,34.212,0,0,1,4.672-1.746c1.465-.577,2.974-1.036,4.368-1.746,6.275-3.185,13.361-4.912,20.868-6.294,12.409-2.321,25.329-3.279,37.97-4.873,13.989-1.727,27.769-3.76,41.48-6.293a269.455,269.455,0,0,1,38.9-4.587c6.9-.248,14.2.366,21.125.712,7.249.364,14.662.862,21.842,1.688,13.479,1.574,27.353,2.475,40.992,2.955,4.6.174,10.319.307,14.64,1.65a66.484,66.484,0,0,1,6.414,2.687,31.527,31.527,0,0,0,3.858,1.65c1.3.383,3.508.479,4.486,1.189,2,1.42-1.789,3.876-2.186,5.546-.231.017-.464.057,3.7.1a97.932,97.932,0,0,1-11.363,3.625"
          transform="translate(-659.17 1035.113)"
        />
      </g>
      <g transform="translate(800.574 1470.7)">
        <g className="dq">
          <g transform="translate(0 191.757)">
            <g className="dr">
              <rect
                className="ds"
                width={177.543}
                height={573.543}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g transform="translate(0 191.757)">
            <g className="dt">
              <rect
                className="du"
                width={177.543}
                height={573.543}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g className="dq">
            <g className="u" transform="translate(84.715 451.135)">
              <g className="dv">
                <g transform="translate(-0.001)">
                  <g className="dw">
                    <rect
                      className="dx"
                      width={72.061}
                      height={299.444}
                      transform="translate(-11.894)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dy" transform="translate(107.343 653.438)">
              <g className="dz">
                <g transform="translate(0 0)">
                  <g className="ea">
                    <rect
                      className="eb"
                      width={29.937}
                      height={36.788}
                      transform="translate(-3.712 -1.83)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ec" transform="translate(110.847 685.535)">
              <g className="ed">
                <path
                  className="ee"
                  d="M82.655,416.615c-6.75-2.1-6.954-3.58-8.028-3.58s-8.9.717-7.721,2.354a10.6,10.6,0,0,0,8.795,4.4c3.376,0,9.291-2.445,6.954-3.17"
                  transform="translate(-66.785 -413.035)"
                />
              </g>
            </g>
            <g className="ef" transform="translate(121.836 638.194)">
              <g className="eg">
                <g transform="translate(0.001 -0.001)">
                  <g className="eh">
                    <rect
                      className="ei"
                      width={23.778}
                      height={20.403}
                      transform="translate(-1.001 -0.981)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(114.692 690.3)">
              <g className="ej">
                <g transform="translate(0 0)">
                  <g className="ek">
                    <rect
                      className="el"
                      width={20.556}
                      height={39.426}
                      transform="translate(-0.3 -1.543)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="em" transform="translate(72.24 531.194)">
              <g className="en">
                <g transform="translate(-0.001 0)">
                  <g className="eo">
                    <rect
                      className="ep"
                      width={97.769}
                      height={127.223}
                      transform="translate(-5.964 -3.563)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(64.845 649.13)">
              <g className="eq">
                <g transform="translate(0.001 0)">
                  <g className="er">
                    <rect
                      className="es"
                      width={56.451}
                      height={114.541}
                      transform="translate(-5.933 -9.003)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="et" transform="translate(91.508 436.839)">
              <g className="eu">
                <g transform="translate(0 0)">
                  <g className="ev">
                    <rect
                      className="ew"
                      width={71.588}
                      height={112.496}
                      transform="translate(-2.325 -5.341)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ex" transform="translate(4.39 291.686)">
              <g className="ey">
                <g transform="translate(0 -0.001)">
                  <g className="ez">
                    <rect
                      className="fa"
                      width={26.999}
                      height={36.302}
                      transform="translate(-0.601 -1.931)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ex" transform="translate(32.263 290.496)">
              <g className="fb">
                <g transform="translate(0 0)">
                  <g className="fc">
                    <rect
                      className="fd"
                      width={25.907}
                      height={15.032}
                      transform="translate(-2.838 -5.957)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ex" transform="translate(122.537 437.236)">
              <g className="fe">
                <g transform="translate(0 -0.001)">
                  <g className="ff">
                    <rect
                      className="fg"
                      width={23.625}
                      height={19.636}
                      transform="translate(-3.696 -1.442)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(17.902 309.083)">
              <g className="fh">
                <g transform="translate(0 0)">
                  <g className="fi">
                    <rect
                      className="fj"
                      width={45.1}
                      height={62.895}
                      transform="translate(0 0)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ex" transform="translate(98.727 559.735)">
              <g className="fk">
                <g transform="translate(0 0)">
                  <g className="fl">
                    <rect
                      className="fm"
                      width={24.825}
                      height={44.825}
                      transform="translate(-9.006 -3.98)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ex" transform="translate(105.314 581.983)">
              <g className="fn">
                <g transform="translate(0 0)">
                  <g className="fo">
                    <rect
                      className="fp"
                      width={12.579}
                      height={14.556}
                      transform="translate(-1.2 -2.297)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(128.672)">
            <g className="fq">
              <rect
                className="fr"
                width={201.254}
                height={755.473}
                transform="translate(0 -0.002)"
              />
            </g>
          </g>
          <g transform="translate(130.247 211.598)">
            <g className="fs">
              <rect
                className="ft"
                width={530.78}
                height={474.468}
                transform="translate(-263.875 328.726) rotate(-51.245)"
              />
            </g>
          </g>
          <g transform="translate(155.525)">
            <g className="fu">
              <rect
                className="fv"
                width={103.445}
                height={193.762}
                transform="translate(-23.03 0.374) rotate(-2.551)"
              />
            </g>
          </g>
          <g className="dq">
            <g className="u" transform="translate(165.205 221.029)">
              <g className="fw">
                <g transform="translate(0 0)">
                  <g className="fx">
                    <rect
                      className="fy"
                      width={120.574}
                      height={248.514}
                      transform="translate(-8.626 0)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(172.896 2.018)">
              <g className="fz">
                <g transform="translate(0 0)">
                  <g className="ga">
                    <rect
                      className="gb"
                      width={89.691}
                      height={183.115}
                      transform="translate(-38.406 0)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="em" transform="translate(167.973 299.18)">
              <g className="gc">
                <g transform="translate(0.001 0)">
                  <g className="gd">
                    <rect
                      className="ge"
                      width={129.064}
                      height={121.519}
                      transform="translate(-2.089 -15.381)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(164.565 358.217)">
              <g className="gf">
                <g transform="translate(0 0)">
                  <g className="gg">
                    <rect
                      className="gh"
                      width={41.724}
                      height={118.632}
                      transform="translate(-1.747 -5.261)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dy" transform="translate(185.069 407.097)">
              <g className="gi">
                <g transform="translate(-0.001 -0.001)">
                  <g className="gj">
                    <rect
                      className="gk"
                      width={43.363}
                      height={81.616}
                      transform="translate(-1.797 -5.67)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ec" transform="translate(294.305 298.224)">
              <g className="gl">
                <path
                  className="ee"
                  d="M205.78,183.278c-6.433,6.076-20.863,8.591-27,5.318s8.591-3.273,15.545-5.318,18.817-6.954,11.454,0"
                  transform="translate(-177.319 -179.68)"
                />
              </g>
            </g>
            <g className="dy" transform="translate(301.073 302.249)">
              <g className="gm">
                <g transform="translate(0.001 0.001)">
                  <g className="gn">
                    <rect
                      className="go"
                      width={27.817}
                      height={39.68}
                      transform="translate(-0.399 -2.473)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(210.496 213.276)">
              <g className="gp">
                <g transform="translate(0 0)">
                  <g className="gq">
                    <rect
                      className="gr"
                      width={106.768}
                      height={124.768}
                      transform="translate(-11.679 -5.542)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="em" transform="translate(158.474 77.904)">
              <g className="gs">
                <g transform="translate(0 0)">
                  <g className="gt">
                    <rect
                      className="gu"
                      width={68.725}
                      height={111.064}
                      transform="translate(-2.817 -12.118)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="gv" transform="translate(179.18 554.145)">
              <g className="gw">
                <g transform="translate(0 0.001)">
                  <g className="gx">
                    <rect
                      className="gy"
                      width={144.898}
                      height={192.064}
                      transform="translate(-81.305 29.017) rotate(-30)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(247.689 376.232)">
            <g className="gz">
              <rect
                className="ha"
                width={30.979}
                height={24.841}
                transform="translate(-0.697 -0.002)"
              />
            </g>
          </g>
          <g transform="translate(155.372 124.134)">
            <g className="hb">
              <rect
                className="hc"
                width={30.007}
                height={37.99}
                transform="translate(-3.31 -0.002)"
              />
            </g>
          </g>
          <g className="dq">
            <g className="dy" transform="translate(255.074 376.273)">
              <g className="hd">
                <g transform="translate(0 0)">
                  <g className="he">
                    <rect
                      className="hf"
                      width={22.083}
                      height={22.317}
                      transform="translate(-3.889 -3.273)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dy" transform="translate(154.483 125.814)">
              <g className="hg">
                <g transform="translate(-0.001 0)">
                  <g className="hh">
                    <rect
                      className="hi"
                      width={21.681}
                      height={38.027}
                      transform="translate(-3.938 -4.395)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(244.85 386.705)">
            <g className="hj">
              <rect
                className="hk"
                width={20.251}
                height={10.432}
                transform="translate(-6.764)"
              />
            </g>
          </g>
          <g transform="translate(163.226 148.008)">
            <g className="hl">
              <rect
                className="hm"
                width={17.182}
                height={15.341}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g transform="translate(163.22 446.628)">
            <g className="hn">
              <rect
                className="ho"
                width={204.009}
                height={322.469}
                transform="translate(-12.706 0.51) rotate(-2.314)"
              />
            </g>
          </g>
          <g transform="translate(163.22 446.628)">
            <g className="hp">
              <rect
                className="hq"
                width={359.121}
                height={290.984}
                transform="translate(-104.885 270.195) rotate(-68.785)"
              />
            </g>
          </g>
          <g className="dq">
            <g className="u" transform="translate(221.334 498.388)">
              <g className="hr">
                <g transform="translate(0.001)">
                  <g className="hs">
                    <rect
                      className="ht"
                      width={104.595}
                      height={215.977}
                      transform="translate(-38.642 1.738) rotate(-5.232)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(254.725 481.392)">
              <g className="hu">
                <g transform="translate(0.001 0.001)">
                  <g className="hv">
                    <rect
                      className="hw"
                      width={69.436}
                      height={48.875}
                      transform="matrix(0.999, -0.04, 0.04, 0.999, -4.722, -0.891)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dy" transform="translate(170.181 472.816)">
              <g className="hx">
                <g transform="translate(0 -0.001)">
                  <g className="hy">
                    <rect
                      className="hz"
                      width={38.657}
                      height={56.973}
                      transform="translate(0 -2.046)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ec" transform="translate(164.968 523.158)">
              <g className="ia">
                <path
                  className="ee"
                  d="M99.9,323.767c13.09,12.682,29.761-1.125,30.68-3.887s-12.247-5.393-13.909-4.5c-10.636,5.728-19.534,5.711-16.772,8.387"
                  transform="translate(-99.393 -315.203)"
                />
              </g>
            </g>
            <g className="u" transform="translate(218.655 470.565)">
              <g className="ib">
                <g className="ic">
                  <rect
                    className="id"
                    width={80.79}
                    height={80.179}
                    transform="translate(-24.134)"
                  />
                </g>
              </g>
            </g>
            <g className="u" transform="translate(232.098 603.891)">
              <g className="ie">
                <g transform="translate(0 0)">
                  <g className="if">
                    <rect
                      className="ig"
                      width={75.98}
                      height={124.647}
                      transform="translate(-2.6 -3.268)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="dy" transform="translate(199.867 602.855)">
              <g className="ih">
                <g transform="translate(0 0)">
                  <g className="ii">
                    <rect
                      className="ij"
                      width={36.509}
                      height={26.385}
                      transform="translate(-4.017 -5.067)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(183.684 731.249)">
              <g className="ik">
                <g transform="translate(0 0)">
                  <g className="il">
                    <rect
                      className="im"
                      width={71.686}
                      height={37.738}
                      transform="translate(0 -4.295)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="ef" transform="translate(202.655 583.636)">
              <g className="in">
                <g transform="translate(0 0)">
                  <g className="io">
                    <rect
                      className="ip"
                      width={97.872}
                      height={39.047}
                      transform="translate(-9.874 -3.336)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="u" transform="translate(283.498 521.071)">
              <g className="iq">
                <g transform="translate(0.001 0.001)">
                  <g className="ir">
                    <rect
                      className="is"
                      width={75.782}
                      height={38.35}
                      transform="translate(-6.039 -6.736)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g className="em" transform="translate(222.015 623.789)">
              <g className="it">
                <g transform="translate(0 0.001)">
                  <g className="iu">
                    <rect
                      className="iv"
                      width={78.543}
                      height={142.767}
                      transform="translate(-4.381 -8.616)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(184.12 547.862)">
            <g className="iw">
              <rect
                className="ix"
                width={7.97}
                height={19.144}
                transform="translate(-1.679)"
              />
            </g>
          </g>
          <g transform="translate(191.154 542.28)">
            <g className="iy">
              <rect
                className="iz"
                width={7.464}
                height={8.873}
                transform="translate(-0.313)"
              />
            </g>
          </g>
          <g transform="translate(255.621 630.359)">
            <g className="ja">
              <rect
                className="jb"
                width={10.885}
                height={22.347}
                transform="translate(-0.678)"
              />
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(-67 1487.819)">
        <g className="jc">
          <g transform="translate(0 122.437)">
            <g className="jd">
              <rect
                className="je"
                width={169.002}
                height={608.625}
                transform="translate(0 -0.001)"
              />
            </g>
          </g>
          <g transform="translate(50.236 494.743)">
            <g className="jf">
              <rect
                className="jg"
                width={34.92}
                height={211.674}
                transform="translate(-5.837 -4.295)"
              />
            </g>
          </g>
          <g transform="translate(121.507 501.553)">
            <g className="jh">
              <rect
                className="ji"
                width={48.04}
                height={81.413}
                transform="translate(-0.546 0)"
              />
            </g>
          </g>
          <g transform="translate(39.213 373.439)">
            <g className="jj">
              <rect className="jk" width={92.297} height={84.157} />
            </g>
          </g>
          <g className="jc">
            <g className="jl" transform="translate(30.804 127.618)">
              <g className="jm">
                <path
                  className="jn"
                  d="M24.782,252.546c-6.484-19.45-3.891-38.9,14.264-49.6s7.131-23.016,18.477-49.922,19.126-30.472,23.665-40.521,7.78-30.148,11.02-20.747.324,20.747-5.509,38.9-5.188,33.389-10.374,43.114S62.71,197.437,50.392,210.079s-25.61,42.467-25.61,42.467"
                  transform="translate(-21.56 -89.319)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(26.073 137.881)">
            <g className="jo">
              <rect
                className="jp"
                width={70.132}
                height={166.29}
                transform="translate(-3.556 0)"
              />
            </g>
          </g>
          <g className="jc">
            <g className="jq" transform="translate(54.612 500.624)">
              <g className="jr">
                <path
                  className="js"
                  d="M38.222,387.537c0-28.69,11.913-44.493,24.555-33.794s32.336,48.139,41.575,56.161,11.67-12.156,11.67-12.156,0,22.368-6.08,27.23-18.477-1.216-33.794-17.018-29.9-25.53-33.308-23.1-4.619,8.023-4.619,2.675"
                  transform="translate(-38.223 -350.383)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(9.038)">
            <g className="jt">
              <rect
                className="ju"
                width={174.956}
                height={726.691}
                transform="translate(-3.537 0)"
              />
            </g>
          </g>
          <g className="jc">
            <g className="jq" transform="translate(76.353 498.363)">
              <g className="jv">
                <path
                  className="js"
                  d="M73.678,353.936c-5.512,41.169-10.05,74.234-4.216,83.31s14.588,0,16.533,8.106-12.966,40.521-16.533,40.195S55.2,468.366,53.9,442.11s-.326-47,8.751-69.048,12.572-30.693,11.023-19.126"
                  transform="translate(-53.439 -348.8)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(89.182 449.274)">
            <g className="jw">
              <rect
                className="jx"
                width={47.65}
                height={245.994}
                transform="translate(-2.474 0)"
              />
            </g>
          </g>
          <g transform="translate(35.451 264.208)">
            <g className="jy">
              <rect
                className="jz"
                width={145.532}
                height={175.524}
                transform="translate(-0.717 0)"
              />
            </g>
          </g>
          <g transform="translate(46.288 0.159)">
            <g className="ka">
              <rect
                className="kb"
                width={53.087}
                height={165.004}
                transform="translate(-0.031 0)"
              />
            </g>
          </g>
          <g className="jc">
            <g className="jq" transform="translate(23.005 646.997)">
              <g className="kc">
                <path
                  className="js"
                  d="M16.1,454.232c12.642,4.862,23.335-4.862,28.2,0s16.045,26.257,19.936,42.3,3.481,40.519.81,39.062A106.506,106.506,0,0,0,55,531.546s1.459-13.615-4.862-34.524S16.1,454.232,16.1,454.232"
                  transform="translate(-16.101 -452.828)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(15.905 578.569)">
              <g className="kd">
                <path
                  className="jn"
                  d="M12.884,405.477c7.961,10.236,28.2-.243,30.148,9.239s20.909,13.615,8.51,26.258c-2.072,2.112-24.069,5.835-26.987,3.4s-9.969-19.936-12.156-28.2-1.216-12.885.486-10.7"
                  transform="translate(-11.132 -404.936)"
                />
              </g>
            </g>
          </g>
          <g transform="translate(3.642 356.163)">
            <g className="ke">
              <rect
                className="kf"
                width={41.656}
                height={58.838}
                transform="translate(-3.004)"
              />
            </g>
          </g>
          <g className="jc">
            <g className="jq" transform="translate(97.055 640.847)">
              <g className="kg">
                <path
                  className="js"
                  d="M68.275,449.513c15.108-2.157,23.341-1.459,26.5,9s-5.349,41.575-8.267,44.735-17.748-8.51-17.261-12.643,2.918-21.152,2.673-27.959-5.348-12.886-3.646-13.129"
                  transform="translate(-67.928 -448.524)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(15.644 126.908)">
              <g className="kh">
                <path
                  className="jn"
                  d="M52.105,89.054c11.426,16.29,15.56,44.493,12.885,50.328s-13.371,11.913-33.551,16.29c-19.234,4.172-22.611-4.376-19.45-10.212s21.152-17.5,28.446-32.092,10.233-26.361,11.67-24.314"
                  transform="translate(-10.949 -88.822)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(9.073 232.84)">
              <g className="ki">
                <path
                  className="jn"
                  d="M8.856,163.509c23.554,10.637,28.689-.243,34.767,10.212s5.349,18.234,23.341,23.582-21.395,5.349-26.015-1.945-8.751-9.724-18.72-15.8S1.319,160.106,8.856,163.509"
                  transform="translate(-6.35 -162.963)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(57.32 31.139)">
              <g className="kj">
                <path
                  className="jn"
                  d="M78.741,23.463c-11.167,22.921-27.23,15.56-36.307,27.068S53.131,69.17,64.316,58.8,79.065,41.13,79.876,35.782s1.945-18.64-1.134-12.319"
                  transform="translate(-40.118 -21.794)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(55.821 52.942)">
              <g className="kk">
                <path
                  className="jn"
                  d="M42.884,43.987c14.414-6.2,30.229-10.779,29.742-2.269s-13.858,15.8-22.854,15.56S34.78,47.471,42.884,43.987"
                  transform="translate(-39.069 -37.054)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(63.77 275.014)">
              <g className="kl">
                <path
                  className="jn"
                  d="M155.253,369.1c-1.62-52.677-30.742-71.54-39.3-83.068-6.322-8.508-14.588-26.986-29.419-49.192-14.939-22.368-29.174-29.5-38.9-33.389s5.835-14.587,23.341-9.724,22.691,7.131,20.746,10.7-8.428,4.862,4.862,18.153,34.362,32.094,43.115,64.51,18.8,47.653,19.773,60.619-4.039,27.063-4.214,21.395"
                  transform="translate(-44.632 -192.48)"
                />
              </g>
            </g>
            <g className="jl" transform="translate(64.88 276.277)">
              <g className="km">
                <path
                  className="jn"
                  d="M52.646,194.722c29.986-5,40.845,5.105,36.711,9.239s-2.43,11.427,9,25.285-25.527-14.588-41.574-21.395-12.886-11.67-4.133-13.129"
                  transform="translate(-45.409 -193.364)"
                />
              </g>
            </g>
            <g className="dh" transform="translate(99.589 390.932)">
              <g className="kn">
                <path
                  className="ko"
                  d="M98.634,316.886c-6.707,25.8-18.721,14.1-21.638,26.744s-7.051,24.555-7.294,44.005,50.555-34.078,65.887-43.277c9.724-5.835,3.312-32.482-4.376-52.515-18.479-48.139-29.419,12.886-32.579,25.042"
                  transform="translate(-69.702 -273.61)"
                />
              </g>
            </g>
            <g className="jq" transform="translate(10.754 372.515)">
              <g className="kp">
                <path
                  className="js"
                  d="M99.523,263.09c-15.228,11.715-18.234,17.018-25.528,24.069s-34.037,27.473-39.872,25.528-18.964-7.051-24.8-18.477,3.891-28.2,9.969-30.39,9-3.4,9.239.486-3.16,10.7,4.619,10.94,15.074-6.564,28.932-5.592,13.858,2.432,22.611-4.375,17.991-4.621,14.831-2.189"
                  transform="translate(-7.527 -260.72)"
                />
              </g>
            </g>
            <path
              className="kq"
              d="M78.73,330.287c5.817,18.177,4.214,26.906,0,34.361s-5.835,18.479-9.077,14.912-.649-12.318,1.3-25.285,5.187-32.092,7.78-23.988"
              transform="translate(29.207 140.794)"
            />
            <path
              className="kq"
              d="M117.181,262.278c2.492,6.054,10.212,33.308,9,33.794s-4.133-10.454-10.212-25.284-.486-12.643,1.216-8.51"
              transform="translate(48.539 111.149)"
            />
            <path
              className="kq"
              d="M85.294,195.814c-9.344,10.279-11.67,13.858-2.432,23.827s21.882,25.528,21.4,20.423-4.376-7.051-8.753-22.368-7.78-24.557-10.212-21.882"
              transform="translate(33.016 83.767)"
            />
            <path
              className="kq"
              d="M69.551,191.132c-15.4,7.7-27.716,11.913-35.01,9.969S21.9,186.755,26.274,187s19.937,5.835,25.285,4.864,23.827-3.648,17.991-.73"
              transform="translate(10.589 80.182)"
            />
            <path
              className="kq"
              d="M44.677,40.906C35.212,51.317,41.111,68.3,46.622,80.94s-2.593,14.1-8.266,3.242-6.808-26.1-3.566-35.334,11.507-9.726,9.887-7.943"
              transform="translate(14.149 17.188)"
            />
            <path
              className="kq"
              d="M64.33,8.424c-.723,17.341,9.481,20.179,3.4,27.23s-10.21,7.78-8.266,3.891,7.294-8.753,3.4-16.29,1.7-20.666,1.459-14.831"
              transform="translate(25.291 2.989)"
            />
            <path
              className="kq"
              d="M80.289,418.715c-10.54,26.35-12.642,27.23,5.348,41.332s6.322-7.781,2.675-16.047-6.564-28.932-8.023-25.285"
              transform="translate(30.971 179.358)"
            />
          </g>
        </g>
      </g>
      <g transform="translate(215 2103.577)">
        <g className="kr">
          <g transform="translate(32.475)">
            <g className="ks">
              <rect
                className="kt"
                width={139.663}
                height={98.328}
                transform="matrix(0.339, -0.941, 0.941, 0.339, -40.741, 112.681)"
              />
            </g>
          </g>
          <g transform="translate(0 58.295)">
            <g className="ku">
              <rect
                className="kv"
                width={91.98}
                height={98.922}
                transform="translate(-21.956 60.89) rotate(-70.172)"
              />
            </g>
          </g>
          <g transform="translate(0 0.001)">
            <g className="kr">
              <g className="u" transform="translate(0 63.352)">
                <g className="kw">
                  <g transform="translate(0 -0.001)">
                    <g className="kx">
                      <rect
                        className="ky"
                        width={87.281}
                        height={93.691}
                        transform="translate(-20.859 55.536) rotate(-70.172)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="u" transform="translate(32.474 -0.001)">
                <g className="kz">
                  <g transform="translate(0)">
                    <g className="la">
                      <rect
                        className="lb"
                        width={138.883}
                        height={96.378}
                        transform="translate(-42.886 112.597) rotate(-70.172)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="lc"
                d="M0,41.841S21.531,45.25,38.929,60.089C56.735,75.274,70.9,96.6,70.9,96.6S40.21,42.246,0,41.841"
                transform="translate(0 21.802)"
              />
            </g>
          </g>
          <g transform="translate(8.124 99.363)">
            <g className="ld">
              <rect
                className="le"
                width={62.579}
                height={29.06}
                transform="translate(0 0.001)"
              />
            </g>
          </g>
          <g transform="translate(0 0.001)">
            <g className="kr">
              <g className="u" transform="translate(8.147 109.274)">
                <g className="lf">
                  <g transform="translate(0 0)">
                    <g className="lg">
                      <rect
                        className="lh"
                        width={61.753}
                        height={21.332}
                        transform="translate(0 -2.469)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="lc"
                d="M5.356,74.857s43.971-7.849,61.753,15.36c0,0-9.568-24.629-61.753-15.36"
                transform="translate(2.791 37.918)"
              />
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(715 1994.289)">
        <g className="li">
          <g transform="translate(25.548 18.117)">
            <g className="lj">
              <rect
                className="lk"
                width={55.55}
                height={63.165}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g transform="translate(15.479)">
            <g className="ll">
              <rect
                className="lm"
                width={36.381}
                height={80.891}
                transform="translate(-3.046 0)"
              />
            </g>
          </g>
          <g transform="translate(0 0)">
            <g className="li">
              <g className="dk" transform="translate(15.479 0)">
                <g transform="translate(0 0)">
                  <g className="ln">
                    <g transform="translate(0 0)">
                      <g className="lo">
                        <rect
                          className="lp"
                          width={20.839}
                          height={80.891}
                          transform="translate(-3.046 0)"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g className="dk" transform="translate(25.549 18.118)">
                <g className="lq">
                  <g transform="translate(0.001 -0.001)">
                    <g className="lr">
                      <rect
                        className="ls"
                        width={58.661}
                        height={63.163}
                        transform="translate(0 0)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(0 24.733)">
            <g className="lt">
              <rect
                className="lu"
                width={25.697}
                height={57.978}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g transform="translate(0 0)">
            <g className="li">
              <g className="dk" transform="translate(0 24.734)">
                <g className="lv">
                  <g transform="translate(-0.001 0.001)">
                    <g className="lw">
                      <rect
                        className="lx"
                        width={22.669}
                        height={57.976}
                        transform="translate(-2.016 0)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(8 66)">
        <g className="ly">
          <g transform="translate(0 0.002)">
            <g className="lz">
              <g className="ma" transform="translate(176.833 123.757)">
                <g className="mb">
                  <g transform="translate(0.001 -0.002)">
                    <g className="mc">
                      <rect
                        className="md"
                        width={22.164}
                        height={22.314}
                        transform="translate(-0.983 -0.175) rotate(-2.069)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M50.193,34.278a10.634,10.634,0,0,1-3.378,4.29A29.617,29.617,0,0,0,43.9,35.3a10.588,10.588,0,0,0,3.1-4.073l.065-.156a16.614,16.614,0,0,0,1.581,1.489,10.173,10.173,0,0,1,1.542,1.715"
                transform="translate(146.749 103.857)"
              />
              <path
                className="by"
                d="M44.986,29.566a10.567,10.567,0,0,0-3.37,3.852,1.644,1.644,0,0,0-.074.152c-.152-.182-.317-.378-.5-.578l.069-.139a10.707,10.707,0,0,1,3.365-3.865c.161.187.33.378.5.578"
                transform="translate(137.197 96.888)"
              />
              <path
                className="by"
                d="M41.238,30.116l-.009.013c-.074-.091-.152-.187-.239-.282.087.091.169.182.248.269"
                transform="translate(137.006 99.759)"
              />
              <g className="me" transform="translate(182.476 124.901)">
                <g className="mf">
                  <g transform="translate(0.001 0)">
                    <g className="mg">
                      <rect
                        className="mh"
                        width={27.462}
                        height={28.502}
                        transform="matrix(0.883, -0.47, 0.47, 0.883, -9.458, 4.033)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(241.287 217.978)">
                <g className="mi">
                  <g transform="translate(-0.002 0.003)">
                    <g className="mj">
                      <rect
                        className="mk"
                        width={7.21}
                        height={7.26}
                        transform="matrix(0.999, -0.036, 0.036, 0.999, -0.316, -0.06)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M58.646,52.077a3.432,3.432,0,0,1-1.1,1.394,9.667,9.667,0,0,0-.947-1.06,3.479,3.479,0,0,0,1.007-1.324l.022-.052a5.572,5.572,0,0,0,.512.482,3.356,3.356,0,0,1,.5.56"
                transform="translate(189.185 170.579)"
              />
              <path
                className="by"
                d="M56.952,50.544a3.48,3.48,0,0,0-1.1,1.255l-.022.048-.161-.187.022-.048a3.468,3.468,0,0,1,1.094-1.255l.165.187"
                transform="translate(186.076 168.313)"
              />
              <path
                className="by"
                d="M55.731,50.724l-.009,0-.069-.091.078.087"
                transform="translate(186.016 169.248)"
              />
              <g className="me" transform="translate(243.123 218.35)">
                <g className="ml">
                  <g transform="translate(-0.001 0.003)">
                    <g className="mm">
                      <rect
                        className="mn"
                        width={8.938}
                        height={9.276}
                        transform="translate(-3.078 1.309) rotate(-28.024)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(197.722 241.843)">
                <g className="mo">
                  <g transform="translate(0.002 0.002)">
                    <g className="mp">
                      <rect
                        className="mq"
                        width={74.686}
                        height={75.48}
                        transform="matrix(0.998, -0.061, 0.061, 0.998, -5.416, -0.834)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M76.5,74.215A34.562,34.562,0,0,1,65.8,88.5a96.979,96.979,0,0,0-9.775-10.439A34.593,34.593,0,0,0,65.833,64.51c.069-.169.139-.347.2-.521a55.177,55.177,0,0,0,5.285,4.746,32.843,32.843,0,0,1,5.181,5.48"
                transform="translate(187.27 213.877)"
              />
              <path
                className="by"
                d="M59.112,59.25a34.573,34.573,0,0,0-10.7,12.858c-.078.165-.161.334-.234.508-.508-.591-1.068-1.216-1.659-1.854.069-.152.143-.313.221-.46A35.2,35.2,0,0,1,57.419,57.4c.538.6,1.1,1.22,1.694,1.854"
                transform="translate(155.473 191.84)"
              />
              <g className="me" transform="translate(216.675 245.482)">
                <g className="mr">
                  <g transform="translate(0 0.002)">
                    <g className="ms">
                      <rect
                        className="mt"
                        width={89.899}
                        height={93.216}
                        transform="matrix(0.871, -0.491, 0.491, 0.871, -32.086, 14.45)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(70.263 190.538)">
                <g className="mu">
                  <g transform="translate(0.001 0.001)">
                    <g className="mv">
                      <rect
                        className="mw"
                        width={20.567}
                        height={20.783}
                        transform="matrix(0.998, -0.061, 0.061, 0.998, -1.493, -0.229)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M24.707,48.98a9.523,9.523,0,0,1-2.949,3.934,26.65,26.65,0,0,0-2.688-2.875,9.554,9.554,0,0,0,2.7-3.73,1.484,1.484,0,0,0,.056-.148,15.256,15.256,0,0,0,1.455,1.307,9.044,9.044,0,0,1,1.429,1.511"
                transform="translate(63.743 154.291)"
              />
              <path
                className="by"
                d="M19.921,44.856A9.557,9.557,0,0,0,16.972,48.4l-.065.143c-.139-.165-.291-.334-.456-.512l.061-.126a9.664,9.664,0,0,1,2.944-3.552c.148.165.3.334.465.508"
                transform="translate(54.986 148.228)"
              />
              <g className="me" transform="translate(75.482 191.539)">
                <g className="mx">
                  <g transform="translate(0 0.003)">
                    <g className="my">
                      <rect
                        className="mz"
                        width={24.753}
                        height={25.668}
                        transform="translate(-8.833 3.977) rotate(-29.435)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(0 -0.002)">
                <g className="na">
                  <g transform="translate(0 -0.003)">
                    <g className="nb">
                      <rect
                        className="nc"
                        width={44.76}
                        height={45.232}
                        transform="translate(-3.246 -0.493) rotate(-3.48)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M18.562,11.1a20.728,20.728,0,0,1-6.414,8.563A57.953,57.953,0,0,0,6.29,13.408a20.648,20.648,0,0,0,5.875-8.12c.043-.1.087-.208.126-.317A32.273,32.273,0,0,0,15.457,7.82a19.688,19.688,0,0,1,3.1,3.283"
                transform="translate(21.024 16.613)"
              />
              <path
                className="by"
                d="M8.139,2.132a20.681,20.681,0,0,0-6.414,7.7l-.143.308c-.3-.356-.638-.73-.994-1.112.043-.1.087-.187.135-.278a21.089,21.089,0,0,1,6.4-7.734c.321.36.66.73,1.016,1.112"
                transform="translate(1.965 3.407)"
              />
              <g className="me" transform="translate(11.358 2.179)">
                <g className="nd">
                  <g transform="translate(-0.001 0)">
                    <g className="ne">
                      <rect
                        className="nf"
                        width={53.873}
                        height={55.862}
                        transform="translate(-19.225 8.663) rotate(-29.435)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(290.791 188.08)">
                <g className="ng">
                  <g transform="translate(0 0.001)">
                    <g className="nh">
                      <rect
                        className="ni"
                        width={44.76}
                        height={45.236}
                        transform="translate(-3.246 -0.501) rotate(-3.48)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M85.527,54.415a20.728,20.728,0,0,1-6.414,8.563,57.951,57.951,0,0,0-5.858-6.257,20.7,20.7,0,0,0,5.88-8.12c.039-.1.082-.208.122-.317a32.782,32.782,0,0,0,3.166,2.849,19.512,19.512,0,0,1,3.1,3.283"
                transform="translate(244.85 161.384)"
              />
              <path
                className="by"
                d="M75.1,45.445a20.681,20.681,0,0,0-6.414,7.7l-.143.308c-.3-.356-.638-.73-.994-1.112.043-.091.087-.187.135-.278a21.125,21.125,0,0,1,6.4-7.734c.321.36.66.73,1.016,1.112"
                transform="translate(225.791 148.178)"
              />
              <g className="me" transform="translate(302.15 190.261)">
                <g className="nj">
                  <g transform="translate(-0.001 0.001)">
                    <g className="nk">
                      <rect
                        className="nl"
                        width={53.877}
                        height={55.864}
                        transform="translate(-19.225 8.659) rotate(-29.435)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <g className="ma" transform="translate(255.74 240.466)">
                <g className="nm">
                  <g transform="translate(-0.001 0.002)">
                    <g className="nn">
                      <rect
                        className="no"
                        width={15.57}
                        height={15.737}
                        transform="translate(-1.127 -0.177) rotate(-3.48)"
                      />
                    </g>
                  </g>
                </g>
              </g>
              <path
                className="by"
                d="M65.35,59.238a7.194,7.194,0,0,1-2.232,2.979,19.873,19.873,0,0,0-2.037-2.176,7.264,7.264,0,0,0,2.045-2.827l.039-.109a12.147,12.147,0,0,0,1.1.99,6.682,6.682,0,0,1,1.081,1.142"
                transform="translate(204.159 190.871)"
              />
              <path
                className="by"
                d="M61.725,56.117A7.226,7.226,0,0,0,59.493,58.8a.824.824,0,0,0-.048.109c-.109-.126-.221-.256-.347-.386a.655.655,0,0,1,.048-.1,7.291,7.291,0,0,1,2.228-2.692c.113.126.23.252.352.386"
                transform="translate(197.531 186.275)"
              />
              <path
                className="by"
                d="M59.232,56.51l0,.009c-.052-.061-.109-.126-.169-.187.061.061.117.117.174.178"
                transform="translate(197.397 188.284)"
              />
              <g className="me" transform="translate(259.691 241.225)">
                <g className="np">
                  <g transform="translate(-0.002 0.001)">
                    <g className="nq">
                      <rect
                        className="nr"
                        width={18.739}
                        height={19.431}
                        transform="translate(-6.685 3.014) rotate(-29.435)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(-1072.542 1824.577)">
        <path
          className="by"
          d="M169.58,442.67a2.382,2.382,0,1,1-2.382-2.382,2.383,2.383,0,0,1,2.382,2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M108.41,293.5a2.383,2.383,0,1,1-2.382-2.382,2.382,2.382,0,0,1,2.382,2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M167.2,397.6a2.382,2.382,0,1,1-2.382-2.382A2.382,2.382,0,0,1,167.2,397.6"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M200.622,452.456a1.684,1.684,0,1,1-1.685-1.685,1.685,1.685,0,0,1,1.685,1.685"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M132.138,427.214a1.685,1.685,0,1,1-1.685-1.685,1.685,1.685,0,0,1,1.685,1.685"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M215.376,331.512a1.685,1.685,0,1,1-1.685-1.685,1.685,1.685,0,0,1,1.685,1.685"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M216.651,402.939a1.685,1.685,0,1,1-1.685-1.685,1.684,1.684,0,0,1,1.685,1.685"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M119.422,407.447a1.238,1.238,0,1,1-1.238-1.238,1.238,1.238,0,0,1,1.238,1.238"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M172.449,433.3a.794.794,0,1,1-.794-.794.794.794,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M126.839,426.42a.794.794,0,1,1-.794-.794.793.793,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M127.633,445.053a.794.794,0,1,1-.794-.794.794.794,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M137.815,440.288a.794.794,0,1,1-.794-.794.793.793,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M116.6,443.777a.794.794,0,1,1-.794-.794.794.794,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M179.495,382.035a.794.794,0,1,1-.794-.794.794.794,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M140.761,427.611a.4.4,0,1,1-.4-.4.4.4,0,0,1,.4.4"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M134.8,434.089a.4.4,0,1,1-.4-.4.4.4,0,0,1,.4.4"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M137.815,421.216a.794.794,0,1,1-.794-.794.793.793,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M116.6,325.482a.794.794,0,1,1-.794-.794.794.794,0,0,1,.794.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M131.257,378.248a.795.795,0,1,1-.795-.794.795.795,0,0,1,.795.794"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M314.012,314.076a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M214.967,320.621a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M283.83,347.627a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M298.982,285.207a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M329.559,351.481a1.684,1.684,0,1,1,0,2.382,1.683,1.683,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M252.633,308.886a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M324.573,374.449a1.238,1.238,0,1,1,0,1.751,1.238,1.238,0,0,1,0-1.751"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M305.354,318.677a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M332.744,355.789a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M345.358,342.052a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M334.789,338.221a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M264.126,349.94a.794.794,0,1,1,0,1.124.794.794,0,0,1,0-1.124"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M323.742,345.1a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M354.739,384.02a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M221.34,278.635a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M332.536,344.736a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M321.3,351.707a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M346.517,378.045a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M188.8,279.148a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M327.315,412.006a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M295.558,386.728a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M408.507,357.505a2.383,2.383,0,1,1,0,3.37,2.385,2.385,0,0,1,0-3.37"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M456.771,323a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M378.324,391.057a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M385.708,415.832a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M393.477,328.636a1.684,1.684,0,1,1,0,2.382,1.683,1.683,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M487.319,284.935a1.685,1.685,0,1,1,0,2.383,1.684,1.684,0,0,1,0-2.383"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M473.831,298.032a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M347.128,352.316a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M381.516,410.472a1.238,1.238,0,1,1,0,1.751,1.239,1.239,0,0,1,0-1.751"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M309.678,455.916a1.238,1.238,0,1,1,0,1.751,1.238,1.238,0,0,1,0-1.751"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M399.848,362.107a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M387.546,409.505a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M270.589,327.34a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M358.621,393.371a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M178.139,321.744a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M355.533,401.412a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M366.422,394.136a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M294.647,323.963a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M488.656,222.54a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M204.516,419.618a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M473.512,222.937a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M384.73,414.5a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M382.111,408.594a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M367.332,407.916a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M377.859,408.71a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M196.691,342.846a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M209.936,316.428a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M225.735,307a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M215.166,303.168a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M204.119,310.049a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M212.914,309.683a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M201.68,316.654a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M392.777,230.948a.794.794,0,1,1-.532.989.794.794,0,0,1,.532-.989"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M252.041,410.56a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M254.318,359.228a1.684,1.684,0,1,1,0,2.382,1.684,1.684,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M247.055,433.528a1.238,1.238,0,1,1,0,1.751,1.239,1.239,0,0,1,0-1.751"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M255.227,414.868a.794.794,0,1,1,0,1.123.793.793,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M267.84,401.131a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M282.571,353.8a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M257.272,397.3a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M246.225,404.181a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M231.032,436.854a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M277.222,443.1a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M255.019,403.815a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M243.786,410.786a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M189.591,410.3a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M269,437.124a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M460.835,222.656a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M472.04,258.487a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M390.052,430.158a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M192.719,225.271a.766.766,0,1,1-.68.844.767.767,0,0,1,.68-.844"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M606.5,335.27a.528.528,0,1,1-.468.581.528.528,0,0,1,.468-.581"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M625.037,362.221a3.166,3.166,0,1,1-2.81,3.486,3.166,3.166,0,0,1,2.81-3.486"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M612.015,394.012a3.166,3.166,0,1,1-2.81,3.486,3.165,3.165,0,0,1,2.81-3.486"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M612.147,384.97a1.645,1.645,0,1,1-1.46,1.811,1.645,1.645,0,0,1,1.46-1.811"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M619.193,389a1.056,1.056,0,1,1-.937,1.162,1.056,1.056,0,0,1,.937-1.162"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M602.721,348.182a1.056,1.056,0,1,1-.937,1.162,1.055,1.055,0,0,1,.937-1.162"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M592.82,353.927a.528.528,0,1,1-.468.581.528.528,0,0,1,.468-.581"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M610.154,355.48a.528.528,0,1,1-.468.581.528.528,0,0,1,.468-.581"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M612.112,391.82a.528.528,0,1,1-.468.581.527.527,0,0,1,.468-.581"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M614.329,383.523a.528.528,0,1,1-.468.581.528.528,0,0,1,.468-.581"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M599.6,370.5a1.056,1.056,0,1,1-.937,1.162,1.056,1.056,0,0,1,.937-1.162"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M609.833,380.1a1.055,1.055,0,1,1-.937,1.162,1.056,1.056,0,0,1,.937-1.162"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M604.562,412.457a1.056,1.056,0,1,1-.937,1.162,1.055,1.055,0,0,1,.937-1.162"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M293.913,269.571a2.382,2.382,0,1,1,0,3.369,2.383,2.383,0,0,1,0-3.369"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M332.257,248.65a1.685,1.685,0,1,1,0,2.382,1.685,1.685,0,0,1,0-2.382"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M327.271,271.618a1.238,1.238,0,1,1,0,1.751,1.239,1.239,0,0,1,0-1.751"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M337.174,295.846a1.238,1.238,0,1,1,0,1.75,1.239,1.239,0,0,1,0-1.75"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M335.443,252.958a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M295.751,263.244a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M384.35,245.919a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M408.5,240.015a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M348.056,239.221a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M337.488,235.39a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M326.441,242.271a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M357.438,281.189a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M342.69,309.456a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M342.293,304.23a.4.4,0,1,1,0,.562.4.4,0,0,1,0-.562"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M335.235,241.9a.4.4,0,1,1,0,.561.4.4,0,0,1,0-.561"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M324,248.876A.794.794,0,1,1,324,250a.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M349.216,275.214a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M315.452,303.552a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M330.013,309.175a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M341.218,345.006a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
        <path
          className="by"
          d="M298.257,283.9a.794.794,0,1,1,0,1.123.794.794,0,0,1,0-1.123"
          transform="translate(1524 -2007)"
        />
      </g>
      <g transform="translate(-1730.146 2199.814)">
        <path
          className="by"
          d="M170.785,443.272a2.985,2.985,0,1,1-2.984-2.984,2.985,2.985,0,0,1,2.984,2.984"
          transform="translate(1539.465 -1951.918)"
        />
        <path
          className="by"
          d="M109.615,294.106a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1524 -1989.631)"
        />
        <path
          className="by"
          d="M168.4,398.206a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1538.863 -1963.312)"
        />
        <path
          className="by"
          d="M201.474,452.882a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1547.667 -1949.268)"
        />
        <path
          className="by"
          d="M132.99,427.64a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1530.352 -1955.65)"
        />
        <path
          className="by"
          d="M216.228,331.938a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1551.397 -1979.846)"
        />
        <path
          className="by"
          d="M217.5,403.365a2.11,2.11,0,1,1-2.111-2.111,2.11,2.11,0,0,1,2.111,2.111"
          transform="translate(1551.719 -1961.787)"
        />
        <path
          className="by"
          d="M120.048,407.76a1.551,1.551,0,1,1-1.551-1.551,1.551,1.551,0,0,1,1.551,1.551"
          transform="translate(1527.363 -1960.534)"
        />
        <path
          className="by"
          d="M172.851,433.5a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1540.994 -1953.887)"
        />
        <path
          className="by"
          d="M127.24,426.621a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1529.463 -1955.625)"
        />
        <path
          className="by"
          d="M128.035,445.254a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1529.663 -1950.914)"
        />
        <path
          className="by"
          d="M138.216,440.489a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1952.119)"
        />
        <path
          className="by"
          d="M117,443.978a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1951.237)"
        />
        <path
          className="by"
          d="M179.9,382.236a1,1,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1542.775 -1966.847)"
        />
        <path
          className="by"
          d="M140.962,427.711a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1533.183 -1955.224)"
        />
        <path
          className="by"
          d="M135,434.189a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1531.676 -1953.586)"
        />
        <path
          className="by"
          d="M138.216,421.417a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1956.941)"
        />
        <path
          className="by"
          d="M117,325.683a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1981.145)"
        />
        <path
          className="by"
          d="M131.659,378.449a1,1,0,1,1-1-.995,1,1,0,0,1,1,.995"
          transform="translate(1530.579 -1967.804)"
        />
        <path
          className="by"
          d="M314.188,314.252a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1577.01 -1984.004)"
        />
        <path
          className="by"
          d="M215.143,320.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1551.969 -1982.349)"
        />
        <path
          className="by"
          d="M284.006,347.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1569.379 -1975.522)"
        />
        <path
          className="by"
          d="M299.107,285.332a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1573.261 -1991.251)"
        />
        <path
          className="by"
          d="M329.684,351.606a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1580.992 -1974.496)"
        />
        <path
          className="by"
          d="M252.758,309.011a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.543 -1985.265)"
        />
        <path
          className="by"
          d="M324.665,374.541a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1579.765 -1968.656)"
        />
        <path
          className="by"
          d="M305.413,318.736a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1574.938 -1982.723)"
        />
        <path
          className="by"
          d="M332.8,355.848a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.863 -1973.34)"
        />
        <path
          className="by"
          d="M345.417,342.111a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.052 -1976.813)"
        />
        <path
          className="by"
          d="M334.848,338.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.38 -1977.782)"
        />
        <path
          className="by"
          d="M264.185,350a1,1,0,1,1,0,1.408,1,1,0,0,1,0-1.408"
          transform="translate(1564.515 -1974.819)"
        />
        <path
          className="by"
          d="M323.771,345.131a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1579.617 -1976.013)"
        />
        <path
          className="by"
          d="M354.768,384.049a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.454 -1966.174)"
        />
        <path
          className="by"
          d="M221.369,278.664a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1553.727 -1992.818)"
        />
        <path
          className="by"
          d="M332.565,344.765a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1581.84 -1976.106)"
        />
        <path
          className="by"
          d="M321.362,351.766a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1578.971 -1974.373)"
        />
        <path
          className="by"
          d="M346.576,378.1a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.346 -1967.714)"
        />
        <path
          className="by"
          d="M188.856,279.207a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.47 -1992.717)"
        />
        <path
          className="by"
          d="M327.374,412.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1580.491 -1959.127)"
        />
        <path
          className="by"
          d="M295.617,386.787a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1572.462 -1965.518)"
        />
        <path
          className="by"
          d="M408.683,357.681a2.985,2.985,0,1,1,0,4.222,2.987,2.987,0,0,1,0-4.222"
          transform="translate(1600.901 -1973.024)"
        />
        <path
          className="by"
          d="M456.948,323.179a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1613.103 -1981.747)"
        />
        <path
          className="by"
          d="M378.5,391.233a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1593.27 -1964.541)"
        />
        <path
          className="by"
          d="M385.884,416.008a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1595.136 -1958.278)"
        />
        <path
          className="by"
          d="M393.6,328.761a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1597.152 -1980.272)"
        />
        <path
          className="by"
          d="M487.444,285.06a2.111,2.111,0,1,1,0,2.985,2.11,2.11,0,0,1,0-2.985"
          transform="translate(1620.878 -1991.32)"
        />
        <path
          className="by"
          d="M473.956,298.157a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1617.468 -1988.009)"
        />
        <path
          className="by"
          d="M347.253,352.441a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1585.434 -1974.285)"
        />
        <path
          className="by"
          d="M381.608,410.564a1.551,1.551,0,1,1,0,2.194,1.553,1.553,0,0,1,0-2.194"
          transform="translate(1594.161 -1959.548)"
        />
        <path
          className="by"
          d="M309.77,456.008a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1575.999 -1948.059)"
        />
        <path
          className="by"
          d="M399.907,362.166a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1598.829 -1971.743)"
        />
        <path
          className="by"
          d="M387.6,409.564a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1595.719 -1959.76)"
        />
        <path
          className="by"
          d="M270.648,327.4a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1566.149 -1980.533)"
        />
        <path
          className="by"
          d="M358.68,393.43a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1588.406 -1963.839)"
        />
        <path
          className="by"
          d="M178.2,321.8a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1542.775 -1981.948)"
        />
        <path
          className="by"
          d="M355.562,401.441a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.655 -1961.776)"
        />
        <path
          className="by"
          d="M366.451,394.165a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1590.407 -1963.616)"
        />
        <path
          className="by"
          d="M294.676,323.992a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1572.261 -1981.358)"
        />
        <path
          className="by"
          d="M488.685,222.569a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1621.311 -2007)"
        />
        <path
          className="by"
          d="M204.545,419.647a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.473 -1957.173)"
        />
        <path
          className="by"
          d="M473.541,222.966a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1617.483 -2006.9)"
        />
        <path
          className="by"
          d="M384.759,414.531a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1595.036 -1958.467)"
        />
        <path
          className="by"
          d="M382.141,408.623a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1594.374 -1959.96)"
        />
        <path
          className="by"
          d="M367.391,407.975a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1590.608 -1960.161)"
        />
        <path
          className="by"
          d="M377.918,408.769a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1593.27 -1959.961)"
        />
        <path
          className="by"
          d="M196.75,342.9a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1547.466 -1976.613)"
        />
        <path
          className="by"
          d="M210.061,316.553a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1550.748 -1983.358)"
        />
        <path
          className="by"
          d="M225.794,307.058a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1554.809 -1985.676)"
        />
        <path
          className="by"
          d="M215.225,303.227a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1552.137 -1986.645)"
        />
        <path
          className="by"
          d="M204.148,310.078a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.373 -1984.875)"
        />
        <path
          className="by"
          d="M212.943,309.712a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1551.597 -1984.968)"
        />
        <path
          className="by"
          d="M201.739,316.713a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1548.727 -1983.235)"
        />
        <path
          className="by"
          d="M392.92,230.957a.995.995,0,1,1-.667,1.239.995.995,0,0,1,.667-1.239"
          transform="translate(1596.957 -2004.853)"
        />
        <path
          className="by"
          d="M252.166,410.685a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.394 -1959.559)"
        />
        <path
          className="by"
          d="M254.443,359.353a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.969 -1972.537)"
        />
        <path
          className="by"
          d="M247.147,433.62a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1560.166 -1953.719)"
        />
        <path
          className="by"
          d="M255.286,414.927a.994.994,0,1,1,0,1.407.994.994,0,0,1,0-1.407"
          transform="translate(1562.265 -1958.404)"
        />
        <path
          className="by"
          d="M267.9,401.19a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.454 -1961.877)"
        />
        <path
          className="by"
          d="M282.63,353.854a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1569.178 -1973.845)"
        />
        <path
          className="by"
          d="M257.331,397.359a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1562.782 -1962.845)"
        />
        <path
          className="by"
          d="M246.255,404.21a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1560.018 -1961.076)"
        />
        <path
          className="by"
          d="M231.061,436.883a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1556.177 -1952.816)"
        />
        <path
          className="by"
          d="M277.251,443.128a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1567.855 -1951.237)"
        />
        <path
          className="by"
          d="M255.048,403.844a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1562.242 -1961.169)"
        />
        <path
          className="by"
          d="M243.845,410.845a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1559.372 -1959.436)"
        />
        <path
          className="by"
          d="M189.65,410.358a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.671 -1959.559)"
        />
        <path
          className="by"
          d="M269.059,437.183a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.747 -1952.777)"
        />
        <path
          className="by"
          d="M460.894,222.715a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1614.248 -2007)"
        />
        <path
          className="by"
          d="M472.1,258.546a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1617.081 -1997.941)"
        />
        <path
          className="by"
          d="M390.111,430.217a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1596.352 -1954.538)"
        />
        <path
          className="by"
          d="M192.892,225.272a.96.96,0,1,1-.852,1.057.961.961,0,0,1,.852-1.057"
          transform="translate(1546.347 -2006.281)"
        />
        <path
          className="by"
          d="M606.622,335.271a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.016 -1978.47)"
        />
        <path
          className="by"
          d="M625.752,362.226a3.967,3.967,0,1,1-3.521,4.367,3.966,3.966,0,0,1,3.521-4.367"
          transform="translate(1655.106 -1971.66)"
        />
        <path
          className="by"
          d="M612.73,394.017a3.967,3.967,0,1,1-3.52,4.367,3.966,3.966,0,0,1,3.52-4.367"
          transform="translate(1651.814 -1963.623)"
        />
        <path
          className="by"
          d="M612.518,384.972a2.061,2.061,0,1,1-1.829,2.269,2.06,2.06,0,0,1,1.829-2.269"
          transform="translate(1652.191 -1965.906)"
        />
        <path
          className="by"
          d="M619.431,389a1.322,1.322,0,1,1-1.174,1.456A1.322,1.322,0,0,1,619.431,389"
          transform="translate(1654.105 -1964.887)"
        />
        <path
          className="by"
          d="M602.959,348.184a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.941 -1975.206)"
        />
        <path
          className="by"
          d="M592.939,353.928a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1647.557 -1973.753)"
        />
        <path
          className="by"
          d="M610.273,355.481a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.939 -1973.36)"
        />
        <path
          className="by"
          d="M612.231,391.821a.661.661,0,1,1-.586.728.66.66,0,0,1,.586-.728"
          transform="translate(1652.435 -1964.173)"
        />
        <path
          className="by"
          d="M614.448,383.524a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1652.995 -1966.271)"
        />
        <path
          className="by"
          d="M599.842,370.5a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.153 -1969.565)"
        />
        <path
          className="by"
          d="M610.071,380.1a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1651.739 -1967.137)"
        />
        <path
          className="by"
          d="M604.8,412.458a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1650.407 -1958.956)"
        />
        <path
          className="by"
          d="M294.089,269.747a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1571.928 -1995.256)"
        />
        <path
          className="by"
          d="M332.382,248.775a2.111,2.111,0,1,1,0,2.984,2.111,2.111,0,0,1,0-2.984"
          transform="translate(1581.674 -2000.494)"
        />
        <path
          className="by"
          d="M327.363,271.71a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1580.447 -1994.654)"
        />
        <path
          className="by"
          d="M337.266,295.938a1.551,1.551,0,1,1,0,2.192,1.552,1.552,0,0,1,0-2.192"
          transform="translate(1582.951 -1988.528)"
        />
        <path
          className="by"
          d="M335.5,253.017a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.546 -1999.339)"
        />
        <path
          className="by"
          d="M295.81,263.3a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1572.511 -1996.738)"
        />
        <path
          className="by"
          d="M384.409,245.978a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1594.911 -2001.119)"
        />
        <path
          className="by"
          d="M408.561,240.074a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1601.017 -2002.611)"
        />
        <path
          className="by"
          d="M348.115,239.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.735 -2002.812)"
        />
        <path
          className="by"
          d="M337.547,235.449a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1583.063 -2003.781)"
        />
        <path
          className="by"
          d="M326.47,242.3a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1580.299 -2002.011)"
        />
        <path
          className="by"
          d="M357.467,281.218a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1588.136 -1992.172)"
        />
        <path
          className="by"
          d="M342.719,309.485a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.407 -1985.025)"
        />
        <path
          className="by"
          d="M342.322,304.259a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.307 -1986.347)"
        />
        <path
          className="by"
          d="M335.264,241.934a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1582.523 -2002.104)"
        />
        <path
          className="by"
          d="M324.061,248.935a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1579.653 -2000.371)"
        />
        <path
          className="by"
          d="M349.275,275.273a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1586.028 -1993.712)"
        />
        <path
          className="by"
          d="M315.511,303.611a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1577.492 -1986.547)"
        />
        <path
          className="by"
          d="M330.072,309.234a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.173 -1985.126)"
        />
        <path
          className="by"
          d="M341.277,345.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1584.006 -1976.067)"
        />
        <path
          className="by"
          d="M298.316,283.956a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1573.144 -1991.517)"
        />
      </g>
      <g transform="translate(-979.233 2742.99)">
        <path
          className="by"
          d="M170.785,443.272a2.985,2.985,0,1,1-2.984-2.984,2.985,2.985,0,0,1,2.984,2.984"
          transform="translate(1539.465 -1951.918)"
        />
        <path
          className="by"
          d="M109.615,294.106a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1524 -1989.631)"
        />
        <path
          className="by"
          d="M168.4,398.206a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1538.863 -1963.312)"
        />
        <path
          className="by"
          d="M201.474,452.882a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1547.667 -1949.268)"
        />
        <path
          className="by"
          d="M132.99,427.64a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1530.352 -1955.65)"
        />
        <path
          className="by"
          d="M216.228,331.938a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1551.397 -1979.846)"
        />
        <path
          className="by"
          d="M217.5,403.365a2.11,2.11,0,1,1-2.111-2.111,2.11,2.11,0,0,1,2.111,2.111"
          transform="translate(1551.719 -1961.787)"
        />
        <path
          className="by"
          d="M120.048,407.76a1.551,1.551,0,1,1-1.551-1.551,1.551,1.551,0,0,1,1.551,1.551"
          transform="translate(1527.363 -1960.534)"
        />
        <path
          className="by"
          d="M172.851,433.5a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1540.994 -1953.887)"
        />
        <path
          className="by"
          d="M127.24,426.621a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1529.463 -1955.625)"
        />
        <path
          className="by"
          d="M128.035,445.254a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1529.663 -1950.914)"
        />
        <path
          className="by"
          d="M138.216,440.489a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1952.119)"
        />
        <path
          className="by"
          d="M117,443.978a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1951.237)"
        />
        <path
          className="by"
          d="M179.9,382.236a1,1,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1542.775 -1966.847)"
        />
        <path
          className="by"
          d="M140.962,427.711a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1533.183 -1955.224)"
        />
        <path
          className="by"
          d="M135,434.189a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1531.676 -1953.586)"
        />
        <path
          className="by"
          d="M138.216,421.417a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1956.941)"
        />
        <path
          className="by"
          d="M117,325.683a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1981.145)"
        />
        <path
          className="by"
          d="M131.659,378.449a1,1,0,1,1-1-.995,1,1,0,0,1,1,.995"
          transform="translate(1530.579 -1967.804)"
        />
        <path
          className="by"
          d="M314.188,314.252a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1577.01 -1984.004)"
        />
        <path
          className="by"
          d="M215.143,320.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1551.969 -1982.349)"
        />
        <path
          className="by"
          d="M284.006,347.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1569.379 -1975.522)"
        />
        <path
          className="by"
          d="M299.107,285.332a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1573.261 -1991.251)"
        />
        <path
          className="by"
          d="M329.684,351.606a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1580.992 -1974.496)"
        />
        <path
          className="by"
          d="M252.758,309.011a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.543 -1985.265)"
        />
        <path
          className="by"
          d="M324.665,374.541a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1579.765 -1968.656)"
        />
        <path
          className="by"
          d="M305.413,318.736a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1574.938 -1982.723)"
        />
        <path
          className="by"
          d="M332.8,355.848a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.863 -1973.34)"
        />
        <path
          className="by"
          d="M345.417,342.111a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.052 -1976.813)"
        />
        <path
          className="by"
          d="M334.848,338.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.38 -1977.782)"
        />
        <path
          className="by"
          d="M264.185,350a1,1,0,1,1,0,1.408,1,1,0,0,1,0-1.408"
          transform="translate(1564.515 -1974.819)"
        />
        <path
          className="by"
          d="M323.771,345.131a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1579.617 -1976.013)"
        />
        <path
          className="by"
          d="M354.768,384.049a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.454 -1966.174)"
        />
        <path
          className="by"
          d="M221.369,278.664a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1553.727 -1992.818)"
        />
        <path
          className="by"
          d="M332.565,344.765a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1581.84 -1976.106)"
        />
        <path
          className="by"
          d="M321.362,351.766a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1578.971 -1974.373)"
        />
        <path
          className="by"
          d="M346.576,378.1a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.346 -1967.714)"
        />
        <path
          className="by"
          d="M188.856,279.207a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.47 -1992.717)"
        />
        <path
          className="by"
          d="M327.374,412.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1580.491 -1959.127)"
        />
        <path
          className="by"
          d="M295.617,386.787a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1572.462 -1965.518)"
        />
        <path
          className="by"
          d="M408.683,357.681a2.985,2.985,0,1,1,0,4.222,2.987,2.987,0,0,1,0-4.222"
          transform="translate(1600.901 -1973.024)"
        />
        <path
          className="by"
          d="M456.948,323.179a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1613.103 -1981.747)"
        />
        <path
          className="by"
          d="M378.5,391.233a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1593.27 -1964.541)"
        />
        <path
          className="by"
          d="M385.884,416.008a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1595.136 -1958.278)"
        />
        <path
          className="by"
          d="M393.6,328.761a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1597.152 -1980.272)"
        />
        <path
          className="by"
          d="M487.444,285.06a2.111,2.111,0,1,1,0,2.985,2.11,2.11,0,0,1,0-2.985"
          transform="translate(1620.878 -1991.32)"
        />
        <path
          className="by"
          d="M473.956,298.157a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1617.468 -1988.009)"
        />
        <path
          className="by"
          d="M347.253,352.441a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1585.434 -1974.285)"
        />
        <path
          className="by"
          d="M381.608,410.564a1.551,1.551,0,1,1,0,2.194,1.553,1.553,0,0,1,0-2.194"
          transform="translate(1594.161 -1959.548)"
        />
        <path
          className="by"
          d="M309.77,456.008a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1575.999 -1948.059)"
        />
        <path
          className="by"
          d="M399.907,362.166a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1598.829 -1971.743)"
        />
        <path
          className="by"
          d="M387.6,409.564a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1595.719 -1959.76)"
        />
        <path
          className="by"
          d="M270.648,327.4a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1566.149 -1980.533)"
        />
        <path
          className="by"
          d="M358.68,393.43a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1588.406 -1963.839)"
        />
        <path
          className="by"
          d="M178.2,321.8a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1542.775 -1981.948)"
        />
        <path
          className="by"
          d="M355.562,401.441a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.655 -1961.776)"
        />
        <path
          className="by"
          d="M366.451,394.165a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1590.407 -1963.616)"
        />
        <path
          className="by"
          d="M294.676,323.992a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1572.261 -1981.358)"
        />
        <path
          className="by"
          d="M488.685,222.569a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1621.311 -2007)"
        />
        <path
          className="by"
          d="M204.545,419.647a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.473 -1957.173)"
        />
        <path
          className="by"
          d="M473.541,222.966a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1617.483 -2006.9)"
        />
        <path
          className="by"
          d="M384.759,414.531a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1595.036 -1958.467)"
        />
        <path
          className="by"
          d="M382.141,408.623a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1594.374 -1959.96)"
        />
        <path
          className="by"
          d="M367.391,407.975a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1590.608 -1960.161)"
        />
        <path
          className="by"
          d="M377.918,408.769a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1593.27 -1959.961)"
        />
        <path
          className="by"
          d="M196.75,342.9a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1547.466 -1976.613)"
        />
        <path
          className="by"
          d="M210.061,316.553a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1550.748 -1983.358)"
        />
        <path
          className="by"
          d="M225.794,307.058a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1554.809 -1985.676)"
        />
        <path
          className="by"
          d="M215.225,303.227a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1552.137 -1986.645)"
        />
        <path
          className="by"
          d="M204.148,310.078a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.373 -1984.875)"
        />
        <path
          className="by"
          d="M212.943,309.712a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1551.597 -1984.968)"
        />
        <path
          className="by"
          d="M201.739,316.713a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1548.727 -1983.235)"
        />
        <path
          className="by"
          d="M392.92,230.957a.995.995,0,1,1-.667,1.239.995.995,0,0,1,.667-1.239"
          transform="translate(1596.957 -2004.853)"
        />
        <path
          className="by"
          d="M252.166,410.685a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.394 -1959.559)"
        />
        <path
          className="by"
          d="M254.443,359.353a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.969 -1972.537)"
        />
        <path
          className="by"
          d="M247.147,433.62a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1560.166 -1953.719)"
        />
        <path
          className="by"
          d="M255.286,414.927a.994.994,0,1,1,0,1.407.994.994,0,0,1,0-1.407"
          transform="translate(1562.265 -1958.404)"
        />
        <path
          className="by"
          d="M267.9,401.19a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.454 -1961.877)"
        />
        <path
          className="by"
          d="M282.63,353.854a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1569.178 -1973.845)"
        />
        <path
          className="by"
          d="M257.331,397.359a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1562.782 -1962.845)"
        />
        <path
          className="by"
          d="M246.255,404.21a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1560.018 -1961.076)"
        />
        <path
          className="by"
          d="M231.061,436.883a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1556.177 -1952.816)"
        />
        <path
          className="by"
          d="M277.251,443.128a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1567.855 -1951.237)"
        />
        <path
          className="by"
          d="M255.048,403.844a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1562.242 -1961.169)"
        />
        <path
          className="by"
          d="M243.845,410.845a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1559.372 -1959.436)"
        />
        <path
          className="by"
          d="M189.65,410.358a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.671 -1959.559)"
        />
        <path
          className="by"
          d="M269.059,437.183a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.747 -1952.777)"
        />
        <path
          className="by"
          d="M460.894,222.715a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1614.248 -2007)"
        />
        <path
          className="by"
          d="M472.1,258.546a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1617.081 -1997.941)"
        />
        <path
          className="by"
          d="M390.111,430.217a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1596.352 -1954.538)"
        />
        <path
          className="by"
          d="M192.892,225.272a.96.96,0,1,1-.852,1.057.961.961,0,0,1,.852-1.057"
          transform="translate(1546.347 -2006.281)"
        />
        <path
          className="by"
          d="M606.622,335.271a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.016 -1978.47)"
        />
        <path
          className="by"
          d="M625.752,362.226a3.967,3.967,0,1,1-3.521,4.367,3.966,3.966,0,0,1,3.521-4.367"
          transform="translate(1655.106 -1971.66)"
        />
        <path
          className="by"
          d="M612.73,394.017a3.967,3.967,0,1,1-3.52,4.367,3.966,3.966,0,0,1,3.52-4.367"
          transform="translate(1651.814 -1963.623)"
        />
        <path
          className="by"
          d="M612.518,384.972a2.061,2.061,0,1,1-1.829,2.269,2.06,2.06,0,0,1,1.829-2.269"
          transform="translate(1652.191 -1965.906)"
        />
        <path
          className="by"
          d="M619.431,389a1.322,1.322,0,1,1-1.174,1.456A1.322,1.322,0,0,1,619.431,389"
          transform="translate(1654.105 -1964.887)"
        />
        <path
          className="by"
          d="M602.959,348.184a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.941 -1975.206)"
        />
        <path
          className="by"
          d="M592.939,353.928a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1647.557 -1973.753)"
        />
        <path
          className="by"
          d="M610.273,355.481a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.939 -1973.36)"
        />
        <path
          className="by"
          d="M612.231,391.821a.661.661,0,1,1-.586.728.66.66,0,0,1,.586-.728"
          transform="translate(1652.435 -1964.173)"
        />
        <path
          className="by"
          d="M614.448,383.524a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1652.995 -1966.271)"
        />
        <path
          className="by"
          d="M599.842,370.5a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.153 -1969.565)"
        />
        <path
          className="by"
          d="M610.071,380.1a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1651.739 -1967.137)"
        />
        <path
          className="by"
          d="M604.8,412.458a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1650.407 -1958.956)"
        />
        <path
          className="by"
          d="M294.089,269.747a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1571.928 -1995.256)"
        />
        <path
          className="by"
          d="M332.382,248.775a2.111,2.111,0,1,1,0,2.984,2.111,2.111,0,0,1,0-2.984"
          transform="translate(1581.674 -2000.494)"
        />
        <path
          className="by"
          d="M327.363,271.71a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1580.447 -1994.654)"
        />
        <path
          className="by"
          d="M337.266,295.938a1.551,1.551,0,1,1,0,2.192,1.552,1.552,0,0,1,0-2.192"
          transform="translate(1582.951 -1988.528)"
        />
        <path
          className="by"
          d="M335.5,253.017a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.546 -1999.339)"
        />
        <path
          className="by"
          d="M295.81,263.3a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1572.511 -1996.738)"
        />
        <path
          className="by"
          d="M384.409,245.978a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1594.911 -2001.119)"
        />
        <path
          className="by"
          d="M408.561,240.074a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1601.017 -2002.611)"
        />
        <path
          className="by"
          d="M348.115,239.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.735 -2002.812)"
        />
        <path
          className="by"
          d="M337.547,235.449a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1583.063 -2003.781)"
        />
        <path
          className="by"
          d="M326.47,242.3a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1580.299 -2002.011)"
        />
        <path
          className="by"
          d="M357.467,281.218a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1588.136 -1992.172)"
        />
        <path
          className="by"
          d="M342.719,309.485a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.407 -1985.025)"
        />
        <path
          className="by"
          d="M342.322,304.259a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.307 -1986.347)"
        />
        <path
          className="by"
          d="M335.264,241.934a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1582.523 -2002.104)"
        />
        <path
          className="by"
          d="M324.061,248.935a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1579.653 -2000.371)"
        />
        <path
          className="by"
          d="M349.275,275.273a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1586.028 -1993.712)"
        />
        <path
          className="by"
          d="M315.511,303.611a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1577.492 -1986.547)"
        />
        <path
          className="by"
          d="M330.072,309.234a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.173 -1985.126)"
        />
        <path
          className="by"
          d="M341.277,345.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1584.006 -1976.067)"
        />
        <path
          className="by"
          d="M298.316,283.956a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1573.144 -1991.517)"
        />
      </g>
      <g transform="translate(-1564.669 3244.99)">
        <path
          className="by"
          d="M170.785,443.272a2.985,2.985,0,1,1-2.984-2.984,2.985,2.985,0,0,1,2.984,2.984"
          transform="translate(1539.465 -1951.918)"
        />
        <path
          className="by"
          d="M109.615,294.106a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1524 -1989.631)"
        />
        <path
          className="by"
          d="M168.4,398.206a2.985,2.985,0,1,1-2.984-2.984,2.984,2.984,0,0,1,2.984,2.984"
          transform="translate(1538.863 -1963.312)"
        />
        <path
          className="by"
          d="M201.474,452.882a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1547.667 -1949.268)"
        />
        <path
          className="by"
          d="M132.99,427.64a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1530.352 -1955.65)"
        />
        <path
          className="by"
          d="M216.228,331.938a2.11,2.11,0,1,1-2.111-2.111,2.111,2.111,0,0,1,2.111,2.111"
          transform="translate(1551.397 -1979.846)"
        />
        <path
          className="by"
          d="M217.5,403.365a2.11,2.11,0,1,1-2.111-2.111,2.11,2.11,0,0,1,2.111,2.111"
          transform="translate(1551.719 -1961.787)"
        />
        <path
          className="by"
          d="M120.048,407.76a1.551,1.551,0,1,1-1.551-1.551,1.551,1.551,0,0,1,1.551,1.551"
          transform="translate(1527.363 -1960.534)"
        />
        <path
          className="by"
          d="M172.851,433.5a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1540.994 -1953.887)"
        />
        <path
          className="by"
          d="M127.24,426.621a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1529.463 -1955.625)"
        />
        <path
          className="by"
          d="M128.035,445.254a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1529.663 -1950.914)"
        />
        <path
          className="by"
          d="M138.216,440.489a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1952.119)"
        />
        <path
          className="by"
          d="M117,443.978a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1951.237)"
        />
        <path
          className="by"
          d="M179.9,382.236a1,1,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1542.775 -1966.847)"
        />
        <path
          className="by"
          d="M140.962,427.711a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1533.183 -1955.224)"
        />
        <path
          className="by"
          d="M135,434.189a.5.5,0,1,1-.5-.5.5.5,0,0,1,.5.5"
          transform="translate(1531.676 -1953.586)"
        />
        <path
          className="by"
          d="M138.216,421.417a.995.995,0,1,1-.995-.995.994.994,0,0,1,.995.995"
          transform="translate(1532.238 -1956.941)"
        />
        <path
          className="by"
          d="M117,325.683a.995.995,0,1,1-.995-.995.995.995,0,0,1,.995.995"
          transform="translate(1526.873 -1981.145)"
        />
        <path
          className="by"
          d="M131.659,378.449a1,1,0,1,1-1-.995,1,1,0,0,1,1,.995"
          transform="translate(1530.579 -1967.804)"
        />
        <path
          className="by"
          d="M314.188,314.252a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1577.01 -1984.004)"
        />
        <path
          className="by"
          d="M215.143,320.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1551.969 -1982.349)"
        />
        <path
          className="by"
          d="M284.006,347.8a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1569.379 -1975.522)"
        />
        <path
          className="by"
          d="M299.107,285.332a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1573.261 -1991.251)"
        />
        <path
          className="by"
          d="M329.684,351.606a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1580.992 -1974.496)"
        />
        <path
          className="by"
          d="M252.758,309.011a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.543 -1985.265)"
        />
        <path
          className="by"
          d="M324.665,374.541a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1579.765 -1968.656)"
        />
        <path
          className="by"
          d="M305.413,318.736a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1574.938 -1982.723)"
        />
        <path
          className="by"
          d="M332.8,355.848a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.863 -1973.34)"
        />
        <path
          className="by"
          d="M345.417,342.111a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.052 -1976.813)"
        />
        <path
          className="by"
          d="M334.848,338.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.38 -1977.782)"
        />
        <path
          className="by"
          d="M264.185,350a1,1,0,1,1,0,1.408,1,1,0,0,1,0-1.408"
          transform="translate(1564.515 -1974.819)"
        />
        <path
          className="by"
          d="M323.771,345.131a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1579.617 -1976.013)"
        />
        <path
          className="by"
          d="M354.768,384.049a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.454 -1966.174)"
        />
        <path
          className="by"
          d="M221.369,278.664a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1553.727 -1992.818)"
        />
        <path
          className="by"
          d="M332.565,344.765a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1581.84 -1976.106)"
        />
        <path
          className="by"
          d="M321.362,351.766a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1578.971 -1974.373)"
        />
        <path
          className="by"
          d="M346.576,378.1a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.346 -1967.714)"
        />
        <path
          className="by"
          d="M188.856,279.207a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.47 -1992.717)"
        />
        <path
          className="by"
          d="M327.374,412.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1580.491 -1959.127)"
        />
        <path
          className="by"
          d="M295.617,386.787a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1572.462 -1965.518)"
        />
        <path
          className="by"
          d="M408.683,357.681a2.985,2.985,0,1,1,0,4.222,2.987,2.987,0,0,1,0-4.222"
          transform="translate(1600.901 -1973.024)"
        />
        <path
          className="by"
          d="M456.948,323.179a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1613.103 -1981.747)"
        />
        <path
          className="by"
          d="M378.5,391.233a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1593.27 -1964.541)"
        />
        <path
          className="by"
          d="M385.884,416.008a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1595.136 -1958.278)"
        />
        <path
          className="by"
          d="M393.6,328.761a2.11,2.11,0,1,1,0,2.984,2.108,2.108,0,0,1,0-2.984"
          transform="translate(1597.152 -1980.272)"
        />
        <path
          className="by"
          d="M487.444,285.06a2.111,2.111,0,1,1,0,2.985,2.11,2.11,0,0,1,0-2.985"
          transform="translate(1620.878 -1991.32)"
        />
        <path
          className="by"
          d="M473.956,298.157a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1617.468 -1988.009)"
        />
        <path
          className="by"
          d="M347.253,352.441a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1585.434 -1974.285)"
        />
        <path
          className="by"
          d="M381.608,410.564a1.551,1.551,0,1,1,0,2.194,1.553,1.553,0,0,1,0-2.194"
          transform="translate(1594.161 -1959.548)"
        />
        <path
          className="by"
          d="M309.77,456.008a1.551,1.551,0,1,1,0,2.194,1.551,1.551,0,0,1,0-2.194"
          transform="translate(1575.999 -1948.059)"
        />
        <path
          className="by"
          d="M399.907,362.166a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1598.829 -1971.743)"
        />
        <path
          className="by"
          d="M387.6,409.564a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1595.719 -1959.76)"
        />
        <path
          className="by"
          d="M270.648,327.4a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1566.149 -1980.533)"
        />
        <path
          className="by"
          d="M358.68,393.43a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1588.406 -1963.839)"
        />
        <path
          className="by"
          d="M178.2,321.8a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1542.775 -1981.948)"
        />
        <path
          className="by"
          d="M355.562,401.441a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1587.655 -1961.776)"
        />
        <path
          className="by"
          d="M366.451,394.165a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1590.407 -1963.616)"
        />
        <path
          className="by"
          d="M294.676,323.992a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1572.261 -1981.358)"
        />
        <path
          className="by"
          d="M488.685,222.569a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1621.311 -2007)"
        />
        <path
          className="by"
          d="M204.545,419.647a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.473 -1957.173)"
        />
        <path
          className="by"
          d="M473.541,222.966a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1617.483 -2006.9)"
        />
        <path
          className="by"
          d="M384.759,414.531a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1595.036 -1958.467)"
        />
        <path
          className="by"
          d="M382.141,408.623a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1594.374 -1959.96)"
        />
        <path
          className="by"
          d="M367.391,407.975a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1590.608 -1960.161)"
        />
        <path
          className="by"
          d="M377.918,408.769a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1593.27 -1959.961)"
        />
        <path
          className="by"
          d="M196.75,342.9a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1547.466 -1976.613)"
        />
        <path
          className="by"
          d="M210.061,316.553a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1550.748 -1983.358)"
        />
        <path
          className="by"
          d="M225.794,307.058a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1554.809 -1985.676)"
        />
        <path
          className="by"
          d="M215.225,303.227a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1552.137 -1986.645)"
        />
        <path
          className="by"
          d="M204.148,310.078a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1549.373 -1984.875)"
        />
        <path
          className="by"
          d="M212.943,309.712a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1551.597 -1984.968)"
        />
        <path
          className="by"
          d="M201.739,316.713a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1548.727 -1983.235)"
        />
        <path
          className="by"
          d="M392.92,230.957a.995.995,0,1,1-.667,1.239.995.995,0,0,1,.667-1.239"
          transform="translate(1596.957 -2004.853)"
        />
        <path
          className="by"
          d="M252.166,410.685a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.394 -1959.559)"
        />
        <path
          className="by"
          d="M254.443,359.353a2.11,2.11,0,1,1,0,2.984,2.11,2.11,0,0,1,0-2.984"
          transform="translate(1561.969 -1972.537)"
        />
        <path
          className="by"
          d="M247.147,433.62a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1560.166 -1953.719)"
        />
        <path
          className="by"
          d="M255.286,414.927a.994.994,0,1,1,0,1.407.994.994,0,0,1,0-1.407"
          transform="translate(1562.265 -1958.404)"
        />
        <path
          className="by"
          d="M267.9,401.19a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.454 -1961.877)"
        />
        <path
          className="by"
          d="M282.63,353.854a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1569.178 -1973.845)"
        />
        <path
          className="by"
          d="M257.331,397.359a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1562.782 -1962.845)"
        />
        <path
          className="by"
          d="M246.255,404.21a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1560.018 -1961.076)"
        />
        <path
          className="by"
          d="M231.061,436.883a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1556.177 -1952.816)"
        />
        <path
          className="by"
          d="M277.251,443.128a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1567.855 -1951.237)"
        />
        <path
          className="by"
          d="M255.048,403.844a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1562.242 -1961.169)"
        />
        <path
          className="by"
          d="M243.845,410.845a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1559.372 -1959.436)"
        />
        <path
          className="by"
          d="M189.65,410.358a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1545.671 -1959.559)"
        />
        <path
          className="by"
          d="M269.059,437.183a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1565.747 -1952.777)"
        />
        <path
          className="by"
          d="M460.894,222.715a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1614.248 -2007)"
        />
        <path
          className="by"
          d="M472.1,258.546a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1617.081 -1997.941)"
        />
        <path
          className="by"
          d="M390.111,430.217a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1596.352 -1954.538)"
        />
        <path
          className="by"
          d="M192.892,225.272a.96.96,0,1,1-.852,1.057.961.961,0,0,1,.852-1.057"
          transform="translate(1546.347 -2006.281)"
        />
        <path
          className="by"
          d="M606.622,335.271a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.016 -1978.47)"
        />
        <path
          className="by"
          d="M625.752,362.226a3.967,3.967,0,1,1-3.521,4.367,3.966,3.966,0,0,1,3.521-4.367"
          transform="translate(1655.106 -1971.66)"
        />
        <path
          className="by"
          d="M612.73,394.017a3.967,3.967,0,1,1-3.52,4.367,3.966,3.966,0,0,1,3.52-4.367"
          transform="translate(1651.814 -1963.623)"
        />
        <path
          className="by"
          d="M612.518,384.972a2.061,2.061,0,1,1-1.829,2.269,2.06,2.06,0,0,1,1.829-2.269"
          transform="translate(1652.191 -1965.906)"
        />
        <path
          className="by"
          d="M619.431,389a1.322,1.322,0,1,1-1.174,1.456A1.322,1.322,0,0,1,619.431,389"
          transform="translate(1654.105 -1964.887)"
        />
        <path
          className="by"
          d="M602.959,348.184a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.941 -1975.206)"
        />
        <path
          className="by"
          d="M592.939,353.928a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1647.557 -1973.753)"
        />
        <path
          className="by"
          d="M610.273,355.481a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1651.939 -1973.36)"
        />
        <path
          className="by"
          d="M612.231,391.821a.661.661,0,1,1-.586.728.66.66,0,0,1,.586-.728"
          transform="translate(1652.435 -1964.173)"
        />
        <path
          className="by"
          d="M614.448,383.524a.661.661,0,1,1-.586.728.661.661,0,0,1,.586-.728"
          transform="translate(1652.995 -1966.271)"
        />
        <path
          className="by"
          d="M599.842,370.5a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1649.153 -1969.565)"
        />
        <path
          className="by"
          d="M610.071,380.1a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1651.739 -1967.137)"
        />
        <path
          className="by"
          d="M604.8,412.458a1.322,1.322,0,1,1-1.174,1.456,1.322,1.322,0,0,1,1.174-1.456"
          transform="translate(1650.407 -1958.956)"
        />
        <path
          className="by"
          d="M294.089,269.747a2.985,2.985,0,1,1,0,4.221,2.985,2.985,0,0,1,0-4.221"
          transform="translate(1571.928 -1995.256)"
        />
        <path
          className="by"
          d="M332.382,248.775a2.111,2.111,0,1,1,0,2.984,2.111,2.111,0,0,1,0-2.984"
          transform="translate(1581.674 -2000.494)"
        />
        <path
          className="by"
          d="M327.363,271.71a1.551,1.551,0,1,1,0,2.194,1.552,1.552,0,0,1,0-2.194"
          transform="translate(1580.447 -1994.654)"
        />
        <path
          className="by"
          d="M337.266,295.938a1.551,1.551,0,1,1,0,2.192,1.552,1.552,0,0,1,0-2.192"
          transform="translate(1582.951 -1988.528)"
        />
        <path
          className="by"
          d="M335.5,253.017a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1582.546 -1999.339)"
        />
        <path
          className="by"
          d="M295.81,263.3a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1572.511 -1996.738)"
        />
        <path
          className="by"
          d="M384.409,245.978a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1594.911 -2001.119)"
        />
        <path
          className="by"
          d="M408.561,240.074a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1601.017 -2002.611)"
        />
        <path
          className="by"
          d="M348.115,239.28a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1585.735 -2002.812)"
        />
        <path
          className="by"
          d="M337.547,235.449a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1583.063 -2003.781)"
        />
        <path
          className="by"
          d="M326.47,242.3a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1580.299 -2002.011)"
        />
        <path
          className="by"
          d="M357.467,281.218a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1588.136 -1992.172)"
        />
        <path
          className="by"
          d="M342.719,309.485a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.407 -1985.025)"
        />
        <path
          className="by"
          d="M342.322,304.259a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1584.307 -1986.347)"
        />
        <path
          className="by"
          d="M335.264,241.934a.5.5,0,1,1,0,.7.5.5,0,0,1,0-.7"
          transform="translate(1582.523 -2002.104)"
        />
        <path
          className="by"
          d="M324.061,248.935a.995.995,0,1,1,0,1.407.995.995,0,0,1,0-1.407"
          transform="translate(1579.653 -2000.371)"
        />
        <path
          className="by"
          d="M349.275,275.273a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1586.028 -1993.712)"
        />
        <path
          className="by"
          d="M315.511,303.611a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1577.492 -1986.547)"
        />
        <path
          className="by"
          d="M330.072,309.234a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1581.173 -1985.126)"
        />
        <path
          className="by"
          d="M341.277,345.065a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1584.006 -1976.067)"
        />
        <path
          className="by"
          d="M298.316,283.956a.995.995,0,1,1,0,1.407,1,1,0,0,1,0-1.407"
          transform="translate(1573.144 -1991.517)"
        />
      </g>
      <rect
        className="ns"
        width={0.073}
        height={0.21}
        transform="translate(721.815 1166.329)"
      />
      <path
        className="nt"
        d="M347.888,727.329h-.008l-.065.21a1.441,1.441,0,0,0,.073-.21"
        transform="translate(374 439)"
      />
      <rect
        className="c"
        width={0.073}
        height={0.21}
        transform="translate(721.815 1166.329)"
      />
      <rect
        className="nu"
        width={1080}
        height={1233}
        transform="translate(0 979)"
      />
      <g transform="translate(0 8.204)">
        <rect
          className="nv"
          width={1080}
          height={291}
          transform="translate(0 1912.796)"
        />
        <g className="ry" transform="matrix(1, 0, 0, 1, 0, -8.2)">
          <rect
            className="nw"
            width={1080}
            height={17}
            transform="translate(0 1913)"
          />
        </g>
      </g>
      <Link to="/wallet">
      <g transform="translate(890.687 1967.094)">
        <path
          className="nx"
          d="M52.294,125.589c-11.056,0-19.807,0-26.664-.921-7.05-.95-12.758-2.947-17.263-7.446S1.871,107.008.92,99.959C0,93.108,0,84.351,0,73.295v-.673C0,61.566,0,52.814.914,45.957c.95-7.05,2.947-12.758,7.447-17.263a22.922,22.922,0,0,1,7.183-4.845l1.419-3.315c1.66-5.157,4.271-8.683,9.248-9.9C30.928,9.118,41.3,6.885,47.861,5.673c3-3.825,6.422-5.992,11.163-5.634C64.088.05,75,1.178,81.576,2.062c17.925,2.409,22.453,3.188,24.573,5.5s-5.45,15.761-5.45,15.761c-.159-.035-.4-.09-.694-.161a23.491,23.491,0,0,1,8.919,5.531q.733.74,1.4,1.54c4.535,5.456,4.8,13.076,4.8,20.179.1,0,.194.008.289.013a11.441,11.441,0,0,1,10.875,10.448c.024.385.024.8.024,1.185V86.865c0,.385,0,.8-.024,1.185A11.437,11.437,0,0,1,115.414,98.5q-.242.013-.5.019h.2c0,5.1-.325,10.406-3.031,14.737a23.132,23.132,0,0,1-3.164,3.97c-4.505,4.5-10.213,6.5-17.263,7.446-6.851.921-15.609.921-26.664.921ZM114.21,50.4h0Z"
          transform="translate(0 3.695)"
        />
        <g transform="translate(0 0)">
          <g transform="translate(0 0)">
            <path
              className="ny"
              d="M4.892,13.265A4.36,4.36,0,0,1,9.235,8.886H32.428a4.382,4.382,0,0,1,0,8.764H9.235a4.367,4.367,0,0,1-4.343-4.385"
              transform="translate(12.503 38.51)"
            />
            <path
              className="nz"
              d="M4.886,11.507,0,18.006H27.785c11.055,0,19.813,0,26.664.92,1.379.18,7.763,1.8,9.038,2.076,0,0,5.449-10.46,3.329-12.773s-5.3-3.759-23.226-6.168C37.011,1.178,26.1.05,21.038.038,15.931-.347,12.357,2.2,9.184,6.592"
              transform="matrix(0.951, -0.309, 0.309, 0.951, 6.191, 20.798)"
            />
            <path
              className="oa"
              d="M0,17.161A125.556,125.556,0,0,1,7.121,5.982c1.33-1.795,3.062-4.181,5.223-5.2s4.581-1.051,14.623,0,20.275,2.5,25.353,3.469c2.754.578,5.274.732,5.033,2.891-.434,3.948-5.62,11.854-5.62,11.854"
              transform="translate(13.97 23.328) rotate(-17)"
            />
            <path
              className="ob"
              d="M27.29,11.044l-6.1,8.331H48.973c11.055,0,19.813,0,26.664.92,1.379.18,7.763,1.8,9.038,2.076,0,0,7.57-13.448,5.45-15.761s-6.648-3.092-24.574-5.5C58.973.225,48.064-.9,43-.915,37.893-1.3,34.319,1.247,31.146,5.639"
              transform="translate(16.024 4.647)"
            />
            <path
              className="oc"
              d="M2513.1-494.936a125.586,125.586,0,0,1,7.122-11.179c1.33-1.795,3.062-4.181,5.223-5.2s4.581-1.051,14.623,0,20.275,2.5,25.353,3.469c2.754.578,5.274.732,5.033,2.891-.434,3.948-5.62,11.854-5.62,11.854"
              transform="translate(-2470.461 520.65)"
            />
            <path
              className="od"
              d="M117.125,35.086c0-7.1-.265-14.724-4.8-20.18q-.667-.8-1.4-1.54c-4.505-4.5-10.213-6.5-17.263-7.446C86.8,5,78.052,5,67,5h-12.7c-11.055,0-19.813,0-26.67.92-7.049.95-12.758,2.947-17.263,7.446S3.865,23.58,2.914,30.629C2,37.486,2,46.238,2,57.293v.674c0,11.055,0,19.813.92,26.664.95,7.049,2.947,12.758,7.446,17.263s10.213,6.5,17.263,7.446c6.857.92,15.609.92,26.664.92H67c11.055,0,19.813,0,26.664-.92,7.049-.95,12.758-2.947,17.263-7.446a23.073,23.073,0,0,0,3.164-3.97c2.707-4.331,3.032-9.636,3.032-14.736l-.9.006H99.532c-13.66,0-25.353-10.442-25.353-24.06s11.693-24.06,25.353-24.06h16.679q.475,0,.908.012"
              transform="translate(-2 19.022)"
            />
            <path
              className="oe"
              d="M100.927,30.1c0-5.925-.227-12.282-4.125-16.833q-.573-.667-1.2-1.284C91.727,8.226,86.822,6.56,80.764,5.768,74.872,5,67.352,5,57.852,5H46.936c-9.5,0-17.025,0-22.918.768-6.058.793-10.963,2.458-14.834,6.211S3.6,20.5,2.786,26.378C2,32.1,2,39.4,2,48.62v.562c0,9.222,0,16.527.791,22.241.817,5.88,2.533,10.642,6.4,14.4s8.776,5.419,14.834,6.211c5.892.768,13.413.768,22.912.768H57.852c9.5,0,17.025,0,22.912-.768,6.058-.793,10.963-2.458,14.834-6.211a19.353,19.353,0,0,0,2.719-3.311c2.326-3.612,2.6-8.038,2.6-12.292l-.775.005L87.33,66.1c-11.738,0-15.3-2.647-15.3-14.006s2.038-22.007,13.776-22.007h14.333q.408,0,.78.01"
              transform="translate(6.8 28.578)"
            />
            <path
              className="of"
              d="M57.235,10.025q-.565-.03-1.2-.024H39.353C25.693,10,14,20.443,14,34.06S25.693,58.12,39.353,58.12H56.032q.638.006,1.2-.024A11.437,11.437,0,0,0,68.11,47.648c.024-.385.024-.8.024-1.185V21.658c0-.385,0-.8-.024-1.185A11.442,11.442,0,0,0,57.235,10.025M37.885,40.478a6.418,6.418,0,1,0-6.376-6.418,6.393,6.393,0,0,0,6.376,6.418"
              transform="translate(58.179 44.096)"
            />
          </g>
          <ellipse
            className="og"
            cx={7.746}
            cy={8.153}
            rx={7.746}
            ry={8.153}
            transform="translate(87.957 69.947)"
          />
        </g>
      </g>
      <g className="rx" transform="matrix(1, 0, 0, 1, 0, 0)">
        <text className="oi" transform="translate(896 2157.79)">
          <tspan x={0} y={0}>
            {"Wallet"}
          </tspan>
        </text>
      </g>
      </Link>
      <path
        className="oh"
        d="M25.452-2521.422l105.1,1937.983H-153.781L-228.707-2503.4Z"
        transform="translate(106.3 1675.264) rotate(45)"
      />
      <path
        className="oh"
        d="M25.452-2521.422l105.1,2822.077H-153.781l-74.926-2795.838Z"
        transform="translate(53.3 1158.264) rotate(45)"
      />
      <path
        className="oh"
        d="M25.452-2521.422l105.1,2190.648H-153.781l-74.926-2170.28Z"
        transform="translate(-365.7 943.264) rotate(45)"
      />
      <path
        className="oh"
        d="M25.452-2521.422l105.1,2190.648H-153.781l-74.926-2170.28Z"
        transform="translate(241.3 2149.106) rotate(45)"
      />
      <Link to="/trade">
      <g className="rw" transform="matrix(1, 0, 0, 1, 0, 0)">
        <text className="oi" transform="translate(627 2157.79)">
          <tspan x={0} y={0}>
            {"Trade"}
          </tspan>
        </text>
      </g>
      <g transform="translate(603.532 1965.26)">
        <path
          className="nz"
          d="M271.64,62.186m-38.914,0A38.914,38.914,0,1,0,271.64,23.272a38.914,38.914,0,0,0-38.914,38.914Z"
          transform="translate(-200.299 -20.029)"
        />
        <path
          className="oj"
          d="M251.611,84.313a42.156,42.156,0,1,1,42.156-42.156,42.072,42.072,0,0,1-42.156,42.156Zm0-77.827a35.671,35.671,0,1,0,35.671,35.671A35.568,35.568,0,0,0,251.611,6.486Z"
          transform="translate(-180.27)"
        />
        <path
          className="ok"
          d="M290.947,133.11,340.562,83.5a36.612,36.612,0,0,0-13.944-11.35L279.273,119.49a36.437,36.437,0,0,0,11.674,13.62Zm20.754,6.81a35.568,35.568,0,0,0,35.671-35.671,37.691,37.691,0,0,0-2.594-13.62l-46.7,46.7a37.691,37.691,0,0,0,13.62,2.594Z"
          transform="translate(-240.359 -62.093)"
        />
        <path
          className="ok"
          d="M351.76,142.305m-25.942,0a25.942,25.942,0,1,0,25.942-25.942A25.942,25.942,0,0,0,325.818,142.305Z"
          transform="translate(-280.419 -100.149)"
        />
        <path
          className="ol"
          d="M331.73,96.334a25.942,25.942,0,1,1-25.942,25.942A26.019,26.019,0,0,1,331.73,96.334m0-3.243a29.185,29.185,0,1,0,29.185,29.185A29.064,29.064,0,0,0,331.73,93.091Z"
          transform="translate(-260.389 -80.12)"
        />
        <path
          className="nz"
          d="M329.061,145.549A26.019,26.019,0,0,1,355,119.607a24.8,24.8,0,0,1,16.538,6.161,24.768,24.768,0,0,0-19.781-9.4,26.019,26.019,0,0,0-25.942,25.942,24.768,24.768,0,0,0,9.4,19.781A24.8,24.8,0,0,1,329.061,145.549Z"
          transform="translate(-280.419 -100.15)"
        />
        <path
          className="ob"
          d="M365.228,125.673,332.8,158.1a26.881,26.881,0,0,0,11.026,14.268L379.5,136.7a23.2,23.2,0,0,0-14.268-11.026Z"
          transform="translate(-286.428 -108.162)"
        />
        <path
          className="ok"
          d="M365.285,125.615a26.4,26.4,0,0,1,14.593,5.837,26.539,26.539,0,0,0-12.323-8.107l-2.27,2.27ZM343.234,168.1A25.472,25.472,0,0,1,337.4,153.5l-2.27,2.27a23.012,23.012,0,0,0,8.107,12.323Z"
          transform="translate(-288.431 -106.158)"
        />
        <path
          className="ob"
          d="M475.946,290.431a26.019,26.019,0,0,0,25.942-25.942,39.729,39.729,0,0,0-.649-6.161l-31.131,31.131a16.961,16.961,0,0,0,5.837.973Z"
          transform="translate(-404.605 -222.332)"
        />
        <path
          className="oj"
          d="M435.123,179.123h-6.486a3.243,3.243,0,0,1,0-6.486h9.728a3.243,3.243,0,0,0,0-6.486h-3.243a3.243,3.243,0,1,0-6.486,0,9.728,9.728,0,0,0,0,19.457h6.486a3.243,3.243,0,0,1,0,6.486H425.4a3.243,3.243,0,1,0,0,6.486h3.243a3.243,3.243,0,0,0,6.486,0,9.728,9.728,0,0,0,0-19.457Z"
          transform="translate(-360.539 -140.21)"
        />
        <path
          className="om"
          d="M62.185,481.1m-38.914,0a38.914,38.914,0,1,0,38.914-38.914A38.914,38.914,0,0,0,23.272,481.1Z"
          transform="translate(-20.029 -380.569)"
        />
        <path
          className="oj"
          d="M42.156,503.223a42.156,42.156,0,1,1,42.156-42.156A42.072,42.072,0,0,1,42.156,503.223Zm0-77.827a35.671,35.671,0,1,0,35.671,35.671A35.568,35.568,0,0,0,42.156,425.4Z"
          transform="translate(0 -360.539)"
        />
        <path
          className="on"
          d="M81.492,552.019,131.107,502.4a36.612,36.612,0,0,0-13.944-11.35L69.818,538.4a36.438,36.438,0,0,0,11.674,13.62Zm20.754,6.81a35.568,35.568,0,0,0,35.671-35.671,37.691,37.691,0,0,0-2.594-13.62l-46.7,46.7a37.691,37.691,0,0,0,13.62,2.594Z"
          transform="translate(-60.09 -422.631)"
        />
        <path
          className="on"
          d="M142.305,561.215m-25.942,0a25.942,25.942,0,1,0,25.942-25.942A25.942,25.942,0,0,0,116.363,561.215Z"
          transform="translate(-100.149 -460.689)"
        />
        <path
          className="oo"
          d="M122.275,515.243a25.942,25.942,0,1,1-25.942,25.942,26.019,26.019,0,0,1,25.942-25.942m0-3.243a29.185,29.185,0,1,0,29.185,29.185A29.064,29.064,0,0,0,122.275,512Z"
          transform="translate(-80.119 -440.659)"
        />
        <path
          className="op"
          d="M119.606,564.458a26.019,26.019,0,0,1,25.942-25.942,24.8,24.8,0,0,1,16.538,6.161,24.768,24.768,0,0,0-19.781-9.4,26.019,26.019,0,0,0-25.942,25.942,24.768,24.768,0,0,0,9.4,19.781A24.8,24.8,0,0,1,119.606,564.458Z"
          transform="translate(-100.149 -460.688)"
        />
        <path
          className="oq"
          d="M155.774,544.582,123.346,577.01a26.881,26.881,0,0,0,11.026,14.268l35.671-35.671a23.2,23.2,0,0,0-14.268-11.026Z"
          transform="translate(-106.159 -468.7)"
        />
        <path
          className="on"
          d="M155.831,544.524a26.4,26.4,0,0,1,14.593,5.837,26.54,26.54,0,0,0-12.323-8.107l-2.27,2.27ZM133.78,587a25.472,25.472,0,0,1-5.837-14.593l-2.27,2.27A23.012,23.012,0,0,0,133.78,587Z"
          transform="translate(-108.162 -466.697)"
        />
        <path
          className="oq"
          d="M266.491,709.34A26.019,26.019,0,0,0,292.434,683.4a39.736,39.736,0,0,0-.649-6.161l-31.131,31.131a16.96,16.96,0,0,0,5.837.973Z"
          transform="translate(-224.335 -582.87)"
        />
        <path
          className="oj"
          d="M234.1,599.653a13.591,13.591,0,0,0,1.3-4.864,9.555,9.555,0,0,0-9.728-9.728,3.243,3.243,0,1,0-6.486,0H212.7a3.243,3.243,0,1,0,0,6.486V611a3.243,3.243,0,1,0,0,6.486h6.486a3.243,3.243,0,1,0,6.486,0h3.243a9.65,9.65,0,0,0,5.188-17.835Zm-8.431-8.107a3.243,3.243,0,1,1,0,6.486h-6.486v-6.486ZM228.911,611h-9.728v-6.486h9.728a3.243,3.243,0,1,1,0,6.486Z"
          transform="translate(-180.269 -500.748)"
        />
        <path
          className="or"
          d="M481.1,411.277m-38.914,0A38.914,38.914,0,1,0,481.1,372.363a38.913,38.913,0,0,0-38.914,38.914Z"
          transform="translate(-380.569 -320.478)"
        />
        <path
          className="oj"
          d="M461.066,433.4a42.156,42.156,0,1,1,42.156-42.156A42.072,42.072,0,0,1,461.066,433.4Zm0-77.827a35.671,35.671,0,1,0,35.671,35.671A35.568,35.568,0,0,0,461.066,355.578Z"
          transform="translate(-360.539 -300.45)"
        />
        <path
          className="os"
          d="M500.4,482.2l49.615-49.615a36.612,36.612,0,0,0-13.944-11.35l-47.345,47.345A36.438,36.438,0,0,0,500.4,482.2Zm20.754,6.81a35.568,35.568,0,0,0,35.671-35.671,37.691,37.691,0,0,0-2.594-13.62l-46.7,46.7a37.691,37.691,0,0,0,13.62,2.594Z"
          transform="translate(-420.628 -362.542)"
        />
        <path
          className="os"
          d="M561.215,491.4m-25.942,0a25.942,25.942,0,1,0,25.942-25.942A25.942,25.942,0,0,0,535.273,491.4Z"
          transform="translate(-460.689 -400.598)"
        />
        <path
          className="ot"
          d="M541.185,445.425a25.942,25.942,0,1,1-25.942,25.942,26.019,26.019,0,0,1,25.942-25.942m0-3.243a29.185,29.185,0,1,0,29.185,29.185A29.064,29.064,0,0,0,541.185,442.182Z"
          transform="translate(-440.658 -380.569)"
        />
        <path
          className="or"
          d="M538.515,494.64A26.019,26.019,0,0,1,564.457,468.7,24.8,24.8,0,0,1,581,474.858a24.768,24.768,0,0,0-19.781-9.4A26.019,26.019,0,0,0,535.272,491.4a24.768,24.768,0,0,0,9.4,19.781A24.8,24.8,0,0,1,538.515,494.64Z"
          transform="translate(-460.688 -400.598)"
        />
        <path
          className="ou"
          d="M574.683,474.764l-32.428,32.428a26.88,26.88,0,0,0,11.026,14.268l35.671-35.671a23.2,23.2,0,0,0-14.268-11.026Z"
          transform="translate(-466.698 -408.611)"
        />
        <path
          className="ov"
          d="M574.74,474.706a26.4,26.4,0,0,1,14.593,5.837,26.539,26.539,0,0,0-12.323-8.107Zm-22.051,42.481a25.472,25.472,0,0,1-5.837-14.593l-2.27,2.27A23.011,23.011,0,0,0,552.689,517.187Z"
          transform="translate(-468.701 -406.607)"
        />
        <path
          className="ou"
          d="M685.4,639.522a26.019,26.019,0,0,0,25.942-25.942,39.733,39.733,0,0,0-.649-6.161l-31.131,31.131a16.96,16.96,0,0,0,5.837.973Z"
          transform="translate(-584.875 -522.781)"
        />
        <path
          className="oj"
          d="M654.306,528.214,641.334,534.7l-12.971-6.486L641.334,512Z"
          transform="translate(-540.808 -440.658)"
        />
        <path
          className="ow"
          d="M628.364,651.636l12.971,6.486,12.971-6.486-12.971,19.457Z"
          transform="translate(-540.808 -560.838)"
        />
      </g>
      </Link>
      <Link to="/earn">
      <g transform="translate(29.794 1976.826)">
        <g transform="translate(31.852 4.547)">
          <path
            className="om"
            d="M83.512,502.422m-60.24,0a60.24,60.24,0,1,0,60.24-60.24,60.24,60.24,0,0,0-60.24,60.24Z"
            transform="translate(-20.227 -439.137)"
          />
          <path
            className="oj"
            d="M65.285,547.48C29.141,547.48,2,520.339,2,484.195S29.141,420.91,65.285,420.91s63.285,27.141,63.285,63.285S101.429,547.48,65.285,547.48Zm0-118.5a55.22,55.22,0,1,0,55.22,55.22,55.061,55.061,0,0,0-55.22-55.22Z"
            transform="translate(-2 -420.91)"
          />
          <path
            className="on"
            d="M87.89,585.43,164.7,508.624a56.676,56.676,0,0,0-21.586-17.57L69.818,564.346c4.016,8.534,10.542,15.562,18.072,21.084Zm32.128,10.542a55.061,55.061,0,0,0,55.22-55.22,58.346,58.346,0,0,0-4.016-21.084L98.934,591.956a58.348,58.348,0,0,0,21.084,4.016Z"
            transform="translate(-56.733 -477.467)"
          />
          <path
            className="on"
            d="M156.523,575.433m-40.16,0a40.16,40.16,0,1,0,40.16-40.16A40.16,40.16,0,0,0,116.363,575.433Z"
            transform="translate(-93.238 -512.148)"
          />
          <path
            className="oo"
            d="M138.27,517.02a40.16,40.16,0,1,1-40.16,40.16,40.278,40.278,0,0,1,40.16-40.16m0-5.02a45.18,45.18,0,1,0,45.18,45.18A44.992,44.992,0,0,0,138.27,512Z"
            transform="translate(-74.985 -493.895)"
          />
          <path
            className="op"
            d="M121.383,580.452a40.278,40.278,0,0,1,40.16-40.16,38.4,38.4,0,0,1,25.6,9.538,38.342,38.342,0,0,0-30.622-14.558,40.278,40.278,0,0,0-40.16,40.16,38.343,38.343,0,0,0,14.558,30.622A38.4,38.4,0,0,1,121.383,580.452Z"
            transform="translate(-93.238 -512.147)"
          />
          <path
            className="oq"
            d="M173.546,544.582l-50.2,50.2a41.612,41.612,0,0,0,17.068,22.088l55.22-55.22a35.908,35.908,0,0,0-22.088-17.068Z"
            transform="translate(-98.715 -519.449)"
          />
          <path
            className="on"
            d="M172.359,545.768c8.534.5,16.064,4.016,22.59,9.036a41.084,41.084,0,0,0-19.076-12.55l-3.514,3.514ZM138.223,611.53a39.432,39.432,0,0,1-9.036-22.59l-3.514,3.514a35.623,35.623,0,0,0,12.55,19.076Z"
            transform="translate(-101.042 -517.121)"
          />
          <path
            className="oq"
            d="M269.69,726.934a40.278,40.278,0,0,0,40.16-40.16,61.507,61.507,0,0,0-1-9.538l-48.192,48.192a26.256,26.256,0,0,0,9.036,1.506Z"
            transform="translate(-206.405 -623.489)"
          />
        </g>
        <path
          className="ox"
          d="M150.753,228.256l1.348.449-1.348.449a20.39,20.39,0,0,0-15.282,15.282l-.449,1.348-.449-1.348a20.39,20.39,0,0,0-15.282-15.282l-1.348-.449,2.247-.449a20.39,20.39,0,0,0,15.282-15.282l.449-1.348.449,1.348a19.321,19.321,0,0,0,14.383,15.282Zm-12.135,33.26.9.45-.9.449a15.069,15.069,0,0,0-11.237,11.237l-.449.9-.449-.9a15.069,15.069,0,0,0-11.237-11.237l-.9-.449.9-.45a15.069,15.069,0,0,0,11.237-11.237l.449-.9.449.9A15.786,15.786,0,0,0,138.618,261.517Z"
          transform="translate(-114.347 -211.626)"
        />
        <path
          className="oy"
          d="M38.017,192c-10.457,0-19.588,6.366-24.671,11.812L3.2,196.135c-1.41-1.067-3.515.07-3.154,1.7L2.852,210.6.041,223.354c-.36,1.634,1.745,2.77,3.154,1.7l10.15-7.677c5.082,5.445,14.215,11.811,24.672,11.811,15.976,0,28.928-14.877,28.928-18.6S53.993,192,38.017,192Zm10.161,21.385a2.789,2.789,0,1,1,2.789-2.789A2.79,2.79,0,0,1,48.178,213.385Z"
          transform="translate(62.288 -141.781)"
        />
        <path
          className="oo"
          d="M38.017,192c-10.457,0-19.588,6.366-24.671,11.812L3.2,196.135c-1.41-1.067-3.515.07-3.154,1.7L2.852,210.6.041,223.354c-.36,1.634,1.745,2.77,3.154,1.7l10.15-7.677c5.082,5.445,14.215,11.811,24.672,11.811,15.976,0,28.928-14.877,28.928-18.6S53.993,192,38.017,192Zm10.161,21.385a2.789,2.789,0,1,1,2.789-2.789A2.79,2.79,0,0,1,48.178,213.385Z"
          transform="translate(62.288 -144.806)"
        />
        <path
          className="oz"
          d="M138.618,262.191l.9.449-.9.449a15.069,15.069,0,0,0-11.237,11.237l-.449.9-.449-.9a15.069,15.069,0,0,0-11.237-11.237l-.9-.449.9-.449a15.069,15.069,0,0,0,11.237-11.237l.449-.9.449.9A15.786,15.786,0,0,0,138.618,262.191Z"
          transform="translate(51.689 -187.131)"
        />
        <path
          className="oz"
          d="M132.751,259.257l.682.341-.682.341a11.426,11.426,0,0,0-8.52,8.52l-.341.682-.341-.682a11.426,11.426,0,0,0-8.52-8.52l-.682-.341.682-.341a11.426,11.426,0,0,0,8.52-8.52l.341-.682.341.682A11.97,11.97,0,0,0,132.751,259.257Z"
          transform="translate(46.777 -221.947)"
        />
      </g>
      <g className="rv" transform="matrix(1, 0, 0, 1, 0, 0)">
        <text className="oi" transform="translate(82.9 2157.79)">
          <tspan x={0} y={0}>
            {"Earn"}
          </tspan>
        </text>
      </g>
      </Link>
      <Link to="/invite">
      <g className="ru" transform="matrix(1, 0, 0, 1, 0, 0)">
        <text className="oi" transform="translate(349 2157.79)">
          <tspan x={0} y={0}>
            {"Invite"}
          </tspan>
        </text>
      </g>
      <g transform="translate(339.72 1974.367)">
        <g className="pa" transform="translate(0 0)">
          <path
            className="rj"
            d="M 120.0600128173828 123.1263122558594 L 7.442110061645508 123.1263122558594 C 5.786829948425293 123.1263122558594 4.182590007781982 122.7770538330078 2.673929929733276 122.0882110595703 C 1.243489980697632 121.4350891113281 -0.03434999287128448 120.5072326660156 -1.124109983444214 119.3304138183594 C -3.301069974899292 116.9795150756836 -4.499989986419678 113.8777542114258 -4.499989986419678 110.5965118408203 L -4.499989986419678 45.95669174194336 L -4.499989986419678 42.31439208984375 L -4.499989986419678 41.68351364135742 L -4.499989986419678 39.24933242797852 L -2.462689876556396 37.91719055175781 L 6.870610237121582 31.81440544128418 L 6.870610237121582 21.37951278686523 L 6.870610237121582 16.87951278686523 L 11.37061023712158 16.87951278686523 L 12.79261016845703 16.87951278686523 L 12.79261016845703 14.71139240264893 L 12.79261016845703 10.21139240264893 L 17.29261016845703 10.21139240264893 L 18.94411087036133 10.21139240264893 L 18.94411087036133 7.943412303924561 L 18.94411087036133 3.443412303924561 L 23.44411087036133 3.443412303924561 L 50.26266098022461 3.443412303924561 L 61.28881072998047 -3.766307592391968 L 63.75033187866211 -5.375827789306641 L 66.21254730224609 -3.767387628555298 L 77.25096893310547 3.443412303924561 L 104.1444091796875 3.443412303924561 L 108.6444091796875 3.443412303924561 L 108.6444091796875 7.943412303924561 L 108.6444091796875 10.21139240264893 L 110.3103103637695 10.21139240264893 L 114.8103103637695 10.21139240264893 L 114.8103103637695 14.71139240264893 L 114.8103103637695 16.87951278686523 L 116.0028076171875 16.87951278686523 L 120.5028076171875 16.87951278686523 L 120.5028076171875 21.37951278686523 L 120.5028076171875 31.69805335998535 L 130.0208892822266 37.91621398925781 L 132.0597076416016 39.24817276000977 L 132.0597076416016 41.68351364135742 L 132.0597076416016 106.3233108520508 C 132.0597076416016 106.7328414916992 132.0403594970703 107.1467361450195 132.0021057128906 107.5574417114258 L 132.0021057128906 110.5965118408203 C 132.0021057128906 117.5054702758789 126.6449127197266 123.1263122558594 120.0600128173828 123.1263122558594 Z"
          />
          <path
            className="rk"
            d="M 120.0599975585938 118.6263046264648 C 124.1613006591797 118.6263046264648 127.5020980834961 115.0271987915039 127.5020980834961 110.5965042114258 L 127.5020980834961 107.3268051147461 C 127.5399017333984 106.9974060058594 127.559700012207 106.6626052856445 127.559700012207 106.3233032226562 L 127.559700012207 41.68350219726562 L 116.002799987793 34.13340377807617 L 116.002799987793 21.37950325012207 L 110.310302734375 21.37950325012207 L 110.310302734375 14.71140193939209 L 104.144401550293 14.71140193939209 L 104.144401550293 7.943402290344238 L 75.91139984130859 7.943402290344238 L 63.75149917602539 2.313232471351512e-06 L 51.60329818725586 7.943402290344238 L 23.44409942626953 7.943402290344238 L 23.44409942626953 14.71140193939209 L 17.29260063171387 14.71140193939209 L 17.29260063171387 21.37950325012207 L 11.3705997467041 21.37950325012207 L 11.3705997467041 34.24860382080078 L 6.103512362187757e-09 41.68350219726562 L 6.103512362187757e-09 110.5965042114258 C 6.103512362187757e-09 115.0271987915039 3.3264000415802 118.6263046264648 7.442100048065186 118.6263046264648 L 120.0599975585938 118.6263046264648 M 120.0599975585938 127.6263046264648 L 7.442100048065186 127.6263046264648 C -1.624099969863892 127.6263046264648 -9 119.9867782592773 -9 110.5965042114258 L -9 42.31440353393555 C -9 39.27680206298828 -7.467724800109863 35.81322860717773 -4.925374984741211 34.15085220336914 L 2.370599985122681 29.38022994995117 L 2.370599985122681 21.37950325012207 C 2.370599985122681 17.41827201843262 4.92974853515625 14.054762840271 8.484882354736328 12.85209274291992 C 9.158288955688477 9.645962715148926 11.53841876983643 7.067765235900879 14.63065719604492 6.111563205718994 C 15.47679805755615 2.019393682479858 19.10121726989746 -1.056597709655762 23.44409942626953 -1.056597709655762 L 48.92202377319336 -1.056597709655762 L 58.82609939575195 -7.532622814178467 C 61.81705856323242 -9.488325119018555 65.68173980712891 -9.489194869995117 68.67357635498047 -7.534797668457031 L 78.59052276611328 -1.056597709655762 L 104.144401550293 -1.056597709655762 C 108.4854583740234 -1.056597709655762 112.1087493896484 2.017221450805664 112.9568634033203 6.106823921203613 C 116.0848617553711 7.067779541015625 118.4867553710938 9.68775749206543 119.1360015869141 12.93988800048828 C 122.5618133544922 14.21222400665283 125.002799987793 17.51080322265625 125.002799987793 21.37950325012207 L 125.002799987793 29.26269721984863 L 132.4820556640625 34.14887619018555 C 135.0261535644531 35.81092834472656 136.5596923828125 38.64460372924805 136.5596923828125 41.68350219726562 L 136.5596923828125 106.3233032226562 C 136.5596923828125 106.8042984008789 136.5401306152344 107.2808456420898 136.5021057128906 107.7522735595703 L 136.5021057128906 110.5965042114258 C 136.5021057128906 119.9867782592773 129.1262054443359 127.6263046264648 120.0599975585938 127.6263046264648 Z"
          />
        </g>
        <g transform="translate(0)">
          <path
            className="pb"
            d="M130.951,453.2,194.7,418.914V483.54c0,4.431-3.341,8.03-7.442,8.03H74.642c-4.115,0-7.442-3.6-7.442-8.03V418.9Z"
            transform="translate(-67.2 -372.944)"
          />
          <path
            className="pb"
            d="M130.951,98.4,67.2,140.083v.631l63.78,35.819,63.78-35.819v-.631Z"
            transform="translate(-67.2 -98.4)"
          />
          <path
            className="nz"
            d="M230.7,153.8h80.7v96.43H230.7V153.8Z"
            transform="translate(-207.256 -145.856)"
          />
          <path
            className="ob"
            d="M187.8,201h93.017v96.444H187.8V201Z"
            transform="translate(-170.507 -186.288)"
          />
          <path
            className="pc"
            d="M146.5,247.5H251.132v89.059H146.5V247.5Z"
            transform="translate(-135.129 -226.121)"
          />
          <g transform="translate(20.389 25.746)">
            <g transform="translate(54.179 4.711)">
              <ellipse
                className="pb"
                cx={10.208}
                cy={10.208}
                rx={10.208}
                ry={10.208}
                transform="translate(6.282 0)"
              />
              <ellipse
                className="pb"
                cx={16.882}
                cy={16.489}
                rx={16.882}
                ry={16.489}
                transform="translate(0 21.2)"
              />
            </g>
            <g transform="translate(0 4.711)">
              <ellipse
                className="pb"
                cx={10.208}
                cy={10.208}
                rx={10.208}
                ry={10.208}
                transform="translate(7.067 0)"
              />
              <ellipse
                className="pb"
                cx={17.274}
                cy={16.489}
                rx={17.274}
                ry={16.489}
                transform="translate(0 21.2)"
              />
            </g>
            <g transform="translate(21.986 0)">
              <ellipse
                className="pd"
                cx={12.956}
                cy={12.956}
                rx={12.956}
                ry={12.956}
                transform="translate(8.637)"
              />
              <ellipse
                className="pd"
                cx={21.986}
                cy={21.593}
                rx={21.986}
                ry={21.593}
                transform="translate(0 27.482)"
              />
            </g>
          </g>
          <path
            className="pd"
            d="M130.951,423.4,194.7,389.114V453.74c0,4.431-3.341,8.03-7.442,8.03H74.642c-4.115,0-7.442-3.6-7.442-8.03V389.1Z"
            transform="translate(-67.2 -347.417)"
          />
          <path
            className="pe"
            d="M194.76,453.74V389.1l-63.751,34.3,56.309,38.371A7.761,7.761,0,0,0,194.76,453.74Zm-127.56,0V389.1l63.78,34.3L74.642,461.756A7.739,7.739,0,0,1,67.2,453.74Z"
            transform="translate(-67.2 -347.417)"
          />
          <path
            className="pf"
            d="M857.342,393.43v60.41c0,4.431-3.341,8.03-7.442,8.03h7.843c4.115,0,7.442-3.6,7.442-8.03V389.2Z"
            transform="translate(-737.669 -347.502)"
          />
          <g transform="translate(38.54 53.341)">
            <path
              className="nz"
              d="M256.025,46.57m-23.3,0a23.3,23.3,0,1,0,23.3-23.3A23.3,23.3,0,0,0,232.727,46.57Z"
              transform="translate(-230.785 -21.331)"
            />
            <path
              className="oj"
              d="M234.695,50.48a25.24,25.24,0,1,1,25.24-25.24,25.19,25.19,0,0,1-25.24,25.24Zm0-46.6A21.357,21.357,0,1,0,256.052,25.24,21.3,21.3,0,0,0,234.695,3.883Z"
              transform="translate(-209.455)"
            />
            <path
              className="ok"
              d="M286.263,108.646l29.705-29.705a21.921,21.921,0,0,0-8.349-6.8l-28.346,28.346a21.816,21.816,0,0,0,6.99,8.154Zm12.426,4.077a21.3,21.3,0,0,0,21.357-21.357,22.566,22.566,0,0,0-1.553-8.154L290.534,111.17a22.566,22.566,0,0,0,8.154,1.553Z"
              transform="translate(-273.448 -66.127)"
            />
            <path
              className="ok"
              d="M341.35,131.9m-15.532,0a15.532,15.532,0,1,0,15.532-15.532A15.532,15.532,0,0,0,325.818,131.9Z"
              transform="translate(-316.11 -106.655)"
            />
            <path
              className="ol"
              d="M320.019,95.033a15.532,15.532,0,1,1-15.532,15.532,15.578,15.578,0,0,1,15.532-15.532m0-1.942a17.474,17.474,0,1,0,17.474,17.474A17.4,17.4,0,0,0,320.019,93.091Z"
              transform="translate(-294.779 -85.325)"
            />
            <path
              className="nz"
              d="M327.76,133.838a15.578,15.578,0,0,1,15.532-15.532,14.851,14.851,0,0,1,9.9,3.689,14.829,14.829,0,0,0-11.843-5.63A15.578,15.578,0,0,0,325.818,131.9a14.829,14.829,0,0,0,5.63,11.843A14.851,14.851,0,0,1,327.76,133.838Z"
              transform="translate(-316.11 -106.656)"
            />
            <path
              className="ob"
              d="M352.215,125.673,332.8,145.088a16.094,16.094,0,0,0,6.6,8.543l21.357-21.357a13.888,13.888,0,0,0-8.543-6.6Z"
              transform="translate(-322.51 -115.188)"
            />
            <path
              className="ok"
              d="M353.184,124.7a15.8,15.8,0,0,1,8.737,3.495,15.89,15.89,0,0,0-7.378-4.854l-1.359,1.359Zm-13.2,25.434a15.251,15.251,0,0,1-3.495-8.737l-1.359,1.359A13.778,13.778,0,0,0,339.981,150.138Z"
              transform="translate(-324.643 -113.055)"
            />
            <path
              className="ob"
              d="M473.6,277.548a15.578,15.578,0,0,0,15.532-15.532,23.785,23.785,0,0,0-.388-3.689l-18.639,18.639a10.155,10.155,0,0,0,3.495.582Z"
              transform="translate(-448.364 -236.776)"
            />
            <path
              className="ol"
              d="M7.852,18.452v-5.1h-5.1a2.748,2.748,0,0,1,0-5.5h5.1v-5.1a2.748,2.748,0,0,1,5.5,0v5.1h5.1a2.748,2.748,0,1,1,0,5.5h-5.1v5.1a2.748,2.748,0,1,1-5.5,0Z"
              transform="translate(14.828 14.805)"
            />
          </g>
        </g>
      </g>
      </Link>
      <rect
        className="pg"
        width={193.88}
        height={7}
        rx={3.5}
        transform="translate(261.488 2167.788) rotate(-90)"
      />
      <rect
        className="pg"
        width={193.88}
        height={7}
        rx={3.5}
        transform="translate(541 2167.788) rotate(-90)"
      />
      <rect
        className="pg"
        width={193.88}
        height={7}
        rx={3.5}
        transform="translate(801.574 2167.788) rotate(-90)"
      />
      <g className="pl" transform="translate(-241.389 -304.607) rotate(30)">
        <g transform="translate(636.684 5.192)">
          <path
            className="pm"
            d="M1934.246-2417.808,2173-1761.241l192.376-656.567Z"
            transform="translate(-1491.497 2417.808)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(992.572 38.326) rotate(45)"
          />
          <path
            className="pn"
            d="M0,656.566,238.752,0,431.128,656.566Z"
            transform="translate(827.308 502.589) rotate(135)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(1333.876 1008.514) rotate(135)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(917.99 1370.197) rotate(180)"
          />
          <path
            className="pn"
            d="M0,656.566,238.752,0,431.128,656.566Z"
            transform="translate(706.567 925.055) rotate(-90)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="matrix(-0.656, -0.755, 0.755, -0.656, 331.791, 1342.31)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(0 902.208) rotate(-86)"
          />
        </g>
        <g transform="translate(636.684 5.192)">
          <path
            className="pm"
            d="M1934.246-2417.808,2173-1761.241l192.376-656.567Z"
            transform="translate(-1491.497 2417.808)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(992.572 38.326) rotate(45)"
          />
          <path
            className="pn"
            d="M0,656.566,238.752,0,431.128,656.566Z"
            transform="translate(827.308 502.589) rotate(135)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(1333.876 1008.514) rotate(135)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(917.99 1370.197) rotate(180)"
          />
          <path
            className="pn"
            d="M0,656.566,238.752,0,431.128,656.566Z"
            transform="translate(706.567 925.055) rotate(-90)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="matrix(-0.656, -0.755, 0.755, -0.656, 331.791, 1342.31)"
          />
          <path
            className="pm"
            d="M0,0,238.751,656.566,431.127,0Z"
            transform="translate(0 902.208) rotate(-86)"
          />
        </g>
      </g>
      <g transform="translate(139 243)" onClick={() => spinPointer() }>
        <g transform="translate(149 1382)">
          <g className="po">
            <rect className="rj" width={505} height={200} rx={38} />
            <rect
              className="c"
              x={-5}
              y={-5}
              width={515}
              height={210}
              rx={43}
            />
          </g>
          <g className="rq" transform="matrix(1, 0, 0, 1, -288, -1625)">
            <rect
              className="pp"
              width={459}
              height={164}
              rx={43}
              transform="translate(311 1643)"
            />
          </g>
        </g>
        <text className="pq" transform="translate(297 1512)">
          <tspan x={0} y={0}>
            {"SPIN!"}
          </tspan>
        </text>
      </g>
      <g transform="translate(70.705 484.01)">
        <g className="pr">
          <g className="ps" transform="translate(-13.793 -14.528)">
            <path
              className="pt"
              d="M0,0,1366.086,1.37l1.37,1366.086L1.37,1366.086Z"
              transform="translate(-483.469 482.5) rotate(-45)"
            />
          </g>
          <g transform="translate(46.466 46.373)">
            <g className="pu">
              <path
                className="pv"
                d="M0,0,1194.745,1.2l1.2,1194.745L1.2,1194.745Z"
                transform="translate(-422.83 421.983) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(55.65 55.539)">
            <g className="pw">
              <rect
                className="px"
                width={827.291}
                height={825.629}
                transform="translate(0 0)"
              />
            </g>
          </g>
          <g transform="translate(73.016 468.351)">
            <g className="py">
              <path
                className="h"
                d="M0,0,480.336.482l.482,480.336L.482,480.336Z"
                transform="translate(-141.848 141.563) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(374.095 468.351)">
            <g className="pz">
              <path
                className="h"
                d="M0,0,426.7.428l.428,426.7L.428,426.7Z"
                transform="translate(-206.823 206.408) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(469.301 468.351)">
            <g className="qa">
              <path
                className="h"
                d="M0,0,480.33.482l.482,480.33L.482,480.33Z"
                transform="translate(-141.848 141.563) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(469.301 185.229)">
            <g className="qb">
              <path
                className="h"
                d="M0,0,480.327.482l.482,480.327L.482,480.327Z"
                transform="translate(-141.845 141.561) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(73.016 185.229)">
            <g className="qc">
              <path
                className="h"
                d="M0,0,480.333.482l.482,480.333L.482,480.333Z"
                transform="translate(-141.845 141.561) rotate(-45)"
              />
            </g>
          </g>
          <g transform="translate(374.095 55.539)">
            <g className="qd">
              <path
                className="h"
                d="M0,0,426.7.428l.428,426.7L.428,426.7Z"
                transform="translate(-206.821 206.406) rotate(-45)"
              />
            </g>
          </g>
          <g className="qe">
            <g className="qf" transform="translate(417.609 431.798)">
              <g className="qg">
                <g transform="translate(0.002 0)">
                  <g className="qh">
                    <rect
                      className="qi"
                      width={92.053}
                      height={91.873}
                      transform="translate(0 0)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g transform="translate(441.392 440.507)">
            <g className="qj">
              <path
                className="qk"
                d="M0,0,78.846.079l.079,78.846L.079,78.846Z"
                transform="translate(-27.904 27.848) rotate(-45)"
              />
            </g>
          </g>
        </g>
      </g>
      <g className="ql" transform="translate(-2)">
        <path
          className="dn"
          d="M1500.877,1071.755a465.062,465.062,0,0,1-73.165-6.242,244.655,244.655,0,0,1-36.154-8.858c-9.83-3.251-18.976-6.823-26.782-13.083-9.945-8-20.429-17.986-14.589-30.449,5.33-11.28,23.107-16.183,35.271-19.608,10.8-3.073,22.337-4.933,33.449-6.88a253.452,253.452,0,0,1,25.5-3.16c18.8-1.282,37.645-2.823,56.469-3.621v-2.947c-2.316.163-4.553.449-7.036.719-1.908.177-6.469.737-8.036-.828-1.453-1.5-.2-3.247.256-4.9.2-.737-.026-1.947.372-2.628.655-1.123,4.016-2.778,5.042-3.515a35.109,35.109,0,0,1,9.4-4.539v-21.3c-.427.286-.873.551-1.283.852-7.749,5.757-12.963,13.673-20.74,19.521-3.848,2.9-9.316,4.487-13.819,6.468a164.2,164.2,0,0,1-16.439,6.083c-7.236,2.276-14.332,4.725-21.625,6.823-10.086,2.866-21.824,4.31-32.423,4.96-9.515.563-18.659-.677-28.12-1.535-8.377-.768-16.554-1.6-24.845-2.983-6.95-1.18-13.562-3.368-20.455-4.725-7.806-1.565-15.842-2.865-23.5-4.873-10.314-2.688-22.452-4.578-29.831-12.168-4.728-4.813-4.359-12.078-.369-17.276,3.047-3.988,10.34-4.725,15.015-6.672,6.78-2.835,13.531-5.76,20.6-8.036,15.814-5.077,32.109-9.772,48.663-12.608,11.055-1.95,22.253-3.19,33.42-4.4,4.1-.445,8.149-.473,12.193-1.391a99.067,99.067,0,0,1,11.055-2.125c9.714-1.093,19.829-.413,29.659-.443a95.677,95.677,0,0,1,13.335.707c4.3.563,8.66-.057,12.992.3,11.055.888,21.994,1.565,33.135,1.715,1.141.018,2.268.091,3.39.175V903.7c-3.5-.123-7.005-.208-10.513-.2-12.879.03-26.753,1.24-39.433-.857-4.956-.8-9.885-1.8-14.785-2.835-5.7-1.21-12.908-2.393-17.552-5.61-3.7-2.6-5.7-6.2-2.762-9.745,2.963-3.515,5.783-6.468,10.314-8.475,4.843-2.185,8.717-5.258,13.817-7.031s9.374-4.635,14.759-5.965c8.947-2.185,18.6-2.745,27.808-3.573,6.13-.554,12.246-1,18.348-1.5V851.42c-.827.078-1.649.171-2.479.25-6.924.65-13.819,1.595-20.769,2.185-6.1.5-12.193-.087-18.292.385-6.01.473-11.966,1.21-18,.5a56.617,56.617,0,0,0-7.408-.71,24.2,24.2,0,0,1-1.312-3.75c-1.026,3.84-3.762,1.6-7.094-.443-2.393-1.478-5.356-2.1-8.005-3.278-4.047-1.773-8.091-3.515-12.109-5.405-4.7-2.185-10.4-3.22-15.526-4.4a118.883,118.883,0,0,1-17.465-5.375c-8.832-3.368-20.143-8.74-24.986-16.391-9.033-14.206,28.29-14.826,36.24-15.208,18.6-.915,37.237-1.86,55.87-2.952,11.34-.623,22.706-1.3,34.075-1.655,9.149-.244,18.166-.108,27.266-.021v-43.4a133.967,133.967,0,0,0-23.164-2.149c-22.392.265-44.219-.3-66.469,2.862-22.165,3.133-44.274,5.553-66.412,8.951-23.107,3.512-45.9,7.53-69.09,10.128-19.374,2.155-39.575.5-59.033.5-8.036,0-13.049-.8-19.717-3.928a147.754,147.754,0,0,1-14.56-7.768c-28.861-17.483-65.328-12.936-97.667-12.936-31.054,0-62.137-1.267-92.479,6.173-6.725,1.655-12.764,3.4-18.889,6.706-5.442,2.953-5.869,4.665-8.976,10.01-5.071,8.683-12.793,18.663-21.054,24.159-14.274,9.478-38.206,8.828-53.535,4.253-2.393-.71-4.3-2.393-6.667-3.251-2.762-1-5.013-.62-7.835-.975-5.725-.737-10.94-2.3-16.78-2.363-10.057-.057-20.172-.087-30.258.06-4.1.06-5.013-1.183-8.489-2.3-4.3-1.39-10.2-1.833-14.7-2.188-13.876-1-27.58-4.665-41.627-4.518-9.628.09-18.6-.03-28.033,1.8-6.639,1.27-13.107.117-19.688,1.622-5.5,1.243-11,1.655-16.5,2.835-4.872,1.065-9.714-.174-14.586.71-10.23,1.83-20.544,1.89-30.714,3.78-5.9,1.093-11.738.03-17.693.385-6.068.352-11.738,2.3-17.863,2.39-13.534.208-27.1-.235-40.656-.057-6.327.087-9.6-3.1-15.015-6.143-13.617-7.621-29.46-10.985-44.219-15.151-13.078-3.72-26.952-4.755-40.085-8.388-10.57-2.922-22.023-3.9-32.936-3.867-25.557.087-51.114,0-76.67,0-30.683,0-61.255,3.425-91.369,8.74-3.9.71-7.806-.235-11.709.385-3.133.5-5.984,1.652-9.146,2.125-4.7.68-9.4,1.508-14.131,2.245-6.555,1.005-12.395,1.86-18.264,4.963-11.8,6.2-26.353,9.125-39.4,12.373a83.7,83.7,0,0,1-21.6,2.748,51.1,51.1,0,0,1-16.1-2.305c-6.07-1.8-12.709-2.272-18.408-4.37-8.461-3.073-17.094-6.113-25.84-8.445-8.832-2.336-17.209-2.305-26.041-3.9-6.44-1.15-13.335-3.13-19.858-3.425-13.335-.674-26.034-2.08-39.047-1.67v24.4c.177-.009.35-.006.527-.015,10.484-.59,20.769-2.068,31.169-3.368a151.852,151.852,0,0,1,47.666,1.3c6.722,1.24,13.191,3.485,19.858,5.02,7.662,1.743,15.612,3.043,23.133,5.228,7.808,2.245,15.073,5.67,22.908,8,4.644,1.357,9.686,2.922,13.675,5.493,6.468,4.105,16.355,11.458,18.149,18.636,1.112,4.578-1.623,6.937-5.955,9.183A84.835,84.835,0,0,1,166.9,854.18a163.578,163.578,0,0,1-23.7,3.663c-8.206.59-16.384-.118-24.588.56-31.711,2.57-61.825,12.523-93.623,14.236q-3.546.194-7.08.394v2.92a211.4,211.4,0,0,1,24.032-2.811c10.486-.828,20.855-2.336,31.368-3.013,30.656-1.89,61.427-1.92,92.112-.828,12.735.472,25.413,1.27,38.119,1.95,13.848.767,27.7.767,41.512,1.712.542.027,1.084.057,1.6.087,17.748,1.21,35.413,2.983,53.106,4.668,14.617,1.388,30.143,1.535,43.706,6.967,1.767.71,3.505,1.448,5.186,2.215.77-.56,1.594-1.123,2.45-1.622,10.94-6.441,25.9-5.258,37.837-1.893,3.445.948,6.694,2.128,10.029,3.281,7.379,2.54-4.9,7.235-7.921,7.678a77.227,77.227,0,0,1-21.026-.117c-8.034-1.066-14.5-4.253-21.368-7.326a76.448,76.448,0,0,1-6.838,4.9,32.951,32.951,0,0,1-6.924,2.922c-11.055,3.251-22.279,4.9-32.394,10.339-3.361,1.83-6.78,3.485-9.432,6.083-1.822,1.773-2.393,4.045-4.016,5.878-2.906,3.308-7.466,3.217-11.6,4.135a45.743,45.743,0,0,1-9.913.707c-5.557.03-10.827,1.6-16.327,1.92-9.118.56-18.007.8-26.7,3.455-12.395,3.837-21,14.5-34.475,15.178-3.275.147-6.408.888-9.714.975-3.647.06-7.293-.235-10.94-.087-2.565.118-4.958.825-7.494,1.032-2.479.178-5.071-.057-7.578-.03a35.191,35.191,0,0,1-13.932-2.687c-2.934-1.27-5.555-3.66-8.149-5.345-6.353-4.162-11.824-9.448-18.918-12.52-7.919-3.485-16.1-4.99-24.758-5.553-5.953-.412-11.851-1.682-17.863-1.947-5.982-.208-11.738-.888-17.806-.888-7.238-.057-14.274.915-21.539.888-4.526,0-8.986.066-13.435-.045v8.617c6.8-.141,13.615-.169,20.443-.157,8.377.03,16.523-.824,24.845-.975,6.039-.118,11.822.532,17.777.975,4.018.325,7.835.65,11.824.888a45.845,45.845,0,0,1,10.029,1.86,36.187,36.187,0,0,1,17.01,10.543,16.027,16.027,0,0,1,4.073,14.233c-.571,2.982-1.851,5.965-2.764,8.921-.767,2.48-1.367,4.7-3.476,6.555-4.157,3.693-11.453,3.72-17.036,3.72-11.225,0-22.507-2.125-33.677-3.04-11.594-.975-22.992-2.631-34.646-2.6-4.79.027-9.607,0-14.4,0v5.7c9.328.127,18.619.343,27.964.708,11.311.5,22.737,2.1,34.046,2.04,8.12-.09,18.122-1.448,25.785.885,2.678.8,7.437,2.038,5.67,4.635-1.4,2.1-6.78,2.956-9.118,3.78-3.846,1.33-7.72,2.453-11.594,3.693-4.3,1.327-7.808,3.693-11.882,5.432-3.3,1.448-6.751,2.453-10,3.931-4.558,2.065-9.031,4.132-13.733,5.845-3.961,1.418-7.921,2.245-11.853,3.485h-.029c-8.245-2.73-16.737-4.969-25.257-7.136v1.984c.408.168.849.295,1.239.488,6.667,3.277,13.649,5.965,19.489,10.3,4.586,3.428,9.316,7.178,11.8,12.051a12.091,12.091,0,0,1,1.338,5.64c.058,1.565-1.482,3.455-2.136,1.89a28.722,28.722,0,0,1-11.568,1.86,83.207,83.207,0,0,0-10.542.238,94.473,94.473,0,0,1-9.616.638V1133.5c47.438,3.9,94.965,7,142.5,10.1,56.726,3.693,113.395,7.885,170.092,11.578,57.067,3.72,114.646,4.578,171.828,6.23,52.964,1.505,105.9,2.1,158.922,2.215,58.493.147,116.928,2.007,175.448,1.95,108.578-.12,217.358,1.8,325.878-.446,102.966-2.125,206.332.975,309.128-5.077q14.586-.862,29.174-1.692Zm-224.795-92.8c16.725-3.512,31.968,2.748,48.265,3.753,6.1.383,12.563.795,18.434,2.805,4.785,1.652,16.437,5.935,16.125,11.545l-10.314,2.423c-10.57,4.813-13.45,6.971-23.478,7.323-9.2.3-19.573.533-28.69-.62-7.691-.972-19.115-2.3-25.583-6.585-3.62-2.42-10.968-7.648-10.371-12.168.77-6.053,10.484-7.413,15.612-8.476m8.036-55.815c-1.369,1.24-4.9,2.037-6.667,2.57-7.979,2.363-16.753,2.3-25.1,2.125-2.649-.087-4.987-1.032-7.636-1.032-.741,0-1.793.235-2.505.177-2.338-.208-4.188-1.773-6.1-2.925,1.966,1.98-.8.472-4.045-2.125-2.393-1.89-3.134-2.926-.314-4.9,3.476-2.393,8.691-2.54,12.963-2.363,8.293.355,16.583,2.51,24.9,2.9a80.707,80.707,0,0,1,11.966.885c1,.2,3.819.65,4.188,1.475.228.5-1.2,2.835-1.652,3.221m-34.533,62.873c-4.471,3.455-10.8,5.761-16.068,8.123-15.84,7.058-34.075,9.568-51.37,12.463-29.8,4.9-60.514,6.555-90.686,8.858-36.07,2.748-71.113.68-106.641-5.107a241.442,241.442,0,0,1-36.185-8.891c-9.827-3.187-18.973-6.793-26.753-13.053-9.971-8-20.455-17.983-14.586-30.446,5.327-11.311,23.078-16.183,35.243-19.641,10.8-3.04,22.366-4.9,33.449-6.85a246.553,246.553,0,0,1,25.528-3.161c19.458-1.357,39-2.952,58.519-3.72a538.032,538.032,0,0,1,60.943.738c6.154.442,12.251,1.183,18.376,1.682,7.18.563,14.531.178,21.709.208,11.17.03,22.2-1.565,33.392-.858,8.492.475,17.3.888,25.442,3.133,6.013,1.652,10.57,4.253,15.842,7.028a51.025,51.025,0,0,0,7.322,3.515c2.222.8,3.9,1.15,5.869,2.537,2.194,1.6,4.929,4.638,5.785,7.031.882,2.42.995,4.99,2.079,7.413a15.01,15.01,0,0,1,1.367,5.61c.2,2.657,1.539,4.815.913,7.53a47.976,47.976,0,0,1-1.824,5.64,26.5,26.5,0,0,1-3.39,5.553c3.162-.265-2.194,3.073-4.275,4.665m56.726-105.842c-1.168.65-2.422,2.835-4.073,5.818-1.738,3.19-4.131,3.988-7.751,2.57-3.618-1.387-5.754-3.6-8.688-5.613-3.79-2.6-8.262-2.363-12.706-3.9-5.728-1.947-11.481-5.875-17.751-6.377-9.06-.68-17.722-2.805-26.866-2.778-7.95.06-15.926-.027-23.876.03-5.128.06-10.029-1.033-15.157-.945-5.358.06-10.57-.8-15.955-.915-9.345-.238-21.682-1.92-28.148-8.418-2.508-2.51-1.767-4.25-1.026-7.205.94-3.78,2.563-5.7,6.209-8,5.3-3.368,10.942-4.755,17.437-5.58,7.751-.945,15.3-2.128,23.107-2.54,7.55-.445,14.871-.975,22.452-.945a191.4,191.4,0,0,0,20.2-.74c3.791-.382,7.466-.057,11.254-.147,4.275-.088,8.492-.8,12.735-.975,6.5-.322,12.963-1.062,19.4-1.86,13.7-1.683,27.609-4.813,41.512-4.755,10.57.06,18.434,2.453,23.62,10.6,2.534,3.928,2.534,8.15-.513,11.9-1.481,1.893-5.1,3.4-7.35,4.608-2.165,1.183-4.3,1.565-6.555,2.57a52.8,52.8,0,0,1-6.408,2.8,64.187,64.187,0,0,0-8.406,3.1c-3.618,1.625-8.007,2.363-8.918,6.5a14.614,14.614,0,0,0,2.223,11.193m-153.878-1.625c13.5-.8,27.007-1.18,40.515-1.917,11.908-.65,23.076.972,34.7,2.39,8.8,1.1,18.235.563,26.782,2.305a93.93,93.93,0,0,1,12.335,3.512c4.987,1.743,13.761,3.133,16.554,6.736,2.136,2.745-5.471,7.735-8.518,9.183-3.021,1.478-5.869,2.9-8.861,4.43-2.023,1.092-4.361,2.423-2.851,1.123-5.327,1.328-8.2,1.92-13.447,1.86-4.188-.03-8.377,0-12.594,0-6.437,0-11.738-.03-17.835,1.153-7.976,1.535-15.955,2.48-23.62,4.725-2.05.59-4.157,1.86-6.068,2.362a80.907,80.907,0,0,1-8.432,1.327c-15.073,2.1-30.287,1.656-45.729,1.656h-14.7c-6.866,0-13.39.827-20.227.975-14.447.322-29.033-.06-43.506-.06h-46.839c-13.476,0-27.635.858-40.03-3.338-5.584-1.89-11.908-5.02-9.914-9.507,1.024-2.275,3.56-4.283,5.9-6.025,3.989-2.953,7.61-6.086,11.8-8.918,3.364-2.275,5.843-4.578,10.144-6.056,5.641-1.95,10.968-2.6,17.209-3.247,23.191-2.483,47.609-3.073,71.113-3.043,25.329.03,50.886-.117,76.129-1.625m190.576,25.9a4.638,4.638,0,0,1,2.733,3.188c-2.934,1.742-7.152,1.742-10.542,2.188q-8.246,1.016-16.523,1.86c-8.748.885-17.664,2.155-26.439,2.095a88.362,88.362,0,0,0-10.8.858c-1.937.177-6.5.767-8.036-.8-1.482-1.5-.2-3.247.256-4.933.2-.737-.057-1.947.343-2.6.683-1.153,4.018-2.805,5.042-3.542,6.24-4.4,13.905-5.968,21.625-7.443,8.8-1.625,17.3-.767,26.211-.268,5.67.325,10.942,1.3,15.586,4.135,1.908,1.183,8.034,5.05.542,5.258m24.787-64.913c6.979-1.388,13.332,1.062,20.141,1.448a31.855,31.855,0,0,1,7.693,1.092c2.023.65,6.9,2.3,6.751,4.49l-4.3.915c-4.416,1.89-5.612,2.745-9.8,2.862a81,81,0,0,1-11.994-.235c-3.22-.385-7.979-.885-10.686-2.57-1.508-.945-4.586-2.953-4.33-4.7.314-2.363,4.387-2.892,6.526-3.308m-10.314,17.748c17.492-1.77,34.387-1.947,51.169,3.633,3.96,1.33,8.66,3.958,10.426,7.5,1.424,2.893.4,4.518-2.107,6.615-3.817,3.187-7.322,7.353-7.037,12.138.142,2.242,1.424,3.75,2.079,5.7.4,1.27,2.565,5.111,2.251,5.965-15.272,2.128-30.942.208-46.127-1.592a233.167,233.167,0,0,1-27.578-4.9,39.512,39.512,0,0,1-11.824-4.9c-2.68-1.625-5.33-3.278-8.12-4.755-3.162-1.625-6.78-2.54-9.887-4.162-1.8-.888-2.05-.975-2.335-2.808-.456-2.745,1.2-4.783,3.246-6.7,11.455-10.721,30.4-10.13,45.844-11.726m-395.2-63.965c8.633-7.353,21.738-12.021,33.277-14.735,12.908-3.043,26.724-5.7,40.088-6.558,14.5-.915,29.544-.087,43.962,1.33,8.518.855,16.979,2.215,25.384,3.633,6.411,1.092,12.507,3.04,18.832,4.37a107.928,107.928,0,0,0,17.151,1.682c9.175.295,18.633,2.333,27.609,3.78a75.621,75.621,0,0,1,11.51,2.805c2.165.68,5.071,2.9,7.434,2.778l6.7,5.7c2.222-.322,4.445-.59,6.639-1.062a89.048,89.048,0,0,0,11.112-3.573c15.67-5.583,32.337-8.505,48.889-11.311,22.452-3.84,45.216-5.848,67.9-8.18,8.717-.885,17.437-1.625,26.182-2.1,7.293-.382,14.358-1.478,21.738-.737,18.405,1.89,36.981,2.775,55.472,3.542,13.96.593,26.981,3.308,40.4,6.29,3.165.71,6.866.828,9.775,2.128,1.45.62,4.214,1.625,4.927,3.013-.228.2-.427.442-3.9.707a44.717,44.717,0,0,1-13.96,1.86c-4.757.03-9.686-1.123-14.33-.8-13.819,1.092-27.75,1.183-41.569,2.423-6.7.62-13.476.68-20.143,1.418-6.01.65-12.193,1.418-18.261,1.655-5.044.175-10.028.972-15.1.915-6.039-.03-11.565.382-17.55.915-4.1.382-8.377.59-12.421,1.153-1.654.2-6.3.56-7.379,1.86-.856.975-.144,4.193-.144,5.4,0,2.01.256,3.753-1.367,5.405-3.021,3.16-9.374,4.253-13.7,5.08-12.481,2.45-25.216,4.253-37.865,5.878-9.487,1.18-19,1.357-28.376,3.01-9.973,1.742-20.059,2.63-30.143,3.75-8.12.918-16.782.238-24.617,1.863-4.188.885-10.57.885-14.018-1.625-5.84-4.223-1.908-8.918,1.853-13.053,5.526-6.113,13.531-10.573,21.85-14.236l-1.88-1.6a44.02,44.02,0,0,0-6.154,1.3,109.86,109.86,0,0,0-35.5,18.784c-3.021,2.42-6.154,4.548-9.288,6.91-3.361,2.54-7.036,3.13-11.17,4.313-12.735,3.63-26.751,4.842-40.085,5.875-21.568,1.625-43.334-1.27-64.76-2.923-8.976-.68-17.664-2.57-26.554-3.9-7.55-1.123-15.07-1.95-22.308-4.313-7.777-2.57-21.539-6.85-23.989-14.913-1.709-5.553,3.531-12.255,7.864-15.918m-19.261,58.8c20.23-1.092,40.344-.412,60.517-1.357,19.345-.915,38.975-.472,58.378-.472,11.652,0,22.963-.325,34.387.945a180.621,180.621,0,0,1,20.515,3.72,63.478,63.478,0,0,1,12.421,4.7,33.438,33.438,0,0,1,4.018,2.245,11.63,11.63,0,0,1,2.649,1.92c1.338,1.33,1.8,2.835,2.819,4.223.571.8,3.591,2.48,4.56,2.865-22.224,3.425-46.47,4.635-69.632,5.553-11.738.442-22.992,1.15-34.816.972-6.782-.087-13.363-.945-20.143-1.032-7.578-.117-15.1.208-22.68-.148-26.7-1.3-55.386-.412-80.116-6.29-6.581-1.565-8.6-5.11-6.725-8.388,4.076-7.145,20.856-8.74,33.847-9.451M572.843,838.854c.6-2.985,3.7-4.608,5.84-6.883,5.241-5.61,13.874-9.685,21.882-11.961,4.272-1.21,7.492-3.6,11.68-4.96a124.026,124.026,0,0,1,14.387-3.338c9.916-1.978,19.6-5.138,29.575-6.823,15.555-2.6,32.565-2.862,48.349-1.77,9.573.647,18.576,1.327,28.232.768,10.487-.62,20.771-2.1,31.141-3.4a152.914,152.914,0,0,1,47.695,1.27c6.725,1.27,13.191,3.515,19.858,5.02,7.636,1.743,15.615,3.073,23.107,5.228,7.835,2.275,15.073,5.73,22.936,8,4.644,1.36,9.686,2.955,13.675,5.493,6.466,4.135,16.353,11.488,18.12,18.666,1.139,4.578-1.625,6.94-5.927,9.183a84.842,84.842,0,0,1-22.138,7.738,167.684,167.684,0,0,1-23.7,3.633c-8.206.59-16.411-.087-24.588.563-31.74,2.6-61.826,12.52-93.649,14.263-15.926.885-31.74,1.92-47.779,1.388-11.227-.355-22.337-2.3-33.308-4.34-10.853-1.98-21.51-6.173-32.052-9.216a143.515,143.515,0,0,1-22.622-8.978c-6.238-.148-19.913-3.512-27.549-12.581-1.8-2.185-3.79-4.075-3.162-6.967m3.845,39.364c22.706,2.333,45.47,4.343,67.922,8.18,16.526,2.808,33.221,5.73,48.891,11.313a83.277,83.277,0,0,0,11.112,3.573c2.194.472,4.414.767,6.636,1.092l6.7-5.7c2.338.117,5.27-2.1,7.408-2.805a76.736,76.736,0,0,1,11.539-2.805c8.974-1.417,18.434-3.455,27.607-3.78a105.166,105.166,0,0,0,17.151-1.683c6.325-1.3,12.424-3.281,18.832-4.373,8.405-1.418,16.868-2.775,25.358-3.6,14.445-1.448,29.46-2.272,43.991-1.327,13.361.825,27.18,3.482,40.085,6.525,11.513,2.718,24.646,7.413,33.279,14.738,4.33,3.69,9.544,10.365,7.864,15.945-2.453,8.033-16.212,12.316-24.018,14.886-7.209,2.359-14.73,3.187-22.311,4.34-8.859,1.33-17.549,3.19-26.552,3.867-21.4,1.655-43.164,4.608-64.731,2.925-13.335-1.005-27.353-2.245-40.088-5.878-4.131-1.18-7.806-1.773-11.2-4.31-3.1-2.363-6.241-4.46-9.259-6.914a110.328,110.328,0,0,0-35.53-18.781,42.678,42.678,0,0,0-6.125-1.27l-1.88,1.6c8.319,3.66,16.324,8.12,21.853,14.233,3.762,4.135,7.693,8.8,1.851,13.053-3.445,2.51-9.83,2.51-14.044,1.625-7.808-1.625-16.5-.975-24.588-1.89-10.086-1.122-20.2-1.977-30.172-3.75-9.374-1.625-18.89-1.773-28.35-3.013-12.649-1.595-25.413-3.425-37.863-5.848-4.33-.825-10.685-1.92-13.733-5.08-1.6-1.652-1.369-3.425-1.34-5.432,0-1.21.683-4.43-.141-5.406-1.084-1.3-5.727-1.622-7.379-1.83-4.073-.56-8.319-.8-12.421-1.153a166.835,166.835,0,0,0-17.552-.915c-5.071.03-10.057-.737-15.128-.915-6.042-.238-12.222-1.005-18.235-1.682-6.667-.741-13.447-.8-20.143-1.391-13.817-1.24-27.748-1.327-41.6-2.39-4.644-.385-9.573.767-14.3.737a43.1,43.1,0,0,1-13.96-1.86c-3.476-.238-3.675-.472-3.9-.71.712-1.358,3.476-2.39,4.929-3.013,2.906-1.27,6.61-1.388,9.772-2.125,13.419-2.983,26.439-5.67,40.4-6.26,18.492-.8,37.067-1.686,55.472-3.545,7.379-.768,14.447.325,21.74.74,8.746.443,17.463,1.21,26.154,2.065m58.179,131.214c-2.194-1.538-4.3-2.956-6.552-4.43-2.222-1.448-7.837-6.408-6.241-9.186,2.05-3.6,8.489-4.96,12.193-6.733a55.769,55.769,0,0,1,9.089-3.515c6.3-1.713,13.248-1.21,19.745-2.3,8.547-1.418,16.78-3.043,25.554-2.363,9.973.737,19.916,1.093,29.889,1.92,18.576,1.5,37.408,1.652,56.069,1.622,17.322-.057,35.329.533,52.423,3.013,4.589.68,8.521,1.3,12.68,3.25,3.191,1.475,5.013,3.78,7.492,6.083,3.078,2.835,5.756,5.935,8.691,8.918,1.709,1.713,3.589,3.723,4.33,6,1.482,4.521-3.191,7.651-7.293,9.51-9.117,4.193-19.575,3.365-29.517,3.365h-34.5c-10.685,0-21.426.355-32.08.03-5.044-.147-9.83-.975-14.9-.975-3.618.03-7.207,0-10.827,0-11.366,0-22.594.445-33.7-1.622a50.645,50.645,0,0,1-6.212-1.36c-1.4-.5-2.963-1.743-4.474-2.363-5.67-2.215-11.539-3.16-17.408-4.7-4.5-1.21-8.4-1.153-13.162-1.153-3.078,0-6.183-.057-9.288,0-3.846.03-5.984-.56-9.887-1.86,1.112,1.27-.6-.057-2.107-1.15m-71.883-5.965c4.673-2.835,9.942-3.84,15.612-4.135,8.919-.533,17.408-1.36,26.211.295,7.722,1.418,15.387,2.983,21.625,7.413,1.026.737,4.359,2.393,5.016,3.512.4.65.17,1.863.369,2.6.456,1.682,1.738,3.425.257,4.933-1.537,1.595-6.1,1-8.034.8a93.476,93.476,0,0,0-10.8-.828c-8.775.03-17.693-1.21-26.439-2.1-5.529-.59-11.026-1.18-16.526-1.89-3.39-.443-7.607-.443-10.542-2.155a4.5,4.5,0,0,1,2.736-3.221c-7.492-.174-1.4-4.075.513-5.225M488.51,979.278c-2.508-2.065-3.534-3.72-2.11-6.585,1.738-3.542,6.468-6.2,10.429-7.53,16.78-5.553,33.675-5.375,51.169-3.6,15.442,1.565,34.36.975,45.813,11.7,2.052,1.917,3.733,3.958,3.277,6.76-.285,1.8-.571,1.863-2.338,2.778-3.1,1.6-6.722,2.54-9.885,4.163-2.793,1.447-5.442,3.1-8.12,4.725a38.26,38.26,0,0,1-11.824,4.9,220.994,220.994,0,0,1-27.58,4.9c-15.183,1.833-30.884,3.75-46.125,1.625-.314-.888,1.851-4.725,2.249-6,.657-1.95,1.937-3.455,2.081-5.671.285-4.812-3.249-8.948-7.037-12.168m-1.625,19.166c-4.673,3.251-11.851,4.43-17.549,5.643-4.9,1.032-9.83,2.007-14.787,2.8-12.678,2.1-26.554.915-39.431.885-13.733-.03-27.41,1.33-41.114.975-10.57-.265-21.167-1.505-31.737-2.008-5.3-.295-10.371-.888-15.7-.857-3.762.03-7.523.117-11.282.06-8.063-.147-16.125-1.478-24.075-2.6a180.888,180.888,0,0,1-27.863-6.317c-2.508-.771-5.214-1.421-7.408-2.808a3.78,3.78,0,0,1-2.139-3.277c-.683-.118-1.681-.945-2.393-2.658a12.971,12.971,0,0,1-1-5.05c0-4.518,3.021-7.53,6.468-10.721a43.413,43.413,0,0,1,20.484-10.04A321.457,321.457,0,0,1,315,957.1c6.269-.56,12.536-1.475,18.832-1.683a105.612,105.612,0,0,1,17.523,1.357c11.738,1.565,23.675,2.038,35.442,3.6,11.995,1.538,24.047,2.185,36.156,3.277,9.2.828,18.861,1.418,27.779,3.576,5.411,1.327,9.686,4.193,14.785,5.965s8.976,4.873,13.819,7.028c4.529,2.007,7.322,4.99,10.314,8.505,2.934,3.516.94,7.148-2.764,9.715M503.1,950.81c-.141-2.155,4.73-3.837,6.725-4.487a32.29,32.29,0,0,1,7.72-1.093c6.811-.385,13.164-2.808,20.143-1.448,2.136.412,6.212.945,6.526,3.308.254,1.742-2.822,3.78-4.332,4.7-2.707,1.682-7.466,2.215-10.683,2.57a77.445,77.445,0,0,1-11.994.235c-4.188-.117-5.385-.945-9.8-2.835Zm98.293,22.416c-.911-4.105-5.327-4.846-8.945-6.5a63.675,63.675,0,0,0-8.377-3.073,52.835,52.835,0,0,1-6.411-2.8c-2.251-1.033-4.416-1.388-6.552-2.567-2.251-1.24-5.869-2.748-7.379-4.608-3.021-3.78-3.021-8-.484-11.93,5.186-8.151,13.049-10.543,23.591-10.6,13.932-.03,27.834,3.1,41.538,4.755,6.44.8,12.905,1.535,19.374,1.86,4.275.208,8.492.885,12.764.975,3.79.117,7.437-.238,11.254.147a191.992,191.992,0,0,0,20.172.737c7.607-.03,14.929.533,22.478.945,7.809.415,15.358,1.6,23.078,2.57,6.526.8,12.167,2.215,17.465,5.58,3.646,2.305,5.272,4.2,6.212,7.976.741,2.953,1.453,4.7-1.026,7.205-6.468,6.5-18.8,8.21-28.148,8.418-5.385.117-10.6,1-15.984.915-5.1-.06-10,1-15.128.975-7.979-.09-15.926,0-23.876-.03-9.173-.06-17.806,2.095-26.866,2.775-6.269.472-12.023,4.4-17.751,6.35-4.445,1.535-8.918,1.327-12.706,3.9-2.963,2.037-5.073,4.253-8.691,5.64s-6.01.59-7.777-2.57c-1.652-2.982-2.877-5.195-4.047-5.818a14.684,14.684,0,0,0,2.222-11.22m241.831,7.266c-4.272.352-8.518.027-12.793.147-3.817.118-7.521.945-11.338,1.033-6.7.178-13.021-.5-19.63-.975-13.078-.915-26.724-2.095-39.261-5.58a10.494,10.494,0,0,0,2.563-2.835,32.03,32.03,0,0,1,1.6-4.166,7.739,7.739,0,0,1,1.482-1.977,23.074,23.074,0,0,1,2.251-2.245,28.456,28.456,0,0,1,7.008-4.665,63.711,63.711,0,0,1,11.568-3.75c6.44-1.27,12.822-.918,19.4-.918,10.94,0,21.994-.442,32.905.472,11.369.915,22.709.238,34.106,1.361,7.322.707,16.78,2.272,19.089,9.421a6.521,6.521,0,0,1-3.79,8.388c-13.932,5.875-30.114,5.02-45.158,6.291M389.191,870.128c-36.07,2.745-71.144.677-106.643-5.11a241.326,241.326,0,0,1-36.182-8.858c-9.83-3.22-18.976-6.793-26.782-13.056-9.942-8-20.426-18.013-14.56-30.476,5.3-11.28,23.078-16.183,35.245-19.608,10.8-3.043,22.337-4.933,33.447-6.883a255.019,255.019,0,0,1,25.528-3.157c19.46-1.33,39-2.955,58.522-3.723a537.345,537.345,0,0,1,60.941.74c6.154.472,12.251,1.21,18.377,1.682,7.152.56,14.531.178,21.711.235,11.167.03,22.164-1.565,33.392-.885,8.489.5,17.293.915,25.442,3.13,6.01,1.655,10.57,4.283,15.84,7.058a54.589,54.589,0,0,0,7.324,3.515c2.22.8,3.874,1.123,5.869,2.54,2.194,1.565,4.927,4.608,5.783,7,.882,2.423,1,5.02,2.081,7.413a14.565,14.565,0,0,1,1.338,5.613c.228,2.688,1.566,4.843.94,7.557a55.865,55.865,0,0,1-1.822,5.613,25.839,25.839,0,0,1-3.392,5.553c3.136-.268-2.194,3.07-4.272,4.665-4.474,3.485-10.8,5.788-16.07,8.12-15.84,7.058-34.075,9.6-51.368,12.463-29.8,4.933-60.514,6.555-90.686,8.861m-79.262,36.767c4.757-1.92,10.369-2.272,15.471-2.983,7.036-.975,13.9-2.038,21.026-2.363,17.437-.767,34.873-1.92,52.31-2.068,11.083-.087,22.023-.352,33.135,0,11.366.295,22.706.975,34.075,1.625,18.6,1.063,37.266,2.008,55.87,2.923,7.919.385,45.271,1.005,36.24,15.241-4.843,7.648-16.154,12.993-24.986,16.388a124.981,124.981,0,0,1-17.465,5.375c-5.128,1.153-10.827,2.185-15.526,4.4-4.018,1.89-8.065,3.6-12.138,5.406-2.62,1.153-5.584,1.8-7.979,3.248-3.332,2.037-6.068,4.283-7.094.472a26.819,26.819,0,0,1-1.309,3.753,52.278,52.278,0,0,0-7.408.707c-6.068.707-11.995-.06-18.007-.532-6.1-.472-12.222.12-18.29-.382-6.953-.563-13.848-1.508-20.769-2.158-20.059-1.917-39.86-4.223-59.519-8.18-8.063-1.592-13.22-5.64-19.316-9.98-4.1-2.953-9.117-4.638-13.277-7.443a86.98,86.98,0,0,1-11-8.978c-1.539-1.418-3.874-3.455-3.932-5.523-.141-4.34,6.01-7.413,9.887-8.948m-87.867,30.8c3.39-4.457,9.031-4.635,14.73-4.6,6.068.03,12.107-.03,18.177,0,5.612.057,11-.858,16.552-.975,11.2-.238,22.821,1.3,33.9,2.8,2.479.355,19.772,1.565,19.4,5.61-.2,2.1-6.782,3.22-8.405,3.723a177.4,177.4,0,0,1-20.541,4.725c-16.952,3.04-35.842,4.37-52.993,1.83,2.764-2.775-28.264-3.338-20.827-13.114M109.524,986.309a23.4,23.4,0,0,1,4.073-5.375c1.225-1.24,3.021-2.215,4.073-3.576,1.369-1.77,2.222-4.37,2.966-6.2,1.139-2.9,3.987-5.258,6.238-7.708,6.212-6.793,14.588-10.191,24.274-11.518,16.581-2.245,33.735-1.123,50.486-1.123,10.057,0,19.717,1.035,29.831.945a21.42,21.42,0,0,1,5.183.737c1.882.355,3.505.03,5.157.62,2.992,1.066,5.044,3.455,1.084,5.2,2.62,2.51,6.039,4.843,5.471,8.593-.885,5.848-10.685,7.8-16.1,8.445-6.523.767-12.992,1.625-19.515,2.3-3.505.385-7.351.71-10.685,1.863-1.736.59-3.162,1.535-4.929,2.038-2.22.62-4.615.737-6.866,1.21-3.162.65-6.238,1.8-9.372,2.628-5.044,1.3-10.513,1.478-15.756,2.1a128.338,128.338,0,0,1-15.073.68,101.62,101.62,0,0,0-12.45.945c-8.461.945-16.78.767-25.355.915-1.625.03-2.623.413-3.306-.857-.484-.885.2-2.125.571-2.862m79.432,91.254c-10.057,1.092-19.916,2.185-30.059,2.095-8.175-.087-16.411.5-24.531,1.153a201.852,201.852,0,0,1-26.41.65c-3.505-.208-6.95-.858-10.455-.915-2.537-.06-4.929.265-7.466-.177-5.385-.915-11.139-2.51-16.638-2.6-2.963,0-7.864.65-8.662-1.86.484-1.417,1.283-4.045,2.366-5.345,1.225-1.475,3.3-2.185,4.7-3.485,2.477-2.333,5.3-5.345,6.495-8.445.94-2.51,1.168-4.933,2.393-7.205a14.475,14.475,0,0,1,4.788-5.141c5.128-3.455,13.39-2.362,19.23-1.15,3.249.677,6.468.975,9.717,1.89,3.047.825,6.238.825,9.4,1.8,3.165,1.005,6.382,1.685,9.345,2.955,3.476,1.445,7.238,1.77,10.942,2.568,3.018.68,6.1.915,9.173,1.98,2.052.677,3.819.5,5.869.885a16.331,16.331,0,0,1,1.853.768c1.424.325,2.791-.087,4.188.147,3.476.533,6.411,1.448,9.686,2.128,4.188.885,8.492,1.89,12.822,2.775,4.759.975,9.544,2.125,14.246,3.308,2.165.563,5.728.885,7.322,2.332,7.521,6.733-17.607,8.6-20.314,8.891m191.089-31.984c-.343,2.007-1.681,2.835-3.22,4.4-6.212,6.408-14.644,8.565-23.7,10.573-14.96,3.308-31.512,2.658-46.813,3.455-11.481.59-22.764.68-34.274.737-8.717.06-17.437-.8-26.183-.945-7.437-.087-14.986-.737-22.423-1.18-8.319-.5-16.751-.8-25.015-1.86-9.031-1.123-17.72-2.6-26.552-4.49-6.84-1.448-13.591-2.393-20.2-4.638-12.222-4.162-25.471-5.667-37.779-9.507-12.193-3.871-25.586-6.381-37.009-11.753-3.874-1.8-8.091-2.688-12.222-3.958a103.9,103.9,0,0,1-13.934-5.553c5.1-.087,4.816-.147,4.531-.177-.484-2.54-5.157-6.32-2.707-8.536,1.225-1.093,3.932-1.24,5.5-1.83a30.984,30.984,0,0,0,4.757-2.54,81.167,81.167,0,0,1,7.864-4.135c5.3-2.038,12.309-2.272,17.95-2.54a501.568,501.568,0,0,0,50.258-4.545c8.775-1.27,17.863-2.011,26.782-2.57,8.489-.563,17.437-1.508,25.9-1.123a269.62,269.62,0,0,1,47.695,7.058c16.78,3.9,33.7,7.028,50.857,9.715,15.5,2.423,31.34,3.927,46.554,7.473,9.2,2.125,17.892,4.782,25.583,9.715a56.981,56.981,0,0,0,5.358,2.658c1.764.858,4.243,1.565,5.725,2.718a18.509,18.509,0,0,1,6.44,9.39,10.467,10.467,0,0,1,.285,3.988m257.642,17.041c-7.406,7.591-19.515,9.451-29.858,12.165-7.665,1.981-15.67,3.281-23.476,4.846-6.9,1.388-13.5,3.543-20.457,4.725-8.29,1.418-16.5,2.242-24.871,2.983-9.432.855-18.578,2.095-28.093,1.535-10.6-.65-22.337-2.038-32.423-4.963-7.293-2.095-14.387-4.548-21.625-6.82a164.194,164.194,0,0,1-16.437-6.082c-4.5-1.98-10-3.576-13.819-6.468-7.78-5.848-12.992-13.763-20.743-19.494-3.675-2.745-8.2-4.6-11.594-7.413-4.047-3.365-10-6.26-15.1-8.355-3.618-1.508-5.982-3.693-8.945-5.938a74.364,74.364,0,0,0-7.751-4.783c1.055-1.595,2.052-2.393,4.5-3.338,4.644-1.773,10.172-.738,15.157-.885,3.591-.121,6.9-1.035,10.542-1.005,5.186.117,10.144-.888,15.3-.945,11.139-.148,22.081-.828,33.135-1.743,4.33-.325,8.688.3,12.992-.295a96.038,96.038,0,0,1,13.332-.71c9.83.03,19.916-.647,29.659.445a92.289,92.289,0,0,1,11.057,2.155c4.016.915,8.091.915,12.193,1.357,11.167,1.21,22.363,2.51,33.418,4.4,16.554,2.865,32.852,7.53,48.663,12.641,7.065,2.272,13.819,5.2,20.6,8,4.673,1.98,11.966,2.688,15.015,6.676,3.961,5.2,4.359,12.46-.372,17.306M983.6,1092.654c-7.777,6.26-16.924,9.863-26.753,13.053a237.853,237.853,0,0,1-36.182,8.917c-35.53,5.791-70.574,7.828-106.643,5.08-30.172-2.275-60.883-3.927-90.686-8.86-17.293-2.865-35.557-5.4-51.37-12.433-5.3-2.363-11.623-4.7-16.1-8.15-2.05-1.6-7.408-4.9-4.243-4.665a26.474,26.474,0,0,1-3.39-5.553,45.961,45.961,0,0,1-1.825-5.64c-.628-2.718.712-4.843.911-7.5a14.363,14.363,0,0,1,1.367-5.613c1.084-2.423,1.2-5.02,2.052-7.443a18.206,18.206,0,0,1,5.811-7c1.966-1.418,3.62-1.773,5.869-2.54a49.262,49.262,0,0,0,7.3-3.542c5.3-2.778,9.858-5.348,15.869-7,8.149-2.245,16.952-2.657,25.442-3.16,11.2-.68,22.224.945,33.392.857,7.18-.03,14.531.382,21.711-.208,6.126-.472,12.222-1.209,18.348-1.682a537.941,537.941,0,0,1,60.97-.74c19.518.8,39.033,2.423,58.522,3.753a244.94,244.94,0,0,1,25.5,3.13c11.11,1.947,22.678,3.837,33.447,6.85,12.2,3.455,29.944,8.328,35.271,19.638,5.869,12.463-4.615,22.447-14.586,30.449M1327,1044.1c-4.131,1.24-8.348,2.158-12.222,3.958-11.426,5.375-24.816,7.885-37.012,11.726-12.306,3.868-25.554,5.372-37.776,9.538-6.61,2.245-13.364,3.19-20.2,4.638-8.861,1.89-17.523,3.335-26.554,4.488-8.262,1.062-16.7,1.36-25.015,1.86-7.437.442-14.986,1.065-22.45,1.183-8.72.117-17.437.975-26.156.945-11.51-.06-22.819-.177-34.274-.737-15.3-.8-31.853-.151-46.81-3.485-9.089-2.01-17.492-4.166-23.7-10.543-1.539-1.6-2.879-2.393-3.248-4.43a11.086,11.086,0,0,1,.314-3.988,18.77,18.77,0,0,1,6.437-9.39c1.482-1.122,3.961-1.83,5.727-2.687a54.065,54.065,0,0,0,5.356-2.688c7.693-4.9,16.382-7.56,25.586-9.688,15.214-3.573,31.054-5.047,46.554-7.5,17.151-2.658,34.046-5.788,50.857-9.685,15.327-3.575,31.824-6.35,47.693-7.061,8.463-.382,17.408.563,25.9,1.1,8.887.56,17.976,1.327,26.78,2.6a500.748,500.748,0,0,0,50.258,4.548c5.644.268,12.651.473,17.95,2.54a73.467,73.467,0,0,1,7.864,4.135,35.035,35.035,0,0,0,4.73,2.54c1.6.59,4.3.737,5.5,1.83,2.45,2.185-2.194,5.965-2.68,8.536-.283.027-.568.087,4.531.147A103.411,103.411,0,0,1,1327,1044.1"
          transform="translate(-147.458 200.464)"
        />
        <path
          className="dn"
          d="M1500.877,1071.755a465.062,465.062,0,0,1-73.165-6.242,244.655,244.655,0,0,1-36.154-8.858c-9.83-3.251-18.976-6.823-26.782-13.083-9.945-8-20.429-17.986-14.589-30.449,5.33-11.28,23.107-16.183,35.271-19.608,10.8-3.073,22.337-4.933,33.449-6.88a253.452,253.452,0,0,1,25.5-3.16c18.8-1.282,37.645-2.823,56.469-3.621v-2.947c-2.316.163-4.553.449-7.036.719-1.908.177-6.469.737-8.036-.828-1.453-1.5-.2-3.247.256-4.9.2-.737-.026-1.947.372-2.628.655-1.123,4.016-2.778,5.042-3.515a35.109,35.109,0,0,1,9.4-4.539v-21.3c-.427.286-.873.551-1.283.852-7.749,5.757-12.963,13.673-20.74,19.521-3.848,2.9-9.316,4.487-13.819,6.468a164.2,164.2,0,0,1-16.439,6.083c-7.236,2.276-14.332,4.725-21.625,6.823-10.086,2.866-21.824,4.31-32.423,4.96-9.515.563-18.659-.677-28.12-1.535-8.377-.768-16.554-1.6-24.845-2.983-6.95-1.18-13.562-3.368-20.455-4.725-7.806-1.565-15.842-2.865-23.5-4.873-10.314-2.688-22.452-4.578-29.831-12.168-4.728-4.813-4.359-12.078-.369-17.276,3.047-3.988,10.34-4.725,15.015-6.672,6.78-2.835,13.531-5.76,20.6-8.036,15.814-5.077,32.109-9.772,48.663-12.608,11.055-1.95,22.253-3.19,33.42-4.4,4.1-.445,8.149-.473,12.193-1.391a99.067,99.067,0,0,1,11.055-2.125c9.714-1.093,19.829-.413,29.659-.443a95.677,95.677,0,0,1,13.335.707c4.3.563,8.66-.057,12.992.3,11.055.888,21.994,1.565,33.135,1.715,1.141.018,2.268.091,3.39.175V903.7c-3.5-.123-7.005-.208-10.513-.2-12.879.03-26.753,1.24-39.433-.857-4.956-.8-9.885-1.8-14.785-2.835-5.7-1.21-12.908-2.393-17.552-5.61-3.7-2.6-5.7-6.2-2.762-9.745,2.963-3.515,5.783-6.468,10.314-8.475,4.843-2.185,8.717-5.258,13.817-7.031s9.374-4.635,14.759-5.965c8.947-2.185,18.6-2.745,27.808-3.573,6.13-.554,12.246-1,18.348-1.5V851.42c-.827.078-1.649.171-2.479.25-6.924.65-13.819,1.595-20.769,2.185-6.1.5-12.193-.087-18.292.385-6.01.473-11.966,1.21-18,.5a56.617,56.617,0,0,0-7.408-.71,24.2,24.2,0,0,1-1.312-3.75c-1.026,3.84-3.762,1.6-7.094-.443-2.393-1.478-5.356-2.1-8.005-3.278-4.047-1.773-8.091-3.515-12.109-5.405-4.7-2.185-10.4-3.22-15.526-4.4a118.883,118.883,0,0,1-17.465-5.375c-8.832-3.368-20.143-8.74-24.986-16.391-9.033-14.206,28.29-14.826,36.24-15.208,18.6-.915,37.237-1.86,55.87-2.952,11.34-.623,22.706-1.3,34.075-1.655,9.149-.244,18.166-.108,27.266-.021v-43.4a133.967,133.967,0,0,0-23.164-2.149c-22.392.265-44.219-.3-66.469,2.862-22.165,3.133-44.274,5.553-66.412,8.951-23.107,3.512-45.9,7.53-69.09,10.128-19.374,2.155-39.575.5-59.033.5-8.036,0-13.049-.8-19.717-3.928a147.754,147.754,0,0,1-14.56-7.768c-28.861-17.483-65.328-12.936-97.667-12.936-31.054,0-62.137-1.267-92.479,6.173-6.725,1.655-12.764,3.4-18.889,6.706-5.442,2.953-5.869,4.665-8.976,10.01-5.071,8.683-12.793,18.663-21.054,24.159-14.274,9.478-38.206,8.828-53.535,4.253-2.393-.71-4.3-2.393-6.667-3.251-2.762-1-5.013-.62-7.835-.975-5.725-.737-10.94-2.3-16.78-2.363-10.057-.057-20.172-.087-30.258.06-4.1.06-5.013-1.183-8.489-2.3-4.3-1.39-10.2-1.833-14.7-2.188-13.876-1-27.58-4.665-41.627-4.518-9.628.09-18.6-.03-28.033,1.8-6.639,1.27-13.107.117-19.688,1.622-5.5,1.243-11,1.655-16.5,2.835-4.872,1.065-9.714-.174-14.586.71-10.23,1.83-20.544,1.89-30.714,3.78-5.9,1.093-11.738.03-17.693.385-6.068.352-11.738,2.3-17.863,2.39-13.534.208-27.1-.235-40.656-.057-6.327.087-9.6-3.1-15.015-6.143-13.617-7.621-29.46-10.985-44.219-15.151-13.078-3.72-26.952-4.755-40.085-8.388-10.57-2.922-22.023-3.9-32.936-3.867-25.557.087-51.114,0-76.67,0-30.683,0-61.255,3.425-91.369,8.74-3.9.71-7.806-.235-11.709.385-3.133.5-5.984,1.652-9.146,2.125-4.7.68-9.4,1.508-14.131,2.245-6.555,1.005-12.395,1.86-18.264,4.963-11.8,6.2-26.353,9.125-39.4,12.373a83.7,83.7,0,0,1-21.6,2.748,51.1,51.1,0,0,1-16.1-2.305c-6.07-1.8-12.709-2.272-18.408-4.37-8.461-3.073-17.094-6.113-25.84-8.445-8.832-2.336-17.209-2.305-26.041-3.9-6.44-1.15-13.335-3.13-19.858-3.425-13.335-.674-26.034-2.08-39.047-1.67v24.4c.177-.009.35-.006.527-.015,10.484-.59,20.769-2.068,31.169-3.368a151.852,151.852,0,0,1,47.666,1.3c6.722,1.24,13.191,3.485,19.858,5.02,7.662,1.743,15.612,3.043,23.133,5.228,7.808,2.245,15.073,5.67,22.908,8,4.644,1.357,9.686,2.922,13.675,5.493,6.468,4.105,16.355,11.458,18.149,18.636,1.112,4.578-1.623,6.937-5.955,9.183A84.835,84.835,0,0,1,166.9,854.18a163.578,163.578,0,0,1-23.7,3.663c-8.206.59-16.384-.118-24.588.56-31.711,2.57-61.825,12.523-93.623,14.236q-3.546.194-7.08.394v2.92a211.4,211.4,0,0,1,24.032-2.811c10.486-.828,20.855-2.336,31.368-3.013,30.656-1.89,61.427-1.92,92.112-.828,12.735.472,25.413,1.27,38.119,1.95,13.848.767,27.7.767,41.512,1.712.542.027,1.084.057,1.6.087,17.748,1.21,35.413,2.983,53.106,4.668,14.617,1.388,30.143,1.535,43.706,6.967,1.767.71,3.505,1.448,5.186,2.215.77-.56,1.594-1.123,2.45-1.622,10.94-6.441,25.9-5.258,37.837-1.893,3.445.948,6.694,2.128,10.029,3.281,7.379,2.54-4.9,7.235-7.921,7.678a77.227,77.227,0,0,1-21.026-.117c-8.034-1.066-14.5-4.253-21.368-7.326a76.448,76.448,0,0,1-6.838,4.9,32.951,32.951,0,0,1-6.924,2.922c-11.055,3.251-22.279,4.9-32.394,10.339-3.361,1.83-6.78,3.485-9.432,6.083-1.822,1.773-2.393,4.045-4.016,5.878-2.906,3.308-7.466,3.217-11.6,4.135a45.743,45.743,0,0,1-9.913.707c-5.557.03-10.827,1.6-16.327,1.92-9.118.56-18.007.8-26.7,3.455-12.395,3.837-21,14.5-34.475,15.178-3.275.147-6.408.888-9.714.975-3.647.06-7.293-.235-10.94-.087-2.565.118-4.958.825-7.494,1.032-2.479.178-5.071-.057-7.578-.03a35.191,35.191,0,0,1-13.932-2.687c-2.934-1.27-5.555-3.66-8.149-5.345-6.353-4.162-11.824-9.448-18.918-12.52-7.919-3.485-16.1-4.99-24.758-5.553-5.953-.412-11.851-1.682-17.863-1.947-5.982-.208-11.738-.888-17.806-.888-7.238-.057-14.274.915-21.539.888-4.526,0-8.986.066-13.435-.045v8.617c6.8-.141,13.615-.169,20.443-.157,8.377.03,16.523-.824,24.845-.975,6.039-.118,11.822.532,17.777.975,4.018.325,7.835.65,11.824.888a45.845,45.845,0,0,1,10.029,1.86,36.187,36.187,0,0,1,17.01,10.543,16.027,16.027,0,0,1,4.073,14.233c-.571,2.982-1.851,5.965-2.764,8.921-.767,2.48-1.367,4.7-3.476,6.555-4.157,3.693-11.453,3.72-17.036,3.72-11.225,0-22.507-2.125-33.677-3.04-11.594-.975-22.992-2.631-34.646-2.6-4.79.027-9.607,0-14.4,0v5.7c9.328.127,18.619.343,27.964.708,11.311.5,22.737,2.1,34.046,2.04,8.12-.09,18.122-1.448,25.785.885,2.678.8,7.437,2.038,5.67,4.635-1.4,2.1-6.78,2.956-9.118,3.78-3.846,1.33-7.72,2.453-11.594,3.693-4.3,1.327-7.808,3.693-11.882,5.432-3.3,1.448-6.751,2.453-10,3.931-4.558,2.065-9.031,4.132-13.733,5.845-3.961,1.418-7.921,2.245-11.853,3.485h-.029c-8.245-2.73-16.737-4.969-25.257-7.136v1.984c.408.168.849.295,1.239.488,6.667,3.277,13.649,5.965,19.489,10.3,4.586,3.428,9.316,7.178,11.8,12.051a12.091,12.091,0,0,1,1.338,5.64c.058,1.565-1.482,3.455-2.136,1.89a28.722,28.722,0,0,1-11.568,1.86,83.207,83.207,0,0,0-10.542.238,94.473,94.473,0,0,1-9.616.638V1133.5c47.438,3.9,94.965,7,142.5,10.1,56.726,3.693,82.937-59.95,139.635-56.258,32.7,2.132-49.912,65.62-6.981,77.786,8.154,2.311,193.2,22.473,195.45,12.037,1.043-4.851-97.433-.685-135.389-12.037-45.255-13.535-30.551-42.617-16.468-45.419,42.958-8.548,159.368,13.465,170.746,13.793,1.213.034,74.636,95.358,76.668,95.306,14.372-.368-67.1-92.7-46.726-109.1,30.364-24.434,163.127,23.688,178.411,23.891,26.351.351-81.121,19.965-54.5,20.024,56.329.142,211.6,55.718,268.215,55.795,1.007,0-90.838-23.868-123.394-42.254-28.522-16.106-20.418-28.168-19.4-28.169,43.648-.048,188.309-34.576,232.03-34.367,64.945.309,78.983,51.843,143.878,50.5,102.966-2.125,206.332.975,309.128-5.077q14.586-.862,29.174-1.692Zm-224.795-92.8c16.725-3.512,31.968,2.748,48.265,3.753,6.1.383,12.563.795,18.434,2.805,4.785,1.652,16.437,5.935,16.125,11.545l-10.314,2.423c-10.57,4.813-13.45,6.971-23.478,7.323-9.2.3-19.573.533-28.69-.62-7.691-.972-19.115-2.3-25.583-6.585-3.62-2.42-10.968-7.648-10.371-12.168.77-6.053,10.484-7.413,15.612-8.476m8.036-55.815c-1.369,1.24-4.9,2.037-6.667,2.57-7.979,2.363-16.753,2.3-25.1,2.125-2.649-.087-4.987-1.032-7.636-1.032-.741,0-1.793.235-2.505.177-2.338-.208-4.188-1.773-6.1-2.925,1.966,1.98-.8.472-4.045-2.125-2.393-1.89-3.134-2.926-.314-4.9,3.476-2.393,8.691-2.54,12.963-2.363,8.293.355,16.583,2.51,24.9,2.9a80.707,80.707,0,0,1,11.966.885c1,.2,3.819.65,4.188,1.475.228.5-1.2,2.835-1.652,3.221m-34.533,62.873c-4.471,3.455-10.8,5.761-16.068,8.123-15.84,7.058-34.075,9.568-51.37,12.463-29.8,4.9-60.514,6.555-90.686,8.858-36.07,2.748-71.113.68-106.641-5.107a241.442,241.442,0,0,1-36.185-8.891c-9.827-3.187-18.973-6.793-26.753-13.053-9.971-8-20.455-17.983-14.586-30.446,5.327-11.311,23.078-16.183,35.243-19.641,10.8-3.04,22.366-4.9,33.449-6.85a246.553,246.553,0,0,1,25.528-3.161c19.458-1.357,39-2.952,58.519-3.72a538.032,538.032,0,0,1,60.943.738c6.154.442,12.251,1.183,18.376,1.682,7.18.563,14.531.178,21.709.208,11.17.03,22.2-1.565,33.392-.858,8.492.475,17.3.888,25.442,3.133,6.013,1.652,10.57,4.253,15.842,7.028a51.025,51.025,0,0,0,7.322,3.515c2.222.8,3.9,1.15,5.869,2.537,2.194,1.6,4.929,4.638,5.785,7.031.882,2.42.995,4.99,2.079,7.413a15.01,15.01,0,0,1,1.367,5.61c.2,2.657,1.539,4.815.913,7.53a47.976,47.976,0,0,1-1.824,5.64,26.5,26.5,0,0,1-3.39,5.553c3.162-.265-2.194,3.073-4.275,4.665m56.726-105.842c-1.168.65-2.422,2.835-4.073,5.818-1.738,3.19-4.131,3.988-7.751,2.57-3.618-1.387-5.754-3.6-8.688-5.613-3.79-2.6-8.262-2.363-12.706-3.9-5.728-1.947-11.481-5.875-17.751-6.377-9.06-.68-17.722-2.805-26.866-2.778-7.95.06-15.926-.027-23.876.03-5.128.06-10.029-1.033-15.157-.945-5.358.06-10.57-.8-15.955-.915-9.345-.238-21.682-1.92-28.148-8.418-2.508-2.51-1.767-4.25-1.026-7.205.94-3.78,2.563-5.7,6.209-8,5.3-3.368,10.942-4.755,17.437-5.58,7.751-.945,15.3-2.128,23.107-2.54,7.55-.445,14.871-.975,22.452-.945a191.4,191.4,0,0,0,20.2-.74c3.791-.382,7.466-.057,11.254-.147,4.275-.088,8.492-.8,12.735-.975,6.5-.322,12.963-1.062,19.4-1.86,13.7-1.683,27.609-4.813,41.512-4.755,10.57.06,18.434,2.453,23.62,10.6,2.534,3.928,2.534,8.15-.513,11.9-1.481,1.893-5.1,3.4-7.35,4.608-2.165,1.183-4.3,1.565-6.555,2.57a52.8,52.8,0,0,1-6.408,2.8,64.187,64.187,0,0,0-8.406,3.1c-3.618,1.625-8.007,2.363-8.918,6.5a14.614,14.614,0,0,0,2.223,11.193m-153.878-1.625c13.5-.8,27.007-1.18,40.515-1.917,11.908-.65,23.076.972,34.7,2.39,8.8,1.1,18.235.563,26.782,2.305a93.93,93.93,0,0,1,12.335,3.512c4.987,1.743,13.761,3.133,16.554,6.736,2.136,2.745-5.471,7.735-8.518,9.183-3.021,1.478-5.869,2.9-8.861,4.43-2.023,1.092-4.361,2.423-2.851,1.123-5.327,1.328-8.2,1.92-13.447,1.86-4.188-.03-8.377,0-12.594,0-6.437,0-11.738-.03-17.835,1.153-7.976,1.535-15.955,2.48-23.62,4.725-2.05.59-4.157,1.86-6.068,2.362a80.907,80.907,0,0,1-8.432,1.327c-15.073,2.1-30.287,1.656-45.729,1.656h-14.7c-6.866,0-13.39.827-20.227.975-14.447.322-29.033-.06-43.506-.06h-46.839c-13.476,0-27.635.858-40.03-3.338-5.584-1.89-11.908-5.02-9.914-9.507,1.024-2.275,3.56-4.283,5.9-6.025,3.989-2.953,7.61-6.086,11.8-8.918,3.364-2.275,5.843-4.578,10.144-6.056,5.641-1.95,10.968-2.6,17.209-3.247,23.191-2.483,47.609-3.073,71.113-3.043,25.329.03,50.886-.117,76.129-1.625m190.576,25.9a4.638,4.638,0,0,1,2.733,3.188c-2.934,1.742-7.152,1.742-10.542,2.188q-8.246,1.016-16.523,1.86c-8.748.885-17.664,2.155-26.439,2.095a88.362,88.362,0,0,0-10.8.858c-1.937.177-6.5.767-8.036-.8-1.482-1.5-.2-3.247.256-4.933.2-.737-.057-1.947.343-2.6.683-1.153,4.018-2.805,5.042-3.542,6.24-4.4,13.905-5.968,21.625-7.443,8.8-1.625,17.3-.767,26.211-.268,5.67.325,10.942,1.3,15.586,4.135,1.908,1.183,8.034,5.05.542,5.258m24.787-64.913c6.979-1.388,13.332,1.062,20.141,1.448a31.855,31.855,0,0,1,7.693,1.092c2.023.65,6.9,2.3,6.751,4.49l-4.3.915c-4.416,1.89-5.612,2.745-9.8,2.862a81,81,0,0,1-11.994-.235c-3.22-.385-7.979-.885-10.686-2.57-1.508-.945-4.586-2.953-4.33-4.7.314-2.363,4.387-2.892,6.526-3.308m-10.314,17.748c17.492-1.77,34.387-1.947,51.169,3.633,3.96,1.33,8.66,3.958,10.426,7.5,1.424,2.893.4,4.518-2.107,6.615-3.817,3.187-7.322,7.353-7.037,12.138.142,2.242,1.424,3.75,2.079,5.7.4,1.27,2.565,5.111,2.251,5.965-15.272,2.128-30.942.208-46.127-1.592a233.167,233.167,0,0,1-27.578-4.9,39.512,39.512,0,0,1-11.824-4.9c-2.68-1.625-5.33-3.278-8.12-4.755-3.162-1.625-6.78-2.54-9.887-4.162-1.8-.888-2.05-.975-2.335-2.808-.456-2.745,1.2-4.783,3.246-6.7,11.455-10.721,30.4-10.13,45.844-11.726m-395.2-63.965c8.633-7.353,21.738-12.021,33.277-14.735,12.908-3.043,26.724-5.7,40.088-6.558,14.5-.915,29.544-.087,43.962,1.33,8.518.855,16.979,2.215,25.384,3.633,6.411,1.092,12.507,3.04,18.832,4.37a107.928,107.928,0,0,0,17.151,1.682c9.175.295,18.633,2.333,27.609,3.78a75.621,75.621,0,0,1,11.51,2.805c2.165.68,5.071,2.9,7.434,2.778l6.7,5.7c2.222-.322,4.445-.59,6.639-1.062a89.048,89.048,0,0,0,11.112-3.573c15.67-5.583,32.337-8.505,48.889-11.311,22.452-3.84,45.216-5.848,67.9-8.18,8.717-.885,17.437-1.625,26.182-2.1,7.293-.382,14.358-1.478,21.738-.737,18.405,1.89,36.981,2.775,55.472,3.542,13.96.593,26.981,3.308,40.4,6.29,3.165.71,6.866.828,9.775,2.128,1.45.62,4.214,1.625,4.927,3.013-.228.2-.427.442-3.9.707a44.717,44.717,0,0,1-13.96,1.86c-4.757.03-9.686-1.123-14.33-.8-13.819,1.092-27.75,1.183-41.569,2.423-6.7.62-13.476.68-20.143,1.418-6.01.65-12.193,1.418-18.261,1.655-5.044.175-10.028.972-15.1.915-6.039-.03-11.565.382-17.55.915-4.1.382-8.377.59-12.421,1.153-1.654.2-6.3.56-7.379,1.86-.856.975-.144,4.193-.144,5.4,0,2.01.256,3.753-1.367,5.405-3.021,3.16-9.374,4.253-13.7,5.08-12.481,2.45-25.216,4.253-37.865,5.878-9.487,1.18-19,1.357-28.376,3.01-9.973,1.742-20.059,2.63-30.143,3.75-8.12.918-16.782.238-24.617,1.863-4.188.885-10.57.885-14.018-1.625-5.84-4.223-1.908-8.918,1.853-13.053,5.526-6.113,13.531-10.573,21.85-14.236l-1.88-1.6a44.02,44.02,0,0,0-6.154,1.3,109.86,109.86,0,0,0-35.5,18.784c-3.021,2.42-6.154,4.548-9.288,6.91-3.361,2.54-7.036,3.13-11.17,4.313-12.735,3.63-26.751,4.842-40.085,5.875-21.568,1.625-43.334-1.27-64.76-2.923-8.976-.68-17.664-2.57-26.554-3.9-7.55-1.123-15.07-1.95-22.308-4.313-7.777-2.57-21.539-6.85-23.989-14.913-1.709-5.553,3.531-12.255,7.864-15.918m-19.261,58.8c20.23-1.092,40.344-.412,60.517-1.357,19.345-.915,38.975-.472,58.378-.472,11.652,0,22.963-.325,34.387.945a180.621,180.621,0,0,1,20.515,3.72,63.478,63.478,0,0,1,12.421,4.7,33.438,33.438,0,0,1,4.018,2.245,11.63,11.63,0,0,1,2.649,1.92c1.338,1.33,1.8,2.835,2.819,4.223.571.8,3.591,2.48,4.56,2.865-22.224,3.425-46.47,4.635-69.632,5.553-11.738.442-22.992,1.15-34.816.972-6.782-.087-13.363-.945-20.143-1.032-7.578-.117-15.1.208-22.68-.148-26.7-1.3-55.386-.412-80.116-6.29-6.581-1.565-8.6-5.11-6.725-8.388,4.076-7.145,20.856-8.74,33.847-9.451M572.843,838.854c.6-2.985,3.7-4.608,5.84-6.883,5.241-5.61,13.874-9.685,21.882-11.961,4.272-1.21,7.492-3.6,11.68-4.96a124.026,124.026,0,0,1,14.387-3.338c9.916-1.978,19.6-5.138,29.575-6.823,15.555-2.6,32.565-2.862,48.349-1.77,9.573.647,18.576,1.327,28.232.768,10.487-.62,20.771-2.1,31.141-3.4a152.914,152.914,0,0,1,47.695,1.27c6.725,1.27,13.191,3.515,19.858,5.02,7.636,1.743,15.615,3.073,23.107,5.228,7.835,2.275,15.073,5.73,22.936,8,4.644,1.36,9.686,2.955,13.675,5.493,6.466,4.135,16.353,11.488,18.12,18.666,1.139,4.578-1.625,6.94-5.927,9.183a84.842,84.842,0,0,1-22.138,7.738,167.684,167.684,0,0,1-23.7,3.633c-8.206.59-16.411-.087-24.588.563-31.74,2.6-61.826,12.52-93.649,14.263-15.926.885-31.74,1.92-47.779,1.388-11.227-.355-22.337-2.3-33.308-4.34-10.853-1.98-21.51-6.173-32.052-9.216a143.515,143.515,0,0,1-22.622-8.978c-6.238-.148-19.913-3.512-27.549-12.581-1.8-2.185-3.79-4.075-3.162-6.967m3.845,39.364c22.706,2.333,45.47,4.343,67.922,8.18,16.526,2.808,33.221,5.73,48.891,11.313a83.277,83.277,0,0,0,11.112,3.573c2.194.472,4.414.767,6.636,1.092l6.7-5.7c2.338.117,5.27-2.1,7.408-2.805a76.736,76.736,0,0,1,11.539-2.805c8.974-1.417,18.434-3.455,27.607-3.78a105.166,105.166,0,0,0,17.151-1.683c6.325-1.3,12.424-3.281,18.832-4.373,8.405-1.418,16.868-2.775,25.358-3.6,14.445-1.448,29.46-2.272,43.991-1.327,13.361.825,27.18,3.482,40.085,6.525,11.513,2.718,24.646,7.413,33.279,14.738,4.33,3.69,9.544,10.365,7.864,15.945-2.453,8.033-16.212,12.316-24.018,14.886-7.209,2.359-14.73,3.187-22.311,4.34-8.859,1.33-17.549,3.19-26.552,3.867-21.4,1.655-43.164,4.608-64.731,2.925-13.335-1.005-27.353-2.245-40.088-5.878-4.131-1.18-7.806-1.773-11.2-4.31-3.1-2.363-6.241-4.46-9.259-6.914a110.328,110.328,0,0,0-35.53-18.781,42.678,42.678,0,0,0-6.125-1.27l-1.88,1.6c8.319,3.66,16.324,8.12,21.853,14.233,3.762,4.135,7.693,8.8,1.851,13.053-3.445,2.51-9.83,2.51-14.044,1.625-7.808-1.625-16.5-.975-24.588-1.89-10.086-1.122-20.2-1.977-30.172-3.75-9.374-1.625-18.89-1.773-28.35-3.013-12.649-1.595-25.413-3.425-37.863-5.848-4.33-.825-10.685-1.92-13.733-5.08-1.6-1.652-1.369-3.425-1.34-5.432,0-1.21.683-4.43-.141-5.406-1.084-1.3-5.727-1.622-7.379-1.83-4.073-.56-8.319-.8-12.421-1.153a166.835,166.835,0,0,0-17.552-.915c-5.071.03-10.057-.737-15.128-.915-6.042-.238-12.222-1.005-18.235-1.682-6.667-.741-13.447-.8-20.143-1.391-13.817-1.24-27.748-1.327-41.6-2.39-4.644-.385-9.573.767-14.3.737a43.1,43.1,0,0,1-13.96-1.86c-3.476-.238-3.675-.472-3.9-.71.712-1.358,3.476-2.39,4.929-3.013,2.906-1.27,6.61-1.388,9.772-2.125,13.419-2.983,26.439-5.67,40.4-6.26,18.492-.8,37.067-1.686,55.472-3.545,7.379-.768,14.447.325,21.74.74,8.746.443,17.463,1.21,26.154,2.065m58.179,131.214c-2.194-1.538-4.3-2.956-6.552-4.43-2.222-1.448-7.837-6.408-6.241-9.186,2.05-3.6,8.489-4.96,12.193-6.733a55.769,55.769,0,0,1,9.089-3.515c6.3-1.713,13.248-1.21,19.745-2.3,8.547-1.418,16.78-3.043,25.554-2.363,9.973.737,19.916,1.093,29.889,1.92,18.576,1.5,37.408,1.652,56.069,1.622,17.322-.057,35.329.533,52.423,3.013,4.589.68,8.521,1.3,12.68,3.25,3.191,1.475,5.013,3.78,7.492,6.083,3.078,2.835,5.756,5.935,8.691,8.918,1.709,1.713,3.589,3.723,4.33,6,1.482,4.521-3.191,7.651-7.293,9.51-9.117,4.193-19.575,3.365-29.517,3.365h-34.5c-10.685,0-21.426.355-32.08.03-5.044-.147-9.83-.975-14.9-.975-3.618.03-7.207,0-10.827,0-11.366,0-22.594.445-33.7-1.622a50.645,50.645,0,0,1-6.212-1.36c-1.4-.5-2.963-1.743-4.474-2.363-5.67-2.215-11.539-3.16-17.408-4.7-4.5-1.21-8.4-1.153-13.162-1.153-3.078,0-6.183-.057-9.288,0-3.846.03-5.984-.56-9.887-1.86,1.112,1.27-.6-.057-2.107-1.15m-71.883-5.965c4.673-2.835,9.942-3.84,15.612-4.135,8.919-.533,17.408-1.36,26.211.295,7.722,1.418,15.387,2.983,21.625,7.413,1.026.737,4.359,2.393,5.016,3.512.4.65.17,1.863.369,2.6.456,1.682,1.738,3.425.257,4.933-1.537,1.595-6.1,1-8.034.8a93.476,93.476,0,0,0-10.8-.828c-8.775.03-17.693-1.21-26.439-2.1-5.529-.59-11.026-1.18-16.526-1.89-3.39-.443-7.607-.443-10.542-2.155a4.5,4.5,0,0,1,2.736-3.221c-7.492-.174-1.4-4.075.513-5.225M488.51,979.278c-2.508-2.065-3.534-3.72-2.11-6.585,1.738-3.542,6.468-6.2,10.429-7.53,16.78-5.553,33.675-5.375,51.169-3.6,15.442,1.565,34.36.975,45.813,11.7,2.052,1.917,3.733,3.958,3.277,6.76-.285,1.8-.571,1.863-2.338,2.778-3.1,1.6-6.722,2.54-9.885,4.163-2.793,1.447-5.442,3.1-8.12,4.725a38.26,38.26,0,0,1-11.824,4.9,220.994,220.994,0,0,1-27.58,4.9c-15.183,1.833-30.884,3.75-46.125,1.625-.314-.888,1.851-4.725,2.249-6,.657-1.95,1.937-3.455,2.081-5.671.285-4.812-3.249-8.948-7.037-12.168m-1.625,19.166c-4.673,3.251-11.851,4.43-17.549,5.643-4.9,1.032-9.83,2.007-14.787,2.8-12.678,2.1-26.554.915-39.431.885-13.733-.03-27.41,1.33-41.114.975-10.57-.265-21.167-1.505-31.737-2.008-5.3-.295-10.371-.888-15.7-.857-3.762.03-7.523.117-11.282.06-8.063-.147-16.125-1.478-24.075-2.6a180.888,180.888,0,0,1-27.863-6.317c-2.508-.771-5.214-1.421-7.408-2.808a3.78,3.78,0,0,1-2.139-3.277c-.683-.118-1.681-.945-2.393-2.658a12.971,12.971,0,0,1-1-5.05c0-4.518,3.021-7.53,6.468-10.721a43.413,43.413,0,0,1,20.484-10.04A321.457,321.457,0,0,1,315,957.1c6.269-.56,12.536-1.475,18.832-1.683a105.612,105.612,0,0,1,17.523,1.357c11.738,1.565,23.675,2.038,35.442,3.6,11.995,1.538,24.047,2.185,36.156,3.277,9.2.828,18.861,1.418,27.779,3.576,5.411,1.327,9.686,4.193,14.785,5.965s8.976,4.873,13.819,7.028c4.529,2.007,7.322,4.99,10.314,8.505,2.934,3.516.94,7.148-2.764,9.715M503.1,950.81c-.141-2.155,4.73-3.837,6.725-4.487a32.29,32.29,0,0,1,7.72-1.093c6.811-.385,13.164-2.808,20.143-1.448,2.136.412,6.212.945,6.526,3.308.254,1.742-2.822,3.78-4.332,4.7-2.707,1.682-7.466,2.215-10.683,2.57a77.445,77.445,0,0,1-11.994.235c-4.188-.117-5.385-.945-9.8-2.835Zm98.293,22.416c-.911-4.105-5.327-4.846-8.945-6.5a63.675,63.675,0,0,0-8.377-3.073,52.835,52.835,0,0,1-6.411-2.8c-2.251-1.033-4.416-1.388-6.552-2.567-2.251-1.24-5.869-2.748-7.379-4.608-3.021-3.78-3.021-8-.484-11.93,5.186-8.151,13.049-10.543,23.591-10.6,13.932-.03,27.834,3.1,41.538,4.755,6.44.8,12.905,1.535,19.374,1.86,4.275.208,8.492.885,12.764.975,3.79.117,7.437-.238,11.254.147a191.992,191.992,0,0,0,20.172.737c7.607-.03,14.929.533,22.478.945,7.809.415,15.358,1.6,23.078,2.57,6.526.8,12.167,2.215,17.465,5.58,3.646,2.305,5.272,4.2,6.212,7.976.741,2.953,1.453,4.7-1.026,7.205-6.468,6.5-18.8,8.21-28.148,8.418-5.385.117-10.6,1-15.984.915-5.1-.06-10,1-15.128.975-7.979-.09-15.926,0-23.876-.03-9.173-.06-17.806,2.095-26.866,2.775-6.269.472-12.023,4.4-17.751,6.35-4.445,1.535-8.918,1.327-12.706,3.9-2.963,2.037-5.073,4.253-8.691,5.64s-6.01.59-7.777-2.57c-1.652-2.982-2.877-5.195-4.047-5.818a14.684,14.684,0,0,0,2.222-11.22m241.831,7.266c-4.272.352-8.518.027-12.793.147-3.817.118-7.521.945-11.338,1.033-6.7.178-13.021-.5-19.63-.975-13.078-.915-26.724-2.095-39.261-5.58a10.494,10.494,0,0,0,2.563-2.835,32.03,32.03,0,0,1,1.6-4.166,7.739,7.739,0,0,1,1.482-1.977,23.074,23.074,0,0,1,2.251-2.245,28.456,28.456,0,0,1,7.008-4.665,63.711,63.711,0,0,1,11.568-3.75c6.44-1.27,12.822-.918,19.4-.918,10.94,0,21.994-.442,32.905.472,11.369.915,22.709.238,34.106,1.361,7.322.707,16.78,2.272,19.089,9.421a6.521,6.521,0,0,1-3.79,8.388c-13.932,5.875-30.114,5.02-45.158,6.291M389.191,870.128c-36.07,2.745-71.144.677-106.643-5.11a241.326,241.326,0,0,1-36.182-8.858c-9.83-3.22-18.976-6.793-26.782-13.056-9.942-8-20.426-18.013-14.56-30.476,5.3-11.28,23.078-16.183,35.245-19.608,10.8-3.043,22.337-4.933,33.447-6.883a255.019,255.019,0,0,1,25.528-3.157c19.46-1.33,39-2.955,58.522-3.723a537.345,537.345,0,0,1,60.941.74c6.154.472,12.251,1.21,18.377,1.682,7.152.56,14.531.178,21.711.235,11.167.03,22.164-1.565,33.392-.885,8.489.5,17.293.915,25.442,3.13,6.01,1.655,10.57,4.283,15.84,7.058a54.589,54.589,0,0,0,7.324,3.515c2.22.8,3.874,1.123,5.869,2.54,2.194,1.565,4.927,4.608,5.783,7,.882,2.423,1,5.02,2.081,7.413a14.565,14.565,0,0,1,1.338,5.613c.228,2.688,1.566,4.843.94,7.557a55.865,55.865,0,0,1-1.822,5.613,25.839,25.839,0,0,1-3.392,5.553c3.136-.268-2.194,3.07-4.272,4.665-4.474,3.485-10.8,5.788-16.07,8.12-15.84,7.058-34.075,9.6-51.368,12.463-29.8,4.933-60.514,6.555-90.686,8.861m-79.262,36.767c4.757-1.92,10.369-2.272,15.471-2.983,7.036-.975,13.9-2.038,21.026-2.363,17.437-.767,34.873-1.92,52.31-2.068,11.083-.087,22.023-.352,33.135,0,11.366.295,22.706.975,34.075,1.625,18.6,1.063,37.266,2.008,55.87,2.923,7.919.385,45.271,1.005,36.24,15.241-4.843,7.648-16.154,12.993-24.986,16.388a124.981,124.981,0,0,1-17.465,5.375c-5.128,1.153-10.827,2.185-15.526,4.4-4.018,1.89-8.065,3.6-12.138,5.406-2.62,1.153-5.584,1.8-7.979,3.248-3.332,2.037-6.068,4.283-7.094.472a26.819,26.819,0,0,1-1.309,3.753,52.278,52.278,0,0,0-7.408.707c-6.068.707-11.995-.06-18.007-.532-6.1-.472-12.222.12-18.29-.382-6.953-.563-13.848-1.508-20.769-2.158-20.059-1.917-39.86-4.223-59.519-8.18-8.063-1.592-13.22-5.64-19.316-9.98-4.1-2.953-9.117-4.638-13.277-7.443a86.98,86.98,0,0,1-11-8.978c-1.539-1.418-3.874-3.455-3.932-5.523-.141-4.34,6.01-7.413,9.887-8.948m-87.867,30.8c3.39-4.457,9.031-4.635,14.73-4.6,6.068.03,12.107-.03,18.177,0,5.612.057,11-.858,16.552-.975,11.2-.238,22.821,1.3,33.9,2.8,2.479.355,19.772,1.565,19.4,5.61-.2,2.1-6.782,3.22-8.405,3.723a177.4,177.4,0,0,1-20.541,4.725c-16.952,3.04-35.842,4.37-52.993,1.83,2.764-2.775-28.264-3.338-20.827-13.114M109.524,986.309a23.4,23.4,0,0,1,4.073-5.375c1.225-1.24,3.021-2.215,4.073-3.576,1.369-1.77,2.222-4.37,2.966-6.2,1.139-2.9,3.987-5.258,6.238-7.708,6.212-6.793,14.588-10.191,24.274-11.518,16.581-2.245,33.735-1.123,50.486-1.123,10.057,0,19.717,1.035,29.831.945a21.42,21.42,0,0,1,5.183.737c1.882.355,3.505.03,5.157.62,2.992,1.066,5.044,3.455,1.084,5.2,2.62,2.51,6.039,4.843,5.471,8.593-.885,5.848-10.685,7.8-16.1,8.445-6.523.767-12.992,1.625-19.515,2.3-3.505.385-7.351.71-10.685,1.863-1.736.59-3.162,1.535-4.929,2.038-2.22.62-4.615.737-6.866,1.21-3.162.65-6.238,1.8-9.372,2.628-5.044,1.3-10.513,1.478-15.756,2.1a128.338,128.338,0,0,1-15.073.68,101.62,101.62,0,0,0-12.45.945c-8.461.945-16.78.767-25.355.915-1.625.03-2.623.413-3.306-.857-.484-.885.2-2.125.571-2.862m79.432,91.254c-10.057,1.092-19.916,2.185-30.059,2.095-8.175-.087-16.411.5-24.531,1.153a201.852,201.852,0,0,1-26.41.65c-3.505-.208-6.95-.858-10.455-.915-2.537-.06-4.929.265-7.466-.177-5.385-.915-11.139-2.51-16.638-2.6-2.963,0-7.864.65-8.662-1.86.484-1.417,1.283-4.045,2.366-5.345,1.225-1.475,3.3-2.185,4.7-3.485,2.477-2.333,5.3-5.345,6.495-8.445.94-2.51,1.168-4.933,2.393-7.205a14.475,14.475,0,0,1,4.788-5.141c5.128-3.455,13.39-2.362,19.23-1.15,3.249.677,6.468.975,9.717,1.89,3.047.825,6.238.825,9.4,1.8,3.165,1.005,6.382,1.685,9.345,2.955,3.476,1.445,7.238,1.77,10.942,2.568,3.018.68,6.1.915,9.173,1.98,2.052.677,3.819.5,5.869.885a16.331,16.331,0,0,1,1.853.768c1.424.325,2.791-.087,4.188.147,3.476.533,6.411,1.448,9.686,2.128,4.188.885,8.492,1.89,12.822,2.775,4.759.975,9.544,2.125,14.246,3.308,2.165.563,5.728.885,7.322,2.332,7.521,6.733-17.607,8.6-20.314,8.891m191.089-31.984c-.343,2.007-1.681,2.835-3.22,4.4-6.212,6.408-14.644,8.565-23.7,10.573-14.96,3.308-31.512,2.658-46.813,3.455-11.481.59-22.764.68-34.274.737-8.717.06-17.437-.8-26.183-.945-7.437-.087-14.986-.737-22.423-1.18-8.319-.5-16.751-.8-25.015-1.86-9.031-1.123-17.72-2.6-26.552-4.49-6.84-1.448-13.591-2.393-20.2-4.638-12.222-4.162-25.471-5.667-37.779-9.507-12.193-3.871-25.586-6.381-37.009-11.753-3.874-1.8-8.091-2.688-12.222-3.958a103.9,103.9,0,0,1-13.934-5.553c5.1-.087,4.816-.147,4.531-.177-.484-2.54-5.157-6.32-2.707-8.536,1.225-1.093,3.932-1.24,5.5-1.83a30.984,30.984,0,0,0,4.757-2.54,81.167,81.167,0,0,1,7.864-4.135c5.3-2.038,12.309-2.272,17.95-2.54a501.568,501.568,0,0,0,50.258-4.545c8.775-1.27,17.863-2.011,26.782-2.57,8.489-.563,17.437-1.508,25.9-1.123a269.62,269.62,0,0,1,47.695,7.058c16.78,3.9,33.7,7.028,50.857,9.715,15.5,2.423,31.34,3.927,46.554,7.473,9.2,2.125,17.892,4.782,25.583,9.715a56.981,56.981,0,0,0,5.358,2.658c1.764.858,4.243,1.565,5.725,2.718a18.509,18.509,0,0,1,6.44,9.39,10.467,10.467,0,0,1,.285,3.988m257.642,17.041c-7.406,7.591-19.515,9.451-29.858,12.165-7.665,1.981-15.67,3.281-23.476,4.846-6.9,1.388-13.5,3.543-20.457,4.725-8.29,1.418-16.5,2.242-24.871,2.983-9.432.855-18.578,2.095-28.093,1.535-10.6-.65-22.337-2.038-32.423-4.963-7.293-2.095-14.387-4.548-21.625-6.82a164.194,164.194,0,0,1-16.437-6.082c-4.5-1.98-10-3.576-13.819-6.468-7.78-5.848-12.992-13.763-20.743-19.494-3.675-2.745-8.2-4.6-11.594-7.413-4.047-3.365-10-6.26-15.1-8.355-3.618-1.508-5.982-3.693-8.945-5.938a74.364,74.364,0,0,0-7.751-4.783c1.055-1.595,2.052-2.393,4.5-3.338,4.644-1.773,10.172-.738,15.157-.885,3.591-.121,6.9-1.035,10.542-1.005,5.186.117,10.144-.888,15.3-.945,11.139-.148,22.081-.828,33.135-1.743,4.33-.325,8.688.3,12.992-.295a96.038,96.038,0,0,1,13.332-.71c9.83.03,19.916-.647,29.659.445a92.289,92.289,0,0,1,11.057,2.155c4.016.915,8.091.915,12.193,1.357,11.167,1.21,22.363,2.51,33.418,4.4,16.554,2.865,32.852,7.53,48.663,12.641,7.065,2.272,13.819,5.2,20.6,8,4.673,1.98,11.966,2.688,15.015,6.676,3.961,5.2,4.359,12.46-.372,17.306M983.6,1092.654c-7.777,6.26-16.924,9.863-26.753,13.053a237.853,237.853,0,0,1-36.182,8.917c-35.53,5.791-70.574,7.828-106.643,5.08-30.172-2.275-60.883-3.927-90.686-8.86-17.293-2.865-35.557-5.4-51.37-12.433-5.3-2.363-11.623-4.7-16.1-8.15-2.05-1.6-7.408-4.9-4.243-4.665a26.474,26.474,0,0,1-3.39-5.553,45.961,45.961,0,0,1-1.825-5.64c-.628-2.718.712-4.843.911-7.5a14.363,14.363,0,0,1,1.367-5.613c1.084-2.423,1.2-5.02,2.052-7.443a18.206,18.206,0,0,1,5.811-7c1.966-1.418,3.62-1.773,5.869-2.54a49.262,49.262,0,0,0,7.3-3.542c5.3-2.778,9.858-5.348,15.869-7,8.149-2.245,16.952-2.657,25.442-3.16,11.2-.68,22.224.945,33.392.857,7.18-.03,14.531.382,21.711-.208,6.126-.472,12.222-1.209,18.348-1.682a537.941,537.941,0,0,1,60.97-.74c19.518.8,39.033,2.423,58.522,3.753a244.94,244.94,0,0,1,25.5,3.13c11.11,1.947,22.678,3.837,33.447,6.85,12.2,3.455,29.944,8.328,35.271,19.638,5.869,12.463-4.615,22.447-14.586,30.449M1327,1044.1c-4.131,1.24-8.348,2.158-12.222,3.958-11.426,5.375-24.816,7.885-37.012,11.726-12.306,3.868-25.554,5.372-37.776,9.538-6.61,2.245-13.364,3.19-20.2,4.638-8.861,1.89-17.523,3.335-26.554,4.488-8.262,1.062-16.7,1.36-25.015,1.86-7.437.442-14.986,1.065-22.45,1.183-8.72.117-17.437.975-26.156.945-11.51-.06-22.819-.177-34.274-.737-15.3-.8-31.853-.151-46.81-3.485-9.089-2.01-17.492-4.166-23.7-10.543-1.539-1.6-2.879-2.393-3.248-4.43a11.086,11.086,0,0,1,.314-3.988,18.77,18.77,0,0,1,6.437-9.39c1.482-1.122,3.961-1.83,5.727-2.687a54.065,54.065,0,0,0,5.356-2.688c7.693-4.9,16.382-7.56,25.586-9.688,15.214-3.573,31.054-5.047,46.554-7.5,17.151-2.658,34.046-5.788,50.857-9.685,15.327-3.575,31.824-6.35,47.693-7.061,8.463-.382,17.408.563,25.9,1.1,8.887.56,17.976,1.327,26.78,2.6a500.748,500.748,0,0,0,50.258,4.548c5.644.268,12.651.473,17.95,2.54a73.467,73.467,0,0,1,7.864,4.135,35.035,35.035,0,0,0,4.73,2.54c1.6.59,4.3.737,5.5,1.83,2.45,2.185-2.194,5.965-2.68,8.536-.283.027-.568.087,4.531.147A103.411,103.411,0,0,1,1327,1044.1"
          transform="translate(-147.458 -225.293)"
        />
      </g>
      <g className="qj" transform="translate(512.097 924.517)">
        <path
          className="qk"
          d="M0,0,78.846.079l.079,78.846L.079,78.846Z"
          transform="translate(-27.904 27.848) rotate(-45)"
        />
      </g>
      <g transform="translate(0 52.772)">
        <path
          className="qm"
          d="M10627.108-1852.742l-14.225-95.466-22.128,5.374Z"
          transform="translate(-10160 2444)"
        />
        <path
          className="qm"
          d="M10590.755-1852.742l14.225-95.466,22.128,5.374Z"
          transform="translate(-9977.999 2444)"
        />
        <path
          className="qm"
          d="M10627.108-1852.742l-14.225-95.466-22.128,5.374Z"
          transform="translate(-6146.894 -7594.65) rotate(60)"
        />
        <path
          className="qm"
          d="M10590.755-1852.742l14.225-95.466,22.128,5.374Z"
          transform="translate(-6055.893 -7437.033) rotate(60)"
        />
        <path
          className="qm"
          d="M10627.108-1852.742l-14.225-95.466-22.128,5.374Z"
          transform="translate(4553.039 -9138.82) rotate(120)"
        />
        <path
          className="qm"
          d="M10590.755-1852.742l14.225-95.466,22.128,5.374Z"
          transform="translate(4462.039 -8981.203) rotate(120)"
        />
        <path
          className="qm"
          d="M10627.108-1852.742l-14.225-95.466-22.128,5.374Z"
          transform="translate(11239.932 -644.889) rotate(-180)"
        />
        <path
          className="qm"
          d="M10590.755-1852.742l14.225-95.466,22.128,5.374Z"
          transform="translate(11057.932 -644.888) rotate(-180)"
        />
        <path
          className="qm"
          d="M36.353,0,22.128,95.467,0,90.093Z"
          transform="translate(326.859 650.842) rotate(120)"
        />
        <path
          className="qm"
          d="M0,0,14.225,95.467l22.128-5.374Z"
          transform="translate(235.859 808.459) rotate(120)"
        />
        <path
          className="qm"
          d="M36.354,0,22.129,95.466,0,90.093Z"
          transform="translate(217.683 959.415) rotate(60)"
        />
        <path
          className="qm"
          d="M0,0,14.226,95.466l22.128-5.374Z"
          transform="translate(308.683 1117.031) rotate(60)"
        />
      </g>
      <path
        className="qn"
        d="M10788.336-1911.541s-51.526-9.167-92.621-8.535-81.873,8.535-81.873,8.535l-5.586-47.49s37.1-10.807,97.23-9.082,89.751,9.753,89.751,9.753Z"
        transform="translate(-10160 2444)"
      />
      <text className="qo" transform="translate(496 514)">
        <tspan x={0} y={0}>
          {"100"}
        </tspan>
      </text>
      <path
        className="qp"
        d="M10788.336-1911.541s-51.526-9.167-92.621-8.535-81.873,8.535-81.873,8.535l-5.586-47.49s37.1-10.807,97.23-9.082,89.751,9.753,89.751,9.753Z"
        transform="translate(-9470.197 -3103.911) rotate(30)"
      />
      <text className="qo" transform="translate(723.169 552.66) rotate(30)">
        <tspan x={0} y={0}>
          {"200"}
        </tspan>
      </text>
      <path
        className="qq"
        d="M10788.336-1911.541s-51.526-9.167-92.621-8.535-81.873,8.535-81.873,8.535l-5.586-47.49s37.1-10.807,97.23-9.082,89.751,9.753,89.751,9.753Z"
        transform="translate(-6101.262 -7567.082) rotate(60)"
      />
      <text className="qo" transform="translate(898.166 696.285) rotate(60)">
        <tspan x={0} y={0}>
          {"300"}
        </tspan>
      </text>
      <path
        className="qr"
        d="M10788.336-1911.541s-51.526-9.167-92.621-8.535-81.873,8.535-81.873,8.535l-5.586-47.49s37.1-10.807,97.23-9.082,89.751,9.753,89.751,9.753Z"
        transform="translate(-951.563 -9749.418) rotate(90)"
      />
      <text className="qo" transform="translate(978.437 906.582) rotate(90)">
        <tspan x={0} y={0}>
          {"400"}
        </tspan>
      </text>
      <path
        className="qs"
        d="M10788.336-1911.541s-51.526-9.167-92.621-8.535-81.873,8.535-81.873,8.535l-5.586-47.49s37.1-10.807,97.23-9.082,89.751,9.753,89.751,9.753Z"
        transform="translate(4774.722 -8991.992) rotate(121)"
      />
      <text className="qo" transform="translate(940.808 1136.006) rotate(121)">
        <tspan x={0} y={0}>
          {"200"}
        </tspan>
      </text>
      <path
        className="qt"
        d="M180.079,0S128.553,9.167,87.458,8.535,5.585,0,5.585,0L0,47.49S37.1,58.3,97.229,56.572s89.751-9.753,89.751-9.753Z"
        transform="translate(408.121 544.774) rotate(150)"
      />
      <text className="qo" transform="translate(282.005 596.634) rotate(-30)">
        <tspan x={0} y={0}>
          {"150"}
        </tspan>
      </text>
      <path
        className="qu"
        d="M180.08,0S128.554,9.167,87.459,8.535,5.586,0,5.586,0L0,47.49S37.1,58.3,97.23,56.572s89.751-9.753,89.751-9.753Z"
        transform="translate(222.405 664.167) rotate(120)"
      />
      <text className="qo" transform="translate(140.045 771.698) rotate(-61)">
        <tspan x={0} y={0}>
          {"120"}
        </tspan>
      </text>
      <path
        className="qv"
        d="M180.08,0S128.554,9.167,87.459,8.535,5.586,0,5.586,0L0,47.49S37.1,58.3,97.23,56.572s89.751-9.753,89.751-9.753Z"
        transform="translate(120.735 858.837) rotate(90)"
      />
      <text
        className="qo"
        transform="matrix(0.017, -1, 1, 0.017, 101.394, 999.809)"
      >
        <tspan x={0} y={0}>
          {"100"}
        </tspan>
      </text>
      <path
        className="qw"
        d="M180.081,0S128.555,9.167,87.46,8.535,5.587,0,5.587,0L0,47.49s37.1,10.807,97.23,9.082,89.751-9.753,89.751-9.753Z"
        transform="translate(131.138 1085.574) rotate(59)"
      />
      <text
        className="qo"
        transform="matrix(-0.545, -0.839, 0.839, -0.545, 189.991, 1216.16)"
      >
        <tspan x={0} y={0}>
          {"150"}
        </tspan>
      </text>
      <path
        className="qq"
        d="M10788.335-1968.3s-51.526,9.167-92.621,8.535-81.872-8.535-81.872-8.535l-5.586,47.49s37.1,10.807,97.229,9.082,89.751-9.753,89.751-9.753Z"
        transform="translate(-10160 3340.241)"
      />
      <text className="qo" transform="translate(496 1417.4)">
        <tspan x={0} y={0}>
          {"100"}
        </tspan>
      </text>
      <path
        className="qx"
        d="M180.08,0S128.555,9.167,87.46,8.535,5.587,0,5.587,0L0,47.49s37.1,10.807,97.23,9.082,89.75-9.753,89.75-9.753Z"
        transform="translate(672.591 1359.626) rotate(-30)"
      />
      <text className="qo" transform="translate(737.282 1375.702) rotate(-31)">
        <tspan x={0} y={0}>
          {"200"}
        </tspan>
      </text>
      <path
        d="M180.08,56.759s-51.526-9.167-92.621-8.535S5.586,56.759,5.586,56.759L0,9.269S37.1-1.538,97.23.187,186.981,9.94,186.981,9.94Z"
        transform="translate(379.742 1408.781) rotate(-150)"
      />
      <text
        className="qy"
        transform="matrix(0.875, 0.485, -0.485, 0.875, 268.4, 1331.812)"
      >
        <tspan x={0} y={0}>
          {"FAIL"}
        </tspan>
      </text>
      <text className="ra" transform="translate(540 269)">
        <tspan x={-291.76} y={0}>
          {"Spin the Wheel"}
        </tspan>
        <tspan x={-330.36} y={100}>
          {"seize the chance!"}
        </tspan>
      </text>
      <g transform="translate(70)">
        <g className="rm" transform="matrix(1, 0, 0, 1, -77, 0)">
          <text className="rb" transform="translate(169 1497)">
            <tspan x={0} y={46}>
              {"Remaining spin attempts:"}
            </tspan>
          </text>
        </g>
        <g transform="translate(700 1463.721)">
          <path
            className="rc"
            d="M83.512,502.422m-60.24,0a60.24,60.24,0,1,0,60.24-60.24,60.24,60.24,0,0,0-60.24,60.24Z"
            transform="translate(-20.227 -439.137)"
          />
          <path
            className="oj"
            d="M65.285,547.48C29.141,547.48,2,520.339,2,484.195S29.141,420.91,65.285,420.91s63.285,27.141,63.285,63.285S101.429,547.48,65.285,547.48Zm0-118.5a55.22,55.22,0,1,0,55.22,55.22,55.061,55.061,0,0,0-55.22-55.22Z"
            transform="translate(-2 -420.91)"
          />
          <path
            className="rd"
            d="M87.89,585.43,164.7,508.624a56.676,56.676,0,0,0-21.586-17.57L69.818,564.346c4.016,8.534,10.542,15.562,18.072,21.084Zm32.128,10.542a55.061,55.061,0,0,0,55.22-55.22,58.346,58.346,0,0,0-4.016-21.084L98.934,591.956a58.348,58.348,0,0,0,21.084,4.016Z"
            transform="translate(-56.733 -477.467)"
          />
          <path
            className="re"
            d="M156.523,575.433m-40.16,0a40.16,40.16,0,1,0,40.16-40.16A40.16,40.16,0,0,0,116.363,575.433Z"
            transform="translate(-93.238 -512.148)"
          />
          <path
            className="rf"
            d="M138.27,517.02a40.16,40.16,0,1,1-40.16,40.16,40.278,40.278,0,0,1,40.16-40.16m0-5.02a45.18,45.18,0,1,0,45.18,45.18A44.992,44.992,0,0,0,138.27,512Z"
            transform="translate(-74.985 -493.895)"
          />
          <path
            className="rg"
            d="M121.383,580.452a40.278,40.278,0,0,1,40.16-40.16,38.4,38.4,0,0,1,25.6,9.538,38.342,38.342,0,0,0-30.622-14.558,40.278,40.278,0,0,0-40.16,40.16,38.343,38.343,0,0,0,14.558,30.622A38.4,38.4,0,0,1,121.383,580.452Z"
            transform="translate(-93.238 -512.147)"
          />
          <path
            className="rc"
            d="M173.546,544.582l-50.2,50.2a41.612,41.612,0,0,0,17.068,22.088l55.22-55.22a35.908,35.908,0,0,0-22.088-17.068Z"
            transform="translate(-98.715 -519.449)"
          />
          <path
            className="rd"
            d="M172.359,545.768c8.534.5,16.064,4.016,22.59,9.036a41.084,41.084,0,0,0-19.076-12.55l-3.514,3.514ZM138.223,611.53a39.432,39.432,0,0,1-9.036-22.59l-3.514,3.514a35.623,35.623,0,0,0,12.55,19.076Z"
            transform="translate(-101.042 -517.121)"
          />
          <path
            className="rc"
            d="M269.69,726.934a40.278,40.278,0,0,0,40.16-40.16,61.507,61.507,0,0,0-1-9.538l-48.192,48.192a26.256,26.256,0,0,0,9.036,1.506Z"
            transform="translate(-206.405 -623.489)"
          />
        </g>
        <text className="rh" transform="translate(762 1551)">
          <tspan x={-21} y={0}>
            {remainingSpins !== null ? remainingSpins : ''}
          </tspan>
        </text>
      </g>
      <g id="rotating-group">
        <line
          x1="540"
          y1="950"
          x2="540"
          y2="750"
          stroke="black"
          strokeWidth="5"
        />
        <polygon
          points="540,740 560,800 540,770 520,800"
          fill="black"
        />
      </g>
      <Link to="/">
        <image x="10" y="20" width="150" height="129" xlinkHref="Home.png" />
      </Link>
    </g>
  </svg>
  </div>
);
};

export default HomeComponent;
