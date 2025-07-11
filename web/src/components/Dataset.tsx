export function Dataset() {
    return (
        <article className="flex flex-col items-center justify-center gap-8 text-gray-700 lg:mb-[-20px] dark:text-gray-300 p-32  2xl:p-48 2xl:mx-44 xl:my-12 md:flex-row">
            <div className="[&>p]:mb-4 [&>p>strong]:text-[#27c0ff] dark:[&>p>strong]:text-[#27c0ff] [&>p>strong]:font-normal [&>p>strong]:font-mono text-pretty order-2 md:order-1">
                <div className="flex items-center mb-6 text-3xl font-semibold gap-x-3 text-black/80 dark:text-white">

                    Origen del Dataset
                </div>
                <p>
                    El dataset <strong>Trending YouTube Video Statistics (Canadá)</strong> fue modificado a partir del conjunto de datos original publicado en Kaggle. Su objetivo es registrar estadísticas de videos en tendencia en la plataforma YouTube, proporcionando información clave como título, categoría, canal, número de vistas, “me gusta”, “no me gusta”, comentarios, fechas de publicación y tendencia.
                </p>

                <p>
                    Para este proyecto se ha utilizado exclusivamente el archivo correspondiente a Canadá (<code>CAvideos.csv</code>), el cual ha sido enriquecido con información geográfica adicional (como la provincia de origen del canal) y procesado para facilitar el <strong>análisis temporal y temático.</strong>
                </p>

                <p>
                    Este dataset permite analizar y descubrir patrones sobre qué tipos de videos alcanzan popularidad, cómo evoluciona la tendencia a lo largo del tiempo, y qué métricas están asociadas con el éxito de un video. Su uso está orientado a generar <strong>conocimiento valioso</strong> para una empresa internacional de <strong>marketing digital</strong>.
                </p>

            </div>

            <img
                width="200"
                height="200"
                src="Youtube.png"
                alt="Youtube"
                className="order-1 object-contain w-64 h-64 p-6 md:order-2 rotate-3 lg:p-6 lg:w-64 rounded-2xl bg-black/30 dark:bg-red-300/5 ring-1 ring-black/70 dark:ring-white/20 transform-gpu animate-spinTilted"
            />
        </article>
    );
}
