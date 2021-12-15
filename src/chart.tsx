import React, { useContext, useEffect } from 'react';
import AnyFlowConfig from "./model"
import AnyFlowNode2VisNode from "./converter"
import G6, { GraphData, IShape } from '@antv/g6';
import Graphin, { Behaviors, Utils, IG6GraphEvent, GraphinData, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';

interface IProps {
  cb: (node_name: string) => void;
  data: AnyFlowConfig;
}

const ClickBehavior: React.FC<IProps> = (props) => {
  const { graph, apis } = useContext(GraphinContext);

  useEffect(() => {
    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      apis.focusNodeById(model.id);
      props.cb(node.getID())
    };
    graph.on('node:click', handleClick);
    return () => {
      graph.off('node:click', handleClick);
    };
  }, []);
  return null;
};

const Chart: React.FC<IProps> = (props) => {

  const {
    DragCanvas, // 拖拽画布
    ZoomCanvas, //缩放画布
    ClickSelect, // 点击选中节点
    DragNode, // 拖拽节点
    ResizeCanvas, // 自动调整画布宽高
    ActivateRelations, // 关联高亮
    Hoverable, // Hover操作
  } = Behaviors;
  const data = AnyFlowNode2VisNode(props.data);
  console.log(data);
  const ref: any = React.useRef(null);
  return (
    <div ref={ref} className="canvas">
      <Graphin data={data} layout={{ type: 'dagre' }} fitView={true}>
        <ZoomCanvas />
        <DragCanvas />
        <DragNode />
        <ClickSelect />
        {/* <ResizeCanvas graphDOM={ref.current}/> */}
        <Hoverable bindType="node" />
        <Hoverable bindType="edge" />
        <ActivateRelations />
        <ClickBehavior cb={props.cb} data={props.data} />
      </Graphin>
    </div>
  )
}

export default Chart;