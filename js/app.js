const COLS=19,ROWS=15,CELL=30;
const PALETTE={name:"Minecraft Stained Glass",colors:[
{id:"white",name:"White",hex:"#F9FFFE"},
{id:"light_gray",name:"Light Gray",hex:"#9D9D97"},
{id:"gray",name:"Gray",hex:"#474F52"},
{id:"black",name:"Black",hex:"#1D1D21"},
{id:"brown",name:"Brown",hex:"#835432"},
{id:"red",name:"Red",hex:"#B02E26"},
{id:"orange",name:"Orange",hex:"#F9801D"},
{id:"yellow",name:"Yellow",hex:"#FED83D"},
{id:"lime",name:"Lime",hex:"#80C71F"},
{id:"green",name:"Green",hex:"#5E7C16"},
{id:"cyan",name:"Cyan",hex:"#169C9C"},
{id:"light_blue",name:"Light Blue",hex:"#3AB3DA"},
{id:"blue",name:"Blue",hex:"#3C44AA"},
{id:"purple",name:"Purple",hex:"#8932B8"},
{id:"magenta",name:"Magenta",hex:"#C74EBD"},
{id:"pink",name:"Pink",hex:"#F38BAA"}
]};
const COLORS=PALETTE.colors.map(c=>c.hex);
let current=PALETTE.colors[0].hex;


const CENTER_X = Math.floor(COLS / 2);
const CENTER_Y = Math.floor(ROWS / 2);

function toCentered(x, y) {
  return { x: x - CENTER_X, y: y - CENTER_Y };
}

function fromCentered(x, y) {
  return { x: x + CENTER_X, y: y + CENTER_Y };
}

function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

function toCanvasPoints(points) {
  return points
    .map(p => fromCentered(p.x, p.y))
    .filter(p => inBounds(p.x, p.y));
}


const palette=document.getElementById("palette");
const tooltip=document.createElement("div");
tooltip.className="tooltip";
document.body.appendChild(tooltip);

PALETTE.colors.forEach((entry,i)=>{
 const s=document.createElement("div");
 s.className="swatch"+(i===0?" sel":"");
 s.style.background=entry.hex;
 s.onmouseenter=()=>{
   tooltip.innerHTML=`<strong>${entry.name}</strong><div class="sub">${PALETTE.name}</div>`;
   tooltip.style.opacity="1";
 };
 s.onmousemove=e=>{
   tooltip.style.left=e.clientX+"px";
   tooltip.style.top=e.clientY+"px";
 };
 s.onmouseleave=()=>tooltip.style.opacity="0";
 s.onclick=()=>{
   document.querySelectorAll(".swatch").forEach(x=>x.classList.remove("sel"));
   s.classList.add("sel");
   current=entry.hex;
 };
 palette.appendChild(s);
});

const grid=Array.from({length:ROWS},()=>Array(COLS).fill(COLORS[0]));
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let drawing=false;
let lastPaintedCell=null;

function unique(points){
 const seen=new Set();
 return points.filter(p=>{
   const key=`${p.x},${p.y}`;
   if(seen.has(key)) return false;
   seen.add(key);
   return true;
 });
}

function mirroredPoints(x,y){
 const m=mirror.value;
 let pts=[{x,y}];
 switch(m){
  case "Horizontal":
    pts.push({x:COLS-1-x,y}); break;
  case "Vertical":
    pts.push({x,y:ROWS-1-y}); break;
  case "Quad":
    pts.push({x:COLS-1-x,y});
    pts.push({x,y:ROWS-1-y});
    pts.push({x:COLS-1-x,y:ROWS-1-y});
    break;
  case "Diagonal ↘":
    if(x<ROWS && y<COLS) pts.push({x:y,y:x});
    break;
  case "Diagonal ↗":
    {
      const nx=COLS-1-x;
      const ny=ROWS-1-y;
      const mx=COLS-1-y;
      const my=ROWS-1-x;
      if(mx>=0 && mx<COLS && my>=0 && my<ROWS){
        pts.push({x:mx,y:my});
      }
    }
    break;
 }
 return unique(pts);
}

function render(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 for(let y=0;y<ROWS;y++){
   for(let x=0;x<COLS;x++){
     ctx.fillStyle=grid[y][x];
     ctx.fillRect(x*CELL,y*CELL,CELL,CELL);
   }
 }
 if(gridToggle.checked){
   ctx.strokeStyle="#777";
   ctx.lineWidth=1;
   for(let x=0;x<=COLS;x++){ctx.beginPath();ctx.moveTo(x*CELL+.5,0);ctx.lineTo(x*CELL+.5,ROWS*CELL);ctx.stroke();}
   for(let y=0;y<=ROWS;y++){ctx.beginPath();ctx.moveTo(0,y*CELL+.5);ctx.lineTo(COLS*CELL,y*CELL+.5);ctx.stroke();}
 }
 ctx.strokeStyle="rgba(255,215,0,.45)";
 ctx.beginPath();ctx.moveTo(9.5*CELL,0);ctx.lineTo(9.5*CELL,ROWS*CELL);ctx.stroke();
 ctx.beginPath();ctx.moveTo(0,7.5*CELL);ctx.lineTo(COLS*CELL,7.5*CELL);ctx.stroke();
 ctx.fillStyle="gold";
 ctx.beginPath();ctx.arc(9.5*CELL,7.5*CELL,3,0,Math.PI*2);ctx.fill();
}

function paintEvent(e){
 const r=canvas.getBoundingClientRect();
 const x=Math.floor((e.clientX-r.left)/CELL);
 const y=Math.floor((e.clientY-r.top)/CELL);
 if(x<0||x>=COLS||y<0||y>=ROWS) return;

 if(lastPaintedCell && lastPaintedCell.x===x && lastPaintedCell.y===y){
   return;
 }
 lastPaintedCell={x,y};

 for(const p of mirroredPoints(x,y)){
   grid[p.y][p.x]=current;
 }
 render();
}

canvas.onpointerdown=e=>{
 e.preventDefault();
 canvas.setPointerCapture?.(e.pointerId);

 drawing=true;
 lastPaintedCell=null;
 paintEvent(e);
};
canvas.onpointermove=e=>{
 e.preventDefault();

 if(drawing) paintEvent(e);
};
canvas.onpointercancel=()=>{
 drawing=false;
 lastPaintedCell=null;
};
window.onpointerup=()=>{
 drawing=false;
 lastPaintedCell=null;
};

gridToggle.onchange=render;
mirror.onchange=render;

const clearBtn=document.getElementById("clearBtn");
clearBtn.onclick=()=>{
  for(let y=0;y<ROWS;y++){
    for(let x=0;x<COLS;x++){
      grid[y][x]=COLORS[0];
    }
  }
  lastPaintedCell=null;
  render();
};

render();