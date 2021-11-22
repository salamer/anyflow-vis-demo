import AnyFlowConfig from "./model";
import { Graph, Node, Path, Cell, Model } from '@antv/x6'
function AnyFlowNode2VisNode(config: AnyFlowConfig): Model.FromJSONData {
    
    var edges: Array<[string, string]> = [];
    var nodes: Array<string> = [];

    const data: Model.FromJSONData = {
        nodes: [],
        edges: [],
    }

    config.nodes.forEach((node) => {
        nodes.push(node.name);
        for (let dep of node.deps) {
            edges.push([dep, node.name]);
        }
    });

    edges.forEach((edge) => {
        data.edges!.push({
            "id": edge[0] + "-" + edge[1],
            "shape": "dag-edge",
            "source": edge[0],
            "target": edge[1],
        })
    })

    nodes.forEach((cell) => {
        data.nodes!.push({
            "id": cell,
            "shape": "dag-node",
            "data" : {
                "label": cell,
            }
        })
    })

    return data;
}

export default AnyFlowNode2VisNode;