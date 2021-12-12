import React from 'react';
import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';
import AnyFlowConfig from "./model"
import anyflow_config_data from "./data.json"
import { Input } from 'antd';
const { TextArea } = Input;



interface Iprops {
    textChange: (data: AnyFlowConfig) => void;
}

const ConfigEditor: React.FC<Iprops> = (props) => {

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
        // const loadOpts : yaml.LoadOptions = {
        //     json: true,
        // };
        // try {
        //     const data = yaml.load(e.target.value, loadOpts) as ;
        //     console.log("xxx", data);
        // } catch (e) {
        //     console.log(e);
        // }
        const text: AnyFlowConfig = JSON.parse(e.target.value);
        props.textChange(text);
    };

    const options = {
        selectOnLineNumbers: true
    };

    props.textChange(anyflow_config_data);

    return <TextArea showCount onChange={onChange} value={JSON.stringify(anyflow_config_data, null, 4)}/>
}

export default ConfigEditor;