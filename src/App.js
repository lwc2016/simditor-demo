import React from 'react';
import Editor from "./components/editor";
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [{
        abstract: "",
        detail: "",
      }],
      index: 0
    }
  }

  handleChangeList = (detail) => {
    const { list, index : i } = this.state;
    console.log("<-----变化了------>");
    console.log(list, i);
    console.log(detail);
    console.log("<------end------->")
    
    this.setState({list: [...list.slice(0, i), detail, ...list.slice(i + 1)]})
  };

  handleAddItem = () => {
    const { list } = this.state;
    console.log("增加了，当前index： ", list.length);
    this.setState({
      list: [...list, {
        abstract: "",
        detail: "",
      }],
      index: list.length
    })
  };

  handleChangeIndex = (index) => {
    console.log(index);
    this.setState({ index });
  };

  render(){
    const { list, index } = this.state;
    let { abstract, detail } = list[index];
    console.log("render index: ", index);
    console.log("abstract: ", abstract);
    console.log("detail: ",  detail);
    return (<div className="App">
        <div>
          <button onClick={this.handleAddItem}>添加</button>
          <ul>
            {list.map((item, index) => (<li key={index} onClick={() => this.handleChangeIndex(index)}>文章{index + 1}</li>))}
          </ul>
        </div>
        <div className="editors">
          <div>
            <Editor
              value={abstract}
              onChange={(value) => {
                console.log("index: ", index);
                this.handleChangeList({...list[index], abstract: value}, index);
              }}
            />
            {/* <textarea
              value={abstract}
              onChange={(event) => {
                this.handleChangeList({...list[index], abstract: event.target.value}, index);
              }}
            ></textarea> */}
          </div>
          <div>
          <Editor
              value={detail}
              onChange={(value) => {
                this.handleChangeList({...list[index], detail: value}, index);
              }}
            />
            {/* <textarea
              value={detail}
              onChange={(event) => {
                this.handleChangeList({...list[index], detail: event.target.value}, index);
              }}
            ></textarea> */}
          </div>
        </div>
    </div>
  )
  }
}

export default App;
