import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from "./chart";
import { Row, Col } from 'antd';
import ConfigEditor from './config_editor';
import AnyFlowConfig from "./model"
import { Alert, Card } from 'antd';
import ReactJson from 'react-json-view'

const AnyFlowVisual = () => {

  const [graph, setGraph] = useState<AnyFlowConfig>(
    { nodes: [] }
  );
  const [selected_node, setSelectedNode] = useState<string>("");

  var display_info = <Card><ReactJson src={{}} /></Card>
  if (selected_node.length > 0) {
    graph.nodes.forEach((node) => {
      console.log("node ", node.name, selected_node)
      if (node.name === selected_node) {
        display_info = <Card>
          <ReactJson src={node} />
        </Card>
      }
    })
  }

  return (
    <>
      <Row>
        <Col span={16} offset={8}><Chart data={graph} cb={setSelectedNode}></Chart></Col>
        <Col span={8}>{display_info}</Col>
      </Row>

      <Row>
        <Col span={24}><ConfigEditor textChange={setGraph} /></Col>
      </Row>
    </>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <body className="App-body">
      <AnyFlowVisual />
      </body>
      
    </div>
  );
}

export default App;
