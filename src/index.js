import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';
import './index.scss';

const equalRegex = /=/;
const negativeDigitRegex = /^-{0,1}\d\.{0,1}$/;
const displaySingleOperatorRegex = /^[+\-*/]$/;
const backspaceDecimalRegex = /^[\d+\-*/.]+.\d$/;
const displayTextOnlyOperatorsRegex = /^[+\-*/]{1,2}$/;
const numberRegex = /\d/;
const oneDecimalRegex = /\./;
const operatorRegex = /[+\-*/]/;
const validNotZeroRegex = /^-{0,1}\d+(.\d+){0,1}$/;
const minusRegex = /-/;

// Redux:
const EQUATIONTEXT = 'EQUATIONTEXT';
const DISPLAYTEXT = 'DISPLAYTEXT';
const RESULT = 'RESULT';

const updateEquationText = (text) => {
  return {
    type: EQUATIONTEXT,
    text
  }
};

const updateDisplayText = (text) => {
  return {
    type: DISPLAYTEXT,
    text
  }
};

const updateResult = (text) => {
  return {
    type: RESULT,
    text
  }
};

const store = createStore(rootReducer);

// React:
class Equation_ extends React.Component {
  render() {
    return (
      <div id="equation" className="d-flex justify-content-end align-items-center mb-1 px-3 py-1 monitor">{this.props.equationText}
      </div>
    )
  };
}
const mapStateToProps_Equation = (state) => {
  return {
    equationText: state.equationText
  }
};
const Equation = connect(mapStateToProps_Equation, null)(Equation_);

class Display_ extends React.Component {
  render() {
    return (
      <div id="display" className="d-flex justify-content-end align-items-center mb-3 px-3 py-1 monitor">{this.props.displayText}
      </div>
    )
  };
}
const mapStateToProps_Display = (state) => {
  return {
    displayText: state.displayText
  }
};
const Display = connect(mapStateToProps_Display, null)(Display_);

class CE_ extends React.Component {
  constructor(props) {
    super(props);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  clearDisplay() {
    document.getElementById("clearDisplay").classList.add("buttonPressMedium");
    const removeButtonPress = () => {
      return document.getElementById("clearDisplay").classList.remove("buttonPressMedium")
    };
    setTimeout(removeButtonPress, 250);
    if(equalRegex.test(this.props.equationText)===false) {
      this.props.updateDisplayText("0");
    } else {
      this.props.updateEquationText("");
      this.props.updateDisplayText("0");
    }
  }

  render() {
    return (
      <button id="clearDisplay" className="col-3 operator" onClick={this.clearDisplay}>CE
      </button>
    )
  };
}
const mapStateToProps_CE = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText
  }
};
const mapDispatchToProps_CE = (dispatch) => {
  return {
    updateEquationText: (text) => {
      dispatch(updateEquationText(text))
    },
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    }
  }
};
const CE = connect(mapStateToProps_CE, mapDispatchToProps_CE)(CE_);

class C_ extends React.Component {
  constructor(props) {
    super(props);
    this.clearAll = this.clearAll.bind(this);
  }

  clearAll() {
    document.getElementById("clear").classList.add("buttonPressMedium");
    const removeButtonPress = () => {
      return document.getElementById("clear").classList.remove("buttonPressMedium")
    };
    setTimeout(removeButtonPress, 250);
    this.props.updateEquationText("");
    this.props.updateDisplayText("0");
  }

  render() {
    return (
      <button id="clear" className="col-3 operator" onClick={this.clearAll}>C
      </button>
    )
  };
}
const mapDispatchToProps_C = (dispatch) => {
  return {
    updateEquationText: (text) => {
      dispatch(updateEquationText(text))
    },
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    }
  }
};
const C = connect(null, mapDispatchToProps_C)(C_);

class Backspace_ extends React.Component {
  constructor(props) {
    super(props);
    this.backspace = this.backspace.bind(this);
  }

