/* =====================================================================
   FLICK TAGS: one ad.js per creative, run in its own iframe as delivered.
   Sources are Flam's saved tags, unchanged. Swap a src to change a creative.
   variants follow each Flick's own order. named:false = the creative's
   options are not named here, so the UI shows "1 of 3" instead of a name.
   ===================================================================== */
const T1 = "https://native-ads-dev.appless.workers.dev/", T2 = "https://native-ads.appless.workers.dev/";
const BRANDS = {
  bose:{ name:"Bose", av:"BOSE", avc:"#111", src:T1+"6a9733389e74536944cd96bd_baspn2/ad.js", g:"buds", unit:"Colour", named:true, retail:true, tag:"sm",
    head:"Quiet, in three shades", prod:"Bose QuietComfort Ultra Earbuds (2nd Gen), Wireless Noise Cancelling", r:4.6, rc:"2.1K",
    desc:"World-class noise cancellation with spatial audio. Up to 6 hours per charge, 24 with the case.",
    variants:[{n:"Black",c:"#1d1d1f",p:1099,was:1249},{n:"Midnight Violet",c:"#4b3b72",p:1099,was:1249},{n:"Deep Plum",c:"#5e2b40",p:1099,was:1249}] },
  sony:{ name:"Sony", av:"SONY", avc:"#111", src:T1+"6a96c6969e74536944c4167f_dj5rq6/ad.js", g:"cans", unit:"Colour", named:true, retail:true, tag:"ex",
    head:"All-day noise cancelling", prod:"Sony WH-CH720N Wireless Noise Cancelling Headphones", r:4.5, rc:"8.3K",
    desc:"Lightweight over-ear headphones with dual noise sensor technology and up to 35 hours of battery.",
    variants:[{n:"Black",c:"#1d1d1f",p:399,was:549},{n:"White",c:"#ecebe8",p:399,was:549},{n:"Blue",c:"#3c5a8a",p:419,was:549}] },
  lego:{ name:"LEGO", av:"LEGO", avc:"#e3000b", src:T1+"6a96c6969e74536944c4167f_u008vu/ad.js", g:"f1", unit:"Set", named:true, retail:true, tag:"sm",
    head:"Build your grid", prod:"LEGO Speed Champions", r:4.8, rc:"940",
    desc:"Collectible F1 race car building set for ages 10 and up, with driver minifigure.",
    variants:[{n:"Ferrari SF-24 F1 Race Car",c:"#d8232a",p:119,was:139},{n:"McLaren F1 Team MCL38 Race Car",c:"#f58220",p:119,was:139},{n:"Mercedes-AMG F1 W15 Race Car",c:"#8fa3a8",p:119,was:139}] },
  nike:{ name:"Nike", av:"NIKE", avc:"#111", src:T1+"6a97885c9e74536944d35d53_dsefds/ad.js", g:"leg", unit:"Colour", named:true, retail:true, tag:"sm",
    head:"Universa: own your movement", prod:"Nike Universa Women's High-Waisted 7/8 Leggings", r:4.7, rc:"1.4K",
    desc:"Medium-support leggings in smooth, durable InfinaSoft fabric with no front seam.",
    variants:[{n:"Black",c:"#1d1d1f",p:449,was:499},{n:"Coral",c:"#f0705a",p:449,was:499},{n:"Lilac",c:"#b9a3d6",p:449,was:499}] },
  levis:{ name:"Levi's", av:"L", avc:"#c41230", src:T1+"6a96c6969e74536944c4167f_z64116/ad.js", g:"overall", unit:"Style", named:true, retail:true, tag:"sm",
    head:"Denim that goes the distance", prod:"Levi's Women's", r:4.4, rc:"310",
    desc:"A relaxed, easy fit that goes with everything. Adjustable straps, five pockets.",
    variants:[{n:"Baggy Overalls",c:"#6f93c2",p:479,was:549},{n:"Workwear Baggy Overalls",c:"#3f5f8f",p:499,was:549},{n:"Baggy Overalls, dark wash",c:"#27344f",p:479,was:549}] },
  acer:{ name:"Acer", av:"acer", avc:"#5c9e31", src:"https://storage.googleapis.com/bucket-fi-development-apps-5b0640d5/app/abc/videos/eeeu318dko8uchkx61k7dwza.js", g:"laptop", unit:"Model", named:true, retail:true, tall:true, dark:true, tag:"ex",
    head:"The laptop for every kind of gamer", prod:"Acer", r:4.5, rc:"520",
    desc:"Pick the laptop that fits how you play, study and work.",
    variants:[{n:"Predator Helios Neo 16 AI",c:"#2b2f36",p:6499,was:7299},{n:"Chromebook 314",c:"#aeb6c2",p:1099,was:1399},{n:"Nitro V 16 AI",c:"#3a3340",p:4299,was:4899}] },
  gm:{ name:"General Mills", av:"GM", avc:"#1f4aa8", src:T1+"kbf8k6/ad.js", dsp:"dv360", g:"box", unit:"Cereal", named:true, retail:true, tag:"mn",
    head:"Breakfast, three ways", prod:"General Mills", r:4.7, rc:"1.8K",
    desc:"A family favourite for breakfast or a snack, any time of day.",
    variants:[{n:"Lucky Charms Cereal 297g",short:"Lucky Charms",c:"#d8343f",p:21.95,was:25.5},{n:"Honey Nut Cheerios Cereal 306g",short:"Honey Nut Cheerios",c:"#f2b632",p:21.95,was:25.5},{n:"Cinnamon Toast Crunch Cereal 340g",short:"Cinnamon Toast Crunch",c:"#b8742f",p:21.95,was:25.5}] },
  dor:{ name:"Doritos", av:"D", avc:"#d12a1e", src:T1+"6a96c6969e74536944c4167f_vqdcng/ad.js", g:"chips", unit:"Flavour", named:true, retail:true, tag:"mn",
    head:"Pick your crunch", prod:"Doritos Tortilla Chips", r:4.6, rc:"2.6K",
    desc:"Bold, crunchy tortilla chips. Sharing bag.",
    variants:[{n:"Cool Ranch 262g",short:"Cool Ranch",c:"#1f6fd1",p:9.5,was:11.75},{n:"Nacho Cheese 262g",short:"Nacho Cheese",c:"#d12a1e",p:9.5,was:11.75},{n:"Spicy Sweet Chili 262g",short:"Spicy Sweet Chili",c:"#7b2a8c",p:9.5,was:11.75}] },
  bj:{ name:"Ben & Jerry's", av:"B&J", avc:"#2a6fb7", src:T1+"6a96c6969e74536944c4167f_z1fp1a/ad.js", g:"pint", unit:"Flavour", named:true, retail:true, tag:"mn",
    head:"Which pint tonight?", prod:"Ben & Jerry's Ice Cream Pint 473ml,", r:4.8, rc:"3.2K",
    desc:"Ice cream with big chunks and swirls, made with Fairtrade ingredients.",
    variants:[{n:"Cherry Garcia",c:"#c2325b",p:34.95,was:39.5},{n:"Razz Up!",c:"#d6497f",p:34.95,was:39.5},{n:"Chunky Monkey",c:"#e2b93b",p:34.95,was:39.5}] },
  gap:{ name:"Gap", av:"GAP", avc:"#0b2a5b", src:T1+"mti1bs/ad.js", dsp:"dv360", unit:"Style", named:true, retail:true, tag:"sm",
    head:"Three fall layers", prod:"Gap", r:4.5, rc:"640", desc:"Easy layers for cooler days. Switch the look in the video, then shop the piece you picked.",
    variants:[{n:"Denim Relaxed Shirt",c:"#5f7fa8",p:229,was:279},{n:"Icon Corduroy Jacket",c:"#7a5338",p:349,was:429},{n:"CashSoft Crew Sweater",c:"#b3261e",p:249,was:299}] },
  pata:{ name:"Patagonia", av:"P", avc:"#2d3a4a", src:T1+"6a91088b3252dba34b486df1_q18dy8/ad.js", unit:"Colour", named:true, retail:true, tag:"ex",
    head:"Made for the moment", prod:"Patagonia Men's Jacket,", r:4.7, rc:"210", desc:"A trail-ready jacket built to last. Pick a colour and see it outdoors before you buy.",
    variants:[{n:"Green",c:"#6f8a5b",p:899,was:1049},{n:"Brown",c:"#7a5338",p:899,was:1049},{n:"Teal",c:"#2b7f86",p:899,was:1049}] },
  zara:{ name:"Zara", av:"ZARA", avc:"#000", src:T1+"zara/ad.js", unit:"Style", named:true, retail:true, tall:true, tag:"ex",
    head:"Bomber season", prod:"Zara", r:4.4, rc:"180", desc:"Three bomber jackets, one look. Switch jackets inside the video.",
    variants:[{n:"Checked bomber jacket",c:"#8a8f7a",p:399,was:459},{n:"Plaid bomber jacket",c:"#5a4a3c",p:399,was:459},{n:"Polka dot bomber jacket",c:"#23252b",p:379,was:459}] },
  mms:{ name:"M&M's", av:"m&m", avc:"#6b3f1d", src:T1+"6a8e82a03252dba34b484fa9_xvaz4d/ad.js", unit:"Pick", named:false,
    head:"Pick your favourite", variants:[{n:"Option 1",c:"#d8232a"},{n:"Option 2",c:"#f2b632"},{n:"Option 3",c:"#2f8f3c"}] },
  cross:{ name:"Cross", av:"C", avc:"#3a2c22", src:T1+"6a9915fffac7a1784444e730_c3pgst/ad.js", unit:"Finish", named:false,
    head:"A pen worth gifting", variants:[{n:"Finish 1",c:"#23252b"},{n:"Finish 2",c:"#b08d57"},{n:"Finish 3",c:"#8fa3a8"}] },
  cad:{ name:"Cadillac", av:"CAD", avc:"#1a1a1a", src:"https://flicks.flamapp.live/z70k1k/ad.js", dsp:"dv360", unit:"Model", named:true, dark:true,
    head:"One drive, three Cadillacs", variants:[{n:"Optiq",c:"#c0392b"},{n:"Celestiq",c:"#26407a"},{n:"Escalade-V",c:"#e9e9e9"}] },
  bentley:{ name:"Bentley", av:"B", avc:"#24452f", src:T2+"6a9bc07393e71f3ec9b12c81_xogy7s/ad.js", unit:"Paint", named:true, fontScan:true, transparent:true,
    head:"Beyond the ordinary", variants:[{n:"White",c:"#ecebe6"},{n:"Olive",c:"#9a9d3c"},{n:"Blue",c:"#1f4fa3"}] },
  bk:{ name:"Burger King", av:"BK", avc:"#d62300", src:"https://flicks.flamapp.live/dzvxyq/ad.js", dsp:"house", g:"burger", unit:"Pick", named:false,
    head:"Flame-grilled. Your way.", variants:[{n:"Option 1",c:"#e8a33d"},{n:"Option 2",c:"#d9822b"},{n:"Option 3",c:"#c9652a"}] },
  lc:{ name:"Little Caesars", av:"LC", avc:"#f26522", src:T1+"xlgqpx/ad.js", dsp:"dv360", g:"pizza", unit:"Pick", named:false,
    head:"Hot and ready when you are", variants:[{n:"Option 1",c:"#f2b632"},{n:"Option 2",c:"#f2a03a"},{n:"Option 3",c:"#e98b2f"}] },
  bark:{ name:"BARK", av:"BARK", avc:"#0098d8", src:T1+"6a8e82a03252dba34b484fa9_zi294y/ad.js", g:"toy", unit:"Toy", named:false,
    head:"Give your dog exactly what they want", variants:[{n:"Toy 1",c:"#f0705a"},{n:"Toy 2",c:"#37a6de"},{n:"Toy 3",c:"#f2b632"}] },
  merc:{ name:"Mercedes-Benz", av:"MB", avc:"#111", src:T2+"6a9bc07393e71f3ec9b12c81_i3pdeq/ad.js", g:"car", unit:"Paint", named:true, dark:true,
    head:"The S-Class. Pick your paint.", variants:[{n:"White",c:"#f2f2f0"},{n:"Green",c:"#4f8a83"},{n:"Black",c:"#1b1b1d"}] }
};

