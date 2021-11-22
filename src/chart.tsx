import * as React from 'react';
import { Graph, Node, Path, Cell, Model } from '@antv/x6'
import '@antv/x6-react-shape'
import anyflow_config_data from "./data.json"
import AnyFlowConfig from "./model"
import AnyFlowNode2VisNode from "./converter"
import { DagreLayout, } from '@antv/layout'

interface IProps {
}

interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}

const data = [
  {
    "id": "1",
    "shape": "dag-node",
    "x": 290,
    "y": 110,
    "data": {
      "label": "读数据",
      "status": "success"
    },
    "ports": [
      {
        "id": "1-1",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "2",
    "shape": "dag-node",
    "x": 290,
    "y": 225,
    "data": {
      "label": "逻辑回归",
      "status": "success"
    },
    "ports": [
      {
        "id": "2-1",
        "group": "top"
      },
      {
        "id": "2-2",
        "group": "bottom"
      },
      {
        "id": "2-3",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "3",
    "shape": "dag-node",
    "x": 170,
    "y": 350,
    "data": {
      "label": "模型预测",
      "status": "success"
    },
    "ports": [
      {
        "id": "3-1",
        "group": "top"
      },
      {
        "id": "3-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "4",
    "shape": "dag-node",
    "x": 450,
    "y": 350,
    "data": {
      "label": "读取参数",
      "status": "success"
    },
    "ports": [
      {
        "id": "4-1",
        "group": "top"
      },
      {
        "id": "4-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "5",
    "shape": "dag-edge",
    "source": {
      "cell": "1",
      "port": "1-1"
    },
    "target": {
      "cell": "2",
      "port": "2-1"
    },
    "zIndex": 0
  },
  {
    "id": "6",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-2"
    },
    "target": {
      "cell": "3",
      "port": "3-1"
    },
    "zIndex": 0
  },
  {
    "id": "7",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-3"
    },
    "target": {
      "cell": "4",
      "port": "4-1"
    },
    "zIndex": 0
  }
];

export class AlgoNode extends React.Component<{ node?: Node }> {
  shouldComponentUpdate() {
    const { node } = this.props
    if (node) {
      if (node.hasChanged('data')) {
        return true
      }
    }
    return false
  }

  render() {
    const { node } = this.props
    const data = node?.getData() as NodeStatus
    // const { label, status = 'default' } = data

    return (
      <div className="node">
        <span className="label">{data.label}</span>
      </div>
    )
  }
}

Graph.registerNode(
  'dag-node',
  {
    inherit: 'react-shape',
    width: 180,
    height: 36,
    component: <AlgoNode />,
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
    },
  },
  true,
)

Graph.registerEdge(
  'dag-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)

Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    const offset = 4
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)

const Chart: React.FC<IProps> = (props) => {

  const ref: any = React.useRef(null);
  var graph: any = null;
  React.useEffect(() => {
    if (!graph) {
      graph = new Graph({
        container: ref.current,
        width: 800,
        height: 600
      })


    }

    // 初始化节点/边
    const init = (data: Cell.Metadata[]) => {
      const cells: Cell[] = []
      data.forEach((item) => {
        if (item.shape === 'dag-node') {
          cells.push(graph.createNode(item))
        } else {
          cells.push(graph.createEdge(item))
        }
      })
      console.log("xxx", cells);
      graph.resetCells(cells)
    }

    // let jsonObj: any = anyflow_config_data;
    // let anyflow_config: AnyFlowConfig = jsonObj;
    // console.log("anyflow_config", anyflow_config);
    // let cells = AnyFlowNode2VisNode(anyflow_config);
    // var model : Model = new Model;
    // model.fromJSON(cells);
    // graph.resetCells(cells);

    const container: Model.FromJSONData = {
      nodes: [],
      edges: [],

    }
    const edges = [
      ['1', '2'],
      ['2', '3'],
      ['2', '4'],
      ['4', '5'],
      ['4', '6'],
      ['4', '7'],
      ['4', '8'],
      ['5', '9'],
      ['6', '10'],
      ['7', '11'],
      ['8', '12'],
    ]
    
    for (let i = 1; i <= 12; i++) {
      container.nodes!.push({
        id: '${i}' ?? '',
        shape: 'circle',
        width: 32,
        height: 32,
        label: i,
        attrs: {
          body: {
            fill: '#5F95FF',
            stroke: 'transparent',
          },
          label: {
            fill: '#ffffff',
          },
        },
      })
    }
    
    edges.forEach((edge: string[]) => {
      container.edges!.push({
        source: edge[0],
        target: edge[1],
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
          },
        },
      })
    })

    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 35,
      nodesep: 15,
    });

    const my_model : Model = new Model;
    my_model.fromJSON(container);

    // model = dagreLayout.layout(model)
    const model = dagreLayout.layout(my_model)

    graph.fromJSON(model)
  }, []);



  return (<div>
    <div id="mountNode">
      <div ref={ref}>
      </div>
    </div>
  </div>);
}

export default Chart;