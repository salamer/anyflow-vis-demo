import * as React from 'react';
import anyflow_config_data from "./data.json"
import AnyFlowConfig from "./model"
import AnyFlowNode2VisNode from "./converter"
import G6, { GraphData, IShape } from '@antv/g6';

interface IProps {
}

G6.registerNode(
  'node',
  {
    draw(cfg, group) {
      const rect = group!.addShape('rect', {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 3,
        },
        name: 'rect-shape',
      })
      if (cfg!.name) {
        group!.addShape('text', {
          attrs: {
            text: cfg!.name,
            x: 0,
            y: 0,
            fill: '#00287E',
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
            fontWeight: 'bold',
          },
          name: 'text-shape',
        })
      }
      return rect
    }
  },
  'single-node',
);

const Chart: React.FC<IProps> = (props) => {

  const ref: any = React.useRef(null);
  var graph: any = null;
  React.useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width: window.innerHeight,
        height: window.innerWidth,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', {
            type: 'tooltip',
            formatText(model) {
              const params = model.params as string;
              // console.log("xxx", cfg)
              return params;
            },
          }],
        },
        layout: {
          type: 'dagre',
          direction: 'LR',
        },
        defaultNode: {
          type: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
        },
        defaultEdge: {
          type: 'polyline',
        },
      });
    }

    const data = AnyFlowNode2VisNode(anyflow_config_data)
    console.log("xxx", data)
    graph.data(data)
    graph.render()
  })

  return (<div>
    <div id="mountNode">
      <div ref={ref}>
      </div>
    </div>
  </div>);
}

export default Chart;