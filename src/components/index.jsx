import { Component } from "react";
import css from "./addContact.module.css";

const INITIAL_STATE = {
  name: "",
  number: "",
}
class ContactForm extends Component {

  state = {
    name: "",
    number: "",
  }


handleChange = (e) => {
const {value, name} = e.target
this.setState((prevState) => ({
  ...prevState,
  [name]: value
}))
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.addContact(this.state)

}
  render() {
    return ( 
      <div>
      <div> Formularz do wprowadzania kontaktów</div>
          <form className={css.form} onSubmit={this.props.handleSubmit}>
            <div className={css.formInput}>
              <label htmlFor="Name" className={css.inputLabel}> Name
                <input
                  type="text"
                  name="name"
                  // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob    Mercer,  Charles de Batz de Castelmore d'Artagnan" required
                  placeholder="Name"
                  value={this.state.name}
                  className={css.formInput}
                  onChange={this.handleChange}
                  />
              </label> 
            </div> 
             <div className={css.formInput}>
             <label htmlFor="Phone number" className={css.inputLabel}> Phone Number
              <input
                  type="tel"
                  name="number"
                  // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required
                  placeholder="Phone number"
                  value={this.state.number}
                  className={css.formInput}
                  onChange={this.handleChange}
                  />
              </label>
             </div>
             <div>
             <button type="submit" onClick={this.handleSubmit}>Add contact</button>
             </div>
          </form> 
      </div>
    
           
    )}}

  class ContactList extends Component {

        render() {
          return ( <div>  
            <ul>
             {this.props.contacts.map(({name, number}, index) => (
              <li key={`${name}_${index}`}> {name} --- {number}
              </li>
             ))}
            </ul>
            
             </div>
          )}}



class AddContact extends Component {

  state = {
  contacts: []
  }
  addContact = (newContact) => {
    this.setState((prevState) => ({
    contacts:[...prevState.contacts, newContact]
    }))

  }

  render() {
console.log(this.state.contacts);
    return <div className={css.wrapper}>
      Książka telefoniczna
      <ContactForm addContact={this.addContact}/>
      <ContactList products contacts={this.state.contacts}/>
    </div>
  }
}

export default AddContact