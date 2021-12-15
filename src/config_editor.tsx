import React, { useEffect } from 'react';
import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';
import Editor from "@monaco-editor/react";
import AnyFlowConfig from "./model"
import anyflow_config_data from "./data.json"
import { Input } from 'antd';
const { TextArea } = Input;



interface Iprops {
    textChange: (data: AnyFlowConfig) => void;
}

const ConfigEditor: React.FC<Iprops> = (props) => {



    const onChange = (value: string | undefined, e: any) => {
        console.log('Change:', value);
        if (value !== undefined) {
            const text: AnyFlowConfig = JSON.parse(value);
            props.textChange(text);
        }
    };

    const options = {
        selectOnLineNumbers: true
    };

    // useEffect(() => {
    //     props.textChange(anyflow_config_data);
    // });



    // return <TextArea showCount onChange={onChange} value={JSON.stringify(anyflow_config_data, null, 4)}/>
    return (
        <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue={JSON.stringify(anyflow_config_data, null, 4)}
            onChange={onChange}
        />
    )
}

export default ConfigEditor;