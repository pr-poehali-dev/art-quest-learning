import { useState } from "react";

// Карандаши для верхней полосы (горизонтальные, острие вправо)
const TOP_PENCILS = [
  { id: "home", label: "Главная", color: "#F4623A", colorDark: "#C84020", colorLight: "#FF8C6A", wood: "#F0C090", woodDark: "#C89060", lead: "#888", eraser: "#F0A090" },
  { id: "newspaper", label: "Стенгазета", color: "#E83060", colorDark: "#B01840", colorLight: "#FF6090", wood: "#F0C090", woodDark: "#C89060", lead: "#888", eraser: "#F0A0B0" },
  { id: "kids", label: "Для детей", color: "#20C8E0", colorDark: "#0898B0", colorLight: "#70E8F8", wood: "#F0C090", woodDark: "#C89060", lead: "#888", eraser: "#A0E8F8" },
];

// Карандаши для левой полосы (вертикальные, острие вниз)
const LEFT_PENCILS = [
  { id: "parents", label: "Для родителей", color: "#98C840", colorDark: "#60A010", colorLight: "#C8E870", wood: "#D0A870", woodDark: "#A07840", lead: "#777", eraser: "#C0E090" },
  { id: "reference", label: "Справочная", color: "#A8C0D8", colorDark: "#6890B8", colorLight: "#D8EAF8", wood: "#C8A060", woodDark: "#A07030", lead: "#777", eraser: "#B0D0F0" },
  { id: "workshop", label: "Моя мастерская", color: "#B06838", colorDark: "#804018", colorLight: "#D09060", wood: "#C0A070", woodDark: "#907040", lead: "#777", eraser: "#D0A888" },
];

// Карандаши для правой полосы (вертикальные, острие вниз)
const RIGHT_PENCILS = [
  { id: "guide", label: "Как работать", color: "#C85828", colorDark: "#983818", colorLight: "#E88060", wood: "#C09870", woodDark: "#907040", lead: "#777", eraser: "#E0A888" },
  { id: "achievements", label: "Достижения", color: "#F0B030", colorDark: "#C07808", colorLight: "#FFD870", wood: "#C8A060", woodDark: "#A07030", lead: "#777", eraser: "#F8D890" },
  { id: "teacher", label: "Мой Учитель", color: "#5898D8", colorDark: "#2858A8", colorLight: "#90C0F8", wood: "#C0A870", woodDark: "#907040", lead: "#777", eraser: "#90C0F0" },
];