  backspace() {
    document.getElementById("backspace").classList.add("buttonPressMedium");
    const removeButtonPress = () => {
      return document.getElementById("backspace").classList.remove("buttonPressMedium")
    };
    setTimeout(removeButtonPress, 250);
    if(equalRegex.test(this.props.equationText)===false) {
      const backspacedDisplayText = this.props.displayText.split("").splice(0, this.props.displayText.length-1).join("");
      const backspacedEquationText = this.props.equationText.split("").splice(0, this.props.equationText.length-1).join("");
      if(this.props.displayText!=="0" && negativeDigitRegex.test(this.props.displayText)) {
        this.props.updateDisplayText("0");
      } else if(displaySingleOperatorRegex.test(this.props.displayText)) {
        this.props.updateDisplayText("0");
      } else if(this.props.displayText.length>1) {
        this.props.updateDisplayText(backspacedDisplayText);
      }

      if(this.props.displayText==="0" && this.props.equationText.length>1 && backspaceDecimalRegex.test(this.props.equationText)) {
        this.props.updateEquationText(this.props.equationText.split("").splice(0, this.props.equationText.length-2).join(""));
      } else if(this.props.displayText==="0" && this.props.equationText.length>1 && backspaceDecimalRegex.test(this.props.equationText)===false) {
        this.props.updateEquationText(backspacedEquationText);
      } else if(this.props.displayText==="0" && this.props.equationText.length===1){
        this.props.updateEquationText("");
      }
    }
  }

  render() {
    return (
      <button id="backspace" className="col-3 operator" onClick={this.backspace}><i class="fas fa-backspace"></i>
      </button>
    )
  };
}
const mapStateToProps_Backspace = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText
  }
};
const mapDispatchToProps_Backspace = (dispatch) => {
  return {
    updateEquationText: (text) => {
      dispatch(updateEquationText(text))
    },
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    }
  }
};
const Backspace = connect(mapStateToProps_Backspace, mapDispatchToProps_Backspace)(Backspace_);

class Divide extends React.Component {
  render() {
    return (
      <button id="divide" className="col-3 operator" onClick={this.props.operator}>/
      </button>
    )
  };
}

class Multiply extends React.Component {
  render() {
    return (
      <button id="multiply" className="col-3 operator" onClick={this.props.operator}>*
      </button>
    )
  };
}

class Subtract extends React.Component {
  render() {
    return (
      <button id="subtract" className="col-3 operator" onClick={this.props.operator}>-
      </button>
    )
  };
}

class Add extends React.Component {
  render() {
    return (
      <button id="add" className="col-3 operator" onClick={this.props.operator}>+
      </button>
    )
  };
}

class AddMinus_ extends React.Component {
  constructor(props) {
    super(props);
    this.addMinus = this.addMinus.bind(this);
  }

  addMinus() {
    document.getElementById("addMinus").classList.add("buttonPressLight");
    const removeButtonPress = () => {
      return document.getElementById("addMinus").classList.remove("buttonPressLight")
    };
    setTimeout(removeButtonPress, 250);
    if(equalRegex.test(this.props.equationText)===false) {
      const equationArr = this.props.equationText.split("");
      const displayArr = this.props.displayText.split("");
      let newDisplayArr = [...displayArr];
      if(newDisplayArr[0]==="-") {
        newDisplayArr = newDisplayArr.slice(1);
      } else {
        newDisplayArr.unshift("-");
      }
      if(equationArr[equationArr.length-1]!=="-" && displayTextOnlyOperatorsRegex.test(this.props.displayText)===false && numberRegex.test(equationArr[equationArr.length-1])===false) {
        this.props.updateDisplayText(newDisplayArr.join(""));
      }
    }
  }

  render() {
    return (
      <button id="addMinus" className="col-3 number" onClick={this.addMinus}>+/-
      </button>
    )
  };
}
const mapStateToProps_AddMinus = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText
  }
};
const mapDispatchToProps_AddMinus = (dispatch) => {
  return {
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    }
  }
};
const AddMinus = connect(mapStateToProps_AddMinus, mapDispatchToProps_AddMinus)(AddMinus_);

class Decimal_ extends React.Component {
  constructor(props) {
    super(props);
    this.decimal = this.decimal.bind(this);
  }

  decimal() {
    document.getElementById("decimal").classList.add("buttonPressLight");
    const removeButtonPress = () => {
      return document.getElementById("decimal").classList.remove("buttonPressLight")
    };
    setTimeout(removeButtonPress, 250);
    if(equalRegex.test(this.props.equationText)===false) {
      const equationArr = this.props.equationText.split("");
      if(this.props.displayText.length<=9 && numberRegex.test(equationArr[equationArr.length-1])===false && oneDecimalRegex.test(this.props.displayText)===false && displayTextOnlyOperatorsRegex.test(this.props.displayText)===false) {
        this.props.updateDisplayText(this.props.displayText.concat("."));
      }
    }
  }

