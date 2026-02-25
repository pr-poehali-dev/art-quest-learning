import { useState } from "react";

const PENCILS = [
  {
    id: "home",
    label: "Главная",
    brand: "ГЛАВНАЯ",
    color: "#E63946",
    tip: "#C1121F",
    body: "#E63946",
    stripe: "#9D0208",
    text: "#fff",
  },
  {
    id: "newspaper",
    label: "Стенгазета",
    brand: "СТЕНГАЗЕТА",
    color: "#F4A261",
    tip: "#C77B27",
    body: "#F4A261",
    stripe: "#E76F51",
    text: "#3d1a00",
  },
  {
    id: "kids",
    label: "Для детей",
    brand: "ДЛЯ ДЕТЕЙ",
    color: "#2A9D8F",
    tip: "#1B6B62",
    body: "#2A9D8F",
    stripe: "#1B6B62",
    text: "#fff",
  },
  {
    id: "parents",
    label: "Для родителей",
    brand: "ДЛЯ РОДИТЕЛЕЙ",
    color: "#457B9D",
    tip: "#1D3557",
    body: "#457B9D",
    stripe: "#1D3557",
    text: "#fff",
  },
  {
    id: "reference",
    label: "Справочная",
    brand: "СПРАВОЧНАЯ",
    color: "#8338EC",
    tip: "#560BAD",
    body: "#8338EC",
    stripe: "#560BAD",
    text: "#fff",
  },
  {
    id: "workshop",
    label: "Моя мастерская",
    brand: "МОЯ МАСТЕРСКАЯ",
    color: "#3A86FF",
    tip: "#1352CC",
    body: "#3A86FF",
    stripe: "#1352CC",
    text: "#fff",
  },
];

interface PencilBoxProps {
  onSelect: (id: string) => void;
}

export default function PencilBox({ onSelect }: PencilBoxProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActive(id);
    setTimeout(() => {
      onSelect(id);
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(160deg, #fdf6e3 0%, #f0e6d0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Caveat', 'Rubik', cursive",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Фоновые точки */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #c8a96e44 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Логотип */}
      <div
        style={{
          marginBottom: 40,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#3d2b1f",
            letterSpacing: "-1px",
            lineHeight: 1,
            fontFamily: "'Caveat', cursive",
          }}
        >
          🎨 АртМастер
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#8a6a4a",
            marginTop: 4,
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 400,
          }}
        >
          Выбери раздел
        </div>
      </div>

      {/* Коробка с карандашами */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Карандаши */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 10,
            paddingBottom: 0,
            position: "relative",
            zIndex: 3,
          }}
        >
          {PENCILS.map((p, i) => {
            const isActive = active === p.id;
            const isOther = active !== null && active !== p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleClick(p.id)}
                title={p.label}
                style={{
                  position: "relative",
                  width: 52,
                  height: 220,
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  transform: isActive
                    ? "translateY(-160px)"
                    : isOther
                      ? "translateY(0px) scale(0.97)"
                      : "translateY(0px)",
                  transition:
                    "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
                  opacity: isOther ? 0.5 : 1,
                  outline: "none",
                  animationDelay: `${i * 0.07}s`,
                }}
                aria-label={p.label}
              >
                {/* SVG карандаш */}
                <svg
                  width="52"
                  height="220"
                  viewBox="0 0 52 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                >
                  {/* Тело карандаша */}
                  <rect
                    x="8"
                    y="0"
                    width="36"
                    height="175"
                    rx="4"
                    fill={p.body}
                  />

                  {/* Блик */}
                  <rect
                    x="12"
                    y="4"
                    width="8"
                    height="165"
                    rx="4"
                    fill="rgba(255,255,255,0.18)"
                  />

                  {/* Полоска-акцент */}
                  <rect
                    x="8"
                    y="150"
                    width="36"
                    height="6"
                    fill={p.stripe}
                    opacity="0.7"
                  />
                  <rect
                    x="8"
                    y="157"
                    width="36"
                    height="6"
                    fill={p.stripe}
                    opacity="0.4"
                  />

                  {/* Резинка-колпачок */}
                  <rect x="8" y="0" width="36" height="20" rx="4" fill="#f0d9b5" />
                  <rect x="8" y="14" width="36" height="6" fill="#c9a86c" />
                  <rect x="14" y="2" width="8" height="10" rx="2" fill="#e8c89a" />

                  {/* Деревянная часть (конус) */}
                  <path
                    d="M8 163 L26 210 L44 163 Z"
                    fill="#d4a554"
                  />
                  {/* Линия дерева */}
                  <path
                    d="M12 163 L26 208 L22 163 Z"
                    fill="#c4903e"
                    opacity="0.4"
                  />

                  {/* Грифель */}
                  <ellipse cx="26" cy="210" rx="4" ry="5" fill={p.tip} />

                  {/* Текст лейбла — вертикально */}
                  <text
                    x="26"
                    y="145"
                    textAnchor="middle"
                    dominantBaseline="auto"
                    transform="rotate(-90, 26, 90)"
                    fill={p.text}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="'Rubik', 'Arial', sans-serif"
                    letterSpacing="1.5"
                    style={{ userSelect: "none" }}
                  >
                    {p.brand}
                  </text>
                </svg>

                {/* Всплывающий тег при наведении */}
                <div
                  style={{
                    position: "absolute",
                    top: -36,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#3d2b1f",
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "'Rubik', sans-serif",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                    opacity: 0,
                    pointerEvents: "none",
                    transition: "opacity 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                  className="pencil-tooltip"
                >
                  {p.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Коробка */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            marginTop: -8,
          }}
        >
          {/* Передняя стенка коробки */}
          <div
            style={{
              width: PENCILS.length * 62 + 40,
              height: 80,
              background: "linear-gradient(180deg, #8B4513 0%, #6B3410 60%, #5a2c0e 100%)",
              borderRadius: "0 0 18px 18px",
              position: "relative",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Текстура дерева */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 9px)",
              }}
            />
            {/* Металлическая застёжка */}
            <div
              style={{
                width: 60,
                height: 20,
                background: "linear-gradient(180deg, #d4a843, #a07820)",
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 8,
                  background: "linear-gradient(180deg, #f0c060, #c09030)",
                  borderRadius: 4,
                }}
              />
            </div>
            {/* Тиснение бренда */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(255,220,150,0.45)",
                fontSize: 10,
                fontFamily: "'Rubik', sans-serif",
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              АртМастер · STUDIO
            </div>
          </div>

          {/* Дно коробки / тень */}
          <div
            style={{
              width: PENCILS.length * 62 + 40,
              height: 14,
              background: "linear-gradient(180deg, #3d1a08, #2a1005)",
              borderRadius: "0 0 14px 14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>

      {/* Hint */}
      <div
        style={{
          marginTop: 32,
          color: "#8a6a4a",
          fontSize: 14,
          fontFamily: "'Rubik', sans-serif",
          textAlign: "center",
          opacity: 0.8,
          position: "relative",
          zIndex: 2,
        }}
      >
        Нажми на карандаш, чтобы открыть раздел
      </div>

      <style>{`
        button:hover .pencil-tooltip {
          opacity: 1 !important;
        }
        button:hover > svg rect:first-child {
          filter: brightness(1.08);
        }
        button:not([disabled]):hover {
          transform: translateY(-20px) !important;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        button[style*="translateY(-160px)"]:hover {
          transform: translateY(-160px) !important;
        }
      `}</style>
    </div>
  );
}
