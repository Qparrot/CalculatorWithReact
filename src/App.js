import React from 'react';
import './App.css';


class Display extends React.Component
{
	render()
	{
		return(
			<div id="display">{this.props.currentNumber}</div>
		);
	}
}

class Button extends React.Component
{
	render()
	{
		let table = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
		return(
			<button class="number" id={table[Number(this.props.value)]} onClick={this.props.handleClick} data-value={this.props.value}>{this.props.value}</button>
		);
	}
}

class Operator extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		if(this.props.value === '=')
			return(
				<button class="clearEqual" id='equal' data-value="=" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else if(this.props.value ==='C')
			return(
				<button class="clearEqual" id='clear' data-value="C" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else if(this.props.value ==='+')
			return(
				<button class="operator" id='addition' data-value="+" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else if(this.props.value ==='-')
			return(
				<button class="operator"id='substraction' data-value="-" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else if(this.props.value ==='/')
			return(
				<button class="operator" id='division' data-value="/" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else if(this.props.value ==='*')
			return(
				<button class="operator" id='multiplication' data-value="*" onClick={this.props.handleClick}>{this.props.value}</button>
			);
		else
			return (
				<button class="operator" id='decimal' data-value="." onClick={this.props.handleClick}>{this.props.value}</button>
			);
	}
}
class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			currentNumber: '',
			previousNumber: '',
			storedOperator: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.buttons = this.buttons.bind(this);
	}

	handleClick(e)
	{ 
		if (this.state.currentNumber === '' && (e.currentTarget.dataset.value === '0' || e.currentTarget.dataset.value === '.'))
		{
		}
		else if(Number(e.currentTarget.dataset.value) < 10 && Number(e.currentTarget.dataset.value) >= 0 || (e.currentTarget.dataset.value === '.' && this.currentNumber !== '')) 
			this.setState({currentNumber: this.state.currentNumber + e.currentTarget.dataset.value});
		else if(e.currentTarget.dataset.value === '=') 
		{
			switch(this.state.storedOperator)
			{
				case '+':
					this.setState({ currentNumber: Number(this.state.previousNumber) + Number(this.state.currentNumber), previousNumber: '', storedOperator: '' });
					break;
				case '-':
					this.setState({ currentNumber: Number(this.state.previousNumber) - Number(this.state.currentNumber), previousNumber: '', storedOperator: '' });
					break;
				case '*':
					this.setState({ currentNumber: Number(this.state.previousNumber) * Number(this.state.currentNumber), previousNumber: '', storedOperator: '' });
					break;
				case '/':
					this.setState({ currentNumber: Number(this.state.previousNumber) / Number(this.state.currentNumber), previousNumber: '', storedOperator: '' });
					break;
			}

		}
		else if(e.currentTarget.dataset.value === 'C')
			this.setState({currentNumber: '', previousNumber: '', storedOperator: '' });
		else if(this.state.storedOperator === '')
		{
			this.setState({ previousNumber: Number(this.state.currentNumber), currentNumber: '', storedOperator: e.currentTarget.dataset.value });

		}
		else
		{
			switch(this.state.storedOperator)
			{
				case '+':
					this.setState({ previousNumber: Number(this.state.previousNumber) + Number(this.state.currentNumber), currentNumber: '', storedOperator: e.currentTarget.dataset.value });
					break;
				case '-':
					this.setState({ previousNumber: Number(this.state.previousNumber) - Number(this.state.currentNumber), currentNumber: '', storedOperator: e.currentTarget.dataset.value });
					break;
				case '*':
					this.setState({ previousNumber: Number(this.state.previousNumber) * Number(this.state.currentNumber), currentNumber: '', storedOperator: e.currentTarget.dataset.value });
					break;
				case '/':
					this.setState({ previousNumber: Number(this.state.previousNumber) / Number(this.state.currentNumber), currentNumber: '', storedOperator: e.currentTarget.dataset.value });
					break;
			}
		}

	}

	buttons()
	{
		let table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		console.log(table[1]);
		return( <div id="buttons">
			{ table.map((e) => <Button value={e} handleClick={this.handleClick}/>) }

		</div>
		);
	}

	render()
	{
		let tableOperators = ['+', '-', '/', '*', '.'];
		let tableClearEqual = ['C', '='];
		return (
			<div className="App">
				<Display currentNumber={this.state.currentNumber} />
				<div id="inputs">
					<div id="numbers">
						{this.buttons()}
					</div>
					<div id="operators">
						{tableOperators.map((e) => <Operator value={e} handleClick={this.handleClick} />)}
					</div>
					<div id="clearEquals">
						{tableClearEqual.map((e) => <Operator value={e} handleClick={this.handleClick} />)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