  render() {
    return (
      <button id="decimal" className="col-3 number" onClick={this.decimal}>.
      </button>
    )
  };
}
const mapStateToProps_Decimal = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText
  }
};
const mapDispatchToProps_Decimal = (dispatch) => {
  return {
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    }
  }
};
const Decimal = connect(mapStateToProps_Decimal, mapDispatchToProps_Decimal)(Decimal_);

class Equal_ extends React.Component {
  constructor(props) {
    super(props);
    this.equal = this.equal.bind(this);
  }

  equal() {
    document.getElementById("equals").classList.add("buttonPressDark");
    const removeButtonPress = () => {
      return document.getElementById("equals").classList.remove("buttonPressDark")
    };
    setTimeout(removeButtonPress, 250);
    if(equalRegex.test(this.props.equationText)===false) {
      const equationArr = this.props.equationText.split("");
      // eslint-disable-next-line
      const evalDisplayText = eval(this.props.displayText);
      let tempEquation = this.props.equationText;
      if(this.props.equationText==="") {
        this.props.updateEquationText(this.props.displayText.concat("="));
        this.props.updateDisplayText(evalDisplayText.toString());
        this.props.updateResult(evalDisplayText.toString());
      } else if(operatorRegex.test(equationArr[equationArr.length-1])) {
        tempEquation = this.props.equationText.concat(evalDisplayText);
        // eslint-disable-next-line
        let evaluated = Math.round(100000000000000000*eval(tempEquation))/100000000000000000;
        const rawEvaluated = evaluated.toString();
        const evaluatedPrecision = evaluated.toPrecision(11);
        const evaluatedExponential = evaluated.toExponential(11);
        if(rawEvaluated.length>11 && Math.abs(evaluated)<99999999999) {
          this.props.updateResult(rawEvaluated);
          evaluated = evaluatedPrecision;
        } else if(rawEvaluated.length>11) {
          this.props.updateResult(rawEvaluated);
          evaluated = evaluatedExponential;
        } else {
          this.props.updateResult(rawEvaluated);
          evaluated = rawEvaluated;
        }
        this.props.updateEquationText(tempEquation.concat("="));
        this.props.updateDisplayText(evaluated);
      }
    }
  }

  render() {
    return (
      <button id="equals" className="col-3 equal" onClick={this.equal}>=
      </button>
    )
  };
}
const mapStateToProps_Equal = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText
  }
};
const mapDispatchToProps_Equal = (dispatch) => {
  return {
    updateEquationText: (text) => {
      dispatch(updateEquationText(text))
    },
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    },
    updateResult: (text) => {
      dispatch(updateResult(text))
    }
  }
};
const Equal = connect(mapStateToProps_Equal, mapDispatchToProps_Equal)(Equal_);

class Calculator_ extends React.Component {
  constructor(props) {
    super(props);
    this.operator = this.operator.bind(this);
    this.number = this.number.bind(this);
  }

  operator(e) {
    const operatorId = e.target.id;
    document.getElementById(operatorId).classList.add("buttonPressMedium");
    const removeButtonPress = () => {
      return document.getElementById(operatorId).classList.remove("buttonPressMedium")
    };
    setTimeout(removeButtonPress, 250);
    const sign = e.target.innerText;
    if(equalRegex.test(this.props.equationText)===false) {
      // to ensure that calculator logic remains intact if backspace was used
      let equationEndOperators = "0";
      const equationArr = this.props.equationText.split("");

      // equationEndOperators
      if(operatorRegex.test(equationArr[equationArr.length-1]) && operatorRegex.test(equationArr[equationArr.length-2])) {
        equationEndOperators = "2";
      } else if(operatorRegex.test(equationArr[equationArr.length-1])) {
        equationEndOperators = "1";
      }

      if(validNotZeroRegex.test(this.props.displayText) && this.props.equationText === "") {
        this.props.updateEquationText(this.props.equationText.concat(this.props.displayText));
        this.props.updateDisplayText(sign);
      } else if(equationEndOperators==="1" && validNotZeroRegex.test(this.props.displayText) && minusRegex.test(this.props.displayText)===false) {
        this.props.updateEquationText(this.props.equationText.concat(this.props.displayText));
        this.props.updateDisplayText(sign);
      } else if(equationEndOperators==="1" && validNotZeroRegex.test(this.props.displayText) && minusRegex.test(this.props.displayText) && minusRegex.test(equationArr[equationArr.length-1])===false) {
        this.props.updateEquationText(this.props.equationText.concat(this.props.displayText));
        this.props.updateDisplayText(sign);
      } else if(equationEndOperators==="2" && validNotZeroRegex.test(this.props.displayText) && minusRegex.test(this.props.displayText)===false) {
        this.props.updateEquationText(this.props.equationText.concat(this.props.displayText));
        this.props.updateDisplayText(sign);
      } else if(numberRegex.test(equationArr[equationArr.length-1]) && minusRegex.test(this.props.displayText)===false && minusRegex.test(sign) && this.props.displayText!=="0") {
        this.props.updateDisplayText(this.props.displayText.concat(sign));
      } else if(numberRegex.test(equationArr[equationArr.length-1]) && minusRegex.test(this.props.displayText)===false && minusRegex.test(sign) && this.props.displayText==="0") {
        this.props.updateDisplayText(sign);
      } else if(numberRegex.test(equationArr[equationArr.length-1]) && minusRegex.test(this.props.displayText)===false && minusRegex.test(sign)===false) {
        this.props.updateDisplayText(sign);
      } else if(numberRegex.test(equationArr[equationArr.length-1]) && minusRegex.test(this.props.displayText)) {
        this.props.updateDisplayText(sign);
      }
    }
    if(equalRegex.test(this.props.equationText)) {
      this.props.updateEquationText(this.props.result);
      this.props.updateDisplayText(sign);
    }
    this.props.updateResult("");
  }

