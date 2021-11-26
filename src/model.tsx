
interface Params {
    [key: string]: any,
}

interface AnyFlowNode {
    name: string,
    node: string,
    deps: Array<string>,
    necessary?: boolean,
    cachable?: boolean,
    params?: Params,
}

interface AnyFlowConfig {
    nodes: Array<AnyFlowNode>,
}

export default AnyFlowConfig;