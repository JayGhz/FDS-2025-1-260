import { HorizontalBarChart2 } from "@/components/ui/HorizontalBarChart2";
import { AnimatedOutlinedAreaChart } from "@/components/ui/AreaChart";
import GeoMap from "@/components/ui/GeoMap";
import { HorizontalBarChart } from "@/components/ui/HorizontalBarChart";
import { AnimatedDonutChart } from "@/components/ui/PieChart";
import { BarChartVertical } from "@/components/ui/VerticalBarChart";
import { BarChartVertical2 } from "@/components/ui/VerticalBarChart2";
import { BarChartVertical3 } from "@/components/ui/VerticalBarChart3";
import { BarChartVertical4 } from "@/components/ui/VerticalBarChart4";

export default function Requeriments() {
    return (
        <div className="md:p-[0em] mx-8 lg:m-20 mt-24 xl:mx-64 lg:mb-28 mb-32 md:mt-4">

            <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-8 lg:gap-4">
                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center">
                        Categorías de video con mayor tendencia
                    </div>
                    <AnimatedDonutChart />
                </div>

                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center">
                        Categorias con más likes
                    </div>
                    <HorizontalBarChart />
                </div>

                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center">
                        Categorias con menos likes
                    </div>
                    <HorizontalBarChart2 />
                </div>

                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center">
                        Categorías con Mejor Ratio de Me Gusta vs No Me Gusta
                    </div>
                    <BarChartVertical />
                </div>

            </div>

            <div className="lg:my-12 my-9" />

            <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-3 gap-6">

                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center">
                        Categorías con Más Vistas por Comentario
                    </div>
                    <BarChartVertical2 />
                </div>


                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6 h-[400px]">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center mb-2">
                        Mapa de visualización geográfica
                    </div>
                    <div className="w-full h-full">
                        <GeoMap />
                    </div>
                </div>

                <div className="border border-zinc-300 lg:col-span-2 dark:border-zinc-200/20 rounded-xl p-6 h-[400px]">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center mb-2">
                        Tendencias a lo Largo del Tiempo
                    </div>
                    <div className="w-full h-full">
                        <AnimatedOutlinedAreaChart />
                    </div>
                </div>

                
                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6 h-[400px]">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center mb-2">
                        Canales con mayor frecuencia en tendencias
                    </div>
                    <div className="w-full h-full">
                        <BarChartVertical3 />
                    </div>
                </div>

                
                <div className="border border-zinc-300 dark:border-zinc-200/20 rounded-xl p-6 h-[400px]">
                    <div className="text-sm dark:text-zinc-200/90 font-semibold text-center mb-2">
                        Canales con menor frecuencia en tendencias
                    </div>
                    <div className="w-full h-full">
                        <BarChartVertical4 />
                    </div>
                </div>
            </div>

        </div>
    );
}