// SVG одного горизонтального карандаша (острие справа)
// Стиль как на картинке: цилиндр с бликом, деревянная заточка, грифель
function HorizontalPencil({ p, width, height, onClick, style }: {
  p: typeof TOP_PENCILS[0];
  width: number;
  height: number;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const W = width;
  const H = height;
  const coneW = H * 1.1; // ширина конуса
  const bodyEnd = W - coneW;
  const rx = H / 2;
  const cx = W - coneW / 2;

  return (
    <button
      onClick={onClick}
      title={p.label}
      style={{
        background: "none", border: "none", padding: 0, cursor: "pointer",
        display: "block", outline: "none", ...style,
      }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <defs>
          <radialGradient id={`h-body-${p.id}`} cx="50%" cy="25%" r="70%">
            <stop offset="0%" stopColor={p.colorLight} />
            <stop offset="45%" stopColor={p.color} />
            <stop offset="100%" stopColor={p.colorDark} />
          </radialGradient>
          <radialGradient id={`h-wood-${p.id}`} cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor={p.wood} />
            <stop offset="100%" stopColor={p.woodDark} />
          </radialGradient>
          <linearGradient id={`h-shine-${p.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        {/* Тело — прямоугольник с скруглёнными левыми краями */}
        <rect x={0} y={0} width={bodyEnd + rx} height={H} rx={rx} fill={`url(#h-body-${p.id})`} />
        {/* Перекрываем правую часть тела прямоугольником (без скругления справа) */}
        <rect x={rx} y={0} width={bodyEnd} height={H} fill={`url(#h-body-${p.id})`} />

        {/* Блик */}
        <ellipse cx={(bodyEnd) / 2} cy={H * 0.22} rx={(bodyEnd) / 2.1} ry={H * 0.18} fill={`url(#h-shine-${p.id})`} />

        {/* Деревянный конус (заточка) — справа */}
        {/* Зубчатый край */}
        <path
          d={[
            `M${bodyEnd} 0`,
            // зубцы
            ...Array.from({ length: 5 }, (_, i) => {
              const y1 = (i * H) / 5;
              const y2 = ((i + 0.5) * H) / 5;
              const y3 = ((i + 1) * H) / 5;
              const xMid = bodyEnd + H * 0.25;
              return `L${bodyEnd} ${y1} L${xMid} ${y2} L${bodyEnd} ${y3}`;
            }),
            `L${bodyEnd} ${H}`,
            `L${W - H * 0.15} ${H}`,
            `L${W} ${H / 2}`,
            `L${W - H * 0.15} 0`,
            "Z"
          ].join(" ")}
          fill={`url(#h-wood-${p.id})`}
        />

        {/* Грифель */}
        <circle cx={W - 3} cy={H / 2} r={H * 0.12} fill={p.lead} />
        <circle cx={W - 4} cy={H / 2 - 1} r={H * 0.05} fill="rgba(255,255,255,0.3)" />

        {/* Подпись */}
        <text
          x={bodyEnd / 2}
          y={H / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.92)"
          fontSize={H * 0.32}
          fontWeight="700"
          fontFamily="'Rubik','Arial',sans-serif"
          letterSpacing="1.5"
          style={{ userSelect: "none" }}
        >
          {p.label.toUpperCase()}
        </text>
      </svg>
    </button>
  );
}

// SVG одного вертикального карандаша (острие снизу)
function VerticalPencil({ p, width, height, onClick, style }: {
  p: typeof LEFT_PENCILS[0];
  width: number;
  height: number;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const W = width;
  const H = height;
  const coneH = W * 1.1;
  const bodyEnd = H - coneH;
  const ry = W / 2;

  return (
    <button
      onClick={onClick}
      title={p.label}
      style={{
        background: "none", border: "none", padding: 0, cursor: "pointer",
        display: "block", outline: "none", ...style,
      }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <defs>
          <radialGradient id={`v-body-${p.id}`} cx="25%" cy="50%" r="70%">
            <stop offset="0%" stopColor={p.colorLight} />
            <stop offset="45%" stopColor={p.color} />
            <stop offset="100%" stopColor={p.colorDark} />
          </radialGradient>
          <radialGradient id={`v-wood-${p.id}`} cx="30%" cy="50%" r="80%">
            <stop offset="0%" stopColor={p.wood} />
            <stop offset="100%" stopColor={p.woodDark} />
          </radialGradient>
          <linearGradient id={`v-shine-${p.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>

        {/* Тело */}
        <rect x={0} y={0} width={W} height={bodyEnd + ry} rx={ry} fill={`url(#v-body-${p.id})`} />
        <rect x={0} y={ry} width={W} height={bodyEnd} fill={`url(#v-body-${p.id})`} />

        {/* Блик */}
        <ellipse cx={W * 0.22} cy={bodyEnd / 2} rx={W * 0.18} ry={bodyEnd / 2.1} fill={`url(#v-shine-${p.id})`} />

        {/* Деревянный конус снизу с зубцами */}
        <path
          d={[
            `M0 ${bodyEnd}`,
            ...Array.from({ length: 5 }, (_, i) => {
              const x1 = (i * W) / 5;
              const x2 = ((i + 0.5) * W) / 5;
              const x3 = ((i + 1) * W) / 5;
              const yMid = bodyEnd + W * 0.25;
              return `L${x1} ${bodyEnd} L${x2} ${yMid} L${x3} ${bodyEnd}`;
            }),
            `L${W} ${bodyEnd}`,
            `L${W} ${H - W * 0.15}`,
            `L${W / 2} ${H}`,
            `L${0} ${H - W * 0.15}`,
            "Z"
          ].join(" ")}
          fill={`url(#v-wood-${p.id})`}
        />

        {/* Грифель */}
        <circle cx={W / 2} cy={H - 3} r={W * 0.12} fill={p.lead} />
        <circle cx={W / 2 - 1} cy={H - 4} r={W * 0.05} fill="rgba(255,255,255,0.3)" />

        {/* Подпись — повёрнутая */}
        <text
          x={W / 2}
          y={bodyEnd / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.92)"
          fontSize={W * 0.32}
          fontWeight="700"
          fontFamily="'Rubik','Arial',sans-serif"
          letterSpacing="1.5"
          transform={`rotate(-90, ${W / 2}, ${bodyEnd / 2})`}
          style={{ userSelect: "none" }}
        >
          {p.label.toUpperCase()}
        </text>
      </svg>
    </button>
  );
}

interface PencilBoxProps {
  onSelect: (id: string) => void;
}

export default function PencilBox({ onSelect }: PencilBoxProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    setTimeout(() => onSelect(id), 500);
  };

  // Акварельные пятна
  const watercolorBlobs = [
    { cx: "18%", cy: "22%", rx: "22%", ry: "18%", color: "#F4A06080", rot: -15 },
    { cx: "72%", cy: "15%", rx: "18%", ry: "14%", color: "#80C8E880", rot: 20 },
    { cx: "85%", cy: "65%", rx: "16%", ry: "20%", color: "#C8E87080", rot: 5 },
    { cx: "25%", cy: "75%", rx: "20%", ry: "16%", color: "#E888A080", rot: -10 },
    { cx: "50%", cy: "50%", rx: "28%", ry: "22%", color: "#B8D8F040", rot: 8 },
    { cx: "60%", cy: "80%", rx: "15%", ry: "12%", color: "#F0D09060", rot: -20 },
    { cx: "10%", cy: "50%", rx: "14%", ry: "18%", color: "#A0D8A860", rot: 12 },
  ];

  const PH = 58; // высота горизонтального карандаша (толщина)
  const PW_H = 340; // длина горизонтального карандаша
  const PW_V = 58; // ширина вертикального карандаша
  const PH_V = 320; // длина вертикального карандаша
  const GAP = 8;

  return (
    <div
      style={{
        minHeight: "100dvh",
        minWidth: "100vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf6ee",
      }}
    >
      {/* Акварельный фон — SVG пятна */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="wc-blur">
          <feGaussianBlur stdDeviation="38" />
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
        </filter>
        <filter id="wc-blur2">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <g filter="url(#wc-blur)">
          {watercolorBlobs.map((b, i) => (
            <ellipse
              key={i}
              cx={b.cx} cy={b.cy}
              rx={b.rx} ry={b.ry}
              fill={b.color}
              transform={`rotate(${b.rot}, ${b.cx}, ${b.cy})`}
            />
          ))}
        </g>
        {/* Бумажная текстура */}
        <filter id="paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" fill="rgba(220,200,170,0.08)" filter="url(#paper)" />
      </svg>

      {/* Верхняя полоса карандашей */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "row",
        gap: GAP,
        zIndex: 10,
      }}>
        {TOP_PENCILS.map((p) => (
          <HorizontalPencil
            key={p.id}
            p={p}
            width={PW_H}
            height={PH}
            onClick={() => handleSelect(p.id)}
            style={{
              opacity: selected && selected !== p.id ? 0.4 : 1,
              transform: selected === p.id ? "translateY(-120%)" : "translateY(0)",
              transition: "transform 0.55s cubic-bezier(0.55,0,0.8,0.2), opacity 0.3s",
            }}
          />
        ))}
      </div>

      {/* Левая полоса карандашей */}
      <div style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: GAP,
        zIndex: 10,
      }}>
        {LEFT_PENCILS.map((p) => (
          <VerticalPencil
            key={p.id}
            p={p}
            width={PW_V}
            height={PH_V}
            onClick={() => handleSelect(p.id)}
            style={{
              opacity: selected && selected !== p.id ? 0.4 : 1,
              transform: selected === p.id ? "translateX(-120%)" : "translateX(0)",
              transition: "transform 0.55s cubic-bezier(0.55,0,0.8,0.2), opacity 0.3s",
            }}
          />
        ))}
      </div>

      {/* Правая полоса карандашей */}
      <div style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: GAP,
        zIndex: 10,
      }}>
        {RIGHT_PENCILS.map((p) => (
          <VerticalPencil
            key={p.id}
            p={p}
            width={PW_V}
            height={PH_V}
            onClick={() => handleSelect(p.id)}
            style={{
              opacity: selected && selected !== p.id ? 0.4 : 1,
              transform: selected === p.id ? "translateX(120%)" : "translateX(0)",
              transition: "transform 0.55s cubic-bezier(0.55,0,0.8,0.2), opacity 0.3s",
            }}
          />
        ))}
      </div>

      {/* Центральный текст */}
      <div style={{
        position: "relative",
        zIndex: 5,
        textAlign: "center",
        pointerEvents: "none",
        maxWidth: 420,
        padding: "0 80px",
      }}>
        <div style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "clamp(28px, 5vw, 52px)",
          fontWeight: 800,
          color: "#2c1a0e",
          lineHeight: 1.15,
          letterSpacing: "-0.5px",
          textShadow: "2px 3px 0 rgba(255,255,255,0.7), 0 1px 12px rgba(180,120,60,0.12)",
        }}>
          Художественный совет
        </div>
        <div style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "clamp(32px, 6vw, 62px)",
          fontWeight: 800,
          color: "#a03010",
          lineHeight: 1.1,
          letterSpacing: "-0.5px",
          textShadow: "2px 3px 0 rgba(255,255,255,0.7), 0 2px 16px rgba(180,80,20,0.18)",
          marginTop: 4,
        }}>
          Кости Золочевского
        </div>
        <div style={{
          marginTop: 18,
          fontFamily: "'Rubik', sans-serif",
          fontSize: "clamp(11px, 1.6vw, 15px)",
          color: "#7a5a3a",
          fontWeight: 400,
          letterSpacing: "0.3px",
          opacity: 0.8,
        }}>
          Выбери раздел — нажми на карандаш
        </div>
      </div>
    </div>
  );
}
