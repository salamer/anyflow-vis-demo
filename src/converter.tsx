import AnyFlowConfig from "./model";
// import { Graph, Node, Path, Cell, Model } from '@antv/x6'
import G6, { GraphData } from '@antv/g6';
function AnyFlowNode2VisNode(config: AnyFlowConfig): GraphData {

    var edges: Array<[string, string]> = [];
    var nodes: Array<string> = [];

    const data: GraphData = {
        nodes: [],
        edges: [],
    }

    config.nodes.forEach((node) => {
        nodes.push(node.name);
        for (let dep of node.deps) {
            edges.push([dep, node.name]);
        }

        console.log("xxx", node.params)

        var params = node.params!.toString()

        data.nodes!.push({
            "id": node.name,
            "name": node.name,
            "dataType": "node",
            "data": {
                "label": node.name,
            },
            params: params,
        })
    });

    edges.forEach((edge) => {
        data.edges!.push({
            "id": edge[0] + "-" + edge[1],
            // "label": edge[0] + "-" + edge[1],
            "source": edge[0],
            "target": edge[1],
        })
    })

    return data;
}

export default AnyFlowNode2VisNode;