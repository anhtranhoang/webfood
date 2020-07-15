import React from 'react';
import {Redirect} from 'react-router-dom';
import Modal from 'react-modal';
import './LogIn.css';


Modal.setAppElement(document.getElementById('root'));

export default class ModalStaffLogin extends React.Component {
    constructor(props) {
        super(props);
        this.MongoClient = require('mongodb').MongoClient;
        this.url = "mongodb://localhost:27017/";
        this.state = {
            modalIsOpen: true,
            staffLoggedIn: false,
            value: '',
            PIN: '1234',
            comfirm: false,
        };
        this.openMongoDB = this.openMongoDB.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openMongoDB(){
        this.MongoClient.connect(this.url, function(err, db) {
            console.log("concac");
            if (err) throw err;
            this.dbo = db.db("mydb");
            this.dbo.collection("customers").findOne({}, function(err, result) {
              if (err) throw err;
              alert(result.name);
              db.close();
            });
          });
        console.log("clgt");
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value === this.state.PIN) {
            this.setState({confirm: true});
        } else {
            alert('Incorrect PIN');
        }
    }

    staffLogin = () => {
        this.setState({staffLoggedIn: true});
    }

    render() {
        if (this.state.confirm) {
            return <Redirect to = {{pathname: '/DeclareInfor'}} />
        }
        return (
            <div class = "login">
                <div class=" row ">               
                        <h1>Login</h1>
                        <form onSubmit = {this.handleSubmit}>
                            <input type="text" name="u" value = {this.state.value} onChange = {this.handleChange} placeholder="User Mail" required="required" />
                            <button type="submit" class="btn btn-primary btn-block btn-large">Log In</button>
                        </form>              
                </div>
                <div class = "row">

                </div>
                <div class = "row">
                    <div >
                    </div>

                </div>
            </div>
        );
    }
}