/* ================= illustrations (drawn for this demo, no product photos) ================= */
const GL = {
  phone:(c,d)=>`<rect x="30" y="10" width="40" height="80" rx="8" fill="${c}"/><rect x="34" y="14" width="32" height="72" rx="5" fill="${d}"/><circle cx="50" cy="21" r="2.5" fill="${c}"/>`,
  buds:(c,d)=>`<rect x="22" y="40" width="56" height="42" rx="16" fill="${c}"/><rect x="22" y="57" width="56" height="3" fill="${d}"/><circle cx="38" cy="26" r="9" fill="${c}"/><circle cx="62" cy="26" r="9" fill="${c}"/><circle cx="38" cy="26" r="4" fill="${d}"/><circle cx="62" cy="26" r="4" fill="${d}"/>`,
  cans:(c,d)=>`<path d="M22 58V48a28 28 0 0 1 56 0v10" fill="none" stroke="${c}" stroke-width="7"/><rect x="14" y="54" width="18" height="30" rx="8" fill="${c}"/><rect x="68" y="54" width="18" height="30" rx="8" fill="${c}"/><rect x="18" y="60" width="6" height="18" rx="3" fill="${d}"/><rect x="76" y="60" width="6" height="18" rx="3" fill="${d}"/>`,
  laptop:(c,d)=>`<rect x="20" y="24" width="60" height="40" rx="4" fill="${c}"/><rect x="24" y="28" width="52" height="32" rx="2" fill="${d}"/><path d="M10 70h80l-5 8H15z" fill="${c}"/>`,
  pbank:(c,d)=>`<rect x="28" y="14" width="44" height="72" rx="8" fill="${c}"/><rect x="36" y="22" width="20" height="10" rx="3" fill="${d}"/><circle cx="40" cy="76" r="2.5" fill="${d}"/><circle cx="48" cy="76" r="2.5" fill="${d}"/><circle cx="56" cy="76" r="2.5" fill="${d}"/>`,
  tv:(c,d)=>`<rect x="10" y="20" width="80" height="50" rx="4" fill="${c}"/><rect x="14" y="24" width="72" height="42" rx="2" fill="${d}"/><rect x="36" y="76" width="28" height="5" rx="2" fill="${c}"/>`,
  perfume:(c,d)=>`<rect x="40" y="12" width="20" height="14" rx="3" fill="${d}"/><rect x="26" y="30" width="48" height="58" rx="10" fill="${c}"/><rect x="34" y="50" width="32" height="18" rx="3" fill="#fff" opacity=".7"/>`,
  shoe:(c,d)=>`<path d="M10 66c0-10 6-22 14-22l14 10c8 6 20 8 34 10 10 2 18 6 18 12v4H10z" fill="${c}"/><rect x="10" y="74" width="80" height="7" rx="3" fill="${d}"/>`,
  leg:(c,d)=>`<path d="M30 12h40l4 76H56L50 36l-6 52H26z" fill="${c}"/><rect x="30" y="12" width="40" height="8" fill="${d}"/>`,
  overall:(c,d)=>`<path d="M34 10h8v14h16V10h8v26l6 54H54l-4-34-4 34H28l6-54z" fill="${c}"/><rect x="42" y="30" width="16" height="12" rx="2" fill="${d}"/>`,
  tee:(c)=>`<path d="M32 14l18 8 18-8 20 14-10 14-8-5v49H30V37l-8 5-10-14z" fill="${c}"/>`,
  dress:(c,d)=>`<path d="M38 10h24l-4 18 18 58H24l18-58z" fill="${c}"/><rect x="39" y="26" width="22" height="5" fill="${d}"/>`,
  car:(c,d)=>`<path d="M8 62c0-8 6-10 14-12l10-14c2-3 5-4 9-4h22c5 0 8 2 11 6l8 10c8 2 10 6 10 14v6H8z" fill="${c}"/><circle cx="28" cy="70" r="9" fill="#23252b"/><circle cx="72" cy="70" r="9" fill="#23252b"/><path d="M36 38h12v12H30zM52 38h10l8 12H52z" fill="${d}"/>`,
  f1:(c,d)=>`<path d="M6 60h14l10-10h26l8-10h10l-4 10 12 6v8H6z" fill="${c}"/><rect x="2" y="48" width="8" height="20" rx="2" fill="${d}"/><circle cx="26" cy="68" r="9" fill="#23252b"/><circle cx="74" cy="68" r="9" fill="#23252b"/>`,
  chips:(c,d)=>`<path d="M28 12h44l-4 10 6 56-8 10H34l-8-10 6-56z" fill="${c}"/><circle cx="50" cy="50" r="13" fill="${d}"/>`,
  pint:(c,d)=>`<path d="M26 30h48l-5 56H31z" fill="${c}"/><rect x="22" y="18" width="56" height="14" rx="4" fill="${d}"/>`,
  box:(c,d)=>`<rect x="26" y="10" width="48" height="80" rx="4" fill="${c}"/><circle cx="50" cy="56" r="15" fill="${d}"/><rect x="34" y="18" width="32" height="10" rx="2" fill="#fff" opacity=".8"/>`,
  can:(c,d)=>`<rect x="32" y="14" width="36" height="72" rx="8" fill="${c}"/><rect x="32" y="40" width="36" height="20" fill="${d}"/>`,
  bottle:(c,d)=>`<rect x="43" y="8" width="14" height="12" rx="2" fill="${d}"/><path d="M40 22h20l6 16v44a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V38z" fill="${c}"/><rect x="34" y="50" width="32" height="18" fill="#fff" opacity=".65"/>`,
  carton:(c,d)=>`<path d="M32 30l10-16h16l10 16v54a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4z" fill="${c}"/><rect x="32" y="48" width="36" height="20" fill="${d}"/>`,
  bread:(c,d)=>`<path d="M16 48c0-14 14-22 34-22s34 8 34 22c0 6-4 8-6 9v21a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V57c-2-1-6-3-6-9z" fill="${c}"/><path d="M28 56c8-4 36-4 44 0" stroke="${d}" stroke-width="4" fill="none"/>`,
  fruit:(c,d)=>`<circle cx="50" cy="56" r="30" fill="${c}"/><path d="M50 26c2-10 10-14 16-14-1 8-6 14-16 14z" fill="${d}"/>`,
  burger:(c,d)=>`<path d="M16 46c0-18 16-26 34-26s34 8 34 26z" fill="${c}"/><rect x="14" y="50" width="72" height="8" rx="4" fill="#5aa13a"/><rect x="16" y="60" width="68" height="10" rx="5" fill="${d}"/><path d="M16 74h68v4a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8z" fill="${c}"/>`,
  pizza:(c,d)=>`<circle cx="50" cy="50" r="38" fill="${c}"/><circle cx="50" cy="50" r="30" fill="${d}"/><circle cx="40" cy="42" r="6" fill="#b3261e"/><circle cx="60" cy="50" r="6" fill="#b3261e"/><circle cx="46" cy="64" r="6" fill="#b3261e"/>`,
  bowl:(c,d)=>`<path d="M12 46h76c0 22-16 36-38 36S12 68 12 46z" fill="${c}"/><ellipse cx="50" cy="46" rx="38" ry="8" fill="${d}"/>`,
  cup:(c,d)=>`<path d="M28 24h44l-6 62H34z" fill="${c}"/><rect x="24" y="16" width="52" height="10" rx="4" fill="${d}"/>`,
  palette:(c,d)=>`<rect x="14" y="26" width="72" height="48" rx="6" fill="#2a2a30"/><rect x="20" y="32" width="18" height="16" fill="${c}"/><rect x="41" y="32" width="18" height="16" fill="${d}"/><rect x="62" y="32" width="18" height="16" fill="${c}" opacity=".6"/><rect x="20" y="52" width="60" height="16" fill="${d}" opacity=".5"/>`,
  chair:(c,d)=>`<path d="M26 14h48v40H26z" fill="${c}"/><rect x="18" y="50" width="64" height="16" rx="6" fill="${d}"/><rect x="24" y="66" width="6" height="22" fill="#6b4a2f"/><rect x="70" y="66" width="6" height="22" fill="#6b4a2f"/>`,
  watch:(c,d)=>`<rect x="38" y="6" width="24" height="88" rx="6" fill="${d}"/><circle cx="50" cy="50" r="24" fill="${c}"/><circle cx="50" cy="50" r="17" fill="#fff"/><path d="M50 38v12l8 6" stroke="${d}" stroke-width="3" fill="none"/>`,
  toy:(c)=>`<circle cx="24" cy="40" r="11" fill="${c}"/><circle cx="24" cy="60" r="11" fill="${c}"/><circle cx="76" cy="40" r="11" fill="${c}"/><circle cx="76" cy="60" r="11" fill="${c}"/><rect x="24" y="40" width="52" height="20" fill="${c}"/>`,
  fryer:(c,d)=>`<rect x="24" y="12" width="52" height="76" rx="14" fill="${c}"/><rect x="32" y="48" width="36" height="28" rx="4" fill="${d}"/><circle cx="50" cy="30" r="8" fill="${d}"/>`,
  holder:(c,d)=>`<rect x="34" y="10" width="32" height="56" rx="6" fill="${c}"/><rect x="38" y="14" width="24" height="48" rx="3" fill="${d}"/><path d="M50 66v14M34 84h32" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  charger:(c,d)=>`<rect x="18" y="40" width="64" height="40" rx="8" fill="${c}"/><rect x="26" y="56" width="10" height="6" rx="2" fill="${d}"/><rect x="40" y="56" width="10" height="6" rx="2" fill="${d}"/><rect x="54" y="56" width="10" height="6" rx="2" fill="${d}"/><rect x="38" y="24" width="6" height="16" fill="${d}"/><rect x="56" y="24" width="6" height="16" fill="${d}"/>`,
  roll:(c,d)=>`<rect x="22" y="22" width="56" height="60" rx="10" fill="${c}"/><ellipse cx="50" cy="22" rx="28" ry="9" fill="${d}"/><ellipse cx="50" cy="22" rx="9" ry="3" fill="#fff"/>`,
  flower:(c,d)=>`<path d="M50 54v36" stroke="#3d8b3d" stroke-width="5"/><circle cx="50" cy="32" r="12" fill="${c}"/><circle cx="36" cy="44" r="12" fill="${c}"/><circle cx="64" cy="44" r="12" fill="${c}"/><circle cx="50" cy="44" r="8" fill="${d}"/>`,
  gift:(c,d)=>`<rect x="18" y="38" width="64" height="48" rx="4" fill="${c}"/><rect x="14" y="28" width="72" height="14" rx="3" fill="${c}"/><rect x="44" y="28" width="12" height="58" fill="${d}"/>`,
  card:(c,d)=>`<rect x="12" y="26" width="76" height="48" rx="7" fill="${c}"/><rect x="20" y="36" width="14" height="10" rx="2" fill="${d}"/><rect x="20" y="60" width="40" height="5" rx="2" fill="${d}"/>`,
  tagg:(c,d)=>`<path d="M14 14h36l36 36-36 36-36-36z" fill="${c}"/><circle cx="34" cy="34" r="7" fill="${d}"/>`,
  pill:(c,d)=>`<rect x="18" y="36" width="64" height="28" rx="14" fill="${c}"/><path d="M50 36h18a14 14 0 0 1 0 28H50z" fill="${d}"/>`,
  basket:(c,d)=>`<path d="M32 40l12-24M68 40L56 16" stroke="${d}" stroke-width="5" fill="none"/><path d="M16 40h68l-8 44H24z" fill="${c}"/>`
};
const art = (g,c="#8fa1c7",d) => `<div class="art"><svg viewBox="0 0 100 100" aria-hidden="true">${(GL[g]||GL.gift)(c, d||shade(c))}</svg></div>`;
function shade(c){ const n=parseInt(c.slice(1),16); const f=v=>Math.max(0,Math.min(255,Math.round(v*.72))); return "#"+[n>>16,(n>>8)&255,n&255].map(v=>f(v).toString(16).padStart(2,"0")).join(""); }

/* ================= catalogue: listings as they appear in the noon app recording (17 Nov 2026) ================= */
const P = {};
const prod = (id,n,p,was,r,rc,cat,tag,sub) => { P[id]={id,n,p,was,r,rc,cat,tag:tag||"sm",sub,img:"p_"+id}; };
prod("iph","Apple iPhone 17 Pro Max 256 GB Silver 5G",4299,5099,4.5,"38.4K","mobiles","sm");
prod("s25","Samsung Galaxy S25 Ultra AI Dual SIM Titanium 256GB",2799,5099,4.7,"53.2K","mobiles","sm");
prod("hw1","Hot Wheels Mega Pack of 20 – Assorted Die-Cast Cars",158,395,4.7,"65","toys","sm","3+ Years");
prod("hw2","Hot Wheels Basic Car 3-Pack – Set of 3 Die-Cast Cars",34,80,4.6,"93","toys","sm","3+ Years");
prod("hw4","Hot Wheels 1:64 Scale Toy, Race, Sports Car",9.99,25,3.8,"100","toys","sm","3+ Years");
prod("hw5","Hot Wheels Set Of 10 1:64 Scale Toy Trucks & Cars",89.48,149,4.9,"17","toys","sm","3+ Years");
prod("vos","Voss Natural Sparkling Water Glass Bottle",120,162,4.5,"3","grocery","ex","9.6L");
prod("tis","Fine Comfort Toilet Tissues Paper 12 Rolls",12.6,19.26,4.7,"486","grocery","sm","2160 sheet");
prod("hold","Ugreen Mobile Holder For Car Car Phone Holder For Air Vent",49.95,65,4.5,"1.2K","mobiles","sm");
prod("chg","Ugreen Total 200W GaN Laptop Charger Fast Charging Station",269,329,4.7,"73","mobiles","sm");
prod("pb","Anker 25000 mAh Anker Power Bank, 25,000mAh 165W",399,489,4.6,"3K","mobiles","sm");
prod("pb2","Anker MagGo 2 Pro Power Bank, Qi2.2 25W 10,000mAh",399,499,5,"3","mobiles","sm");
prod("wat","Mai Dubai Still Drinking Water",8.95,11.95,0,"","grocery","mn","6 x 1.5L");
prod("mlk","Almarai Fresh Milk Full Fat",7.35,null,0,"","grocery","mn","1L");
prod("brd","L'usine White Sliced Bread",5.55,5.95,0,"","grocery","mn","600g");
prod("org","Valencia Orange",5.05,null,0,"","grocery","mn","450-500g");
prod("cuc","Pointed Gourd Parwal",13.85,14.7,0,"","grocery","mn","450-500g");
prod("pine","Pick Me Pineapple Chunks",9.95,null,0,"","grocery","mn","250g");
prod("lay1","Lays Wavy Cumin Lemon",3.85,5.45,0,"","grocery","mn","85g");
prod("lay2","Lay's Salt And Vinegar Potato Chips",8,null,0,"","grocery","mn","165g");
prod("lay3","Lay's Salt And Vinegar Potato Chips",1.45,2.85,0,"","grocery","mn","45g");
prod("puma1","PUMA Orbita 4 Hybrid Football",80.25,169,0,"","sports","mn","Size 5");
prod("puma2","PUMA Football Socks",51.75,109,0,"","sports","mn","Size 2");
prod("bar1","Barakat x Kiri Strawberry Cheesecake Pop",12,null,0,"","grocery","mn","80ml");
prod("bar2","Barakat x Kiri Summer Berries Cheesecake Pop",12,null,0,"","grocery","mn","80ml");
prod("bar3","Barakat x Kiri Tropical Cheesecake Pop",12,null,0,"","grocery","mn","80ml");
// The Flick products themselves: one listing per option in each retail Flick (no photo: the Flick is the picture).
Object.keys(BRANDS).forEach(k=>{ const b=BRANDS[k]; if(!b.retail) return;
  b.variants.forEach((v,i)=>{ P[`${k}-${i}`]={id:`${k}-${i}`,brand:k,vi:i,n:vname(k,i),p:v.p,was:v.was,r:b.r,rc:b.rc,c:v.c,tag:b.tag,cat:"flick"}; }); });
function vname(k,i){ const b=BRANDS[k], v=b.variants[i]; return k==="bose"||k==="sony"||k==="nike"||k==="pata" ? `${b.prod}, ${v.n}` : `${b.prod} ${v.n}`; }
const vshort = (k,i) => BRANDS[k].variants[i].short || BRANDS[k].variants[i].n;

const CATS = { mobiles:["Mobiles & Accessories","bose"], electronics:["Electronics","sony"], laptops:["Laptops & Accessories",null], beauty:["Beauty",null], grocery:["Grocery","gm"],
  home:["Small Appliances",null], toys:["Toys & Games","lego"], wfashion:["Women's Fashion","levis"], sports:["Sports & Fitness","nike"] };
const CATP = { mobiles:["iph","s25","pb","pb2","hold","chg"], electronics:["chg","pb","pb2","hold","s25","iph"], laptops:["chg","pb","pb2"], grocery:["wat","mlk","brd","vos","tis","org","lay1","lay2"],
  toys:["hw1","hw2","hw4","hw5"], sports:["puma1","puma2"] };
const SEARCH = {
  earbuds:{ad:"bose",ids:["iph","s25","pb","pb2","hold","chg"]}, headphones:{ad:"sony",ids:["s25","iph","chg","pb","pb2","hold"]},
  leggings:{inline:"nike",ids:["puma2","puma1"]}, lego:{ad:"lego",ids:["hw1","hw2","hw4","hw5"]}, iphone:{ids:["iph","s25","pb","pb2","hold","chg"]}
};
const RESTS = [
  ["r_mcd","McDonald's","4.5","4.90","25-35 mins","AED 47 Exclusive Noon Meal"],["r_alb","ALBAIK - Dubai Mall","4.5","5.90","35-45 mins","30% off"],
  ["r_dnk","Dunkin","4.3","4.90","25-35 mins","30% off up to AED 20"],["r_chn","Chin Chin","4.4","5.90","40-50 mins","AED 15 Half N' Half"],
  ["r_gaz","Gazebo","4.7","6.90","35-45 mins","30% off up to AED 20"],["r_piz","Pizza Hut","4.4","9.50","25-35 mins","30% off"]
];
const MENUS = {
  bk:[["Flame-grilled beef burger meal","With fries and a soft drink",29],["Crispy chicken burger","Lettuce, mayo, sesame bun",21],["Large fries","Salted, hot",11],["Chocolate shake","Thick and cold",14]],
  lc:[["Classic pepperoni pizza, large","Ready to go",27],["Cheese pizza, large","Mozzarella and muenster",25],["Cheesy bread","With dipping sauce",15],["Soft drink, 1.25L","Chilled",8]]
};
