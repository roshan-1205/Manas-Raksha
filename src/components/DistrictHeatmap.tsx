import { heatmapData } from "../data/mockData";

const riskColors = {
  High: { fill: "rgba(239,68,68,0.75)", stroke: "#dc2626", label: "High Risk" },
  Moderate: { fill: "rgba(245,158,11,0.65)", stroke: "#d97706", label: "Moderate Risk" },
  Low: { fill: "rgba(34,197,94,0.60)", stroke: "#16a34a", label: "Low Risk" },
};

type Risk = keyof typeof riskColors;

export default function DistrictHeatmap() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-gray-800">Caseworker Risk Heatmap</h3>
        <span className="text-xs text-gray-400 font-mono bg-gray-50 border border-gray-100 px-2 py-1 rounded">
          Mock geographic data
        </span>
      </div>

      <div className="relative bg-slate-50 border border-gray-100 rounded-lg overflow-hidden" style={{ height: 320 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Stylized Maharashtra outline */}
          <path
            d="M10,15 L20,10 L35,12 L50,8 L65,14 L80,10 L90,18 L88,30 L80,38 L75,50 L82,58 L78,68 L65,72 L55,80 L45,88 L30,85 L18,78 L10,68 L8,55 L12,42 L8,30 Z"
            fill="#e8eef5"
            stroke="#c5d3e0"
            strokeWidth="0.8"
          />

          {/* Plot heatmap circles */}
          {heatmapData.map((point) => {
            const risk = point.risk as Risk;
            const { fill, stroke } = riskColors[risk];
            const r = 3 + point.cases * 0.5;
            return (
              <g key={point.area}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={r}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.6"
                  opacity={0.85}
                />
                <text
                  x={point.x}
                  y={point.y + r + 2.5}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill="#374151"
                  fontFamily="Inter, sans-serif"
                >
                  {point.area}
                </text>
                <text
                  x={point.x}
                  y={point.y + 1}
                  textAnchor="middle"
                  fontSize="3"
                  fill="white"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                >
                  {point.cases}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-2 left-2 bg-white/90 border border-gray-200 rounded-md px-2 py-1.5 space-y-1">
          {Object.entries(riskColors).map(([risk, { fill, label }]) => (
            <div key={risk} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border"
                style={{ backgroundColor: fill, borderColor: riskColors[risk as Risk].stroke }}
              />
              <span className="text-[10px] text-gray-600">{label}</span>
            </div>
          ))}
          <div className="text-[9px] text-gray-400 border-t border-gray-100 pt-1 mt-1">
            Circle size = case count
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Visualization based on mock geographic data. Actual deployment will integrate district-level GIS data with appropriate authorization.
      </p>
    </div>
  );
}
