import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        // define the initial state, so we can use it later
        // when we'll need to reset the form
        this.initialState = { hourlyRate: '', hoursPerWeek: '' };

        this.state = this.initialState;
    }

    /**
     * Grab user's input data and do the math.
     */
    handleSubmit = () => {
        // using Javascript object destructuring to
        // get user's input data from the state.
        const { hourlyRate, hoursPerWeek } = this.state;

        // hide the keyboard
        // NOTE: the keyboard seems to show up after being dismissed
        //       when using the Alert react native component.
        //       Not a big deal at the moment (this is fine 😜).
        Keyboard.dismiss();

        // make sure we have some numeric values to work with
        if (!parseFloat(hourlyRate) || !parseFloat(hoursPerWeek)) {
            Alert.alert('Input error', 'Please input some positive numeric values.');
            return;
        }

        // do the Math
        const annualIncome = Math.abs(parseFloat(hourlyRate) * parseFloat(hoursPerWeek) * 52);

        // show results
        Alert.alert(
            'Your input and result',
            `$/hour: ${hourlyRate},\n Hours/week: ${hoursPerWeek}, \n Annual Income: $${annualIncome}`,
        );
    };

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(this.initialState);
    };

    render() {
        const { hourlyRate, hoursPerWeek } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.screenTitle}>Salary Calculator</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="$/hour"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hourlyRate: text })}
                    value={hourlyRate}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Hours/week"
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.setState({ hoursPerWeek: text })}
                    value={hoursPerWeek}
                />

                <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.resetForm}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
    textInput: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#3F4EA5',
    },
    button: {
        backgroundColor: '#FD6592',
        borderRadius: 3,
        height: 40,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
