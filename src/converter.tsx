import AnyFlowConfig from "./model";
// import { Graph, Node, Path, Cell, Model } from '@antv/x6'
import G6, { GraphData } from '@antv/g6';
function AnyFlowNode2VisNode(config: AnyFlowConfig): GraphData {

    var edges: Array<[string, string, number]> = [];
    var nodes: Array<string> = [];

    const data: GraphData = {
        nodes: [],
        edges: [],
    }

    config.nodes.forEach((node) => {
        nodes.push(node.name)
        var anchorList = []
        anchorList.push([0.5, 1])
        let anchorStep = 1.0 / (node.deps.length + 1)
        for (var i =0; i < node.deps.length; i++) {
            let dep = node.deps[i];
            edges.push([dep, node.name, i + 1]);
            anchorList.push([(i + 1) *anchorStep, 0])
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
            "params": params,
            "anchorPoints": anchorList,
        })
    });

    edges.forEach((edge) => {
        let order = String(edge[2] - 1)
        data.edges!.push({
            "id": edge[0] + "-" + edge[1],
            "label": order,
            "source": edge[0],
            "target": edge[1],
            "targetAnchor": edge[2],
            "sourceAnchor": 0,
        })
    })

    return data;
}

export default AnyFlowNode2VisNode;