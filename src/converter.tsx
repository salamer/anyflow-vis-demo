import AnyFlowConfig from "./model";
// import { Graph, Node, Path, Cell, Model } from '@antv/x6'
import G6, { GraphData } from '@antv/g6';
import {GraphinData, Utils} from '@antv/graphin';
function AnyFlowNode2VisNode(config: AnyFlowConfig): GraphinData {

    var edges: Array<[string, string, number]> = [];
    var nodes: Array<string> = [];

    const data: GraphinData = {
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
            edges.push([dep, node.name, i]);
            anchorList.push([(i + 1) *anchorStep, 0])
        }

        console.log("xxx", node.params)

        var params = node.params!.toString()
        const parimaryColor = '#ff6a00';
        data.nodes!.push({
            "id": node.name,
            "name": node.name,
            "label": node.name,
            "dataType": "node",
            "data": {
                "label": node.name,
            },
            "params": params,
            "type": "graphin-circle",
            "style": {
                "label": {
                    "value": node.name,
                },
                "badges": [
                    {
                        /** 放置的位置，ef：LT（left top）左上角 */
                        "position": 'RT',
                        /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
                        "type": 'text',
                        "value": '10',
                        "stroke": '',
                        /** 徽标内文本的颜色 */
                        "color": '#fff',
                        "fontSize": 14,
                        "fontFamily": '',
                        // badge 中文本距离四周的偏移量
                        "padding": 0,
                        // badge 在 x 和 y 方向上的偏移量
                        "offset": [0, 0],
                      },
                    {
                        /** 放置的位置，ef：LT（left top）左上角 */
                        "position": 'RT',
                        /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
                        "type": 'text',
                        "value": '10',
                        "stroke": '',
                        /** 徽标内文本的颜色 */
                        "color": '#fff',
                        "fontSize": 14,
                        "fontFamily": '',
                        // badge 中文本距离四周的偏移量
                        "padding": 0,
                        // badge 在 x 和 y 方向上的偏移量
                        "offset": [0, 0],
                        "fill": Utils.hexToRgbaToHex(parimaryColor, 1),
                      },
                ],
            }
            // "anchorPoints": anchorList,
        })
    });

    edges.forEach((edge) => {
        let order = String(edge[2] - 1)
        data.edges!.push({
            // "id": edge[0] + "-" + edge[1],
            "label": order,
            "source": edge[0],
            "target": edge[1],
            // "targetAnchor": edge[2],
            // "sourceAnchor": 0,
            "style": {
                "keyshape": {
                  "lineDash": [
                    2,
                    2
                  ],
                  "stroke": "#FF6A00"
                },
                "label": {
                  "value": "params [" + edge[2] + "]",
                  "fill": "#FF6A00"
                }
              }
        })
    })

    return data;
}

export default AnyFlowNode2VisNode;