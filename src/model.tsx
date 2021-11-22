
interface AnyFlowNode {
    name: string,
    node: string,
    deps: Array<string>,
    // necessary: boolean,
    // cachable: boolean,
}

interface AnyFlowConfig {
    nodes: Array<AnyFlowNode>,
}

export default AnyFlowConfig;