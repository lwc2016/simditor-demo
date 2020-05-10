import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../node_modules/simditor/styles/simditor.css";

export default class Editor extends React.Component{
    componentDidMount(){
        this.id =(Math.random() * 100).toFixed(0);
        this.initEditor();
    }
    componentWillReceiveProps(newProps){
        this.propsChange = true;
        if(newProps.value !== this.value){
            console.log(this.id, "需要更新了");
            this.editor.setValue(newProps.value);
            if(this.editor){
                this.initEditor();
            }
        }
    };
    initEditor = () => {
        console.log(this.id,  ": 富文本编辑器初始化！")
        import("simditor").then(module => {
            const Editor = module.default;
            this.editor = new Editor({
                textarea: ReactDOM.findDOMNode(this)
            })
            // 初始化值
            this.value = this.props.value;
            this.editor.setValue(this.value);

            this.isEnableChange = false;
            this.editor.on("focus", () => {
                console.log("-----focus----");
                this.isEnableChange = true;
            })
            this.editor.on("valuechanged", () => {
                if(!this.isEnableChange) return null;
                const newtext = this.editor.getValue();
                console.log(this.id, "newText: ", newtext);
                this.value = newtext;
                if(this.props.onChange){
                    this.props.onChange(newtext);
                }
            });
            this.editor.on("blur", () => {
                console.log("------blur------");
                this.isEnableChange = false;
            })
            // this.editor.on("blur", () => {
            //     console.log("---blur----");
            //     const newtext = this.editor.getValue();
            //     console.log(this.id, "newText: ", newtext);
            //     // this.value = newtext;
            //     if(this.props.onChange){
            //         this.props.onChange(newtext);
            //     }
            // });
        });
    }
    render(){
        return <textarea />
    }
}