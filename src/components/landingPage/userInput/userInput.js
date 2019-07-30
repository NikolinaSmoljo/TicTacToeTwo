import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Image from '../../image/cover.jpg';
import Input from '../../UI/formElement/input';

const GameTitle = styled.div`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    height: 10px;
    margin: 20px 0px;
    color: #ff8533;
`;
const ImageWrapper = styled.div`
    text-align: center;
    padding: 15px;
    img {
        width: 385px;
        border-radius: 12px;
    }
`;

const FormWrapper = styled.div`
    width: 60%;
    margin: auto;
`;

const Button = styled.button`
    background-color: #ff8533;
    border: 1px solid orangered;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 6px 25px;
    font-weight: 700;
    margin: 10px;
    border-radius: 12px;
    font-size: 14px;
        :hover {
            background: lightslategray;
        }
        :disabled {
            color: white;
            background-color: coral;
            border: 1px solid orangered;
            cursor: not-allowed;
            font-weight: 400;
        }
`;

class UserInput extends Component {

    state = {
        playerNameTouched: false,
        gridSizeTouched: false,
        playerNameValid: false,
        gridSizeValid: false,
        validationMessagePlayerName: '',
        validationMessageGridSize: '',
        formValid: false,

        entryPlayerName: '',
        entryPlayerSymbol: '',
        entryGridSize: null
    }

    submitHandler = (event) => {
        console.log("submit Handler");
        event.preventDefault();
        this.props.initUserInput(this.state.entryPlayerName, this.state.entryPlayerSymbol, this.state.entryGridSize);
        this.props.history.push("/game");
    }

    validationHandler = (id, event) => {
        console.log("validation handler", id);
        if(id === 'playerName'){
            this.setState({playerNameTouched: true});
            const text = event.target.value.trim();
            if(text.length < 3){
                console.log("text is < 3");
                this.setState({validationMessagePlayerName: 'Player name must contain at least 3 characters!'});
            }else{
                this.setState({playerNameValid: true, validationMessagePlayerName: '', entryPlayerName: text});
            }
        }
        else if (id === 'gridSize'){
            this.setState({gridSizeTouched: true});
            const size = parseInt(event.target.value);
            if(!size || size < 3 || size > 6){
                this.setState({validationMessageGridSize: 'Please enter number between 2 and 7'});
            } else{
                this.setState({gridSizeValid: true, validationMessageGridSize: '', entryGridSize: size});
            }
        }
        else if (id === 'gameSymbol'){
            this.setState({entryPlayerSymbol: event.target.value});
        }
        if(this.state.playerNameValid && this.state.gridSizeValid){
            this.setState({formValid: true});
        }

    }

    render(){
        return <>
            <GameTitle>Tic Tac Toe Game</GameTitle>
            <ImageWrapper><img src={Image} alt="UserInputImage"></img></ImageWrapper>
            <FormWrapper>
                <form onSubmit={this.submitHandler}>
                    <Input type={'input'} 
                        labelText={"Player name: "} 
                        id={'playerName'} 
                        changeHandler={this.validationHandler}
                        touched={this.state.playerNameTouched}
                        validationError={this.state.validationMessagePlayerName}
                    />

                    <Input type={'input'} 
                        labelText={"Grid size: "} 
                        id={'gridSize'}
                        changeHandler={this.validationHandler}
                        touched={this.state.gridSizeTouched}
                        validationError={this.state.validationMessageGridSize}
                    />

                    <Input type={'select'} 
                        labelText={"Game symbol: "} 
                        id={'gameSymbol'}
                        changeHandler={this.validationHandler}/>

                    <Button disabled={!this.state.formValid}>Submit</Button>
                </form>
            </FormWrapper>
        </>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initUserInput: (playerName, playerSymbol, n) => dispatch(actions.initUserInput(playerName, playerSymbol, n))
    }
}

export default connect(null, mapDispatchToProps)(UserInput);
