import { AnimatedSlice } from "@/components/ui/AnimatedSlice";
import { pie, arc } from "d3";
import type { PieArcDatum } from "d3";
import { useEffect, useState } from "react";

type Item = { name: string; value: number };

export function AnimatedDonutChart({
  singleColor,
}: {
  singleColor?: "purple" | "blue" | "fuchsia" | "yellow";
}) {

  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/requirements.json")
      .then((res) => res.json())
      .then((json) => {
        const pieData = json.topCategoriesByTrend || [];
        setData(pieData);
      });
  }, []);

  if (data.length === 0) return null;

  const radius = 420; // Chart base dimensions
  const gap = 0.01; // Gap between slices
  const lightStrokeEffect = 10; // 3d light effect around the slice

  // Pie layout and arc generator
  const pieLayout = pie<Item>()
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  // Adjust innerRadius to create a donut shape
  const innerRadius = radius / 1.625;
  const arcGenerator = arc<PieArcDatum<Item>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(lightStrokeEffect + 2); // Apply rounded corners

  // Create an arc generator for the clip path that matches the outer path of the arc
  const arcClip =
    arc<PieArcDatum<Item>>()
      .innerRadius(innerRadius + lightStrokeEffect / 2)
      .outerRadius(radius)
      .cornerRadius(lightStrokeEffect + 2) || undefined;

  const labelRadius = radius * 0.825;
  const arcLabel = arc<PieArcDatum<Item>>().innerRadius(labelRadius).outerRadius(labelRadius);

  const arcs = pieLayout(data);

  // Calculate the angle for each slice
  function computeAngle(d: PieArcDatum<Item>) {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  }

  // Minimum angle to display text
  const minAngle = 20; // Adjust this value as needed

  const colors = {
    purple: [
      "#7e4cfe", "#895cfc", "#956bff", "#a37fff", "#b291fd", "#b597ff",
      "#cab7fd", "#d3c2fe", "#dfccff", "#ead9ff", "#f2e4ff", "#f7edff"
    ],
    blue: ["#73caee", "#73caeeee", "#73caeedd", "#73caeecc", "#73caeebb", "#73caeeaa"],
    fuchsia: ["#f6a3ef", "#f6a3efee", "#f6a3efdd", "#f6a3efcc", "#f6a3efbb", "#f6a3efaa"],
    yellow: ["#f6e71f", "#f6e71fee", "#f6e71fdd", "#f6e71fcc", "#f6e71fbb", "#f6e71faa"],
  };

  return (
    <div className="relative mt-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className={`text-lg text-zinc-500`}>Total</p>
          <p className={`text-4xl transition-colors duration-300 font-bold`}>23K</p>
        </div>
      </div>
      <svg
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
        className="max-w-[16rem] mx-auto overflow-visible"
      >

        {/* Sectors with Gradient Fill and Stroke */}
        {arcs.map((d, i) => {
          // console.log(d, "d");
          const angle = computeAngle(d);
          let centroid = arcLabel.centroid(d);

          if (d.endAngle > Math.PI) {
            centroid[0] += 10;
            centroid[1] += 10;
          } else {
            centroid[0] -= 10;
            centroid[1] -= 0;
          }

          const textColorClass = singleColor === "purple"
            ? "fill-[#eee]"
            : "fill-zinc-800 dark:fill-zinc-200";
          return (
            <AnimatedSlice key={i} index={i}>
              <path
                stroke="#ffffff33" // Lighter stroke for a 3D effect
                strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
                fill={singleColor ? colors[singleColor][i] : colors.purple[i]}
                d={arcGenerator(d) || undefined}
              />
              {/* Labels with conditional rendering */}
              <g opacity={1}>
                <text transform={`translate(${centroid})`} textAnchor="middle" className={textColorClass}>
                  {angle > minAngle ? (
                    <>
                      <tspan y="-0.4em" fontWeight="700" fontSize={44}>
                        {d.data.name}
                      </tspan>
                      <tspan x={0} y="0.7em" fontSize={32}>
                        {d.data.value.toLocaleString("en-US")}%
                      </tspan>
                    </>
                  ) : (
                    <tspan y="0.3em" fontSize={60}>•</tspan>
                  )}
                </text>
              </g>

            </AnimatedSlice>
          );
        })}
      </svg>
    </div>
  );
}