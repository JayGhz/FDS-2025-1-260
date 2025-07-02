import { useEffect, useRef, useCallback, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import * as d3 from 'd3-force-3d';

export interface Node {
    id: string | number;
    name?: string;
    val?: number;
    color?: string;
    [key: string]: any;
}

export interface Link {
    source: string | number | Node;
    target: string | number | Node;
    color?: string;
    width?: number;
    [key: string]: any;
}

export interface GraphData {
    nodes: Node[];
    links: Link[];
}

const CATEGORY_MAP: Record<string, string> = {
    "1": "Film & Animation",
    "2": "Autos & Vehicles",
    "10": "Music",
    "15": "Pets & Animals",
    "17": "Sports",
    "19": "Travel & Events",
    "20": "Gaming",
    "22": "People & Blogs",
    "23": "Comedy",
    "24": "Entertainment",
    "25": "News & Politics",
    "26": "Howto & Style",
    "27": "Education",
    "28": "Science & Technology",
};

const PASTEL_COLORS = [
    '#FFD1DC', '#FFB347', '#FF6961', '#FFCC99', '#FF9999', '#FFB6C1', '#FFE4B5',
    '#FFDAB9', '#FFC0CB', '#FFFACD', '#FFEFD5', '#FAFAD2', '#FDD9B5', '#FDEBD0'
];

export default function ForceGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>(null);
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

    const updateDimensions = useCallback(() => {
        if (graphRef.current) {
            graphRef.current
                .width(window.innerWidth)
                .height(window.innerHeight);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/categories_graph.json');
            const data: Record<string, GraphData> = await res.json();

            const mergedNodes: Node[] = [];
            const mergedLinks: Link[] = [];
            const counts: Record<string, number> = {};
            let colorIndex = 0;

            for (const [category, graph] of Object.entries(data)) {
                const color = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];
                colorIndex++;

                const nodeIdMap = new Map<string, string>();
                counts[category] = graph.nodes.length;

                for (const node of graph.nodes) {
                    const newId = `${category}_${node.id}`;
                    nodeIdMap.set(node.id.toString(), newId);

                    mergedNodes.push({
                        ...node,
                        id: newId,
                        color,
                    });
                }

                for (const link of graph.links) {
                    mergedLinks.push({
                        source: nodeIdMap.get(link.source.toString())!,
                        target: nodeIdMap.get(link.target.toString())!,
                        color,
                    });
                }
            }

            setGraphData({ nodes: mergedNodes, links: mergedLinks });
            setCategoryCounts(counts);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const Graph = new (ForceGraph3D as any)(containerRef.current);
        graphRef.current = Graph;

        Graph
            .showNavInfo(false)
            .backgroundColor('#0000')
            .nodeColor((node: Node) => node.color || '#ccc')
            .linkColor((link: Link) => link.color || '#888')
            .nodeRelSize(6)
            .linkWidth(1.25)
            .linkDirectionalParticles(0)
            .d3Force('charge', d3.forceManyBody().strength(-20))
            .d3Force('link', d3.forceLink().distance(100))
            .d3VelocityDecay(0.4)
            .d3AlphaDecay(0.07)
            .cameraPosition({ x: 1090, y: 1500, z: 310 });

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            containerRef.current && (containerRef.current.innerHTML = '');
            graphRef.current = null;
        };
    }, [updateDimensions]);

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.graphData(graphData);
        }
    }, [graphData]);

    return (
        <div className="">
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'visible',
                    maxWidth: 'none',
                }}
            />

            <div className="fixed right-36 lg:mt-36 z-10 mt-12 max-w-xs p-6 dark:bg-black/40 opacity-80 bg-[#f9fafb] backdrop-blur-md rounded-xl space-y-3">
                <div className="text-md items-center mb-4 font-semibold gap-x-3 text-black/80 dark:text-white">Cantidad de videos por categoria</div>
                {Object.entries(categoryCounts).map(([categoryId, count], index) => (
                    <div key={categoryId} className="flex items-center space-x-2">
                        <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length] }}
                        />
                        <div className="text-xs truncate dark:text-white/90">
                            {CATEGORY_MAP[categoryId] || `Categoría ${categoryId}`} ({Math.floor(count*10)})
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}