  number(e) {
    const numberId = e.target.id;
    document.getElementById(numberId).classList.add("buttonPressLight");
    const removeButtonPress = () => {
      return document.getElementById(numberId).classList.remove("buttonPressLight")
    };
    setTimeout(removeButtonPress, 250);
    const num = e.target.innerText;
    if(equalRegex.test(this.props.equationText)===false) {
      const equationArr = this.props.equationText.split("");
      if(this.props.displayText.length<=10) {
        if(this.props.displayText==="0" && numberRegex.test(equationArr[equationArr.length-1])===false) {
          this.props.updateDisplayText(num);
        } else if(displayTextOnlyOperatorsRegex.test(this.props.displayText)) {
          this.props.updateEquationText(this.props.equationText.concat(this.props.displayText));
          this.props.updateDisplayText(num);
        } else if(this.props.displayText!=="0" && this.props.displayText!=="-0") {
          this.props.updateDisplayText(this.props.displayText.concat(num));
        }
      }
    }
    if(equalRegex.test(this.props.equationText)) {
      this.props.updateEquationText("");
      this.props.updateDisplayText(num);
    }
    this.props.updateResult("");
  }

  render() {
    const mobileHeight = window.innerHeight<450? "container-fluid vh-100 d-flex flex-column align-items-center justify-content-center my-5": "container-fluid vh-100 d-flex flex-column align-items-center justify-content-center";
    return (
      <div id="container" className={mobileHeight}>
        <Equation/>
        <Display/>
        <div id="subContainer" className="row">
          <CE/>
          <C/>
          <Backspace/>
          <Divide operator={this.operator}/>
          <button id="seven" className="col-3 number" onClick={this.number}>7</button>
          <button id="eight" className="col-3 number" onClick={this.number}>8</button>
          <button id="nine" className="col-3 number" onClick={this.number}>9</button>
          <Multiply operator={this.operator}/>
          <button id="four" className="col-3 number" onClick={this.number}>4</button>
          <button id="five" className="col-3 number" onClick={this.number}>5</button>
          <button id="six" className="col-3 number" onClick={this.number}>6</button>
          <Subtract operator={this.operator}/>
          <button id="one" className="col-3 number" onClick={this.number}>1</button>
          <button id="two" className="col-3 number" onClick={this.number}>2</button>
          <button id="three" className="col-3 number" onClick={this.number}>3</button>
          <Add operator={this.operator}/>
          <AddMinus/>
          <button id="zero" className="col-3 number" onClick={this.number}>0</button>
          <Decimal/>
          <Equal/>
        </div>
      </div>
    )
  };
}
const mapStateToProps = (state) => {
  return {
    equationText: state.equationText,
    displayText: state.displayText,
    result: state.result
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateEquationText: (text) => {
      dispatch(updateEquationText(text))
    },
    updateDisplayText: (text) => {
      dispatch(updateDisplayText(text))
    },
    updateResult: (text) => {
      dispatch(updateResult(text))
    }
  }
};
const Calculator = connect(mapStateToProps, mapDispatchToProps)(Calculator_);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Calculator/>
      </Provider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
