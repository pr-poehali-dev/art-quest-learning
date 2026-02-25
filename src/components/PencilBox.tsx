import { useState } from "react";

const PENCILS = [
  {
    id: "home",
    label: "Главная",
    brand: "ГЛАВНАЯ",
    bodyTop: "#E8504A",
    bodyMid: "#D93C36",
    bodyBot: "#C12B25",
    wood: "#E8C99A",
    woodDark: "#C9A06A",
    lead: "#555",
    ferrule: "#C0A060",
    eraser: "#F5B8B0",
    text: "#fff",
  },
  {
    id: "newspaper",
    label: "Стенгазета",
    brand: "СТЕНГАЗЕТА",
    bodyTop: "#F7C948",
    bodyMid: "#E8B520",
    bodyBot: "#C99010",
    wood: "#EDD090",
    woodDark: "#C8A050",
    lead: "#555",
    ferrule: "#B8902A",
    eraser: "#FFD0A0",
    text: "#3d1a00",
  },
  {
    id: "kids",
    label: "Для детей",
    brand: "ДЛЯ ДЕТЕЙ",
    bodyTop: "#3EC9A7",
    bodyMid: "#2AB090",
    bodyBot: "#1A8A6E",
    wood: "#DDF0E8",
    woodDark: "#A0D0BC",
    lead: "#444",
    ferrule: "#208060",
    eraser: "#A0F0D8",
    text: "#fff",
  },
  {
    id: "parents",
    label: "Для родителей",
    brand: "ДЛЯ РОДИТЕЛЕЙ",
    bodyTop: "#5B9BD5",
    bodyMid: "#3A7CC0",
    bodyBot: "#2060A0",
    wood: "#D0E4F8",
    woodDark: "#90B8E0",
    lead: "#444",
    ferrule: "#2050A0",
    eraser: "#B0D4F8",
    text: "#fff",
  },
  {
    id: "reference",
    label: "Справочная",
    brand: "СПРАВОЧНАЯ",
    bodyTop: "#A070E0",
    bodyMid: "#8050C8",
    bodyBot: "#6030A8",
    wood: "#E8D8F8",
    woodDark: "#C0A0E0",
    lead: "#444",
    ferrule: "#6030A0",
    eraser: "#D0B8F0",
    text: "#fff",
  },
  {
    id: "workshop",
    label: "Моя мастерская",
    brand: "МОЯ МАСТЕРСКАЯ",
    bodyTop: "#FF8C42",
    bodyMid: "#E07030",
    bodyBot: "#C05820",
    wood: "#F8E0C0",
    woodDark: "#D0A878",
    lead: "#444",
    ferrule: "#A04818",
    eraser: "#FFD0A8",
    text: "#fff",
  },
];

// Ширина и высота одного карандаша (горизонтального)
const PW = 340; // длина
const PH = 44;  // толщина
const GAP = 10;

function Pencil({ p, index, isActive, isOther, onClick }: {
  p: typeof PENCILS[0];
  index: number;
  isActive: boolean;
  isOther: boolean;
  onClick: () => void;
}) {
  const W = PW;
  const H = PH;
  // Конус (заточка) слева
  const coneW = 48;
  const leadW = 12;
  const ferruleW = 20;
  const ferruleX = W - ferruleW - 24;
  const eraserW = 22;
  const bodyStart = coneW;
  const bodyEnd = ferruleX;

  return (
    <button
      onClick={onClick}
      aria-label={p.label}
      style={{
        display: "block",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        outline: "none",
        width: W,
        height: H,
        transform: isActive
          ? `translateX(${W + 120}px)`
          : "translateX(0px)",
        transition: isActive
          ? "transform 0.65s cubic-bezier(0.55, 0, 0.8, 0.2), opacity 0.3s"
          : "transform 0.3s ease, opacity 0.3s ease",
        opacity: isOther ? 0.45 : 1,
        position: "relative",
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", filter: isOther ? "saturate(0.6)" : "none" }}
      >
        <defs>
          {/* Градиент тела — объём */}
          <linearGradient id={`body-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.bodyTop} />
            <stop offset="45%" stopColor={p.bodyMid} />
            <stop offset="100%" stopColor={p.bodyBot} />
          </linearGradient>
          {/* Градиент дерева */}
          <linearGradient id={`wood-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.wood} />
            <stop offset="100%" stopColor={p.woodDark} />
          </linearGradient>
          {/* Блик */}
          <linearGradient id={`shine-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Тень низ */}
          <linearGradient id={`shadow-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
          </linearGradient>
        </defs>

        {/* Тело карандаша */}
        <rect
          x={bodyStart}
          y={0}
          width={bodyEnd - bodyStart}
          height={H}
          fill={`url(#body-${index})`}
        />

        {/* Блик сверху */}
        <rect
          x={bodyStart}
          y={0}
          width={bodyEnd - bodyStart}
          height={H / 2}
          fill={`url(#shine-${index})`}
          rx="1"
        />

        {/* Тень снизу */}
        <rect
          x={bodyStart}
          y={H / 2}
          width={bodyEnd - bodyStart}
          height={H / 2}
          fill={`url(#shadow-${index})`}
        />

        {/* Деревянный конус (заточка) */}
        <path
          d={`M${coneW} 0 L${leadW} ${H / 2} L${coneW} ${H}`}
          fill={`url(#wood-${index})`}
        />
        {/* Текстура дерева (волокна) */}
        <path d={`M${coneW} 4 L${leadW + 10} ${H / 2} L${coneW} ${H - 4}`} fill={p.woodDark} opacity="0.2" />
        <path d={`M${coneW} 10 L${leadW + 20} ${H / 2} L${coneW} ${H - 10}`} fill={p.woodDark} opacity="0.12" />

        {/* Грифель */}
        <path
          d={`M0 ${H / 2} L${leadW} 0 L${leadW} ${H} Z`}
          fill={p.lead}
        />
        {/* Кончик грифеля — блик */}
        <path
          d={`M0 ${H / 2} L${leadW} ${H / 2 - 5} L${leadW} ${H / 2 + 5} Z`}
          fill="rgba(255,255,255,0.25)"
        />

        {/* Обойма (ferrule) */}
        <rect x={ferruleX} y={0} width={ferruleW} height={H} fill={p.ferrule} />
        {/* Полоски обоймы */}
        <rect x={ferruleX + 5} y={0} width={2} height={H} fill="rgba(255,255,255,0.25)" />
        <rect x={ferruleX + ferruleW - 7} y={0} width={2} height={H} fill="rgba(0,0,0,0.15)" />

        {/* Резинка */}
        <rect
          x={ferruleX + ferruleW}
          y={2}
          width={eraserW}
          height={H - 4}
          rx="3"
          fill={p.eraser}
        />
        {/* Блик резинки */}
        <rect
          x={ferruleX + ferruleW + 2}
          y={3}
          width={eraserW - 4}
          height={(H - 6) / 2}
          rx="2"
          fill="rgba(255,255,255,0.3)"
        />

        {/* Текст лейбла */}
        <text
          x={(bodyStart + bodyEnd) / 2}
          y={H / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={p.text}
          fontSize="13"
          fontWeight="700"
          fontFamily="'Rubik', 'Arial', sans-serif"
          letterSpacing="2"
          style={{ userSelect: "none" }}
        >
          {p.brand}
        </text>
        {/* Тень текста для читаемости */}
        <text
          x={(bodyStart + bodyEnd) / 2 + 0.5}
          y={H / 2 + 1.5}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(0,0,0,0.2)"
          fontSize="13"
          fontWeight="700"
          fontFamily="'Rubik', 'Arial', sans-serif"
          letterSpacing="2"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {p.brand}
        </text>
      </svg>
    </button>
  );
}

interface PencilBoxProps {
  onSelect: (id: string) => void;
}

export default function PencilBox({ onSelect }: PencilBoxProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (active) return;
    setActive(id);
    setTimeout(() => onSelect(id), 750);
  };

  const boxW = PW + 80;
  const boxH = PENCILS.length * (PH + GAP) + GAP + 20;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(145deg, #f5ede0 0%, #e8d8c0 50%, #dcc8a8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Rubik', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Текстура бумаги */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.6,
      }} />

      {/* Шапка */}
      <div style={{ marginBottom: 36, textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{
          fontSize: 46, fontWeight: 800, color: "#2c1a0e",
          fontFamily: "'Caveat', cursive", lineHeight: 1, letterSpacing: "-0.5px",
        }}>
          🎨 АртМастер
        </div>
        <div style={{ fontSize: 15, color: "#7a5a3a", marginTop: 6, fontWeight: 400, letterSpacing: "0.5px" }}>
          Выбери раздел — нажми на карандаш
        </div>
      </div>

      {/* Коробка */}
      <div style={{ position: "relative", zIndex: 2, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))" }}>
        <svg
          width={boxW + 4}
          height={boxH + 120}
          viewBox={`0 0 ${boxW + 4} ${boxH + 120}`}
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            {/* Дерево коробки */}
            <linearGradient id="box-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8824A" />
              <stop offset="30%" stopColor="#B06830" />
              <stop offset="100%" stopColor="#8A4E20" />
            </linearGradient>
            <linearGradient id="box-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9A6030" />
              <stop offset="100%" stopColor="#6A3810" />
            </linearGradient>
            <linearGradient id="box-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8EDD8" />
              <stop offset="100%" stopColor="#E8D5B0" />
            </linearGradient>
            {/* Металл */}
            <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8C860" />
              <stop offset="50%" stopColor="#C8A030" />
              <stop offset="100%" stopColor="#A07818" />
            </linearGradient>
            {/* Текстура дерева — волокна */}
            <pattern id="wood-grain" x="0" y="0" width="4" height={boxH + 30} patternUnits="userSpaceOnUse">
              <rect width="4" height={boxH + 30} fill="transparent" />
              <line x1="1" y1="0" x2="1.5" y2={boxH + 30} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Дно коробки */}
          <rect x={2} y={30} width={boxW} height={boxH + 30} rx="10" fill="url(#box-grad)" />
          <rect x={2} y={30} width={boxW} height={boxH + 30} rx="10" fill="url(#wood-grain)" />

          {/* Боковые стенки — тень объём */}
          <rect x={2} y={30} width={16} height={boxH + 30} rx="10" fill="url(#box-side)" opacity="0.7" />
          <rect x={boxW - 14} y={30} width={16} height={boxH + 30} rx="10" fill="url(#box-side)" opacity="0.5" />

          {/* Внутреннее дно */}
          <rect x={18} y={42} width={boxW - 32} height={boxH + 8} rx="6" fill="url(#box-inner)" />

          {/* Тонкие разделители между карандашами (ложементы) */}
          {PENCILS.map((_, i) => (
            <rect
              key={i}
              x={18}
              y={42 + i * (PH + GAP)}
              width={boxW - 32}
              height={1.5}
              fill="rgba(180,140,80,0.35)"
            />
          ))}

          {/* Металлическая полоска — верхний край передней стенки */}
          <rect x={2} y={boxH + 44} width={boxW} height={16} rx="0" fill="url(#metal)" />
          <rect x={2} y={boxH + 44} width={boxW} height={4} fill="rgba(255,255,255,0.3)" />

          {/* Надпись на боку коробки */}
          <text
            x={boxW / 2 + 2}
            y={boxH + 70}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,240,200,0.9)"
            fontSize="15"
            fontWeight="700"
            fontFamily="'Caveat', cursive"
            letterSpacing="1"
          >
            Художественный совет Кости З.
          </text>
          {/* Тиснение (тень) */}
          <text
            x={boxW / 2 + 3}
            y={boxH + 71.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(80,40,0,0.5)"
            fontSize="15"
            fontWeight="700"
            fontFamily="'Caveat', cursive"
            letterSpacing="1"
          >
            Художественный совет Кости З.
          </text>

          {/* Декоративная рамка вокруг надписи */}
          <rect x={boxW / 2 - 166} y={boxH + 56} width={332} height={30} rx="5" fill="none" stroke="rgba(255,220,120,0.4)" strokeWidth="1.5" />

          {/* Нижняя часть коробки */}
          <rect x={2} y={boxH + 58} width={boxW} height={boxH / 4} rx="0" fill="url(#box-grad)" opacity="0.8" />
          <rect x={2} y={boxH + 58} width={boxW} height={boxH / 4} rx="0" fill="url(#wood-grain)" />
          <rect x={2} y={boxH + 58 + boxH / 4 - 8} width={boxW} height={12} rx="8" fill="url(#box-side)" />

          {/* Декоративные уголки — металл */}
          {[
            [2, 30], [boxW - 14, 30]
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width={14} height={14} rx="3" fill="url(#metal)" opacity="0.8" />
            </g>
          ))}
        </svg>

        {/* Карандаши поверх SVG */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 20,
            display: "flex",
            flexDirection: "column",
            gap: GAP,
            overflow: "hidden",
            width: PW + 40,
            paddingRight: 4,
          }}
        >
          {PENCILS.map((p, i) => (
            <Pencil
              key={p.id}
              p={p}
              index={i}
              isActive={active === p.id}
              isOther={active !== null && active !== p.id}
              onClick={() => handleClick(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Подсказка */}
      <div style={{
        marginTop: 28, color: "#7a5a3a", fontSize: 13,
        fontFamily: "'Rubik', sans-serif", opacity: 0.75,
        position: "relative", zIndex: 2,
      }}>
        Нажми на карандаш, чтобы перейти в раздел
      </div>
    </div>
  );
}
